# Vajiram & Ravi site

Next.js (App Router) site, deployed to Vercel from `main`. The page at `/`, statically prerendered, plus one course detail page
per programme at `/courses/<slug>` (`app/courses/[slug]/page.tsx`, built from `programmes-data.ts`; a placeholder
until the course content is ready, user 2026-11-13). "View course" on a Programmes book links there (shown at a fixed place on a hovered book, no cursor follow, user 2026-11-20). Off the homepage only the
site-wide behaviours run (`SITE_WIDE` in `lib/behaviour.js`) and in-page links are rewritten to `/#…`. Every section is its own
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
    NavigationBar/        the site header: NavigationBar.jsx only (user 2026-11-20: one file, Tailwind `cu:` utilities via
                          app/tailwind-sections.css, no comments): markup, menu data, mega menus, drawer, More menu, language switch
    Footer/               Footer.jsx (Kevin's footer, user 2026-11-16; Tailwind `cu:` utilities via app/tailwind-sections.css since 2026-11-24, which also holds its curtain variants): one file, user 2026-11-17: the logo row (with the socials), the link
                          columns and the legal bar (no giant debossed name, user 2026-11-21) (no news, user 2026-11-20; the logo, emblem + wordmark, back at the top since user 2026-11-21), the markup and initFooterCurtain (the curtain behaviour)
    Intro/                Intro.jsx (server-rendered overlay), intro.js (plays and lifts it)
    WhatsAppButton/       WhatsAppButton.jsx
    SiteBehaviour.jsx     client component: after hydration, imports lib/behaviour.js and starts it
  sections/<Section>/     one folder per section: <Section>.jsx (markup), data.js (content), *.js (behaviour)
                          Hero (user 2026-11-21: Hero.jsx composes HeroBanner.jsx (slides, copy, controls, `initHeroCarousel`) and HeroStats.jsx (the stats row, `initHeroStats`);
                          styles in public/css/hero-banner.css and hero-stats.css), Programmes, Toppers (data/ holds the archive and rankers), WhyChoose, Batches (the GS section was removed from the homepage, user 2026-11-20),
                          Faculties (the faculty section, id "educators"; TS + Tailwind, ported from Soloman; the off-front cards use `-bw` copies of the
                          photos, not a CSS grayscale filter, for performance), Stories, TalkToUs ("Talk to us", the counsellor form, id `contact`: one file, Tailwind `cu:` utilities, no comments, user 2026-11-21), Resources (data.jsx: the cards), ContactUs (Tailwind), Faq, Closing
  dialogs/                RanksDialog, CourseCatalogDialog (+ their behaviours; course-catalog.js also opens the catalogue for any [data-cat] link)
  ui/                     shared pieces: Button.tsx (the button system, one file: the `<Button>` component, its types and `buttonHTML()` for behaviours), SectionLabel (.lbl eyebrow),
                          ArrowIcon/StraightArrow, Dialog, Stylesheet, CarouselDots.jsx (every carousel's dot indicator; Tailwind,
                          `cu:` utilities, the shared entry app/tailwind-sections.css), Tabs.jsx (every tab bar, one file: the sand bar and sliding brand pill; `Tabs` the markup, `initTabs` the behaviour, `ControlledTabs` for React state; styles public/css/tabs.css, user 2026-11-21; sections only place the bar),
                          custom-select.js (accessible dropdown), accordion.js, rail.js
lib/
  behaviour.js            THE ORDER every behaviour runs in (the order matters; see the comment at its top)
  site.js                 shared helpers ($, $$, esc, reduce, clamp, ico …) and site constants (PHONE, SITE)
  data/courses.js         the course catalogue (nav menu, catalogue dialog, contact form)
  motion/                 site-wide motion: scroll.js (Lenis, .rv reveals), page-motion.js (section MAP, scrollbar, WhatsApp button; the hero slides are in Hero.jsx),
                          hero-kit.js (nav hide-on-scroll), rise.js (.rise card groups), word-fill.js (.reveal headings)
  vendor/lenis.min.js
public/
  css/                    the stylesheets, served as-is (see "Styles" below): buttons.css, v25.css … v49.css, toppers.css
  assets/img/             brand/, icons/, patterns/, hero/, photos/, banners/, toppers/ (by purpose)
.claude/skills/site-motion/   the motion rules and the headless-Chrome check script
```

## How a section is put together

- **Markup**: `<Section>.jsx` is a static server component. Shared markup comes from `components/ui` (`SectionLabel`, `ArrowIcon`, `Dialog`) — reuse those rather than copying markup.
- **Content**: lists and copy that a behaviour renders, or that repeats, live in the section's `data.js` (e.g. `Faq/data.js`, `Faculties.tsx` (its data)). Editing content means editing data only.
- **Behaviour**: the section's `*.js` modules export `init…()` functions that work on the server-rendered DOM (they build lists, bind events, animate). Register a new one in `lib/behaviour.js` at the right point in the sequence. They run once, in the browser, after hydration; React never re-renders those nodes, so they may change them freely.
- **Buttons**: every button and button-styled link is `<Button>` (`components/ui/Button.tsx`) or, in a behaviour, `buttonHTML()` (same file); its look lives only in `public/css/buttons.css`. `shadow={false}` (`buttonHTML({ shadow: false })`) turns the drop shadow off (`.btn--flat`; the header's "Let's talk" uses it). Pick a variant/size, never restyle: section rules may only place a button (margin, position, display) or override its `--btn-*` tokens.
- **Never change the DOM before hydration** (a script that does breaks it: render that markup in a component instead and have the behaviour find it).
- JSX from HTML: `className`, `style={{ "--d": ".1s" }}`, `htmlFor`, `tabIndex`; keep meaningful spaces between inline elements as `{" "}`.

## The Programmes section (#courses) is different: TypeScript + Tailwind

Ported from the soloboy branch (user 2026-11-13). One client component, `components/sections/Programmes.tsx` (user 2026-11-24: the section, shelf, cover art, TextMotion, IndianLink and Medallion in one file, `cu:` Tailwind utilities, no stylesheet of its own). Its programme data and links are `components/sections/programmes-data.ts` (server code, the course page and the hero, reads it, so it cannot live in the client file). Images in `public/assets/img/programmes/`.
- Its Tailwind setup (soloboy's colours, shadows, the `#courses`-scoped reset, keyframes) is in the shared entry `app/tailwind-sections.css`; its plain-CSS hooks (`peel`, `is-peeling`, `prog__*`, `tm-mask`) are class names the code or other sheets look up, not styles.
- Its section title, eyebrow and body copy use this site's styles (`SectionLabel`, `.h2.h2--sec`); its ground is this site's (`--ground-jaali`).
- Responsive: `max-[640px]:` / `max-[900px]:` utilities in the component and the shelf's geometry in `CourseShelf` (4 / 3 / 2 books to a plank, the stage scaled to fit); phones get the book rail instead of the shelf.
- Its motion is soloboy's (`TextMotion`, Web Animations: the site-motion check cannot see it and lists those elements as static).

## Styles

- The stylesheets are plain files in `public/css`, **not imported through the bundler**: Next's CSS minifier rewrites `transform: none; translate: …; scale: …` into one `transform`, which breaks reveals that animate `translate`/`scale` separately (it froze the Resources cards mid-rise). Keep it that way.
- `app/layout.jsx` links `buttons.css` (the button system, first so placement rules after it win) and then the layers v25 → v26 → … → v49 (`CSS_LAYERS`, precedence "base"), each its own `<link>` in cascade order (order matters; they keep their names). No `@import` between them: the old chain held first paint about 3s on phones. A new layer goes into `CSS_LAYERS`. A section with its own sheet declares it with `<Stylesheet href="/css/…" />` (precedence "sections", hoisted after the base).
- Production CSS (performance audit 2026-11-16): `scripts/build-css.mjs` (npm `prebuild`) joins the base layers (`BASE_CSS`) and the homepage's section sheets (`SECTION_CSS`, in their hoisted order) into one `public/css/base.bundle.css` (gitignored), and `<Stylesheet>` renders nothing for a bundled sheet. A new section sheet the homepage loads goes into `SECTION_CSS` (`lib/css-layers.mjs`) at its place in page order. Development still links each file (live reload). Next inlines its own bundler CSS (the Tailwind sheets) into the HTML (`experimental.inlineCss`, `next.config.mjs`).
- Asset URLs in CSS are root-relative (`url(/assets/img/…)`); in JSX `/assets/img/…`; in behaviour modules `assets/img/…` (the page is at `/`).
- Live CSS in development: `components/layout/DevCssReload.jsx` (rendered by `app/layout.jsx` only when `NODE_ENV` is development) checks the `/css/` sheets about once a second and swaps in an edited one without a page reload. Behaviour modules (`*.js` that build or bind the DOM) still need a refresh: they run once after hydration.

## Every change: apply the `site-motion` skill

The client wants **every section and every element animated**. For any change to `app/`, `components/`, `lib/` or `public/css/`, use the `site-motion` skill (`.claude/skills/site-motion/SKILL.md`): give new or changed sections an entrance, elements a reveal, interactive elements a hover/focus state, using the site's existing primitives and motion tokens. Then, with `npm run dev` running, run its check (`node .claude/skills/site-motion/scripts/motion-check.js "<section selector>" --hover "<card selector>"`) and report what was verified.

## Design tokens that must stay consistent

- Section titles: `--h2` (64px on desktop, 40px on phones) for every section heading.
- Section rhythm (audited 2026-11-13, "Vertical rhythm, standardised" at the end of `public/css/v49.css`): `--sec-y` (64-90px)
  above and below every section, half on top for a light section that follows another light one (Faculty, FAQ, closing);
  eyebrow -> heading `--hd-lbl` (24px), heading -> intro `--hd-in` (16px), heading block -> content `--hd-gap` (36-48px). The
  Tailwind sections use the same variables (`pt-[var(--sec-y)]`, `mt-[var(--hd-gap)]`). Do not give a section its own padding.
- Eyebrows: the `SectionLabel` component (`.lbl`: 14px semibold brand label). Dark grounds use `<SectionLabel light>`.
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
  first page of a session). Its mandala ring is capped at 88% of the screen height (user 2026-11-21). The intro runs from the inline boot script `components/layout/Intro/boot.js` from the first paint,
  never waiting for hydration, and never under reduced motion.
- Content column: 1440px, centred on wider screens (`--cap` / `--px`, end of `public/css/v49.css`); section backgrounds stay full-bleed.
  Hero height (user 2026-11-13): every first screen ends with a preview of Programmes (its sheet top and eyebrow label): the hero
  is the screen minus the header and `--hero-peek` (176px), never less than `--hero-min` (its copy, CTA and slide indicators) and,
  from 1280px wide, never more than `--hero-fit` (the content-fit height). End of `public/css/v49.css`. No scroll-down cue in the hero.
- One ground for the header, the hero frame and Programmes: `--ground-jaali` (v49.css).
- Header and hero (user 2026-11-13): the header is the NavigationBar component (`components/layout/NavigationBar.jsx`, Tailwind `cu:` utilities, user 2026-11-20; the header sizes `--hdr-pt`, `--hdr-h`, `--hdr-gap` are at the end of `v49.css`). At the top it sits in its own band (`.nav-band`), then one 20px gap (`--hdr-gap`, the hero frame's gutter) to the hero, whose height fits its content from 1280px wide (`public/css/v49.css`). The nav stays fixed in one place, never shrinks and is always visible (user 2026-11-20: no hiding on scroll). "Let's talk" is the `sm` button (44px, its own disc; it was `xs` forced to 44px). Its bar is transparent at the top of the page and fades to white (the hero card's corners: 24px, 20px at 900px and narrower, user 2026-11-21; a soft shadow) once the page scrolls (`data-top` on `#nav`, `initNavScrolled`; the `cu:nav-top:` variant). No language switch in the bar (user 2026-11-21; it stays at the foot of the phone drawer). Links show from 1024px (burger below; on phones, 760px and narrower, the bar is the logo and the burger only: the language switch and "Let's talk" sit at the foot of the drawer, `.drawer__end`, user 2026-11-17); any that would come within 40px of the language switch move into a "More" menu, FAQs first (`initNavMore`; at 1280px all fit). The hero carousel's autoplay holds while the pointer is over the hero's buttons (user 2026-11-16; not the whole banner) or keyboard focus is inside it, and resumes after; slides change by the previous/next arrows, the indicators, arrow keys or a swipe (`initHeroCarousel` in `HeroBanner.jsx`). The banner is Kevin's in layout and spacing (user 2026-11-16, eclectic-alfajores-975fab.netlify.app, branch `kevin`; `public/css/hero-banner.css`): the card on the 1280px column, the copy left aligned in it (at its foot under the portrait below 900px; left aligned on phones too, user 2026-11-17), the AIR card top right (top left below 900px), the dots centred in a dark pill (`.hx__dots`) and the arrows inside the card, at its bottom corners level with the dots (both in `.hx__navs`, laid over the card by `page-motion.js`; arrows shown on hover). Phones (760px and narrower, user 2026-11-16): the card full width and the screen's height less the header; the previous/dots/next controls sit inside the card at its foot (user 2026-11-17). Logo 44px tall (38px at 400px and narrower).
  No card stack (user 2026-11-16: removed): the slides crossfade with a slow zoom. Stats (user 2026-11-16): a row of four key
  numbers sits under the hero card, inside the hero section: Kevin's row (user 2026-11-16), `.hx__stats`, figures in `HeroStats.jsx` (STATS),
  roll-up and entrance `initHeroStats`, both in `HeroStats.jsx`, styles `public/css/hero-stats.css` (the old `.dl__stats` rules in `v49.css` are dead); the
  card gives up the row's height (`--stats-h`) so the first screen still ends with the
  Programmes peek, except on phones, where the card keeps its height and the row pushes the peek down.
  Hero ground (user 2026-11-20, replacing the orange brand ground of 2026-11-16): the header band (`.nav-band`) and the hero
  (`.dl__ground`) paint the sections' `--ground-jaali`, the hero's tile continuing the band's (end of `v49.css`); the nav items are
  their usual colours at rest, and the stats are ink on it (end of `hero-stats.css`). The batch ribbon above the header was removed
  (user 2026-11-16; `--strip-h` is 0, `components/sections/BatchStrips.jsx` is unused). The promo banner carousel under the stats was
  removed (user 2026-11-20). Simple scroll (user 2026-11-20): the hero no longer pins, dims or shrinks while Programmes slides over
  it; both scroll with the page (end of `v49.css`).
- Life at Vajiram & Ravi (`#lifeGal`, `LifeGallery/`, styles `public/css/life-gallery.css`): on the hero's ground, `--ground-beige` (user 2026-11-21, replacing the orange ground and grain; the override block at the end of its sheet). The hero's results pill with the running topper names was removed (user 2026-11-21); in its place the hero copy opens with a
  static `<SectionLabel light>` eyebrow ("CSE 2025 results"). Slides (user 2026-11-21): `HERO_ORDER` in `HeroBanner.jsx` picks and orders them from `ALL_SLIDES` (now results, AIR 1, GS foundation,
  next batch, campus (`slide-campus.webp`, drawn at 125% width so the sign clears the copy; `data-kind` on `#dlPin` for per-slide rules, set by `initHeroCarousel`); photos `hero-v6/slide-results.webp`, `slide-gs-foundation.webp`, `slide-batch.webp`, each with a desktop `pos` and a phone
  crop `mpos`; kept and ready: `air-2`, `air-3`, `prelims`, `mentor`). Each has its eyebrow, headline, lead and buttons; a topper or a slide
  with an `image` shows that photo, the others draw their visual (programme book, `ResultsArt`: the CSE 2025 top 10 and "36 of the top
  50"; `BatchArt`: a ticket for the flagship batch from `BATCHES` with the next two under it). Programme slides (`PROGRAMME_COPY`, from `programmes-data.ts`): the programme's
  book (its cloth colours, gold frame, `CoverArt` emblem) where the portrait stands, on a ground in its colour; each slide carries its
  own eyebrow, headline, lead and buttons (`data-eyebrow`, `data-h`, `data-lead`, `data-btns`), swapped by `initHeroCarousel` (Enrol picks
  the programme in the contact form via `data-prog`; View course opens its page). A programme can have its own photo instead of the drawn book (`image` in `PROGRAMME_COPY`; GS foundation: `hero-v6/slide-gs-foundation.webp`, the
  study desk with the GS book, with its own left wash; on tablets and phones only the card's top 40%). Styles at the end of `hero-banner.css`. The AIR card is a slim caption pill (gold "AIR 1" badge, name, exam) at the card's bottom right, top left on phones. Hero height and stats (user 2026-11-21, end of `public/css/hero-stats.css`): the hero (header band + card + stats) fills the screen, at most 900px
  tall, the stats band 184px on desktop (120px on screens 760px tall or less), the banner card at most 540px (the hero
  shortens with it), never below its copy (`--card-min`); the stats sit centred with equal space above and below; the stats row is 120px on desktop and a two by two grid on phones (168px, user 2026-11-21; end of hero-stats.css), so card +
  stats fit the first screen from 1024x650 and 390x844 up.
- Contact us (`#visit`) and the footer are Kevin's too (user 2026-11-16). Contact us (user 2026-11-17) is `ContactUs/ContactUs.jsx`,
  Tailwind with `cu:` utilities (the shared entry `app/tailwind-sections.css`; the folder holds only the .jsx): one card holding the 2:1 map (no "View on maps"), the address (title font), phone,
  email (Lucide `phone` / `mail` glyphs, inline SVG) on the left and a static campus photo on the right, no shadow; its id stays `visit` for the shared shell rules; the cream footer `Footer.jsx` (Tailwind `cu:`, its text is in Mukta, the body font; its tagline in Newsreader as in the preloader; while it zooms in, `footer[data-zooming]` makes its content one layer so the social icons do not jump).

- The Toppers section (`#toppers`, `Toppers/Toppers.jsx`, styles `public/css/podium.css`): heading, the drifting reel (`diamond-reel.js`; drag, swipe, or a
  two-finger sideways trackpad swipe moves it) starting at AIR 1 (no podium for the top three, user 2026-11-21), with the record's year tabs above its title and a second reel under it drifting the other way (user 2026-11-24, `ToppersReel.jsx`: `YEARS`, one group of reels per year; 2025 splits at `REEL_SIZE`, an archive year of more than 12 splits in half, a smaller one is one reel; `initDiamondReel` runs `initReel` per `.dr__view`, `data-dir="-1"` reverses it), then the "View all toppers" button. "The full record, year by year" (`ToppersRecord`) is hidden (user 2026-11-24: not rendered; the component and `initToppersRecord`, which no-ops without it, are kept; refined 2026-11-21: a frosted
  panel on the main content column (the hero card's width), archive label + live count, gold year chips (one scrolling line on phones), rank badges (solid gold for the top 10), the portrait
  pane with the rank in gold; phones show a photo in each row instead of the pane; the rows are hover-only, not clickable; the list scrolls on its own: `data-lenis-prevent`; photo pane on the left). Ground: the hero's `--ground-beige` (user 2026-11-21), its text in ink and brand orange and the record a white card;
  a faint grain (200px, soft-light, 45%; end of `podium.css`).
- Success stories sit one layer above Faculty (`#stories` z-index 2, end of `v49.css`) so a hovered postcard's shadow is not cut off.
- Success stories on phones (user 2026-11-17, 760px and narrower): the postcards are a stack (one card in front, two peeking behind; swipe, arrows, or ← →) instead of the loop. Logic `components/ui/card-stack.js`; styles at the end of `sections/stories.css`.
- Success stories (`#stories`, user 2026-11-13) is also styled with Tailwind v4: `Stories.jsx` takes the shared `cu:` entry (`app/tailwind-sections.css`, which also holds its states, keyframes and phone stack), with utilities
  generated from that folder only and prefixed `cu:`, no preflight, plus its
  keyframes, the `postcard-paper` utility and the `waiting` / `dealt` / `dimmed` variants. The postcards are server-rendered
  from `Stories.jsx` (`POSTCARDS`), portraits through `next/image`; `initStories` (same file) only adds the reveal, the tilt and the
  off-screen pause. Its section shell (padding, ground, eyebrow, `.h2`) stays in `public/css` like every other section's.
- Why Vajiram & Ravi (`#story`, user 2026-11-20, replacing the pinned photographic scene and its story.js / story.css): one file,
  `WhyChoose/WhyChoose.jsx`, Tailwind `cu:` utilities (`app/tailwind-sections.css`). A centred heading over six cards in a plain grid,
  three to a row (no tilt or zig-zag, user 2026-11-21; two columns at 860px and narrower, phones included), each card static (no link or arrow, user 2026-11-21):
  icon tile, title, copy and the key figure (no photos, user 2026-11-21). All six fit one screen from 360x740 up (spacing scales
  with the screen height; on phones the copy and the figure's caption are hidden). Cards rise in (`.why__cards` in `lib/motion/rise.js`);
  hover fills the icon tile brand and tilts it.
  No sticking (user 2026-11-21): it and Contact us scroll with the page like any section.
- Best IAS Coaching in Delhi (`#about`, `BestCoaching/`) was removed from the page (user 2026-11-21); the folder is unused.
- Why Vajiram & Ravi with Legacy (`#story`, user 2026-11-21): one component, `WhyChoose/WhyChoose.jsx`, one section on `--ground-jaali` (half the section rhythm above it, `v49.css`). Top: the 3:4 photo (`campus-entrance-clean.webp`, the building cropped, levelled and colour-corrected from `campus-entrance.webp`) beside the eyebrow "Why Vajiram & Ravi?", the "50+ Years of Experience" heading and paragraph (`LEGACY`, `#legacy`). Below (`#reasons`): the six reasons, three to a row, each an Indian line icon (Ashoka Chakra, diya, lotus, book, India Gate, screen with a jharokha arch), title and text, no cards; the gap is the Batches tickets' `--card-gap`. `Legacy/` was removed.
- Batches (`#batches`, user 2026-11-21): one file, `Batches/Batches.jsx`, Tailwind `cu:` utilities, no comments (user: no comments
  in the code). It holds the batch data (`BATCHES`, `BFAM`, `BYEAR`, `BANNERS`, imported from here by the contact form and BatchStrips), the tickets, the "all batches" dialog and the behaviours (`initBatchTickets`, `initBatchDialog`). The flagship
  glint's `@property`s, `flagClock` keyframes, `--ticket-notch` and `--flag-glint` are in `app/tailwind-sections.css`. The shared
  shells it keeps: `.band`, `.rail` / `.rail__track` / `.rail__nav` / `.cbtn` (rail.js), `.dlg`, `.rv`, and the `.sg` stagger on `#price`.
- `public/css/why-choose.css` and `public/js/why-choose.js` are leftovers the page does not load (they were not loaded before the Next.js conversion either).
