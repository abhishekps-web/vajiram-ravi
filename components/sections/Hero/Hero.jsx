import { Fragment } from 'react';
import Button from '@/components/ui/Button/Button';
import CarouselDots from '@/components/ui/CarouselDots/CarouselDots';
import Stylesheet from '@/components/ui/Stylesheet';
import { $, esc, reduce } from '@/lib/site';
import { top10 } from '@/components/sections/Toppers/data/rankers';

const EXAM = 'UPSC CSE 2025';
const RESULTS_URL = 'https://vajiramandravi.com/ias-selections-from-vajiram/';

const SLIDES = [
  {
    rank: 1, name: 'Anuj Agnihotri', src: '/assets/img/hero-v6/slide-anuj-agnihotri.webp',
    headline: ['Prepare for the UPSC with', 'the institute behind', 'India’s top rank-holders.'],
    lead: 'Since 1976, Vajiram & Ravi has brought 50 years of Civil Services teaching experience to your preparation, with expert faculty, structured programmes, comprehensive study resources and flexible learning options.',
  },
  {
    rank: 2, name: 'Rajeshwari Suve M', src: '/assets/img/hero-v6/slide-rajeshwari-suve-m.webp',
    headline: ['Learn from the faculty', 'behind 36 of the top 50', 'in UPSC CSE 2025.'],
    lead: 'Expert faculty and structured General Studies programmes take you through every stage of the exam, from Prelims and Mains to the interview.',
  },
  {
    rank: 3, name: 'Akansh Dhull', src: '/assets/img/hero-v6/slide-akansh-dhull.webp',
    headline: ['Prepare the way', 'this year’s top', 'rank-holders did.'],
    lead: 'Test series, daily current affairs and mentorship, in the classroom or online, so your preparation fits the way you study.',
  },
];

const STATS = [
  { fig: '50+', lines: ['Years of', 'experience'], at: 780 },
  { fig: '59', lines: ['Prelims questions', 'reflected'], at: 860 },
  { fig: '10/10', lines: ['Top rankers', 'trained'], at: 940 },
  { fig: '36/50', lines: ['CSE 2025', 'rankers'], at: 1100 },
];

const airNumber = rank => String(rank).padStart(2, '0');
const resultLine = ({ name, rank }) => `${name} · AIR ${rank}, ${EXAM} · See all the results`;

const imageLoading = first => (first ? { fetchPriority: 'high' } : { loading: 'lazy' });
const delay = seconds => ({ '--d': `${seconds}s` });

function Slides() {
  return (
    <div className="dl__bg" id="dlBg" aria-hidden="true">
      <div className="dl__slides" id="dlSlides">
        {SLIDES.map((slide, i) => (
          <div key={slide.rank} className={i === 0 ? 'dl__topper on' : 'dl__topper'} data-rank={slide.rank} data-name={slide.name}
            data-h={JSON.stringify(slide.headline)} data-lead={slide.lead}>
            <img src={slide.src} alt="" width="1920" height="822" decoding="async" {...imageLoading(i === 0)} />
          </div>
        ))}
      </div>
    </div>
  );
}

function AirCard({ slide }) {
  return (
    <div className="hx__mark" aria-hidden="true">
      <div className="hx__mark-card">
        <p className="hx__mark-air"><span>AIR</span><b>{airNumber(slide.rank)}</b></p>
        <p className="hx__mark-name">{slide.name}</p>
        <p className="hx__mark-exam">{EXAM}</p>
      </div>
    </div>
  );
}

function ResultsPill({ slide }) {
  const line = resultLine(slide);
  return (
    <p className="hx__tick rv">
      <a className="hx__ticker" href={RESULTS_URL} target="_blank" rel="noopener">
        <span className="hx__tag">CSE 2025 results</span>
        <span className="hx__win">
          <span className="hx__glide" id="hxGlide">
            <span>{line}</span>
            <span aria-hidden="true">{line}</span>
          </span>
        </span>
        <svg className="hx__tick-arw" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8H13M9 4L13 8L9 12" /></svg>
      </a>
    </p>
  );
}

function Copy({ slide }) {
  return (
    <div className="dl__in">
      <ResultsPill slide={slide} />
      <h1 className="hx__h" id="dlH">
        {slide.headline.map((line, i) => (
          <Fragment key={i}>{i ? " " : null}<span className="hx__line rv" style={delay(.05 + i * .07)}>{line}</span></Fragment>
        ))}
      </h1>
      <p className="hx__lead rv" style={delay('.27')}>{slide.lead}</p>
      <p className="hx__btns rv" style={delay('.34')}>
        <Button size="md" href="#courses" iconEnd="arrow">Explore programmes</Button>
        <Button onDark size="md" href="#contact">Get expert guidance</Button>
      </p>
    </div>
  );
}

function Controls() {
  return (
    <div className="hx__navs" role="group" aria-label="Change topper">
      <span className="hx__nav hx__nav--prev">
        <Button variant="outline" iconOnly size="sm" iconStart="arrow-left" label="Previous topper" className="dl__arrow dl__arrow--prev" />
      </span>
      <CarouselDots as="p" id="dlProg" className="hx__dots" label="Choose a topper" labels={SLIDES.map(s => `AIR ${s.rank}: ${s.name}`)} />
      <span className="hx__nav hx__nav--next">
        <Button variant="outline" iconOnly size="sm" iconStart="arrow" label="Next topper" className="dl__arrow dl__arrow--next" />
      </span>
    </div>
  );
}

function Stats() {
  return (
    <ul className="hx__stats is-pre" aria-label="Vajiram & Ravi at a glance">
      {STATS.map(({ fig, lines, at }) => (
        <li key={fig} className="hx__stat hx__in" style={{ '--at': `${at}ms` }}>
          <span className="hx__num">
            <b className="hx__fig" data-fig={fig}>{fig}</b>
            <span className="hx__fig hx__fig--room" aria-hidden="true">{fig}</span>
          </span>
          <span className="hx__stat-t">{lines.map((l, k) => <span key={l} className="hx__stat-l">{k ? " " : ""}{l}</span>)}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Hero() {
  const [first] = SLIDES;
  return (
    <section className="dl dl--pin" id="dlPin" aria-labelledby="dlH">
      <span className="dl__ground" aria-hidden="true" />
      <div className="dl__frame">
        <div className="dl__stick">
          <Slides />
          <div id="heroNames" hidden aria-hidden="true" />
          <AirCard slide={first} />
          <Copy slide={first} />
        </div>
        <Controls />
        <Stylesheet href="/css/hero-banner.css" />
        <Stylesheet href="/css/hero-stats.css" />
        <Stats />
      </div>
    </section>
  );
}

export function initHeroNames() {
  const strip = $('#heroNames');
  if (!strip) return;
  const names = top10.map(p => `<span><small>AIR ${p.r} · CSE ${p.y}</small>${esc(p.n)}<i aria-hidden="true"></i></span>`).join('');
  strip.innerHTML = `<div>${names}</div><div aria-hidden="true">${names}</div>`;
}

const ROLL_MS = 1200;
function rollUp(fig, at) {
  const m = fig.dataset.fig.match(/^(\D*)(\d+)(.*)$/);
  if (!m) return;
  const [, pre, num, post] = m, to = +num;
  fig.textContent = pre + '0' + post;
  setTimeout(() => {
    const t0 = performance.now();
    const step = now => {
      const p = Math.min(1, (now - t0) / ROLL_MS), eased = 1 - Math.pow(1 - p, 3);
      fig.textContent = pre + Math.round(to * eased) + post;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, at);
}

export function initHeroStats() {
  const row = $('.hx__stats');
  if (!row) return;
  const reveal = () => { row.classList.remove('is-pre'); row.classList.add('is-in'); };
  if (reduce) { reveal(); return; }

  const start = () => {
    reveal();
    row.querySelectorAll('.hx__stat').forEach(li => rollUp(li.querySelector('.hx__fig'), parseFloat(li.style.getPropertyValue('--at')) || 0));
  };
  if (document.documentElement.classList.contains('vrv-lock')) document.addEventListener('vr:intro-done', start, { once: true });
  else start();
}

export function initHeroGround() {
  const band = $('.nav-band'), hero = $('#dlPin');
  if (!band || !hero) return;
  const measure = () => {
    document.documentElement.style.setProperty('--hx-h', band.offsetHeight + hero.offsetHeight + 'px');
  };
  measure();
  if ('ResizeObserver' in window) new ResizeObserver(measure).observe(hero);
  addEventListener('resize', measure);
}