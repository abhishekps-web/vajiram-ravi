// Every behaviour on the page, in the order it runs. Each section keeps its own logic next to its component
// (components/sections/<Section>/*.js); this list is the one place that decides the order, which matters:
// e.g. the GS book hover binds before Programmes renders its books, custom-select defines window.enhanceSelect before
// the contact form uses it, page-motion enhances the "Let's talk" label before lang-switch translates it, and Lenis
// must exist before scroll.js starts. Loaded in the browser only, after hydration (components/layout/SiteBehaviour.jsx).
import '@/lib/vendor/lenis.min.js';   // defines globalThis.Lenis (used by lib/motion/scroll.js)

import initIntro from '@/components/layout/Intro/intro';
import initCustomSelect from '@/components/ui/custom-select';
import { initNavMenus, initNavScrolled, initNavMore, initLangSwitch } from '@/components/layout/NavigationBar';
import { initHeroCarousel } from '@/components/sections/Hero/HeroBanner';
import { initHeroStats } from '@/components/sections/Hero/HeroIntro';
import { initCourseCatalog } from '@/components/dialogs/course-catalog';
import { initStories } from '@/components/sections/Stories';
import { initBatchTickets } from '@/components/sections/Batches';
import { initResourceLinks, initResourceCards, initResourceFloat, initResourceDots } from '@/components/sections/Resources';
import { initWhyDots } from '@/components/sections/WhyChoose';
import { initTalkToUs } from '@/components/sections/TalkToUs';
import initRails from '@/components/ui/rail';
import initRise from '@/lib/motion/rise';
import initWordFill from '@/lib/motion/word-fill';
import initHeroKit from '@/lib/motion/hero-kit';
import initScroll from '@/lib/motion/scroll';
import initPageMotion from '@/lib/motion/page-motion';
import { initLifeGallery } from '@/components/sections/LifeGallery';
import initAccordion from '@/components/ui/accordion';
import { initStars, initDiamondReel, initToppersRecord } from '@/components/sections/Toppers';
import { initFooterCurtain } from '@/components/layout/Footer';
import initOffscreenPause from '@/lib/motion/offscreen-pause';

const SEQUENCE = [
  initIntro,            // logo intro overlay
  initCustomSelect,     // window.enhanceSelect
  // the data-driven sections and their interactions
  initNavMenus, initNavMore, initHeroStats, initCourseCatalog,
  initStories, initBatchTickets, initResourceLinks, initResourceCards, initResourceFloat, initResourceDots, initWhyDots,
  initTalkToUs, initWordFill, initNavScrolled, initRails, initRise,
  // motion and the remaining section behaviours
  initHeroKit, initScroll, initHeroCarousel, initPageMotion, initStars, initDiamondReel, initToppersRecord, initLifeGallery, initAccordion,
  initFooterCurtain, initLangSwitch,
  initOffscreenPause,   // last: pauses the CSS animations of sections that are off screen (every section exists by now)
];

// Off the homepage (the course pages, app/courses/[slug], and the 404) only the site-wide behaviours run, in the same order:
// the header, footer, intro, scrolling and reveals, and the language switch. The rest work on the homepage's sections.
const SITE_WIDE = new Set([initIntro, initCustomSelect, initNavMenus, initNavMore, initWordFill, initNavScrolled, initRise,
  initScroll, initFooterCurtain, initLangSwitch, initOffscreenPause]);

// Yield to the browser between behaviours (performance audit 2026-11-16): run back to back they made one task of about a second on
// a mid-range phone, blocking input. The order is unchanged; once a batch has run for SLICE ms the loop lets the browser handle input
// and paint, then carries on with the next behaviour.
const SLICE = 40;
const yieldToMain = () => (globalThis.scheduler?.yield ? globalThis.scheduler.yield() : new Promise(r => setTimeout(r, 0)));

let started = false;
export async function start() {
  if (started) return;   // React Strict Mode runs effects twice in development
  started = true;
  const home = !!document.getElementById('dlPin');
  let t0 = performance.now();
  for (const init of home ? SEQUENCE : SEQUENCE.filter(f => SITE_WIDE.has(f))) {
    if (performance.now() - t0 > SLICE) { await yieldToMain(); t0 = performance.now(); }
    // one failing behaviour must not stop the rest (each used to be its own <script>)
    try { init(); } catch (e) { console.error(`[site] ${init.name} failed`, e); }
  }
  // off the homepage, the header's, drawer's and footer's in-page links (#toppers …) lead back to those sections on the homepage
  if (!home) document.querySelectorAll('a[href^="#"]').forEach(a => { const h = a.getAttribute('href'); if (h.length > 1) a.setAttribute('href', '/' + h); });
}
