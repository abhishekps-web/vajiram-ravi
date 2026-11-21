import { photoSrcSet } from '@/lib/photo';
import Button from '@/components/ui/Button/Button';
import Stylesheet from '@/components/ui/Stylesheet';
import Tabs from '@/components/ui/Tabs/Tabs';
import { LIFE } from './data';

// ============ LIFE AT VAJIRAM & RAVI (user 2026-11-16): ported from Kevin's branch (index.html #lifeGal, css/life-gallery.css,
// js/life-gallery.js). On the brand ground with grain: the heading, a curved row of photo and video
// cards that glides on slowly and loops (life-gallery.js), the centre card's caption under it, All / Images / Videos tabs under the row; arrows at the sides on hover (the site's icon-only
// button in a placing span). Content in data.js, styles public/css/life-gallery.css. ============
// the video cards' play / pause control (user 2026-11-17, "video controls are missing"): both glyphs, the one shown follows the video
const VIDEO_ICON = (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
    <path className="lg__vi-play" d="M8 5.5v13l11-6.5z" fill="currentColor" />
    <g className="lg__vi-pause" fill="currentColor"><rect x="6.5" y="5.5" width="4" height="13" rx="1" /><rect x="13.5" y="5.5" width="4" height="13" rx="1" /></g>
  </svg>
);

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
                    {/* play / pause (life-gallery.js); shown on every video card (user 2026-11-17, "just show the controls"), and it plays
                        once the card has a clip (data.js `src`; until then the poster stands in and the button does nothing) */}
                    <Button variant="outline" size="sm" iconOnly iconStart={VIDEO_ICON} label={`Play video: ${c.name}`} className="lg__vctl" data-vctl="" />
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
      <Tabs
        className="lg__tabs rv"
        style={{ '--d': '.1s' }}
        label="Show"
        controls="lifeTrack"
        items={[{ id: 'all', label: 'All' }, { id: 'img', label: 'Images' }, { id: 'vid', label: 'Videos' }]}
      />
    </section>
  );
}
