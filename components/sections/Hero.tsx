"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Sparkles, Smartphone, Share2, ShieldCheck, ArrowRight, Play } from "lucide-react";

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring" as const, stiffness: 45, damping: 20, duration: 1 }
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#050505] pt-28 pb-20 lg:pt-36 lg:pb-28">
      
      {/* Background Image with Cinematic Glow Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.06 }}
          transition={{ duration: 24, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0"
        >
          <Image
            src="/images/hero/wedding-hero.jpg"
            alt="Luxury Sri Lankan Digital Wedding Invitation"
            fill
            priority
            className="object-cover opacity-[0.32] grayscale-[10%] mix-blend-luminosity"
          />
        </motion.div>
        
        {/* Layered dark gradients for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/75 to-[#050505]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]" />
        
        {/* Animated Gold Flare */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[550px] bg-[#E5B869]/10 rounded-full blur-[160px] animate-pulse-slow" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-7xl px-4 lg:px-8 relative z-10 flex flex-col items-center text-center"
      >
        
        {/* Official Crest Logo Emblem */}
        <motion.div variants={itemVariants} className="mb-6 relative flex items-center justify-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-1 bg-[#0c0c0c] border border-[#E5B869]/50 shadow-2xl shadow-[#E5B869]/20 backdrop-blur-md transition-transform duration-500 hover:scale-105 gold-glow-sm">
            <Image
              src="/images/mohotha-logo.png"
              alt="MOHOTHA Emblem"
              width={80}
              height={80}
              className="object-cover w-full h-full rounded-xl"
            />
          </div>
        </motion.div>

        {/* Eyebrow Pill */}
        <motion.div variants={itemVariants} className="mb-8 inline-flex items-center gap-3 border border-[#E5B869]/40 bg-[#0a0a0a]/80 backdrop-blur-md px-5 py-2 rounded-full shadow-lg shadow-black">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E5B869] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E5B869]"></span>
          </span>
          <span className="text-[11px] font-semibold tracking-[0.25em] text-[#e5e5e5] uppercase">
            The Pinnacle of Sri Lankan Digital Curation
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 variants={itemVariants} className="heading-font text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-normal leading-[1.02] text-white tracking-tight drop-shadow-2xl max-w-5xl">
          Digital <span className="gold-gradient-text italic">Invitations,</span><br />
          Elevated.
        </motion.h1>

        {/* Subtext */}
        <motion.p variants={itemVariants} className="mt-8 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-[#c2c2c2] font-light">
          A deeply considered platform for Sri Lankan couples who demand 
          unrivaled visual perfection. Experience digital invitations 
          with real-time RSVP tracking, live maps, and background music.
        </motion.p>

        {/* Feature Pills */}
        <motion.div variants={itemVariants} className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-[#a3a3a3]">
          <div className="flex items-center gap-2 border border-[#222222] bg-[#0c0c0c]/80 px-4 py-2 rounded-full">
            <Share2 className="w-3.5 h-3.5 text-[#E5B869]" />
            <span>Instant WhatsApp Share</span>
          </div>
          <div className="flex items-center gap-2 border border-[#222222] bg-[#0c0c0c]/80 px-4 py-2 rounded-full">
            <Smartphone className="w-3.5 h-3.5 text-[#E5B869]" />
            <span>100% Mobile Optimized</span>
          </div>
          <div className="flex items-center gap-2 border border-[#222222] bg-[#0c0c0c]/80 px-4 py-2 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E5B869]" />
            <span>Google Sheets Auto-Sync</span>
          </div>
        </motion.div>

        {/* Primary CTAs */}
        <motion.div variants={itemVariants} className="mt-12 flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
          <Link 
            href="#templates" 
            className="w-full sm:w-auto group relative inline-flex items-center justify-center bg-[#E5B869] px-9 py-4.5 rounded-full text-xs font-bold tracking-[0.2em] text-[#050505] uppercase transition-all duration-300 hover:bg-[#f3d498] shadow-2xl shadow-[#E5B869]/25 animate-shimmer-beam"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            <span>Discover The Collection</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            href="#interactive-preview" 
            className="w-full sm:w-auto group inline-flex items-center justify-center border border-[#333333] bg-[#0c0c0c]/70 backdrop-blur-md px-9 py-4.5 rounded-full text-xs font-semibold tracking-[0.2em] text-white uppercase transition-all duration-300 hover:border-[#E5B869] hover:text-[#E5B869]"
          >
            <Play className="w-3.5 h-3.5 mr-2 fill-current" />
            <span>Live Interactive Demo</span>
          </Link>
        </motion.div>

        {/* Live Metrics Grid */}
        <motion.div variants={itemVariants} className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-t border-[#1e1e1e] pt-12 w-full max-w-4xl">
          {[
            { label: "Design Craftsmanship", value: "Sri Lanka" },
            { label: "Delivery Speed", value: "Instant" },
            { label: "Environmental Impact", value: "0% Paper Waste" },
            { label: "Guest Capacity", value: "Unlimited" }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="heading-font text-xl sm:text-2xl md:text-3xl text-white mb-1 font-semibold">{stat.value}</span>
              <span className="text-[10px] tracking-[0.2em] text-[#777777] uppercase font-medium">{stat.label}</span>
            </div>
          ))}
        </motion.div>

      </motion.div>
    </section>
  );
}