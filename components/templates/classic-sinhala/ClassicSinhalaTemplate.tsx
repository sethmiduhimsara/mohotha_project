"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import { submitRsvp } from "@/app/actions/wedding-invitation/rsvp";
import { Abhaya_Libre, Noto_Serif_Sinhala } from "next/font/google";
import {
  Heart,
  MapPin,
  Navigation,
  ChevronDown,
  CalendarDays,
  Sparkles,
  Volume2,
  VolumeX,
  Clock,
  ChevronRight,
  ScrollText,
  Wine,
  Utensils,
  PartyPopper,
} from "lucide-react";

import Section from "@/components/ui/Section";
import { FadeIn } from "@/components/templates/wedding-invitation/FadeIn";

// ─── Fonts ─────────────────────────────────────────────────────────────────
const abhaya = Abhaya_Libre({
  subsets: ["sinhala", "latin"],
  weight: ["400", "500", "600", "700", "800"],
});
const noto = Noto_Serif_Sinhala({
  subsets: ["sinhala"],
  weight: ["300", "400", "500", "600", "700"],
});

// ─── Design Tokens ─────────────────────────────────────────────────────────
// Deep Maroon:   #2d0a1a
// Saffron Gold:  #e8930a
// Parchment:     #fef3e2
// Dark Parchment:#f5e6cc
// Muted Brown:   #7a4a2a
// Light Cream:   #fdfaf4

// ─── Types ─────────────────────────────────────────────────────────────────
type GuestMessage = {
  id: string;
  name: string;
  attending: "accept" | "decline";
  guestCount: number;
  message: string;
  submittedAt: string;
};

type RsvpFormData = {
  name: string;
  attending: "" | "accept" | "decline";
  guestCount: string;
  message: string;
};

const emptyRsvpForm: RsvpFormData = { name: "", attending: "", guestCount: "", message: "" };

// ─── Data ──────────────────────────────────────────────────────────────────
const scheduleItems = [
  { time: "පෙ.ව. 9:00", title: "පෝරුවේ චාරිත්‍ර", desc: "සිංහල බෞද්ධ චාරිත්‍රානුකූලව පෝරුව මතදී අතිනත ගැනීම." },
  { time: "පෙ.ව. 10:00", title: "ආගමික වතාවත්", desc: "සෙත් පිරිත් සජ්ඣායනා මධ්‍යයේ අඹුසැමියන් ලෙස නව දිවියට පා තැබීම." },
  { time: "පෙ.ව. 11:00", title: "සුහද පිළිගැනීම", desc: "සැහැල්ලු පානයන්ගෙන් හා කෙටි කෑමෙන් ගෞරවනීය අමුත්තන්ට සංග්‍රහ කිරීම." },
  { time: "දහ.ව. 12:30", title: "මංගල භෝජන සංග්‍රහය", desc: "දේශීය මෙන්ම විදේශීය ආහාර රටාවන්ගෙන් සමන්විත වූ ප්‍රණීත භෝජන සංග්‍රහයක්." },
  { time: "ස.ව. 5:00", title: "සුන්දර සමුගැනීම", desc: "ආදරණීයයන්ගේ ආශිර්වාද මධ්‍යයේ නව යුවළ සිය මධුසමය බලා පිටත්ව යාම." },
];

const timeline = [
  {
    num: "01",
    year: "2019",
    title: "පළමු හමුවීම",
    desc: "නුවරඑළියේ මීදුම පිරුණු කඳු පල්ලමකදී, අහඹු ලෙස මුණගැසුණු ඔවුන්ගේ දෙනෙත් එකිනෙක යා විය. එම නිමේෂයේදීම ඔවුන්ගේ හදවත් එකම රිද්මයකට ගැහෙන්නට පටන් ගත්තේය.",
  },
  {
    num: "02",
    year: "2021",
    title: "සොඳුරු ගමන් සඟයා",
    desc: "සීගිරි පර්වතයේ මුදුනට නැඟුණු ඔවුහු, සොබාදහමේ අපූර්වත්වය විඳිමින්, එකිනෙකාගේ තුරුලේ දැවටී අනාගතයේ සොඳුරු සිහින දුටුවහ.",
  },
  {
    num: "03",
    year: "2024",
    title: "සදාකාලික පොරොන්දුව",
    desc: "රන්වන් හිරු බැස යන සොඳුරු සැන්දෑවක, නිසල ගං ඉවුරකදී, ඔහු රතු රෝස මලක් දිගු කරමින් සිය ජීවිතයේ සදාකාලික ආදරය ඇයගෙන් අයැද සිටියේය.",
  },
];

const googleCalendarUrl = (() => {
  const p = new URLSearchParams({
    action: "TEMPLATE",
    text: "කසුන් සහ දෙව්මිණි මංගල්‍යය",
    dates: "20261110/20261111",
    details: "කසුන් සහ දෙව්මිණිගේ මංගල දිනය - 2026 නොවැම්බර් 10.",
    location: "Waters Edge Grand Ballroom, Battaramulla, Sri Lanka",
    ctz: "Asia/Colombo",
  });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
})();

// ─── Kandyan SVG Pattern (inline decorative background) ────────────────────
function KandyanPattern({ opacity = 0.04 }: { opacity?: number }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
      style={{ opacity }}
    >
      <defs>
        <pattern id="kandyan" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <circle cx="30" cy="30" r="1.5" fill="#e8930a" />
          <circle cx="0" cy="0" r="1.5" fill="#e8930a" />
          <circle cx="60" cy="0" r="1.5" fill="#e8930a" />
          <circle cx="0" cy="60" r="1.5" fill="#e8930a" />
          <circle cx="60" cy="60" r="1.5" fill="#e8930a" />
          <path d="M30 10 L35 25 L50 25 L38 34 L43 49 L30 40 L17 49 L22 34 L10 25 L25 25 Z" fill="none" stroke="#e8930a" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#kandyan)" />
    </svg>
  );
}

// ─── Intro Screen — Grand Door Split Reveal ────────────────────────────────
function InvitationIntro({ onEnter }: { onEnter: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex overflow-hidden"
      exit={{ transition: { staggerChildren: 0.2 } }}
    >
      {/* Left Door */}
      <motion.div
        className="absolute inset-y-0 left-0 z-10 w-1/2 border-r border-[#e8930a]/20 bg-[#2d0a1a]"
        exit={{ x: "-100%", transition: { duration: 1.4, ease: [0.76, 0, 0.24, 1] } }}
      >
        <KandyanPattern opacity={0.04} />
      </motion.div>
      
      {/* Right Door */}
      <motion.div
        className="absolute inset-y-0 right-0 z-10 w-1/2 border-l border-[#e8930a]/20 bg-[#2d0a1a]"
        exit={{ x: "100%", transition: { duration: 1.4, ease: [0.76, 0, 0.24, 1] } }}
      >
        <KandyanPattern opacity={0.04} />
      </motion.div>

      {/* Center Content */}
      <motion.div
        className="absolute inset-0 z-20 flex min-h-screen flex-col items-center justify-center px-6 text-center"
        exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)", transition: { duration: 0.8, ease: "easeOut" } }}
      >
        {/* Ambient Glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(232,147,10,0.15)_0%,transparent_70%)] blur-[60px]" />

        {/* Rotating Emblem Rings */}
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <div className="h-[400px] w-[400px] rounded-full border border-dashed border-[#e8930a]/30" />
        </motion.div>
        
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <div className="h-[280px] w-[280px] rounded-full border border-[#e8930a]/20" />
        </motion.div>

        {/* Text Reveal */}
        <div className="relative z-30 flex flex-col items-center">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 40 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="mb-4 w-px bg-gradient-to-b from-transparent via-[#e8930a]/80 to-[#e8930a]"
          />

          <motion.p
            initial={{ opacity: 0, letterSpacing: "0em" }}
            animate={{ opacity: 1, letterSpacing: "0.4em" }}
            transition={{ duration: 1.5, delay: 1 }}
            className={`${noto.className} mb-4 text-[10px] uppercase text-[#e8930a]`}
          >
            ශ්‍රේෂ්ඨ ආරාධනාවක්
          </motion.p>

          <div className="flex flex-col items-center gap-1 overflow-hidden py-2">
            <motion.h1
              initial={{ y: "120%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={`${abhaya.className} text-6xl font-extrabold leading-none text-[#fef3e2] md:text-8xl`}
            >
              කසුන්
            </motion.h1>
            
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 1.2, type: "spring" }}
              className="my-1"
            >
              <Heart className="h-5 w-5 text-[#e8930a] drop-shadow-[0_0_15px_rgba(232,147,10,0.5)]" />
            </motion.div>

            <motion.h1
              initial={{ y: "-120%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={`${abhaya.className} text-6xl font-extrabold leading-none text-[#e8930a] md:text-8xl`}
            >
              දෙව්මිණි
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.6 }}
            className={`${noto.className} mt-6 max-w-md text-xs font-light leading-relaxed text-[#c4a882] md:text-sm`}
          >
            2026 නොවැම්බර් 10 · ඔබේ ප්‍රේමණීය පැමිණීමෙන් ශ්‍රේෂ්ඨ ගමනාරම්භය ආලෝකවත් කරන ලෙස ආරාධනා කරමු.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
            onClick={onEnter}
            whileHover={{ backgroundColor: "#e8930a", color: "#2d0a1a", boxShadow: "0 0 40px rgba(232,147,10,0.4)" }}
            whileTap={{ scale: 0.95 }}
            className={`${noto.className} mt-8 rounded-full border border-[#e8930a] bg-transparent px-8 py-3 text-xs uppercase tracking-[0.3em] text-[#e8930a] transition-all duration-500`}
          >
            ආරාධනයට පිවිසෙන්න
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Header ─────────────────────────────────────────────────────────────────
function Header() {
  return (
    <header className="absolute left-0 right-0 top-0 z-40 w-full">
      <div className="flex items-center justify-between px-8 py-8 md:px-16">
        <span className={`${abhaya.className} text-xl font-bold text-white/80`}>K &amp; D</span>
        <nav className="flex gap-8">
          {[{ label: "මංගල සභාව", href: "#venue" }, { label: "ඔබගේ පැමිණීම", href: "#rsvp" }].map((i) => (
            <a
              key={i.href}
              href={i.href}
              className={`${noto.className} text-[10px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-[#e8930a]`}
            >
              {i.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

// ─── Hero — text-first, decorative pattern bg (NO photo parallax) ──────────
function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-screen items-center overflow-hidden bg-[#2d0a1a]">
      {/* Kandyan geometric pattern background */}
      <KandyanPattern opacity={0.05} />

      {/* Full-bleed Vintage Background Illustration */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        initial={{ opacity: 0, filter: "blur(20px)" }}
        animate={{ opacity: 0.8, filter: "blur(0px)" }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <motion.div
          animate={{ scale: [1.02, 1, 1.02] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/images/classic-sinhala/hero-couple.jpg"
            alt="Vintage Kandyan Couple"
            fill
            className="object-cover object-[70%_center] md:object-right"
            style={{ mixBlendMode: "screen" }}
          />
        </motion.div>
        {/* Gradient overlay to ensure text readability on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2d0a1a] via-[#2d0a1a]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2d0a1a] via-transparent to-transparent" />
      </motion.div>

      {/* Saffron radial glow behind text */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e8930a]/8 blur-[150px]" />

      {/* Decorative vertical lines — left and right */}
      <div className="pointer-events-none absolute left-8 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#e8930a]/20 to-transparent md:left-16" />
      <div className="pointer-events-none absolute right-8 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#e8930a]/20 to-transparent md:right-16" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center px-8 py-32 md:px-16">
        
        {/* Text */}
        <motion.div
          className="w-full max-w-2xl"
          style={{ y: textY, opacity }}
        >
          {/* Eyebrow label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8 flex items-center gap-4"
          >
            <div className="h-px w-12 bg-[#e8930a]" />
            <span className={`${noto.className} text-[10px] uppercase tracking-[0.4em] text-[#e8930a]`}>
              ගෞරවාන්විත මංගල ආරාධනය · 2026
            </span>
          </motion.div>

          {/* Giant Sinhala names — left-aligned */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={`${abhaya.className} text-[clamp(4rem,12vw,10rem)] font-extrabold leading-none text-[#fef3e2] drop-shadow-lg`}
            >
              කසුන්
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className={`${abhaya.className} text-[clamp(4rem,12vw,10rem)] font-extrabold leading-none text-[#e8930a] drop-shadow-lg`}
            >
              දෙව්මිණි
            </motion.h1>
          </div>

          {/* Date + CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1 }}
            className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-12"
          >
            <div>
              <p className={`${noto.className} text-xs uppercase tracking-[0.3em] text-[#c4a882]`}>
                2026 නොවැම්බර් 10
              </p>
              <p className={`${noto.className} mt-1 text-xs text-[#7a4a2a]`}>
                වෝටර්ස් ඒජ් (Waters Edge) · බත්තරමුල්ල
              </p>
            </div>
            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${noto.className} group inline-flex items-center gap-3 border-b border-[#e8930a]/50 pb-1 text-sm text-[#e8930a] transition-all hover:border-[#e8930a]`}
            >
              <CalendarDays className="h-4 w-4" />
              දිනදර්ශනයට එක්කරන්න
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 right-8 flex flex-col items-center gap-2 md:right-16"
      >
        <motion.div
          animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="h-12 w-px bg-[#e8930a]/50 origin-top"
        />
        <span className={`${noto.className} mt-4 rotate-90 text-[9px] uppercase tracking-[0.3em] text-[#7a4a2a]`}>
          scroll
        </span>
      </motion.div>
    </section>
  );
}

// ─── Invitation Section ──────────────────────────────────────────────────────
function InvitationSection() {
  return (
    <section className="relative overflow-hidden bg-[#fef3e2] py-24 md:py-36">
      <KandyanPattern opacity={0.03} />
      <div className="relative mx-auto max-w-7xl px-8 md:px-16">
        <FadeIn direction="right">
          <div className="grid items-center gap-16 md:grid-cols-2">
            {/* Left: Decorative animated geometric mandala */}
            <div className="hidden md:flex items-center justify-center relative h-[300px] w-[300px] mx-auto">
              {/* Soft pulsing glow */}
              <motion.div 
                className="absolute inset-0 rounded-full bg-[#e8930a]/10 blur-[50px]"
                animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Outer slow ring */}
              <motion.div 
                className="absolute inset-2 rounded-full border-[1.5px] border-dashed border-[#e8930a]/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              />

              {/* 8-point star rotating */}
              <motion.div
                className="absolute inset-12"
                animate={{ rotate: -360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute inset-0 border border-[#e8930a]/30 bg-white/50 shadow-sm rounded-lg backdrop-blur-sm" />
                <div className="absolute inset-0 border border-[#e8930a]/30 bg-white/50 shadow-sm rounded-lg backdrop-blur-sm rotate-45" />
              </motion.div>

              {/* Inner 8-point star rotating opposite */}
              <motion.div
                className="absolute inset-[70px]"
                animate={{ rotate: 360 }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute inset-0 border border-[#2d0a1a]/15 bg-[#fef3e2] shadow-inner rounded-md" />
                <div className="absolute inset-0 border border-[#2d0a1a]/15 bg-[#fef3e2] shadow-inner rounded-md rotate-45" />
              </motion.div>

              {/* Center Heart */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Heart className="h-10 w-10 text-[#e8930a] drop-shadow-md" fill="#e8930a" fillOpacity={0.2} />
                </motion.div>
              </div>

              {/* Orbiting sparkles */}
              <motion.div 
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white p-1.5 shadow-md border border-[#e8930a]/20">
                   <Sparkles className="h-4 w-4 text-[#e8930a]" />
                </div>
              </motion.div>
            </div>
            {/* Right: Content */}
            <div>
              <div className="mb-6 flex items-center gap-4">
                <div className="h-px w-8 bg-[#e8930a]" />
                <span className={`${noto.className} text-[10px] uppercase tracking-[0.35em] text-[#e8930a]`}>
                  මංගල ආරාධනය
                </span>
              </div>
              <h2 className={`${abhaya.className} mb-6 text-5xl font-bold text-[#2d0a1a] md:text-6xl`}>
                සෙනෙහෙබර<br />ආරාධනාවයි
              </h2>
              <p className={`${noto.className} text-base font-light leading-relaxed text-[#7a4a2a] md:text-lg`}>
                දෙහදක බැඳීමක් එක් වහලක් යටට කැඳවන අපගේ ජීවිතයේ සොඳුරුතම දිනය මෙයයි. දයාබර ඔබගේ ආශිර්වාදය හා සුහදත්වය අපගේ නව ජීවිතයට ඉමහත් ආලෝකයක් වනු නොඅනුමානය. එබැවින් මෙම මංගල මොහොතට එක්වන මෙන් ඉතා ගෞරවයෙන් හා ආදරයෙන් යුතුව ආරාධනා කරමු.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Bride & Groom — full 50/50 split-screen layout ─────────────────────────
function BrideGroomSection() {
  const people = [
    {
      src: "/images/wedding-invitation/bride.png",
      alt: "මනාලිය",
      name: "දෙව්මිණි සිල්වා",
      role: "මනාලිය",
      bio: "කලාවට හා ස්වභාව සෞන්දර්යයට පෙම් බඳින ඇය, සිය ආදරණීය සිනහවෙන් මුළු දිවියම ආලෝකමත් කරන සොඳුරු යුවතියකි.",
      side: "left",
    },
    {
      src: "/images/wedding-invitation/groom.png",
      alt: "මනාලයා",
      name: "කසුන් පෙරේරා",
      role: "මනාලයා",
      bio: "නිර්භීත මෙන්ම කරුණාබර හදවතක් හිමි ඔහු, ජීවිතයේ කුඩා දේ තුළින් පවා සුන්දරත්වය දකින, ඇයගේ සිනහව තුළින් නිවී සැනසෙන ආදරණීය තරුණයෙකි.",
      side: "right",
    },
  ];

  return (
    <section id="couple" className="flex flex-col md:flex-row">
      {people.map((p) => (
        <motion.div
          key={p.name}
          className="relative flex min-h-[70vh] w-full flex-col items-center justify-end overflow-hidden pb-16 md:w-1/2 md:min-h-screen"
          whileHover={{ flex: 1.15 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ flex: 1 }}
        >
          <Image
            src={p.src}
            alt={p.alt}
            fill
            className="object-cover object-top transition-transform duration-700 hover:scale-105"
            sizes="50vw"
          />
          {/* Gradient from bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2d0a1a]/90 via-[#2d0a1a]/30 to-transparent" />

          {/* Text at bottom */}
          <div className="relative z-10 px-10 text-center">
            <p className={`${noto.className} mb-2 text-xs uppercase tracking-[0.35em] text-[#e8930a]`}>
              {p.role}
            </p>
            <h3 className={`${abhaya.className} mb-3 text-4xl font-bold text-white md:text-5xl`}>
              {p.name}
            </h3>
            <p className={`${noto.className} max-w-xs text-sm font-light leading-relaxed text-white/70`}>
              {p.bio}
            </p>
          </div>

          {/* Side decorative line */}
          <div className="absolute top-1/3 right-0 h-24 w-px bg-[#e8930a]/30" />
        </motion.div>
      ))}
    </section>
  );
}

// ─── Love Story — single left-side vertical list (NOT alternating) ───────────
function LoveStorySection() {
  return (
    <Section id="story" className="bg-[#fdfaf4]">
      <div className="mx-auto max-w-7xl px-8 md:px-16">
        <FadeIn direction="up">
          <div className="mb-6 flex items-center gap-4">
            <div className="h-px w-8 bg-[#e8930a]" />
            <span className={`${noto.className} text-[10px] uppercase tracking-[0.35em] text-[#e8930a]`}>
              ආදරයේ පියසටහන්
            </span>
          </div>
          <h2 className={`${abhaya.className} mb-16 text-5xl font-bold text-[#2d0a1a] md:text-6xl`}>
            අපේ ආදර කතාව
          </h2>
        </FadeIn>

        <div className="relative pl-0 md:pl-8">
          {/* Vertical line */}
          <motion.div
            className="absolute left-0 top-0 hidden h-full w-px bg-[#e8930a]/20 md:block"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "top" }}
          />

          <div className="space-y-20">
            {timeline.map((item, i) => (
              <FadeIn key={item.num} direction="right" delay={i * 0.15}>
                <div className="relative flex flex-col gap-4 md:flex-row md:gap-12">
                  {/* Left: Number dot + year */}
                  <div className="flex items-start gap-4 md:flex-col md:items-center md:w-24 md:flex-shrink-0">
                    <motion.div
                      className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#e8930a] bg-[#fdfaf4]"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1, type: "spring" }}
                    >
                      <span className={`${abhaya.className} text-sm font-bold text-[#e8930a]`}>{item.num}</span>
                    </motion.div>
                    <span className={`${noto.className} text-xs uppercase tracking-widest text-[#e8930a] md:mt-2`}>
                      {item.year}
                    </span>
                  </div>

                  {/* Right: Content */}
                  <div className="flex-1">
                    <h3 className={`${abhaya.className} mb-3 text-3xl font-bold text-[#2d0a1a] md:text-4xl`}>
                      {item.title}
                    </h3>
                    <p className={`${noto.className} text-sm font-light leading-relaxed text-[#7a4a2a] md:text-base`}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

// ─── Countdown — bold large number display (NOT boxes) ───────────────────────
function CountdownSection() {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date("2026-11-10T00:00:00").getTime();
    const iv = setInterval(() => {
      const dist = target - Date.now();
      if (dist < 0) { clearInterval(iv); return; }
      setT({
        days: Math.floor(dist / 86400000),
        hours: Math.floor((dist % 86400000) / 3600000),
        minutes: Math.floor((dist % 3600000) / 60000),
        seconds: Math.floor((dist % 60000) / 1000),
      });
    }, 1000);
    return () => clearInterval(iv);
  }, []);

  const units: { key: keyof typeof t; label: string }[] = [
    { key: "days", label: "දින" },
    { key: "hours", label: "පැය" },
    { key: "minutes", label: "මිනිත්තු" },
    { key: "seconds", label: "තත්පර" },
  ];

  return (
    <section className="relative overflow-hidden bg-[#2d0a1a] py-24 md:py-36">
      <KandyanPattern opacity={0.05} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#e8930a]/5 via-transparent to-[#e8930a]/5" />

      <div className="relative mx-auto max-w-7xl px-8 md:px-16">
        <FadeIn>
          <div className="mb-4 flex items-center gap-4">
            <div className="h-px w-8 bg-[#e8930a]" />
            <span className={`${noto.className} text-[10px] uppercase tracking-[0.35em] text-[#e8930a]`}>
              දින ගණනය
            </span>
          </div>
          <h2 className={`${abhaya.className} mb-16 text-4xl font-bold text-[#fef3e2] md:text-5xl`}>
            සොඳුරු දිනය උදාවීමට තවත්...
          </h2>
        </FadeIn>

        {/* Large number display — NOT boxes, just raw numbers separated by lines */}
        <div className="flex flex-wrap items-start divide-x divide-[#e8930a]/20">
          {units.map((u, i) => (
            <FadeIn key={u.key} delay={i * 0.1} direction="up" className="flex-1 min-w-[120px] px-6 first:pl-0 last:border-r-0">
              <AnimatePresence mode="wait">
                <motion.span
                  key={t[u.key]}
                  className={`${abhaya.className} block text-[clamp(3rem,8vw,7rem)] font-extrabold leading-none text-[#fef3e2]`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25 }}
                >
                  {String(t[u.key]).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>
              <span className={`${noto.className} mt-2 block text-xs uppercase tracking-[0.25em] text-[#7a4a2a]`}>
                {u.label}
              </span>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4} direction="up" className="mt-16">
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${noto.className} group inline-flex items-center gap-3 border border-[#e8930a]/40 px-8 py-4 text-xs uppercase tracking-[0.3em] text-[#e8930a] transition-all hover:bg-[#e8930a] hover:text-[#2d0a1a]`}
          >
            <CalendarDays className="h-4 w-4" />
            Google දිනදර්ශනයට එකතු කරන්න
          </a>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Schedule — Advanced Animated Timeline ───────────────────────────────────
function ScheduleSection() {
  const getIcon = (i: number) => {
    switch (i) {
      case 0: return <ScrollText className="h-7 w-7 stroke-1" />;
      case 1: return <Heart className="h-7 w-7 stroke-1" />;
      case 2: return <Wine className="h-7 w-7 stroke-1" />;
      case 3: return <Utensils className="h-7 w-7 stroke-1" />;
      case 4: return <PartyPopper className="h-7 w-7 stroke-1" />;
      default: return <Heart className="h-7 w-7 stroke-1" />;
    }
  };

  return (
    <Section id="schedule" className="relative overflow-hidden bg-[#2d0a1a] py-24 md:py-36">
      {/* Shaded Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/classic-sinhala/schedule-bg.jpg"
          alt="Vintage background pattern"
          fill
          className="object-cover opacity-60"
          style={{ mixBlendMode: "lighten" }}
        />
        {/* Gradients to blend into sections above/below and darken edges */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2d0a1a] via-transparent to-[#2d0a1a]" />
        <div className="absolute inset-0 bg-[#2d0a1a]/40" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 md:px-12">
        <FadeIn>
          <div className="flex flex-col items-center text-center">
            <h2 className={`${abhaya.className} mb-6 text-5xl font-bold text-[#fef3e2] md:text-6xl drop-shadow-lg`}>
              දවසේ වැඩසටහන
            </h2>
            <motion.div 
              className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#e8930a] to-transparent mx-auto mb-20"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </FadeIn>

        <div className="relative">
          {/* Central animated vertical line */}
          <motion.div 
            className="absolute left-[39px] md:left-[79px] top-8 bottom-4 w-px bg-gradient-to-b from-[#e8930a]/80 via-[#e8930a]/20 to-transparent origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {scheduleItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.15, type: "spring", bounce: 0.3 }}
              className="relative flex items-center group mb-8 last:mb-0"
            >
              {/* Far Left Icon (Hidden on very small screens, visible md+) */}
              <div className="hidden md:flex w-[60px] flex-shrink-0 justify-end mr-8 text-[#c4a882] transition-transform duration-500 group-hover:scale-110 group-hover:text-[#e8930a] drop-shadow-md">
                {getIcon(i)}
              </div>

              {/* Node Heart on line */}
              <div className="relative z-10 w-10 h-10 flex-shrink-0 flex items-center justify-center mr-6 md:mr-8 bg-[#2d0a1a] rounded-full border border-[#e8930a]/30 shadow-[0_0_15px_rgba(232,147,10,0.15)] transition-all duration-300 group-hover:bg-[#e8930a]/10 group-hover:border-[#e8930a] group-hover:shadow-[0_0_20px_rgba(232,147,10,0.4)]">
                <Heart className="h-4 w-4 text-[#e8930a] fill-[#e8930a] drop-shadow-lg" />
              </div>

              {/* Glassmorphism Content Card */}
              <div className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl transition-all duration-500 group-hover:bg-white/10 group-hover:-translate-y-1 group-hover:shadow-2xl">
                <p className={`${noto.className} text-xs uppercase tracking-[0.2em] text-[#e8930a] mb-2 font-medium`}>
                  {item.time}
                </p>
                <h3 className={`${abhaya.className} text-2xl md:text-3xl font-bold text-[#fef3e2] mb-3`}>
                  {item.title}
                </h3>
                <p className={`${noto.className} text-sm font-light leading-relaxed text-[#f5e6cc]/80`}>
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── Venue ──────────────────────────────────────────────────────────────────
function VenueSection() {
  return (
    <Section id="venue" className="overflow-hidden bg-[#fdfaf4]">
      <div className="mx-auto max-w-7xl px-8 md:px-16">
        <FadeIn>
          <div className="mb-4 flex items-center gap-4">
            <div className="h-px w-8 bg-[#e8930a]" />
            <span className={`${noto.className} text-[10px] uppercase tracking-[0.35em] text-[#e8930a]`}>
              උත්සව භූමිය
            </span>
          </div>
          <h2 className={`${abhaya.className} mb-16 text-5xl font-bold text-[#2d0a1a] md:text-6xl`}>
            මංගල සාදය පැවැත්වෙන ස්ථානය
          </h2>
        </FadeIn>

        <div className="flex flex-col gap-0 overflow-hidden rounded-2xl border border-[#e8930a]/15 shadow-[0_20px_60px_rgba(45,10,26,0.08)] lg:flex-row">
          {/* Info panel */}
          <FadeIn direction="right" className="flex flex-col justify-center bg-[#2d0a1a] p-10 lg:w-2/5">
            <MapPin className="mb-6 h-8 w-8 text-[#e8930a]" />
            <h3 className={`${abhaya.className} mb-2 text-3xl font-bold text-[#fef3e2]`}>
              Waters Edge Grand Ballroom
            </h3>
            <p className={`${noto.className} mb-1 font-light text-[#c4a882]`}>316 Ethul Kotte Road,</p>
            <p className={`${noto.className} mb-8 font-light text-[#c4a882]`}>Battaramulla 10100, Sri Lanka.</p>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Waters+Edge+Grand+Ballroom,+Battaramulla"
              target="_blank"
              rel="noopener noreferrer"
              className={`${noto.className} group flex w-fit items-center gap-2 border-b border-[#e8930a]/50 pb-1 text-sm text-[#e8930a] transition-all hover:border-[#e8930a]`}
            >
              <Navigation className="h-4 w-4" />
              ස්ථානය වෙත පිවිසෙන මාර්ගය
              <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </a>
          </FadeIn>

          {/* Map */}
          <FadeIn direction="left" className="relative min-h-[22rem] w-full lg:w-3/5">
            <iframe
              src="https://www.google.com/maps?q=Waters+Edge+Grand+Ballroom,+316+Ethul+Kotte+Road,+Battaramulla,+Sri+Lanka&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              title="ස්ථානය"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full"
            />
          </FadeIn>
        </div>
      </div>
    </Section>
  );
}

// ─── Gallery — 3-column masonry grid (NOT carousel) ────────────────────────
function GallerySection() {
  const cols: string[][] = [
    [
      "/images/wedding-invitation/gallery-1.jpg",
      "/images/wedding-invitation/gallery-4.jpg",
    ],
    [
      "/images/wedding-invitation/gallery-2.jpg",
      "/images/wedding-invitation/gallery-5.jpg",
    ],
    [
      "/images/wedding-invitation/gallery-3.jpg",
      "/images/wedding-invitation/gallery-6.jpg",
    ],
  ];

  return (
    <Section id="gallery" className="overflow-hidden bg-[#fef3e2]">
      <div className="mx-auto max-w-7xl px-8 md:px-16">
        <FadeIn>
          <div className="mb-4 flex items-center gap-4">
            <div className="h-px w-8 bg-[#e8930a]" />
            <span className={`${noto.className} text-[10px] uppercase tracking-[0.35em] text-[#e8930a]`}>
              සොඳුරු මතකයන්
            </span>
          </div>
          <h2 className={`${abhaya.className} mb-12 text-5xl font-bold text-[#2d0a1a] md:text-6xl`}>
            ආදරයේ සේයා රූ
          </h2>
        </FadeIn>

        {/* 3-column masonry grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {cols.map((col, ci) => (
            <div key={ci} className={`flex flex-col gap-4 ${ci === 1 ? "mt-8" : ""}`}>
              {col.map((src, ri) => (
                <FadeIn key={src} delay={ci * 0.1 + ri * 0.15} direction="up">
                  <motion.div
                    className="group relative overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                    style={{ aspectRatio: ri === 0 ? "3/4" : "4/3" }}
                  >
                    <Image
                      src={src}
                      alt={`ආදරයේ සේයා රූ ${ci + ri + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                    {/* Hover overlay */}
                    <motion.div
                      className="absolute inset-0 bg-[#2d0a1a]/60"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Sparkles className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-[#e8930a]" />
                    </motion.div>
                    {/* Gold corner accent */}
                    <div className="pointer-events-none absolute left-3 top-3 h-6 w-6 border-l-2 border-t-2 border-[#e8930a]/60" />
                    <div className="pointer-events-none absolute right-3 bottom-3 h-6 w-6 border-r-2 border-b-2 border-[#e8930a]/60" />
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── Dress Code ──────────────────────────────────────────────────────────────
function DressCodeSection() {
  return (
    <Section id="dress-code" className="overflow-hidden bg-[#fdfaf4]">
      <div className="mx-auto max-w-7xl px-8 md:px-16">
        <div className="flex flex-col items-center gap-16 md:flex-row">
          <FadeIn direction="right" className="w-full md:w-1/2">
            <div className="mb-4 flex items-center gap-4">
              <div className="h-px w-8 bg-[#e8930a]" />
              <span className={`${noto.className} text-[10px] uppercase tracking-[0.35em] text-[#e8930a]`}>
                පැළඳුම් විලාසය
              </span>
            </div>
            <h2 className={`${abhaya.className} mb-6 text-5xl font-bold text-[#2d0a1a] md:text-6xl`}>
              ඔබේ පැමිණීම සඳහා
            </h2>
            <p className={`${noto.className} mb-4 text-base font-light leading-relaxed text-[#7a4a2a]`}>
              ගෞරවනීය අමුත්තන්ගෙන් විධිමත් හා අලංකාර පැළඳුම් විලාසයක් අපේක්ෂා කරමු. මහතුන් සඳහා සම්පූර්ණ කලිසම සහ කමිසයද, කාන්තාවන් සඳහා සාරිය හෝ අලංකාර ගවුම් විලාසිතාවක්ද උචිත වේ.
            </p>
            <p className={`${noto.className} mb-8 text-base font-light leading-relaxed text-[#7a4a2a]`}>
              මනාලියගේ ඇඳුම් වර්ණය වන සුදු සහ ඇත්දළ (Ivory) පැහැයෙන් යුතු ඇඳුම් ඇඳීමෙන් වළකින මෙන් කාරුණිකව ඉල්ලා සිටිමු.
            </p>
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-[#e8930a]/20" />
              <span className={`${noto.className} text-xs uppercase tracking-widest text-[#e8930a]`}>
                Black Tie Optional
              </span>
              <div className="h-px flex-1 bg-[#e8930a]/20" />
            </div>
          </FadeIn>

          <FadeIn direction="left" className="w-full md:w-1/2">
            <motion.div
              className="relative h-[500px] overflow-hidden shadow-[0_30px_80px_rgba(45,10,26,0.15)]"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/images/classic-sinhala/dress-code.png"
                alt="Dress Code"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-[#2d0a1a]/15" />
              {/* Corner accents */}
              <div className="pointer-events-none absolute left-4 top-4 h-8 w-8 border-l-2 border-t-2 border-[#e8930a]/70" />
              <div className="pointer-events-none absolute right-4 bottom-4 h-8 w-8 border-r-2 border-b-2 border-[#e8930a]/70" />
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </Section>
  );
}

// ─── RSVP — open minimal form on parchment (NOT a glass card) ───────────────
function RSVPSection({
  onSubmit,
  clientId,
}: {
  onSubmit: (submission: GuestMessage) => void;
  clientId: string;
}) {
  const [form, setForm] = useState<RsvpFormData>(emptyRsvpForm);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleChange = (field: keyof RsvpFormData, value: string) => {
    setForm((c) => ({ ...c, [field]: value }));
    setError("");
    setSuccessMessage("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedName = form.name.trim();
    const trimmedMessage = form.message.trim();

    if (!trimmedName) { setError("කරුණාකර ඔබගේ නම ඇතුළත් කරන්න."); return; }
    if (!form.attending) { setError("කරුණාකර ඔබගේ සහභාගීත්වය තහවුරු කරන්න."); return; }

    const guestCount = form.attending === "accept"
      ? Math.max(1, Number.parseInt(form.guestCount, 10) || 1)
      : 0;

    startTransition(async () => {
      const result = await submitRsvp({
        name: trimmedName,
        attending: form.attending as "accept" | "decline",
        guestCount,
        message: trimmedMessage,
        clientId,
      });
      if (!result.success) { setError(result.error ?? "දෝෂයක් ඇතිවිය. කරුණාකර නැවත උත්සාහ කරන්න."); return; }
      onSubmit({ id: crypto.randomUUID(), name: trimmedName, attending: form.attending as "accept" | "decline", guestCount, message: trimmedMessage, submittedAt: new Date().toISOString() });
      setForm(emptyRsvpForm);
      setSuccessMessage("ඔබගේ සුබපැතුම අප වෙත ලැබුණා. බොහොම ස්තූතියි! 💛");
    });
  };

  const input = `${noto.className} w-full border-0 border-b border-[#e8930a]/30 bg-transparent pb-3 pt-2 text-sm text-[#2d0a1a] outline-none transition-all placeholder:text-[#c4a882] focus:border-[#e8930a]`;

  return (
    <section id="rsvp" className="relative overflow-hidden bg-[#fef3e2] py-24 md:py-36">
      <KandyanPattern opacity={0.03} />
      <div className="relative mx-auto max-w-7xl px-8 md:px-16">
        <div className="grid gap-20 md:grid-cols-2">
          {/* Left: Heading */}
          <FadeIn direction="right">
            <div className="mb-4 flex items-center gap-4">
              <div className="h-px w-8 bg-[#e8930a]" />
              <span className={`${noto.className} text-[10px] uppercase tracking-[0.35em] text-[#e8930a]`}>
                පැමිණීම තහවුරු කිරීම (RSVP)
              </span>
            </div>
            <h2 className={`${abhaya.className} mb-6 text-5xl font-bold text-[#2d0a1a] md:text-6xl`}>
              පැමිණීම<br />තහවුරු<br />කිරීම
            </h2>
            <p className={`${noto.className} text-base font-light leading-relaxed text-[#7a4a2a]`}>
              ඔබගේ පැමිණීම අපට ඉමහත් සතුටක් ගෙන දෙයි. කරුණාකර ඔබගේ සහභාගීත්වය පහතින් තහවුරු කරන්න.
            </p>

            <div className="mt-12">
              <Heart className="h-6 w-6 text-[#e8930a]/40" />
            </div>
          </FadeIn>

          {/* Right: Form */}
          <FadeIn direction="left">
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="si2-name" className={`${noto.className} block text-[10px] uppercase tracking-[0.25em] text-[#e8930a] mb-2`}>
                  ඔබගේ නම
                </label>
                <input
                  id="si2-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="නමල් පෙරේරා"
                  className={input}
                  suppressHydrationWarning
                />
              </div>

              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <label htmlFor="si2-attending" className={`${noto.className} block text-[10px] uppercase tracking-[0.25em] text-[#e8930a] mb-2`}>
                    ඔබ සහභාගී වන්නේද?
                  </label>
                  <div className="relative">
                    <select
                      id="si2-attending"
                      value={form.attending}
                      onChange={(e) => handleChange("attending", e.target.value as RsvpFormData["attending"])}
                      className={`${input} cursor-pointer appearance-none pr-8`}
                      suppressHydrationWarning
                    >
                      <option value="">තෝරන්න</option>
                      <option value="accept">ඔව්, ආදරයෙන් සහභාගී වෙමි</option>
                      <option value="decline">කනගාටුයි, සහභාගී වීමට නොහැක</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2 top-2 h-4 w-4 text-[#e8930a]/60" />
                  </div>
                </div>
                <div>
                  <label htmlFor="si2-guests" className={`${noto.className} block text-[10px] uppercase tracking-[0.25em] text-[#e8930a] mb-2`}>
                    සහභාගී වන සංඛ්‍යාව
                  </label>
                  <input
                    id="si2-guests"
                    type="number"
                    min={1}
                    value={form.guestCount}
                    onChange={(e) => handleChange("guestCount", e.target.value)}
                    disabled={form.attending === "decline"}
                    placeholder="1"
                    className={`${input} disabled:opacity-30`}
                    suppressHydrationWarning
                  />
                </div>
              </div>

              <div>
                <label htmlFor="si2-message" className={`${noto.className} block text-[10px] uppercase tracking-[0.25em] text-[#e8930a] mb-2`}>
                  නව යුවළට ඔබේ සුබපැතුම
                </label>
                <textarea
                  id="si2-message"
                  rows={3}
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  placeholder="ඔබගේ ආදරණීය සුබපැතුම් මෙහි ලියන්න..."
                  className={`${input} resize-none`}
                  suppressHydrationWarning
                />
              </div>

              {error && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className={`${noto.className} text-sm text-red-500`} role="alert">
                  {error}
                </motion.p>
              )}
              {successMessage && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className={`${noto.className} text-sm text-[#e8930a]`} role="status">
                  {successMessage}
                </motion.p>
              )}

              <motion.button
                type="submit"
                disabled={isPending}
                whileHover={isPending ? {} : { backgroundColor: "#2d0a1a", color: "#fef3e2" }}
                whileTap={isPending ? {} : { scale: 0.98 }}
                className={`${noto.className} border border-[#2d0a1a] px-10 py-4 text-xs uppercase tracking-[0.35em] text-[#2d0a1a] transition-colors duration-300 disabled:opacity-50`}
                suppressHydrationWarning
              >
                {isPending ? "යොමු කරමින් පවතී..." : "සුබපැතුම් යොමු කරන්න"}
              </motion.button>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Words of Love — stacked grid (NOT infinite scroll) ─────────────────────
function WordsOfLoveSection({ messages }: { messages: GuestMessage[] }) {
  const notes = messages.filter((e) => e.message.trim());

  return (
    <section className="relative overflow-hidden bg-[#2d0a1a] py-24 md:py-36">
      <KandyanPattern opacity={0.05} />
      <div className="relative mx-auto max-w-7xl px-8 md:px-16">
        <FadeIn>
          <div className="mb-4 flex items-center gap-4">
            <div className="h-px w-8 bg-[#e8930a]" />
            <span className={`${noto.className} text-[10px] uppercase tracking-[0.35em] text-[#e8930a]`}>
              ඔබගේ ආශිර්වාද
            </span>
          </div>
          <h2 className={`${abhaya.className} mb-12 text-5xl font-bold text-[#fef3e2] md:text-6xl`}>
            ආදරණීයයන්ගේ සුබපැතුම්
          </h2>
        </FadeIn>

        {notes.length === 0 ? (
          <FadeIn>
            <p className={`${noto.className} text-base italic text-[#7a4a2a]`}>
              ඉහත පෝරමය හරහා ඔබගේ ආදරණීය සුබපැතුම් ද එක්කරන්න.
            </p>
          </FadeIn>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map((entry, i) => (
              <FadeIn key={entry.id} delay={i * 0.08} direction="up">
                <motion.div
                  className="relative border border-[#e8930a]/20 p-8 transition-all duration-300 hover:border-[#e8930a]/50"
                  whileHover={{ y: -4 }}
                >
                  {/* Corner marks */}
                  <div className="pointer-events-none absolute left-3 top-3 h-5 w-5 border-l border-t border-[#e8930a]/40" />
                  <div className="pointer-events-none absolute right-3 bottom-3 h-5 w-5 border-r border-b border-[#e8930a]/40" />
                  <Heart className="mb-4 h-4 w-4 text-[#e8930a]/40" />
                  <p className={`${noto.className} mb-6 text-sm italic leading-relaxed text-[#c4a882]`}>
                    &ldquo;{entry.message}&rdquo;
                  </p>
                  <p className={`${abhaya.className} text-base font-bold text-[#e8930a]`}>
                    — {entry.name}
                  </p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Footer — ultra minimal ─────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#1a0408] py-20 text-center">
      <div className="mx-auto max-w-4xl px-6">
        <FadeIn>
          <div className="mb-8 flex justify-center">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-5 w-5 text-[#e8930a]/60" />
            </motion.div>
          </div>

          <h2 className={`${abhaya.className} mb-3 text-5xl font-extrabold text-[#fef3e2] md:text-7xl`}>
            කසුන් &amp; දෙව්මිණි
          </h2>
          <p className={`${noto.className} mb-10 text-xs uppercase tracking-[0.4em] text-[#e8930a]/70`}>
            2026 නොවැම්බර් 10 · Battaramulla, Sri Lanka
          </p>

          <div className="mx-auto mb-10 h-px w-24 bg-[#e8930a]/20" />

          <p className={`${noto.className} mb-4 text-xs text-[#3d1020]`}>
            &copy; {new Date().getFullYear()} කසුන් &amp; දෙව්මිණි
          </p>
          <a
            href="https://mohotha.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`${noto.className} group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#3d1020] transition-colors hover:text-[#e8930a]`}
          >
            Designed by{" "}
            <span className="font-bold tracking-widest text-[#e8930a]/70 group-hover:text-[#e8930a]">MOHOTHA</span>
          </a>
        </FadeIn>
      </div>
    </footer>
  );
}

// ─── Main Export ─────────────────────────────────────────────────────────────
export function ClassicSinhalaTemplate({ clientId = "classic-sinhala" }: { clientId?: string }) {
  const [showIntro, setShowIntro] = useState(true);
  const [guestMessages, setGuestMessages] = useState<GuestMessage[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showIntro]);

  const toggleAudio = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }
    setIsPlaying((p) => !p);
  }, [isPlaying]);

  const handleEnterInvitation = useCallback(() => {
    setShowIntro(false);
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
    }
  }, []);

  const handleRsvpSubmit = useCallback((submission: GuestMessage) => {
    setGuestMessages((c) => [submission, ...c]);
  }, []);

  return (
    <main className={`relative min-h-screen w-full overflow-x-hidden bg-[#fef3e2] ${abhaya.className}`}>
      <audio ref={audioRef} src="/music/classic-sinhala.mp3" loop />

      {/* Floating audio button — saffron on maroon */}
      {!showIntro && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          suppressHydrationWarning
          onClick={toggleAudio}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#e8930a] text-[#2d0a1a] shadow-[0_10px_30px_rgba(232,147,10,0.4)] transition-transform hover:scale-110"
          aria-label={isPlaying ? "සංගීතය නතර කරන්න" : "සංගීතය වාදනය කරන්න"}
        >
          {isPlaying ? <Volume2 className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
        </motion.button>
      )}

      <AnimatePresence>
        {showIntro ? <InvitationIntro onEnter={handleEnterInvitation} /> : null}
      </AnimatePresence>
      <Header />
      <HeroSection />
      <InvitationSection />
      <BrideGroomSection />
      <LoveStorySection />
      <CountdownSection />
      <ScheduleSection />
      <VenueSection />
      <GallerySection />
      <DressCodeSection />
      <RSVPSection onSubmit={handleRsvpSubmit} clientId={clientId} />
      <WordsOfLoveSection messages={guestMessages} />
      <Footer />
    </main>
  );
}
