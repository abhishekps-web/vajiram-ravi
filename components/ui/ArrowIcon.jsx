// The site's arrows.
// ArrowIcon: the brush-stroke arrow on text links and CTAs (.tlink, .sm__mini-go …), 18px.
export function ArrowIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 16 16" width="18" height="18" aria-hidden="true">
      <path d="M2.5 8h11" />
      <path d="M8.6 3.6C9.4 5.9 11.2 7.4 13.5 8 11.2 8.6 9.4 10.1 8.6 12.4" />
    </svg>
  );
}

// StraightArrow: the plain line arrow, sized by its container's CSS (Why section CTAs, menu "View all" links).
export function StraightArrow() {
  return (
    <svg viewBox="0 0 16 16">
      <path d="M2 8h11M9 4l4 4-4 4" />
    </svg>
  );
}
