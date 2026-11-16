import Button from '@/components/ui/Button/Button';
import { HERO_STATS } from './data';

// Hero slides: WebP at three widths each (public/assets/img/hero/<name>-<width>.webp). The slides cover the hero
// (object-fit: cover), so on a portrait phone the image is scaled to the hero's height and drawn about 2.5x the screen width.
const HERO = '/assets/img/hero';
const SIZES = '(max-width: 767px) 250vw, 100vw';
const SLIDES = [
  { name: 'hero-1', w: 1672, h: 941, widths: [768, 1200, 1672] },
  { name: 'hero-prelims', w: 1672, h: 941, widths: [768, 1200, 1672] },
  { name: 'hero-interview', w: 1536, h: 1024, widths: [768, 1200, 1536] },
  { name: 'hero-result', w: 1672, h: 941, widths: [768, 1200, 1672] },
];
export default function Hero() {
  return (
    <section className="dl dl--pin" id="dlPin" aria-labelledby="dlH">
      <div className="dl__frame">
        <div className="dl__stick">
          <div className="dl__bg" id="dlBg" aria-hidden="true">
            <div className="dl__slides" id="dlSlides">
              {/* the first slide is the LCP image: loaded eagerly at high priority; the rest load lazily */}
              {SLIDES.map((s, i) => (
                <img
                  key={s.name}
                  className={i === 0 ? 'on' : undefined}
                  src={`${HERO}/${s.name}-1200.webp`}
                  srcSet={s.widths.map(w => `${HERO}/${s.name}-${w}.webp ${w}w`).join(', ')}
                  sizes={SIZES}
                  alt=""
                  width={s.w}
                  height={s.h}
                  decoding="async"
                  {...(i === 0 ? { fetchPriority: 'high' } : { loading: 'lazy' })}
                />
              ))}
            </div>
          </div>
          <div id="heroNames" hidden aria-hidden="true" />
          <div className="dl__in">
            <p className="mono dl__k rv">50 Years Legacy</p>
            <h1 className="dl__h" id="dlH">
              <span className="rv" style={{ "--d": ".05s" }}>Preparing India’s civil servants,</span>
              {" "}
              <span className="rv" style={{ "--d": ".15s" }}>since 1976.</span>
            </h1>
            <p className="dl__p rv" style={{ "--d": ".25s" }}>Five decades of guiding civil services aspirants through expert faculty, structured classroom programmes and comprehensive preparation for Prelims, Mains and the Personality Test.</p>
          </div>
          <div className="sc sc--r" data-i="0">
            <div className="sc__txt">
              <p className="mono vp__k">
                <span className="ln">
                  <i>Prelims & Mains</i>
                </span>
              </p>
              <h2 className="vp__h">
                <span className="ln">
                  <i>One syllabus, multiple subjects.</i>
                </span>
                <span className="ln">
                  <i>A preparation that covers it all.</i>
                </span>
              </h2>
              <p className="sc__p">From Indian Polity and History to Economy, Geography and Environment, build your General Studies knowledge through daily classes, comprehensive printed material and regular tests.</p>
            </div>
          </div>
          <div className="sc sc--r" data-i="1">
            <div className="sc__txt">
              <p className="mono vp__k">
                <span className="ln">
                  <i>UPSC Interview</i>
                </span>
              </p>
              <h2 className="vp__h">
                <span className="ln">
                  <i>Cleared Prelims and Mains? Prepare for the Personality Test.</i>
                </span>
              </h2>
              <p className="sc__p">The final stage is about more than what you know. Build confidence, articulate your thoughts and prepare for the board with mock interviews, DAF analysis and personalised guidance.</p>
            </div>
          </div>
          <div className="sc sc--r" data-i="2">
            <div className="sc__txt">
              <p className="mono vp__k">
                <span className="ln">
                  <i>The Result</i>
                </span>
              </p>
              <h2 className="vp__h">
                <span className="ln">
                  <i>The next name on the UPSC final list could be yours.</i>
                </span>
              </h2>
              <p className="sc__p">Every year, aspirants turn years of preparation into a place on the Civil Services merit list. With ranks 1 to 10 in CSE 2025 prepared with us, your story could be the next one we celebrate.</p>
            </div>
          </div>
          <Button onDark size="xl" className="dl__cta" id="dlCta" href="#courses" iconEnd="arrow">Explore our courses</Button>
          {/* previous / next (user 2026-11-13): the site's icon buttons, at the card's bottom right; page-motion.js moves the slides */}
          <div className="dl__arrows" role="group" aria-label="Change slide">
            <Button variant="outline" onDark iconOnly size="sm" iconStart="arrow-left" label="Previous slide" className="dl__arrow dl__arrow--prev" />
            <Button variant="outline" onDark iconOnly size="sm" iconStart="arrow" label="Next slide" className="dl__arrow dl__arrow--next" />
          </div>
          <p className="dl__prog" id="dlProg" role="group" aria-label="Hero slides">
            <button type="button" aria-label="Slide 1">
              <i />
            </button>
            <button type="button" aria-label="Slide 2">
              <i />
            </button>
            <button type="button" aria-label="Slide 3">
              <i />
            </button>
            <button type="button" aria-label="Slide 4">
              <i />
            </button>
          </p>
        </div>
        {/* key numbers under the hero card (user 2026-11-16): data.js; hero-stats.js counts them up, the CSS is at the end of v49.css */}
        <ul className="dl__stats" aria-label="Vajiram & Ravi in numbers">
          {HERO_STATS.map((s, i) => (
            <li key={s.label} className="rv" style={{ '--d': `${0.3 + i * 0.08}s` }}>
              <b className="dl__num">{s.pre}<span data-count={s.count}>{s.count}</span>{s.suf}</b>
              <span className="dl__stat-l">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
