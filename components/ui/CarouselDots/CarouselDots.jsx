// The site's carousel indicator, one component for every carousel (user 2026-11-17, "unify all dots as components"): the hero, the
// promo banner, the Faculty ring, Free resources and the Contact us photos. Tailwind (user 2026-11-17, "convert that component to a
// single file using Tailwind"): every style is a `cd:` utility below; carousel-dots.css only sets Tailwind up for this folder.
//
//   <CarouselDots label="Choose a banner" labels={['Show banner 1', …]} active={i} onSelect={go} timed />
//
// Look: 6px dots in a strong colour (white on photos and dark grounds, brand orange on light ones); the current one is a 32px pill of
// the SAME 6px height (user 2026-11-17, "the height of the dot should be the same for active and default"), whose fill (<i>) shows
// how far that slide has run. Each dot sits in an 8px transparent border, so its
// tap target is 22px across; the negative block margin keeps the row 6px tall.
// States: default (a 6px dot), hover/focus (the dot grows to about 10px across and tall), current (the 32 x 6px progress pill: a pale
// track, filled from the left in the full colour as the slide runs).
// The fill is driven by each carousel: --p (0..1) on the dot (the hero, page-motion.js), a timed CSS fill (`timed`, `duration` long;
// its animationend moves the carousel on; paused under an .is-paused ancestor), or an inline transform (the Faculty clock). Without a
// driver the current pill is full. Scripts mark the current dot with aria-current="true"; the styles follow that attribute.
//
// Props
//   labels      one accessible name per dot (its length is the number of dots)
//   label       the group's accessible name
//   active      the current dot's index (leave it out when a behaviour script marks the current dot in the browser)
//   onSelect    called with a dot's index when it is chosen (client components); script-driven rows bind their own clicks
//   tone        'dark' (white, on photos and dark grounds; the default) or 'light' (brand orange, on light grounds)
//   timed       the current dot fills over `duration` by itself (a CSS animation; its animationend moves the carousel on)
//   duration    the timed fill's length, e.g. '5s' (default 6s)
//   fillRef     a ref to the current dot's fill, for a carousel whose clock sets the fill itself (the Faculty ring)
//   fillProps   (index, isCurrent) => extra props for a dot's fill element (key, style, onAnimationEnd …)
//   activeClass a class also put on the current dot (the Contact us gallery's script looks for .is-on)
//   controls    the id of the element the dots change (aria-controls)
//   as          the element of the row: 'div' (default) or 'p'
// A plain component (no hooks): it renders in server components and, with onSelect, inside client ones.
import './carousel-dots.css';

const ROW = 'cd:flex cd:items-center cd:gap-[0] cd:m-[0]';
const DARK = 'cd:[--dot-edge:rgba(255,255,255,.9)] cd:[--dot-track:rgba(255,255,255,.4)] cd:[--dot-fill:#fff] cd:[--dot-ring:#FFD48A]';
const LIGHT = 'cd:[--dot-edge:rgba(194,65,12,.8)] cd:[--dot-track:rgba(194,65,12,.3)] cd:[--dot-fill:var(--brand)] cd:[--dot-ring:var(--brand)]';
const DOT = [
  'cd:relative cd:flex-none cd:box-content cd:w-[6px] cd:h-[6px] cd:my-[-8px] cd:mx-[0] cd:p-[0] cd:overflow-hidden cd:cursor-pointer',
  'cd:border-8 cd:border-solid cd:border-transparent cd:rounded-full cd:bg-clip-padding cd:bg-(--dot-edge)',
  'cd:[transition:width_.35s_cubic-bezier(.65,0,.35,1),scale_.2s_ease,background-color_.2s_ease] cd:motion-reduce:transition-none',
  // hover / keyboard focus on a dot that is not current: it grows in both width and height (scale, so its neighbours do not move)
  'cd:[&:not([aria-current=true]):hover]:[scale:1.6] cd:[&:not([aria-current=true]):focus-visible]:[scale:1.6]',
  'cd:aria-[current=true]:w-[32px] cd:aria-[current=true]:bg-(--dot-track)',
  'cd:focus-visible:outline-2 cd:focus-visible:outline-(--dot-ring) cd:focus-visible:outline-offset-[-5px]',
].join(' ');
// the fill: a square bar the pill clips, growing from its rounded left end; empty on the other dots
const FILL = 'cd:absolute cd:inset-[0] cd:block cd:bg-(--dot-fill) cd:origin-left cd:[transform:scaleX(var(--p,1))] cd:[:not([aria-current=true])>&]:[transform:scaleX(0)]';
const TIMED = [
  'cd:[[aria-current=true]>&]:[transform:scaleX(0)] cd:[[aria-current=true]>&]:animate-[cd-fill_var(--dot-t,6s)_linear_forwards]',
  'cd:[.is-paused_&]:[animation-play-state:paused]',
  'cd:motion-reduce:[[aria-current=true]>&]:animate-none cd:motion-reduce:[[aria-current=true]>&]:[transform:none]',
].join(' ');

/**
 * @param {{ labels: string[], label?: string, active?: number, onSelect?: (index: number) => void, tone?: 'dark' | 'light',
 *   timed?: boolean, duration?: string, fillRef?: any, fillProps?: (index: number, current: boolean) => Record<string, any>,
 *   activeClass?: string, controls?: string, as?: 'div' | 'p', id?: string, className?: string }} props
 */
export default function CarouselDots({
  labels, label, active, onSelect, tone = 'dark', timed = false, duration, fillRef, fillProps, activeClass, controls,
  as: Tag = 'div', id, className,
}) {
  const cls = [ROW, tone === 'light' ? LIGHT : DARK, className].filter(Boolean).join(' ');
  const fillCls = timed ? `${FILL} ${TIMED}` : FILL;
  return (
    <Tag id={id} className={cls} role="group" aria-label={label} style={duration ? { '--dot-t': duration } : undefined}>
      {labels.map((name, i) => {
        const on = i === active;
        const { key: fillKey, ...fill } = (fillProps && fillProps(i, on)) || {};   // a fill's key (to restart its fill) is set apart
        return (
          <button key={i} type="button" aria-label={name} aria-controls={controls} aria-current={on ? 'true' : undefined}
            className={on && activeClass ? `${DOT} ${activeClass}` : DOT} onClick={onSelect ? () => onSelect(i) : undefined}>
            <i key={fillKey} aria-hidden="true" ref={on ? fillRef : undefined} className={fillCls} {...fill} />
          </button>
        );
      })}
    </Tag>
  );
}
