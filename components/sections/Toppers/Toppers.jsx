import Stylesheet from '@/components/ui/Stylesheet';
import ToppersSpread from './ToppersSpread/ToppersSpread';
// ============ TOPPERS: "Toppers from Vajiram & Ravi". The banner is static; the rank holders are the <ToppersSpread /> magazine spread (./ToppersSpread, data in its data.js). Styles: public/css/toppers.css (banner) and public/css/toppers-spread.css (spread). ============
export default function Toppers() {
  return (
    <>
      <Stylesheet href="/css/toppers.css" />
      <section className="gz" id="toppers" aria-labelledby="gzHl">
        <div className="gz__sheet">
          <p className="gz__date rv" style={{ "--d": ".1s" }}>
            <span className="gz__ed">CSE 2025</span>
          </p>
          <div className="gz__banner">
            <h2 className="gz__hl rv" style={{ "--d": ".2s" }} id="gzHl">{"Toppers from "}<em>Vajiram &amp; Ravi</em></h2>
          </div>
          <ToppersSpread />
        </div>
      </section>
    </>
  );
}
