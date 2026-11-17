// Hero ground: the header band (.nav-band) and the hero section (.dl__ground) paint one background between them (v49.css, end).
// Its gradients and mask are laid out over the two together, so --hx-h holds their combined height: the band's plus the hero's.
import { $ } from '@/lib/site';

export function initHeroGround() {
  const band = $('.nav-band'), hero = $('#dlPin');
  if (!band || !hero) return;
  const set = () => {
    document.documentElement.style.setProperty('--hx-h', band.offsetHeight + hero.offsetHeight + 'px');
    // the hero is taller than the screen (the promo banners under the stats): it scrolls until its foot reaches the bottom of the
    // screen and is pinned from there while Programmes slides over it (as in Kevin's build: top = min(0, screen - hero))
    hero.style.setProperty('--hx-stick', Math.min(0, innerHeight - hero.offsetHeight) + 'px');
    // --hx-tall: 1 while the pinned hero fills the screen, so the desktop hold before Programmes (v49.css, end) never opens a gap under it
    hero.parentElement.style.setProperty('--hx-tall', hero.offsetHeight >= innerHeight ? '1' : '0');
  };
  set();
  if ('ResizeObserver' in window) new ResizeObserver(set).observe(hero);
  addEventListener('resize', set);
}
