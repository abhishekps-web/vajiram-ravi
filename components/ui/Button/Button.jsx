// The site's one button. Every button and button-styled link on the page is this component (or, for markup a behaviour
// builds in the browser, buttonHTML() from ./button-core.js, which renders the same markup).
// Styles: public/css/buttons.css (tokens, variants, sizes, states). Full reference: ./README.md.
//
//   <Button href="#contact" iconEnd="arrow">Talk to a counsellor</Button>
//   <Button variant="secondary" onDark size="xl" href="#courses" iconEnd="arrow">Explore our courses</Button>
//   <Button type="submit" fullWidth iconEnd="arrow" loading={busy} loadingLabel="Sending…">Book a free session</Button>
//   <Button variant="secondary" iconOnly iconStart="close" label="Close" />
//
// Renders <a> when `href` is set, otherwise <button type="button">. Static server component: behaviours change its state
// in the browser with setButtonLoading / setButtonDisabled (./button-core.js).
import { resolve, isIconName, isSwapIcon } from './button-core';

const PATHS = {
  arrow: <><path d="M2.5 8h11" /><path d="M8.6 3.6C9.4 5.9 11.2 7.4 13.5 8 11.2 8.6 9.4 10.1 8.6 12.4" /></>,
  close: <><path d="M3.5 3.5l9 9" /><path d="M12.5 3.5l-9 9" /></>,
  chevron: <path d="M4 6l4 4 4-4" />,
};
PATHS['arrow-left'] = PATHS.arrow;

function Svg({ name }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {PATHS[name]}
    </svg>
  );
}

function Icon({ icon, slot }) {
  if (icon == null || icon === false) return null;
  if (isIconName(icon)) {
    const swap = isSwapIcon(icon);
    const cls = `btn__icon btn__icon--${slot}${swap ? ' btn__icon--swap' : ''}${icon === 'arrow-left' ? ' btn__icon--flip' : ''}`;
    return <span className={cls} aria-hidden="true"><Svg name={icon} />{swap && <Svg name={icon} />}</span>;
  }
  return <span className={`btn__icon btn__icon--${slot}`} aria-hidden="true">{icon}</span>;   // a custom icon node
}

export default function Button({
  variant = 'primary', size = 'md', label, children, iconStart, iconEnd, iconOnly = false, onDark = false,
  disabled = false, loading = false, loadingLabel, fullWidth = false, selected,
  type = 'button', href, target, rel, ariaLabel, className, labelId, ...rest
}) {
  const r = resolve({ variant, size, iconStart, iconEnd, iconOnly, onDark, fullWidth, loading, loadingLabel, disabled, selected, className });
  const text = r.busyLabel ?? children ?? label;
  const a11yLabel = ariaLabel ?? (iconOnly ? (label ?? (typeof children === 'string' ? children : undefined)) : undefined);
  const state = {
    'aria-label': a11yLabel,
    'aria-busy': r.busy || undefined,
    'data-busy-label': r.busyLabel ? '' : undefined,
    'aria-pressed': selected == null ? undefined : !!selected,
  };

  const inner = iconOnly ? (
    <Icon icon={iconStart ?? iconEnd} slot="only" />
  ) : (
    <>
      <Icon icon={iconStart} slot="start" />
      <span className="btn__label">
        <span className="btn__t" id={labelId}>{text}</span>
        {r.roll && <span className="btn__t" aria-hidden="true">{text}</span>}
      </span>
      {r.disc
        ? <span className="btn__disc" aria-hidden="true"><Svg name="arrow" /><Svg name="arrow" /><span className="btn__spin" /></span>
        : <Icon icon={iconEnd} slot="end" />}
    </>
  );
  const spin = r.disc ? null : <span className="btn__spin" aria-hidden="true" />;

  if (href != null) {
    // a link that is off has no href (it cannot navigate), keeps its link role and leaves the tab order
    const link = r.off
      ? { 'aria-disabled': true, tabIndex: -1, role: 'link' }
      : { href, target, rel: rel ?? (target === '_blank' ? 'noopener' : undefined) };
    return <a className={r.className} {...link} {...state} {...rest}>{inner}{spin}</a>;
  }
  return <button className={r.className} type={type} disabled={r.off} {...state} {...rest}>{inner}{spin}</button>;
}
