/* site-wide page motion: the scroll focus, the WhatsApp button, the closing CTA's light and the rest below. The hero carousel moved
   into components/sections/home/hero-banner.jsx (initHeroCarousel, user 2026-11-21: the hero as one component file). */
export default function init() {

/* nav: the header has its own band above the hero now (components/layout/NavigationBar.jsx), so it no longer switches to the
   transparent .nav--hero style over the hero photo (user 2026-11-13). */

/* CTA buttons: the rolling label and the arrow disc used to be added here, after load, to .bt/.talk/.vbtn/.inv__reg links.
   Every button is now rendered complete by the button system (components/ui/button: <Button> and buttonHTML), so nothing
   is enhanced at runtime any more. */

/* scroll focus: each section's content brightens GRADUALLY as the section rises toward the middle of the screen (fully lit once its top
   reaches halfway) and dims gradually as it leaves (its bottom travelling from halfway up to the top of the screen). Tied to the scroll position,
   so it eases with your scrolling instead of switching. The hero and the Toppers sheet (own reveal) are left alone. */
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const MAP = {
    courses: '.band__in', story: ':scope > *', why: '.wc__in', batches: ':scope > *',
    faculty: ':scope > *', stories: ':scope > *', contact: ':scope > *', resources: ':scope > *', visit: ':scope > *', about: ':scope > *', legacy: ':scope > *', faq: ':scope > *', closing: ':scope > *'
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

/* auto-hiding scrollbars (user 2026-11-21): .is-scrolling on <html> while the page scrolls and on a scroll box (the Toppers record list)
   while it scrolls, cleared 900ms after the last scroll; the CSS shows the thumb only then (end of v49.css and podium.css) */
(() => {
  // Chrome repaints a scrollbar's ::-webkit-scrollbar styles only when the bar itself is laid out again, so after the class flips the bar
  // is hidden and shown in the same frame (no visible change, the scroll position kept) to make it pick the new style up
  const repaint = el => { const box = el === document.documentElement ? el : el; const o = box.style.overflowY; box.style.overflowY = 'hidden'; void box.offsetWidth; box.style.overflowY = o; };
  const mark = el => {
    if (!el.classList.contains('is-scrolling')) { el.classList.add('is-scrolling'); repaint(el); }
    clearTimeout(el._sbT); el._sbT = setTimeout(() => { el.classList.remove('is-scrolling'); repaint(el); }, 900);
  };
  addEventListener('scroll', () => mark(document.documentElement), { passive: true });
  document.querySelectorAll('.tp-list').forEach(l => l.addEventListener('scroll', () => mark(l), { passive: true }));
})();

/* the page's overlay scrollbar (user 2026-11-21; styles .vr-sb at the end of v49.css): the native bar is hidden on mouse screens, so a slim
   thumb floats at the right edge, sized and placed from the scroll position; shown while the page scrolls, while the pointer is within
   24px of the right edge, or while it is dragged; dragging it scrolls the page (through Lenis when it runs). */
(() => {
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const root = document.documentElement, bar = document.createElement('div');
  bar.className = 'vr-sb'; bar.setAttribute('aria-hidden', 'true'); document.body.appendChild(bar);
  const PAD = 4, MIN = 40;
  let hideT = 0, near = false, drag = null, raf = 0;
  const geo = () => { const vh = innerHeight, sh = root.scrollHeight, track = vh - PAD * 2; const h = Math.max(MIN, track * vh / sh); return { vh, sh, track, h, max: sh - vh }; };
  const place = () => { raf = 0; const g = geo(); if (g.max <= 0) { bar.style.display = 'none'; return; } bar.style.display = '';
    bar.style.height = g.h + 'px'; bar.style.transform = `translateY(${PAD + (g.track - g.h) * (scrollY / g.max)}px)`; };
  const show = () => { bar.classList.add('is-on'); clearTimeout(hideT); if (!near && !drag) hideT = setTimeout(() => bar.classList.remove('is-on'), 900); };
  const kick = () => { if (!raf) raf = requestAnimationFrame(place); };
  addEventListener('scroll', () => { kick(); show(); }, { passive: true });
  addEventListener('resize', kick);
  if ('ResizeObserver' in window) new ResizeObserver(kick).observe(document.body);
  addEventListener('pointermove', e => { const n = innerWidth - e.clientX < 24; if (n !== near) { near = n; show(); } }, { passive: true });
  bar.addEventListener('pointerdown', e => { e.preventDefault(); bar.setPointerCapture(e.pointerId); drag = { y: e.clientY, s: scrollY }; bar.classList.add('is-drag'); show(); });
  bar.addEventListener('pointermove', e => {
    if (!drag) return; const g = geo(); const to = drag.s + (e.clientY - drag.y) * (g.max / (g.track - g.h));
    if (window.__lenis) window.__lenis.scrollTo(Math.max(0, Math.min(g.max, to)), { immediate: true }); else scrollTo(0, to);
  });
  const end = () => { drag = null; bar.classList.remove('is-drag'); show(); };
  bar.addEventListener('pointerup', end); bar.addEventListener('pointercancel', end);
  place();
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

/* footer ornament border: fades and settles in when the footer comes into view (Footer.jsx [data-foot-frame]) */
(() => {
  const f = document.querySelector('[data-foot-frame]'); if (!f || !('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
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
