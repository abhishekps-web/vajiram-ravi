'use client';

import { useEffect, useRef, useState } from 'react';
import SectionWrapper from '@/components/ui/section_wrapper';
import Button from '@/components/ui/Button';
import CarouselDots from '@/components/ui/CarouselDots';
import '@/app/tailwind-sections.css';
import { VIDEOS } from '@/lib/data/videos';


const thumb = id => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

const CARD = 'cu:group cu:relative cu:block cu:w-full cu:aspect-video cu:overflow-hidden cu:rounded-(--r-card) cu:border-0 cu:p-0 cu:text-left cu:cursor-pointer cu:bg-[#1a0a02] cu:shadow-[0_14px_28px_-16px_rgba(102,38,13,.45)] cu:[transition:translate_.45s_cubic-bezier(.22,1,.36,1),box-shadow_.3s_ease] cu:fine:hover:-translate-y-1 cu:fine:hover:shadow-[0_22px_36px_-16px_rgba(102,38,13,.55)] cu:focus-visible:outline-2 cu:focus-visible:outline-(--brand) cu:focus-visible:outline-offset-[3px] cu:motion-reduce:transition-none';
const PLAY = 'cu:absolute cu:left-[18px] cu:bottom-[16px] cu:z-2 cu:block cu:w-[40px] cu:h-[28px] cu:[filter:drop-shadow(0_4px_10px_rgba(40,10,0,.45))] cu:[transition:scale_.35s_cubic-bezier(.22,1,.36,1)] cu:fine:group-hover:scale-110 cu:motion-reduce:transition-none';

function Poster({ v }) {
  return (
    <>
      <img className="cu:absolute cu:inset-0 cu:block cu:size-full cu:object-cover cu:[transition:scale_.7s_cubic-bezier(.22,1,.36,1)] cu:fine:group-hover:scale-[1.04] cu:motion-reduce:transition-none" src={thumb(v.id)} alt="" width="1280" height="720" loading="lazy" decoding="async" />
      <span aria-hidden="true" className="cu:absolute cu:inset-0 cu:bg-[linear-gradient(0deg,rgba(30,10,2,.55),rgba(30,10,2,0)_45%)]" />
      <svg aria-hidden="true" viewBox="0 0 68 48" className={PLAY}>
        <path fill="#FF0000" d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55C3.97 2.33 2.27 4.81 1.48 7.74.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" />
        <path fill="#fff" d="M45 24 27 14v20z" />
      </svg>
    </>
  );
}

const DLG = [
  'cu:fixed cu:inset-0 cu:m-0 cu:w-full cu:h-full cu:max-w-none cu:max-h-none cu:p-[clamp(16px,4vw,48px)] cu:border-0 cu:bg-transparent cu:open:grid cu:place-items-center',
  'cu:backdrop:bg-[rgba(20,8,2,.82)] cu:backdrop:backdrop-blur-[4px]',
  'cu:opacity-0 cu:open:opacity-100 cu:[transition:opacity_.3s_ease,overlay_.3s_allow-discrete,display_.3s_allow-discrete] cu:starting:open:opacity-0 cu:motion-reduce:transition-none',
].join(' ');
const BOX = 'cu:w-[min(100%,1040px)] cu:scale-100 cu:starting:scale-[.96] cu:[transition:scale_.4s_cubic-bezier(.22,1,.36,1)] cu:motion-reduce:transition-none';

function Player({ v, onClose }) {
  const dlg = useRef(null);
  useEffect(() => {
    const d = dlg.current;
    if (!v || !d) return;
    if (!d.open) d.showModal();
    window.__lenis?.stop();
    return () => window.__lenis?.start();
  }, [v]);
  const close = () => { dlg.current?.close(); };
  return (
    <dialog ref={dlg} className={DLG} aria-label={v ? `${v.name}, AIR ${v.rank}: ${v.title}` : 'Video'} onClose={onClose} onClick={e => { if (e.target === e.currentTarget) close(); }}>
      {v && (
        <>
          <Button variant="outline" size="sm" iconOnly iconStart="close" label="Close video" onClick={close} className="cu:fixed! cu:top-[clamp(12px,2.4vw,28px)] cu:right-[clamp(12px,2.4vw,28px)] cu:z-[3]" />
          <div className={BOX}>
            <p className="cu:m-0 cu:mb-[12px] cu:pr-[56px] cu:text-white cu:[font:600_16px/1.35_var(--f)]"><span className="cu:text-[#F7B267]">AIR {v.rank}</span> · {v.name} <span className="cu:font-normal cu:opacity-80">· {v.kind}</span></p>
            <iframe className="cu:block cu:w-full cu:aspect-video cu:rounded-(--r-card) cu:border-0 cu:bg-black cu:shadow-[0_30px_60px_-20px_rgba(0,0,0,.6)]" src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`} title={`${v.name}, AIR ${v.rank}: ${v.title}`} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
          </div>
        </>
      )}
    </dialog>
  );
}

function Video({ v, onPlay }) {
  const label = `Play: ${v.name}, AIR ${v.rank}, ${v.title}`;
  return (
    <li className="cu:min-w-0">
      <button type="button" className={CARD} onClick={() => onPlay(v)} aria-label={label} aria-haspopup="dialog"><Poster v={v} /></button>
    </li>
  );
}

export default function VideoStories() {
  const [playing, setPlaying] = useState(null);
  return (
    <SectionWrapper id="videos" aria-label="Topper talks" compact>
      <div className="rail cu:mt-0! cu:[container-type:inline-size] cu:[--bgap:var(--card-gap)] cu:[--cw:calc((100cqw-3*var(--bgap))/4)] cu:max-[1180px]:[--cw:calc((100cqw-var(--bgap))/2)] cu:max-[640px]:[--cw:86cqw]">
        <ul id="vidRail" data-lenis-prevent-horizontal className="rail__track rv cu:list-none cu:gap-(--bgap) cu:pt-[6px]! cu:pb-[18px]! cu:outline-none!" tabIndex={0} role="region" aria-roledescription="carousel" aria-label="Topper videos">
          {VIDEOS.map(v => <Video key={v.rank} v={v} onPlay={setPlaying} />)}
        </ul>
        <div className="rail__nav rv cu:flex cu:justify-center cu:gap-[12px] cu:mt-[4px] cu:max-[760px]:hidden cu:min-[1024px]:absolute cu:min-[1024px]:inset-x-[calc(var(--px)*-1)] cu:min-[1024px]:top-[6px] cu:min-[1024px]:h-[calc(var(--cw)*9/16)] cu:min-[1024px]:z-[2] cu:min-[1024px]:m-0 cu:min-[1024px]:justify-between cu:min-[1024px]:items-center cu:min-[1024px]:px-[max(4px,calc((var(--px)-44px)/2))] cu:min-[1024px]:pointer-events-none cu:min-[1024px]:[&>*]:pointer-events-auto" style={{ '--d': '.24s' }}>
          <Button variant="outline" size="sm" iconOnly iconStart="arrow-left" label="Previous videos" className="cbtn cbtn--prev" />
          <Button variant="outline" size="sm" iconOnly iconStart="arrow" label="Next videos" className="cbtn cbtn--next" />
        </div>
        <div className="cu:flex cu:justify-center cu:mt-[4px] cu:min-[761px]:hidden"><CarouselDots className="rail__dots" tone="light" label="Choose a video" labels={VIDEOS.map(v => `Show AIR ${v.rank}, ${v.name}`)} controls="vidRail" /></div>
      </div>
      <Player v={playing} onClose={() => setPlaying(null)} />
    </SectionWrapper>
  );
}
