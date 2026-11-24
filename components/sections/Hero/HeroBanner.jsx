import { Fragment } from 'react';
import Button from '@/components/ui/Button';
import CarouselDots from '@/components/ui/CarouselDots';
import Stylesheet from '@/components/ui/Stylesheet';
import SectionLabel from '@/components/ui/SectionLabel';
import { $, reduce } from '@/lib/site';
import { CoverArt } from '@/components/sections/Programmes';
import { programmes } from '@/components/sections/programmes-data';
import { BATCHES } from '@/components/sections/Batches';

const EXAM = 'UPSC CSE 2025';

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const MONTHS = MONTH_NAMES.map(m => m.slice(0, 3));
const batchDay = b => { const [d, m] = b.d.split(' '); return { day: +d, month: MONTHS.indexOf(m) }; };
const byDate = (x, y) => { const a = batchDay(x), b = batchDay(y); return a.month - b.month || a.day - b.day; };
const NEXT_BATCH = BATCHES.find(b => b.hi) || [...BATCHES].sort(byDate)[0];
const longDate = b => { const { day, month } = batchDay(b); return `${day} ${MONTH_NAMES[month]}`; };
const shortName = b => (b.fam === 'gs' ? 'GS' : b.n);

const GS_PROGRAMME = programmes.find(x => x.name === 'UPSC GS foundation course – PCM');
const AIR_1 = { rank: 1, name: 'Anuj Agnihotri', src: '/assets/img/hero-v6/slide-anuj-agnihotri.webp' };
const GUIDANCE = { t: 'Get expert guidance', href: '#contact' };

const HERO = [
  {
    key: 'results', kind: 'results', eyebrow: 'CSE 2025 results',
    headline: ['36 of the top 50', 'in UPSC CSE 2025', 'prepared with us.'],
    lead: 'All ten of the top ten ranks, and AIR 1 in every UPSC result since 2016.',
    btns: [{ t: 'See all results', href: 'https://vajiramandravi.com/ias-selections-from-vajiram/', ext: true }, { t: 'Meet the toppers', href: '#toppers' }],
    image: { src: '/assets/img/hero-v6/slide-results.webp', pos: '60% 35%', mpos: '58% 30%' },
  },
  {
    key: 'air-1', kind: 'topper', eyebrow: 'CSE 2025 results',
    topper: AIR_1,
    headline: ['Prepare for the UPSC with', 'the institute behind', 'India’s top rank-holders.'],
    lead: 'Since 1976, Vajiram & Ravi has brought 50 years of Civil Services teaching experience to your preparation, with expert faculty, structured programmes, comprehensive study resources and flexible learning options.',
    btns: [{ t: 'Explore programmes', href: '#courses' }, GUIDANCE],
    image: { src: AIR_1.src },
  },
  {
    key: 'gs', kind: 'programme', programme: GS_PROGRAMME, eyebrow: `Programmes · ${GS_PROGRAMME.category}`,
    headline: ['Build your preparation', 'from the basics, with our', 'GS foundation course.'],
    lead: GS_PROGRAMME.line,
    btns: [{ t: 'Enrol now', href: '#contact', prog: GS_PROGRAMME.name }, { t: 'View course', href: GS_PROGRAMME.href || '#courses', ext: !!GS_PROGRAMME.href }],
    image: { src: '/assets/img/hero-v6/slide-gs-foundation.webp', pos: '80% 45%', mpos: '88% 40%' },
  },
  {
    key: 'batch', kind: 'batch', eyebrow: `Admissions open · ${NEXT_BATCH.tgt}`,
    headline: ['Admissions are open:', `the next ${shortName(NEXT_BATCH)} batch`, `starts ${longDate(NEXT_BATCH)}.`],
    lead: `${NEXT_BATCH.full}. ${NEXT_BATCH.what}`,
    btns: [{ t: 'Enrol now', href: '#contact', prog: NEXT_BATCH.full }, { t: 'See all batches', href: '#batches' }],
    image: { src: '/assets/img/hero-v6/slide-batch.webp', pos: '80% 60%', mpos: '96% 55%' },
  },
  {
    key: 'campus', kind: 'campus', eyebrow: 'Since 1976 · New Delhi',
    headline: ['Five decades of', 'preparing India’s', 'civil servants.'],
    lead: 'Our Old Rajinder Nagar campus, at Gate 5 of Karol Bagh Metro, has taught generations of UPSC aspirants, in the classroom and LIVE-Online.',
    btns: [{ t: 'Visit the campus', href: '#visit' }, GUIDANCE],
    image: { src: '/assets/img/hero-v6/slide-campus.webp', pos: '0% 0%', mpos: '52% 20%', wide: true },
  },
];
const KIND_NAMES = { results: 'CSE 2025 results', batch: 'Upcoming batch', campus: 'Our campus' };
const slideName = s => (s.topper ? `AIR ${s.topper.rank}: ${s.topper.name}` : s.programme?.name ?? KIND_NAMES[s.kind]);

const imageLoading = first => (first ? { fetchPriority: 'high' } : { loading: 'lazy' });
const delay = seconds => ({ '--d': `${seconds}s` });
const btnProps = b => ({ href: b.href, ...(b.ext ? { target: '_blank', rel: 'noopener' } : {}), ...(b.prog ? { 'data-prog': b.prog } : {}) });

function ProgrammeArt({ programme }) {
  const { light, base, deep, emblem } = programme.cover;
  return (
    <div className="hx__prog-art" style={{ '--pl': light, '--pb': base, '--pd': deep }}>
      <div className="hx__book">
        <span className="hx__book-spine" />
        <span className="hx__book-frame" />
        <span className="hx__book-in">
          <span className="hx__book-name">{programme.name}</span>
          <span className="hx__book-rule"><i /><b /><i /></span>
          <span className="hx__book-emblem"><CoverArt emblem={emblem} size={84} /></span>
          <span className="hx__book-cat">{programme.category}</span>
        </span>
      </div>
    </div>
  );
}

function SlideArt({ slide, first }) {
  if (slide.image) {
    return (
      <>
        <img src={slide.image.src} alt="" width="1920" height="822" decoding="async"
          {...imageLoading(first)} style={slide.image.pos ? { objectPosition: slide.image.pos, '--mpos': slide.image.mpos } : undefined} />
        {slide.kind !== 'topper' && <span className="hx__prog-wash" />}
      </>
    );
  }
  return slide.kind === 'programme' ? <ProgrammeArt programme={slide.programme} /> : null;
}

function Slides() {
  return (
    <div className="dl__bg" id="dlBg" aria-hidden="true">
      <div className="dl__slides" id="dlSlides">
        {HERO.map((slide, i) => {
          const other = slide.kind !== 'topper';
          const cls = ['dl__topper', other && 'dl__prog', other && slide.image && 'dl__prog--photo', slide.image?.wide && 'dl__prog--wide', !i && 'on'];
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

function AirCard({ slide }) {
  return (
    <div className="hx__mark" aria-hidden="true">
      <div className="hx__mark-card">
        <p className="hx__mark-air"><span>AIR</span><b>{slide.rank}</b></p>
        <p className="hx__mark-name">{slide.name}</p>
        <p className="hx__mark-exam">{EXAM}</p>
      </div>
    </div>
  );
}

function Copy({ slide }) {
  return (
    <div className="dl__in">
      <SectionLabel light>{slide.eyebrow}</SectionLabel>
      <h1 className="hx__h" id="dlH">
        {slide.headline.map((line, i) => (
          <Fragment key={i}>{i ? ' ' : null}<span className="hx__line rv" style={delay(.05 + i * .07)}>{line}</span></Fragment>
        ))}
      </h1>
      <p className="hx__lead rv" style={delay(.27)}>{slide.lead}</p>
      <p className="hx__btns rv" style={delay(.34)} data-btns={JSON.stringify(slide.btns)}>
        <Button size="md" iconEnd="arrow" {...btnProps(slide.btns[0])}>{slide.btns[0].t}</Button>
        <Button onDark size="md" {...btnProps(slide.btns[1])}>{slide.btns[1].t}</Button>
      </p>
    </div>
  );
}

function Controls() {
  return (
    <div className="hx__navs" role="group" aria-label="Change slide">
      <span className="hx__nav hx__nav--prev">
        <Button iconOnly size="sm" iconStart="arrow-left" label="Previous slide" className="dl__arrow dl__arrow--prev" />
      </span>
      <CarouselDots as="p" id="dlProg" tone="hero" className="hx__dots" label="Choose a slide" labels={HERO.map(slideName)} />
      <span className="hx__nav hx__nav--next">
        <Button iconOnly size="sm" iconStart="arrow" label="Next slide" className="dl__arrow dl__arrow--next" />
      </span>
    </div>
  );
}

export const FIRST_KIND = HERO[0].kind;

export default function HeroBanner() {
  return (
    <>
      <Stylesheet href="/css/hero-banner.css" />
      <div className="dl__stick">
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
  const copyLbl = hero.querySelector('.dl__in .lbl__t'), copyH = hero.querySelector('.hx__h');
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
    const lbl = ghost.querySelector('.lbl__t'), h = ghost.querySelector('.hx__h'), lead = ghost.querySelector('.hx__lead'), btns = [...ghost.querySelectorAll('.hx__btns .btn')];
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
