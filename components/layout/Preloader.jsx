import '@/app/tailwind-sections.css';
import ProgressBar from '@/components/ui/progress-bar';

// The preloader (the brand intro): the Vajiram & Ravi reveal on orange (iris, mandala ring, logo, tagline, curtain lifts). No video.
// One file, three parts:
//   Preloader       the overlay markup (cu: utilities; its html states, keyframes and scroll lock are in app/tailwind-sections.css)
//   preloaderBoot() the inline boot script app/layout.jsx puts in <head>: it runs the whole intro from the first paint, never waiting for React
//   initPreloader() the behaviour lib/behaviour.js runs after hydration: makes the page behind inert while the intro still plays
// Every load, or once per session (INTRO_ONCE_PER_SESSION, lib/config.js); never under reduced motion.
// Rendered on the server so the overlay is in the first paint; it shows only while html.vrv-lock is set, which the boot
// script adds before paint (so without JS it never covers the page). No skip button (user 2026-11-16): Esc or a scroll
// still ends it early. preloaderBoot waits for the `iris` animation to start, so that keyframe keeps its name.

export default function Preloader() {
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

// The boot script. The reveal starts at the first paint, ends 2.5s after its first animation (the iris) starts (or on Esc / a
// wheel or touch scroll; no skip button, user 2026-11-16), and lifts; 8s at most in any case. Hydration on a slow phone can take
// seconds, so the intro used to wait for it and hold the page for that long on top of its own 2.5s.
// It only sets classes on <html> (which tolerates that before hydration), never touches the overlay's own nodes:
//   html.vrv-lock  the overlay shows and scrolling is held (the lock rules in app/tailwind-sections.css)
//   html.vrv-play  the reveal animations run
//   html.vrv-out   the curtain lifts (850ms), then all three are removed and 'vr:intro-done' fires on document
// A reload (or back / forward) from the middle of the page keeps its place (user 2026-11-21): the scroll position is saved when the page is left
// and put back by hand while the page settles. The intro still plays; html.vrv-restore lets the page scroll under the overlay (app/tailwind-sections.css),
// so the page is already in place when the curtain lifts.
// No intro under prefers-reduced-motion, and with oncePerSession only on the first page of a browser session.
const PLAY = 2500, LIFT = 850, SAFETY = 8000;

export function preloaderBoot({ oncePerSession = false } = {}) {
  return `(function(r){r.classList.add('js');
var nav=performance.getEntriesByType&&performance.getEntriesByType('navigation')[0],again=nav&&(nav.type==='reload'||nav.type==='back_forward'),y=0;
try{if(again&&!location.hash)y=+sessionStorage.getItem('vr-scroll')||0}catch(e){}
addEventListener('pagehide',function(){try{sessionStorage.setItem('vr-scroll',String(Math.round(scrollY)))}catch(e){}});
if(y>0){var stop=0;try{history.scrollRestoration='manual'}catch(e){}
var put=function(){if(!stop&&Math.abs(scrollY-y)>2)scrollTo({top:y,left:0,behavior:'instant'})},halt=function(){if(!r.classList.contains('vrv-lock'))stop=1};
addEventListener('wheel',halt,{passive:true});addEventListener('touchmove',halt,{passive:true});addEventListener('keydown',halt);
document.addEventListener('DOMContentLoaded',put);addEventListener('load',put);[200,600,1200,2500].forEach(function(ms){setTimeout(put,ms)});document.addEventListener('vr:intro-done',put);put();}
if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return;
${oncePerSession ? "try{if(sessionStorage.getItem('vr-intro'))return;sessionStorage.setItem('vr-intro','1')}catch(e){}" : ''}
r.classList.add('vrv-lock','vrv-play');if(y>0)r.classList.add('vrv-restore');
var done=0,t=0;
function off(){removeEventListener('keydown',key);removeEventListener('wheel',fin);removeEventListener('touchmove',fin);}
function fin(){if(done)return;done=1;clearTimeout(t);off();r.classList.add('vrv-out');
setTimeout(function(){r.classList.remove('vrv-lock','vrv-play','vrv-out','vrv-restore');document.dispatchEvent(new CustomEvent('vr:intro-done'));},${LIFT});}
function key(e){if(e.key==='Escape')fin();}
addEventListener('keydown',key);
addEventListener('wheel',fin,{passive:true});addEventListener('touchmove',fin,{passive:true});
document.addEventListener('animationstart',function a(e){if(e.animationName!=='iris')return;document.removeEventListener('animationstart',a);t=setTimeout(fin,${PLAY});});
setTimeout(fin,${SAFETY});
})(document.documentElement)`.replace(/\n/g, '');
}

// After hydration the intro has often ended. If it is still playing, the page behind it is made inert, so Tab cannot reach it,
// until it lifts ('vr:intro-done').
export function initPreloader() {
  'use strict';
  var root = document.documentElement;
  if (!document.getElementById('intro') || !root.classList.contains('vrv-lock')) return;
  var behind = [].filter.call(document.body.children, function (n) { return n.id !== 'intro' && !n.inert; });
  behind.forEach(function (n) { n.inert = true; });
  document.addEventListener('vr:intro-done', function () { behind.forEach(function (n) { n.inert = false; }); }, { once: true });
}
