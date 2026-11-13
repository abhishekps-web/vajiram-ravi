// ============ CLOSING CTA (Figma 2088:3749): orange gradient card, orange glow + line lotus rising from the bottom; styles/v49.css .cl ============
export default function Closing() {
  return (
    <section className="cl" id="closing" aria-labelledby="clH">
      <div className="cl__card">
        <img className="cl__glow cl__glow--a" src="/assets/img/patterns/cta-glow-1.svg" alt="" width="1240" height="840" aria-hidden="true" />
        <img className="cl__glow cl__glow--b" src="/assets/img/patterns/cta-glow-2.svg" alt="" width="820" height="600" aria-hidden="true" />
        <img className="cl__lotus" src="/assets/img/brand/lotus-line.svg" alt="" width="560" height="560" aria-hidden="true" />
        <span className="cl__spot" aria-hidden="true" />
        <figure className="cl__tp cl__tp--l rv" style={{ "--d": ".2s" }}>
          <img src="/assets/img/toppers/cta/air1-anuj-agnihotri.webp" alt="Anuj Agnihotri, All India Rank 1, UPSC CSE 2025" width="1200" height="1200" loading="lazy" decoding="async" />
          <figcaption className="cl__tp-cap">
            <b>AIR 1</b>
            <span>Anuj Agnihotri</span>
          </figcaption>
        </figure>
        <figure className="cl__tp cl__tp--r rv" style={{ "--d": ".3s" }}>
          <img src="/assets/img/toppers/cta/air2-rajeshwari-suve-m.webp" alt="Rajeshwari Suve M, All India Rank 2, UPSC CSE 2025" width="1200" height="1200" loading="lazy" decoding="async" />
          <figcaption className="cl__tp-cap">
            <b>AIR 2</b>
            <span>Rajeshwari Suve M</span>
          </figcaption>
        </figure>
        <div className="cl__copy">
          <p className="cl__proof rv" style={{ "--d": ".05s" }}><span className="cl__faces" aria-hidden="true">
            <img src="/assets/img/toppers/cta/ranker-1.png" alt="" width="32" height="32" loading="lazy" />
            <img src="/assets/img/toppers/cta/ranker-2.png" alt="" width="32" height="32" loading="lazy" />
            <img src="/assets/img/toppers/cta/ranker-3.png" alt="" width="32" height="32" loading="lazy" />
            <img src="/assets/img/toppers/cta/ranker-4.png" alt="" width="32" height="32" loading="lazy" />
            <img src="/assets/img/toppers/cta/ranker-5.png" alt="" width="32" height="32" loading="lazy" />
          </span>36/50 CSE 2025 rankers from V&R</p>
          <h2 id="clH" className="h2 cl__h rv" style={{ "--d": ".12s" }}>Ready to start your UPSC preparation?</h2>
          <p className="cl__p rv" style={{ "--d": ".2s" }}>Find the programme that fits your stage, or talk to a counsellor who will help you choose. No pressure to enrol.</p>
          <p className="cl__btns rv" style={{ "--d": ".28s" }}>
            <a className="bt bt--ink" href="#courses">Find your course<span className="sq">
              <img src="/assets/img/icons/arrow-ur-white.svg" alt="" width="14" height="14" />
            </span></a>
            <a className="bt bt--line" href="#contact">Talk to a counsellor</a>
          </p>
          <p className="cl__call rv" style={{ "--d": ".36s" }}>{"Prefer to call? "}<a href="tel:+918062206330">080-6220-6330</a>{" · Mon – Sat, 9 AM – 7 PM"}</p>
        </div>
      </div>
    </section>
  );
}
