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
                          Faculty, Stories, Contact, Resources (data.jsx: the cards), Visit, Faq, Closing, Parked (hidden)
  dialogs/                RanksDialog, CourseCatalogDialog (+ their behaviours; the catalogue's openCat is used by Programmes)
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
- **Content**: lists and copy that a behaviour renders, or that repeats, live in the section's `data.js` (e.g. `Faq/data.js`, `Batches/data.js`, `Faculty/data.js`, `Resources/data.jsx`). Editing content means editing data only.
- **Behaviour**: the section's `*.js` modules export `init…()` functions that work on the server-rendered DOM (they build lists, bind events, animate). Register a new one in `lib/behaviour.js` at the right point in the sequence. They run once, in the browser, after hydration; React never re-renders those nodes, so they may change them freely.
- **Buttons**: every button and button-styled link is `<Button>` (`components/ui/Button/Button.jsx`) or, in a behaviour, `buttonHTML()` (`button-core.js`); its look lives only in `public/css/buttons.css`. Pick a variant/size, never restyle: section rules may only place a button (margin, position, display) or override its `--btn-*` tokens. Reference: `components/ui/Button/README.md`.
- **Never change the DOM before hydration** (a script that does breaks it: render that markup in a component instead and have the behaviour find it).
- JSX from HTML: `className`, `style={{ "--d": ".1s" }}`, `htmlFor`, `tabIndex`; keep meaningful spaces between inline elements as `{" "}`.

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

- Header and hero (user 2026-11-13): the header is the NavigationBar component (`components/layout/NavigationBar/`, styles `public/css/navigation-bar.css`). At the top it sits in its own white band (`.nav-band`), then one 20px gap (`--hdr-gap`, the hero frame's gutter) to the hero, which is a fixed 680px (`public/css/v49.css`). The nav stays fixed in one place and always sits on a white bar with 20px corners (no move, shrink, hide or change on scroll). It never turns transparent over the hero (`.nav--hero` is unused). The hero carousel's autoplay holds while the pointer is over the hero or focus is inside it (`lib/motion/page-motion.js`).

- The Toppers section (`#toppers`) is "The Civil Services Gazette", a results-special front page modelled on vajiram-ravi-homepage.vercel.app `#results`: a static shell in `Toppers.jsx`, styles `public/css/toppers.css`, everything else written by `Toppers/toppers.js` from `Toppers/data/toppers-archive.js` (per year: rank, name, programmes, `photo` colour portrait, `img` b/w fallback; programme names fall back to `Toppers/data/toppers.js`). Add or edit a rank holder in the data only. Its filters use `data-gz-cat` because the catalogue treats any `[data-cat]` click as "open the course catalogue".
- The "How it works" and results sections are in `sections/Parked/Parked.jsx`, inside `<div id="parked" hidden>`; they are not shown.
- `public/css/why-choose.css` and `public/js/why-choose.js` are leftovers the page does not load (they were not loaded before the Next.js conversion either).
