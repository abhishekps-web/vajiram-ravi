import '@/app/tailwind-sections.css';

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

const FOCUS = 'cu:focus-visible:outline-2 cu:focus-visible:outline-burnt cu:focus-visible:outline-offset-3';
const LINK = `cu:font-medium cu:[font-family:var(--f,IBM_Plex_Sans),sans-serif] cu:text-taupe cu:no-underline cu:text-pretty cu:bg-[linear-gradient(currentColor,currentColor)] cu:bg-[position:0_100%] cu:bg-[length:0_1px] cu:bg-no-repeat cu:box-decoration-clone cu:[transition:color_.2s_ease,background-size_.25s_ease] cu:hover:text-burnt cu:hover:bg-[length:100%_1px] cu:focus-visible:text-burnt cu:focus-visible:bg-[length:100%_1px] cu:focus-visible:rounded-[2px] ${FOCUS}`;
const RULE = 'cu:border-[rgba(26,23,20,.12)]';
const ZOOM = 'cu:curtain-zoom:[transform:scale(calc(.92+var(--foot-p,1)*.08))] cu:foot-zooming:will-change-transform';

function Brand() {
  return (
    <div className={`cu:flex cu:w-full cu:min-w-0 cu:flex-col cu:items-center cu:gap-[22px] cu:text-center cu:min-[761px]:grid cu:min-[761px]:grid-cols-[auto_minmax(0,1fr)] cu:min-[761px]:gap-x-[28px] cu:min-[761px]:gap-y-[10px] cu:min-[761px]:border-b cu:min-[761px]:pb-6 cu:min-[761px]:text-start ${RULE}`}>
      <a className={`rv cu:group cu:flex cu:w-full cu:flex-col cu:items-center cu:gap-[14px] cu:focus-visible:rounded-[2px] cu:min-[761px]:w-max cu:min-[761px]:flex-row cu:min-[761px]:gap-[11px] ${FOCUS}`} href="#top" aria-label="Vajiram & Ravi, back to top">
        <img className="cu:block cu:h-[112px] cu:w-auto cu:transition-[rotate] cu:duration-500 cu:ease-(--ease) cu:fine:group-hover:-rotate-8 cu:motion-reduce:transition-none cu:min-[761px]:h-[72px]" src="/assets/img/brand/logo-v6-mark.webp" alt="" width="198" height="203" loading="lazy" decoding="async" />
        <img className="cu:block cu:h-auto cu:w-[40vw] cu:max-[760px]:max-w-none cu:min-[761px]:w-[138px]" src="/assets/img/brand/logo-v6-wordmark.webp" alt="" width="395" height="81" loading="lazy" decoding="async" />
      </a>
      <p className="cu:m-0 cu:text-[26px] cu:leading-[1.2] cu:font-normal cu:not-italic cu:tracking-[-.01em] cu:text-espresso cu:text-balance cu:[font-family:var(--f-title,Newsreader),Georgia,serif] cu:min-[761px]:justify-self-end cu:min-[761px]:text-right cu:min-[761px]:text-[length:clamp(20px,1.7vw,26px)] cu:min-[761px]:leading-[1.25] cu:min-[1100px]:text-[length:clamp(22px,1.9vw,28px)] cu:min-[1100px]:whitespace-nowrap">
        <span className="rv cu:block cu:min-[1100px]:inline">Understanding India.</span>{" "}
        <span className="rv cu:block cu:text-burnt cu:min-[1100px]:inline" style={{ "--d": ".15s" }}>Shaping its Future.</span>
      </p>
    </div>
  );
}

function Socials() {
  return (
    <ul className="cu:my-[-8px] cu:mr-0 cu:ml-[-8px] cu:flex cu:list-none cu:items-center cu:gap-2 cu:p-0 cu:max-[760px]:m-0 cu:max-[760px]:justify-center" aria-label="Vajiram & Ravi on social media">
      {SOCIALS.map(({ label, icon }) => (
        <li key={icon}>
          <a className={`cu:flex cu:size-10 cu:items-center cu:justify-center cu:rounded-full cu:text-taupe cu:[transition:color_.2s_ease,background-color_.2s_ease] cu:hover:bg-[rgba(204,85,0,.1)] cu:hover:text-burnt cu:focus-visible:bg-[rgba(204,85,0,.1)] cu:focus-visible:text-burnt cu:max-[760px]:size-11 ${FOCUS}`} href={SITE} {...NEW_TAB} aria-label={label}>
            <span className="cu:block cu:size-5 cu:bg-current cu:[-webkit-mask:var(--m)_center/contain_no-repeat] cu:[mask:var(--m)_center/contain_no-repeat] cu:max-[760px]:size-[22px]" style={{ '--m': `url(/assets/img/footer/social-${icon}.svg)` }} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}

function LinkColumns() {
  return (
    <nav className="cu:grid cu:w-full cu:grid-cols-[.8fr_1.15fr_1.15fr_1fr] cu:items-start cu:gap-x-8 cu:gap-y-7 cu:stacked:grid-cols-2 cu:xs:gap-x-5" aria-label="Footer">
      {COLUMNS.map(({ title, links }) => (
        <div key={title} className="cu:flex cu:min-w-0 cu:flex-col cu:items-start cu:gap-2.5">
          <h2 className="cu:m-0 cu:[font-family:var(--f)] cu:text-[14px]/[20px] cu:font-semibold cu:tracking-[.06em] cu:whitespace-nowrap cu:text-espresso cu:uppercase cu:xs:whitespace-normal">{title}</h2>
          <ul className="cu:m-0 cu:flex cu:list-none cu:flex-col cu:items-start cu:gap-1.5 cu:p-0">
            {links.map(({ label, href }) => (
              <li key={label}><a className={`${LINK} cu:text-[15px]/[19px]`} href={href} {...linkProps(href)}>{label}</a></li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function Legal() {
  return (
    <div className={`cu:flex cu:w-full cu:flex-wrap cu:items-center cu:justify-between cu:gap-x-6 cu:gap-y-3 cu:border-t cu:pt-3.5 cu:text-[14px]/[20px] cu:max-[760px]:flex-col cu:max-[760px]:gap-2 cu:max-[760px]:text-center ${RULE}`}>
      <div className="cu:flex cu:flex-wrap cu:items-center cu:gap-x-6 cu:gap-y-2 cu:max-[760px]:flex-col-reverse cu:max-[760px]:justify-center cu:max-[760px]:gap-2">
        <p className="cu:m-0 cu:text-[15px]/[20px] cu:max-[760px]:opacity-85">© 2026 Vajiram &amp; Ravi. All Rights Reserved.</p>
        <Socials />
      </div>
      <nav className="cu:flex cu:flex-wrap cu:gap-x-6 cu:gap-y-2 cu:max-[760px]:order-[-1] cu:max-[760px]:justify-center cu:max-[760px]:gap-x-5 cu:max-[760px]:gap-y-1" aria-label="Legal">
        {LEGAL.map(({ label, href }) => <a key={label} className={`${LINK} cu:text-[15px]/[20px] cu:max-[760px]:py-0.5`} href={href} {...NEW_TAB}>{label}</a>)}
        <span className="cu:text-[15px]/[20px] cu:font-medium cu:max-[760px]:py-0.5">Grievance Redressal</span>
      </nav>
    </div>
  );
}

export default function Footer() {
  return (
    <footer id="site-footer" className="cu:relative cu:isolate cu:mt-0 cu:bg-cream cu:text-taupe cu:[font-family:var(--f,IBM_Plex_Sans),system-ui,sans-serif] cu:curtain:sticky cu:curtain:bottom-[var(--foot-off,0px)] cu:curtain:z-0 cu:curtain-zoom:after:pointer-events-none cu:curtain-zoom:after:absolute cu:curtain-zoom:after:inset-0 cu:curtain-zoom:after:z-3 cu:curtain-zoom:after:bg-[#1a0a02] cu:curtain-zoom:after:opacity-[calc((1-var(--foot-p,1))*.35)]">
      <span data-foot-frame aria-hidden="true" className={`cu:pointer-events-none cu:absolute cu:inset-y-[15px] cu:inset-x-[calc(var(--chrome-cap)+15px)] cu:z-0 cu:before:absolute cu:before:inset-[9px] cu:before:border-[1.2px] cu:before:border-solid cu:before:border-[#D9A441] cu:xs:inset-[4px] cu:[&.fb-anim]:opacity-0 cu:[&.fb-anim]:[transition:opacity_.9s_var(--ease),transform_1.1s_var(--ease)] cu:[&.fb-anim.is-in]:opacity-100 cu:max-[760px]:[&.fb-anim]:[transform:scale(1.012)] cu:max-[760px]:[&.fb-anim.is-in]:[transform:none] cu:curtain-zoom:[transition:opacity_.9s_var(--ease)] ${ZOOM}`} />
      <div className={`cu:relative cu:z-1 cu:mx-auto cu:box-content cu:flex cu:max-w-(--chrome-w) cu:flex-col cu:items-center cu:gap-[22px] cu:px-[max(var(--chrome-px,24px),48px)] cu:pt-[42px] cu:pb-8 cu:xs:px-[26px] cu:xs:pt-[34px] cu:xs:pb-7 cu:min-[761px]:box-border cu:min-[761px]:w-[min(calc(100%-30px),calc(var(--chrome-w)-30px))] cu:min-[761px]:max-w-none cu:min-[761px]:px-[55px] cu:min-[761px]:pt-[66px] cu:min-[761px]:pb-16 ${ZOOM}`}>
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
    foot.toggleAttribute('data-zooming', r > 0 && r < 1);
  };
  addEventListener('scroll', () => { if (!tick) tick = requestAnimationFrame(step); }, { passive: true });
  addEventListener('resize', step);
  step();
}

export function initFooterCurtain() {
  const foot = document.getElementById('site-footer');
  if (!foot) return;
  parkFooter(foot);
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  zoomFooter(foot);
}
