import Button from '@/components/ui/Button/Button';
import Stylesheet from '@/components/ui/Stylesheet';
// brand intro: Vajiram & Ravi reveal on orange, plays on every load (public/css/intro.css, driven by ./intro.js).
// Rendered on the server so the overlay is in the first paint; intro.css shows it only while html.vrv-lock is set,
// which the inline script in app/layout.jsx adds before paint (so without JS it never covers the page).
export default function Intro() {
  return (
    <>
      <Stylesheet href="/css/intro.css" />
      <div className="vrv" role="dialog" aria-modal="true" aria-label="Vajiram & Ravi">
        <div className="vrv__fin">
          <span className="vrv__ring" aria-hidden="true" />
          <div className="vrv__logo" role="img" aria-label="Vajiram & Ravi, Institute for IAS Examination">
            <img className="lc" src="/assets/img/brand/logo.png" alt="" width="966" height="227" />
            <img className="lw" src="/assets/img/brand/logo.png" alt="" width="966" height="227" />
          </div>
          <p className="vrv__tag"><span>Understanding India.</span>{' '}<span>Shaping its Future.</span></p>
        </div>
        <span className="vrv__bar" aria-hidden="true" />
        <span className="vrv__edge" aria-hidden="true" />
        <Button variant="outline" onDark size="xs" className="vrv__skip">Skip intro</Button>
      </div>
    </>
  );
}
