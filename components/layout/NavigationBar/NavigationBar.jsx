import Button from '@/components/ui/Button/Button';
import Stylesheet from '@/components/ui/Stylesheet';

// ============ Navigation Bar: the site header ============
// At the top of the page it sits in its own white band above the hero (.nav-band, scrolls away with the page). The nav itself is
// fixed in one place the whole time and always sits on a white bar with 20px corners; nothing about it changes on scroll.
// Behaviour in this folder: nav-menus.js (drawer, mega menus, the .scrolled state), lang-switch.js (EN / हिं), data.js (menu content).
// Styles: public/css/navigation-bar.css (header level) on top of the nav rules in the base cascade.
export default function NavigationBar() {
  return (
    <>
      <Stylesheet href="/css/navigation-bar.css" />
      <div className="nav-band" aria-hidden="true" />
      <header className="nav" id="nav">
        <div className="nav__pill">
          <a className="nav__logo" href="#top" aria-label="Vajiram & Ravi home">
            <img className="lg lg--d" src="/assets/img/brand/logo.png" alt="Vajiram & Ravi, Institute for IAS Examination" width="966" height="227" />
            <img className="lg lg--l" src="/assets/img/brand/logo-light.png" alt="" width="966" height="227" />
          </a>
          <nav className="nav__links" aria-label="Main">
            <div className="explore" id="explore">
              <button className="nav__a" id="exploreBtn" type="button" aria-expanded="false" aria-controls="mega">All courses</button>
              <div className="mega" id="mega" />
            </div>
            <a className="nav__a" href="#toppers">Toppers</a>
            <div className="explore explore--sm" id="studyNav">
              <button className="nav__a" id="studyBtn" type="button" aria-expanded="false" aria-controls="megaSm">Study materials</button>
              <div className="mega mega--sm" id="megaSm" />
            </div>
            <a className="nav__a" href="#gs">UPSC exam</a>
            <a className="nav__a" href="#batches">Upcoming batches</a>
            <a className="nav__a" href="#faq">FAQs</a>
          </nav>
          <button className="nav__burger" id="burger" type="button" aria-label="Menu" aria-expanded="false" aria-controls="drawer">
            <span />
            <span />
          </button>
        </div>
        <div className="nav__end">
          <div className="lang" id="langSw" role="group" aria-label="Language / भाषा">
            <span className="lang__thumb" aria-hidden="true" />
            <button className="lang__b" type="button" data-lang="en" lang="en" aria-pressed="true" title="English">EN</button>
            <button className="lang__b" type="button" data-lang="hi" lang="hi" aria-pressed="false" title="हिन्दी">हिं</button>
          </div>
          <Button className="talk" href="#contact" iconEnd="arrow">Let's talk</Button>
        </div>
      </header>
      <div className="drawer" id="drawer" hidden>
        <a href="#courses">All courses</a>
        <a href="#toppers">Toppers</a>
        <a href="#resources">Study materials</a>
        <a href="#gs">UPSC exam</a>
        <a href="#batches">Upcoming batches</a>
        <a href="#faq">FAQs</a>
        <a href="#contact">Contact us</a>
      </div>
    </>
  );
}
