// Programmes as books, grouped exactly as the "Our Featured UPSC CSE Courses" tabs the user shared:
// All / IGP / General Studies / Optional / Module Courses / Test Series, twelve programmes, each in one tab.
// cat: the catalogue category its "View courses" opens; without one the button enquires with the programme pre-selected.
// c: cloth colour (.gsbook--k0..k11), so no two neighbours match
export const PTABS = ['All', 'IGP', 'General Studies', 'Optional', 'Module Courses', 'Test Series'];
// a small illustration for each programme book, in the slot the description used to fill (same order as PROGS): gold line work with soft fills and an accent, inside a dotted medallion
export const PICON = [
  '<path class="f" d="M32 22c-4-3-10-4-16-3v22c6-1 12 0 16 3 4-3 10-4 16-3V19c-6-1-12 0-16 3Z"/><path d="M32 22v22"/><path d="M20 26c3 0 6 .6 9 2M20 31c3 0 6 .6 9 2M20 36c3 0 6 .6 9 2M44 26c-3 0-6 .6-9 2M44 31c-3 0-6 .6-9 2"/><path class="f" d="M40 19v9l3-2 3 2v-9"/><path d="M26 15l-2-3M38 15l2-3"/><circle class="a" cx="32" cy="13" r="1.6"/>',
  '<path d="M32 47V28"/><path class="f" d="M32 31c0-8-5-12-13-12 0 8 5 12 13 12Z"/><path class="f" d="M32 37c0-6 4-10 11-10 0 6-4 10-11 10Z"/><path d="M17 47h30M23 51h18"/><circle class="a" cx="46" cy="16" r="1.6"/><circle class="a" cx="17" cy="31" r="1.2"/>',
  '<path class="f" d="M36 12 22 34h9l-3 18 16-24H34l2-16Z"/><path d="M12 24h6M10 32h7M13 40h5"/><circle class="a" cx="48" cy="18" r="1.6"/><circle class="a" cx="50" cy="40" r="1.2"/>',
  '<path class="f" d="M32 14 50 23 32 32 14 23 32 14Z"/><path d="M14 31l18 9 18-9"/><path d="M14 39l18 9 18-9"/><circle class="a" cx="32" cy="23" r="2.2"/>',
  '<rect class="f" x="17" y="12" width="30" height="40" rx="4"/><rect x="22" y="17" width="20" height="9" rx="1.5"/><path d="M24 33h.01M32 33h.01M40 33h.01M24 40h.01M32 40h.01M40 40h.01M24 47h.01M32 47h.01" stroke-width="3"/><path d="M40 40v7" stroke-width="3"/>',
  '<rect class="f" x="26" y="11" width="12" height="23" rx="6"/><path d="M19 30a13 13 0 0 0 26 0"/><path d="M32 43v8M25 51h14"/><path d="M13 22c-2 3-2 8 0 11M51 22c2 3 2 8 0 11"/><path d="M29 18h6M29 23h6"/>',
  '<rect class="f" x="16" y="11" width="32" height="42" rx="4"/><circle cx="25" cy="23" r="3"/><circle class="a" cx="25" cy="33" r="3"/><circle cx="25" cy="43" r="3"/><path d="M33 23h9M33 33h9M33 43h9"/>',
  '<circle class="f" cx="23" cy="23" r="6"/><path d="M12 47c1-8 6-12 11-12s10 4 11 12"/><circle class="f" cx="43" cy="28" r="4.5"/><path d="M36 47c.8-6 4-9 7-9s6.2 3 7 9"/><path class="a" d="M47 11l1.4 3 3.2.4-2.4 2.2.7 3.2L47 18l-2.9 1.8.7-3.2-2.4-2.2 3.2-.4Z"/>',
  '<rect class="f" x="14" y="31" width="16" height="16" rx="3"/><rect class="f" x="34" y="31" width="16" height="16" rx="3"/><rect class="f" x="14" y="12" width="16" height="16" rx="3"/><rect x="36" y="10" width="16" height="16" rx="3" transform="rotate(12 44 18)"/><circle class="a" cx="22" cy="20" r="2"/>',
  '<rect class="f" x="14" y="14" width="30" height="38" rx="3"/><path d="M20 24h18M20 31h18M20 38h10"/><path class="f" d="M50 11l5 5-19 24-7 2 2-7Z"/>',
  '<path d="M20 12h24M20 52h24"/><path class="f" d="M22 12c0 12 10 14 10 20s-10 8-10 20h20c0-12-10-14-10-20s10-8 10-20Z"/><path class="a" d="M27 47h10l-5-6Z"/><circle class="a" cx="32" cy="20" r="1.3"/>',
  '<path d="M32 52V37"/><path class="f" d="M32 10 20 28h6l-8 12h28l-8-12h6L32 10Z"/><path d="M14 52h36"/><circle class="a" cx="49" cy="15" r="3"/>'
];
export const PROGS = [
  { t: 'General Studies PCM', tab: 'General Studies', sp: 'GS PCM', c: 0, prog: 'General Studies Prelims cum Mains 2027 (1 year)', d: 'The whole General Studies syllabus for Prelims and Mains, in one year, for graduates.' },
  { t: 'GS PCM – 2 Year Fledgling', tab: 'General Studies', sp: 'Fledgling', c: 5, prog: 'GS PCM 2-Year Fledgling 2028', d: 'The General Studies programme spread over two years, for college students.' },
  { t: 'GS Mains Crash Course', tab: 'General Studies', sp: 'GS Mains Crash', c: 4, prog: 'GS Mains Crash Course', d: 'A short, intensive run through General Studies for the Mains papers.' },
  { t: 'Optional Subjects', tab: 'Optional', sp: 'Optional', c: 1, prog: 'Optional Subject Programme', d: 'Two papers, 500 marks, taught by a specialist in your optional subject.' },
  { t: 'CSAT', tab: 'Module Courses', sp: 'CSAT', c: 2, prog: 'CSAT Course', d: 'Prelims Paper II. Qualifying at 33%, but it has to be cleared.' },
  { t: 'Interview Guidance Programme', tab: 'IGP', sp: 'Interview', c: 3, prog: 'UPSC CSE Interview Guidance Programme', d: 'Mock boards with detailed feedback, for the 275-mark personality test.' },
  { t: 'Prelims Test Series', tab: 'Test Series', sp: 'Prelims Tests', c: 6, prog: 'PowerUp Prelims Test Series', d: 'Full-length tests with the reasoning behind every answer, plus current affairs.' },
  { t: 'UPSC Mentorship Program', tab: 'IGP', sp: 'Mentorship', c: 11, prog: 'StepUp Mentorship Programme 2027', d: 'A mentor keeps your plan on track, week by week, in English or Hindi.' },
  { t: 'Module Courses', tab: 'Module Courses', sp: 'Modules', c: 8, prog: 'Module Courses', d: 'Short courses that take one subject at a time, such as the Economics module.' },
  { t: 'Mains Test Series', tab: 'Test Series', sp: 'Mains Tests', c: 9, prog: 'Sure Shot Mains Programme 2027', d: 'Write to time, then read what an evaluator would change. English and Hindi.' },
  { t: 'Optional Subject Crash Course', tab: 'Optional', sp: 'Optional Crash', c: 10, prog: 'Optional Subject Crash Course', d: 'A fast, focused revision of your optional before Mains.' },
  { t: 'IFoS Programmes', tab: 'General Studies', sp: 'IFoS', c: 7, prog: 'IFoS Programmes', d: 'Preparation for the Indian Forest Service examination.' }
];
