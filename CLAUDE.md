# Vajiram & Ravi site

Next.js (App Router) site, deployed to Vercel from `main`. One page at `/`, statically prerendered. Every section is its own
component folder holding its markup, data and behaviour; `app/page.jsx` only composes them.

Run: `npm install`, then `npm run dev` (http://localhost:3000). `npm run build` must pass before pushing.

## Project layout

```
app/
  layout.jsx              <html>/<head>: metadata, fonts, the base stylesheet, the pre-paint boot script (html.js + html.vrv-lock),
                          <Intro/> and <SiteBehaviour/>
  page.jsx                the page: the section components in order
components/
  layout/                 site chrome
    NavigationBar/        the site header: NavigationBar.jsx, data.js (Study materials menu), nav-menus.js (drawer, mega menus,
                          .scrolled), lang-switch.js; styles public/css/navigation-bar.css (declared by the component)
    Footer/               Footer.jsx, data.js (link columns, socials), footer-menu.js, footer-curtain.js, footer-word.js
    Intro/                Intro.jsx (server-rendered overlay), intro.js (plays and lifts it)
    WhatsAppButton/       WhatsAppButton.jsx
    SiteBehaviour.jsx     client component: after hydration, imports lib/behaviour.js and starts it
  sections/<Section>/     one folder per section: <Section>.jsx (markup), data.js (content), *.js (behaviour)
                          Hero, Programmes, Toppers (data/ holds the archive and rankers), WhyChoose, Batches, GeneralStudies,
                          Faculties (the faculty section, id "educators"; TS + Tailwind, ported from Soloman), Stories, Contact, Resources (data.jsx: the cards), Visit, Faq, Closing, Parked (hidden)
  dialogs/                RanksDialog, CourseCatalogDialog (+ their behaviours; course-catalog.js also opens the catalogue for any [data-cat] link)
  ui/                     shared pieces: Button/ (the button system: Button.jsx, button-core.js, README.md), SectionLabel (.lbl eyebrow),
                          ArrowIcon/StraightArrow, Dialog, Stylesheet,
                          custom-select.js (accessible dropdown), accordion.js, rail.js
lib/
  behaviour.js            THE ORDER every behaviour runs in (the order matters; see the comment at its top)
  site.js                 shared helpers ($, $$, esc, reduce, clamp, ico …) and site constants (PHONE, SITE)
  data/courses.js         the course catalogue (nav menu, catalogue dialog, contact form)
  motion/                 site-wide motion: scroll.js (Lenis, .rv reveals), page-motion.js (hero slides, section MAP, CTA labels),
                          hero-kit.js (nav hide-on-scroll), rise.js (.rise card groups), word-fill.js (.reveal headings)
  vendor/lenis.min.js
public/
  css/                    the stylesheets, served as-is (see "Styles" below): buttons.css, v25.css … v49.css, intro.css, toppers.css, story.css
  assets/img/             brand/, icons/, patterns/, hero/, photos/, banners/, toppers/ (by purpose)
.claude/skills/site-motion/   the motion rules and the headless-Chrome check script
```

## How a section is put together

- **Markup**: `<Section>.jsx` is a static server component. Shared markup comes from `components/ui` (`SectionLabel`, `ArrowIcon`, `Dialog`) — reuse those rather than copying markup.
- **Content**: lists and copy that a behaviour renders, or that repeats, live in the section's `data.js` (e.g. `Faq/data.js`, `Batches/data.js`, `Faculties/data/educators.ts`, `Resources/data.jsx`). Editing content means editing data only.
- **Behaviour**: the section's `*.js` modules export `init…()` functions that work on the server-rendered DOM (they build lists, bind events, animate). Register a new one in `lib/behaviour.js` at the right point in the sequence. They run once, in the browser, after hydration; React never re-renders those nodes, so they may change them freely.
- **Buttons**: every button and button-styled link is `<Button>` (`components/ui/Button/Button.jsx`) or, in a behaviour, `buttonHTML()` (`button-core.js`); its look lives only in `public/css/buttons.css`. Pick a variant/size, never restyle: section rules may only place a button (margin, position, display) or override its `--btn-*` tokens. Reference: `components/ui/Button/README.md`.
- **Never change the DOM before hydration** (a script that does breaks it: render that markup in a component instead and have the behaviour find it).
- JSX from HTML: `className`, `style={{ "--d": ".1s" }}`, `htmlFor`, `tabIndex`; keep meaningful spaces between inline elements as `{" "}`.

## The Programmes section (#courses) is different: TypeScript + Tailwind

Ported from the soloboy branch of C:UsersVonnueDownloadssoloVajiram-ravi (user 2026-11-13). It is the one section written in
TypeScript and styled with Tailwind v4 utilities, kept close to soloboy's code; everything it needs lives in its folder
(`components/sections/Programmes/`: `ui/` its Cta, Medallion, IndianLink and a section-scoped TextMotion; `lib/`; `data/`), images
in `public/assets/img/programmes/`.
- `programmes.css` is its Tailwind entry: utilities generated from that folder only and unlayered, soloboy's theme, and Tailwind's
  preflight plus soloboy's global rules scoped to `#courses`. Nothing in it reaches other sections; keep it that way (this site's
  buttons also use a `.cta` class).
- Its section title, eyebrow and body copy use this site's styles (`SectionLabel`, `.h2.h2--sec`); its ground is this site's
  (`--ground-jaali`, shared with the hero and the header).
- Responsive (soloboy is a fixed, zoomed 1440 canvas): the rules at the end of `programmes.css` and the shelf's geometry in
  `CourseShelf.tsx` (4 / 3 / 2 books to a plank, the stage scaled to fit). At 1440px and up it is soloboy's layout unchanged.
- Its motion is soloboy's (`ui/TextMotion`, Web Animations: the site-motion check cannot see it and lists those elements as static).
- "Enrol" opens this site's contact form with the programme chosen (`lib/enquiry.ts`).

## Styles

- The stylesheets are plain files in `public/css`, **not imported through the bundler**: Next's CSS minifier rewrites `transform: none; translate: …; scale: …` into one `transform`, which breaks reveals that animate `translate`/`scale` separately (it froze the Resources cards mid-rise). Keep it that way.
- `app/layout.jsx` links `buttons.css` (the button system, first so placement rules after it win) and then `v49.css` (precedence "base"); it `@import`s v48 → … → v25 in cascade order (order matters; they keep their names). A section with its own sheet declares it with `<Stylesheet href="/css/…" />` (precedence "sections", hoisted after the base).
- Asset URLs in CSS are root-relative (`url(/assets/img/…)`); in JSX `/assets/img/…`; in behaviour modules `assets/img/…` (the page is at `/`).

## Every change: apply the `site-motion` skill

The client wants **every section and every element animated**. For any change to `app/`, `components/`, `lib/` or `public/css/`, use the `site-motion` skill (`.claude/skills/site-motion/SKILL.md`): give new or changed sections an entrance, elements a reveal, interactive elements a hover/focus state, using the site's existing primitives and motion tokens. Then, with `npm run dev` running, run its check (`node .claude/skills/site-motion/scripts/motion-check.js "<section selector>" --hover "<card selector>"`) and report what was verified.

## Design tokens that must stay consistent

- Section titles: `--h2` (64px on desktop, 40px on phones) for every section heading.
- Section rhythm: `--sec-y` vertical padding and `--sec-gap` between sheets (end of `public/css/v49.css`). Do not give a section its own padding.
- Eyebrows: the `SectionLabel` component (`.lbl`: 14px semibold brand label). Dark grounds use `<SectionLabel light>`.
- `--f` is the font-family variable. Never reuse that name for a scroll progress value (an earlier `--f` clash broke every font in Programmes).

## Working notes

- Client direction: `WEBSITE-DIRECTION-2026-11-11.md` (root) holds the 11 Nov 2026 direction session with the client (the
  agreed section order, a short page, two-row courses, about 10 toppers, a cylinder faculty carousel, no zoom/scroll effects in
  Why choose us, a PageSpeed target of 90 to 95, mobile first, the review workflow), plus the full transcript; the original
  .docx is next to it. Read its "For the build" list before changing the page's structure. Where the user's later
  instructions differ (e.g. a section order dated after 11 Nov), the user's instruction wins.
- Global config: `lib/config.js` (`ENABLE_PRELOADER`: the logo intro on or off).
- Content column: 1440px, centred on wider screens (`--cap` / `--px`, end of `public/css/v49.css`); section backgrounds stay full-bleed.
  Hero height (user 2026-11-13): every first screen ends with a preview of Programmes (its sheet top and eyebrow label): the hero
  is the screen minus the header and `--hero-peek` (176px), never less than `--hero-min` (its copy, CTA and slide indicators) and,
  from 1280px wide, never more than `--hero-fit` (the content-fit height). End of `public/css/v49.css`. No scroll-down cue in the hero.
- One ground for the header, the hero frame and Programmes: `--ground-jaali` (v49.css).
- Header and hero (user 2026-11-13): the header is the NavigationBar component (`components/layout/NavigationBar/`, styles `public/css/navigation-bar.css`). At the top it sits in its own white band (`.nav-band`), then one 20px gap (`--hdr-gap`, the hero frame's gutter) to the hero, whose height fits its content from 1280px wide (`public/css/v49.css`). The nav stays fixed in one place and never shrinks; smart header (user 2026-11-13): it slides out of view while the page scrolls down and back as soon as it scrolls up (`.nav--away`, `initNavScrolled` in `nav-menus.js`; a transform only, so nothing moves), always showing near the top, with a menu or the drawer open, or with focus inside it. Its bar is transparent at the top of the page and fades to white (16px corners, a soft shadow) once the page scrolls (`.scrolled`, `nav-menus.js`; end of `navigation-bar.css`, user 2026-11-13). `.nav--hero` is unused. The hero carousel's autoplay holds while the pointer is over the hero or focus is inside it (`lib/motion/page-motion.js`).

- The Toppers section (`#toppers`) is "Behind every rank is a different journey": a static banner in `Toppers.jsx` plus `<ToppersSpread />` (`Toppers/ToppersSpread/`: ToppersSpread.jsx, RankMedal.jsx, `data.js` with the CSE 2025 rank holders; styles `public/css/toppers-spread.css`, banner styles `public/css/toppers.css`). Add or edit a rank holder in `data.js` only. The old gazette behaviour (`toppers.js`) was removed; `Toppers/data/` is unused leftovers. Newsreader italic 400/500 is loaded in `app/layout.jsx` for the spread.
- Success stories (`#stories`, user 2026-11-13) is also styled with Tailwind v4: `Stories/stories.css` is its entry, with utilities
  generated from that folder only and **prefixed `st:`** (so they never collide with Programmes' sheet), no preflight, plus its
  keyframes, the `postcard-paper` utility and the `waiting` / `dealt` / `dimmed` variants. The postcards are server-rendered
  from `Stories/data.js` (`POSTCARDS`), portraits through `next/image`; `stories.js` only adds the reveal, the tilt and the
  off-screen pause. Its section shell (padding, ground, eyebrow, `.h2`) stays in `public/css` like every other section's.
- Why choose us (`#story`) has no entrance (user 2026-11-13): the pinned scene (`WhyChoose/story.js`) is entered at its settled
  point (`OFF` = `S0`), so the heading, first photo and first chapter are in place when it pins (no zoom, word split, fade or
  reveal). Only the chapter swing plays on the scroll, plus the hover effects. Do not add an entrance back.
  One step per gesture (user 2026-11-13): while it is pinned, one wheel flick, swipe or key press moves exactly one chapter, and
  past the last one it carries on to the next section (`story.js`, "one step per gesture").
- The "How it works" and results sections are in `sections/Parked/Parked.jsx`, inside `<div id="parked" hidden>`; they are not shown.
- `public/css/why-choose.css` and `public/js/why-choose.js` are leftovers the page does not load (they were not loaded before the Next.js conversion either).
