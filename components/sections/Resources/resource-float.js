// Free resources: while a folder is hovered (or has focus) its resource rises out of it and then keeps floating up and down
// for as long as the hover lasts; on leaving it eases back down. One shared rAF loop drives a 0..1 "lift" per card that eases
// toward its target (frame-rate independent), so the rise, the float and the fall are one continuous motion with no snaps.
import { $$, reduce } from '@/lib/site';

export function initResourceFloat() {
  if (reduce || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const cards = $$('#resources .rf').map(el => ({ el, obj: el.querySelector('.rmk__obj'), k: 0, goal: 0, phase: Math.random() * 6 })).filter(c => c.obj);
  if (!cards.length) return;
  const LIFT = 20, BOB = 7, TILT = 2.4;
  let raf = 0, last = 0;

  const frame = now => {
    const dt = Math.min(.05, (now - (last || now)) / 1000); last = now;
    let busy = false;
    for (const c of cards) {
      c.k += (c.goal - c.k) * (1 - Math.exp(-dt * (c.goal ? 7 : 5)));   // rise a little quicker than it falls
      if (Math.abs(c.goal - c.k) < .001) c.k = c.goal;
      if (c.goal) c.phase += dt * 2.1;                                    // the float only advances while hovered
      if (c.k === 0 && !c.goal) { c.obj.style.transform = ''; continue; }
      busy = true;
      const bob = Math.sin(c.phase);
      c.obj.style.transform = `translate3d(0, ${(-LIFT * c.k - bob * BOB * c.k).toFixed(2)}px, 0) rotate(${(-TILT * c.k + bob * .8 * c.k).toFixed(2)}deg)`;
    }
    if (busy) raf = requestAnimationFrame(frame); else { raf = 0; last = 0; }
  };
  const go = () => { if (!raf) { last = 0; raf = requestAnimationFrame(frame); } };

  cards.forEach(c => {
    const on = () => { c.goal = 1; go(); }, off = () => { c.goal = 0; go(); };
    c.el.addEventListener('pointerenter', on); c.el.addEventListener('pointerleave', off);
    c.el.addEventListener('focusin', on); c.el.addEventListener('focusout', e => { if (!c.el.contains(e.relatedTarget)) off(); });
  });
}
