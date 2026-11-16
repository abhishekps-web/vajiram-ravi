import { photoSrcSet } from '@/lib/photo';
import Button from '@/components/ui/Button/Button';
import Stylesheet from '@/components/ui/Stylesheet';
import { LIFE } from './data';

// ============ LIFE AT VAJIRAM & RAVI (user 2026-11-16): ported from Kevin's branch (index.html #lifeGal, css/life-gallery.css,
// js/life-gallery.js). On the brand ground with grain: the heading, a curved row of photo and video
// cards that glides on slowly and loops (life-gallery.js), the centre card's caption under it, All / Images / Videos tabs under the row; arrows at the sides on hover (the site's icon-only
// button in a placing span). Content in data.js, styles public/css/life-gallery.css. ============
const PLAY = 'M8 5.5v13l11-6.5z';

export default function LifeGallery() {
  return (
    <section className="lgal" id="lifeGal" aria-labelledby="lifeH">
      <Stylesheet href="/css/life-gallery.css" />
      <div className="lg__hd">
        <h2 className="lg__h rv" id="lifeH" style={{ '--d': '.05s' }}>Life at Vajiram &amp; Ravi</h2>
      </div>
      <div className="lg__rail">
        {/* smoke at both sides of the row (user 2026-11-16): the cards drift into a soft orange mist (public/css/life-gallery.css) */}
        <span className="lg__smoke lg__smoke--l" aria-hidden="true" />
        <span className="lg__smoke lg__smoke--r" aria-hidden="true" />
        <span className="lg__arw lg__prev"><Button variant="outline" size="sm" iconOnly iconStart="arrow-left" label="Previous photo" /></span>
        <span className="lg__arw lg__next"><Button variant="outline" size="sm" iconOnly iconStart="arrow" label="Next photo" /></span>
        <ul className="lg__track" id="lifeTrack" aria-labelledby="lifeH">
          {LIFE.map(c => (
            <li key={c.name} className={`lg__slide${c.vid ? ' lg__slide--vid' : ''}`}>
              <figure className="lg__media">
                {c.vid ? (
                  <>
                    <video poster={c.poster} data-src={c.src} muted loop playsInline preload="none" aria-label={c.label} />
                    <span className="lg__badge" aria-hidden="true"><svg viewBox="0 0 24 24" width="12" height="12"><path d={PLAY} /></svg>Video</span>
                  </>
                ) : (
                  <img src={c.img} srcSet={photoSrcSet(c.img, c.w)} sizes="(max-width: 760px) 80vw, 260px" alt={c.alt} width={c.w} height={c.h} loading="lazy" decoding="async" style={c.pos ? { objectPosition: c.pos } : undefined} />
                )}
              </figure>
              <p className="lg__cap"><b>{c.name}</b><span>{c.detail}</span></p>
            </li>
          ))}
        </ul>
      </div>
      {/* All / Images / Videos, under the row (user 2026-11-16) */}
      <div className="lg__tabs rv" role="tablist" aria-label="Show" style={{ '--d': '.1s' }}>
        <button type="button" className="lg__tab" role="tab" data-f="all" aria-selected="true" aria-controls="lifeTrack">All</button>
        <button type="button" className="lg__tab" role="tab" data-f="img" aria-selected="false" aria-controls="lifeTrack" tabIndex={-1}>Images</button>
        <button type="button" className="lg__tab" role="tab" data-f="vid" aria-selected="false" aria-controls="lifeTrack" tabIndex={-1}>Videos</button>
        <span className="lg__ind" aria-hidden="true" />
      </div>
    </section>
  );
}
