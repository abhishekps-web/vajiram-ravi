import Stylesheet from '@/components/ui/Stylesheet';

const SITE = 'https://vajiramandravi.com/';
const site = path => `${SITE}${path}`;

const NEW_TAB = { target: '_blank', rel: 'noopener' };
const linkProps = href => (href.startsWith('#') ? {} : NEW_TAB);

const COLUMNS = [
  {
    title: 'Vajiram & Ravi',
    links: [
      { label: 'About Us', href: site('about-us/') },
      { label: 'Careers', href: site('careers/') },
      { label: 'Contact Us', href: '#contact' },
      { label: 'FAQs', href: '#faq' },
    ],
  },
  {
    title: 'Free Resources',
    links: [
      { label: 'Current Affairs', href: site('current-affairs/') },
      { label: 'Previous Year Papers', href: site('upsc-previous-year-papers/') },
      { label: 'Books & Study Material', href: site('upsc-exam/upsc-book-list/') },
      { label: 'Model Answers for Mains 2026', href: site('upsc-exam/model-answers-for-upsc-mains/') },
    ],
  },
  {
    title: 'UPSC Exam',
    links: [
      { label: 'Syllabus & Exam Pattern', href: site('upsc-syllabus/') },
      { label: 'Optional Subjects List', href: site('upsc-exam/optional-subjects-for-upsc/') },
      { label: 'Eligibility & Age Limit', href: site('upsc-exam/upsc-age-limit/') },
      { label: 'Exam Calendar 2027', href: site('upsc-exam/upsc-calendar/') },
      { label: 'Admit Card & Answer Key', href: site('upsc-exam/upsc-admit-card/') },
      { label: 'Cut Off & Results', href: site('upsc-exam/upsc-cut-off/') },
      { label: 'IAS Salary', href: site('upsc-exam/ias-salary/') },
    ],
  },
  {
    title: 'Courses & Test Series',
    links: [
      { label: 'GS Course 2027', href: site('courses/upsc-gs-course/') },
      { label: '2 Year Course', href: site('courses/2-year-upsc-course/') },
      { label: 'Online Coaching', href: site('upsc-online-coaching/') },
      { label: 'CSAT Course', href: site('courses/upsc-csat-course/') },
      { label: 'Current Affairs Course', href: site('courses/upsc-module-courses/current-affairs-course/') },
      { label: 'Prelims Test Series 2027', href: site('courses/prelims-test-series/') },
      { label: 'Mains Test Series 2027', href: site('courses/upsc-mains-test-series/') },
      { label: 'Optional Test Series', href: site('courses/upsc-mains-optional-subject-test-series/') },
      { label: 'Mentorship Program 2027', href: site('courses/upsc-mentorship-program/') },
      { label: 'Interview Guidance Program', href: site('courses/interview-guidance-program/') },
    ],
  },
];

const SOCIALS = [
  { label: 'YouTube', icon: 'youtube' },
  { label: 'Facebook', icon: 'facebook' },
  { label: 'Instagram', icon: 'instagram' },
  { label: 'Telegram', icon: 'telegram' },
  { label: 'Quora', icon: 'quora' },
  { label: 'WhatsApp channel', icon: 'whatsapp' },
];

const LEGAL = [
  { label: 'Terms and Conditions', href: site('terms-and-conditions/') },
  { label: 'Privacy Policy', href: site('privacy-policy/') },
];

function Brand() {
  return (
    <div className="vf__brand">
      <a className="vf__logo rv" href="#top" aria-label="Vajiram & Ravi, back to top">
        <img className="vf__mark" src="/assets/img/brand/logo-v6-mark.webp" alt="" width="198" height="203" loading="lazy" decoding="async" />
        <img className="vf__wordmark" src="/assets/img/brand/logo-v6-wordmark.webp" alt="" width="395" height="81" loading="lazy" decoding="async" />
      </a>
      <p className="vf__tagline">
        <span className="rv">Understanding India.</span>{" "}
        <span className="rv" style={{ "--d": ".15s" }}>Shaping its Future.</span>
      </p>
    </div>
  );
}

function Socials() {
  return (
    <ul className="vf__socials" aria-label="Vajiram & Ravi on social media">
      {SOCIALS.map(({ label, icon }) => (
        <li key={icon}>
          <a href={SITE} {...NEW_TAB} aria-label={label}>
            <span className="vf__soc" style={{ '--m': `url(/assets/img/footer/social-${icon}.svg)` }} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}

function LinkColumns() {
  return (
    <nav className="vf__cols" aria-label="Footer">
      {COLUMNS.map(({ title, links }) => (
        <div key={title} className="vf__col">
          <h2 className="vf__h">{title}</h2>
          <ul>
            {links.map(({ label, href }) => (
              <li key={label}><a href={href} {...linkProps(href)}>{label}</a></li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function Legal() {
  return (
    <div className="vf__legal">
      <div className="vf__legal-start">
        <p>© 2026 Vajiram &amp; Ravi. All Rights Reserved.</p>
        <Socials />
      </div>
      <nav aria-label="Legal">
        {LEGAL.map(({ label, href }) => <a key={label} href={href} {...NEW_TAB}>{label}</a>)}
        <span>Grievance Redressal</span>
      </nav>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="vf">
      <Stylesheet href="/css/footer-v6.css" />
      <span className="foot__frame" aria-hidden="true" />
      <div className="vf__in">
        <Brand />
        <LinkColumns />
        <Legal />
      </div>
    </footer>
  );
}

function parkFooter(foot) {
  const root = document.documentElement;
  const check = () => {
    root.style.setProperty('--foot-off', Math.min(0, innerHeight - foot.offsetHeight) + 'px');
    root.classList.add('foot-curtain');
  };
  check();
  addEventListener('resize', check);
  addEventListener('load', check);
  document.fonts?.ready?.then(check);
}

function zoomFooter(foot) {
  const prev = foot.previousElementSibling;
  const page = prev?.tagName === 'MAIN' ? prev : document.querySelector('main');
  if (!page) return;

  let tick = 0, last = -1;
  const step = () => {
    tick = 0;
    const shown = innerHeight - page.getBoundingClientRect().bottom;
    const p = Math.max(0, Math.min(1, shown / Math.min(innerHeight, foot.offsetHeight)));
    const r = Math.round(p * 1000) / 1000;
    if (r === last) return;
    last = r;
    foot.style.setProperty('--foot-p', r);
    foot.classList.toggle('vf--zooming', r > 0 && r < 1);
  };
  addEventListener('scroll', () => { if (!tick) tick = requestAnimationFrame(step); }, { passive: true });
  addEventListener('resize', step);
  step();
}

export function initFooterCurtain() {
  const foot = document.querySelector('footer.foot, footer.vf');
  if (!foot) return;
  parkFooter(foot);
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  zoomFooter(foot);
}
