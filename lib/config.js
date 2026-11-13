// Site-wide configuration: switches read at build time by the layout and components.

/**
 * The preloader: the brand intro that plays on every load (the orange Vajiram & Ravi reveal, components/layout/Intro).
 * true:  it plays, and holds scrolling until it lifts (about 2.5s, or Skip / Esc / scroll).
 * false: the page opens straight on the site: no overlay is rendered and scrolling is never held.
 */
export const ENABLE_PRELOADER = true;
