"use client";
// Ported from the Soloman build (Downloads/solo/Vajiram-ravi, src/components/ui/CarouselControls.tsx), user 2026-11-13.

import type { RefObject } from "react";
import Button from "@/components/ui/Button/Button";
import { cx } from "@/components/sections/Faculties/lib/cx";
import SiteDots from "@/components/ui/CarouselDots/CarouselDots";

/*
 * Carousel arrows and dots (motion spec, "Carousel arrows + dots"), the same on every carousel of the page.
 *   - Arrow: now the site's icon-only Button (outline, sm; user 2026-11-16), the notes below are the old look. A quiet outline at rest (a hairline ring over a faint frosted backing, so it reads over a card
 *     or a photo, the icon in ink); only hover fills it ink and turns
 *     the icon cream (--dur-fast). Pressing scales it to 0.96 and sets off the press ripple: a disc grows
 *     out from the point pressed and a ring pulses past the edge (lib/pressRipple, the same as
 *     the buttons). An arrow with nothing further to go hides (opacity 0, out of the tab order) but keeps
 *     its place.
 *   - Dots: the active dot stretches from 8px to 24px wide over --dur-base. An autoplaying carousel can
 *     show its progress inside the active dot through `fillRef`.
 */

type CarouselArrowProps = {
  direction: "prev" | "next";
  onClick: () => void;
  /** E.g. "Next toppers", "Previous batches". */
  label: string;
  /** Nothing further this way: hide without removing. */
  hidden?: boolean;
  /** Nothing further this way, but stay in view, dimmed (for a carousel whose arrows always show). */
  disabled?: boolean;
  /**
   * "light" (the default) on paper; "dark" on a dark band, the ring and icon in cream. "solid" is the old
   * filled look, now the same as "light": every arrow is an outline until hovered.
   */
  tone?: "light" | "dark" | "solid";
  /** "circle" or the toppers' rounded "square". */
  shape?: "circle" | "square";
  /** Box size in px (40 or 44 in the design). */
  size?: number;
  className?: string;
};

export function CarouselArrow({ direction, onClick, label, hidden = false, disabled = false, tone = "light", className }: CarouselArrowProps) {
  // The site's one icon-only button (user 2026-11-16: every icon-only button looks the same): Button outline sm, a 44px circle,
  // onDark on a dark band. `shape` and `size` are kept in the props for the callers but no longer change the look.
  return (
    <Button
      variant="outline"
      size="sm"
      iconOnly
      onDark={tone === "dark"}
      iconStart={direction === "prev" ? "arrow-left" : "arrow"}
      label={label}
      onClick={onClick}
      disabled={disabled}
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      className={cx("carousel-arrow", hidden && "pointer-events-none opacity-0", className)}
    />
  );
}

type CarouselDotsProps = {
  count: number;
  active: number;
  onSelect: (index: number) => void;
  /** Accessible name of the dot group, e.g. "Choose story". */
  label: string;
  /** What one item is called: "Story" reads "Story 3 of 10". */
  itemName: string;
  /** Colours of the active and idle dots. */
  tone?: "light" | "dark";
  /** Autoplay progress: a fill inside the active dot that the carousel's clock scales from 0 to 1. */
  fillRef?: RefObject<HTMLSpanElement | null>;
  className?: string;
};

export function CarouselDots({ count, active, onSelect, label, itemName, tone = "light", fillRef, className }: CarouselDotsProps) {
  // The site's carousel indicator, the one shared component (components/ui/CarouselDots, user 2026-11-17); the current dot's fill
  // starts empty under the ring's clock (it sets the fill through `fillRef`), full without one.
  return (
    <SiteDots
      label={label}
      labels={Array.from({ length: count }, (_, i) => `${itemName} ${i + 1} of ${count}`)}
      active={active}
      onSelect={onSelect}
      tone={tone}
      fillRef={fillRef}
      fillProps={(_: number, on: boolean) => (on && fillRef ? { style: { transform: "scaleX(0)" } } : {})}
      className={className}
    />
  );
}
