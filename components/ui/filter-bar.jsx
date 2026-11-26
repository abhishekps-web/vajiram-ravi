'use client';
import { useEffect, useRef, useState } from 'react';
import Button from '@/components/ui/button';

export function Dropdown({ label, value, onChange, items }) {
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(0);
  const root = useRef(null);
  const cur = items.find(i => i.id === value) || items[0];
  useEffect(() => {
    if (!open) return;
    const off = e => { if (!root.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('pointerdown', off);
    return () => document.removeEventListener('pointerdown', off);
  }, [open]);
  const show = () => { setHi(Math.max(0, items.findIndex(i => i.id === value))); setOpen(true); };
  const choose = i => { onChange(items[i].id); setOpen(false); root.current?.querySelector('button')?.focus(); };
  const key = e => {
    if (!open) { if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) { e.preventDefault(); show(); } return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); setHi(h => (h + 1) % items.length); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHi(h => (h - 1 + items.length) % items.length); }
    else if (e.key === 'Home') { e.preventDefault(); setHi(0); }
    else if (e.key === 'End') { e.preventDefault(); setHi(items.length - 1); }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(hi); }
    else if (e.key === 'Escape' || e.key === 'Tab') setOpen(false);
  };
  return (
    <div className="cf-dd" ref={root} data-open={open ? 'true' : undefined}>
      <button type="button" className="cf-dd__btn" role="combobox" aria-haspopup="listbox" aria-expanded={open} aria-label={label}
        onClick={() => (open ? setOpen(false) : show())} onKeyDown={key}>
        <span className="cf-dd__t"><span className="cf-dd__k">{label}:</span> {cur.label}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
      </button>
      {open && (
        <ul className="cf-dd__list" role="listbox" aria-label={label}>
          {items.map((o, i) => (
            <li key={o.id} role="option" aria-selected={o.id === value} data-hi={i === hi ? 'true' : undefined}
              onPointerEnter={() => setHi(i)} onPointerDown={e => e.preventDefault()} onClick={() => choose(i)}>{o.label}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Choice({ label, value, onChange, items }) {
  return (
    <div className="cf-sheet__grp" role="radiogroup" aria-label={label}>
      <p className="cf-sheet__k">{label}</p>
      <div className="cf-sheet__opts">
        {items.map(o => (
          <button key={o.id} type="button" role="radio" aria-checked={o.id === value} className="cf-sheet__opt" onClick={() => onChange(o.id)}>{o.label}</button>
        ))}
      </div>
    </div>
  );
}

export default function FilterBar({ query, onQuery, searchLabel, filters, count, noun = ['result', 'results'] }) {
  const [sheet, setSheet] = useState(false);
  const fbtn = useRef(null);
  const sentinel = useRef(null);
  const applied = filters.filter(f => f.value !== 'all').length;
  const filtering = applied > 0 || query.trim() !== '';
  const resetFilters = () => filters.forEach(f => f.onChange('all'));
  const clearAll = () => { resetFilters(); onQuery(''); };
  const closeSheet = () => { setSheet(false); fbtn.current?.focus(); };

  useEffect(() => {
    if (!sheet) return undefined;
    const panel = document.querySelector('.cf-sheet__p');
    panel?.querySelector('button')?.focus();
    const key = e => {
      if (e.key === 'Escape') { e.preventDefault(); closeSheet(); return; }
      if (e.key !== 'Tab' || !panel) return;
      const f = [...panel.querySelectorAll('button:not([disabled])')];
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.addEventListener('keydown', key);
    return () => { document.removeEventListener('keydown', key); document.documentElement.style.overflow = prev; };
  }, [sheet]);

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return undefined;
    const top = parseFloat(getComputedStyle(el).getPropertyValue('--cf-top')) || 92;
    const bar = el.nextElementSibling;
    const page = el.closest('.course-page') || bar;
    const ramp = 140;
    let raf = 0;
    const tick = () => {
      raf = 0;
      const d = el.getBoundingClientRect().top - top;
      page?.style.setProperty('--stick', Math.min(1, Math.max(0, 1 - d / ramp)).toFixed(3));
      bar?.toggleAttribute('data-stuck', d <= 0);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={sentinel} className="cf-bar-sentinel" aria-hidden="true" />
      <div className="cf-bar">
        <div className="cf-bar__in">
          <form className="cf-search" role="search" onSubmit={e => e.preventDefault()}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
            <input type="search" value={query} onChange={e => onQuery(e.target.value)} placeholder={searchLabel} aria-label={searchLabel} autoComplete="off" />
            {query && <button type="button" className="cf-search__x" aria-label="Clear search" onClick={() => onQuery('')}>×</button>}
          </form>
          {filters.map(f => <Dropdown key={f.label} label={f.label} value={f.value} onChange={f.onChange} items={f.items} />)}
          {filtering && <button type="button" className="cf-clear" onClick={clearAll}>Clear filters</button>}
          <button type="button" ref={fbtn} className="cf-fbtn" aria-label={applied ? `Filters, ${applied} applied` : 'Filters'} aria-haspopup="dialog" aria-expanded={sheet} onClick={() => setSheet(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M4 7h10M18 7h2M4 17h2M10 17h10" /><circle cx="16" cy="7" r="2" /><circle cx="8" cy="17" r="2" /></svg>
            {applied > 0 && <span className="cf-fbtn__n" aria-hidden="true">{applied}</span>}
          </button>
        </div>
      </div>
      {sheet && (
        <div className="cf-sheet">
          <div className="cf-sheet__ov" onClick={closeSheet} />
          <div className="cf-sheet__p" role="dialog" aria-modal="true" aria-labelledby="cfSheetH">
            <span className="cf-sheet__grab" aria-hidden="true" />
            <div className="cf-sheet__hd">
              <h2 id="cfSheetH" className="cf-sheet__t">Filters</h2>
              <button type="button" className="cf-sheet__x" aria-label="Close filters" onClick={closeSheet}>×</button>
            </div>
            <div className="cf-sheet__bd" data-lenis-prevent>
              {filters.map(f => <Choice key={f.label} label={f.label} value={f.value} onChange={f.onChange} items={f.items} />)}
            </div>
            <div className="cf-sheet__ft">
              <button type="button" className="cf-sheet__clear" disabled={!applied} onClick={resetFilters}>Clear all</button>
              <Button fullWidth onClick={closeSheet}>{count === 0 ? `No ${noun[1]}` : `Show ${count} ${count === 1 ? noun[0] : noun[1]}`}</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
