/* Contact us: the campus photos (#cmGal, Visit.jsx; public/css/contact-compact.css), as in Kevin's build (js/visit-gallery.js). The
   photos cross-fade on their own, one every 5 s, while the gallery is on screen; the pointer over it holds the current one. The
   caption and the dots follow; a dot or the arrows at the sides (shown on hover) go to a photo and start its 5 s again. With
   prefers-reduced-motion the photos do not change on their own; the dots and arrows still work. */
export default function init() {
  const gal = document.getElementById('cmGal'); if (!gal) return;
  const slides = [...gal.querySelectorAll('.cx__ph')], dots = [...gal.querySelectorAll('.cx__dots button')], cap = gal.querySelector('.cx__cap');
  if (slides.length < 2) return;
  const auto = !matchMedia('(prefers-reduced-motion: reduce)').matches;
  const T = 5000;
  let i = 0, seen = false, held = false, timer = 0;

  const run = () => { clearTimeout(timer); if (auto && seen && !held && !document.hidden) timer = setTimeout(() => show(i + 1), T); };
  function show(n) {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => { s.classList.toggle('is-on', k === i); s.toggleAttribute('aria-hidden', k !== i); });
    dots.forEach((d, k) => { d.classList.toggle('is-on', k === i); if (k === i) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current'); });
    if (cap) cap.textContent = slides[i].dataset.cap || '';
    run();
  }

  gal.querySelector('.cx__nav--prev')?.addEventListener('click', () => show(i - 1));
  gal.querySelector('.cx__nav--next')?.addEventListener('click', () => show(i + 1));
  dots.forEach((d, k) => d.addEventListener('click', () => show(k)));

  gal.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') { held = true; run(); } });
  gal.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') { held = false; run(); } });
  document.addEventListener('visibilitychange', run);
  new IntersectionObserver(es => { seen = es[0].isIntersecting; run(); }, { threshold: .3 }).observe(gal);
}
