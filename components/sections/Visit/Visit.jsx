import { ArrowIcon } from '@/components/ui/ArrowIcon';

// ============ VISIT: contact and campus; a photo gallery of the campus beside the contact rows; styles/v49.css .cm, .cm__gal ============
export default function Visit() {
  return (
    <section className="band dots band--gap cm-sec" id="visit" aria-labelledby="locH">
      <h2 id="locH" className="h2 h2--sec rv" style={{ "--d": ".12s" }}>Contact us</h2>
      <p className="intro rv" style={{ "--d": ".2s" }}>Pick the channel that suits you, or visit us in New Delhi.</p>
      <div className="cm rv" style={{ "--d": ".28s" }} id="cmPanel">
        <div className="cm__gal" id="cmGal" role="region" aria-label="Photos of the Old Rajinder Nagar campus">
          <div className="cm__track">
            <figure className="cm__ph is-on">
              <img src="/assets/img/photos/campus-hd.webp" alt="The Vajiram & Ravi campus gate and building at Old Rajinder Nagar" width="2000" height="1334" loading="lazy" decoding="async" />
            </figure>
            <figure className="cm__ph" aria-hidden="true">
              <img src="/assets/img/photos/campus-entrance.webp" alt="The institute entrance with the Vajiram & Ravi sign" width="900" height="1600" loading="lazy" decoding="async" />
            </figure>
            <figure className="cm__ph" aria-hidden="true">
              <img src="/assets/img/photos/building-hd.webp" alt="The campus building seen from the street" width="2240" height="1685" loading="lazy" decoding="async" />
            </figure>
            <figure className="cm__ph" aria-hidden="true">
              <img src="/assets/img/photos/footer-classroom.webp" alt="A Vajiram & Ravi classroom during an Indian Polity lecture" width="1672" height="941" loading="lazy" decoding="async" />
            </figure>
            <div className="cm__prog" aria-hidden="true">
              <span className="is-on">
                <i />
              </span>
              <span>
                <i />
              </span>
              <span>
                <i />
              </span>
              <span>
                <i />
              </span>
            </div>
          </div>
        </div>
        <ul className="cm__list">
          <li className="cm__item cm__item--chan" data-city="delhi">
            <div>
              <h3>Old Rajinder Nagar</h3>
              <p>1-B/7, Pusa Road, Old Rajinder Nagar, New Delhi 110060</p>
              <p className="cm__near">Next to Gate 5 of Karol Bagh Metro Station, near pillar 103</p>
            </div>
            <div className="cm__map">
              <iframe src="https://www.google.com/maps?q=Vajiram+%26+Ravi,+1-B%2F7+Pusa+Road,+Old+Rajinder+Nagar,+New+Delhi+110060&z=16&output=embed" title="Map: Vajiram & Ravi, 1-B/7 Pusa Road, Old Rajinder Nagar, New Delhi" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            </div>
          </li>
          <li className="cm__item cm__item--chan">
            <div>
              <h3 className="cm__tel">080-6220-6330</h3>
              <p className="cm__near">Monday to Saturday, 9 am to 7 pm</p>
            </div>
            <a className="tlink cm__cta" href="tel:+918062206330" aria-label="Call us on 080-6220-6330">Call us<ArrowIcon /></a>
          </li>
          <li className="cm__item cm__item--chan">
            <div>
              <h3 className="cm__mail">admissions@vajiramandravi.com</h3>
              <p className="cm__near">Admissions and course questions</p>
            </div>
            <a className="tlink cm__cta" href="mailto:admissions@vajiramandravi.com" aria-label="Email us at admissions@vajiramandravi.com">Email us<ArrowIcon /></a>
          </li>
        </ul>
      </div>
    </section>
  );
}
