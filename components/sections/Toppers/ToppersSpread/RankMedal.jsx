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
        <linearGradient id={`${id}rim`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFB27A" />
          <stop offset=".35" stopColor="#F06A2C" />
          <stop offset=".75" stopColor="#D2490F" />
          <stop offset="1" stopColor="#9E3408" />
        </linearGradient>
        <radialGradient id={`${id}face`} cx=".38" cy=".3" r=".8">
          <stop offset="0" stopColor="#F7843F" />
          <stop offset=".55" stopColor="#E35A1E" />
          <stop offset="1" stopColor="#B8420D" />
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
        <text x="50" y="31" textAnchor="middle" className="tsp-medal__air" fontSize="8.5" letterSpacing="2.2">AIR</text>
      )}
      <text x={two ? 48 : 47} y={big ? 70 : two ? 67 : 69} textAnchor="middle" className="tsp-medal__num"
        fontSize={two ? (big ? 38 : 46) : big ? 48 : 54}>{rank}</text>
    </svg>
  );
}
