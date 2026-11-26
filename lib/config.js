// Site-wide configuration: switches read at build time by the layout and components.

/**
 * The preloader: the brand intro that plays on every load (the orange Vajiram & Ravi reveal, components/layout/preloader.jsx).
 * true:  it plays from the first paint, and holds scrolling until it lifts (about 2.5s, or Skip / Esc / scroll). Never under
 *        prefers-reduced-motion.
 * false: the page opens straight on the site: no overlay is rendered and scrolling is never held.
 */
export const ENABLE_PRELOADER = true;

/**
` * With the preloader on: false plays it on every page load, reloads included (user 2026-11-11); true (user 2026-11-25) plays it only on the
 * first page of a browser session (sessionStorage), so later pages and reloads open straight on the site. Back to every load: user 2026-11-26.
 */
export const INTRO_ONCE_PER_SESSION = false;
