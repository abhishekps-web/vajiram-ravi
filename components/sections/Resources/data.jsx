// Free resources (content from vajiram-ravi-sharon.vercel.app): the six cards, each with a small drawing of the resource
// (`mock`, one of ./ResourceMock.jsx's kinds), the word on its folder's index tab (`tab`) and its own action, and the "More free resources" links. Every link opens the
// Vajiram & Ravi site (./resource-links.js) until the resource pages exist.

export const RESOURCES = [
  { title: 'Current Affairs', desc: 'Prelims, Mains and Quest articles, written the way UPSC asks.', action: 'Read today’s articles', mock: 'paper', tab: 'Daily' },
  { title: 'The Recitals', desc: 'UPSC current affairs monthly material, free to download.', action: 'Download this month', mock: 'magazine', tab: 'Monthly' },
  { title: 'Previous Year Papers', desc: 'Prelims and Mains papers, with the UPSC answer key.', action: 'Browse papers', mock: 'papers', tab: 'Archive' },
  { title: 'Syllabus & Exam Pattern', desc: 'What is asked at each stage, and how it is marked.', action: 'Read the guide', mock: 'stages', tab: 'Guide' },
  { title: 'GS Postal Books', desc: 'Printed General Studies material for UPSC preparation.', action: 'Buy now', mock: 'books', tab: 'By post' },
  {
    title: 'UPSC Calendar 2027', desc: 'Every stage date, plus the age limit and eligibility rules.', action: 'See the calendar',
    stages: ['Notification', 'Prelims', 'Mains', 'Interview'], mock: 'calendar', tab: '2027',
  },
];

export const MORE_RESOURCES = ['Daily Quiz', 'Editorial Analysis', 'Answer Writing Practice', 'NCERT Notes', 'Government Schemes',
  'Essay Topics', 'Ethics Case Studies', 'Interview Guidance Tips'];
