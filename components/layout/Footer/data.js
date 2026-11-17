// Footer content (user 2026-11-16: the footer from Kevin's build, eclectic-alfajores-975fab.netlify.app): the four link columns, the
// six social links, the latest current affairs and the legal links. Rendered by Footer.jsx; styles public/css/footer-v6.css.
const V = 'https://vajiramandravi.com/';

// The columns in order (user 2026-11-17): Vajiram & Ravi, Free Resources, UPSC Exam, Courses & Test Series.
// [heading, [label, href]...]; a "#…" href stays on the page, every other link opens the institute's site in a new tab
export const FOOTER = [
  ['Vajiram & Ravi', [['About Us', `${V}about-us/`], ['Careers', `${V}careers/`], ['Contact Us', '#contact'], ['FAQs', '#faq']]],
  ['Free Resources', [
    ['Current Affairs', `${V}current-affairs/`], ['Previous Year Papers', `${V}upsc-previous-year-papers/`],
    ['Books & Study Material', `${V}upsc-exam/upsc-book-list/`], ['Model Answers for Mains 2026', `${V}upsc-exam/model-answers-for-upsc-mains/`],
  ]],
  ['UPSC Exam', [
    ['Syllabus & Exam Pattern', `${V}upsc-syllabus/`], ['Optional Subjects List', `${V}upsc-exam/optional-subjects-for-upsc/`],
    ['Eligibility & Age Limit', `${V}upsc-exam/upsc-age-limit/`], ['Exam Calendar 2027', `${V}upsc-exam/upsc-calendar/`],
    ['Admit Card & Answer Key', `${V}upsc-exam/upsc-admit-card/`], ['Cut Off & Results', `${V}upsc-exam/upsc-cut-off/`],
    ['IAS Salary', `${V}upsc-exam/ias-salary/`],
  ]],
  ['Courses & Test Series', [
    ['GS Course 2027', `${V}courses/upsc-gs-course/`], ['2 Year Course', `${V}courses/2-year-upsc-course/`],
    ['Online Coaching', `${V}upsc-online-coaching/`], ['CSAT Course', `${V}courses/upsc-csat-course/`],
    ['Current Affairs Course', `${V}courses/upsc-module-courses/current-affairs-course/`],
    ['Prelims Test Series 2027', `${V}courses/prelims-test-series/`], ['Mains Test Series 2027', `${V}courses/upsc-mains-test-series/`],
    ['Optional Test Series', `${V}courses/upsc-mains-optional-subject-test-series/`],
    ['Mentorship Program 2027', `${V}courses/upsc-mentorship-program/`], ['Interview Guidance Program', `${V}courses/interview-guidance-program/`],
  ]],
];

// the brand marks are masks (public/assets/img/footer/social-*.svg), painted in the text colour
export const SOCIAL = [['YouTube', 'youtube'], ['Facebook', 'facebook'], ['Instagram', 'instagram'], ['Telegram', 'telegram'], ['Quora', 'quora'], ['WhatsApp channel', 'whatsapp']];

export const NEWS = [
  ['Mains', 'Supreme Court redefines the meaning of ‘industry’', `${V}current-affairs/upsc-mains-current-affairs/`],
  ['Mains', 'NITI Aayog flags gap between education and employment', `${V}current-affairs/upsc-mains-current-affairs/`],
  ['Prelims', 'Thiksey Monastery', `${V}current-affairs/upsc-prelims-current-affairs/`],
];

export const LEGAL = [['Terms and conditions', `${V}terms-and-conditions/`], ['Privacy policy', `${V}privacy-policy/`]];
export const SITE_HOME = V;
