/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // inline the bundler CSS (the Tailwind sheets of Programmes and Success stories, ~13 KB) into the HTML: one render-blocking request
  // fewer (performance audit 2026-11-16)
  experimental: { inlineCss: true },
  turbopack: { root: import.meta.dirname },
};

export default nextConfig;
