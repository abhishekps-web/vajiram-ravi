'use client';
// The one carousel engine every hero banner type uses (/hero-banners). It keeps the current slide and the one just left (so CSS
// can animate both), and plays the slides on the timer bar's own CSS animation: when the bar fills (animationend) the next slide
// comes, so the bar and the timing never disagree, and pausing is the bar's animation-play-state. It holds while the pointer is
// over the banner, focus is inside it, or the banner is off screen; reduced motion stops the bar's animation and so the autoplay.
// Arrow keys and a horizontal swipe change slides too. Styles: public/css/hero-banners.css.
import { useCallback, useEffect, useRef, useState } from 'react';
import Button from '@/components/ui/Button/Button';

export function useCarousel(n, { interval = 6000 } = {}) {
  const [s, setS] = useState({ i: 0, prev: -1, dir: 1 });
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [seen, setSeen] = useState(false);
  const ref = useRef(null);
  const x0 = useRef(null);

  const go = useCallback((k, dir) => setS(c => {
    const i = ((k % n) + n) % n;
    if (i === c.i) return c;
    return { i, prev: c.i, dir: dir ?? (i > c.i ? 1 : -1) };
  }), [n]);
  const next = useCallback(() => setS(c => ({ i: (c.i + 1) % n, prev: c.i, dir: 1 })), [n]);
  const prev = useCallback(() => setS(c => ({ i: (c.i - 1 + n) % n, prev: c.i, dir: -1 })), [n]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) { setSeen(true); return; }
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const playing = seen && !hover && !focus;
  const bind = {
    ref,
    'data-dir': s.dir,
    'data-playing': playing ? 'true' : 'false',
    style: { '--hb-int': `${interval}ms` },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onFocus: () => setFocus(true),
    onBlur: e => { if (!e.currentTarget.contains(e.relatedTarget)) setFocus(false); },
    onKeyDown: e => {
      if (e.target.closest('input, textarea, select')) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    },
    onPointerDown: e => { if (e.pointerType !== 'mouse') x0.current = e.clientX; },
    onPointerUp: e => {
      if (x0.current == null) return;
      const dx = e.clientX - x0.current; x0.current = null;
      if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    },
  };
  /** a slide's state for CSS: on (current), out (just left), before / after the current one */
  const pos = k => (k === s.i ? 'on' : k === s.prev ? 'out' : k < s.i ? 'before' : 'after');
  return { ...s, n, go, next, prev, playing, bind, pos };
}

/** The timer: an invisible bar whose fill drives the autoplay (see above). Keyed by the slide so it restarts on each change. */
export function Timer({ c }) {
  return <span key={c.i} className="hb-timer" aria-hidden="true" onAnimationEnd={c.next} />;
}

/** Previous / next arrows (the site's icon buttons). */
export function Arrows({ c, onDark = false, className = '' }) {
  return (
    <div className={`hb-arrows ${className}`}>
      <Button variant="outline" onDark={onDark} size="sm" iconOnly iconStart="arrow-left" label="Previous slide" onClick={c.prev} />
      <Button variant="outline" onDark={onDark} size="sm" iconOnly iconStart="arrow" label="Next slide" onClick={c.next} />
    </div>
  );
}

/** Indicators: dots, or progress bars that fill over each slide's time (labels optional, shown as tabs). */
export function Indicators({ c, labels, kind = 'bars', onDark = false, className = '' }) {
  return (
    <div className={`hb-ind hb-ind--${kind} ${onDark ? 'hb-ind--dark' : ''} ${className}`} role="tablist" aria-label="Slides">
      {Array.from({ length: c.n }, (_, k) => (
        <button
          key={k}
          type="button"
          role="tab"
          aria-selected={k === c.i}
          aria-label={labels ? undefined : `Slide ${k + 1} of ${c.n}`}
          className="hb-ind__b"
          data-pos={k === c.i ? 'on' : k < c.i ? 'done' : 'todo'}
          onClick={() => c.go(k)}
        >
          {labels && <span className="hb-ind__t">{labels[k]}</span>}
          <span className="hb-ind__bar"><i key={k === c.i ? `on${c.i}` : 'off'} /></span>
        </button>
      ))}
    </div>
  );
}
