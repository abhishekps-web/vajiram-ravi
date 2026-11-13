"use client";
// Ported from the Soloman build (Downloads/solo/Vajiram-ravi, src/components/sections/Faculty/EducatorFlow.tsx), user 2026-11-13.

import CircularCarousel from "@/components/sections/Faculties/ui/CircularCarousel";
import type { Educator } from "@/components/sections/Faculties/data/educators";

/** The autoplay step, ms. */
const AUTOPLAY_MS = 4500;

/**
 * The educators on a circular carousel (after React Bits' "Circular Carousel"): portrait cards standing
 * round a ring, each bent to follow it, the camera looking a little down onto it. The card at the front is
 * in colour; the rest are in black and white (colour on hover) and fade into the cream as they turn away.
 * Under the ring the front educator is introduced: the name, the subject, the introduction and the
 * qualifications and experience, cross-fading as the front changes (the dots sit between the ring and
 * the caption). It turns by drag, swipe, the arrows just beside the ring, dots
 * and keys, and plays on its own, pausing while the pointer is on the front card, on keyboard focus and
 * off screen (no pause button).
 */
export default function EducatorFlow({ educators }: { educators: Educator[] }) {
  return (
    <CircularCarousel
      items={educators}
      label="Our educators"
      itemName="educator"
      slideTitle={(educator) => `${educator.name}, ${educator.focus}`}
      image={(educator) => educator.photo}
      href={(educator) => educator.profile}
      renderSlide={(educator) => <SlideText educator={educator} />}
      renderCaption={(educator) => <Caption educator={educator} />}
      // the name and position on each card (user 2026-11-13)
      cardLabel={(educator) => ({ title: educator.name, sub: educator.focus })}
      width={264}
      // compact cards (user 2026-11-13): 340 tall (was 372); the 2:3 portraits are cropped, not squeezed, to fit
      height={340}
      gap={30}
      interval={AUTOPLAY_MS}
      fadeColor="#fff8ec"
      backColor="#ead9c2"
      tone="light"
      spacing={20}
      // The ring's visible ends are about 467px either side of the centre; the arrows sit 32px clear of them.
      arrowReach={523}
    />
  );
}

/** The slide's content for assistive technology: the card itself is only the portrait. */
function SlideText({ educator }: { educator: Educator }) {
  const { name, focus, qualifications, experience, introduction } = educator;
  const details = [focus, qualifications, experience, introduction].filter(Boolean).join(". ");
  return (
    <>
      <h3>{name}</h3>
      {details && <p>{details}</p>}
    </>
  );
}

/**
 * Under the ring, in a clear order (the name and position are on the active card itself, not repeated here):
 * the introduction as the reading text (18px, ink, at a measure of about 60 characters); then the
 * qualifications and the experience as two quiet facts, each after its own line icon (a mortarboard, a
 * clock), set apart by a hairline.
 */
function Caption({ educator }: { educator: Educator }) {
  // the name and position are shown once, on the active card's portrait (cardLabel, user 2026-11-13); the caption keeps the rest
  const { introduction, qualifications, experience } = educator;
  return (
    <div className="mx-auto flex w-[620px] flex-col items-center text-center">
      {introduction && <p className="edu__intro">{introduction}</p>}
      {(qualifications || experience) && (
        <div className="edu__facts mt-3.5 flex items-center gap-4 border-t border-[#eadbc4] pt-3">
          {qualifications && (
            <span className="flex items-center gap-2">
              <svg aria-hidden="true" viewBox="0 0 20 20" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="text-burnt">
                <path d="M2 7.5 10 4l8 3.5-8 3.5-8-3.5Z" />
                <path d="M5.5 9.2v3.6c1.2 1.1 2.7 1.7 4.5 1.7s3.3-.6 4.5-1.7V9.2M18 7.5v4.5" />
              </svg>
              {qualifications}
            </span>
          )}
          {qualifications && experience && <span aria-hidden="true" className="h-4 w-px bg-[#e2cfb5]" />}
          {experience && (
            <span className="flex items-center gap-2">
              <svg aria-hidden="true" viewBox="0 0 20 20" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="text-burnt">
                <circle cx={10} cy={10} r={7} />
                <path d="M10 6v4l2.5 2" />
              </svg>
              {experience}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
