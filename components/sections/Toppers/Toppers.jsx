import Stylesheet from '@/components/ui/Stylesheet';
import SectionLabel from '@/components/ui/SectionLabel';
import Button from '@/components/ui/Button/Button';
import { TOPPERS_2025 } from './ToppersSpread/data';

const progLine = rank => {
  const p = TOPPERS_2025.find(t => t.rank === rank)?.programmes || [];
  return p.slice(0, 2).join(' · ') + (p.length > 2 ? ` +${p.length - 2} more` : '');
};
// ============ TOPPERS: the top three of UPSC CSE 2025 on a podium (gold, silver and bronze crests) over a drifting reel of the other
// rank holders. Ported from the approved reference (eclectic-alfajores-975fab.netlify.app, 2026-11-16). Styles: public/css/podium.css.
// Behaviour: ./stars.js (firefly sparkles), ./diamond-reel.js (the draggable endless loop). The reel's cards are written out here. ============
export default function Toppers() {
  return (
    <>
      <Stylesheet href="/css/podium.css" />
      <section className="pd" id="toppers" aria-labelledby="pdH">
  <div className="stars" data-stars="#FFF3D6" aria-hidden="true"></div>
  
  
  <svg className="pd__defs" width="0" height="0" aria-hidden="true" focusable="false">
    <clipPath id="pdPhoto" clipPathUnits="objectBoundingBox">
      <path d="M-.4 -.4H1.4V.07054H.95555V.61698C.95555 .68779 .77906 .84233 .49904 .94408C.21903 .84233 .04445 .68779 .04445 .61698V.07054H-.4Z"/>
    </clipPath>
    {/* #pdPhoto for a box that starts .4 of the shield's height above it (y' = (y + .4) / 1.4): Safari draws a clip-path only inside the
        clipped element's own box, so the head that rises over the shield needs to be inside that box (podium.css, end) */}
    <clipPath id="pdPhotoTall" clipPathUnits="objectBoundingBox">
      <path d="M-.4 0H1.4V.33610H.95555V.72641C.95555 .77699 .77906 .88738 .49904 .96006C.21903 .88738 .04445 .77699 .04445 .72641V.33610H-.4Z"/>
    </clipPath>
  </svg>
  <div className="pd__hd">
    <SectionLabel light>UPSC CSE 2025 results</SectionLabel>
    <h2 id="pdH" className="h2 h2--sec pd__h">Ranks they earned, <em>with the guidance we&nbsp;gave.</em></h2>
  </div>

  
  
  <div className="pd__scene">
  <svg className="pd__fx" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="pdBeam" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFF4DC" stopOpacity=".7"/><stop offset=".55" stopColor="#FFDDA8" stopOpacity=".18"/><stop offset="1" stopColor="#FFDDA8" stopOpacity="0"/>
      </linearGradient>
      <radialGradient id="pdBokeh"><stop offset="0" stopColor="#FFE6B0" stopOpacity=".6"/><stop offset="1" stopColor="#FFC870" stopOpacity="0"/></radialGradient>
      <filter id="pdGlow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="6"/></filter>
      <filter id="pdSoft" x="-40%" y="-10%" width="180%" height="120%"><feGaussianBlur stdDeviation="26"/></filter>
    </defs>
    <g className="pd__beam"><polygon points="640,-40 800,-40 960,660 480,660" fill="url(#pdBeam)" filter="url(#pdSoft)"/></g>
    <g className="pd__bokeh">
      <circle style={{"--t":"9s","--d":"0s"}} cx="150" cy="190" r="16" fill="url(#pdBokeh)"/><circle style={{"--t":"10.5s","--d":"3s"}} cx="1290" cy="230" r="20" fill="url(#pdBokeh)"/>
      <circle style={{"--t":"8.5s","--d":"5s"}} cx="300" cy="90" r="11" fill="url(#pdBokeh)"/><circle style={{"--t":"11s","--d":"2s"}} cx="1150" cy="110" r="14" fill="url(#pdBokeh)"/>
      <circle style={{"--t":"9.5s","--d":"6s"}} cx="1360" cy="420" r="12" fill="url(#pdBokeh)"/><circle style={{"--t":"10s","--d":"4s"}} cx="70" cy="470" r="13" fill="url(#pdBokeh)"/>
    </g>
    <g className="pd__sparks">
      <g style={{"--pd-off":"0s"}}>
          <circle style={{"--t":"3.6s","--d":"0s"}} cx="240" cy="590" r="2"/><circle style={{"--t":"4.2s","--d":".7s"}} cx="330" cy="540" r="1.5"/>
          <circle style={{"--t":"3.2s","--d":"1.4s"}} cx="420" cy="600" r="2.2"/><circle style={{"--t":"4.6s","--d":".3s"}} cx="160" cy="470" r="1.6"/>
          <circle style={{"--t":"3.8s","--d":"2.1s"}} cx="560" cy="585" r="1.4"/><circle style={{"--t":"4.4s","--d":"2.8s"}} cx="90" cy="330" r="1.8"/>
          <circle style={{"--t":"3.4s","--d":"1.1s"}} cx="380" cy="420" r="1.3"/><circle style={{"--t":"4.8s","--d":"3.3s"}} cx="230" cy="280" r="1.6"/>
          <circle style={{"--t":"3s","--d":".5s"}} cx="500" cy="520" r="1.2"/><circle style={{"--t":"3.5s","--d":"1.8s"}} cx="620" cy="600" r="1.8"/>
          <circle style={{"--t":"4s","--d":"2.5s"}} cx="300" cy="620" r="1.4"/><circle style={{"--t":"3.9s","--d":"3.6s"}} cx="120" cy="560" r="2"/>
          <circle style={{"--t":"3.3s","--d":".9s"}} cx="450" cy="470" r="1.1"/><circle style={{"--t":"4.3s","--d":"1.6s"}} cx="60" cy="420" r="1.5"/>
          <circle style={{"--t":"3.7s","--d":"2.2s"}} cx="200" cy="360" r="1.2"/><circle style={{"--t":"4.1s","--d":"3s"}} cx="350" cy="300" r="1"/>
          <circle style={{"--t":"3.2s","--d":".2s"}} cx="660" cy="560" r="1.6"/><circle style={{"--t":"4.4s","--d":"2.7s"}} cx="540" cy="440" r="1.3"/>
      </g>
      <g style={{"--pd-off":"1.7s"}} transform="translate(1440 0) scale(-1 1)">
          <circle style={{"--t":"3.6s","--d":"0s"}} cx="240" cy="590" r="2"/><circle style={{"--t":"4.2s","--d":".7s"}} cx="330" cy="540" r="1.5"/>
          <circle style={{"--t":"3.2s","--d":"1.4s"}} cx="420" cy="600" r="2.2"/><circle style={{"--t":"4.6s","--d":".3s"}} cx="160" cy="470" r="1.6"/>
          <circle style={{"--t":"3.8s","--d":"2.1s"}} cx="560" cy="585" r="1.4"/><circle style={{"--t":"4.4s","--d":"2.8s"}} cx="90" cy="330" r="1.8"/>
          <circle style={{"--t":"3.4s","--d":"1.1s"}} cx="380" cy="420" r="1.3"/><circle style={{"--t":"4.8s","--d":"3.3s"}} cx="230" cy="280" r="1.6"/>
          <circle style={{"--t":"3s","--d":".5s"}} cx="500" cy="520" r="1.2"/><circle style={{"--t":"3.5s","--d":"1.8s"}} cx="620" cy="600" r="1.8"/>
          <circle style={{"--t":"4s","--d":"2.5s"}} cx="300" cy="620" r="1.4"/><circle style={{"--t":"3.9s","--d":"3.6s"}} cx="120" cy="560" r="2"/>
          <circle style={{"--t":"3.3s","--d":".9s"}} cx="450" cy="470" r="1.1"/><circle style={{"--t":"4.3s","--d":"1.6s"}} cx="60" cy="420" r="1.5"/>
          <circle style={{"--t":"3.7s","--d":"2.2s"}} cx="200" cy="360" r="1.2"/><circle style={{"--t":"4.1s","--d":"3s"}} cx="350" cy="300" r="1"/>
          <circle style={{"--t":"3.2s","--d":".2s"}} cx="660" cy="560" r="1.6"/><circle style={{"--t":"4.4s","--d":"2.7s"}} cx="540" cy="440" r="1.3"/>
      </g>
    </g>
  </svg>
  <ol className="pd__row rv" style={{"--d":".1s"}} aria-label="Ranks 1 to 3, UPSC CSE 2025">
    <li className="pd__col pd__col--1">
      <div className="pd__fig"><span className="pd__gem pd__gem--gold" aria-hidden="true"><span className="pd__laurel"></span><img className="pd__shield" src="/assets/img/toppers/figma/shield2-gold.svg" alt="" width="495" height="614"/></span><span className="pd__pic"><img className="pd__img" src="/assets/img/toppers/portrait/2025-crest/01-anuj-agnihotri.webp" alt="" width="600" height="834" loading="lazy" decoding="async"/></span></div>
      <div className="pd__lbl">
        <b className="pd__n" aria-hidden="true"><small>AIR</small> 1</b>
        <h3 className="pd__name">Anuj Agnihotri<span className="pd__vh">, All India Rank 1</span></h3>
        <p className="pd__prog">{progLine(1)}</p>
      </div>
    </li>
    <li className="pd__col pd__col--2">
      <div className="pd__fig"><span className="pd__gem pd__gem--silver" aria-hidden="true"><span className="pd__laurel"></span><img className="pd__shield" src="/assets/img/toppers/figma/shield2-silver.svg" alt="" width="495" height="614"/></span><span className="pd__pic"><img className="pd__img" src="/assets/img/toppers/portrait/2025-crest/02-rajeshwari-suve-m.webp" alt="" width="600" height="834" loading="lazy" decoding="async"/></span></div>
      <div className="pd__lbl">
        <b className="pd__n" aria-hidden="true"><small>AIR</small> 2</b>
        <h3 className="pd__name">Rajeshwari Suve M<span className="pd__vh">, All India Rank 2</span></h3>
        <p className="pd__prog">{progLine(2)}</p>
      </div>
    </li>
    <li className="pd__col pd__col--3">
      <div className="pd__fig"><span className="pd__gem pd__gem--bronze" aria-hidden="true"><span className="pd__laurel"></span><img className="pd__shield" src="/assets/img/toppers/figma/shield2-bronze.svg" alt="" width="495" height="614"/></span><span className="pd__pic"><img className="pd__img" src="/assets/img/toppers/portrait/2025-crest/03-akansh-dhull.webp" alt="" width="600" height="834" loading="lazy" decoding="async"/></span></div>
      <div className="pd__lbl">
        <b className="pd__n" aria-hidden="true"><small>AIR</small> 3</b>
        <h3 className="pd__name">Akansh Dhull<span className="pd__vh">, All India Rank 3</span></h3>
        <p className="pd__prog">{progLine(3)}</p>
      </div>
    </li>
  </ol>
  </div>

  
  <div className="dr" role="region" aria-label="More UPSC CSE 2025 rank holders">
    <p className="dr__h"><span id="drHead"> 36/50 Ranks, UPSC CSE 2025</span></p>
    
    
    <div className="dr__bar" hidden>
    <div className="dr__tabs" id="drTabs" role="tablist" aria-label="Year of the examination">
      <button type="button" className="dr__tab" role="tab" id="drTab2025" aria-controls="drList" aria-selected="true">2025</button>
      <button type="button" className="dr__tab" role="tab" id="drTab2024" aria-controls="drList" aria-selected="false" tabIndex="-1">2024</button>
      <button type="button" className="dr__tab" role="tab" id="drTab2023" aria-controls="drList" aria-selected="false" tabIndex="-1">2023</button>
      <button type="button" className="dr__tab" role="tab" id="drTab2022" aria-controls="drList" aria-selected="false" tabIndex="-1">2022</button>
      <button type="button" className="dr__tab" role="tab" id="drTab2021" aria-controls="drList" aria-selected="false" tabIndex="-1">2021</button>
      <button type="button" className="dr__tab dr__tab--old" role="tab" id="drTab2020" hidden aria-controls="drList" aria-selected="false" tabIndex="-1">2020</button>
      <button type="button" className="dr__tab dr__tab--old" role="tab" id="drTab2019" hidden aria-controls="drList" aria-selected="false" tabIndex="-1">2019</button>
      <button type="button" className="dr__tab dr__tab--old" role="tab" id="drTab2018" hidden aria-controls="drList" aria-selected="false" tabIndex="-1">2018</button>
      <button type="button" className="dr__tab dr__tab--old" role="tab" id="drTab2017" hidden aria-controls="drList" aria-selected="false" tabIndex="-1">2017</button>
      <button type="button" className="dr__tab dr__tab--old" role="tab" id="drTab2016" hidden aria-controls="drList" aria-selected="false" tabIndex="-1">2016</button>
    </div>
    <button type="button" className="dr__all" aria-controls="drTabs" aria-expanded="false"><span className="dr__all-t">View all</span></button>
    </div>
    <div className="dr__view" id="drList" aria-labelledby="drHead">
      <ul className="dr__track">
        <li className="dr__item">
          <div className="dr__fig"><span className="dr__gem" aria-hidden="true"><i></i></span><span className="dr__pic"><img src="/assets/img/toppers/portrait/2025/04-raghav-jhunjhunwala-460.webp" srcSet="/assets/img/toppers/portrait/2025/04-raghav-jhunjhunwala-460.webp 460w, /assets/img/toppers/portrait/2025/04-raghav-jhunjhunwala.webp 768w" sizes="(max-width: 640px) 156px, 228px" alt="Raghav Jhunjhunwala" width="360" height="360" loading="lazy" decoding="async"/></span></div>
          <p className="dr__n" aria-hidden="true"><small>AIR</small> 4</p>
          <h4 className="dr__name">Raghav Jhunjhunwala<span className="pd__vh">, All India Rank 4</span></h4>
          <p className="dr__prog">Interview Guidance Programme</p>
        </li>
        <li className="dr__item">
          <div className="dr__fig"><span className="dr__gem" aria-hidden="true"><i></i></span><span className="dr__pic"><img src="/assets/img/toppers/portrait/2025/05-ishan-bhatnagar-460.webp" srcSet="/assets/img/toppers/portrait/2025/05-ishan-bhatnagar-460.webp 460w, /assets/img/toppers/portrait/2025/05-ishan-bhatnagar.webp 768w" sizes="(max-width: 640px) 156px, 228px" alt="Ishan Bhatnagar" width="360" height="360" loading="lazy" decoding="async"/></span></div>
          <p className="dr__n" aria-hidden="true"><small>AIR</small> 5</p>
          <h4 className="dr__name">Ishan Bhatnagar<span className="pd__vh">, All India Rank 5</span></h4>
          <p className="dr__prog">Sociology Optional Crash Course&nbsp;&middot; Sociology Enrichment Course +2 more</p>
        </li>
        <li className="dr__item">
          <div className="dr__fig"><span className="dr__gem" aria-hidden="true"><i></i></span><span className="dr__pic"><img src="/assets/img/toppers/portrait/2025/06-zinnia-aurora-460.webp" srcSet="/assets/img/toppers/portrait/2025/06-zinnia-aurora-460.webp 460w, /assets/img/toppers/portrait/2025/06-zinnia-aurora.webp 768w" sizes="(max-width: 640px) 156px, 228px" alt="Zinnia Aurora" width="360" height="360" loading="lazy" decoding="async"/></span></div>
          <p className="dr__n" aria-hidden="true"><small>AIR</small> 6</p>
          <h4 className="dr__name">Zinnia Aurora<span className="pd__vh">, All India Rank 6</span></h4>
          <p className="dr__prog">GS Ethics Module&nbsp;&middot; Interview Guidance Programme +1 more</p>
        </li>
        <li className="dr__item">
          <div className="dr__fig"><span className="dr__gem" aria-hidden="true"><i></i></span><span className="dr__pic"><img src="/assets/img/toppers/portrait/2025/07-a-r-rajah-mohaideen-460.webp" srcSet="/assets/img/toppers/portrait/2025/07-a-r-rajah-mohaideen-460.webp 460w, /assets/img/toppers/portrait/2025/07-a-r-rajah-mohaideen.webp 768w" sizes="(max-width: 640px) 156px, 228px" alt="A R Rajah Mohaideen" width="360" height="360" loading="lazy" decoding="async"/></span></div>
          <p className="dr__n" aria-hidden="true"><small>AIR</small> 7</p>
          <h4 className="dr__name">A R Rajah Mohaideen<span className="pd__vh">, All India Rank 7</span></h4>
          <p className="dr__prog">Interview Guidance Programme</p>
        </li>
        <li className="dr__item">
          <div className="dr__fig"><span className="dr__gem" aria-hidden="true"><i></i></span><span className="dr__pic"><img src="/assets/img/toppers/portrait/2025/08-pakshal-secretry-460.webp" srcSet="/assets/img/toppers/portrait/2025/08-pakshal-secretry-460.webp 460w, /assets/img/toppers/portrait/2025/08-pakshal-secretry.webp 768w" sizes="(max-width: 640px) 156px, 228px" alt="Pakshal Secretry" width="360" height="360" loading="lazy" decoding="async"/></span></div>
          <p className="dr__n" aria-hidden="true"><small>AIR</small> 8</p>
          <h4 className="dr__name">Pakshal Secretry<span className="pd__vh">, All India Rank 8</span></h4>
          <p className="dr__prog">Mains Camp&nbsp;&middot; Interview Guidance Programme</p>
        </li>
        <li className="dr__item">
          <div className="dr__fig"><span className="dr__gem" aria-hidden="true"><i></i></span><span className="dr__pic"><img src="/assets/img/toppers/portrait/2025/09-astha-jain-460.webp" srcSet="/assets/img/toppers/portrait/2025/09-astha-jain-460.webp 460w, /assets/img/toppers/portrait/2025/09-astha-jain.webp 768w" sizes="(max-width: 640px) 156px, 228px" alt="Astha Jain" width="360" height="360" loading="lazy" decoding="async"/></span></div>
          <p className="dr__n" aria-hidden="true"><small>AIR</small> 9</p>
          <h4 className="dr__name">Astha Jain<span className="pd__vh">, All India Rank 9</span></h4>
          <p className="dr__prog">Interview Guidance Programme</p>
        </li>
        <li className="dr__item">
          <div className="dr__fig"><span className="dr__gem" aria-hidden="true"><i></i></span><span className="dr__pic"><img src="/assets/img/toppers/portrait/2025/10-ujjwal-priyank-460.webp" srcSet="/assets/img/toppers/portrait/2025/10-ujjwal-priyank-460.webp 460w, /assets/img/toppers/portrait/2025/10-ujjwal-priyank.webp 768w" sizes="(max-width: 640px) 156px, 228px" alt="Ujjwal Priyank" width="360" height="360" loading="lazy" decoding="async"/></span></div>
          <p className="dr__n" aria-hidden="true"><small>AIR</small> 10</p>
          <h4 className="dr__name">Ujjwal Priyank<span className="pd__vh">, All India Rank 10</span></h4>
          <p className="dr__prog">Interview Guidance Programme</p>
        </li>
        <li className="dr__item">
          <div className="dr__fig"><span className="dr__gem" aria-hidden="true"><i></i></span><span className="dr__pic"><img src="/assets/img/toppers/portrait/placeholder-man.webp" alt="" width="360" height="360" loading="lazy" decoding="async"/></span></div>
          <p className="dr__n" aria-hidden="true"><small>AIR</small> 11</p>
          <h4 className="dr__name">Yashaswi Raj Vardhan<span className="pd__vh">, All India Rank 11</span></h4>
          <p className="dr__prog">Interview Guidance Programme</p>
        </li>
        <li className="dr__item">
          <div className="dr__fig"><span className="dr__gem" aria-hidden="true"><i></i></span><span className="dr__pic"><img src="/assets/img/toppers/portrait/placeholder-man.webp" alt="" width="360" height="360" loading="lazy" decoding="async"/></span></div>
          <p className="dr__n" aria-hidden="true"><small>AIR</small> 12</p>
          <h4 className="dr__name">Akshit Bhardwaj<span className="pd__vh">, All India Rank 12</span></h4>
          <p className="dr__prog">Prelims CAMP&nbsp;&middot; General Studies +1 more</p>
        </li>
        <li className="dr__item">
          <div className="dr__fig"><span className="dr__gem" aria-hidden="true"><i></i></span><span className="dr__pic"><img src="/assets/img/toppers/portrait/placeholder-man.webp" alt="" width="360" height="360" loading="lazy" decoding="async"/></span></div>
          <p className="dr__n" aria-hidden="true"><small>AIR</small> 13</p>
          <h4 className="dr__name">Ananya Sharma<span className="pd__vh">, All India Rank 13</span></h4>
          <p className="dr__prog">Interview Guidance Programme</p>
        </li>
        <li className="dr__item">
          <div className="dr__fig"><span className="dr__gem" aria-hidden="true"><i></i></span><span className="dr__pic"><img src="/assets/img/toppers/portrait/placeholder-man.webp" alt="" width="360" height="360" loading="lazy" decoding="async"/></span></div>
          <p className="dr__n" aria-hidden="true"><small>AIR</small> 14</p>
          <h4 className="dr__name">Surabhi Yadav<span className="pd__vh">, All India Rank 14</span></h4>
          <p className="dr__prog">Ethics Answer Writing Prog.&nbsp;&middot; Interview Guidance Programme</p>
        </li>
        <li className="dr__item">
          <div className="dr__fig"><span className="dr__gem" aria-hidden="true"><i></i></span><span className="dr__pic"><img src="/assets/img/toppers/portrait/placeholder-man.webp" alt="" width="360" height="360" loading="lazy" decoding="async"/></span></div>
          <p className="dr__n" aria-hidden="true"><small>AIR</small> 15</p>
          <h4 className="dr__name">Simrandeep Kaur<span className="pd__vh">, All India Rank 15</span></h4>
          <p className="dr__prog">Interview Guidance Programme</p>
        </li>
        <li className="dr__item">
          <div className="dr__fig"><span className="dr__gem" aria-hidden="true"><i></i></span><span className="dr__pic"><img src="/assets/img/toppers/portrait/placeholder-man.webp" alt="" width="360" height="360" loading="lazy" decoding="async"/></span></div>
          <p className="dr__n" aria-hidden="true"><small>AIR</small> 16</p>
          <h4 className="dr__name">Monika Srivastava<span className="pd__vh">, All India Rank 16</span></h4>
          <p className="dr__prog">GS Ethics Module&nbsp;&middot; Sure Shot Mains - FLT-A2 +2 more</p>
        </li>
        <li className="dr__item">
          <div className="dr__fig"><span className="dr__gem" aria-hidden="true"><i></i></span><span className="dr__pic"><img src="/assets/img/toppers/portrait/placeholder-man.webp" alt="" width="360" height="360" loading="lazy" decoding="async"/></span></div>
          <p className="dr__n" aria-hidden="true"><small>AIR</small> 18</p>
          <h4 className="dr__name">Sruthii R<span className="pd__vh">, All India Rank 18</span></h4>
          <p className="dr__prog">General Studies&nbsp;&middot; Sociology Optional</p>
        </li>
      </ul>
    </div>
    
    <p className="dr__cta"><Button variant="secondary" onDark href="https://vajiramandravi.com/ias-selections-from-vajiram/" target="_blank" rel="noopener" iconEnd="arrow">View all toppers</Button></p>
  </div>

</section>
    </>
  );
}
