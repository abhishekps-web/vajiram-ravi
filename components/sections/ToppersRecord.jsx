import Button from '@/components/ui/Button';
import { setButtonLabel } from '@/components/ui/Button';
import { createProgressBar, runProgressBar, pauseProgressBar, resumeProgressBar, resetProgressBar } from '@/components/ui/ProgressBar/progress-bar-core';
import Tabs, { initTabs } from '@/components/ui/Tabs';
import { $, $$, reduce } from '@/lib/site';
import '@/app/tailwind-sections.css';
import { NP_ARCHIVE, TOPPERS } from './toppers-data';

const LATEST = NP_ARCHIVE.ARCHIVE_YEARS[0];
const tidyProg = p => p.replace(/^&\s*/, '').trim()
  .replace(/^IGP$/i, 'Interview Guidance Programme').replace(/\bIGP\b/g, 'Interview Guidance Programme')
  .replace(/Interview Guidance Program\b/gi, 'Interview Guidance Programme').replace(/Prelims Cum Mains/g, 'Prelims-cum-Mains');
const prog = s => {
  const P = (s || '').split(/,(?![^(]*\))|\s&\s/).map(tidyProg).filter(Boolean);
  return P.slice(0, 2).join(' · ') + (P.length > 2 ? ` +${P.length - 2} more` : '');
};
const PROG = new Map(TOPPERS.filter(p => p.c).map(p => [`${p.y}-${p.r}`, p.c]));
const PLACEHOLDER = '/assets/img/toppers/portrait/placeholder-man-pad.webp';
const RECORD = NP_ARCHIVE.ARCHIVE_YEARS.filter(y => y < LATEST).map(y => ({
  y,
  people: [...NP_ARCHIVE.ARCHIVE[y]].sort((a, b) => a.rank - b.rank).map(p => ({ r: p.rank, n: p.name, c: prog(p.programmes || PROG.get(`${y}-${p.rank}`)), src: PLACEHOLDER })),
}));
const FIRST = RECORD[0].people[0];
const isCutout = src => src.includes('/portrait/2025/') || src.includes('/portrait/placeholder');
const isPlaceholder = src => src.includes('/portrait/placeholder');

const RECORD_BOX = [
  'cu:relative cu:max-w-(--site-w) cu:mx-auto cu:px-[40px] cu:max-[600px]:px-[20px]',
  'cu:text-(--ink)',
].join(' ');

const ROW = [
  'tp-row cu:group cu:relative cu:cursor-pointer cu:focus-visible:[outline:2px_solid_var(--brand)] cu:focus-visible:[outline-offset:-2px] cu:flex cu:items-center cu:gap-[12px] cu:w-full cu:py-[10px] cu:px-[14px] cu:max-[900px]:px-[10px]',
  'cu:rounded-[10px] cu:text-left cu:text-(--ink)',
  'cu:transition-[background-color] cu:duration-200 cu:fine:hover:bg-[#F7F0E6]',
  'cu:motion-reduce:transition-none',
].join(' ');

const LUCIDE_X = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export default function ToppersRecord() {
  return (
    <div className="tp-record rv cu:mt-(--hd-gap) cu:mb-0 cu:px-(--px) cu:text-left cu:text-(--ink)">
      <div className={RECORD_BOX}>
        <div className="cu:flex cu:flex-col cu:items-center cu:text-center cu:gap-(--hd-in)">
          <div className="cu:min-w-0">
            <h3 className="cu:m-0 cu:[font-family:var(--f-title)] cu:font-normal cu:text-[clamp(12px,3.3vw,44px)] cu:whitespace-nowrap cu:max-[640px]:whitespace-normal cu:max-[640px]:text-[clamp(26px,7.4vw,32px)] cu:max-[640px]:text-balance cu:leading-[1.1] cu:max-[640px]:leading-[1.15] cu:tracking-[-.02em] cu:text-(--ink)">For a decade, we’ve been shaping India’s civil servants.</h3>
          </div>
          <Tabs className="tp-yrs cu:self-center" label="Year of the examination" controls="tpList" items={RECORD.map(g => ({ id: String(g.y), label: g.y }))} />
        </div>
        <div className="tp-frame cu:relative cu:mt-(--hd-in) cu:p-[clamp(32px,3.2vw,46px)] cu:pt-[clamp(14px,1.6vw,22px)] cu:rounded-(--r-form) cu:before:absolute cu:before:inset-[12px] cu:before:top-[calc(clamp(14px,1.6vw,22px)+46px)] cu:before:pointer-events-none cu:before:border-2 cu:before:border-t-0 cu:before:border-solid cu:before:border-[rgba(194,65,12,.55)] cu:before:[mask-image:linear-gradient(180deg,transparent,#000_45%)]">
          <p className="dr__h"><span data-year-head>{`${RECORD[0].people.length} Ranks, UPSC CSE ${RECORD[0].y}`}</span></p>
          <div className="cu:grid cu:grid-cols-[minmax(0,1fr)_minmax(0,300px)] cu:max-[1100px]:grid-cols-[minmax(0,1fr)_minmax(0,270px)] cu:max-[900px]:grid-cols-1 cu:gap-[clamp(20px,3vw,40px)] cu:items-start cu:mt-(--hd-lbl) cu:[--col:406px]">
            <div id="tpList" data-lenis-prevent className="tp-list cu:max-h-(--col) cu:overflow-y-auto cu:-ml-[6px] cu:pl-[6px] cu:pr-[10px] cu:[mask-image:linear-gradient(180deg,#000_90%,transparent)]">
              {RECORD.map((g, gi) => (
                <ul key={g.y} data-y={g.y} hidden={gi !== 0} className="cu:m-0 cu:p-0 cu:list-none cu:grid cu:gap-0">
                  {g.people.map(p => (
                    <li key={p.r + p.n} className="cu:[border-bottom:1px_solid_rgba(120,80,40,.16)] cu:last:[border-bottom:0]">
                      <div className={ROW} role="button" tabIndex={0} data-src={p.src} data-n={p.n} data-r={p.r} data-c={p.c || `UPSC CSE ${g.y}`}>
                        <img src={p.src} alt="" width="40" height="40" loading="lazy" decoding="async" className="cu:hidden cu:max-[900px]:block cu:shrink-0 cu:size-[40px] cu:rounded-full cu:object-cover cu:object-top cu:bg-[#F4EDE3] cu:[box-shadow:0_0_0_2px_rgba(194,65,12,.35)]" />
                        <span className="tab__n tp-badge cu:shrink-0 cu:whitespace-nowrap cu:min-w-[68px] cu:text-center" aria-label={`All India Rank ${p.r}`}>AIR {p.r}</span>
                        <b className="cu:block cu:min-w-0 cu:[font:600_clamp(16px,1.3vw,18px)/1.3_var(--f)] cu:text-(--ink)">{p.n}</b>
                      </div>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
            <div className="tp-more-wrap"><Button variant="link" iconEnd="chevron" data-more aria-expanded="false" hidden>Show all names</Button></div>
            <div className="tp-pane cu:order-first cu:[--shield:min(350px,calc((var(--col)-150px)*.88))] cu:max-[1100px]:[--shield:min(290px,calc((var(--col)-150px)*.88))] cu:sticky cu:top-[calc(var(--hdr-h)+16px)] cu:h-(--col) cu:flex cu:items-center cu:justify-center cu:gap-[clamp(20px,2.4vw,36px)] cu:text-left cu:text-(--ink) cu:max-[900px]:hidden" aria-live="polite">
              <div className="dr__fig cu:mt-[28px]" style={{ '--dw': 'var(--shield)', '--dh': 'calc(var(--shield) * 1.24089)' }}>
                <span className="tp-laurel" aria-hidden="true" />
                <span className="dr__gem" aria-hidden="true" />
                <span className="dr__pic">
                  <img data-shot src={FIRST.src} alt={FIRST.n} loading="lazy" decoding="async" className={`tp-shot${isPlaceholder(FIRST.src) ? ' is-pad' : isCutout(FIRST.src) ? '' : ' is-boxed'}`} />
                  <img data-shot-back src={FIRST.src} alt="" aria-hidden="true" loading="lazy" decoding="async" className="tp-shot is-back" />
                </span>
              </div>
              <div data-meta className="tp-meta cu:flex cu:flex-col cu:items-start cu:flex-none cu:w-[230px] cu:h-[190px] cu:justify-start">
                <p className="dr__n" aria-hidden="true"><small>AIR</small> <span data-rank>{FIRST.r}</span></p>
                <h4 data-name className="dr__name">{FIRST.n}</h4>
                <p data-cap className="dr__prog">{FIRST.c || `UPSC CSE ${RECORD[0].y}`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="tp-sheet" data-sheet hidden>
        <div className="tp-sheet__scrim" data-sheet-close />
        <div className="tp-sheet__panel" role="dialog" aria-modal="true" aria-label="Topper details" data-lenis-prevent>
          <Button variant="ghost" size="sm" iconOnly iconStart={LUCIDE_X} label="Close" className="tp-sheet__x" data-sheet-close />
          <div className="tp-pane tp-sheet__body">
            <div className="dr__fig" style={{ '--dw': 'min(210px, 54vw)', '--dh': 'calc(min(210px, 54vw) * 1.24089)' }}>
              <span className="tp-laurel" aria-hidden="true" />
              <span className="dr__gem" aria-hidden="true" />
              <span className="dr__pic"><img data-s-shot src={FIRST.src} alt="" className="tp-shot" decoding="async" /></span>
            </div>
            <div className="tp-meta tp-sheet__meta">
              <p className="dr__n" aria-hidden="true"><small>AIR</small> <span data-s-rank>{FIRST.r}</span></p>
              <h4 data-s-name className="dr__name">{FIRST.n}</h4>
              <p data-s-cap className="dr__prog">{FIRST.c || `UPSC CSE ${RECORD[0].y}`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function initToppersRecord() {
  const rec = $('#toppers .tp-record');
  if (!rec) return;
  const list = $('.tp-list', rec), pane = $('.tp-pane', rec);
  const name = $('[data-name]', pane), cap = $('[data-cap]', pane), rank = $('[data-rank]', pane), meta = $('[data-meta]', pane);
  let front = $('[data-shot]', pane), back = $('[data-shot-back]', pane);
  let cur = null, token = 0;
  const bar = createProgressBar({ className: 'tp-prog', track: true });
  const wait = ms => new Promise(r => setTimeout(r, reduce ? 0 : ms));
  const preload = src => { const img = new Image(); img.src = src; return img.decode ? img.decode().catch(() => {}) : new Promise(r => { img.onload = img.onerror = r; }); };
  const show = (row, instant) => {
    if (!row || row === cur) return;
    if (cur) cur.removeAttribute('aria-current');
    cur = row; row.setAttribute('aria-current', 'true'); row.appendChild(bar);
    const mine = ++token, src = row.dataset.src;
    const text = () => { name.textContent = row.dataset.n; cap.textContent = row.dataset.c; rank.textContent = row.dataset.r; };
    if (instant) { text(); return; }
    meta.classList.add('is-swap');
    const photo = front.getAttribute('src') === src ? Promise.resolve() : preload(src);
    Promise.all([photo, wait(220)]).then(() => {
      if (mine !== token) return;
      text();
      if (front.getAttribute('src') !== src) {
        back.src = src; back.alt = row.dataset.n; back.classList.toggle('is-boxed', !isCutout(src)); back.classList.toggle('is-pad', isPlaceholder(src));
        back.classList.remove('is-back'); front.classList.add('is-back');
        front.removeAttribute('alt'); [front, back] = [back, front];
      }
      meta.classList.remove('is-swap');
    });
  };
  const sheet = $('[data-sheet]', rec), phone = matchMedia('(max-width: 900px)');
  let sheetRow = null, sheetT = 0;
  if (sheet) {
    document.body.appendChild(sheet);
    const panel = $('.tp-sheet__panel', sheet), sShot = $('[data-s-shot]', sheet), sRank = $('[data-s-rank]', sheet), sName = $('[data-s-name]', sheet), sCap = $('[data-s-cap]', sheet);
    const closeSheet = () => {
      if (sheet.hidden) return;
      sheet.classList.remove('is-open'); document.documentElement.classList.remove('tp-sheet-open');
      clearTimeout(sheetT); sheetT = setTimeout(() => { sheet.hidden = true; panel.style.transform = ''; }, reduce ? 0 : 380);
      if (sheetRow) sheetRow.focus({ preventScroll: true });
    };
    const openSheet = row => {
      sheetRow = row; clearTimeout(sheetT);
      const src = row.dataset.src;
      sShot.src = src; sShot.alt = row.dataset.n;
      sShot.classList.toggle('is-boxed', !isCutout(src)); sShot.classList.toggle('is-pad', isPlaceholder(src));
      sRank.textContent = row.dataset.r; sName.textContent = row.dataset.n; sCap.textContent = row.dataset.c;
      sheet.hidden = false; void sheet.offsetWidth;
      sheet.classList.add('is-open'); document.documentElement.classList.add('tp-sheet-open');
      $('.tp-sheet__x', sheet).focus({ preventScroll: true });
    };
    sheet.addEventListener('click', e => { if (e.target.closest('[data-sheet-close]')) closeSheet(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !sheet.hidden) closeSheet(); });
    let drag = null;
    panel.addEventListener('pointerdown', e => { if (!e.target.closest('[data-sheet-grab], .tp-sheet__body')) return; if (panel.scrollTop > 0) return; drag = { id: e.pointerId, y: e.clientY, dy: 0 }; });
    panel.addEventListener('pointermove', e => {
      if (!drag || e.pointerId !== drag.id) return;
      drag.dy = Math.max(0, e.clientY - drag.y);
      if (drag.dy > 6) { panel.style.transition = 'none'; panel.style.transform = `translateY(${drag.dy}px)`; }
    });
    const endDrag = () => { if (!drag) return; const far = drag.dy > 90; drag = null; panel.style.transition = ''; if (far) closeSheet(); else panel.style.transform = ''; };
    panel.addEventListener('pointerup', endDrag); panel.addEventListener('pointercancel', endDrag);
    list.addEventListener('click', e => { const row = e.target.closest('.tp-row'); if (row && phone.matches) openSheet(row); });
    list.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && phone.matches) { const row = e.target.closest('.tp-row'); if (row) openSheet(row); } });
    phone.addEventListener('change', () => { if (!phone.matches) closeSheet(); });
  }
  list.addEventListener('click', e => show(e.target.closest('.tp-row')));
  list.addEventListener('keydown', e => { if (e.key !== 'Enter' && e.key !== ' ') return; const row = e.target.closest('.tp-row'); if (!row) return; e.preventDefault(); show(row); });
  show($('ul:not([hidden]) .tp-row', list), true);

  let held = false, visible = false, autoT = 0, startedAt = 0, left = 6000;
  const STEP = 6000;
  const step = () => {
    autoT = 0;
    if (!held && visible && !document.hidden && pane.offsetParent) {
      const rows = $$('ul:not([hidden]) .tp-row', list);
      const next = rows[(rows.indexOf(cur) + 1) % rows.length];
      if (next) {
        show(next);
        const lt = list.getBoundingClientRect(), rt = next.getBoundingClientRect();
        if (rt.top < lt.top || rt.bottom > lt.bottom) list.scrollTo({ top: list.scrollTop + rt.top - lt.top - 8, behavior: reduce ? 'auto' : 'smooth' });
      }
    }
    arm();
  };
  bar.style.setProperty('--pb-t', STEP + 'ms');
  const arm = () => {
    clearTimeout(autoT); autoT = 0;
    if (reduce) return;
    resetProgressBar(bar); void bar.offsetWidth;
    if (!visible || held) return;
    runProgressBar(bar);
    left = STEP; startedAt = performance.now();
    autoT = setTimeout(step, STEP);
  };
  const pauseView = () => {
    if (!autoT) return;
    left = Math.max(0, left - (performance.now() - startedAt));
    clearTimeout(autoT); autoT = 0;
    pauseProgressBar(bar);
  };
  const resumeView = () => {
    if (reduce || held || autoT) return;
    if (!bar.classList.contains('is-run')) { arm(); return; }
    resumeProgressBar(bar);
    startedAt = performance.now();
    autoT = setTimeout(step, left);
  };
  let focused = false;
  const sync = () => { if (focused === held) return; held = focused; if (held) pauseView(); else resumeView(); };
  rec.addEventListener('focusin', e => { focused = e.target.matches(':focus-visible'); sync(); });
  rec.addEventListener('focusout', e => { if (!rec.contains(e.relatedTarget)) { focused = false; sync(); } });
  list.addEventListener('click', arm);
  list.addEventListener('keydown', arm);
  if ('IntersectionObserver' in window) new IntersectionObserver(es => { const was = visible; visible = es[0].isIntersecting; if (visible && !was) resumeView(); else if (!visible) pauseView(); }, { threshold: .35 }).observe(rec); else { visible = true; arm(); }

  const yearHead = $('[data-year-head]', rec);
  const more = $('[data-more]', rec), LIMIT = 5;
  const syncMore = () => {
    const n = ($('ul:not([hidden])', list) || { children: [] }).children.length, clamped = list.classList.contains('is-clamped');
    more.hidden = n <= LIMIT;
    setButtonLabel(more, clamped ? `Show all ${n} names` : 'Show fewer');
    more.setAttribute('aria-expanded', String(!clamped));
  };
  list.classList.add('is-clamped');
  syncMore();
  more.addEventListener('click', () => {
    const open = list.classList.toggle('is-clamped') === false;
    syncMore();
    if (!open) $('.dr__h', rec).scrollIntoView({ block: 'start', behavior: reduce ? 'auto' : 'smooth' });
  });
  initTabs($('.tp-yrs', rec), { onSelect: id => {
    const group = $(`ul[data-y="${id}"]`, list);
    if (group) yearHead.textContent = `${group.children.length} Ranks, UPSC CSE ${id}`;
    const swap = () => {
      $$('ul[data-y]', list).forEach(u => { u.hidden = u.dataset.y !== id; });
      list.scrollTop = 0;
      list.classList.add('is-clamped');
      syncMore();
      cur = null;
      show($('ul:not([hidden]) .tp-row', list));
    };
    if (document.startViewTransition && !reduce && !matchMedia('(hover: none) and (pointer: coarse)').matches) document.startViewTransition(swap); else swap();
  } });
}

