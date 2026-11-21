import SectionLabel from '@/components/ui/SectionLabel';
import { photoSrcSet } from '@/lib/photo';
import '@/app/tailwind-sections.css';

const LEGACY = {
  label: 'Why Vajiram & Ravi?',
  title: '50+ Years of Experience: The Best IAS Coaching in Delhi, India',
  body: 'Vajiram & Ravi maintains its prominence in UPSC preparation through both offline and online formats. Established in 1976, the institute has built a five-decade legacy, adapting to every shift in the examination while staying focused on aspirant outcomes. The organization features seasoned educators delivering thorough training for the Prelims, Mains, and Interview stages, supported by a consistent track record of student success. Throughout its history, the institute has assisted thousands of candidates in entering the IAS, IPS, IFS, and related government positions through expert mentorship and structured curricula.',
};

const PHOTO = { src: '/assets/img/photos/institute-exterior.webp', alt: 'The Vajiram & Ravi institute building, its sign reading "Institute for IAS Exam"', w: 900, h: 1200 };

const ICONS = {
  medal: (
    <>
      <path d="M8 2.5l4 6.5 4-6.5" />
      <circle cx="12" cy="15" r="6" />
      <path d="M10.6 13l1.6-1.1v6.1" />
    </>
  ),
  board: (
    <>
      <path d="M3 4h18v11H3Z" />
      <path d="M6 8h6M6 11h4" />
      <circle cx="17" cy="8" r="1.5" />
      <path d="M14.5 13.5c.3-2 1.2-3 2.5-3s2.2 1 2.5 3" />
      <path d="M8 20l2-5M16 20l-2-5" />
    </>
  ),
  mentor: (
    <>
      <circle cx="8" cy="7.5" r="2.5" />
      <path d="M3.5 20c0-4 2-6 4.5-6s4.5 2 4.5 6" />
      <circle cx="17" cy="11" r="2" />
      <path d="M14 20c0-3 1.4-4.5 3-4.5S20 17 20 20" />
      <path d="M13.5 4.5h6M17.5 2.5l2 2-2 2" />
    </>
  ),
  notes: (
    <>
      <path d="M6 3h9l4 4v14H6Z" />
      <path d="M15 3v4h4" />
      <path d="M9 12.5l1.5 1.5L13.5 11M9 17.5h7" />
    </>
  ),
  place: (
    <>
      <path d="M12 22s7.5-6.4 7.5-12A7.5 7.5 0 0 0 4.5 10c0 5.6 7.5 12 7.5 12Z" />
      <path d="M9 13V8.5l3-1.8 3 1.8V13Z" />
      <path d="M11 13v-2.2h2V13M8 13h8" />
    </>
  ),
  live: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M8 20h8M12 16v4" />
      <path d="m10.5 8 4 2-4 2V8Z" />
    </>
  ),
};

const REASONS = [
  { t: 'A proven track record', d: 'AIR 1 in every UPSC result since 2016, and all ten of the top ten ranks in CSE 2025 prepared with us. Founded in 1976 by Prof. P. Velayutham.', icon: 'medal' },
  { t: 'Expert faculty', d: 'Expert faculty for every GS paper, the optionals and the essay: an academic tradition shaped by educators and subject specialists.', icon: 'board' },
  { t: 'Personal guidance', d: 'A plan shaped around your strengths and gaps, with a mentor who keeps it on track from Foundation to Interview.', icon: 'mentor' },
  { t: 'Complete study material', d: 'Notes, test series and interview preparation in one place. 59 questions in Prelims 2025 came from our test series.', icon: 'notes' },
  { t: 'A prime location', d: 'Over 50 years in Old Rajinder Nagar, New Delhi, at Gate 5 of Karol Bagh Metro.', icon: 'place' },
  { t: 'Learn the way that suits you', d: '12 UPSC CSE programmes in the classroom and LIVE-Online, with the same teachers and the same tests.', icon: 'live' },
];

const CARD = [
  'cu:group cu:relative cu:flex cu:flex-col cu:h-full cu:p-[26px] cu:rounded-(--r-card) cu:text-[#5a4632]',
  'cu:[background:linear-gradient(178deg,#F9EFDA,#F5E8CE_30%,#EFDFC0)]',
].join(' ');

export default function WhyChoose() {
  return (
    <section id="story" aria-labelledby="legacyH" className="cu:relative cu:py-(--sec-y) cu:px-(--px) cu:[background:var(--ground-jaali)] cu:overflow-clip">
      <div className="cu:grid cu:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] cu:max-[900px]:grid-cols-1 cu:items-center cu:gap-x-[clamp(24px,5vw,72px)] cu:gap-y-[28px] cu:text-left">
        <figure className="rv cu:m-0 cu:aspect-[3/4] cu:w-[min(100%,calc((100svh-var(--hdr-h)-64px)*.75))] cu:max-[900px]:w-[min(100%,360px)] cu:overflow-hidden cu:rounded-(--r-card) cu:bg-[#eadbc4] cu:[box-shadow:0_24px_48px_-32px_rgb(80_48_16/.35)]" style={{ '--d': '.05s' }}>
          <img src={PHOTO.src} srcSet={photoSrcSet(PHOTO.src, PHOTO.w)} sizes="(max-width: 900px) 92vw, 30vw" alt={PHOTO.alt} width={PHOTO.w} height={PHOTO.h} loading="lazy" decoding="async" className="cu:block cu:size-full cu:object-cover cu:object-center cu:transition-transform cu:duration-700 cu:ease-(--ease) cu:fine:hover:scale-[1.03] cu:motion-reduce:transition-none" />
        </figure>
        <header id="legacy" className="cu:flex cu:flex-col cu:items-start">
          <SectionLabel>{LEGACY.label}</SectionLabel>
          <h2 id="legacyH" className="h2 h2--sec rv cu:mt-(--hd-lbl) cu:mb-0 cu:max-w-[22ch] cu:text-balance cu:text-[clamp(34px,3.7vw,52px)]! cu:leading-[1.08]!" style={{ '--d': '.12s' }}>{LEGACY.title}</h2>
          <p className="rv cu:mt-(--hd-lbl) cu:mb-0 cu:max-w-[62ch] cu:text-[clamp(16px,1.25vw,18px)] cu:leading-[1.75] cu:text-[#4a3f35]" style={{ '--d': '.2s' }}>{LEGACY.body}</p>
        </header>
      </div>
      <div id="reasons" className="cu:mt-[clamp(48px,5vw,72px)]">
        <ul className="why__cards cu:grid cu:grid-cols-3 cu:max-[1000px]:grid-cols-2 cu:max-[640px]:grid-cols-1 cu:gap-(--card-gap) cu:w-full cu:list-none cu:p-0 cu:text-left">
          {REASONS.map((r) => (
            <li key={r.t} className="cu:min-w-0">
              <article className={CARD}>
                <span aria-hidden="true" className="cu:grid cu:place-items-center cu:flex-none cu:size-[60px] cu:rounded-full cu:bg-[#FFF8EA] cu:text-(--brand)">
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="cu:size-[30px] cu:fill-none cu:stroke-current cu:[stroke-width:1.5] cu:[stroke-linecap:round] cu:[stroke-linejoin:round]">{ICONS[r.icon]}</svg>
                </span>
                <div className="cu:pt-[18px]">
                  <h3 className="cu:m-0 cu:[font:400_clamp(24px,2vw,30px)/1.15_var(--f-title)] cu:tracking-[-.01em] cu:text-[#2A2016]">{r.t}</h3>
                  <p className="cu:mt-[8px] cu:mb-0 cu:text-[clamp(15px,1.15vw,17px)] cu:leading-[1.65] cu:text-[#5a4632]">{r.d}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
