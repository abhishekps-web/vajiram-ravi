/* Offscreen pause (performance audit 2026-11-16): every section's CSS animations (the Toppers sparks and beams, the Programmes books,
   the batch-ticket glints, the Stories marquee, the footer frame …) are paused while that section is well off screen, and resume
   as it comes within a screen of the viewport. Many of them loop forever and are not compositor-only, so they repainted every frame
   from the first load, on sections nobody could see. Only animation-play-state changes (transitions and entrances are untouched);
   the rule is at the end of public/css/v49.css (.anim-off). Runs last, once every section's behaviour has built its markup. */
export default function initOffscreenPause() {
  if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('anim-off', !e.isIntersecting)), { rootMargin: '100% 0px' });
  document.querySelectorAll('main section, footer').forEach(s => io.observe(s));
}
