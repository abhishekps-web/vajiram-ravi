// sections not in the current order; kept in the page (scripts need them) but hidden
export default function Parked() {
  return (
    <div id="parked" hidden>
      {/* ============ HOW IT WORKS (v45) ============ */}
      <section className="hw hw--intro" aria-labelledby="hwH">
        <div className="hw__bg" id="hwBg" aria-hidden="true" />
        <div className="hw__in">
          <p className="mono hw__k rv">How Vajiram & Ravi works</p>
          <h2 className="hw__h rv" id="hwH" style={{ "--d": ".08s" }}>A clear way to<br />prepare for UPSC</h2>
          <p className="hw__p rv" style={{ "--d": ".16s" }}>Pick your stage, join the batch that suits you, and study with daily classes, tests and mentoring, taught by specialists, from the same address aspirants have trusted since 1976.</p>
          <a className="hw__b rv" style={{ "--d": ".24s" }} href="#courses">Find your course</a>
        </div>
      </section>
      <section className="hp" id="hp" aria-label="How it works, in three steps">
        <ul className="hp__list">
          <li className="hp__li" data-i="0">
            <article className="hp__card">
              <span className="hp__jaali" aria-hidden="true" />
              <div className="hp__txt">
                <p className="mono">Step 1</p>
                <h3>Choose your stage</h3>
                <p className="mono hp__sub">From Foundation to the Interview</p>
                <p className="hp__b">There is a programme for where you are now. Start from the beginning, or join at the stage you have reached.</p>
                <a className="hp__a" href="#courses">See programmes<svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
                  <path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg></a>
              </div>
              <div className="hp__vis" aria-hidden="true">
                <ul className="hp__stages">
                  <li>
                    <span />
                    <b>Foundation</b>
                  </li>
                  <li>
                    <span />
                    <b>Prelims</b>
                  </li>
                  <li>
                    <span />
                    <b>Mains</b>
                  </li>
                  <li>
                    <span />
                    <b>Interview</b>
                  </li>
                </ul>
              </div>
            </article>
          </li>
          <li className="hp__li" data-i="1">
            <article className="hp__card">
              <span className="hp__jaali" aria-hidden="true" />
              <div className="hp__txt">
                <p className="mono">Step 2</p>
                <h3>Join a batch</h3>
                <p className="mono hp__sub">Classroom or LIVE-Online</p>
                <p className="hp__b">Start on the right day with the right batch, at the Old Rajinder Nagar campus or live from wherever you are.</p>
                <a className="hp__a" href="#batches">Upcoming batches<svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
                  <path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg></a>
              </div>
              <div className="hp__vis" aria-hidden="true">
                <figure className="hp__photo">
                  <img src="/assets/img/photos/campus.webp" alt="" width="900" height="600" loading="lazy" />
                  <figcaption>
                    <span>Classroom</span>
                    <span>LIVE-Online</span>
                  </figcaption>
                </figure>
              </div>
            </article>
          </li>
          <li className="hp__li" data-i="2">
            <article className="hp__card">
              <span className="hp__jaali" aria-hidden="true" />
              <div className="hp__txt">
                <p className="mono">Step 3</p>
                <h3>Study, test, get mentored</h3>
                <p className="mono hp__sub">Everything in one method</p>
                <p className="hp__b">Daily classes, printed study material, Prelims and Mains tests and mentoring, so you always know what to study next.</p>
                <a className="hp__a" href="#gs">See how it works<svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
                  <path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg></a>
              </div>
              <div className="hp__vis" aria-hidden="true">
                <ul className="hp__stack">
                  <li>
                    <b>Daily classes</b>
                  </li>
                  <li>
                    <b>Printed study material</b>
                  </li>
                  <li>
                    <b>Prelims and Mains tests</b>
                  </li>
                  <li>
                    <b>Mentoring</b>
                  </li>
                </ul>
              </div>
            </article>
          </li>
        </ul>
      </section>
      {/* ============ RESULTS ============ */}
      <section className="sheet stats" aria-labelledby="resH">
        <h2 id="resH" className="stats__h reveal">
          <span className="ln">Fifty years of preparing civil servants.</span>
          {" "}
          <span className="ln">Ranks 1 to 10 in UPSC CSE 2025 prepared</span>
          {" "}
          <span className="ln">with us, and AIR 1 has come from our</span>
          {" "}
          <span className="ln">classrooms in every result since 2016.</span>
        </h2>
        <div className="kcards" id="kcards" />
      </section>
    </div>
  );
}
