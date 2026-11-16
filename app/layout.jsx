import Intro from '@/components/layout/Intro/Intro';
import SiteBehaviour from '@/components/layout/SiteBehaviour';
import DevCssReload from '@/components/layout/DevCssReload';
import introBoot from '@/components/layout/Intro/boot';
import { ENABLE_PRELOADER, INTRO_ONCE_PER_SESSION } from '@/lib/config';

export const metadata = {
  title: 'Best IAS Coaching in Delhi, India | Vajiram & Ravi IAS Institute',
  description: 'Vajiram & Ravi, the best IAS coaching in Delhi since 1976. UPSC CSE classroom and LIVE-Online programmes for Prelims, Mains and Interview.',
  icons: { icon: '/assets/img/brand/emblem.png' },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#C2410C',
};

const FONTS = 'https://fonts.googleapis.com/css2?family=Caveat:wght@500;600&family=Geist:wght@500&family=Anek+Devanagari:wght@500&family=Geist+Mono:wght@400&family=Hanken+Grotesk:wght@400;500;600;700;800&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,300;1,6..72,400;1,6..72,500&family=League+Spartan:wght@600;700&family=Mukta:wght@400;500;600;700&family=Tiro+Devanagari+Hindi:ital@0;1&display=swap';

// The base stylesheet layers in public/css, in cascade order (order matters: later layers override earlier ones).
const CSS_LAYERS = ['v25', 'v26', 'v27', 'v28', 'v43', 'v45', 'v46', 'v48', 'v49'];

// Runs before paint: html.js (the CSS's JS-on hooks) and, with the preloader on (ENABLE_PRELOADER, lib/config.js), the intro
// itself (components/layout/Intro/boot.js: html.vrv-lock shows the overlay and holds scrolling until it lifts). With the
// preloader off only html.js is set.
const BOOT = ENABLE_PRELOADER
  ? introBoot({ oncePerSession: INTRO_ONCE_PER_SESSION })
  : "document.documentElement.classList.add('js')";

export default function RootLayout({ children }) {
  return (
    // the behaviours set classes (js, vrv-lock, foot-curtain ...) and lang on <html>/<body> before and after hydration
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={FONTS} />
        {/* the site stylesheet, served as-is from public/css: the layers v25 -> ... -> v49, linked in cascade order (each its
            own <link>, so they download in parallel; they used to @import each other, a chain that held first paint ~3s on
            phones). Sections add their own sheets after them (components/ui/Stylesheet.jsx, precedence "sections"). */}
        {/* the button system (components/ui/Button) comes first: placement rules in the layers after it always win, so
            sections position buttons without restyling them */}
        <link rel="stylesheet" href="/css/buttons.css" precedence="base" />
        {CSS_LAYERS.map(v => <link key={v} rel="stylesheet" href={`/css/${v}.css`} precedence="base" />)}
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      </head>
      <body suppressHydrationWarning>
        {ENABLE_PRELOADER && <Intro />}
        {children}
        <SiteBehaviour />
        {process.env.NODE_ENV === 'development' && <DevCssReload />}   {/* live-reloads public/css edits (dev only) */}
      </body>
    </html>
  );
}
