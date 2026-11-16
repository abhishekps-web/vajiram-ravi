// FAQ: the questions as <details> in #faqList (one answer open at a time + the open/close motion: components/ui/accordion.js).
import { $, esc } from '@/lib/site';
import { FAQS } from './data';
const CHEVRON = '<svg class="qa__ic" width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

export function renderFaq() {
  $('#faqList').innerHTML = FAQS.map(([q, a], i) => `<details class="qa"${i ? '' : ' open'}><summary>${esc(q)}${CHEVRON}</summary><p>${esc(a)}</p></details>`).join('');
}
