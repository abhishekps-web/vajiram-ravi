"use client";
// Ported from the Soloman build (Downloads/solo/Vajiram-ravi, src/components/ui/CarouselControls.tsx), user 2026-11-13.

import type { RefObject } from "react";
import Button from "@/components/ui/Button/Button";
import { cx } from "@/components/sections/Faculties/lib/cx";

/*
 * Carousel arrows and dots (motion spec, "Carousel arrows + dots"), the same on every carousel of the page.
 *   - Arrow: a quiet outline at rest (a hairline ring over a faint frosted backing, so it reads over a card
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
  // The site's own icon-only outline button (components/ui/Button), the same as the Batches arrows (user 2026-11-16: the
  // arrows had their own style, unlike every other CTA). `shape` and `size` are no longer used: the button system sets them.
  return (
    <Button
      variant="outline"
      iconOnly
      iconStart={direction === "prev" ? "arrow-left" : "arrow"}
      label={label}
      onDark={tone === "dark"}
      disabled={disabled}
      onClick={onClick}
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
  return (
    <div role="group" aria-label={label} className={cx("flex items-center gap-2", className)}>
      {Array.from({ length: count }, (_, i) => {
        const isActive = i === active;
        return (
          <button
            key={i}
            type="button"
            aria-label={`${itemName} ${i + 1} of ${count}`}
            aria-current={isActive || undefined}
            onClick={() => onSelect(i)}
            className={cx(
              "relative h-2 cursor-pointer overflow-hidden rounded-full [transition:width_var(--dur-base)_var(--ease-in-out),background-color_var(--dur-fast)_var(--ease-out)] after:absolute after:-inset-2",
              isActive ? "w-6" : "w-2",
              tone === "light"
                ? isActive
                  ? fillRef
                    ? "bg-burnt/25"
                    : "bg-burnt"
                  : "bg-clay/30 hover:bg-clay/60"
                : isActive
                  ? fillRef
                    ? "bg-white/30"
                    : "bg-white"
                  : "bg-cream/65 hover:bg-cream/90",
            )}
          >
            {isActive && fillRef && (
              <span
                ref={fillRef}
                aria-hidden="true"
                className={cx("absolute inset-0 origin-left rounded-full", tone === "light" ? "bg-burnt" : "bg-white")}
                // Starts empty; the clock sets the fill (not a scale class, which would multiply with it).
                style={{ transform: "scaleX(0)" }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
