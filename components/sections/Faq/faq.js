// FAQ: the questions as <details> in #faqList (one answer open at a time + the open/close motion: components/ui/accordion.js).
import { $, esc, ico } from '@/lib/site';
import { FAQS } from './data';

export function renderFaq() {
  $('#faqList').innerHTML = FAQS.map(([q, a], i) => `<details class="qa"${i ? '' : ' open'}><summary>${esc(q)}${ico('faq-plus.svg', 20)}</summary><p>${esc(a)}</p></details>`).join('');
}
