# Vajiram & Ravi — homepage

A single-page Next.js (App Router) site. Each section is an independent component folder (markup, content data and
behaviour); the page composes them. Deployed to Vercel from `main`.

## Run locally

```
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (static prerender of /)
npm start          # serve the production build
```

## Layout

| Path | What it holds |
|---|---|
| `app/` | `layout.jsx` (head, base stylesheet, intro, behaviour loader) and `page.jsx` (the sections in order). |
| `components/sections/<Section>/` | One folder per section: `<Section>.jsx`, `data.js` for its content, and its behaviour modules. |
| `components/layout/` | Site chrome: `NavigationBar` (the header), `Footer`, `Intro`, `WhatsAppButton`, and `SiteBehaviour` (starts the behaviours after hydration). |
| `components/dialogs/` | The ranks and course-catalogue dialogs. |
| `components/ui/` | Shared pieces: `SectionLabel`, `ArrowIcon`, `Dialog`, `Stylesheet`, the custom select, accordion and rails. |
| `lib/` | `behaviour.js` (the order behaviours run in), `site.js` (helpers), `data/courses.js` (course catalogue), `motion/` (site-wide motion), `vendor/` (Lenis). |
| `public/css/` | The stylesheets, served as-is: `v49.css` `@import`s the earlier layers (`v48` → … → `v25`); `intro.css`, `toppers.css`, `story.css` are section sheets. |
| `public/assets/img/` | `brand/`, `icons/`, `patterns/`, `photos/`, `hero/`, `banners/`, `toppers/` by purpose. |

See `CLAUDE.md` for the conventions (how a section is put together, why the CSS is not bundled, motion rules, tokens).

## Checks

With `npm run dev` running:

```
node .claude/skills/site-motion/scripts/motion-check.js "#story" --hover ".sm__card"
```

Reports console errors, unanimated elements in the section and the hover transform, and writes screenshots.
