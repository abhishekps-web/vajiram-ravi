// Batches: paper tickets (idea from the reference site's "Next batches"): a dyed head with the start date and a lotus line mark,
// the batch details on cream paper, and a perforated stub with the Register button; and the "all batches" dialog.
import { $, $$, esc, ico, reduce } from '@/lib/site';
import { BFAM, BATCHES, BYEAR, BANNERS } from './data';
import { buttonHTML } from '@/components/ui/Button/button-core';

export function initBatchTickets() {
  $('#price').innerHTML = BATCHES.map((b, i) => {
    const [d, mon] = b.d.split(' ');
    const fam = BFAM[b.fam] || BFAM.gs;
    return `<article class="inv inv--ticket inv--${b.fam}" style="--i:${i};--ticket:${fam.c}">
      <div class="inv__frame">
        <div class="ticket__head">
          <img class="ticket__lotus" src="assets/img/brand/lotus-ticket.svg" alt="" aria-hidden="true">
          <div class="ticket__date"><span>Batch starts</span><time><b>${d}</b><span>${mon || ''}<small>${BYEAR}</small></span></time></div>
          <span class="ticket__target">Target exam<strong>UPSC ${esc(b.tgt)}</strong></span>
        </div>
        <div class="ticket__body">
          <span class="inv__tag">${esc(fam.t)}${b.chip === 'Flagship' ? ' · Flagship' : ''}</span>
          <h3>${esc(b.n)}</h3><p class="inv__w">${esc(b.what)}</p>
          <div class="ticket__meta"><dl><div><dt>Study mode</dt><dd>Classroom and LIVE&#8209;Online</dd></div></dl>${b.chip === 'Limited seats' ? '<span class="ticket__limited" aria-label="Limited seats"><span>Limited<br>seats</span></span>' : ''}</div>
        </div>
        <div class="ticket__stub">${buttonHTML({ href: '#contact', label: 'Enroll now', ariaLabel: `Enroll now in ${b.full}`, iconEnd: 'arrow', fullWidth: true, className: 'inv__reg', attrs: { 'data-prog': b.full } })}</div>
      </div></article>`;
  }).join('');
  {
    const invs = $$('.inv');
    // the tickets are laid down one after another as the section arrives
    if (!reduce && 'IntersectionObserver' in window) {
      invs.forEach(c => c.classList.add('inv--pre'));
      const io = new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting) { const c = e.target; c.classList.add('in'); o.unobserve(c); setTimeout(() => c.classList.remove('inv--pre', 'in'), 1500 + (+c.style.getPropertyValue('--i') || 0) * 110); } }), { threshold: .2 });   // the entrance classes drop away afterwards so they never touch the hover
      invs.forEach(c => io.observe(c));
    }
    // on hover the ticket tilts toward the pointer like a card in the hand: a light glare and a shadow that move with it
    if (!reduce && matchMedia('(hover: hover) and (pointer: fine)').matches) invs.forEach(c => {
      c.addEventListener('pointermove', e => { const r = c.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        c.style.setProperty('--tx', (px - .5).toFixed(3)); c.style.setProperty('--ty', (py - .5).toFixed(3)); c.style.setProperty('--gx', (px * 100).toFixed(0) + '%'); c.style.setProperty('--gy', (py * 100).toFixed(0) + '%'); });
      c.addEventListener('pointerleave', () => { c.style.setProperty('--tx', 0); c.style.setProperty('--ty', 0); });
    });
  }
}

// all batches: every programme with admissions open
export function initBatchDialog() {
  const batchDlg = $('#batchDlg');
  const OPEN = BANNERS.filter(([, t]) => !/^Top 10/.test(t));   // the results banner isn't a programme
  $('#batchDlgH').textContent = `Admissions open: ${OPEN.length} programmes`;
  $('#batchList').innerHTML = OPEN.map(([f, t]) => `<li><a href="#contact" data-prog="${esc(t)}"><img src="assets/img/banners/${f}.webp" alt="" loading="lazy"><span>${esc(t)}${ico('arrow-list.svg')}</span></a></li>`).join('');
  $('#allBatches').addEventListener('click', () => batchDlg.showModal());
  $('#batchDlgX').addEventListener('click', () => batchDlg.close());
  batchDlg.addEventListener('click', e => { if (e.target === batchDlg || e.target.closest('[data-prog]')) batchDlg.close(); });
}
