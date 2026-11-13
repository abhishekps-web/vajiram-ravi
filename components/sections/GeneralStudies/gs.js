// General Studies: the GS book's hover tilt, and the numbers that count up once.
import { $, $$, reduce } from '@/lib/site';

// books: at rest they keep the angled pose; on hover a book straightens to face you, then tilts toward the pointer
// as it moves over it (eased); on leave it eases back to the angled pose
const bookHover = book => {
  const flat = book.classList.contains('gsbook--p');   // programme books rest straight-on, the GS book angled
  const REST_X = flat ? 0 : 8, REST_Y = flat ? 0 : 24, TILT_X = 14, TILT_Y = 20;
  let over = false, px = 0, py = 0, rx = REST_X, ry = REST_Y, raf = 0;
  const step = () => {
    const tx = over ? -py * TILT_X : REST_X, ty = over ? px * TILT_Y : REST_Y;
    rx += (tx - rx) * .1; ry += (ty - ry) * .1;
    book.style.setProperty('--rx', rx.toFixed(3)); book.style.setProperty('--ry', ry.toFixed(3));
    if (over || Math.abs(tx - rx) > .02 || Math.abs(ty - ry) > .02) raf = requestAnimationFrame(step);
    else { raf = 0; book.classList.remove('is-live'); }
  };
  const go = () => { book.classList.add('is-live'); if (!raf) raf = requestAnimationFrame(step); };
  const track = e => {
    const r = book.getBoundingClientRect(), cl = v => Math.max(-1, Math.min(1, v));
    px = cl((e.clientX - (r.left + r.width / 2)) / (r.width / 2));
    py = cl((e.clientY - (r.top + r.height / 2)) / (r.height / 2));
  };
  book.addEventListener('pointerenter', e => { over = true; track(e); go(); });
  book.addEventListener('pointermove', track, { passive: true });
  book.addEventListener('pointerleave', () => { over = false; go(); });
};

// runs before Programmes renders its shelves, so it binds the GS book only (the programme books have their own physics)
export function initGsBooks() {
  const bookFx = !reduce && matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (bookFx) $$('.gsbook').forEach(bookHover);
}

export function initGsCount() {
  const gs = $('#gs');
  if (!reduce && 'IntersectionObserver' in window) {
    const gio = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return; gio.unobserve(e.target);
      $$('[data-count]', e.target).forEach(el => {
        const to = +el.dataset.count, t0 = performance.now();
        const step = t => { const k = Math.min(1, (t - t0) / 1300); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))).toLocaleString('en-IN'); if (k < 1) requestAnimationFrame(step); };
        el.textContent = '0'; requestAnimationFrame(step);
      });
    }), { threshold: .35 });
    gio.observe(gs);
  }
}
