'use client';
import { useEffect, useRef, useState } from 'react';
import Button from '@/components/ui/Button/Button';
import CarouselDots from '@/components/ui/CarouselDots/CarouselDots';
import './promo-banner.css';

const SITE = 'https://vajiramandravi.com/';
const CUTOUTS = '/assets/img/resources/cutout';

const BANNERS = [
  {
    tone: 'butter', label: 'New batch · Starts 29 Jan', title: 'The full GS syllabus, in 11 months.',
    text: '11-Month Prelims cum Mains General Studies Comprehensive Programme, for CSE 2027.',
    cta: 'Enroll now', href: '#contact', programme: '11-Month Prelims cum Mains General Studies Comprehensive Programme',
    image: { src: `${CUTOUTS}/gs-postal-books.webp`, alt: 'Vajiram & Ravi General Studies books', width: 640, height: 624 },
  },
  {
    tone: 'sand', label: 'Free · Monthly magazine', title: 'A month of current affairs, in one magazine.',
    text: 'The Recitals: UPSC current affairs monthly material, free to download.',
    cta: 'Download this month', href: SITE, external: true,
    image: { src: `${CUTOUTS}/the-recitals.webp`, alt: 'Issues of The Recitals magazine', width: 640, height: 520 },
  },
  {
    tone: 'cream', label: 'UPSC Calendar 2027', title: 'Every stage date for CSE 2027, in one place.',
    text: 'Prelims, Mains and the interview, plus the age limit and eligibility rules.',
    cta: 'See the calendar', href: SITE, external: true,
    image: { src: `${CUTOUTS}/upsc-calendar.webp`, alt: 'A desk calendar with the UPSC dates marked', width: 640, height: 612 },
  },
  {
    tone: 'latte', label: 'Daily current affairs', title: 'Today’s news, written the way UPSC asks.',
    text: 'Prelims, Mains and Quest articles, every day.',
    cta: 'Read today’s articles', href: SITE, external: true,
    image: { src: `${CUTOUTS}/current-affairs.webp`, alt: 'Folded newspapers', width: 640, height: 410 },
  },
  {
    tone: 'honey', label: 'New batch · Starts 8 Feb', title: 'Full-length Prelims tests, with the reasoning behind every answer.',
    text: 'PowerUp Prelims Test Series 2027.',
    cta: 'Enroll now', href: '#contact', programme: 'PowerUp Prelims Test Series 2027',
    image: { src: `${CUTOUTS}/previous-year-papers.webp`, alt: 'An examination question booklet', width: 640, height: 595 },
  },
];

const TONES = {
  peach:  { a: '#FFF4E8', b: '#FFE1C2', ink: '#8A2A07', acc: '#C2410C' },
  butter: { a: '#FFFAE8', b: '#FCE7A6', ink: '#5A3A08', acc: '#A86A08' },
  sand:   { a: '#FAF3EA', b: '#E8D2B6', ink: '#4A2A12', acc: '#8B5A2B' },
  cream:  { a: '#FFFBEF', b: '#F8E2B0', ink: '#5A3A08', acc: '#A0670F' },
  latte:  { a: '#F8EFE6', b: '#E2C7A9', ink: '#4A2A12', acc: '#855530' },
  honey:  { a: '#FFF7E0', b: '#F7D98C', ink: '#573607', acc: '#9C6107' },
};

const COUNT = BANNERS.length;
const SWIPE_MIN = 44;
const wrap = n => ((n % COUNT) + COUNT) % COUNT;
const placeFrom = (k, current) => { const d = wrap(k - current); return d > COUNT / 2 ? d - COUNT : d; };
const placesFrom = current => BANNERS.map((_, k) => placeFrom(k, current));

const C = {
  root: 'tr pb:relative pb:mt-16 pb:pb-16 pb:origin-top pb:[scale:calc(1-var(--cover,0)*.06)] pb:motion-reduce:[scale:none]'
    + ' pb:phone:mt-9 pb:phone:pb-12',
  stage: 'pb:group/stage pb:relative pb:flow-root',
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
  label: 'pb:m-0 pb:mb-3.5 pb:px-3 pb:py-1.5 pb:rounded-full pb:[font:700_12px/1.2_var(--f)] pb:tracking-[.12em] pb:uppercase'
    + ' pb:text-[var(--acc)] pb:bg-[color-mix(in_srgb,var(--acc)_12%,transparent)]',
  title: 'pb:m-0 pb:[font:500_clamp(28px,2.7vw,42px)/1.1_var(--f-title,Georgia),serif] pb:tracking-[-.02em] pb:text-[var(--ink)] pb:text-balance'
    + ' pb:narrow:text-[30px] pb:phone:text-[27px]',
  text: 'pb:mt-3 pb:mb-0 pb:[font:400_18px/1.45_var(--f)] pb:text-[rgba(43,26,16,.82)] pb:text-pretty pb:phone:text-[16px]',
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

const cx = (...classes) => classes.filter(Boolean).join(' ');

function useReducedMotion() {
  const [reduced, setReduced] = useState(true);
  useEffect(() => { setReduced(matchMedia('(prefers-reduced-motion: reduce)').matches); }, []);
  return reduced;
}

function useOnScreen(ref, threshold) {
  const [onScreen, setOnScreen] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(entries => setOnScreen(entries[0].isIntersecting), { threshold });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [ref, threshold]);
  return onScreen;
}

function useTabHidden() {
  const [tabHidden, setTabHidden] = useState(false);
  useEffect(() => {
    const update = () => setTabHidden(document.hidden);
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);
  return tabHidden;
}

function Banner({ banner, index, onShow, place, jump, load }) {
  const tone = TONES[banner.tone] || TONES.peach;
  const style = { '--bg-a': tone.a, '--bg-b': tone.b, '--ink': tone.ink, '--acc': tone.acc, '--tr-o': place - index, ...(jump ? { transition: 'none' } : {}) };
  return (
    <div className={C.slide} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${COUNT}`}
      inert={!onShow} aria-hidden={onShow ? undefined : true} style={style}>
      <span className={C.orn} aria-hidden="true"><span className={C.mandala} /></span>
      <div className={C.copy}>
        <p className={C.label}>{banner.label}</p>
        <h2 className={C.title}>{banner.title}</h2>
        <p className={C.text}>{banner.text}</p>
        <Button className={C.cta} href={banner.href} iconEnd="arrow" data-prog={banner.programme} {...(banner.external ? { target: '_blank' } : {})}>
          {banner.cta}
        </Button>
      </div>
      <figure className={C.pic}>
        <img className={cx(C.img, !onShow && C.imgOff)} src={banner.image.src} alt={banner.image.alt} width={banner.image.width} height={banner.image.height}
          loading={load ? 'eager' : 'lazy'} decoding="async" />
      </figure>
    </div>
  );
}

function Arrow({ side, onClick }) {
  const prev = side === 'prev';
  return (
    <span className={`${C.nav} ${prev ? C.prev : C.next}`}>
      <Button variant="outline" size="sm" iconOnly iconStart={prev ? 'arrow-left' : 'arrow'} label={prev ? 'Previous banner' : 'Next banner'} onClick={onClick} />
    </span>
  );
}

export default function PromoBanner() {
  const [current, setCurrent] = useState(0);
  const [run, setRun] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const root = useRef(null), stage = useRef(null), swipe = useRef(null);
  const lastPlaces = useRef(placesFrom(0));

  const auto = !useReducedMotion();
  const onScreen = useOnScreen(stage, .35);
  const tabHidden = useTabHidden();

  const go = n => { setCurrent(wrap(n)); setRun(r => r + 1); };
  const step = by => go(current + by);

  const places = placesFrom(current);
  const jumps = places.map((d, k) => Math.abs(d - lastPlaces.current[k]) > 1 && d !== 0 && lastPlaces.current[k] !== 0);
  useEffect(() => { lastPlaces.current = places; });

  const paused = !onScreen || hovered || focused || tabHidden;

  const onKeyDown = e => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    step(e.key === 'ArrowLeft' ? -1 : 1);
    e.preventDefault();
  };
  const onTouchStart = e => { const t = e.touches[0]; swipe.current = { x: t.clientX, y: t.clientY }; };
  const onTouchEnd = e => {
    const start = swipe.current;
    if (!start) return;
    swipe.current = null;
    const t = e.changedTouches[0], dx = t.clientX - start.x, dy = t.clientY - start.y;
    if (Math.abs(dx) > SWIPE_MIN && Math.abs(dx) > Math.abs(dy) * 1.3) step(dx < 0 ? 1 : -1);
  };
  const onBlur = e => { if (!root.current.contains(e.relatedTarget)) setFocused(false); };

  const dotFill = (k, on) => ({
    key: on ? `on-${run}` : 'off',
    style: on && !auto ? { animation: 'none', transform: 'none' } : undefined,
    onAnimationEnd: on && auto ? () => step(1) : undefined,
  });

  return (
    <div ref={root} className={`${C.root}${auto ? ' is-auto' : ''}${paused ? ' is-paused' : ''}`} id="promo-banner" role="region"
      aria-roledescription="carousel" aria-label="Promotions" onFocus={() => setFocused(true)} onBlur={onBlur}>
      <div ref={stage} className={C.stage} onKeyDown={onKeyDown}
        onPointerEnter={e => { if (e.pointerType === 'mouse') setHovered(true); }} onPointerLeave={() => setHovered(false)}>
        <div className={C.track} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          {BANNERS.map((banner, k) => (
            <Banner key={banner.title} banner={banner} index={k} onShow={k === current} place={places[k]} jump={jumps[k]}
              load={onScreen && Math.abs(places[k]) <= 1} />
          ))}
        </div>
        <Arrow side="prev" onClick={() => step(-1)} />
        <Arrow side="next" onClick={() => step(1)} />
      </div>
      <CarouselDots as="p" className={C.dots} label="Choose a banner" labels={BANNERS.map((_, k) => `Show banner ${k + 1}`)} active={current}
        onSelect={go} timed fillProps={dotFill} />
    </div>
  );
}
