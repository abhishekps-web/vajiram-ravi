/* v49 intro: the original logo reveal (iris, mandala ring, logo, tagline, curtain lifts) in brand orange. No video.
   Skip button, Esc or scrolling ends it. Fires 'vr:intro-done' and clears html.vrv-lock.
   The overlay markup is server-rendered (components/Intro.jsx) and html.vrv-lock is set before paint (app/layout.jsx);
   this script starts the reveal and lifts it. It hides the overlay rather than removing it, since React owns that node. */
export default function init() {
  'use strict';
  // plays on every load, reloads included (user 2026-11-11; it used to play once per browser session)
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;
  var el = document.querySelector('.vrv');
  if (!el) { root.classList.remove('vrv-lock'); return; }
  root.classList.add('vrv-lock');
  var done = false, t = 0;
  var finish = function () {
    if (done) return; done = true; clearTimeout(t);
    el.classList.add('vrv--out');
    setTimeout(function () { el.hidden = true; root.classList.remove('vrv-lock'); document.dispatchEvent(new CustomEvent('vr:intro-done')); }, reduce ? 420 : 850);
  };
  el.querySelector('.vrv__skip').addEventListener('click', finish);
  addEventListener('keydown', function k(e) { if (e.key === 'Escape') { removeEventListener('keydown', k); finish(); } });
  ['wheel', 'touchmove'].forEach(function (ev) { addEventListener(ev, finish, { passive: true, once: true }); });
  requestAnimationFrame(function () { el.classList.add('vrv--fin'); t = setTimeout(finish, reduce ? 1500 : 2500); });
}
