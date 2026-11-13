import Stylesheet from '@/components/ui/Stylesheet';
import SectionLabel from '@/components/ui/SectionLabel';
import { StraightArrow } from '@/components/ui/ArrowIcon';

// ============ WHY VAJIRAM & RAVI: a pinned photographic scene (after vajiram-ravi-homepage.vercel.app #campus), carrying the six reasons. The gate photograph grows out of the full-bleed facade, "Why choose us?" splits apart, the card settles bottom-left and six chapters swing in on the scroll. css/story.css, ./story.js (id stays "story": the older #why rules in v25/v49.css would restyle it). Without the pinned stage (narrow, short or reduced motion) it is a stacked list. ============
export default function WhyChoose() {
  return (
    <>
      <Stylesheet href="/css/story.css" />
      <div className="cmp__pin">
        {/* holds the scene and the scroll spacer ./story.js adds after it, so the sticky section lets go when its run ends */}
        <section className="cmp" id="story" aria-labelledby="storyH">
          <div className="cmp__stage">
            <div className="cmp__card" aria-hidden="true">
              <img src="/assets/img/photos/why-1-track-record.webp" alt="" width="1536" height="1024" decoding="async" style={{ objectPosition: "50% 55%" }} />
            </div>
            <p className="cmp__big" aria-hidden="true">
              <span className="cmp__l">Why choose</span>
              <span className="cmp__r">us?</span>
            </p>
            <div className="cmp__ov">
              <header className="cmp__hd">
                <SectionLabel>Your UPSC partner · Since 1976</SectionLabel>
                <h2 id="storyH" className="cmp__h2 rv" style={{ "--d": ".12s" }}>
                  <span className="cmp__en">Why Vajiram & Ravi?</span>
                  {" "}
                  <span className="cmp__h">{"Fifty years of teaching "}<em>the civil services examination</em>, built around what the UPSC actually asks.</span>
                </h2>
              </header>
              <div className="cmp__track">
                <article className="cmp__p" aria-labelledby="storyT0">
                  <figure className="cmp__ph">
                    <img src="/assets/img/photos/why-1-track-record.webp" alt="The Vajiram & Ravi building, seen from its front gate" width="1536" height="1024" loading="lazy" decoding="async" style={{ objectPosition: "50% 55%" }} />
                  </figure>
                  <div className="cmp__tx">
                    <p className="cmp__no" aria-hidden="true">01<small>/06</small></p>
                    <p className="cmp__lab">AIR 1 · every result since 2016</p>
                    <h3 className="cmp__t" id="storyT0">
                      <span>A proven track record</span>
                      <i aria-hidden="true" />
                    </h3>
                    <p className="cmp__d">AIR 1 in every UPSC result since 2016, and all ten of the top ten ranks in CSE 2025 prepared with us. Founded in 1976 by Prof. P. Velayutham.</p>
                    <a className="cmp__cta" href="#toppers">Meet the toppers<span className="cmp__cta-ic" aria-hidden="true">
                      <StraightArrow />
                    </span></a>
                  </div>
                </article>
                <article className="cmp__p" aria-labelledby="storyT1">
                  <figure className="cmp__ph">
                    <img src="/assets/img/photos/why-2-faculty.webp" alt="A Vajiram & Ravi professor teaching a General Studies class" width="1536" height="1024" loading="lazy" decoding="async" style={{ objectPosition: "50% 30%" }} />
                  </figure>
                  <div className="cmp__tx">
                    <p className="cmp__no" aria-hidden="true">02<small>/06</small></p>
                    <p className="cmp__lab">The teaching</p>
                    <h3 className="cmp__t" id="storyT1">
                      <span>Expert faculty</span>
                      <i aria-hidden="true" />
                    </h3>
                    <p className="cmp__d">Expert faculty for every GS paper, the optionals and the essay: an academic tradition shaped by educators and subject specialists.</p>
                    <a className="cmp__cta" href="#faculty">Meet our educators<span className="cmp__cta-ic" aria-hidden="true">
                      <StraightArrow />
                    </span></a>
                  </div>
                </article>
                <article className="cmp__p" aria-labelledby="storyT2">
                  <figure className="cmp__ph">
                    <img src="/assets/img/photos/why-3-guidance.webp" alt="A mentor going through a study plan with an aspirant" width="1536" height="1024" loading="lazy" decoding="async" style={{ objectPosition: "45% 40%" }} />
                  </figure>
                  <div className="cmp__tx">
                    <p className="cmp__no" aria-hidden="true">03<small>/06</small></p>
                    <p className="cmp__lab">Your plan</p>
                    <h3 className="cmp__t" id="storyT2">
                      <span>Personal guidance</span>
                      <i aria-hidden="true" />
                    </h3>
                    <p className="cmp__d">A plan shaped around your strengths and gaps, with a mentor who keeps it on track from Foundation to Interview.</p>
                    <a className="cmp__cta" href="#contact">Let’s talk<span className="cmp__cta-ic" aria-hidden="true">
                      <StraightArrow />
                    </span></a>
                  </div>
                </article>
                <article className="cmp__p" aria-labelledby="storyT3">
                  <figure className="cmp__ph">
                    <img src="/assets/img/photos/why-4-study-material.webp" alt="Vajiram & Ravi study material, test series sheets and notes on a desk" width="1536" height="1024" loading="lazy" decoding="async" style={{ objectPosition: "50% 50%" }} />
                  </figure>
                  <div className="cmp__tx">
                    <p className="cmp__no" aria-hidden="true">04<small>/06</small></p>
                    <p className="cmp__lab">Study material</p>
                    <h3 className="cmp__t" id="storyT3">
                      <span>Complete study material</span>
                      <i aria-hidden="true" />
                    </h3>
                    <p className="cmp__d">Notes, test series and interview preparation in one place. 59 questions in Prelims 2025 came from our test series.</p>
                    <a className="cmp__cta" href="#resources">Explore study materials<span className="cmp__cta-ic" aria-hidden="true">
                      <StraightArrow />
                    </span></a>
                  </div>
                </article>
                <article className="cmp__p" aria-labelledby="storyT4">
                  <figure className="cmp__ph">
                    <img src="/assets/img/photos/why-5-location.webp" alt="Aspirants walking to the Vajiram & Ravi gate in Old Rajinder Nagar" width="1286" height="1024" loading="lazy" decoding="async" style={{ objectPosition: "55% 50%" }} />
                  </figure>
                  <div className="cmp__tx">
                    <p className="cmp__no" aria-hidden="true">05<small>/06</small></p>
                    <p className="cmp__lab">Old Rajinder Nagar</p>
                    <h3 className="cmp__t" id="storyT4">
                      <span>A prime location</span>
                      <i aria-hidden="true" />
                    </h3>
                    <p className="cmp__d">Over 50 years in Old Rajinder Nagar, New Delhi, at Gate 5 of Karol Bagh Metro.</p>
                    <a className="cmp__cta" href="#visit">Visit the campus<span className="cmp__cta-ic" aria-hidden="true">
                      <StraightArrow />
                    </span></a>
                  </div>
                </article>
                <article className="cmp__p" aria-labelledby="storyT5">
                  <figure className="cmp__ph">
                    <img src="/assets/img/photos/why-6-classroom-online.webp" alt="A Vajiram & Ravi classroom with the lecture streaming live to online students" width="1536" height="1024" loading="lazy" decoding="async" style={{ objectPosition: "50% 40%" }} />
                  </figure>
                  <div className="cmp__tx">
                    <p className="cmp__no" aria-hidden="true">06<small>/06</small></p>
                    <p className="cmp__lab">Classroom + LIVE-Online</p>
                    <h3 className="cmp__t" id="storyT5">
                      <span>Learn the way that suits you</span>
                      <i aria-hidden="true" />
                    </h3>
                    <p className="cmp__d">12 UPSC CSE programmes in the classroom and LIVE-Online, with the same teachers and the same tests.</p>
                    <a className="cmp__cta" href="#courses">Find your programme<span className="cmp__cta-ic" aria-hidden="true">
                      <StraightArrow />
                    </span></a>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
