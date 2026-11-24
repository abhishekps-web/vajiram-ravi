export default function initCardStack(tc, track, cardSel = '.pst') {
  const cards = [...track.querySelectorAll(cardSel + ':not([aria-hidden])')];
  const n = cards.length;
  if (n < 2) return;
  const mq = matchMedia('(max-width: 760px)');
  const cur = tc.querySelector('[data-tstack="cur"]');
  let at = 0, busy = false;

  const paint = () => {
    if (!mq.matches) {
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
  const go = (dir, from) => {
    if (!mq.matches || busy) return;
    busy = true;
    const out = cards[at];
    at = (at + dir + n) % n;
    const fly = dir > 0 ? out : cards[at];
    if (dir > 0) {
      out.classList.remove('is-front'); out.setAttribute('inert', '');
      cards[at].classList.add('is-front'); cards[at].removeAttribute('inert');
    }
    fly.style.setProperty('--dir', dir > 0 ? (from || 1) : -1);
    fly.classList.add(dir > 0 ? 'is-out' : 'is-in');
    setTimeout(() => {
      fly.classList.remove('is-out', 'is-in'); fly.style.removeProperty('--sdx'); fly.style.removeProperty('--srd');
    }, 1500);
    setTimeout(() => { busy = false; }, 160);
    if (dir > 0) setTimeout(paint, 480); else paint();
  };
  tc.querySelector('[data-tstack="next"]')?.addEventListener('click', () => go(1));
  tc.querySelector('[data-tstack="prev"]')?.addEventListener('click', () => go(-1));

  let sx = 0, sy = 0, st = 0, dx = 0, id = null, front = null, locked = false;
  tc.addEventListener('pointerdown', e => {
    if (!mq.matches || e.button) return;
    const c = e.target.closest(cardSel + '.is-front'); if (!c) return;
    front = c; id = e.pointerId; sx = e.clientX; sy = e.clientY; st = e.timeStamp; dx = 0; locked = false;
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
    if (Math.abs(dx) > 70 || (Math.abs(dx) > 24 && Math.abs(dx) / Math.max(e.timeStamp - st, 1) > .5)) go(1, dx < 0 ? -1 : 1);
    else { c.style.removeProperty('--sdx'); c.style.removeProperty('--srd'); }
  };
  tc.addEventListener('pointerup', end);
  tc.addEventListener('pointercancel', end);
  tc.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') go(1); else if (e.key === 'ArrowLeft') go(-1);
  });
  tc.addEventListener('click', e => { if (locked && Math.abs(dx) > 6) { e.preventDefault(); e.stopPropagation(); } }, true);

  mq.addEventListener?.('change', paint);
  paint();
}
