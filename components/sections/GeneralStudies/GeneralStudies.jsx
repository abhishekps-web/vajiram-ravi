import SectionLabel from '@/components/ui/SectionLabel';

// ============ GENERAL STUDIES ============
export default function GeneralStudies() {
  return (
    <section className="gs" id="gs" aria-labelledby="gsH">
      <div className="prog__cuts" aria-hidden="true">
        <img className="cut cut--l" src="/assets/img/photos/collage.png" alt="" decoding="async" />
        <img className="cut cut--r" src="/assets/img/photos/collage.png" alt="" decoding="async" />
      </div>
      <span className="kinari kinari--gs" aria-hidden="true" />
      <span className="pat pat--buta" aria-hidden="true" />
      <div className="gs__in">
        <SectionLabel light symbol={{ src: "/assets/img/brand/lotus-white-solid.svg", width: 40, height: 24 }}>Our flagship programme</SectionLabel>
        <h2 id="gsH" className="h2 gs__h rv" style={{ "--d": ".12s" }}>{"General Studies decides "}<span>most of your UPSC score.</span></h2>
        <p className="gs__p rv" style={{ "--d": ".2s" }}>Our GS Prelims cum Mains Programme covers the full syllabus with daily classes, printed study material, Prelims and Mains tests and mentoring, in the classroom or LIVE-Online. Graduates take the 1-year programme; college students start with the 2-year Fledgling.</p>
        <div className="rv-btn rv" style={{ "--d": ".28s" }}>
          <a className="bt bt--white" href="#courses" data-cat="0">View GS courses<span className="sq sq--52 sq--brand">
            <img src="/assets/img/icons/arrow-white.svg" alt="" width="16" height="16" />
          </span></a>
        </div>
      </div>
      <div className="gsbook" role="img" aria-label="General Studies in numbers: 200 of 200 Prelims marks and 1,000 of 1,750 Mains marks come from General Studies; a 1-year programme for graduates and the 2-year Fledgling for college students.">
        <div className="gsbook__in">
          <div className="gsbook__back" />
          <div className="gsbook__pages" />
          <div className="gsbook__top" />
          <div className="gsbook__bottom" />
          <div className="gsbook__spine">
            <b>General Studies</b>
          </div>
          <div className="gsbook__page" aria-hidden="true">
            <p className="gsbook__page-hd">Inside</p>
            <ul>
              <li>Daily classes</li>
              <li>Printed study material</li>
              <li>Prelims and Mains tests</li>
              <li>Mentoring</li>
            </ul>
            <p className="gsbook__page-ft">Classroom or LIVE-Online</p>
          </div>
          <div className="gsbook__cover">
            <div className="gsbook__face">
              <p className="gsbook__brand">Vajiram & Ravi</p>
              <h3 className="gsbook__title">General Studies</h3>
              <p className="gsbook__orn" aria-hidden="true">
                <i />
              </p>
              <dl className="gsbook__stats">
                <div>
                  <dd>
                    <span data-count="200">200</span>
                    <small>/200</small>
                  </dd>
                  <dt>Prelims marks</dt>
                </div>
                <div>
                  <dd>
                    <span data-count="1000">1,000</span>
                    <small>/1,750</small>
                  </dd>
                  <dt>Mains marks</dt>
                </div>
                <div>
                  <dd>1<small>{" yr"}</small></dd>
                  <dt>For graduates</dt>
                </div>
                <div>
                  <dd>2<small>{" yrs"}</small></dd>
                  <dt>Fledgling, for college students</dt>
                </div>
              </dl>
              <p className="gsbook__foot">Prelims cum Mains Programme</p>
            </div>
            <div className="gsbook__inside" />
          </div>
          <span className="gsbook__ribbon" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
