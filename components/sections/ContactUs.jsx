import { photoSrcSet } from '@/lib/photo';
import SectionWrapper from '@/components/ui/section_wrapper';
import '@/app/tailwind-sections.css';

const PHONE = 'M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384';
const MAIL = ['m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7', 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z'];
const Ico = ({ d }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" className="cu:flex-none cu:fill-none cu:stroke-(--brand) cu:[stroke-width:2] cu:[stroke-linecap:round] cu:[stroke-linejoin:round]">
    {[].concat(d).map(p => <path key={p} d={p} />)}
  </svg>
);

const QUERY = 'Vajiram+%26+Ravi,+1-B%2F7+Pusa+Road,+Old+Rajinder+Nagar,+New+Delhi+110060';
const CENTRE = {
  name: 'Vajiram & Ravi, New Delhi',
  address: '1-B/7, Pusa Road, Old Rajinder Nagar, New Delhi 110060',
  near: { place: 'Karol Bagh Metro, Gate 5', mark: 'Near pillar 103' },
  hours: { days: 'Monday to Saturday', time: '9 am – 7 pm' },
  phone: { label: '080-6220-6330', href: 'tel:+918062206330' },
  email: 'admissions@vajiramandravi.com',
  maps: `https://www.google.com/maps/search/?api=1&query=${QUERY}`,
  embed: `https://www.google.com/maps?q=${QUERY}&z=16&output=embed`,
};
const PHOTO = { src: '/assets/img/photos/campus-sunlit.webp', w: 1672, h: 941 };
const GO = ['M7 17 17 7', 'M7 7h10v10'];
const PIN = ['M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0', 'M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0z'];
const CLOCK = ['M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0z', 'M12 6v6l4 2'];

const CARD = [
  'cu:relative cu:grid cu:grid-cols-[minmax(0,1fr)_minmax(0,360px)] cu:w-full cu:max-w-[900px] cu:mx-auto cu:mt-[20px] cu:xs:mt-[16px] cu:text-left cu:stacked:grid-cols-1',
  'cu:overflow-hidden cu:rounded-(--r-card) cu:bg-white cu:border cu:border-solid cu:border-[rgba(45,18,4,.08)] cu:shadow-[0_28px_56px_-32px_rgba(45,18,4,.35)]',
].join(' ');
const DETAILS = 'cu:relative cu:after:absolute cu:after:inset-[10px] cu:xs:after:inset-[7px] cu:after:border-[1.2px] cu:after:border-solid cu:after:border-[#D9A441] cu:after:pointer-events-none cu:flex cu:flex-col cu:justify-center cu:min-w-0 cu:px-[clamp(24px,3.4vw,40px)] cu:py-[30px] cu:xs:p-[22px]';
const BADGE = 'cu:m-0 cu:text-[#E57512] cu:[font:700_12px/1.2_var(--f)] cu:tracking-[.08em] cu:uppercase';
const ADDRESS = 'cu:mt-[6px] cu:mb-0 cu:[font:600_20px/1.25_var(--f-title)] cu:max-[640px]:text-[19px] cu:tracking-[-.015em] cu:text-(--ink) cu:text-balance';
const FACT = 'cu:flex cu:flex-wrap cu:items-center cu:gap-x-[8px] cu:gap-y-[2px] cu:mb-0 cu:[font:400_14px/1.45_var(--f)] cu:text-(--body)';
const DOT = 'cu:size-[3px] cu:rounded-full cu:bg-[#C9A98C]';
const META = 'cu:grid cu:grid-cols-[auto_minmax(0,1fr)] cu:gap-x-[32px] cu:gap-y-[12px] cu:mt-[18px] cu:mb-0 cu:p-0 cu:pt-[16px] cu:border-0 cu:border-t cu:border-solid cu:border-[rgba(45,18,4,.08)] cu:list-none cu:xs:grid-cols-1';
const META_LABEL = 'cu:block cu:mb-[4px] cu:text-[11px] cu:leading-[1.3] cu:font-semibold cu:tracking-[.1em] cu:uppercase cu:text-[#9A8676]';
const LINK = 'cu:group cu:inline-flex cu:items-center cu:gap-[8px] cu:xs:min-h-[36px] cu:[font:600_15px/1.3_var(--f)] cu:text-(--ink) cu:no-underline cu:focus-visible:outline-2 cu:focus-visible:outline-(--brand) cu:focus-visible:outline-offset-[3px] cu:focus-visible:rounded-[2px]';
const LINK_TEXT = [
  'cu:pb-px cu:bg-[linear-gradient(currentColor,currentColor)] cu:bg-no-repeat cu:bg-[position:0_100%] cu:bg-[length:0_1px]',
  'cu:[transition:color_.2s_ease,background-size_.3s_cubic-bezier(.22,1,.36,1)] cu:motion-reduce:transition-none',
  'cu:group-hover:text-(--brand) cu:group-hover:bg-[length:100%_1px] cu:group-focus-visible:text-(--brand) cu:group-focus-visible:bg-[length:100%_1px]',
].join(' ');
const MAP_BOX = [
  'cu:relative cu:z-1 cu:min-h-[290px] cu:w-full cu:overflow-hidden cu:bg-[#EDE6DA] cu:stacked:min-h-0 cu:stacked:aspect-[2/1] cu:xs:aspect-[4/3]',
  'cu:border-0 cu:border-l cu:border-solid cu:border-[rgba(45,18,4,.08)] cu:stacked:border-l-0 cu:stacked:border-t',
].join(' ');
const MAP_FRAME = 'cu:pointer-events-none cu:absolute cu:inset-x-0 cu:top-[-64px] cu:w-full cu:h-[calc(160%+128px)] cu:border-0';
const POP = [
  'cu:group cu:absolute cu:z-2 cu:block cu:text-left cu:no-underline cu:left-[calc(50%-26px)] cu:bottom-[calc(20%+16px)] cu:-translate-x-1/2 cu:w-[220px] cu:xs:w-[210px] cu:rounded-[6px] cu:bg-white',
  'cu:shadow-[0_18px_40px_-16px_rgba(45,18,4,.45),0_0_0_1px_rgba(45,18,4,.06)]',
  "cu:after:content-[''] cu:after:absolute cu:after:left-1/2 cu:after:bottom-[-7px] cu:after:size-[14px] cu:after:-translate-x-1/2 cu:after:rotate-45 cu:after:bg-white",
  'cu:[transition:translate_.45s_cubic-bezier(.22,1,.36,1),box-shadow_.3s_ease] cu:fine:hover:-translate-y-1 cu:hover:shadow-[0_24px_44px_-16px_rgba(45,18,4,.5),0_0_0_1px_rgba(45,18,4,.08)] cu:focus-visible:outline-2 cu:focus-visible:outline-(--brand) cu:focus-visible:outline-offset-[3px] cu:motion-reduce:transition-none',
].join(' ');
const POP_PHOTO = 'cu:block cu:relative cu:aspect-[5/2] cu:overflow-hidden cu:rounded-t-[6px] cu:bg-[#6b2a0c]';
const POP_IMG = 'cu:absolute cu:inset-0 cu:block cu:w-full cu:h-full cu:object-cover cu:object-[100%_45%] cu:[transition:transform_.9s_cubic-bezier(.22,1,.36,1)] cu:motion-reduce:transition-none cu:fine:group-hover:[transform:scale(1.05)]';
const POP_BODY = 'cu:block cu:relative cu:z-1 cu:pt-[9px] cu:pr-[38px] cu:pb-[11px] cu:pl-[12px]';
const POP_GO = [
  'cu:absolute cu:right-[8px] cu:bottom-[8px] cu:grid cu:place-items-center cu:size-[28px] cu:rounded-full cu:text-(--ink)',
  'cu:[transition:background-color_.2s_ease,translate_.3s_cubic-bezier(.22,1,.36,1)] cu:group-hover:bg-[#FBEDE0] cu:group-hover:[translate:2px_-2px] cu:group-focus-visible:bg-[#FBEDE0] cu:motion-reduce:transition-none',
].join(' ');
const POP_NAME = 'cu:block cu:[font:600_13.5px/1.3_var(--f)] cu:text-(--ink)';
const POP_ADDRESS = 'cu:block cu:mt-[2px] cu:[font:400_12px/1.4_var(--f)] cu:text-(--body)';

export default function ContactUs() {
  return (
    <SectionWrapper id="visit" labelledBy="locH" half className="band dots band--gap">
      <h2 id="locH" className="h2 h2--sec rv cu:mt-0!" style={{ "--d": ".12s" }}>Contact us</h2>
      <p className="intro rv cu:text-balance" style={{ "--d": ".2s" }}>Pick the channel that suits you, or visit us in New Delhi.</p>
      <div className={`${CARD} rv`} style={{ "--d": ".28s" }}>
        <div className={DETAILS}>
          <p className={BADGE}>New Delhi centre</p>
          <h3 className={ADDRESS}>{CENTRE.address}</h3>
          <p className={`${FACT} cu:mt-[10px]`}><Ico d={PIN} /><span>{CENTRE.near.place}</span><span aria-hidden="true" className={DOT} /><strong className="cu:font-semibold cu:text-(--ink)">{CENTRE.near.mark}</strong></p>
          <p className={`${FACT} cu:mt-[6px]`}><Ico d={CLOCK} /><span>{CENTRE.hours.days}</span><span aria-hidden="true" className={DOT} /><strong className="cu:font-semibold cu:text-(--ink)">{CENTRE.hours.time}</strong></p>
          <ul className={META}>
            <li><span className={META_LABEL}>Call</span><a className={LINK} href={CENTRE.phone.href} aria-label={`Call us on ${CENTRE.phone.label}`}><Ico d={PHONE} /><span className={LINK_TEXT}>{CENTRE.phone.label}</span></a></li>
            <li><span className={META_LABEL}>Email</span><a className={LINK} href={`mailto:${CENTRE.email}`} aria-label={`Email us at ${CENTRE.email}`}><Ico d={MAIL} /><span className={LINK_TEXT}>{CENTRE.email}</span></a></li>
          </ul>
        </div>
        <div className={MAP_BOX}>
          <iframe className={MAP_FRAME} src={CENTRE.embed} title={`Map: Vajiram & Ravi, ${CENTRE.address}`} tabIndex={-1} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          <a className={POP} href={CENTRE.maps} target="_blank" rel="noopener noreferrer" aria-label={`${CENTRE.name}: open in Google Maps`}>
            <span className={POP_PHOTO}>
              <img className={POP_IMG} src={PHOTO.src} srcSet={photoSrcSet(PHOTO.src, PHOTO.w)} sizes="220px" alt="" width={PHOTO.w} height={PHOTO.h} loading="lazy" decoding="async" />
            </span>
            <span className={POP_BODY}>
              <span className={POP_NAME}>{CENTRE.name}</span>
              <span className={POP_ADDRESS}>{CENTRE.address}</span>
              <span className={POP_GO} aria-hidden="true"><Ico d={GO} /></span>
            </span>
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}
