"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SwarnaHeritageCard() {
  return (
    <div className="w-full flex flex-col items-center py-8 md:py-16">
      <div className="w-full flex items-center justify-center p-4 md:p-8 font-serif">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl w-full bg-white shadow-2xl relative overflow-hidden"
        >
          {/* Royal Golden Borders */}
          <div className="absolute inset-2 border-2 border-[#D4AF37] opacity-50"></div>
          <div className="absolute inset-4 border-[1px] border-[#D4AF37]"></div>

          {/* Top Decorative Corner Ornaments */}
          <div className="absolute top-6 left-6 w-12 h-12 border-t-4 border-l-4 border-[#B8860B]"></div>
          <div className="absolute top-6 right-6 w-12 h-12 border-t-4 border-r-4 border-[#B8860B]"></div>

          <div className="relative z-10 p-12 md:p-20 text-center flex flex-col items-center justify-center space-y-8">
            
            {/* Header Verse */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-[#8B6508] italic text-sm md:text-base tracking-wider"
            >
              <p>"The Lord has made everything beautiful in his time"</p>
              <p className="mt-1 font-semibold">- Eccl 3:11 -</p>
            </motion.div>

            {/* Title */}
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl text-[#D4AF37] my-6 font-light tracking-[0.2em] uppercase">
                Wedding
              </h1>
            </motion.div>

            {/* Hosts */}
            <div className="space-y-2 text-[#333333]">
              <h2 className="text-xl md:text-2xl font-medium tracking-widest uppercase">Mr. Yesuratnam</h2>
              <h2 className="text-xl md:text-2xl font-medium tracking-widest uppercase">& Mrs. Lakshmi Kumari</h2>
              <p className="mt-4 text-sm md:text-base italic text-gray-600 max-w-md mx-auto leading-relaxed">
                Cordially request the honour of your presence with your family on the auspicious occasion of the marriage of our elder son
              </p>
            </div>

            {/* The Couple */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="py-8"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-[#B8860B] mb-2 drop-shadow-sm">
                Rahul
              </h1>
              <span className="text-3xl text-[#D4AF37] italic my-4 block">&</span>
              <h1 className="text-5xl md:text-7xl font-bold text-[#B8860B] mt-2 drop-shadow-sm">
                Soniya
              </h1>
            </motion.div>

            {/* Bride's Parents Note */}
            <p className="text-xs md:text-sm text-gray-500 uppercase tracking-widest">
              (D/O, Mr. Anilkumar and Mrs. Swarupa)
            </p>
          </div>

          {/* Bottom Decorative Corner Ornaments */}
          <div className="absolute bottom-6 left-6 w-12 h-12 border-b-4 border-l-4 border-[#B8860B]"></div>
          <div className="absolute bottom-6 right-6 w-12 h-12 border-b-4 border-r-4 border-[#B8860B]"></div>
        </motion.div>
      </div>
    </div>
  );
}