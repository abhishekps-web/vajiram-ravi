import Button from '@/components/ui/button';
import SectionWrapper from '@/components/ui/section-wrapper';
import CarouselDots from '@/components/ui/carousel-dots';
import SectionLabel from '@/components/ui/section-label';
import Stylesheet from '@/components/ui/stylesheet';
import { bindDots } from '@/components/ui/rail';
import { $$, SITE, reduce } from '@/lib/site';
import { RESOURCES } from '@/lib/data/resources';


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
    <SectionWrapper id="resources" labelledBy="resrcH" compact className="sm">
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
        <CarouselDots className="sm__dots" tone="light" label="Choose a resource" labels={RESOURCES.map(r => `Show ${r.title}`)} controls="resGrid" />
      </div>
    </SectionWrapper>
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

export function initResourceDots() {
  bindDots(document.getElementById('resGrid'), $$('#resources .sm__dots > button'));
}
