"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, CheckCircle2, TrendingDown, Leaf, Clock } from "lucide-react";

export default function SavingsCalculator() {
  const [guestCount, setGuestCount] = useState<number>(250);

  // Traditional cost per card avg in SL (Cardstock, Foil printing, Envelope, Delivery, Re-prints): Rs. 350 per card
  const printCostPerCard = 350;
  const totalPrintCost = guestCount * printCostPerCard;
  
  // Mohotha Flat Price: Rs. 2,500
  const mohothaPrice = 2500;
  const savings = Math.max(0, totalPrintCost - mohothaPrice);
  const percentageSaved = Math.round((savings / totalPrintCost) * 100);

  return (
    <section id="calculator" className="py-24 lg:py-36 bg-[#050505] relative overflow-hidden border-t border-[#141414]">
      <div className="mx-auto max-w-7xl px-4 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#CBA365]/30 bg-[#0d0d0d] text-[11px] font-medium tracking-[0.25em] text-[#CBA365] uppercase mb-4">
            <Calculator className="w-3.5 h-3.5" />
            Smart Investment Calculator
          </div>
          <h2 className="heading-font text-4xl sm:text-5xl lg:text-6xl font-normal text-white">
            Traditional Printing <span className="text-[#CBA365] italic">vs. MOHOTHA</span>
          </h2>
          <p className="mt-6 text-[#a3a3a3] text-sm sm:text-base font-light leading-relaxed">
            Drag the guest slider to see your immediate financial and environmental savings.
          </p>
        </div>

        {/* Calculator Widget */}
        <div className="mx-auto max-w-4xl border border-[#222222] bg-[#090909] rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Controls */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a3a3a3] block mb-3">
                  Estimated Guest / Invitation Count: <span className="text-[#CBA365] font-bold text-lg ml-2">{guestCount} Guests</span>
                </label>
                
                {/* Range Slider */}
                <input
                  type="range"
                  min="50"
                  max="800"
                  step="25"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full h-2 bg-[#1f1f1f] rounded-lg appearance-none cursor-pointer accent-[#CBA365]"
                />
                
                <div className="flex justify-between text-[10px] text-[#555555] font-medium mt-2">
                  <span>50 Guests</span>
                  <span>400 Guests</span>
                  <span>800+ Guests</span>
                </div>
              </div>

              {/* Breakdown List */}
              <div className="mt-8 space-y-4 border-t border-[#1a1a1a] pt-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#888888] font-light">Traditional Print &amp; Courier Cost:</span>
                  <span className="text-[#ff6b6b] font-medium line-through">Rs. {totalPrintCost.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#888888] font-light">MOHOTHA All-Inclusive Flat Fee:</span>
                  <span className="text-white font-semibold">Rs. {mohothaPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Right Highlights Box */}
            <div className="lg:col-span-6 border border-[#CBA365]/30 bg-gradient-to-b from-[#121212] to-[#0a0a0a] rounded-2xl p-8 text-center relative shadow-xl">
              <div className="absolute top-4 right-4 bg-[#CBA365]/10 border border-[#CBA365]/40 text-[#CBA365] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Save {percentageSaved}%
              </div>

              <span className="text-xs uppercase tracking-[0.25em] text-[#888888] font-medium block">Total Saved</span>
              <div className="heading-font text-5xl sm:text-6xl text-[#CBA365] my-4 font-normal gold-gradient-text">
                Rs. {savings.toLocaleString()}
              </div>

              <p className="text-xs text-[#a3a3a3] font-light leading-relaxed mb-6">
                Plus zero print delay risk, zero paper waste, and instant WhatsApp delivery worldwide.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-6 border-t border-[#222222]">
                <div className="flex items-center gap-2 text-left">
                  <Leaf className="w-4 h-4 text-[#4cd964] flex-shrink-0" />
                  <span className="text-[11px] text-[#cccccc]">Zero Paper Waste</span>
                </div>
                <div className="flex items-center gap-2 text-left">
                  <Clock className="w-4 h-4 text-[#CBA365] flex-shrink-0" />
                  <span className="text-[11px] text-[#cccccc]">Instant Deployment</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
