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
 * The caption under the ring (introduction, qualifications, experience) was removed (user 2026-11-16): the
 * name and subject stay on the front card, and the full details stay in each slide's screen-reader text.
 * It turns by drag, swipe, the arrows just beside the ring, dots
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
