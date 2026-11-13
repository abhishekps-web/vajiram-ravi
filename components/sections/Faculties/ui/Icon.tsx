// Ported from the Soloman build (Downloads/solo/Vajiram-ravi, src/components/ui/Icon.tsx), user 2026-11-13.
import { cx } from "@/components/sections/Faculties/lib/cx";

/** The design's line icons (Figma "icon/ur", "icon/l", "icon/r", plus, "icon/minus", the header's 16px phone, and a folded map for "View on maps"). */
const ICONS = {
  "arrow-ur": "/assets/img/educators/icons/arrow-ur.svg",
  "arrow-l": "/assets/img/educators/icons/arrow-l.svg",
  "arrow-r": "/assets/img/educators/icons/arrow-r.svg",
  plus: "/assets/img/educators/icons/plus.svg",
  minus: "/assets/img/educators/icons/minus.svg",
  phone: "/assets/img/educators/icons/phone.svg",
  map: "/assets/img/educators/icons/map.svg",
} as const;

export type IconName = keyof typeof ICONS;

/**
 * One of the design's icons, painted in the current text colour: the SVG is used as a mask, so the same
 * file serves the white arrow in a dark disc and the dark arrow in a light one. Decoration only.
 */
export default function Icon({ name, className }: { name: IconName; className?: string }) {
  const mask = `url(${ICONS[name]}) center / contain no-repeat`;
  return <span aria-hidden="true" className={cx("block size-3.5 shrink-0 bg-current", className)} style={{ mask, WebkitMask: mask }} />;
}
