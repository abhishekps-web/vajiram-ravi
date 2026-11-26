'use client';
/* The course finder (/courses). Layout from the Figma "Courses page – final style – 1440" (node 203:6519): a left-aligned title block,
   then two columns: the courses in groups (a mode filter on top, each group a heading, one line and a three-across card grid) and a
   sticky category list with a help card; a closing "Ready to start" block with two paths. Look: this site's own (ground, type, tab bar,
   buttons). `#cat=<family or group>` opens a group. Data: lib/data/course-finder.json (slimmed from the finder's CF_DATA); banners in
   public/assets/img/courses. Styles: public/css/course-finder.css. */
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import CarouselDots from '@/components/ui/carousel-dots';
import Button from '@/components/ui/button';
import FilterBar from '@/components/ui/filter-bar';
import DATA from '@/lib/data/course-finder.json';
import { GROUPS, MODES, MEDIUMS, FEATURED, FEATURED_START } from '@/lib/data/course-finder';
import Cover from './CourseFinder/Cover';

const groupOf = key => GROUPS.find(g => g.id === key || g.fams.includes(key));

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


function Card({ it, now, start }) {
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
          <span><small>{startInfo(start ?? it.start, now).label}</small><b>{startInfo(start ?? it.start, now).val}</b></span>
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
  const tabs = now == null ? [] : TABS.filter(([k]) => k === 'all' || cnt(k) > 0);   // a pill with no courses under it is not shown
  const tr = useRef(null);
  const [pos, setPos] = useState({ i: 0, stops: 0 });
  const [more, setMore] = useState(false);   // the grid is mounted
  const [open, setOpen] = useState(false);   // its extra cards are unfolded (a frame after mounting, so they animate)
  const timer = useRef(0);
  useEffect(() => () => clearTimeout(timer.current), []);
  const toggle = () => {
    clearTimeout(timer.current);
    if (!more) { setMore(true); requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true))); }
    else { setOpen(false); timer.current = setTimeout(() => setMore(false), 650); }
  };
  const [phone, setPhone] = useState(false);
  useEffect(() => {
    const mq = matchMedia('(max-width: 560px)');
    const on = () => setPhone(mq.matches);
    on(); mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  const items = all;
  const car = !more && all.length > SHOWN;   // collapsed: one swipe/arrow row of every course; "See all" opens them as a grid (phones always keep the row)
  const [edge, setEdge] = useState({ prev: false, next: true });
  const n = items.length;
  const dots = Math.min(pos.stops || n, 7);
  const perOf = (el, step, gap) => Math.max(1, Math.floor((el.clientWidth - 20 + gap + 1) / step));
  const upd = () => {
    const el = tr.current;
    if (!el) return;
    const kids = el.children, step = kids.length > 1 ? kids[1].offsetLeft - kids[0].offsetLeft : el.clientWidth;
    const max = el.scrollWidth - el.clientWidth;
    const stops = Math.max(1, n - perOf(el, step, step - (kids[0]?.getBoundingClientRect().width || 0)) + 1);   // the places the row can rest: one dot each (at most 7)
    const card = el.scrollLeft >= max - 2 ? stops - 1 : Math.min(stops - 1, Math.max(0, Math.round(el.scrollLeft / (step || 1))));
    const d = Math.min(stops, 7);
    setPos(q => { const i = stops > 1 ? Math.round(card / (stops - 1) * (d - 1)) : 0; return q.i === i && q.stops === stops ? q : { i, stops }; });
    setEdge(e => { const prev = el.scrollLeft > 2, next = el.scrollLeft < max - 2; return e.prev === prev && e.next === next ? e : { prev, next }; });
  };
  const slide = dir => {
    const el = tr.current;
    if (!el || el.children.length < 2) return;
    const kids = el.children, step = kids[1].offsetLeft - kids[0].offsetLeft, gap = step - kids[0].getBoundingClientRect().width;
    const per = Math.max(1, Math.floor((el.clientWidth - 20 + gap + 1) / step));
    el.scrollBy({ left: dir * per * step, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };
  const go = d => {
    const el = tr.current;
    if (!el || n < 2 || !pos.stops) return;
    const kids = el.children, step = kids[1].offsetLeft - kids[0].offsetLeft;
    const card = Math.round(d / (dots - 1) * (pos.stops - 1));
    el.scrollTo({ left: card * step, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };
  useEffect(() => { if (tr.current) tr.current.scrollLeft = 0; upd(); }, [n, tab, car]);
  return (
    <div className="cf-rail">
      {tabs.length > 1 && (
        <div className="cf-tabs" role="group" aria-label="Filter courses">
          {tabs.map(([k, label]) => (
            <button key={k} type="button" className="cf-tab" aria-pressed={tab === k}
              onClick={() => { clearTimeout(timer.current); setTab(k); setMore(false); setOpen(false); }}>{label}<small>{cnt(k)}</small></button>
          ))}
        </div>
      )}
      <div className="cf-rail__car">
        <div className={`cf-grid${car ? ' cf-grid--car' : ''}`} ref={tr} onScroll={upd}>
          {(more && !phone ? items.slice(0, SHOWN) : items).map(it => <Card key={it.id} it={it} now={now} />)}
        </div>
        {more && !phone && (
          <div className="cf-extra" data-open={open ? '' : undefined}>
            <div className="cf-extra__in"><div className="cf-grid">{items.slice(SHOWN).map(it => <Card key={it.id} it={it} now={now} />)}</div></div>
          </div>
        )}
        {car && !phone && <>
          <Button variant="outline" size="sm" iconOnly iconStart="arrow-left" label="Previous courses" className="cf-arw cf-arw--prev" hidden={!edge.prev} onClick={() => slide(-1)} />
          <Button variant="outline" size="sm" iconOnly iconStart="arrow" label="Next courses" className="cf-arw cf-arw--next" hidden={!edge.next} onClick={() => slide(1)} />
        </>}
      </div>
      {dots > 1 && phone && <div className="cf-rail__dots"><CarouselDots tone="light" label="Scroll courses" labels={Array.from({ length: dots }, (_, k) => `Show courses, position ${k + 1} of ${dots}`)} active={pos.i} onSelect={go} /></div>}
      {all.length > SHOWN && !phone && (
        <div className="cf-more">
          <Button variant="ghost" size="sm" iconEnd="chevron" aria-expanded={open} onClick={toggle}>{open ? 'Show fewer' : `See all ${all.length} courses`}</Button>
        </div>
      )}
    </div>
  );
});

export default function CourseFinder() {
  const [mode, setMode] = useState('all');
  const [medium, setMedium] = useState('all');
  const [query, setQuery] = useState('');
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
  const clearAll = () => { setMode('all'); setMedium('all'); setQuery(''); };

  const scrollTo = (id, smooth = true) => {
    const el = document.getElementById(`cat-${id}`);
    if (el) el.scrollIntoView({ behavior: smooth && !reduce.current ? 'smooth' : 'auto', block: 'start' });
  };
  const pick = id => { setActive(id); try { history.replaceState(null, '', `#cat=${id}`); } catch {} scrollTo(id); };

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
            {featured.map((it, k) => <Card key={it.id} it={it} now={now} start={FEATURED_START[k]} />)}
          </div>
          <Button variant="outline" size="sm" iconOnly iconStart="arrow-left" label="Previous featured courses" className="cf-arw cf-arw--prev" hidden={!arw.prev} onClick={() => slide(-1)} />
          <Button variant="outline" size="sm" iconOnly iconStart="arrow" label="Next featured courses" className="cf-arw cf-arw--next" hidden={!arw.next} onClick={() => slide(1)} />
        </div>
        {arw.n > 1 && <div className="cf-feat__dots"><CarouselDots tone="hero" label="Choose featured courses" labels={Array.from({ length: arw.n }, (_, k) => `Show featured courses ${k + 1}`)} active={arw.i} onSelect={goPage} /></div>}
      </section>
  );

  return (
    <>
      <FilterBar query={query} onQuery={setQuery} searchLabel="Search courses" count={count} noun={['course', 'courses']}
        filters={[{ label: 'Mode', value: mode, onChange: setMode, items: MODES }, { label: 'Medium', value: medium, onChange: setMedium, items: MEDIUMS }]} />

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
    </>
  );
}
