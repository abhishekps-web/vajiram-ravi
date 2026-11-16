// Hero ground: the header band (.nav-band) and the hero section (.dl__ground) paint one background between them (v49.css, end).
// Its gradients and mask are laid out over the two together, so --hx-h holds their combined height: the band's plus the hero's.
import { $ } from '@/lib/site';

export function initHeroGround() {
  const band = $('.nav-band'), hero = $('#dlPin');
  if (!band || !hero) return;
  const set = () => document.documentElement.style.setProperty('--hx-h', band.offsetHeight + hero.offsetHeight + 'px');
  set();
  if ('ResizeObserver' in window) new ResizeObserver(set).observe(hero); else addEventListener('resize', set);
}
