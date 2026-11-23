import Stylesheet from '@/components/ui/Stylesheet';
import SectionLabel from '@/components/ui/SectionLabel';
import Button from '@/components/ui/Button/Button';
import { $, $$, esc, reduce } from '@/lib/site';
import '@/app/tailwind-sections.css';
import ToppersRecord from './ToppersRecord';
import { TOPPERS, NP_ARCHIVE } from './toppers-data';

export { TOPPERS, NP_ARCHIVE };
export { initToppersRecord } from './ToppersRecord';
import Tabs, { initTabs } from '@/components/ui/Tabs';

const DR_YEARS = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015];

const PORTRAIT = "/assets/img/toppers/portrait/2025/";
const PHOTO = "/assets/img/toppers/";

export const TOPPERS_2025 = [
  { rank: 1, name: "Anuj Agnihotri", programmes: ["Interview Guidance Programme"], photo: PORTRAIT + "01-anuj-agnihotri.webp" },
  { rank: 2, name: "Rajeshwari Suve", programmes: ["PowerUp Prelims Test Series", "Interview Guidance Programme", "Mains 2020 Test Series"], photo: PORTRAIT + "02-rajeshwari-suve-m.webp" },
  { rank: 3, name: "Akansh Dhull", programmes: ["General Studies Prelims-cum-Mains Classroom Programme"], photo: PORTRAIT + "03-akansh-dhull.webp" },
  { rank: 4, name: "Raghav Jhunjhunwala", programmes: ["Interview Guidance Programme"], photo: PORTRAIT + "04-raghav-jhunjhunwala.webp" },
  { rank: 5, name: "Ishan Bhatnagar", programmes: ["Sociology Optional Crash Course", "Sociology Enrichment Course", "Prelims CAMP (Online and Offline)", "Interview Guidance Programme"], photo: PORTRAIT + "05-ishan-bhatnagar.webp" },
  { rank: 6, name: "Zinnia Aurora", programmes: ["GS Ethics Module", "Interview Guidance Programme", "Power Up 23 Combined Test Series for Prelims 2023"], photo: PORTRAIT + "06-zinnia-aurora.webp" },
  { rank: 7, name: "A R Rajah Mohaideen", programmes: ["Interview Guidance Programme"], photo: PORTRAIT + "07-a-r-rajah-mohaideen.webp" },
  { rank: 8, name: "Pakshal Secretry", programmes: ["Mains Camp", "Interview Guidance Programme"], photo: PORTRAIT + "08-pakshal-secretry.webp" },
  { rank: 9, name: "Astha Jain", programmes: ["Interview Guidance Programme"], photo: PORTRAIT + "09-astha-jain.webp" },
  { rank: 10, name: "Ujjwal Priyank", programmes: ["Interview Guidance Programme"], photo: PORTRAIT + "10-ujjwal-priyank.webp" },
  { rank: 11, name: "Yashaswi Raj Vardhan", programmes: ["Interview Guidance Programme"], photo: PHOTO + "2025-11-yashaswi-raj-vardhan.webp" },
  { rank: 12, name: "Akshit Bhardwaj", programmes: ["Prelims CAMP", "General Studies", "Interview Guidance Programme"], photo: PHOTO + "2025-12-akshit-bhardwaj.webp" },
  { rank: 13, name: "Ananya Sharma", programmes: ["Interview Guidance Programme"], photo: PHOTO + "2025-13-ananya-sharma.webp" },
  { rank: 14, name: "Surabhi Yadav", programmes: ["Ethics Answer Writing Prog.", "Interview Guidance Programme"], photo: PHOTO + "2025-14-surabhi-yadav.webp" },
  { rank: 15, name: "Simrandeep Kaur", programmes: ["Interview Guidance Programme"], photo: PHOTO + "2025-15-simrandeep-kaur.webp" },
  { rank: 16, name: "Monika Srivastava", programmes: ["GS Ethics Module", "Sure Shot Mains - FLT-A2", "Essay Module", "SMART Current Affairs Programme"], photo: PHOTO + "2025-16-monika-srivastava.webp" },
  { rank: 18, name: "Sruthii R", programmes: ["General Studies", "Sociology Optional"], photo: PHOTO + "2025-18-sruthii-r.webp" },
  { rank: 19, name: "Nisar Dishant Amrutlal", programmes: ["Interview Guidance Programme"], photo: PHOTO + "2025-19-nisar-dishant-amrutlal.webp" },
  { rank: 21, name: "Shubham Singh", programmes: ["Ethics Answer Writing Program", "Ethics Module Course"], photo: PHOTO + "2025-21-shubham-singh.webp" },
  { rank: 22, name: "Geetika Arora", programmes: ["General Studies"], photo: PHOTO + "2025-22-geetika-arora.webp" },
  { rank: 23, name: "Jeenu Sri Jaswanth Chandra", programmes: ["Interview Guidance Programme"], photo: PHOTO + "2025-23-jeenu-sri-jaswanth-chandra.webp" },
  { rank: 25, name: "Bhavika Chopra", programmes: ["Interview Guidance Programme"], photo: PHOTO + "2025-25-bhavika-chopra.webp" },
  { rank: 27, name: "Vikas", programmes: ["IGS Ethics Module", "Interview Guidance Programme", "SMART Current Affairs Programme", "PSIR Optional Mains Test Series-A2", "Essay Module", "Sure Shot Mains - FLT-A2"], photo: PHOTO + "2025-27-vikas.webp" },
  { rank: 31, name: "Aryan Yadav", programmes: ["PowerUp Prelims Test Series 2024: Offline", "Online"], photo: PHOTO + "2025-31-aryan-yadav.webp" },
  { rank: 33, name: "Mayank Purohit", programmes: ["Ethics Answer Writing Programme"], photo: PHOTO + "2025-33-mayank-purohit.webp" },
  { rank: 34, name: "Nancy Singh", programmes: ["Interview Guidance Programme"], photo: PHOTO + "2025-34-nancy-singh.webp" },
];



const RANKED = TOPPERS.filter(p => p.r).map(p => ({ ...p, n: p.n.replace(/\b[a-z]/g, c => c.toUpperCase()) }));
export const YEARS = [...new Set(RANKED.map(p => p.y))].sort((a, b) => b - a);
export const byYear = y => RANKED.filter(p => p.y === y).sort((a, b) => a.r - b.r);
const latest = byYear(YEARS[0]);
export const top10 = latest.filter(p => p.r <= 10);
export const progOf = p => p.c ? esc(p.c) : 'Prepared with Vajiram &amp; Ravi';

const progLine = rank => {
  const p = TOPPERS_2025.find(t => t.rank === rank)?.programmes || [];
  return p.slice(0, 2).join(' · ') + (p.length > 2 ? ` +${p.length - 2} more` : '');
};
export default function Toppers() {
  return (
    <>
      <Stylesheet href="/css/podium.css" />
      <section className="pd" id="toppers" aria-labelledby="pdH">
  
  
  <svg className="pd__defs" width="0" height="0" aria-hidden="true" focusable="false">
    <clipPath id="pdPhoto" clipPathUnits="objectBoundingBox">
      <path d="M-.4 -.4H1.4V.07054H.95555V.61698C.95555 .68779 .77906 .84233 .49904 .94408C.21903 .84233 .04445 .68779 .04445 .61698V.07054H-.4Z"/>
    </clipPath>
    <clipPath id="pdPhotoTall" clipPathUnits="objectBoundingBox">
      <path d="M-.4 0H1.4V.33610H.95555V.72641C.95555 .77699 .77906 .88738 .49904 .96006C.21903 .88738 .04445 .77699 .04445 .72641V.33610H-.4Z"/>
    </clipPath>
  </svg>
  <div className="pd__hd">
    <SectionLabel>UPSC CSE 2025 results</SectionLabel>
    <h2 id="pdH" className="h2 h2--sec pd__h">Ranks they earned, <em>with the guidance we&nbsp;gave.</em></h2>
  </div>

  
  

  
  <div className="dr" role="region" aria-label="More UPSC CSE 2025 rank holders">
    <p className="dr__h"><span id="drHead"> 36/50 Ranks, UPSC CSE 2025</span></p>
    
    
    <Tabs
      className="dr__bar"
      hidden
      id="drTabs"
      label="Year of the examination"
      controls="drList"
      items={DR_YEARS.map((y, i) => ({ id: String(y), label: y, domId: `drTab${y}`, hidden: i > 4, className: i > 4 ? 'dr__tab--old' : undefined }))}
    >
      <button type="button" className="dr__all" aria-controls="drTabs" aria-expanded="false"><span className="dr__all-t">View all</span></button>
    </Tabs>
    <div className="dr__view" id="drList" aria-labelledby="drHead">
      <ul className="dr__track">
        <li className="dr__item">
          <div className="dr__fig"><span className="dr__gem" aria-hidden="true"><i></i></span><span className="dr__pic"><img src="/assets/img/toppers/portrait/2025/01-anuj-agnihotri-460.webp" srcSet="/assets/img/toppers/portrait/2025/01-anuj-agnihotri-460.webp 460w, /assets/img/toppers/portrait/2025/01-anuj-agnihotri.webp 768w" sizes="(max-width: 640px) 156px, 228px" alt="Anuj Agnihotri" width="360" height="360" loading="lazy" decoding="async"/></span></div>
          <p className="dr__n" aria-hidden="true"><small>AIR</small> 1</p>
          <h4 className="dr__name">Anuj Agnihotri<span className="pd__vh">, All India Rank 1</span></h4>
          <p className="dr__prog">{progLine(1)}</p>
        </li>
        <li className="dr__item">
          <div className="dr__fig"><span className="dr__gem" aria-hidden="true"><i></i></span><span className="dr__pic"><img src="/assets/img/toppers/portrait/2025/02-rajeshwari-suve-m-460.webp" srcSet="/assets/img/toppers/portrait/2025/02-rajeshwari-suve-m-460.webp 460w, /assets/img/toppers/portrait/2025/02-rajeshwari-suve-m.webp 768w" sizes="(max-width: 640px) 156px, 228px" alt="Rajeshwari Suve M" width="360" height="360" loading="lazy" decoding="async"/></span></div>
          <p className="dr__n" aria-hidden="true"><small>AIR</small> 2</p>
          <h4 className="dr__name">Rajeshwari Suve M<span className="pd__vh">, All India Rank 2</span></h4>
          <p className="dr__prog">{progLine(2)}</p>
        </li>
        <li className="dr__item">
          <div className="dr__fig"><span className="dr__gem" aria-hidden="true"><i></i></span><span className="dr__pic"><img src="/assets/img/toppers/portrait/2025/03-akansh-dhull-460.webp" srcSet="/assets/img/toppers/portrait/2025/03-akansh-dhull-460.webp 460w, /assets/img/toppers/portrait/2025/03-akansh-dhull.webp 768w" sizes="(max-width: 640px) 156px, 228px" alt="Akansh Dhull" width="360" height="360" loading="lazy" decoding="async"/></span></div>
          <p className="dr__n" aria-hidden="true"><small>AIR</small> 3</p>
          <h4 className="dr__name">Akansh Dhull<span className="pd__vh">, All India Rank 3</span></h4>
          <p className="dr__prog">{progLine(3)}</p>
        </li>
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
    <ToppersRecord />
    <p className="dr__cta"><Button variant="secondary" onDark href="https://vajiramandravi.com/ias-selections-from-vajiram/" target="_blank" rel="noopener" iconEnd="arrow">View all toppers</Button></p>
  </div>

</section>
    </>
  );
}

export function initDiamondReel() {
  const dr = document.querySelector('#toppers .dr'); if (!dr) return;
  const track = dr.querySelector('.dr__track'), view = dr.querySelector('.dr__view'), head = document.getElementById('drHead');
  const tabs = [...dr.querySelectorAll('.dr__bar .tab')];
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const PIC = 'assets/img/toppers/portrait/placeholder-man.webp';   // WebP (was a 143KB PNG; user 2026-11-16, performance)
  const data = window.NP_ARCHIVE;

  const esc = t => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const tidyProg = p => p.replace(/^&\s*/, '').trim()
    .replace(/^IGP$/i, 'Interview Guidance Programme').replace(/\bIGP\b/g, 'Interview Guidance Programme')
    .replace(/Interview Guidance Program\b/gi, 'Interview Guidance Programme').replace(/Prelims Cum Mains/g, 'Prelims-cum-Mains');
  const progs = s => (s || '').split(/,(?![^(]*\))|\s&\s/).map(tidyProg).filter(Boolean);
  const titleWord = w => /^[A-Z]{3,}$/.test(w) ? w[0] + w.slice(1).toLowerCase() : w;
  const tidyName = n => n.replace(/\s*-\s*Rank\s*\d+$/i, '').replace(/^[^A-Za-z]+|[^A-Za-z.]+$/g, '').replace(/\.$/, '').split(' ').map(titleWord).join(' ');
  const extra = {};
  (window.TOPPERS || []).forEach(t => { if (t.c && t.r) extra[t.y + '-' + t.r] = t.c; });

  const card = (y, t) => {
    const P = progs(t.programmes || extra[y + '-' + t.rank]);
    const lab = P.slice(0, 2).map(esc).join('&nbsp;&middot; ') + (P.length > 2 ? ` +${P.length - 2} more` : '');
    return `<li class="dr__item">
      <div class="dr__fig"><span class="dr__gem" aria-hidden="true"><i></i></span><span class="dr__pic"><img src="${PIC}" alt="" width="360" height="360" decoding="async"></span></div>
      <p class="dr__n" aria-hidden="true"><small>AIR</small> ${t.rank}</p>
      <h4 class="dr__name">${esc(tidyName(t.name))}<span class="pd__vh">, All India Rank ${t.rank}</span></h4>
      ${lab ? `<p class="dr__prog">${lab}</p>` : ''}
    </li>`;
  };
  const render = y => {
    const list = ((data && data.ARCHIVE[y]) || []).slice().sort((a, b) => a.rank - b.rank);
    track.innerHTML = list.map(t => card(y, t)).join('');
    head.textContent = y === 2025 ? '36 rank holders, CSE 2025' : `Rank holders, CSE ${y}`;
    dr.setAttribute('aria-label', y === 2025 ? 'More UPSC CSE 2025 rank holders' : `UPSC CSE ${y} rank holders`);
  };

  const SPEED = 34;
  const coarse = matchMedia('(hover: none) and (pointer: coarse)').matches;
  let scrollRaf = 0, scrollPos = 0, scrollLast = 0, touching = false, userScroll = false, userT = 0;
  const stopScroll = () => { cancelAnimationFrame(scrollRaf); scrollRaf = 0; clearTimeout(userT); touching = false; userScroll = false; view.classList.remove('is-scroll'); view.scrollLeft = 0; };
  const wrapScroll = () => {
    const sl = view.scrollLeft;
    if (sl >= loopW * 1.5) { scrollPos = sl - loopW; view.scrollLeft = scrollPos; }
    else if (sl <= loopW * .5) { scrollPos = sl + loopW; view.scrollLeft = scrollPos; }
    else scrollPos = sl;
  };
  const scrollTick = now => {
    scrollRaf = 0;
    const dt = Math.min(.05, (now - (scrollLast || now)) / 1000); scrollLast = now;
    if (looping && !dr.classList.contains('is-off') && !touching && !userScroll) {
      scrollPos += SPEED * dt; view.scrollLeft = scrollPos;
      if (scrollPos >= loopW * 1.5) { scrollPos -= loopW; view.scrollLeft = scrollPos; }
    }
    scrollRaf = requestAnimationFrame(scrollTick);
  };
  const releaseUser = () => { clearTimeout(userT); userT = setTimeout(() => { if (!touching) { userScroll = false; scrollPos = view.scrollLeft; } }, 900); };
  if (coarse) {
    view.addEventListener('touchstart', () => { touching = true; userScroll = true; clearTimeout(userT); }, { passive: true });
    view.addEventListener('touchend', () => { touching = false; releaseUser(); }, { passive: true });
    view.addEventListener('touchcancel', () => { touching = false; releaseUser(); }, { passive: true });
    view.addEventListener('scroll', () => { if (!userScroll || !looping) return; wrapScroll(); releaseUser(); }, { passive: true });
  }
  let looping = false, loopW = 0, anim = null, vel = 0, hover = false, drag = null, fling = 0, moved = false, wheelT = 0;
  const dur = () => loopW / SPEED * 1000;
  const getOff = () => anim ? -((anim.currentTime || 0) % dur()) / dur() * loopW : 0;
  const setOff = o => { if (!anim) return; let m = o % loopW; if (m > 0) m -= loopW; anim.currentTime = -m / loopW * dur() + dur() * 100; };
  const live = () => looping && !dr.classList.contains('is-off');
  const sync2 = () => { if (!anim) return; if (live() && !hover && !drag && !fling && !wheelT) anim.play(); else anim.pause(); };
  const flingStep = now => {
    fling = 0;
    if (!anim || drag) return;
    const dt = flingStep.last ? Math.min(.05, (now - flingStep.last) / 1000) : 0; flingStep.last = now;
    if (Math.abs(vel) > 8 && live()) { setOff(getOff() + vel * dt); vel *= Math.exp(-dt * 3.2); fling = requestAnimationFrame(flingStep); }
    else { vel = 0; sync2(); }
  };
  const layout = () => {
    track.querySelectorAll('[data-copy]').forEach(c => c.remove());
    track.classList.remove('is-loop', 'is-still', 'is-drag');
    if (anim) { anim.cancel(); anim = null; }
    cancelAnimationFrame(fling); fling = 0;
    looping = false; vel = 0; track.style.transform = '';
    stopScroll();
    if (still) return;
    const fits = track.scrollWidth <= view.clientWidth;
    if (fits) { track.classList.add('is-still'); return; }
    [...track.children].forEach(li => { const c = li.cloneNode(true); c.dataset.copy = ''; c.setAttribute('aria-hidden', 'true'); c.inert = true; track.appendChild(c); });
    loopW = track.scrollWidth / 2; looping = true;
    if (coarse) {
      view.classList.add('is-scroll');
      scrollPos = loopW; view.scrollLeft = scrollPos; scrollLast = 0;
      scrollRaf = requestAnimationFrame(scrollTick);
      return;
    }
    track.classList.add('is-drag');
    anim = track.animate([{ transform: 'translate3d(0, 0, 0)' }, { transform: `translate3d(${-loopW}px, 0, 0)` }], { duration: dur(), iterations: Infinity });
    applyRate();
    sync2();
  };
  let boost = 0, dir = 1, rate = 1, boostRaf = 0, sy = scrollY, st = performance.now();
  const BOOST_MAX = 6, BOOST_PER_PX_S = 1 / 250;
  const applyRate = () => {
    if (!anim) return;
    if (rate < 0 && (anim.currentTime || 0) < dur()) anim.currentTime = (anim.currentTime || 0) + dur() * 100;
    anim.playbackRate = rate;
  };
  const boostStep = now => {
    boostRaf = 0;
    const dt = Math.min(.05, (now - (boostStep.last || now)) / 1000); boostStep.last = now;
    boost *= Math.exp(-dt * 2.4);
    if (boost < .02) boost = 0;
    const target = dir * (1 + boost);
    rate += (target - rate) * (1 - Math.exp(-dt * 9));
    if (Math.abs(target - rate) < .01) rate = target;
    applyRate();
    if (boost || rate !== dir) boostRaf = requestAnimationFrame(boostStep); else boostStep.last = 0;
  };
  if (!still) addEventListener('scroll', () => {
    const now = performance.now(), d = scrollY - sy, dt = Math.max(1, now - st); sy = scrollY; st = now;
    if (!d || !looping || dr.classList.contains('is-off')) return;
    dir = d > 0 ? 1 : -1;
    boost = Math.max(boost, Math.min(BOOST_MAX, Math.abs(d) / dt * 1000 * BOOST_PER_PX_S));
    if (!boostRaf) boostRaf = requestAnimationFrame(boostStep);
  }, { passive: true });
  let hoverT = 0;   // the drift holds only once the mouse has rested on the row for 3 seconds (user 2026-11-21), until it leaves
  view.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') { clearTimeout(hoverT); hoverT = setTimeout(() => { hover = true; sync2(); }, 3000); } });
  view.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') { clearTimeout(hoverT); hover = false; sync2(); } });
  view.addEventListener('pointerdown', e => {
    if (coarse || !looping || (e.pointerType === 'mouse' && e.button !== 0)) return;
    cancelAnimationFrame(fling); fling = 0; vel = 0; moved = false;
    drag = { id: e.pointerId, x: e.clientX, off: getOff(), lx: e.clientX, lt: performance.now(), vx: 0 };
  });
  view.addEventListener('pointermove', e => {
    if (!drag || e.pointerId !== drag.id) return;
    const dx = e.clientX - drag.x;
    if (!moved && Math.abs(dx) < 4) return;
    if (!moved) { moved = true; view.setPointerCapture(e.pointerId); view.classList.add('is-grabbing'); drag.off = getOff(); drag.x = e.clientX; sync2(); }
    const now = performance.now(), v = (e.clientX - drag.lx) / Math.max(.001, (now - drag.lt) / 1000);
    drag.vx = drag.vx * .3 + v * .7; drag.lx = e.clientX; drag.lt = now;
    setOff(drag.off + (e.clientX - drag.x));
  });
  const release = e => {
    if (!drag || (e && e.pointerId !== drag.id)) return;
    const flick = moved && performance.now() - drag.lt < 90 ? Math.max(-1800, Math.min(1800, drag.vx)) : 0;
    drag = null; view.classList.remove('is-grabbing');
    if (flick) { vel = flick; flingStep.last = 0; fling = requestAnimationFrame(flingStep); } else sync2();
  };
  view.addEventListener('pointerup', release);
  view.addEventListener('pointercancel', release);
  view.addEventListener('lostpointercapture', release);
  view.addEventListener('wheel', e => {
    if (coarse || !looping) return;
    const k = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? view.clientWidth : 1;
    const dx = e.deltaX * k, dy = e.deltaY * k;
    if (!dx || Math.abs(dx) <= Math.abs(dy)) return;
    e.preventDefault();
    cancelAnimationFrame(fling); fling = 0; vel = 0;
    clearTimeout(wheelT); wheelT = setTimeout(() => { wheelT = 0; sync2(); }, 180);
    sync2();
    setOff(getOff() - dx);
  }, { passive: false });
  view.addEventListener('click', e => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
  view.addEventListener('dragstart', e => e.preventDefault());

  let year = 2025, swapT = 0;
  const bar = dr.querySelector('.dr__bar');
  const tabApi = initTabs(bar, { onSelect: (id, tab) => {
    const y = +id; if (y === year) return;
    year = y;
    view.setAttribute('aria-labelledby', tab.id);
    view.classList.add('is-sw'); clearTimeout(swapT);
    swapT = setTimeout(() => { render(y); layout(); view.classList.remove('is-sw'); }, still ? 0 : 280);
  } });
  if (data) {
    const all = dr.querySelector(".dr__all"), older = tabs.filter(t => t.classList.contains("dr__tab--old"));
    if (all && older.length) all.addEventListener("click", () => {
      const open = all.getAttribute("aria-expanded") !== "true";
      older.forEach(t => { t.hidden = !open; });
      all.setAttribute("aria-expanded", open);
      all.querySelector(".dr__all-t").textContent = open ? "Show fewer" : "View all";
      if (!open && older.some(t => t.getAttribute("aria-selected") === "true")) tabApi.select(tabs[0].dataset.tab);
      requestAnimationFrame(() => { tabApi.place(true); tabApi.centre(true); });
    });
    else if (all) all.hidden = true;
  } else bar.hidden = true;   // no data, no years to choose from

  layout(); tabApi.centre(false);
  let rt = 0; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { layout(); tabApi.centre(false); }, 150); });
  const sync = () => { dr.classList.toggle('is-off', document.hidden); sync2(); };
  document.addEventListener('visibilitychange', sync);
  sync();
}

export function initStars() {
  var box = document.querySelector('[data-stars]');
  if (!box) return;
  var host = box.parentElement;
  var hex = (box.getAttribute('data-stars') || '#ffffff').replace('#', '');
  var rgb = [0, 2, 4].map(function (i) { return parseInt(hex.substr(i, 2), 16); }).join(',');
  var still = true;   // static glitter (user 2026-11-17): one frame drawn once, like an image; nothing moves or twinkles

  var cv = document.createElement('canvas');
  box.innerHTML = '';
  box.appendChild(cv);
  var cx = cv.getContext('2d');
  var W = 0, H = 0, dpr = 1, flies = [], raf = 0, onScreen = true, last = performance.now();

  function make(n) {
    flies = [];
    for (var i = 0; i < n; i++) {
      flies.push({ x: Math.random() * W, y: Math.random() * H, a: Math.random() * Math.PI * 2,
        v: .12 + Math.random() * .22,                      // px a frame: slow
        r: 3 + Math.random() * 5,                          // the star's reach, centre to point
        period: 3.5 + Math.random() * 4.5,                 // seconds between lightings
        phase: Math.random(),                              // where in its beat it starts
        spin: (Math.random() - .5) * .004, rot: (Math.random() - .5) * .3 });
    }
  }
  function size() {
    var w = box.clientWidth, h = box.clientHeight;
    if (!w || !h) return;
    var regrow = !flies.length || Math.abs(w - W) > 40 || Math.abs(h - H) > 40;
    W = w; H = h; dpr = Math.min(1.5, window.devicePixelRatio || 1);
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (regrow) make(Math.max(24, Math.min(90, Math.round(W * H / 22000))));
    sprites();
    draw(0);
  }

  function glow(p) {
    if (p < .55) return 0;
    if (p < .68) { var u = (p - .55) / .13; return u * u * (3 - 2 * u); }
    if (p < .76) return 1;
    var d = (p - .76) / .24; return 1 - d * d * (3 - 2 * d);
  }
  function sparkle(x, y, r, rot) {
    var k = r * .16;
    cx.save(); cx.translate(x, y); cx.rotate(rot);
    cx.beginPath();
    cx.moveTo(0, -r);
    cx.quadraticCurveTo(k, -k, r, 0);
    cx.quadraticCurveTo(k, k, 0, r);
    cx.quadraticCurveTo(-k, k, -r, 0);
    cx.quadraticCurveTo(-k, -k, 0, -r);
    cx.closePath(); cx.fill();
    cx.restore();
  }

  var R = 12, PAD = 30, spr = null;
  function sprite(blur, colour, alpha) {
    var c = document.createElement('canvas'), n = Math.ceil((R + PAD) * 2 * dpr);
    c.width = c.height = n;
    var g = c.getContext('2d'), keep = cx;
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    cx = g;   // sparkle() draws on cx
    g.shadowBlur = blur * dpr; g.shadowColor = 'rgba(' + colour + ',' + alpha + ')'; g.fillStyle = 'rgba(' + colour + ',1)';
    sparkle(R + PAD, R + PAD, R, 0);
    cx = keep;
    return c;
  }
  function sprites() { spr = { ember: sprite(4, rgb, 0), glow: sprite(26, rgb, .95), core: sprite(0, '255,255,255', 0) }; }
  function stamp(img, x, y, r, rot, alpha) {
    if (alpha < .01) return;
    var k = r / R, s = (R + PAD) * 2 * k;
    cx.globalAlpha = alpha;
    cx.save(); cx.translate(x, y); cx.rotate(rot);
    cx.drawImage(img, -s / 2, -s / 2, s, s);
    cx.restore();
  }

  function draw(dt) {
    var t = performance.now() / 1000;
    cx.clearRect(0, 0, W, H);
    if (!spr) sprites();
    for (var i = 0; i < flies.length; i++) {
      var f = flies[i];
      if (dt) {   // wander: the heading turns a little, as a firefly's
        f.a += (Math.random() - .5) * .08 * dt;
        f.x += Math.cos(f.a) * f.v * dt; f.y += Math.sin(f.a) * f.v * dt - .03 * dt;   // and a faint rise
        f.rot += f.spin * dt;
        if (f.x < -20) f.x = W + 20; else if (f.x > W + 20) f.x = -20;
        if (f.y < -20) f.y = H + 20; else if (f.y > H + 20) f.y = -20;
      }
      var g = still ? .7 : glow(((t / f.period) + f.phase) % 1);
      var o = .14 + g * .86;                               // never quite gone: a faint ember between lightings
      var r = f.r * (.85 + g * .35);
      stamp(spr.ember, f.x, f.y, r, f.rot, o * (1 - g));
      stamp(spr.glow, f.x, f.y, r, f.rot, o * g);
      if (g > .05) stamp(spr.core, f.x, f.y, r * .45, f.rot, g * .85);   // a bright core while lit
    }
    cx.globalAlpha = 1;
  }
  function loop(now) {
    raf = 0;
    if (!onScreen || document.hidden) return;
    if (now - last >= 32) {   // about 30 redraws a second
      var dt = Math.min(3, (now - last) / 16.67); last = now;   // in 60fps frames, so the pace holds on any screen
      draw(dt);
    }
    raf = requestAnimationFrame(loop);
  }
  function start() { if (!still && !raf && onScreen && !document.hidden) { last = performance.now(); raf = requestAnimationFrame(loop); } }

  size();
  if ('ResizeObserver' in window) new ResizeObserver(size).observe(box);
  else window.addEventListener('resize', size);
  if ('IntersectionObserver' in window) new IntersectionObserver(function (e) {
    onScreen = e[0].isIntersecting;
    var sec = host.closest('#toppers'); if (sec) sec.classList.toggle('pd--off', !onScreen);
    start();
  }).observe(host);
  document.addEventListener('visibilitychange', start);
  start();
}
