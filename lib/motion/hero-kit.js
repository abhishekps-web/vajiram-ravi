/* Shared by the v31-v33 hero experiments.
   heroKit(): autoplay carousel controller (progress bars on .hc__d, arrows, pause, keys, swipe, hover/focus/hidden-tab hold).
   (It also hid the nav on scroll down; removed 2026-11-13: the header stays fixed in place, components/layout/NavigationBar.) */
export default function init() {

window.heroKit = function (o) {
  const { root, bar, n, onGo } = o, T = o.T || 6500;
  const dots = [...bar.querySelectorAll('.hc__d')], pp = bar.querySelector('.hc__pp');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let cur = -1, timer = 0, userPaused = reduce, hold = false;
  bar.style.setProperty('--hc-t', T + 'ms');
  const run = () => {
    clearTimeout(timer); bar.classList.remove('is-play');
    if (userPaused || hold) return;
    void bar.offsetWidth; bar.classList.add('is-play');
    timer = setTimeout(() => go(cur + 1), T);
  };
  const go = i => {
    i = (i + n) % n; if (i === cur) return;
    const prev = cur; cur = i;
    dots.forEach((d, k) => { d.classList.toggle('is-on', k === i); d.toggleAttribute('aria-current', k === i); });
    onGo(i, prev); run();
  };
  dots.forEach((d, k) => d.addEventListener('click', () => go(k)));
  bar.querySelector('.hc__a--p').addEventListener('click', () => go(cur - 1));
  bar.querySelector('.hc__a--n').addEventListener('click', () => go(cur + 1));
  pp.addEventListener('click', () => {
    userPaused = !userPaused;
    pp.classList.toggle('is-paused', userPaused);
    pp.setAttribute('aria-label', userPaused ? 'Play slideshow' : 'Pause slideshow');
    run();
  });
  if (reduce) pp.classList.add('is-paused');
  const setHold = v => { hold = v; bar.classList.toggle('is-held', v); if (v) { clearTimeout(timer); bar.classList.remove('is-play'); } else run(); };
  root.addEventListener('mouseenter', () => setHold(true)); root.addEventListener('mouseleave', () => setHold(false));
  root.addEventListener('focusin', () => setHold(true)); root.addEventListener('focusout', () => setHold(false));
  document.addEventListener('visibilitychange', () => setHold(document.hidden));
  root.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') go(cur - 1); else if (e.key === 'ArrowRight') go(cur + 1); });
  let x0 = null;
  root.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
  root.addEventListener('touchend', e => {
    if (x0 == null) return;
    const dx = e.changedTouches[0].clientX - x0; x0 = null;
    if (Math.abs(dx) > 50) go(cur + (dx < 0 ? 1 : -1));
  }, { passive: true });
  go(0);
  return { go, reduce };
};
}
