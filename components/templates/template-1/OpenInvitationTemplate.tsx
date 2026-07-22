"use client";

import Image from "next/image";
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
    <main id="top" className="relative min-h-screen overflow-hidden bg-[#0e0c10] text-[#f4efe6]">
      <Image
        src="/images/hero/dark4.jpg"
        alt="Invitation background"
        fill
        priority
        className="absolute inset-0 object-cover object-center opacity-25"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(44,34,44,0.9),rgba(14,12,16,0.88)_36%,rgba(10,9,13,0.96)_72%,rgba(5,5,8,0.98)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,214,178,0.08)_0,rgba(255,255,255,0)_18%),radial-gradient(circle_at_80%_16%,rgba(231,208,255,0.06)_0,rgba(255,255,255,0)_16%),radial-gradient(circle_at_50%_84%,rgba(255,255,255,0.05)_0,rgba(255,255,255,0)_26%)] opacity-90 mix-blend-screen" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.38)_45%,rgba(0,0,0,0.72)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,12,0.82)_0%,rgba(10,10,12,0)_18%,rgba(10,10,12,0)_82%,rgba(10,10,12,0.82)_100%)]" />

      <div className="relative min-h-screen">
        <AnimatePresence mode="wait">
          {!isInvitationOpen ? (
            <motion.div
              key="open-screen"
              initial={{ opacity: 0, y: 32, scale: 0.965 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.98 }}
              transition={{ duration: 0.75, ease: [0.22, 0.61, 0.36, 1] }}
              className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8"
            >
              <div className="relative flex w-full max-w-5xl justify-center">
                <div className="absolute inset-x-8 top-12 h-[calc(100%-3rem)] rounded-[3.5rem] bg-black/35 blur-3xl" />

                <div className="relative flex min-h-190 w-full max-w-110 flex-col items-center justify-between overflow-hidden rounded-[999px] border border-white/10 bg-[linear-gradient(180deg,rgba(33,30,38,0.9)_0%,rgba(14,13,18,0.96)_100%)] px-8 py-10 text-center shadow-[0_28px_90px_rgba(0,0,0,0.42)] ring-1 ring-white/8 backdrop-blur-xl sm:px-12 sm:py-12">
                  <motion.div
                    aria-hidden="true"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.1, ease: [0.22, 0.61, 0.36, 1] }}
                    className="pointer-events-none absolute inset-0"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.08),rgba(255,255,255,0)_45%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,12,0)_0%,rgba(10,10,12,0.1)_35%,rgba(10,10,12,0.2)_100%)]" />
                  </motion.div>
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),rgba(255,255,255,0)_75%)]" />
                  <div className="pointer-events-none absolute inset-x-8 top-6 h-32 rounded-full border border-white/8 opacity-70" />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_50%_22%,rgba(255,255,255,0.08),rgba(255,255,255,0)_18%),radial-gradient(circle_at_50%_78%,rgba(255,255,255,0.05),rgba(255,255,255,0)_16%)]" />

                  <div className="relative z-20 flex flex-col items-center gap-25 pt-20">
                    <div className="flex flex-col items-center gap-5 text-[#b8bcc8]">
                      <p className="text-[11px] italic tracking-[0.08em] text-[#9da3b3] sm:text-sm">
                        You are invited to the Wedding of
                      </p>
                      <p className="font-serif text-[56px] italic leading-none text-[#f4efe6] sm:text-[68px]">
                        Umidu
                      </p>
                      <div className="text-4xl leading-none text-[#9da3b3]">&amp;</div>
                      <p className="font-serif text-[56px] italic leading-none text-[#f4efe6] sm:text-[68px]">
                        Thimeth
                      </p>
                    </div>

                    <div className="rounded-full border border-[#d8b36a]/70 bg-[linear-gradient(180deg,rgba(214,173,81,0.98)_0%,rgba(166,118,32,0.98)_100%)] px-12 py-4 text-[11px] uppercase tracking-[0.5em] text-[#fff6df] shadow-[0_14px_34px_rgba(182,136,47,0.42)] transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(182,136,47,0.52)]">
                      <button
                        type="button"
                        onClick={() => setIsInvitationOpen(true)}
                        className="w-full"
                      >
                        View Invitation
                      </button>
                    </div>
                  </div>

                  <div className="relative z-10 flex flex-col items-center gap-5 pb-4">
                    <div className="h-24 w-24 rounded-full border border-white/10 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.12),rgba(110,103,121,0.18)_45%,rgba(22,20,28,0.15)_100%)] shadow-[0_18px_40px_rgba(0,0,0,0.2)]" />
                    <div className="flex items-center gap-3 text-[#8c92a3]">
                      <span className="h-px w-10 bg-current/60" />
                      <span className="text-lg leading-none">^⌄</span>
                      <span className="h-px w-10 bg-current/60" />
                    </div>
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