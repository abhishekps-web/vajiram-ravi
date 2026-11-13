// Ranks dialog (#yd): every rank holder of a year. Opened by any [data-allranks] link.
import { $, esc } from '@/lib/site';
import { YEARS, byYear, progOf } from '@/components/sections/Toppers/data/rankers';

export function initRanksDialog() {
  const yd = $('#yd');
  let year = YEARS[0];
  const openRanks = () => {
    const l = byYear(year);
    $('#ydH').textContent = `UPSC CSE ${year}: ${l.length} rankers who prepared with us`;
    $('#ydList').innerHTML = l.map(p => `<li><img src="${esc(p.src)}" alt="" loading="lazy"><span class="mono">AIR ${p.r}</span><b>${esc(p.n)}</b><small>${progOf(p)}</small></li>`).join('');
    yd.showModal();
  };
  document.addEventListener('click', e => { if (e.target.closest('[data-allranks]')) { e.preventDefault(); year = YEARS[0]; openRanks(); } });
  $('#ydClose').addEventListener('click', () => yd.close());
  yd.addEventListener('click', e => { if (e.target === yd) yd.close(); });
}
