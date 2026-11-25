import { Fragment } from 'react';
import Button from '@/components/ui/Button';
import CarouselDots from '@/components/ui/CarouselDots';
import SectionLabel from '@/components/ui/SectionLabel';
import { $, reduce } from '@/lib/site';
import { CoverArt } from '@/components/sections/Programmes';
import { EXAM, AIR_1, HERO, KIND_NAMES } from '@/lib/data/hero';
import '@/app/tailwind-sections.css';

const slideName = s => (s.topper ? `AIR ${s.topper.rank}: ${s.topper.name}` : s.programme?.name ?? KIND_NAMES[s.kind]);

const imageLoading = first => (first ? { fetchPriority: 'high' } : { loading: 'lazy' });
const delay = seconds => ({ '--d': `${seconds}s` });
const btnProps = b => ({ href: b.href, ...(b.ext ? { target: '_blank', rel: 'noopener' } : {}), ...(b.prog ? { 'data-prog': b.prog } : {}) });


const CARD = [
  'dl__stick cu:rounded-[24px]! cu:[box-shadow:0_30px_60px_-34px_rgba(60,15,0,.7)]!',
  `cu:max-[900.98px]:h-auto! cu:max-[900.98px]:min-h-(--card-h)! cu:max-[900.98px]:rounded-[20px]! cu:max-[900.98px]:[background:#2b1206]!`,
  `cu:max-[760.98px]:mx-[calc(-1*var(--hx-side))]! cu:max-[760.98px]:rounded-none! cu:max-[760.98px]:[box-shadow:none]! cu:min-[761px]:mx-0!`,
].join(' ');

const WASH = [
  'cu:after:[background:linear-gradient(0deg,rgba(46,17,6,.42),transparent_112px),linear-gradient(90deg,rgba(46,17,6,.72),rgba(46,17,6,.34)_50%,transparent)]!',
  `cu:max-[900.98px]:after:[background:linear-gradient(0deg,rgba(46,17,6,.55)_0%,rgba(46,17,6,.45)_40%,rgba(46,17,6,.1)_62%,transparent_75%)]!`,
  `cu:max-[760.98px]:after:[background:linear-gradient(0deg,rgba(46,17,6,.88)_0%,rgba(46,17,6,.8)_50%,rgba(46,17,6,.7)_74%,rgba(46,17,6,.25)_88%,transparent_100%)]!`,
].join(' ');

const SLIDE = 'cu:[transition:opacity_1s_ease-out]!';

const IMG = [
  'cu:[#dlPin_#dlSlides_&]:object-[80%_18%] cu:transform-none! cu:[scale:1]! cu:[transition:scale_0s_linear_1s]!',
  'cu:motion-safe:[.on>&]:[scale:1.07]! cu:motion-safe:[.on>&]:[transition:scale_7.5s_linear]! cu:motion-reduce:[.on>&]:[transition:none]!',
  `cu:max-[900.98px]:[mask:linear-gradient(180deg,#000_60%,transparent_100%)]!`,
].join(' ');
const IMG_TOPPER = `cu:max-[900.98px]:h-[64%]! cu:max-[900.98px]:[#dlPin_#dlSlides_&]:object-[74%_12%]`;
const IMG_PHOTO = `cu:max-[900.98px]:h-[40%]! cu:max-[900.98px]:[object-position:var(--mpos,88%_40%)]!`;
const IMG_WIDE = `cu:w-[125%]! cu:max-w-none! cu:max-[900.98px]:w-full!`;
const IMG_RAISED = `cu:max-[900.98px]:[translate:0_-22%]!`;

const PHOTO_WASH = 'cu:absolute cu:inset-0 cu:pointer-events-none';
const PHOTO_WASH_TAB = `cu:max-[900.98px]:bg-[linear-gradient(0deg,rgba(43,18,6,.6)_0%,rgba(43,18,6,.2)_45%,transparent_64%)]`;
const PHOTO_WASH_BG = {
  photo: 'cu:bg-[linear-gradient(90deg,rgba(43,18,6,.9)_0%,rgba(43,18,6,.78)_34%,rgba(43,18,6,.35)_56%,transparent_70%)]',
  wide: 'cu:bg-[linear-gradient(90deg,rgba(43,18,6,.9)_0%,rgba(43,18,6,.76)_32%,rgba(43,18,6,.25)_48%,transparent_58%)]',
};

const PROG_ART = [
  'cu:absolute cu:inset-0 cu:[perspective:1400px]',
  'cu:[background:radial-gradient(42%_70%_at_80%_48%,color-mix(in_srgb,var(--pl)_32%,transparent),transparent_72%),linear-gradient(115deg,#2b1206_0%,color-mix(in_srgb,var(--pd)_62%,#2b1206)_55%,var(--pd)_100%)]',
  `cu:max-[900.98px]:[background:radial-gradient(70%_45%_at_80%_12%,color-mix(in_srgb,var(--pl)_55%,transparent),transparent_75%),linear-gradient(200deg,var(--pd)_0%,color-mix(in_srgb,var(--pd)_55%,#2b1206)_40%,#2b1206_75%)]`,
  "cu:before:content-[''] cu:before:absolute cu:before:inset-0 cu:before:[background:url(/assets/img/patterns/bg-jaali.svg)_0_0/72px_repeat] cu:before:opacity-[.07]",
].join(' ');
const BOOK = [
  'cu:absolute cu:top-1/2 cu:right-[clamp(56px,13%,210px)] cu:w-[220px] cu:h-[260px] cu:-mt-[130px] cu:box-border cu:rounded-[4px_10px_10px_4px] cu:overflow-hidden cu:text-center',
  'cu:bg-[linear-gradient(140deg,var(--pl)_0%,var(--pb)_48%,var(--pd)_100%)] cu:[box-shadow:34px_44px_60px_-24px_rgba(10,3,0,.7),inset_-2px_0_0_rgba(255,240,210,.25)]',
  'cu:opacity-0 cu:[translate:40px_0] cu:[transform:rotateY(-34deg)_rotateX(3deg)]',
  'cu:[transition:opacity_.5s_ease,translate_.5s_cubic-bezier(.2,.7,.2,1),transform_.5s_cubic-bezier(.2,.7,.2,1)]',
  'cu:in-[.on]:opacity-100 cu:in-[.on]:[translate:0_0] cu:in-[.on]:[transform:rotateY(-18deg)_rotateX(3deg)]',
  'cu:in-[.on]:[transition:opacity_.9s_ease,translate_1.2s_cubic-bezier(.2,.7,.2,1),transform_1.4s_cubic-bezier(.2,.7,.2,1)]',
  'cu:motion-safe:in-[.on]:animate-[hxBookFloat_6s_ease-in-out_1.2s_infinite_alternate]',
  "cu:after:content-[''] cu:after:absolute cu:after:[inset:0_auto_0_-70%] cu:after:w-1/2 cu:after:pointer-events-none cu:after:bg-[linear-gradient(90deg,transparent,rgba(255,235,200,.35),transparent)]",
  'cu:motion-safe:in-[.on]:after:animate-[hxBookShine_1.4s_cubic-bezier(.2,.7,.2,1)_.5s_both]',
  `cu:max-[1180.98px]:[zoom:.85] cu:max-[900.98px]:[zoom:.52] cu:max-[900.98px]:top-[34px] cu:max-[900.98px]:right-[34px] cu:max-[900.98px]:mt-0 cu:max-[560.98px]:[zoom:.44]`,
  'cu:motion-reduce:opacity-100 cu:motion-reduce:[translate:none] cu:motion-reduce:transition-none cu:motion-reduce:after:hidden',
].join(' ');

function ProgrammeArt({ programme }) {
  const { light, base, deep, emblem } = programme.cover;
  return (
    <div className={PROG_ART} style={{ '--pl': light, '--pb': base, '--pd': deep }}>
      <div className={BOOK}>
        <span className="cu:absolute cu:inset-y-0 cu:left-0 cu:w-[16px] cu:bg-[linear-gradient(90deg,rgba(0,0,0,.4),var(--pd)_40%,var(--pb)_85%,rgba(0,0,0,.2))] cu:after:content-[''] cu:after:absolute cu:after:inset-y-0 cu:after:-right-[3px] cu:after:w-[3px] cu:after:bg-[linear-gradient(90deg,rgba(0,0,0,.32),rgba(255,255,255,.12))]" />
        <span className={`cu:absolute cu:[inset:12px_12px_12px_28px] cu:border cu:border-solid cu:border-[#e8b96a] cu:rounded-[2px] cu:opacity-65 cu:before:content-[''] cu:before:absolute cu:before:inset-[3px] cu:before:border cu:before:border-solid cu:before:border-[#e8b96a] cu:before:rounded-[1px] cu:before:opacity-50`} />
        <span className="cu:absolute cu:[inset:12px_12px_12px_28px] cu:flex cu:flex-col cu:items-center cu:pt-[18px] cu:px-[12px] cu:pb-[14px] cu:box-border">
          <span className="cu:flex cu:items-center cu:justify-center cu:h-[3.3em] cu:[font:500_21px/1.1_Newsreader,Georgia,serif] cu:text-[#ffe3b0] cu:text-balance">{programme.name}</span>
          <span className={`cu:flex cu:items-center cu:gap-[6px] cu:mt-[8px] cu:text-[#e8b96a]`}>
            <i className="cu:w-[22px] cu:h-px cu:bg-current cu:opacity-70" /><b className="cu:w-[5px] cu:h-[5px] cu:bg-current cu:rotate-45" /><i className="cu:w-[22px] cu:h-px cu:bg-current cu:opacity-70" />
          </span>
          <span className="cu:flex cu:flex-1 cu:items-center cu:justify-center cu:min-h-0 cu:text-[#f6c77a] cu:[&_svg]:text-[#f6c77a]"><CoverArt emblem={emblem} size={84} /></span>
          <span className={`cu:[font:600_10px/13px_var(--f)] cu:tracking-[.18em] cu:uppercase cu:text-[#e8b96a]`}>{programme.category}</span>
        </span>
      </div>
    </div>
  );
}

function SlideArt({ slide, first }) {
  if (slide.image) {
    const topper = slide.kind === 'topper', wide = !!slide.image.wide;
    const cls = [IMG, topper ? IMG_TOPPER : IMG_PHOTO, wide && IMG_WIDE, slide.topper?.rank === 1 && IMG_RAISED].filter(Boolean).join(' ');
    return (
      <>
        <img src={slide.image.src} alt="" width="1920" height="822" decoding="async" className={cls}
          {...imageLoading(first)} style={slide.image.pos ? { objectPosition: slide.image.pos, '--mpos': slide.image.mpos } : undefined} />
        {!topper && <span className={`hx__prog-wash ${PHOTO_WASH} ${PHOTO_WASH_BG[wide ? 'wide' : 'photo']} ${PHOTO_WASH_TAB}`} />}
      </>
    );
  }
  return slide.kind === 'programme' ? <ProgrammeArt programme={slide.programme} /> : null;
}

function Slides() {
  return (
    <div className={`dl__bg ${WASH}`} id="dlBg" aria-hidden="true">
      <div className="dl__slides" id="dlSlides">
        {HERO.map((slide, i) => {
          const other = slide.kind !== 'topper';
          const cls = ['dl__topper', SLIDE, other && 'dl__prog cu:overflow-hidden!', !i && 'on'];
          return (
            <div key={slide.key} className={cls.filter(Boolean).join(' ')}
              data-kind={slide.kind} data-rank={slide.topper?.rank} data-name={slide.topper?.name}
              data-h={JSON.stringify(slide.headline)} data-lead={slide.lead} data-eyebrow={slide.eyebrow} data-btns={JSON.stringify(slide.btns)}>
              <SlideArt slide={slide} first={i === 0} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

const MARK = `hx__mark cu:top-auto! cu:bottom-[28px]! cu:right-(--hx-in)! cu:left-auto! cu:max-[900.98px]:flex! cu:max-[900.98px]:top-[18px]! cu:max-[900.98px]:bottom-auto! cu:max-[900.98px]:left-[18px]! cu:max-[900.98px]:right-auto!`;
const MARK_CARD = [
  'cu:grid! cu:grid-cols-[auto_auto]! cu:items-center! cu:gap-x-[12px]! cu:[padding:7px_18px_7px_7px]! cu:rounded-[999px]! cu:[border:1px_solid_rgba(255,255,255,.16)]! cu:text-left!',
  'cu:bg-[rgba(30,12,2,.42)]! cu:[backdrop-filter:blur(10px)]! cu:[box-shadow:0_12px_28px_-14px_rgba(0,0,0,.6)]!',
  `cu:max-[900.98px]:gap-x-[10px]! cu:max-[900.98px]:[padding:5px_14px_5px_5px]!`,
].join(' ');
const MARK_AIR = `hx__mark-air cu:row-[1/span_2]! cu:justify-center! cu:gap-[5px]! cu:h-[40px]! cu:[padding:0_14px]! cu:rounded-[999px]! cu:bg-[#FFD48A]! cu:text-[#2b1206]! cu:[font-family:var(--f)]! cu:max-[900.98px]:h-[34px]! cu:max-[900.98px]:[padding:0_11px]!`;
const MARK_AIR_TXT = `cu:text-[15px]! cu:leading-none! cu:tracking-[.02em]! cu:max-[900.98px]:text-[13px]!`;
const MARK_LINE = 'cu:[grid-column:2]! cu:m-0! cu:whitespace-nowrap!';

function AirCard({ slide }) {
  return (
    <div className={MARK} aria-hidden="true">
      <div className={`hx__mark-card ${MARK_CARD}`}>
        <p className={MARK_AIR}><span className={`${MARK_AIR_TXT} cu:font-semibold!`}>AIR</span><b className={`${MARK_AIR_TXT} cu:font-bold!`}>{slide.rank}</b></p>
        <p className={`hx__mark-name ${MARK_LINE} cu:[font:600_15px/19px_var(--f)]! cu:text-white! cu:max-[900.98px]:text-[13px]! cu:max-[900.98px]:leading-[17px]!`}>{slide.name}</p>
        <p className={`hx__mark-exam ${MARK_LINE} cu:[font:500_12px/16px_var(--f)]! cu:text-[rgba(255,233,194,.8)]! cu:max-[900.98px]:text-[11px]! cu:max-[900.98px]:leading-[14px]!`}>{EXAM}</p>
      </div>
    </div>
  );
}

const WIDE = 'cu:min-[901px]:max-w-[70%]!';
const COPY = `dl__in cu:max-[900.98px]:box-border! cu:max-[900.98px]:justify-end! cu:max-[900.98px]:pt-[120px]! cu:max-[560.98px]:pt-[140px]! cu:max-[900.98px]:min-h-(--card-h) cu:max-[760.98px]:items-start! cu:max-[760.98px]:text-left!`;
const HEADLINE = `hx__h ${WIDE} cu:max-[900.98px]:text-[length:clamp(34px,6.4vw,44px)]! cu:max-[900.98px]:leading-[1.08]! cu:max-[560.98px]:text-[32px]! cu:max-[760.98px]:[text-shadow:0_2px_18px_rgba(30,10,2,.55)]!`;
const LEAD = [
  `hx__lead rv cu:max-w-[760px]! ${WIDE} cu:min-[901px]:[#dlPin[data-kind=campus]_&]:max-w-[400px]!`,
  `cu:[margin:24px_0_0]! cu:text-[17px]! cu:leading-[1.6]! cu:max-[900.98px]:text-[16px]! cu:line-clamp-2!`,
].join(' ');
const BTNS = `hx__btns rv ${WIDE} cu:[margin:28px_0_0]! cu:gap-[12px]! cu:max-[760.98px]:justify-start!`;

function Copy({ slide }) {
  return (
    <div className={COPY}>
      <SectionLabel className={`${WIDE} cu:[margin:0_0_var(--hd-lbl)]! cu:justify-start! cu:max-[640.98px]:mb-[16px]!`}>{slide.eyebrow}</SectionLabel>
      <h2 className={HEADLINE} id="dlH">
        {slide.headline.map((line, i) => (
          <Fragment key={i}>{i ? ' ' : null}<span className="hx__line rv" style={delay(.05 + i * .07)}>{line}</span></Fragment>
        ))}
      </h2>
      <p className={LEAD} style={delay(.27)}>{slide.lead}</p>
      <p className={BTNS} style={delay(.34)} data-btns={JSON.stringify(slide.btns)}>
        <Button size="md" iconEnd="arrow" {...btnProps(slide.btns[0])}>{slide.btns[0].t}</Button>
        <Button onDark size="md" {...btnProps(slide.btns[1])}>{slide.btns[1].t}</Button>
      </p>
    </div>
  );
}

const NAVS = [
  'hx__navs cu:group/navs cu:absolute! cu:top-0 cu:left-0 cu:z-7! cu:pointer-events-none! cu:origin-[50%_35%]! cu:box-border!',
  'cu:flex-wrap! cu:content-end! cu:items-center! cu:justify-center! cu:gap-[10px]!',
  'cu:min-[761px]:[transform:scale(calc(1_-_var(--cover,0)_*_.2))]! cu:min-[761px]:block! cu:min-[761px]:p-0!',
  `cu:motion-safe:max-[760.98px]:flex! cu:max-[760.98px]:[transform:none]! cu:max-[760.98px]:pb-[18px]! cu:motion-reduce:hidden!`,
].join(' ');
const NAV = [
  'hx__nav cu:flex! cu:static! cu:top-auto! cu:left-auto! cu:right-auto! cu:bottom-auto! cu:[translate:none]! cu:pointer-events-auto! cu:[transition:opacity_.3s_ease]!',
  'cu:min-[761px]:absolute! cu:min-[761px]:top-1/2! cu:min-[761px]:[translate:-50%_-50%]!',
  'cu:min-[761px]:fine:opacity-0! cu:min-[761px]:fine:pointer-events-none!',
  'cu:min-[761px]:fine:group-has-[[data-card]:hover]/hero:opacity-100! cu:min-[761px]:fine:group-has-[[data-card]:hover]/hero:pointer-events-auto!',
  'cu:min-[761px]:fine:group-hover/navs:opacity-100! cu:min-[761px]:fine:group-hover/navs:pointer-events-auto!',
  'cu:min-[761px]:fine:group-focus-within/navs:opacity-100! cu:min-[761px]:fine:group-focus-within/navs:pointer-events-auto!',
  `cu:coarse:hidden! cu:max-[760.98px]:hidden!`,
  'cu:[&_.btn]:[--btn-shadow:0_12px_24px_-12px_rgba(58,20,6,.55)]!',
].join(' ');
const DOTS = [
  'hx__dots cu:flex! cu:items-center! cu:m-0! cu:gap-0! cu:[padding:10px_7px]! cu:rounded-[999px]! cu:bg-[rgba(0,0,0,.05)]! cu:pointer-events-auto!',
  'cu:static! cu:left-auto! cu:right-auto! cu:bottom-auto! cu:[translate:none]! cu:[&>button]:[margin:-8px_-3px]!',
  'cu:min-[761px]:absolute! cu:min-[761px]:left-[50%]! cu:min-[761px]:[translate:-50%_0]! cu:min-[901px]:bottom-[28px]! cu:min-[761px]:max-[900.98px]:bottom-[22px]!',
  'cu:motion-reduce:hidden!',
].join(' ');

function Controls() {
  return (
    <div className={NAVS} role="group" aria-label="Change slide">
      <span className={`${NAV} cu:min-[761px]:left-0!`}>
        <Button iconOnly size="sm" iconStart="arrow-left" label="Previous slide" className="dl__arrow dl__arrow--prev" />
      </span>
      <CarouselDots as="p" id="dlProg" tone="hero" className={DOTS} label="Choose a slide" labels={HERO.map(slideName)} />
      <span className={`${NAV} cu:min-[761px]:left-full!`}>
        <Button iconOnly size="sm" iconStart="arrow" label="Next slide" className="dl__arrow dl__arrow--next" />
      </span>
    </div>
  );
}

export const FIRST_KIND = HERO[0].kind;

export default function HeroBanner() {
  return (
    <>
      <div className={CARD} data-card>
        <Slides />
        <AirCard slide={AIR_1} />
        <Copy slide={HERO[0]} />
      </div>
      <Controls />
    </>
  );
}

// The carousel: each slide shows for DUR seconds, then the next; the dots fill as it runs. Arrows, the dots, arrow keys and a swipe change
// it. Autoplay holds while the pointer is over the buttons or keyboard focus is inside, off screen, in a hidden tab and until the intro
// lifts. Each slide's eyebrow, headline, lead and buttons (data-* on the slides above) swap with it; the AIR card follows topper slides.
export function initHeroCarousel() {
  const hero = $('#dlPin');
  if (!hero || reduce) return;
  const DUR = 6.5;
  const slides = [...hero.querySelectorAll('#dlSlides > *')], N = slides.length;
  const dots = [...hero.querySelectorAll('#dlProg button')];
  const copyLbl = hero.querySelector('.dl__in [data-label-text]'), copyH = hero.querySelector('.hx__h');
  const copyLead = hero.querySelector('.hx__lead'), copyBtns = hero.querySelector('.hx__btns'), mark = hero.querySelector('.hx__mark');
  let cur = -1, raf = 0, clock = 0, last = 0, hovered = false, focused = false;
  let introDone = !document.documentElement.classList.contains('vrv-lock'), inView = false, tabOn = !document.hidden;

  // the old copy fades up and out, the new one rises in (Web Animations, so the copy's own .rv entrance is untouched)
  const swapEl = (el, delay, change) => {
    el.getAnimations().forEach(a => a.cancel());
    const out = el.animate([{ opacity: 1, translate: '0 0' }, { opacity: 0, translate: '0 -10px' }],
      { duration: 320, delay, easing: 'cubic-bezier(.4, 0, 1, 1)', fill: 'forwards' });
    out.onfinish = () => {
      change();
      const back = el.animate([{ opacity: 0, translate: '0 12px' }, { opacity: 1, translate: '0 0' }],
        { duration: 560, easing: 'cubic-bezier(.2, .7, .2, 1)', fill: 'forwards' });
      back.onfinish = () => { out.cancel(); back.cancel(); };
    };
  };
  const swapHeadline = change => {
    let w = copyH.querySelector('.hx__w');
    if (!w) { w = document.createElement('span'); w.className = 'hx__w'; w.style.display = 'block'; w.append(...copyH.childNodes); copyH.append(w); }
    w.getAnimations().forEach(a => a.cancel());
    const clip = on => Object.assign(copyH.style, on
      ? { overflow: 'clip', overflowClipMargin: '24px', paddingBlock: '.12em', marginBlock: '-.12em' }
      : { overflow: '', overflowClipMargin: '', paddingBlock: '', marginBlock: '' });
    clip(true);
    const out = w.animate([{ translate: '0 0' }, { translate: '0 -108%' }], { duration: 420, easing: 'cubic-bezier(.5, 0, .75, 0)', fill: 'forwards' });
    out.onfinish = () => {
      change();
      const back = w.animate([{ translate: '0 108%' }, { translate: '0 0' }], { duration: 760, easing: 'cubic-bezier(.22, 1, .36, 1)', fill: 'forwards' });
      back.onfinish = () => { out.cancel(); back.cancel(); clip(false); };
    };
  };
  // a button's label, link, the programme it picks in the contact form ([data-prog]) and whether it opens a new tab
  const setBtns = list => [...copyBtns.querySelectorAll('.btn')].forEach((b, i) => {
    const d = list[i]; if (!d) return;
    b.querySelectorAll('.btn__t').forEach(t => { t.textContent = d.t; });
    b.setAttribute('href', d.href);
    if (d.prog) b.dataset.prog = d.prog; else delete b.dataset.prog;
    if (d.ext) { b.target = '_blank'; b.rel = 'noopener'; } else { b.removeAttribute('target'); b.removeAttribute('rel'); }
  });
  const swapCopy = sl => {
    const { eyebrow, lead, h, btns } = sl.dataset;
    if (eyebrow !== copyLbl.textContent) swapEl(copyLbl.closest('.lbl'), 0, () => { copyLbl.textContent = eyebrow; });
    const lines = JSON.parse(h);
    swapHeadline(() => copyH.querySelectorAll('.hx__line').forEach((s, i) => { s.textContent = lines[i] || ''; }));
    swapEl(copyLead, 70, () => { copyLead.textContent = lead; });
    if (btns !== copyBtns.dataset.btns) { copyBtns.dataset.btns = btns; swapEl(copyBtns, 120, () => setBtns(JSON.parse(btns))); }
  };
  const show = n => {
    const sl = slides[n], firstPaint = cur < 0;
    cur = n; hero.dataset.s = n; hero.dataset.kind = sl.dataset.kind;
    slides.forEach((s, i) => s.classList.toggle('on', i === n));
    const topper = !!sl.dataset.rank;
    hero.classList.toggle('is-topper', topper);
    if (topper && mark) {
      mark.querySelector('.hx__mark-air b').textContent = sl.dataset.rank;
      mark.querySelector('.hx__mark-name').textContent = sl.dataset.name;
      mark.classList.remove('is-drawn'); void mark.offsetWidth; mark.classList.add('is-drawn');
    }
    if (!firstPaint) swapCopy(sl);
    dots.forEach((b, i) => b.setAttribute('aria-current', String(i === n)));
  };
  const fill = (i, p) => dots.forEach((el, k) => el.style.setProperty('--p', k < i ? 1 : k === i ? p.toFixed(4) : 0));
  const frame = now => {
    raf = 0;
    clock = (clock + Math.min(100, now - (last || now)) / 1000) % (DUR * N); last = now;
    const i = Math.floor(clock / DUR);
    if (i !== cur) show(i);
    fill(i, clock / DUR - i);
    sync();
  };
  const held = () => hovered || focused;
  const sync = () => { if (introDone && inView && tabOn && !held() && !raf) raf = requestAnimationFrame(frame); };
  const seek = n => {
    n = (n + N) % N; clock = n * DUR; last = 0;
    show(n);
    if (held()) fill(n, 0);   // held: no frame runs, so set the dots here
    sync();
  };
  // holding: the clock stops where it is and resumes from there; manual changes still work
  const hold = () => { if (held()) { cancelAnimationFrame(raf); raf = 0; } else { last = 0; sync(); } };
  copyBtns.addEventListener('pointerenter', () => { hovered = true; hold(); });
  copyBtns.addEventListener('pointerleave', () => { hovered = false; hold(); });
  copyBtns.addEventListener('pointercancel', () => { hovered = false; hold(); });   // a touch that turns into a page scroll
  // only keyboard focus holds it: a click on a dot or arrow also focuses it, and that must not stop the autoplay for good
  hero.addEventListener('focusin', e => { focused = !!e.target.matches?.(':focus-visible'); hold(); });
  hero.addEventListener('focusout', e => { if (!hero.contains(e.relatedTarget)) { focused = false; hold(); } });
  if (!introDone) document.addEventListener('vr:intro-done', () => { introDone = true; seek(0); }, { once: true });
  dots.forEach((b, i) => b.addEventListener('click', () => seek(i)));
  hero.querySelector('.dl__arrow--prev')?.addEventListener('click', () => seek(cur - 1));
  hero.querySelector('.dl__arrow--next')?.addEventListener('click', () => seek(cur + 1));
  hero.addEventListener('keydown', e => { if (e.key === 'ArrowRight') seek(cur + 1); else if (e.key === 'ArrowLeft') seek(cur - 1); });
  let x0 = null;
  hero.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
  hero.addEventListener('touchend', e => { if (x0 == null) return; const dx = e.changedTouches[0].clientX - x0; x0 = null; if (Math.abs(dx) > 50) seek(cur + (dx < 0 ? 1 : -1)); }, { passive: true });
  document.addEventListener('visibilitychange', () => { tabOn = !document.hidden; last = 0; sync(); });
  new IntersectionObserver(es => { inView = es[0].isIntersecting; last = 0; sync(); }, { threshold: .3 }).observe(hero);
  // the controls' layer sits outside the card (which clips its contents) and is laid exactly over it, following its size
  const navs = hero.querySelector('.hx__navs'), card = hero.querySelector('.dl__stick');
  const lay = () => Object.assign(navs.style, getComputedStyle(navs).position === 'absolute'
    ? { left: card.offsetLeft + 'px', top: card.offsetTop + 'px', width: card.offsetWidth + 'px', height: card.offsetHeight + 'px' }
    : { left: '', top: '', width: '', height: '' });
  const copyIn = hero.querySelector('.dl__in'), stacked = matchMedia('(max-width: 900px)');
  const fit = () => {
    copyIn.style.minHeight = '';
    if (!stacked.matches) return;
    const ghost = copyIn.cloneNode(true);
    ghost.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
    Object.assign(ghost.style, { position: 'absolute', left: '0', top: '0', width: copyIn.offsetWidth + 'px', height: 'auto', minHeight: '0', visibility: 'hidden', pointerEvents: 'none' });
    ghost.setAttribute('aria-hidden', 'true');
    card.appendChild(ghost);
    const lbl = ghost.querySelector('[data-label-text]'), h = ghost.querySelector('.hx__h'), lead = ghost.querySelector('.hx__lead'), btns = [...ghost.querySelectorAll('.hx__btns .btn')];
    let tallest = 0;
    slides.forEach(sl => {
      const d = sl.dataset, lines = JSON.parse(d.h);
      lbl.textContent = d.eyebrow;
      h.querySelectorAll('.hx__line').forEach((s, i) => { s.textContent = lines[i] || ''; });
      lead.textContent = d.lead;
      JSON.parse(d.btns).forEach((b, i) => btns[i]?.querySelectorAll('.btn__t').forEach(t => { t.textContent = b.t; }));
      tallest = Math.max(tallest, ghost.offsetHeight);
    });
    ghost.remove();
    copyIn.style.minHeight = `max(var(--card-h, 0px), ${tallest}px)`;
  };
  let fitT = 0;
  const refit = () => { clearTimeout(fitT); fitT = setTimeout(fit, 120); };
  fit(); addEventListener('resize', refit);
  document.fonts?.ready.then(fit);
  lay(); addEventListener('resize', lay);
  if ('ResizeObserver' in window) new ResizeObserver(lay).observe(card);
  show(0); sync();
}
