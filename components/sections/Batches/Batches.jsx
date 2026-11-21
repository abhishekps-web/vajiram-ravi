import Button from '@/components/ui/Button/Button';
import Dialog from '@/components/ui/Dialog';
import { $, $$, reduce } from '@/lib/site';
import '@/app/tailwind-sections.css';

export const BFAM = {
  gs:     { t: 'General Studies', c: '#C64613' },
  pre:    { t: 'Prelims',         c: '#B47A20' },
  ca:     { t: 'Current affairs', c: '#9D485B' },
  mains:  { t: 'Mains',           c: '#326F66' },
  mentor: { t: 'Mentorship',      c: '#3F5B87' }
};

export const BATCHES = [
  { n: 'GS Comprehensive', fam: 'gs', full: '11-Month Prelims cum Mains General Studies Comprehensive Programme', d: '29 Jan', tgt: 'CSE 2027', what: 'The full GS syllabus for Prelims and Mains, in 11 months.', chip: 'Flagship', hi: true },
  { n: 'Prelims CAMP', fam: 'pre', full: 'Prelims CAMP, Batch 3', d: '3 Jan', tgt: 'CSE 2027', what: 'Prelims revision camp, batch 3.', chip: 'Limited seats' },
  { n: 'SMART Prelims', fam: 'ca', full: 'SMART Prelims Current Affairs Programme 2026', d: '17 Jan', tgt: 'CSE 2027', what: 'Current affairs for Prelims.' },
  { n: 'SMART', fam: 'ca', full: 'SMART Current Affairs Programme 2026', d: '17 Jan', tgt: 'CSE 2026', what: 'Current affairs for Prelims and Mains.', chip: 'Limited seats' },
  { n: 'GS 2-Year Fledgling', fam: 'gs', full: 'General Studies PCM 2-year Fledgling Programme 2028', d: '5 Feb', tgt: 'CSE 2028', what: 'The GS programme over two years, for college students.' },
  { n: 'PowerUp Prelims Tests', fam: 'pre', full: 'PowerUp Prelims Test Series 2027', d: '8 Feb', tgt: 'CSE 2027', what: 'Full-length Prelims tests with the reasoning behind every answer.' },
  { n: 'Sure Shot Mains', fam: 'mains', full: 'Sure Shot Mains Test Series 2027', d: '22 Feb', tgt: 'CSE 2027', what: 'Mains answer writing, evaluated, in English and Hindi.', chip: 'Limited seats' },
  { n: 'StepUp Mentorship', fam: 'mentor', full: 'StepUp Mentorship Programme 2027', d: '15 Jan', tgt: 'CSE 2027', what: 'A mentor keeps your plan on track, week by week.' }
];

export const BYEAR = 2027;

export const BANNERS = [
  ['Desktop_Size_GS_11_Months_Banner_16_f1fa678225', 'General Studies Prelims cum Mains Programme for UPSC 2027'],
  ['Desktop_Size_GS_2_year_2_508da0d9c9', 'General Studies PCM 2-year Fledgling Programme 2028'],
  ['Desktop_Size_Stepup_6_8b18a6bbf0', 'StepUp Mentorship Programme 2027'],
  ['Desktop_Size_Powerup_9_79a81c3370', 'PowerUp Prelims Test Series 2027'],
  ['SURE_SHOT_Desktop_Size_Sure_Shot_16_4d2c3b30ad', 'Sure Shot Mains Test Series 2027'],
  ['Desktop_Size_CSAT_Banner_5eca6e8ca4', 'CSAT course for UPSC 2027'],
  ['Desktop_Size_optional_Banner_19621e0d08', 'Optional Subject Programme for UPSC CSE 2027'],
  ['Desktop_Size_History_Optional_35fde8138a', 'History Optional Enrichment and Mentorship Programme 2027'],
  ['Desktop_Size_economics_module_5_ba1f0b5527', 'Economics Module 2027 for General Studies'],
  ['SMART_Web_banner_95ee4752b3', 'SMART Current Affairs Programme for UPSC Prelims and Mains 2027'],
  ['Desktop_Size_Scholership_test_Banner_2_eeb8fb48a8', 'Scholarship test for Sure Shot Mains Programme 2027'],
  ['Desktop_Size_sureshot_hindi_8_18ae1e3e5f', 'Sure Shot Mains Programme 2027, Hindi medium'],
  ['2911_575px_Desktop_be707365f9', 'Sure Shot Seniors Super 50'],
  ['Desktop_size_14_edd2ea9021', 'Top 10 out of 10 rankers in UPSC CSE 2025 from Vajiram & Ravi']
];

const OPEN = BANNERS.filter(([, t]) => !/^Top 10/.test(t));

const TICKET = [
  'cu:group cu:relative cu:min-w-0 cu:[transform-style:preserve-3d] cu:will-change-[translate] cu:[filter:drop-shadow(0_14px_15px_rgba(102,38,13,.1))]',
  'cu:[transition:translate_.45s_cubic-bezier(.22,1,.36,1),transform_.5s_cubic-bezier(.22,1,.36,1),filter_.4s]!',
  'cu:hover:z-[2] cu:focus-within:z-[2] cu:hover:translate-y-[-5px] cu:focus-within:translate-y-[-5px]',
  'cu:fine:hover:translate-y-[-8px] cu:fine:hover:[transform:perspective(1000px)_rotateX(calc(var(--ty,0)*-7deg))_rotateY(calc(var(--tx,0)*9deg))]',
  'cu:fine:hover:[filter:drop-shadow(calc(var(--tx,0)*-14px)_calc(24px_-_var(--ty,0)*10px)_18px_rgba(102,38,13,.3))]',
  'cu:fine:hover:[transition:translate_.45s_cubic-bezier(.22,1,.36,1),transform_.14s_linear,filter_.2s]!',
  'cu:motion-reduce:[transition:none]! cu:motion-reduce:[transform:none]!',
].join(' ');
const FLAGSHIP = 'cu:animate-[flagClock_7.5s_cubic-bezier(.45,.05,.55,.95)_1.2s_infinite] cu:motion-reduce:animate-none';

const FRAME = [
  'cu:relative cu:flex cu:flex-col cu:h-full cu:p-0 cu:rounded-(--r-card) cu:bg-white cu:text-(--ink) cu:overflow-hidden cu:[mask:var(--ticket-notch)]',
  'cu:shadow-[inset_0_1px_0_rgba(255,255,255,.9),inset_0_-2px_0_rgba(120,60,20,.06)]',
  "cu:after:content-[''] cu:after:absolute cu:after:inset-0 cu:after:z-[4] cu:after:pointer-events-none cu:after:opacity-0 cu:after:transition-opacity cu:after:duration-300 cu:after:mix-blend-soft-light",
  'cu:after:[background:radial-gradient(circle_at_var(--gx,50%)_var(--gy,30%),rgba(255,255,255,.6),rgba(255,255,255,.14)_34%,transparent_62%)] cu:fine:group-hover:after:opacity-100',
].join(' ');
const FRAME_FLAGSHIP = 'cu:[transform:perspective(1000px)_rotateY(var(--fr))_scale(var(--fz))] cu:motion-reduce:[transform:none]';

const HEAD = [
  'cu:relative cu:isolate cu:flex cu:items-start cu:justify-between cu:gap-[12px] cu:min-h-[92px] cu:py-[13px] cu:px-[20px] cu:bg-(--ticket) cu:text-white cu:overflow-hidden',
  'cu:shadow-[inset_0_1px_0_rgba(255,255,255,.28),inset_0_-10px_18px_-12px_rgba(0,0,0,.3)]',
  "cu:after:content-[''] cu:after:absolute cu:after:inset-[7px] cu:after:[border:1px_solid_rgba(255,255,255,.19)] cu:after:rounded-[2px_2px_0_0] cu:after:pointer-events-none",
].join(' ');
const HEAD_FLAGSHIP = "cu:before:content-[''] cu:before:absolute cu:before:inset-0 cu:before:z-[3] cu:before:pointer-events-none cu:before:rounded-[inherit] cu:before:[background:var(--flag-glint)_var(--fs,120%)_0/260%_100%_no-repeat] cu:before:mix-blend-color-dodge cu:motion-reduce:before:[background:none]";

const STUB = "cu:relative cu:flex-none cu:flex cu:items-center cu:h-[66px] cu:px-[20px] cu:before:content-[''] cu:before:absolute cu:before:left-[18px] cu:before:right-[18px] cu:before:top-0 cu:before:[border-top:1.5px_dashed_#C9A98C]";
const STUB_FLAGSHIP = "cu:after:content-[''] cu:after:absolute cu:after:z-[3] cu:after:pointer-events-none cu:after:top-1/2 cu:after:left-[20px] cu:after:right-[20px] cu:after:h-[48px] cu:after:-translate-y-1/2 cu:after:rounded-full cu:after:[background:var(--flag-glint)_var(--fb,120%)_0/260%_100%_no-repeat] cu:after:mix-blend-color-dodge cu:motion-reduce:after:[background:none]";

const ENROL = 'cu:[--btn-shadow:inset_0_1px_0_rgba(255,255,255,.4),inset_0_-3px_0_rgba(120,30,0,.25),0_6px_10px_-6px_rgba(198,70,19,.5)]! cu:fine:group-hover:[--btn-shadow:inset_0_1px_0_rgba(255,255,255,.45),inset_0_-3px_0_rgba(120,30,0,.3),0_12px_16px_-8px_rgba(198,70,19,.7)]!';

function Ticket({ b }) {
  const [d, mon] = b.d.split(' ');
  const fam = BFAM[b.fam] || BFAM.gs;
  const flagship = b.chip === 'Flagship';
  const limited = b.chip === 'Limited seats';
  return (
    <article className={`${TICKET} ${flagship ? FLAGSHIP : ''}`} style={{ '--ticket': fam.c }}>
      <div className={`${FRAME} ${flagship ? FRAME_FLAGSHIP : ''}`}>
        <div className={`${HEAD} ${flagship ? HEAD_FLAGSHIP : ''}`}>
          <img className="cu:absolute cu:right-0 cu:bottom-0 cu:w-[140px] cu:h-[74px] cu:opacity-65 cu:-z-1" src="/assets/img/brand/lotus-ticket.svg" alt="" aria-hidden="true" />
          <div>
            <span className="cu:block cu:text-[11.5px] cu:leading-[1.35] cu:font-semibold">Batch starts</span>
            <time className="cu:flex cu:items-end cu:gap-[8px] cu:mt-[2px]">
              <b className="cu:[font:700_38px/1_var(--f-d)] cu:tracking-[-.03em]">{d}</b>
              <span className="cu:grid cu:pb-[4px] cu:[font:600_14px/1.2_var(--f)]">{mon || ''}<small className="cu:text-[12px] cu:font-semibold cu:opacity-75">{BYEAR}</small></span>
            </time>
          </div>
          <span className="cu:block cu:pt-[2px] cu:text-right cu:text-[11.5px] cu:leading-[1.35] cu:font-semibold cu:text-white/60">Target exam<strong className="cu:block cu:mt-[4px] cu:text-[13px] cu:font-semibold cu:text-white">UPSC {b.tgt}</strong></span>
        </div>
        <div className="cu:flex cu:flex-col cu:flex-1 cu:pt-[12px] cu:px-[20px] cu:pb-[8px]">
          <span className="cu:m-0 cu:text-(--ticket) cu:[font:700_12px/1.2_var(--f)] cu:uppercase cu:tracking-[.06em]">{fam.t}{flagship ? ' · Flagship' : ''}</span>
          <h3 className="cu:mt-[6px] cu:mb-0 cu:text-(--ink) cu:[font:600_20px/1.2_var(--f-d)] cu:tracking-[-.015em]">{b.n}</h3>
          <p className="cu:mt-[4px] cu:mb-0 cu:text-(--body) cu:text-[14px] cu:leading-[1.4]">{b.what}</p>
          <div className="cu:relative cu:box-border cu:flex cu:items-end cu:justify-between cu:gap-[12px] cu:mt-auto cu:pt-[8px] cu:min-h-[78px]">
            <dl className={`cu:grid cu:gap-0 cu:m-0 cu:p-0 cu:text-[14.5px] cu:leading-[1.5] cu:text-(--body) ${limited ? 'cu:pr-[90px]' : ''}`}>
              <div>
                <dt className="cu:text-[10.5px] cu:font-semibold cu:uppercase cu:tracking-[.06em] cu:text-[#8D6E5E]">Study mode</dt>
                <dd className="cu:mt-[2px] cu:mx-0 cu:mb-0 cu:text-(--ink) cu:text-[13.5px] cu:leading-[1.35]">Classroom and LIVE{'‑'}Online</dd>
              </div>
            </dl>
            {limited && (
              <span aria-label="Limited seats" className="cu:absolute cu:right-0 cu:bottom-[-4px] cu:m-0 cu:grid cu:place-items-center cu:size-[82px] cu:rounded-full cu:[border:2px_solid_#C4482C] cu:text-[#B13D24] cu:rotate-[-12deg] cu:text-center cu:before:content-[''] cu:before:absolute cu:before:inset-[4px] cu:before:[border:1px_solid_currentColor] cu:before:rounded-full">
                <span className="cu:uppercase cu:[font:700_12px/1.4_var(--f)] cu:tracking-[.08em]">Limited<br />seats</span>
              </span>
            )}
          </div>
        </div>
        <div className={`${STUB} ${flagship ? STUB_FLAGSHIP : ''}`}>
          <Button href="#contact" ariaLabel={`Enroll now in ${b.full}`} iconEnd="arrow" fullWidth className={ENROL} data-prog={b.full}>Enroll now</Button>
        </div>
      </div>
    </article>
  );
}

export default function Batches() {
  return (
    <>
      <section className="band dots band--gap" id="batches" aria-labelledby="batH">
        <h2 id="batH" className="h2 h2--sec rv cu:mx-auto! cu:text-center! cu:text-balance cu:max-[760px]:mt-0!" style={{ '--d': '.08s' }}>Next batches starting soon.</h2>
        <div className="rv cu:flex cu:flex-col cu:items-center cu:gap-[18px] cu:mb-(--hd-gap) cu:text-center" style={{ '--d': '.16s' }}>
          <p className="intro cu:mx-auto! cu:text-balance">{'Register online, or call '}<a href="tel:08062206330">080-6220-6330</a>{' for registration or seat allotment, Monday to Saturday, 9 am to 7 pm.'}</p>
          <Button variant="link" id="allBatches" iconEnd="arrow">View all batches</Button>
        </div>
        <div className="rail cu:mt-0! cu:[--bgap:var(--card-gap)] cu:[--cw:calc((100%-3*var(--bgap))/4)] cu:max-[1180px]:[--cw:calc((100%-var(--bgap))/2)] cu:max-[640px]:[--cw:86%]">
          <div
            className="rail__track cu:gap-(--bgap) cu:pt-[18px]! cu:pb-[80px]! cu:max-[760px]:pb-[24px]! cu:mb-[-46px] cu:[mask-image:linear-gradient(90deg,transparent_0,#000_7%,#000_93%,transparent_100%)] cu:motion-reduce:[mask-image:none] cu:focus-visible:[outline:2px_solid_var(--brand)]! cu:focus-visible:[outline-offset:-2px] cu:focus-visible:rounded-[12px]"
            id="price" tabIndex={0} role="region" aria-roledescription="carousel" aria-label="Upcoming batches"
          >
            {BATCHES.map(b => <Ticket key={b.full} b={b} />)}
          </div>
          <div className="rail__nav rv cu:flex cu:justify-center cu:gap-[12px] cu:mt-[4px] cu:max-[760px]:mt-[12px] cu:min-[1024px]:absolute cu:min-[1024px]:inset-[18px_calc(var(--px)*-1)_34px] cu:min-[1024px]:z-[2] cu:min-[1024px]:m-0 cu:min-[1024px]:justify-between cu:min-[1024px]:items-center cu:min-[1024px]:px-[max(4px,calc((var(--px)-44px)/2))] cu:min-[1024px]:pointer-events-none cu:min-[1024px]:[&>*]:pointer-events-auto" style={{ '--d': '.24s' }}>
            <Button variant="outline" size="sm" iconOnly iconStart="arrow-left" label="Previous batches" className="cbtn cbtn--prev" />
            <Button variant="outline" size="sm" iconOnly iconStart="arrow" label="Next batches" className="cbtn cbtn--next" />
          </div>
        </div>
      </section>
      <Dialog id="batchDlg" className="dlg dlg--cat" titleId="batchDlgH" title={`Admissions open: ${OPEN.length} programmes`} closeId="batchDlgX" listId="batchList"
        listClass="cu:flex-1 cu:min-h-0 cu:overflow-auto cu:grid cu:grid-cols-2 cu:gap-[14px] cu:pt-[4px] cu:px-[24px] cu:pb-[24px] cu:max-[760px]:grid-cols-1 cu:max-[760px]:px-[16px] cu:max-[760px]:pb-[16px]">
        {OPEN.map(([f, t]) => (
          <li key={f}>
            <a href="#contact" data-prog={t} className="cu:block cu:rounded-[14px] cu:overflow-hidden cu:bg-(--sand) cu:transition-[translate,box-shadow] cu:duration-[250ms] cu:ease-(--ease) cu:hover:translate-y-[-2px] cu:hover:shadow-[0_10px_24px_rgba(194,65,12,.16)] cu:focus-visible:translate-y-[-2px] cu:motion-reduce:transition-none">
              <img src={`/assets/img/banners/${f}.webp`} alt="" loading="lazy" className="cu:block cu:w-full cu:aspect-[2911/575] cu:object-cover" />
              <span className="cu:flex cu:justify-between cu:items-center cu:gap-[12px] cu:py-[12px] cu:px-[14px] cu:text-[14.5px] cu:leading-[1.35]">{t}<img src="/assets/img/icons/arrow-list.svg" alt="" width="16" height="16" className="cu:size-[16px] cu:flex-none" /></span>
            </a>
          </li>
        ))}
      </Dialog>
    </>
  );
}

export function initBatchTickets() {
  if (reduce || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  $$('#price > article').forEach(c => {
    c.addEventListener('pointermove', e => {
      const r = c.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      c.style.setProperty('--tx', (px - .5).toFixed(3));
      c.style.setProperty('--ty', (py - .5).toFixed(3));
      c.style.setProperty('--gx', (px * 100).toFixed(0) + '%');
      c.style.setProperty('--gy', (py * 100).toFixed(0) + '%');
    });
    c.addEventListener('pointerleave', () => { c.style.setProperty('--tx', 0); c.style.setProperty('--ty', 0); });
  });
}

export function initBatchDialog() {
  const dlg = $('#batchDlg');
  $('#allBatches').addEventListener('click', () => dlg.showModal());
  $('#batchDlgX').addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', e => { if (e.target === dlg || e.target.closest('[data-prog]')) dlg.close(); });
}
