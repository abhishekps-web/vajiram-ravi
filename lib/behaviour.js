// Every behaviour on the page, in the order it runs. Each section keeps its own logic next to its component
// (components/sections/<Section>/*.js); this list is the one place that decides the order, which matters:
// e.g. the GS book hover binds before Programmes renders its books, custom-select defines window.enhanceSelect before
// the contact form uses it, page-motion enhances the "Let's talk" label before lang-switch translates it, and Lenis
// must exist before scroll.js starts. Loaded in the browser only, after hydration (components/layout/SiteBehaviour.jsx).
import '@/lib/vendor/lenis.min.js';   // defines globalThis.Lenis (used by lib/motion/scroll.js)

import initIntro from '@/components/layout/Intro/intro';
import initToppers from '@/components/sections/Toppers/toppers';
import initCustomSelect from '@/components/ui/custom-select';
import { initNavMenus, initNavScrolled } from '@/components/layout/NavigationBar/nav-menus';
import { initHeroNames } from '@/components/sections/Hero/hero-names';
import { initResultCards } from '@/components/sections/Parked/results-cards';
import { initGsBooks, initGsCount } from '@/components/sections/GeneralStudies/gs';
import { initRanksDialog } from '@/components/dialogs/ranks-dialog';
import { initCourseCatalog } from '@/components/dialogs/course-catalog';
import { initProgrammes } from '@/components/sections/Programmes/programmes';
import { renderFaculty, initFacultyCarousel } from '@/components/sections/Faculty/faculty';
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
  initToppers,          // Toppers gazette, written from its data
  initCustomSelect,     // window.enhanceSelect
  // the data-driven sections and their interactions
  initNavMenus, initHeroNames, initResultCards, initGsBooks, initRanksDialog, initCourseCatalog, initProgrammes,
  initGsCount, renderFaculty, initStories, initBatchTickets, initBatchDialog, renderFaq, initResourceLinks,
  initContactForm, renderFooter, initWordFill, initNavScrolled, initRails, initFacultyCarousel, initRise,
  // motion and the remaining section behaviours
  initHeroKit, initScroll, initPageMotion, initVisitMap, initVisitGallery, initStory, initAccordion,
  initFooterCurtain, initFooterWord, initLangSwitch,
];

let started = false;
export function start() {
  if (started) return;   // React Strict Mode runs effects twice in development
  started = true;
  for (const init of SEQUENCE) {
    // one failing behaviour must not stop the rest (each used to be its own <script>)
    try { init(); } catch (e) { console.error(`[site] ${init.name} failed`, e); }
  }
}
