// Hero stats (user 2026-11-16): the row of key numbers under the hero card. The figures are the site's own claims (the parked
// results cards, components/sections/Parked/results-cards.js). `count` counts up from 0 (hero-stats.js); `pre`/`suf` stay fixed.
export const HERO_STATS = [
  { count: 50, suf: '+', label: 'Years experience', sub: 'since 1976' },
  { count: 10, suf: '/10', label: 'Top ranks in UPSC CSE 2025' },
  { pre: 'AIR ', count: 1, label: 'In every UPSC result since 2016' },
  { count: 59, label: 'Prelims 2025 questions from our tests' },
];

// What's trending (user 2026-11-16, from Kevin's build, eclectic-alfajores-975fab.netlify.app): the banners of the carousel under
// the hero stats (Trending.jsx). `tone` picks the banner's tint (public/css/trending.css); `prog` pre-selects that programme in the
// contact form; pictures are the Free resources cut-outs (public/assets/img/resources/cutout/).
const RES = 'https://vajiramandravi.com/';
const CUT = '/assets/img/resources/cutout';
export const TRENDING = [
  { tone: 'butter', k: 'New batch · Starts 29 Jan', h: 'The full GS syllabus, in 11 months.',
    d: '11-Month Prelims cum Mains General Studies Comprehensive Programme, for CSE 2027.', cta: 'Enroll now', href: '#contact',
    prog: '11-Month Prelims cum Mains General Studies Comprehensive Programme',
    img: { src: `${CUT}/gs-postal-books.png`, alt: 'Vajiram & Ravi General Studies books', w: 640, h: 624 } },
  { tone: 'sand', k: 'Free · Monthly magazine', h: 'A month of current affairs, in one magazine.',
    d: 'The Recitals: UPSC current affairs monthly material, free to download.', cta: 'Download this month', href: RES, external: true,
    img: { src: `${CUT}/the-recitals.png`, alt: 'Issues of The Recitals magazine', w: 640, h: 520 } },
  { tone: 'cream', k: 'UPSC Calendar 2027', h: 'Every stage date for CSE 2027, in one place.',
    d: 'Prelims, Mains and the interview, plus the age limit and eligibility rules.', cta: 'See the calendar', href: RES, external: true,
    img: { src: `${CUT}/upsc-calendar.png`, alt: 'A desk calendar with the UPSC dates marked', w: 640, h: 612 } },
  { tone: 'latte', k: 'Daily current affairs', h: 'Today’s news, written the way UPSC asks.',
    d: 'Prelims, Mains and Quest articles, every day.', cta: 'Read today’s articles', href: RES, external: true,
    img: { src: `${CUT}/current-affairs.png`, alt: 'Folded newspapers', w: 640, h: 410 } },
  { tone: 'honey', k: 'New batch · Starts 8 Feb', h: 'Full-length Prelims tests, with the reasoning behind every answer.',
    d: 'PowerUp Prelims Test Series 2027.', cta: 'Enroll now', href: '#contact', prog: 'PowerUp Prelims Test Series 2027',
    img: { src: `${CUT}/previous-year-papers.png`, alt: 'An examination question booklet', w: 640, h: 595 } },
];

// The toppers slide (user 2026-11-16, "a banner type for the hero that showcase the toppers"): the fifth hero slide, a lineup of the
// CSE 2025 top three (transparent cut-outs) on the right of the card, AIR 1 in the middle and tallest. Taken from the Toppers section's
// own list (Toppers/ToppersSpread/data.js), so a rank holder is edited in one place; `order` is the lineup left to right.
import { TOPPERS_2025 } from '../Toppers/ToppersSpread/data';
const first = n => n.split(' ')[0];
export const HERO_TOPPERS = [2, 1, 3].map(r => {
  const t = TOPPERS_2025.find(x => x.rank === r);
  return { rank: r, name: t.name, first: first(t.name), photo: t.photo };
});
