import Button from '@/components/ui/button';
import { $$, reduce } from '@/lib/site';
import '@/app/tailwind-sections.css';

const TICKET = [
  'cu:group cu:relative cu:min-w-0 cu:[transform-style:preserve-3d] cu:will-change-[translate] cu:[filter:drop-shadow(0_14px_15px_rgba(102,38,13,.1))]',
  'cu:[transition:translate_.45s_cubic-bezier(.22,1,.36,1),transform_.5s_cubic-bezier(.22,1,.36,1),filter_.4s]!',
  'cu:hover:z-[2] cu:focus-within:z-[2] cu:hover:translate-y-[-5px] cu:focus-within:translate-y-[-5px]',
  'cu:fine:hover:translate-y-[-8px] cu:fine:hover:[transform:perspective(1000px)_rotateX(calc(var(--ty,0)*-7deg))_rotateY(calc(var(--tx,0)*9deg))]',
  'cu:fine:hover:[filter:drop-shadow(calc(var(--tx,0)*-14px)_calc(24px_-_var(--ty,0)*10px)_18px_rgba(102,38,13,.3))]',
  'cu:fine:hover:[transition:translate_.45s_cubic-bezier(.22,1,.36,1),transform_.14s_linear,filter_.2s]!',
  'cu:motion-reduce:[transition:none]! cu:motion-reduce:[transform:none]!',
].join(' ');
const FLAGSHIP = 'cu:animate-[flagClock_7.5s_cubic-bezier(.45,.05,.55,.95)_1.2s_infinite] cu:motion-reduce:animate-none';

const FRAME = [
  'cu:relative cu:flex cu:flex-col cu:h-full cu:p-0 cu:rounded-(--r-card) cu:bg-white cu:text-(--ink) cu:overflow-hidden cu:[mask:var(--ticket-notch)]',
  'cu:shadow-[inset_0_1px_0_rgba(255,255,255,.9),inset_0_-2px_0_rgba(120,60,20,.06)]',
  "cu:after:content-[''] cu:after:absolute cu:after:inset-0 cu:after:z-[4] cu:after:pointer-events-none cu:after:opacity-0 cu:after:transition-opacity cu:after:duration-300 cu:after:mix-blend-soft-light",
  'cu:after:[background:radial-gradient(circle_at_var(--gx,50%)_var(--gy,30%),rgba(255,255,255,.6),rgba(255,255,255,.14)_34%,transparent_62%)] cu:fine:group-hover:after:opacity-100',
].join(' ');
const FRAME_FLAGSHIP = 'cu:[transform:perspective(1000px)_rotateY(var(--fr))_scale(var(--fz))] cu:motion-reduce:[transform:none]';

const HEAD = [
  'cu:relative cu:isolate cu:flex cu:items-start cu:justify-between cu:gap-[12px] cu:min-h-[92px] cu:py-[13px] cu:px-[20px] cu:bg-(--ticket) cu:text-white cu:overflow-hidden',
  'cu:shadow-[inset_0_1px_0_rgba(255,255,255,.28),inset_0_-10px_18px_-12px_rgba(0,0,0,.3)]',
  "cu:after:content-[''] cu:after:absolute cu:after:inset-[7px] cu:after:[border:1px_solid_rgba(255,255,255,.19)] cu:after:rounded-[2px_2px_0_0] cu:after:pointer-events-none",
].join(' ');
const HEAD_FLAGSHIP = "cu:before:content-[''] cu:before:absolute cu:before:inset-0 cu:before:z-[3] cu:before:pointer-events-none cu:before:rounded-[inherit] cu:before:[background:var(--flag-glint)_var(--fs,120%)_0/260%_100%_no-repeat] cu:before:mix-blend-color-dodge cu:motion-reduce:before:[background:none]";

const STUB = "cu:relative cu:flex-none cu:flex cu:items-center cu:h-[66px] cu:px-[20px] cu:before:content-[''] cu:before:absolute cu:before:left-[18px] cu:before:right-[18px] cu:before:top-0 cu:before:[border-top:1.5px_dashed_#C9A98C]";
const STUB_FLAGSHIP = "cu:after:content-[''] cu:after:absolute cu:after:z-[3] cu:after:pointer-events-none cu:after:top-1/2 cu:after:left-[20px] cu:after:right-[20px] cu:after:h-[48px] cu:after:-translate-y-1/2 cu:after:rounded-full cu:after:[background:var(--flag-glint)_var(--fb,120%)_0/260%_100%_no-repeat] cu:after:mix-blend-color-dodge cu:motion-reduce:after:[background:none]";

const ENROL = 'cu:[--btn-shadow:inset_0_1px_0_rgba(255,255,255,.4),inset_0_-3px_0_rgba(120,30,0,.25),0_6px_10px_-6px_rgba(198,70,19,.5)]! cu:fine:group-hover:[--btn-shadow:inset_0_1px_0_rgba(255,255,255,.45),inset_0_-3px_0_rgba(120,30,0,.3),0_12px_16px_-8px_rgba(198,70,19,.7)]!';

export default function BatchCard({ b, fam, year }) {
  const [d, mon] = b.d.split(' ');
  const flagship = b.chip === 'Flagship';
  const limited = b.chip === 'Limited seats';
  return (
    <article className={`${TICKET} ${flagship ? FLAGSHIP : ''}`} style={{ '--ticket': fam.c }}>
      <div className={`${FRAME} ${flagship ? FRAME_FLAGSHIP : ''}`}>
        <div className={`${HEAD} ${flagship ? HEAD_FLAGSHIP : ''}`}>
          <img className="cu:absolute cu:right-0 cu:bottom-0 cu:w-[140px] cu:h-[74px] cu:opacity-65 cu:-z-1" src="/assets/img/brand/lotus-ticket.svg" alt="" aria-hidden="true" />
          <div>
            <span className="cu:block cu:text-[11.5px] cu:leading-[1.35] cu:font-semibold">Batch starts</span>
            <time className="cu:flex cu:items-end cu:gap-[8px] cu:mt-[2px]">
              <b className="cu:[font:700_38px/1_var(--f-d)] cu:tracking-[-.03em]">{d}</b>
              <span className="cu:grid cu:pb-[4px] cu:[font:600_14px/1.2_var(--f)]">{mon || ''}<small className="cu:text-[12px] cu:font-semibold cu:opacity-75">{year}</small></span>
            </time>
          </div>
          <span className="cu:block cu:pt-[2px] cu:text-right cu:text-[11.5px] cu:leading-[1.35] cu:font-semibold cu:text-white/60">Target exam<strong className="cu:block cu:mt-[4px] cu:text-[13px] cu:font-semibold cu:text-white">UPSC {b.tgt}</strong></span>
        </div>
        <div className="cu:flex cu:flex-col cu:flex-1 cu:pt-[12px] cu:px-[20px] cu:pb-[8px]">
          <span className="cu:m-0 cu:text-(--ticket) cu:[font:700_12px/1.2_var(--f)] cu:uppercase cu:tracking-[.06em]">{fam.t}{flagship ? ' · Flagship' : ''}</span>
          <h3 className="cu:mt-[6px] cu:mb-0 cu:text-(--ink) cu:[font:600_28px/1.12_var(--f-d)] cu:tracking-[-.02em] cu:max-[640px]:text-[24px] cu:text-balance">{b.n}</h3>
          {b.what && <p className="cu:mt-[4px] cu:mb-0 cu:text-(--body) cu:text-[14px] cu:leading-[1.4]">{b.what}</p>}
          <div className="cu:relative cu:box-border cu:flex cu:items-end cu:justify-between cu:gap-[12px] cu:mt-auto cu:pt-[8px] cu:min-h-[78px]">
            <dl className={`cu:grid cu:gap-0 cu:m-0 cu:p-0 cu:text-[14.5px] cu:leading-[1.5] cu:text-(--body) ${limited ? 'cu:pr-[90px]' : ''}`}>
              <div>
                <dt className="cu:text-[10.5px] cu:font-semibold cu:uppercase cu:tracking-[.06em] cu:text-[#8D6E5E]">Study mode</dt>
                <dd className="cu:mt-[2px] cu:mx-0 cu:mb-0 cu:text-(--ink) cu:text-[13.5px] cu:leading-[1.35]">Classroom and LIVE{'‑'}Online</dd>
              </div>
            </dl>
            {limited && (
              <span aria-label="Limited seats" className="cu:absolute cu:right-0 cu:bottom-[-4px] cu:m-0 cu:grid cu:place-items-center cu:size-[82px] cu:rounded-full cu:[border:2px_solid_#C4482C] cu:text-[#B13D24] cu:rotate-[-12deg] cu:text-center cu:before:content-[''] cu:before:absolute cu:before:inset-[4px] cu:before:[border:1px_solid_currentColor] cu:before:rounded-full">
                <span className="cu:uppercase cu:[font:700_12px/1.4_var(--f)] cu:tracking-[.08em]">Limited<br />seats</span>
              </span>
            )}
          </div>
        </div>
        <div className={`${STUB} ${flagship ? STUB_FLAGSHIP : ''}`}>
          <Button href="#contact" ariaLabel={`Enroll now in ${b.full}`} iconEnd="arrow" fullWidth className={ENROL} data-prog={b.full}>Enroll now</Button>
        </div>
      </div>
    </article>
  );
}

export function initBatchTickets() {
  if (reduce || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  $$('#price > article, #batchGrid article').forEach(c => {
    c.addEventListener('pointermove', e => {
      const r = c.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      c.style.setProperty('--tx', (px - .5).toFixed(3));
      c.style.setProperty('--ty', (py - .5).toFixed(3));
      c.style.setProperty('--gx', (px * 100).toFixed(0) + '%');
      c.style.setProperty('--gy', (py * 100).toFixed(0) + '%');
    });
    c.addEventListener('pointerleave', () => { c.style.setProperty('--tx', 0); c.style.setProperty('--ty', 0); });
  });
}
