/* Curtain footer: parks the footer behind the page (html.foot-curtain -> css/v49.css) when it fits the screen; re-checked on resize. */
(() => {
  const foot = document.querySelector('footer.foot'); if (!foot) return;
  const root = document.documentElement;
  const check = () => { root.classList.remove('foot-curtain'); if (foot.offsetHeight <= innerHeight) root.classList.add('foot-curtain'); };
  check(); addEventListener('resize', check); addEventListener('load', check);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(check);
})();
