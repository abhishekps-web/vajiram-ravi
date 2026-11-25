import Button from '@/components/ui/Button';
import SectionWrapper from '@/components/ui/section_wrapper';
import CarouselDots from '@/components/ui/CarouselDots';
import BatchCard from './BatchCard';
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

export { initBatchTickets } from './BatchCard';

export default function Batches() {
  return (
    <>
      <SectionWrapper id="batches" labelledBy="batH" compact className="band dots band--gap">
        <h2 id="batH" className="h2 h2--sec rv cu:mx-auto! cu:text-center! cu:text-balance cu:mt-0!" style={{ '--d': '.08s' }}>Next batches starting soon.</h2>
        <div className="rv cu:flex cu:flex-col cu:items-center cu:gap-[18px] cu:mb-(--hd-gap) cu:text-center" style={{ '--d': '.16s' }}>
          <p className="intro cu:mx-auto! cu:text-balance">{'Register online, or call '}<a href="tel:08062206330">080-6220-6330</a>{' for registration or seat allotment, Monday to Saturday, 9 am to 7 pm.'}</p>
          <Button variant="link" id="allBatches" iconEnd="arrow">View all batches</Button>
        </div>
        <div className="rail cu:-mt-[18px]! cu:[--bgap:var(--card-gap)] cu:[--cw:calc((100%-3*var(--bgap))/4)] cu:max-[1180px]:[--cw:calc((100%-var(--bgap))/2)] cu:max-[640px]:[--cw:86%]">
          <div
            className="rail__track cu:gap-(--bgap) cu:pt-[18px]! cu:pb-[80px]! cu:max-[760px]:pb-[32px]! cu:max-[760px]:overflow-y-hidden! cu:min-[761px]:mb-[-80px]! cu:focus-visible:[outline:2px_solid_var(--brand)]! cu:focus-visible:[outline-offset:-2px] cu:focus-visible:rounded-[12px]"
            id="price" tabIndex={0} role="region" aria-roledescription="carousel" aria-label="Upcoming batches"
          >
            {BATCHES.map(b => <BatchCard key={b.full} b={b} fam={BFAM[b.fam] || BFAM.gs} year={BYEAR} />)}
          </div>
          <div className="rail__nav rv cu:flex cu:justify-center cu:gap-[12px] cu:mt-[4px] cu:max-[760px]:hidden cu:min-[1024px]:absolute cu:min-[1024px]:inset-[18px_calc(var(--px)*-1)_80px] cu:min-[1024px]:z-[2] cu:min-[1024px]:m-0 cu:min-[1024px]:justify-between cu:min-[1024px]:items-center cu:min-[1024px]:px-[max(4px,calc((var(--px)-44px)/2))] cu:min-[1024px]:pointer-events-none cu:min-[1024px]:[&>*]:pointer-events-auto" style={{ '--d': '.24s' }}>
            <Button variant="outline" size="sm" iconOnly iconStart="arrow-left" label="Previous batches" className="cbtn cbtn--prev" />
            <Button variant="outline" size="sm" iconOnly iconStart="arrow" label="Next batches" className="cbtn cbtn--next" />
          </div>
          <div className="cu:flex cu:justify-center cu:-mt-[16px] cu:min-[761px]:hidden"><CarouselDots className="rail__dots" tone="light" label="Choose a batch" labels={BATCHES.map(x => `Show ${x.full}`)} controls="price" /></div>
        </div>
      </SectionWrapper>
    </>
  );
}
