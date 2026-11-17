import { photoSrcSet } from '@/lib/photo';
import CarouselDots from '@/components/ui/CarouselDots/CarouselDots';
import Button from '@/components/ui/Button/Button';
import Stylesheet from '@/components/ui/Stylesheet';

// ============ VISIT: "Contact us", the compact layout from Kevin's build (user 2026-11-16; eclectic-alfajores-975fab.netlify.app, its
// index.html #visit .cx and css/contact-compact.css): two columns close together, 40:60 (the card and map 40%, the gallery 60%; user 2026-11-16). Left, the centre's card (a badge, the address
// as the heading, the landmark, the hours, then phone and email) framed like the "Book your free session" form, and under it the map
// with "View on maps" on its lower left. Right, the campus photos cross-fading (visit-gallery.js) with the caption and dots along the
// foot and arrows at the sides on hover. Stacked on narrower screens. Styles public/css/contact-compact.css. ============

// Iconoir icons, as in Kevin's build
const PHONE = 'M18.118 14.702 14 15.5c-2.782-1.396-4.5-3-5.5-5.5l.77-4.13L7.815 2H4.064c-1.128 0-2.016.932-1.848 2.047.421 2.783 1.66 7.83 5.284 11.453 3.805 3.805 9.286 5.456 12.302 6.113.965.21 1.998-.698 1.998-1.89v-3.584l-3.882-1.437z';
const MAIL = ['m7 9 5 3.5L17 9', 'M2 17V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z'];
const MAP = 'm9 19-5.21 1.737A.6.6 0 0 1 3 20.167V5.432a.6.6 0 0 1 .41-.569L9 3m0 16 6 2m-6-2V3m6 18 5.59-1.863a.6.6 0 0 0 .41-.57V3.833a.6.6 0 0 0-.79-.57L15 5m0 16V5m0 0L9 3';
const Ico = ({ d }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">{[].concat(d).map(p => <path key={p} d={p} />)}</svg>
);
const MapIcon = (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={MAP} /></svg>
);

const PHOTOS = [
  { cap: 'The campus', src: '/assets/img/photos/campus-hd.webp', alt: 'The Vajiram & Ravi campus gate and building at Old Rajinder Nagar', w: 2000, h: 1334 },
  { cap: 'The entrance', src: '/assets/img/photos/campus-entrance.webp', alt: 'The institute entrance with the Vajiram & Ravi sign', w: 900, h: 1600, pos: '50% 35%' },
  { cap: 'The building', src: '/assets/img/photos/building-hd.webp', alt: 'The campus building seen from the street', w: 2240, h: 1685 },
];

export default function Visit() {
  return (
    <section className="band dots band--gap" id="visit" aria-labelledby="locH">
      <Stylesheet href="/css/contact-compact.css" />
      <h2 id="locH" className="h2 h2--sec rv" style={{ "--d": ".12s" }}>Contact us</h2>
      <p className="intro rv" style={{ "--d": ".2s" }}>Pick the channel that suits you, or visit us in New Delhi.</p>
      <div className="cx rv" style={{ "--d": ".28s" }}>
        <div className="cx__l">
          <div className="cx__card">
            <p className="cx__k">New Delhi centre</p>
            <h3 className="cx__addr">1-B/7, Pusa Road, Old Rajinder Nagar, New Delhi 110060</h3>
            <p className="cx__near">Next to Gate 5 of Karol Bagh Metro Station, near pillar 103</p>
            <p className="cx__hrs">Mon – Sat, 9 am – 7 pm</p>
            <ul className="cx__meta">
              <li><a href="tel:+918062206330" aria-label="Call us on 080-6220-6330"><Ico d={PHONE} /><span>080-6220-6330</span></a></li>
              <li><a href="mailto:admissions@vajiramandravi.com" aria-label="Email us at admissions@vajiramandravi.com"><Ico d={MAIL} /><span>admissions@vajiramandravi.com</span></a></li>
            </ul>
          </div>
          <div className="cx__map">
            <iframe src="https://www.google.com/maps?q=Vajiram+%26+Ravi,+1-B%2F7+Pusa+Road,+Old+Rajinder+Nagar,+New+Delhi+110060&z=16&output=embed" title="Map: Vajiram & Ravi, 1-B/7 Pusa Road, Old Rajinder Nagar, New Delhi" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            <Button className="cx__go" href="https://www.google.com/maps/search/?api=1&query=Vajiram+%26+Ravi+1-B%2F7+Pusa+Road+Old+Rajinder+Nagar+New+Delhi+110060" target="_blank" iconEnd={MapIcon}>View on maps</Button>
          </div>
        </div>
        <div className="cx__gal" id="cmGal" role="region" aria-roledescription="carousel" aria-label="Photos of the Old Rajinder Nagar campus">
          {PHOTOS.map((p, i) => (
            <figure key={p.src} className={`cx__ph${i === 0 ? ' is-on' : ''}`} data-cap={p.cap} aria-hidden={i ? true : undefined}>
              <img src={p.src} srcSet={photoSrcSet(p.src, p.w)} sizes="(max-width: 760px) 92vw, 40vw" alt={p.alt} width={p.w} height={p.h} loading="lazy" decoding="async" style={p.pos ? { objectPosition: p.pos } : undefined} />
            </figure>
          ))}
          <p className="cx__cap" aria-live="polite">{PHOTOS[0].cap}</p>
          <CarouselDots className="cx__dots" label="Choose photo" labels={PHOTOS.map((p, i) => `Photo ${i + 1} of ${PHOTOS.length}`)} active={0} activeClass="is-on" timed duration="5s" />
          {/* previous / next: the site's icon-only button, at the photo's sides on hover; the span places it and fades it in */}
          <span className="cx__nav cx__nav--prev"><Button variant="outline" size="sm" iconOnly iconStart="arrow-left" label="Previous photo" /></span>
          <span className="cx__nav cx__nav--next"><Button variant="outline" size="sm" iconOnly iconStart="arrow" label="Next photo" /></span>
        </div>
      </div>
    </section>
  );
}
