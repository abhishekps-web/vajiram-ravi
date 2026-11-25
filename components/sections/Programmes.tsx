"use client";

import '@/app/tailwind-sections.css';
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionWrapper from "@/components/ui/section_wrapper";
import Button from "@/components/ui/Button";
import { ControlledTabs } from "@/components/ui/Tabs";
import { contact, coursePageHref, programmeCategories, programmes, programmesClosing, type CoverArtKind, type Href, type CoverEmblem, type Programme, type ProgrammeCategory } from "@/lib/data/programmes";

const MINOR = new Set(["a", "an", "and", "as", "at", "by", "for", "in", "of", "on", "or", "the", "to", "with"]);
const titleCase = (s: string) => s.split(" ").map((w, i) => (i && MINOR.has(w) ? w : w.charAt(0).toUpperCase() + w.slice(1))).join(" ");

function cx(...names: Array<string | false | null | undefined>): string {
  return names.filter(Boolean).join(" ");
}
function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    !!window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function whenFontsReady(): Promise<unknown> {
  return document.fonts?.ready ?? Promise.resolve();
}

function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

const NUDGE =
  "cu:[transition:translate_300ms_var(--ease-out)] cu:group-hover/medal:translate-x-1 cu:motion-reduce:transition-none";

const ARROW = "M9.23077 15H19.6154M15.5769 19.0385L19.6154 15L15.5769 10.9615";

const TONES = {
  cream: { disc: "#FFF8EC", mark: "#CC5500" },

  bare: { disc: "transparent", mark: "#FFF8EC" },
  saffron: { disc: "#F4C430", mark: "#2A1A12" },
  ink: { disc: "#2A1A12", mark: "#F4C430" },
  burnt: { disc: "#CC5500", mark: "#FFF8EC" },
} as const;

type MedallionTone = keyof typeof TONES;

type MedallionProps = {
  tone: MedallionTone;

  size?: number;

  pressNudge?: boolean;

  children?: ReactNode;
  className?: string;
};

function Medallion({ tone, size = 30, pressNudge = false, children, className }: MedallionProps) {
  void TONES[tone];
  return (
    <span aria-hidden="true" className={cx("cu:relative cu:inline-block cu:shrink-0", className)} style={{ width: size, height: size }}>
      <svg viewBox="0 0 30 30" width={size} height={size} className="cu:absolute cu:inset-0 cu:overflow-visible" fill="none">
        {!children && (
          <path
            d={ARROW}
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            className={cx(NUDGE, pressNudge && "cu:group-active/medal:translate-x-[5px]")}
          />
        )}
      </svg>
      {children && <span className="cu:absolute cu:inset-0 cu:flex cu:items-center cu:justify-center">{children}</span>}
    </span>
  );
}

const TONE = {

  light: { text: "cu:text-burnt", medallion: "burnt" },

  dark: { text: "cu:text-saffron", medallion: "saffron" },
} as const;

type IndianLinkProps = {
  children: ReactNode;
  tone: keyof typeof TONE;

  href?: Href;
  onClick?: () => void;
  target?: string;

  underlined?: boolean;

  size?: "md" | "sm";

  medallion?: number;

  className?: string;
  ariaLabel?: string;
};

function IndianLink({ children, tone, href, onClick, target, underlined = false, size = "md", medallion, className, ariaLabel }: IndianLinkProps) {
  const look = TONE[tone];
  const medallionSize = medallion ?? (size === "sm" ? 24 : 26);
  const classes = cx(
    "cu:group/medal cu:inline-flex cu:items-center cu:font-sans cu:font-bold cu:whitespace-nowrap",
    size === "sm" ? "cu:gap-1.5 cu:text-[13px]/[18px]" : "cu:gap-2 cu:text-[15px]/[22px]",
    look.text,
    className,
  );
  const content = (
    <>
      <span
        className={cx(
          "relative",
          underlined &&
            "cu:underline cu:decoration-1 cu:underline-offset-[3px] cu:[transition:text-decoration-thickness_var(--dur-fast)_var(--ease-out)] cu:group-hover/medal:decoration-2",
        )}
      >
        {children}
        {!underlined && (
          <span
            aria-hidden="true"
            className="cu:absolute cu:inset-x-0 cu:-bottom-px cu:h-px cu:origin-left cu:scale-x-0 cu:bg-current cu:[transition:scale_var(--dur-fast)_var(--ease-out)] cu:group-hover/medal:scale-x-100"
          />
        )}
      </span>
      <Medallion tone={look.medallion} size={medallionSize} pressNudge />
    </>
  );

  if (href === null) return <span className={cx(classes, "cu:cursor-default")}>{content}</span>;
  if (href !== undefined) {
    return (
      <a href={href} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined} aria-label={ariaLabel} className={classes}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} aria-label={ariaLabel} className={cx(classes, "cu:cursor-pointer")}>
      {content}
    </button>
  );
}

const MOVE = "cu:[transform-box:fill-box] cu:origin-center cu:[transition:translate_700ms_var(--ease-out),scale_700ms_var(--ease-out),rotate_700ms_var(--ease-out),opacity_700ms_var(--ease-out)] cu:motion-reduce:transition-none";

function GeoArt({ kind, accent, soft }: { kind: CoverArtKind; accent: string; soft: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className="cu:pointer-events-none cu:absolute cu:inset-0 cu:size-full cu:overflow-hidden">
      {kind === "bars" && (
        <>
          <rect x={52} y={45} width={60} height={13} rx={6.5} fill={accent} className={`${MOVE} cu:group-hover/book:-translate-x-[14px]`} />
          <rect x={22} y={62} width={90} height={16} rx={8} fill={soft} opacity={0.75} className={`${MOVE} cu:group-hover/book:translate-x-[8px]`} />
          <rect x={30} y={82} width={80} height={14} rx={7} fill={soft} opacity={0.45} className={`${MOVE} cu:group-hover/book:-translate-x-[10px]`} />
        </>
      )}
      {kind === "circles" && (
        <>
          <circle cx={98} cy={84} r={44} fill={soft} opacity={0.55} className={`${MOVE} cu:group-hover/book:scale-[1.12]`} />
          <circle cx={20} cy={104} r={36} fill={soft} opacity={0.45} className={`${MOVE} cu:group-hover/book:-translate-y-[6px]`} />
          <circle cx={62} cy={68} r={16} fill={accent} className={`${MOVE} cu:group-hover/book:-translate-x-[10px] cu:group-hover/book:-translate-y-[8px]`} />
        </>
      )}
      {kind === "grid" && (
        <g>
          {[0, 1, 2].map((row) =>
            [0, 1, 2].map((col) => {
              const centre = row === 1 && col === 1;
              return (
                <rect
                  key={`${row}-${col}`}
                  x={48 + col * 20}
                  y={46 + row * 20}
                  width={15}
                  height={15}
                  rx={2.5}
                  fill={centre ? accent : soft}
                  opacity={centre ? 1 : 0.6}
                  className={`${MOVE} cu:group-hover/book:rotate-45 ${centre ? "cu:group-hover/book:scale-[1.05]" : "cu:group-hover/book:scale-[0.82]"}`}
                  style={{ transitionDelay: `${(row + col) * 40}ms` }}
                />
              );
            }),
          )}
        </g>
      )}
      {kind === "arches" && (
        <>
          <path d="M8 104 V82 A22 22 0 0 1 30 60 H30 V104 Z" fill={soft} opacity={0.6} className={`${MOVE} cu:group-hover/book:translate-x-[8px]`} />
          <path d="M108 104 V82 A22 22 0 0 0 86 60 H86 V104 Z" fill={soft} opacity={0.8} className={`${MOVE} cu:group-hover/book:-translate-x-[8px]`} />
          <circle cx={58} cy={76} r={4} fill={accent} className={`${MOVE} cu:group-hover/book:scale-[1.6]`} />
        </>
      )}
      {kind === "arcs" && (
        <>
          <circle cx={22} cy={104} r={48} fill={soft} opacity={0.35} className={`${MOVE} cu:group-hover/book:scale-[1.1]`} />
          <circle cx={22} cy={104} r={32} fill={soft} opacity={0.5} className={`${MOVE} cu:group-hover/book:scale-[1.18]`} />
          <circle cx={66} cy={62} r={9} fill={accent} className={`${MOVE} cu:group-hover/book:translate-x-[6px] cu:group-hover/book:-translate-y-[10px]`} />
        </>
      )}
      {kind === "lines" && (
        <>
          <rect x={30} y={44} width={34} height={8} rx={2.5} fill={accent} className={`${MOVE} cu:group-hover/book:scale-x-[1.4] cu:origin-left`} />
          {[
            { y: 57, w: 22 },
            { y: 70, w: 44 },
            { y: 83, w: 20 },
          ].map((line, i) => (
            <rect
              key={line.y}
              x={30}
              y={line.y}
              width={line.w}
              height={8}
              rx={2.5}
              fill={soft}
              opacity={0.75}
              className={`${MOVE} cu:origin-left cu:group-hover/book:scale-x-[1.35]`}
              style={{ transitionDelay: `${(i + 1) * 60}ms` }}
            />
          ))}
        </>
      )}
      {kind === "target" && (
        <>
          <circle cx={58} cy={76} r={34} fill={soft} opacity={0.35} className={`${MOVE} cu:group-hover/book:scale-[1.08]`} />
          <circle cx={58} cy={76} r={23} fill={soft} opacity={0.5} className={`${MOVE} cu:group-hover/book:scale-[1.12]`} style={{ transitionDelay: "60ms" }} />
          <circle cx={58} cy={76} r={13} fill={soft} opacity={0.7} className={`${MOVE} cu:group-hover/book:scale-[1.16]`} style={{ transitionDelay: "120ms" }} />
          <circle cx={58} cy={76} r={6} fill={accent} className={`${MOVE} cu:group-hover/book:scale-[1.3]`} />
        </>
      )}
      {kind === "quarters" && (
        <>
          <path d="M30 104 V92 A26 26 0 0 1 56 66 V104 Z" fill={soft} opacity={0.6} className={`${MOVE} cu:group-hover/book:-translate-y-[6px]`} />
          <path d="M80 104 V90 A24 24 0 0 1 104 66 V104 Z" fill={soft} opacity={0.75} className={`${MOVE} cu:group-hover/book:-translate-y-[10px]`} />
          <circle cx={76} cy={46} r={3.5} fill={accent} className={`${MOVE} cu:group-hover/book:-translate-x-[12px] cu:group-hover/book:translate-y-[6px]`} />
        </>
      )}
    </svg>
  );
}

const DRAWINGS: Record<CoverEmblem, ReactNode> = {

  books: (
    <>
      <path d="M24 17c-2.6-1.8-6-2.4-10-2.2v16c4-.2 7.4.4 10 2.2 2.6-1.8 6-2.4 10-2.2v-16c-4-.2-7.4.4-10 2.2Z" />
      <path d="M24 17v16M17 20.5h3.5M17 24h3.5M27.5 20.5H31M27.5 24H31" />
    </>
  ),

  abacus: (
    <>
      <rect x={15} y={15} width={18} height={18} rx={2} />
      <path d="M15 21h18M15 27h18" />
      <circle cx={20} cy={21} r={1.6} />
      <circle cx={26} cy={21} r={1.6} />
      <circle cx={23} cy={27} r={1.6} />
      <circle cx={29} cy={27} r={1.6} />
    </>
  ),

  quill: (
    <>
      <path d="M33 15c-7 1-12 6-14 14l-1.5 4.5" />
      <path d="M33 15c-1 6-4.5 10.5-11 12.5" />
      <path d="M21 30.5h8" />
    </>
  ),

  layers: (
    <>
      <path d="m24 15 9 4.5-9 4.5-9-4.5 9-4.5Z" />
      <path d="m15 24 9 4.5 9-4.5M15 28.5 24 33l9-4.5" />
    </>
  ),

  target: (
    <>
      <circle cx={24} cy={24} r={9} />
      <circle cx={24} cy={24} r={5} />
      <circle cx={24} cy={24} r={1.4} />
      <path d="m24 24 8-8M29 16h3v3" />
    </>
  ),

  pen: (
    <>
      <path d="M15 31h9M15 27h6M15 23h5" />
      <path d="m27 29.5 6.5-6.5a1.8 1.8 0 0 0-2.5-2.5L24.5 27 24 30Z" />
    </>
  ),

  compass: (
    <>
      <circle cx={24} cy={24} r={9} />
      <path d="m27.8 20.2-2.3 5.3-5.3 2.3 2.3-5.3 5.3-2.3Z" />
    </>
  ),

  mic: (
    <>
      <rect x={20.5} y={14} width={7} height={12} rx={3.5} />
      <path d="M17 23.5a7 7 0 0 0 14 0M24 30.5V34M20.5 34h7" />
    </>
  ),
};

function CoverArt({ emblem, size }: { emblem: CoverEmblem; size: number }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="emblem cu:overflow-visible cu:text-[#f6c77a] cu:[transition:color_500ms_var(--ease-out),scale_600ms_var(--ease-out),filter_600ms_var(--ease-out)] cu:group-hover/book:scale-[1.08] cu:group-hover/book:text-[#ffe3b0] cu:group-hover/book:drop-shadow-[0_0_6px_rgb(255_210_130/0.55)]"
    >

      <g className="cu:[transform-box:view-box] cu:origin-center cu:animate-[emblem-turn_60s_linear_infinite] cu:motion-reduce:animate-none">
        <circle cx={24} cy={24} r={21.5} strokeWidth={0.9} strokeDasharray="1.2 2.4" />
      </g>
      <circle cx={24} cy={24} r={18.5} strokeWidth={0.9} />

      <g className="cu:[&>*]:[stroke-dasharray:90] cu:[&>*]:[stroke-dashoffset:0] cu:group-hover/book:[&>*]:animate-[emblem-draw_1100ms_cubic-bezier(.22,1,.36,1)_both] cu:group-hover/book:[&>*:nth-child(2)]:animate-[emblem-draw_1100ms_cubic-bezier(.22,1,.36,1)_120ms_both] cu:group-hover/book:[&>*:nth-child(n+3)]:animate-[emblem-draw_1100ms_cubic-bezier(.22,1,.36,1)_220ms_both] cu:motion-reduce:group-hover/book:[&>*]:animate-none">{DRAWINGS[emblem]}</g>
    </svg>
  );
}

const TM_EASE = "cubic-bezier(0.215, 0.61, 0.355, 1)";
const CHAR_MS = 480;

const CHAR_STAGGER = 8;
const CHAR_SPREAD_MS = 120;

const MAX_DELAY_MS = 200;
const STEP_MS = 40;
const MAX_STEPS = 5;

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const SHUFFLE_MS = 50;
const COUNT_MS = 600;

const COUNT_POLL_MS = 300;

const DECK_DEPTH = [0.85, 0.35, 1, 0.55, 0.9, 0.3, 0.7, 0.45];
const DECK_TURN = [-2.4, 1.6, -1.2, 2.2, -1.8, 1.2, -2, 1.4];

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const stagger = (i: number) => Math.min(i, MAX_STEPS) * STEP_MS;

type Playable = HTMLElement & { tmPlay?: () => void };

function textNodes(el: HTMLElement): Text[] {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  return nodes;
}

function splitLetters(el: HTMLElement): HTMLElement[] {
  const chars: HTMLElement[] = [];
  for (const node of textNodes(el)) {
    const parts = (node.textContent ?? "").split(/(\s+)/);
    const frag = document.createDocumentFragment();
    for (const part of parts) {
      if (!part) continue;
      if (/^\s+$/.test(part)) {
        frag.append(document.createTextNode(" "));
        continue;
      }
      const mask = document.createElement("span");
      mask.className = "tm-mask";
      mask.setAttribute("aria-hidden", "true");
      for (const letter of Array.from(part)) {
        const ch = document.createElement("span");
        ch.className = "tm-ch";
        ch.textContent = letter;
        mask.append(ch);
        chars.push(ch);
      }
      frag.append(mask);
    }
    node.replaceWith(frag);
  }
  return chars;
}

type Scramble = { nodes: Text[]; finals: string[]; total: number; start: number; duration: number; shuffled: number };
type Counter = { el: HTMLElement; node: Text; final: string; head: string; tail: string; target: number; commas: boolean; start: number };
type Drifter = { el: HTMLElement; frame: Element; y: number; turn: number; last: string };
type Expand = { el: HTMLElement; size: [number, number]; focus: [number, number]; radius: number; last: number };

function pair(value: string | undefined, fallback: [number, number]): [number, number] {
  const [a, b] = (value ?? "").trim().split(/\s+/).map(Number);
  const first = Number.isFinite(a) && a > 0 ? a : fallback[0];
  return [first, Number.isFinite(b) && b > 0 ? b : Number.isFinite(a) && a > 0 ? a : fallback[1]];
}

function TextMotion({ rootId }: { rootId: string }) {
  useEffect(() => {
    if (prefersReducedMotion() || typeof document.body.animate !== "function") return;

    const scope = document.getElementById(rootId);
    if (!scope) return;
    const cleanups: Array<() => void> = [];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          (entry.target as Playable).tmPlay?.();
        }
      },
      { rootMargin: "0px 0px -18% 0px" },
    );
    scope.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
      if (el.dataset.tmDone) return;
      el.dataset.tmDone = "1";
      if (!el.hasAttribute("aria-label")) el.setAttribute("aria-label", (el.textContent ?? "").replace(/\s+/g, " ").trim());
      const chars = splitLetters(el);
      const step = Math.min(CHAR_STAGGER, CHAR_SPREAD_MS / Math.max(1, chars.length));
      const animations = chars.map((ch, i) =>
        ch.animate([{ transform: "translateY(110%)" }, { transform: "none" }], { duration: CHAR_MS, delay: i * step, easing: TM_EASE, fill: "backwards" }),
      );
      animations.forEach((a) => a.pause());
      (el as Playable).tmPlay = () => animations.forEach((a) => a.playState === "paused" && a.play());
      observer.observe(el);
      cleanups.push(() => animations.forEach((a) => a.finish()));
    });
    cleanups.push(() => observer.disconnect());

    const zones = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) (entry.target as HTMLElement).style.setProperty("--lp", entry.isIntersecting ? "running" : "paused");
      },
      { rootMargin: "80px 0px" },
    );
    const zoneEls = [scope, ...Array.from(scope.querySelectorAll<HTMLElement>("section, footer, [data-lp-zone]"))];
    zoneEls.forEach((zone) => zones.observe(zone));
    cleanups.push(() => {
      zones.disconnect();
      zoneEls.forEach((zone) => zone.style.removeProperty("--lp"));
    });

    const below = (el: Element) => el.getBoundingClientRect().top > window.innerHeight * 0.92;
    const enter = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          enter.unobserve(entry.target);
          (entry.target as Playable).tmPlay?.();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );

    const arm = (el: HTMLElement, animations: Animation[]) => {
      animations.forEach((a) => a.pause());
      (el as Playable).tmPlay = () => animations.forEach((a) => a.playState === "paused" && a.play());
      enter.observe(el);
      cleanups.push(() => animations.forEach((a) => a.finish()));
    };
    const held = (value: string | undefined) => Math.min(MAX_DELAY_MS, Number(value) || 0);
    scope.querySelectorAll<HTMLElement>("[data-zoom]").forEach((el) => {
      if (!below(el)) return;
      arm(el, [el.animate([{ opacity: 0, transform: "translateY(32px) scale(0.96)" }, { opacity: 1, transform: "none" }], { duration: 520, easing: TM_EASE, fill: "backwards" })]);
    });
    scope.querySelectorAll<HTMLElement>("[data-rise]").forEach((el) => {
      if (!below(el)) return;
      arm(el, [el.animate([{ opacity: 0, transform: "translateY(40px) scale(0.97)" }, { opacity: 1, transform: "none" }], { duration: 560, easing: TM_EASE, fill: "backwards" })]);
    });
    scope.querySelectorAll<HTMLElement>("[data-stagger]").forEach((el) => {
      if (!below(el)) return;
      const items = Array.from(el.children) as HTMLElement[];
      arm(el, items.map((item, i) => item.animate([{ opacity: 0, transform: "translateY(16px)" }, { opacity: 1, transform: "none" }], { duration: 480, delay: stagger(i), easing: TM_EASE, fill: "backwards" })));
    });
    const WIPES: Record<string, string> = { up: "inset(100% 0 0 0)", down: "inset(0 0 100% 0)", left: "inset(0 0 0 100%)", right: "inset(0 100% 0 0)" };
    scope.querySelectorAll<HTMLElement>("[data-wipe]").forEach((el) => {
      if (!below(el)) return;
      const delay = held(el.dataset.wipeDelay);
      const from = WIPES[el.dataset.wipe ?? ""] ?? WIPES.up;
      const animations = [el.animate([{ clipPath: from }, { clipPath: "inset(0 0 0 0)" }], { duration: 700, delay, easing: TM_EASE, fill: "backwards" })];
      const picture = el.querySelector("img");
      if (picture) animations.push(picture.animate([{ scale: "1.08" }, { scale: "1" }], { duration: 900, delay, easing: TM_EASE, fill: "backwards" }));
      arm(el, animations);
    });

    const FADE: Keyframe[] = [
      { opacity: 0, filter: "blur(6px)" },
      { opacity: 1, filter: "blur(0px)" },
    ];
    scope.querySelectorAll<HTMLElement>("[data-fade], [data-fade-each]").forEach((el) => {
      if (!below(el)) return;
      const delay = held(el.dataset.fade);
      const items = el.hasAttribute("data-fade-each") ? (Array.from(el.children) as HTMLElement[]) : [el];
      arm(el, items.map((item, i) => item.animate(FADE, { duration: 500, delay: delay + stagger(i), easing: TM_EASE, fill: "backwards" })));
    });

    const deep = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          deep.unobserve(entry.target);
          (entry.target as Playable).tmPlay?.();
        }
      },
      { rootMargin: "0px 0px -35% 0px" },
    );
    cleanups.push(() => deep.disconnect());
    scope.querySelectorAll<HTMLElement>("[data-depth-cards]").forEach((el) => {
      if (!below(el)) return;

      const animations = (Array.from(el.children) as HTMLElement[]).map((card, i) => {
          const depth = DECK_DEPTH[i % DECK_DEPTH.length];
          return card.animate(
            [
              {
                translate: `${((i % 2 ? 1 : -1) * 18 * depth).toFixed(1)}px ${(-24 + 64 * depth).toFixed(1)}px`,
                scale: String(1 - 0.12 * depth),
                rotate: `${DECK_TURN[i % DECK_TURN.length]}deg`,
                opacity: 1 - 0.6 * depth,
              },
              { translate: "0 0", scale: "1", rotate: "0deg", opacity: 1 },
            ],
            { duration: 560, delay: stagger(i), easing: TM_EASE, fill: "backwards" },
          );
        });
      animations.forEach((animation) => animation.pause());
      (el as Playable).tmPlay = () => animations.forEach((animation) => animation.playState === "paused" && animation.play());
      deep.observe(el);
      cleanups.push(() => animations.forEach((animation) => animation.cancel()));
    });
    cleanups.push(() => enter.disconnect());

    let frame = 0;
    let dirty = true;
    const request = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const scrambles: Scramble[] = [];
    scope.querySelectorAll<HTMLElement>("[data-scramble]").forEach((el) => {
      if (!below(el)) return;
      const nodes = textNodes(el).filter((node) => (node.nodeValue ?? "").trim());
      if (!nodes.length) return;
      const finals = nodes.map((node) => node.nodeValue ?? "");
      const total = finals.reduce((sum, text) => sum + text.length, 0);
      (el as Playable).tmPlay = () => {
        scrambles.push({ nodes, finals, total, start: performance.now(), duration: Math.min(600, 300 + total * 10), shuffled: 0 });
        request();
      };
      enter.observe(el);
      cleanups.push(() => nodes.forEach((node, i) => (node.nodeValue = finals[i])));
    });
    const runScrambles = (now: number) => {
      for (let s = scrambles.length - 1; s >= 0; s--) {
        const job = scrambles[s];
        const progress = (now - job.start) / job.duration;
        if (progress >= 1) {
          job.nodes.forEach((node, i) => (node.nodeValue = job.finals[i]));
          scrambles.splice(s, 1);
          continue;
        }
        if (now - job.shuffled < SHUFFLE_MS) continue;
        job.shuffled = now;
        let k = 0;
        job.nodes.forEach((node, i) => {
          let out = "";
          for (const char of job.finals[i]) {

            const settled = progress >= 0.2 + 0.8 * (k++ / job.total);
            if (settled || !/[a-z0-9]/i.test(char)) out += char;
            else {
              const glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
              out += char === char.toLowerCase() && char !== char.toUpperCase() ? glyph.toLowerCase() : glyph;
            }
          }
          node.nodeValue = out;
        });
      }
      return scrambles.length > 0;
    };

    const pending: Counter[] = [];
    const counting: Counter[] = [];
    scope.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
      const node = textNodes(el).find((n) => /\d/.test(n.nodeValue ?? ""));
      if (!node) return;
      const final = node.nodeValue ?? "";
      const match = final.match(/\d[\d,]*/);
      if (!match || match.index === undefined) return;
      const target = Number(match[0].replace(/,/g, ""));
      if (!target) return;
      pending.push({ el, node, final, head: final.slice(0, match.index), tail: final.slice(match.index + match[0].length), target, commas: match[0].includes(","), start: 0 });
    });
    cleanups.push(() =>
      counting.splice(0).forEach((c) => {
        c.node.nodeValue = c.final;
        c.el.style.removeProperty("display");
        c.el.style.removeProperty("min-width");
      }),
    );
    let poll = 0;
    const checkCounters = () => {
      const vh = window.innerHeight;
      let waiting = false;
      for (let i = pending.length - 1; i >= 0; i--) {
        const c = pending[i];
        const box = c.el.getBoundingClientRect();
        if (box.top > vh * 0.9 || box.bottom < 0) continue;
        const seen = typeof c.el.checkVisibility === "function" ? c.el.checkVisibility({ opacityProperty: true, visibilityProperty: true }) : true;
        if (!seen) {
          waiting = true;
          continue;
        }
        pending.splice(i, 1);

        if (getComputedStyle(c.el).display === "inline") c.el.style.display = "inline-block";
        c.el.style.minWidth = `${c.el.offsetWidth}px`;
        c.start = performance.now();
        counting.push(c);
      }
      if (waiting && !poll) {
        poll = window.setTimeout(() => {
          poll = 0;
          checkCounters();
          if (counting.length) request();
        }, COUNT_POLL_MS);
      }
    };
    cleanups.push(() => window.clearTimeout(poll));
    const runCounters = (now: number) => {
      for (let i = counting.length - 1; i >= 0; i--) {
        const c = counting[i];
        const t = clamp01((now - c.start) / COUNT_MS);
        if (t >= 1) {
          c.node.nodeValue = c.final;
          c.el.style.removeProperty("display");
          c.el.style.removeProperty("min-width");
          counting.splice(i, 1);
          continue;
        }
        const n = Math.round(c.target * (1 - Math.pow(1 - t, 4)));
        c.node.nodeValue = c.head + (c.commas ? n.toLocaleString("en-US") : String(n)) + c.tail;
      }
      return counting.length > 0;
    };

    const pictures = Array.from(scope.querySelectorAll<HTMLElement>("[data-par]"), (el) => ({ el, amount: Number(el.dataset.par) || 6 }));
    const drifters: Drifter[] = Array.from(scope.querySelectorAll<HTMLElement>("[data-drift], [data-turn]"), (el) => ({
      el,
      frame: el.closest("[data-drift-frame]") ?? el.parentElement?.closest("section, footer") ?? el.parentElement ?? el,
      y: Number(el.dataset.drift) || 0,
      turn: Number(el.dataset.turn) || 0,
      last: "",
    }));
    const curtains = Array.from(scope.querySelectorAll<HTMLElement>("[data-curtain]"));
    const expands: Expand[] = Array.from(scope.querySelectorAll<HTMLElement>("[data-expand]"), (el) => ({
      el,
      size: pair(el.dataset.expand, [0.4, 0.45]),
      focus: pair(el.dataset.expandFocus, [0.5, 0.5]),
      radius: Number(el.dataset.expandRadius) || 28,
      last: -1,
    }));
    const marquees = Array.from(scope.querySelectorAll<HTMLElement>("[data-marquee]"), (el) => ({
      el,
      track: el.querySelector<HTMLElement>("[data-marquee-track]") ?? el,
      travel: Number(el.dataset.marquee) || -480,
    }));
    const viewportBlur = scope.querySelector<HTMLElement>("[data-gb-viewport]");

    const scrollUpdate = () => {
      const vh = window.innerHeight;
      for (const { el, amount } of pictures) {
        const frameBox = (el.parentElement ?? el).getBoundingClientRect();
        if (frameBox.bottom < 0 || frameBox.top > vh) continue;
        const progress = clamp01((vh - frameBox.top) / (vh + frameBox.height));
        el.style.transform = `translateY(${(-amount + 2 * amount * progress).toFixed(2)}%)`;
      }
      for (const d of drifters) {
        const box = d.frame.getBoundingClientRect();
        const progress = clamp01((vh - box.top) / (vh + box.height)) - 0.5;
        const value = `translate3d(0, ${(d.y * progress).toFixed(1)}px, 0)${d.turn ? ` rotate(${(d.turn * progress).toFixed(2)}deg)` : ""}`;
        if (value === d.last) continue;
        d.last = value;
        d.el.style.transform = value;
      }
      for (const el of curtains) {
        const top = el.getBoundingClientRect().top;
        const progress = clamp01((vh - top) / (vh * 0.6));
        if (progress >= 1) {
          el.style.clipPath = "";
        } else {
          const inset = (1 - progress) * 4;
          const radius = (1 - progress) * 40;
          el.style.clipPath = `inset(0 ${inset.toFixed(2)}% round ${radius.toFixed(1)}px)`;
        }
      }
      for (const x of expands) {
        const box = x.el.getBoundingClientRect();

        const centre = box.top + x.focus[1] * box.height;
        const start = vh - (x.size[1] / 2) * box.height;
        const p = clamp01((start - centre) / Math.max(1, start - vh * 0.5));
        const step = Math.round(p * 1000);
        if (step === x.last) continue;
        x.last = step;
        if (p >= 1) {
          x.el.style.clipPath = "";
          continue;
        }
        const e = 1 - p * p * (3 - 2 * p);
        const [w, h] = x.size;
        const [fx, fy] = x.focus;

        const left = Math.max(0, fx - w / 2) * 100 * e;
        const right = Math.max(0, 1 - fx - w / 2) * 100 * e;
        const top = Math.max(0, fy - h / 2) * 100 * e;
        const bottom = Math.max(0, 1 - fy - h / 2) * 100 * e;
        x.el.style.clipPath = `inset(${top.toFixed(2)}% ${right.toFixed(2)}% ${bottom.toFixed(2)}% ${left.toFixed(2)}% round ${(x.radius * e).toFixed(1)}px)`;
      }
      for (const m of marquees) {
        const box = m.el.getBoundingClientRect();
        if (box.bottom < 0 || box.top > vh) continue;
        const progress = clamp01((vh - box.top) / (vh + box.height));
        m.track.style.transform = `translate3d(${(m.travel * progress).toFixed(1)}px, 0, 0)`;
      }
      if (viewportBlur) {
        const end = document.documentElement.getBoundingClientRect().bottom - vh;
        viewportBlur.toggleAttribute("data-on", window.scrollY > vh * 0.5 && end > vh * 0.25);
      }
      checkCounters();
    };

    function tick(now: number) {
      frame = 0;
      if (dirty) {
        dirty = false;
        scrollUpdate();
      }
      const counts = runCounters(now);
      const shuffles = runScrambles(now);
      if (counts || shuffles) request();
    }
    const onScroll = () => {
      dirty = true;
      request();
    };
    request();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    cleanups.push(() => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      drifters.forEach(({ el }) => (el.style.transform = ""));
      expands.forEach(({ el }) => (el.style.clipPath = ""));
      marquees.forEach((m) => (m.track.style.transform = ""));
      viewportBlur?.removeAttribute("data-on");
    });

    return () => cleanups.forEach((fn) => fn());
  }, [rootId]);

  return null;
}


const PLANK_GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='80'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.0035 0.42' numOctaves='3' seed='11'/%3E%3CfeColorMatrix values='0 0 0 0 0.22 0 0 0 0 0.11 0 0 0 0 0.04 2 0 0 0 -0.66'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`;

const BOOK = { w: 195, h: 230 };

const FOLLOW_BOTTOM = 18;

const REST_TILT = "perspective(1200px) rotateX(10deg)";
const HOVER_TILT = "perspective(1200px) translateY(-26px) rotateX(calc(var(--ty, 0) * -4deg)) rotateY(calc(var(--tx, 0) * 6deg))";
const REST_SHADOW = "drop-shadow(0 8px 10px rgb(60 25 5 / 0.16))";
const HOVER_SHADOW = "drop-shadow(calc(var(--tx, 0) * -12px) 34px 26px rgb(60 25 5 / 0.3))";
const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";
const FALL = "linear(0, 0.04 10%, 0.16 20%, 0.36 30%, 0.64 40%, 1 50%, 0.9 58%, 0.88 62%, 0.93 68%, 1 76%, 0.98 84%, 1 92%, 1)";
const GAP = 32;
const ROW_H = 300;
const BOOK_TOP = 30;
const PLANK_TOP = BOOK_TOP + BOOK.h - 8;
const PAGE = { w: 378, h: 504 };
const OPEN_H = 2 * ROW_H;

type Geom = { cols: number; stageW: number; plankW: number; spine: Pt };

function geomFor(cols: number, tight = false): Geom {
  const books = cols * BOOK.w + (cols - 1) * GAP;
  const stageW = tight ? books + 84 : Math.max(books + 216, 2 * PAGE.w);
  return { cols, stageW, plankW: tight ? books + 60 : books + 116, spine: { x: stageW / 2, y: OPEN_H / 2 } };
}

const stayPut = (event: { currentTarget: EventTarget; preventDefault: () => void }) => {
  if ((event.currentTarget as HTMLAnchorElement).getAttribute("href") === "#") event.preventDefault();
};
const shelfCols = (width: number) => (width >= 1024 ? 4 : width > 640 ? 3 : 2);

const MOVE_MS = 650;
const OPEN_MS = 750;
const TURN_MS = 700;

const SETTLE = "cubic-bezier(0.34, 1.4, 0.64, 1)";
const EASE = "var(--ease-out)";

const STACK_TILT = 66;
const STACK_T = 12;
const STACK_SHIFT = [-6, 9, -3, 11, -9, 4, -5, 7];
const STACK_TURN = [-3, 2.5, -1.5, 3.5, -2, 1, -3.5, 2];

const PILE_IN_MS = 220;
const PILE_DROP_MS = 10;
const DEAL_GAP_MS = 60;
const FLIGHT_MS = 420;

const LIE_MS = 280;
const STAND_MS = 340;
const TIP_STAGGER_MS = 25;
const ARRIVE_AFTER_MS = 120;
const SLIDE_MS = 450;

const LEAVE_MS = 340;

type Filter = "All" | ProgrammeCategory;
const FILTERS: Filter[] = ["All", ...programmeCategories];

const PAPER = "cu:bg-[#fff8ec]";
const SPINE_SHADE_RIGHT_PAGE = "cu:bg-[linear-gradient(90deg,rgb(77_31_8/0.14),transparent_10%)]";
const SPINE_SHADE_LEFT_PAGE = "cu:bg-[linear-gradient(270deg,rgb(77_31_8/0.14),transparent_10%)]";

const FOIL = "#f6c77a";

const flip = (ms: number) => `transform ${ms}ms cubic-bezier(0.65, 0, 0.35, 1), z-index 0s linear ${ms / 2}ms`;

function spot(k: number, n: number, g: Geom) {
  const row = Math.floor(k / g.cols);
  const inRow = Math.min(g.cols, n - row * g.cols);
  const left = (g.stageW - (inRow * BOOK.w + (inRow - 1) * GAP)) / 2;
  return { x: left + (k % g.cols) * (BOOK.w + GAP), y: row * ROW_H + BOOK_TOP };
}

type Pt = { x: number; y: number };

const rowsFor = (n: number, g: Geom) => Math.max(1, Math.ceil(n / g.cols));

function stackFoot(n: number, g: Geom): Pt {
  return { x: g.stageW / 2, y: (rowsFor(n, g) - 1) * ROW_H + BOOK_TOP + BOOK.h };
}

const pose = (x: number, y: number, tilt: number, turn: number, scale: number) =>
  `translate(${x}px, ${y}px) perspective(1100px) rotateX(${tilt}deg) rotateZ(${turn}deg) scale(${scale})`;
const STAND = pose(0, 0, 0, 0, 1);

function onStack(at: Pt, foot: Pt, level: number, scale: number): Pt {
  return {
    x: foot.x + STACK_SHIFT[level % STACK_SHIFT.length] * scale - (at.x + BOOK.w / 2),
    y: foot.y - level * STACK_T * scale - (at.y + BOOK.h),
  };
}

type Step = { at: number; pose: string; opacity?: number; lift: number; easing?: string };

function dealSteps(at: Pt, foot: Pt, level: number, scale: number, drop: number, wait: number, from: Pt): Step[] {
  const { x, y } = onStack(at, foot, level, scale);
  const turn = STACK_TURN[level % STACK_TURN.length];
  const lie = pose(x, y, STACK_TILT, turn, scale);
  const off = pose(x + from.x, y + from.y, STACK_TILT, turn, scale);
  return [
    { at: 0, pose: off, opacity: 0, lift: 0 },
    { at: drop, pose: off, opacity: 0, lift: 0, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
    { at: drop + PILE_IN_MS, pose: lie, lift: 0 },
    { at: wait, pose: lie, lift: 0, easing: "cubic-bezier(0.45, 0, 0.3, 1)" },
    { at: wait + FLIGHT_MS * 0.26, pose: pose(x, y - 56, 26, turn / 2, (scale + 1) / 2 + 0.03), lift: 1, easing: "cubic-bezier(0.3, 0.1, 0.25, 1)" },
    { at: wait + FLIGHT_MS * 0.68, pose: pose(x * 0.06, -26, -5, -2.5, 1.02), lift: 0.7, easing: SETTLE },
    { at: wait + FLIGHT_MS, pose: STAND, lift: 0 },
  ];
}

const LYING = pose(0, 6, 84, 0, 0.94);

const lieDownSteps = (start: number): Step[] => [
  { at: 0, pose: STAND, lift: 0 },
  { at: start, pose: STAND, lift: 0, easing: "cubic-bezier(0.5, 0, 0.75, 0.3)" },
  { at: start + LIE_MS, pose: LYING, opacity: 0, lift: 0 },
];

const standUpSteps = (start: number): Step[] => [
  { at: 0, pose: LYING, opacity: 0, lift: 0 },
  { at: start, pose: LYING, opacity: 0, lift: 0, easing: SETTLE },
  { at: start + STAND_MS, pose: STAND, lift: 0 },
];

function moveBook(book: HTMLElement | null, steps: Step[], { delay = 0, keep = false, z }: { delay?: number; keep?: boolean; z: number }) {
  const cover = book?.querySelector<HTMLElement>("[data-cover]");
  if (!cover) return [];
  const total = steps[steps.length - 1].at;
  const timing: KeyframeAnimationOptions = { duration: total, delay, fill: keep ? "both" : "backwards" };
  const offset = (s: Step) => s.at / total;
  cover.style.zIndex = String(z);
  const motion = cover.animate(
    steps.map((s) => ({ offset: offset(s), transform: s.pose, opacity: s.opacity ?? 1, easing: s.easing ?? "linear" })),
    timing,
  );
  if (!keep) motion.addEventListener("finish", () => (cover.style.zIndex = ""));
  const animations = [motion];
  const lift = cover.querySelector<HTMLElement>("[data-lift]");
  const foot = cover.querySelector<HTMLElement>("[data-foot]");
  if (lift) {
    animations.push(
      lift.animate(
        steps.map((s) => ({ offset: offset(s), opacity: s.lift, transform: `translate(${s.lift * 6}px, ${s.lift * 26}px)`, easing: s.easing ?? "linear" })),
        timing,
      ),
    );
  }
  if (foot) animations.push(foot.animate(steps.map((s) => ({ offset: offset(s), opacity: 1 - s.lift, easing: s.easing ?? "linear" })), timing));
  return animations;
}

type Leaf = { kind: "overview" } | { kind: "course"; name: string; index: number } | { kind: "all" };
const leavesOf = (programme: Programme): Leaf[] => [
  { kind: "overview" },
  ...programme.courses.map((name, index) => ({ kind: "course" as const, name, index })),
  { kind: "all" },
];
const pad = (n: number) => String(n).padStart(2, "0");

function Arrow({ back = false, className }: { back?: boolean; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" width={16} height={16} fill="none" className={cx(back && "cu:-scale-x-100", className)}>
      <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CourseShelf({ programmes }: { programmes: Programme[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<Filter>("All");

  const [picked, setPicked] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  const [shuffle, setShuffle] = useState<{ arriving: number[]; leaveMs: number } | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const shuffleTimer = useRef<number | undefined>(undefined);

  const lastSpot = useRef(new Map<number, Pt>());

  const plan = useRef<{ before: number[]; after: number[]; arriveAt: number } | null>(null);

  const stacking = useRef<Animation[]>([]);

  const frameRef = useRef<HTMLDivElement>(null);
  const [cols, setCols] = useState(4);
  const [frameW, setFrameW] = useState(0);
  const g = geomFor(cols, cols === 2 && picked === null);
  const fit = frameW ? Math.min(1, frameW / g.stageW) : 1;
  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const measure = () => {
      const c = shelfCols(window.innerWidth);
      setCols(c);
      setFrameW(frame.clientWidth);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(frame);
    return () => ro.disconnect();
  }, []);

  const shownIn = (f: Filter) => programmes.flatMap((p, i) => (f === "All" || p.category === f ? [i] : []));
  const shown = shownIn(filter);
  const rows = rowsFor(shown.length, g);

  const later = (fn: () => void, ms: number) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(fn, prefersReducedMotion() ? 0 : ms);
  };

  const stopStacking = () => {
    stacking.current.forEach((animation) => animation.cancel());
    stacking.current = [];
    rootRef.current?.querySelectorAll<HTMLElement>("[data-cover]").forEach((cover) => (cover.style.zIndex = ""));
  };

  const pick = (i: number) => {
    if (picked === i) return;
    stopStacking();
    if (picked !== null) {

      setOpen(false);
      later(() => {
        setPicked(i);
        later(() => setOpen(true), MOVE_MS);
      }, OPEN_MS);
      return;
    }
    setPicked(i);
    later(() => setOpen(true), MOVE_MS);
  };

  const close = () => {
    if (picked === null) return;
    setOpen(false);
    later(() => setPicked(null), OPEN_MS);
  };

  const choose = (next: Filter) => {
    if (next === filter) return;
    const before = shownIn(filter);
    const after = shownIn(next);
    window.clearTimeout(timer.current);
    stopStacking();
    setOpen(false);
    setPicked(null);
    setHovered(null);
    window.clearTimeout(shuffleTimer.current);
    if (!prefersReducedMotion() && typeof rootRef.current?.animate === "function") {
      const leaving = before.filter((i) => !after.includes(i));
      const arriving = after.filter((i) => !before.includes(i));
      const leaveMs = leaving.length ? (leaving.length - 1) * TIP_STAGGER_MS + LIE_MS : 0;
      const arriveAt = leaving.length ? ARRIVE_AFTER_MS : 0;
      const arriveMs = arriving.length ? arriveAt + (arriving.length - 1) * TIP_STAGGER_MS + STAND_MS : 0;
      plan.current = { before, after, arriveAt };
      setShuffle({ arriving, leaveMs });
      shuffleTimer.current = window.setTimeout(() => setShuffle(null), Math.max(leaveMs, arriveMs, SLIDE_MS) + 50);
    } else {
      plan.current = null;
      setShuffle(null);
    }
    setFilter(next);
  };

  useEffect(
    () => () => {
      window.clearTimeout(timer.current);
      window.clearTimeout(shuffleTimer.current);
    },
    [],
  );

  useLayoutEffect(() => {
    const root = rootRef.current;
    const p = plan.current;
    plan.current = null;
    if (!root || !p) return;
    const bookEl = (i: number) => root.querySelector<HTMLElement>(`[data-book="${i}"]`);
    const leaving = p.before.filter((i) => !p.after.includes(i));
    const arriving = p.after.filter((i) => !p.before.includes(i));
    const animations: Animation[] = [];

    leaving.forEach((i, k) => animations.push(...moveBook(bookEl(i), lieDownSteps(k * TIP_STAGGER_MS), { keep: true, z: 1 })));
    arriving.forEach((i, k) => animations.push(...moveBook(bookEl(i), standUpSteps(k * TIP_STAGGER_MS), { delay: p.arriveAt, z: 2 })));
    stacking.current = animations;
  }, [filter]);

  useEffect(() => {
    if (picked === null) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion() || typeof root.animate !== "function") return;
    const covers = [...root.querySelectorAll<HTMLElement>("[data-book]")]
      .filter((book) => book.getAttribute("aria-hidden") !== "true")
      .map((book) => book.querySelector<HTMLElement>("[data-cover]"))
      .filter((cover): cover is HTMLElement => !!cover);
    const DEAL_EASE = "cubic-bezier(.34, 1.56, .64, 1)";
    const animations = covers.map((cover, n) =>
      cover.animate(
        [
          { offset: 0, opacity: 0, transform: `translateY(110px) rotate(${n % 2 ? -9 : 9}deg) scale(.9)`, easing: DEAL_EASE },
          { offset: 0.4, opacity: 1, easing: DEAL_EASE },
          { offset: 1, opacity: 1, transform: "none" },
        ],
        { duration: 900, delay: 260 + n * 130, fill: "both" },
      ),
    );
    animations.forEach((animation) => animation.pause());
    stacking.current = animations;
    let seen: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      seen = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting) return;
        animations.forEach((animation) => animation.play());
        seen?.disconnect();
      }, { threshold: 0.25 });
      seen.observe(root);
    } else animations.forEach((animation) => animation.play());
    return () => {
      seen?.disconnect();
      animations.forEach((animation) => animation.cancel());
    };
  }, [cols]);

  const away = picked !== null;
  const place = (i: number): CSSProperties => {
    if (i === picked) {
      return {
        left: g.spine.x,
        top: g.spine.y - PAGE.h / 2,
        width: PAGE.w,
        height: PAGE.h,
        zIndex: 20,
        transition: `left ${MOVE_MS}ms ${EASE}, top ${MOVE_MS}ms ${EASE}, width ${MOVE_MS}ms ${EASE}, height ${MOVE_MS}ms ${EASE}, transform 320ms ${EASE}`,
      };
    }
    const k = shown.indexOf(i);
    const size = { width: BOOK.w, height: BOOK.h };
    if (k < 0) {
      const { x, y } = lastSpot.current.get(i) ?? spot(i, programmes.length, g);
      if (shuffle) {

        return { ...size, left: x, top: y, opacity: 0, pointerEvents: "none", transition: `opacity 0s linear ${shuffle.leaveMs}ms` };
      }

      return {
        ...size,
        left: x,
        top: y,
        transform: "translateY(18px) scale(0.92)",
        filter: "blur(3px)",
        opacity: 0,
        pointerEvents: "none",
        transition: `opacity ${LEAVE_MS}ms ${EASE}, transform ${LEAVE_MS + 40}ms ${EASE}, filter ${LEAVE_MS}ms ${EASE}`,
      };
    }
    const { x, y } = spot(k, shown.length, g);
    lastSpot.current.set(i, { x, y });
    return {
      ...size,
      left: x,
      top: y,

      transform: away ? "none" : hovered === i ? HOVER_TILT : REST_TILT,
      transformOrigin: "50% 100%",
      filter: away ? "blur(14px)" : hovered === i ? HOVER_SHADOW : REST_SHADOW,
      opacity: away ? 0.25 : 1,
      transition: shuffle?.arriving.includes(i)
        ?
          "none"
        : shuffle
            ? `left ${SLIDE_MS}ms ${EASE}, top ${SLIDE_MS}ms ${EASE}, width ${MOVE_MS}ms ${EASE}, height ${MOVE_MS}ms ${EASE}, transform 320ms ${EASE}, filter 700ms ${EASE}, opacity 700ms ${EASE}`
            : hovered === i && !away
              ?
                `left ${MOVE_MS}ms ${EASE}, top ${MOVE_MS}ms ${EASE}, width ${MOVE_MS}ms ${EASE}, height ${MOVE_MS}ms ${EASE}, transform 650ms ${SPRING}, filter 450ms ${EASE}, opacity 700ms ${EASE}`
              : `left ${MOVE_MS}ms ${EASE}, top ${MOVE_MS}ms ${EASE}, width ${MOVE_MS}ms ${EASE}, height ${MOVE_MS}ms ${EASE}, transform 900ms ${FALL}, filter 600ms ${EASE}, opacity 700ms ${EASE}`,
    };
  };

  return (
    <div ref={frameRef} className="cu:flex cu:w-full cu:flex-col cu:items-center">
      <ShelfFilter
        filter={filter}
        onChoose={choose}
      />
      <p aria-live="polite" className="cu:sr-only">
        {filter === "All" ? `Showing all ${shown.length} programmes` : `Showing ${shown.length} ${filter} programmes`}
      </p>

      <div
        ref={rootRef}
        id="programme-shelf"
        className="prog__stage cu:relative cu:mt-6 cu:max-[640px]:hidden cu:[transition:height_600ms_var(--ease-out),zoom_650ms_var(--ease-out)]"
        style={{ width: g.stageW, height: away ? Math.max(rows * ROW_H, OPEN_H) : rows * ROW_H, zoom: fit }}
        onClick={(event) => event.target === event.currentTarget && close()}
      >

        {Array.from({ length: rowsFor(programmes.length, g) }, (_, row) => row).map((row) => (
          <span
            key={row}
            aria-hidden="true"
            className="cu:absolute cu:h-[34px] cu:pointer-events-none cu:[transition:opacity_500ms_var(--ease-out),translate_500ms_var(--ease-out),filter_700ms_var(--ease-out)] cu:motion-reduce:transition-none cu:before:absolute cu:before:top-[34px] cu:before:left-[9%] cu:before:h-[26px] cu:before:w-4 cu:before:content-[''] cu:before:[background:linear-gradient(90deg,#5a341b,#7a4a28_50%,#5a341b)] cu:before:[clip-path:polygon(0_0,100%_0,50%_100%,0_100%)] cu:before:shadow-[0_8px_10px_-6px_rgb(60_28_8/.4)] cu:after:absolute cu:after:top-[34px] cu:after:right-[9%] cu:after:h-[26px] cu:after:w-4 cu:after:-scale-x-100 cu:after:content-[''] cu:after:[background:linear-gradient(90deg,#5a341b,#7a4a28_50%,#5a341b)] cu:after:[clip-path:polygon(0_0,100%_0,50%_100%,0_100%)] cu:after:shadow-[0_8px_10px_-6px_rgb(60_28_8/.4)]"
            style={{
              "--grain": PLANK_GRAIN,
              left: (g.stageW - g.plankW) / 2,
              width: g.plankW,
              top: row * ROW_H + PLANK_TOP,
              opacity: row < rows ? (away ? 0.3 : 1) : 0,
              translate: row < rows ? "0 0" : "0 -12px",
              filter: away ? "blur(6px)" : "none",
            } as CSSProperties}
          >
            <span className="cu:absolute cu:inset-x-[6px] cu:top-0 cu:h-3 cu:[background-image:var(--grain),linear-gradient(180deg,#6e4222_0%,#a8733f_30%,#c99560_100%)] cu:[background-size:640px_80px,auto] cu:[clip-path:polygon(6px_0,calc(100%-6px)_0,100%_100%,0_100%)]" />
            <span className="cu:absolute cu:inset-x-0 cu:top-3 cu:bottom-0 cu:rounded-b-[3px] cu:[background-image:var(--grain),linear-gradient(180deg,#a56d3d_0%,#8b5530_50%,#6c3f21_100%)] cu:[background-size:640px_80px,auto] cu:shadow-[inset_0_1px_0_rgb(255_226_184/.55),inset_0_-2px_0_rgb(43_18_6/.25),0_26px_30px_-18px_rgb(60_28_8/.5),0_6px_10px_-6px_rgb(60_28_8/.45)]" />
          </span>
        ))}

        {programmes.map((programme, i) => (
          <Book
            key={programme.name}
            index={i}
            programme={programme}
            hidden={!shown.includes(i)}
            out={picked === i}
            open={picked === i && open}
            away={away && picked !== i}
            style={place(i)}
            onPick={() => pick(i)}
            onClose={close}
            onHover={(on) => setHovered((current) => (on ? i : current === i ? null : current))}
          />
        ))}
      </div>

      <ProgrammeRail programmes={shown.map((i) => programmes[i])} filter={filter} />
    </div>
  );
}

function ProgrammeRail({ programmes, filter }: { programmes: Programme[]; filter: Filter }) {
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => { railRef.current?.scrollTo({ left: 0 }); }, [filter]);
  return (
    <div ref={railRef} className="prog__rail cu:hidden cu:max-[640px]:mt-3 cu:max-[640px]:ml-[calc(var(--px)*-1)] cu:max-[640px]:grid cu:max-[640px]:w-[calc(100%+2*var(--px))] cu:max-[640px]:min-w-0 cu:max-[640px]:grid-flow-col cu:max-[640px]:grid-rows-[auto_auto] cu:max-[640px]:auto-cols-[clamp(130px,calc((100vw-var(--px)-16px)/2.2),170px)] cu:max-[640px]:gap-x-4 cu:max-[640px]:gap-y-[18px] cu:max-[640px]:self-start cu:max-[640px]:snap-x cu:max-[640px]:snap-mandatory cu:max-[640px]:overflow-x-auto cu:max-[640px]:overscroll-x-contain cu:max-[640px]:scroll-px-[var(--px)] cu:max-[640px]:px-[var(--px)] cu:max-[640px]:pt-[18px] cu:max-[640px]:pb-[34px] cu:max-[640px]:[scrollbar-width:none] cu:max-[640px]:[&::-webkit-scrollbar]:hidden cu:max-[640px]:outline-none cu:max-[640px]:focus-visible:rounded-xl cu:max-[640px]:focus-visible:outline-2 cu:max-[640px]:focus-visible:outline-offset-2 cu:max-[640px]:focus-visible:outline-[var(--brand)]" role="region" aria-roledescription="carousel" aria-label="Programmes" tabIndex={0}>
      {programmes.map((programme) => (
        <article key={programme.name} className="prog__card cu:flex cu:snap-start cu:flex-col cu:gap-4">

          <a className="prog__card-cover cu:relative cu:block cu:aspect-[195/230] cu:w-full cu:shadow-[0_8px_10px_rgba(43,18,6,.28)] cu:[transition:scale_.35s_var(--ease-out)] cu:active:scale-[.98] cu:focus-visible:outline-2 cu:focus-visible:outline-offset-4 cu:focus-visible:outline-[var(--brand)]" href={coursePageHref(programme)} onClick={stayPut} aria-label={`View course: ${programme.name}`}>
            <CoverFront programme={programme} large={false} />
          </a>
        </article>
      ))}
    </div>
  );
}

function ShelfFilter({ filter, onChoose }: { filter: Filter; onChoose: (f: Filter) => void }) {
  return (
    <ControlledTabs
      className="prog__filter cu:max-[640px]:-mr-[var(--px)]! cu:max-[640px]:w-[calc(100%+var(--px))]! cu:max-[640px]:max-w-none! cu:max-[640px]:self-start! cu:max-[640px]:rounded-[14px_0_0_14px]! cu:max-[640px]:pr-5!"
      label="Filter the programmes by category"
      controls="programme-shelf"
      value={filter}
      onChange={(id: string) => onChoose(id as Filter)}
      items={FILTERS.map((f) => ({ id: f, label: f }))}
    />
  );
}

type BookProps = {

  index: number;
  programme: Programme;

  hidden: boolean;

  out: boolean;

  open: boolean;

  away: boolean;
  style: CSSProperties;
  onPick: () => void;
  onClose: () => void;
  onHover: (on: boolean) => void;
};

function glintOffset(name: string) {
  let hash = 0;
  for (const char of name) hash = (hash * 31 + char.charCodeAt(0)) % 997;
  return (hash % 11) + (hash % 7) / 7;
}

function Book({ index, programme, hidden, out, open, away, style, onPick, onClose, onHover }: BookProps) {

  const [turned, setTurned] = useState(0);
  const leaves = leavesOf(programme);
  const last = leaves.length - 1;
  const turn = (by: number) => setTurned((t) => Math.min(last, Math.max(0, t + by)));
  const { deep } = programme.cover;

  const tilt = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (out || event.pointerType !== "mouse" || prefersReducedMotion()) return;
    const el = event.currentTarget, r = el.getBoundingClientRect();
    const px = (event.clientX - r.left) / r.width, py = (event.clientY - r.top) / r.height;
    el.style.setProperty("--tx", (px - 0.5).toFixed(3));
    el.style.setProperty("--ty", (py - 0.5).toFixed(3));
    el.style.setProperty("--gx", `${(px * 100).toFixed(0)}%`);
    el.style.setProperty("--gy", `${(py * 100).toFixed(0)}%`);
  };
  const untilt = (el: HTMLElement) => { el.style.setProperty("--tx", "0"); el.style.setProperty("--ty", "0"); };

  useEffect(() => {
    if (!open) {
      setTurned(0);
      return;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") setTurned((t) => Math.min(last, t + 1));
      if (event.key === "ArrowLeft") setTurned((t) => Math.max(0, t - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, last]);

  return (
    <div
      data-book={index}
      inert={away || hidden}
      aria-hidden={hidden || undefined}
      className="cu:group/book cu:absolute"
      style={style}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={(event) => { onHover(false); untilt(event.currentTarget); }}
      onPointerMove={tilt}
    >
      <div data-cover className="cu:absolute cu:inset-0 cu:origin-bottom cu:[perspective:2200px]">

        <span data-lift aria-hidden="true" className="cu:pointer-events-none cu:absolute cu:inset-[8px] cu:opacity-0 cu:shadow-[0_22px_34px_-6px_rgb(43_18_6/0.5)]" />

        <span
          aria-hidden="true"
          className={cx("cu:pointer-events-none cu:absolute cu:inset-0 cu:[transition:opacity_400ms_var(--ease-out)]", out ? "cu:opacity-0" : "cu:opacity-100")}
        >
          <span data-foot className="cu:absolute cu:right-3 cu:bottom-[-1px] cu:left-3 cu:h-3 cu:rounded-[50%] cu:bg-[rgb(43_18_6/0.45)] cu:blur-[5px]" />
        </span>

        {out && (
          <p
            aria-hidden={!open}
            aria-live="polite"
            className={cx(
              "cu:pointer-events-none cu:absolute cu:bottom-full cu:left-0 cu:mb-5 cu:flex cu:w-max cu:-translate-x-1/2 cu:items-center cu:gap-2.5 cu:rounded-full cu:bg-mahogany/85 cu:py-2 cu:pr-4 cu:pl-2 cu:text-[14px] cu:font-semibold cu:text-cream cu:backdrop-blur-md cu:[transition:opacity_500ms_var(--ease-out)]",
              open ? "cu:opacity-100 cu:delay-300" : "cu:opacity-0",
            )}
          >
            <span className="cu:flex cu:size-7 cu:items-center cu:justify-center cu:rounded-full cu:bg-saffron cu:text-mahogany">
              <svg aria-hidden="true" viewBox="0 0 16 16" width={15} height={15} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round">
                <path d="M8 4.2C6.6 3.2 4.6 2.8 2 2.9v9.3c2.6-.1 4.6.3 6 1.3 1.4-1 3.4-1.4 6-1.3V2.9c-2.6-.1-4.6.3-6 1.3ZM8 4.2v9.3" />
              </svg>
            </span>
            Page {turned + 1} of {leaves.length}
          </p>
        )}

        {out && (

          <span
            className={cx(
              "cu:absolute cu:-top-5 cu:-right-5 cu:z-[130] cu:flex cu:[transition:opacity_400ms_var(--ease-out),scale_400ms_var(--ease-out)]",
              open ? "cu:scale-100 cu:opacity-100 cu:delay-300" : "cu:pointer-events-none cu:scale-75 cu:opacity-0",
            )}
          >
            <Button
              variant="outline"
              size="sm"
              iconOnly
              iconStart="close"
              label={`Close ${programme.name}`}
              onClick={onClose}
              tabIndex={open ? 0 : -1}
              aria-hidden={!open || undefined}
            />
          </span>
        )}

        {out && <div aria-hidden="true" className={cx("cu:absolute cu:inset-0 cu:shadow-[0_24px_40px_-20px_rgb(43_18_6/0.55)]", PAPER)} />}

        {out &&
          leaves.map((leaf, i) => {
            const isTurned = i < turned;
            const current = open && i === turned;
            return (
              <div
                key={i}
                className="cu:absolute cu:inset-0 cu:origin-left cu:[transform-style:preserve-3d]"
                style={{ transform: isTurned ? "rotateY(-180deg)" : "none", zIndex: isTurned ? 60 + i : 50 - i, transition: flip(TURN_MS) }}
              >

                <div
                  aria-hidden={!current}
                  inert={!current}
                  onClick={(event) => {
                    if ((event.target as HTMLElement).closest("a,button")) return;
                    if (i < last) turn(1);
                  }}
                  className={cx("peel cu:group/peel cu:absolute cu:inset-0 cu:[--peel:0] cu:[--peel-size:120px] cu:[--peel-cut:calc(100%-var(--peel)*var(--peel-size))] cu:[backface-visibility:hidden]", current && i < last && "peel--on cu:[--peel:.26] cu:motion-safe:hover:[--peel:.42] cu:motion-safe:hover:has-[.peel__hit:hover]:[--peel:.7]", i < last && "cu:cursor-pointer")}
                >
                  <div className={cx("peel__paper cu:absolute cu:inset-0 cu:[clip-path:polygon(0_0,100%_0,100%_var(--peel-cut),var(--peel-cut)_100%,0_100%)] cu:motion-safe:[transition:clip-path_520ms_cubic-bezier(.34,1.4,.64,1)] cu:motion-safe:group-[.is-peeling]/peel:transition-none cu:flex cu:flex-col cu:overflow-clip cu:p-9 cu:pl-11 cu:text-ink", PAPER, SPINE_SHADE_RIGHT_PAGE)}>
                    <Page leaf={leaf} programme={programme} onRestart={() => setTurned(0)} />
                  </div>
                  {i < last && <PeelCorner onTurn={() => turn(1)} />}
                </div>

                <div
                  aria-hidden="true"
                  onClick={() => turn(-1)}
                  className={cx(
                    "cu:absolute cu:inset-0 cu:flex cu:cursor-pointer cu:flex-col cu:items-center cu:justify-center cu:gap-3 cu:text-ink/45 cu:[backface-visibility:hidden] cu:[transform:rotateY(180deg)]",
                    PAPER,
                    SPINE_SHADE_LEFT_PAGE,
                  )}
                >
                  <img src="/assets/img/programmes/butta.svg" alt="" width={20} height={20} className="cu:size-5 cu:opacity-60" />
                  <span className="cu:px-10 cu:text-center cu:font-heading cu:text-[18px]/[1.3]">{programme.name}</span>
                  <span className="cu:absolute cu:bottom-6 cu:text-[12px] cu:tracking-[0.06em]">{i * 2 + 2}</span>
                </div>
              </div>
            );
          })}

        <button
          type="button"
          aria-label={out ? `Close ${programme.name}` : `View course: ${programme.name}`}
          onClick={() => (out ? onClose() : window.location.assign(coursePageHref(programme)))}
          className="cu:absolute cu:inset-0 cu:origin-left cu:cursor-pointer cu:[transform-style:preserve-3d] cu:focus-visible:outline-offset-4"
          style={{ transform: open ? "rotateY(-180deg)" : "none", zIndex: open ? 55 : 100, transition: flip(OPEN_MS) }}
        >
          <span className="cu:absolute cu:inset-0 cu:[backface-visibility:hidden]">
            <CoverFront programme={programme} large={out} />
          </span>
          <span
            aria-hidden="true"
            className="cu:absolute cu:inset-0 cu:flex cu:flex-col cu:justify-between cu:p-8 cu:text-left cu:[backface-visibility:hidden] cu:[transform:rotateY(180deg)]"
            style={{ backgroundColor: deep, color: FOIL }}
          >
            <span className="cu:text-[12px]/[14px] cu:tracking-[0.04em] cu:opacity-85">Vajiram &amp; Ravi</span>

            <span className="cu:flex cu:items-end cu:justify-between">
              <span className="cu:font-heading cu:text-[22px]/[1.15] cu:opacity-90">Since 1976</span>
              <img src="/assets/img/programmes/logo-mark-160.webp" alt="" width={160} height={167} loading="lazy" decoding="async" className="cu:h-[76px] cu:w-[73px] cu:drop-shadow-[0_4px_10px_rgb(0_0_0/0.35)]" />
            </span>
          </span>
        </button>

        {!out && (
          <span
            className="cu:pointer-events-none cu:absolute cu:inset-x-0 cu:z-[101] cu:flex cu:justify-center cu:scale-75 cu:opacity-0 cu:[transition:opacity_250ms_var(--ease-out),scale_350ms_cubic-bezier(.22,1,.36,1)] cu:group-hover/book:scale-100 cu:group-hover/book:opacity-100 cu:group-hover/book:[&>*]:pointer-events-auto cu:has-[:focus-visible]:scale-100 cu:has-[:focus-visible]:opacity-100 cu:has-[:focus-visible]:[&>*]:pointer-events-auto cu:motion-reduce:transition-none"
            style={{ bottom: FOLLOW_BOTTOM }}
          >
            <Button variant="white" size="xs" iconEnd="arrow" href={coursePageHref(programme)} onClick={stayPut} ariaLabel={`View course: ${programme.name}`}>
              View course
            </Button>
          </span>
        )}

        {out && (
          <div
            aria-hidden={!open}
            inert={!open}
            className={cx(
              "cu:absolute cu:top-full cu:left-0 cu:mt-5 cu:flex cu:w-[800px] cu:-translate-x-1/2 cu:items-center cu:justify-between cu:[transition:opacity_500ms_var(--ease-out)]",
              open ? "cu:opacity-100 cu:delay-300" : "cu:pointer-events-none cu:opacity-0",
            )}
          >
            <button
              type="button"
              onClick={() => turn(-1)}
              disabled={turned === 0}
              className="cu:flex cu:h-10 cu:cursor-pointer cu:items-center cu:gap-2 cu:rounded-full cu:border cu:border-ink/20 cu:bg-white cu:px-4 cu:text-[14px] cu:font-semibold cu:text-ink cu:[transition:border-color_var(--dur-fast)_var(--ease-out),opacity_var(--dur-fast)_var(--ease-out)] cu:hover:border-burnt cu:disabled:cursor-default cu:disabled:opacity-35"
            >
              <Arrow back />
              Previous page
            </button>
            <button
              type="button"
              onClick={() => turn(1)}
              disabled={turned === last}
              className="cu:flex cu:h-10 cu:cursor-pointer cu:items-center cu:gap-2 cu:rounded-full cu:bg-ink cu:px-4 cu:text-[14px] cu:font-semibold cu:text-cream cu:[transition:background-color_var(--dur-fast)_var(--ease-out),opacity_var(--dur-fast)_var(--ease-out)] cu:hover:bg-[#271811] cu:disabled:cursor-default cu:disabled:opacity-35"
            >
              Next page
              <Arrow />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function CoverFront({ programme, large }: { programme: Programme; large: boolean }) {
  const { light, base, deep, emblem, art } = programme.cover;
  const frame = large ? { top: 20, right: 20, bottom: 20, left: 20 } : { top: 10, right: 10, bottom: 10, left: 10 };
  return (
    <span
      className="cu:relative cu:block cu:size-full cu:overflow-clip cu:text-center cu:[transition:filter_700ms_var(--ease-out)] cu:group-hover/book:brightness-[1.12] cu:group-hover/book:saturate-[1.3]"
      style={{ backgroundColor: base, backgroundImage: `linear-gradient(140deg, ${light} 0%, ${base} 48%, ${deep} 100%)` }}
    >

      <span aria-hidden="true" className="cu:absolute cu:inset-0 cu:opacity-[0.16] cu:[transition:opacity_700ms_var(--ease-out)] cu:group-hover/book:opacity-[0.3]">
        <GeoArt kind={art} accent={FOIL} soft="#fff3dc" />
      </span>
      <span aria-hidden="true" className="cu:pointer-events-none cu:absolute cu:inset-0 cu:[background-image:repeating-linear-gradient(45deg,rgb(255_255_255/.03)_0_2px,transparent_2px_5px),repeating-linear-gradient(-45deg,rgb(0_0_0/.035)_0_2px,transparent_2px_5px)]" />
      <span aria-hidden="true" className="cover-grain cu:pointer-events-none cu:absolute cu:inset-0 cu:opacity-[0.12]!" />


      <span aria-hidden="true" className="cu:pointer-events-none cu:absolute cu:inset-0 cu:bg-[linear-gradient(115deg,rgb(255_255_255/0.14),transparent_42%,rgb(0_0_0/0.16))]" />


      <span
        aria-hidden="true"
        className="cu:absolute cu:rounded-[2px] cu:border cu:opacity-60 cu:[transition:opacity_500ms_var(--ease-out)] cu:group-hover/book:opacity-95"
        style={{ ...frame, borderColor: FOIL }}
      >
        <span className="cu:absolute cu:inset-[3px] cu:rounded-[1px] cu:border cu:opacity-50" style={{ borderColor: FOIL }} />
      </span>

      <span className={cx("cu:absolute cu:flex cu:flex-col cu:items-center", large ? "cu:px-6 cu:pt-7 cu:pb-6" : "cu:px-2.5 cu:pt-3.5 cu:pb-3")} style={frame}>

        <span
          className={cx(
            "cu:flex cu:shrink-0 cu:items-center cu:justify-center cu:font-medium cu:text-balance cu:text-[#ffe3b0] cu:[font-family:Newsreader,Georgia,serif]",
            large ? "cu:mt-2 cu:h-[3.24em] cu:text-[36px]/[1.08]" : "cu:mt-1 cu:h-[3.3em] cu:text-[20px]/[1.1] cu:max-[640px]:text-[18px]",
          )}
        >
          {titleCase(programme.name)}
        </span>

        <span aria-hidden="true" className={cx("cu:flex cu:items-center cu:gap-1.5", large ? "cu:mt-4" : "cu:mt-2")} style={{ color: FOIL }}>
          <span className={cx("cu:h-px cu:bg-current cu:opacity-70", large ? "cu:w-10" : "cu:w-5")} />
          <span className={cx("cu:rotate-45 cu:bg-current", large ? "cu:size-1.5" : "cu:size-1")} />
          <span className={cx("cu:h-px cu:bg-current cu:opacity-70", large ? "cu:w-10" : "cu:w-5")} />
        </span>

        <span aria-hidden="true" className="cu:flex cu:min-h-0 cu:flex-1 cu:items-center cu:justify-center cu:max-[640px]:[&>svg]:size-[48px]">
          <CoverArt emblem={emblem} size={large ? 128 : 66} />
        </span>

        <span
          className={cx("cu:block cu:font-semibold cu:tracking-[0.18em] cu:whitespace-nowrap cu:uppercase", large ? "cu:text-[12px]/[16px]" : "cu:mt-2.5 cu:text-[10px]/[13px]")}
          style={{ color: FOIL }}
        >
          {programme.category}
        </span>
      </span>

      <span
        aria-hidden="true"
        className="lp-glint cu:pointer-events-none cu:absolute cu:inset-y-0 cu:-left-[60%] cu:z-10 cu:w-[45%] cu:bg-[linear-gradient(90deg,transparent,rgb(255_226_160/0.3)_50%,transparent)] cu:mix-blend-screen"
        style={{ animationDelay: `${-glintOffset(programme.name)}s` }}
      />

      <span
        aria-hidden="true"
        className="cu:pointer-events-none cu:absolute cu:inset-0 cu:z-10 cu:opacity-0 cu:mix-blend-soft-light cu:[transition:opacity_300ms] cu:group-hover/book:opacity-100 cu:motion-reduce:hidden"
        style={{ background: "radial-gradient(circle at var(--gx, 50%) var(--gy, 30%), rgb(255 255 255 / 0.6), rgb(255 255 255 / 0.14) 34%, transparent 62%)" }}
      />

      <span
        aria-hidden="true"
        className="cu:pointer-events-none cu:absolute cu:inset-y-0 cu:-left-full cu:z-10 cu:w-[70%] cu:-skew-x-12 cu:bg-[linear-gradient(90deg,transparent,rgb(255_235_200/0.28),transparent)] cu:opacity-0 cu:group-hover/book:translate-x-[300%] cu:group-hover/book:opacity-100 cu:group-hover/book:[transition:translate_900ms_var(--ease-out),opacity_200ms] cu:motion-reduce:hidden"
      />
    </span>
  );
}

const PEEL_GRAB = 0.7;
const PEEL_MOST = 2.2;
const PEEL_TURN = 1.25;

function PeelCorner({ onTurn }: { onTurn: () => void }) {
  const drag = useRef<{ x: number; y: number; moved: boolean; peel: number } | null>(null);
  const pageOf = (el: Element) => el.closest<HTMLElement>(".peel");

  const end = (target: Element, done: boolean) => {
    const d = drag.current;
    drag.current = null;
    const page = pageOf(target);
    page?.classList.remove("is-peeling");
    page?.style.removeProperty("--peel");
    if (d && done && (!d.moved || d.peel >= PEEL_TURN || prefersReducedMotion())) onTurn();
  };

  return (
    <>
      <span aria-hidden="true" className="peel__shade cu:pointer-events-none cu:absolute cu:right-0 cu:bottom-0 cu:size-[var(--peel-size)] cu:origin-bottom-right cu:[transform:scale(var(--peel))] cu:[background:linear-gradient(135deg,transparent_50%,rgb(60_25_6/.32)_53%,rgb(60_25_6/.1)_63%,transparent_78%)] cu:motion-safe:[transition:transform_520ms_cubic-bezier(.34,1.4,.64,1)] cu:motion-safe:group-[.is-peeling]/peel:transition-none" />
      <span aria-hidden="true" className="cu:pointer-events-none cu:absolute cu:right-0 cu:bottom-0 cu:size-[var(--peel-size)] cu:[filter:drop-shadow(-2px_-2px_3px_rgb(77_31_8/.22))_drop-shadow(-7px_-6px_10px_rgb(77_31_8/.14))]">
        <span className="cu:pointer-events-none cu:absolute cu:inset-0 cu:origin-bottom-right cu:[transform:scale(var(--peel))] cu:[clip-path:path('M120_0_L7_0_Q0_0_0_7_L0_120_Q67_67_120_0_Z')] cu:[background:linear-gradient(135deg,#e8d5b5_0%,#f5e8d1_20%,#fffaf1_37%,#f4e6cc_45%,#dcc29a_51%,#c9ad82_55%)] cu:motion-safe:[transition:transform_520ms_cubic-bezier(.34,1.4,.64,1)] cu:motion-safe:group-[.is-peeling]/peel:transition-none" />
      </span>
      <span
        aria-hidden="true"
        className="peel__hit cu:absolute cu:right-0 cu:bottom-0 cu:size-[var(--peel-size)] cu:cursor-grab cu:touch-none cu:[clip-path:polygon(100%_0,100%_100%,0_100%)] cu:group-[:not(.peel--on)]/peel:hidden cu:group-[.is-peeling]/peel:cursor-grabbing"
        onClick={(event) => event.stopPropagation()}
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          event.currentTarget.setPointerCapture(event.pointerId);
          drag.current = { x: event.clientX, y: event.clientY, moved: false, peel: PEEL_GRAB };
        }}
        onPointerMove={(event) => {
          const d = drag.current;
          if (!d) return;
          const dx = event.clientX - d.x;
          const dy = event.clientY - d.y;
          if (Math.abs(dx) + Math.abs(dy) > 4) d.moved = true;
          if (!d.moved || prefersReducedMotion()) return;

          const zoom = (event.currentTarget as HTMLElement & { currentCSSZoom?: number }).currentCSSZoom ?? (parseFloat(getComputedStyle(document.documentElement).zoom) || 1);
          const size = parseFloat(getComputedStyle(event.currentTarget).getPropertyValue("--peel-size")) || 120;
          d.peel = Math.min(PEEL_MOST, Math.max(0.1, PEEL_GRAB - (dx + dy) / 2 / zoom / size));
          const page = pageOf(event.currentTarget);
          page?.classList.add("is-peeling");
          page?.style.setProperty("--peel", d.peel.toFixed(3));
        }}
        onPointerUp={(event) => end(event.currentTarget, true)}
        onPointerCancel={(event) => end(event.currentTarget, false)}
      />
    </>
  );
}

function Page({ leaf, programme, onRestart }: { leaf: Leaf; programme: Programme; onRestart: () => void }) {

  const href = coursePageHref(programme);
  if (leaf.kind === "overview") {
    return (
      <>
        <p className="cu:text-[12px]/[16px] cu:tracking-[0.01em] cu:text-burnt">
          {programme.category} · {programme.count} courses
        </p>
        <h3 className="cu:mt-3 cu:font-heading cu:text-[32px]/[1.08] cu:font-normal cu:tracking-[-0.015em] cu:text-ink">{programme.name}</h3>
        <p className="cu:mt-3 cu:text-[15px]/[1.55] cu:text-clay">{programme.line}</p>
      </>
    );
  }
  if (leaf.kind === "course") {
    return (
      <>
        <p className="cu:text-[12px]/[16px] cu:tracking-[0.01em] cu:text-burnt">
          Course {pad(leaf.index + 1)} of {pad(programme.count)}
        </p>
        <h3 className="cu:mt-3 cu:font-heading cu:text-[34px]/[1.08] cu:font-normal cu:tracking-[-0.015em] cu:text-ink">{leaf.name}</h3>
        <p className="cu:mt-1 cu:text-[14px]/[20px] cu:text-clay">{programme.name}</p>
        {href !== null && (
          <div className="cu:mt-auto">
            <IndianLink tone="light" href={href} ariaLabel={`View this course: ${leaf.name}`}>
              View this course
            </IndianLink>
          </div>
        )}
      </>
    );
  }
  return (
    <>
      <p className="cu:text-[12px]/[16px] cu:tracking-[0.01em] cu:text-burnt">The full list</p>
      <h3 className="cu:mt-3 cu:font-heading cu:text-[32px]/[1.08] cu:font-normal cu:tracking-[-0.015em] cu:text-ink">All {programme.count} courses</h3>
      <p className="cu:mt-3 cu:text-[15px]/[1.55] cu:text-clay">See every course in the {programme.name}, with its dates, learning modes and fees.</p>
      <div className="cu:mt-auto cu:flex cu:flex-col cu:items-start cu:gap-3">
        <Button href={href ?? undefined} ariaLabel={`View all ${programme.count} courses: ${programme.name}`} iconEnd="arrow">
          View all {programme.count} courses
        </Button>
        <button
          type="button"
          onClick={onRestart}
          className="cu:flex cu:cursor-pointer cu:items-center cu:gap-1.5 cu:text-[14px] cu:font-semibold cu:text-clay cu:[transition:color_var(--dur-fast)_var(--ease-out)] cu:hover:text-ink"
        >
          <Arrow back />
          Back to the first page
        </button>
      </div>
    </>
  );
}

function Programmes() {
  return (

    <SectionWrapper id="courses" labelledBy="programmes-h" compact className="prog cu:overflow-clip cu:bg-cream">

      <TextMotion rootId="courses" />

      <div className="prog__canvas cu:relative cu:mx-auto cu:flex cu:w-full cu:flex-col cu:items-start">

        <div className="cu:relative cu:w-full">

          <div className="cu:flex cu:justify-center"><SectionLabel>Programmes</SectionLabel></div>
          <h2 id="programmes-h" className="prog__shelf-h h2 h2--sec rv" style={{ "--d": ".08s" } as CSSProperties}>

            Programmes for every stage of UPSC.
          </h2>

          <div className="cu:mt-[var(--hd-gap)]">
            <CourseShelf programmes={programmes} />
          </div>

          <div data-fade className="prog__more cu:mt-6 cu:max-[640px]:mt-0 cu:flex cu:justify-center">
            <Button variant="outline" href="/courses" iconEnd="arrow">See all programmes</Button>
          </div>
        </div>

        <div className="cu:relative cu:w-full cu:pt-8">

          <aside
            data-fade
            aria-labelledby="programmes-help-h"
            className="prog__help cu:relative cu:mx-auto cu:flex cu:w-full cu:max-w-[1040px] cu:items-center cu:gap-7 cu:rounded-[8px] cu:border cu:border-[#eadbc4] cu:bg-white/85 cu:py-7 cu:pr-8 cu:pl-7 cu:shadow-[0_8px_20px_-14px_rgba(77,31,8,.18)] cu:backdrop-blur-sm cu:before:pointer-events-none cu:before:absolute cu:before:inset-[6px] cu:before:rounded-[4px] cu:before:border cu:before:border-[rgb(225_120_60/.55)] cu:before:content-[''] cu:max-[900px]:flex-wrap cu:max-[900px]:gap-x-5 cu:max-[900px]:gap-y-[18px] cu:max-[900px]:p-6 cu:max-[640px]:flex-col cu:max-[640px]:items-start cu:max-[640px]:[&>:last-child]:w-full cu:max-[640px]:[&>:last-child]:justify-center"
          >
            <span aria-hidden="true" className="cu:flex cu:size-16 cu:shrink-0 cu:items-center cu:justify-center cu:rounded-full cu:bg-burnt cu:text-white">
              <svg viewBox="0 0 24 24" width={30} height={30} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
                <rect x={3} y={13} width={4} height={6} rx={1.5} />
                <rect x={17} y={13} width={4} height={6} rx={1.5} />
                <path d="M19 19v.5a2.5 2.5 0 0 1-2.5 2.5H13" />
              </svg>
            </span>
            <div className="cu:flex cu:min-w-0 cu:flex-1 cu:flex-col cu:gap-1">
              <h3 id="programmes-help-h" className="cu:text-[26px]/[1.2] cu:font-medium cu:tracking-[-.01em] cu:text-ink cu:[font-family:Newsreader,Georgia,serif]">
                {programmesClosing.question}
              </h3>
              <p className="cu:font-[var(--f)] cu:text-[16.5px]/[1.55] cu:tracking-[-.01em] cu:text-[var(--body)]">
                {programmesClosing.text}{" "}
                <a href={contact.phoneHref} className="cu:font-semibold cu:whitespace-nowrap cu:text-burnt cu:underline cu:decoration-burnt/30 cu:underline-offset-4 cu:[transition:text-decoration-color_var(--dur-fast)_var(--ease-out)] cu:hover:decoration-burnt">
                  {contact.phone}
                </a>
                <span className="cu:whitespace-nowrap"> · {contact.hours}</span>
              </p>
            </div>

            <Button className="cu:shrink-0" href={programmesClosing.cta.href} iconEnd="arrow">
              {programmesClosing.cta.label}
            </Button>
          </aside>
        </div>
      </div>
    </SectionWrapper>
  );
}

export { CoverArt };
export default Programmes;
