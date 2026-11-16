// Free resources: the card links (and the Study materials menu's) open the Vajiram & Ravi site until the resource pages exist.
import { $$, SITE } from '@/lib/site';

export function initResourceLinks() {
  $$('[data-rs]').forEach(a => {   // Free resources cards and the Study materials menu
    a.href = SITE; a.target = '_blank'; a.rel = 'noopener'; });
}

// The whole folder is the link: a click anywhere on a card follows its action link (the link itself stays the keyboard and screen-reader target).
export function initResourceCards() {
  $$('#resources .rf').forEach(card => {
    const link = card.querySelector('a.sm__act');
    if (!link) return;
    card.addEventListener('click', e => { if (!e.target.closest('a')) link.click(); });
  });
}
