"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
// Make sure to import the new coastal card we just made!
import OceanBreezeCard from "./OceanBreezeCard"; 

export default function OceanBreezeTemplate() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  
  // State to manage if the invitation is opened
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);

  // Toggle body overflow based on state[cite: 3]
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = isInvitationOpen ? "auto" : "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isInvitationOpen]);

  // Smooth scroll into view when opened[cite: 3]
  useEffect(() => {
    if (!isInvitationOpen) return;
    cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [isInvitationOpen]);

  return (
    <main id="top" className="relative min-h-screen overflow-hidden bg-[#eef5f5] text-[#2c5263]">
      {/* Sandy & Ocean Water Ambient Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(135,206,235,0.15),_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(245,222,179,0.2),_transparent_50%)]" />

      <div className="relative min-h-screen">
        <AnimatePresence mode="wait">
          {!isInvitationOpen ? (
            <motion.div
              key="open-screen"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.98 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Super smooth Apple-like spring
              className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8"
            >
              <div className="relative flex w-full max-w-3xl justify-center">
                {/* Coastal Glassmorphism Envelope */}
                <div className="relative w-full max-w-[460px] rounded-[3rem] border border-white/50 bg-white/60 px-8 py-16 text-center shadow-[0_30px_60px_rgba(44,82,99,0.08)] backdrop-blur-xl sm:px-12">
                  
                  <p className="text-[10px] uppercase tracking-[0.45em] text-[#5fa8d3] font-semibold">
                    Together with their families
                  </p>

                  {/* Couple Names[cite: 3] */}
                  <h1 className="mt-14 font-serif text-5xl italic leading-none text-[#1a5b73] sm:text-6xl">
                    Umidu
                  </h1>

                  <div className="my-6 text-3xl font-light text-[#5fa8d3]">&amp;</div>

                  <h1 className="font-serif text-5xl italic leading-none text-[#1a5b73] sm:text-6xl">
                    Thimeth
                  </h1>

                  <div className="mx-auto mt-12 flex items-center justify-center gap-4 text-[#5fa8d3]">
                    <span className="h-[1px] w-12 bg-current opacity-50" />
                    <span className="text-lg">✧</span>
                    <span className="h-[1px] w-12 bg-current opacity-50" />
                  </div>

                  <p className="mt-10 text-[10px] uppercase tracking-[0.45em] text-[#2c5263]/70">
                    Invite you to a seaside celebration
                  </p>

                  <div className="mt-14">
                    {/* Open Invitation Button[cite: 3] */}
                    <button
                      type="button"
                      onClick={() => setIsInvitationOpen(true)}
                      className="inline-flex items-center justify-center rounded-full bg-[#1a5b73] px-10 py-5 text-[11px] font-semibold uppercase tracking-[0.4em] text-white shadow-xl shadow-[#1a5b73]/20 transition-all duration-300 hover:scale-105 hover:bg-[#144659]"
                    >
                      Open Invitation
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="invitation-screen"
              ref={cardRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative z-10"
            >
              <OceanBreezeCard />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}