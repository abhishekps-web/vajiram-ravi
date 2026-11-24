import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

/** @type {import('next').NextConfig} */
const base = {
  output: 'export',
  images: { unoptimized: true },
  // inline the bundler CSS (the Tailwind sheets of Programmes and Success stories, ~13 KB) into the HTML: one render-blocking request
  // fewer (performance audit 2026-11-16)
  experimental: { inlineCss: true },
  turbopack: { root: import.meta.dirname },
};

// The static pages in public/ (the course finder) are served by Cloudflare as folder/index.html. The dev server does not do that, so
// in development only /coursefinder goes to /coursefinder/ (trailing slashes, so the page's relative css/ and js/ links resolve) and that to its index.html.
const devStatic = {
  allowedDevOrigins: ['192.168.*.*', '10.*.*.*', '172.16.*.*'],
  trailingSlash: true,
  async rewrites() { return [{ source: '/coursefinder/', destination: '/coursefinder/index.html' }]; },
};

export default phase => (phase === PHASE_DEVELOPMENT_SERVER ? { ...base, ...devStatic } : base);
