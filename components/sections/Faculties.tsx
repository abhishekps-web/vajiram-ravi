"use client";

import "./educators.css";
import { Fragment, useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent, type ReactNode, type RefObject } from "react";
import Button from "@/components/ui/Button/Button";
import SiteDots from "@/components/ui/CarouselDots";
import SectionLabel from "@/components/ui/SectionLabel";

export type Href = string | null;

export const facultyIntro = {
  heading: { lead: "Learn from examination", emphasis: "specialists." },
  lead: "Experienced educators and subject specialists, teaching every paper with the examination in mind.",
  cta: { label: "Meet our faculty", href: null as Href },
};

export type Educator = {
  name: string;
  focus: string;
  photo: string;
  profile: Href;
  qualifications?: string;
  experience?: string;
  introduction?: string;
};

export const educators: Educator[] = [
  {
    name: "SK Manocha",
    focus: "General Studies · Polity & Governance",
    photo: "/assets/img/educators/sk-manocha-portrait.webp",
    profile: null,
    qualifications: "Postgraduate, Political Science",
    experience: "20+ years teaching UPSC",
    introduction: "Builds Polity from the Constitution up, and ties every topic to the way the examination asks about it.",
  },
  {
    name: "Brijender Singh",
    focus: "Essay",
    photo: "/assets/img/educators/brijender-singh-portrait.webp",
    profile: null,
    qualifications: "Postgraduate, English Literature",
    experience: "15+ years teaching UPSC",
    introduction: "Helps you find a clear argument, shape it into a structure and write it out within the time.",
  },
  {
    name: "Md. Rizwan",
    focus: "Geography optional",
    photo: "/assets/img/educators/md-rizwan-portrait.webp",
    profile: null,
    qualifications: "Postgraduate, Geography",
    experience: "15+ years teaching UPSC",
    introduction: "Teaches Geography through maps, diagrams and examples you can carry straight into the answer.",
  },
  {
    name: "Md. Tarique",
    focus: "History optional",
    photo: "/assets/img/educators/md-tarique-portrait.webp",
    profile: null,
    qualifications: "Postgraduate, History",
    experience: "15+ years teaching UPSC",
    introduction: "Turns long stretches of History into connected themes that are easier to revise and to write about.",
  },
  {
    name: "Mukul Pathak",
    focus: "Psychology optional",
    photo: "/assets/img/educators/mukul-pathak-portrait.webp",
    profile: null,
    qualifications: "Postgraduate, Psychology",
    experience: "10+ years teaching UPSC",
    introduction: "Links psychological theory to everyday examples, so the concepts stay with you in the examination hall.",
  },
  {
    name: "Shyam Sundar",
    focus: "Economics optional",
    photo: "/assets/img/educators/shyam-sundar-portrait.webp",
    profile: null,
    qualifications: "Postgraduate, Economics",
    experience: "15+ years teaching UPSC",
    introduction: "Explains Economics from first principles and then applies it to the questions India faces today.",
  },
];

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

export const CANVAS_WIDTH = 1440;

function fitCanvas(): number {
  const root = document.documentElement;
  root.style.zoom = "";
  const viewport = root.clientWidth || window.innerWidth;
  const zoom = Math.min(1, viewport / CANVAS_WIDTH);
  if (zoom < 1) root.style.zoom = String(zoom);
  root.style.setProperty("--canvas-zoom", String(zoom));
  return zoom;
}

export const fitCanvasScript = `(function(){var r=document.documentElement,w=r.clientWidth||innerWidth,z=Math.min(1,w/${CANVAS_WIDTH});if(z<1)r.style.zoom=String(z);r.style.setProperty("--canvas-zoom",String(z))})();`;

function getCanvasZoom(): number {
  return parseFloat(document.documentElement.style.zoom) || 1;
}

function canvasTop(el: HTMLElement): number {
  const rect = el.getBoundingClientRect();
  const scale = rect.width && el.offsetWidth ? rect.width / el.offsetWidth : 1;
  return rect.top / scale;
}

type Watch = { ratio: number; done: () => void };

const watches = new Map<Element, Watch[]>();
let observer: IntersectionObserver | null = null;

function reached(entry: IntersectionObserverEntry, ratio: number) {
  return entry.intersectionRatio >= ratio || entry.intersectionRect.height >= window.innerHeight * 0.6;
}

function getObserver() {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const list = watches.get(entry.target);
        if (!list) continue;
        const left = list.filter((watch) => {
          if (!reached(entry, watch.ratio)) return true;
          watch.done();
          return false;
        });
        if (left.length) watches.set(entry.target, left);
        else {
          watches.delete(entry.target);
          observer?.unobserve(entry.target);
        }
      }
    },
    { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.55, 0.6, 0.7, 0.75, 0.8, 0.9, 1] },
  );
  return observer;
}

function whenVisible(el: Element, ratio: number, done: () => void): () => void {
  if (typeof IntersectionObserver === "undefined") {
    done();
    return () => {};
  }
  const watch: Watch = { ratio, done };
  watches.set(el, [...(watches.get(el) ?? []), watch]);
  getObserver().observe(el);
  return () => {
    const left = (watches.get(el) ?? []).filter((w) => w !== watch);
    if (left.length) watches.set(el, left);
    else {
      watches.delete(el);
      observer?.unobserve(el);
    }
  };
}

function pressRipple(event: PointerEvent<HTMLElement>, { rings = true, soft = false }: { rings?: boolean; soft?: boolean } = {}) {
  if (!soft && event.button !== 0) return;
  const target = event.currentTarget;
  const box = target.getBoundingClientRect();
  const scale = box.width / target.offsetWidth || 1;
  const x = (event.clientX - box.left) / scale;
  const y = (event.clientY - box.top) / scale;
  const reach = Math.hypot(Math.max(x, target.offsetWidth - x), Math.max(y, target.offsetHeight - y)) * 2;

  const disc = document.createElement("span");
  disc.className = soft ? "press-ripple press-ripple-soft" : "press-ripple";
  Object.assign(disc.style, { left: `${x}px`, top: `${y}px`, width: `${reach}px`, height: `${reach}px` });
  const ring = document.createElement("span");
  ring.className = "press-pulse";
  const echo = document.createElement("span");
  echo.className = "press-pulse press-pulse-late";
  for (const el of [disc, ring, echo]) {
    el.setAttribute("aria-hidden", "true");
    el.addEventListener("animationend", () => el.remove(), { once: true });
  }
  (target.querySelector("[data-ripple]") ?? target).append(disc);
  if (rings) target.append(ring, echo);
}

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

function Icon({ name, className }: { name: IconName; className?: string }) {
  const mask = `url(${ICONS[name]}) center / contain no-repeat`;
  return <span aria-hidden="true" className={cx("block size-3.5 shrink-0 bg-current", className)} style={{ mask, WebkitMask: mask }} />;
}

const EASE = "cubic-bezier(0.215, 0.61, 0.355, 1)";
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
        ch.animate([{ transform: "translateY(110%)" }, { transform: "none" }], { duration: CHAR_MS, delay: i * step, easing: EASE, fill: "backwards" }),
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
      arm(el, [el.animate([{ opacity: 0, transform: "translateY(32px) scale(0.96)" }, { opacity: 1, transform: "none" }], { duration: 520, easing: EASE, fill: "backwards" })]);
    });
    scope.querySelectorAll<HTMLElement>("[data-rise]").forEach((el) => {
      if (!below(el)) return;
      arm(el, [el.animate([{ opacity: 0, transform: "translateY(40px) scale(0.97)" }, { opacity: 1, transform: "none" }], { duration: 560, easing: EASE, fill: "backwards" })]);
    });
    scope.querySelectorAll<HTMLElement>("[data-stagger]").forEach((el) => {
      if (!below(el)) return;
      const items = Array.from(el.children) as HTMLElement[];
      arm(el, items.map((item, i) => item.animate([{ opacity: 0, transform: "translateY(16px)" }, { opacity: 1, transform: "none" }], { duration: 480, delay: stagger(i), easing: EASE, fill: "backwards" })));
    });
    const WIPES: Record<string, string> = { up: "inset(100% 0 0 0)", down: "inset(0 0 100% 0)", left: "inset(0 0 0 100%)", right: "inset(0 100% 0 0)" };
    scope.querySelectorAll<HTMLElement>("[data-wipe]").forEach((el) => {
      if (!below(el)) return;
      const delay = held(el.dataset.wipeDelay);
      const from = WIPES[el.dataset.wipe ?? ""] ?? WIPES.up;
      const animations = [el.animate([{ clipPath: from }, { clipPath: "inset(0 0 0 0)" }], { duration: 700, delay, easing: EASE, fill: "backwards" })];
      const picture = el.querySelector("img");
      if (picture) animations.push(picture.animate([{ scale: "1.08" }, { scale: "1" }], { duration: 900, delay, easing: EASE, fill: "backwards" }));
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
      arm(el, items.map((item, i) => item.animate(FADE, { duration: 500, delay: delay + stagger(i), easing: EASE, fill: "backwards" })));
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
            { duration: 560, delay: stagger(i), easing: EASE, fill: "backwards" },
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

type CarouselArrowProps = {
  direction: "prev" | "next";
  onClick: () => void;
  label: string;
  hidden?: boolean;
  disabled?: boolean;
  tone?: "light" | "dark" | "solid";
  shape?: "circle" | "square";
  size?: number;
  className?: string;
};

function CarouselArrow({ direction, onClick, label, hidden = false, disabled = false, tone = "light", className }: CarouselArrowProps) {
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
  label: string;
  itemName: string;
  tone?: "light" | "dark";
  fillRef?: RefObject<HTMLSpanElement | null>;
  className?: string;
};

function CarouselDots({ count, active, onSelect, label, itemName, tone = "light", fillRef, className }: CarouselDotsProps) {
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

const STRIPS = 6;
const MIN_CARDS = 10;
const bw = (src: string) => src.replace(/(\.\w+)$/, "-bw$1");
const TILT = 0;
const PERSPECTIVE = 2400;
const LEAN = 0;
const SNAP_HAND = 9;
const SNAP_AUTO = 6.5;
const SNAP_INTRO = 9.5;
const INTRO_TURN = 1.5;
const FIRST_STEP_MS = 6000;
const CAPTION_MS = 250;
const CAPTION_OUT_MS = 140;
const MOMENTUM = 0.28;
const MAX_SPEED = 10;
const CAROUSEL_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

type CircularCarouselProps<T> = {
  items: readonly T[];
  label: string;
  itemName: string;
  slideTitle: (item: T) => string;
  image: (item: T) => string;
  href?: (item: T) => string | null;
  renderSlide: (item: T) => ReactNode;
  cardLabel?: (item: T) => { title: string; sub?: string };
  renderCaption?: (item: T, index: number) => ReactNode;
  width: number;
  height: number;
  gap?: number;
  interval?: number;
  fadeColor: string;
  backColor: string;
  tone?: "light" | "dark";
  spacing?: number;
  arrowReach?: number;
  className?: string;
};

type Sim = {
  pos: number;
  vel: number;
  target: number;
  stiffness: number;
  held: boolean;
  lean: { x: number; y: number; aimX: number; aimY: number };
  clock: number;
};

function CircularCarousel<T>({
  items,
  label,
  itemName,
  slideTitle,
  image,
  href,
  renderSlide,
  renderCaption,
  cardLabel,
  width,
  height,
  gap = 32,
  interval = 0,
  fadeColor,
  backColor,
  tone = "light",
  spacing = 32,
  arrowReach,
  className,
}: CircularCarouselProps<T>) {
  const count = items.length;
  const slots = count ? count * Math.max(1, Math.ceil(MIN_CARDS / count)) : 0;
  const step = slots ? 360 / slots : 0;
  const pitch = width + gap;
  const radius = slots ? (slots * pitch) / (2 * Math.PI) : 0;
  const lift = -radius * Math.sin((-TILT * Math.PI) / 180) * 0.55;
  const stageHeight = Math.round(height + radius * Math.sin((-TILT * Math.PI) / 180) * 0.9 + 24);

  const [front, setFront] = useState(0);
  const [still, setStill] = useState(false);
  const [shown, setShown] = useState(true);
  const [playing, setPlaying] = useState(interval > 0);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || near) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setNear(true); io.disconnect(); } }, { rootMargin: "150% 0px" });
    io.observe(stage);
    return () => io.disconnect();
  }, [near]);
  const active = count ? mod(front, count) : 0;

  const regionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const fillRef = useRef<HTMLSpanElement>(null);
  const liveRef = useRef<HTMLParagraphElement>(null);

  const sim = useRef<Sim>({ pos: 0, vel: 0, target: 0, stiffness: SNAP_HAND, held: false, lean: { x: 0, y: 0, aimX: 0, aimY: 0 }, clock: 0 });
  const flags = useRef({ playing: interval > 0, onScreen: false, still: false, entered: true, hover: false, focus: false, edge: false });
  const frontRef = useRef(0);
  const depths = useRef<string[]>([]);
  const frame = useRef(0);
  const kickRef = useRef<() => void>(() => {});

  const strips = useMemo(() => {
    if (!radius) return [];
    const wide = width / STRIPS;
    return Array.from({ length: STRIPS }, (_, j) => {
      const angle = (-width / 2 + (j + 0.5) * wide) / radius;
      const before = j === 0 ? 0 : 1.5;
      const after = j === STRIPS - 1 ? 0 : 1.5;
      return {
        width: wide + before + after,
        left: -wide / 2 - before,
        offset: j * wide - before,
        transform: `translate3d(${(radius * Math.sin(angle)).toFixed(3)}px, 0, ${(radius * Math.cos(angle) - radius).toFixed(3)}px) rotateY(${((angle * 180) / Math.PI).toFixed(3)}deg)`,
      };
    });
  }, [radius, width]);

  useEffect(() => {
    const s = sim.current;
    const f = flags.current;
    let last = 0;

    let ringLast = "";
    let cameraLast = "";
    const draw = () => {
      const ring = `rotateY(${(-s.pos * step).toFixed(3)}deg)`;
      if (ringRef.current && ring !== ringLast) ringRef.current.style.transform = ringLast = ring;
      const camera = `translate3d(0, ${lift.toFixed(1)}px, ${(-radius).toFixed(1)}px) rotateX(${(TILT - s.lean.y * LEAN * 0.5).toFixed(3)}deg) rotateY(${(s.lean.x * LEAN).toFixed(3)}deg)`;
      if (cameraRef.current && camera !== cameraLast) cameraRef.current.style.transform = cameraLast = camera;
      for (let i = 0; i < slots; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const turn = ((mod(i - s.pos + slots / 2, slots) - slots / 2) * step * Math.PI) / 180;
        const depth = ((1 - Math.cos(turn)) / 2).toFixed(2);
        if (depths.current[i] === depth) continue;
        depths.current[i] = depth;
        el.style.setProperty("--cc-depth", depth);
      }
      const nearest = mod(Math.round(s.pos), slots);
      if (nearest !== frontRef.current) {
        frontRef.current = nearest;
        f.hover = false;
        setFront(nearest);
      }
    };

    const tick = (time: number) => {
      const dt = last ? Math.min(0.05, (time - last) / 1000) : 1 / 60;
      last = time;
      let busy = false;

      if (!s.held) {
        if (f.still) {
          s.pos = s.target;
          s.vel = 0;
        } else {
          const k = s.stiffness;
          s.vel += (k * k * (s.target - s.pos) - 2 * k * s.vel) * dt;
          s.pos += s.vel * dt;
          if (Math.abs(s.target - s.pos) < 0.003 && Math.abs(s.vel) < 0.02) {
            s.pos = s.target;
            s.vel = 0;
          } else busy = true;
        }
      } else busy = true;

      const lean = s.lean;
      const ease = 1 - Math.exp(-dt * 5);
      lean.x += (lean.aimX - lean.x) * ease;
      lean.y += (lean.aimY - lean.y) * ease;
      if (Math.abs(lean.aimX - lean.x) > 1e-3 || Math.abs(lean.aimY - lean.y) > 1e-3) busy = true;

      const counting = interval > 0 && f.playing && !f.still && f.entered && f.onScreen && slots > 1;
      if (counting) {
        busy = true;
        if (!f.hover && !f.edge && !f.focus && !s.held && !document.hidden) s.clock += dt * 1000;
        if (s.clock >= interval) {
          s.clock = 0;
          s.target = Math.round(s.target) + 1;
          s.stiffness = SNAP_AUTO;
        }
      }
      if (fillRef.current) fillRef.current.style.transform = `scaleX(${counting ? Math.max(0, Math.min(1, s.clock / interval)).toFixed(4) : 0})`;

      draw();
      frame.current = busy ? requestAnimationFrame(tick) : 0;
      if (!busy) last = 0;
    };

    kickRef.current = () => {
      if (!frame.current) frame.current = requestAnimationFrame(tick);
    };
    draw();
    kickRef.current();
    return () => {
      cancelAnimationFrame(frame.current);
      frame.current = 0;
    };
  }, [slots, step, radius, lift, interval]);

  const kick = () => kickRef.current();

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const f = flags.current;
    const s = sim.current;
    const reduced = prefersReducedMotion();
    setStill(reduced);
    f.still = reduced;
    if (reduced) {
      setPlaying(false);
      f.playing = false;
    }
    let cancel = () => {};
    const alreadyThere = canvasTop(stage) < (window.innerHeight / getCanvasZoom()) * 0.85;
    if (!reduced && !alreadyThere) {
      f.entered = false;
      setShown(false);
      s.pos = s.target = -INTRO_TURN;
      s.vel = 0;
      kick();
      cancel = whenVisible(stage, 0.35, () => {
        f.entered = true;
        setShown(true);
        s.target = 0;
        s.stiffness = SNAP_INTRO;
        kick();
      });
    }
    let seen = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        f.onScreen = entry.isIntersecting;
        if (entry.isIntersecting && !seen) {
          seen = true;
          s.clock = Math.min(0, interval - FIRST_STEP_MS);
        }
        kick();
      },
      { threshold: 0.25 },
    );
    io.observe(stage);
    return () => {
      cancel();
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    flags.current.playing = playing;
    if (!playing) sim.current.clock = 0;
    kick();
  }, [playing]);

  const announce = () => {
    if (!liveRef.current || !count) return;
    const index = mod(Math.round(sim.current.target), count);
    liveRef.current.textContent = `${index + 1} of ${count}: ${slideTitle(items[index])}`;
  };

  const shiftRef = useRef<HTMLDivElement>(null);
  const edge = useRef({ target: 0, leave: 0 as ReturnType<typeof setTimeout> | 0, x: -1, y: -1, card: null as HTMLElement | null, zone: null as null | { l: number; r: number; t: number; b: number } });
  const EDGE_MARGIN = 16;
  const EDGE_MS = 520;
  const EDGE_GRACE = 140;
  const setShift = (px: number) => {
    const e = edge.current;
    if (e.leave) clearTimeout(e.leave);
    e.leave = 0;
    if (!px) {
      e.zone = null;
      e.card = null;
    }
    const el = shiftRef.current;
    if (!el || Math.abs(px - e.target) < 0.5) return;
    e.target = px;
    if (prefersReducedMotion()) el.style.transition = "none";
    el.style.translate = px ? `${px.toFixed(1)}px 0` : "";
    flags.current.edge = px !== 0;
    if (!px) kick();
  };
  const fitCard = (card: HTMLElement) => {
    const el = shiftRef.current;
    if (!el) return;
    let left = Infinity;
    let right = -Infinity;
    let top = Infinity;
    let bottom = -Infinity;
    card.querySelectorAll<HTMLElement>("span[aria-hidden]").forEach((part) => {
      const r = part.getBoundingClientRect();
      if (r.width > 0 && r.height > 0) {
        left = Math.min(left, r.left);
        right = Math.max(right, r.right);
        top = Math.min(top, r.top);
        bottom = Math.max(bottom, r.bottom);
      }
    });
    if (!Number.isFinite(left)) return;
    const zoom = getCanvasZoom();
    const drawn = (parseFloat(getComputedStyle(el).translate) || 0) * zoom;
    const l0 = left - drawn;
    const r0 = right - drawn;
    const vw = document.documentElement.clientWidth;
    const now = edge.current.target * zoom;
    let next = now;
    if (r0 - l0 > vw - 2 * EDGE_MARGIN) next = EDGE_MARGIN - l0;
    else if (l0 + now < EDGE_MARGIN) next = EDGE_MARGIN - l0;
    else if (r0 + now > vw - EDGE_MARGIN) next = vw - EDGE_MARGIN - r0;
    else if (l0 >= EDGE_MARGIN && r0 <= vw - EDGE_MARGIN) next = 0;
    setShift(next / zoom);
    edge.current.card = next ? card : null;
    edge.current.zone = next ? { l: Math.min(l0, l0 + next), r: Math.max(r0, r0 + next), t: top - 12, b: bottom + 12 } : null;
  };
  const inZone = (x: number, y: number) => {
    const z = edge.current.zone;
    return !!z && x >= z.l && x <= z.r && y >= z.t && y <= z.b;
  };
  const leaveSoon = () => {
    const e = edge.current;
    if (e.leave || !e.target) return;
    e.leave = setTimeout(() => {
      e.leave = 0;
      if (!inZone(e.x, e.y)) setShift(0);
    }, EDGE_GRACE);
  };
  const onCardEnter = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || drag.current?.moved) return;
    const e = edge.current;
    e.x = event.clientX;
    e.y = event.clientY;
    if (e.target && e.card && e.card !== event.currentTarget && inZone(e.x, e.y)) return;
    if (e.leave) clearTimeout(e.leave);
    e.leave = 0;
    fitCard(event.currentTarget);
  };
  const onCardLeave = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const e = edge.current;
    e.x = event.clientX;
    e.y = event.clientY;
    if (!inZone(e.x, e.y)) leaveSoon();
  };
  useEffect(() => {
    const e = edge.current;
    const off = () => setShift(0);
    const track = (event: globalThis.PointerEvent) => {
      if (event.pointerType !== "mouse" || !e.target) return;
      e.x = event.clientX;
      e.y = event.clientY;
      if (inZone(e.x, e.y)) {
        if (e.leave) clearTimeout(e.leave);
        e.leave = 0;
      } else leaveSoon();
    };
    addEventListener("resize", off);
    addEventListener("pointermove", track, { passive: true });
    document.addEventListener("pointerleave", off);
    return () => {
      removeEventListener("resize", off);
      removeEventListener("pointermove", track);
      document.removeEventListener("pointerleave", off);
    };
  }, []);

  const move = (by: number, byHand: boolean) => {
    if (!slots || by === 0) return;
    setShift(0);
    const s = sim.current;
    s.clock = 0;
    s.held = false;
    s.target = Math.round(s.target) + by;
    s.stiffness = SNAP_HAND;
    kick();
    if (byHand) announce();
  };

  const offsetTo = (slot: number) => mod(slot - Math.round(sim.current.target) + Math.floor(slots / 2), slots) - Math.floor(slots / 2);

  const goTo = (index: number) => move(mod(index - mod(Math.round(sim.current.target), count) + Math.floor(count / 2), count) - Math.floor(count / 2), true);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    move(event.key === "ArrowRight" ? 1 : -1, true);
  };

  const drag = useRef<{ id: number; x: number; y: number; pos: number; moved: boolean; trail: { t: number; pos: number }[] } | null>(null);
  const swallowClick = useRef(false);

  const release = () => {
    const d = drag.current;
    drag.current = null;
    if (!d?.moved) return;
    const s = sim.current;
    const trail = d.trail;
    const first = trail[0];
    const lastPoint = trail[trail.length - 1];
    const span = (lastPoint.t - first.t) / 1000;
    const speed = span > 0.02 ? Math.max(-MAX_SPEED, Math.min(MAX_SPEED, (lastPoint.pos - first.pos) / span)) : 0;
    s.held = false;
    s.vel = flags.current.still ? 0 : speed;
    const carry = speed * MOMENTUM;
    s.target = Math.round(s.pos + carry);
    s.stiffness = SNAP_HAND;
    s.clock = 0;
    swallowClick.current = true;
    kick();
    announce();
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, pos: sim.current.pos, moved: false, trail: [] };
    swallowClick.current = false;
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    const d = drag.current;
    edge.current.x = event.clientX;
    edge.current.y = event.clientY;
    if (!d || d.id !== event.pointerId) return;
    const zoom = getCanvasZoom();
    const dx = (event.clientX - d.x) / zoom;
    const dy = (event.clientY - d.y) / zoom;
    const s = sim.current;
    if (!d.moved) {
      if (Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(dy)) {
        d.moved = true;
        setShift(0);
        d.pos = s.pos;
        s.held = true;
        s.vel = 0;
        stage?.setPointerCapture(event.pointerId);
        kick();
      } else {
        if (Math.abs(dy) > 10) drag.current = null;
        return;
      }
    }
    s.pos = d.pos - dx / pitch;
    s.target = s.pos;
    const now = performance.now();
    d.trail.push({ t: now, pos: s.pos });
    while (d.trail.length > 2 && now - d.trail[0].t > 90) d.trail.shift();
  };

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let timer = 0;
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      (event as WheelEvent & { lenisStopPropagation?: boolean }).lenisStopPropagation = true;
      event.preventDefault();
      const s = sim.current;
      const scale = event.deltaMode === 1 ? 16 : 1;
      s.held = true;
      s.vel = 0;
      s.pos += (event.deltaX * scale) / pitch;
      s.target = s.pos;
      s.clock = 0;
      kickRef.current();
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        s.held = false;
        s.target = Math.round(s.pos);
        s.stiffness = SNAP_HAND;
        kickRef.current();
        announce();
      }, 140);
    };
    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      stage.removeEventListener("wheel", onWheel);
      window.clearTimeout(timer);
    };
  }, [pitch]);

  const name = itemName.charAt(0).toUpperCase() + itemName.slice(1);
  const radiusPx = 8;

  if (!count) return null;

  return (
    <div
      ref={regionRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onFocus={(event) => {
        if ((event.target as Element).matches(":focus-visible")) flags.current.focus = true;
      }}
      onBlur={(event) => {
        if (!regionRef.current?.contains(event.relatedTarget as Node | null)) flags.current.focus = false;
      }}
      onPointerLeave={() => {
        const lean = sim.current.lean;
        lean.aimX = lean.aimY = 0;
        kick();
      }}
      className={cx("relative flex w-full flex-col items-center rounded-[8px] outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-burnt", className)}
    >
      <div
        ref={stageRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={release}
        onPointerCancel={release}
        onClickCapture={(event) => {
          if (swallowClick.current) {
            swallowClick.current = false;
            event.preventDefault();
            event.stopPropagation();
            return;
          }
          const el = (event.target as Element | null)?.closest<HTMLElement>("[data-slot]");
          if (!el) return;
          const by = offsetTo(Number(el.dataset.slot));
          if (by === 0) return;
          event.preventDefault();
          move(by, true);
        }}
        className="relative w-full touch-pan-y select-none"
        style={{ height: stageHeight }}
      >
        <div
          ref={shiftRef}
          className="pointer-events-none absolute inset-0 motion-reduce:transition-none"
          style={{ transition: `translate ${EDGE_MS}ms ${CAROUSEL_EASE}` }}
        >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 h-12 w-[760px] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgb(77_31_8/0.16),rgb(77_31_8/0))]"
          style={{ top: stageHeight / 2 + height / 2 - 18 }}
        />
        <div
          className="pointer-events-auto absolute inset-0 flex items-center justify-center"
          style={{
            perspective: PERSPECTIVE,
            opacity: shown ? 1 : 0,
            transition: still ? "none" : `opacity 450ms ${CAROUSEL_EASE}`,
          }}
        >
          <div ref={cameraRef} className="relative size-0 [transform-style:preserve-3d]">
            <div ref={ringRef} className="absolute top-0 left-0 size-0 [transform-style:preserve-3d]">
              {Array.from({ length: slots }, (_, slot) => {
                const index = slot % count;
                const item = items[index];
                const copy = slot >= count;
                const isFront = slot === front;
                const link = href?.(item) ?? null;
                const src = image(item);
                const faces = strips.map((strip, j) => {
                  const edge = j === 0 ? "left" : j === STRIPS - 1 ? "right" : null;
                  const round = (side: "left" | "right" | null) =>
                    side === "left" ? `${radiusPx}px 0 0 ${radiusPx}px` : side === "right" ? `0 ${radiusPx}px ${radiusPx}px 0` : "0";
                  const box: CSSProperties = { left: strip.left, top: -height / 2, width: strip.width, height };
                  return (
                    <Fragment key={j}>
                      <span aria-hidden="true" className="absolute outline outline-1 outline-transparent [backface-visibility:hidden]" style={{ ...box, transform: strip.transform }}>
                        <span
                          className="absolute inset-0 overflow-hidden bg-no-repeat"
                          style={{
                            borderRadius: round(edge),
                            backgroundImage: near ? `url("${bw(src)}")` : undefined,
                            backgroundSize: `${width}px auto`,
                            backgroundPosition: `${-strip.offset}px 30%`,
                            backgroundColor: backColor,
                          }}
                        >
                          <span
                            className={cx(
                              "absolute inset-0 bg-no-repeat [transition:opacity_600ms_var(--ease-out)] motion-reduce:transition-none",
                              isFront ? "opacity-100" : "opacity-0 group-hover/cc:opacity-100",
                            )}
                            style={{
                              backgroundImage: near ? `url("${src}")` : undefined,
                              backgroundSize: `${width}px auto`,
                              backgroundPosition: `${-strip.offset}px 30%`,
                            }}
                          />
                          {cardLabel && (
                            <span
                              className={cx("absolute inset-0 [transition:opacity_400ms_var(--ease-out)]", isFront ? "opacity-80 group-hover/cc:opacity-100 group-focus-within/cc:opacity-100" : "opacity-0")}
                              style={{ backgroundImage: "linear-gradient(180deg, transparent 52%, rgb(30 14 6 / 0.55) 76%, rgb(30 14 6 / 0.88) 100%)", backgroundSize: `${width}px ${height}px`, backgroundPosition: `${-strip.offset}px 0` }}
                            />
                          )}
                          <span className="absolute inset-0" style={{ background: fadeColor, opacity: "calc(var(--cc-depth, 0) * 0.9)" }} />
                        </span>
                      </span>
                    </Fragment>
                  );
                });
                const cardStyle: CSSProperties = { transform: `rotateY(${(slot * step).toFixed(3)}deg) translateZ(${radius.toFixed(2)}px)` };
                const cardClass = "group/cc absolute top-0 left-0 size-0 [transform-style:preserve-3d] [translate:0_0] [transition:translate_450ms_var(--ease-out)] hover:[translate:0_-10px] focus-within:[translate:0_-10px] motion-reduce:transition-none";
                const label = cardLabel?.(item);
                const plate = label ? (
                  <span
                    aria-hidden="true"
                    className={cx(
                      "pointer-events-none absolute [backface-visibility:hidden] [transition:opacity_350ms_var(--ease-out),translate_450ms_var(--ease-out)] motion-reduce:transition-none",
                      isFront ? "[translate:0_0] opacity-100" : "[translate:0_8px] opacity-0",
                    )}
                    style={{ left: -width / 2, top: -height / 2, width, height, transform: "translateZ(2px)" }}
                  >
                    <span className="absolute inset-x-0 bottom-0 flex flex-col gap-0.5 px-4 pb-4 text-left">
                      <span className="cc-plate__name">{label.title}</span>
                      {label.sub && <span className="cc-plate__sub">{label.sub}</span>}
                    </span>
                  </span>
                ) : null;
                return (
                  <div
                    key={slot}
                    ref={(el) => {
                      cardRefs.current[slot] = el;
                    }}
                    data-slot={slot}
                    {...(copy ? { "aria-hidden": true } : { role: "group", "aria-roledescription": "slide", "aria-label": `${index + 1} of ${count}` })}
                    onFocus={() => {
                      const by = offsetTo(slot);
                      if (by !== 0) move(by, true);
                    }}
                    onPointerEnter={(event) => {
                      if (isFront && event.pointerType === "mouse") flags.current.hover = true;
                      onCardEnter(event);
                    }}
                    onPointerLeave={(event) => {
                      if (isFront) flags.current.hover = false;
                      onCardLeave(event);
                    }}
                    className={cardClass}
                    style={cardStyle}
                  >
                    {link !== null ? (
                      <a href={link} draggable={false} tabIndex={copy ? -1 : undefined} className="absolute top-0 left-0 size-0 [transform-style:preserve-3d]">
                        {faces}
                        {plate}
                        <div className="sr-only">{renderSlide(item)}</div>
                      </a>
                    ) : (
                      <>
                        {faces}
                        {plate}
                        {!copy && <div className="sr-only">{renderSlide(item)}</div>}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        </div>

        {([-1, 1] as const).map((side) => (
          <div
            key={side}
            className={cx("absolute top-1/2 z-10 -translate-y-1/2", arrowReach ? "-translate-x-1/2" : side < 0 ? "left-10" : "right-10")}
            style={arrowReach ? { left: `calc(50% + ${side * arrowReach}px)` } : undefined}
          >
            <CarouselArrow
              direction={side < 0 ? "prev" : "next"}
              label={`${side < 0 ? "Previous" : "Next"} ${itemName}`}
              tone={tone}
              size={48}
              onClick={() => move(side, true)}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center" style={{ marginTop: spacing }}>
        <CarouselDots
          count={count}
          active={active}
          onSelect={goTo}
          label={`Choose ${itemName}`}
          itemName={name}
          tone={tone}
          fillRef={interval && playing && !still ? fillRef : undefined}
        />
      </div>

      {renderCaption && (
        <div aria-hidden="true" className="grid w-full justify-items-center" style={{ marginTop: spacing }}>
          {items.map((item, i) => {
            const on = i === active && shown;
            return (
              <div
                key={i}
                className="col-start-1 row-start-1 w-full"
                style={{
                  opacity: on ? 1 : 0,
                  translate: on ? "0 0" : "0 3px",
                  visibility: on ? "visible" : "hidden",
                  transition: still
                    ? "none"
                    : on
                      ? `opacity ${CAPTION_MS}ms ${CAROUSEL_EASE} ${CAPTION_OUT_MS}ms, translate ${CAPTION_MS}ms ${CAROUSEL_EASE} ${CAPTION_OUT_MS}ms, visibility 0s linear 0s`
                      : `opacity ${CAPTION_OUT_MS}ms linear, translate 0s linear ${CAPTION_OUT_MS}ms, visibility 0s linear ${CAPTION_OUT_MS}ms`,
                }}
              >
                {renderCaption(item, i)}
              </div>
            );
          })}
        </div>
      )}

      <p ref={liveRef} aria-live="polite" aria-atomic="true" className="sr-only" />
    </div>
  );
}

const AUTOPLAY_MS = 4500;

function EducatorFlow({ educators }: { educators: Educator[] }) {
  return (
    <CircularCarousel
      items={educators}
      label="Our educators"
      itemName="educator"
      slideTitle={(educator) => `${educator.name}, ${educator.focus}`}
      image={(educator) => educator.photo}
      href={(educator) => educator.profile}
      renderSlide={(educator) => <SlideText educator={educator} />}
      cardLabel={(educator) => ({ title: educator.name, sub: educator.focus })}
      width={264}
      height={340}
      gap={30}
      interval={AUTOPLAY_MS}
      fadeColor="#fff8ec"
      backColor="#ead9c2"
      tone="light"
      spacing={20}
      arrowReach={523}
    />
  );
}

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

export default function Faculties() {
  const { heading, lead } = facultyIntro;
  return (
    <section id="educators" aria-labelledby="educators-h" className="relative isolate overflow-clip">
      <TextMotion rootId="educators" />
      <div className="edu__head w-full px-[var(--px)]">
        <SectionLabel>Faculty</SectionLabel>
        <h2 id="educators-h" className="h2 h2--sec rv" style={{ "--d": ".12s" } as CSSProperties}>
          {heading.lead} {heading.emphasis}
        </h2>
        <p className="intro rv" style={{ "--d": ".2s" } as CSSProperties}>{lead}</p>
      </div>
      <div className="mt-[var(--hd-gap)]">
        <div data-rise>
          <EducatorFlow educators={educators} />
        </div>
      </div>
    </section>
  );
}
