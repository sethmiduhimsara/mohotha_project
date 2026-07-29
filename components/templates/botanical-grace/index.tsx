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

interface Ambient {
  id: number;
  left: number; // vw
  size: number; // px
  duration: number; // s
  delay: number;
  drift: number; // px sideways sway
  rot: number;
  isPetal: boolean;
}

// 🍃 A real leaf silhouette — pointed oval with a center vein.
// Reused everywhere (garlands, arch, particles, corner sprigs) so the whole
// piece reads as one consistent hand-drawn botanical language.
function LeafShape({
  className = "",
  fill = "#4f6b47",
  vein = "rgba(255,255,255,0.35)",
}: {
  className?: string;
  fill?: string;
  vein?: string;
}) {
  return (
    <svg viewBox="-22 -38 44 76" className={className} aria-hidden="true">
      <path
        d="M0,-36 C15,-24 17,22 0,36 C-17,22 -15,-24 0,-36 Z"
        fill={fill}
      />
      <path
        d="M0,-30 C2,-10 2,10 0,30"
        stroke={vein}
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M0,-8 L9,-2" stroke={vein} strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M0,8 L-9,14" stroke={vein} strokeWidth="1" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// 🌸 A soft rounded petal, for the occasional warm accent among the greenery.
function PetalShape({ className = "", fill = "#ecdcc8" }: { className?: string; fill?: string }) {
  return (
    <svg viewBox="-20 -26 40 52" className={className} aria-hidden="true">
      <path d="M0,-24 C15,-14 15,14 0,24 C-15,14 -15,-14 0,-24 Z" fill={fill} opacity={0.95} />
    </svg>
  );
}

// A little hand-placed sprig: three leaves + a berry, used to punctuate corners
// and the top of the card. cx/cy in a 0-100 local box, s = overall scale.
function Sprig({ cx, cy, rot = 0, s = 1, tone = "#4f6b47" }: { cx: number; cy: number; rot?: number; s?: number; tone?: string }) {
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${rot}) scale(${s})`}>
      <path d="M0,0 Q-2,-14 0,-26" stroke={tone} strokeWidth="1.2" fill="none" opacity={0.7} />
      <g transform="translate(0,-8) rotate(-28)">
        <LeafShape className="w-6 h-6" fill={tone} />
      </g>
      <g transform="translate(0,-18) rotate(10)">
        <LeafShape className="w-5 h-5" fill={tone} />
      </g>
      <g transform="translate(1,-26) rotate(35)">
        <LeafShape className="w-4 h-4" fill={tone} />
      </g>
      <circle cx="-3" cy="-2" r="1.6" fill="#b98a4e" opacity={0.85} />
    </g>
  );
}

export default function BotanicalGraceTemplate() {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const [hideEnvelope, setHideEnvelope] = useState(false);

  // 🛠️ 2. We add <Particle[]> here so TS knows this isn't a 'never[]' anymore!
  const [particles, setParticles] = useState<Particle[]>([]);
  const [ambientLeaves, setAmbientLeaves] = useState<Ambient[]>([]);

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
      const angle = Math.random() * Math.PI * 2; // Random direction in a circle
      const velocity = 150 + Math.random() * 400; // How far they fly
      return {
        id: i,
        tx: Math.cos(angle) * velocity,
        ty: Math.sin(angle) * velocity - 100, // Slight upward bias
        rot: Math.random() * 720 - 360, // Spin amount
        scale: 0.5 + Math.random() * 1, // Random sizes
        delay: Math.random() * 0.15, // Slight stagger for natural feel
        isPetal: Math.random() > 0.65, // Mostly leaves, a few petals mixed in
      };
    });
    setParticles(newParticles);

    // A slow, ever-present drift of leaves in the background — the page
    // never stops feeling like it's sitting in a garden.
    const newAmbient: Ambient[] = Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 14 + Math.random() * 16,
      duration: 16 + Math.random() * 14,
      delay: Math.random() * -20,
      drift: 40 + Math.random() * 60,
      rot: Math.random() * 360,
      isPetal: Math.random() > 0.75,
    }));
    setAmbientLeaves(newAmbient);
  }, []);

  return (
    <main className="relative min-h-screen bg-[#f3f5ee] overflow-hidden">
      {/* 🌿 AMBIENT GARDEN — a quiet, continuous drift of leaves behind everything */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,_rgba(79,107,71,0.10),_transparent_55%),radial-gradient(circle_at_85%_90%,_rgba(79,107,71,0.10),_transparent_55%)]" />
        {ambientLeaves.map((a) => (
          <motion.div
            key={a.id}
            initial={{ y: "-10vh", x: 0, opacity: 0, rotate: a.rot }}
            animate={{
              y: "110vh",
              x: [0, a.drift, -a.drift, 0],
              opacity: [0, 0.35, 0.35, 0],
              rotate: a.rot + 200,
            }}
            transition={{
              duration: a.duration,
              delay: a.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ left: `${a.left}vw`, width: a.size, height: a.size }}
            className="absolute top-0"
          >
            {a.isPetal ? (
              <PetalShape className="w-full h-full" fill="#ecdcc8" />
            ) : (
              <LeafShape className="w-full h-full" fill="#5c7a56" />
            )}
          </motion.div>
        ))}
      </div>

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
              className="absolute left-0 top-0 h-full w-1/2 bg-[#f4f5ee] border-r border-[#5c7a56]/40 pointer-events-auto shadow-[20px_0_60px_rgba(20,40,24,0.12)] flex justify-end overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,_rgba(92,122,86,0.16),_transparent_70%)]" />
              <div className="absolute inset-y-0 right-0 w-24 bg-[linear-gradient(to_left,_rgba(31,51,39,0.06),_transparent)]" />

              {/* Layered eucalyptus vine, hugging the seam */}
              <svg
                className="absolute top-0 right-0 h-full w-[220px] opacity-90"
                viewBox="0 0 220 900"
                fill="none"
              >
                <defs>
                  <linearGradient id="stemL" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3d5636" />
                    <stop offset="100%" stopColor="#6b8862" />
                  </linearGradient>
                </defs>
                <path
                  d="M150,-40 Q60,140 165,340 Q230,520 100,640 Q30,740 140,900"
                  stroke="url(#stemL)"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                />
                <Sprig cx={130} cy={40} rot={-15} s={1.6} tone="#3d5636" />
                <Sprig cx={70} cy={150} rot={40} s={1.9} tone="#5c7a56" />
                <Sprig cx={175} cy={260} rot={-30} s={1.4} tone="#4f6b47" />
                <Sprig cx={110} cy={370} rot={55} s={2.1} tone="#3d5636" />
                <Sprig cx={200} cy={470} rot={-10} s={1.5} tone="#6b8862" />
                <Sprig cx={90} cy={560} rot={30} s={1.8} tone="#4f6b47" />
                <Sprig cx={150} cy={670} rot={-45} s={1.6} tone="#5c7a56" />
                <Sprig cx={60} cy={760} rot={20} s={1.9} tone="#3d5636" />
                <Sprig cx={140} cy={850} rot={-20} s={1.4} tone="#4f6b47" />
                {/* a couple of blush petals tucked into the greenery */}
                <g transform="translate(85,210) rotate(20)">
                  <PetalShape className="w-6 h-6" fill="#ecdcc8" />
                </g>
                <g transform="translate(160,610) rotate(-25)">
                  <PetalShape className="w-5 h-5" fill="#ecdcc8" />
                </g>
              </svg>

              <div className="h-full w-[2px] bg-gradient-to-r from-transparent via-[#5c7a56]/50 to-[#5c7a56]/70" />
            </motion.div>

            {/* 🍃 RIGHT DOOR 🍃 */}
            <motion.div
              exit={{ x: "100%" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="absolute right-0 top-0 h-full w-1/2 bg-[#f4f5ee] border-l border-[#5c7a56]/40 pointer-events-auto shadow-[-20px_0_60px_rgba(20,40,24,0.12)] flex justify-start overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,_rgba(92,122,86,0.16),_transparent_70%)]" />
              <div className="absolute inset-y-0 left-0 w-24 bg-[linear-gradient(to_right,_rgba(31,51,39,0.06),_transparent)]" />

              {/* Mirrored eucalyptus vine */}
              <svg
                className="absolute top-0 left-0 h-full w-[220px] opacity-90 -scale-x-100"
                viewBox="0 0 220 900"
                fill="none"
              >
                <defs>
                  <linearGradient id="stemR" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3d5636" />
                    <stop offset="100%" stopColor="#6b8862" />
                  </linearGradient>
                </defs>
                <path
                  d="M150,-40 Q60,140 165,340 Q230,520 100,640 Q30,740 140,900"
                  stroke="url(#stemR)"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                />
                <Sprig cx={130} cy={40} rot={-15} s={1.6} tone="#3d5636" />
                <Sprig cx={70} cy={150} rot={40} s={1.9} tone="#5c7a56" />
                <Sprig cx={175} cy={260} rot={-30} s={1.4} tone="#4f6b47" />
                <Sprig cx={110} cy={370} rot={55} s={2.1} tone="#3d5636" />
                <Sprig cx={200} cy={470} rot={-10} s={1.5} tone="#6b8862" />
                <Sprig cx={90} cy={560} rot={30} s={1.8} tone="#4f6b47" />
                <Sprig cx={150} cy={670} rot={-45} s={1.6} tone="#5c7a56" />
                <Sprig cx={60} cy={760} rot={20} s={1.9} tone="#3d5636" />
                <Sprig cx={140} cy={850} rot={-20} s={1.4} tone="#4f6b47" />
                <g transform="translate(85,210) rotate(20)">
                  <PetalShape className="w-6 h-6" fill="#ecdcc8" />
                </g>
                <g transform="translate(160,610) rotate(-25)">
                  <PetalShape className="w-5 h-5" fill="#ecdcc8" />
                </g>
              </svg>

              <div className="h-full w-[2px] bg-gradient-to-l from-transparent via-[#5c7a56]/50 to-[#5c7a56]/70" />
            </motion.div>

            {/* 🌸 THE BOTANICAL BURST PARTICLES — real leaf & petal silhouettes 🌸 */}
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
                className="absolute top-1/2 left-1/2 z-40 pointer-events-none drop-shadow-sm"
                style={{ width: p.isPetal ? 16 : 20, height: p.isPetal ? 16 : 20 }}
              >
                {p.isPetal ? (
                  <PetalShape className="w-full h-full" fill="#ecdcc8" />
                ) : (
                  <LeafShape className="w-full h-full" fill="#5c7a56" />
                )}
              </motion.div>
            ))}

            {/* 💎 THE CENTER GLASS CARD 💎 */}
            <motion.div
              exit={{ opacity: 0, scale: 0.85, y: -20, filter: "blur(12px)" }}
              transition={{ duration: 0.5, ease: "easeIn" }}
              className="relative z-10 w-full max-w-xl px-4 pointer-events-auto"
            >
              {/* Draped leaf arch over the top edge of the card */}
              <svg
                viewBox="0 0 400 90"
                className="absolute -top-14 left-1/2 -translate-x-1/2 w-[110%] max-w-none h-24 pointer-events-none"
              >
                <path
                  d="M20,15 Q200,75 380,15"
                  stroke="#4f6b47"
                  strokeWidth="1.5"
                  fill="none"
                  opacity={0.5}
                />
                <Sprig cx={40} cy={22} rot={-100} s={1.6} tone="#3d5636" />
                <Sprig cx={95} cy={48} rot={-70} s={2} tone="#5c7a56" />
                <Sprig cx={155} cy={62} rot={-45} s={1.7} tone="#4f6b47" />
                <Sprig cx={200} cy={68} rot={0} s={1.5} tone="#6b8862" />
                <Sprig cx={245} cy={62} rot={45} s={1.7} tone="#4f6b47" />
                <Sprig cx={305} cy={48} rot={70} s={2} tone="#5c7a56" />
                <Sprig cx={360} cy={22} rot={100} s={1.6} tone="#3d5636" />
                <g transform="translate(200,72) rotate(0)">
                  <PetalShape className="w-6 h-6" fill="#ecdcc8" />
                </g>
              </svg>

              <div className="relative w-full rounded-tl-[4rem] rounded-br-[4rem] rounded-tr-2xl rounded-bl-2xl border border-white/90 bg-white/60 px-8 pt-20 pb-16 text-center shadow-[0_40px_90px_rgba(20,40,24,0.16)] backdrop-blur-2xl sm:px-12">
                <div className="absolute inset-0 rounded-tl-[4rem] rounded-br-[4rem] rounded-tr-2xl rounded-bl-2xl bg-[radial-gradient(circle_at_top,_rgba(255,255,255,1),_transparent_60%)]" />
                <div className="absolute inset-0 rounded-tl-[4rem] rounded-br-[4rem] rounded-tr-2xl rounded-bl-2xl bg-[radial-gradient(circle_at_bottom,_rgba(92,122,86,0.08),_transparent_55%)]" />

                {/* Elegant leaf-sprig corner accents, replacing plain lines */}
                <svg viewBox="0 0 100 100" className="absolute top-3 left-3 w-14 h-14 opacity-80">
                  <Sprig cx={10} cy={90} rot={-35} s={1.5} tone="#5c7a56" />
                </svg>
                <svg viewBox="0 0 100 100" className="absolute bottom-3 right-3 w-14 h-14 opacity-80 rotate-180">
                  <Sprig cx={10} cy={90} rot={-35} s={1.5} tone="#5c7a56" />
                </svg>

                <div className="relative">
                  <p className="text-[10px] uppercase tracking-[0.5em] text-[#5c7a56] font-semibold drop-shadow-sm mb-12">
                    Together with their families
                  </p>

                  <h1 className="mt-4 font-serif text-6xl italic leading-none text-[#20331f] sm:text-7xl drop-shadow-sm">
                    David
                  </h1>

                  <div className="my-4 flex items-center justify-center gap-3 text-3xl font-light text-[#7f9a76] italic">
                    <LeafShape className="w-4 h-4 -rotate-45" fill="#7f9a76" />
                    <span>&amp;</span>
                    <LeafShape className="w-4 h-4 rotate-45" fill="#7f9a76" />
                  </div>

                  <h1 className="font-serif text-6xl italic leading-none text-[#20331f] sm:text-7xl drop-shadow-sm">
                    Roshel
                  </h1>

                  <div className="mx-auto mt-12 flex items-center justify-center gap-3 text-[#5c7a56]">
                    <span className="h-[1px] w-14 bg-gradient-to-r from-transparent to-[#5c7a56]" />
                    <LeafShape className="w-4 h-4 -rotate-90" fill="#4f6b47" />
                    <svg className="w-5 h-5 text-[#3d5636]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21,3C21,3 19,17 12,19C5,21 3,21 3,21C3,21 5,14 7,12C11,8 21,3 21,3Z" />
                    </svg>
                    <LeafShape className="w-4 h-4 rotate-90" fill="#4f6b47" />
                    <span className="h-[1px] w-14 bg-gradient-to-l from-transparent to-[#5c7a56]" />
                  </div>

                  <p className="mt-10 text-[11px] uppercase tracking-[0.4em] text-[#20331f]/80 font-medium">
                    Invite you to celebrate
                  </p>

                  <div className="mt-14 flex justify-center">
                    {/* Beautiful Botanical Button 🌿 */}
                    <button
                      type="button"
                      onClick={() => setIsInvitationOpen(true)}
                      className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-[#5c7a56]/50 bg-[#f4f5ee]/80 backdrop-blur-sm px-10 py-5 text-[11px] font-semibold uppercase tracking-[0.4em] text-[#20331f] shadow-xl shadow-[#5c7a56]/10 transition-all duration-500 hover:scale-[1.03] hover:bg-[#3d5636] hover:text-white hover:border-transparent hover:shadow-2xl hover:shadow-[#3d5636]/40"
                    >
                      <span className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-[150%]" />
                      <span className="relative flex items-center gap-3">
                        <LeafShape className="w-3.5 h-3.5 transition-colors" fill="currentColor" />
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