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

// the bar takes its solid "scrolled" style once the page leaves the top, and (user 2026-11-13) hides while the page scrolls down and
// comes back as soon as it scrolls up (.nav--away, public/css/navigation-bar.css). It slides out of view on its own layer (a
// transform on the fixed bar), so nothing on the page moves. It always shows near the top of the page, while a menu or the drawer
// is open, and while focus is inside it; a few px of travel in one direction (TRAVEL) are needed first, so jitter does not flicker it.
export function initNavScrolled() {
  const nav = $('#nav'); if (!nav) return;
  const TRAVEL = 10, TOP = 120;
  let navTick = false, lastY = scrollY, run = 0;
  const update = () => {
    navTick = false;
    const y = Math.max(0, scrollY), dy = y - lastY; lastY = y;
    nav.classList.toggle('scrolled', y > 20);
    const hold = y < TOP || $('#nav [aria-expanded="true"]') || (drawer && !drawer.hidden) || nav.contains(document.activeElement);
    if (hold) { run = 0; nav.classList.remove('nav--away'); return; }
    if (!dy) return;
    run = Math.sign(dy) === Math.sign(run) ? run + dy : dy;   // travel in the current direction
    if (run > TRAVEL) nav.classList.add('nav--away');
    else if (run < -TRAVEL) nav.classList.remove('nav--away');
  };
  addEventListener('scroll', () => { if (!navTick) { navTick = true; requestAnimationFrame(update); } }, { passive: true });
  nav.addEventListener('focusin', () => nav.classList.remove('nav--away'));   // tabbing into the bar brings it back
  update();
}

// "More" (user 2026-11-13): a priority+ bar. Wherever the links show (1024px and up), the bar keeps at least MIN px between its last
// link and the language switch / "Let's talk"; when they would come closer, the links move into the More menu one by one from the
// right (ORDER). Each has a twin in the menu (NavigationBar.jsx) that shows only while it is out, so nothing in the DOM moves; the
// two mega-menu buttons always stay. Re-measured on resize, when the fonts load and when the language changes (Hindi labels are
// longer). The menu opens on click, closes on a click outside, Escape, a choice, or when a mega menu opens.
export function initNavMore() {
  const wrap = $('#navMore'), btn = $('#moreBtn'), menu = $('#moreMenu'), links = $('.nav__links'), end = $('#nav .nav__end');
  if (!wrap || !btn || !menu || !links || !end) return;
  const ORDER = ['faq', 'batches', 'gs', 'toppers'], MIN = 40;
  const barLink = k => links.querySelector(`.nav__a[data-more="${k}"]`), twin = k => menu.querySelector(`[data-more="${k}"]`);
  const isOpen = () => wrap.classList.contains('is-open');
  const setOpen = open => {
    wrap.classList.toggle('is-open', open); btn.setAttribute('aria-expanded', open);
    if (open) setMega(false);
  };
  const free = () => {
    const kids = [...links.children].filter(e => !e.hidden && e.getClientRects().length && getComputedStyle(e).display !== 'none');
    const right = Math.max(...kids.map(e => e.getBoundingClientRect().right));
    return end.getBoundingClientRect().left - right;
  };
  const fit = () => {
    ORDER.forEach(k => { barLink(k)?.classList.remove('is-over'); const t = twin(k); if (t) t.hidden = true; });
    wrap.hidden = true;
    if (getComputedStyle(links).display !== 'none') {
      for (const k of ORDER) {
        if (free() >= MIN) break;
        barLink(k)?.classList.add('is-over'); const t = twin(k); if (t) t.hidden = false; wrap.hidden = false;
      }
    }
    if (wrap.hidden && isOpen()) setOpen(false);
  };
  let tick = 0;
  const refit = () => { cancelAnimationFrame(tick); tick = requestAnimationFrame(fit); };
  btn.addEventListener('click', e => { e.stopPropagation(); setOpen(!isOpen()); });
  menu.addEventListener('click', e => { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('click', e => { if (isOpen() && !wrap.contains(e.target)) setOpen(false); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && isOpen()) { setOpen(false); btn.focus(); } });
  wrap.addEventListener('focusout', e => { if (isOpen() && !wrap.contains(e.relatedTarget)) setOpen(false); });
  ['#exploreBtn', '#studyBtn'].forEach(s => $(s)?.addEventListener('click', () => setOpen(false)));
  addEventListener('resize', refit);
  document.addEventListener('langchange', refit);
  document.fonts?.ready.then(refit);
  fit();
}
