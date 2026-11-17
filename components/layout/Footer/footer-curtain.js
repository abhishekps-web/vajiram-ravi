/* Curtain footer: the footer is parked behind the page (html.foot-curtain -> css/v49.css) and the page slides up off it, on every screen.
   It used to switch on only when the footer fitted the screen height, so a 2560 monitor got the curtain and a laptop got a plain scroll.
   A footer taller than the screen now sticks with its top at the top of the screen (bottom = screen height - footer height) while the page
   slides away, then scrolls the rest of the way. Re-checked on resize, load and font load. */
export default function init() {
  const foot = document.querySelector('footer.foot, footer.vf'); if (!foot) return;
  const root = document.documentElement;
  const check = () => {
    root.style.setProperty('--foot-off', Math.min(0, innerHeight - foot.offsetHeight) + 'px');
    root.classList.add('foot-curtain');
  };
  check(); addEventListener('resize', check); addEventListener('load', check);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(check);

  // The reveal zooms in (user 2026-11-17, "a zoom-in like the hero's zoom-out"): as the page slides up off the footer, its content grows
  // from 92% to full size and a shade over it lifts, the mirror of the hero shrinking and darkening as Programmes covers it. --foot-p
  // (0 as the footer starts to show, 1 once it is all uncovered) is set on the footer only, and only while it is being uncovered; the
  // rule is at the end of public/css/footer-v6.css. Not with reduced motion.
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const page = foot.previousElementSibling && foot.previousElementSibling.tagName === 'MAIN' ? foot.previousElementSibling : document.querySelector('main');
  if (!page) return;
  let tick = 0, last = -1;
  const step = () => {
    tick = 0;
    const shown = innerHeight - page.getBoundingClientRect().bottom;          // how much of the screen the footer fills
    const p = Math.max(0, Math.min(1, shown / Math.min(innerHeight, foot.offsetHeight)));
    const r = Math.round(p * 1000) / 1000;
    if (r === last) return;
    last = r; foot.style.setProperty('--foot-p', r);
  };
  addEventListener('scroll', () => { if (!tick) tick = requestAnimationFrame(step); }, { passive: true });
  addEventListener('resize', step);
  step();
}
