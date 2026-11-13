// A section's own stylesheet, declared by the component that needs it. React hoists it into <head> (once, however
// often it is rendered), after the site's base stylesheet (precedence "base", app/layout.jsx).
// The sheets are plain files in public/css on purpose: Next's CSS bundler rewrites `transform: none; translate: …; scale: …`
// into a single transform, which breaks the reveals that animate translate/scale on their own.
export default function Stylesheet({ href }) {
  return <link rel="stylesheet" href={href} precedence="sections" />;
}
