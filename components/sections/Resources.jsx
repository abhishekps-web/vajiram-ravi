import Button from '@/components/ui/Button/Button';
import SectionLabel from '@/components/ui/SectionLabel';
import Stylesheet from '@/components/ui/Stylesheet';
import { $$, SITE, reduce } from '@/lib/site';

export const RESOURCES = [
  { title: 'Current Affairs', desc: 'Prelims, Mains and Quest articles, written the way UPSC asks.', action: 'Read today’s articles', tab: 'Daily', image: { src: '/assets/img/resources/current-affairs.webp', w: 640, h: 410 } },
  { title: 'The Recitals', desc: 'UPSC current affairs monthly material, free to download.', action: 'Download this month', tab: 'Monthly', image: { src: '/assets/img/resources/the-recitals.webp', w: 640, h: 520 } },
  { title: 'Previous Year Papers', desc: 'Prelims and Mains papers, with the UPSC answer key.', action: 'Browse papers', tab: 'Archive', image: { src: '/assets/img/resources/previous-year-papers.webp', w: 640, h: 595 } },
  { title: 'Infographics', desc: 'Topics made visual: one-page graphics for quick, clear recall.', action: 'Browse infographics', tab: 'Visual', image: { src: '/assets/img/resources/infographics.webp', w: 800, h: 580 } },
  { title: 'Kurukshetra Magazine', desc: 'The monthly journal on rural development, a staple for Mains and Essay.', action: 'Read the magazine', tab: 'Monthly', image: { src: '/assets/img/resources/kurukshetra.webp', w: 800, h: 666 } },
  { title: 'Prelims Quick Revision', desc: 'Crisp, topic-wise notes and facts for the final days before Prelims.', action: 'Start revising', tab: 'Revise', image: { src: '/assets/img/resources/quick-revision.webp', w: 800, h: 716 } },
];

function ResourceCard({ title, desc, action, tab, image }) {
  return (
    <li className="sm__card sm__card--res rf">
      <span className="rf__back" aria-hidden="true" />
      <div className="rmk rmk--photo" aria-hidden="true">
        <div className="rmk__obj"><img src={image.src} alt="" width={image.w} height={image.h} loading="lazy" decoding="async" /></div>
      </div>
      <div className="rf__front">
        <span className="rf__tag">{tab}</span>
        <h3 className="sm__t">{title}</h3>
        <p className="sm__d">{desc}</p>
        <div className="rf__stub">
          <Button onDark className="sm__act" href="#" data-rs="" iconEnd="arrow">{action}</Button>
        </div>
      </div>
    </li>
  );
}

export default function Resources() {
  return (
    <section className="sm" id="resources" aria-labelledby="resrcH">
      <Stylesheet href="/css/resources.css" />
      <div className="sm__in">
        <div className="sm__head">
          <div className="sm__titles">
            <SectionLabel>Free resources</SectionLabel>
            <h2 id="resrcH" className="h2 h2--sec rv" style={{ '--d': '.12s' }}>Your preparation can begin today.</h2>
            <p className="intro rv" style={{ '--d': '.2s' }}>Daily current affairs, a monthly magazine and the official papers, free, from the Vajiram & Ravi editorial desk.</p>
          </div>
        </div>
        <ul className="sm__grid sm__grid--res" id="resGrid">
          {RESOURCES.map(r => <ResourceCard key={r.title} {...r} />)}
        </ul>
        <div className="sm__nav rv" style={{ '--d': '.24s' }}>
          <Button variant="outline" size="sm" iconOnly iconStart="arrow-left" label="Previous resources" className="cbtn cbtn--prev" />
          <Button variant="outline" size="sm" iconOnly iconStart="arrow" label="Next resources" className="cbtn cbtn--next" />
        </div>
      </div>
    </section>
  );
}

export function initResourceLinks() {
  $$('[data-rs]').forEach(a => { a.href = SITE; a.target = '_blank'; a.rel = 'noopener'; });
}

export function initResourceCards() {
  $$('#resources .rf').forEach(card => {
    const link = card.querySelector('a.sm__act');
    if (!link) return;
    card.addEventListener('click', e => { if (!e.target.closest('a')) link.click(); });
  });
}

export function initResourceFloat() {
  if (reduce || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const cards = $$('#resources .rf').map(el => ({ el, obj: el.querySelector('.rmk__obj'), k: 0, goal: 0, phase: Math.random() * 6 })).filter(c => c.obj);
  if (!cards.length) return;
  const LIFT = 20, BOB = 7, TILT = 2.4;
  let raf = 0, last = 0;

  const frame = now => {
    const dt = Math.min(.05, (now - (last || now)) / 1000); last = now;
    let busy = false;
    for (const c of cards) {
      c.k += (c.goal - c.k) * (1 - Math.exp(-dt * (c.goal ? 7 : 5)));
      if (Math.abs(c.goal - c.k) < .001) c.k = c.goal;
      if (c.goal) c.phase += dt * 2.1;
      if (c.k === 0 && !c.goal) { c.obj.style.transform = ''; continue; }
      busy = true;
      const bob = Math.sin(c.phase);
      c.obj.style.transform = `translate3d(0, ${(-LIFT * c.k - bob * BOB * c.k).toFixed(2)}px, 0) rotate(${(-TILT * c.k + bob * .8 * c.k).toFixed(2)}deg)`;
    }
    if (busy) raf = requestAnimationFrame(frame); else { raf = 0; last = 0; }
  };
  const go = () => { if (!raf) { last = 0; raf = requestAnimationFrame(frame); } };

  cards.forEach(c => {
    const on = () => { c.goal = 1; go(); }, off = () => { c.goal = 0; go(); };
    c.el.addEventListener('pointerenter', on); c.el.addEventListener('pointerleave', off);
    c.el.addEventListener('focusin', on); c.el.addEventListener('focusout', e => { if (!c.el.contains(e.relatedTarget)) off(); });
  });
}

export function initResourceArrows() {
  const grid = document.getElementById('resGrid'), prev = document.querySelector('#resources .cbtn--prev'), next = document.querySelector('#resources .cbtn--next');
  if (!grid || !prev || !next) return;
  const EDGE = 12;
  const step = () => { const [a, b] = grid.children; return b ? b.offsetLeft - a.offsetLeft : grid.clientWidth; };
  const sync = () => {
    prev.disabled = grid.scrollLeft <= EDGE;
    next.disabled = grid.scrollLeft >= grid.scrollWidth - grid.clientWidth - EDGE;
  };
  prev.addEventListener('click', () => grid.scrollBy({ left: -step() }));
  next.addEventListener('click', () => grid.scrollBy({ left: step() }));
  grid.addEventListener('scroll', () => requestAnimationFrame(sync), { passive: true });
  addEventListener('resize', sync, { passive: true });
  sync(); setTimeout(sync, 600);
}
