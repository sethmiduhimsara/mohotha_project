//cat > /home/claude/index.tsx << 'EOF'
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Shell, Palmtree, Cloud } from "lucide-react";
import OceanBreezeCard from "./OceanBreezeCard";

// Same slow, luxurious curve used throughout OceanBreezeCard — keeps the
// gate and the card it reveals feeling like one continuous piece.
const LUX_EASE = [0.22, 1, 0.36, 1] as const;

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5fa8d3]";

export default function OceanBreezeTemplate() {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const [hideEnvelope, setHideEnvelope] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Lock scrolling while the envelope is closed or animating
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = isInvitationOpen ? "auto" : "hidden";

    // Ensure we start at the top of the card when it opens
    if (isInvitationOpen) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isInvitationOpen]);

const driftShell = shouldReduceMotion
    ? {}
    : {
        y: [-6, 6, -6],
        transition: { repeat: Infinity, duration: 10, ease: "easeInOut" as const },
      };
  const swayPalm = shouldReduceMotion
    ? {}
    : {
        rotate: [-2, 2, -2],
        transition: { repeat: Infinity, duration: 8, ease: "easeInOut" as const },
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

  return (
    <main className="relative min-h-screen bg-[#f4f9f9] overflow-hidden">
      {/* ✨ THE MAIN INVITATION CARD (unfolds into view behind the gate) ✨ */}
      <motion.div
        initial={{ scale: 0.94, y: 24, filter: "blur(10px)", opacity: 0.4 }}
        animate={
          isInvitationOpen
            ? { scale: 1, y: 0, filter: "blur(0px)", opacity: 1 }
            : { scale: 0.94, y: 24, filter: "blur(10px)", opacity: 0.4 }
        }
        transition={{ duration: 1.6, delay: 0.55, ease: LUX_EASE }}
        className="relative z-10"
      >
        <OceanBreezeCard />
      </motion.div>

      {/* 🌊 THE ENVELOPE — a sealed letter waiting by the shore 🌊 */}
      <AnimatePresence onExitComplete={() => setHideEnvelope(true)}>
        {!isInvitationOpen && !hideEnvelope && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none overflow-hidden">
            {/* Gentle clouds drifting above the whole scene */}
            <motion.div
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              animate={cloudDriftA}
              className="absolute top-10 left-[12%] z-30 text-white/60 pointer-events-none hidden sm:block"
            >
              <Cloud size={52} strokeWidth={0.6} />
            </motion.div>
            <motion.div
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              animate={cloudDriftB}
              className="absolute bottom-16 right-[14%] z-30 text-white/50 pointer-events-none hidden sm:block"
            >
              <Cloud size={38} strokeWidth={0.6} />
            </motion.div>

            {/* LEFT DOOR — the envelope's left face */}
            <motion.div
              exit={{ x: "-100%" }}
              transition={{ duration: 1.5, ease: LUX_EASE, delay: 0.45 }}
              className="absolute left-0 top-0 z-10 h-full w-1/2 bg-[#eaf4f4] border-r border-[#5fa8d3]/30 pointer-events-auto shadow-[20px_0_50px_rgba(44,82,99,0.08)] flex justify-end overflow-hidden"
            >
              {/* Left Door Ocean Water Gradient */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,_rgba(135,206,235,0.15),_transparent_70%)]" />
              {/* A shell resting in the corner of the paper */}
              <motion.div
                animate={driftShell}
                className="absolute bottom-10 left-8 text-[#5fa8d3]/25 pointer-events-none hidden md:block"
              >
                <Shell size={72} strokeWidth={1} />
              </motion.div>
              {/* Low tideline along the bottom edge */}
              <svg
                viewBox="0 0 400 60"
                preserveAspectRatio="none"
                className="absolute bottom-0 left-0 h-10 w-full text-[#5fa8d3]/15"
              >
                <path
                  fill="currentColor"
                  d="M0,30 C80,55 160,10 240,28 C300,42 350,20 400,32 L400,60 L0,60 Z"
                />
              </svg>
              {/* Elegant Seam highlight */}
              <div className="h-full w-2 bg-gradient-to-r from-transparent to-white/60" />
            </motion.div>

            {/* RIGHT DOOR — the envelope's right face */}
            <motion.div
              exit={{ x: "100%" }}
              transition={{ duration: 1.5, ease: LUX_EASE, delay: 0.45 }}
              className="absolute right-0 top-0 z-10 h-full w-1/2 bg-[#eaf4f4] border-l border-[#5fa8d3]/30 pointer-events-auto shadow-[-20px_0_50px_rgba(44,82,99,0.08)] flex justify-start overflow-hidden"
            >
              {/* Right Door Sandy Beach Gradient */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,_rgba(245,222,179,0.2),_transparent_70%)]" />
              {/* A palm swaying in the corner of the paper */}
              <motion.div
                animate={swayPalm}
                className="absolute top-10 right-10 text-[#5fa8d3]/25 pointer-events-none hidden md:block"
              >
                <Palmtree size={80} strokeWidth={0.6} />
              </motion.div>
              {/* Low tideline along the bottom edge, mirrored */}
              <svg
                viewBox="0 0 400 60"
                preserveAspectRatio="none"
                className="absolute bottom-0 right-0 h-10 w-full text-[#5fa8d3]/15"
              >
                <path
                  fill="currentColor"
                  d="M0,32 C50,20 100,42 160,28 C240,10 320,55 400,30 L400,60 L0,60 Z"
                />
              </svg>
              <div className="h-full w-2 bg-gradient-to-l from-transparent to-white/60" />
            </motion.div>

            {/* WAX SEAL — cracks open first, like breaking the letter's seal */}
            <motion.div
              exit={{
                scale: 0.4,
                opacity: 0,
                rotate: -20,
                transition: { duration: 0.5, ease: LUX_EASE },
              }}
              className="absolute left-1/2 top-[13%] sm:top-[15%] z-20 -translate-x-1/2 pointer-events-none"
            >
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full border border-white/70 bg-gradient-to-br from-[#5fa8d3] to-[#1a5b73] text-white shadow-[0_10px_25px_rgba(26,91,115,0.35)]">
                <span className="font-serif text-lg sm:text-xl italic">
                  U&amp;T
                </span>
              </div>
            </motion.div>

            {/* 💎 THE LETTER — lifts free of the envelope, then the doors part 💎 */}
            <motion.div
              exit={{
                y: -36,
                opacity: 0,
                scale: 0.9,
                filter: "blur(10px)",
                transition: { duration: 0.7, ease: LUX_EASE, delay: 0.15 },
              }}
              className="relative z-10 w-full max-w-2xl px-4 pointer-events-auto"
            >
              <div className="relative w-full rounded-[3rem] border border-white/60 bg-white/60 px-8 py-16 text-center shadow-[0_30px_60px_rgba(44,82,99,0.1)] backdrop-blur-xl sm:px-12">
                <div className="absolute inset-0 rounded-[3rem] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),_transparent_50%)]" />

                <div className="relative">
                  <p className="text-[10px] uppercase tracking-[0.45em] text-[#5fa8d3] font-semibold drop-shadow-sm">
                    Together with their families
                  </p>

                  <h1 className="mt-14 font-serif text-5xl italic leading-none text-[#1a5b73] sm:text-6xl drop-shadow-sm">
                    Roshel
                  </h1>

                  <div className="my-6 text-3xl font-light text-[#5fa8d3]">
                    &amp;
                  </div>

                  <h1 className="font-serif text-5xl italic leading-none text-[#1a5b73] sm:text-6xl drop-shadow-sm">
                    David
                  </h1>

                  <div className="mx-auto mt-12 flex items-center justify-center gap-4 text-[#5fa8d3]">
                    <span className="h-[1px] w-12 bg-current opacity-50" />
                    <span className="text-lg">✧</span>
                    <span className="h-[1px] w-12 bg-current opacity-50" />
                  </div>

                  <p className="mt-10 text-[10px] uppercase tracking-[0.45em] text-[#2c5263]/70 font-medium">
                    Invite you to a seaside celebration
                  </p>

                  <div className="mt-14 flex justify-center">
                    {/* Animated Button with Glare Sweep Effect! */}
                    <button
                      type="button"
                      onClick={() => setIsInvitationOpen(true)}
                      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#1a5b73] px-10 py-5 text-[11px] font-semibold uppercase tracking-[0.4em] text-white shadow-xl shadow-[#1a5b73]/20 transition-all duration-500 hover:scale-105 hover:shadow-[#1a5b73]/40 ${focusRing}`}
                    >
                      {/* Apple-style Glare Sweep on Hover */}
                      <span className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-[1200ms] ease-in-out group-hover:translate-x-[150%]" />
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