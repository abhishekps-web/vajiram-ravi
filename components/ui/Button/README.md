# Button system

The site's one button. Every button and button-styled link on the page is rendered by this system, with no exceptions
outside the list in "Not buttons" below.

| File | What it is |
|---|---|
| `components/ui/Button/Button.jsx` | `<Button>`: the React component (static server component) |
| `components/ui/Button/button-core.js` | `buttonHTML()` for markup that behaviour modules build in the browser; `setButtonLoading`, `setButtonDisabled`, `setButtonLabel` for runtime state; the shared class/shape resolver both renderers use |
| `public/css/buttons.css` | tokens, base, sizes, variants, states: the only place a button's look is defined |

`buttons.css` is linked **before** the base cascade (`app/layout.jsx`), at class specificity, so a section's own rule
(margin, position, display, width) always wins over the system. Sections **place** buttons; they never restyle them. When
a context really needs a different look (WhatsApp's green, the orange hover card in Free resources, the raised ticket key in
Batches), it overrides the button's **tokens** (`--btn-bg`, `--btn-fg`, `--btn-shadow` …), never the properties.

## Usage

```jsx
import Button from '@/components/ui/Button/Button';

<Button href="#contact" iconEnd="arrow">Talk to a counsellor</Button>                          // primary CTA (link)
<Button variant="secondary" href="#courses" iconEnd="arrow">Find your course</Button>          // ink pill
<Button onDark size="xl" href="#courses" iconEnd="arrow">Explore our courses</Button>          // on a photo / orange ground
<Button variant="outline" size="sm" iconEnd="chevron" aria-expanded="false">Show all</Button>  // a <button>
<Button variant="link" href="tel:+918062206330" iconEnd="arrow">Call us</Button>              // serif text link
<Button type="submit" fullWidth iconEnd="arrow">Book a free session</Button>                  // form submit
<Button variant="secondary" size="sm" iconOnly iconStart="close" label="Close" />             // icon button
<Button variant="fab" href="https://wa.me/…" iconStart={<svg …/>}>Chat on WhatsApp</Button>   // floating action
```

In a behaviour module (markup built in the browser):

```js
import { buttonHTML, setButtonLoading } from '@/components/ui/Button/button-core';

card.innerHTML = buttonHTML({ href: '#contact', label: 'Enroll now', iconEnd: 'arrow', fullWidth: true, attrs: { 'data-prog': name } });
setButtonLoading(form.querySelector('#formBtn'), true, 'Sending…');   // … later: setButtonLoading(btn, false)
```

## Properties

| Prop | Type / values | Default | Notes |
|---|---|---|---|
| `variant` | `primary` `secondary` `outline` `ghost` `link` `destructive` `fab` | `primary` | see Variants |
| `size` | `xs` `sm` `md` `lg` `xl` | `md` | see Sizes |
| `children` / `label` | text | | the visible label. `label` doubles as the accessible name of an icon-only button |
| `iconStart` | icon name or node | | leading icon |
| `iconEnd` | icon name or node | | trailing icon. `'arrow'` on primary / secondary / outline / destructive renders the round **arrow disc** (the brand CTA) |
| `iconOnly` | boolean | `false` | circle, one icon (`iconStart` or `iconEnd`); **requires `label` or `ariaLabel`** |
| `onDark` | boolean | `false` | the variant's version for dark, photo and orange grounds |
| `disabled` | boolean | `false` | `<button disabled>`; a link loses its `href`, gets `aria-disabled="true"` and leaves the tab order |
| `loading` | boolean | `false` | `aria-busy="true"`, disabled, spinner; keeps the button's size |
| `loadingLabel` | text | | label shown while loading (otherwise the spinner alone) |
| `fullWidth` | boolean | `false` | fills its container; with the disc, the label centres and a spacer column balances the disc |
| `selected` | boolean | | toggle buttons: sets `aria-pressed` and the selected look |
| `type` | `button` `submit` `reset` | `button` | `<button>` only |
| `href` | URL | | renders `<a>`; omit for `<button>` |
| `target`, `rel` | | | `target="_blank"` gets `rel="noopener"` unless given |
| `ariaLabel` | text | | overrides the accessible name (e.g. "Call us on 080-6220-6330") |
| `className`, `id`, `data-*`, `aria-*` | | | passed through: `className` is for **placement hooks only** |
| `labelId` | id | | id on the label text, if a script must find it (prefer `setButtonLabel`) |

Built-in icon names: `arrow` (the brush-stroke CTA arrow), `arrow-left`, `close`, `chevron`. Each draws in `currentColor`.
`arrow` and `arrow-left` are drawn twice and swap through their box on hover. Any other icon is passed as a node (React) or
an HTML string (`buttonHTML`).

## Variants

Values come from the existing buttons (audit, 2026-11-13); the only new colour is the destructive red.

| Variant | Look | `onDark` | Where it is used |
|---|---|---|---|
| **primary** | brand gradient pill (`#F06A2C → #E85020 → #C2410C`), white text, white disc with a brand arrow; hover deepens to `#D9480F → #A8380A` | white pill, ink text, brand disc; hover sand | Let's talk, FAQ, Toppers, Contact submit, programme books, batch tickets, menus · onDark: hero, GS, Closing's second button |
| **secondary** | ink pill `#161412`, white text, flame disc `#E57512`; hover `#000` | (same) | Closing "Find your course", Why cards, dialog close |
| **outline** | transparent, 1.5px brand edge at 45%, brand text; hover brand edge + 8% brand tint | translucent, white edge, white text | Toppers "Show all" · onDark: intro "Skip" |
| **ghost** | no fill, ink text; hover 8% brand tint, brand text | white text, white tint | (available: quiet / toolbar actions) |
| **link** | Newsreader 600, brand text, arrow; hover: underline draws in, arrow slides 5px, text `--brand-d` | `#FFD48A` | View all batches, Free resources actions, Call us / Email us |
| **destructive** | danger red `#B42318` pill; hover `#8F1D13` | white pill, red text | (available: delete / cancel) |
| **fab** | raised 56px circle (52px on phones), one icon; the label slides out on hover / keyboard focus | | WhatsApp (green through tokens) |
| **icon button** (`iconOnly`) | a circle the size of the button's height, any variant | | Faculty carousel arrows, dialog close |

## Sizes

All from existing buttons. Every size is a pill (`border-radius: 999px`); icon-only is a circle.

| Size | Height | Padding-x | Disc-side padding | Font | Gap | Disc | Disc arrow | Bare icon |
|---|---|---|---|---|---|---|---|---|
| XS | 36px (40px on touch) | 16px | 4px | 14px | 8px | 28px | 13px | 16px |
| SM | 44px | 18px | 4px | 15px | 10px | 36px | 15px | 18px |
| MD | 48px | 22px | 5px | 18px | 14px | 38px | 16px | 20px |
| LG | 54px | 24px | 6px | 17px | 16px | 42px | 18px | 22px |
| XL | 60px (→ LG at ≤900px) | 30px | 7px | 18px | 18px | 46px | 19px | 24px |

Vertical padding is 0: the height is fixed and content is centred, so labels and icons sit on the same line in every size.
Weight 700 for every size (link: 600). The link variant has an auto height (6px vertical padding) and no horizontal padding.

## Typography and visual tokens (`:root` in `buttons.css`)

| Token | Value |
|---|---|
| `--btn-font` / `--btn-font-link` | `var(--f)` (Mukta) / `var(--f-d)` (Newsreader) |
| `--btn-weight` / `--btn-weight-link` | 700 / 600 |
| `--btn-lh` | 1.25 |
| `--btn-ls` | .005em |
| `--btn-case` | none (sentence case) |
| `--btn-radius` | 999px |
| `--btn-ring` | `0 0 0 3px #fff, 0 0 0 5.5px #E85020` (focus ring) |
| `--btn-dur` / `--btn-dur-press` / `--btn-dur-roll` | .35s (fill, shadow, colour) / .15s (press) / .5s (label roll, arrow swap) |
| `--btn-roll` / `--btn-pop` | `cubic-bezier(.7, 0, .2, 1)` / `cubic-bezier(.2, .8, .2, 1)` |
| `--btn-disabled-opacity` | .45 |

Per-button tokens a context may override: `--btn-bg`, `--btn-bg-hover`, `--btn-fg`, `--btn-fg-hover`, `--btn-edge`,
`--btn-edge-hover`, `--btn-shadow`, `--btn-shadow-hover`, `--btn-text-shadow`, `--btn-disc-bg`, `--btn-disc-fg`,
`--btn-disc-shadow`, `--btn-ring`, and the size tokens `--btn-h`, `--btn-px`, `--btn-pe`, `--btn-fs`, `--btn-gap`,
`--btn-disc`, `--btn-glyph`, `--btn-ic`.

## States

| State | Visual |
|---|---|
| Default | variant fill, text, edge and shadow |
| Hover (real pointers only) | fill deepens (overlay fades in), shadow lifts, label rolls up to its copy, the disc arrow swaps and the disc grows 6%; link: underline draws, arrow slides 5px |
| Focus (mouse) | no ring |
| Focus-visible (keyboard) | `--btn-ring` (white gap + flame ring) plus the hover fill; link: 2px outline in its colour, 4px offset, underline drawn; FAB: label shown |
| Active / pressed | scale .97 (link: opacity .8) |
| Disabled | opacity .45, flat (no shadow), `cursor: not-allowed`, no hover; links cannot be followed or focused |
| Loading | `aria-busy`, disabled; with a disc the spinner replaces the arrow inside the disc; without one it centres over the button while the label keeps its space (no shift) |
| Loading with label | as Loading, the label swaps to `loadingLabel`; without a disc the spinner stands before it |
| Icon-only | circle, icon centred, accessible name from `label`/`ariaLabel` |
| Selected (`aria-pressed`) | the hover fill held; outline / ghost / link take a brand tint, link keeps its underline |

## Responsive behaviour and touch

- Hover motion only under `(hover: hover) and (pointer: fine)`; touch gets the resting look and the press.
- Touch targets: SM and up are ≥ 44px; XS grows to 40px on coarse pointers; the link variant's hit box is its text plus 6px.
- XL steps down to LG at ≤ 900px. FAB is 52px at ≤ 600px.
- `fullWidth` labels may wrap at ≤ 480px rather than overflow.
- Header "Let's talk" shows the disc alone at ≤ 480px (a placement rule in `v49.css`).

## Accessibility

- Semantic elements: `<button type="button">` for actions, `<a href>` for navigation. Never a `div`.
- Keyboard: native focus and activation; the focus ring is always visible on keyboard focus (`:focus-visible`).
- Icon-only buttons and the FAB always carry an accessible name (`label` / `ariaLabel`); every icon is `aria-hidden`.
- The rolling label's second copy is `aria-hidden`, so names are read once.
- Disabled: `disabled` on buttons; links get `aria-disabled="true"`, no `href`, `tabindex="-1"`.
- Loading: `aria-busy="true"` and disabled while busy (`setButtonLoading`).
- Toggles: `selected` → `aria-pressed`; disclosure buttons pass `aria-expanded` / `aria-controls` through.
- Reduced motion: no roll, swap, lift or press; the spinner slows. Forced colours: a visible edge and outline.

## Placement hooks (`className`)

`talk` (header), `dl__cta` (hero: position and slide-change fade), `vbtn` (programme books: follows the cursor), `inv__reg`
(batch tickets: raised-key shadow), `mega__cta` (menus), `gz__all` (Toppers: chevron turns on expand), `cmp__cta` (Why: scroll
entrance), `sm__act` (Free resources: stretched over the card), `cm__cta` (Visit), `rnav__b` / `cbtn` (Faculty carousel),
`dlg__x` (dialogs), `vrv__skip` (intro), `wa` (WhatsApp: position, entrance, pulse, green). Their rules only place the button
or set its tokens.

## Not buttons

These are other components and keep their own styles: tabs and segmented controls (`#ptabs`, the Toppers filters, the
language switch `.lang__b`), navigation links (`.nav__a`, mega-menu links, `.mega__all`), the menu toggle (`.nav__burger`,
whose icon morphs into a cross), carousel progress bars and dots (`#dlProg`, `.rnav__dots`), selectable cards (`.gz__pick`,
`.sm__mini`), accordion triggers, and the hidden `#parked` section.

## Extending

- A new colourway that is a real new meaning → a new variant block in `buttons.css` (set the tokens only) and add it to
  `VARIANTS` in `button-core.js`. A one-off context look → override tokens in the section's placement rule.
- A new icon → add its paths to `PATHS` in both `button-core.js` and `Button.jsx`.
- Never restate `height`, `padding`, `font`, `background`, `border-radius` or `box-shadow` on a button in a section stylesheet.
