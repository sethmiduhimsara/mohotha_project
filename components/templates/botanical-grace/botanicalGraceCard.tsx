"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
  Variants,
  type MotionValue,
  type TargetAndTransition,
} from "framer-motion";
import {
  MapPin,
  Heart,
  ArrowRight,
  Sprout,
  Volume2,
  VolumeX,
  Leaf,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Motion tokens — slow, humid jungle easing curve                    */
/* ------------------------------------------------------------------ */
const LUX_EASE = [0.22, 1, 0.36, 1] as const;

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.22, delayChildren: 0.1 },
  },
};

const riseIn: Variants = {
  hidden: { opacity: 0, y: 56, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.3, ease: LUX_EASE },
  },
};

/* Fixed angles for the RSVP burst — kept static (no Math.random) so    */
/* server and client render the same markup.                           */
const PETAL_BURST_ANGLES = [0, 60, 120, 180, 240, 300];

/* Fixed flight paths for scroll-linked birds — static so SSR stays stable. */
const SCROLL_BIRD_FLIGHTS = [
  { variant: "parrot" as const, size: 36, start: 0.0, end: 0.13, fromX: -14, toX: 112, yPercent: 5, flip: false, wingSpeed: 0.34 },
  { variant: "hummingbird" as const, size: 22, start: 0.06, end: 0.2, fromX: 112, toX: -16, yPercent: 12, flip: true, wingSpeed: 0.16 },
  { variant: "finch" as const, size: 24, start: 0.14, end: 0.27, fromX: -12, toX: 108, yPercent: 20, flip: false, wingSpeed: 0.24 },
  { variant: "finch" as const, size: 26, start: 0.19, end: 0.33, fromX: -12, toX: 108, yPercent: 30, flip: false, wingSpeed: 0.26 },
  { variant: "parrot" as const, size: 30, start: 0.28, end: 0.44, fromX: 110, toX: -14, yPercent: 38, flip: true, wingSpeed: 0.3 },
  { variant: "hummingbird" as const, size: 20, start: 0.36, end: 0.5, fromX: -10, toX: 112, yPercent: 47, flip: false, wingSpeed: 0.14 },
  { variant: "parrot" as const, size: 26, start: 0.42, end: 0.58, fromX: -14, toX: 110, yPercent: 55, flip: false, wingSpeed: 0.3 },
  { variant: "finch" as const, size: 24, start: 0.5, end: 0.64, fromX: 108, toX: -12, yPercent: 63, flip: true, wingSpeed: 0.24 },
  { variant: "hummingbird" as const, size: 22, start: 0.58, end: 0.72, fromX: 112, toX: -16, yPercent: 70, flip: true, wingSpeed: 0.16 },
  { variant: "parrot" as const, size: 28, start: 0.66, end: 0.82, fromX: -14, toX: 110, yPercent: 78, flip: false, wingSpeed: 0.28 },
  { variant: "finch" as const, size: 22, start: 0.74, end: 0.88, fromX: 112, toX: -10, yPercent: 87, flip: true, wingSpeed: 0.22 },
  { variant: "parrot" as const, size: 32, start: 0.84, end: 0.98, fromX: -16, toX: 112, yPercent: 94, flip: false, wingSpeed: 0.32 },
];

/* ------------------------------------------------------------------ */
/*  Jungle palette — misty rainforest, fireflies, ferns                 */
/*  canopy    #10301f  deep near-black emerald — headings, primary CTAs */
/*  canopy-2  #0a1f14  CTA hover / deepest shadow                        */
/*  jade      #3f7a56  eyebrows, links, focus rings                     */
/*  fern      #5c9271  stems, dividers, vines                           */
/*  mist      #eef4ef  pale fog background                              */
/*  mist-brd  #d7e6da  hairline borders on mist                         */
/*  paper     #f6faf7  near-white section background                   */
/*  fog       #e1ede3  alternate section background                    */
/*  ink       #1b2b20  body copy                                       */
/*  firefly   #e8c468  glowing gold accent                              */
/*  firefly-2 #f3e2a0  softer gold glow                                 */
/*                                                                      */
/*  A small rainforest-bloom palette the botanical accents pull from,   */
/*  so the page reads like real jungle flora rather than one repeated   */
/*  flower.                                                              */
/* ------------------------------------------------------------------ */
const BLOOM_PALETTE = [
  { petal: "#a8567a", center: "#f6e6ef" }, // jungle orchid
  { petal: "#c1493f", center: "#fbe9df" }, // torch ginger
  { petal: "#f3ede0", center: "#d9a441" }, // moth orchid
  { petal: "#d97b3f", center: "#fdecc9" }, // heliconia
  { petal: "#7c6bab", center: "#efeaf7" }, // passionflower
  { petal: "#e8c468", center: "#fff6df" }, // firefly bloom
] as const;

/* ------------------------------------------------------------------ */
/*  RevealText — word-by-word storytelling reveal, used for supporting */
/*  copy and labels (the bigger headline moments use LeafReveal below). */
/* ------------------------------------------------------------------ */
function RevealText({
  text,
  className,
  as = "p",
  delay = 0,
}: {
  text: string;
  className?: string;
  as?: "p" | "h1" | "h2" | "span" | "div";
  delay?: number;
}) {
  const words = text.split(" ");
  const Tag = as as React.ElementType;
  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-top pb-[0.15em]"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "115%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{
              duration: 1,
              delay: delay + i * 0.05,
              ease: LUX_EASE,
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/*  LeafReveal — the signature jungle typography moment. Each word      */
/*  hides behind a small glossy leaf patch; as it scrolls into view the */
/*  leaf peels open like it's unfurling in the canopy, a firefly slips  */
/*  out from underneath, and the word settles into place beneath it.    */
/*  Used for the hero names and every chapter headline.                 */
/* ------------------------------------------------------------------ */
function LeafReveal({
  text,
  className,
  as = "h2",
  delay = 0,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p" | "div" | "span";
  delay?: number;
}) {
  const words = text.split(" ");
  const Tag = as as React.ElementType;
  const shouldReduceMotion = useReducedMotion();

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="relative inline-block overflow-visible align-top mr-[0.28em] last:mr-0"
        >
          <motion.span
            className="relative inline-block"
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{
              duration: 0.9,
              delay: delay + i * 0.16 + 0.32,
              ease: LUX_EASE,
            }}
          >
            {word}
          </motion.span>

          {!shouldReduceMotion && (
            <>
              <motion.span
                aria-hidden
                className="absolute inset-0 origin-left"
                style={{
                  background:
                    "linear-gradient(135deg, #5c9271 0%, #234a34 100%)",
                  borderRadius: "46% 54% 58% 42% / 50% 40% 60% 50%",
                  boxShadow: "0 8px 18px rgba(10,20,14,0.22)",
                }}
                initial={{ opacity: 1, rotate: 0, scale: 1, x: "0%", y: "0%" }}
                whileInView={{
                  opacity: 0,
                  rotate: -68,
                  scale: 0.82,
                  x: "-32%",
                  y: "-8%",
                }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{
                  duration: 0.85,
                  delay: delay + i * 0.16,
                  ease: LUX_EASE,
                }}
              />
              <motion.span
                aria-hidden
                className="absolute -right-1 top-1/2 h-1.5 w-1.5 rounded-full"
                style={{
                  background: "#e8c468",
                  boxShadow: "0 0 6px 2px rgba(232,196,104,0.7)",
                }}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                whileInView={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.4, 0],
                  x: [0, 16, 28],
                  y: [0, -12, -22],
                }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{
                  duration: 1.1,
                  delay: delay + i * 0.16 + 0.15,
                  ease: "easeOut",
                }}
              />
            </>
          )}
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/*  Petal — a small teardrop bloom sliver. Doubles as a "leaf sliver"   */
/*  when tinted green for the RSVP success burst.                      */
/* ------------------------------------------------------------------ */
function Petal({
  size = 16,
  color = "#5c9271",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={color}>
      <path d="M12 2C7.2 6.1 4 11.1 12 22 20 11.1 16.8 6.1 12 2Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  MiniFlower — a plain, unanimated 6-petal bloom glyph. Used inside  */
/*  the GrowingVine, where entrance motion is driven externally by     */
/*  scroll progress rather than viewport intersection.                 */
/* ------------------------------------------------------------------ */
function MiniFlower({
  size = 26,
  petal = "#a8567a",
  center = "#f6e6ef",
}: {
  size?: number;
  petal?: string;
  center?: string;
}) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size}>
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <ellipse
          key={deg}
          cx="20"
          cy="11"
          rx="5"
          ry="9"
          fill={petal}
          fillOpacity={0.88}
          transform={`rotate(${deg} 20 20)`}
        />
      ))}
      <circle cx="20" cy="20" r="4.5" fill={center} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  BloomingFlower — a 6-petal flower that opens petal-by-petal when   */
/*  it scrolls into view. Used as a standalone decorative accent.      */
/* ------------------------------------------------------------------ */
function BloomingFlower({
  size = 60,
  petal = "#a8567a",
  center = "#f6e6ef",
  className = "",
  delay = 0,
}: {
  size?: number;
  petal?: string;
  center?: string;
  className?: string;
  delay?: number;
}) {
  const petals = [0, 60, 120, 180, 240, 300];

  return (
    <motion.svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
    >
      <motion.g
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: 0.09, delayChildren: delay },
          },
        }}
      >
        {petals.map((deg) => (
          <motion.ellipse
            key={deg}
            cx="50"
            cy="28"
            rx="10"
            ry="20"
            fill={petal}
            fillOpacity={0.85}
            transform={`rotate(${deg} 50 50)`}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            variants={{
              hidden: { scale: 0, opacity: 0 },
              show: {
                scale: 1,
                opacity: 1,
                transition: { duration: 0.7, ease: LUX_EASE },
              },
            }}
          />
        ))}
        <motion.circle
          cx="50"
          cy="50"
          r="9"
          fill={center}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          variants={{
            hidden: { scale: 0, opacity: 0 },
            show: {
              scale: 1,
              opacity: 1,
              transition: {
                duration: 0.5,
                ease: LUX_EASE,
                delay: delay + petals.length * 0.09,
              },
            },
          }}
        />
      </motion.g>
    </motion.svg>
  );
}

/* ------------------------------------------------------------------ */
/*  CornerFlourish — a thin botanical line flourish for hero corners   */
/* ------------------------------------------------------------------ */
function CornerFlourish({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 90 90"
      width="72"
      height="72"
      className={className}
      fill="none"
    >
      <path
        d="M2 86 C 2 48, 42 86, 2 38"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M2 86 C 40 86, 2 48, 42 86"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.6"
      />
      <circle cx="9" cy="33" r="3" fill="currentColor" />
      <circle cx="34" cy="9" r="2" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  FernFrond — a small feathery fern, flanking the botanical dividers  */
/*  and standing in for the old rose-tipped sprig. Built from paired    */
/*  leaflets along a central stem so it reads as a real jungle fern.    */
/* ------------------------------------------------------------------ */
function FernFrond({
  size = 22,
  flip = false,
  color = "#5c9271",
}: {
  size?: number;
  flip?: boolean;
  color?: string;
}) {
  const leaflets = [16, 28, 40, 52, 64, 76, 88];

  return (
    <motion.svg
      viewBox="0 0 40 100"
      width={size}
      height={size * 2.4}
      fill="none"
      style={{
        transform: flip ? "scaleX(-1)" : undefined,
        transformOrigin: "bottom center",
      }}
      initial={{ scaleY: 0, opacity: 0 }}
      whileInView={{ scaleY: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: LUX_EASE }}
    >
      <path
        d="M20 98 C20 70 20 40 20 2"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {leaflets.map((y, i) => {
        const len = 15 - i * 1.4;
        return (
          <g key={y}>
            <ellipse
              cx={20 - len / 1.6}
              cy={y}
              rx={len / 2}
              ry="2.4"
              fill={color}
              fillOpacity={0.82}
              transform={`rotate(-32 ${20 - len / 1.6} ${y})`}
            />
            <ellipse
              cx={20 + len / 1.6}
              cy={y}
              rx={len / 2}
              ry="2.4"
              fill={color}
              fillOpacity={0.82}
              transform={`rotate(32 ${20 + len / 1.6} ${y})`}
            />
          </g>
        );
      })}
    </motion.svg>
  );
}

/* ------------------------------------------------------------------ */
/*  MonsteraLeaf — the page's broad-leaf silhouette: a stylised split-  */
/*  leaf shape with veining, used for the swaying canopy accents and    */
/*  as the "leaf doors" that part to reveal the RSVP card.              */
/* ------------------------------------------------------------------ */
function MonsteraLeaf({
  size = 80,
  color = "#3f7a56",
  flip = false,
  className = "",
}: {
  size?: number;
  color?: string;
  flip?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 140"
      width={size}
      height={size * 1.4}
      className={className}
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
      fill="none"
    >
      <path
        d="M50 4
           C 74 10 90 34 92 58
           C 94 80 84 98 68 112
           C 60 119 54 126 50 136
           C 46 126 40 119 32 112
           C 16 98 6 80 8 58
           C 10 34 26 10 50 4 Z"
        fill={color}
        fillOpacity="0.92"
      />
      <path
        d="M50 20 C 60 45 60 75 50 118"
        stroke="rgba(8,20,14,0.18)"
        strokeWidth="2"
      />
      <path
        d="M50 34 C 40 40 30 46 24 56"
        stroke="rgba(8,20,14,0.14)"
        strokeWidth="1.4"
      />
      <path
        d="M50 34 C 60 40 70 46 76 56"
        stroke="rgba(8,20,14,0.14)"
        strokeWidth="1.4"
      />
      <path
        d="M50 58 C 38 64 28 72 22 82"
        stroke="rgba(8,20,14,0.14)"
        strokeWidth="1.4"
      />
      <path
        d="M50 58 C 62 64 72 72 78 82"
        stroke="rgba(8,20,14,0.14)"
        strokeWidth="1.4"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Firefly — a small drifting glow. Purely ambient atmosphere, so it   */
/*  disappears entirely for reduced-motion visitors.                    */
/* ------------------------------------------------------------------ */
function Firefly({
  className = "",
  size = 5,
  duration = 7,
  delay = 0,
}: {
  className?: string;
  size?: number;
  duration?: number;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return null;

  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute ${className}`}
      animate={{
        x: [0, 16, -12, 8, 0],
        y: [0, -22, -8, -26, 0],
        opacity: [0, 1, 0.55, 1, 0],
      }}
      transition={{ repeat: Infinity, duration, ease: "easeInOut", delay }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "9999px",
          background: "#e8c468",
          boxShadow:
            "0 0 6px 2px rgba(232,196,104,0.55), 0 0 14px 6px rgba(243,226,160,0.25)",
        }}
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  JungleBird — cute tropical bird silhouettes with flapping wings.     */
/*  parrot · hummingbird · finch — each drifts through the canopy.     */
/* ------------------------------------------------------------------ */
function JungleBird({
  variant = "finch",
  size = 28,
  flip = false,
  wingSpeed = 0.28,
  className = "",
}: {
  variant?: "parrot" | "hummingbird" | "finch";
  size?: number;
  flip?: boolean;
  wingSpeed?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  const wingFlap: TargetAndTransition = shouldReduceMotion
    ? {}
    : {
        rotate: variant === "hummingbird" ? [-28, 28, -28] : [-18, 14, -18],
        transition: { repeat: Infinity, duration: wingSpeed, ease: "easeInOut" },
      };

  const bodyFlap: TargetAndTransition = shouldReduceMotion
    ? {}
    : {
        y: [0, -2, 0],
        transition: { repeat: Infinity, duration: wingSpeed * 2.4, ease: "easeInOut" },
      };

  if (variant === "hummingbird") {
    return (
      <motion.svg
        viewBox="0 0 60 36"
        width={size}
        height={size * 0.6}
        className={className}
        style={{ transform: flip ? "scaleX(-1)" : undefined }}
        animate={bodyFlap}
      >
        <ellipse cx="30" cy="20" rx="9" ry="7" fill="#3f7a56" />
        <circle cx="38" cy="14" r="5.5" fill="#5c9271" />
        <path d="M43 13 L54 10 L43 16 Z" fill="#d97b3f" />
        <motion.g style={{ transformOrigin: "26px 18px" }} animate={wingFlap}>
          <ellipse cx="22" cy="16" rx="11" ry="4" fill="#9fc9ab" fillOpacity="0.85" transform="rotate(-20 22 16)" />
        </motion.g>
        <path d="M18 22 C12 26 8 30 6 34" stroke="#3f7a56" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <circle cx="40" cy="13" r="1.2" fill="#10301f" />
      </motion.svg>
    );
  }

  if (variant === "parrot") {
    return (
      <motion.svg
        viewBox="0 0 80 52"
        width={size}
        height={size * 0.65}
        className={className}
        style={{ transform: flip ? "scaleX(-1)" : undefined }}
        animate={bodyFlap}
      >
        <ellipse cx="38" cy="30" rx="16" ry="12" fill="#3f7a56" />
        <circle cx="52" cy="18" r="10" fill="#5c9271" />
        <path d="M58 16 L72 12 L60 24 Z" fill="#e8c468" />
        <path d="M48 10 C44 4 54 2 58 8" fill="#c1493f" />
        <motion.g style={{ transformOrigin: "32px 24px" }} animate={wingFlap}>
          <ellipse cx="28" cy="22" rx="18" ry="7" fill="#234a34" fillOpacity="0.75" transform="rotate(-16 28 22)" />
          <ellipse cx="30" cy="24" rx="14" ry="5" fill="#3f7a56" fillOpacity="0.9" transform="rotate(-12 30 24)" />
        </motion.g>
        <path d="M18 32 C10 36 4 42 2 48" stroke="#234a34" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M22 28 C14 30 8 34 6 40" stroke="#5c9271" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <circle cx="55" cy="17" r="2" fill="#10301f" />
        <circle cx="59" cy="16" r="1" fill="#08150e" />
      </motion.svg>
    );
  }

  /* finch — small cheerful songbird */
  return (
    <motion.svg
      viewBox="0 0 64 40"
      width={size}
      height={size * 0.62}
      className={className}
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
      animate={bodyFlap}
    >
      <ellipse cx="32" cy="24" rx="12" ry="9" fill="#e8c468" />
      <circle cx="44" cy="16" r="7" fill="#f3e2a0" />
      <path d="M50 15 L58 13 L50 19 Z" fill="#d97b3f" />
      <motion.g style={{ transformOrigin: "28px 20px" }} animate={wingFlap}>
        <ellipse cx="24" cy="18" rx="14" ry="5" fill="#3f7a56" fillOpacity="0.85" transform="rotate(-18 24 18)" />
      </motion.g>
      <path d="M16 26 C10 28 6 32 4 36" stroke="#3f7a56" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <circle cx="46" cy="15" r="1.4" fill="#10301f" />
      <ellipse cx="30" cy="28" rx="4" ry="3" fill="#f3e2a0" fillOpacity="0.6" />
    </motion.svg>
  );
}

/* ------------------------------------------------------------------ */
/*  AmbientBird — a bird that loops a lazy figure-of-flight on its own  */
/*  clock rather than following scroll. Used for the hero and for a     */
/*  couple of chapter corners so the canopy always feels a little       */
/*  alive, even before the guest starts scrolling.                      */
/* ------------------------------------------------------------------ */
function AmbientBird({
  variant = "finch",
  size = 26,
  flip = false,
  wingSpeed = 0.26,
  duration = 14,
  delay = 0,
  path,
  className = "",
}: {
  variant?: "parrot" | "hummingbird" | "finch";
  size?: number;
  flip?: boolean;
  wingSpeed?: number;
  duration?: number;
  delay?: number;
  /* keyframed drift, as percentages of the containing box */
  path: { x: number[]; y: number[] };
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return null;

  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute will-change-transform ${className}`}
      animate={{
        x: path.x.map((v) => `${v}%`),
        y: path.y.map((v) => `${v}%`),
        opacity: [0, 1, 1, 1, 0],
        rotate: flip ? [6, -4, 6] : [-6, 4, -6],
      }}
      transition={{ repeat: Infinity, duration, ease: "easeInOut", delay }}
    >
      <JungleBird
        variant={variant}
        size={size}
        flip={flip}
        wingSpeed={wingSpeed}
        className="drop-shadow-[0_4px_10px_rgba(16,48,31,0.2)]"
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  FlyingBird — one bird whose position is tied to page scroll.        */
/* ------------------------------------------------------------------ */
function FlyingBird({
  progress,
  config,
}: {
  progress: MotionValue<number>;
  config: (typeof SCROLL_BIRD_FLIGHTS)[number];
}) {
  const x = useTransform(
    progress,
    [config.start, config.end],
    [`${config.fromX}%`, `${config.toX}%`],
  );
  const y = useTransform(
    progress,
    [config.start, (config.start + config.end) / 2, config.end],
    [config.yPercent, config.yPercent - 3, config.yPercent + 2],
  );
  const opacity = useTransform(
    progress,
    [
      Math.max(0, config.start - 0.015),
      config.start + 0.02,
      config.end - 0.02,
      Math.min(1, config.end + 0.015),
    ],
    [0, 1, 1, 0],
  );
  const rotate = useTransform(
    progress,
    [config.start, config.end],
    [config.flip ? 8 : -8, config.flip ? -6 : 6],
  );

  return (
    <motion.div
      aria-hidden
      className="absolute left-0 will-change-transform hidden sm:block"
      style={{ x, top: `${config.yPercent}%`, opacity, rotate, zIndex: 6 }}
    >
      <JungleBird
        variant={config.variant}
        size={config.size}
        flip={config.flip}
        wingSpeed={config.wingSpeed}
        className="drop-shadow-[0_4px_10px_rgba(16,48,31,0.18)]"
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  ScrollBirdFlock — birds that glide across the card as guests scroll.  */
/* ------------------------------------------------------------------ */
function ScrollBirdFlock({ progress }: { progress: MotionValue<number> }) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[6] overflow-hidden"
    >
      {SCROLL_BIRD_FLIGHTS.map((flight, i) => (
        <FlyingBird key={i} progress={progress} config={flight} />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  NestBranch — curved vine branch with a woven nest for the RSVP.     */
/* ------------------------------------------------------------------ */
function NestBranch({ nestOpen = false }: { nestOpen?: boolean }) {
  return (
    <svg
      viewBox="0 0 400 120"
      className="mx-auto w-full max-w-md h-24 sm:h-28"
      fill="none"
      aria-hidden
    >
      <path
        d="M0 70 C80 40 160 90 200 55 C240 20 320 50 400 35"
        stroke="#5c9271"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M200 55 C195 75 205 95 200 105 C195 95 205 75 200 55"
        stroke="#3f7a56"
        strokeWidth="2"
        fill="#d7e6da"
        fillOpacity="0.5"
      />
      <motion.g
        initial={false}
        animate={nestOpen ? { scaleY: 0.35, y: 18, opacity: 0.4 } : { scaleY: 1, y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: LUX_EASE }}
        style={{ transformOrigin: "200px 80px" }}
      >
        <ellipse cx="200" cy="82" rx="34" ry="16" fill="#8b6914" fillOpacity="0.25" />
        <ellipse cx="200" cy="80" rx="30" ry="14" fill="#a07828" fillOpacity="0.35" />
        <path
          d="M172 78 C180 68 190 64 200 62 C210 64 220 68 228 78
             C220 88 210 92 200 94 C190 92 180 88 172 78 Z"
          fill="#c4a035"
          fillOpacity="0.45"
          stroke="#8b6914"
          strokeWidth="1.2"
        />
        {!nestOpen && (
          <>
            <ellipse cx="192" cy="78" rx="5" ry="6" fill="#f6faf7" fillOpacity="0.9" />
            <ellipse cx="208" cy="80" rx="4.5" ry="5.5" fill="#eef4ef" fillOpacity="0.85" />
          </>
        )}
      </motion.g>
      <FernFrond size={16} color="#5c9271" />
      <g transform="translate(320, 20)">
        <FernFrond size={14} color="#3f7a56" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  PerchingMessengerBird — sits on the nest until the guest opens it.  */
/* ------------------------------------------------------------------ */
function PerchingMessengerBird({ flyingAway = false }: { flyingAway?: boolean }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      className="absolute left-1/2 top-0 z-30 -translate-x-1/2"
      initial={false}
      animate={
        flyingAway && !shouldReduceMotion
          ? { y: -120, x: 80, opacity: 0, rotate: -18, scale: 0.7 }
          : { y: -8, x: 0, opacity: 1, rotate: 0, scale: 1 }
      }
      transition={{ duration: 1.1, ease: LUX_EASE }}
    >
      <JungleBird variant="parrot" size={44} wingSpeed={0.38} />
      <motion.div
        className="absolute -right-3 top-6 h-8 w-5 rounded-sm bg-[#f6ead8] border border-[#d4c4a8] shadow-sm"
        style={{ transform: "rotate(12deg)" }}
        animate={shouldReduceMotion ? {} : { y: [0, -2, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
      >
        <div className="mx-auto mt-1 h-0.5 w-3 rounded bg-[#c4a882]/60" />
        <div className="mx-auto mt-0.5 h-0.5 w-2 rounded bg-[#c4a882]/40" />
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  JungleCanopy — a layered tropical tree silhouette (trunk, buttress  */
/*  roots, hanging vines, rounded canopy lobes) standing in for the     */
/*  old pine-forest icons.                                              */
/* ------------------------------------------------------------------ */
function JungleCanopy({
  size = 110,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 220"
      width={size}
      height={size * 1.1}
      className={className}
      fill="none"
    >
      <path
        d="M100 220 L100 140"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M100 190 C 80 185 70 175 62 160"
        stroke="currentColor"
        strokeWidth="3"
        opacity="0.7"
      />
      <path
        d="M100 190 C 120 185 130 175 138 160"
        stroke="currentColor"
        strokeWidth="3"
        opacity="0.7"
      />
      <circle cx="100" cy="90" r="60" fill="currentColor" opacity="0.14" />
      <circle cx="55" cy="110" r="42" fill="currentColor" opacity="0.16" />
      <circle cx="145" cy="110" r="42" fill="currentColor" opacity="0.16" />
      <circle cx="100" cy="55" r="46" fill="currentColor" opacity="0.18" />
      <path
        d="M70 130 C 68 155 66 175 64 200"
        stroke="currentColor"
        strokeWidth="1.4"
        opacity="0.5"
      />
      <path
        d="M130 130 C 132 150 134 172 136 198"
        stroke="currentColor"
        strokeWidth="1.4"
        opacity="0.5"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  BotanicalDivider — a little garden of blooms and ferns on a resting */
/*  line, drawing itself and opening as it scrolls into view. Each      */
/*  instance cycles through the palette so the page reads like real     */
/*  rainforest understory rather than one repeated flower.              */
/* ------------------------------------------------------------------ */
function BotanicalDivider({ bg, variant = 0 }: { bg: string; variant?: number }) {
  const c1 = BLOOM_PALETTE[variant % BLOOM_PALETTE.length];
  const c2 = BLOOM_PALETTE[(variant + 2) % BLOOM_PALETTE.length];
  const c3 = BLOOM_PALETTE[(variant + 4) % BLOOM_PALETTE.length];

  return (
    <div className="relative py-10 sm:py-14 lg:py-16" style={{ backgroundColor: bg }}>
      <div className="mx-auto flex max-w-[280px] items-center justify-center gap-2.5 sm:max-w-md sm:gap-4">
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: LUX_EASE }}
          style={{ transformOrigin: "right center" }}
          className="h-px flex-1 bg-[#5c9271]/40"
        />
        <FernFrond flip />
        <BloomingFlower size={24} petal={c1.petal} center={c1.center} delay={0.05} />
        <BloomingFlower size={38} petal={c2.petal} center={c2.center} delay={0.15} />
        <BloomingFlower size={24} petal={c3.petal} center={c3.center} delay={0.25} />
        <FernFrond />
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: LUX_EASE }}
          style={{ transformOrigin: "left center" }}
          className="h-px flex-1 bg-[#5c9271]/40"
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  JourneyProgress — jungle-dusk scroll progress bar                  */
/* ------------------------------------------------------------------ */
function JourneyProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left bg-gradient-to-r from-[#3f7a56] via-[#10301f] to-[#e8c468]"
    />
  );
}

/* ------------------------------------------------------------------ */
/*  JungleBubbleButton — fixed floating music toggle. Rendered through  */
/*  a Portal directly into document.body so no ancestor's CSS           */
/*  `transform` (which Framer Motion adds to nearly every animated       */
/*  element on this page) can ever hijack its `position: fixed`          */
/*  containing block.                                                    */
/* ------------------------------------------------------------------ */
function JungleBubbleButton({
  isPlaying,
  onToggle,
}: {
  isPlaying: boolean;
  onToggle: () => void;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const button = (
    <motion.button
      onClick={onToggle}
      aria-label={isPlaying ? "Pause background music" : "Play background music"}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={
        shouldReduceMotion
          ? { opacity: 1, scale: 1 }
          : {
            opacity: 1,
            scale: 1,
            y: [-4, 4, -4],
          }
      }
      transition={{
        y: { repeat: Infinity, duration: 4.5, ease: "easeInOut" },
        opacity: { duration: 0.8, delay: 0.6 },
        scale: { duration: 0.8, delay: 0.6, type: "spring" },
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      style={{ position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 99999 }}
      className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full border border-[#d7e6da] bg-[#f2f8f4]/70 shadow-[inset_0_4px_10px_rgba(255,255,255,0.9),0_15px_35px_rgba(16,48,31,0.2)] backdrop-blur-xl overflow-hidden focus:outline-none"
    >
      <div className="absolute top-1 left-2 h-3 w-5 rounded-full bg-white/80 blur-[1px] rotate-[-25deg] pointer-events-none" />
      <div className="absolute bottom-1 right-2 h-1.5 w-2.5 rounded-full bg-white/50 blur-[1px] pointer-events-none" />

      {isPlaying && !shouldReduceMotion && (
        <motion.div
          animate={{ scale: [1, 1.7, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
          className="absolute inset-0 rounded-full border-2 border-[#3f7a56]/40 pointer-events-none"
        />
      )}

      {!isPlaying && !shouldReduceMotion && (
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-[#3f7a56]/25 pointer-events-none"
        />
      )}

      <div className="relative z-10 text-[#10301f] drop-shadow-sm">
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </div>
    </motion.button>
  );

  if (!mounted) return null;
  return createPortal(button, document.body);
}

/* ------------------------------------------------------------------ */
/*  GrowingVine — the signature botanical moment. A hand-drawn vine    */
/*  that draws itself in as the guest scrolls through the story, with  */
/*  leaves, blooms, and a couple of fireflies drifting alongside it.    */
/*  Desktop only.                                                        */
/* ------------------------------------------------------------------ */
function GrowingVine() {
  const vineRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: vineRef,
    offset: ["start start", "end end"],
  });

  const bloom1 = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);
  const bloom2 = useTransform(scrollYProgress, [0.27, 0.37], [0, 1]);
  const bloom3 = useTransform(scrollYProgress, [0.48, 0.58], [0, 1]);
  const bloom4 = useTransform(scrollYProgress, [0.69, 0.79], [0, 1]);
  const bloom5 = useTransform(scrollYProgress, [0.88, 0.98], [0, 1]);

  const leaf1 = useTransform(scrollYProgress, [0.0, 0.08], [0, 1]);
  const leaf2 = useTransform(scrollYProgress, [0.18, 0.26], [0, 1]);
  const leaf3 = useTransform(scrollYProgress, [0.39, 0.47], [0, 1]);
  const leaf4 = useTransform(scrollYProgress, [0.6, 0.68], [0, 1]);
  const leaf5 = useTransform(scrollYProgress, [0.8, 0.88], [0, 1]);

  if (shouldReduceMotion) return null;

  return (
    <div
      ref={vineRef}
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-2 z-10 hidden w-16 lg:block xl:left-6"
    >
      <svg
        viewBox="0 0 64 1000"
        preserveAspectRatio="none"
        className="h-full w-full overflow-visible"
      >
        <motion.path
          d="M32,0 C8,55 56,110 32,165 C8,220 56,275 32,330 C8,385 56,440 32,495 C8,550 56,605 32,660 C8,715 56,770 32,825 C8,880 56,935 32,1000"
          fill="none"
          stroke="#5c9271"
          strokeWidth="1.6"
          strokeLinecap="round"
          style={{ pathLength: scrollYProgress, opacity: 0.55 }}
        />

        <motion.ellipse
          cx="15"
          cy="58"
          rx="8"
          ry="4"
          fill="#5c9271"
          transform="rotate(-30 15 58)"
          style={{ opacity: leaf1 }}
        />
        <motion.ellipse
          cx="50"
          cy="195"
          rx="8"
          ry="4"
          fill="#5c9271"
          transform="rotate(25 50 195)"
          style={{ opacity: leaf2 }}
        />
        <motion.ellipse
          cx="14"
          cy="358"
          rx="8"
          ry="4"
          fill="#5c9271"
          transform="rotate(-20 14 358)"
          style={{ opacity: leaf3 }}
        />
        <motion.ellipse
          cx="50"
          cy="522"
          rx="8"
          ry="4"
          fill="#5c9271"
          transform="rotate(30 50 522)"
          style={{ opacity: leaf4 }}
        />
        <motion.ellipse
          cx="14"
          cy="688"
          rx="8"
          ry="4"
          fill="#5c9271"
          transform="rotate(-25 14 688)"
          style={{ opacity: leaf5 }}
        />
      </svg>

      <motion.div
        style={{ opacity: bloom1, scale: bloom1, top: "8%" }}
        className="absolute -left-2"
      >
        <MiniFlower size={26} petal={BLOOM_PALETTE[0].petal} center={BLOOM_PALETTE[0].center} />
      </motion.div>
      <motion.div
        style={{ opacity: bloom2, scale: bloom2, top: "29%" }}
        className="absolute left-6"
      >
        <MiniFlower size={22} petal={BLOOM_PALETTE[1].petal} center={BLOOM_PALETTE[1].center} />
      </motion.div>
      <motion.div
        style={{ opacity: bloom3, scale: bloom3, top: "50%" }}
        className="absolute -left-2"
      >
        <MiniFlower size={28} petal={BLOOM_PALETTE[2].petal} center={BLOOM_PALETTE[2].center} />
      </motion.div>
      <motion.div
        style={{ opacity: bloom4, scale: bloom4, top: "71%" }}
        className="absolute left-6"
      >
        <MiniFlower size={22} petal={BLOOM_PALETTE[3].petal} center={BLOOM_PALETTE[3].center} />
      </motion.div>
      <motion.div
        style={{ opacity: bloom5, scale: bloom5, top: "91%" }}
        className="absolute -left-2"
      >
        <MiniFlower size={26} petal={BLOOM_PALETTE[4].petal} center={BLOOM_PALETTE[4].center} />
      </motion.div>

      <Firefly className="left-3 top-[38%]" size={4} duration={8} delay={0.4} />
      <Firefly className="-left-1 top-[74%]" size={4} duration={9.5} delay={2.1} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  TrailingVineFlower — An animated vine growing down with a torch-    */
/*  ginger bloom, hung from the hero's canopy edge.                     */
/* ------------------------------------------------------------------ */
function TrailingVineFlower({ className = "", delay = 0 }: { className?: string, delay?: number }) {
  return (
    <motion.svg
      viewBox="0 0 100 250"
      width="100"
      height="250"
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
    >
      {/* The vine curving and growing downwards */}
      <motion.path
        d="M50,0 C20,60 80,120 50,190"
        fill="none"
        stroke="#5c9271" // Fern green stem
        strokeWidth="1.8"
        strokeLinecap="round"
        variants={{
          hidden: { pathLength: 0 },
          show: {
            pathLength: 1,
            transition: { duration: 2, ease: LUX_EASE, delay: delay }
          }
        }}
      />

      {/* Sprouting leaf 1 */}
      <motion.path
        d="M50,60 C70,50 80,70 50,75"
        fill="#5c9271"
        style={{ transformOrigin: "50px 60px" }}
        variants={{
          hidden: { scale: 0, opacity: 0 },
          show: { scale: 1, opacity: 1, transition: { duration: 0.6, delay: delay + 0.6 } }
        }}
      />

      {/* Sprouting leaf 2 */}
      <motion.path
        d="M62,120 C35,115 30,135 55,140"
        fill="#5c9271"
        style={{ transformOrigin: "62px 120px" }}
        variants={{
          hidden: { scale: 0, opacity: 0 },
          show: { scale: 1, opacity: 1, transition: { duration: 0.6, delay: delay + 1.2 } }
        }}
      />

      {/* The torch-ginger bloom opening at the tip */}
      <motion.g
        variants={{
          hidden: { scale: 0, opacity: 0, rotate: -30 },
          show: {
            scale: 1,
            opacity: 1,
            rotate: 0,
            transition: { duration: 1, ease: LUX_EASE, delay: delay + 1.8 }
          }
        }}
        style={{ transformOrigin: "50px 190px" }}
      >
        {/* 5 petals */}
        {[0, 72, 144, 216, 288].map((deg) => (
          <ellipse
            key={deg}
            cx="50"
            cy="178"
            rx="7"
            ry="15"
            fill="#c1493f" // Torch ginger petal
            fillOpacity="0.88"
            transform={`rotate(${deg} 50 190)`}
          />
        ))}
        {/* Flower center */}
        <circle cx="50" cy="190" r="6" fill="#fbe9df" />
      </motion.g>
    </motion.svg>
  );
}

export default function BotanicalGraceCard() {
  // Background music state & ref
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // NOTE: this path has no leading space — "/music/botanical-grace.mp3".
    // If your actual uploaded file really is named with a leading space
    // (" botanical-grace.mp3"), either rename the file to remove the
    // space, or swap this line for:
    //   const audioSrc = encodeURI("/music/ botanical-grace.mp3");
    const audioSrc = "/music/botanical-grace.mp3";
    const audio = new Audio(audioSrc);
    audio.loop = true;
    audio.volume = 0.6;
    audio.preload = "auto";
    audioRef.current = audio;

    const handleError = () => {
      console.error(
        "Background music failed to load. Check that the file exists at",
        audioSrc,
        "inside your /public folder (path is case-sensitive)."
      );
    };
    audio.addEventListener("error", handleError);

    const startMusic = () => {
      if (audio.paused) {
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.log("Browser blocked autoplay:", err));
      }

      // Remove the listeners once the music starts so it doesn't keep firing
      ["click", "scroll", "touchstart", "mousemove"].forEach((evt) =>
        document.removeEventListener(evt, startMusic)
      );
    };

    // Listen for the first user interaction to bypass the browser's
    // autoplay-with-sound block.
    ["click", "scroll", "touchstart", "mousemove"].forEach((evt) =>
      document.addEventListener(evt, startMusic, { once: true })
    );

    return () => {
      audio.pause();
      audio.removeEventListener("error", handleError);
      audioRef.current = null;
      ["click", "scroll", "touchstart", "mousemove"].forEach((evt) =>
        document.removeEventListener(evt, startMusic)
      );
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((err) =>
          console.log("Playback failed:", err)
        );
      }
      setIsPlaying(!isPlaying);
    }
  };

  const targetDate = useMemo(
    () => new Date("2026-10-24T00:00:00").getTime(),
    [],
  );

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const distance = targetDate - Date.now();

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    updateCountdown();
    const interval = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(interval);
  }, [targetDate]);

  const countItems = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ];

  const shouldReduceMotion = useReducedMotion();

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(heroProgress, [0, 1], ["0%", "26%"]);
  const heroImageScale = useTransform(heroProgress, [0, 1], [1.05, 1.2]);
  const heroTextY = useTransform(heroProgress, [0, 1], ["0%", "38%"]);
  const heroTextOpacity = useTransform(heroProgress, [0, 0.75], [1, 0]);
  const heroOverlay = useTransform(heroProgress, [0, 1], [0.4, 0.8]);

  const pageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: pageProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });

  const [rsvpStep, setRsvpStep] = useState<"intro" | "form" | "success">("intro");
  const [rsvpBirdFlying, setRsvpBirdFlying] = useState(false);

  const openNest = () => {
    setRsvpBirdFlying(true);
    window.setTimeout(() => setRsvpStep("form"), 650);
  };

  // Ambient jungle motion 🍃
  const fallingLeafA: Variants = shouldReduceMotion
    ? {}
    : {
      animate: {
        y: [-20, 120],
        x: [-15, 15, -15],
        rotate: [0, 180, 360],
        opacity: [0, 0.8, 0],
        transition: { repeat: Infinity, duration: 12, ease: "linear" },
      }
    };

  const fallingLeafB: Variants = shouldReduceMotion
    ? {}
    : {
      animate: {
        y: [-30, 100],
        x: [10, -20, 10],
        rotate: [0, -180, -360],
        opacity: [0, 0.6, 0],
        transition: { repeat: Infinity, duration: 15, ease: "linear", delay: 2 },
      }
    };

  // Drifting bloom petals, paired with the leaves for a fuller rainforest feel
  const fallingPetalA: Variants = shouldReduceMotion
    ? {}
    : {
      animate: {
        y: [-15, 130],
        x: [10, -18, 10],
        rotate: [0, 140, 280],
        opacity: [0, 0.75, 0],
        transition: { repeat: Infinity, duration: 13, ease: "linear", delay: 1 },
      },
    };



  const fallingPetalB: Variants = shouldReduceMotion
    ? {}
    : {
      animate: {
        y: [-25, 110],
        x: [-8, 18, -8],
        rotate: [0, -150, -300],
        opacity: [0, 0.65, 0],
        transition: { repeat: Infinity, duration: 16, ease: "linear", delay: 3.2 },
      },
    };

  const swayingBranch: Variants = shouldReduceMotion
    ? {}
    : {
      animate: {
        rotate: [-3, 3, -3],
        transition: { repeat: Infinity, duration: 8, ease: "easeInOut" },
      }
    };

  const glowPulse: Variants = shouldReduceMotion
    ? {}
    : {
      animate: {
        opacity: [0.08, 0.2, 0.08],
        transition: { repeat: Infinity, duration: 9, ease: "easeInOut" },
      }
    };

  const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3f7a56]";

  return (
    <section className="min-h-screen bg-[#eef4ef] text-[#1b2b20] overflow-hidden">
      <JourneyProgress />
      <JungleBubbleButton isPlaying={isPlaying} onToggle={toggleMusic} />

      {/* 🎬 HERO — cinematic opening sequence 🎬 */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden">
        <motion.div
          initial={{ opacity: 0, filter: "blur(16px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 2.4, ease: LUX_EASE }}
          className="absolute inset-0"
        >
          <motion.div
            style={{ y: heroImageY, scale: heroImageScale }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#10301f]/40 via-transparent to-[#eef4ef]" />
            <motion.div
              style={{ opacity: heroOverlay }}
              className="absolute inset-0 z-10 bg-[#08150e]"
            />
            {/* EXACT IMAGE NAME 1 */}
            <Image
              src="/images/hero/botanical-grace 1.jpg"
              alt="Rainforest wedding hero background"
              fill
              priority
              className="object-cover object-center opacity-90"
              sizes="100vw"
            />
          </motion.div>
        </motion.div>

        {/* Ambient firefly glow */}
        <motion.div
          variants={glowPulse}
          animate="animate"
          className="absolute left-1/2 top-1/3 z-10 h-[300px] w-[300px] sm:h-[420px] sm:w-[420px] -translate-x-1/2 rounded-full bg-[#f0e2ae] blur-[120px] pointer-events-none"
        />

        {/* 🌿 TRAILING VINES HANGING FROM THE TOP 🌿 */}
        <div className="absolute top-0 left-4 sm:left-[10%] z-20 pointer-events-none opacity-90">
          <TrailingVineFlower delay={0.5} />
        </div>

        <div className="absolute top-0 right-4 sm:right-[15%] z-20 pointer-events-none opacity-80" style={{ transform: "scaleX(-1)" }}>
          <TrailingVineFlower delay={1.2} />
        </div>

        {/* Fireflies drifting through the canopy */}
        <Firefly className="top-[20%] left-[12%] z-10 hidden sm:block" size={5} duration={7.5} delay={0.6} />
        <Firefly className="top-[14%] right-[20%] z-10 hidden sm:block" size={4} duration={9} delay={2.4} />
        <Firefly className="top-[38%] left-[46%] z-10 hidden sm:block" size={4} duration={8.2} delay={1.3} />

        {/* A couple of birds looping lazily through the hero, here and there */}
        <AmbientBird
          variant="parrot"
          size={34}
          duration={16}
          delay={0.8}
          className="top-[10%] left-0 z-10 hidden sm:block"
          path={{ x: [-8, 55, 118], y: [0, -6, 4] }}
        />
        <AmbientBird
          variant="hummingbird"
          size={20}
          flip
          duration={11}
          delay={3.4}
          wingSpeed={0.15}
          className="top-[52%] right-0 z-10 hidden sm:block"
          path={{ x: [10, -60, -124], y: [0, 8, -3] }}
        />

        {/* Falling leaves + petals instead of drifting clouds */}
        <motion.div
          variants={fallingLeafA}
          animate="animate"
          className="absolute top-20 left-[15%] z-10 text-white/40 pointer-events-none hidden sm:block"
        >
          <Leaf size={38} strokeWidth={0.8} />
        </motion.div>
        <motion.div
          variants={fallingLeafB}
          animate="animate"
          className="absolute top-10 right-[20%] z-10 text-white/30 pointer-events-none hidden sm:block"
        >
          <Leaf size={28} strokeWidth={0.8} />
        </motion.div>
        <motion.div
          variants={fallingPetalA}
          animate="animate"
          className="absolute top-32 left-[45%] z-10 pointer-events-none hidden sm:block"
        >
          <Petal size={20} color="#e7c9da" />
        </motion.div>
        <motion.div
          variants={fallingPetalB}
          animate="animate"
          className="absolute top-16 right-[8%] z-10 pointer-events-none hidden sm:block"
        >
          <Petal size={16} color="#f0c9b0" />
        </motion.div>

        {/* Thin botanical corner flourishes framing the hero */}
        <div className="absolute bottom-10 left-6 z-10 hidden text-white/25 sm:block lg:left-10">
          <CornerFlourish />
        </div>
        <div
          className="absolute bottom-10 right-6 z-10 hidden text-white/25 sm:block lg:right-10"
          style={{ transform: "scaleX(-1)" }}
        >
          <CornerFlourish />
        </div>

        <motion.div
          style={{ y: heroTextY, opacity: heroTextOpacity }}
          className="relative z-20 flex min-h-screen flex-col"
        >
          <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.4, delay: 1, ease: LUX_EASE }}
            className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 text-white/90 sm:px-6 sm:py-6 lg:px-8"
          >
            <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] font-semibold drop-shadow-sm">
              David &amp; Roshel
            </p>
            <div className="flex items-center gap-4 sm:gap-6 text-[9px] sm:text-[10px] uppercase tracking-[0.3em] font-semibold">
              <a
                href="#couple"
                className={`rounded transition-colors duration-500 hover:text-white ${focusRing}`}
              >
                Couple
              </a>
              <a
                href="#rsvp"
                className={`rounded transition-colors duration-500 hover:text-white ${focusRing}`}
              >
                RSVP
              </a>
            </div>
          </motion.header>

          <div className="flex flex-1 items-center justify-center px-4 pb-16 pt-6 sm:px-6 lg:px-8 relative">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="text-center text-white relative z-10"
            >
              <motion.p
                variants={riseIn}
                className="mx-auto mb-6 w-fit text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-white/80 drop-shadow-md"
              >
                We&apos;re getting married
              </motion.p>

              <div className="font-serif italic leading-[1.05] text-white drop-shadow-md">
                <LeafReveal
                  as="div"
                  text="Roshel"
                  className="text-5xl sm:text-7xl lg:text-8xl"
                  delay={0.4}
                />
                <LeafReveal
                  as="div"
                  text="&"
                  className="not-italic font-light text-3xl sm:text-4xl text-[#9fc9ab] my-2"
                  delay={0.65}
                />
                <LeafReveal
                  as="div"
                  text="David"
                  className="text-5xl sm:text-7xl lg:text-8xl"
                  delay={0.8}
                />
              </div>

              <motion.p
                variants={riseIn}
                className="mt-8 text-base font-medium uppercase tracking-[0.2em] sm:text-xl sm:tracking-[0.25em] text-white/90 drop-shadow-md"
              >
                Saturday, October 24, 2026
              </motion.p>

              <motion.div
                variants={riseIn}
                className="mt-14 flex flex-col items-center"
              >
                <p className="text-[9px] uppercase tracking-[0.4em] text-white/60 mb-2">
                  Follow the trail
                </p>
                <motion.div
                  animate={
                    shouldReduceMotion ? {} : { y: [0, 8, 0] }
                  }
                  transition={{
                    repeat: Infinity,
                    duration: 2.6,
                    ease: "easeInOut",
                  }}
                  className="text-2xl text-white/60"
                >
                  ↓
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

      </section>

      {/* The vine grows alongside every chapter from here to the RSVP */}
      <div ref={pageRef} className="relative">
        <ScrollBirdFlock progress={pageProgress} />
        <GrowingVine />
        <BotanicalDivider bg="#ffffff" variant={0} />

        {/* ✨ CHAPTER ONE — THE HAPPY COUPLE ✨ */}
        <section
          id="couple"
          className="relative bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-[#e1ede3] rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.15 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8 }}
            className="absolute bottom-16 left-8 text-[#3f7a56] pointer-events-none hidden lg:block origin-bottom"
          >
            <motion.div variants={swayingBranch} animate="animate">
              <JungleCanopy size={130} />
            </motion.div>
          </motion.div>

          <div className="absolute top-10 right-10 hidden lg:block opacity-90">
            <BloomingFlower size={64} petal={BLOOM_PALETTE[0].petal} center={BLOOM_PALETTE[0].center} />
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-120px" }}
            variants={staggerContainer}
            className="mx-auto max-w-6xl relative z-10"
          >
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
              <motion.div
                variants={riseIn}
                className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_20px_50px_rgba(16,48,31,0.14)]">
                  {/* EXACT IMAGE NAME 2 */}
                  <Image
                    src="/images/hero/botanical-grace 2.jpg"
                    alt="David and Roshel"
                    fill
                    className="object-cover object-center transition-transform duration-[1400ms] ease-out hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                <motion.div
                  animate={
                    shouldReduceMotion ? {} : { y: [-5, 5, -5] }
                  }
                  transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
                  className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 md:-right-12 rounded-full bg-[#f2f8f4] p-5 sm:p-6 shadow-xl border border-white"
                >
                  <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full border border-[#3f7a56]/40 flex items-center justify-center">
                    <Sprout className="text-[#3f7a56]" size={28} />
                  </div>
                </motion.div>
              </motion.div>

              <div className="text-center lg:text-left lg:pl-6">
                <p className="text-[10px] uppercase tracking-[0.4em] text-[#3f7a56] font-semibold mb-3">
                  Chapter One
                </p>
                <LeafReveal
                  as="h2"
                  text="The Happy Couple"
                  className="font-serif text-3xl italic text-[#10301f] sm:text-4xl lg:text-6xl mb-6"
                />
                <motion.p
                  variants={riseIn}
                  className="text-sm sm:text-base leading-relaxed text-[#1b2b20]/80 mb-8"
                >
                  From our first walk beneath the rustling canopy to building a life
                  deeply rooted in love, every moment has grown into something beautiful.
                  We can&apos;t wait to celebrate our story surrounded by the jungle and
                  our favorite people.
                </motion.p>

                <motion.div
                  variants={riseIn}
                  className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 sm:gap-8 text-[#10301f]"
                >
                  <div className="text-center lg:text-left">
                    <div className="font-serif italic text-2xl sm:text-3xl">
                      David
                    </div>
                    <div className="mt-2 text-[10px] uppercase tracking-[0.35em] text-[#3f7a56]">
                      The Groom
                    </div>
                  </div>
                  <div className="text-[#9fc9ab] text-2xl font-light">|</div>
                  <div className="text-center lg:text-left">
                    <div className="font-serif italic text-2xl sm:text-3xl">
                      Roshel
                    </div>
                    <div className="mt-2 text-[10px] uppercase tracking-[0.35em] text-[#3f7a56]">
                      The Bride
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

        </section>
        <BotanicalDivider bg="#eef4ef" variant={1} />

        {/* 📖 CHAPTER TWO — OUR LOVE STORY 📖 */}
        <section className="relative bg-[#eef4ef] px-4 py-20 sm:px-6 sm:py-28 lg:px-8 border-y border-[#d7e6da] overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.07 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#3f7a56] pointer-events-none origin-bottom"
          >
            <motion.div variants={swayingBranch} animate="animate">
              <JungleCanopy size={280} className="sm:hidden" />
              <JungleCanopy size={420} className="hidden sm:block" />
            </motion.div>
          </motion.div>

          <div className="absolute top-14 left-10 hidden lg:block opacity-80">
            <BloomingFlower size={48} petal={BLOOM_PALETTE[1].petal} center={BLOOM_PALETTE[1].center} delay={0.1} />
          </div>
          <div className="absolute bottom-16 right-12 hidden lg:block opacity-80">
            <BloomingFlower size={56} petal={BLOOM_PALETTE[2].petal} center={BLOOM_PALETTE[2].center} delay={0.2} />
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-120px" }}
            variants={staggerContainer}
            className="relative mx-auto max-w-4xl text-center z-10"
          >
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#3f7a56] font-semibold mb-3">
              Chapter Two
            </p>
            <LeafReveal
              as="h2"
              text="Our Love Story"
              className="font-serif text-3xl italic text-[#10301f] sm:text-4xl lg:text-5xl"
            />
            <motion.p
              variants={riseIn}
              className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#1b2b20]/80"
            >
              Like a seed planted in rich rainforest soil, our friendship blossomed
              into a beautiful love. Now we&apos;re ready to grow into our forever,
              side by side.
            </motion.p>

            <motion.div
              variants={riseIn}
              className="mx-auto mt-12 max-w-3xl rounded-[2rem] sm:rounded-[2.5rem] border border-[#d7e6da] bg-white p-8 sm:p-10 shadow-[0_20px_50px_rgba(16,48,31,0.06)]"
            >
              <p className="text-sm leading-loose text-[#10301f] sm:text-base font-medium">
                From our first glance to our shared dreams, every passing season
                brought us closer. We invite you to be part of this
                unforgettable day, where love, family, and joy come together
                beneath the jungle canopy.
              </p>
            </motion.div>
          </motion.div>

        </section>
        <BotanicalDivider bg="#e1ede3" variant={2} />

        {/* ⏳ THE COUNTDOWN ⏳ */}
        <section
          id="countdown"
          className="relative bg-[#e1ede3] px-4 py-20 sm:px-6 sm:py-28 lg:px-8 overflow-hidden"
        >
          <div className="absolute top-8 right-12 hidden md:block opacity-80">
            <BloomingFlower size={72} petal={BLOOM_PALETTE[3].petal} center={BLOOM_PALETTE[3].center} />
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="relative mx-auto max-w-6xl text-center z-10"
          >
            <LeafReveal
              as="p"
              text="Counting Down to Forever"
              className="font-serif text-2xl italic text-[#10301f] sm:text-4xl lg:text-5xl mb-3"
            />
            <motion.p
              variants={riseIn}
              className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#3f7a56] font-semibold"
            >
              See you beneath the canopy
            </motion.p>

            <motion.div
              variants={staggerContainer}
              className="mt-12 grid grid-cols-2 gap-3 sm:gap-6 md:gap-8 md:grid-cols-4"
            >
              {countItems.map((item) => (
                <motion.div
                  key={item.label}
                  variants={riseIn}
                  whileHover={{ y: -4, scale: 1.015 }}
                  transition={{ type: "spring", stiffness: 220, damping: 20 }}
                  className="rounded-2xl sm:rounded-3xl border border-white/90 bg-white/70 backdrop-blur-xl px-3 py-7 sm:px-4 sm:py-10 shadow-[0_15px_35px_rgba(16,48,31,0.08)]"
                >
                  <div className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#3f7a56] drop-shadow-sm">
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <div className="mt-3 sm:mt-4 text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.35em] text-[#1b2b20] font-medium">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

        </section>
        <BotanicalDivider bg="#ffffff" variant={3} />

        {/* 🗺️ CHAPTER THREE — WEDDING DETAILS 🗺️ */}
        <section className="relative bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#e1ede3] rounded-full blur-3xl opacity-80 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#e6f2ea] rounded-full blur-3xl opacity-70 translate-x-1/3 translate-y-1/3 pointer-events-none" />

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-120px" }}
            variants={staggerContainer}
            className="relative mx-auto max-w-6xl z-10"
          >
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#3f7a56] font-semibold mb-3">
                Chapter Three
              </p>
              <LeafReveal
                as="h2"
                text="Wedding Details"
                className="font-serif text-3xl italic text-[#10301f] sm:text-4xl lg:text-5xl"
              />
              <motion.p
                variants={riseIn}
                className="mt-4 text-[10px] uppercase tracking-[0.3em] text-[#3f7a56] font-semibold"
              >
                All the important information you need to celebrate with us
              </motion.p>
            </div>

            <div className="mt-14 grid gap-6 sm:gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
              <motion.div
                variants={riseIn}
                className="rounded-[2.5rem] sm:rounded-[3rem] border border-[#d7e6da] bg-[#f2f8f4]/80 backdrop-blur-2xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(16,48,31,0.08)] h-full flex flex-col justify-center relative overflow-hidden"
              >
                <div className="absolute -bottom-10 -right-10 text-[#3f7a56]/10 pointer-events-none">
                  <MapPin size={220} strokeWidth={1} />
                </div>

                <div className="relative z-10 space-y-7 sm:space-y-8 text-sm text-[#1b2b20]">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.35em] text-[#3f7a56] font-bold">
                      Ceremony
                    </div>
                    <div className="mt-2 font-serif text-2xl sm:text-3xl text-[#10301f]">
                      4:00 PM
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.35em] text-[#3f7a56] font-bold">
                      Venue
                    </div>
                    <div className="mt-2 font-serif text-2xl sm:text-3xl text-[#10301f]">
                      The Emerald Canopy Estate
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.35em] text-[#3f7a56] font-bold">
                      Dress Code
                    </div>
                    <div className="mt-2 font-serif text-2xl sm:text-3xl text-[#10301f]">
                      Tropical Elegance / Semi-Formal
                    </div>
                  </div>
                </div>

                <div className="relative z-10 mt-10 sm:mt-12 flex justify-start">
                  <button
                    className={`rounded-2xl bg-[#10301f] px-7 py-3.5 sm:px-8 sm:py-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-white shadow-xl shadow-[#10301f]/20 transition-all duration-500 hover:bg-[#0a1f14] hover:-translate-y-1 ${focusRing}`}
                  >
                    Map Directions
                  </button>
                </div>
              </motion.div>

              <motion.div
                variants={riseIn}
                className="overflow-hidden rounded-[2.5rem] sm:rounded-[3rem] border border-[#d7e6da] shadow-[0_20px_50px_rgba(16,48,31,0.1)] h-full min-h-[320px] sm:min-h-[400px]"
              >
                <div className="relative h-full w-full">
                  {/* EXACT IMAGE NAME 3 - Note the .jpeg extension! */}
                  <Image
                    src="/images/hero/botanical-grace 3.jpeg"
                    alt="Jungle wedding venue"
                    fill
                    className="object-cover object-center transition-transform duration-[1400ms] ease-out hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

        </section>
        <BotanicalDivider bg="#e1ede3" variant={4} />

        {/* ⏱️ CHAPTER FOUR — WEDDING DAY TIMELINE ⏱️ */}
        <section className="relative bg-[#e1ede3] px-4 py-20 sm:px-6 sm:py-28 lg:px-8 border-y border-white overflow-hidden">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-120px" }}
            variants={staggerContainer}
            className="mx-auto max-w-4xl text-center relative z-10"
          >
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#3f7a56] font-semibold mb-3">
              Chapter Four
            </p>
            <LeafReveal
              as="h2"
              text="Wedding Day Timeline"
              className="font-serif text-3xl italic text-[#10301f] sm:text-4xl lg:text-5xl"
            />

            <div className="mx-auto mt-14 max-w-2xl space-y-10 sm:space-y-12 text-left relative before:absolute before:inset-0 before:ml-8 sm:before:ml-10 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#3f7a56]/50 before:to-transparent">
              {[
                ["04 PM", "The Vows", "Beneath the great banyan tree"],
                ["05 PM", "Cocktail Hour", "Drinks, mingling, and jungle trail walks"],
                ["07 PM", "Reception", "Dinner, speeches, and celebration"],
                ["09 PM", "Under the Stars", "Music, dancing, and firefly light"],
              ].map(([time, title, note]) => (
                <motion.div
                  key={title}
                  variants={riseIn}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                >
                  <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white bg-[#eef4ef] text-[#3f7a56] shadow-lg shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em]">
                      {time}
                    </span>
                  </div>
                  <div className="w-full rounded-[1.5rem] sm:rounded-[2rem] border border-white bg-white/80 p-5 sm:p-6 shadow-sm md:w-[45%] md:group-odd:text-right">
                    <div className="font-serif text-xl sm:text-2xl italic text-[#10301f]">
                      {title}
                    </div>
                    <div className="mt-2 text-sm font-medium text-[#1b2b20]/80">
                      {note}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </section>
        <BotanicalDivider bg="#eef4ef" variant={5} />

        {/* 🕊️ A NOTE TO OUR LOVED ONES 🕊️ */}
        <section className="relative bg-[#eef4ef] px-4 py-20 sm:px-6 sm:py-28 lg:px-8 overflow-hidden">
          <motion.div
            variants={glowPulse}
            animate="animate"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[220px] w-[220px] sm:h-[300px] sm:w-[300px] rounded-full bg-[#f0e2ae] blur-[110px] pointer-events-none"
          />

          <Firefly className="left-[30%] top-[30%]" size={4} duration={8} delay={0.3} />
          <Firefly className="right-[28%] top-[62%]" size={4} duration={9.4} delay={1.8} />

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-120px" }}
            variants={staggerContainer}
            className="relative mx-auto max-w-4xl text-center z-10"
          >
            <div className="mb-4 flex justify-center opacity-90">
              <BloomingFlower size={44} petal={BLOOM_PALETTE[5].petal} center="#fff6df" />
            </div>
            <LeafReveal
              as="h2"
              text="A Note to Our Loved Ones"
              className="font-serif text-3xl italic text-[#10301f] sm:text-4xl lg:text-5xl"
            />
            <motion.div
              variants={riseIn}
              className="mx-auto mt-10 max-w-3xl rounded-[2rem] sm:rounded-[2.5rem] border border-[#d7e6da] bg-white p-8 sm:p-10 shadow-[0_20px_50px_rgba(16,48,31,0.04)]"
            >
              <p className="text-sm leading-loose text-[#1b2b20] font-medium">
                Your presence will make our day complete. Thank you for being a
                part of our journey and for sharing in the joy of our
                celebration.
              </p>
            </motion.div>
          </motion.div>

        </section>
        <BotanicalDivider bg="#f6faf7" variant={0} />

        {/* 🕊️ RSVP — SEND THE MESSENGER BIRD 🕊️ */}
        <section
          id="rsvp"
          className="relative bg-[#f6faf7] px-4 py-20 sm:px-6 sm:py-28 lg:px-8 border-t border-[#d7e6da] overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.16 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8 }}
            className="absolute -top-8 -left-10 pointer-events-none origin-top-left"
          >
            <motion.div variants={swayingBranch} animate="animate">
              <MonsteraLeaf size={140} color="#3f7a56" className="-rotate-[18deg]" />
            </motion.div>
          </motion.div>

          <div className="absolute top-10 right-10 hidden lg:block opacity-90">
            <BloomingFlower size={56} petal={BLOOM_PALETTE[4].petal} center={BLOOM_PALETTE[4].center} />
          </div>

          <Firefly className="left-[8%] top-[20%]" size={5} duration={7.8} delay={0.4} />
          <Firefly className="right-[10%] top-[68%]" size={4} duration={9.2} delay={1.6} />
          <Firefly className="left-[20%] top-[75%]" size={4} duration={8.6} delay={2.6} />

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-120px" }}
            variants={staggerContainer}
            className="relative mx-auto max-w-2xl text-center z-10"
          >
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#3f7a56] font-semibold mb-3">
              Send Word Back
            </p>
            <LeafReveal
              as="h2"
              text="A Messenger Awaits"
              className="font-serif text-3xl italic text-[#10301f] sm:text-5xl lg:text-6xl"
            />
            <motion.p variants={riseIn} className="mt-4 text-sm text-[#1b2b20]/70">
              Our messenger bird is perched and ready to carry your reply. 🕊️
            </motion.p>

            {/* The nest sits just above the card — the bird waits here    */}
            {/* until the guest sends it off with their reply.              */}
            <motion.div variants={riseIn} className="relative mx-auto mt-10 max-w-md">
              <NestBranch nestOpen={rsvpStep !== "intro"} />
              <PerchingMessengerBird flyingAway={rsvpBirdFlying} />
            </motion.div>

            <motion.div
              variants={riseIn}
              className="relative mx-auto -mt-2 rounded-[2rem] sm:rounded-[2.5rem] border border-[#d7e6da] bg-white p-8 sm:p-12 shadow-[0_30px_60px_rgba(16,48,31,0.1)] text-left overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {rsvpStep === "intro" && (
                  <motion.div
                    key="intro"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{
                      opacity: 0,
                      y: -24,
                      transition: { duration: 0.5, ease: LUX_EASE },
                    }}
                    transition={{ duration: 0.9, ease: LUX_EASE }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#3f7a56]/30 bg-[#f2f8f4] text-[#3f7a56]">
                      <Sprout size={26} strokeWidth={1.4} />
                    </div>
                    <p className="font-serif text-2xl italic text-[#10301f]">
                      Ready When You Are
                    </p>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#1b2b20]/70">
                      Send our messenger off with your reply and the nest
                      will open to your invitation.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={openNest}
                      className={`mt-8 flex items-center gap-2 rounded-2xl bg-[#10301f] px-8 py-4 text-[11px] font-semibold tracking-widest uppercase text-white shadow-xl shadow-[#10301f]/20 transition-colors duration-500 hover:bg-[#0a1f14] ${focusRing}`}
                    >
                      Send the Bird
                      <ArrowRight size={14} />
                    </motion.button>
                  </motion.div>
                )}

                {rsvpStep === "form" && (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{
                      opacity: 0,
                      y: -24,
                      transition: { duration: 0.5, ease: LUX_EASE },
                    }}
                    transition={{ duration: 0.9, ease: LUX_EASE }}
                    onSubmit={(e) => {
                      e.preventDefault();
                      setRsvpStep("success");
                    }}
                    className="grid gap-5"
                  >
                    <input
                      type="text"
                      placeholder="Your name"
                      className={`rounded-2xl border border-[#d7e6da] bg-[#f6faf7] px-5 py-4 text-sm outline-none focus:border-[#3f7a56] focus:ring-1 focus:ring-[#3f7a56] transition-colors duration-300 ${focusRing}`}
                    />
                    <div className="grid gap-5 sm:grid-cols-2">
                      <select
                        className={`rounded-2xl border border-[#d7e6da] bg-[#f6faf7] px-5 py-4 text-sm outline-none focus:border-[#3f7a56] focus:ring-1 focus:ring-[#3f7a56] text-[#1b2b20] transition-colors duration-300 cursor-pointer ${focusRing}`}
                      >
                        <option>Will you attend?</option>
                        <option>Joyfully Accept 🌿</option>
                        <option>Regretfully Decline 🍃</option>
                      </select>
                      <input
                        type="number"
                        placeholder="Number of guests"
                        className={`rounded-2xl border border-[#d7e6da] bg-[#f6faf7] px-5 py-4 text-sm outline-none focus:border-[#3f7a56] focus:ring-1 focus:ring-[#3f7a56] transition-colors duration-300 ${focusRing}`}
                      />
                    </div>
                    <textarea
                      rows={4}
                      placeholder="Leave a message for the couple..."
                      className={`rounded-2xl border border-[#d7e6da] bg-[#f6faf7] px-5 py-4 text-sm outline-none focus:border-[#3f7a56] focus:ring-1 focus:ring-[#3f7a56] transition-colors duration-300 resize-none ${focusRing}`}
                    />
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`mt-4 rounded-2xl bg-[#10301f] px-6 py-4 text-[11px] font-semibold tracking-widest uppercase text-white shadow-xl shadow-[#10301f]/20 transition-colors duration-500 hover:bg-[#0a1f14] ${focusRing}`}
                    >
                      Send RSVP
                    </motion.button>
                  </motion.form>
                )}

                {rsvpStep === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: LUX_EASE }}
                    className="flex flex-col items-center text-center py-4"
                  >
                    <div className="relative mb-6 flex h-16 w-16 items-center justify-center">
                      {/* A small burst of leaves and fireflies celebrates the RSVP */}
                      <div className="pointer-events-none absolute inset-0">
                        {PETAL_BURST_ANGLES.map((deg, i) => {
                          const rad = (deg * Math.PI) / 180;
                          const dx = Math.cos(rad) * 42;
                          const dy = Math.sin(rad) * 42;
                          return (
                            <motion.span
                              key={deg}
                              className="absolute left-1/2 top-1/2"
                              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                              animate={
                                shouldReduceMotion
                                  ? { opacity: 0 }
                                  : { opacity: [0, 1, 0], scale: [0, 1, 0.7], x: dx, y: dy }
                              }
                              transition={{
                                duration: 1.3,
                                ease: LUX_EASE,
                                delay: 0.15 + i * 0.03,
                              }}
                            >
                              {i % 2 === 0 ? (
                                <Petal size={14} color="#5c9271" />
                              ) : (
                                <span
                                  className="block h-2.5 w-2.5 rounded-full"
                                  style={{
                                    background: "#e8c468",
                                    boxShadow: "0 0 6px 2px rgba(232,196,104,0.6)",
                                  }}
                                />
                              )}
                            </motion.span>
                          );
                        })}
                      </div>

                      <motion.div
                        animate={
                          shouldReduceMotion ? {} : { scale: [1, 1.12, 1] }
                        }
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                        className="flex h-16 w-16 items-center justify-center rounded-full border border-[#3f7a56]/30 bg-[#f2f8f4] text-[#3f7a56]"
                      >
                        <Heart size={26} strokeWidth={1.4} />
                      </motion.div>
                    </div>
                    <p className="font-serif text-2xl italic text-[#10301f]">
                      Your Bird Has Taken Flight
                    </p>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#1b2b20]/70">
                      Your reply is on its way to us. We&apos;ll keep a
                      lantern lit among the leaves until October 24th.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </section>

        {/* Footer Buffer */}
        <div className="h-10 sm:h-14 bg-[#f6faf7]" />
      </div>
    </section>
  );
}