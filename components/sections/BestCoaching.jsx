import SectionLabel from '@/components/ui/SectionLabel';
import '@/app/tailwind-sections.css';

const CONTENT = {
  label: 'Since 1976',
  title: 'Best IAS Coaching in Delhi, India',
  body: 'With over five decades of excellence, Vajiram & Ravi is one of the most trusted names for the best IAS coaching in Delhi. The institute has served aspirants since 1976, offering experienced faculty, proven teaching methods, and organized preparation strategies centered on achievement.',
};

export default function BestCoaching() {
  return (
    <section id="about" aria-labelledby="aboutH" className="cu:relative cu:overflow-clip cu:py-(--sec-y) cu:px-(--px) cu:[background:var(--ground-jaali)]">
      <span aria-hidden="true" className="rv cu:absolute cu:right-[calc(var(--px)-0.06em)] cu:top-1/2 cu:-translate-y-1/2 cu:font-(family-name:--f-title) cu:text-[clamp(140px,22vw,320px)] cu:leading-none cu:tracking-[-.04em] cu:text-[rgb(194_65_12/.06)] cu:select-none cu:pointer-events-none cu:stacked:top-auto cu:stacked:bottom-[calc(var(--sec-y)*-0.35)] cu:stacked:translate-y-0" style={{ '--d': '.3s' }}>1976</span>
      <div className="cu:relative cu:grid cu:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] cu:items-end cu:gap-x-[clamp(32px,6vw,96px)] cu:gap-y-[24px] cu:max-w-[1180px] cu:mx-auto cu:stacked:grid-cols-1">
        <header>
          <SectionLabel>{CONTENT.label}</SectionLabel>
          <h2 id="aboutH" className="h2 h2--sec rv cu:mt-(--hd-lbl) cu:mb-0" style={{ '--d': '.12s' }}>{CONTENT.title}</h2>
        </header>
        <div className="rv cu:[border-left:2px_solid_var(--brand)] cu:pl-[clamp(20px,2.4vw,32px)] cu:stacked:mt-[8px]" style={{ '--d': '.22s' }}>
          <p className="cu:m-0 cu:text-[clamp(16px,1.35vw,19px)] cu:leading-[1.7] cu:text-[#4a3f35]">{CONTENT.body}</p>
        </div>
      </div>
    </section>
  );
}
