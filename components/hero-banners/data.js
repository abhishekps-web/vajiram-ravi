// Content for the hero banner types page (/hero-banners): every slide is built from the site's own data, so nothing here is
// new copy. Toppers: CSE 2025 rank holders (Toppers/ToppersSpread/data.js, with the programmes each one took). Courses: the
// flagship and the programme groups (Programmes/data/programmes.ts) and the batch tickets (Batches/data.js).
// Batch dates are the Batches section's own and still to be confirmed there; the seat notes are its "Limited seats" chips.
import { TOPPERS_2025 } from '@/components/sections/Toppers/ToppersSpread/data';
import { featuredProgramme, programmes, programmeSlug } from '@/components/sections/Programmes/data/programmes';
import { BATCHES, BFAM, BYEAR } from '@/components/sections/Batches/data';

const short = n => n.split(' ').slice(0, 2).join(' ');
const prog = name => programmes.find(p => p.name === name);
const coursePage = name => `/courses/${programmeSlug(name)}`;

/** Ranks 1 to 10: the cut-out portraits (transparent WebP, 768 square). */
export const TOP10 = TOPPERS_2025.slice(0, 10).map(t => ({ ...t, first: short(t.name), took: t.programmes[0] }));
/** Everyone on the list (ranks 11+ have opaque photos: fine as round chips). */
export const ALL_TOPPERS = TOPPERS_2025.map(t => ({ ...t, first: short(t.name), took: t.programmes[0] }));

/** The courses the slides sell, each with its photo, its page and its next batch (from the batch tickets). */
const batch = n => BATCHES.find(b => b.n === n);
export const COURSES = [
  {
    key: 'gs', stage: 'Foundation', tag: featuredProgramme.tag, name: featuredProgramme.name,
    line: 'The full General Studies syllabus for Prelims and Mains, with 300+ lectures, 18 Yellow Books and 30 Prelims tests.',
    meta: ['11 months', featuredProgramme.modes], batch: batch('GS Comprehensive'),
    img: '/assets/img/programmes/flagship-lecture.webp', pos: '40% 30%', href: coursePage('UPSC GS foundation course – PCM'),
    match: /general studies|^gs\b|prelims-cum-mains/i,
  },
  {
    key: 'gs2', stage: 'Foundation', tag: 'For college students', name: 'GS 2-year Fledgling Programme',
    line: prog('UPSC GS foundation course – PCM').line, meta: ['2 years', 'Classroom and LIVE-Online'], batch: batch('GS 2-Year Fledgling'),
    img: '/assets/img/programmes/featured-library.webp', pos: '45% 50%', href: coursePage('UPSC GS foundation course – PCM'),
    match: /general studies/i,
  },
  {
    key: 'pre', stage: 'Prelims', tag: 'Tests', name: 'PowerUp Prelims Test Series',
    line: prog('Prelims test series').line, meta: ['Full-length tests', 'Every answer explained'], batch: batch('PowerUp Prelims Tests'),
    img: '/assets/img/programmes/featured-classroom.webp', pos: '50% 40%', href: coursePage('Prelims test series'),
    match: /prelims|power ?up/i,
  },
  {
    key: 'mains', stage: 'Mains', tag: 'Tests', name: 'Sure Shot Mains Test Series',
    line: prog('Mains test series').line, meta: ['Evaluated answers', 'English and Hindi'], batch: batch('Sure Shot Mains'),
    img: '/assets/img/programmes/featured-teacher.webp', pos: '50% 35%', href: coursePage('Mains test series'),
    match: /mains|ethics|essay|answer writing/i,
  },
  {
    key: 'opt', stage: 'Optional', tag: 'Optional', name: 'Optional subject programme',
    line: prog('Optional subject programme').line, meta: ['13 subjects', 'Classroom and LIVE-Online'], batch: null,
    img: '/assets/img/photos/why-6-classroom-online.webp', pos: '50% 50%', href: coursePage('Optional subject programme'),
    match: /sociology|optional|anthropology|history/i,
  },
  {
    key: 'int', stage: 'Interview', tag: 'Guidance', name: 'Interview Guidance Programme',
    line: prog('Interview guidance programme').line, meta: ['Mock boards', 'One-to-one feedback'], batch: null,
    img: '/assets/img/programmes/featured-mentoring.webp', pos: '50% 40%', href: coursePage('Interview guidance programme'),
    match: /interview/i,
  },
];
export const courseByKey = k => COURSES.find(c => c.key === k);

/** The toppers who took a course (C2's face pile). */
export const toppersFor = course => ALL_TOPPERS.filter(t => t.programmes.some(p => course.match.test(p)));

/** C1: a topper paired with the course they took (chosen so each slide sells a different course). */
export const PAIRS = [
  { rank: 3, course: 'gs' }, { rank: 2, course: 'pre' }, { rank: 8, course: 'mains' }, { rank: 5, course: 'opt' }, { rank: 1, course: 'int' },
].map(p => ({ topper: TOP10.find(t => t.rank === p.rank), course: courseByKey(p.course) }));

/** B3: the next batches, in date order, each with its family colour. */
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const NEXT_BATCHES = BATCHES.map(b => {
  const [day, mon] = b.d.split(' ');
  return { ...b, fam: BFAM[b.fam], day: +day, mon, date: new Date(BYEAR, MONTHS.indexOf(mon), +day) };
}).sort((a, b) => a.date - b.date);

/** C3: one planned order of different slide kinds. */
export const PLAYLIST = [
  { kind: 'results', label: 'CSE 2025 results' },
  { kind: 'course', label: 'GS programme', course: courseByKey('gs') },
  { kind: 'pair', label: 'AIR 3 · GS', pair: PAIRS[0] },
  { kind: 'course', label: 'Prelims tests', course: courseByKey('pre') },
  { kind: 'pair', label: 'AIR 1 · Interview', pair: PAIRS[4] },
];

/** The stages B2's tabs walk through, one course each. */
export const STAGES = ['gs', 'pre', 'mains', 'opt', 'int'].map(courseByKey);
