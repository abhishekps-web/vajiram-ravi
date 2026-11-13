// Word-by-word fill for .reveal headings: each word blends ink over peach as the heading scrolls through the screen.
import { $$, esc, reduce, clamp } from '@/lib/site';

export default function initWordFill() {
  // wrap each word, keeping the fixed line spans (.ln) intact
  const reveals = $$('.reveal').map(el => {
    const lines = $$('.ln', el);
    (lines.length ? lines : [el]).forEach(l => { l.innerHTML = l.textContent.trim().split(/\s+/).map(w => `<span class="w">${esc(w)}</span>`).join(' '); });
    return { el, words: $$('.w', el) };
  });
  // Continuous fill: scroll sets a target progress, the shown progress eases
  // toward it every frame, and each word blends ink over peach through a soft
  // edge about three words wide, so the fill glides instead of stepping.
  const SOFT = 3;
  const target = ({ el }) => { const r = el.getBoundingClientRect(), vh = innerHeight; return clamp((vh * .82 - r.top) / (r.height + vh * .3), 0, 1); };
  const paint = rv => {
    const n = rv.words.length, head = rv.p * (n + SOFT);
    rv.words.forEach((w, i) => {
      const k = clamp((head - i) / SOFT, 0, 1);
      if (Math.abs(k - w._k) > .002) { w._k = k; w.style.setProperty('--k', k.toFixed(3)); }
    });
  };
  reveals.forEach(rv => { rv.words.forEach(w => { w._k = -1; }); rv.p = reduce ? 1 : target(rv); paint(rv); });
  let raf = 0;
  const loop = () => {
    raf = 0;
    let moving = false;
    reveals.forEach(rv => {
      const t = target(rv), d = t - rv.p;
      rv.p = Math.abs(d) < .0005 ? t : rv.p + d * .12;   // ease toward the scroll position
      if (rv.p !== t) moving = true;
      paint(rv);
    });
    if (moving) raf = requestAnimationFrame(loop);
  };
  const kick = () => { if (!raf && !reduce) raf = requestAnimationFrame(loop); };
  addEventListener('scroll', kick, { passive: true });
  addEventListener('resize', kick, { passive: true });
}
