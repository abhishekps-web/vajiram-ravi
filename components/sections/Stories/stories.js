// Stories: the postcards are server-rendered (Stories.jsx); this adds the motion that needs a script:
//   - the reveal: when the section scrolls in, #stories gets [data-in] and the heading rises, the cards are dealt (stories.css)
//   - the loop pauses while the track is off screen (no compositor work for a marquee nobody sees)
//   - on real pointers, the card under the pointer tilts toward it (--tx/--ty), at most once per frame
//   - a card with three quarters or more of it outside the viewport takes no hover at all
//   - a card hovered or focused near the left or right edge slides inward just enough that its enlarged face is fully readable
import { $, reduce } from '@/lib/site';
import initCardStack from '@/components/ui/card-stack';

export function initStories() {
  const st = $('#stories'), tc = $('#tcar');
  if (!st || !tc) return;
  const track = tc.firstElementChild;
  const io = 'IntersectionObserver' in window;

  if (io && !reduce) {
    const seen = new IntersectionObserver(es => { if (es[0].isIntersecting) { st.setAttribute('data-in', ''); seen.disconnect(); } }, { threshold: .25 });
    seen.observe(st);
  } else st.setAttribute('data-in', '');

  if (track) initCardStack(tc, track);

  if (io && track) {
    new IntersectionObserver(es => { track.style.animationPlayState = es[0].isIntersecting ? '' : 'paused'; }).observe(tc);
  }

  if (!reduce && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let raf = 0, card = null, x = 0, y = 0;
    const paint = () => { raf = 0; if (card) { card.style.setProperty('--tx', x.toFixed(3)); card.style.setProperty('--ty', y.toFixed(3)); } };
    tc.addEventListener('pointermove', e => {
      const c = e.target.closest('.pst'); if (!c) return;
      const r = c.getBoundingClientRect();
      card = c; x = (e.clientX - r.left) / r.width - .5; y = (e.clientY - r.top) / r.height - .5;
      if (!raf) raf = requestAnimationFrame(paint);
    }, { passive: true });
    tc.addEventListener('pointerout', e => {
      const c = e.target.closest('.pst');
      if (c && !c.contains(e.relatedTarget)) { if (c === card) card = null; c.style.setProperty('--tx', 0); c.style.setProperty('--ty', 0); }
    });
  }

  // keep the enlarged card inside the readable part of the track: clear of the edge fade (7% each side, stories.css / Stories.jsx)
  const SCALE = 1.16;
  const nudge = (c, px) => {
    const t = tc.getBoundingClientRect(), r = c.getBoundingClientRect();
    const cur = parseFloat(c.dataset.sx || 0);
    const half = c.offsetWidth * SCALE / 2, cx = r.left + r.width / 2 - cur;   // centre without any earlier nudge
    const pad = Math.max(16, t.width * .07 + 8);
    const lo = t.left + pad + half, hi = t.right - pad - half;
    let sx = hi < lo ? 0 : Math.round(Math.min(Math.max(cx, lo), hi) - cx);
    // with a mouse, never slide the card out from under the pointer (that makes it flicker between hovered and not):
    // the pointer stays at least 40px inside the enlarged card's edges
    if (px != null) sx = Math.round(Math.min(Math.max(sx, px + 40 - half - cx), px - 40 + half - cx));
    c.dataset.sx = sx; c.style.setProperty('--tw-translate-x', sx + 'px');
  };
  const settle = c => { c.dataset.sx = 0; c.style.removeProperty('--tw-translate-x'); };
  if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const dead = new Set();   // cards switched off for this hover: 3/4 or more of them is outside the viewport
    const visible = c => { const r = c.getBoundingClientRect(); return Math.max(0, Math.min(r.right, innerWidth) - Math.max(r.left, 0)) / r.width; };
    tc.addEventListener('pointerover', e => {
      const c = e.target.closest('.pst');
      if (!c || c.contains(e.relatedTarget)) return;
      if (visible(c) <= .25) { c.style.pointerEvents = 'none'; dead.add(c); return; }
      nudge(c, e.clientX);
    });
    tc.addEventListener('pointerleave', () => { dead.forEach(c => { c.style.pointerEvents = ''; }); dead.clear(); });
    tc.addEventListener('pointerout', e => {
      const c = e.target.closest('.pst');
      if (!c || c.contains(e.relatedTarget)) return;
      const r = c.getBoundingClientRect();   // still under the pointer (the card is moving or its corner is round): not a real exit
      if (e.clientX > r.left + 4 && e.clientX < r.right - 4 && e.clientY > r.top + 4 && e.clientY < r.bottom - 4) return;
      settle(c);
    });
  }
  tc.addEventListener('focusin', e => { const c = e.target.closest('.pst'); if (c) nudge(c); });
  tc.addEventListener('focusout', e => { const c = e.target.closest('.pst'); if (c && !c.contains(e.relatedTarget)) settle(c); });
}
