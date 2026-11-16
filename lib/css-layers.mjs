// The base stylesheets in public/css, in cascade order (order matters: later files override earlier ones). buttons.css comes first,
// so placement rules in the layers after it always win. Used by app/layout.jsx (one <link> each in development, for live CSS reload)
// and by scripts/build-css.mjs, which joins them into public/css/base.bundle.css for production (one render-blocking request
// instead of ten; performance audit 2026-11-16). A new layer goes here.
export const BASE_CSS = ['buttons', 'v25', 'v26', 'v27', 'v28', 'v43', 'v45', 'v46', 'v48', 'v49'];
