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

  // ---- one step per gesture (user 2026-11-13): while the scene is pinned, one wheel flick, swipe or key press moves exactly one
  // chapter (its swing plays out); past the last chapter it carries on to the next section, and back past the first the page
  // scrolls up as usual (never trapped). Positions are read live (yAt), so resizes and content above changing height are safe.
  //   entering:  normal scrolling that would carry past the scene's first chapter (or, from below, into its tail) stops on it
  //   inertia:   a gesture's trailing wheel events are swallowed until the wheel is quiet for QUIET ms, unless a new flick clearly
  //              starts (a delta well above the dying tail), so a quick second flick is not lost
  //   settling:  if the scroll comes to rest between chapters by any other means (scrollbar, Home/End, an anchor, find in page,
  //              a resize), it eases to the nearest chapter; never while a pointer is held down (a scrollbar drag)
  const SNAP_S = 1.05, QUIET = 160, SETTLE_MS = 180;
  const stops = panels.map((_, k) => (k ? S0 + (k - 1) * STEP + DUR : S0) - OFF);   // vh into the run where each chapter rests
  const yAt = s => spacer.getBoundingClientRect().top + scrollY - H() + s / 100 * H();
  const lenis = () => window.__lenis;
  const curY = () => (lenis() ? lenis().animatedScroll ?? scrollY : scrollY);
  const zoneA = () => yAt(0);                     // the first chapter at rest (the scene has just pinned)
  const zoneB = () => yAt(RUN) + H();             // the next section at the top of the screen
  const inside = y => y >= zoneA() - 1 && y <= zoneB() - 1;
  const restPoints = () => [...stops.map(yAt), zoneB()];
  let busy = false, quietUntil = 0, lastAbs = 0, held = false, settleT = 0, safetyT = 0;

  const target = (y, dir) => {
    if (dir > 0) {
      const next = stops.find(s => yAt(s) > y + 2);
      return next === undefined ? zoneB() : yAt(next);              // after the last chapter: the next section at the top
    }
    if (y <= zoneA() + 2) return null;                               // at the first chapter: the page scrolls up as usual
    const prev = [...stops].reverse().find(s => yAt(s) < y - 2);
    return prev === undefined ? zoneA() : yAt(prev);
  };
  const go = y => {
    busy = true; clearTimeout(settleT); clearTimeout(safetyT);
    const done = () => { if (!busy) return; busy = false; clearTimeout(safetyT); quietUntil = performance.now() + QUIET; };
    safetyT = setTimeout(done, SNAP_S * 1000 + 250);                 // in case the scroller never reports the end
    if (lenis()) lenis().scrollTo(y, { duration: SNAP_S, lock: true, force: true, onComplete: done });
    else { scrollTo({ top: y, behavior: 'smooth' }); }
  };
  const swallow = e => { if (e) { e.preventDefault(); e.stopImmediatePropagation(); } };

  // capture on window, so the smooth scroller (Lenis listens on window too) never sees a gesture the scene takes
  addEventListener('wheel', e => {
    if (!on || e.ctrlKey || Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;   // pinch-zoom and sideways swipes are not ours
    const now = performance.now(), d = e.deltaY * (e.deltaMode === 1 ? 33 : e.deltaMode === 2 ? H() : 1), abs = Math.abs(d);
    if (busy) { swallow(e); quietUntil = now + QUIET; lastAbs = abs; return; }
    if (now < quietUntil && !(abs >= 24 && abs > lastAbs * 1.6)) { swallow(e); quietUntil = now + QUIET; lastAbs = abs; return; }
    lastAbs = abs;
    if (abs < 1) return;
    const y = curY(), dir = Math.sign(d), A = zoneA(), B = zoneB();
    if (!inside(y)) {
      // entering: stop on the first chapter (from above) or the last (from below) instead of scrolling past it
      const T = (lenis() ? lenis().targetScroll : y) + d;
      if (dir > 0 && y < A && T >= A - 1) { swallow(e); go(A); }
      else if (dir < 0 && y > B - 1 && T < B - 1) { swallow(e); go(yAt(stops[N - 1])); }
      return;
    }
    const t = target(y, dir);
    if (t === null) return;
    swallow(e); go(t);
  }, { passive: false, capture: true });

  // keys: arrows, Page Up/Down and Space (not Space on a button or link, which it activates)
  addEventListener('keydown', e => {
    if (!on || e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
    const el = document.activeElement;
    if (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) return;
    if (e.key === ' ' && el?.closest?.('button, a[href], summary, [role="button"]')) return;
    const dir = { ArrowDown: 1, PageDown: 1, ' ': e.shiftKey ? -1 : 1, ArrowUp: -1, PageUp: -1 }[e.key];
    if (!dir) return;
    const y = curY();
    if (busy) { if (inside(y)) swallow(e); return; }
    if (!inside(y)) return;
    const t = target(y, dir);
    if (t === null) return;
    swallow(e); go(t);
  }, { capture: true });

  // touch: only once the scene is pinned (the section above scrolls by touch as usual); a swipe of 30px or more is one step
  let touchY = null;
  addEventListener('touchstart', e => { touchY = on && inside(curY()) && e.touches.length === 1 ? e.touches[0].clientY : null; }, { passive: true, capture: true });
  addEventListener('touchmove', e => {
    if (touchY === null) return;
    // pulling back down at the first chapter: the page scrolls up as usual
    if (e.touches[0].clientY > touchY && curY() <= zoneA() + 2 && !busy) { touchY = null; return; }
    e.preventDefault();
  }, { passive: false, capture: true });
  addEventListener('touchend', e => {
    if (touchY === null) return;
    const dy = touchY - (e.changedTouches[0]?.clientY ?? touchY); touchY = null;
    if (busy || Math.abs(dy) < 30) return;
    const t = target(curY(), Math.sign(dy));
    if (t !== null) go(t);
  }, { passive: true, capture: true });

  // settling: a scroll that comes to rest between chapters eases to the nearest one
  const settle = () => {
    if (!on || busy || held) return;
    const y = curY();
    if (!inside(y)) return;
    const pts = restPoints(), near = pts.reduce((a, b) => (Math.abs(b - y) < Math.abs(a - y) ? b : a));
    if (Math.abs(near - y) > 3) go(near);
  };
  const armSettle = () => { clearTimeout(settleT); if (on && !busy) settleT = setTimeout(settle, SETTLE_MS); };
  addEventListener('scroll', armSettle, { passive: true });
  addEventListener('pointerdown', () => { held = true; clearTimeout(settleT); }, { capture: true, passive: true });
  addEventListener('pointerup', () => { held = false; armSettle(); }, { capture: true, passive: true });
  addEventListener('pointercancel', () => { held = false; armSettle(); }, { capture: true, passive: true });
  addEventListener('resize', armSettle);

  // a focused link brings its chapter to rest on screen (smoothly, as a gesture would)
  sec.addEventListener('focusin', e => {
    if (!on || busy) return;
    const p = e.target.closest('.cmp__p'); if (!p) return;
    const y = yAt(stops[panels.indexOf(p)]);
    if (Math.abs(curY() - y) > 3) go(y);
  });

  addEventListener('scroll', queue, { passive: true });
  addEventListener('resize', () => { if (on) size(); queue(); });
  wide.addEventListener?.('change', set);
  reduce.addEventListener?.('change', set);
  set();
}
