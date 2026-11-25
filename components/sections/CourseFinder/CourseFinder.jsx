'use client';
/* The course finder (/courses). Layout from the Figma "Courses page – final style – 1440" (node 203:6519): a left-aligned title block,
   then two columns: the courses in groups (a mode filter on top, each group a heading, one line and a three-across card grid) and a
   sticky category list with a help card; a closing "Ready to start" block with two paths. Look: this site's own (ground, type, tab bar,
   buttons). `#cat=<family or group>` opens a group. Data: courses.json (slimmed from the finder's CF_DATA); banners in
   public/assets/img/courses. Styles: public/css/course-finder.css. */
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import CarouselDots from '@/components/ui/CarouselDots';
import Button from '@/components/ui/Button';
import Cover from './Cover';
import DATA from './courses.json';

const GROUPS = [
  { id: 'gs', label: 'GS Foundation', fams: ['gs-11', 'gs-2yr'], sub: 'The whole General Studies syllabus for Prelims and Mains, over 11 months or 2 years.' },
  { id: 'csat-interview', label: 'CSAT & Interview', fams: ['csat', 'interview'], sub: 'Prelims Paper II practice, and mock boards for the 275-mark personality test.' },
  { id: 'mentorship', label: 'Mentorship', fams: ['mentorship'], sub: 'A personal mentor shapes your strategy and keeps your plan on track, week by week.' },
  { id: 'mains-ts', label: 'Mains Test Series', fams: ['mains-ts'], sub: 'Write to time, then read what an evaluator would change. English and Hindi.' },
  { id: 'prelims-ts', label: 'Prelims Test Series', fams: ['prelims-ts'], sub: 'Full-length tests with the reasoning behind every answer, plus current affairs.' },
  { id: 'module', label: 'Module Courses', fams: ['module'], sub: 'Short modules on one part of the syllabus: Economics, Ethics and SMART current affairs.' },
  { id: 'optional', label: 'Optional Subject Programme', fams: ['optional'], sub: 'Two papers, 500 marks, taught by a specialist in your optional subject.' },
  { id: 'optional-ts', label: 'Optional Test Series', fams: ['optional-ts'], sub: 'Answer writing for your optional, evaluated paper by paper.' },
  { id: 'crash', label: 'Crash Course & Enrichment', fams: ['crash', 'enrichment'], sub: 'Short, intensive optional courses, and answer-writing programmes for sharper answers.' },
  { id: 'ifos-postal', label: 'IFoS & Postal', fams: ['ifos', 'postal'], sub: 'Forestry and Geology for the Indian Forest Service, and printed study material by post.' },
];
const groupOf = key => GROUPS.find(g => g.id === key || g.fams.includes(key));
const MODES = [{ id: 'all', label: 'All courses' }, { id: 'classroom', label: 'Classroom' }, { id: 'online', label: 'LIVE-Online' }];
const MEDIUMS = [{ id: 'all', label: 'All mediums' }, { id: 'en', label: 'English' }, { id: 'hi', label: 'हिंदी' }];

/* A dropdown filter: a button that opens a listbox (arrows, Home/End, Enter, Esc, outside click). */
function Dropdown({ label, value, onChange, items }) {
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

/* One choice group in the filter sheet: a row of radio pills. */
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

const modeText = k => (k === 'classroom' ? 'Classroom' : k === 'online' ? 'LIVE-Online' : 'Classroom & LIVE-Online');
const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
const MON3 = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// the batch's start, as the original finder showed it: the next date the course gives ("Batch starts"), or its last once all have
// passed ("Batch started"); nothing to read, "To be announced". Before mount (now unknown) the first date is shown.
const startInfo = (raw, now) => {
  const ds = [...String(raw || '').matchAll(/(\d{1,2})(?:st|nd|rd|th)?\s+([A-Za-z]+),?\s+(\d{4})/g)]
    .map(m => { const mo = MONTHS.indexOf(m[2].toLowerCase()); return mo < 0 ? null : new Date(+m[3], mo, +m[1]); }).filter(Boolean);
  if (!ds.length) return { label: 'Batch starts', val: 'To be announced' };
  const next = now == null ? ds[0] : ds.filter(d => d >= now).sort((a, b) => a - b)[0];
  const d = next || ds[ds.length - 1];
  return { label: next ? 'Batch starts' : 'Batch started', val: `${d.getDate()} ${MON3[d.getMonth()]} ${d.getFullYear()}` };
};
// a duration as written on the course page, tidied ("16th November to 11th December" -> "16 Nov – 11 Dec")
const durText = d => String(d || '').trim().replace(/\b0(\d)\b/g, '$1').replace(/(\d)(?:st|nd|rd|th)\b/g, '$1')
  .replace(/\b(january|february|march|april|may|june|july|august|september|october|november|december)\b/gi, m => MON3[MONTHS.indexOf(m.toLowerCase())]).replace(/\s+to\s+/gi, ' – ');
const timeText = t => { const x = String(t || '').replace(/\(.*$/, '').trim(); return /announc/i.test(x) ? 'Timing to be announced' : x.replace(/\b0(\d):/g, '$1:').replace(/\s+/g, ' '); };

// the card's small icons (Iconoir, as in the original finder)
const Ico = ({ d }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d.map(x => <path key={x} d={x} />)}</svg>
);
const I_DUR = ['M12 12C15.866 12 19 8.86599 19 5H5C5 8.86599 8.13401 12 12 12ZM12 12C15.866 12 19 15.134 19 19H5C5 15.134 8.13401 12 12 12Z', 'M5 2L12 2L19 2', 'M5 22H12L19 22'];
const I_TIME = ['M12 6L12 12L18 12', 'M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'];
const I_ROOM = ['M22 4.6V17.4C22 17.7314 21.7314 18 21.4 18H2.6C2.26863 18 2 17.7314 2 17.4V4.6C2 4.26863 2.26863 4 2.6 4H21.4C21.7314 4 22 4.26863 22 4.6Z', 'M8.5 21.5L12 18L15.5 21.5', 'M12 2V4', 'M9 12V14', 'M12 10V14', 'M15 8V14'];
const I_LIVE = ['M15 12V16.4C15 16.7314 14.7314 17 14.4 17H3.6C3.26863 17 3 16.7314 3 16.4V7.6C3 7.26863 3.26863 7 3.6 7H14.4C14.7314 7 15 7.26863 15 7.6V12ZM15 12L20.0159 7.82009C20.4067 7.49443 21 7.77232 21 8.28103V15.719C21 16.2277 20.4067 16.5056 20.0159 16.1799L15 12Z'];
const I_FEE = ['M2 7.6C2 6.7 2.7 6 3.6 6H20.4C21.3 6 22 6.7 22 7.6V16.4C22 17.3 21.3 18 20.4 18H3.6C2.7 18 2 17.3 2 16.4V7.6Z', 'M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z', 'M5.5 9.5V14.5', 'M18.5 9.5V14.5'];

/* Handpicked highlights, shown as ordinary course cards. */
const FEATURED = ['courses-upsc-gs-course', 'courses-upsc-gs-online-course', 'courses-prelims-test-series-powerup', 'courses-prelims-test-series-camp',
  'courses-upsc-module-courses-prelims-current-affairs-programme', 'courses-upsc-module-courses-current-affairs-course'];

function Card({ it, now }) {
  return (
    <article className="cf-card">
      <a className="cf-card__a" href={it.u} target="_blank" rel="noopener" tabIndex={-1} aria-hidden="true" />
      <span className="cf-card__pic"><Cover it={it} /></span>
      <div className="cf-card__body">
        <h3 className="cf-card__t">{it.t}</h3>
        <ul className="cf-card__facts">
          {it.dur && <li><Ico d={I_DUR} /><span>{durText(it.dur)}</span></li>}
          {it.time && <li><Ico d={I_TIME} /><span>{timeText(it.time)}</span></li>}
          <li><Ico d={it.k === 'online' ? I_LIVE : I_ROOM} /><span>{modeText(it.k)}</span></li>
          {it.fee && <li><Ico d={I_FEE} /><span>{it.fee} incl. GST</span></li>}
        </ul>
      </div>
      <div className="cf-card__ft">
        <div className="cf-card__start">
          <span><small>{startInfo(it.start, now).label}</small><b>{startInfo(it.start, now).val}</b></span>
        </div>
        <Button className="cf-card__go" href={it.u} target="_blank" variant="outline" size="sm" iconEnd="arrow" aria-label={`View course: ${it.t}`}>View course</Button>
      </div>
    </article>
  );
}

/* A category's cards: a grid, and on phones a sideways swipe row with its own dot indicator (at most 7 dots; a long category maps onto them). */
const SHOWN = 3;
const TABS = [['all', 'All'], ['new', 'New'], ['upcoming', 'Upcoming']];
// Every course is in exactly one: Upcoming when a batch date is still ahead, otherwise New (already running, or no date yet).
const status = (raw, now) => {
  if (now == null) return '';
  const ds = [...String(raw || '').matchAll(/(\d{1,2})(?:st|nd|rd|th)?\s+([A-Za-z]+),?\s+(\d{4})/g)]
    .map(m => { const mo = MONTHS.indexOf(m[2].toLowerCase()); return mo < 0 ? null : new Date(+m[3], mo, +m[1]); }).filter(Boolean);
  return ds.some(d => d >= now) ? 'upcoming' : 'new';
};
const CardRail = memo(function CardRail({ items: every, now }) {
  const [tab, setTab] = useState('all');
  const all = tab === 'all' ? every : every.filter(it => status(it.start, now) === tab);
  const cnt = k => k === 'all' ? every.length : every.filter(it => status(it.start, now) === k).length;
  const tr = useRef(null);
  const [pos, setPos] = useState({ i: 0 });
  const [more, setMore] = useState(false);
  const [phone, setPhone] = useState(false);
  useEffect(() => {
    const mq = matchMedia('(max-width: 560px)');
    const on = () => setPhone(mq.matches);
    on(); mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  const items = more || phone ? all : all.slice(0, SHOWN);
  const n = items.length;
  const dots = Math.min(n, 7);
  const upd = () => {
    const el = tr.current;
    if (!el) return;
    const kids = el.children, step = kids.length > 1 ? kids[1].offsetLeft - kids[0].offsetLeft : el.clientWidth;
    const max = el.scrollWidth - el.clientWidth;
    const card = el.scrollLeft >= max - 2 ? n - 1 : Math.min(n - 1, Math.max(0, Math.round(el.scrollLeft / (step || 1))));
    setPos({ i: n > 1 ? Math.round(card / (n - 1) * (dots - 1)) : 0 });
  };
  const go = d => {
    const el = tr.current;
    if (!el || n < 2) return;
    const kids = el.children, step = kids[1].offsetLeft - kids[0].offsetLeft;
    const card = Math.round(d / (dots - 1) * (n - 1));
    el.scrollTo({ left: card * step, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };
  useEffect(() => { if (tr.current) tr.current.scrollLeft = 0; upd(); }, [n, tab]);
  return (
    <div className="cf-rail">
      <div className="cf-tabs" role="group" aria-label="Filter courses">
        {TABS.map(([k, label]) => (
          <button key={k} type="button" className="cf-tab" aria-pressed={tab === k} disabled={k !== 'all' && cnt(k) === 0}
            onClick={() => { setTab(k); setMore(false); }}>{label}<small>{cnt(k)}</small></button>
        ))}
      </div>
      <div className="cf-grid" ref={tr} onScroll={upd}>
        {items.map(it => <Card key={it.id} it={it} now={now} />)}
      </div>
      {all.length > SHOWN && !phone && (
        <div className="cf-more">
          <Button variant="ghost" size="sm" iconEnd="chevron" aria-expanded={more} onClick={() => setMore(m => !m)}>{more ? 'Show fewer' : `See all ${all.length} courses`}</Button>
        </div>
      )}
      {dots > 1 && <div className="cf-rail__dots"><CarouselDots tone="light" label="Scroll courses" labels={Array.from({ length: dots }, (_, k) => `Show courses, position ${k + 1} of ${dots}`)} active={pos.i} onSelect={go} /></div>}
    </div>
  );
});

export default function CourseFinder() {
  const [mode, setMode] = useState('all');
  const [medium, setMedium] = useState('all');
  const [query, setQuery] = useState('');
  const [sheet, setSheet] = useState(false);
  const fbtn = useRef(null);
  const sentinel = useRef(null);
  const row = useRef(null);
  const [arw, setArw] = useState({ prev: false, next: true, n: 1, i: 0 });
  const [active, setActive] = useState(GROUPS[0].id);
  const [now, setNow] = useState(null);   // set after mount: the batch start shown is the next date still ahead
  const reduce = useRef(false);

  const terms = useMemo(() => query.toLowerCase().split(/\s+/).filter(Boolean), [query]);

  const featured = useMemo(() => FEATURED.map(id => DATA.items.find(i => i.id === id)).filter(Boolean), []);
  const filtering = mode !== 'all' || medium !== 'all' || terms.length > 0;

  // a page = the whole cards that fit the row (the row's padding, kept for the cards' hover room, does not count), so every move lands on a card
  const metrics = tr => {
    const cs = getComputedStyle(tr);
    const gap = parseFloat(cs.columnGap) || 0;
    const pad = (parseFloat(cs.paddingLeft) || 0) + (parseFloat(cs.paddingRight) || 0);
    const card = tr.firstElementChild?.getBoundingClientRect().width || tr.clientWidth;
    const step = card + gap;
    const per = Math.max(1, Math.floor((tr.clientWidth - pad + gap + 1) / step));
    return { page: per * step, n: Math.max(1, Math.ceil(tr.children.length / per)), max: tr.scrollWidth - tr.clientWidth };
  };
  const arrows = () => {
    const tr = row.current;
    if (!tr) return;
    const { page, n, max } = metrics(tr);
    const i = tr.scrollLeft >= max - 2 ? n - 1 : Math.min(n - 1, Math.max(0, Math.round(tr.scrollLeft / page)));
    setArw({ prev: tr.scrollLeft > 2, next: tr.scrollLeft < max - 2, n, i });
  };
  const slide = dir => {
    const tr = row.current;
    if (tr) tr.scrollBy({ left: dir * metrics(tr).page, behavior: reduce.current ? 'auto' : 'smooth' });
  };
  const goPage = i => {
    const tr = row.current;
    if (tr) tr.scrollTo({ left: i * metrics(tr).page, behavior: reduce.current ? 'auto' : 'smooth' });
  };
  useEffect(() => {
    arrows();
    window.addEventListener('resize', arrows);
    return () => window.removeEventListener('resize', arrows);
  }, [filtering]);

  const topics = useRef(null);
  // as the page scrolls, the category list scrolls inside itself to keep the current category in view
  useEffect(() => {
    const list = topics.current;
    const cur = list?.querySelector('[aria-current="true"]');
    if (!list || !cur) return;
    const behavior = reduce.current ? 'auto' : 'smooth';
    if (matchMedia('(max-width: 1023px)').matches) {   // the pills are a row there: scroll sideways to the current one
      const edge = 24, l = cur.offsetLeft, r = l + cur.offsetWidth;
      if (list.scrollWidth > list.clientWidth + 1 && (l - edge < list.scrollLeft || r + edge > list.scrollLeft + list.clientWidth)) list.scrollTo({ left: Math.max(0, l - (list.clientWidth - cur.offsetWidth) / 2), behavior });
      return;
    }
    if (list.scrollHeight <= list.clientHeight + 1) return;
    const want = cur.offsetTop - (list.clientHeight - cur.offsetHeight) / 2;
    list.scrollTo({ top: Math.max(0, want), behavior });
  }, [active]);

  const groups = useMemo(() => GROUPS.map(g => ({
    ...g,
    items: DATA.items.filter(it => g.fams.includes(it.f) && (mode === 'all' || it.k === mode || it.k === 'both') && (medium === 'all' || it.l === medium) && terms.every(w => it.t.toLowerCase().includes(w))),
  })).filter(g => g.items.length > 0), [mode, medium, terms]);

  const count = groups.reduce((n, g) => n + g.items.length, 0);
  const applied = (mode !== 'all') + (medium !== 'all');
  const clearAll = () => { setMode('all'); setMedium('all'); setQuery(''); };
  const closeSheet = () => { setSheet(false); fbtn.current?.focus(); };

  useEffect(() => {   // the bottom sheet: Esc closes it, Tab stays inside it, the page behind does not scroll
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

  const scrollTo = (id, smooth = true) => {
    const el = document.getElementById(`cat-${id}`);
    if (el) el.scrollIntoView({ behavior: smooth && !reduce.current ? 'smooth' : 'auto', block: 'start' });
  };
  const pick = id => { setActive(id); try { history.replaceState(null, '', `#cat=${id}`); } catch {} scrollTo(id); };

  useEffect(() => {   // the filter bar is 'stuck' once its resting place has scrolled up under the header
    const el = sentinel.current;
    if (!el) return;
    const top = parseFloat(getComputedStyle(el).getPropertyValue('--cf-top')) || 92;
    const bar = el.nextElementSibling;
    const page = el.closest('.course-page') || bar;   // --stick lives on the page wrapper: the filter bar's cover and the pills row's shadow both read it
    const ramp = 140;   // the cream behind the header fills in over this much scroll, so it follows the finger instead of fading on a timer
    let raf = 0;
    const tick = () => {
      raf = 0;
      const d = el.getBoundingClientRect().top - top;
      page?.style.setProperty('--stick', Math.min(1, Math.max(0, 1 - d / ramp)).toFixed(3));
      bar?.toggleAttribute('data-stuck', d <= 0);   // set on the node, not in React state: a re-render of the 100 cards at the moment of sticking is what made it catch
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); if (raf) cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    reduce.current = matchMedia('(prefers-reduced-motion: reduce)').matches;
    setNow(new Date().setHours(0, 0, 0, 0));
    const m = location.hash.match(/^#cat=([\w-]+)/);
    const g = m && groupOf(m[1]);
    if (g) { setActive(g.id); setTimeout(() => scrollTo(g.id, false), 0); }
  }, []);

  // the category list follows the group being read
  useEffect(() => {
    const secs = [...document.querySelectorAll('.cf-group')];
    if (!secs.length || !('IntersectionObserver' in window)) return undefined;
    const seen = new Set();
    const io = new IntersectionObserver(es => {
      es.forEach(e => (e.isIntersecting ? seen.add(e.target.id) : seen.delete(e.target.id)));
      const first = secs.find(s => seen.has(s.id));
      if (first) setActive(first.id.slice(4));
    }, { rootMargin: '-25% 0px -60% 0px' });
    secs.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, [groups]);

  const featBlock = !filtering && featured.length > 0 && (
      <section className="cf-feat" aria-labelledby="cfFeatH">
        <h2 id="cfFeatH" className="cf-feat__t">Our featured courses</h2>
        <div className="cf-feat__car">
          <div className="cf-feat__grid" ref={row} onScroll={arrows} tabIndex={0} role="region" aria-label="Featured courses">
            {featured.map(it => <Card key={it.id} it={it} now={now} />)}
          </div>
          <Button variant="outline" size="sm" iconOnly iconStart="arrow-left" label="Previous featured courses" className="cf-arw cf-arw--prev" hidden={!arw.prev} onClick={() => slide(-1)} />
          <Button variant="outline" size="sm" iconOnly iconStart="arrow" label="Next featured courses" className="cf-arw cf-arw--next" hidden={!arw.next} onClick={() => slide(1)} />
        </div>
        {arw.n > 1 && <div className="cf-feat__dots"><CarouselDots tone="hero" label="Choose featured courses" labels={Array.from({ length: arw.n }, (_, k) => `Show featured courses ${k + 1}`)} active={arw.i} onSelect={goPage} /></div>}
      </section>
  );

  return (
    <>
      <section className="cf-hero" aria-labelledby="cfH">
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false"><filter id="cfMaroon" colorInterpolationFilters="sRGB"><feColorMatrix type="matrix" values=".0816 .2746 .0277 0 .616  .1526 .5135 .0518 0 .282  .1367 .4599 .0464 0 .357  0 0 0 1 0" /></filter></svg>
        <span className="cf-hero__bg cf-hero__bg--l" aria-hidden="true"></span>
        <span className="cf-hero__bg" aria-hidden="true"></span>
        <div className="cf-hero__in">
          <nav className="cf-crumb rv" aria-label="Breadcrumb" style={{ '--d': '.02s' }}>
            <a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">Courses</span>
          </nav>
          <h1 id="cfH" className="cf-h rv" style={{ '--d': '.1s' }}>Find your UPSC course</h1>
          <p className="cf-lede rv" style={{ '--d': '.18s' }}>Prelims to Interview. Classroom and LIVE-Online programmes, in English and <span lang="hi">हिंदी</span>.</p>
        </div>
      </section>

      <div ref={sentinel} className="cf-bar-sentinel" aria-hidden="true" />
      <div className="cf-bar">
        <div className="cf-bar__in">
          <form className="cf-search" role="search" onSubmit={e => e.preventDefault()}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
            <input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search courses" aria-label="Search courses" autoComplete="off" />
            {query && <button type="button" className="cf-search__x" aria-label="Clear search" onClick={() => setQuery('')}>×</button>}
          </form>
          <Dropdown label="Mode" value={mode} onChange={setMode} items={MODES} />
          <Dropdown label="Medium" value={medium} onChange={setMedium} items={MEDIUMS} />
          {filtering && <button type="button" className="cf-clear" onClick={clearAll}>Clear filters</button>}
          <button type="button" ref={fbtn} className="cf-fbtn" aria-label={applied ? `Filters, ${applied} applied` : 'Filters'} aria-haspopup="dialog" aria-expanded={sheet} onClick={() => setSheet(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M4 7h10M18 7h2M4 17h2M10 17h10" /><circle cx="16" cy="7" r="2" /><circle cx="8" cy="17" r="2" /></svg>
            {applied > 0 && <span className="cf-fbtn__n" aria-hidden="true">{applied}</span>}
          </button>
        </div>
      </div>

      <section className="cf-cols" aria-label="Course catalogue">
        <div className="cf-main">
          {featBlock}
          <div id="cfGroups">
            {groups.map(g => (
              <section key={g.id} id={`cat-${g.id}`} className="cf-group" aria-labelledby={`cfg-${g.id}`}>
                <header className="cf-group__head">
                  <h2 id={`cfg-${g.id}`} className="cf-group__t">{g.label}</h2>
                  <p className="cf-group__sub">{g.sub}</p>
                </header>
                <CardRail items={g.items} now={now} />
              </section>
            ))}
            {groups.length === 0 && <p className="cf-none">No courses match your search or filters. <button type="button" className="cf-clear" onClick={clearAll}>Clear filters</button></p>}
          </div>
        </div>

        <aside className="cf-side rv" aria-label="Categories" style={{ '--d': '.2s' }}>
          <p className="cf-side__k">Categories</p>
          <ul className="cf-side__list" data-lenis-prevent ref={topics}>
            {groups.map(g => (
              <li key={g.id}>
                <a href={`#cat=${g.id}`} className="cf-topic" aria-current={active === g.id ? 'true' : undefined}
                  onClick={e => { e.preventDefault(); pick(g.id); }}>
                  <span>{g.label}</span><b>{g.items.length}</b>
                </a>
              </li>
            ))}
          </ul>
          <div className="cf-help">
            <p className="cf-help__k">Talk to us</p>
            <p className="cf-help__t">Not sure which course fits?</p>
            <p className="cf-help__p">Get a free session with our expert counsellor to guide you.</p>
            <Button href="/#contact" iconEnd="arrow" fullWidth>Talk to a counsellor</Button>
          </div>
        </aside>
      </section>
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
              <Choice label="Mode" value={mode} onChange={setMode} items={MODES} />
              <Choice label="Medium" value={medium} onChange={setMedium} items={MEDIUMS} />
            </div>
            <div className="cf-sheet__ft">
              <button type="button" className="cf-sheet__clear" disabled={!applied} onClick={() => { setMode('all'); setMedium('all'); }}>Clear all</button>
              <Button fullWidth onClick={closeSheet}>{count === 0 ? 'No courses' : `Show ${count} ${count === 1 ? 'course' : 'courses'}`}</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
