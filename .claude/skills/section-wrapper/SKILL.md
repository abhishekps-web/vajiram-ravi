---
name: section-wrapper
description: Wrap every section of the Vajiram & Ravi site in the shared SectionWrapper (components/ui/section_wrapper.jsx). Use this by default on EVERY new section, every section ported from another branch, and any section whose outer <section> markup, padding or heading spacing is touched: the outer element must be <SectionWrapper>, never a hand-written <section> with its own padding.
---

# Every section is a SectionWrapper

`components/ui/section_wrapper.jsx` is the one outer shell for a homepage section. It renders the `<section>` and gives it:

- the site's vertical rhythm, `--sec-y` above and below, so no section sets its own padding;
- the side gutter, `--px`, so content lines up with the 1440px column;
- the heading spacing: eyebrow to heading `--hd-lbl`, heading to intro `--hd-in`, and heading block to content `--hd-gap` for the shared blocks it knows (`.qas`, `.cm`, `.sm__grid`).

A section that writes its own `<section className="... pt-[..] px-[..]">` drifts from that rhythm the moment the tokens change. So every section uses the wrapper.

## The rule

1. The outermost element of a section component is `<SectionWrapper>`. Never `<section>` directly, and never a `<div>` pretending to be one.
2. Pass the section's `id` and `labelledBy` (the id of its `h2`). Keep existing ids: CSS, the nav and behaviours look them up.
3. Do not add padding to the section itself: no `pt-*`, `pb-*`, `px-*` or `padding` in its `className` or in a stylesheet. Pick a prop instead.
4. Grounds and section-level classes (`band`, `dots`, `sheet`, a background utility) go in `className`; they are kept.

```jsx
import SectionWrapper from '@/components/ui/section_wrapper';

export default function Example() {
  return (
    <SectionWrapper id="example" labelledBy="exH" compact>
      <SectionLabel>Eyebrow</SectionLabel>
      <h2 id="exH" className="h2 h2--sec rv">Heading.</h2>
      <p className="intro rv">Intro line.</p>
      <div className="cu:mt-(--hd-gap)">…content…</div>
    </SectionWrapper>
  );
}
```

## The props: choose one size, add bleed if needed

| Prop | Top / bottom padding | Use for |
|---|---|---|
| (none) | `--sec-y` / `--sec-y` | a standard section |
| `compact` | 65% / 65% | most homepage sections (the page is meant to be short) |
| `tight` | 50% / full | a light section that follows another light one |
| `half` | 33% / 33% | a small, single-card section (Contact us) |
| `noBottom` | – / 0 | a section that runs straight into the next |
| `bleed` | sides 0 | content that must reach the screen edges (full-width art). Not for carousels: keep rails inside the gutter and put their arrows in it, as Batches and Topper talks do (`inset-x-[calc(var(--px)*-1)]`). |

Any other prop (`style`, `data-*`, `aria-*`) passes through to the `<section>`.

## Content inside the wrapper

- Heading block → content: `cu:mt-(--hd-gap)` (or a smaller fixed gap only when the user asks for one).
- Eyebrows are `<SectionLabel>`, headings `.h2.h2--sec`, intros `.intro`: the wrapper's spacing rules target those classes.
- Inner wrappers should not add side padding (`px-(--px)`): the wrapper already applies it.

## When you touch an existing section

If it still renders its own `<section>`, convert it: move `id`, `aria-labelledby` (→ `labelledBy`) and its non-padding classes onto `<SectionWrapper>`, delete its padding (in the className and in `public/css`), pick the prop that matches the old spacing, then screenshot it before and after to confirm the rhythm.

## Check before reporting

- `grep -n "<section" components/sections/<File>` shows nothing for the file you touched (only `section_wrapper.jsx` renders one).
- With `npm run dev` running, screenshot the section at 1440px and 390px: the top and bottom space match its neighbours, and its content lines up with the column edges.
- Then run the `site-motion` check as usual.
