import { photoSrcSet } from '@/lib/photo';
import SectionWrapper from '@/components/ui/section_wrapper';
import '@/app/tailwind-sections.css';

const PHONE = 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z';
const MAIL = ['M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'm22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7'];
const Ico = ({ d }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" className="cu:flex-none cu:fill-none cu:stroke-(--brand) cu:[stroke-width:2] cu:[stroke-linecap:round] cu:[stroke-linejoin:round]">
    {[].concat(d).map(p => <path key={p} d={p} />)}
  </svg>
);

const CENTRE = {
  address: '1-B/7, Pusa Road, Old Rajinder Nagar, New Delhi 110060',
  near: ['Next to Gate 5 of Karol Bagh Metro Station,', 'near pillar 103'],
  hours: 'Mon – Sat, 9 am – 7 pm',
  phone: { label: '080-6220-6330', href: 'tel:+918062206330' },
  email: 'admissions@vajiramandravi.com',
  embed: 'https://www.google.com/maps?q=Vajiram+%26+Ravi,+1-B%2F7+Pusa+Road,+Old+Rajinder+Nagar,+New+Delhi+110060&z=16&output=embed',
};
const PHOTO = { src: '/assets/img/photos/campus-sunlit.webp', alt: 'Students outside the Vajiram & Ravi institute entrance, its sign reading "Institute for IAS Examination, since 1976"', w: 1672, h: 941 };

const CARD = [
  'cu:relative cu:grid cu:grid-cols-[minmax(0,340px)_minmax(0,1fr)] cu:gap-[clamp(28px,3.4vw,48px)] cu:w-full cu:max-w-(--site-w) cu:mx-auto cu:mt-(--hd-gap) cu:text-left',
  'cu:p-[clamp(38px,2.6vw+10px,46px)] cu:xs:p-[24px] cu:stacked:grid-cols-1 cu:stacked:gap-[28px] cu:xs:gap-[20px]',
  'cu:bg-[rgb(255_255_255/.85)] cu:backdrop-blur-[8px] cu:rounded-none',
  'cu:after:absolute cu:after:inset-[10px] cu:xs:after:inset-[8px] cu:after:border-[1.2px] cu:after:border-solid cu:after:border-[#D9A441] cu:after:pointer-events-none',
].join(' ');
const DETAILS = [
  'cu:flex cu:flex-col cu:min-w-0',
  'cu:stacked:grid cu:stacked:grid-cols-[minmax(0,240px)_minmax(0,1fr)] cu:stacked:gap-x-[28px] cu:stacked:content-start cu:xs:flex',
].join(' ');
const BADGE = 'cu:self-start cu:justify-self-start cu:m-0 cu:text-[#E57512] cu:[font:700_13px/1.2_var(--f)] cu:tracking-[.08em] cu:uppercase';
const ADDRESS = 'cu:mt-[10px] cu:mb-0 cu:font-(family-name:--f-title) cu:font-normal cu:text-[clamp(24px,2vw,28px)] cu:leading-[1.2] cu:tracking-[-.01em] cu:text-(--ink) cu:[text-wrap:balance]';
const NEAR = 'cu:mt-[8px] cu:mb-0 cu:[font:400_15px/1.5_var(--f)] cu:text-(--body)';
const HOURS = 'cu:mt-[14px] cu:mb-0 cu:[font:600_15px/1.5_var(--f)] cu:text-(--ink)';
const META = 'cu:flex cu:flex-col cu:gap-[12px] cu:mt-[20px] cu:mb-0 cu:p-0 cu:pt-[20px] cu:border-0 cu:border-t cu:border-solid cu:border-[#eadbc4] cu:list-none cu:xs:gap-0 cu:xs:mt-[16px] cu:xs:pt-[6px]';
const LINK = [
  'cu:inline-flex cu:items-center cu:gap-[8px] cu:pb-px cu:xs:min-h-[40px] cu:xs:gap-[10px] cu:[font:600_16.5px/1.3_var(--f)] cu:text-(--ink) cu:no-underline',
  'cu:bg-[linear-gradient(currentColor,currentColor)] cu:bg-no-repeat cu:bg-[position:0_100%] cu:bg-[length:0_1px]',
  'cu:[transition:color_.2s_ease,background-size_.3s_cubic-bezier(.22,1,.36,1)] cu:motion-reduce:transition-none',
  'cu:hover:text-(--brand) cu:hover:bg-[length:100%_1px] cu:focus-visible:text-(--brand) cu:focus-visible:bg-[length:100%_1px]',
  'cu:focus-visible:outline-2 cu:focus-visible:outline-(--brand) cu:focus-visible:outline-offset-[3px] cu:focus-visible:rounded-[2px]',
].join(' ');
const MAP_BOX = [
  'cu:relative cu:flex-none cu:w-full cu:aspect-[2/1] cu:mb-[24px] cu:stacked:aspect-square cu:stacked:row-span-6 cu:stacked:mb-0 cu:xs:aspect-[2/1] cu:xs:mb-[20px] cu:overflow-hidden cu:rounded-[4px] cu:bg-[#EDE6DA]',
  'cu:after:absolute cu:after:inset-0 cu:after:z-1 cu:after:rounded-[inherit] cu:after:pointer-events-none cu:after:shadow-[inset_0_0_0_1px_rgba(194,65,12,.16)]',
].join(' ');
const MAP_FRAME = 'cu:absolute cu:inset-x-0 cu:top-[-64px] cu:w-full cu:h-[calc(100%+64px)] cu:border-0';
const PHOTO_BOX = 'cu:xs:hidden cu:group cu:relative cu:z-1 cu:m-0 cu:min-h-[360px] cu:overflow-hidden cu:rounded-[4px] cu:bg-[#6b2a0c] cu:stacked:min-h-0 cu:stacked:aspect-[16/9]';
const PHOTO_IMG = 'cu:absolute cu:inset-0 cu:block cu:w-full cu:h-full cu:object-cover cu:object-[100%_45%] cu:[transition:transform_.9s_cubic-bezier(.22,1,.36,1)] cu:motion-reduce:transition-none cu:fine:group-hover:[transform:scale(1.04)]';

export default function ContactUs() {
  return (
    <SectionWrapper id="visit" labelledBy="locH" compact className="band dots band--gap">
      <h2 id="locH" className="h2 h2--sec rv cu:mt-0!" style={{ "--d": ".12s" }}>Contact us</h2>
      <p className="intro rv" style={{ "--d": ".2s", textWrap: "balance" }}>Pick the channel that suits you, or visit us in New Delhi.</p>
      <div className={`${CARD} rv`} style={{ "--d": ".28s" }}>
        <div className={DETAILS}>
          <div className={MAP_BOX}>
            <iframe className={MAP_FRAME} src={CENTRE.embed} title={`Map: Vajiram & Ravi, ${CENTRE.address}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
          </div>
          <p className={BADGE}>New Delhi centre</p>
          <h3 className={ADDRESS}>{CENTRE.address}</h3>
          <p className={NEAR}>{CENTRE.near.map(line => <span key={line} className="cu:block">{line}</span>)}</p>
          <p className={HOURS}>{CENTRE.hours}</p>
          <ul className={META}>
            <li><a className={LINK} href={CENTRE.phone.href} aria-label={`Call us on ${CENTRE.phone.label}`}><Ico d={PHONE} /><span>{CENTRE.phone.label}</span></a></li>
            <li><a className={LINK} href={`mailto:${CENTRE.email}`} aria-label={`Email us at ${CENTRE.email}`}><Ico d={MAIL} /><span>{CENTRE.email}</span></a></li>
          </ul>
        </div>
        <figure className={PHOTO_BOX}>
          <img className={PHOTO_IMG} src={PHOTO.src} srcSet={photoSrcSet(PHOTO.src, PHOTO.w)} sizes="(max-width: 860px) 92vw, 60vw" alt={PHOTO.alt} width={PHOTO.w} height={PHOTO.h} loading="lazy" decoding="async" />
        </figure>
      </div>
    </SectionWrapper>
  );
}
