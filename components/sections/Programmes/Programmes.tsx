import "./programmes.css";
import type { CSSProperties } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button/Button";
import TextMotion from "@/components/sections/Programmes/ui/TextMotion";
import { programmes, programmesClosing } from "@/components/sections/Programmes/data/programmes";
import { contact } from "@/components/sections/Programmes/data/site";
import CourseShelf from "./CourseShelf";

/**
 * Explore UPSC Programmes (IA 4; Figma "03 · Explore Our Programmes", 2377:4612): a cream band with
 * "All our UPSC programmes", every programme group as a book on the wooden course shelf and its category
 * filter (CourseShelf), and under them a card pointing to the counsellors. The flagship card, the newspaper
 * collage and the "Find the right UPSC programme" heading were removed (user 2026-11-13; FlagshipCard.tsx is unused). The copy is the `kevin` branch's (data/programmes).
 * Padding 96 / 96; 48px from the heading to the card, 96px from the card to the shelf.
 */
export default function Programmes() {
  return (
    // id="courses": this site's anchor for the section (the nav, the hero button, the course menus and the catalogue link to it).
    // Its section title, eyebrow and body copy use this site's styles (SectionLabel, .h2.h2--sec, user 2026-11-13); everything
    // else is soloboy's. The ground (background) is this site's Programmes ground, shared with the hero and header (v49.css).
    <section id="courses" aria-labelledby="programmes-h" className="prog relative overflow-clip bg-cream">
      {/* soloboy's text and scroll motion (data-zoom, data-split, data-fade, data-drift …), held to this section */}
      <TextMotion rootId="courses" />
      <div className="prog__canvas relative mx-auto flex w-canvas flex-col items-start px-20 pt-[90px]">
        {/* The course shelf: its heading, then the filter and the books on their planks (CourseShelf). */}
        <div className="relative w-full">
          {/* the section's heading (the flagship card and the "Find the right UPSC programme" heading above it were removed, user 2026-11-13) */}
          <div className="flex justify-center"><SectionLabel>Programmes</SectionLabel></div>
          <h2 id="programmes-h" className="prog__shelf-h h2 h2--sec rv" style={{ "--d": ".08s" } as CSSProperties}>
            {/* the previous website's heading (user 2026-11-13) */}
            Programmes for every stage of UPSC.
          </h2>
          {/* the previous website's body text (user 2026-11-13) */}
          <p className="prog__intro intro rv" style={{ "--d": ".16s" } as CSSProperties}>
            Choose the stage you&apos;re preparing for, then the programme. Every programme runs in the classroom and LIVE-Online.
          </p>
          <div className="mt-[40px]">
            <CourseShelf programmes={programmes} />
          </div>
        </div>

        <div className="relative w-full pt-14 pb-24">
          {/*
            The client's closing line, as a card under the shelf: a counsellor's headset in
            a burnt disc, the question and the line, then the phone number and the button to the counselling form.
            It fades in out of a soft blur as it comes into view (ui/TextMotion, data-fade).
          */}
          <aside
            data-fade
            aria-labelledby="programmes-help-h"
            className="prog__help relative mx-auto flex w-[1040px] items-center gap-7 rounded-[16px] border border-[#eadbc4] bg-white/85 py-7 pr-8 pl-7 shadow-rest backdrop-blur-sm"
          >
            <span aria-hidden="true" className="flex size-16 shrink-0 items-center justify-center rounded-full bg-burnt text-white">
              <svg viewBox="0 0 24 24" width={30} height={30} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
                <rect x={3} y={13} width={4} height={6} rx={1.5} />
                <rect x={17} y={13} width={4} height={6} rx={1.5} />
                <path d="M19 19v.5a2.5 2.5 0 0 1-2.5 2.5H13" />
              </svg>
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <h3 id="programmes-help-h" className="font-heading text-[26px]/[1.2] font-normal text-ink">
                {programmesClosing.question}
              </h3>
              <p className="text-[17px]/[1.5] text-clay">
                {programmesClosing.text}{" "}
                <a href={contact.phoneHref} className="font-semibold whitespace-nowrap text-burnt underline decoration-burnt/30 underline-offset-4 [transition:text-decoration-color_var(--dur-fast)_var(--ease-out)] hover:decoration-burnt">
                  {contact.phone}
                </a>
                <span className="whitespace-nowrap"> · {contact.hours}</span>
              </p>
            </div>
            {/* the site's design-system button (components/ui/Button), user 2026-11-13 */}
            <Button className="shrink-0" href={programmesClosing.cta.href} iconEnd="arrow">
              {programmesClosing.cta.label}
            </Button>
          </aside>
        </div>
      </div>
    </section>
  );
}
