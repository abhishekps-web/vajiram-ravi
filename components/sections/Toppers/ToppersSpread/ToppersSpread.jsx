import Button from "@/components/ui/Button/Button";
import Stylesheet from "@/components/ui/Stylesheet";
import { RankMedal } from "./RankMedal";
import { TOPPERS_2025, TOTAL_IN_TOP_50 } from "./data";

// the existing "Explore all UPSC results" destination (there is no /toppers route on this site)
const TOPPERS_PAGE = "https://vajiramandravi.com/ias-selections-from-vajiram/";

function Programmes({ t, show = 1 }) {
  const extra = t.programmes.length - show;
  return (
    <div className="tsp-cap">
      {t.programmes.slice(0, show).join(" · ")}
      {extra > 0 && <span className="tsp-more">+{extra}</span>}
    </div>
  );
}

function Photo({ t, size, lazy }) {
  return (
    <div className="tsp-ph">
      <span className="tsp-ph__im">
        <img src={t.photo} alt={t.name} loading={lazy ? "lazy" : undefined} />
      </span>
      <RankMedal rank={t.rank} size={size} />
    </div>
  );
}

// The "Behind every rank is a different journey" spread: AIR 1-3, then the rest in rows of seven.
// Content: ./data.js. Styles: public/css/toppers-spread.css (needs Newsreader, loaded in app/layout.jsx).
export default function ToppersSpread() {
  const cover = TOPPERS_2025.slice(0, 3);
  const continued = TOPPERS_2025.slice(3, 17); // two rows of seven: AIR 4-10, then the next seven

  return (
    <>
      <Stylesheet href="/css/toppers-spread.css" />
      <div className="tsp rv" style={{ "--d": ".1s" }}>
        {/* AIR 1-3 */}
        <div className="tsp-three">
          {cover.map((t) => (
            <a key={t.rank} href={TOPPERS_PAGE} target="_blank" rel="noopener">
              <Photo t={t} size="l" />
              <h3>{t.name}</h3>
              <Programmes t={t} show={2} />
            </a>
          ))}
        </div>

        {/* AIR 4-10, then the next row */}
        <section className="tsp-ten" aria-labelledby="tsp-ten-h">
          <div className="tsp-hd">
            <span className="tsp-k" id="tsp-ten-h">Toppers, continued</span>
          </div>
          <div className="tsp-strip">
            {continued.map((t) => (
              <a key={t.rank} href={TOPPERS_PAGE} target="_blank" rel="noopener">
                <Photo t={t} size="m" lazy />
                <b>{t.name}</b>
                <Programmes t={t} />
              </a>
            ))}
          </div>
        </section>

        <div className="tsp-ft">
          <q><em>{TOTAL_IN_TOP_50} of the top 50</em> ranks in CSE 2025 prepared with Vajiram &amp; Ravi.</q>
          <Button href={TOPPERS_PAGE} target="_blank" iconEnd="arrow">See all toppers</Button>
        </div>
      </div>
    </>
  );
}
