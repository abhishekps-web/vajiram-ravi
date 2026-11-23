import Stylesheet from '@/components/ui/Stylesheet';
import ProgressBar from '@/components/ui/ProgressBar/ProgressBar';
// brand intro: Vajiram & Ravi reveal on orange (public/css/intro.css), run by the inline boot script ./boot.js from the first
// paint; every load, or once per session (INTRO_ONCE_PER_SESSION, lib/config.js); never under reduced motion.
// Rendered on the server so the overlay is in the first paint; intro.css shows it only while html.vrv-lock is set,
// which the boot script adds before paint (so without JS it never covers the page). No skip button (user 2026-11-16):
// Esc or a scroll still ends it early.
export default function Intro() {
  return (
    <>
      <Stylesheet href="/css/intro.css" />
      <div className="vrv" role="dialog" aria-modal="true" aria-label="Vajiram & Ravi">
        <div className="vrv__fin">
          <span className="vrv__ring" aria-hidden="true" />
          <div className="vrv__logo" role="img" aria-label="Vajiram & Ravi, Institute for IAS Examination">
            <img className="lc" src="/assets/img/brand/logo-966.webp" alt="" width="966" height="227" />
            <img className="lw" src="/assets/img/brand/logo-966.webp" alt="" width="966" height="227" />
          </div>
          <p className="vrv__tag"><span>Understanding India.</span>{' '}<span>Shaping its Future.</span></p>
        </div>
        <ProgressBar className="vrv__bar" duration="2.3s" />
        <span className="vrv__edge" aria-hidden="true" />
      </div>
    </>
  );
}
