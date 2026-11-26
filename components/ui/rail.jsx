import { $, $$ } from '@/lib/site';

export function bindDots(track, dots) {
  if (!track || !dots.length) return;
  const cards = [...track.children];
  const left = c => c.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
  const pad = () => parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;
  let cur = -1, tick = 0;
  const mark = () => {
    tick = 0;
    const x = track.scrollLeft + pad();
    let k = 0;
    cards.forEach((c, i) => { if (Math.abs(left(c) - x) < Math.abs(left(cards[k]) - x)) k = i; });
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 2) k = cards.length - 1;
    if (k === cur) return;
    cur = k;
    dots.forEach((d, i) => { if (i === k) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current'); });
  };
  const smooth = !matchMedia('(prefers-reduced-motion: reduce)').matches;
  track.addEventListener('scroll', () => { if (!tick) tick = requestAnimationFrame(mark); }, { passive: true });
  dots.forEach((d, i) => d.addEventListener('click', () => track.scrollTo({ left: left(cards[i]) - pad(), behavior: smooth ? 'smooth' : 'auto' })));
  addEventListener('resize', mark, { passive: true });
  mark();
}

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
    bindDots(track, $$('.rail__dots > button', rail));
  });
}
