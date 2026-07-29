"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Shell, Palmtree, Cloud, Waves, Sparkles, Compass, Heart } from "lucide-react";
import OceanBreezeCard from "./OceanBreezeCard";

const LUX_EASE = [0.22, 1, 0.36, 1] as const;

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5fa8d3]";

/* ------------------------------------------------------------------ */
/*  EnvelopeBubbles — Gentle rising bubbles inside the envelope gate  */
/* ------------------------------------------------------------------ */
function EnvelopeBubbles() {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return null;

  const bubbles = [
    { left: "12%", size: 12, duration: 10, delay: 0 },
    { left: "28%", size: 20, duration: 14, delay: 2 },
    { left: "45%", size: 10, duration: 11, delay: 1 },
    { left: "62%", size: 24, duration: 15, delay: 3 },
    { left: "78%", size: 14, duration: 12, delay: 0.5 },
    { left: "88%", size: 18, duration: 13, delay: 2.5 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-20">
      {bubbles.map((b, idx) => (
        <motion.div
          key={idx}
          style={{ left: b.left, width: b.size, height: b.size }}
          className="absolute bottom-0 rounded-full border border-white/60 bg-gradient-to-tr from-white/30 to-sky-200/40 shadow-[inset_0_2px_4px_rgba(255,255,255,0.9)] backdrop-blur-[1px]"
          animate={{
            y: ["100vh", "-10vh"],
            x: ["0px", idx % 2 === 0 ? "20px" : "-20px", "0px"],
            opacity: [0, 0.75, 0.8, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: b.duration,
            delay: b.delay,
            ease: "easeInOut",
          }}
        >
          <div className="absolute top-[15%] left-[20%] h-[30%] w-[30%] rounded-full bg-white/90 blur-[0.5px]" />
        </motion.div>
      ))}
    </div>
  );
}

export default function OceanBreezeTemplate() {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const [hideEnvelope, setHideEnvelope] = useState(false);
  const [isOpeningRipple, setIsOpeningRipple] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = isInvitationOpen ? "auto" : "hidden";

    if (isInvitationOpen) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isInvitationOpen]);

  const handleOpenClick = () => {
    setIsOpeningRipple(true);
    setTimeout(() => {
      setIsInvitationOpen(true);
    }, 300);
  };

  const driftShell = shouldReduceMotion
    ? {}
    : {
        y: [-8, 8, -8],
        rotate: [-5, 5, -5],
        transition: { repeat: Infinity, duration: 9, ease: "easeInOut" as const },
      };

  const swayPalm = shouldReduceMotion
    ? {}
    : {
        rotate: [-3, 3, -3],
        transition: { repeat: Infinity, duration: 7, ease: "easeInOut" as const },
      };

  const cloudDriftA = shouldReduceMotion
    ? {}
    : {
        x: ["-8%", "8%", "-8%"],
        transition: { repeat: Infinity, duration: 58, ease: "easeInOut" as const },
      };

  const cloudDriftB = shouldReduceMotion
    ? {}
    : {
        x: ["6%", "-6%", "6%"],
        transition: { repeat: Infinity, duration: 70, ease: "easeInOut" as const },
      };

  const waveCausticPulse = shouldReduceMotion
    ? {}
    : {
        opacity: [0.25, 0.45, 0.25],
        scale: [1, 1.05, 1],
        transition: { repeat: Infinity, duration: 8, ease: "easeInOut" as const },
      };

  return (
    <main className="relative min-h-screen bg-[#f4f9f9] overflow-hidden">
      {/* ✨ THE MAIN INVITATION CARD (unfolds into view behind the gate) ✨ */}
      <motion.div
        initial={{ scale: 0.92, y: 30, filter: "blur(12px)", opacity: 0.3 }}
        animate={
          isInvitationOpen
            ? { scale: 1, y: 0, filter: "blur(0px)", opacity: 1 }
            : { scale: 0.92, y: 30, filter: "blur(12px)", opacity: 0.3 }
        }
        transition={{ duration: 1.6, delay: 0.55, ease: LUX_EASE }}
        className="relative z-10"
      >
        <OceanBreezeCard />
      </motion.div>

      {/* 🌊 THE OCEAN ENVELOPE GATE — Rich Deep Blue Coastal Opening 🌊 */}
      <AnimatePresence onExitComplete={() => setHideEnvelope(true)}>
        {!isInvitationOpen && !hideEnvelope && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none overflow-hidden">
            <EnvelopeBubbles />

            {/* Ocean Water Waves & Caustics Overlay */}
            <motion.div
              exit={{ opacity: 0, transition: { duration: 0.6 } }}
              animate={waveCausticPulse}
              className="absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,_rgba(95,168,211,0.25),_transparent_70%)] pointer-events-none"
            />

            {/* Drifting Sky Clouds */}
            <motion.div
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              animate={cloudDriftA}
              className="absolute top-10 left-[12%] z-30 text-sky-200/70 pointer-events-none hidden sm:block"
            >
              <Cloud size={56} strokeWidth={0.6} />
            </motion.div>
            <motion.div
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              animate={cloudDriftB}
              className="absolute bottom-16 right-[14%] z-30 text-sky-200/60 pointer-events-none hidden sm:block"
            >
              <Cloud size={42} strokeWidth={0.6} />
            </motion.div>

            {/* LEFT DOOR — Deep Ocean Blue Velvet Panel */}
            <motion.div
              exit={{ x: "-100%" }}
              transition={{ duration: 1.5, ease: LUX_EASE, delay: 0.45 }}
              className="absolute left-0 top-0 z-10 h-full w-1/2 bg-gradient-to-br from-[#0a232c] via-[#1a5b73] to-[#0f3846] border-r border-[#5fa8d3]/40 pointer-events-auto shadow-[25px_0_60px_rgba(10,35,44,0.4)] flex justify-end overflow-hidden"
            >
              {/* Ocean water reflection highlights */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(135,206,235,0.25),_transparent_65%)]" />

              {/* Water Wave Pattern background */}
              <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
                <Waves size={400} strokeWidth={0.5} className="text-white" />
              </div>

              {/* Shell resting in corner */}
              <motion.div
                animate={driftShell}
                className="absolute bottom-12 left-10 text-sky-200/40 pointer-events-none hidden md:block"
              >
                <Shell size={80} strokeWidth={0.9} />
              </motion.div>

              {/* Ocean Tide SVG Wave Bottom Seam */}
              <svg
                viewBox="0 0 400 60"
                preserveAspectRatio="none"
                className="absolute bottom-0 left-0 h-16 w-full text-[#5fa8d3]/30"
              >
                <path
                  fill="currentColor"
                  d="M0,30 C80,55 160,10 240,28 C300,42 350,20 400,32 L400,60 L0,60 Z"
                />
              </svg>

              <div className="h-full w-2 bg-gradient-to-r from-transparent via-[#87ceeb]/40 to-white/70" />
            </motion.div>

            {/* RIGHT DOOR — Deep Ocean Blue Velvet Panel */}
            <motion.div
              exit={{ x: "100%" }}
              transition={{ duration: 1.5, ease: LUX_EASE, delay: 0.45 }}
              className="absolute right-0 top-0 z-10 h-full w-1/2 bg-gradient-to-bl from-[#0a232c] via-[#1a5b73] to-[#0f3846] border-l border-[#5fa8d3]/40 pointer-events-auto shadow-[-25px_0_60px_rgba(10,35,44,0.4)] flex justify-start overflow-hidden"
            >
              {/* Ocean water reflection highlights */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(135,206,235,0.25),_transparent_65%)]" />

              {/* Water Wave Pattern background */}
              <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
                <Waves size={400} strokeWidth={0.5} className="text-white" />
              </div>

              {/* Swaying Palm */}
              <motion.div
                animate={swayPalm}
                className="absolute top-12 right-12 text-sky-200/40 pointer-events-none hidden md:block"
              >
                <Palmtree size={90} strokeWidth={0.7} />
              </motion.div>

              {/* Mirrored Ocean Tide SVG Wave */}
              <svg
                viewBox="0 0 400 60"
                preserveAspectRatio="none"
                className="absolute bottom-0 right-0 h-16 w-full text-[#5fa8d3]/30"
              >
                <path
                  fill="currentColor"
                  d="M0,32 C50,20 100,42 160,28 C240,10 320,55 400,30 L400,60 L0,60 Z"
                />
              </svg>

              <div className="h-full w-2 bg-gradient-to-l from-transparent via-[#87ceeb]/40 to-white/70" />
            </motion.div>

            {/* WAX SEAL — Glowing Ocean Emblem */}
            <motion.div
              exit={{
                scale: 0.3,
                opacity: 0,
                rotate: -25,
                transition: { duration: 0.5, ease: LUX_EASE },
              }}
              className="absolute left-1/2 top-[12%] sm:top-[14%] z-30 -translate-x-1/2 pointer-events-none"
            >
              <div className="relative">
                {/* Glowing Wave Ring */}
                <motion.div
                  animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0.1, 0.6] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full border-2 border-sky-300 pointer-events-none"
                />
                <div className="flex h-18 w-18 sm:h-22 sm:w-22 items-center justify-center rounded-full border-2 border-white/80 bg-gradient-to-br from-[#00b4d8] via-[#1a5b73] to-[#0a232c] text-white shadow-[0_12px_30px_rgba(0,180,216,0.45)] backdrop-blur-md">
                  <span className="font-serif text-xl sm:text-2xl italic font-bold drop-shadow">
                    R&amp;D
                  </span>
                </div>
              </div>
            </motion.div>

            {/* 💎 THE INVITATION LETTER CARD 💎 */}
            <motion.div
              exit={{
                y: -40,
                opacity: 0,
                scale: 0.88,
                filter: "blur(12px)",
                transition: { duration: 0.7, ease: LUX_EASE, delay: 0.15 },
              }}
              className="relative z-20 w-full max-w-2xl px-4 pointer-events-auto"
            >
              <div className="relative w-full rounded-[3.2rem] border-2 border-white/80 bg-gradient-to-b from-white/90 via-white/85 to-[#f4fcfc]/90 px-8 py-14 text-center shadow-[0_35px_80px_rgba(10,35,44,0.3)] backdrop-blur-2xl sm:px-12 overflow-hidden">
                {/* Internal Caustic Glow */}
                <div className="absolute inset-0 rounded-[3.2rem] bg-[radial-gradient(ellipse_at_top,_rgba(95,168,211,0.2),_transparent_60%)] pointer-events-none" />

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#eaf4f4] px-4 py-1.5 border border-[#5fa8d3]/30 text-[10px] uppercase tracking-[0.4em] text-[#1a5b73] font-bold">
                    <Sparkles size={12} className="text-[#5fa8d3]" />
                    Seaside Celebration
                  </div>

                  <h1 className="mt-8 font-serif text-5xl italic leading-none text-[#1a5b73] sm:text-7xl drop-shadow-sm">
                    Roshel
                  </h1>

                  <div className="my-4 text-3xl font-light text-[#00b4d8] flex items-center justify-center gap-3">
                    <span className="h-[1px] w-10 bg-[#00b4d8]/40" />
                    &amp;
                    <span className="h-[1px] w-10 bg-[#00b4d8]/40" />
                  </div>

                  <h1 className="font-serif text-5xl italic leading-none text-[#1a5b73] sm:text-7xl drop-shadow-sm">
                    David
                  </h1>

                  <div className="mx-auto mt-8 flex items-center justify-center gap-4 text-[#5fa8d3]">
                    <span className="h-[1px] w-14 bg-current opacity-40" />
                    <span className="text-xl">🌊</span>
                    <span className="h-[1px] w-14 bg-current opacity-40" />
                  </div>

                  <p className="mt-6 text-[10px] uppercase tracking-[0.45em] text-[#2c5263]/85 font-semibold">
                    Together with their families, invite you by the sea
                  </p>

                  {/* Ocean Water Ripple Opening Effect */}
                  {isOpeningRipple && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0.9 }}
                      animate={{ scale: 3, opacity: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-40 w-40 rounded-full border-4 border-[#00b4d8] bg-[#00b4d8]/20 pointer-events-none"
                    />
                  )}

                  <div className="mt-10 flex justify-center">
                    <button
                      type="button"
                      onClick={handleOpenClick}
                      className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#1a5b73] via-[#00b4d8] to-[#1a5b73] px-10 py-5 text-[11px] font-bold uppercase tracking-[0.4em] text-white shadow-2xl shadow-[#1a5b73]/35 transition-all duration-500 hover:scale-105 hover:shadow-[#00b4d8]/50 ${focusRing}`}
                    >
                      {/* Apple-style Glare Sweep on Hover */}
                      <span className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-[1200ms] ease-in-out group-hover:translate-x-[150%]" />
                      <Compass size={16} className="relative text-sky-200" />
                      <span className="relative">Open Invitation</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}