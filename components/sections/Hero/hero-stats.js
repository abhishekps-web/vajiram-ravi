// Hero stats, Kevin's (branch `kevin`, js/hero-v6.js; user 2026-11-16): the four points rise in on their own delays (--at) and each
// figure rolls up from 0 to its value as it rises; only the first number turns ("36/50" rolls its 36). It starts once the intro has
// lifted, if it is still playing. The row is server-rendered with .is-pre (hidden only when JS runs, public/css/hero-stats.css);
// under reduced motion the figures simply show.
import { $, reduce } from '@/lib/site';

export function initHeroStats() {
  const row = $('.hx__stats');
  if (!row) return;
  if (reduce) { row.classList.remove('is-pre'); row.classList.add('is-in'); return; }

  const roll = () => row.querySelectorAll('.hx__stat').forEach(li => {
    const fig = li.querySelector('.hx__fig'), value = fig.dataset.fig, m = value.match(/^(\D*)(\d+)(.*)$/);
    if (!m) return;
    const [, pre, num, post] = m, to = +num, at = parseFloat(li.style.getPropertyValue('--at')) || 0, DUR = 1200;
    fig.textContent = pre + '0' + post;
    setTimeout(() => {
      const t0 = performance.now();
      const step = now => {
        const p = Math.min(1, (now - t0) / DUR), e = 1 - Math.pow(1 - p, 3);
        fig.textContent = pre + Math.round(to * e) + post;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, at);
  });

  const start = () => { row.classList.remove('is-pre'); row.classList.add('is-in'); roll(); };
  // the row has been painted hidden (.is-pre) by now, so switching to .is-in straight away still runs the transitions
  if (document.documentElement.classList.contains('vrv-lock')) document.addEventListener('vr:intro-done', start, { once: true });
  else start();
}
