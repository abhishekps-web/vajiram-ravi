// Card groups rise in once as they enter (the .rise primitive in styles/v49.css; children get --i for the stagger).
import { $$, reduce } from '@/lib/site';

export default function initRise() {
  if (!reduce && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
    $$('.kcards, .tgrid, .pgrid, .rcards, .fgrid, .qgrid, .bgrid, .agrid, .wc__cards, .wc__stats, .sm__grid, .sm__more-list').forEach(g => { g.classList.add('rise'); [...g.children].forEach((c, i) => c.style.setProperty('--i', i)); io.observe(g); });
  }
}
