import '@/app/tailwind-sections.css';
import ProgressBar from '@/components/ui/ProgressBar/ProgressBar';
// brand intro: Vajiram & Ravi reveal on orange (cu: utilities; its html states, keyframes and scroll lock are in
// app/tailwind-sections.css), run by the inline boot script ./boot.js from the first paint; every load, or once per session
// (INTRO_ONCE_PER_SESSION, lib/config.js); never under reduced motion.
// Rendered on the server so the overlay is in the first paint; it shows only while html.vrv-lock is set, which the boot
// script adds before paint (so without JS it never covers the page). No skip button (user 2026-11-16): Esc or a scroll
// still ends it early. boot.js waits for the `iris` animation to start, so that keyframe keeps its name.

export default function Intro() {
  return (
    <div id="intro" role="dialog" aria-modal="true" aria-label="Vajiram & Ravi"
      className="cu:fixed cu:inset-0 cu:z-1000 cu:hidden cu:overflow-visible cu:bg-[#120D09] cu:text-white cu:[animation:vrvIn_.3s_ease-out_both,vrvFail_0s_8s_forwards] cu:[transition:transform_.85s_cubic-bezier(.7,0,.2,1),opacity_.26s] cu:vrv-lock:block cu:vrv-out:[transform:translateY(calc(-100%_-_30px))]">
      <div className="cu:absolute cu:inset-0 cu:z-3 cu:grid cu:place-content-center cu:justify-items-center cu:p-6 cu:text-center cu:[clip-path:circle(0%_at_50%_52%)] cu:bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,#E85020_0%,#C2410C_55%,#A8380A_100%)] cu:vrv-play:[animation:iris_.8s_cubic-bezier(.65,0,.3,1)_forwards]">
        <span aria-hidden="true" className="cu:absolute cu:top-1/2 cu:left-1/2 cu:aspect-square cu:w-[min(760px,120vw,88svh)] cu:[transform:translate(-50%,-50%)] cu:bg-[url(/assets/img/patterns/mandala.svg)] cu:bg-contain cu:bg-center cu:bg-no-repeat cu:opacity-0 cu:[filter:brightness(0)_invert(1)] cu:vrv-play:[animation:vrv-ring_1.4s_.15s_cubic-bezier(.45,.05,.25,1)_forwards]" />
        <div role="img" aria-label="Vajiram & Ravi, Institute for IAS Examination"
          className="cu:relative cu:aspect-[966/227] cu:w-[min(460px,80vw)] cu:opacity-0 cu:before:absolute cu:before:top-[-14%] cu:before:left-[-2%] cu:before:aspect-square cu:before:w-[28%] cu:before:rounded-full cu:before:bg-[radial-gradient(circle,rgba(255,244,228,.95)_0_58%,rgba(255,244,228,0)_72%)] cu:vrv-play:[animation:vrv-logo_.85s_.3s_cubic-bezier(.2,.8,.2,1)_forwards]">
          <img className="cu:absolute cu:inset-0 cu:size-full cu:[clip-path:inset(0_76%_0_0)]" src="/assets/img/brand/logo-966.webp" alt="" width="966" height="227" />
          <img className="cu:absolute cu:inset-0 cu:size-full cu:[clip-path:inset(0_0_0_24%)] cu:[filter:brightness(0)_invert(1)]" src="/assets/img/brand/logo-966.webp" alt="" width="966" height="227" />
        </div>
        <p className="cu:relative cu:mx-0 cu:mt-[26px] cu:mb-0 cu:[font:400_clamp(22px,2.2vw,34px)/1.2_Newsreader,Georgia,serif] cu:tracking-[-.01em] cu:text-white">
          <span className="cu:inline-block cu:opacity-0 cu:vrv-play:[animation:vrv-tin_.6s_.6s_cubic-bezier(.45,.05,.25,1)_forwards]">Understanding India.</span>{' '}
          <span className="cu:inline-block cu:text-[#FFD48A] cu:opacity-0 cu:vrv-play:[animation:vrv-tin_.6s_.75s_cubic-bezier(.45,.05,.25,1)_forwards]">Shaping its Future.</span>
        </p>
      </div>
      <ProgressBar className="cu:absolute cu:top-0 cu:left-0 cu:z-4 cu:w-full cu:vrv-play:[&>b]:[animation:pbar-fill_var(--pb-t)_linear_forwards]" duration="2.3s" />
      <span aria-hidden="true" className="cu:absolute cu:right-0 cu:bottom-[-30px] cu:left-0 cu:h-[30px] cu:bg-[url(/assets/img/patterns/kinari.svg)] cu:bg-[length:40px_30px] cu:bg-[position:0_0] cu:bg-repeat-x" />
    </div>
  );
}
