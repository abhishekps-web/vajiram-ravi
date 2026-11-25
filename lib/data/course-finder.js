// The course finder's groups, learning modes, mediums and featured courses (CourseFinder.jsx; the courses are course-finder.json).

export const GROUPS = [
  { id: 'gs', label: 'GS Foundation', fams: ['gs-11', 'gs-2yr'], sub: 'The whole General Studies syllabus for Prelims and Mains, over 11 months or 2 years.' },
  { id: 'csat-interview', label: 'CSAT & Interview', fams: ['csat', 'interview'], sub: 'Prelims Paper II practice, and mock boards for the 275-mark personality test.' },
  { id: 'mentorship', label: 'Mentorship', fams: ['mentorship'], sub: 'A personal mentor shapes your strategy and keeps your plan on track, week by week.' },
  { id: 'mains-ts', label: 'Mains Test Series', fams: ['mains-ts'], sub: 'Write to time, then read what an evaluator would change. English and Hindi.' },
  { id: 'prelims-ts', label: 'Prelims Test Series', fams: ['prelims-ts'], sub: 'Full-length tests with the reasoning behind every answer, plus current affairs.' },
  { id: 'module', label: 'Module Courses', fams: ['module'], sub: 'Short modules on one part of the syllabus: Economics, Ethics and SMART current affairs.' },
  { id: 'optional', label: 'Optional Subject Programme', fams: ['optional'], sub: 'Two papers, 500 marks, taught by a specialist in your optional subject.' },
  { id: 'optional-ts', label: 'Optional Test Series', fams: ['optional-ts'], sub: 'Answer writing for your optional, evaluated paper by paper.' },
  { id: 'crash', label: 'Crash Course & Enrichment', fams: ['crash', 'enrichment'], sub: 'Short, intensive optional courses, and answer-writing programmes for sharper answers.' },
  { id: 'ifos-postal', label: 'IFoS & Postal', fams: ['ifos', 'postal'], sub: 'Forestry and Geology for the Indian Forest Service, and printed study material by post.' },
];

export const MODES = [{ id: 'all', label: 'All courses' }, { id: 'classroom', label: 'Classroom' }, { id: 'online', label: 'LIVE-Online' }];

export const MEDIUMS = [{ id: 'all', label: 'All mediums' }, { id: 'en', label: 'English' }, { id: 'hi', label: 'हिंदी' }];

/* Handpicked highlights, shown as ordinary course cards. */
export const FEATURED = ['courses-upsc-gs-course', 'courses-upsc-gs-online-course', 'courses-prelims-test-series-powerup', 'courses-prelims-test-series-camp',
  'courses-upsc-module-courses-prelims-current-affairs-programme', 'courses-upsc-module-courses-current-affairs-course'];
