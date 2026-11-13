export default function Hero() {
  return (
    <section className="dl dl--pin" id="dlPin" aria-labelledby="dlH">
      <div className="dl__stick">
        <div className="dl__bg" id="dlBg" aria-hidden="true">
          <div className="dl__slides" id="dlSlides">
            <img className="on" src="/assets/img/hero/hero-1.png" alt="" width="1672" height="941" decoding="async" />
            <img src="/assets/img/hero/hero-prelims.png" alt="" width="1672" height="941" decoding="async" loading="lazy" />
            <img src="/assets/img/hero/hero-interview.png" alt="" width="1672" height="941" decoding="async" loading="lazy" />
            <img src="/assets/img/hero/hero-result.png" alt="" width="1672" height="941" decoding="async" loading="lazy" />
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
        <a className="bt bt--white dl__cta" id="dlCta" href="#courses">Explore our courses<span className="sq sq--52 sq--brand">
          <img src="/assets/img/icons/arrow-white.svg" alt="" width="16" height="16" />
        </span></a>
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
        <a className="dl__scroll" href="#toppers" aria-label="Scroll down">
          <span>Scroll</span>
          <i aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
