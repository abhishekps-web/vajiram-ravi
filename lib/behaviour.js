// Every behaviour on the page, in the order it runs. Each section keeps its own logic next to its component
// (components/sections/<Section>/*.js); this list is the one place that decides the order, which matters:
// e.g. the GS book hover binds before Programmes renders its books, custom-select defines window.enhanceSelect before
// the contact form uses it, page-motion enhances the "Let's talk" label before lang-switch translates it, and Lenis
// must exist before scroll.js starts. Loaded in the browser only, after hydration (components/layout/SiteBehaviour.jsx).
import '@/lib/vendor/lenis.min.js';   // defines globalThis.Lenis (used by lib/motion/scroll.js)

import initIntro from '@/components/layout/Intro/intro';
import initCustomSelect from '@/components/ui/custom-select';
import { initNavMenus, initNavScrolled, initNavMore } from '@/components/layout/NavigationBar/nav-menus';
import { initHeroNames } from '@/components/sections/Hero/hero-names';
import { initGsBooks, initGsCount } from '@/components/sections/GeneralStudies/gs';
import { initCourseCatalog } from '@/components/dialogs/course-catalog';
import { initStories } from '@/components/sections/Stories/stories';
import { initBatchTickets, initBatchDialog } from '@/components/sections/Batches/batches';
import { renderFaq } from '@/components/sections/Faq/faq';
import { initResourceLinks } from '@/components/sections/Resources/resource-links';
import { initContactForm } from '@/components/sections/Contact/contact-form';
import { renderFooter } from '@/components/layout/Footer/footer-menu';
import initRails from '@/components/ui/rail';
import initRise from '@/lib/motion/rise';
import initWordFill from '@/lib/motion/word-fill';
import initHeroKit from '@/lib/motion/hero-kit';
import initScroll from '@/lib/motion/scroll';
import initPageMotion from '@/lib/motion/page-motion';
import initVisitMap from '@/components/sections/Visit/visit-map';
import initVisitGallery from '@/components/sections/Visit/visit-gallery';
import initStory from '@/components/sections/WhyChoose/story';
import initAccordion from '@/components/ui/accordion';
import initFooterCurtain from '@/components/layout/Footer/footer-curtain';
import initFooterWord from '@/components/layout/Footer/footer-word';
import initLangSwitch from '@/components/layout/NavigationBar/lang-switch';

const SEQUENCE = [
  initIntro,            // logo intro overlay
  initCustomSelect,     // window.enhanceSelect
  // the data-driven sections and their interactions
  initNavMenus, initNavMore, initHeroNames, initGsBooks, initCourseCatalog,
  initGsCount, initStories, initBatchTickets, initBatchDialog, renderFaq, initResourceLinks,
  initContactForm, renderFooter, initWordFill, initNavScrolled, initRails, initRise,
  // motion and the remaining section behaviours
  initHeroKit, initScroll, initPageMotion, initVisitMap, initVisitGallery, initStory, initAccordion,
  initFooterCurtain, initFooterWord, initLangSwitch,
];

// Off the homepage (the course pages, app/courses/[slug], and the 404) only the site-wide behaviours run, in the same order:
// the header, footer, intro, scrolling and reveals, and the language switch. The rest work on the homepage's sections.
const SITE_WIDE = new Set([initIntro, initCustomSelect, initNavMenus, initNavMore, renderFooter, initWordFill, initNavScrolled, initRise,
  initScroll, initFooterCurtain, initFooterWord, initLangSwitch]);

let started = false;
export function start() {
  if (started) return;   // React Strict Mode runs effects twice in development
  started = true;
  const home = !!document.getElementById('dlPin');
  for (const init of home ? SEQUENCE : SEQUENCE.filter(f => SITE_WIDE.has(f))) {
    // one failing behaviour must not stop the rest (each used to be its own <script>)
    try { init(); } catch (e) { console.error(`[site] ${init.name} failed`, e); }
  }
  // off the homepage, the header's, drawer's and footer's in-page links (#toppers …) lead back to those sections on the homepage
  if (!home) document.querySelectorAll('a[href^="#"]').forEach(a => { const h = a.getAttribute('href'); if (h.length > 1) a.setAttribute('href', '/' + h); });
}
