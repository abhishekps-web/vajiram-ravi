'use client';
/* The site's tab bar, one file (public/css/tabs.css): a sand bar of labels and one brand pill that slides to the chosen tab.
   <Tabs items value label controls />: the markup, for server-rendered bars driven by initTabs.
   <ControlledTabs value onChange … />: the same bar for a React component that owns the chosen tab.
   initTabs(bar, { onSelect(id, tab), controlled }): the behaviour (pill, arrow / Home / End keys, click, chosen tab kept in view);
   returns { select(id), place(instant), centre(smooth), destroy() }.
   items: [{ id, label, count?, hidden?, className?, domId?, ariaLabel? }]; extra props (className, style …) go on the bar. */
import { useEffect, useLayoutEffect, useRef } from 'react';

const still = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initTabs(bar, { onSelect, controlled = false } = {}) {
  const list = bar && bar.querySelector('[role="tablist"]');
  if (!list) return null;
  const ind = list.querySelector('.tabs__ind');
  const all = () => [...list.querySelectorAll('[role="tab"]')];
  const shown = () => all().filter(t => !t.hidden);
  const current = () => all().find(t => t.getAttribute('aria-selected') === 'true');

  const place = instant => {
    const t = current();
    if (!t || !ind || t.hidden) return;
    if (instant) ind.classList.add('is-instant');
    ind.style.transform = `translateX(${t.offsetLeft}px)`;
    ind.style.width = t.offsetWidth + 'px';
    bar.classList.add('has-ind');
    if (instant) { void ind.offsetWidth; ind.classList.remove('is-instant'); }
  };
  const centre = smooth => {
    const t = current();
    if (!t || list.scrollWidth <= list.clientWidth) return;
    const x = list.scrollLeft + t.getBoundingClientRect().left - list.getBoundingClientRect().left;
    list.scrollTo({ left: x - (list.clientWidth - t.offsetWidth) / 2, behavior: smooth && !still() ? 'smooth' : 'auto' });
  };
  const mark = t => {
    all().forEach(x => { const on = x === t; x.setAttribute('aria-selected', String(on)); x.tabIndex = on ? 0 : -1; });
    place(false); centre(true);
  };
  const choose = t => {
    if (!t || t === current()) return;
    if (!controlled) mark(t);
    if (onSelect) onSelect(t.dataset.tab, t);
  };

  const onClick = e => { const t = e.target.closest('[role="tab"]'); if (t && list.contains(t)) choose(t); };
  const onKey = e => {
    const tabs = shown(), i = tabs.indexOf(document.activeElement);
    if (i < 0) return;
    const to = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
    if (to === undefined) return;
    e.preventDefault();
    const next = tabs[(to + tabs.length) % tabs.length];
    next.focus(); choose(next);
  };
  list.addEventListener('click', onClick);
  list.addEventListener('keydown', onKey);

  place(true);
  let ro = null;
  if ('ResizeObserver' in window) { ro = new ResizeObserver(() => place(false)); ro.observe(list); }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => place(true));

  return {
    select: id => choose(all().find(t => t.dataset.tab === id)),
    place, centre,
    destroy() { list.removeEventListener('click', onClick); list.removeEventListener('keydown', onKey); if (ro) ro.disconnect(); },
  };
}

export default function Tabs({ items, value, label, controls, id, className = '', listClassName = '', children, ...rest }) {
  const chosen = value ?? items[0]?.id;
  return (
    <div className={`tabs${className ? ` ${className}` : ''}`} {...rest}>
      <div className={`tabs__list${listClassName ? ` ${listClassName}` : ''}`} role="tablist" aria-label={label} id={id}>
        {items.map((it) => {
          const on = it.id === chosen;
          return (
            <button
              key={it.id}
              type="button"
              role="tab"
              id={it.domId}
              className={`tab${it.className ? ` ${it.className}` : ''}`}
              data-tab={it.id}
              aria-label={it.ariaLabel}
              aria-selected={on}
              aria-controls={controls}
              tabIndex={on ? 0 : -1}
              hidden={it.hidden || undefined}
            >
              {it.label}
              {it.count != null && <span className="tab__n">{it.count}</span>}
            </button>
          );
        })}
        <span className="tabs__ind" aria-hidden="true" />
      </div>
      {children}
    </div>
  );
}

export function ControlledTabs({ value, onChange, ...props }) {
  const ref = useRef(null);
  const api = useRef(null);
  const change = useRef(onChange);
  change.current = onChange;

  useEffect(() => {
    api.current = initTabs(ref.current, { controlled: true, onSelect: id => change.current(id) });
    return () => { if (api.current) api.current.destroy(); api.current = null; };
  }, []);
  useLayoutEffect(() => { if (api.current) { api.current.place(false); api.current.centre(true); } }, [value]);

  return <Tabs ref={ref} value={value} {...props} />;
}
