import Intro from '@/components/layout/Intro/Intro';
import SiteBehaviour from '@/components/layout/SiteBehaviour';
import { ENABLE_PRELOADER } from '@/lib/config';

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

// Runs before paint: html.js (the CSS's JS-on hooks) and, with the preloader on (ENABLE_PRELOADER, lib/config.js), html.vrv-lock
// (shows the intro overlay and holds scrolling until the intro lifts it; if the intro never starts, the lock is released so the
// page cannot stay covered). With the preloader off only html.js is set.
const BOOT = ENABLE_PRELOADER
  ? "(function(r){r.classList.add('js','vrv-lock');setTimeout(function(){var v=document.querySelector('.vrv');" +
    "if(v&&!v.classList.contains('vrv--fin')){v.hidden=true;r.classList.remove('vrv-lock');}},8000);})(document.documentElement)"
  : "document.documentElement.classList.add('js')";

export default function RootLayout({ children }) {
  return (
    // the behaviours set classes (js, vrv-lock, foot-curtain ...) and lang on <html>/<body> before and after hydration
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={FONTS} />
        {/* the site stylesheet, served as-is from public/css: v49.css @imports the earlier layers (v48 -> ... -> v25) in
            cascade order. Sections add their own sheets after it (components/ui/Stylesheet.jsx, precedence "sections"). */}
        {/* the button system (components/ui/Button) comes first: placement rules in the layers after it always win, so
            sections position buttons without restyling them */}
        <link rel="stylesheet" href="/css/buttons.css" precedence="base" />
        <link rel="stylesheet" href="/css/v49.css" precedence="base" />
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      </head>
      <body suppressHydrationWarning>
        {ENABLE_PRELOADER && <Intro />}
        {children}
        <SiteBehaviour />
      </body>
    </html>
  );
}
