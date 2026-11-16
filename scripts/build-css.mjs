// Joins the base stylesheets (lib/css-layers.mjs) into public/css/base.bundle.css, in cascade order, for production. Runs before
// `next build` (npm "prebuild"). It only removes comments and blank lines: no minifier, because rewriting declarations is what broke
// the separate translate / scale reveals before (see CLAUDE.md, "Styles"). Asset URLs are root-relative, so they work unchanged.
import { readFileSync, writeFileSync } from 'node:fs';
import { BASE_CSS } from '../lib/css-layers.mjs';

// remove /* comments */, leaving anything inside a quoted string alone
function stripComments(css) {
  let out = '', i = 0, q = null;
  while (i < css.length) {
    const c = css[i];
    if (q) { out += c; if (c === '\\') { out += css[i + 1] ?? ''; i += 2; continue; } if (c === q) q = null; i++; continue; }
    if (c === '"' || c === "'") { q = c; out += c; i++; continue; }
    if (c === '/' && css[i + 1] === '*') { const end = css.indexOf('*/', i + 2); i = end < 0 ? css.length : end + 2; continue; }
    out += c; i++;
  }
  return out;
}

const parts = BASE_CSS.map(n => `/* ${n}.css */\n` + stripComments(readFileSync(`public/css/${n}.css`, 'utf8')).replace(/[ \t]+$/gm, '').replace(/\n{2,}/g, '\n').trim());
const css = parts.join('\n') + '\n';
writeFileSync('public/css/base.bundle.css', css);
console.log(`css: ${BASE_CSS.length} base stylesheets -> public/css/base.bundle.css (${Math.round(css.length / 1024)} KB)`);
