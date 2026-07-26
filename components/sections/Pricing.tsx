"use client";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Check, Sparkles, ShieldCheck } from "lucide-react";

const freePlan = [
  "Single invitation template preview",
  "Standard hero countdown timer",
  "Fundamental RSVP form",
  "3-day live preview window",
];

const premiumPlan = [
  "Unlimited invitation page views",
  "Google Sheets live RSVP auto-sync",
  "Interactive 1-Tap Google Maps pin",
  "Background music audio reveal player",
  "High-resolution couple gallery photo suite",
  "Instant WhatsApp & social preview metadata",
  "Permanent archival host link",
  "Bespoke guest name personalization",
];

export default function Pricing() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring" as const, stiffness: 45, damping: 20 } 
    },
  };

  return (
    <section id="pricing" className="py-24 lg:py-36 bg-[#050505] border-t border-[#141414] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#CBA365]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 lg:px-8 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center max-w-3xl mx-auto"
        >
          <span className="text-[11px] font-semibold tracking-[0.3em] text-[#CBA365] uppercase block mb-3">
            Investment Structure
          </span>
          <h2 className="heading-font text-4xl sm:text-5xl lg:text-6xl font-normal text-white">
            Transparent <span className="text-[#CBA365] italic">Pricing</span>
          </h2>
          <p className="mt-4 text-[#a3a3a3] text-sm sm:text-base font-light">
            One-time fixed investment. Zero hidden fees. Zero recurring monthly subscriptions.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2 items-stretch"
        >
          
          {/* Complimentary Preview Plan */}
          <motion.div 
            variants={itemVariants} 
            className="flex flex-col justify-between rounded-3xl border border-[#1e1e1e] bg-[#090909] p-8 sm:p-10 transition-colors duration-500 hover:border-[#333333]"
          >
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#777777]">
                Complimentary Sandbox
              </p>
              <div className="flex items-baseline gap-2 mb-6">
                <h3 className="heading-font text-5xl text-white">
                  Rs. 0
                </h3>
              </div>
              <p className="mb-8 text-xs sm:text-sm text-[#a3a3a3] font-light leading-relaxed border-b border-[#1a1a1a] pb-6">
                Test and curate your invitation with full design freedom before making any final commitment.
              </p>
              
              <ul className="space-y-3.5 mb-10">
                {freePlan.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-xs sm:text-sm text-[#a3a3a3] font-light">
                    <span className="flex-none mt-1 w-1.5 h-1.5 rounded-full bg-[#444444]" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            
            <Link
              href="#templates"
              className="block w-full rounded-full border border-[#333333] py-4 text-center text-xs font-semibold uppercase tracking-[0.15em] text-white hover:border-[#CBA365] hover:text-[#CBA365] transition-colors"
            >
              Start Free Preview
            </Link>
          </motion.div>

          {/* Full Premium Collection Plan */}
          <motion.div 
            variants={itemVariants} 
            className="relative flex flex-col justify-between rounded-3xl border-2 border-[#CBA365] bg-gradient-to-b from-[#121212] to-[#0a0a0a] p-8 sm:p-10 shadow-2xl shadow-[#CBA365]/10"
          >
            {/* Top Recommended Tag */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#CBA365] text-[#050505] text-[10px] font-extrabold uppercase tracking-[0.25em] px-4 py-1 rounded-full shadow-lg">
              Most Popular Choice
            </div>

            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#CBA365]">
                Full Bespoke Package
              </p>
              <div className="flex items-baseline gap-2 mb-6">
                <h3 className="heading-font text-5xl text-white gold-gradient-text">
                  Rs. 2,500
                </h3>
                <span className="text-[10px] tracking-widest text-[#888888] uppercase">/ flat rate</span>
              </div>
              <p className="mb-8 text-xs sm:text-sm text-[#cccccc] font-light leading-relaxed border-b border-[#222222] pb-6">
                Unlock the complete suite of features, Google Sheets sync, maps, audio, and permanent live hosting.
              </p>
              
              <ul className="space-y-3.5 mb-10">
                {premiumPlan.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-xs sm:text-sm text-white font-light">
                    <Check className="flex-none w-4 h-4 text-[#CBA365] mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            
            <Link
              href="#templates"
              className="block w-full rounded-full bg-[#CBA365] py-4 text-center text-xs font-bold uppercase tracking-[0.15em] text-[#050505] hover:bg-[#dfba7c] transition-colors shadow-lg shadow-[#CBA365]/20"
            >
              Get Started Now
            </Link>
          </motion.div>
          
        </motion.div>

        <div className="mt-16 text-center">
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#666666] flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#CBA365]" />
            Zero Subscriptions • Secure Handover • Lifetime Archival
          </p>
        </div>
      </div>
    </section>
  );
}
