"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BotanicalGraceCard from "./botanicalGraceCard";

// 🌿 1. We add this interface to tell TypeScript exactly what a 'particle' is!
interface Particle {
  id: number;
  tx: number;
  ty: number;
  rot: number;
  scale: number;
  delay: number;
  isPetal: boolean;
}

export default function BotanicalGraceTemplate() {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const [hideEnvelope, setHideEnvelope] = useState(false);
  
  // 🛠️ 2. We add <Particle[]> here so TS knows this isn't a 'never[]' anymore!
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Lock scrolling while the envelope is closed or animating
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = isInvitationOpen ? "auto" : "hidden";

    if (isInvitationOpen) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isInvitationOpen]);

  // Generate random particles (leaves and petals) for the burst animation! 🌸🍃
  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 45 }).map((_, i) => {
      const angle = (Math.random() * Math.PI * 2); // Random direction in a circle
      const velocity = 150 + Math.random() * 400; // How far they fly
      return {
        id: i,
        tx: Math.cos(angle) * velocity, 
        ty: Math.sin(angle) * velocity - 100, // Slight upward bias
        rot: Math.random() * 720 - 360, // Spin amount
        scale: 0.5 + Math.random() * 1, // Random sizes
        delay: Math.random() * 0.15, // Slight stagger for natural feel
        isPetal: Math.random() > 0.5, // 50/50 chance of leaf vs petal
      };
    });
    setParticles(newParticles);
  }, []);

  return (
    <main className="relative min-h-screen bg-[#f6f7f5] overflow-hidden">
      
      {/* ✨ THE MAIN INVITATION CARD ✨ */}
      <motion.div
        initial={{ scale: 0.95, filter: "blur(8px)", opacity: 0.5 }}
        animate={
          isInvitationOpen 
            ? { scale: 1, filter: "blur(0px)", opacity: 1 } 
            : { scale: 0.95, filter: "blur(8px)", opacity: 0.5 }
        }
        transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
      >
        <BotanicalGraceCard />
      </motion.div>

      {/* 🌿 THE BOTANICAL GATE-FOLD ENVELOPE 🌿 */}
      <AnimatePresence onExitComplete={() => setHideEnvelope(true)}>
        {!isInvitationOpen && !hideEnvelope && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none overflow-hidden">
            
            {/* 🍃 LEFT DOOR 🍃 */}
            <motion.div
              exit={{ x: "-100%" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="absolute left-0 top-0 h-full w-1/2 bg-[#f4f5f2] border-r border-[#8a9a86]/40 pointer-events-auto shadow-[20px_0_50px_rgba(34,66,41,0.08)] flex justify-end overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,_rgba(138,154,134,0.1),_transparent_70%)]" />
              
              {/* Decorative Botanical Branch SVG */}
              <svg className="absolute top-0 right-0 h-full w-auto text-[#8a9a86]/20 opacity-60 translate-x-1/4" viewBox="0 0 200 800" fill="none">
                <path d="M100,-50 Q20,150 150,400 T50,850" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M110,100 Q150,120 160,80 Q130,70 110,100 Z" fill="currentColor" />
                <path d="M60,250 Q20,230 10,270 Q40,280 60,250 Z" fill="currentColor" />
                <path d="M130,500 Q180,520 190,480 Q150,460 130,500 Z" fill="currentColor" />
                <path d="M80,650 Q40,630 30,670 Q60,680 80,650 Z" fill="currentColor" />
              </svg>

              <div className="h-full w-1 bg-gradient-to-r from-transparent to-[#8a9a86]/30" />
            </motion.div>

            {/* 🍃 RIGHT DOOR 🍃 */}
            <motion.div
              exit={{ x: "100%" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="absolute right-0 top-0 h-full w-1/2 bg-[#f4f5f2] border-l border-[#8a9a86]/40 pointer-events-auto shadow-[-20px_0_50px_rgba(34,66,41,0.08)] flex justify-start overflow-hidden"
            >
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,_rgba(193,204,192,0.15),_transparent_70%)]" />
               
               {/* Decorative Botanical Branch SVG */}
               <svg className="absolute top-0 left-0 h-full w-auto text-[#8a9a86]/20 opacity-60 -translate-x-1/4" viewBox="0 0 200 800" fill="none">
                <path d="M100,-50 Q180,150 50,400 T150,850" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M90,100 Q50,120 40,80 Q70,70 90,100 Z" fill="currentColor" />
                <path d="M140,250 Q180,230 190,270 Q160,280 140,250 Z" fill="currentColor" />
                <path d="M70,500 Q20,520 10,480 Q50,460 70,500 Z" fill="currentColor" />
                <path d="M120,650 Q160,630 170,670 Q140,680 120,650 Z" fill="currentColor" />
              </svg>

               <div className="h-full w-1 bg-gradient-to-l from-transparent to-[#8a9a86]/30" />
            </motion.div>

            {/* 🌸 THE BOTANICAL BURST PARTICLES 🌸 */}
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                exit={{
                  scale: [0, p.scale, p.scale * 0.8, 0],
                  x: [0, p.tx * 0.8, p.tx],
                  y: [0, p.ty * 0.8, p.ty + 100],
                  rotate: [0, p.rot],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{ duration: 1.8, delay: p.delay, ease: "easeOut" }}
                className={`absolute top-1/2 left-1/2 z-40 shadow-sm pointer-events-none 
                  ${p.isPetal 
                    ? "w-4 h-4 bg-[#e8d5c4]/90 rounded-full rounded-tr-sm" 
                    : "w-5 h-5 bg-[#8a9a86]/80 rounded-tl-full rounded-br-full rounded-tr-sm rounded-bl-sm"
                  }
                `}
              />
            ))}

            {/* 💎 THE CENTER GLASS CARD 💎 */}
            <motion.div
              exit={{ opacity: 0, scale: 0.85, y: -20, filter: "blur(12px)" }}
              transition={{ duration: 0.5, ease: "easeIn" }}
              className="relative z-10 w-full max-w-xl px-4 pointer-events-auto"
            >
              <div className="relative w-full rounded-tl-[4rem] rounded-br-[4rem] rounded-tr-2xl rounded-bl-2xl border border-white/90 bg-white/60 px-8 py-16 text-center shadow-[0_40px_80px_rgba(34,66,41,0.1)] backdrop-blur-2xl sm:px-12">
                
                <div className="absolute inset-0 rounded-tl-[4rem] rounded-br-[4rem] rounded-tr-2xl rounded-bl-2xl bg-[radial-gradient(circle_at_top,_rgba(255,255,255,1),_transparent_60%)]" />
                
                {/* Elegant Corner Accents */}
                <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-[#8a9a86]/30 rounded-tl-3xl" />
                <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-[#8a9a86]/30 rounded-br-3xl" />

                <div className="relative">
                  <p className="text-[10px] uppercase tracking-[0.5em] text-[#8a9a86] font-semibold drop-shadow-sm mb-12">
                    Together with their families
                  </p>

                  <h1 className="mt-4 font-serif text-6xl italic leading-none text-[#2e3b32] sm:text-7xl drop-shadow-sm">
                    David
                  </h1>

                  <div className="my-4 text-4xl font-light text-[#aab8a6] italic">&amp;</div>

                  <h1 className="font-serif text-6xl italic leading-none text-[#2e3b32] sm:text-7xl drop-shadow-sm">
                    Roshel
                  </h1>

                  <div className="mx-auto mt-12 flex items-center justify-center gap-4 text-[#8a9a86]">
                    <span className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#8a9a86]" />
                    <svg className="w-4 h-4 text-[#8a9a86]/70" viewBox="0 0 24 24" fill="currentColor">
                       <path d="M21,3C21,3 19,17 12,19C5,21 3,21 3,21C3,21 5,14 7,12C11,8 21,3 21,3Z" />
                    </svg>
                    <span className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#8a9a86]" />
                  </div>

                  <p className="mt-10 text-[11px] uppercase tracking-[0.4em] text-[#2e3b32]/80 font-medium">
                    Invite you to celebrate
                  </p>

                  <div className="mt-14 flex justify-center">
                    {/* Beautiful Botanical Button 🌿 */}
                    <button
                      type="button"
                      onClick={() => setIsInvitationOpen(true)}
                      className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-[#8a9a86]/50 bg-[#f4f5f2]/80 backdrop-blur-sm px-10 py-5 text-[11px] font-semibold uppercase tracking-[0.4em] text-[#2e3b32] shadow-xl shadow-[#8a9a86]/10 transition-all duration-500 hover:scale-[1.03] hover:bg-[#8a9a86] hover:text-white hover:border-transparent hover:shadow-2xl hover:shadow-[#8a9a86]/30"
                    >
                      <span className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-[150%]" />
                      <span className="relative flex items-center gap-3">
                        Open with Love

                      </span>
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