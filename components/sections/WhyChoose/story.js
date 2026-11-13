/* Our story (the Why section): the pinned photographic scene, ported from vajiram-ravi-homepage.vercel.app (v16.js campus()).
   Original timeline, in vh of scroll after the section pins:
     0-168    the gate card grows from 22vw x 49vh to 92vw x 82vh while the full-bleed facade fades out
     140-196  "Why choose" slides left and "us?" right
     182-280  the card shrinks into the first chapter's photo slot (half the content width x 54vh) and the heading and chapters fade up
     280-322  the caption blurs in, its rule draws, the button rises
     then     each next chapter swings in about its bottom-left corner from 30deg while the track slides a screen (112vh, 7vh apart)
   No entrance (user 2026-11-13): the scene is entered at S0, its settled point, so the heading, the first photo and the first chapter
   are already in place when it pins (no zoom, word split or fade); only the chapter swing plays on the scroll.
   What is drawn trails the scroll on an exponential ease. Wide screens (900 x 600 and up) with motion only; otherwise css/story.css
   shows the chapters stacked. A spacer after the section supplies the scroll the scene plays over. */
export default function init() {
  const sec = document.getElementById('story');
  if (!sec) return;
  const stage = sec.querySelector('.cmp__stage'), card = sec.querySelector('.cmp__card'), track = sec.querySelector('.cmp__track');
  const panels = [...track.children], N = panels.length;
  const wide = matchMedia('(min-width: 900px) and (min-height: 600px)'), reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const seg = (u, a, b) => clamp((u - a) / (b - a));
  const io = t => ((t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2) + (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)) / 2;
  const lerp = (a, b, t) => a + (b - a) * t;
  // the first chapter's photo slot (css/story.css .cmp--run .cmp__ph): height SH vh, top ST of the screen; its width and left edge are
  // measured (slotW, slotL), since the photo takes half the content width (user 2026-11-13: an equal 50/50 split with the text)
  const SH = 54, ST = .36;
  const slot = panels[0].querySelector('.cmp__ph');
  const S0 = 322, STEP = 119, DUR = 112, TAU = .12;
  // the timeline keeps its original numbers and is entered OFF vh in: at S0 everything before the chapter swing has finished
  const OFF = S0;
  const RUN = S0 + (N - 1) * STEP + 40 - OFF;
  const spacer = document.createElement('div');
  spacer.className = 'cmp__run'; spacer.setAttribute('aria-hidden', 'true');
  const H = () => document.documentElement.clientHeight || innerHeight;
  let on = false, raf = 0, last = 0, su = null, slotW = 0, slotL = 0;

  // scroll progress in vh since the section's top reached the top of the screen (the section is sticky, so read the spacer's position)
  const aim = () => clamp((H() - spacer.getBoundingClientRect().top) / H() * 100, 0, RUN);

  const draw = s => {
    const u = s + OFF;
    const W = document.documentElement.clientWidth, h = H();
    const g = 1, m = io(seg(u, 182, 280)), st = stage.style;
    st.setProperty('--g', g.toFixed(4));
    st.setProperty('--s', io(seg(u, 140, 196)).toFixed(4));
    st.setProperty('--bo', (1 - seg(u, 147, 189)).toFixed(4));
    st.setProperty('--ov', seg(u, 182, 280).toFixed(4));
    st.setProperty('--ti', seg(u, 280, 322).toFixed(4));
    st.setProperty('--tr', seg(u, 287, 322).toFixed(4));
    st.setProperty('--tb', seg(u, 301, 322).toFixed(4));
    let shift = 0;
    panels.forEach((p, k) => {
      if (!k) return;
      const e = io(seg(u, S0 + (k - 1) * STEP, S0 + (k - 1) * STEP + DUR));
      shift += e;
      const r = 30 * (1 - e);
      p.style.transform = r > .01 ? `rotate(${r.toFixed(3)}deg)` : '';
    });
    track.style.setProperty('--tx', (-shift * 100).toFixed(3) + 'vw');
    const w = lerp(lerp(22, 92, g) * W / 100, slotW, m), ht = lerp(lerp(49, 82, g), SH, m) * h / 100;
    // settled, the card sits exactly on the first chapter's photo slot: left = slotL, top = ST
    const xEnd = slotL + slotW / 2 - W / 2, yEnd = (ST + SH / 200) * h - h / 2;
    const x = lerp(0, xEnd, m) - shift * W, y = lerp(0, yEnd, m);
    card.style.width = w.toFixed(1) + 'px';
    card.style.height = ht.toFixed(1) + 'px';
    card.style.transform = `translate(calc(-50% + ${x.toFixed(1)}px), calc(-50% + ${y.toFixed(1)}px))`;
  };

  const tick = now => {
    raf = 0;
    if (!on) return;
    const want = aim();
    const dt = last ? Math.min(.1, (now - last) / 1000) : 0; last = now;
    su = su === null ? want : su + (want - su) * (1 - Math.exp(-dt / TAU));
    draw(su);
    if (Math.abs(want - su) > .02) raf = requestAnimationFrame(tick); else { su = want; draw(su); last = 0; }
  };
  const queue = () => { if (on && !raf) raf = requestAnimationFrame(tick); };
  const size = () => { spacer.style.height = (RUN / 100 * H()).toFixed(0) + 'px'; slotW = slot.offsetWidth; slotL = slot.offsetLeft; };

  const set = () => {
    const want = wide.matches && !reduce.matches;
    if (want === on) return;
    on = want;
    sec.classList.toggle('cmp--run', on);
    if (on) {
      sec.after(spacer); size(); su = null;
      draw(aim());   // settled at once, before the first frame
      sec.querySelectorAll('img[loading="lazy"]').forEach(i => { i.loading = 'eager'; });   // off-screen chapters would never intersect
      queue();
    } else {
      spacer.remove();
      stage.removeAttribute('style'); track.removeAttribute('style'); card.removeAttribute('style');
      panels.forEach(p => { p.style.transform = ''; });
    }
  };

  // a focused link brings its chapter to rest on screen
  sec.addEventListener('focusin', e => {
    if (!on) return;
    const p = e.target.closest('.cmp__p'); if (!p) return;
    const k = panels.indexOf(p), u = (k ? S0 + (k - 1) * STEP + DUR : S0) - OFF;
    const y0 = spacer.getBoundingClientRect().top + scrollY - H();
    const y = y0 + u / 100 * H();
    if (window.__lenis) window.__lenis.scrollTo(y, { immediate: true }); else scrollTo({ top: y, behavior: 'auto' });
  });
  // ---- one step per gesture (user 2026-11-13): while the scene is pinned, one wheel flick, swipe or key press moves exactly one
  // chapter (its swing plays out), and past the last chapter it carries on to the next section (back past the first: to the one
  // before). A gesture's trailing wheel events (trackpad inertia) are swallowed until the wheel has been quiet for QUIET ms.
  const SNAP_S = 1.05, QUIET = 180;
  const stops = panels.map((_, k) => (k ? S0 + (k - 1) * STEP + DUR : S0) - OFF);   // vh into the run where each chapter rests
  const yAt = s => spacer.getBoundingClientRect().top + scrollY - H() + s / 100 * H();
  const curY = () => (window.__lenis ? window.__lenis.animatedScroll ?? scrollY : scrollY);
  let busy = false, quietUntil = 0;
  // the scene's zone: from a little before it pins until the next section reaches the top (a gesture there is ours)
  const inZone = y => y >= yAt(0) - H() * .5 - 1 && y <= yAt(RUN) + H() - 1;   // up to the next section reaching the top
  const target = (y, dir) => {
    if (dir > 0) {
      if (y < yAt(0) - 1) return yAt(0);
      const next = stops.find(s => yAt(s) > y + 2);
      return next === undefined ? yAt(RUN) + H() : yAt(next);   // after the last chapter: the next section at the top
    }
    if (y <= yAt(0) + 2) return null;                              // at the first chapter: let the page scroll up as usual
    const prev = [...stops].reverse().find(s => yAt(s) < y - 2);
    return prev === undefined ? yAt(0) : yAt(prev);
  };
  const go = y => {
    busy = true;
    const done = () => { busy = false; quietUntil = performance.now() + QUIET; };
    if (window.__lenis) window.__lenis.scrollTo(y, { duration: SNAP_S, lock: true, force: true, onComplete: done });
    else { scrollTo({ top: y, behavior: 'smooth' }); setTimeout(done, SNAP_S * 1000); }
  };
  const step = (dir, e) => {
    if (!on) return false;
    const y = curY();
    if (!inZone(y)) return false;
    const now = performance.now();
    if (busy || now < quietUntil) { quietUntil = Math.max(quietUntil, now + QUIET); e?.preventDefault(); e?.stopImmediatePropagation(); return true; }
    const t = target(y, dir);
    if (t === null) return false;
    e?.preventDefault(); e?.stopImmediatePropagation();
    go(t);
    return true;
  };
  // capture on window, so the smooth scroller (Lenis listens on window too) never sees a gesture the scene takes
  addEventListener('wheel', e => { if (Math.abs(e.deltaY) < 2 || e.ctrlKey) return; step(Math.sign(e.deltaY), e); }, { passive: false, capture: true });
  addEventListener('keydown', e => {
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName || '')) return;
    const dir = { ArrowDown: 1, PageDown: 1, ' ': e.shiftKey ? -1 : 1, ArrowUp: -1, PageUp: -1 }[e.key];
    if (dir) step(dir, e);
  }, { capture: true });
  let touchY = null;
  addEventListener('touchstart', e => { touchY = on && inZone(curY()) ? e.touches[0].clientY : null; }, { passive: true, capture: true });
  addEventListener('touchmove', e => {
    if (touchY === null) return;
    // pulling back down at the first chapter (or before the scene pins): the page scrolls up as usual
    if (e.touches[0].clientY > touchY && curY() <= yAt(0) + 2) { touchY = null; return; }
    e.preventDefault();
  }, { passive: false, capture: true });
  addEventListener('touchend', e => {
    if (touchY === null) return;
    const dy = touchY - (e.changedTouches[0]?.clientY ?? touchY); touchY = null;
    if (Math.abs(dy) > 30) step(Math.sign(dy));
  }, { passive: true, capture: true });

  addEventListener('scroll', queue, { passive: true });
  addEventListener('resize', () => { if (on) size(); queue(); });
  wide.addEventListener?.('change', set);
  reduce.addEventListener?.('change', set);
  set();
}
