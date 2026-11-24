// The base stylesheets in public/css, in cascade order (order matters: later files override earlier ones). buttons.css comes first,
// so placement rules in the layers after it always win. Used by app/layout.jsx (one <link> each in development, for live CSS reload)
// and by scripts/build-css.mjs, which joins them into public/css/base.bundle.css for production (performance audit 2026-11-16).
// A new layer goes here.
export const BASE_CSS = ['buttons', 'tabs', 'progress-bar', 'v25', 'v26', 'v27', 'v28', 'v43', 'v45', 'v46', 'v48', 'v49'];

// The section sheets (components/ui/Stylesheet.jsx) that production also folds into base.bundle.css, after the base layers, in the
// order React hoisted them on the homepage (the cascade they had as separate <link>s). In production <Stylesheet> renders nothing
// for these, so the page has one render-blocking stylesheet instead of twelve (Lighthouse "Render-blocking requests", 2026-11-16).
// A section sheet not listed here (batch-strips, toppers-spread) is still linked on its own. A new section sheet
// that the homepage loads goes here, at its place in the page order.
export const SECTION_CSS = ['hero-banner', 'podium',
  'resources'];
