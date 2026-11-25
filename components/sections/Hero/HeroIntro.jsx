import SectionWrapper from '@/components/ui/section_wrapper';
import SectionLabel from '@/components/ui/SectionLabel';
import Button from '@/components/ui/Button';
import HeroStats from './HeroStats';
import '@/app/tailwind-sections.css';

const KEY = 'cu:font-semibold cu:text-(--ink)';

export default function HeroIntro() {
  return (
    <SectionWrapper id="about-vr" labelledBy="aboutVrH" compact className="hx__intro cu:z-1 cu:text-center">
      <div className="cu:mx-auto cu:flex cu:max-w-[1000px] cu:flex-col cu:items-center">
        <SectionLabel>Vajiram &amp; Ravi IAS Institute</SectionLabel>
        <h1 id="aboutVrH" className="h2 h2--sec rv cu:text-balance" style={{ '--d': '.1s' }}>
          Best IAS Coaching in Delhi, India
        </h1>
        <p className="intro rv cu:max-w-[720px]! cu:text-balance" style={{ '--d': '.2s' }}>
          With 5+ decades of excellence, <strong className={KEY}>Vajiram &amp; Ravi</strong> is one of the most trusted names for <strong className={KEY}>Best IAS Coaching in Delhi</strong>. The institute has served aspirants since 1976, offering experienced faculty, proven teaching methods, and organized preparation strategies centered on achievement.
        </p>
        <div className="rv cu:mt-[28px] cu:flex cu:flex-wrap cu:justify-center cu:gap-[12px]" style={{ '--d': '.3s' }}>
          <Button href="#courses" iconEnd="arrow">Explore programmes</Button>
          <Button variant="secondary" href="#contact">Talk to a counsellor</Button>
        </div>
      </div>
      <HeroStats />
    </SectionWrapper>
  );
}
