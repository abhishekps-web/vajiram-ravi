// The intro's inline boot script (app/layout.jsx puts it in <head>, so it runs before the first paint).
// It runs the whole intro without waiting for React: the reveal starts at the first paint, ends 2.5s after its first animation
// (the iris, Intro.jsx) starts (or on Esc / a wheel or touch scroll; no skip button, user 2026-11-16), and lifts; 8s at most in any case. Hydration on a slow phone can take seconds, so the intro used to wait for it and hold
// the page for that long on top of its own 2.5s.
// It only sets classes on <html> (which tolerates that before hydration), never touches the overlay's own nodes:
//   html.vrv-lock  the overlay shows and scrolling is held (Intro.jsx; the lock rules in app/tailwind-sections.css)
//   html.vrv-play  the reveal animations run
//   html.vrv-out   the curtain lifts (850ms), then all three are removed and 'vr:intro-done' fires on document
// A reload (or back / forward) from the middle of the page keeps its place (user 2026-11-21): the scroll position is saved when the page is left
// and put back by hand while the page settles. The intro still plays; html.vrv-restore lets the page scroll under the overlay (app/tailwind-sections.css),
// so the page is already in place when the curtain lifts.
// No intro under prefers-reduced-motion, and with oncePerSession only on the first page of a browser session.
const PLAY = 2500, LIFT = 850, SAFETY = 8000;

export default function introBoot({ oncePerSession = false } = {}) {
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
