# Vajiram & Ravi site

Static site (no build step): `index.html` + `css/` + `js/` + `assets/`, deployed to Vercel from `main`. `index.html` is the page; Vercel serves it at `/`.

## Every change: apply the `site-motion` skill

The client wants **every section and every element animated**. For any change to `index.html`, `css/` or `js/`, use the `site-motion` skill (`.claude/skills/site-motion/SKILL.md`): give new or changed sections an entrance, elements a reveal, interactive elements a hover/focus state, using the site's existing primitives and motion tokens. Then run its check (`node .claude/skills/site-motion/scripts/motion-check.js "<section selector>" --hover "<card selector>"`) and report what was verified.

## Working notes

- The user previews `index.html` straight from disk (file://), so bump the `?v=` query on any CSS/JS link you edit in `index.html`, or the browser serves the cached file.
- The Toppers section (`#toppers`) is the /v5 newspaper ("The Aspirant's Chronicle"): markup in `index.html`, styles `css/np-toppers.css`, year switch `js/np-toppers.js`, data `js/np-archive.js`.
