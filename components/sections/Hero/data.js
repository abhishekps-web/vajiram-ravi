// Hero stats (user 2026-11-16: "copy the same code from kevins"): Kevin's four points (branch `kevin`, index.html .hx__stats), each a
// large figure beside its line. `fig` is the final value; its first number rolls up from 0 (hero-stats.js), so "36/50" rolls its 36.
// `at` is when the point rises in, in ms after the hero starts (Kevin's --at).
// each label is set on two lines (user 2026-11-17: "stats label should always be 2 line"): `lines` holds the break
export const HERO_STATS = [
  { fig: '50+', label: 'Years of experience', lines: ['Years of', 'experience'], at: 780 },
  { fig: '59', label: 'Prelims questions reflected', lines: ['Prelims questions', 'reflected'], at: 860 },
  { fig: '10/10', label: 'Top rankers trained', lines: ['Top rankers', 'trained'], at: 940 },
  { fig: '36/50', label: 'CSE 2025 rankers', lines: ['CSE 2025', 'rankers'], at: 1100 },
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
    img: { src: `${CUT}/gs-postal-books.webp`, alt: 'Vajiram & Ravi General Studies books', w: 640, h: 624 } },
  { tone: 'sand', k: 'Free · Monthly magazine', h: 'A month of current affairs, in one magazine.',
    d: 'The Recitals: UPSC current affairs monthly material, free to download.', cta: 'Download this month', href: RES, external: true,
    img: { src: `${CUT}/the-recitals.webp`, alt: 'Issues of The Recitals magazine', w: 640, h: 520 } },
  { tone: 'cream', k: 'UPSC Calendar 2027', h: 'Every stage date for CSE 2027, in one place.',
    d: 'Prelims, Mains and the interview, plus the age limit and eligibility rules.', cta: 'See the calendar', href: RES, external: true,
    img: { src: `${CUT}/upsc-calendar.webp`, alt: 'A desk calendar with the UPSC dates marked', w: 640, h: 612 } },
  { tone: 'latte', k: 'Daily current affairs', h: 'Today’s news, written the way UPSC asks.',
    d: 'Prelims, Mains and Quest articles, every day.', cta: 'Read today’s articles', href: RES, external: true,
    img: { src: `${CUT}/current-affairs.webp`, alt: 'Folded newspapers', w: 640, h: 410 } },
  { tone: 'honey', k: 'New batch · Starts 8 Feb', h: 'Full-length Prelims tests, with the reasoning behind every answer.',
    d: 'PowerUp Prelims Test Series 2027.', cta: 'Enroll now', href: '#contact', prog: 'PowerUp Prelims Test Series 2027',
    img: { src: `${CUT}/previous-year-papers.webp`, alt: 'An examination question booklet', w: 640, h: 595 } },
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

// The hero's slides, Kevin's banner (user 2026-11-16, "banner same as kevin's version"; branch kevin, index.html .hx__slide): the top
// three of UPSC CSE 2025, each a full photo with the AIR card (Hero.jsx .hx__mark). page-motion.js fills the card and the results
// ticker's line from the slide on show. Photos public/assets/img/hero-v6/ (the first is the LCP image).
export const HERO_TOPPER_SLIDES = [
  { rank: 1, name: 'Anuj Agnihotri', src: '/assets/img/hero-v6/slide-anuj-agnihotri.webp' },
  { rank: 2, name: 'Rajeshwari Suve M', src: '/assets/img/hero-v6/slide-rajeshwari-suve-m.webp' },
  { rank: 3, name: 'Akansh Dhull', src: '/assets/img/hero-v6/slide-akansh-dhull.webp' },
];
