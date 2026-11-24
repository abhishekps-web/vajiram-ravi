import '@/app/tailwind-sections.css';
import HeroBanner, { FIRST_KIND } from './HeroBanner';
import HeroStats from './HeroStats';

export default function Hero() {
  return (
    <section className="dl dl--pin cu:max-[760px]:[--card-h:100svh]!" id="dlPin" aria-labelledby="dlH" data-kind={FIRST_KIND}>
      <span className="dl__ground" aria-hidden="true" />
      <div className="dl__frame">
        <HeroBanner />
        <HeroStats />
      </div>
    </section>
  );
}
