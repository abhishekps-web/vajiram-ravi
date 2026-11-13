// Faculty: the clip-board cards in #team and the carousel controls (chevrons and page dots) under the rail.
import { $, esc, PHOTO } from '@/lib/site';
import { FACULTY, FACULTY_LI } from './data';
import { buttonHTML } from '@/components/ui/Button/button-core';

const liFor = (n, i) => FACULTY_LI[i] || `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(`${n} Vajiram & Ravi`)}`;

export function renderFaculty() {
  const FTILT = [-1.6, 1.2, -0.8, 1.6];
  const facCard = ([n, s], i, dup) => `<article class="fc pcd"${dup ? ' aria-hidden="true"' : ''} style="--t:${FTILT[i % 4]}deg"><span class="pcd__clipbox pcd__clipbox--b" aria-hidden="true"><i class="pcd__clip pcd__clip--b"></i></span><div class="pcd__in"><span class="pcd__ph"><span class="pcd__paper"><img src="${PHOTO(`faculty-${i % 4 + 1}.jpg`)}" alt="${esc(n)}" loading="lazy"></span></span><div class="pcd__to"><h3 class="pcd__n">${esc(n)}</h3><p class="pcd__l">${esc(s)}</p><a class="pcd__l pcd__l--p fc__pf" href="${esc(liFor(n, i))}" target="_blank" rel="noopener"${dup ? ' tabindex="-1"' : ''} aria-label="View ${esc(n)}'s profile on LinkedIn">View on LinkedIn <span aria-hidden="true">&rarr;</span></a></div></div><span class="pcd__clipbox pcd__clipbox--f" aria-hidden="true"><i class="pcd__clip pcd__clip--f"></i></span></article>`;
  $('#team').innerHTML = FACULTY.map((f, i) => facCard(f, i, false)).join('');
}

// faculty carousel: chevrons and page dots under the rail; one dot per screenful of cards
export function initFacultyCarousel() {
    const rail = $('#faculty .rail'), track = $('#team'), n = track.children.length;
    const nav = document.createElement('div'); nav.className = 'rnav';
    const chev = d => buttonHTML({ iconOnly: true, iconStart: d === 'prev' ? 'arrow-left' : 'arrow', label: `${d === 'prev' ? 'Previous' : 'Next'} faculty`, className: `rnav__b rnav__b--${d}` });
    nav.innerHTML = `${chev('prev')}<div class="rnav__dots"></div>${chev('next')}`;
    rail.append(nav);
    const dots = $('.rnav__dots', nav), pv = $('.rnav__b--prev', nav), nx = $('.rnav__b--next', nav);
    const step = () => { const c = track.children; return c.length > 1 ? c[1].offsetLeft - c[0].offsetLeft : track.clientWidth; };
    const per = () => { const cs = getComputedStyle(track), w = track.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight) + parseFloat(cs.columnGap || 0); return Math.max(1, Math.floor(w / step() + .05)); };
    let pages = 0;
    const cur = () => { const max = track.scrollWidth - track.clientWidth; return track.scrollLeft >= max - 2 ? pages - 1 : Math.min(pages - 1, Math.round(track.scrollLeft / (per() * step()))); };
    const go = k => track.scrollTo({ left: Math.max(0, Math.min(k, pages - 1)) * per() * step() });
    const sync = () => {
      const p = n <= per() ? 1 : Math.ceil((n - per()) / per()) + 1;
      if (p !== pages) {
        pages = p;
        dots.innerHTML = Array.from({ length: p }, (_, k) => `<button type="button" aria-label="Faculty, page ${k + 1} of ${p}"></button>`).join('');
      }
      nav.hidden = pages < 2;
      nav.style.setProperty('--cy', (track.offsetTop + (track.firstElementChild ? track.firstElementChild.offsetHeight : 340) / 2 + 6) + 'px');   // arrows sit level with the middle of the cards
      const k = cur();
      [...dots.children].forEach((d, j) => d.setAttribute('aria-current', j === k ? 'true' : 'false'));
      pv.disabled = k <= 0; nx.disabled = k >= pages - 1;
    };
    pv.addEventListener('click', () => go(cur() - 1));
    nx.addEventListener('click', () => go(cur() + 1));
    dots.addEventListener('click', e => { const b = e.target.closest('button'); if (b) go([...dots.children].indexOf(b)); });
    track.addEventListener('scroll', () => requestAnimationFrame(sync), { passive: true });
    addEventListener('resize', sync, { passive: true });
    sync(); setTimeout(sync, 600);
}
