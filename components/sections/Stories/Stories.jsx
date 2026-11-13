import Image from 'next/image';
import SectionLabel from '@/components/ui/SectionLabel';
import { POSTCARDS } from './data';
import './stories.css';

// ============ STORIES: postcards dropped on a table, in a seamless looping track ============
// Rendered on the server (the cards used to be written by stories.js after hydration); stories.js only adds the
// reveal, the pointer tilt and the off-screen pause. Styled with Tailwind (`st:` utilities, stories.css).

// one slide of the loop lasts 370/48 s per card (the earlier pace)
const DURATION = `${(POSTCARDS.length * 370 / 48).toFixed(1)}s`;

function Postcard({ card, i, copy }) {
  return (
    <article
      className={[
        'pst st:group/pst st:relative st:z-(--z) st:w-[418px] st:flex-none st:mx-[-24px] st:rotate-(--t) st:translate-y-(--y)',
        'st:[transition:rotate_.55s_var(--ease),translate_.55s_var(--ease),scale_.55s_var(--ease),filter_.45s_var(--ease),opacity_.45s_var(--ease)]',
        'st:hover:z-30 st:hover:rotate-0 st:hover:scale-[1.16] st:hover:translate-y-[calc(var(--y)-18px)]',
        'st:focus-within:z-30 st:focus-within:rotate-0 st:focus-within:scale-[1.16] st:focus-within:translate-y-[calc(var(--y)-18px)]',
        'st:dimmed:[filter:blur(3.5px)] st:dimmed:opacity-55',
        'st:waiting:opacity-0 st:motion-safe:dealt:animate-[st-deal_.9s_cubic-bezier(.34,1.56,.64,1)_calc(.26s+var(--n,0)*.13s)_both]',
        'st:max-[900px]:w-[min(380px,86vw)] st:motion-reduce:transition-none',
        copy && 'st:motion-reduce:hidden',
      ].filter(Boolean).join(' ')}
      aria-hidden={copy || undefined}
      inert={copy || undefined}
      style={{ '--t': `${card.tilt}deg`, '--y': `${card.lift}px`, '--z': (i % 9) + 1, '--n': i, '--from-r': `${i % 2 ? -9 : 9}deg` }}
    >
      <div
        className={[
          'st:relative st:aspect-[1.41] st:rounded-[4px] st:text-[#1B2A52] st:postcard-paper',
          'st:[transform:perspective(1000px)_rotateX(calc(var(--ty,0)*-3deg))_rotateY(calc(var(--tx,0)*4deg))]',
          'st:[transition:transform_.5s_var(--ease)] st:group-hover/pst:duration-200 st:motion-reduce:transition-none',
        ].join(' ')}
      >
        <p className="st:absolute st:top-[16px] st:left-[28px] st:m-0 st:[font:600_11px/1_var(--f)] st:tracking-[.32em] st:text-[rgba(27,42,82,.5)]" aria-hidden="true">
          TESTIMONIAL
        </p>
        <blockquote
          className='st:absolute st:inset-x-[28px] st:top-[40px] st:bottom-[84px] st:m-0 st:overflow-hidden st:[font:500_22px/28px_Caveat,"Segoe_Script",cursive] st:text-[#1B2A52] st:text-pretty st:max-[460px]:text-[19px] st:max-[460px]:leading-[24px]'
        >
          {/* the sender's photo in the stamp's place: a passport print stuck on the card, the handwriting wraps around it */}
          <Image
            className={[
              'st:float-right st:w-[78px] st:h-[96px] st:mt-[-6px] st:mr-[-2px] st:mb-[8px] st:ml-[16px] st:object-cover st:object-[50%_18%]',
              'st:border-[5px] st:border-solid st:border-[#FFFDF6] st:bg-[#fff] st:rotate-3 st:[shape-outside:margin-box]',
              'st:shadow-[0_1px_1px_rgba(40,25,10,.25),0_6px_10px_-4px_rgba(40,25,10,.5)]',
              'st:max-[460px]:w-[62px] st:max-[460px]:h-[78px]',
            ].join(' ')}
            src={card.photo}
            alt={copy ? '' : card.name}
            width={78}
            height={96}
          />
          {card.quote}
        </blockquote>
        {/* name and rank, written below the message */}
        <footer className="st:absolute st:inset-x-[28px] st:bottom-[20px] st:grid st:pt-[8px] st:[border-top:1px_solid_rgba(27,42,82,.25)]">
          <b className='st:[font:600_25px/28px_Caveat,"Segoe_Script",cursive] st:text-[#1B2A52]'>{card.name}</b>
          <em className='st:[font:500_18px/22px_Caveat,"Segoe_Script",cursive] st:text-[rgba(27,42,82,.75)]'>AIR {card.rank}, UPSC CSE {card.year}</em>
        </footer>
      </div>
    </article>
  );
}

export default function Stories() {
  return (
    <section className="sheet sheet--pad" id="stories" aria-labelledby="stH">
      <SectionLabel reveal={false}>Success stories</SectionLabel>
      <h2 id="stH" className="h2 h2--sec">
        {/* the heading rises out of its masked line */}
        <span className="st:block st:my-[-.1em] st:py-[.1em] st:overflow-hidden st:waiting:opacity-0">
          <span className="st:block st:motion-safe:dealt:animate-[st-line_.8s_cubic-bezier(.22,1,.36,1)_90ms_both]">Hear it from our students</span>
        </span>
      </h2>
      <div
        id="tcar"
        className={[
          'st:group/tcar st:block st:overflow-hidden st:mx-[calc(var(--px)*-1)] st:mt-0 st:mb-[-16px] st:pt-[112px] st:pb-[84px]',
          'st:[-webkit-mask-image:linear-gradient(90deg,transparent_0,#000_7%,#000_93%,transparent_100%)] st:[mask-image:linear-gradient(90deg,transparent_0,#000_7%,#000_93%,transparent_100%)]',
          'st:max-[1000px]:snap-x st:max-[1000px]:snap-mandatory st:max-[1000px]:[scrollbar-width:none]',
          'st:motion-reduce:overflow-x-auto st:motion-reduce:[-webkit-mask-image:none] st:motion-reduce:[mask-image:none]',
        ].join(' ')}
      >
        {/* two identical sets in one track: it slides left by exactly one set; hovering pauses it */}
        <div
          className="st:flex st:w-max st:items-start st:will-change-transform st:animate-[st-slide_var(--dur)_linear_infinite] st:group-hover/tcar:[animation-play-state:paused] st:motion-reduce:animate-none"
          style={{ '--dur': DURATION }}
        >
          {POSTCARDS.map((card, i) => <Postcard key={card.rank} card={card} i={i} />)}
          {POSTCARDS.map((card, i) => <Postcard key={`copy-${card.rank}`} card={card} i={i} copy />)}
        </div>
      </div>
    </section>
  );
}
