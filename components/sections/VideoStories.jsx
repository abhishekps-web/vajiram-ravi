'use client';

import { useRef, useState } from 'react';
import SectionWrapper from '@/components/ui/section_wrapper';
import SectionLabel from '@/components/ui/SectionLabel';
import Button from '@/components/ui/Button';
import '@/app/tailwind-sections.css';

export const VIDEOS = [
  { id: 'jt7VPv1sj2Q', rank: 1, name: 'Anuj Agnihotri', kind: 'Podcast', title: 'Strategy and UPSC journey' },
  { id: '4pKnokirInA', rank: 2, name: 'Rajeshwari Suve M', kind: 'Conversation', title: 'In conversation with Vajiram and Ravi' },
  { id: 'SE3JLx4X1po', rank: 6, name: 'Zinnia Aurora', kind: 'Mock interview', title: 'Mock interview at Vajiram and Ravi' },
  { id: 'Dz4c-u3uVAk', rank: 7, name: 'A R Rajah Mohaideen', kind: 'Mock interview', title: 'Mock interview at Vajiram and Ravi' },
  { id: 'E7xstkOMzo8', rank: 8, name: 'Pakshal Secretry', kind: 'Mock interview', title: 'Mock interview at Vajiram and Ravi' },
  { id: 'NEy_MGGPSYg', rank: 10, name: 'Ujjwal Priyank', kind: 'Interaction', title: 'Interaction with Vajiram and Ravi' },
  { id: 'gi8DUbtQGsU', rank: 12, name: 'Akshit Bhardwaj', kind: 'Strategy', title: 'Strategies and tips' },
  { id: 'MjCwNNfCJ9E', rank: 18, name: 'Sruthii R', kind: 'Mock interview', title: 'Mock interview at Vajiram and Ravi' },
];

const thumb = id => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

const CARD = 'cu:group cu:relative cu:block cu:w-full cu:aspect-video cu:overflow-hidden cu:rounded-(--r-card) cu:border-0 cu:p-0 cu:text-left cu:cursor-pointer cu:bg-[#1a0a02] cu:shadow-[0_14px_28px_-16px_rgba(102,38,13,.45)] cu:[transition:translate_.45s_cubic-bezier(.22,1,.36,1),box-shadow_.3s_ease] cu:fine:hover:-translate-y-1 cu:fine:hover:shadow-[0_22px_36px_-16px_rgba(102,38,13,.55)] cu:focus-visible:outline-2 cu:focus-visible:outline-(--brand) cu:focus-visible:outline-offset-[3px] cu:motion-reduce:transition-none';
const PLAY = 'cu:absolute cu:left-[22px] cu:bottom-[20px] cu:z-2 cu:grid cu:place-items-center cu:size-[52px] cu:rounded-full cu:bg-white cu:text-(--brand) cu:shadow-[0_8px_18px_-6px_rgba(40,10,0,.5)] cu:[transition:scale_.35s_cubic-bezier(.22,1,.36,1)] cu:fine:group-hover:scale-110 cu:motion-reduce:transition-none';

function Poster({ v }) {
  return (
    <>
      <img className="cu:absolute cu:inset-0 cu:block cu:size-full cu:object-cover cu:[transition:scale_.7s_cubic-bezier(.22,1,.36,1)] cu:fine:group-hover:scale-[1.04] cu:motion-reduce:transition-none" src={thumb(v.id)} alt="" width="1280" height="720" loading="lazy" decoding="async" />
      <span aria-hidden="true" className="cu:absolute cu:inset-0 cu:bg-[linear-gradient(0deg,rgba(30,10,2,.55),rgba(30,10,2,0)_45%)]" />
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
      ) : (
        <button type="button" className={CARD} onClick={() => setOn(true)} aria-label={label}><Poster v={v} /></button>
      )}
      <p className="cu:mt-[12px] cu:mb-0 cu:[font:600_16px/1.35_var(--f)] cu:text-(--ink)"><span className="cu:text-(--brand)">AIR {v.rank}</span> · {v.name}</p>
      <p className="cu:mt-[2px] cu:mb-0 cu:text-[13.5px] cu:text-(--body)">{v.kind} · UPSC CSE 2025</p>
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
