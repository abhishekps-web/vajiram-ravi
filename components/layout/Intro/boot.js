// The intro's inline boot script (app/layout.jsx puts it in <head>, so it runs before the first paint).
// It runs the whole intro without waiting for React: the reveal starts at the first paint, ends 2.5s after its first animation
// (the iris, intro.css) starts (or on Skip / Esc / a wheel or touch scroll), and lifts; 8s at most in any case. Hydration on a slow phone can take seconds, so the intro used to wait for it and hold
// the page for that long on top of its own 2.5s.
// It only sets classes on <html> (which tolerates that before hydration), never touches the overlay's own nodes:
//   html.vrv-lock  the overlay shows and scrolling is held (public/css/intro.css)
//   html.vrv-play  the reveal animations run
//   html.vrv-out   the curtain lifts (850ms), then all three are removed and 'vr:intro-done' fires on document
// No intro under prefers-reduced-motion, and with oncePerSession only on the first page of a browser session.
const PLAY = 2500, LIFT = 850, SAFETY = 8000;

export default function introBoot({ oncePerSession = false } = {}) {
  return `(function(r){r.classList.add('js');
if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return;
${oncePerSession ? "try{if(sessionStorage.getItem('vr-intro'))return;sessionStorage.setItem('vr-intro','1')}catch(e){}" : ''}
r.classList.add('vrv-lock','vrv-play');
var done=0,t=0;
function off(){document.removeEventListener('click',clk,true);removeEventListener('keydown',key);removeEventListener('wheel',fin);removeEventListener('touchmove',fin);}
function fin(){if(done)return;done=1;clearTimeout(t);off();r.classList.add('vrv-out');
setTimeout(function(){r.classList.remove('vrv-lock','vrv-play','vrv-out');document.dispatchEvent(new CustomEvent('vr:intro-done'));},${LIFT});}
function clk(e){if(e.target.closest&&e.target.closest('.vrv__skip'))fin();}
function key(e){if(e.key==='Escape')fin();}
document.addEventListener('click',clk,true);addEventListener('keydown',key);
addEventListener('wheel',fin,{passive:true});addEventListener('touchmove',fin,{passive:true});
document.addEventListener('animationstart',function a(e){if(e.animationName!=='iris')return;document.removeEventListener('animationstart',a);t=setTimeout(fin,${PLAY});});
setTimeout(fin,${SAFETY});
})(document.documentElement)`.replace(/\n/g, '');
}
