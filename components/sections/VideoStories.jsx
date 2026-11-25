'use client';

import { useRef, useState } from 'react';
import SectionWrapper from '@/components/ui/section_wrapper';
import SectionLabel from '@/components/ui/SectionLabel';
import Button from '@/components/ui/Button';
import '@/app/tailwind-sections.css';

const PORTRAIT = '/assets/img/toppers/portrait/2025/';

export const VIDEOS = [
  { id: '', rank: 1, name: 'Anuj Agnihotri', title: 'How I prepared for AIR 1', photo: '01-anuj-agnihotri-460.webp' },
  { id: '', rank: 2, name: 'Rajeshwari Suve M', title: 'Tests, revision and the interview', photo: '02-rajeshwari-suve-m-460.webp' },
  { id: '', rank: 3, name: 'Akansh Dhull', title: 'GS from the classroom to AIR 3', photo: '03-akansh-dhull-460.webp' },
  { id: '', rank: 4, name: 'Raghav Jhunjhunwala', title: 'What the mock interviews taught me', photo: '04-raghav-jhunjhunwala-460.webp' },
  { id: '', rank: 5, name: 'Ishan Bhatnagar', title: 'Sociology optional, start to finish', photo: '05-ishan-bhatnagar-460.webp' },
  { id: '', rank: 6, name: 'Zinnia Aurora', title: 'Ethics, essays and staying steady', photo: '06-zinnia-aurora-460.webp' },
];

const search = v => `https://www.youtube.com/results?search_query=${encodeURIComponent(`Vajiram and Ravi ${v.name} AIR ${v.rank}`)}`;

const CARD = 'cu:group cu:relative cu:block cu:w-full cu:aspect-video cu:overflow-hidden cu:rounded-(--r-card) cu:border-0 cu:p-0 cu:text-left cu:cursor-pointer cu:bg-[linear-gradient(135deg,#D9581A_0%,#B23A0E_55%,#7A2A0C_100%)] cu:shadow-[0_14px_28px_-16px_rgba(102,38,13,.45)] cu:[transition:translate_.45s_cubic-bezier(.22,1,.36,1),box-shadow_.3s_ease] cu:fine:hover:-translate-y-1 cu:fine:hover:shadow-[0_22px_36px_-16px_rgba(102,38,13,.55)] cu:focus-visible:outline-2 cu:focus-visible:outline-(--brand) cu:focus-visible:outline-offset-[3px] cu:motion-reduce:transition-none';
const PLAY = 'cu:absolute cu:left-[22px] cu:bottom-[20px] cu:z-2 cu:grid cu:place-items-center cu:size-[52px] cu:rounded-full cu:bg-white cu:text-(--brand) cu:shadow-[0_8px_18px_-6px_rgba(40,10,0,.5)] cu:[transition:scale_.35s_cubic-bezier(.22,1,.36,1)] cu:fine:group-hover:scale-110 cu:motion-reduce:transition-none';

function Poster({ v }) {
  return (
    <>
      <span aria-hidden="true" className="cu:absolute cu:inset-0 cu:bg-[radial-gradient(70%_90%_at_78%_100%,rgba(255,214,150,.35),transparent_70%)]" />
      <img className="cu:absolute cu:right-[4%] cu:bottom-0 cu:h-[94%] cu:w-auto cu:max-w-none cu:[transition:scale_.7s_cubic-bezier(.22,1,.36,1)] cu:origin-bottom cu:fine:group-hover:scale-[1.04] cu:motion-reduce:transition-none" src={PORTRAIT + v.photo} alt="" width="460" height="574" loading="lazy" decoding="async" />
      <span aria-hidden="true" className="cu:absolute cu:inset-0 cu:bg-[linear-gradient(90deg,rgba(60,16,2,.55),rgba(60,16,2,0)_62%)]" />
      <span className="cu:absolute cu:left-[22px] cu:top-[18px] cu:z-1 cu:flex cu:flex-col cu:text-white">
        <span className="cu:[font:400_34px/1_var(--f-title)] cu:tracking-[-.02em]"><small className="cu:text-[.6em] cu:tracking-[.04em]">AIR</small> {v.rank}</span>
        <span className="cu:mt-[6px] cu:[font:600_14px/1.3_var(--f)] cu:text-white/90">{v.name}</span>
      </span>
      <span aria-hidden="true" className={PLAY}>
        <svg viewBox="0 0 24 24" width="22" height="22" className="cu:ml-[3px] cu:fill-current"><path d="M7 4.5v15a1 1 0 0 0 1.53.85l12-7.5a1 1 0 0 0 0-1.7l-12-7.5A1 1 0 0 0 7 4.5z" /></svg>
      </span>
    </>
  );
}

function Video({ v, i }) {
  const [on, setOn] = useState(false);
  const label = `Play: ${v.name}, AIR ${v.rank}, ${v.title}`;
  return (
    <li className="rv cu:flex-none cu:w-[min(82vw,380px)] cu:snap-start" style={{ '--d': `${0.08 * i}s` }}>
      {on ? (
        <iframe className="cu:block cu:w-full cu:aspect-video cu:rounded-(--r-card) cu:border-0 cu:bg-black" src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`} title={`${v.name}, AIR ${v.rank}: ${v.title}`} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
      ) : v.id ? (
        <button type="button" className={CARD} onClick={() => setOn(true)} aria-label={label}><Poster v={v} /></button>
      ) : (
        <a className={CARD} href={search(v)} target="_blank" rel="noopener noreferrer" aria-label={`${label} (opens YouTube)`}><Poster v={v} /></a>
      )}
      <p className="cu:mt-[12px] cu:mb-0 cu:[font:600_16px/1.35_var(--f)] cu:text-(--ink)">{v.title}</p>
      <p className="cu:mt-[2px] cu:mb-0 cu:text-[13.5px] cu:text-(--body)">Topper talk · UPSC CSE 2025</p>
    </li>
  );
}

export default function VideoStories() {
  const rail = useRef(null);
  const step = dir => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector('li');
    el.scrollBy({ left: dir * ((card?.offsetWidth || 380) + 20), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };
  return (
    <SectionWrapper id="videos" labelledBy="vidH" compact bleed>
      <div className="cu:flex cu:flex-col cu:items-center cu:px-(--px) cu:text-center">
        <SectionLabel>Topper talks</SectionLabel>
        <h2 id="vidH" className="h2 h2--sec rv cu:mx-auto! cu:text-center!" style={{ '--d': '.08s' }}>Watch how they did it.</h2>
        <p className="intro rv cu:mx-auto! cu:text-balance" style={{ '--d': '.16s' }}>Rank holders on their preparation, in their own words.</p>
      </div>
      <div className="cu:relative cu:mt-(--hd-gap)">
        <ul ref={rail} data-lenis-prevent-horizontal className="cu:m-0 cu:flex cu:list-none cu:gap-[20px] cu:overflow-x-auto cu:scroll-smooth cu:snap-x cu:snap-mandatory cu:px-(--px) cu:pt-[6px] cu:pb-[18px] cu:[scroll-padding-inline:var(--px)] cu:[scrollbar-width:none] cu:[&::-webkit-scrollbar]:hidden" aria-label="Topper videos" tabIndex={0}>
          {VIDEOS.map((v, i) => <Video key={v.rank} v={v} i={i} />)}
        </ul>
        <div className="cu:flex cu:justify-center cu:gap-[12px] cu:mt-[8px]">
          <Button variant="outline" size="sm" iconOnly iconStart="arrow-left" label="Previous videos" onClick={() => step(-1)} />
          <Button variant="outline" size="sm" iconOnly iconStart="arrow" label="Next videos" onClick={() => step(1)} />
        </div>
      </div>
    </SectionWrapper>
  );
}
