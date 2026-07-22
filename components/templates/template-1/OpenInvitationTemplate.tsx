"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import InvitationCardTemplate from "@/components/templates/template-1/InvitationCardTemplate";

export default function OpenInvitationTemplate() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);

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

  return (
    <main id="top" className="relative min-h-screen overflow-hidden bg-[#f5ecde] text-[#3d1722]">
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 0.61, 0.36, 1] }}
        className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,250,240,0.98)_0%,rgba(246,234,211,0.96)_48%,rgba(229,205,154,0.9)_100%)]"
      />
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#b89545]/45" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(76,26,41,0.1)_0%,rgba(255,255,255,0)_24%,rgba(255,255,255,0)_76%,rgba(76,26,41,0.1)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(255,255,255,0.82)_0%,rgba(255,250,238,0.5)_30%,rgba(255,255,255,0)_64%)]" />
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(139,96,35,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(139,96,35,0.16)_1px,transparent_1px)] [background-size:56px_56px]" />

      <div className="relative min-h-screen">
        <AnimatePresence mode="wait">
          {!isInvitationOpen ? (
            <motion.div
              key="open-screen"
              initial={{ opacity: 0, y: 32, scale: 0.965 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.98 }}
              transition={{ duration: 0.75, ease: [0.22, 0.61, 0.36, 1] }}
              className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-5 sm:px-6 lg:px-8"
            >
              <div className="relative flex w-full max-w-6xl justify-center">
                <div className="absolute inset-x-16 top-8 h-[calc(100%-2rem)] rounded-[42px] bg-[#6b2335]/14 blur-3xl" />

                <div className="relative flex h-[calc(100vh-40px)] max-h-[620px] min-h-[510px] w-full max-w-[780px] flex-col items-center justify-center overflow-hidden rounded-[38px] border border-[#d9bb71]/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(255,252,246,0.98)_55%,rgba(249,240,222,0.98)_100%)] px-7 py-8 text-center shadow-[0_28px_80px_rgba(74,25,37,0.16)] ring-1 ring-white/80 backdrop-blur-sm sm:px-14 sm:py-10">
                  <motion.div
                    aria-hidden="true"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.1, ease: [0.22, 0.61, 0.36, 1] }}
                    className="pointer-events-none absolute inset-0"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(234,211,153,0.22)_0%,rgba(255,255,255,0)_36%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(184,126,50,0.1)_100%)]" />
                  </motion.div>
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(255,255,255,0))]" />
                  <div className="pointer-events-none absolute left-6 top-6 h-18 w-18 rounded-tl-[22px] border-l-2 border-t-2 border-[#b88a2f]/65" />
                  <div className="pointer-events-none absolute right-6 top-6 h-18 w-18 rounded-tr-[22px] border-r-2 border-t-2 border-[#b88a2f]/65" />
                  <div className="pointer-events-none absolute bottom-6 left-6 h-18 w-18 rounded-bl-[22px] border-b-2 border-l-2 border-[#b88a2f]/65" />
                  <div className="pointer-events-none absolute bottom-6 right-6 h-18 w-18 rounded-br-[22px] border-b-2 border-r-2 border-[#b88a2f]/65" />
                  <div className="pointer-events-none absolute -left-22 top-22 h-64 w-44 rounded-r-full border-y border-r border-[#d2b363]/45" />
                  <div className="pointer-events-none absolute -right-22 bottom-16 h-64 w-44 rounded-l-full border-y border-l border-[#d2b363]/45" />

                  <div className="relative z-20 flex w-full flex-col items-center">
                    <p className="text-[10px] font-bold uppercase tracking-[0.42em] text-[#9a7b39] sm:text-xs">
                      Together with their families
                    </p>

                    <div className="mt-12 flex flex-col items-center gap-3 text-[#9a7b39] sm:mt-14 sm:gap-4">
                      <p className="font-serif text-[54px] italic leading-none text-[#4a1828] drop-shadow-[0_10px_20px_rgba(74,24,40,0.15)] sm:text-[74px]">
                        Umidu
                      </p>
                      <div className="font-serif text-4xl leading-none text-[#b88a2f]">&amp;</div>
                      <p className="font-serif text-[54px] italic leading-none text-[#4a1828] drop-shadow-[0_10px_20px_rgba(74,24,40,0.15)] sm:text-[74px]">
                        Thimeth
                      </p>
                    </div>

                    <div className="mt-11 flex items-center gap-5 text-[#b88a2f] sm:mt-13">
                      <span className="h-px w-16 bg-current/45" />
                      <span className="h-2 w-2 rotate-45 border border-current bg-white" />
                      <span className="h-px w-16 bg-current/45" />
                    </div>

                    <p className="mt-9 max-w-full text-[10px] font-semibold uppercase tracking-[0.42em] text-[#7a6570] sm:mt-10 sm:text-xs">
                      Invite you to a royal heritage celebration
                    </p>

                    <button
                      type="button"
                      onClick={() => setIsInvitationOpen(true)}
                      className="mt-10 w-full max-w-[310px] rounded-full border border-[#d3a94f]/70 bg-[linear-gradient(180deg,#6f2538_0%,#4a1828_58%,#34101b_100%)] px-8 py-4 text-xs font-bold uppercase tracking-[0.32em] text-[#fff8e9] shadow-[0_16px_30px_rgba(74,24,40,0.24)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_38px_rgba(74,24,40,0.32)] focus:outline-none focus:ring-4 focus:ring-[#d8bb71]/55 sm:px-12 sm:py-5 sm:text-sm"
                    >
                      View Invitation
                    </button>
                  </div>

                  <div className="relative z-10 h-1" />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="invitation-screen"
              ref={cardRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="relative z-10"
            >
              <InvitationCardTemplate />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
