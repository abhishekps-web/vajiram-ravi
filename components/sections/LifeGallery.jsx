import { photoSrcSet } from '@/lib/photo';
import Button from '@/components/ui/Button/Button';
import Stylesheet from '@/components/ui/Stylesheet';
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
    <path className="lg__vi-play" d="M8 5.5v13l11-6.5z" fill="currentColor" />
    <g className="lg__vi-pause" fill="currentColor"><rect x="6.5" y="5.5" width="4" height="13" rx="1" /><rect x="13.5" y="5.5" width="4" height="13" rx="1" /></g>
  </svg>
);

export default function LifeGallery() {
  return (
    <section className="lgal" id="lifeGal" aria-labelledby="lifeH">
      <Stylesheet href="/css/life-gallery.css" />
      <div className="lg__hd">
        <h2 className="lg__h rv" id="lifeH" style={{ '--d': '.05s' }}>Life at Vajiram &amp; Ravi</h2>
      </div>
      <div className="lg__rail">
        <span className="lg__smoke lg__smoke--l" aria-hidden="true" />
        <span className="lg__smoke lg__smoke--r" aria-hidden="true" />
        <span className="lg__arw lg__prev"><Button variant="outline" size="sm" iconOnly iconStart="arrow-left" label="Previous photo" /></span>
        <span className="lg__arw lg__next"><Button variant="outline" size="sm" iconOnly iconStart="arrow" label="Next photo" /></span>
        <ul className="lg__track" id="lifeTrack" aria-labelledby="lifeH">
          {LIFE.map(c => (
            <li key={c.name} className={`lg__slide${c.vid ? ' lg__slide--vid' : ''}`}>
              <figure className="lg__media">
                {c.vid ? (
                  <>
                    <video poster={c.poster} data-src={c.src} muted loop playsInline preload="none" aria-label={c.label} />
                    <Button variant="outline" size="sm" iconOnly iconStart={VIDEO_ICON} label={`Play video: ${c.name}`} className="lg__vctl" data-vctl="" />
                  </>
                ) : (
                  <img src={c.img} srcSet={photoSrcSet(c.img, c.w)} sizes="(max-width: 760px) 80vw, 260px" alt={c.alt} width={c.w} height={c.h} loading="lazy" decoding="async" style={c.pos ? { objectPosition: c.pos } : undefined} />
                )}
              </figure>
              <p className="lg__cap"><b>{c.name}</b><span>{c.detail}</span></p>
            </li>
          ))}
        </ul>
      </div>
      <Tabs
        className="lg__tabs rv"
        style={{ '--d': '.1s' }}
        label="Show"
        controls="lifeTrack"
        items={[{ id: 'all', label: 'All' }, { id: 'img', label: 'Images' }, { id: 'vid', label: 'Videos' }]}
      />
    </section>
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
