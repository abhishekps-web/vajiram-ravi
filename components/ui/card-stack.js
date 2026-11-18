// Card stack for phones (760px and narrower), shared by Success stories (#tcar, stories.css) and Batches (#price, v49.css, end).
// Used as: initCardStack(root, track, cardSelector). The root holds the track and the .tstack-nav (data-tstack=prev|cur|next).
// Phones (760px and narrower): the cards form a stack (stories.css). Cards carry --p (0 = front, 1, 2 behind, the rest hidden);
// the front card is swiped away (or the arrows are used) and goes to the back. Larger screens keep the loop and ignore all this.
export default function initCardStack(tc, track, cardSel = '.pst') {
  const cards = [...track.querySelectorAll(cardSel + ':not([aria-hidden])')];
  const n = cards.length;
  if (n < 2) return;
  const mq = matchMedia('(max-width: 760px)');
  const cur = tc.querySelector('[data-tstack="cur"]');
  let at = 0, busy = false;

  const paint = () => {
    if (!mq.matches) {   // larger screens keep the loop: no stack state, and every card (not just the first) must take hover
      cards.forEach(c => {
        ['--p', '--sg'].forEach(v => c.style.removeProperty(v));
        c.classList.remove('is-front', 'is-gone'); c.removeAttribute('inert');
      });
      return;
    }
    cards.forEach((c, i) => {
      const p = (i - at + n) % n;
      c.style.setProperty('--p', p);
      c.style.setProperty('--sg', i % 2 ? -1 : 1);
      c.classList.toggle('is-front', p === 0);
      c.classList.toggle('is-gone', p > 2);
      c.toggleAttribute('inert', p > 0);
    });
    if (cur) cur.textContent = at + 1;
  };
  // dir 1 = next (the front card flies off), -1 = previous (the last card comes back to the front)
  const go = (dir, from) => {
    if (!mq.matches || busy) return;
    busy = true;
    const out = cards[at];
    at = (at + dir + n) % n;
    const fly = dir > 0 ? out : cards[at];
    fly.style.setProperty('--dir', dir > 0 ? (from || 1) : -1);
    fly.classList.add(dir > 0 ? 'is-out' : 'is-in');
    setTimeout(() => {
      fly.classList.remove('is-out', 'is-in'); fly.style.removeProperty('--sdx'); fly.style.removeProperty('--srd'); busy = false;
    }, 1500);
    // next: the front card goes behind first, then the others rise; previous: the others step back first, then the card comes up
    if (dir > 0) setTimeout(paint, 480); else paint();
  };
  tc.querySelector('[data-tstack="next"]')?.addEventListener('click', () => go(1));
  tc.querySelector('[data-tstack="prev"]')?.addEventListener('click', () => go(-1));

  // swipe the front card (horizontal drags only; vertical ones scroll the page)
  let sx = 0, sy = 0, dx = 0, id = null, front = null, locked = false;
  tc.addEventListener('pointerdown', e => {
    if (!mq.matches || busy || e.button) return;
    const c = e.target.closest(cardSel + '.is-front'); if (!c) return;
    front = c; id = e.pointerId; sx = e.clientX; sy = e.clientY; dx = 0; locked = false;
  });
  tc.addEventListener('pointermove', e => {
    if (!front || e.pointerId !== id) return;
    const mx = e.clientX - sx, my = e.clientY - sy;
    if (!locked) {
      if (Math.abs(my) > 10 && Math.abs(my) > Math.abs(mx)) { front = null; return; }
      if (Math.abs(mx) < 6) return;
      locked = true; front.classList.add('is-drag'); try { front.setPointerCapture(id); } catch (_) {}
    }
    dx = mx;
    front.style.setProperty('--sdx', dx + 'px');
    front.style.setProperty('--srd', (dx * .05).toFixed(2) + 'deg');
  });
  const end = e => {
    if (!front || e.pointerId !== id) return;
    const c = front; front = null;
    c.classList.remove('is-drag');
    if (!locked) return;
    if (Math.abs(dx) > 70) go(1, dx < 0 ? -1 : 1);
    else { c.style.removeProperty('--sdx'); c.style.removeProperty('--srd'); }
  };
  tc.addEventListener('pointerup', end);
  tc.addEventListener('pointercancel', end);
  tc.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') go(1); else if (e.key === 'ArrowLeft') go(-1);
  });
  // a swipe must not end in a click
  tc.addEventListener('click', e => { if (locked && Math.abs(dx) > 6) { e.preventDefault(); e.stopPropagation(); } }, true);

  mq.addEventListener?.('change', paint);
  paint();
}
