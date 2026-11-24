/* v49 intro: the original logo reveal (iris, mandala ring, logo, tagline, curtain lifts) in brand orange. No video.
   The overlay markup is server-rendered (Intro.jsx) and the whole intro runs from the inline boot script (./boot.js, put in
   <head> by app/layout.jsx): it starts at the first paint, not after hydration. By the time this runs (after hydration) the
   intro has often ended. If it is still playing, the page behind it is made inert, so Tab cannot reach it, until
   it lifts ('vr:intro-done'). */
export default function init() {
  'use strict';
  var root = document.documentElement;
  if (!document.getElementById('intro') || !root.classList.contains('vrv-lock')) return;
  var behind = [].filter.call(document.body.children, function (n) { return n.id !== 'intro' && !n.inert; });
  behind.forEach(function (n) { n.inert = true; });
  document.addEventListener('vr:intro-done', function () { behind.forEach(function (n) { n.inert = false; }); }, { once: true });
}
