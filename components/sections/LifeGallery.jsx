import { photoSrcSet } from '@/lib/photo';
import SectionWrapper from '@/components/ui/section_wrapper';
import Button from '@/components/ui/Button';
import '@/app/tailwind-sections.css';
import Tabs, { initTabs } from '@/components/ui/Tabs';

const P = '/assets/img/photos';
export const LIFE = [
  { vid: true, poster: `${P}/footer-classroom.webp`, src: '', label: 'Video: a full classroom for an Indian Polity lecture', name: 'In the classroom', detail: 'Indian Polity lecture, Old Rajinder Nagar' },
  { img: `${P}/why-2-faculty.webp`, alt: 'A Vajiram & Ravi professor teaching a General Studies class', w: 1536, h: 1024, pos: '62% 30%', name: 'Our faculty', detail: 'Specialists for every General Studies paper' },
  { img: `${P}/campus-entrance.webp`, alt: 'The institute entrance with the Vajiram & Ravi sign', w: 900, h: 1600, pos: '50% 32%', name: 'The entrance', detail: 'Next to Gate 5, Karol Bagh Metro' },
  { img: `${P}/why-3-guidance.webp`, alt: 'A mentor going through a study plan with an aspirant', w: 1536, h: 1024, pos: '45% 40%', name: 'Mentoring', detail: 'A study plan, kept on track' },
  { img: `${P}/why-4-study-material.webp`, alt: 'Vajiram & Ravi study material, test series sheets and notes on a desk', w: 1536, h: 1024, name: 'Study material', detail: 'Notes and test series for every stage' },
  { vid: true, poster: `${P}/why-5-location-800.webp`, src: '', label: 'Video: aspirants walking in to the campus in Old Rajinder Nagar', name: 'Arriving for class', detail: 'Old Rajinder Nagar, New Delhi' },
  { img: `${P}/building-hd.webp`, alt: 'The Vajiram & Ravi building seen from the street', w: 2240, h: 1685, pos: '40% 50%', name: 'The building', detail: '1-B/7, Pusa Road' },
  { img: `${P}/why-6-classroom-online.webp`, alt: 'A Vajiram & Ravi classroom with the lecture streaming live to online students', w: 1536, h: 1024, pos: '50% 40%', name: 'Classroom + LIVE-Online', detail: 'The same teachers and the same tests' },
  { img: `${P}/campus-hd.webp`, alt: 'The Vajiram & Ravi campus gate and building at Old Rajinder Nagar', w: 2000, h: 1334, pos: '62% 50%', name: 'The campus', detail: 'Old Rajinder Nagar since 1976' },
];

const VIDEO_ICON = (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
    <path className="cu:[.is-playing_&]:hidden" d="M8 5.5v13l11-6.5z" fill="currentColor" />
    <g className="cu:hidden cu:[.is-playing_&]:inline" fill="currentColor"><rect x="6.5" y="5.5" width="4" height="13" rx="1" /><rect x="13.5" y="5.5" width="4" height="13" rx="1" /></g>
  </svg>
);

const ARROW = 'cu:absolute cu:top-[calc(var(--cpad)+var(--ch)/2-22px)] cu:z-4 cu:flex cu:opacity-0 cu:pointer-events-none cu:[transition:opacity_.3s_ease,translate_.35s_cubic-bezier(.22,1,.36,1)] cu:focus-within:opacity-100 cu:focus-within:pointer-events-auto cu:focus-within:[translate:0_0] cu:fine:group-hover/rail:opacity-100 cu:fine:group-hover/rail:pointer-events-auto cu:fine:group-hover/rail:[translate:0_0]';
const MEDIA = 'cu:block cu:size-full cu:object-cover cu:[filter:brightness(.92)] cu:[transition:transform_1.1s_cubic-bezier(.22,.8,.24,1),filter_.5s_ease] cu:motion-reduce:transition-none cu:fine:group-hover/slide:[transform:scale(1.03)] cu:fine:group-hover/slide:[filter:brightness(1)]';
const PLAY = 'lg__vctl cu:[&.btn.btn]:absolute cu:[&.btn.btn]:inset-0 cu:[&.btn.btn]:z-2 cu:[&.btn.btn]:m-auto cu:[&.btn.btn]:size-14 cu:[&.btn.btn]:[--btn-h:56px] cu:[&.btn.btn]:[--btn-ic:38px] cu:[&.btn.btn]:[--btn-bg:rgba(255,249,241,.92)] cu:[&.btn.btn]:[--btn-fg:#C2410C] cu:[&.btn.btn]:[--btn-edge:inset_0_0_0_1px_rgba(255,255,255,.85)] cu:[&.btn.btn]:[--btn-edge-hover:inset_0_0_0_1px_var(--brand,#C2410C)] cu:[&.btn.btn]:[--btn-shadow:0_14px_30px_-10px_rgba(0,0,0,.55)] cu:[&.btn.btn]:backdrop-blur-[6px] cu:[&.btn.btn]:[transition:opacity_.3s_ease] cu:motion-reduce:[&.btn.btn]:transition-none cu:[&_svg]:size-full cu:[&.is-playing]:opacity-60 cu:[&.is-playing:hover]:opacity-100 cu:[&.is-playing:focus-visible]:opacity-100 cu:[.is-copy_&]:invisible cu:max-[760px]:[&.btn.btn]:size-13 cu:max-[760px]:[&.btn.btn]:[--btn-h:52px] cu:max-[760px]:[&.btn.btn]:[--btn-ic:34px]';

export default function LifeGallery() {
  return (
    <SectionWrapper id="lifeGal" labelledBy="lifeH" compact bleed
      className="cu:isolate cu:overflow-hidden cu:[color:var(--ink,#1D1712)] cu:ground-beige cu:[--cw:clamp(220px,21vw,380px)] cu:[--ch:calc(var(--cw)*1.18)] cu:[--gap:clamp(10px,1.1vw,18px)] cu:[--cpad:64px] cu:max-[760px]:[--cw:56vw] cu:max-[760px]:[--gap:10px] cu:max-[760px]:[--cpad:44px]">
      <div className="cu:px-(--px) cu:text-center">
        <h2 className="rv cu:m-0 cu:[font:400_var(--h2)/1.02_var(--f-title,Georgia),serif] cu:tracking-[-.02em] cu:text-center cu:[color:var(--ink,#1D1712)]" id="lifeH" style={{ '--d': '.05s' }}>Life at Vajiram &amp; Ravi</h2>
      </div>
      <div className="lg__rail cu:group/rail cu:relative">
        <span className={`lg__arw lg__prev cu:left-[max(12px,calc(var(--px)-22px))] cu:[translate:8px_0] ${ARROW}`}><Button variant="outline" size="sm" iconOnly iconStart="arrow-left" label="Previous photo" /></span>
        <span className={`lg__arw lg__next cu:right-[max(12px,calc(var(--px)-22px))] cu:[translate:-8px_0] ${ARROW}`}><Button variant="outline" size="sm" iconOnly iconStart="arrow" label="Next photo" /></span>
        <ul className="lg__track cu:mx-0 cu:mt-[calc(var(--hd-gap)-var(--cpad))] cu:mb-[calc(var(--cpad)*-1)] cu:flex cu:list-none cu:gap-(--gap) cu:overflow-x-auto cu:overscroll-x-contain cu:px-(--px) cu:py-(--cpad) cu:snap-x cu:snap-mandatory cu:scroll-px-(--px) cu:[scrollbar-width:none] cu:[&::-webkit-scrollbar]:hidden cu:[transition:opacity_.2s_ease] cu:[&.is-sw]:opacity-0 cu:motion-reduce:transition-none cu:motion-reduce:scroll-auto" id="lifeTrack" aria-labelledby="lifeH">
          {LIFE.map(c => (
            <li key={c.name} className={`lg__slide${c.vid ? ' lg__slide--vid cu:basis-[calc(var(--ch)*16/9)] cu:max-[760px]:basis-[min(calc(var(--ch)*16/9),calc(100vw-2*var(--px,20px)))]' : ' cu:basis-(--cw)'} cu:group/slide cu:min-w-0 cu:shrink-0 cu:grow-0 cu:snap-center cu:snap-always cu:opacity-0 cu:[translate:0_24px] cu:[transition:opacity_.7s_ease_var(--td,0s),translate_.9s_cubic-bezier(.22,.8,.24,1)_var(--td,0s)] cu:[#lifeGal.is-in_&]:opacity-100 cu:[#lifeGal.is-in_&]:[translate:0_0] cu:origin-[50%_calc(var(--ch)/2)] cu:will-change-transform cu:@container cu:motion-reduce:transition-none`}>
              <figure className={`lg__media cu:relative cu:m-0 cu:h-(--ch) cu:overflow-hidden cu:rounded-[10px] cu:bg-[#F4EEE6] cu:shadow-[0_30px_50px_-30px_rgba(80,48,16,.45)] ${c.vid ? 'cu:after:pointer-events-none cu:after:absolute cu:after:inset-0 cu:after:z-1 cu:after:bg-[rgba(0,0,0,.45)] cu:after:[transition:opacity_.35s_ease] cu:has-[.is-playing]:after:opacity-0 cu:motion-reduce:after:transition-none' : ''}`}>
                {c.vid ? (
                  <>
                    <video className={MEDIA} poster={c.poster} data-src={c.src} muted loop playsInline preload="none" aria-label={c.label} />
                    <Button variant="outline" size="sm" iconOnly iconStart={VIDEO_ICON} label={`Play video: ${c.name}`} className={PLAY} data-vctl="" />
                  </>
                ) : (
                  <img className={MEDIA} src={c.img} srcSet={photoSrcSet(c.img, c.w)} sizes="(max-width: 760px) 80vw, 260px" alt={c.alt} width={c.w} height={c.h} loading="lazy" decoding="async" style={c.pos ? { objectPosition: c.pos } : undefined} />
                )}
              </figure>
              <p className="cu:mx-0 cu:mt-[14px] cu:mb-0 cu:flex cu:flex-col cu:items-baseline cu:justify-between cu:gap-1 cu:text-left cu:opacity-0 cu:[transition:opacity_.35s_ease] cu:[.is-mid_&]:opacity-100 cu:motion-reduce:opacity-100">
                <b className="cu:flex-none cu:[font:600_16px/1.3_var(--f)] cu:[color:var(--ink,#1D1712)]">{c.name}</b>
                <span className="cu:min-w-0 cu:[font:400_14px/1.35_var(--f)] cu:text-[#7a6a58] cu:text-left">{c.detail}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
      <Tabs
        className="lg__tabs rv cu:mx-auto cu:mt-[clamp(28px,3vw,40px)] cu:mb-0"
        style={{ '--d': '.1s' }}
        label="Show"
        controls="lifeTrack"
        items={[{ id: 'all', label: 'All' }, { id: 'img', label: 'Images' }, { id: 'vid', label: 'Videos' }]}
      />
    </SectionWrapper>
  );
}

export function initLifeGallery() {
  const gal = document.getElementById('lifeGal'); if (!gal) return;
  const track = gal.querySelector('.lg__track'); if (!track) return;
  const slides = [...track.querySelectorAll('.lg__slide')]; if (slides.length < 2) return;
  const auto = !matchMedia('(prefers-reduced-motion: reduce)').matches;
  let inView = false, settle = 0, moveT = 0, moving = false, jumping = false;
  let setW = 0, baseX = 0;   // the width of one set of the shown cards, gaps included

  slides.forEach((s, k) => s.style.setProperty('--td', Math.min(k, 4) * 0.08 + 's'));

  const cards = () => [...track.children].filter(s => !s.hidden);
  const rel = s => s.offsetLeft - cards()[0].offsetLeft + (parseFloat(getComputedStyle(track).paddingLeft) || 0) + s.offsetWidth / 2 - track.clientWidth / 2;
  const firstOriginal = () => slides.find(s => !s.hidden);

  const build = () => {
    track.querySelectorAll('.is-copy').forEach(c => c.remove());
    const shown = slides.filter(s => !s.hidden); if (!shown.length) { setW = 0; return; }
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const last = shown[shown.length - 1];
    setW = last.offsetLeft + last.offsetWidth + gap - shown[0].offsetLeft;
    const n = Math.max(1, Math.ceil(track.clientWidth / setW));
    const copy = s => { const c = s.cloneNode(true); c.classList.add('is-copy'); c.setAttribute('aria-hidden', 'true'); c.inert = true; c.querySelectorAll('img').forEach(i => { i.loading = 'eager'; }); return c; };
    for (let k = 0; k < n; k++) {
      track.prepend(...shown.map(copy));
      track.append(...shown.map(copy));
    }
    track.scrollTo({ left: rel(shown[0]), behavior: 'auto' });
    baseX = rel(shown[0]); px = track.scrollLeft; lastSet = px;
    watchVideos();
    curve();
  };
  const ANG = 30, NEAR = 150, PERSP = 1300;   // degrees of turn, px brought closer, and the viewing distance, at the row's edges
  const flat = matchMedia('(max-width: 760px)');
  let cf = 0;
  function curve() {
    cf = 0;
    const all = [...track.children].filter(s => !s.hidden); if (!all.length) return;
    const half = track.clientWidth / 2, x0 = all[0].offsetLeft, pad = parseFloat(getComputedStyle(track).paddingLeft) || 0, sl = track.scrollLeft;
    const pos = all.map(s => s.offsetLeft - x0 + pad + s.offsetWidth / 2 - sl);   // read every position first, then draw
    if (flat.matches) {
      let mid = 0; pos.forEach((p, k) => { if (Math.abs(p - half) < Math.abs(pos[mid] - half)) mid = k; });
      all.forEach((s, k) => { if (s.style.transform) s.style.transform = ''; if ((k === mid) !== s.classList.contains('is-mid')) s.classList.toggle('is-mid', k === mid); });
      return;
    }
    const wid = all.map(s => s.offsetWidth), G = parseFloat(getComputedStyle(track).columnGap) || 0;
    const T = x => Math.max(-1.6, Math.min(1.6, (x - half) / half));
    const edges = (w, t) => { const a = -t * ANG * Math.PI / 180, z = t * t * NEAR, e = x => x * Math.cos(a) * PERSP / (PERSP - (z - x * Math.sin(a)));
      return [e(-w / 2), e(w / 2)]; };
    let at = pos.slice(), ts = [];
    for (let pass = 0; pass < 2; pass++) {
      ts = at.map(T);
      const ed = ts.map((t, k) => edges(wid[k], t)), u = [0];
      for (let k = 1; k < all.length; k++) u[k] = u[k - 1] + ed[k - 1][1] + G - ed[k][0];
      let k = pos.findIndex((p, i) => i < pos.length - 1 && p <= half && pos[i + 1] > half);
      if (k < 0) k = pos[0] > half ? 0 : pos.length - 2;
      const f = pos.length > 1 ? (half - pos[k]) / (pos[k + 1] - pos[k]) : 0;
      const off = half - (u[k] + f * ((u[k + 1] ?? u[k]) - u[k]));
      at = u.map(v => v + off);
    }
    let mid = 0; ts.forEach((t, k) => { if (Math.abs(t) < Math.abs(ts[mid])) mid = k; });
    all.forEach((s, k) => {
      const t = ts[k];
      s.style.transform = `translateX(${(at[k] - pos[k]).toFixed(1)}px) perspective(${PERSP}px) translateZ(${(t * t * NEAR).toFixed(1)}px) rotateY(${(-t * ANG).toFixed(2)}deg)`;
      if ((k === mid) !== s.classList.contains('is-mid')) s.classList.toggle('is-mid', k === mid);
    });
  }
  track.addEventListener('scroll', () => { if (!cf) cf = requestAnimationFrame(curve); }, { passive: true });
  flat.addEventListener('change', () => curve());

  const normalise = () => {
    if (!setW) return;
    const base = rel(firstOriginal()), x = track.scrollLeft;
    if (x >= base - 2 && x < base + setW - 2) return;
    jumping = true;
    track.scrollTo({ left: base + ((((x - base) % setW) + setW) % setW), behavior: 'auto' });
  };

  const to = left => { moving = true; clearTimeout(moveT); moveT = setTimeout(() => { moving = false; }, 1200);   // the drift waits for the glide (at most 1.2 s)
    track.scrollTo({ left, behavior: auto ? 'smooth' : 'auto' }); };
  const next = () => { normalise(); const x = track.scrollLeft, h = cards()[0].offsetWidth / 2, p = cards().map(rel).find(v => v > x + h); if (p !== undefined) to(p); };
  const prev = () => { normalise(); const x = track.scrollLeft, h = cards()[0].offsetWidth / 2, b = cards().map(rel).filter(v => v < x - h); if (b.length) to(b[b.length - 1]); };

  const SPEED = 26;
  let px = 0, lastSet = -1, held = false, hovered = false, raf = 0, prevT = 0;
  const drift = now => {
    raf = 0;
    if (!auto || !inView || document.hidden) { prevT = 0; return; }
    const dt = prevT ? Math.min(64, now - prevT) : 0; prevT = now;
    if (!moving && !held && !hovered && setW) {
      if (Math.abs(track.scrollLeft - lastSet) > 1.5) px = track.scrollLeft;   // moved by hand or by an arrow since: carry on from there
      px += SPEED * dt / 1000;
      if (px >= baseX + setW) px -= setW;
      else if (px < baseX) px += setW;
      jumping = false;
      track.scrollLeft = px; lastSet = track.scrollLeft;
      curve();
    }
    raf = requestAnimationFrame(drift);
  };
  const DRIFT = false;   // user 2026-11-16: no auto scroll; the row moves only by hand (swipe, drag, arrows, tabs). Set true to bring the drift back.
  const schedule = () => { if (DRIFT && !raf && auto && inView && !document.hidden) { prevT = 0; raf = requestAnimationFrame(drift); } };
  const rail = gal.querySelector('.lg__rail') || track;   // the row and its arrows
  rail.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') hovered = true; });
  rail.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') hovered = false; });
  track.addEventListener('pointerdown', () => { held = true; });
  addEventListener('pointerup', () => { held = false; });
  addEventListener('pointercancel', () => { held = false; });
  track.addEventListener('touchstart', () => { held = true; }, { passive: true });
  track.addEventListener('touchend', () => { setTimeout(() => { held = false; }, 600); }, { passive: true });   // let a flick's glide finish

  gal.querySelector('.lg__next').addEventListener('click', () => { next(); schedule(); });
  gal.querySelector('.lg__prev').addEventListener('click', () => { prev(); schedule(); });
  gal.addEventListener('keydown', e => {
    if (e.target.closest('.lg__rail')) {
      if (e.key === 'ArrowRight') { next(); schedule(); e.preventDefault(); }
      if (e.key === 'ArrowLeft') { prev(); schedule(); e.preventDefault(); }
    }
  });
  track.addEventListener('scroll', () => {
    if (jumping) { jumping = false; return; }
    clearTimeout(settle);
    settle = setTimeout(() => { normalise(); if (!moving) schedule(); moving = false; }, 140);
  }, { passive: true });

  let vids = [];
  const syncVideos = () => vids.forEach(o => {
    if (!o.src) return;
    const want = (auto || o.v.dataset.asked) && inView && o.seen && !document.hidden && !o.v.dataset.held;
    if (want) { if (!o.v.src) o.v.src = o.src; o.v.play().catch(() => {}); }
    else o.v.pause();
  });
  const ctlState = v => {
    const b = v.closest('.lg__media')?.querySelector('.lg__vctl'); if (!b) return;
    const on = !v.paused, name = b.getAttribute('aria-label').replace(/^(Play|Pause) video/, '').trim();
    b.classList.toggle('is-playing', on);
    b.setAttribute('aria-label', `${on ? 'Pause' : 'Play'} video${name}`);
  };
  track.addEventListener('play', e => ctlState(e.target), true);
  track.addEventListener('pause', e => ctlState(e.target), true);
  track.addEventListener('click', e => {
    const b = e.target.closest('.lg__vctl'); if (!b) return;
    const v = b.closest('.lg__media')?.querySelector('video'); if (!v) return;
    const src = (v.dataset.src || '').trim(); if (!src) return;
    if (!v.paused) { v.dataset.held = '1'; delete v.dataset.asked; v.pause(); }
    else { delete v.dataset.held; v.dataset.asked = '1'; if (!v.src) v.src = src; v.play().catch(() => {}); }
  });
  const vio = new IntersectionObserver(es => {
    es.forEach(e => { const o = vids.find(x => x.v === e.target); if (o) o.seen = e.isIntersecting; });
    syncVideos();
  }, { root: track, threshold: .6 });
  function watchVideos() {
    vio.disconnect();
    vids.forEach(o => o.v.pause());
    vids = cards().map(s => s.querySelector('video')).filter(Boolean).map(v => ({ v, src: (v.dataset.src || '').trim(), seen: false }));
    vids.forEach(o => vio.observe(o.v));
  }

  const tabBar = gal.querySelector('.lg__tabs');
  if (tabBar) {
    let cur = 'all', swapT = 0;
    const apply = f => {
      slides.forEach(s => { const v = s.classList.contains('lg__slide--vid'); s.hidden = f === 'img' ? v : f === 'vid' ? !v : false; });
      build();
    };
    const pick = f => {
      if (f === cur) return;
      cur = f;
      clearTimeout(swapT);
      if (!auto) { apply(f); schedule(); return; }
      track.classList.add('is-sw');
      swapT = setTimeout(() => { apply(f); track.classList.remove('is-sw'); syncVideos(); schedule(); }, 200);
    };
    initTabs(tabBar, { onSelect: pick });
  }

  let rw = track.clientWidth, rT = 0;
  addEventListener('resize', () => { clearTimeout(rT); rT = setTimeout(() => { if (track.clientWidth !== rw) { rw = track.clientWidth; build(); } else curve(); }, 150); });

  build();
  new IntersectionObserver(es => {
    inView = es[0].isIntersecting;
    if (inView) gal.classList.add('is-in');
    syncVideos(); schedule();
  }, { threshold: .3 }).observe(track);
  document.addEventListener('visibilitychange', () => { syncVideos(); schedule(); });

  if (!auto) gal.classList.add('is-in');
}
