import { SECTION_CSS } from '@/lib/css-layers.mjs';

const BUNDLED = process.env.NODE_ENV === 'development' ? new Set() : new Set(SECTION_CSS.map(n => `/css/${n}.css`));

export default function Stylesheet({ href }) {
  if (BUNDLED.has(href)) return null;
  return <link rel="stylesheet" href={href} precedence="sections" />;
}
