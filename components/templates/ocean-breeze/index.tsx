"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import OceanBreezeCard from "./OceanBreezeCard";

export default function OceanBreezeTemplate() {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const [hideEnvelope, setHideEnvelope] = useState(false);

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

  return (
    <main className="relative min-h-screen bg-[#f4f9f9] overflow-hidden">
      
      {/* ✨ THE MAIN INVITATION CARD (Sits in the background) ✨ */}
      <motion.div
        initial={{ scale: 0.95, filter: "blur(8px)", opacity: 0.5 }}
        animate={
          isInvitationOpen 
            ? { scale: 1, filter: "blur(0px)", opacity: 1 } 
            : { scale: 0.95, filter: "blur(8px)", opacity: 0.5 }
        }
        transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
      >
        <OceanBreezeCard />
      </motion.div>

      {/* 🌊 THE GATE-FOLD ENVELOPE (Splits in two!) 🌊 */}
      <AnimatePresence onExitComplete={() => setHideEnvelope(true)}>
        {!isInvitationOpen && !hideEnvelope && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none overflow-hidden">
            
            {/* LEFT DOOR */}
            <motion.div
              exit={{ x: "-100%" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="absolute left-0 top-0 h-full w-1/2 bg-[#eaf4f4] border-r border-[#5fa8d3]/30 pointer-events-auto shadow-[20px_0_50px_rgba(44,82,99,0.08)] flex justify-end overflow-hidden"
            >
              {/* Left Door Ocean Water Gradient */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,_rgba(135,206,235,0.15),_transparent_70%)]" />
              {/* Elegant Seam highlight */}
              <div className="h-full w-2 bg-gradient-to-r from-transparent to-white/60" />
            </motion.div>

            {/* RIGHT DOOR */}
            <motion.div
              exit={{ x: "100%" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="absolute right-0 top-0 h-full w-1/2 bg-[#eaf4f4] border-l border-[#5fa8d3]/30 pointer-events-auto shadow-[-20px_0_50px_rgba(44,82,99,0.08)] flex justify-start overflow-hidden"
            >
               {/* Right Door Sandy Beach Gradient */}
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,_rgba(245,222,179,0.2),_transparent_70%)]" />
               <div className="h-full w-2 bg-gradient-to-l from-transparent to-white/60" />
            </motion.div>

            {/* 💎 THE CENTER GLASS CARD (Fades & blurs out first) 💎 */}
            <motion.div
              exit={{ opacity: 0, scale: 0.85, filter: "blur(12px)" }}
              transition={{ duration: 0.4, ease: "easeIn" }}
              className="relative z-10 w-full max-w-2xl px-4 pointer-events-auto"
            >
              <div className="relative w-full rounded-[3rem] border border-white/60 bg-white/60 px-8 py-16 text-center shadow-[0_30px_60px_rgba(44,82,99,0.1)] backdrop-blur-xl sm:px-12">
                
                <div className="absolute inset-0 rounded-[3rem] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),_transparent_50%)]" />
                
                <div className="relative">
                  <p className="text-[10px] uppercase tracking-[0.45em] text-[#5fa8d3] font-semibold drop-shadow-sm">
                    Together with their families
                  </p>

                  <h1 className="mt-14 font-serif text-5xl italic leading-none text-[#1a5b73] sm:text-6xl drop-shadow-sm">
                    David
                  </h1>

                  <div className="my-6 text-3xl font-light text-[#5fa8d3]">&amp;</div>

                  <h1 className="font-serif text-5xl italic leading-none text-[#1a5b73] sm:text-6xl drop-shadow-sm">
                    Roshel
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
                      className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#1a5b73] px-10 py-5 text-[11px] font-semibold uppercase tracking-[0.4em] text-white shadow-xl shadow-[#1a5b73]/20 transition-all duration-300 hover:scale-105 hover:shadow-[#1a5b73]/40"
                    >
                      {/* Apple-style Glare Sweep on Hover */}
                      <span className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-[150%]" />
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