"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import InvitationCardTemplate from "@/components/templates/RoyalHeritage/InvitationCardTemplate";

function MandalaCorner({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={`pointer-events-none absolute h-24 w-24 text-[#d9bb71]/40 sm:h-28 sm:w-28 ${className}`}
      aria-hidden="true"
    >
      <circle cx="6" cy="6" r="20" fill="none" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="6" cy="6" r="34" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 4" />
      <circle cx="6" cy="6" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="0.5 6" />
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * Math.PI) / 16;
        const x = 6 + 34 * Math.cos(angle);
        const y = 6 + 34 * Math.sin(angle);
        return <circle key={i} cx={x} cy={y} r="2.2" fill="currentColor" />;
      })}
      <path d="M6 26 Q 26 26 26 6" fill="none" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  );
}

export default function OpenInvitationTemplate() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const [doorsSwung, setDoorsSwung] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = isInvitationOpen ? "auto" : "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isInvitationOpen]);

  useEffect(() => {
    if (!isInvitationOpen) {
      return;
    }

    cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [isInvitationOpen]);

  const handleOpenDoors = () => {
    if (doorsSwung) return;
    setDoorsSwung(true);
  };

  return (
    <main id="top" className="relative min-h-screen overflow-hidden bg-[#faf5ec] text-[#241726]">
      <div className="relative flex min-h-screen flex-col items-center px-4 pb-16 pt-14 sm:px-6">
        <AnimatePresence mode="wait">
          {!isInvitationOpen ? (
            <motion.div
              key="open-screen"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
              className="flex w-full flex-col items-center"
            >
              {/* Header */}
              <div className="flex flex-col items-center text-center">
                <span className="rounded-full border border-[#d9bb71] bg-white/70 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.4em] text-[#9a7b39]">
                  Save the Date
                </span>
                <h1 className="mt-5 font-serif text-4xl leading-none text-[#241726] sm:text-5xl">
                  Umiduss &amp; Thimeth
                </h1>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.4em] text-[#7a6570] sm:text-sm">
                  June 12, 2026
                </p>
              </div>

              {/* Door card */}
              <div className="relative mt-10 w-full max-w-[420px]" style={{ perspective: 1800 }}>
                <div className="relative aspect-[9/13] w-full overflow-visible rounded-[26px] shadow-[0_30px_60px_rgba(36,23,38,0.28)]">
                  {/* Revealed content sits underneath the doors */}
                  <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden rounded-[26px] bg-[linear-gradient(160deg,#fff8e9_0%,#f3e6c9_100%)]">
                    <AnimatePresence>
                      {doorsSwung && (
                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          className="flex h-full w-full flex-col items-center justify-center gap-4 p-6 text-center"
                        >
                          <p className="font-serif text-lg italic text-[#4a1828]">
                            Join us as we begin our forever.
                          </p>
                          <button
                            type="button"
                            onClick={() => setIsInvitationOpen(true)}
                            className="rounded-full border border-[#d9bb71] bg-[#4a1828] px-6 py-2.5 text-xs font-bold uppercase tracking-[0.3em] text-[#fff8e9] transition hover:-translate-y-0.5"
                          >
                            View Full Invitation
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Left door */}
                  <motion.div
                    className="absolute inset-y-0 left-0 z-10 w-1/2 origin-left overflow-hidden rounded-l-[26px] border-y border-l border-[#5a3a52]/40 bg-[linear-gradient(150deg,#6b2335_0%,#4a1828_55%,#34101b_100%)]"
                    style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
                    animate={
                      shouldReduceMotion
                        ? { opacity: doorsSwung ? 0 : 1 }
                        : { rotateY: doorsSwung ? -112 : 0 }
                    }
                    transition={{ duration: 1.1, ease: [0.45, 0, 0.2, 1] }}
                  >
                    <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:14px_14px]" />
                    <MandalaCorner className="left-2 top-2" />
                    <MandalaCorner className="-left-4 bottom-2 rotate-[270deg]" />
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.5em] text-[#e8d9b0]/85 [writing-mode:vertical-rl]">
                      Umiduss &amp; Thimeth
                    </span>
                  </motion.div>

                  {/* Right door */}
                  <motion.div
                    className="absolute inset-y-0 right-0 z-10 w-1/2 origin-right overflow-hidden rounded-r-[26px] border-y border-r border-[#5a3a52]/40 bg-[linear-gradient(210deg,#6b2335_0%,#4a1828_55%,#34101b_100%)]"
                    style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
                    animate={
                      shouldReduceMotion
                        ? { opacity: doorsSwung ? 0 : 1 }
                        : { rotateY: doorsSwung ? 112 : 0 }
                    }
                    transition={{ duration: 1.1, ease: [0.45, 0, 0.2, 1] }}
                  >
                    <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:14px_14px]" />
                    <MandalaCorner className="right-2 top-2 -scale-x-100" />
                    <MandalaCorner className="-right-4 bottom-2 rotate-[270deg] -scale-x-100" />
                  </motion.div>

                  {/* Center divider */}
                  <motion.div
                    className="pointer-events-none absolute inset-y-0 left-1/2 z-10 w-px -translate-x-1/2 bg-[linear-gradient(180deg,transparent_0%,#d9bb71_20%,#d9bb71_80%,transparent_100%)]"
                    animate={{ opacity: doorsSwung ? 0 : 1 }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Wax-seal open button */}
                  <motion.button
                    type="button"
                    onClick={handleOpenDoors}
                    disabled={doorsSwung}
                    aria-label="Open invitation"
                    className="absolute left-1/2 top-1/2 z-20 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-0.5 rounded-full border border-[#d9bb71] bg-[radial-gradient(circle_at_35%_30%,#fff8e9_0%,#f3e2b8_45%,#d3a94f_100%)] shadow-[0_10px_26px_rgba(74,24,40,0.35)] transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#d9bb71]/70 disabled:pointer-events-none sm:h-28 sm:w-28"
                    animate={{ opacity: doorsSwung ? 0 : 1, scale: doorsSwung ? 0.5 : 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="font-serif text-xl font-bold text-[#4a1828] sm:text-2xl">U&amp;T</span>
                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#9a7b39]">Open</span>
                  </motion.button>

                  {/* Bottom hint pill */}
                  <motion.div
                    className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2"
                    animate={{ opacity: doorsSwung ? 0 : 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <span className="rounded-full border border-[#d9bb71]/70 bg-[#4a1828]/70 px-4 py-1.5 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#fff8e9]">
                      Tap seal to open
                    </span>
                  </motion.div>
                </div>
              </div>

              <motion.p
                animate={{ opacity: doorsSwung ? 0 : 1 }}
                transition={{ duration: 0.4 }}
                className="mt-6 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#a99aa5]"
              >
                Tap to reveal
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="invitation-screen"
              ref={cardRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="relative z-10 w-full"
            >
              <InvitationCardTemplate clientId="royal-heritage" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}