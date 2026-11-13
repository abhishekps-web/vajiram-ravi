---
name: site-motion
description: Animation rules for the Vajiram & Ravi site. The client wants every section and every element animated. Use this on EVERY change to app/, components/, lib/ or public/css/ (new section, new element, restyle, copy or layout edit, ported section): give each section an entrance, each element a reveal, each interactive element a hover/focus state, keep the site's motion tokens and primitives, respect reduced motion, and verify in headless Chrome before reporting.
---

# Site motion: every section, every element

The client requirement: **nothing on this site appears or responds without motion.** Every section has an entrance, every element inside it is revealed, and everything a person can point at answers the pointer. Apply this to whatever the current task touches, then run the audit below.

> The site is a Next.js app: each section is a folder in `components/sections/<Section>/` (markup, `data.js`, behaviour modules), composed in `app/page.jsx`; site-wide motion is in `lib/motion/` and runs in the order set by `lib/behaviour.js`. Paths below: `css/…` is `public/css/…`; `js/content.js` is now split into the section behaviour modules, `js/page-motion.js` and `js/scroll.js` are `lib/motion/`, and `js/toppers.js` is `components/sections/Toppers/toppers.js`.

## 1. The checklist (apply to everything you add or change)

| What | Required motion | Use |
|---|---|---|
| Section | Entrance as it scrolls in, and the scroll-focus fade | `.fx` (add the section id to the `MAP` in `js/page-motion.js`), or the `#toppers`-style `--f` cover if it slides over the previous section |
| Heading / kicker / paragraph / button row | Reveal on scroll, staggered top to bottom | `.rv` + `style="--d:.05s"`, `.15s`, `.25s` … |
| Grid / list of cards | Children rise in one by one | `.rise` on the grid (children get `--i`), or add the grid selector to the `.rise` list in `js/content.js` |
| Image / photo | Hover: eases in (`scale(1.04–1.06)` over .7s `--ease`), inside an `overflow: hidden` frame | see the topper cards in `css/toppers.css` (end of file) |
| Card | Hover: one accent (rule sweep, lift ≤ 6px, or seal/icon turn), never more than two effects | topper cards: brand bar sweeps along the caption rule |
| Button / CTA | Rolling label + arrow swap, hover/focus/press states | `<Button>` / `buttonHTML()` (`components/ui/Button`, styles `public/css/buttons.css`) render all of it; never hand-build button markup or styles |
| Link / tab / chip | Hover + `:focus-visible` state (colour or underline draw), 0.2–0.3s | `.rs-yr-chips button`, `.rs-np-nav a` |
| Content rendered later by JS (tabs, year views, dialogs) | Same reveals; `.rv` is collected once at load (`js/scroll.js`), so add `.in` yourself or animate with a class toggled after insert | |
| Counters / numbers | Count up or rise when first in view (optional, for stat blocks) | |

## 2. Motion tokens: use these, do not invent new curves

- `--ease: cubic-bezier(.2, .7, .2, 1)`: default for reveals and hovers (defined in `css/v25.css`)
- `--spring: cubic-bezier(.34, 1.4, .5, 1)`: playful overshoot, sparingly (cards settling)
- Roll/sweep: `cubic-bezier(.7, 0, .2, 1)` (button label roll, rule sweeps)
- Durations: hover .25–.5s · reveal .6–.9s · stagger 60–110ms per item · nothing over 1.2s except the hero
- Distances: reveal `translateY(18px)`; hover lift ≤ 6px; image zoom ≤ 1.06
- Colour of motion accents: brand `--brand` (#C2410C) on light grounds, `#FFD48A` on dark grounds

## 3. Rules that always apply

1. **Reduced motion:** every animation must have a `@media (prefers-reduced-motion: reduce)` off-switch (content fully visible, no transforms). Existing primitives already do; new CSS must too.
2. **Hover only for real pointers:** wrap hover motion in `@media (hover: hover) and (pointer: fine)`; touch gets the end state on tap or nothing.
3. **Compositor-only:** animate `transform` and `opacity` (and `filter` on images). Never animate `width/height/top/left/margin` or box-shadow on many elements.
4. **No layout shift, no hidden content without JS:** reveal styles only hide content when the reveal JS runs (`.js` on `<html>` or the IntersectionObserver path), so the page is readable if a script fails.
5. **Subtle beats busy:** one entrance per element, one or two hover effects per card. If the client says "over animated", reduce distance and duration before removing.
6. **Preview on the dev server:** run `npm run dev` and check http://localhost:3000 (the motion check targets it by default). Files in `public/` are served uncached in dev, so no `?v=` cache-busting is needed.

## 4. Audit + verify before reporting (every run)

1. **Audit what the task touched**: list each section/element you added or changed against the checklist in §1 and fix gaps. Mention any remaining unanimated element in your report rather than staying silent.
2. **Run the motion check** (headless Chrome over the DevTools protocol; no packages needed):

   ```
   node .claude/skills/site-motion/scripts/motion-check.js "#toppers" --hover ".rs-np-card" --out <scratchpad>/check
   ```
   It skips the intro, scrolls the section into view, and reports:
   - console errors (must be empty)
   - elements in the section with no transition/animation (`static:` list), so you can review them against §1
   - with `--hover <selector>`: forces `:hover` on the first match and prints the computed `transform` before/after (must change)
   - writes `<out>.png` (section) and `<out>-hover.png` (forced hover); look at both.
   Add `--width 390 --height 844 --mobile` for the phone layout.
3. Report what moves, what you verified, and anything you could not verify (real pointer feel, timing). Do not claim an animation works from code alone.
