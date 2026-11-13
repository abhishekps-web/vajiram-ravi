// Free resources: the card links (and the Study materials menu's) open the Vajiram & Ravi site until the resource pages exist.
import { $$, SITE } from '@/lib/site';

export function initResourceLinks() {
  $$('[data-rs]').forEach(a => {   // Free resources cards and the Study materials menu
    a.href = SITE; a.target = '_blank'; a.rel = 'noopener'; });
}
