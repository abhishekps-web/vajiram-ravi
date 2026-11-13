// Stories: postcards, as if dropped on a table, in a seamless looping track (#tcar); the section deals them in as it arrives.
import { $, esc, reduce } from '@/lib/site';
import { top10 } from '@/components/sections/Toppers/data/rankers';
import { TESTIMONIALS } from './data';

export function initStories() {
  const PST = [[-3.2, 12], [1.8, -14], [-1.5, 6], [2.6, -6]];
  const pstCard = (p, i, dup) => `<article class="pst" ${dup ? 'aria-hidden="true" inert' : ''} style="--t:${PST[i % 4][0]}deg;--y:${PST[i % 4][1]}px;--z:${(i % 9) + 1};--n:${i};--from-r:${i % 2 ? -9 : 9}deg">
      <div class="pst__in">
        <p class="pst__hd" aria-hidden="true">TESTIMONIAL</p>
        <blockquote class="pst__q"><img class="pst__ph" src="${esc(p.src)}" alt="${dup ? '' : esc(p.n)}" loading="lazy">${esc(TESTIMONIALS[p.r].replace(/^“|”$/g, ''))}</blockquote>
        <footer class="pst__who"><b>${esc(p.n)}</b><em>AIR ${p.r}, UPSC CSE ${p.y}</em></footer>
      </div></article>`;
  const pstList = top10.filter(p => TESTIMONIALS[p.r]).slice(0, 9);
  // two identical sets in one track: it slides left by exactly one set, so the loop has no seam; hovering pauses it
  $('#tcar').innerHTML = `<div class="pst__track" style="--dur:${(pstList.length * 370 / 48).toFixed(1)}s">${pstList.map((p, i) => pstCard(p, i, false)).join('')}${pstList.map((p, i) => pstCard(p, i, true)).join('')}</div>`;
  // reveal: when the section scrolls into view the heading rises out of its line and the cards are dealt onto the table one after another
  { const st = $('#stories');
    if (st) { if ('IntersectionObserver' in window && !reduce) { const io = new IntersectionObserver(es => { if (es[0].isIntersecting) { st.setAttribute('data-in', ''); io.disconnect(); } }, { threshold: .25 }); io.observe(st); } else st.setAttribute('data-in', ''); } }
  if (!reduce && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const tc = $('#tcar');
    tc.addEventListener('pointermove', e => { const c = e.target.closest('.pst'); if (!c) return; const r = c.getBoundingClientRect(); c.style.setProperty('--tx', ((e.clientX - r.left) / r.width - .5).toFixed(3)); c.style.setProperty('--ty', ((e.clientY - r.top) / r.height - .5).toFixed(3)); });
    tc.addEventListener('pointerout', e => { const c = e.target.closest('.pst'); if (c && !c.contains(e.relatedTarget)) { c.style.setProperty('--tx', 0); c.style.setProperty('--ty', 0); } });
  }
}
