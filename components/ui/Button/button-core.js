// The button system's shared core: class names, the built-in icons and the HTML-string renderer.
// One source for both renderers of the same markup:
//   - <Button> (components/ui/Button/Button.jsx) for server-rendered markup
//   - buttonHTML() below for markup that behaviour modules build in the browser (programme cards, batch tickets, menus …)
// Styles: public/css/buttons.css. Documentation: components/ui/Button/README.md.
// Plain JS with no browser globals at import time, so server components and behaviours can both import it.

export const VARIANTS = ['primary', 'secondary', 'outline', 'ghost', 'link', 'destructive', 'fab'];
export const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'];

// Variants that roll their label up to a second copy on hover (the site's CTA motion). Link and FAB keep one copy.
const ROLLS = new Set(['primary', 'secondary', 'outline', 'ghost', 'destructive']);
// Variants whose 'arrow' icon sits in the round disc (the brand CTA). Elsewhere 'arrow' is a bare glyph.
const DISC = new Set(['primary', 'secondary', 'outline', 'destructive']);

// Built-in icons, by name. Each is drawn in currentColor, so it takes the variant's colours.
// arrow: the brush-stroke arrow of every CTA; arrow-left: the same, mirrored; close: the dialog cross; chevron: the expand caret.
const PATHS = {
  arrow: '<path d="M2.5 8h11"/><path d="M8.6 3.6C9.4 5.9 11.2 7.4 13.5 8 11.2 8.6 9.4 10.1 8.6 12.4"/>',
  close: '<path d="M3.5 3.5l9 9"/><path d="M12.5 3.5l-9 9"/>',
  chevron: '<path d="M4 6l4 4 4-4"/>',
};
PATHS['arrow-left'] = PATHS.arrow;
export const ICONS = Object.keys(PATHS);
export const isIconName = v => typeof v === 'string' && Object.prototype.hasOwnProperty.call(PATHS, v);
export const iconSVG = name => `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${PATHS[name]}</svg>`;
// the arrow icons swap through their box on hover (one copy slides out as the other slides in), so they are drawn twice
export const isSwapIcon = name => name === 'arrow' || name === 'arrow-left';

/**
 * The resolved shape of a button: which parts it renders. Both renderers use this, so they cannot drift apart.
 */
export function resolve({ variant = 'primary', size = 'md', iconStart, iconEnd, iconOnly = false, onDark = false, fullWidth = false,
  loading = false, loadingLabel, disabled = false, selected, className = '' } = {}) {
  if (!VARIANTS.includes(variant)) variant = 'primary';
  if (!SIZES.includes(size)) size = 'md';
  const fab = variant === 'fab';
  // the trailing 'arrow' sits in the disc on the pill variants (not on icon-only buttons, whose one icon is the whole button)
  const disc = !iconOnly && !fab && DISC.has(variant) && iconEnd === 'arrow';
  const cls = ['btn', `btn--${variant}`, `btn--${size}`];
  if (iconOnly) cls.push('btn--icon');
  if (disc) cls.push('btn--disc');
  if (onDark) cls.push('btn--on-dark');
  if (fullWidth) cls.push('btn--full');
  if (selected) cls.push('is-selected');
  if (className) cls.push(className);
  return {
    variant, size, disc, fab,
    roll: ROLLS.has(variant) && !iconOnly,
    className: cls.join(' '),
    busy: !!loading, busyLabel: loading && loadingLabel ? loadingLabel : null,
    off: !!disabled || !!loading,
  };
}

/** Class string only (for markup that cannot use the renderers). */
export const buttonClass = opts => resolve(opts).className;

const escHTML = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const iconHTML = (v, slot) => {
  if (v == null || v === false) return '';
  if (isIconName(v)) {
    const svg = iconSVG(v);
    const swap = isSwapIcon(v);
    return `<span class="btn__icon btn__icon--${slot}${swap ? ' btn__icon--swap' : ''}${v === 'arrow-left' ? ' btn__icon--flip' : ''}" aria-hidden="true">${swap ? svg + svg : svg}</span>`;
  }
  return `<span class="btn__icon btn__icon--${slot}" aria-hidden="true">${v}</span>`;   // custom icon: an HTML string
};

/**
 * The button as an HTML string, for behaviour modules. Same props as <Button>, except that icons are an icon name
 * ('arrow', 'arrow-left', 'close', 'chevron') or an HTML string, and extra attributes go in `attrs` ({ 'data-prog': … }).
 * The label is escaped; `labelHTML` takes trusted markup instead.
 */
export function buttonHTML(opts = {}) {
  const { href, type = 'button', label = '', labelHTML, iconStart, iconEnd, iconOnly = false, ariaLabel, target, rel, id, attrs = {} } = opts;
  const r = resolve(opts);
  const text = labelHTML ?? escHTML(r.busyLabel ?? label);
  const a = [`class="${escHTML(r.className)}"`];
  const tag = href != null ? 'a' : 'button';
  if (tag === 'a') {
    if (!r.off) a.push(`href="${escHTML(href)}"`); else a.push('aria-disabled="true"', 'tabindex="-1"', 'role="link"');
    if (target) a.push(`target="${escHTML(target)}"`);
    if (rel || target === '_blank') a.push(`rel="${escHTML(rel || 'noopener')}"`);
  } else {
    a.push(`type="${escHTML(type)}"`);
    if (r.off) a.push('disabled');
  }
  if (id) a.push(`id="${escHTML(id)}"`);
  if (ariaLabel || iconOnly) a.push(`aria-label="${escHTML(ariaLabel || label)}"`);
  if (r.busy) a.push('aria-busy="true"');
  if (r.busyLabel) a.push(`data-busy-label=""`);
  if (opts.selected != null) a.push(`aria-pressed="${opts.selected ? 'true' : 'false'}"`);
  Object.entries(attrs).forEach(([k, v]) => { if (v != null && v !== false) a.push(v === true ? k : `${k}="${escHTML(v)}"`); });

  let inner = '';
  if (iconOnly) {
    inner = iconHTML(iconStart ?? iconEnd, 'only');
  } else {
    inner += iconHTML(iconStart, 'start');
    inner += r.roll
      ? `<span class="btn__label"><span class="btn__t">${text}</span><span class="btn__t" aria-hidden="true">${text}</span></span>`
      : `<span class="btn__label"><span class="btn__t">${text}</span></span>`;
    if (r.disc) inner += `<span class="btn__disc" aria-hidden="true">${iconSVG('arrow')}${iconSVG('arrow')}<span class="btn__spin"></span></span>`;
    else inner += iconHTML(iconEnd, 'end');
  }
  if (!r.disc) inner += '<span class="btn__spin" aria-hidden="true"></span>';
  return `<${tag} ${a.join(' ')}>${inner}</${tag}>`;
}

/**
 * Runtime state for a rendered button (either renderer). Use instead of toggling attributes by hand.
 *   setButtonLoading(el, true, 'Sending…')   busy, label swapped to the loading label (omit it to keep the label and show the spinner alone)
 *   setButtonLoading(el, false)               back to the label it had
 */
export function setButtonLoading(el, on, loadingLabel) {
  if (!el) return;
  const ts = [...el.querySelectorAll('.btn__t')];
  if (on) {
    if (el.dataset.label == null) el.dataset.label = ts[0] ? ts[0].textContent : '';
    el.setAttribute('aria-busy', 'true');
    if (loadingLabel) { el.setAttribute('data-busy-label', ''); ts.forEach(t => { t.textContent = loadingLabel; }); }
    else el.removeAttribute('data-busy-label');
    setButtonDisabled(el, true);
  } else {
    el.removeAttribute('aria-busy'); el.removeAttribute('data-busy-label');
    if (el.dataset.label != null) { ts.forEach(t => { t.textContent = el.dataset.label; }); delete el.dataset.label; }
    setButtonDisabled(el, false);
  }
}

/** Disable / enable: `disabled` on a <button>; on a link, aria-disabled and out of the tab order (CSS blocks the pointer). */
export function setButtonDisabled(el, off) {
  if (!el) return;
  if (el.tagName === 'BUTTON') { el.disabled = !!off; return; }
  if (off) { el.setAttribute('aria-disabled', 'true'); el.setAttribute('tabindex', '-1'); }
  else { el.removeAttribute('aria-disabled'); el.removeAttribute('tabindex'); }
}

/** Rewrite a rendered button's label (both copies of a rolling label). */
export function setButtonLabel(el, text) {
  if (!el) return;
  el.querySelectorAll('.btn__t').forEach(t => { t.textContent = text; });
  if (el.dataset.label != null) el.dataset.label = text;   // a busy button returns to the new label
}
