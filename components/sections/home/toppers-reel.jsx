import { $, $$, reduce } from '@/lib/site';
import { PHOTO, TOPPERS_2025 } from '@/lib/data/toppers';

const prog = list => list.slice(0, 2).join(' · ') + (list.length > 2 ? ` +${list.length - 2} more` : '');

const PLACEHOLDER = PHOTO + 'portrait/placeholder-topper.webp';
const TONES = ['gs', 'pre'];

const REEL = TOPPERS_2025;

function ReelItem({ person, i }) {
  const { rank, name, programmes } = person;
  return (
    <li className="dr__item">
      <div className={`dr__fig dr__fig--${TONES[i % TONES.length]}`}>
        <span className="dr__gem" aria-hidden="true"><i></i></span>
        <span className="dr__pic">
          <img src={PLACEHOLDER} alt="" width="360" height="360" loading="lazy" decoding="async" />
        </span>
      </div>
      <p className="dr__n" aria-hidden="true"><small>AIR</small> {rank}</p>
      <h4 className="dr__name">{name}<span className="pd__vh">, All India Rank {rank}, UPSC CSE 2025</span></h4>
      <p className="dr__prog">UPSC CSE 2025{programmes.length ? ` · ${prog(programmes)}` : ''}</p>
    </li>
  );
}

export default function ToppersReel() {
  return (
    <>
      <div className="dr__view" id="drList" role="region" aria-label={`UPSC CSE 2025, ${REEL.length} rank holders`}>
        <ul className="dr__track">
          {REEL.map((p, i) => <ReelItem key={p.rank} person={p} i={i} />)}
        </ul>
      </div>
    </>
  );
}

const shuffle = track => {
  const items = [...track.children];
  for (let i = items.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [items[i], items[j]] = [items[j], items[i]]; }
  items.forEach((li, i) => {
    const fig = li.querySelector('.dr__fig');
    TONES.forEach(t => fig.classList.toggle(`dr__fig--${t}`, t === TONES[i % TONES.length]));
    track.appendChild(li);
  });
};

export function initDiamondReel() {
  const dr = document.querySelector('#toppers .dr'); if (!dr) return;
  const track = dr.querySelector('.dr__track'), view = dr.querySelector('.dr__view');
  shuffle(track);
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const SPEED = 34;
  const coarse = matchMedia('(hover: none) and (pointer: coarse)').matches;
  let scrollRaf = 0, scrollPos = 0, scrollLast = 0, touching = false, userScroll = false, userT = 0;
  const stopScroll = () => { cancelAnimationFrame(scrollRaf); scrollRaf = 0; clearTimeout(userT); touching = false; userScroll = false; view.classList.remove('is-scroll'); view.scrollLeft = 0; };
  const wrapScroll = () => {
    const sl = view.scrollLeft;
    if (sl >= loopW * 1.5) { scrollPos = sl - loopW; view.scrollLeft = scrollPos; }
    else if (sl <= loopW * .5) { scrollPos = sl + loopW; view.scrollLeft = scrollPos; }
    else scrollPos = sl;
  };
  const scrollTick = now => {
    scrollRaf = 0;
    const dt = Math.min(.05, (now - (scrollLast || now)) / 1000); scrollLast = now;
    if (looping && !dr.classList.contains('is-off') && !touching && !userScroll) {
      scrollPos += SPEED * dt; view.scrollLeft = scrollPos;
      if (scrollPos >= loopW * 1.5) { scrollPos -= loopW; view.scrollLeft = scrollPos; }
    }
    scrollRaf = requestAnimationFrame(scrollTick);
  };
  const releaseUser = () => { clearTimeout(userT); userT = setTimeout(() => { if (!touching) { userScroll = false; scrollPos = view.scrollLeft; } }, 900); };
  if (coarse) {
    view.addEventListener('touchstart', () => { touching = true; userScroll = true; clearTimeout(userT); }, { passive: true });
    view.addEventListener('touchend', () => { touching = false; releaseUser(); }, { passive: true });
    view.addEventListener('touchcancel', () => { touching = false; releaseUser(); }, { passive: true });
    view.addEventListener('scroll', () => { if (!userScroll || !looping) return; wrapScroll(); releaseUser(); }, { passive: true });
  }
  let looping = false, loopW = 0, anim = null, vel = 0, hover = false, drag = null, fling = 0, moved = false, wheelT = 0;
  const dur = () => loopW / SPEED * 1000;
  const getOff = () => anim ? -((anim.currentTime || 0) % dur()) / dur() * loopW : 0;
  const setOff = o => { if (!anim) return; let m = o % loopW; if (m > 0) m -= loopW; anim.currentTime = -m / loopW * dur() + dur() * 100; };
  const live = () => looping && !dr.classList.contains('is-off');
  const sync2 = () => { if (!anim) return; if (live() && !hover && !drag && !fling && !wheelT) anim.play(); else anim.pause(); };
  const flingStep = now => {
    fling = 0;
    if (!anim || drag) return;
    const dt = flingStep.last ? Math.min(.05, (now - flingStep.last) / 1000) : 0; flingStep.last = now;
    if (Math.abs(vel) > 8 && live()) { setOff(getOff() + vel * dt); vel *= Math.exp(-dt * 3.2); fling = requestAnimationFrame(flingStep); }
    else { vel = 0; sync2(); }
  };
  const layout = () => {
    track.querySelectorAll('[data-copy]').forEach(c => c.remove());
    track.classList.remove('is-loop', 'is-still', 'is-drag');
    if (anim) { anim.cancel(); anim = null; }
    cancelAnimationFrame(fling); fling = 0;
    looping = false; vel = 0; track.style.transform = '';
    stopScroll();
    if (still) return;
    const fits = track.scrollWidth <= view.clientWidth;
    if (fits) { track.classList.add('is-still'); return; }
    [...track.children].forEach(li => { const c = li.cloneNode(true); c.dataset.copy = ''; c.setAttribute('aria-hidden', 'true'); c.inert = true; track.appendChild(c); });
    loopW = track.scrollWidth / 2; looping = true;
    if (coarse) {
      view.classList.add('is-scroll');
      scrollPos = loopW; view.scrollLeft = scrollPos; scrollLast = 0;
      scrollRaf = requestAnimationFrame(scrollTick);
      return;
    }
    track.classList.add('is-drag');
    anim = track.animate([{ transform: 'translate3d(0, 0, 0)' }, { transform: `translate3d(${-loopW}px, 0, 0)` }], { duration: dur(), iterations: Infinity });
    applyRate();
    sync2();
  };
  let boost = 0, dir = 1, rate = 1, boostRaf = 0, sy = scrollY, st = performance.now();
  const BOOST_MAX = 6, BOOST_PER_PX_S = 1 / 250;
  const applyRate = () => {
    if (!anim) return;
    if (rate < 0 && (anim.currentTime || 0) < dur()) anim.currentTime = (anim.currentTime || 0) + dur() * 100;
    anim.playbackRate = rate;
  };
  const boostStep = now => {
    boostRaf = 0;
    const dt = Math.min(.05, (now - (boostStep.last || now)) / 1000); boostStep.last = now;
    boost *= Math.exp(-dt * 2.4);
    if (boost < .02) boost = 0;
    const target = dir * (1 + boost);
    rate += (target - rate) * (1 - Math.exp(-dt * 9));
    if (Math.abs(target - rate) < .01) rate = target;
    applyRate();
    if (boost || rate !== dir) boostRaf = requestAnimationFrame(boostStep); else boostStep.last = 0;
  };
  if (!still) addEventListener('scroll', () => {
    const now = performance.now(), d = scrollY - sy, dt = Math.max(1, now - st); sy = scrollY; st = now;
    if (!d || !looping || dr.classList.contains('is-off')) return;
    dir = d > 0 ? 1 : -1;
    boost = Math.max(boost, Math.min(BOOST_MAX, Math.abs(d) / dt * 1000 * BOOST_PER_PX_S));
    if (!boostRaf) boostRaf = requestAnimationFrame(boostStep);
  }, { passive: true });
  let hoverT = 0;   // the drift holds only once the mouse has rested on the row for 3 seconds (user 2026-11-21), until it leaves
  view.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') { clearTimeout(hoverT); hoverT = setTimeout(() => { hover = true; sync2(); }, 3000); } });
  view.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') { clearTimeout(hoverT); hover = false; sync2(); } });
  view.addEventListener('pointerdown', e => {
    if (coarse || !looping || (e.pointerType === 'mouse' && e.button !== 0)) return;
    cancelAnimationFrame(fling); fling = 0; vel = 0; moved = false;
    drag = { id: e.pointerId, x: e.clientX, off: getOff(), lx: e.clientX, lt: performance.now(), vx: 0 };
  });
  view.addEventListener('pointermove', e => {
    if (!drag || e.pointerId !== drag.id) return;
    const dx = e.clientX - drag.x;
    if (!moved && Math.abs(dx) < 4) return;
    if (!moved) { moved = true; view.setPointerCapture(e.pointerId); view.classList.add('is-grabbing'); drag.off = getOff(); drag.x = e.clientX; sync2(); }
    const now = performance.now(), v = (e.clientX - drag.lx) / Math.max(.001, (now - drag.lt) / 1000);
    drag.vx = drag.vx * .3 + v * .7; drag.lx = e.clientX; drag.lt = now;
    setOff(drag.off + (e.clientX - drag.x));
  });
  const release = e => {
    if (!drag || (e && e.pointerId !== drag.id)) return;
    const flick = moved && performance.now() - drag.lt < 90 ? Math.max(-1800, Math.min(1800, drag.vx)) : 0;
    drag = null; view.classList.remove('is-grabbing');
    if (flick) { vel = flick; flingStep.last = 0; fling = requestAnimationFrame(flingStep); } else sync2();
  };
  view.addEventListener('pointerup', release);
  view.addEventListener('pointercancel', release);
  view.addEventListener('lostpointercapture', release);
  view.addEventListener('wheel', e => {
    if (coarse || !looping) return;
    const k = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? view.clientWidth : 1;
    const dx = e.deltaX * k, dy = e.deltaY * k;
    if (!dx || Math.abs(dx) <= Math.abs(dy)) return;
    e.preventDefault();
    cancelAnimationFrame(fling); fling = 0; vel = 0;
    clearTimeout(wheelT); wheelT = setTimeout(() => { wheelT = 0; sync2(); }, 180);
    sync2();
    setOff(getOff() - dx);
  }, { passive: false });
  view.addEventListener('click', e => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
  view.addEventListener('dragstart', e => e.preventDefault());

  layout();
  let rt = 0; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(layout, 150); });
  const sync = () => { dr.classList.toggle('is-off', document.hidden); sync2(); };
  document.addEventListener('visibilitychange', sync);
  sync();
}
