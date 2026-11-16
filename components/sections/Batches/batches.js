// Batches: the tickets and the "all batches" dialog are server-rendered (Batches.jsx, from data.js). This adds what needs the browser:
// the tickets' hover tilt and opening / closing the dialog.
import { $, $$, reduce } from '@/lib/site';

export function initBatchTickets() {
  // no entrance (user 2026-11-13): the tickets are simply in place as the carousel arrives; only the hover tilt below remains.
  // On hover the ticket tilts toward the pointer like a card in the hand: a light glare and a shadow that move with it
  if (reduce || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  $$('#price .inv').forEach(c => {
    c.addEventListener('pointermove', e => { const r = c.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      c.style.setProperty('--tx', (px - .5).toFixed(3)); c.style.setProperty('--ty', (py - .5).toFixed(3)); c.style.setProperty('--gx', (px * 100).toFixed(0) + '%'); c.style.setProperty('--gy', (py * 100).toFixed(0) + '%'); });
    c.addEventListener('pointerleave', () => { c.style.setProperty('--tx', 0); c.style.setProperty('--ty', 0); });
  });
}

// all batches: every programme with admissions open
export function initBatchDialog() {
  const batchDlg = $('#batchDlg');
  $('#allBatches').addEventListener('click', () => batchDlg.showModal());
  $('#batchDlgX').addEventListener('click', () => batchDlg.close());
  batchDlg.addEventListener('click', e => { if (e.target === batchDlg || e.target.closest('[data-prog]')) batchDlg.close(); });
}
