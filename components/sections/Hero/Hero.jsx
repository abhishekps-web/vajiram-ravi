import Button from '@/components/ui/Button/Button';
import { HERO_STATS } from './data';
import Trending from './Trending';

// the results pill's line (Kevin's hero: the topper on show; here the CSE 2025 AIR 1)
const RESULT_LINE = 'Anuj Agnihotri · AIR 1, UPSC CSE 2025 · See all the results';

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
      {/* the hero's ground (v49.css, end), continued above it by the header band */}
      <span className="dl__ground" aria-hidden="true" />
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
          {/* the hero's copy, Kevin's hero IA (user 2026-11-16; branch kevin, index.html .hx__copy): the CSE 2025 results pill with its
              gliding line, the headline, the lead and two buttons. One copy for every slide (the slides change only the photo).
              Styles at the end of v49.css ("Hero copy, Kevin's IA"). */}
          <div className="dl__in">
            <p className="hx__tick rv">
              <a className="hx__ticker" href="https://vajiramandravi.com/ias-selections-from-vajiram/" target="_blank" rel="noopener">
                <span className="hx__tag">CSE 2025 results</span>
                <span className="hx__win">
                  <span className="hx__glide">
                    <span>{RESULT_LINE}</span>
                    <span aria-hidden="true">{RESULT_LINE}</span>
                  </span>
                </span>
                <svg className="hx__tick-arw" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8H13M9 4L13 8L9 12" /></svg>
              </a>
            </p>
            <h1 className="hx__h" id="dlH">
              <span className="hx__line rv" style={{ "--d": ".05s" }}>Prepare for the UPSC with</span>
              {" "}
              <span className="hx__line rv" style={{ "--d": ".12s" }}>the institute behind</span>
              {" "}
              <span className="hx__line rv" style={{ "--d": ".19s" }}>India’s top rank-holders.</span>
            </h1>
            <p className="hx__lead rv" style={{ "--d": ".27s" }}>Since 1976, Vajiram & Ravi has brought 50 years of Civil Services teaching experience to your preparation, with expert faculty, structured programmes, comprehensive study resources and flexible learning options.</p>
            <p className="hx__btns rv" style={{ "--d": ".34s" }}>
              <Button size="md" href="#courses" iconEnd="arrow">Explore programmes</Button>
              <Button onDark size="md" href="#contact">Get expert guidance</Button>
            </p>
          </div>
          {/* previous / next (user 2026-11-13): the site's icon buttons, at the card's bottom right; page-motion.js moves the slides */}
          <div className="dl__arrows" role="group" aria-label="Change slide">
            <Button variant="outline" onDark iconOnly size="sm" iconStart="arrow-left" label="Previous slide" className="dl__arrow dl__arrow--prev" />
            <Button variant="outline" onDark iconOnly size="sm" iconStart="arrow" label="Next slide" className="dl__arrow dl__arrow--next" />
          </div>
          <p className="dl__prog cdots" id="dlProg" role="group" aria-label="Hero slides">
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
        {/* What's trending (user 2026-11-16, from Kevin's build): the banner carousel under the stats (Trending.jsx) */}
        <Trending />
      </div>
    </section>
  );
}
