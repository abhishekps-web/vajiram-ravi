'use client';
/**
 * Promo banner (#promo-banner): the carousel under the hero stats (user 2026-11-16, from Kevin's build, eclectic-alfajores-975fab.netlify.app;
 * in Tailwind, markup and behaviour in this one file, user 2026-11-17). Content: PROMO_BANNERS in ../data.js. Tailwind entry: ./promo-banner.css
 * (`pb:` utilities from this folder only).
 *
 * One wide banner at a time, sliding sideways in an endless loop: each banner sits at its place from the one on show, d (-2..2, the
 * shortest way round), so after the last the first comes in from the right like any other; a banner that changes sides out of sight
 * jumps there without sliding. Each banner is a light tint with a faint mandala behind its picture: a label, a headline, one line and
 * the site's primary button; the picture on the right rising a little out of the banner's top (on phones above the type, right
 * aligned). The dots are the site's carousel indicator (.cdots--timed, v49.css): the current one fills over 6 s and its end moves on.
 * It pauses while the pointer is over the banners or the keyboard is in them, while off screen and while the tab is hidden; with
 * reduced motion it does not advance on its own. Previous / next (on the banner's edges, on hover with a mouse; none on phones), the
 * dots, the arrow keys and a sideways swipe change the banner. Only the banner on show can be reached (the others are inert).
 * Kept for code outside this file: the root's `tr` class (the hero's spacing above it, end of v49.css) and `.cdots` (the indicator).
 */
import { useEffect, useRef, useState } from 'react';
import Button from '@/components/ui/Button/Button';
import CarouselDots from '@/components/ui/CarouselDots';
import { PROMO_BANNERS } from '../data';
import './promo-banner.css';

// each banner's tint: the two ends of its background, its ink (headline) and accent (label, mandala)
const TONES = {
  peach:  { a: '#FFF4E8', b: '#FFE1C2', ink: '#8A2A07', acc: '#C2410C' },
  butter: { a: '#FFFAE8', b: '#FCE7A6', ink: '#5A3A08', acc: '#A86A08' },
  sand:   { a: '#FAF3EA', b: '#E8D2B6', ink: '#4A2A12', acc: '#8B5A2B' },
  cream:  { a: '#FFFBEF', b: '#F8E2B0', ink: '#5A3A08', acc: '#A0670F' },
  latte:  { a: '#F8EFE6', b: '#E2C7A9', ink: '#4A2A12', acc: '#855530' },
  honey:  { a: '#FFF7E0', b: '#F7D98C', ink: '#573607', acc: '#9C6107' },
};
const N = PROMO_BANNERS.length;
const place = (k, i) => { let d = ((k - i) % N + N) % N; if (d > N / 2) d -= N; return d; };   // k's place from the one on show

const C = {
  root: 'tr pb:relative pb:mt-16 pb:pb-16 pb:origin-top pb:[scale:calc(1-var(--cover,0)*.06)] pb:motion-reduce:[scale:none]'
    + ' pb:phone:mt-9 pb:phone:pb-12',
  stage: 'pb:group/stage pb:relative pb:flow-root',   // flow-root: the track's -40px top margin (room for the pictures) stays inside
  track: 'pb:flex pb:gap-6 pb:overflow-x-clip pb:overflow-y-visible pb:pt-10 pb:-mt-10 pb:touch-pan-y pb:phone:pt-0 pb:phone:mt-0',
  slide: 'pb:relative pb:flex-[0_0_100%] pb:box-border pb:min-h-[300px] pb:flex pb:items-center pb:rounded-3xl'
    + ' pb:[background:radial-gradient(38%_80%_at_80%_62%,rgba(255,255,255,.7),transparent_70%),linear-gradient(110deg,var(--bg-a)_0%,var(--bg-a)_34%,var(--bg-b)_100%)]'
    + ' pb:shadow-[0_26px_50px_-30px_rgba(60,15,0,.7),inset_0_0_0_1px_rgba(255,255,255,.6)]'
    + ' pb:[translate:calc(var(--tr-o,0)*(100%+24px))_0] pb:[transition:translate_.8s_cubic-bezier(.65,0,.35,1)] pb:motion-reduce:[transition:none]'
    + ' pb:phone:min-h-0 pb:phone:flex-col pb:phone:items-stretch pb:phone:rounded-[20px]',
  orn: 'pb:absolute pb:inset-0 pb:z-0 pb:overflow-hidden pb:rounded-[inherit] pb:pointer-events-none',
  mandala: 'pb:absolute pb:right-[2%] pb:top-1/2 pb:w-[46%] pb:aspect-square pb:-translate-y-1/2 pb:bg-[var(--acc)] pb:opacity-[.12]'
    + ' pb:[-webkit-mask:url(/assets/img/patterns/mandala.svg)_center/contain_no-repeat] pb:[mask:url(/assets/img/patterns/mandala.svg)_center/contain_no-repeat]'
    + ' pb:phone:right-[-8%] pb:phone:top-[-14%] pb:phone:w-[min(70%,340px)] pb:phone:translate-y-0',
  copy: 'pb:relative pb:z-2 pb:flex pb:flex-col pb:items-start pb:w-[58%] pb:box-border pb:py-10 pb:pr-0 pb:pl-[clamp(28px,4vw,64px)]'
    + ' pb:narrow:w-[56%] pb:phone:w-full pb:phone:pt-[18px] pb:phone:px-[22px] pb:phone:pb-[26px]',
  k: 'pb:m-0 pb:mb-3.5 pb:px-3 pb:py-1.5 pb:rounded-full pb:[font:700_12px/1.2_var(--f)] pb:tracking-[.12em] pb:uppercase'
    + ' pb:text-[var(--acc)] pb:bg-[color-mix(in_srgb,var(--acc)_12%,transparent)]',
  h: 'pb:m-0 pb:[font:500_clamp(28px,2.7vw,42px)/1.1_var(--f-title,Georgia),serif] pb:tracking-[-.02em] pb:text-[var(--ink)] pb:text-balance'
    + ' pb:narrow:text-[30px] pb:phone:text-[27px]',
  d: 'pb:mt-3 pb:mb-0 pb:[font:400_18px/1.45_var(--f)] pb:text-[rgba(43,26,16,.82)] pb:text-pretty pb:phone:text-[16px]',
  cta: 'pb:mt-6! pb:phone:mt-[18px]! pb:xs:w-full! pb:xs:justify-between!',
  pic: 'pb:absolute pb:z-1 pb:right-[clamp(24px,5%,80px)] pb:bottom-3.5 pb:w-[36%] pb:h-[calc(100%+26px)] pb:m-0 pb:flex pb:items-end'
    + ' pb:justify-center pb:pointer-events-none pb:narrow:w-[32%] pb:narrow:right-7'
    + ' pb:phone:relative pb:phone:order-first pb:phone:inset-auto pb:phone:w-auto pb:phone:h-[180px] pb:phone:mt-[22px] pb:phone:mx-[22px] pb:phone:mb-0 pb:phone:justify-end',
  img: 'pb:block pb:max-w-full pb:max-h-full pb:w-auto pb:h-auto pb:object-contain'
    + ' pb:[filter:drop-shadow(0_22px_22px_rgba(60,20,6,.32))_drop-shadow(0_4px_6px_rgba(60,20,6,.18))]'
    + ' pb:[transition:translate_.8s_cubic-bezier(.22,1,.36,1)_.25s,rotate_.8s_cubic-bezier(.22,1,.36,1)_.25s] pb:motion-reduce:[transition:none]',
  imgOff: 'pb:translate-y-[18px] pb:rotate-[-3deg] pb:motion-reduce:translate-y-0 pb:motion-reduce:rotate-0',
  nav: 'pb:absolute pb:top-[calc(50%-22px)] pb:z-4 pb:flex pb:[transition:opacity_.3s_ease,translate_.35s_cubic-bezier(.22,1,.36,1)]'
    + ' pb:fine:opacity-0 pb:fine:group-hover/stage:opacity-100 pb:fine:group-hover/stage:translate-x-0'
    + ' pb:fine:group-focus-within/stage:opacity-100 pb:fine:group-focus-within/stage:translate-x-0 pb:phone:hidden',
  prev: 'pb:-left-[22px] pb:narrow:-left-[14px] pb:fine:translate-x-2',
  next: 'pb:-right-[22px] pb:narrow:-right-[14px] pb:fine:-translate-x-2',
  dots: 'pb:justify-center pb:mt-[22px] pb:mb-0 pb:mx-0',
};

export default function PromoBanner() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(false);   // autoplay: on once mounted, unless reduced motion
  const [seen, setSeen] = useState(false);   // on screen
  const [held, setHeld] = useState(false);   // a mouse over the banners
  const [focus, setFocus] = useState(false); // keyboard focus inside
  const [hidden, setHidden] = useState(false);
  const [run, setRun] = useState(0);         // bumps on every change, so the current dot's fill restarts
  const root = useRef(null), stage = useRef(null), prev = useRef(PROMO_BANNERS.map((_, k) => place(k, 0))), swipe = useRef(null);

  const go = n => { setI(((n % N) + N) % N); setRun(r => r + 1); };

  useEffect(() => {
    setAuto(!matchMedia('(prefers-reduced-motion: reduce)').matches);
    const io = new IntersectionObserver(es => setSeen(es[0].isIntersecting), { threshold: .35 });
    io.observe(stage.current);
    const vis = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', vis);
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', vis); };
  }, []);

  // a banner that changes sides out of sight (its place moves by more than one, off screen both times) jumps there without sliding
  const places = PROMO_BANNERS.map((_, k) => place(k, i));
  const jump = places.map((d, k) => Math.abs(d - prev.current[k]) > 1 && d !== 0 && prev.current[k] !== 0);
  useEffect(() => { prev.current = places; });

  const paused = !seen || held || focus || hidden;
  const near = k => seen && Math.abs(places[k]) <= 1;   // once on screen, load the banner on show and the ones either side

  return (
    <div ref={root} className={`${C.root}${auto ? ' is-auto' : ''}${paused ? ' is-paused' : ''}`} id="promo-banner" role="region"
      aria-roledescription="carousel" aria-label="Promotions"
      onFocus={() => setFocus(true)} onBlur={e => { if (!root.current.contains(e.relatedTarget)) setFocus(false); }}>
      <div ref={stage} className={C.stage}
        onKeyDown={e => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { go(i + (e.key === 'ArrowLeft' ? -1 : 1)); e.preventDefault(); } }}
        onPointerEnter={e => { if (e.pointerType === 'mouse') setHeld(true); }} onPointerLeave={() => setHeld(false)}>
        <div className={C.track}
          onTouchStart={e => { const t = e.touches[0]; swipe.current = { x: t.clientX, y: t.clientY }; }}
          onTouchEnd={e => {
            const s = swipe.current; if (!s) return; swipe.current = null;
            const t = e.changedTouches[0], dx = t.clientX - s.x, dy = t.clientY - s.y;
            if (Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy) * 1.3) go(i + (dx < 0 ? 1 : -1));
          }}>
          {PROMO_BANNERS.map((s, k) => {
            const on = k === i, t = TONES[s.tone] || TONES.peach;
            return (
              <div key={s.h} className={C.slide} role="group" aria-roledescription="slide" aria-label={`${k + 1} of ${N}`}
                inert={!on} aria-hidden={on ? undefined : true}
                style={{ '--bg-a': t.a, '--bg-b': t.b, '--ink': t.ink, '--acc': t.acc, '--tr-o': places[k] - k, ...(jump[k] ? { transition: 'none' } : {}) }}>
                <span className={C.orn} aria-hidden="true"><span className={C.mandala} /></span>
                <div className={C.copy}>
                  <p className={C.k}>{s.k}</p>
                  <h2 className={C.h}>{s.h}</h2>
                  <p className={C.d}>{s.d}</p>
                  <Button className={C.cta} href={s.href} iconEnd="arrow" data-prog={s.prog} {...(s.external ? { target: '_blank' } : {})}>{s.cta}</Button>
                </div>
                <figure className={C.pic}>
                  <img className={`${C.img}${on ? '' : ` ${C.imgOff}`}`} src={s.img.src} alt={s.img.alt} width={s.img.w} height={s.img.h}
                    loading={near(k) ? 'eager' : 'lazy'} decoding="async" />
                </figure>
              </div>
            );
          })}
        </div>
        {/* the site's icon-only buttons (outline, sm), on the banner's edges */}
        <span className={`${C.nav} ${C.prev}`}><Button variant="outline" size="sm" iconOnly iconStart="arrow-left" label="Previous banner" onClick={() => go(i - 1)} /></span>
        <span className={`${C.nav} ${C.next}`}><Button variant="outline" size="sm" iconOnly iconStart="arrow" label="Next banner" onClick={() => go(i + 1)} /></span>
      </div>
      {/* the site's dots (components/ui/CarouselDots); the fill: restarted on every change (key), held still without autoplay, and
          its end moves on */}
      <CarouselDots as="p" className={C.dots} label="Choose a banner" labels={PROMO_BANNERS.map((_, k) => `Show banner ${k + 1}`)} active={i}
        onSelect={go} timed fillProps={(k, on) => ({ key: on ? `on-${run}` : 'off', style: on && !auto ? { animation: 'none', transform: 'none' } : undefined,
          onAnimationEnd: on && auto ? () => go(i + 1) : undefined })} />
    </div>
  );
}
