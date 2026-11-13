// Results (parked section, hidden): four key-number cards in #kcards.
import { $, esc, ico } from '@/lib/site';
import { YEARS, top10 } from '@/components/sections/Toppers/data/rankers';

export function initResultCards() {
  const faces = l => `<span class="kc__faces">${l.map(p => `<img src="${esc(p.src)}" alt="" loading="lazy">`).join('')}</span>`;
  const KC = [
    { hi: true, lbl: `CSE ${YEARS[0]} result`, num: `${top10.length}<small>/10</small>`, t: 'Top 10 ranks', d: `Ranks 1 to 10 in UPSC CSE ${YEARS[0]} prepared with Vajiram & Ravi.`, foot: faces(top10.slice(0, 4)), a: ['See the toppers', '#toppers'] },
    { lbl: 'Programmes', num: '12', t: 'Featured UPSC CSE programmes', d: 'Classroom and LIVE-Online programmes for every stage, from Foundation to the Interview.', a: ['View programmes', '#courses'] },
    { lbl: 'Prelims 2025', num: '59', t: 'Questions from our tests', d: '59 questions in UPSC Prelims 2025 came up in our Prelims Test Series.', a: ['Prelims programmes', '#courses', 6] },
    { lbl: 'Since 1976', num: '50<small>yrs</small>', t: 'In Old Rajinder Nagar', d: 'Fifty years of teaching UPSC aspirants, next to Gate 5 of Karol Bagh Metro.', a: ['Visit the campus', '#visit'] }
  ];
  $('#kcards').innerHTML = KC.map(k => `<article class="kc${k.hi ? ' kc--hi' : ''}">
      <p class="kc__lbl">${esc(k.lbl)}</p>
      <p class="kc__num">${k.num}</p>
      <h3>${esc(k.t)}</h3>
      <p class="kc__d">${esc(k.d)}</p>
      <div class="kc__f">${k.foot || ''}<a class="kc__a" href="${k.a[1]}"${k.a[2] === 'all' ? ' data-allranks' : k.a[2] != null ? ` data-cat="${k.a[2]}"` : ''}>${esc(k.a[0])} ${ico(k.hi ? 'arrow-link-white.svg' : 'arrow-link-brand.svg')}</a></div></article>`).join('');
}
