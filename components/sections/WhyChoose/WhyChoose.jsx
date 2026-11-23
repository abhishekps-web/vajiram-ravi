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
      <path d="M27 3h10L27 20l-6-3Z" fill="#C23B30" />
      <path d="M11 3h10l9 16-7 2Z" fill="#E2574C" />
      <circle cx="24" cy="31" r="14" fill="#EEC45E" />
      <circle cx="24" cy="31" r="9.5" fill="#D9AE4F" />
      <circle cx="24" cy="31" r="6.5" fill="#EEC45E" />
    </>
  ),
  board: (
    <>
      <path d="M12 23v9c0 3.5 5.4 7 12 7s12-3.5 12-7v-9l-12 6Z" fill="#4A6FA5" />
      <path d="M24 7 46 18 24 29 2 18Z" fill="#2F4B7C" />
      <path d="M41 20v12" stroke="#EEC45E" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="41" cy="35" r="3" fill="#EEC45E" />
    </>
  ),
  mentor: (
    <>
      <circle cx="31" cy="17" r="5.5" fill="#F2C6A0" />
      <path d="M21 41c0-8 4.5-12 10-12s10 4 10 12Z" fill="#2F4B7C" />
      <circle cx="16" cy="13" r="7" fill="#F2C6A0" />
      <path d="M3 42c0-10 5.5-16 13-16s13 6 13 16Z" fill="#E8730C" />
      <path d="M38 4l1.4 2.8 3.1.5-2.2 2.2.5 3.1L38 11l-2.8 1.6.5-3.1-2.2-2.2 3.1-.5Z" fill="#EEC45E" />
    </>
  ),
  notes: (
    <>
      <rect x="5" y="31" width="38" height="10" rx="2.5" fill="#E2574C" />
      <rect x="8" y="20" width="32" height="10" rx="2.5" fill="#EEC45E" />
      <rect x="6" y="9" width="34" height="10" rx="2.5" fill="#4A6FA5" />
      <path d="M11 36h12M14 25h12M12 14h12" stroke="#FFF1D6" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  place: (
    <>
      <ellipse cx="24" cy="43.5" rx="10" ry="2.5" fill="#E6D3AE" />
      <path d="M24 3C16 3 10 9 10 17c0 10 14 26 14 26s14-16 14-26C38 9 32 3 24 3Z" fill="#E2574C" />
      <circle cx="24" cy="17" r="6.5" fill="#FFF1D6" />
    </>
  ),
  live: (
    <>
      <rect x="4" y="7" width="40" height="28" rx="3.5" fill="#3A4F7A" />
      <rect x="7.5" y="10.5" width="33" height="21" rx="1.5" fill="#CFE3FF" />
      <path d="M20 15.5 33 21l-13 5.5Z" fill="#E8730C" />
      <circle cx="37" cy="14" r="2.2" fill="#E2574C" />
      <rect x="21" y="35" width="6" height="5" fill="#8A97B0" />
      <rect x="14" y="39" width="20" height="4" rx="2" fill="#3A4F7A" />
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
                  <svg aria-hidden="true" viewBox="0 0 48 48" className="cu:size-[38px]">{ICONS[r.icon]}</svg>
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
