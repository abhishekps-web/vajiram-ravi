// The site's carousel indicator, one component for every carousel (user 2026-11-17, "unify all dots as components"): the hero, the
// promo banner, the Faculty ring, Free resources and the Contact us photos. Styles: the .cdots block at the end of
// public/css/v49.css (9px hollow rings, the current one a filled 32px pill whose fill shows the slide's progress).
//
//   <CarouselDots label="Choose a banner" labels={['Show banner 1', …]} active={i} onSelect={go} timed />
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
/**
 * @param {{ labels: string[], label?: string, active?: number, onSelect?: (index: number) => void, tone?: 'dark' | 'light',
 *   timed?: boolean, duration?: string, fillRef?: any, fillProps?: (index: number, current: boolean) => Record<string, any>,
 *   activeClass?: string, controls?: string, as?: 'div' | 'p', id?: string, className?: string }} props
 */
export default function CarouselDots({
  labels, label, active, onSelect, tone = 'dark', timed = false, duration, fillRef, fillProps, activeClass, controls,
  as: Tag = 'div', id, className,
}) {
  const cls = ['cdots', tone === 'light' && 'cdots--light', timed && 'cdots--timed', className].filter(Boolean).join(' ');
  return (
    <Tag id={id} className={cls} role="group" aria-label={label} style={duration ? { '--cd-t': duration } : undefined}>
      {labels.map((name, i) => {
        const on = i === active;
        const { key: fillKey, ...fill } = (fillProps && fillProps(i, on)) || {};   // a fill's key (to restart its fill) is set apart
        return (
          <button key={i} type="button" aria-label={name} aria-controls={controls} aria-current={on ? 'true' : undefined}
            className={on && activeClass ? activeClass : undefined} onClick={onSelect ? () => onSelect(i) : undefined}>
            <i key={fillKey} aria-hidden="true" ref={on ? fillRef : undefined} {...fill} />
          </button>
        );
      })}
    </Tag>
  );
}
