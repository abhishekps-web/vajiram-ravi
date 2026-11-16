import Button from '@/components/ui/Button/Button';
import Stylesheet from '@/components/ui/Stylesheet';
import { TRENDING } from './data';

/**
 * What's trending (user 2026-11-16): the banner carousel under the hero stats, ported from Kevin's build
 * (eclectic-alfajores-975fab.netlify.app, css/trending.css + js/trending.js). One wide banner at a time sliding sideways in an
 * endless loop; dots under it, the current one filling with the banner's 6 s; previous / next on the banner's edges while the
 * pointer is over it. Content in data.js (TRENDING), behaviour trending.js, styles public/css/trending.css. The CTA is the site's
 * primary Button. The first banner is in place on the server; trending.js lays out the rest.
 */
export default function Trending() {
  const n = TRENDING.length;
  return (
    <>
      <Stylesheet href="/css/trending.css" />
      <div className="tr" id="trending" role="region" aria-roledescription="carousel" aria-label="What’s trending">
        <div className="tr__stage">
          <div className="tr__track">
            {TRENDING.map((s, i) => (
              <article key={s.h} className={`tr__slide tr__slide--${s.tone}${i === 0 ? ' is-on' : ''}`} role="group" aria-roledescription="slide"
                aria-label={`${i + 1} of ${n}`} style={{ '--tr-o': i === 0 ? 0 : (i > n / 2 ? i - n : i) - i }}>
                <span className="tr__orn" aria-hidden="true" />
                <div className="tr__copy">
                  <p className="tr__k">{s.k}</p>
                  <h3 className="tr__h">{s.h}</h3>
                  <p className="tr__d">{s.d}</p>
                  <Button className="tr__cta" href={s.href} iconEnd="arrow" data-prog={s.prog}
                    {...(s.external ? { target: '_blank' } : {})}>{s.cta}</Button>
                </div>
                <figure className="tr__pic">
                  <img src={s.img.src} alt={s.img.alt} width={s.img.w} height={s.img.h} loading="lazy" decoding="async" />
                </figure>
              </article>
            ))}
          </div>
          {/* the site's icon-only button (outline, sm; brand fill on hover), on the banner's edges; the span places it and fades it in */}
          <span className="tr__nav tr__nav--prev"><Button variant="outline" size="sm" iconOnly iconStart="arrow-left" label="Previous banner" /></span>
          <span className="tr__nav tr__nav--next"><Button variant="outline" size="sm" iconOnly iconStart="arrow" label="Next banner" /></span>
        </div>
        <p className="tr__dots cdots cdots--timed" role="group" aria-label="Choose a banner">
          {TRENDING.map((s, i) => (
            <button key={s.h} type="button" aria-label={`Show banner ${i + 1}`} aria-current={i === 0 ? 'true' : undefined}><i /></button>
          ))}
        </p>
      </div>
    </>
  );
}
