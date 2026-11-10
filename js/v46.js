/* v46: hero video. Reduced motion or data-saver = poster only; pauses when the hero is off screen or the tab is hidden. */
(() => {
  const v = document.getElementById('dlVid'); if (!v) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saver = navigator.connection && navigator.connection.saveData;
  if (reduce || saver) { v.removeAttribute('autoplay'); v.pause(); return; }
  const play = () => { const p = v.play(); if (p && p.catch) p.catch(() => {}); };
  play();
  if ('IntersectionObserver' in window) new IntersectionObserver(es => es.forEach(e => e.isIntersecting ? play() : v.pause()), { threshold: .05 }).observe(document.querySelector('.dl'));
  document.addEventListener('visibilitychange', () => { if (document.hidden) v.pause(); else play(); });
})();
