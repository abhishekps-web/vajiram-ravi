import Button from '@/components/ui/Button/Button';
import { HERO_STATS, HERO_TOPPER_SLIDES } from './data';
import PromoBanner from './PromoBanner/PromoBanner';
import Stylesheet from '@/components/ui/Stylesheet';

// the results pill's line (Kevin's hero: the topper on show; here the CSE 2025 AIR 1)
const RESULT_LINE = 'Anuj Agnihotri · AIR 1, UPSC CSE 2025 · See all the results';

// The banner is Kevin's (user 2026-11-16, "banner same as kevin's version"; branch kevin, index.html .hx__panel): the top three of
// UPSC CSE 2025 in turn (6.5 s each, a 1 s crossfade, each portrait pushing in slowly), a warm wash from the left for the type, the
// AIR card top right. Layout and spacing are Kevin's too (user 2026-11-16, eclectic-alfajores-975fab.netlify.app; css/hero-v6.css and
// css/mobile.css): the card on the 1280px column, the copy centred in it, the dots centred in a dark pill at the foot and previous /
// next on the card's two side edges. Styles public/css/hero-banner.css; page-motion.js runs the slides.
export default function Hero() {
  return (
    <section className="dl dl--pin" id="dlPin" aria-labelledby="dlH">
      {/* the hero's ground (v49.css, end), continued above it by the header band */}
      <span className="dl__ground" aria-hidden="true" />
      <div className="dl__frame">
        <div className="dl__stick">
          <div className="dl__bg" id="dlBg" aria-hidden="true">
            <div className="dl__slides" id="dlSlides">
              {/* the toppers, AIR 1 to 3, one full photo each; the AIR card (.hx__mark below) and the results ticker follow the topper on
                  show (page-motion.js). The first is the LCP image: loaded eagerly at high priority; the rest load lazily */}
              {HERO_TOPPER_SLIDES.map((t, i) => (
                <div key={t.rank} className={i === 0 ? 'dl__topper on' : 'dl__topper'} data-rank={t.rank} data-name={t.name}>
                  <img src={t.src} alt="" width="1920" height="822" decoding="async" {...(i === 0 ? { fetchPriority: 'high' } : { loading: 'lazy' })} />
                </div>
              ))}
            </div>
          </div>
          <div id="heroNames" hidden aria-hidden="true" />
          {/* the AIR card (Kevin's .hx__mark): shown on a topper's slide, with that topper's rank and name */}
          <div className="hx__mark" aria-hidden="true">
            <div className="hx__mark-card">
              <p className="hx__mark-air"><span>AIR</span><b>01</b></p>
              <p className="hx__mark-name">{HERO_TOPPER_SLIDES[0].name}</p>
              <p className="hx__mark-exam">UPSC CSE 2025</p>
            </div>
          </div>
          {/* the hero's copy, Kevin's hero IA (user 2026-11-16; branch kevin, index.html .hx__copy): the CSE 2025 results pill with its
              gliding line, the headline, the lead and two buttons. One copy for every slide (the slides change only the photo).
              Styles at the end of v49.css ("Hero copy, Kevin's IA"). */}
          <div className="dl__in">
            <p className="hx__tick rv">
              <a className="hx__ticker" href="https://vajiramandravi.com/ias-selections-from-vajiram/" target="_blank" rel="noopener">
                <span className="hx__tag">CSE 2025 results</span>
                <span className="hx__win">
                  <span className="hx__glide" id="hxGlide">
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
        </div>
        {/* the banner's controls, outside the card (it clips its contents). From 761px, Kevin's: page-motion.js lays this layer exactly
            over the card, previous / next centred on its two side edges, half outside it (shown while the pointer is over the card;
            hidden on touch screens, where a swipe changes the slide), the dots centred at its foot in a dark pill. Phones (user
            2026-11-16, "the controls move under the hero banner"): one row under the full-bleed card, previous, the dots, next.
            The dots are the site's .cdots, the current one filling with the slide's time (page-motion.js, through --p). */}
        <div className="hx__navs" role="group" aria-label="Change topper">
          <span className="hx__nav hx__nav--prev"><Button variant="outline" iconOnly size="sm" iconStart="arrow-left" label="Previous topper" className="dl__arrow dl__arrow--prev" /></span>
          <p className="hx__dots cdots" id="dlProg" role="group" aria-label="Choose a topper">
            {HERO_TOPPER_SLIDES.map(t => (
              <button key={t.rank} type="button" aria-label={`AIR ${t.rank}: ${t.name}`}>
                <i />
              </button>
            ))}
          </p>
          <span className="hx__nav hx__nav--next"><Button variant="outline" iconOnly size="sm" iconStart="arrow" label="Next topper" className="dl__arrow dl__arrow--next" /></span>
        </div>
        <Stylesheet href="/css/hero-banner.css" />
        {/* key numbers under the hero card, Kevin's (user 2026-11-16): figures in data.js, the roll-up and entrance in hero-stats.js,
            styles public/css/hero-stats.css. The hidden copy of each figure holds its width while it rolls up. */}
        <Stylesheet href="/css/hero-stats.css" />
        <ul className="hx__stats is-pre" aria-label="Vajiram & Ravi at a glance">
          {HERO_STATS.map((s) => (
            <li key={s.label} className="hx__stat hx__in" style={{ '--at': `${s.at}ms` }}>
              <span className="hx__num">
                <b className="hx__fig" data-fig={s.fig}>{s.fig}</b>
                <span className="hx__fig hx__fig--room" aria-hidden="true">{s.fig}</span>
              </span>
              <span className="hx__stat-t">{s.lines.map((l, k) => <span key={l} className="hx__stat-l">{k ? " " : ""}{l}</span>)}</span>
            </li>
          ))}
        </ul>
        {/* Promo banner (user 2026-11-16, from Kevin's build): the banner carousel under the stats (PromoBanner.jsx) */}
        <PromoBanner />
      </div>
    </section>
  );
}
