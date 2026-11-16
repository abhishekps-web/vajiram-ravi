import { SECTION_CSS } from '@/lib/css-layers.mjs';

// In production the homepage's section sheets are part of /css/base.bundle.css (lib/css-layers.mjs, scripts/build-css.mjs).
const BUNDLED = process.env.NODE_ENV === 'development' ? new Set() : new Set(SECTION_CSS.map(n => `/css/${n}.css`));

// A section's own stylesheet, declared by the component that needs it. React hoists it into <head> (once, however
// often it is rendered), after the site's base stylesheet (precedence "base", app/layout.jsx). In production a sheet
// that is already in the bundle renders nothing.
// The sheets are plain files in public/css on purpose: Next's CSS bundler rewrites `transform: none; translate: …; scale: …`
// into a single transform, which breaks the reveals that animate translate/scale on their own.
export default function Stylesheet({ href }) {
  if (BUNDLED.has(href)) return null;
  return <link rel="stylesheet" href={href} precedence="sections" />;
}
