// Programmes: the books on shelves (tabs re-lay the shelves), their hover physics, the button that follows the cursor,
// and the links that open the course catalogue ([data-open] on a book, [data-cat] anywhere on the page).
import { $, $$, esc, ico, reduce, clamp } from '@/lib/site';
import { openCat } from '@/components/dialogs/course-catalog';
import { PTABS, PICON, PROGS } from './data';

export function initProgrammes() {
  const bookFx = !reduce && matchMedia('(hover: hover) and (pointer: fine)').matches;
  const pAct = p => p.cat != null
    ? `<button type="button" class="vbtn" data-open="${p.cat}"><span>View courses</span><span class="sq sq--30 sq--ink">${ico('arrow-white.svg')}</span></button>`
    : `<a class="vbtn" href="#contact" data-prog="${esc(p.prog)}"><span>View course</span><span class="sq sq--30 sq--ink">${ico('arrow-white.svg')}</span></a>`;
  // programmes: the original book cards (cover, spine, pages, ribbon, tag line, the button that rides on the book),
  // now standing on shelves lit like the Shopify Editions wall. Shelves of 4 on desktop, fewer on narrower screens.
  const pageG = $('#pgrid');
  pageG.className = 'shelves';
  pageG.removeAttribute('role');
  const bookHTML = (p, i, k) => `<article class="pbk" id="prog${i}" style="--k:${k}">
      <div class="gsbook gsbook--p gsbook--k${p.c}" ${p.cat != null ? `data-open="${p.cat}"` : `data-book-prog="${esc(p.prog)}"`} data-i="${i}" style="--i:${i}" role="button" tabindex="0" aria-label="${esc(p.t)}: ${p.cat != null ? 'view courses' : 'enquire'}">
        <div class="gsbook__in">
          <div class="gsbook__back"></div><div class="gsbook__pages"></div><div class="gsbook__top"></div><div class="gsbook__bottom"></div>
          <div class="gsbook__spine" aria-hidden="true"><b>${esc(p.sp)}</b></div>
          <div class="gsbook__cover"><div class="gsbook__face">
            <p class="gsbook__brand">Vajiram &amp; Ravi</p>
            <h3 class="gsbook__title">${esc(p.t)}</h3>
            <p class="gsbook__orn" aria-hidden="true"><i></i></p>
            <span class="gsbook__ico" aria-hidden="true"><svg viewBox="0 0 64 64"><circle class="r1" cx="32" cy="32" r="31"/><circle class="r2" cx="32" cy="32" r="27.5"/>${PICON[i] || PICON[0]}</svg></span>
            <p class="gsbook__foot">${esc(p.tab)}</p>
          </div></div>
          <span class="gsbook__ribbon" aria-hidden="true"></span>
        </div>
      </div>
      <div class="pbk__b" data-i="${i}"><p class="pc__tags">${esc(p.tab)}<i></i>Classroom<i></i>LIVE-Online</p>${pAct(p)}</div></article>`;
  const PGROUPS = PTABS.map(t => ({ t, items: PROGS.map((p, i) => (t === 'All' || p.tab === t) ? i : -1).filter(i => i > -1) }));
  let shelfCols = 0, active = PGROUPS[0].items;
  const renderShelves = force => {
    const w = innerWidth, cols = w > 1180 ? 4 : w > 900 ? 3 : 2;
    if (cols === shelfCols && !force) return; shelfCols = cols;
    const n = Math.ceil(active.length / cols);
    pageG.innerHTML = Array.from({ length: n }, (_, r) => {
      const idx = active.slice(r * cols, r * cols + cols), m = idx.length;
      return `<div class="shelf${r === n - 1 ? ' shelf--last' : ''}${m < cols ? ' shelf--part' : ''}" style="--r:${r};--cols:${cols};--n:${m}">
        <div class="shelf__glow" aria-hidden="true"></div>
        <div class="shelf__row">${idx.map((pi, k) => bookHTML(PROGS[pi], pi, (m > 1 ? (k - (m - 1) / 2) / ((m - 1) / 2) : 0).toFixed(2))).join('')}</div>
        <div class="shelf__board" aria-hidden="true"></div><div class="shelf__shadow" aria-hidden="true"></div></div>`;
    }).join('');
    $$('.pbk', pageG).forEach((b, i) => b.style.setProperty('--bi', i));   // book order, for the staggered entrance on a tab switch
    setSp();
  };
  // vanishing point of the backward tilt = the middle of the shelf: each book needs its horizontal distance from it
  const setSp = () => $$('#pgrid .shelf').forEach(sh => {
    const bs = $$('.pbk', sh); if (bs.length < 2) return;
    const a = bs[0].getBoundingClientRect(), b = bs[1].getBoundingClientRect();
    sh.style.setProperty('--sp', (((bs.length - 1) / 2) * Math.abs((b.left + b.width / 2) - (a.left + a.width / 2))).toFixed(1) + 'px');
  });
  renderShelves();
  // tabs: All / IGP / General Studies / Optional / Module Courses / Test Series; each one re-lays the shelves with just its programmes
  pageG.insertAdjacentHTML('beforebegin', `<div class="ptabs">
      <div class="seg" id="ptabs" role="tablist" aria-label="Programme type">${PGROUPS.map((g, k) => `<button type="button" role="tab" data-g="${k}" aria-selected="${!k}" aria-controls="pgrid">${esc(g.t)}<small>${g.items.length}</small></button>`).join('')}</div></div>`);
  pageG.setAttribute('role', 'tabpanel');
  /* tab to tab: one brand pill (.seg__ind) slides under the labels to the chosen tab; the shelves fade out (140ms), the panel eases from its old
     height to the new one (so the page below glides instead of jumping), and the new shelves lay in. A newer click cancels an older swap. */
  const tbar = $('#ptabs'), tbtns = $$('#ptabs button');
  tbar.insertAdjacentHTML('beforeend', '<span class="seg__ind" aria-hidden="true"></span>');
  const ind = $('.seg__ind', tbar);
  const placeInd = instant => {
    const sel = tbtns.find(b => b.getAttribute('aria-selected') === 'true'); if (!sel) return;
    if (instant) ind.style.transition = 'none';
    ind.style.transform = `translateX(${sel.offsetLeft}px)`; ind.style.width = sel.offsetWidth + 'px';
    if (instant) { void ind.offsetWidth; ind.style.transition = ''; }
  };
  placeInd(true); tbar.classList.add('has-ind');
  if ('ResizeObserver' in window) new ResizeObserver(() => placeInd(false)).observe(tbar);   // web fonts and resizes change the label widths; follow them smoothly (an instant snap here cut the pill's slide short)
  let gCur = 0, swapT = 0, swapId = 0;
  const showGroup = k => {
    if (k === gCur) return;
    pageG.style.setProperty('--dir', k > gCur ? 1 : -1);   // books slide the way the tabs moved (right tab: in from the right)
    gCur = k;
    tbtns.forEach(b => { const on = +b.dataset.g === k; b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1; });
    placeInd(reduce);
    const sel = tbtns[k]; tbar.scrollTo({ left: sel.offsetLeft - (tbar.clientWidth - sel.offsetWidth) / 2, behavior: reduce ? 'auto' : 'smooth' });
    active = PGROUPS[k].items;
    if (reduce) { renderShelves(true); return; }
    const me = ++swapId; clearTimeout(swapT);
    // shelves the new tab will not need fade out with their books (they are dropped at the swap)
    const rowsNext = Math.ceil(active.length / (shelfCols || 4));
    $$('.shelf', pageG).forEach((sh, r) => sh.classList.toggle('shelf--leave', r >= rowsNext));
    pageG.classList.remove('is-swap'); pageG.classList.add('is-out');
    swapT = setTimeout(() => {
      if (me !== swapId) return;
      const h0 = pageG.offsetHeight, rows0 = pageG.children.length;
      renderShelves(true);
      $$('.shelf', pageG).forEach((sh, r) => sh.classList.toggle('shelf--new', r >= rows0));   // only shelves the new tab adds fade in; the rest stay put
      pageG.classList.remove('is-out'); void pageG.offsetWidth; pageG.classList.add('is-swap');
      // the section takes its new height at once (animating height re-laid and repainted the whole page below every frame, which is
      // what made All / IGP / General Studies stutter); everything after it glides from where it was on the compositor instead
      const dy = h0 - pageG.offsetHeight;
      // only what is on screen glides (the rest moves unseen), so the browser never has to paint the whole page below into a layer
      if (Math.abs(dy) > 1) followers().forEach(el => { const r = el.getBoundingClientRect(); if (r.top < innerHeight + Math.max(dy, 0) && r.bottom > -Math.abs(dy)) el.animate([{ translate: `0 ${dy}px` }, { translate: '0 0' }], { duration: 580, easing: SPRING_SOFT }); });
    }, 190);
  };
  // the page content after the Programmes section (siblings of it and of its ancestors), not fixed layers or dialogs
  let follow = null;
  const followers = () => follow || (follow = (() => {
    const out = [];
    for (let n = pageG.closest('section'); n && n !== document.body; n = n.parentElement)
      for (let s = n.nextElementSibling; s; s = s.nextElementSibling)
        if (!/^(SCRIPT|STYLE|DIALOG|TEMPLATE)$/.test(s.tagName) && !['fixed', 'sticky'].includes(getComputedStyle(s).position) && !s.hidden) out.push(s);
    return out;
  })());
  // the books' spring (also in css/v49.css as --spring-soft), for the Web Animations call above
  const SPRING_SOFT = CSS.supports('transition-timing-function', 'linear(0, 1)') ? getComputedStyle(document.documentElement).getPropertyValue('--spring-soft').trim() || 'cubic-bezier(.22, 1, .36, 1)' : 'cubic-bezier(.22, 1, .36, 1)';
  tbtns.forEach((b, i) => { b.tabIndex = i ? -1 : 0; });
  $('#ptabs').addEventListener('click', e => { const b = e.target.closest('[data-g]'); if (b) showGroup(+b.dataset.g); });
  $('#ptabs').addEventListener('keydown', e => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; if (!d) return;
    const bs = $$('#ptabs button'), cur = bs.findIndex(b => b.getAttribute('aria-selected') === 'true'), nx = (cur + d + bs.length) % bs.length;
    showGroup(nx); bs[nx].focus();
  });
  // hover physics, measured frame by frame (bottom edge and top edge tracked separately) on the Shopify Editions shelf.
  // Two parts, each with its own timing:
  //   L  the lift: the whole cover rises 20px.            U  the unfold: it stands up from ~21.5deg tipped back to straight.
  //   rise : both go together, easeOutCubic over ~1.5 s (the unfold is a touch ahead).
  //   fall : starts the moment the pointer leaves. The cover drops under gravity (accelerating) and its BOTTOM hits the shelf first (~0.45 s);
  //          only then does the TOP swing back against the wall (linear, ~0.5 s, starting just before the landing). No bounce.
  //   pointer: while lifted it follows the cursor a little (a few px, a few degrees), smoothed.
  if (bookFx) {
    const LEAN = 21.5, LIFT = 20;
    const outCubic = u => 1 - Math.pow(1 - u, 3), inQuad = u => u * u, lin = u => u;
    const st = new WeakMap();
    const get = g => { let s = st.get(g); if (!s) { s = { L: 0, U: 0, tl: null, tu: null, hover: false, hx: 0, hy: 0, vx: 0, vy: 0, tx: 0, ty: 0, last: 0, raf: 0 }; st.set(g, s); } return s; };
    const tween = (s, key, to, delay, dur, ease) => { s['t' + key.toLowerCase()] = { from: s[key], to, t0: performance.now(), delay, dur, ease }; };
    const paint = (g, s) => {
      g.style.setProperty('--p', s.L.toFixed(4));
      g.style.transform = `perspective(6000px) translate3d(${(s.hx * 7 * s.L).toFixed(2)}px, ${(-LIFT * s.L + s.hy * 4 * s.L).toFixed(2)}px, 0) rotateX(${(LEAN * (1 - s.U)).toFixed(3)}deg)`;
      const inner = g.firstElementChild; if (inner) inner.style.transform = `rotateX(${(-s.hy * 8 * s.U).toFixed(3)}deg) rotateY(${(s.hx * 11 * s.U).toFixed(3)}deg)`;
    };
    const step = (s, key, now) => {
      const tk = 't' + key.toLowerCase(), tw = s[tk]; if (!tw) return false;
      const u = (now - tw.t0 - tw.delay) / tw.dur;
      if (u < 0) return true;
      const k = Math.min(1, u);
      s[key] = tw.from + (tw.to - tw.from) * tw.ease(k);
      if (k >= 1) { s[key] = tw.to; s[tk] = null; return false; }
      return true;
    };
    const tick = (g, now) => {
      const s = get(g); s.raf = 0;
      const dt = Math.max(1, Math.min(48, now - (s.last || now - 16))); s.last = now;
      let busy = step(s, 'L', now); busy = step(s, 'U', now) || busy;
      // critically damped spring toward the pointer: smooth, no sudden changes of speed
      const sd = (cur, target, vel) => { const w = 2 / .14, x = w * (dt / 1000), e = 1 / (1 + x + .48 * x * x + .235 * x * x * x), ch = cur - target, tmp = (vel + w * ch) * (dt / 1000); return [target + (ch + tmp) * e, (vel - w * tmp) * e]; };
      [s.hx, s.vx] = sd(s.hx, s.tx, s.vx); [s.hy, s.vy] = sd(s.hy, s.ty, s.vy);
      if (Math.abs(s.tx - s.hx) > .001 || Math.abs(s.ty - s.hy) > .001 || Math.abs(s.vx) > .01 || Math.abs(s.vy) > .01) busy = true; else { s.hx = s.tx; s.hy = s.ty; s.vx = 0; s.vy = 0; }
      paint(g, s);
      if (busy) s.raf = requestAnimationFrame(t => tick(g, t));
    };
    const kick = g => { const s = get(g); if (!s.raf) { s.last = 0; s.raf = requestAnimationFrame(t => tick(g, t)); } };
    const rise = g => {
      const s = get(g); if (s.hover) return; s.hover = true;
      tween(s, 'L', 1, 0, Math.max(250, 950 * (1 - s.L)), outCubic);
      tween(s, 'U', 1, 0, Math.max(250, 800 * (1 - s.U)), outCubic);
      kick(g);
    };
    const fall = g => {
      const s = get(g); if (!s.hover) return; s.hover = false; s.tx = 0; s.ty = 0;
      tween(s, 'L', 0, 0, Math.max(120, 450 * Math.sqrt(s.L)), inQuad);                       // gravity: the bottom reaches the shelf first
      tween(s, 'U', 0, 300 * Math.sqrt(s.L), Math.max(150, 500 * s.U), lin);                  // then the top leans back against the wall
      kick(g);
    };
    pageG.addEventListener('pointerover', e => { const c = e.target.closest('.pbk'); if (!c || c.contains(e.relatedTarget)) return; rise(c.querySelector('.gsbook')); });
    pageG.addEventListener('pointerout', e => { const c = e.target.closest('.pbk'); if (!c || c.contains(e.relatedTarget)) return; fall(c.querySelector('.gsbook')); });
    pageG.addEventListener('pointermove', e => {
      const c = e.target.closest('.pbk'); if (!c) return;
      const g = c.querySelector('.gsbook'), s = get(g), r = c.getBoundingClientRect();
      s.tx = clamp((e.clientX - (r.left + r.width / 2)) / (g.offsetWidth / 2), -1, 1);
      s.ty = clamp((e.clientY - (r.top + g.offsetHeight / 2)) / (g.offsetHeight / 2), -1, 1);
      if (s.hover) kick(g);
    });
  }
  let rzS; addEventListener('resize', () => { clearTimeout(rzS); rzS = setTimeout(() => { renderShelves(); setSp(); }, 150); });
  addEventListener('load', setSp); if (document.fonts && document.fonts.ready) document.fonts.ready.then(setSp);
  // a book without a course list: clicking it does what its "Enquire now" link does
  pageG.addEventListener('click', e => { const bk = e.target.closest('[data-book-prog]'); if (bk) bk.closest('.pbk').querySelector('[data-prog]').click(); });
  if (bookFx) {
    // the book's "Enquire now" / "View courses" button follows the cursor over the book, centred on it and kept
    // inside the cover; clicks pass through to the book
    let cur = null, raf = 0;
    const step = () => {
      raf = 0; if (!cur) return;
      const s = cur; s.x += (s.tx - s.x) * .22; s.y += (s.ty - s.y) * .22;
      s.b.style.transform = `translate3d(${s.x.toFixed(1)}px, ${s.y.toFixed(1)}px, 0)`;
      if (Math.abs(s.tx - s.x) + Math.abs(s.ty - s.y) > .3) raf = requestAnimationFrame(step);
    };
    pageG.addEventListener('pointermove', e => {
      const bk = e.target.closest('.gsbook'); if (!bk) return;
      const card = bk.closest('.pbk'), b = $('.pbk__b .vbtn', card);
      const r = bk.getBoundingClientRect(), c = card.getBoundingClientRect(), w = b.offsetWidth, h = b.offsetHeight;
      const tx = r.left - c.left + clamp(e.clientX - r.left, w / 2 + 14, r.width - w / 2 - 14) - w / 2;
      const ty = r.top - c.top + clamp(e.clientY - r.top, h / 2 + 14, r.height - h / 2 - 14) - h / 2;
      if (!cur || cur.b !== b) {
        if (cur) cur.b.classList.remove('is-follow');
        cur = { b, x: tx, y: ty, tx, ty };
        b.classList.add('is-follow');
      }
      cur.tx = tx; cur.ty = ty;
      if (!raf) raf = requestAnimationFrame(step);
    });
    pageG.addEventListener('pointerout', e => {
      const bk = e.target.closest('.gsbook');
      if (bk && cur && !bk.contains(e.relatedTarget)) cur = null;
    });
    pageG.addEventListener('focusin', e => { const b = e.target.closest('.pbk__b .vbtn'); if (b) { b.classList.remove('is-follow'); b.style.transform = ''; if (cur && cur.b === b) cur = null; } });
  }

  $('#pgrid').addEventListener('click', e => { const b = e.target.closest('[data-open]'); if (b) openCat(+b.dataset.open); });
  $('#pgrid').addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.gsbook')) { e.preventDefault(); e.target.click(); } });
  // mega menu and result-card links open the catalogue on that category
  document.addEventListener('click', e => { const a = e.target.closest('[data-cat]'); if (!a) return; e.preventDefault(); openCat(+a.dataset.cat); });
}
