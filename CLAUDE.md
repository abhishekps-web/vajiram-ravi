# Vajiram & Ravi site

Next.js (App Router) site, deployed to Vercel from `main`. The page at `/`, statically prerendered, plus one course detail page
per programme at `/courses/<slug>` (`app/courses/[slug]/page.tsx`, built from `lib/data/programmes.ts`; a placeholder
until the course content is ready, user 2026-11-13). "View course" on a Programmes book links there (shown at a fixed place on a hovered book, no cursor follow, user 2026-11-20). Off the homepage only the
site-wide behaviours run (`SITE_WIDE` in `lib/behaviour.js`) and in-page links are rewritten to `/#…`. Every homepage section is
one file in `components/sections/home/` holding its markup and behaviour (its data in `lib/data/`); `app/page.jsx` only composes them.

`npm run build` must pass before pushing.

## Project layout

- `app/page.jsx` only composes the section components, in page order; `app/layout.jsx` holds `<head>`, fonts, the stylesheets (`CSS_LAYERS`), the pre-paint boot script, `<Preloader/>` and `<SiteBehaviour/>`.
- `components/`: `layout/` (site chrome), `sections/` (`sections/home/`: every homepage section, one lowercase kebab-case file each, no per-section folders, e.g. `hero-banner.jsx`, `toppers-reel.jsx`, user 2026-11-26; the other pages' sections, `CourseFinder.jsx`, beside it), `ui/` (shared pieces, kebab-case files, user 2026-11-26). Per-component and per-section decisions are in `components/CLAUDE.md`.
- `lib/behaviour.js` is THE ORDER every behaviour runs in (the order matters; see the comment at its top). `lib/site.js` the shared helpers and constants, `lib/data/` all content, `lib/motion/` site-wide motion.
- `public/css/` the stylesheets (see "Styles"), `public/assets/img/` by purpose. `.claude/skills/site-motion/` the motion rules and the headless-Chrome check script.

## How a section is put together

- **Markup**: `<Section>.jsx` is a static server component. Shared markup comes from `components/ui` (`SectionLabel`, `ArrowIcon`, `Dialog`) — reuse those rather than copying markup.
- **Content** (user 2026-11-25, "all data files move to a data file"): every list and piece of copy lives in `lib/data/`, one file per section (`hero.js`, `toppers.js`, `batches.js`, `faculty.ts`, `programmes.ts`, `videos.js`, `faq.js`, `footer.js`, `navigation.js`, `course-finder.js` + `.json`, `courses.js` …); components only import from there. Editing content means editing `lib/data/` only. Class strings, icons (JSX) and motion constants stay in the components.
- **Behaviour**: the section's `*.js` modules export `init…()` functions that work on the server-rendered DOM (they build lists, bind events, animate). Register a new one in `lib/behaviour.js` at the right point in the sequence. They run once, in the browser, after hydration; React never re-renders those nodes, so they may change them freely.
- **Buttons**: every button and button-styled link is `<Button>` (`components/ui/button.tsx`) or, in a behaviour, `buttonHTML()` (same file); its look lives only in `public/css/buttons.css`. `shadow={false}` (`buttonHTML({ shadow: false })`) turns the drop shadow off (`.btn--flat`; the header's "Let's talk" uses it). Pick a variant/size, never restyle: section rules may only place a button (margin, position, display) or override its `--btn-*` tokens.
- **Never change the DOM before hydration** (a script that does breaks it: render that markup in a component instead and have the behaviour find it).
- JSX from HTML: `className`, `style={{ "--d": ".1s" }}`, `htmlFor`, `tabIndex`; keep meaningful spaces between inline elements as `{" "}`.

## Styles

- The stylesheets are plain files in `public/css`, **not imported through the bundler**: Next's CSS minifier rewrites `transform: none; translate: …; scale: …` into one `transform`, which breaks reveals that animate `translate`/`scale` separately (it froze the Resources cards mid-rise). Keep it that way.
- `app/layout.jsx` links `buttons.css` (the button system, first so placement rules after it win) and then the layers v25 → v26 → … → v49 (`CSS_LAYERS`, precedence "base"), each its own `<link>` in cascade order (order matters; they keep their names). No `@import` between them: the old chain held first paint about 3s on phones. A new layer goes into `CSS_LAYERS`. A section with its own sheet declares it with `<Stylesheet href="/css/…" />` (precedence "sections", hoisted after the base).
- Production CSS (performance audit 2026-11-16): `scripts/build-css.mjs` (npm `prebuild`) joins the base layers (`BASE_CSS`) and the homepage's section sheets (`SECTION_CSS`, in their hoisted order) into one `public/css/base.bundle.css` (gitignored), and `<Stylesheet>` renders nothing for a bundled sheet. A new section sheet the homepage loads goes into `SECTION_CSS` (`lib/css-layers.mjs`) at its place in page order. Development still links each file (live reload). Next inlines its own bundler CSS (the Tailwind sheets) into the HTML (`experimental.inlineCss`, `next.config.mjs`).
- Asset URLs in CSS are root-relative (`url(/assets/img/…)`); in JSX `/assets/img/…`; in behaviour modules `assets/img/…` (the page is at `/`).
- Live CSS in development: `components/layout/DevCssReload.jsx` (rendered by `app/layout.jsx` only when `NODE_ENV` is development) checks the `/css/` sheets about once a second and swaps in an edited one without a page reload. Behaviour modules (`*.js` that build or bind the DOM) still need a refresh: they run once after hydration.

## Every section: apply the `section-wrapper` skill

By default, for every new or ported section and any change to a section's outer markup or spacing, use the `section-wrapper` skill (`.claude/skills/section-wrapper/SKILL.md`, user 2026-11-25): the section's outer element is `<SectionWrapper>` (`components/ui/section-wrapper.jsx`) with `id`, `labelledBy` and a size prop (`compact`, `tight`, `half`, `noBottom`, `bleed`), never a hand-written `<section>` with its own padding.

## Every change: apply the `site-motion` skill

The client wants **every section and every element animated**. For any change to `app/`, `components/`, `lib/` or `public/css/`, use the `site-motion` skill (`.claude/skills/site-motion/SKILL.md`): give new or changed sections an entrance, elements a reveal, interactive elements a hover/focus state, using the site's existing primitives and motion tokens. Then, with `npm run dev` running, run its check (`node .claude/skills/site-motion/scripts/motion-check.js "<section selector>" --hover "<card selector>"`) and report what was verified.

## Design tokens that must stay consistent

- Section titles: `--h2` (60px on desktop, user 2026-11-26, was 64px; 40px on phones) for every section heading.
- Section rhythm (audited 2026-11-13, "Vertical rhythm, standardised" at the end of `public/css/v49.css`): `--sec-y` (64-90px)
  above and below every section, half on top for a light section that follows another light one (Faculty, FAQ, closing);
  eyebrow -> heading `--hd-lbl` (16px everywhere, user 2026-11-25; was 24px), heading -> intro `--hd-in` (16px), heading block -> content `--hd-gap` (12px everywhere, user 2026-11-25; was 36-48px). The
  Tailwind sections use the same variables (`pt-[var(--sec-y)]`, `mt-[var(--hd-gap)]`). Do not give a section its own padding.
- Eyebrows: the `SectionLabel` component (`components/ui/section-label.tsx`): brand orange everywhere; the dark brown #2B1206 only on the Toppers and Talk to us eyebrows (`tone="dark"`) and the selected tab of the Toppers years and Life at Vajiram & Ravi (user 2026-11-25).
- `--f` is the font-family variable. Never reuse that name for a scroll progress value (an earlier `--f` clash broke every font in Programmes).

## Working notes

- Client direction: `WEBSITE-DIRECTION-2026-11-11.md` (root) holds the 11 Nov 2026 direction session with the client (the
  agreed section order, a short page, two-row courses, about 10 toppers, a cylinder faculty carousel, no zoom/scroll effects in
  Why choose us, a PageSpeed target of 90 to 95, mobile first, the review workflow), plus the full transcript; the original
  .docx is next to it. Read its "For the build" list before changing the page's structure. Where the user's later
  instructions differ (e.g. a section order dated after 11 Nov), the user's instruction wins.
- Scrollbars (user 2026-11-21): on mouse screens the page's native bar is hidden and page-motion.js draws an overlay thumb (`.vr-sb`, no
  gutter, draggable, auto-hiding); the page's webkit rules (end of `v49.css`) and the Toppers record list's (end of `podium.css`) are custom: a slim
  rounded brand-orange thumb, no track, auto-hiding (shown while scrolling or over the list; `.is-scrolling` from page-motion.js, which
  also forces Chrome to repaint the bar when it flips).
- Global config: `lib/config.js` (`ENABLE_PRELOADER`: the logo intro on or off; `INTRO_ONCE_PER_SESSION`: every load, or only the
  first page of a session). Its mandala ring is capped at 88% of the screen height (user 2026-11-21). The intro runs from the inline boot script (`preloaderBoot()` in `components/layout/Preloader.jsx`, one file with the overlay and its behaviour) from the first paint,
  never waiting for hydration, and never under reduced motion.
- Content column: 1440px, centred on wider screens (`--cap` / `--px`, end of `public/css/v49.css`); section backgrounds stay full-bleed.
  Hero height (user 2026-11-13): every first screen ends with a preview of Programmes (its sheet top and eyebrow label): the hero
  is the screen minus the header and `--hero-peek` (176px), never less than `--hero-min` (its copy, CTA and slide indicators) and,
  from 1280px wide, never more than `--hero-fit` (the content-fit height). End of `public/css/v49.css`. No scroll-down cue in the hero.
- One ground for the header, the hero frame and Programmes: `--ground-jaali` (v49.css).
- Best IAS Coaching in Delhi (`#about`, `BestCoaching/`) was removed from the page (user 2026-11-21); the folder is unused.
- `public/css/why-choose.css` and `public/js/why-choose.js` are leftovers the page does not load (they were not loaded before the Next.js conversion either).
