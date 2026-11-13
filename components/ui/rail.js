// Scroll rails (stories, faculty): chevrons scroll one card; each hides at its end of the rail.
import { $, $$ } from '@/lib/site';

export default function initRails() {
  $$('.rail').forEach(rail => {
    const track = $('.rail__track', rail), prev = $('.cbtn--prev', rail), next = $('.cbtn--next', rail);
    const cardStep = () => { const c = track.children; return c.length > 1 ? c[1].offsetLeft - c[0].offsetLeft : track.clientWidth; };
    const sync = () => {
      const max = track.scrollWidth - track.clientWidth;
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= max - 2;
    };
    prev.addEventListener('click', () => track.scrollBy({ left: -cardStep() }));
    next.addEventListener('click', () => track.scrollBy({ left: cardStep() }));
    track.addEventListener('keydown', e => { if (e.key === 'ArrowRight') next.click(); if (e.key === 'ArrowLeft') prev.click(); });
    track.addEventListener('scroll', () => requestAnimationFrame(sync), { passive: true });
    addEventListener('resize', sync, { passive: true });
    sync(); setTimeout(sync, 600);
  });
}
