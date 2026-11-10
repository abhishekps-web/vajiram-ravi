# Vajiram & Ravi site

Static site (no build step): `index.html` + `css/` + `js/` + `assets/`, deployed to Vercel from `main`. `index.html` is the page; Vercel serves it at `/`.

## Project layout

```
index.html              the whole page (sections in order: hero, programmes, why, toppers, batches, banners, GS, faculty, stories, contact, resources, visit, FAQ, footer)
css/
  v25.css … v49.css     the site stylesheet as cascade layers: v25 is the base, each later file @imports the one before it and overrides it.
                        index.html loads only v49.css (the top of the chain). Order matters, so these keep their layer names.
  why-choose.css        Why section (self-contained)
  toppers.css           Toppers newspaper section
  intro.css             logo intro overlay
js/
  content.js            renders every data-driven section (programmes, banners, faculty, stories, batches, FAQ, footer) and the card rise-in
  page-motion.js        hero slides, hero cover progress, CTA button enhancement, current-nav marker, scroll-focus fade (the section MAP)
  scroll.js             Lenis smooth scroll, the .rv reveal observer, hero/value-prop scroll rows
  hero-kit.js           nav hide-on-scroll and carousel controller
  intro.js              logo intro
  toppers.js            Toppers year switch
  why-choose.js         Why section count-up
  accordion.js, footer-curtain.js, footer-word.js, lang-switch.js
  data/                 toppers.js (top-10 portraits and quotes), toppers-archive.js (2016–2025 archive)
  vendor/               lenis.min.js
assets/
  img/brand/            emblem, logos, lotus marks
  img/icons/            arrows, chevrons, FAQ and social icons (content.js builds these with ico('name.svg'))
  img/patterns/         ornaments and textures used as CSS backgrounds (buta, jaali, mandala, kinari, grain …)
  img/hero/             hero carousel slides (hero-1 … hero-4)
  img/photos/           photographs and illustrations (campus, building, faculty-N, prog-N, footer classroom …)
  img/banners/          admission banners listed in BANNERS in content.js
  img/toppers/          topper portraits: flat set for the current year, archive/<year>/ for earlier years, bw/ for the newspaper front page
.claude/skills/site-motion/   the motion rules and the headless-Chrome check script
```

Adding an asset: put it in the folder for its purpose (never a new version folder) and reference it by that path.

## Every change: apply the `site-motion` skill

The client wants **every section and every element animated**. For any change to `index.html`, `css/` or `js/`, use the `site-motion` skill (`.claude/skills/site-motion/SKILL.md`): give new or changed sections an entrance, elements a reveal, interactive elements a hover/focus state, using the site's existing primitives and motion tokens. Then run its check (`node .claude/skills/site-motion/scripts/motion-check.js "<section selector>" --hover "<card selector>"`) and report what was verified.

## Design tokens that must stay consistent

- Section titles: `--h2` (64px on desktop, 40px on phones) for every section heading.
- Section rhythm: `--sec-y` vertical padding and `--sec-gap` between sheets (end of `css/v49.css`). Do not give a section its own padding.
- Eyebrows: the `.lbl` component (14px semibold brand label + Hindi twin). Dark grounds use `.lbl--w`.
- `--f` is the font-family variable. Never reuse that name for a scroll progress value (an earlier `--f` clash broke every font in Programmes).

## Working notes

- The user previews `index.html` straight from disk (file://), so bump the `?v=` query on any CSS/JS link you edit in `index.html`, or the browser serves the cached file.
- The Toppers section (`#toppers`) is the /v5 newspaper ("The Aspirant's Chronicle"): markup in `index.html`, styles `css/toppers.css`, year switch `js/toppers.js`, data `js/data/toppers-archive.js`.
- The "How it works" and results sections near the end of `index.html` sit inside `<div id="parked" hidden>`; they are not shown.
