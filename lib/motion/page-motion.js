/* site-wide page motion: the scroll focus, the WhatsApp button, the closing CTA's light and the rest below. The hero carousel moved
   into components/sections/Hero/HeroBanner.jsx (initHeroCarousel, user 2026-11-21: the hero as one component file). */
export default function init() {

/* nav: the header has its own band above the hero now (components/layout/NavigationBar/NavigationBar.jsx), so it no longer switches to the
   transparent .nav--hero style over the hero photo (user 2026-11-13). */

/* CTA buttons: the rolling label and the arrow disc used to be added here, after load, to .bt/.talk/.vbtn/.inv__reg links.
   Every button is now rendered complete by the button system (components/ui/Button: <Button> and buttonHTML), so nothing
   is enhanced at runtime any more. */

/* scroll focus: each section's content brightens GRADUALLY as the section rises toward the middle of the screen (fully lit once its top
   reaches halfway) and dims gradually as it leaves (its bottom travelling from halfway up to the top of the screen). Tied to the scroll position,
   so it eases with your scrolling instead of switching. The hero and the Toppers sheet (own reveal) are left alone. */
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const MAP = {
    courses: '.band__in', why: '.wc__in', batches: ':scope > *',
    faculty: ':scope > *', stories: ':scope > *', contact: '.contact__in', resources: ':scope > *', visit: ':scope > *', faq: ':scope > *', closing: ':scope > *'
  };
  const secs = [];
  Object.keys(MAP).forEach(id => {
    const s = document.getElementById(id); if (!s) return;
    const kids = [...s.querySelectorAll(MAP[id])].filter(e => e.parentElement === s || id === 'courses');
    if (!kids.length) return;
    kids.forEach(k => k.classList.add('fx')); secs.push(s);
  });
  document.documentElement.classList.add('fx-on');
  const MIN = .16, c = v => Math.max(0, Math.min(1, v)), ease = t => t * t * (3 - 2 * t);
  let tick = false;
  const update = () => {
    tick = false; const vh = innerHeight;
    secs.forEach(s => {
      const r = s.getBoundingClientRect();
      const rise = c((vh - r.top) / (vh * .5));          // 0 when the top enters at the bottom of the screen, 1 when it reaches halfway
      const leave = c(r.bottom / (vh * .5));              // 1 while the bottom is at or below halfway, 0 when it reaches the top of the screen
      s.style.setProperty('--fx', (MIN + (1 - MIN) * ease(Math.min(rise, leave))).toFixed(3));
    });
  };
  const kick = () => { if (!tick) { tick = true; requestAnimationFrame(update); } };
  addEventListener('scroll', kick, { passive: true }); addEventListener('resize', kick); update();
})();

/* WhatsApp button: slides in once the intro has finished (or straight away when there is no intro) */
(() => {
  const b = document.getElementById('waBtn'); if (!b) return;
  const show = () => requestAnimationFrame(() => b.classList.add('in'));
  if (document.documentElement.classList.contains('vrv-lock')) document.addEventListener('vr:intro-done', show, { once: true });
  else setTimeout(show, 600);
})();

/* closing CTA: mouse follow. A warm light trails the cursor across the orange card (eased, so it lags a little behind the pointer), and the
   lotus and the inner glow drift a few pixels against it for depth. Real pointers only; off for reduced motion. Uses the `translate`
   property, so it stacks with the CSS transforms (centring, hover turn) instead of replacing them. */
(() => {
  const card = document.querySelector('.cl__card'); if (!card) return;
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const spot = card.querySelector('.cl__spot'), lotus = card.querySelector('.cl__lotus'), glow = card.querySelector('.cl__glow--b');
  let w = 1, h = 1, tx = 0, ty = 0, x = 0, y = 0, raf = 0;
  const loop = () => {
    x += (tx - x) * .12; y += (ty - y) * .12;
    const dx = x / w * 2 - 1, dy = y / h * 2 - 1;     // -1 … 1 across the card
    if (spot) spot.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
    if (lotus) lotus.style.translate = `${(-dx * 18).toFixed(1)}px ${(-dy * 12).toFixed(1)}px`;
    if (glow) glow.style.translate = `${(dx * 26).toFixed(1)}px ${(dy * 16).toFixed(1)}px`;
    raf = Math.abs(tx - x) + Math.abs(ty - y) > .4 ? requestAnimationFrame(loop) : 0;
  };
  const at = e => { const r = card.getBoundingClientRect(); w = r.width; h = r.height; tx = e.clientX - r.left; ty = e.clientY - r.top; };
  const go = () => { if (!raf) raf = requestAnimationFrame(loop); };
  card.addEventListener('pointerenter', e => { at(e); if (!card.classList.contains('is-follow')) { x = tx; y = ty; } card.classList.add('is-follow'); go(); });
  card.addEventListener('pointermove', e => { at(e); go(); });
  card.addEventListener('pointerleave', () => { card.classList.remove('is-follow'); tx = w / 2; ty = h / 2; go(); });   // parallax settles back to centre
})();

/* footer ornament border: fades and settles in when the footer comes into view (css/v49.css .foot__frame) */
(() => {
  const f = document.querySelector('.foot__frame'); if (!f || !('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  f.classList.add('fb-anim');
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { f.classList.add('is-in'); io.disconnect(); } }), { threshold: .15 });
  io.observe(f.parentElement);
})();

/* card lists without a reveal of their own (batch cards, FAQ, the Toppers roll): stagger in when they reach the screen (css/v49.css .sg) */
(() => {
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
  const arm = el => { if (!el || el.classList.contains('sg')) return; [...el.children].forEach((c, i) => c.style.setProperty('--i', Math.min(i, 8))); el.classList.add('sg'); io.observe(el); };
  const go = () => ['#price', '#faqList', '#gzTen'].forEach(s => { const el = document.querySelector(s); if (el && el.children.length) arm(el); });
  go(); addEventListener('load', go);
})();
}
