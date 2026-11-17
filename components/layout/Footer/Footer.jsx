import Stylesheet from '@/components/ui/Stylesheet';
import { FOOTER, SOCIAL, NEWS, LEGAL, SITE_HOME } from './data';

// ============ FOOTER (user 2026-11-16: the footer from Kevin's build, eclectic-alfajores-975fab.netlify.app; version 6's "Footer –
// v5 (minimal)"): the cream paper in the site's gold frame; the logo and, opposite it, the six social icons over a hairline; four link
// columns and the latest current affairs beside them; the giant name pressed into the paper (an SVG deboss filter); the legal bar.
// It stays parked under the page, which slides up off it (footer-curtain.js). Content in data.js, styles public/css/footer-v6.css. ============
const ext = href => (href.startsWith('#') ? {} : { target: '_blank', rel: 'noopener' });
const ARROW = ['M2.5 8h11', 'M8.6 3.6C9.4 5.9 11.2 7.4 13.5 8 11.2 8.6 9.4 10.1 8.6 12.4'];

export default function Footer() {
  return (
    <footer className="vf">
      <Stylesheet href="/css/footer-v6.css" />
      <span className="foot__frame" aria-hidden="true" />
      <div className="vf__in">
        <div className="vf__bar">
          <a className="vf__logo" href="#top" aria-label="Vajiram & Ravi, back to top">
            <img src="/assets/img/brand/logo-v6-320.webp" srcSet="/assets/img/brand/logo-v6-320.webp 320w, /assets/img/brand/logo-v6.webp 617w" sizes="(max-width: 760px) 180px, 220px" alt="" width="320" height="107" loading="lazy" decoding="async" />
          </a>
          <ul className="vf__socials" aria-label="Vajiram & Ravi on social media">
            {SOCIAL.map(([label, key]) => (
              <li key={key}>
                <a href={SITE_HOME} target="_blank" rel="noopener" aria-label={label}>
                  <span className="vf__soc" style={{ '--m': `url(/assets/img/footer/social-${key}.svg)` }} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="vf__top">
          <nav className="vf__cols" aria-label="Footer">
            {FOOTER.map(([h, links]) => (
              <div key={h} className="vf__col">
                <h2 className="vf__h">{h}</h2>
                <ul>{links.map(([label, href]) => <li key={label}><a href={href} {...ext(href)}>{label}</a></li>)}</ul>
              </div>
            ))}
          </nav>
          <section className="vf__news" aria-labelledby="vfNewsH">
            <h2 className="vf__h vf__news-h" id="vfNewsH">Latest current affairs <span className="vf__live"><i aria-hidden="true" />Updated daily</span></h2>
            <ul className="vf__news-list">
              {NEWS.map(([tag, title, href]) => (
                <li key={title}>
                  <a href={href} target="_blank" rel="noopener">
                    <span className="vf__tag">{tag}</span>
                    <span className="vf__nt">{title}</span>
                    <svg className="vf__arw" viewBox="0 0 16 16" aria-hidden="true">{ARROW.map(d => <path key={d} d={d} />)}</svg>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="vf__word">
          <span className="vh">Vajiram &amp; Ravi</span>
          <svg aria-hidden="true" viewBox="0 0 1280 210" fill="none">
            <defs>
              {/* the deboss: a soft inner shade along the top, a light edge along the bottom and a white lip under it */}
              <filter id="vf-deboss" x="-2%" y="-10%" width="104%" height="125%" colorInterpolationFilters="sRGB">
                <feOffset in="SourceAlpha" dy="4" result="down" /><feGaussianBlur in="down" stdDeviation="2.6" result="downSoft" />
                <feComposite in="SourceAlpha" in2="downSoft" operator="out" result="topBand" />
                <feFlood floodColor="#5a2a10" floodOpacity=".2" result="shadeInk" /><feComposite in="shadeInk" in2="topBand" operator="in" result="innerShade" />
                <feOffset in="SourceAlpha" dy="-2.2" result="up" /><feGaussianBlur in="up" stdDeviation="1.1" result="upSoft" />
                <feComposite in="SourceAlpha" in2="upSoft" operator="out" result="bottomBand" />
                <feFlood floodColor="#ffffff" floodOpacity=".55" result="lightInk" /><feComposite in="lightInk" in2="bottomBand" operator="in" result="innerLight" />
                <feOffset in="SourceAlpha" dy="2" result="lipDown" /><feComposite in="lipDown" in2="SourceAlpha" operator="out" result="lipBand" />
                <feFlood floodColor="#ffffff" floodOpacity=".55" result="lipInk" /><feComposite in="lipInk" in2="lipBand" operator="in" result="lip" />
                <feMerge><feMergeNode in="lip" /><feMergeNode in="SourceGraphic" /><feMergeNode in="innerShade" /><feMergeNode in="innerLight" /></feMerge>
              </filter>
            </defs>
            <text x="640" y="172" textAnchor="middle" textLength="1272" lengthAdjust="spacingAndGlyphs" filter="url(#vf-deboss)">Vajiram &amp; Ravi</text>
          </svg>
        </div>
        <div className="vf__legal">
          <p>© 2026 Vajiram &amp; Ravi. All rights reserved</p>
          <nav aria-label="Legal">
            {LEGAL.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noopener">{label}</a>)}
            <span>Grievance redressal</span>
          </nav>
        </div>
      </div>
    </footer>
  );
}
