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
    <main id="top" className="relative min-h-screen overflow-hidden bg-[#f6ebd8] text-[#8f5a2d]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.85),_rgba(246,235,216,0.3)_40%,_rgba(244,226,198,0.9)_100%)]" />
      <div className="absolute inset-0 opacity-50 mix-blend-soft-light bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.9)_0,rgba(255,255,255,0)_18%),radial-gradient(circle_at_80%_15%,rgba(255,240,216,0.85)_0,rgba(255,255,255,0)_20%),radial-gradient(circle_at_50%_75%,rgba(255,245,230,0.6)_0,rgba(255,255,255,0)_22%)]" />

      <div className="absolute inset-y-0 left-0 right-0 bg-[linear-gradient(90deg,transparent_0,rgba(255,255,255,0.18)_50%,transparent_100%)] opacity-30" />

      <div className="relative min-h-screen">
        <AnimatePresence mode="wait">
          {!isInvitationOpen ? (
            <motion.div
              key="open-screen"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.98 }}
              transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8"
            >
              <div className="relative flex w-full max-w-4xl justify-center">
                <div className="absolute inset-x-6 top-8 h-[calc(100%-2rem)] rounded-[3rem] bg-black/5 blur-3xl" />

                <div className="relative w-full max-w-[430px] rounded-[2.75rem] border border-[#ead9be] bg-[#f7f1e7]/90 px-8 py-14 text-center shadow-[0_24px_70px_rgba(143,90,45,0.14)] backdrop-blur-sm sm:px-12 sm:py-16">
                  <div className="pointer-events-none absolute right-8 top-8 h-28 w-28 rounded-full border border-[#d8c4a6]/70 border-l-transparent border-b-transparent opacity-60" />
                  <div className="pointer-events-none absolute right-10 top-14 h-40 w-px bg-gradient-to-b from-[#d9c4a4]/80 via-[#dbcbb3]/40 to-transparent rotate-[-4deg] origin-top" />

                  <p className="text-[10px] uppercase tracking-[0.45em] text-[#b07a42]">
                    Together with their families
                  </p>

                  <h1 className="mt-12 font-serif text-5xl italic leading-none text-[#b66a2f] sm:text-6xl">
                    Umidu
                  </h1>

                  <div className="my-5 text-4xl text-[#b66a2f]">&amp;</div>

                  <h1 className="font-serif text-5xl italic leading-none text-[#b66a2f] sm:text-6xl">
                    Thimeth
                  </h1>

                  <div className="mx-auto mt-12 flex items-center justify-center gap-4 text-[#b66a2f]">
                    <span className="h-px w-12 bg-current" />
                    <span className="text-sm">•</span>
                    <span className="h-px w-12 bg-current" />
                  </div>

                  <p className="mt-10 text-[10px] uppercase tracking-[0.45em] text-[#b07a42]">
                    Invite you to celebrate their wedding
                  </p>

                  <div className="mt-12">
                    <button
                      type="button"
                      onClick={() => setIsInvitationOpen(true)}
                      className="inline-flex items-center justify-center rounded-full border border-[#b66a2f] px-8 py-4 text-[11px] uppercase tracking-[0.45em] text-[#b66a2f] transition-all duration-300 hover:bg-[#b66a2f] hover:text-[#f7f1e7]"
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