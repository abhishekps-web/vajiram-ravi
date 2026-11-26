'use client';

import { useEffect } from 'react';

// Development only (rendered from app/layout.jsx when NODE_ENV is "development"; never in a production build).
// The stylesheets in public/css are plain <link>s, not bundled (see stylesheet.jsx for why), so Next's hot reload does not see
// them and an edit needed a page refresh. This checks each /css/ sheet's ETag about once a second (the dev server sends a new one
// when the file changes) and, when one changes, loads the new copy in a <link> right after the original, so the cascade order holds,
// then switches the original off once the new one has loaded (no unstyled flash). The originals belong to React, so they are only
// disabled, never moved or removed; the copies are ours and are replaced on the next change.
const INTERVAL = 1000;

export default function DevCssReload() {
  useEffect(() => {
    const tags = new Map();    // original <link> -> last ETag seen
    const copies = new Map();  // original <link> -> our current copy
    let busy = false;

    const sheets = () => [...document.querySelectorAll('link[rel="stylesheet"]')]
      .filter(l => !l.hasAttribute('data-dev-copy') && new URL(l.href, location.href).origin === location.origin && new URL(l.href).pathname.startsWith('/css/'));

    const swap = (orig) => {
      const url = new URL(orig.href); url.searchParams.set('v', Date.now());
      const next = document.createElement('link');
      next.rel = 'stylesheet'; next.href = url.href; next.dataset.devCopy = '';
      const prev = copies.get(orig);
      (prev || orig).after(next);
      next.onload = () => { orig.disabled = true; prev?.remove(); };
      copies.set(orig, next);
      console.info(`[dev] reloaded ${url.pathname}`);
    };

    const check = async () => {
      if (busy || document.hidden) return;
      busy = true;
      try {
        await Promise.all(sheets().map(async (l) => {
          const res = await fetch(new URL(l.href).pathname, { method: 'HEAD', cache: 'no-store' });
          const tag = res.headers.get('etag') || res.headers.get('last-modified');
          if (!tag) return;
          if (tags.has(l) && tags.get(l) !== tag) swap(l);
          tags.set(l, tag);
        }));
      } catch { /* the dev server restarting: try again next tick */ }
      busy = false;
    };

    check();
    const id = setInterval(check, INTERVAL);
    return () => clearInterval(id);
  }, []);
  return null;
}
