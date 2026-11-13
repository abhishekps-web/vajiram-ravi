// The rank holders of the latest result, derived from TOPPERS: used by the hero name strip, the results cards,
// the ranks dialog and the success-story postcards.
import { TOPPERS } from './toppers';
import { esc } from '@/lib/site';

const T = TOPPERS.filter(p => p.r).map(p => ({ ...p, n: p.n.replace(/\b[a-z]/g, c => c.toUpperCase()) }));
export const YEARS = [...new Set(T.map(p => p.y))].sort((a, b) => b - a);
export const byYear = y => T.filter(p => p.y === y).sort((a, b) => a.r - b.r);
const latest = byYear(YEARS[0]);
export const top10 = latest.filter(p => p.r <= 10);
export const progOf = p => p.c ? esc(p.c) : 'Prepared with Vajiram &amp; Ravi';
