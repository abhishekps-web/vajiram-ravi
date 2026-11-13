import Stylesheet from '@/components/ui/Stylesheet';
import ToppersSpread from './ToppersSpread/ToppersSpread';
// ============ TOPPERS: "Behind every rank is a different journey". The banner is static; the rank holders are the <ToppersSpread /> magazine spread (./ToppersSpread, data in its data.js). Styles: public/css/toppers.css (banner) and public/css/toppers-spread.css (spread). ============
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
            <p className="gz__deck rv" style={{ "--d": ".28s" }} id="gzDeck">The UPSC CSE 2025 top-ten rank holders were associated with Vajiram &amp; Ravi through different programmes, from General Studies preparation and test series to interview guidance.</p>
          </div>
          <ToppersSpread />
        </div>
      </section>
    </>
  );
}
