"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

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
      transition: { type: "spring", stiffness: 40, damping: 20, duration: 1.2 },
    },
  };

  return (
    <section className="relative overflow-hidden py-32 lg:py-48 bg-[#050505] border-t border-[#111111]">
      {/* Abstract dark luxury background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.5 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="h-200 w-200 rounded-full border border-[#222222]"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
          className="absolute h-150 w-150 rounded-full border border-[#222222]"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.4 }}
          className="absolute h-100 w-100 bg-[radial-gradient(ellipse_at_center,rgba(203,163,101,0.03)_0%,rgba(5,5,5,0)_70%)] blur-2xl"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 mx-auto max-w-3xl px-4 text-center"
      >
        <motion.p
          variants={itemVariants}
          className="mb-6 text-[10px] font-medium uppercase tracking-[0.4em] text-[#CBA365]"
        >
          The Beginning
        </motion.p>

        <motion.h2
          variants={itemVariants}
          className="heading-font text-5xl md:text-6xl font-normal leading-tight text-white lg:text-7xl"
        >
          Curate Your <span className="text-[#CBA365] italic">Legacy</span>
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="mx-auto mt-8 max-w-lg text-sm leading-relaxed text-[#a3a3a3] font-light"
        >
          Join an exclusive group of couples who chose to elevate their wedding
          announcements. Begin the curation process today without any initial
          investment.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-14 flex flex-col items-center justify-center gap-6 sm:flex-row"
        >
          <Link
            href="#"
            className="group relative inline-flex items-center justify-center bg-[#CBA365] px-12 py-5 text-xs font-medium tracking-[0.2em] text-[#050505] uppercase transition-all duration-300 hover:bg-[#b89154]"
          >
            Commence Design
          </Link>
          <Link
            href="#templates"
            className="inline-flex items-center justify-center px-10 py-5 text-xs font-medium tracking-[0.2em] text-[#a3a3a3] uppercase transition-colors hover:text-[#CBA365]"
          >
            View Archives
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
