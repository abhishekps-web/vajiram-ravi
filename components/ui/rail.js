// Scroll rails (stories, faculty): chevrons scroll one card; each is hidden (not disabled) at its end of the rail, the other stays where it is.
import { $, $$ } from '@/lib/site';

export default function initRails() {
  $$('.rail').forEach(rail => {
    const track = $('.rail__track', rail), prev = $('.cbtn--prev', rail), next = $('.cbtn--next', rail);
    const cardStep = () => { const c = track.children; return c.length > 1 ? c[1].offsetLeft - c[0].offsetLeft : track.clientWidth; };
    const sync = () => {
      const max = track.scrollWidth - track.clientWidth;
      prev.style.visibility = track.scrollLeft <= 2 ? 'hidden' : '';
      next.style.visibility = track.scrollLeft >= max - 2 ? 'hidden' : '';
    };
    prev.addEventListener('click', () => track.scrollBy({ left: -cardStep() }));
    next.addEventListener('click', () => track.scrollBy({ left: cardStep() }));
    track.addEventListener('keydown', e => { if (e.key === 'ArrowRight') next.click(); if (e.key === 'ArrowLeft') prev.click(); });
    track.addEventListener('scroll', () => requestAnimationFrame(sync), { passive: true });
    addEventListener('resize', sync, { passive: true });
    sync(); setTimeout(sync, 600);
  });
}
