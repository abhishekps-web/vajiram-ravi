import { useId } from "react";


// 30-point rosette rim, computed once.
const STAR = (() => {
  const pts = [];
  const n = 30, ro = 49, ri = 45.2;
  for (let i = 0; i < n * 2; i++) {
    const r = i % 2 ? ri : ro;
    const a = (Math.PI * i) / n - Math.PI / 2;
    pts.push(`${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(" ");
})();

export function RankMedal({ rank, size = "m" }) {
  const id = useId().replace(/:/g, "");
  const big = size === "l";
  const two = String(rank).length > 1;

  return (
    <svg
      className={`tsp-medal tsp-medal--${size}`}
      viewBox={`0 0 100 ${big ? 132 : 100}`}
      role="img"
      aria-label={`All India Rank ${rank}`}
    >
      <defs>
        <linearGradient id={`${id}rim`} x1=".2" y1="0" x2=".8" y2="1">
          <stop offset="0" stopColor="#F6A428" />
          <stop offset=".45" stopColor="#F37623" />
          <stop offset="1" stopColor="#E0461B" />
        </linearGradient>
        {/* the logo emblem: a sun glowing yellow-orange from the middle out to a red-orange edge */}
        <radialGradient id={`${id}face`} cx=".5" cy=".5" r=".55">
          <stop offset="0" stopColor="#FFB82E" />
          <stop offset=".3" stopColor="#F6A428" />
          <stop offset=".62" stopColor="#F37623" />
          <stop offset=".85" stopColor="#EF641F" />
          <stop offset="1" stopColor="#ED5121" />
        </radialGradient>
        {big && (
          <>
            <linearGradient id={`${id}t1`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#C2410C" />
              <stop offset="1" stopColor="#8F2F08" />
            </linearGradient>
            <linearGradient id={`${id}t2`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2b241e" />
              <stop offset="1" stopColor="#16120E" />
            </linearGradient>
          </>
        )}
      </defs>

      {big && (
        <>
          <path d="M31 72 L19 128 L29 120 L37 131 L47 78Z" fill={`url(#${id}t1)`} />
          <path d="M69 72 L81 128 L71 120 L63 131 L53 78Z" fill={`url(#${id}t2)`} />
        </>
      )}

      <polygon points={STAR} fill={`url(#${id}rim)`} />
      <circle cx="50" cy="50" r="41" fill={`url(#${id}face)`} />
      <circle cx="50" cy="50" r="37" fill="none" stroke="#FFE3CF" strokeOpacity=".7" strokeWidth=".9" />
      <circle cx="50" cy="50" r="41" fill="none" stroke="#7a2806" strokeOpacity=".35" />
      <path d="M19 44 A32 32 0 0 1 81 44" fill="none" stroke="#fff" strokeOpacity=".13" strokeWidth="10" strokeLinecap="round" />

      {big && (
        <text x="50" y="36" textAnchor="middle" className="tsp-medal__air" fontSize="15" letterSpacing="2.6">AIR</text>
      )}
      <text x={two ? 48 : 47} y={big ? 73 : two ? 67 : 69} textAnchor="middle" className="tsp-medal__num"
        fontSize={two ? (big ? 34 : 46) : big ? 44 : 54}>{rank}</text>
    </svg>
  );
}
