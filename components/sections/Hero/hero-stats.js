// Hero stats: each number counts up from 0 as the row first shows (after the intro has lifted, if it is still playing).
// The final figures are server-rendered (Hero.jsx), so without JS or under reduced motion they simply show.
import { $$, reduce } from '@/lib/site';

export function initHeroStats() {
  const nums = $$('.dl__stats [data-count]');
  if (!nums.length || reduce) return;
  const run = () => nums.forEach((el, i) => {
    const to = +el.dataset.count, t0 = performance.now() + i * 90;
    el.textContent = '0';
    const step = t => { const k = Math.max(0, Math.min(1, (t - t0) / 1300)); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  });
  if (document.documentElement.classList.contains('vrv-lock')) document.addEventListener('vr:intro-done', run, { once: true });
  else run();
}
