"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SwarnaHeritageCard() {
  return (
    <div className="w-full flex flex-col items-center py-12 md:py-24 relative z-10 px-4 md:px-8">
      <div className="w-full flex items-center justify-center font-serif">
        <motion.div 
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[850px] w-full bg-[#060b14] border border-[#d4af37]/20 shadow-[0_30px_80px_rgba(0,0,0,0.5)] relative overflow-hidden rounded-sm"
        >
          {/* Subtle Background Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.8)_0%,rgba(6,11,20,1)_100%)] pointer-events-none"></div>

          {/* Central Watermark (Mandala/Lotus) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06]">
            <svg viewBox="0 0 200 200" className="w-[80%] max-w-[500px] text-[#d4af37] fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M100,0 C120,40 180,20 200,100 C180,180 120,160 100,200 C80,160 20,180 0,100 C20,20 80,40 100,0 Z M100,30 C110,60 150,50 170,100 C150,150 110,140 100,170 C90,140 50,150 30,100 C50,50 90,60 100,30 Z"/>
            </svg>
          </div>

          {/* Elegant Double Borders */}
          <div className="absolute inset-3 border-[1px] border-[#d4af37]/30 pointer-events-none"></div>
          <div className="absolute inset-5 border-[2px] border-[#b8862f]/40 pointer-events-none shadow-[inset_0_0_30px_rgba(212,175,55,0.05)]"></div>

          {/* Intricate Corner Ornaments */}
          <div className="absolute top-4 left-4 w-20 h-20 border-t-[2px] border-l-[2px] border-[#d4af37]/80 pointer-events-none">
            <div className="absolute top-1 left-1 w-16 h-16 border-t-[1px] border-l-[1px] border-[#d4af37]/40"></div>
          </div>
          <div className="absolute top-4 right-4 w-20 h-20 border-t-[2px] border-r-[2px] border-[#d4af37]/80 pointer-events-none">
            <div className="absolute top-1 right-1 w-16 h-16 border-t-[1px] border-r-[1px] border-[#d4af37]/40"></div>
          </div>
          <div className="absolute bottom-4 left-4 w-20 h-20 border-b-[2px] border-l-[2px] border-[#d4af37]/80 pointer-events-none">
            <div className="absolute bottom-1 left-1 w-16 h-16 border-b-[1px] border-l-[1px] border-[#d4af37]/40"></div>
          </div>
          <div className="absolute bottom-4 right-4 w-20 h-20 border-b-[2px] border-r-[2px] border-[#d4af37]/80 pointer-events-none">
            <div className="absolute bottom-1 right-1 w-16 h-16 border-b-[1px] border-r-[1px] border-[#d4af37]/40"></div>
          </div>

          {/* Main Content Container */}
          <div className="relative z-10 px-8 py-16 md:px-24 md:py-28 text-center flex flex-col items-center justify-center">
            
            {/* Sacred Verse */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1.2 }}
              className="mb-10 flex flex-col items-center"
            >
              <span className="text-[#d4af37] text-2xl mb-3 opacity-80">✦</span>
              <p className="text-[#e2d5c3] italic text-[13px] md:text-[15px] tracking-[0.15em] font-light leading-relaxed max-w-sm drop-shadow-md">
                "The Lord has made everything beautiful in his time"
              </p>
              <p className="mt-3 font-medium text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-[#d4af37]">- Ecclesiastes 3:11 -</p>
            </motion.div>

            {/* The Wedding Celebration */}
            <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.8, duration: 1.2 }}
               className="flex items-center gap-4 w-full justify-center mb-8"
            >
              <div className="h-[1px] bg-gradient-to-r from-transparent to-[#d4af37]/60 flex-1 max-w-[80px]"></div>
              <h1 className="text-xl md:text-2xl font-light tracking-[0.4em] uppercase text-[#d4af37] drop-shadow-md">
                Wedding Invitation
              </h1>
              <div className="h-[1px] bg-gradient-to-l from-transparent to-[#d4af37]/60 flex-1 max-w-[80px]"></div>
            </motion.div>

            {/* Hosts */}
            <div className="space-y-2 text-[#fdfaf5] relative mb-12">
              <h2 className="text-[14px] md:text-[16px] font-medium tracking-[0.25em] uppercase text-[#e2d5c3]">Mr. Yesuratnam</h2>
              <h2 className="text-[14px] md:text-[16px] font-medium tracking-[0.25em] uppercase text-[#e2d5c3]">& Mrs. Lakshmi Kumari</h2>
              <p className="mt-5 text-[12px] md:text-[14px] italic text-[#b5a691] max-w-md mx-auto leading-loose font-light">
                Joyfully invite you and your family to grace the auspicious occasion of the marriage of their beloved son
              </p>
            </div>

            {/* The Couple */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
              className="py-6 w-full flex flex-col items-center relative"
            >
              {/* Decorative background glow for names */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#d4af37]/15 blur-[60px] rounded-full pointer-events-none"></div>
              
              <h1 className="text-6xl md:text-[7rem] text-transparent bg-clip-text bg-gradient-to-b from-[#e8d197] via-[#D4AF37] to-[#B8862F] font-medium drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]" style={{ fontFamily: 'Georgia, Times New Roman, serif', lineHeight: 1.1 }}>
                Rahul
              </h1>
              <div className="flex items-center justify-center gap-6 my-4">
                <span className="w-12 h-px bg-[#d4af37]/40"></span>
                <span className="text-[10px] md:text-xs text-[#d4af37] tracking-[0.4em] uppercase font-semibold opacity-90">With</span>
                <span className="w-12 h-px bg-[#d4af37]/40"></span>
              </div>
              <h1 className="text-6xl md:text-[7rem] text-transparent bg-clip-text bg-gradient-to-b from-[#e8d197] via-[#D4AF37] to-[#B8862F] font-medium drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]" style={{ fontFamily: 'Georgia, Times New Roman, serif', lineHeight: 1.1 }}>
                Soniya
              </h1>
            </motion.div>

            {/* Bride's Parents Note */}
            <p className="text-[9px] md:text-[11px] text-[#b5a691] uppercase tracking-[0.25em] font-medium opacity-80 mt-4 mb-14">
              (D/O, Mr. Anilkumar & Mrs. Swarupa)
            </p>

            {/* Ornate Divider */}
            <div className="flex items-center justify-center gap-3 mb-12 opacity-80">
              <div className="w-16 md:w-32 h-[1px] bg-gradient-to-r from-transparent to-[#d4af37]"></div>
              <div className="w-2 h-2 rotate-45 border border-[#d4af37]"></div>
              <div className="w-16 md:w-32 h-[1px] bg-gradient-to-l from-transparent to-[#d4af37]"></div>
            </div>

            {/* Event Details Integrated */}
            <div className="flex flex-col md:flex-row justify-center items-start gap-12 md:gap-16 w-full px-2 mb-10">
              
              {/* Poruwa */}
              <div className="flex flex-col items-center flex-1 w-full bg-[#0f172a]/60 p-6 md:p-8 rounded-t-full rounded-b-lg border border-[#d4af37]/20 shadow-[0_8px_30px_rgba(0,0,0,0.2)] backdrop-blur-md">
                <span className="text-[#d4af37] text-2xl mb-3 opacity-90">🪷</span>
                <h4 className="text-[14px] md:text-[16px] text-[#e8d197] font-medium tracking-[0.2em] uppercase mb-5 drop-shadow-sm">Poruwa Ceremony</h4>
                
                <span className="text-[#d4af37] text-[8px] uppercase tracking-[0.3em] mb-1 font-semibold">Date</span>
                <p className="text-[#fdfaf5] text-[13px] md:text-[15px] uppercase tracking-[0.15em] mb-4 font-medium">12th Dec 2026</p>
                
                <div className="w-8 h-[1px] bg-[#d4af37]/40 mb-4"></div>
                
                <span className="text-[#d4af37] text-[8px] uppercase tracking-[0.3em] mb-1 font-semibold">Time</span>
                <p className="text-[#d4af37] text-[13px] italic mb-5 font-serif">09:00 AM Onwards</p>
                
                <p className="text-[#b5a691] text-[11px] md:text-xs leading-[1.8] uppercase tracking-[0.1em] font-light text-center">
                  The Grand Ballroom<br />
                  Taj Samudra Hotel<br />
                  Colombo 03
                </p>
              </div>

              {/* Reception */}
              <div className="flex flex-col items-center flex-1 w-full bg-[#0f172a]/60 p-6 md:p-8 rounded-t-full rounded-b-lg border border-[#d4af37]/20 shadow-[0_8px_30px_rgba(0,0,0,0.2)] backdrop-blur-md mt-8 md:mt-0">
                <span className="text-[#d4af37] text-2xl mb-3 opacity-90">🥂</span>
                <h4 className="text-[14px] md:text-[16px] text-[#e8d197] font-medium tracking-[0.2em] uppercase mb-5 drop-shadow-sm">Grand Reception</h4>
                
                <span className="text-[#d4af37] text-[8px] uppercase tracking-[0.3em] mb-1 font-semibold">Date</span>
                <p className="text-[#fdfaf5] text-[13px] md:text-[15px] uppercase tracking-[0.15em] mb-4 font-medium">12th Dec 2026</p>
                
                <div className="w-8 h-[1px] bg-[#d4af37]/40 mb-4"></div>
                
                <span className="text-[#d4af37] text-[8px] uppercase tracking-[0.3em] mb-1 font-semibold">Time</span>
                <p className="text-[#d4af37] text-[13px] italic mb-5 font-serif">07:00 PM Onwards</p>
                
                <p className="text-[#b5a691] text-[11px] md:text-xs leading-[1.8] uppercase tracking-[0.1em] font-light text-center">
                  The Crystal Room<br />
                  Taj Samudra Hotel<br />
                  Colombo 03
                </p>
              </div>

            </div>

            {/* Dress Code */}
            <div className="mt-4 px-8 py-4 border border-[#d4af37]/30 rounded-full w-full max-w-sm mx-auto flex flex-col items-center bg-[#0f172a]/60 backdrop-blur-md">
              <span className="text-[#d4af37] text-[9px] uppercase tracking-[0.3em] font-semibold mb-1">Dress Code</span>
              <span className="text-[#e2d5c3] text-[13px] font-light italic">Traditional Elegance or Formal Attire</span>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}