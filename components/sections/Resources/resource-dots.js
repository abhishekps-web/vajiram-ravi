// Free resources on phones (user 2026-11-17): the dot indicator under the swipeable row of folders (Resources.jsx .sm__dots, shown
// under 641px by public/css/resources.css). The dot of the folder nearest the row's start is the current one, kept in step as the row
// scrolls; a tap on a dot scrolls that folder into place. On wider screens the folders are a grid and the dots are hidden.
export default function initResourceDots() {
  const grid = document.getElementById('resGrid'), dots = [...document.querySelectorAll('#resources .sm__dots > button')];
  if (!grid || !dots.length) return;
  const cards = [...grid.children];
  const pad = () => parseFloat(getComputedStyle(grid).scrollPaddingInlineStart) || 0;
  let cur = 0, tick = 0;
  const mark = () => {
    tick = 0;
    const x = grid.scrollLeft + pad();
    let k = 0; cards.forEach((c, i) => { if (Math.abs(c.offsetLeft - x) < Math.abs(cards[k].offsetLeft - x)) k = i; });
    // at the row's end the last folder can't reach the start: it is the current one once the row is scrolled to the end
    if (grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 2) k = cards.length - 1;
    if (k === cur) return;
    cur = k;
    dots.forEach((d, i) => { if (i === k) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current'); });
  };
  grid.addEventListener('scroll', () => { if (!tick) tick = requestAnimationFrame(mark); }, { passive: true });
  const smooth = !matchMedia('(prefers-reduced-motion: reduce)').matches;
  dots.forEach((d, i) => d.addEventListener('click', () => grid.scrollTo({ left: cards[i].offsetLeft - pad(), behavior: smooth ? 'smooth' : 'auto' })));
}
