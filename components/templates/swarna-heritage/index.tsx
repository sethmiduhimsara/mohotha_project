"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SwarnaHeritageCard from "./swarnaHeritageCard";

/**
 * Edit these to match your couple + date.
 * The medallion shows the initials automatically (e.g. "R & S").
 */
const GROOM_NAME = "Rahul";
const BRIDE_NAME = "Soniya";
const WEDDING_DATE = "12TH DEC 2026";

const PALETTE = {
  goldLine: "rgba(184,138,47,0.38)",
  gold: "#b8862f",
  goldDeep: "#9a7b39",
  blush: "#e7b4bc",
  blushDeep: "#d98fa5",
};

type Phase = "closed" | "opening" | "open";

/** One symmetric filigree spray, reused (and rotated) in all four corners. */
function OrnamentSpray({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 190" className={className} xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(60,172)">
        <path
          d="M0,0 C-32,-40 -30,-110 0,-150 C30,-110 32,-40 0,0 Z"
          transform="rotate(-27)"
          fill={PALETTE.blush}
          fillOpacity={0.5}
          stroke={PALETTE.gold}
          strokeOpacity={0.55}
          strokeWidth={1}
        />
        <path
          d="M0,0 C-23,-46 -21,-120 0,-162 C21,-120 23,-46 0,0 Z"
          fill={PALETTE.blushDeep}
          fillOpacity={0.6}
          stroke={PALETTE.gold}
          strokeOpacity={0.6}
          strokeWidth={1}
        />
        <path
          d="M0,0 C-32,-40 -30,-110 0,-150 C30,-110 32,-40 0,0 Z"
          transform="rotate(27)"
          fill={PALETTE.blush}
          fillOpacity={0.5}
          stroke={PALETTE.gold}
          strokeOpacity={0.55}
          strokeWidth={1}
        />
        <circle cx="0" cy="-8" r="7.5" fill="#fff8ec" stroke={PALETTE.gold} strokeWidth={1} />
        <circle cx="0" cy="-8" r="2.4" fill={PALETTE.gold} />
      </g>
    </svg>
  );
}

/** Tiny diamond-and-dot accent marking the diagonal grid intersections. */
function DotFlower({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect
        x="6"
        y="6"
        width="8"
        height="8"
        transform="rotate(45 10 10)"
        fill="none"
        stroke={PALETTE.gold}
        strokeOpacity={0.55}
        strokeWidth={1}
      />
      <circle cx="10" cy="10" r="1.6" fill={PALETTE.gold} fillOpacity={0.6} />
    </svg>
  );
}

/**
 * The full closed-card face — now the whole page, not a boxed-in card.
 * This is rendered TWICE at double width and clipped to 50% on each side,
 * so the two halves line up perfectly and can slide apart like double doors.
 */
function CardArtwork({
  initials,
  date,
  phase,
}: {
  initials: string;
  date: string;
  phase: Phase;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(160deg,#fffaf0_0%,#f7ecd9_55%,#eeddb8_100%)]" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, ${PALETTE.goldLine} 0px, ${PALETTE.goldLine} 1px, transparent 1px, transparent 64px), repeating-linear-gradient(-45deg, ${PALETTE.goldLine} 0px, ${PALETTE.goldLine} 1px, transparent 1px, transparent 64px)`,
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0)_60%)]" />

      <div className="absolute" style={{ top: "10%", left: "6%", width: "22%", height: "26%", transform: "rotate(45deg)" }}>
        <OrnamentSpray className="h-full w-full" />
      </div>
      <div className="absolute" style={{ top: "10%", right: "6%", width: "22%", height: "26%", transform: "rotate(135deg)" }}>
        <OrnamentSpray className="h-full w-full" />
      </div>
      <div className="absolute" style={{ bottom: "10%", left: "6%", width: "22%", height: "26%", transform: "rotate(-45deg)" }}>
        <OrnamentSpray className="h-full w-full" />
      </div>
      <div className="absolute" style={{ bottom: "10%", right: "6%", width: "22%", height: "26%", transform: "rotate(-135deg)" }}>
        <OrnamentSpray className="h-full w-full" />
      </div>

      <DotFlower className="absolute left-1/2 top-[26%] h-4 w-4 -translate-x-1/2" />
      <DotFlower className="absolute bottom-[26%] left-1/2 h-4 w-4 -translate-x-1/2" />

      <p className="absolute left-1/2 top-[9%] -translate-x-1/2 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.42em] text-[#9a7b39] sm:text-xs">
        Together with their families
      </p>

      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <svg width="22" height="30" viewBox="0 0 22 30" className="mb-[-8px]">
          <defs>
            <linearGradient id="gemGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="55%" stopColor="#cfd8e6" />
              <stop offset="100%" stopColor="#9fb0c9" />
            </linearGradient>
          </defs>
          <polygon points="11,0 18,10 11,30 4,10" fill="url(#gemGrad)" stroke={PALETTE.goldDeep} strokeWidth={0.6} />
        </svg>

        <div
          className="relative flex flex-col items-center justify-center border border-[#b8862f]/70 bg-[linear-gradient(180deg,#fffaf0_0%,#f7ecd9_100%)] px-9 py-6 shadow-[0_8px_20px_rgba(74,24,40,0.18)]"
          style={{ width: 200, height: 112, borderRadius: "50% / 24%" }}
        >
          <span className="font-serif text-3xl tracking-wide text-[#4a1828]">{initials}</span>
          <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#9a7b39]">{date}</span>
          <span className="absolute -left-1.5 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 border border-[#b8862f]/70 bg-[#fffaf0]" />
          <span className="absolute -right-1.5 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 border border-[#b8862f]/70 bg-[#fffaf0]" />
        </div>
      </div>

      <motion.p
        animate={{ opacity: phase === "closed" ? [0.45, 1, 0.45] : 0 }}
        transition={{ duration: 2.4, repeat: phase === "closed" ? Infinity : 0, ease: "easeInOut" }}
        className="absolute bottom-[9%] left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.35em] text-[#7a6570]"
      >
        Tap anywhere to open
      </motion.p>
    </div>
  );
}

export default function SwarnaHeritageTemplate() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [phase, setPhase] = useState<Phase>("closed");

  const initials = `${GROOM_NAME.charAt(0)} & ${BRIDE_NAME.charAt(0)}`;

  // Lock body scroll until the doors are fully open
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = phase === "open" ? "auto" : "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [phase]);

  // Once open, bring the invitation into view
  useEffect(() => {
    if (phase !== "open") return;
    cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [phase]);

  const handleOpen = () => {
    if (phase !== "closed") return;
    setPhase("opening");
  };

  return (
    <main id="top" className="relative min-h-screen overflow-hidden bg-[#f5ecde] text-[#3d1722]">
      {/* Ambient Background Glows */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 0.61, 0.36, 1] }}
        className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,250,240,0.98)_0%,rgba(246,234,211,0.96)_48%,rgba(229,205,154,0.9)_100%)]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(255,255,255,0.82)_0%,rgba(255,250,238,0.5)_30%,rgba(255,255,255,0)_64%)]" />

      <div className="relative min-h-screen">
        {/* INVITATION — mounted behind the doors as soon as opening starts, so it's
            revealed progressively as the doors slide apart rather than popping in after */}
        {phase !== "closed" && (
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative z-0"
          >
            <SwarnaHeritageCard />
          </motion.div>
        )}

        {/* Soft light spilling through the crack as the doors separate */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === "closed" ? 0 : 1 }}
          transition={{ duration: 0.7 }}
          className="pointer-events-none fixed left-1/2 top-0 z-10 h-full w-56 -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,247,225,0.95)_0%,rgba(255,247,225,0)_70%)]"
        />

        {/* THE CLOSED CARD — full-bleed, splits open like double doors */}
        {phase !== "open" && (
          <div
            className="fixed inset-0 z-30 cursor-pointer select-none outline-none"
            role="button"
            tabIndex={0}
            aria-label="Open invitation"
            onClick={handleOpen}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleOpen();
            }}
          >
            {/* left door */}
            <motion.div
              className="absolute left-0 top-0 h-full w-1/2 overflow-hidden"
              animate={{ x: phase === "opening" ? "-100%" : "0%" }}
              transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
              onAnimationComplete={() => {
                if (phase === "opening") setPhase("open");
              }}
            >
              <div className="absolute left-0 top-0 h-full w-[200%]">
                <CardArtwork initials={initials} date={WEDDING_DATE} phase={phase} />
              </div>
              {/* inner fold shadow */}
              <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-[linear-gradient(to_left,rgba(60,20,30,0.28),transparent)]" />
            </motion.div>

            {/* right door */}
            <motion.div
              className="absolute right-0 top-0 h-full w-1/2 overflow-hidden"
              animate={{ x: phase === "opening" ? "100%" : "0%" }}
              transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
            >
              <div className="absolute right-0 top-0 h-full w-[200%]">
                <CardArtwork initials={initials} date={WEDDING_DATE} phase={phase} />
              </div>
              {/* inner fold shadow */}
              <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-[linear-gradient(to_right,rgba(60,20,30,0.28),transparent)]" />
            </motion.div>

            {/* center seam, fades as the doors start to separate */}
            <motion.div
              className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#8a6a2f]/50"
              animate={{ opacity: phase === "opening" ? 0 : 1 }}
              transition={{ duration: 0.25 }}
            />
          </div>
        )}
      </div>
    </main>
  );
}