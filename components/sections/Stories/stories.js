// Stories: the postcards are server-rendered (Stories.jsx); this adds the motion that needs a script:
//   - the reveal: when the section scrolls in, #stories gets [data-in] and the heading rises, the cards are dealt (stories.css)
//   - the loop pauses while the track is off screen (no compositor work for a marquee nobody sees)
//   - on real pointers, the card under the pointer tilts toward it (--tx/--ty), at most once per frame
import { $, reduce } from '@/lib/site';

export function initStories() {
  const st = $('#stories'), tc = $('#tcar');
  if (!st || !tc) return;
  const track = tc.firstElementChild;
  const io = 'IntersectionObserver' in window;

  if (io && !reduce) {
    const seen = new IntersectionObserver(es => { if (es[0].isIntersecting) { st.setAttribute('data-in', ''); seen.disconnect(); } }, { threshold: .25 });
    seen.observe(st);
  } else st.setAttribute('data-in', '');

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
}
