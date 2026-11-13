// Free resources (content from vajiram-ravi-sharon.vercel.app): the six cards, each with a line illustration and its own
// action, and the "More free resources" links. Every link opens the Vajiram & Ravi site (./resource-links.js) until the
// resource pages exist. The illustrations draw themselves in (pathLength="1"; styles/v49.css .sm__ill).

export const RESOURCES = [
  {
    title: 'Current Affairs', desc: 'Prelims, Mains and Quest articles, written the way UPSC asks.', action: 'Read today’s articles',
    ill: <>
      <rect pathLength="1" className="f" x="12" y="16" width="62" height="66" rx="3" />
      <path pathLength="1" d="M74 32h8v44a6 6 0 0 1-6 6" />
      <path pathLength="1" className="b" d="M21 27h44" />
      <path pathLength="1" d="M21 35h28" />
      <rect pathLength="1" x="21" y="43" width="20" height="16" rx="1.5" />
      <path pathLength="1" d="M48 45h17M48 51h17M48 57h11M21 67h44M21 74h32" />
    </>,
  },
  {
    title: 'The Recitals', desc: 'UPSC current affairs monthly material, free to download.', action: 'Download this month',
    ill: <>
      <rect pathLength="1" x="30" y="12" width="46" height="62" rx="3" transform="rotate(8 53 43)" />
      <rect pathLength="1" className="f" x="18" y="20" width="46" height="62" rx="3" />
      <path pathLength="1" className="b" d="M26 30h30" />
      <circle pathLength="1" cx="41" cy="51" r="10" />
      <path pathLength="1" d="M26 71h20" />
    </>,
  },
  {
    title: 'Previous Year Papers', desc: 'Prelims and Mains papers, with the UPSC answer key.', action: 'Browse papers',
    ill: <>
      <path pathLength="1" d="M28 24v-8h48v58h-8" />
      <path pathLength="1" d="M34 16v-6h48v58h-6" />
      <rect pathLength="1" className="f" x="18" y="24" width="48" height="58" rx="3" />
      <path pathLength="1" className="b" d="M26 35h30" />
      <path pathLength="1" d="M26 44h32M26 52h32M26 60h20" />
    </>,
  },
  {
    title: 'Syllabus & Exam Pattern', desc: 'What is asked at each stage, and how it is marked.', action: 'Read the guide',
    ill: <>
      <path pathLength="1" className="f" d="M10 84V66h22V48h22V30h22v54z" />
      <path pathLength="1" d="M76 30V10" />
      <path pathLength="1" d="M76 11h14l-4 5 4 5H76" />
      <path pathLength="1" d="M18 66v-6M40 48v-6M62 30v-6" />
      <path pathLength="1" d="M16 76h10M38 76h10M60 76h10" />
    </>,
  },
  {
    title: 'GS Postal Books', desc: 'Printed General Studies material for UPSC preparation.', action: 'Buy now',
    ill: <>
      <rect pathLength="1" className="f" x="14" y="62" width="64" height="14" rx="2" />
      <rect pathLength="1" x="22" y="48" width="58" height="14" rx="2" />
      <rect pathLength="1" className="f" x="10" y="34" width="62" height="14" rx="2" />
      <path pathLength="1" d="M24 62v14M30 48v14M20 34v14M66 62v14M70 48v14" />
      <path pathLength="1" d="M58 34V22l4 3 4-3v12" />
    </>,
  },
  {
    title: 'UPSC Calendar 2027', desc: 'Every stage date, plus the age limit and eligibility rules.', action: 'See the calendar',
    stages: ['Notification', 'Prelims', 'Mains', 'Interview'],
    ill: <>
      <rect pathLength="1" className="f" x="14" y="20" width="68" height="62" rx="4" />
      <path pathLength="1" d="M14 36h68" />
      <path pathLength="1" className="b" d="M32 14v12M64 14v12" />
      {/* the calendar's day dots, in the order they draw in */}
      {[[26, 48], [38, 48], [50, 48], [62, 48], [74, 48], [26, 60], [38, 60], [50, 60], [26, 72], [38, 72], [62, 60], [74, 60], [50, 72], [62, 72], [74, 72]]
        .map(([cx, cy]) => <circle key={`${cx}-${cy}`} pathLength="1" cx={cx} cy={cy} r="1.6" />)}
    </>,
  },
];

export const MORE_RESOURCES = ['Daily Quiz', 'Editorial Analysis', 'Answer Writing Practice', 'NCERT Notes', 'Government Schemes',
  'Essay Topics', 'Ethics Case Studies', 'Interview Guidance Tips'];
