#!/usr/bin/env node
// Motion check for the Vajiram & Ravi site (site-motion skill). Headless Chrome over the DevTools protocol, no npm packages.
// Usage: node motion-check.js "<section selector>" [--hover "<selector>"] [--out <path prefix>] [--width 1440] [--height 900] [--mobile] [--url <url>]
// Reports console errors, content elements in the section with no transition/animation on themselves or any ancestor inside the
// section, and (with --hover) the computed transform of the first match before/after a forced :hover. Writes <out>.png and <out>-hover.png.
const { spawn } = require('child_process');
const fs = require('fs'), path = require('path'), os = require('os');

const argv = process.argv.slice(2);
const opt = (k, d) => { const i = argv.indexOf(k); return i < 0 ? d : argv[i + 1]; };
const sel = argv[0] && !argv[0].startsWith('--') ? argv[0] : 'main';
const hover = opt('--hover');
const W = +opt('--width', 1440), H = +opt('--height', 900), mobile = argv.includes('--mobile');
const out = opt('--out', path.join(os.tmpdir(), 'motion-check'));
const url = opt('--url', 'file:///' + path.resolve(__dirname, '../../../../index.html').replace(/\\/g, '/'));
const CHROME = [process.env.CHROME, 'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium'].find(p => p && fs.existsSync(p));
if (!CHROME) { console.error('No Chrome/Edge found; set CHROME=<path>.'); process.exit(2); }

const port = 9200 + Math.floor(Math.random() * 700);
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'mc-'));
const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, '--allow-file-access-from-files', 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
const done = code => { try { chrome.kill(); } catch {} setTimeout(() => { try { fs.rmSync(profile, { recursive: true, force: true }); } catch {} process.exit(code); }, 300); };

(async () => {
  let tabs;
  for (let i = 0; i < 60 && !tabs; i++) { try { tabs = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); } catch { await sleep(200); } }
  const ws = new WebSocket(tabs.find(t => t.type === 'page').webSocketDebuggerUrl);
  await new Promise(r => (ws.onopen = r));
  let id = 0; const pend = {}; const errors = [];
  ws.onmessage = e => {
    const m = JSON.parse(e.data);
    if (m.id && pend[m.id]) { pend[m.id](m); delete pend[m.id]; }
    if (m.method === 'Runtime.exceptionThrown') errors.push(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text);
    if (m.method === 'Log.entryAdded' && m.params.entry.level === 'error') errors.push(`${m.params.entry.text} ${m.params.entry.url || ''}`.trim());
  };
  const send = (method, params = {}) => new Promise(r => { const i = ++id; pend[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async x => (await send('Runtime.evaluate', { expression: x, awaitPromise: true, returnByValue: true })).result?.result?.value;

  await send('Runtime.enable'); await send('Log.enable'); await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile });
  await send('Page.navigate', { url });
  await sleep(3000);
  await ev(`(document.querySelector('.vrv__skip')||{click(){}}).click()`);
  await sleep(1200);
  const S = JSON.stringify(sel);
  const ok = await ev(`!!document.querySelector(${S})`);
  if (!ok) { console.error(`No element matches ${sel}`); return done(1); }
  // scroll through the section so scroll-driven reveals fire, then park at its top
  await ev(`(async()=>{const t=document.querySelector(${S});const y0=t.getBoundingClientRect().top+scrollY;for(let y=Math.max(0,y0-innerHeight);y<=y0+t.offsetHeight;y+=300){scrollTo(0,y);await new Promise(r=>setTimeout(r,50));}scrollTo(0,y0);})()`);
  await sleep(1200);

  const report = await ev(`(()=>{
    const root=document.querySelector(${S});
    const moves=el=>{const cs=getComputedStyle(el);return cs.transitionDuration.split(',').some(d=>parseFloat(d)>0)||cs.animationName!=='none';};
    const label=el=>el.tagName.toLowerCase()+(el.id?'#'+el.id:'')+(el.classList.length?'.'+[...el.classList].slice(0,2).join('.'):'');
    const content=[...root.querySelectorAll('h1,h2,h3,h4,p,img,a,button,li,figure,dt,summary')].filter(el=>el.getClientRects().length>0);
    const stat=content.filter(el=>{for(let n=el;n&&n!==root.parentElement;n=n.parentElement){if(moves(n))return false;}return true;});
    const r=root.getBoundingClientRect();
    return {top:r.top+scrollY,h:root.offsetHeight,total:content.length,static:stat.slice(0,40).map(label),staticCount:stat.length};
  })()`);
  console.log(`section ${sel}: ${report.total} content elements, ${report.staticCount} with no motion on themselves or any ancestor`);
  if (report.static.length) console.log('static:', report.static.join('  '));

  const shot = async file => {
    const r = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: report.top, width: W, height: Math.min(report.h, 5000), scale: 1 } });
    fs.writeFileSync(file, Buffer.from(r.result.data, 'base64')); console.log('wrote', file);
  };
  await shot(out + '.png');

  if (hover) {
    const H1 = JSON.stringify(hover);
    const probe = `(()=>{const el=document.querySelector(${H1});if(!el)return null;const out={};[el,...el.querySelectorAll('*')].forEach((n,i)=>{const cs=getComputedStyle(n);out[i]=cs.transform+'|'+cs.opacity+'|'+cs.color+'|'+cs.backgroundColor+'|'+getComputedStyle(n,'::before').transform;});return out;})()`;
    const before = await ev(probe);
    if (!before) console.log(`--hover: no element matches ${hover}`);
    else {
      await send('DOM.enable'); await send('CSS.enable');
      const doc = await send('DOM.getDocument', { depth: -1 });
      const q = await send('DOM.querySelector', { nodeId: doc.result.root.nodeId, selector: hover });
      await send('CSS.forcePseudoState', { nodeId: q.result.nodeId, forcedPseudoClasses: ['hover'] });
      await sleep(1100);
      const after = await ev(probe);
      const changed = Object.keys(before).filter(k => before[k] !== after[k]).length;
      console.log(`hover ${hover}: ${changed} of ${Object.keys(before).length} nodes change style on :hover${changed ? '' : '  <-- NO HOVER MOTION'}`);
      await shot(out + '-hover.png');
    }
  }
  console.log('errors:', errors.length ? '\n  ' + errors.join('\n  ') : 'none');
  done(errors.length ? 1 : 0);
})().catch(e => { console.error(e); done(1); });
