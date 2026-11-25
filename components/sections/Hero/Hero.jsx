import HeroBanner, { FIRST_KIND } from './HeroBanner';
import HeroIntro from './HeroIntro';
import '@/app/tailwind-sections.css';

const VARS = [
  'cu:[--hx-side:calc(var(--cap)_+_clamp(16px,5.5vw,40px))]! cu:min-[901px]:[--hx-side:calc(var(--cap)_+_40px)]!',
  'cu:[--hx-in:clamp(24px,4vw,64px)]! cu:max-[900.98px]:[--hx-in:24px]! cu:max-[560.98px]:[--hx-in:18px]!',
  'cu:[--hx-foot:8px]! cu:max-[900.98px]:[--hx-foot:84px]! cu:max-[760.98px]:[--hx-foot:62px]!',
  'cu:min-[901px]:[--card-min:calc(var(--txt-h)_+_64px)]!',
  'cu:min-[1101px]:[--card-h:max(408px,min(480px,calc(100svh_-_var(--hdr-h)_-_var(--hdr-gap)_-_290px)))]!',
  'cu:min-[761px]:max-[1100.98px]:[--card-h:max(470px,min(480px,calc(100svh_-_var(--hdr-h)_-_var(--hdr-gap)_-_330px)))]!',
  'cu:max-[760.98px]:[--card-h:calc(100svh_-_var(--hdr-h)_-_var(--hdr-gap))]!',
  'cu:min-[761px]:[--hero-avail:calc(min(100svh,900px)_-_var(--hdr-h)_-_var(--hdr-gap))]!',
  'cu:min-[761px]:[--stats-h:calc(var(--hero-avail)_-_var(--card-h))]! cu:max-[760.98px]:[--stats-h:218px]!',
].join(' ');

export default function Hero() {
  return (
    <section className={`dl dl--pin cu:group/hero cu:h-auto! cu:min-h-0! ${VARS}`} id="dlPin" aria-labelledby="dlH" data-kind={FIRST_KIND}>
      <span className="dl__ground" aria-hidden="true" />
      <div className="dl__frame cu:px-(--hx-side)! cu:pb-0! cu:h-auto! cu:min-h-0!">
        <HeroBanner />
        <HeroIntro />
      </div>
    </section>
  );
}
