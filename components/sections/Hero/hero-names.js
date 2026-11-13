// Hero: the latest top-10 rank holders as a (hidden, looping) name strip in #heroNames.
import { $, esc } from '@/lib/site';
import { top10 } from '@/components/sections/Toppers/data/rankers';

export function initHeroNames() {
  const names = top10.map(p => `<span><small>AIR ${p.r} · CSE ${p.y}</small>${esc(p.n)}<i aria-hidden="true"></i></span>`).join('');
  $('#heroNames').innerHTML = `<div>${names}</div><div aria-hidden="true">${names}</div>`;
}
