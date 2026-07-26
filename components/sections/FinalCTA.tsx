"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
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
      transition: { type: "spring" as const, stiffness: 45, damping: 20 },
    },
  };

  return (
    <section className="relative overflow-hidden py-32 lg:py-44 bg-[#050505] border-t border-[#141414]">
      {/* Concentric glowing background circles */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="h-[600px] w-[600px] rounded-full border border-[#CBA365]/20"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.2 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
          className="absolute h-[450px] w-[450px] rounded-full border border-[#CBA365]/30"
        />
        <div className="absolute h-[300px] w-[300px] bg-[radial-gradient(ellipse_at_center,rgba(203,163,101,0.12)_0%,rgba(5,5,5,0)_70%)] blur-3xl animate-pulse-slow" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 mx-auto max-w-4xl px-4 text-center flex flex-col items-center"
      >
        {/* Brand Crest Logo */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="w-14 h-14 rounded-xl p-0.5 bg-[#0c0c0c] border border-[#CBA365]/40 shadow-xl shadow-[#CBA365]/15 backdrop-blur-md">
            <Image
              src="/images/mohotha-logo.png"
              alt="MOHOTHA Logo Emblem"
              width={56}
              height={56}
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#CBA365]/30 bg-[#0d0d0d] text-[10px] font-semibold uppercase tracking-[0.3em] text-[#CBA365] mb-6"
        >
          The Beginning
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="heading-font text-5xl sm:text-6xl lg:text-7xl font-normal leading-tight text-white"
        >
          Curate Your Digital <span className="gold-gradient-text italic">Legacy</span>
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="mx-auto mt-6 max-w-xl text-sm sm:text-base leading-relaxed text-[#a3a3a3] font-light"
        >
          Join Sri Lanka’s most discerning couples who choose to elevate their 
          wedding announcements. Begin curating your invitation today with zero initial cost.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row w-full sm:w-auto"
        >
          <Link
            href="#templates"
            className="w-full sm:w-auto group relative inline-flex items-center justify-center rounded-full bg-[#CBA365] px-10 py-4.5 text-xs font-bold tracking-[0.2em] text-[#050505] uppercase transition-all duration-300 hover:bg-[#dfba7c] shadow-xl shadow-[#CBA365]/20"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="#calculator"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-[#333333] bg-[#0c0c0c] px-8 py-4.5 text-xs font-semibold tracking-[0.2em] text-[#cccccc] uppercase transition-colors hover:border-[#CBA365] hover:text-white"
          >
            Calculate Savings
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
