import Image from 'next/image';
import SectionWrapper from '@/components/ui/section_wrapper';
import SectionLabel from '@/components/ui/SectionLabel';
import Button from '@/components/ui/Button';
import initCardStack from '@/components/ui/card-stack';
import { top10 } from '@/components/sections/Toppers';
import { $, reduce } from '@/lib/site';
import '@/app/tailwind-sections.css';

export const TESTIMONIALS = {
  1: '“The GS classes gave me a clear rhythm for Prelims and Mains. The test feedback showed me exactly what to improve each week.”',
  2: '“I needed consistency more than another resource. The current-affairs notes and regular tests kept my preparation focused.”',
  3: '“The interview guidance helped me speak with structure and confidence while still sounding like myself.”',
  4: '“The mock interview boards felt close to the real one. I knew how to present my DAF by the day.”',
  5: '“The optional crash course gave my Sociology a clean, final revision before Mains.”',
  6: '“The Ethics module changed how I wrote case studies, and the interview sessions kept me steady.”',
  7: '“Interview guidance helped me organise my background and answer plainly.”',
  8: '“The mock interviews showed me what a panel notices. I corrected it before the day.”',
  9: '“I walked into the interview having rehearsed the hard questions, not just the easy ones.”'
};

const LIE = [[-3.2, 12], [1.8, -14], [-1.5, 6], [2.6, -6]];

export const POSTCARDS = top10.filter(p => TESTIMONIALS[p.r]).slice(0, 9).map((p, i) => ({
  name: p.n,
  rank: p.r,
  year: p.y,
  photo: '/' + p.src,
  quote: TESTIMONIALS[p.r].replace(/^“|”$/g, ''),
  tilt: LIE[i % 4][0],
  lift: LIE[i % 4][1],
}));

const DURATION = `${(POSTCARDS.length * 370 / 48).toFixed(1)}s`;

function Postcard({ card, i, copy }) {
  return (
    <article
      className={[
        'pst cu:group/pst cu:relative cu:cursor-pointer cu:z-(--z) cu:w-[418px] cu:flex-none cu:mx-[-24px] cu:rotate-(--t) cu:translate-y-(--y)',
        'cu:[transition:rotate_.55s_var(--ease),translate_.55s_var(--ease),scale_.55s_var(--ease),filter_.45s_var(--ease),opacity_.45s_var(--ease)]',
        'cu:sthover:z-30 cu:sthover:rotate-0 cu:sthover:scale-[1.16] cu:sthover:translate-y-[calc(var(--y)-18px)]',
        'cu:focus-within:z-30 cu:focus-within:rotate-0 cu:focus-within:scale-[1.16] cu:focus-within:translate-y-[calc(var(--y)-18px)]',
        'cu:dimmed:[filter:blur(3.5px)] cu:dimmed:opacity-55',
        'cu:waiting:opacity-0 cu:motion-safe:dealt:animate-[st-deal_.9s_cubic-bezier(.34,1.56,.64,1)_calc(.26s+var(--n,0)*.13s)_both]',
        'cu:max-[900px]:w-[min(380px,86vw)] cu:motion-reduce:transition-none',
        copy && 'cu:motion-reduce:hidden cu:max-[760px]:hidden',
      ].filter(Boolean).join(' ')}
      aria-hidden={copy || undefined}
      inert={copy || undefined}
      style={{ '--t': `${card.tilt}deg`, '--y': `${card.lift}px`, '--z': (i % 9) + 1, '--n': i, '--from-r': `${i % 2 ? -9 : 9}deg` }}
    >
      <div
        className={[
          'cu:relative cu:aspect-[1.41] cu:rounded-[4px] cu:text-[#1B2A52] cu:postcard-paper',
          'cu:[transform:perspective(1000px)_rotateX(calc(var(--ty,0)*-3deg))_rotateY(calc(var(--tx,0)*4deg))]',
          'cu:[transition:transform_.5s_var(--ease)] cu:group-hover/pcu:duration-200 cu:motion-reduce:transition-none',
        ].join(' ')}
      >
        <p className="cu:absolute cu:top-[16px] cu:left-[28px] cu:m-0 cu:[font:600_11px/1_var(--f)] cu:tracking-[.32em] cu:text-[rgba(27,42,82,.5)]" aria-hidden="true">
          TESTIMONIAL
        </p>
        <blockquote
          className='cu:absolute cu:inset-x-[28px] cu:top-[40px] cu:bottom-[84px] cu:m-0 cu:overflow-hidden cu:[font:500_22px/28px_Caveat,"Segoe_Script",cursive] cu:text-[#1B2A52] cu:text-pretty cu:max-[460px]:text-[19px] cu:max-[460px]:leading-[24px]'
        >
          {/* the sender's photo in the stamp's place: a passport print stuck on the card, the handwriting wraps around it */}
          <Image
            className={[
              'cu:float-right cu:w-[78px] cu:h-[96px] cu:mt-[-6px] cu:mr-[-2px] cu:mb-[8px] cu:ml-[16px] cu:object-cover cu:object-[50%_18%]',
              'cu:border-[5px] cu:border-solid cu:border-[#FFFDF6] cu:bg-[#fff] cu:rotate-3 cu:[shape-outside:margin-box]',
              'cu:shadow-[0_1px_1px_rgba(40,25,10,.25),0_6px_10px_-4px_rgba(40,25,10,.5)]',
              'cu:max-[460px]:w-[62px] cu:max-[460px]:h-[78px]',
            ].join(' ')}
            src={card.photo}
            alt={copy ? '' : card.name}
            width={78}
            height={96}
          />
          {card.quote}
        </blockquote>
        {/* name and rank, written below the message */}
        <footer className="cu:absolute cu:inset-x-[28px] cu:bottom-[20px] cu:grid cu:pt-[8px] cu:[border-top:1px_solid_rgba(27,42,82,.25)]">
          <b className='cu:[font:600_25px/28px_Caveat,"Segoe_Script",cursive] cu:text-[#1B2A52]'>{card.name}</b>
          <em className='cu:[font:500_18px/22px_Caveat,"Segoe_Script",cursive] cu:text-[rgba(27,42,82,.75)]'>AIR {card.rank}, UPSC CSE {card.year}</em>
        </footer>
      </div>
    </article>
  );
}

export default function Stories() {
  return (
    <SectionWrapper id="stories" labelledBy="stH" compact noBottom className="sheet sheet--pad">
      <SectionLabel reveal={false}>Success stories</SectionLabel>
      <h2 id="stH" className="h2 h2--sec">
        {/* the heading rises out of its masked line */}
        <span className="cu:block cu:my-[-.1em] cu:py-[.1em] cu:overflow-hidden cu:waiting:opacity-0">
          <span className="cu:block cu:motion-safe:dealt:animate-[st-line_.8s_cubic-bezier(.22,1,.36,1)_90ms_both]">Hear it from our students</span>
        </span>
      </h2>
      <div
        id="tcar"
        className={[
          'cu:group/tcar cu:block cu:overflow-hidden cu:mx-[calc(var(--px)*-1)] cu:mt-[calc(var(--hd-gap)-76px)] cu:mb-[-16px] cu:pt-[76px] cu:pb-[56px]',
          'cu:[-webkit-mask-image:linear-gradient(90deg,transparent_0,#000_7%,#000_93%,transparent_100%)] cu:[mask-image:linear-gradient(90deg,transparent_0,#000_7%,#000_93%,transparent_100%)]',
          'cu:max-[1000px]:snap-x cu:max-[1000px]:snap-mandatory cu:max-[1000px]:[scrollbar-width:none]',
          'cu:motion-reduce:overflow-x-auto cu:motion-reduce:[-webkit-mask-image:none] cu:motion-reduce:[mask-image:none]',
        ].join(' ')}
      >
        {/* two identical sets in one track: it slides left by exactly one set; hovering pauses it */}
        <div
          className="cu:flex cu:w-max cu:items-start cu:will-change-transform cu:animate-[st-slide_var(--dur)_linear_infinite] cu:group-hover/tcar:[animation-play-state:paused] cu:motion-reduce:animate-none"
          style={{ '--dur': DURATION }}
        >
          {POSTCARDS.map((card, i) => <Postcard key={card.rank} card={card} i={i} />)}
          {POSTCARDS.map((card, i) => <Postcard key={`copy-${card.rank}`} card={card} i={i} copy />)}
        </div>
        {/* phones (760px and narrower): the loop becomes a stack of cards, one in front; swipe it, or use these (stories.js, stories.css) */}
        <div className="tstack-nav" role="group" aria-label="Testimonials">
          {/* the site's arrow buttons (icon-only, outline, sm), as on every other carousel (user 2026-11-17: arrows, not chevrons) */}
          <Button variant="outline" size="sm" iconOnly iconStart="arrow-left" label="Previous testimonial" data-tstack="prev" />
          <span className="tstack-count" aria-live="polite"><b data-tstack="cur">1</b> / {POSTCARDS.length}</span>
          <Button variant="outline" size="sm" iconOnly iconStart="arrow" label="Next testimonial" data-tstack="next" />
        </div>
      </div>
    </SectionWrapper>
  );
}

export function initStories() {
  const st = $('#stories'), tc = $('#tcar');
  if (!st || !tc) return;
  const track = tc.firstElementChild;
  const io = 'IntersectionObserver' in window;

  if (io && !reduce) {
    const seen = new IntersectionObserver(es => { if (es[0].isIntersecting) { st.setAttribute('data-in', ''); seen.disconnect(); } }, { threshold: .25 });
    seen.observe(st);
  } else st.setAttribute('data-in', '');

  if (track) initCardStack(tc, track);

  if (io && track) {
    new IntersectionObserver(es => { track.style.animationPlayState = es[0].isIntersecting ? '' : 'paused'; }).observe(tc);
  }

  if (!reduce && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let raf = 0, card = null, x = 0, y = 0;
    const paint = () => { raf = 0; if (card) { card.style.setProperty('--tx', x.toFixed(3)); card.style.setProperty('--ty', y.toFixed(3)); } };
    tc.addEventListener('pointermove', e => {
      const c = e.target.closest('.pst'); if (!c) return;
      const r = c.getBoundingClientRect();
      card = c; x = (e.clientX - r.left) / r.width - .5; y = (e.clientY - r.top) / r.height - .5;
      if (!raf) raf = requestAnimationFrame(paint);
    }, { passive: true });
    tc.addEventListener('pointerout', e => {
      const c = e.target.closest('.pst');
      if (c && !c.contains(e.relatedTarget)) { if (c === card) card = null; c.style.setProperty('--tx', 0); c.style.setProperty('--ty', 0); }
    });
  }

  const SCALE = 1.16;
  const nudge = (c, px) => {
    const t = tc.getBoundingClientRect(), r = c.getBoundingClientRect();
    const cur = parseFloat(c.dataset.sx || 0);
    const half = c.offsetWidth * SCALE / 2, cx = r.left + r.width / 2 - cur;   // centre without any earlier nudge
    const pad = Math.max(16, t.width * .07 + 8);
    const lo = t.left + pad + half, hi = t.right - pad - half;
    let sx = hi < lo ? 0 : Math.round(Math.min(Math.max(cx, lo), hi) - cx);
    if (px != null) sx = Math.round(Math.min(Math.max(sx, px + 40 - half - cx), px - 40 + half - cx));
    c.dataset.sx = sx; c.style.setProperty('--tw-translate-x', sx + 'px');
  };
  const settle = c => { c.dataset.sx = 0; c.style.removeProperty('--tw-translate-x'); };
  if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const dead = new Set();   // cards switched off for this hover: 3/4 or more of them is outside the viewport
    const visible = c => { const r = c.getBoundingClientRect(); return Math.max(0, Math.min(r.right, innerWidth) - Math.max(r.left, 0)) / r.width; };
    tc.addEventListener('pointerover', e => {
      const c = e.target.closest('.pst');
      if (!c || c.contains(e.relatedTarget)) return;
      if (visible(c) <= .25) { c.style.pointerEvents = 'none'; dead.add(c); return; }
      nudge(c, e.clientX);
    });
    tc.addEventListener('pointerleave', () => { dead.forEach(c => { c.style.pointerEvents = ''; }); dead.clear(); });
    tc.addEventListener('pointerout', e => {
      const c = e.target.closest('.pst');
      if (!c || c.contains(e.relatedTarget)) return;
      const r = c.getBoundingClientRect();   // still under the pointer (the card is moving or its corner is round): not a real exit
      if (e.clientX > r.left + 4 && e.clientX < r.right - 4 && e.clientY > r.top + 4 && e.clientY < r.bottom - 4) return;
      settle(c);
    });
  }
  tc.addEventListener('focusin', e => { const c = e.target.closest('.pst'); if (c) nudge(c); });
  tc.addEventListener('focusout', e => { const c = e.target.closest('.pst'); if (c && !c.contains(e.relatedTarget)) settle(c); });
}
