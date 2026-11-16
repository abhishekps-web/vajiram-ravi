// Footer: the link columns, the news column moved in as the fifth, the social links, and the legal links.
import { $, $$, esc, ico, SITE } from '@/lib/site';
import { FOOTER, FOOTER_HREF, SOCIAL } from './data';

export function renderFooter() {
  const HREF = FOOTER_HREF;
  if (!$('#footCols')) return;   // a page without the footer (the 404)
  $('#footCols').innerHTML = FOOTER.map(([h, l]) => `<div><h3>${esc(h)}</h3><ul>${l.map(x => `<li><a href="${HREF[x] || SITE}"${HREF[x] ? '' : ' target="_blank" rel="noopener"'}>${esc(x)}</a></li>`).join('')}</ul></div>`).join('');
  // the latest current-affairs headlines (markup in index.html) are the right-hand column of the footer top: brand | link columns | news
  const news = $('.foot__news'), fcols = $('#footCols'); if (news && fcols) { news.classList.add('foot__news--col', 'foot__news--side', 'foot__news--5th'); fcols.append(news); }   // the 5th column, after the four link columns
  $('#socials').innerHTML = SOCIAL.map(n => `<li><a href="${SITE}" target="_blank" rel="noopener" aria-label="${n}">${ico(`soc-${n.toLowerCase()}.svg`, 18)}</a></li>`).join('');
  $$('.foot__bot a').forEach(a => { a.href = SITE; a.target = '_blank'; a.rel = 'noopener'; });
}
