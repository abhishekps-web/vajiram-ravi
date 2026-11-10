/* v49: hero slides follow the hero VIDEO's own clock, so the copy always matches what is on screen, including when it loops.
   The video (20.04 s) has eight shots; two shots per slide:
     slide 1  0.00 - 5.65   a student arrives at the institute, then a full classroom        (legacy)
     slide 2  5.65 - 10.65  a student with his mentor, then late-night study from books     (Prelims, foundation)
     slide 3 10.65 - 14.65  an exam hall writing, then a close-up of handwriting            (Mains, writing)
     slide 4 14.65 - 20.04  the interview panel, then the officer walking into the sunrise  (achievement)
   Progress bars fill from the video time. Clicking a bar, the arrow keys or a swipe seek the video to that slide. */
(() => {
  const hero = document.getElementById('dlPin'), reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const vid = document.getElementById('dlVid');
  if (!hero || reduce) return;
  const scs = [...hero.querySelectorAll('.sc')], bars = [...hero.querySelectorAll('#dlProg button')];
  const N = 4, CUT = [0, 5.65, 10.65, 14.65];             // start time of each slide in the video (just before the cut, so the text is in as the picture changes)
  let END = 20.04, cur = -1, raf = 0, introDone = !document.documentElement.classList.contains('vrv-lock'), inView = false, tabOn = !document.hidden;
  let clock = 0, last = 0;                                 // fallback clock, used only if the video is not playing (e.g. data saver)
  const bounds = () => CUT.concat(vid && vid.duration && isFinite(vid.duration) ? vid.duration : END);
  const slideAt = t => { const b = bounds(); for (let i = N - 1; i >= 0; i--) if (t >= b[i]) return i; return 0; };
  const show = n => {
    cur = n; hero.dataset.s = n;
    scs.forEach((s, i) => s.classList.toggle('on', i === n - 1));
    bars.forEach((b, i) => b.setAttribute('aria-current', i === n ? 'true' : 'false'));
  };
  const timeNow = now => {
    if (vid && !vid.paused && vid.readyState >= 2) { clock = vid.currentTime; last = now; return clock; }
    const dt = Math.min(100, now - (last || now)); last = now; clock = (clock + dt / 1000) % bounds()[N]; return clock;   // no video playback: keep the same timeline on our own clock
  };
  const frame = now => {
    raf = 0; const t = timeNow(now), b = bounds(), i = slideAt(t);
    if (i !== cur) show(i);
    bars.forEach((el, k) => el.style.setProperty('--f', k < i ? 1 : k === i ? ((t - b[k]) / (b[k + 1] - b[k])).toFixed(4) : 0));
    sync();
  };
  const sync = () => { if (introDone && inView && tabOn && !raf) raf = requestAnimationFrame(frame); };
  const seek = n => { n = (n + N) % N; const t = CUT[n]; clock = t; if (vid) { try { vid.currentTime = t; } catch (e) {} const p = vid.play(); if (p && p.catch) p.catch(() => {}); } show(n); sync(); };
  if (!introDone) document.addEventListener('vr:intro-done', () => { introDone = true; seek(0); }, { once: true });   // the video restarts with slide 1 once the intro screen has lifted
  bars.forEach((b, i) => b.addEventListener('click', () => seek(i)));
  document.addEventListener('visibilitychange', () => { tabOn = !document.hidden; last = 0; sync(); });
  new IntersectionObserver(es => { inView = es[0].isIntersecting; last = 0; sync(); }, { threshold: .3 }).observe(hero);
  hero.addEventListener('keydown', e => { if (e.key === 'ArrowRight') seek(cur + 1); else if (e.key === 'ArrowLeft') seek(cur - 1); });
  let x0 = null;
  hero.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
  hero.addEventListener('touchend', e => { if (x0 == null) return; const dx = e.changedTouches[0].clientX - x0; x0 = null; if (Math.abs(dx) > 50) seek(cur + (dx < 0 ? 1 : -1)); }, { passive: true });
  show(0); sync();
})();

/* nav: transparent while the hero is in view */
(() => {
  const nav = document.getElementById('nav'), hero = document.getElementById('dlPin'); if (!nav || !hero) return;
  let tick = false;
  const f = () => { tick = false; nav.classList.toggle('nav--hero', scrollY < hero.offsetHeight - 120); };
  addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(f); } }, { passive: true });
  addEventListener('resize', f); f();
})();

/* hero -> toppers: q = how far the Toppers sheet has risen into view (0 = just below the fold, 1 = at the top).
   q darkens the hero; the sheet is solid, its content fades and lifts in between q .12 and .7. */
(() => {
  const hero = document.getElementById('dlPin'), top = document.getElementById('toppers');
  if (!hero || !top || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let tick = false;
  const c = (v) => Math.max(0, Math.min(1, v));
  const f = () => {
    tick = false;
    const q = c(1 - top.getBoundingClientRect().top / innerHeight);
    hero.style.setProperty('--cover', q.toFixed(3));
    top.style.setProperty('--f', c((q - .12) / .58).toFixed(3));
  };
  addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(f); } }, { passive: true });
  addEventListener('resize', f); f();
})();

/* Why choose: stacked cards shrink a touch as the next one covers them; counter follows the top card */
(() => {
  const sec = document.getElementById('why'); if (!sec) return;
  const cards = [...sec.querySelectorAll('.wy__c')], now = document.getElementById('wyNow');
  const left = sec.querySelector('.wy__l');
  const measure = () => { if (left) sec.style.setProperty('--lh', left.offsetHeight + 'px'); };
  measure(); addEventListener('resize', measure); if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure); addEventListener('load', measure);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const c = v => Math.max(0, Math.min(1, v));
  if (!reduce && cards.length) {
    let tick = false;
    const f = () => {
      tick = false; let cur = 0;
      cards.forEach((el, i) => {
        const nx = cards[i + 1];
        if (nx) {
          const h = el.offsetHeight, stick = parseFloat(getComputedStyle(el).top) || 0;
          const t = c(1 - (nx.getBoundingClientRect().top - stick) / (h * .9));
          el.style.setProperty('--sc', (1 - t * .05).toFixed(3)); el.style.setProperty('--dim', t.toFixed(3));
          if (t > .5) cur = i + 1;
        }
      });
      if (now) now.textContent = '0' + (cur + 1);
    };
    addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(f); } }, { passive: true });
    addEventListener('resize', f); f();
  }
})();

/* CTA buttons: the reference build. Wraps the label in two stacked copies (it rolls up on hover), puts two teer-arrows in the
   circle (one slides out as the other slides in). Also picks up buttons added later. */
(() => {
  const ARROW = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 8h11"/><path d="M8.6 3.6C9.4 5.9 11.2 7.4 13.5 8 11.2 8.6 9.4 10.1 8.6 12.4"/></svg>';
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches, reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const enhance = el => {
    if (el.dataset.cta) return; el.dataset.cta = '1'; el.classList.add('cta');
    const sq = el.querySelector(':scope > .sq');
    const rest = [...el.childNodes].filter(n => n !== sq);
    const html = rest.map(n => n.nodeType === 1 ? n.outerHTML : n.textContent).join('').trim();
    const live = !!el.querySelector('[id]');              // text that other scripts rewrite (e.g. "View all 2025"): keep a single copy
    rest.forEach(n => n.remove());
    const label = document.createElement('span'); label.className = 'btn__label';
    label.innerHTML = live ? '<span class="btn__t">' + html + '</span>' : '<span class="btn__t">' + html + '</span><span class="btn__t" aria-hidden="true">' + html + '</span>';
    el.insertBefore(label, sq || null);
    if (sq) sq.innerHTML = ARROW + ARROW;
  };
  const SEL = '.bt, .pbtn, .talk, .vbtn, .inv__reg';
  const scan = root => (root.matches && root.matches(SEL) ? [root] : []).concat([...(root.querySelectorAll ? root.querySelectorAll(SEL) : [])]).forEach(enhance);
  scan(document);
  new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => { if (n.nodeType === 1) scan(n); }))).observe(document.body, { childList: true, subtree: true });
})();

/* nav: mark the link of the section currently on screen */
(() => {
  const links = [...document.querySelectorAll('.nav__links a.nav__a[href^="#"]')]; if (!links.length) return;
  const map = links.map(a => ({ a, el: document.querySelector(a.getAttribute('href')) })).filter(x => x.el && x.el.id !== 'top');
  let tick = false;
  const f = () => {
    tick = false; const y = innerHeight * .35; let cur = null;
    map.forEach(m => { const r = m.el.getBoundingClientRect(); if (r.height && r.top <= y && r.bottom > y) cur = m.a; });
    links.forEach(a => a.classList.toggle('is-current', a === cur));
  };
  addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(f); } }, { passive: true });
  addEventListener('resize', f); f();
})();

/* scroll focus: each section's content brightens GRADUALLY as the section rises toward the middle of the screen (fully lit once its top
   reaches halfway) and dims gradually as it leaves (its bottom travelling from halfway up to the top of the screen). Tied to the scroll position,
   so it eases with your scrolling instead of switching. The hero and the Toppers sheet (own reveal) are left alone. */
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const MAP = {
    courses: '.band__in', why: '.wy__in', batches: ':scope > *', bnr: ':scope > *', gs: '.gs__in, .gsbook',
    faculty: ':scope > *', stories: ':scope > *', contact: '.contact__in', resources: ':scope > *', visit: '.lv__in', faq: ':scope > *'
  };
  const secs = [];
  Object.keys(MAP).forEach(id => {
    const s = document.getElementById(id); if (!s) return;
    const kids = [...s.querySelectorAll(MAP[id])].filter(e => e.parentElement === s || id === 'courses' || id === 'gs');
    if (!kids.length) return;
    kids.forEach(k => k.classList.add('fx')); secs.push(s);
  });
  document.documentElement.classList.add('fx-on');
  const MIN = .16, c = v => Math.max(0, Math.min(1, v)), ease = t => t * t * (3 - 2 * t);
  let tick = false;
  const update = () => {
    tick = false; const vh = innerHeight;
    secs.forEach(s => {
      const r = s.getBoundingClientRect();
      const rise = c((vh - r.top) / (vh * .5));          // 0 when the top enters at the bottom of the screen, 1 when it reaches halfway
      const leave = c(r.bottom / (vh * .5));              // 1 while the bottom is at or below halfway, 0 when it reaches the top of the screen
      s.style.setProperty('--fx', (MIN + (1 - MIN) * ease(Math.min(rise, leave))).toFixed(3));
    });
  };
  const kick = () => { if (!tick) { tick = true; requestAnimationFrame(update); } };
  addEventListener('scroll', kick, { passive: true }); addEventListener('resize', kick); update();
})();
