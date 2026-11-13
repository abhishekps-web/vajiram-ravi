import Button from '@/components/ui/Button/Button';
import Stylesheet from '@/components/ui/Stylesheet';
// ============ TOPPERS: a results-special newspaper front page (masthead removed 2026-11-11) (layout after vajiram-ravi-homepage.vercel.app #results). Static shell only: every topper, story, seal, fact and filter count is written by ./toppers.js from ./data/toppers-archive.js (plus programme names from ./data/toppers.js where the archive has none). Styles: public/css/toppers.css. ============
export default function Toppers() {
  return (
    <>
      <Stylesheet href="/css/toppers.css" />
      <section className="gz" id="toppers" aria-labelledby="gzHl">
        <div className="gz__sheet">
          <p className="gz__date rv" style={{ "--d": ".1s" }}>
            <span className="gz__ed">UPSC Civil Services Examination 2025</span>
          </p>
          <div className="gz__banner">
            <h2 className="gz__hl rv" style={{ "--d": ".2s" }} id="gzHl">{"Behind every rank is "}<em>a different journey</em></h2>
            <p className="gz__deck rv" style={{ "--d": ".28s" }} id="gzDeck" />
          </div>
          <div className="gz__front">
            <div className="gz__body rv" style={{ "--d": ".1s" }} id="gzLead">
              <figure className="gz__fig">
                <span className="gz__frame">
                  <img id="gzImg" src="/assets/img/toppers/portrait/2025/01-anuj-agnihotri.webp" alt="" width="768" height="768" decoding="async" />
                  <span className="gz__progs" id="gzProgs" />
                </span>
                <span className="gz__seal" id="gzSeal" aria-hidden="true" />
              </figure>
              <div className="gz__story">
                <h3 className="gz__sub" id="gzSub" />
                <div className="gz__cols" id="gzCols" />
              </div>
            </div>
            <section className="gz__roll rv" style={{ "--d": ".05s" }} aria-labelledby="gzRollH">
              <h3 className="sr-only" id="gzRollH">The first ten</h3>
              <p className="gz__ct" id="gzCount" aria-live="polite" />
              <p className="sr-only" id="gzSay" aria-live="polite" />
              <div className="gz__scroll">
                <div className="gz__scrolli" id="gzScroll" data-lenis-prevent="">
                  <ol className="gz__ten" id="gzTen" />
                  <Button variant="outline" size="sm" className="gz__all" id="gzAll" iconEnd="chevron" aria-expanded="false" aria-controls="gzTen" hidden>Show all rank holders</Button>
                </div>
              </div>
            </section>
          </div>
          <div className="gz__foot rv" style={{ "--d": ".05s" }}>
            <div className="gz__more">
              <Button href="https://vajiramandravi.com/ias-selections-from-vajiram/" target="_blank" rel="noopener" iconEnd="arrow">Explore all UPSC results</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
