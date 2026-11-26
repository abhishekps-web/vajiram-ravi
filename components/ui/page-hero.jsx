import { Fragment } from 'react';
import SectionWrapper from '@/components/ui/section-wrapper';
import SectionLabel from '@/components/ui/section-label';
import '@/app/tailwind-sections.css';

const ROOT = "cu:relative cu:isolate cu:overflow-hidden cu:box-border cu:[clip-path:inset(0)] cu:flex cu:items-center cu:min-h-[calc(var(--sec-y)*1.3_+_14px_+_18px_+_30px_+_var(--hd-lbl)_+_clamp(40px,4.6vw,64px)*1.02_+_16px_+_28px)] cu:max-[768px]:min-h-[calc(var(--sec-y)*1.3_+_32px_+_clamp(40px,4.6vw,64px)*2.04_+_16px_+_84px)] cu:bg-[var(--hero-beige,#F3E8D6)] cu:before:content-[''] cu:before:fixed cu:before:inset-0 cu:before:-z-1 cu:before:pointer-events-none cu:before:bg-[url(/assets/img/patterns/grain.png)] cu:before:[background-size:220px] cu:before:mix-blend-soft-light cu:before:opacity-40";
const BG = 'cu:absolute cu:inset-y-0 cu:w-[34%] cu:-z-1 cu:pointer-events-none cu:bg-[url(/assets/img/photos/collage.webp)] cu:bg-no-repeat cu:[background-size:1040px_auto] cu:[filter:grayscale(1)_contrast(1.15)_brightness(1.04)] cu:mix-blend-multiply cu:opacity-[.11] cu:[mask-image:linear-gradient(270deg,#000_62%,transparent),linear-gradient(180deg,transparent,#000_40px)] cu:[mask-composite:intersect] cu:max-[1100px]:hidden';
const BG_L = 'cu:left-0 cu:[background-position:right_0_top_-60px] cu:[transform:scaleX(-1)]';
const BG_R = 'cu:right-0 cu:[background-position:right_0_top_-150px]';
const CRUMB = 'cu:flex cu:items-center cu:justify-center cu:gap-2.5 cu:mt-0 cu:mb-[18px] cu:[font:500_14px/1_var(--f)] cu:text-[rgba(42,26,12,.55)]';
const CRUMB_A = 'cu:text-[#2A1A0C] cu:underline cu:decoration-[rgba(42,26,12,.25)] cu:underline-offset-4 cu:[transition:color_.25s_var(--ease,ease),text-decoration-color_.25s_var(--ease,ease)] cu:hover:text-(--brand) cu:hover:decoration-(--brand) cu:focus-visible:text-(--brand) cu:focus-visible:decoration-(--brand)';
const TITLE = 'cu:m-0 cu:[font:400_clamp(40px,4.6vw,64px)/1.02_var(--f-title,Newsreader,Georgia,serif)] cu:tracking-[-.025em] cu:text-[#2A1A0C] cu:text-balance';
const LEDE = 'cu:mt-4 cu:mx-auto cu:mb-0 cu:max-w-[620px] cu:[font:500_18px/1.55_var(--f)] cu:text-[#3A2410] cu:text-pretty';

export default function PageHero({ id = 'pageHero', crumbs, eyebrow, title, children }) {
  return (
    <SectionWrapper id={id} labelledBy={`${id}H`} compact className={ROOT}>
      <span className={`${BG} ${BG_L}`} aria-hidden="true"></span>
      <span className={`${BG} ${BG_R}`} aria-hidden="true"></span>
      <div className="cu:w-full cu:text-center">
        {crumbs?.length > 0 && (
          <nav className={`rv ${CRUMB}`} aria-label="Breadcrumb" style={{ '--d': '.02s' }}>
            {crumbs.map(([href, t], i) => (
              <Fragment key={t}>
                {i > 0 && <span aria-hidden="true">/</span>}
                {href ? <a className={CRUMB_A} href={href}>{t}</a> : <span className="cu:text-[rgba(42,26,12,.6)]" aria-current="page">{t}</span>}
              </Fragment>
            ))}
          </nav>
        )}
        {eyebrow && <SectionLabel align="center" className="cu:mb-(--hd-lbl)">{eyebrow}</SectionLabel>}
        <h1 id={`${id}H`} className={`rv ${TITLE}`} style={{ '--d': '.1s' }}>{title}</h1>
        {children && <p className={`rv ${LEDE}`} style={{ '--d': '.18s' }}>{children}</p>}
      </div>
    </SectionWrapper>
  );
}
