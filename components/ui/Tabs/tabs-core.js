/* Behaviour of the shared tab bar (Tabs.jsx): the brand pill under the chosen tab, arrow / Home / End keys, a click, and the chosen tab
   kept in view when the bar scrolls (narrow screens). Works on the server-rendered markup.
   initTabs(bar, { onSelect(id, tab), controlled })
   - uncontrolled (default): a click or key chooses the tab here (aria-selected, tabIndex) and then calls onSelect.
   - controlled (React owns aria-selected): this only calls onSelect; call api.place() after the new state has rendered.
   Returns { select(id), place(instant), centre(smooth), destroy() }. */
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
