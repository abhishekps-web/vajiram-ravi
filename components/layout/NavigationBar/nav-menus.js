// Navigation: the mobile drawer, the two mega menus (All courses, Study materials) and the "scrolled" state of the bar.
import { $, $$, esc, SITE } from '@/lib/site';
import { CATS, CAT_D, STAGES } from '@/lib/data/courses';
import { STUDY_MENU } from './data';
import { buttonHTML } from '@/components/ui/Button/button-core';

let drawer, burger;
const megas = [];

export const setDrawer = open => { drawer.hidden = !open; burger.setAttribute('aria-expanded', open); burger.classList.toggle('x', open); };
export const setMega = open => megas.forEach(m => m.set(open && m === megas[0]));

// nav mega menus: open on hover with a mouse, on click / Enter, ArrowDown moves into the first link;
// one open at a time; they close on an outside click, on focus leaving, and on Escape
const navMega = (wrap, btn) => {
  const set = open => {
    if (open) megas.forEach(m => m !== api && m.set(false));
    wrap.classList.toggle('open', open); btn.setAttribute('aria-expanded', open);
    document.documentElement.classList.toggle('mega-open', $$('.explore.open').length > 0);   // blurs the page behind the menu (.mega-scrim)
  };
  let t;
  btn.addEventListener('click', () => set(!wrap.classList.contains('open')));
  wrap.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') { clearTimeout(t); set(true); } });
  wrap.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') t = setTimeout(() => set(false), 160); });
  document.addEventListener('click', e => { if (!wrap.contains(e.target)) set(false); });
  wrap.addEventListener('focusout', e => { if (!wrap.contains(e.relatedTarget)) set(false); });
  btn.addEventListener('keydown', e => { if (e.key === 'ArrowDown') { e.preventDefault(); set(true); const f = $('.mega__a', wrap); if (f) f.focus(); } });
  $$('.mega__a, .mega__cta, .mega__all', wrap).forEach(a => a.addEventListener('click', () => set(false)));
  const api = { set }; megas.push(api); return api;
};

export function initNavMenus() {
  drawer = $('#drawer'); burger = $('#burger');
  burger.addEventListener('click', () => setDrawer(drawer.hidden));
  $$('a', drawer).forEach(a => a.addEventListener('click', () => setDrawer(false)));
  document.body.insertAdjacentHTML('beforeend', '<div class="mega-scrim" aria-hidden="true"></div>');

  // All courses: the five stages as numbered columns along one line, each programme a row (name, one-line description, course count),
  // and a guidance column; programme rows open the catalogue on that category (the [data-cat] handler in Programmes)
  const total = CATS.reduce((n, c) => n + c.courses.length, 0);
  const plural = n => n + (n === 1 ? ' course' : ' courses');
  $('#mega').innerHTML = `<div class="mega__stages">${STAGES.map((s, i) => `<section class="mega__col" style="--i:${i}">
      <p class="mega__k"><b>${String(i + 1).padStart(2, '0')}</b>${s.k}</p>
      <ul>${s.cats.map(c => `<li><a class="mega__a" href="#courses" data-cat="${c}"><span class="mega__t">${esc(CATS[c].t)}</span><span class="mega__d">${esc(CAT_D[c])}</span><span class="mega__n">${plural(CATS[c].courses.length)}</span></a></li>`).join('')}</ul>
    </section>`).join('')}</div>
    <aside class="mega__aside">
      <p class="mega__k">Not sure where to start?</p>
      <p class="mega__p">A counsellor will match you to a programme for your stage, with no pressure to enrol.</p>
      ${buttonHTML({ href: '#contact', label: 'Talk to a counsellor', size: 'sm', iconEnd: 'arrow', fullWidth: true, className: 'mega__cta' })}
      <a class="mega__all" href="#courses">View all ${total} courses<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 4l4 4-4 4"/></svg></a>
    </aside>`;

  // Study materials: today's three headlines (the footer's news) in the guidance column above the CTA
  const heads = [...document.querySelectorAll('.foot__news-list li')].slice(0, 3).map(li => {
    const a = li.querySelector('a'), k = li.querySelector('span');
    return `<li><a class="mega__h" href="${a ? a.getAttribute('href') : SITE}" target="_blank" rel="noopener"><span class="mega__hk">${esc(k ? k.textContent : '')}</span><span class="mega__ht">${esc(a ? a.textContent : '')}</span></a></li>`;
  }).join('');
  $('#megaSm').innerHTML = `<div class="mega__stages">${STUDY_MENU.map(([k, items], i) => `<section class="mega__col${i ? '' : ' mega__col--feat'}" style="--i:${i}">
    <p class="mega__k"><b>${String(i + 1).padStart(2, '0')}</b>${esc(k)}${i ? '' : '<span class="mega__live"><i aria-hidden="true"></i>Live</span>'}</p>
    <ul>${items.map(([t, d, n]) => `<li><a class="mega__a" href="${SITE}" target="_blank" rel="noopener"><span class="mega__t">${esc(t)}</span><span class="mega__d">${n ? `<b class="mega__f">${esc(n)}</b>` : ''}${esc(d)}</span></a></li>`).join('')}</ul>
  </section>`).join('')}</div>
  <aside class="mega__aside" style="--i:${STUDY_MENU.length}">
    <p class="mega__k">Today’s headlines</p>
    ${heads ? `<ul class="mega__heads">${heads}</ul>` : ''}
    ${buttonHTML({ href: '#resources', label: 'Explore free resources', size: 'sm', iconEnd: 'arrow', fullWidth: true, className: 'mega__cta' })}
    <a class="mega__all" href="${SITE}" target="_blank" rel="noopener">View all study materials<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 4l4 4-4 4"/></svg></a>
  </aside>`;
  navMega($('#explore'), $('#exploreBtn'));
  navMega($('#studyNav'), $('#studyBtn'));
  addEventListener('keydown', e => { if (e.key === 'Escape') { setMega(false); setDrawer(false); } });   // setMega(false) closes every menu
}

// the bar takes its solid "scrolled" style once the page leaves the top
export function initNavScrolled() {
  let navTick = false;
  addEventListener('scroll', () => {
    if (!navTick) { navTick = true; requestAnimationFrame(() => { navTick = false; $('#nav').classList.toggle('scrolled', scrollY > 20); }); }
  }, { passive: true });
  $('#nav').classList.toggle('scrolled', scrollY > 20);
}
