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
import { Abhaya_Libre, Gemunu_Libre, Noto_Serif_Sinhala, Yaldevi } from "next/font/google";
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
  Sun,
  Moon,
  Maximize2,
  X,
  ChevronLeft,
  Camera,
} from "lucide-react";

import Section from "@/components/ui/Section";
import { FadeIn } from "@/components/templates/wedding-invitation/FadeIn";

// ─── Fonts ─────────────────────────────────────────────────────────────────
// Gemunu Libre — modern Sinhala display font with smooth curves (headings)
const abhaya = Gemunu_Libre({
  subsets: ["sinhala", "latin"],
  weight: ["400", "500", "600", "700", "800"],
});
// Noto Serif Sinhala — clean, highly legible body font
const noto = Noto_Serif_Sinhala({
  subsets: ["sinhala"],
  weight: ["400", "500", "600", "700"],
});

// Yaldevi — condensed, stylish Sinhala accent font for eyebrow labels
const yaldevi = Yaldevi({
  subsets: ["sinhala"],
  weight: ["400", "500", "600", "700"],
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

// ─── Liyawela Floral Pattern Background ────────────────────────────────────
function LiyawelaPattern({ mode = "dark", opacity }: { mode?: "dark" | "light"; opacity?: number }) {
  const defaultOpacity = mode === "dark" ? 0.08 : 0.05;
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" style={{ opacity: opacity ?? defaultOpacity }}>
      <Image
        src={mode === "dark" ? "/images/classic-sinhala/liyawela-dark.jpg" : "/images/classic-sinhala/liyawela-light.jpg"}
        alt="Liyawela floral pattern"
        fill
        sizes="100vw"
        priority={mode === "dark"}
        loading={mode === "dark" ? "eager" : "lazy"}
        className="object-cover"
        style={{ mixBlendMode: mode === "dark" ? "lighten" : "multiply" }}
      />
    </div>
  );
}

// ─── Traditional Liyawela Divider Motif ─────────────────────────────────────
function LiyawelaDivider({ color = "#e8930a" }: { color?: string }) {
  return (
    <div className="my-6 flex items-center justify-center gap-3 opacity-80 select-none">
      <svg width="60" height="15" viewBox="0 0 60 15" fill="none">
        <path d="M0 7.5 C15 0, 30 15, 45 7.5 C52.5 3.75, 57 7.5, 60 7.5" stroke={color} strokeWidth="1.5" />
        <circle cx="15" cy="4" r="2" fill={color} />
        <circle cx="35" cy="11" r="2" fill={color} />
      </svg>
      <div className="h-2 w-2 rotate-45 border border-current" style={{ color }} />
      <svg width="60" height="15" viewBox="0 0 60 15" fill="none" className="scale-x-[-1]">
        <path d="M0 7.5 C15 0, 30 15, 45 7.5 C52.5 3.75, 57 7.5, 60 7.5" stroke={color} strokeWidth="1.5" />
        <circle cx="15" cy="4" r="2" fill={color} />
        <circle cx="35" cy="11" r="2" fill={color} />
      </svg>
    </div>
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
        className="absolute inset-y-0 left-0 z-10 w-1/2 border-r border-[#e8930a]/30 bg-[#2d0a1a]"
        exit={{ x: "-100%", transition: { duration: 1.4, ease: [0.76, 0, 0.24, 1] } }}
      >
        <LiyawelaPattern mode="dark" opacity={0.35} />
      </motion.div>
      
      {/* Right Door */}
      <motion.div
        className="absolute inset-y-0 right-0 z-10 w-1/2 border-l border-[#e8930a]/30 bg-[#2d0a1a]"
        exit={{ x: "100%", transition: { duration: 1.4, ease: [0.76, 0, 0.24, 1] } }}
      >
        <LiyawelaPattern mode="dark" opacity={0.35} />
      </motion.div>

      {/* Center Content */}
      <motion.div
        className="absolute inset-0 z-20 flex min-h-screen flex-col items-center justify-center px-6 text-center"
        exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)", transition: { duration: 0.8, ease: "easeOut" } }}
      >
        {/* Ambient Glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(232,147,10,0.15)_0%,transparent_70%)] blur-[60px]" />

        {/* Rotating Emblem Rings */}
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <div className="h-100 w-100 rounded-full border border-dashed border-[#e8930a]/30" />
        </motion.div>
        
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <div className="h-70 w-70 rounded-full border border-[#e8930a]/20" />
        </motion.div>

        {/* Text Reveal */}
        <div className="relative z-30 flex flex-col items-center">
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className={`${noto.className} mb-4 text-sm font-semibold tracking-wider text-[#e8930a] md:text-base drop-shadow-[0_0_10px_rgba(232,147,10,0.4)]`}
          >
            නමෝ බුද්ධාය...!
          </motion.p>

          <div className="flex flex-col items-center gap-1 overflow-hidden py-2">
            <motion.h1
              initial={{ y: "120%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={`${abhaya.className} text-7xl font-extrabold leading-none text-[#fef3e2] md:text-9xl drop-shadow-xl`}
            >
              කසුන්
            </motion.h1>
            
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 1.2, type: "spring" }}
              className="my-2"
            >
              <Heart className="h-6 w-6 text-[#e8930a] fill-[#e8930a] drop-shadow-[0_0_15px_rgba(232,147,10,0.7)]" />
            </motion.div>

            <motion.h1
              initial={{ y: "-120%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={`${abhaya.className} text-7xl font-extrabold leading-none text-[#e8930a] md:text-9xl drop-shadow-xl`}
            >
              දෙව්මිණි
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className={`${noto.className} mt-6 max-w-lg text-base font-medium leading-relaxed text-[#fef3e2] md:text-lg drop-shadow`}
          >
            2026 නොවැම්බර් 10 වන දින · ඔබට කෙරෙන ප්‍රේමණීය ආරාධනාවයි.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.8 }}
            onClick={onEnter}
            whileHover={{ backgroundColor: "#e8930a", color: "#2d0a1a", boxShadow: "0 0 45px rgba(232,147,10,0.6)", scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className={`${noto.className} mt-9 rounded-full border-2 border-[#e8930a] bg-[#e8930a]/15 px-10 py-4 text-sm font-semibold tracking-wide text-[#e8930a] shadow-[0_0_20px_rgba(232,147,10,0.25)] backdrop-blur-md transition-all duration-300 md:text-base`}
          >
            "රුවන් දොරටුවෙන් පිවිසෙමු"
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Sun & Moon Royal Emblem Logo ───────────────────────────────────────────
function SunAndMoonLogo() {
  return (
    <div className="group flex items-center gap-3 drop-shadow-md">
      {/* Sun on Left */}
      <Sun className="h-5 w-5 text-[#e8930a] transition-transform duration-500 group-hover:rotate-45" />
      <span className={`${abhaya.className} text-sm font-semibold tracking-wider text-[#e8930a] md:text-base`}>
        ඉර හඳ පවතිනා තුරු
      </span>
      {/* Moon on Right */}
      <Moon className="h-4.5 w-4.5 fill-[#e8930a] text-[#e8930a] drop-shadow-[0_0_8px_rgba(232,147,10,0.6)]" />
    </div>
  );
}

// ─── Header ─────────────────────────────────────────────────────────────────
function Header() {
  const navLinks = [
    { label: "මංගල සභාව", href: "#venue", icon: MapPin },
    { label: "ඔබගේ පැමිණීම", href: "#rsvp", icon: Heart },
  ];

  return (
    <header className="absolute left-0 right-0 top-0 z-40 w-full transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-12">
        {/* Sun on Left, 'ඉර හඳ පවතිනා තුරු' in Middle, Moon on Right */}
        <SunAndMoonLogo />

        {/* Clean Navigation Bar — Floating Text Links with Icons (No pill container, No background box, No border) */}
        <nav className="flex items-center gap-6 md:gap-8">
          {navLinks.map((i) => {
            const Icon = i.icon;
            return (
              <a
                key={i.href}
                href={i.href}
                className={`${noto.className} group flex items-center gap-2 text-xs font-semibold text-[#fef3e2] transition-colors duration-300 hover:text-[#e8930a] md:text-sm drop-shadow-md`}
              >
                <Icon className="h-4 w-4 text-[#e8930a] transition-transform group-hover:scale-110" />
                <span>{i.label}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

// ─── Jasmine Flower / Petal SVG ──────────────────────────────────────────────
function JasmineFlowerSVG({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 50 50" className={className} style={style} fill="none">
      {/* 5 Petals */}
      <g fill="#fdfaf4" stroke="#e8930a" strokeWidth="0.8" strokeOpacity="0.7">
        <path d="M25 25 C20 15, 20 5, 25 2 C30 5, 30 15, 25 25 Z" />
        <path d="M25 25 C35 20, 45 20, 48 25 C45 30, 35 30, 25 25 Z" />
        <path d="M25 25 C31 35, 37 43, 33 47 C28 45, 24 37, 25 25 Z" />
        <path d="M25 25 C19 37, 13 45, 8 43 C6 38, 14 31, 25 25 Z" />
        <path d="M25 25 C15 20, 5 20, 2 25 C5 30, 15 30, 25 25 Z" />
      </g>
      {/* Center Gold Pistil */}
      <circle cx="25" cy="25" r="3" fill="#e8930a" />
      <circle cx="25" cy="25" r="1.5" fill="#fef3e2" />
    </svg>
  );
}

// ─── Falling Jasmine Flowers Overlay ───────────────────────────────────────
function FallingJasminePetals() {
  // Deterministic petal configs (15 petals) for continuous gentle shower
  const petals = [
    { id: 1, left: "5%", size: 24, duration: 12, delay: 0, sway: 30, rotate: 180 },
    { id: 2, left: "15%", size: 18, duration: 9, delay: 2, sway: -25, rotate: 360 },
    { id: 3, left: "25%", size: 28, duration: 14, delay: 5, sway: 40, rotate: -270 },
    { id: 4, left: "38%", size: 20, duration: 11, delay: 1, sway: -35, rotate: 210 },
    { id: 5, left: "48%", size: 32, duration: 15, delay: 7, sway: 45, rotate: 360 },
    { id: 6, left: "58%", size: 22, duration: 10, delay: 3, sway: -30, rotate: -180 },
    { id: 7, left: "68%", size: 26, duration: 13, delay: 6, sway: 35, rotate: 240 },
    { id: 8, left: "78%", size: 16, duration: 8, delay: 0.5, sway: -20, rotate: 360 },
    { id: 9, left: "88%", size: 30, duration: 16, delay: 4, sway: 40, rotate: -360 },
    { id: 10, left: "95%", size: 20, duration: 12, delay: 8, sway: -25, rotate: 180 },
    { id: 11, left: "10%", size: 22, duration: 13, delay: 4.5, sway: 25, rotate: 300 },
    { id: 12, left: "30%", size: 26, duration: 11, delay: 8.5, sway: -40, rotate: -210 },
    { id: 13, left: "52%", size: 18, duration: 14, delay: 2.5, sway: 30, rotate: 190 },
    { id: 14, left: "72%", size: 28, duration: 10, delay: 9.5, sway: -35, rotate: 360 },
    { id: 15, left: "82%", size: 22, duration: 15, delay: 1.5, sway: 20, rotate: -180 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="absolute -top-10"
          style={{ left: p.left }}
          animate={{
            y: ["0vh", "115vh"],
            x: [0, p.sway, 0, -p.sway, 0],
            rotate: [0, p.rotate],
            opacity: [0, 0.95, 0.95, 0.5, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        >
          <JasmineFlowerSVG className="drop-shadow-[0_2px_10px_rgba(232,147,10,0.4)]" style={{ width: p.size, height: p.size }} />
        </motion.div>
      ))}
    </div>
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

      {/* Falling Jasmine Petals Overlay */}
      <FallingJasminePetals />

      {/* Full-bleed Vintage Background Illustration */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        initial={{ opacity: 0, filter: "blur(20px)" }}
        animate={{ opacity: 0.85, filter: "blur(0px)" }}
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
            className="object-cover object-[50%_35%] sm:object-[70%_center] md:object-right opacity-90 sm:opacity-80"
            style={{ mixBlendMode: "screen" }}
            priority
          />
        </motion.div>
        {/* Responsive gradient overlay: Vertical bottom-to-top fade on mobile so entire couple shows; Horizontal gradient on desktop */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2d0a1a] via-[#2d0a1a]/50 to-[#2d0a1a]/70 sm:bg-gradient-to-r sm:from-[#2d0a1a] sm:via-[#2d0a1a]/70 sm:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2d0a1a]/60 via-transparent to-[#2d0a1a]" />
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
          {/* Eyebrow label — Prominent Highlighted Golden Pill Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-[#e8930a]/40 bg-[#e8930a]/15 px-4.5 py-1.5 shadow-md backdrop-blur-md"
          >
            <Sparkles className="h-4 w-4 text-[#e8930a]" />
            <span className={`${yaldevi.className} text-xs font-semibold text-[#e8930a] md:text-sm drop-shadow-sm`}>
              ගෞරවාරාධනා...! · 2026
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
      <LiyawelaPattern mode="light" opacity={0.15} />
      <div className="relative mx-auto max-w-7xl px-8 md:px-16">
        <FadeIn direction="right">
          <div className="grid items-center gap-16 md:grid-cols-2">
            {/* Left: Intricate Royal Kandyan Lotus Mandala Animation */}
            <div className="hidden md:flex items-center justify-center relative h-[360px] w-[360px] mx-auto select-none">
              {/* Soft Pulsing Saffron Aura */}
              <motion.div 
                className="absolute inset-0 rounded-full bg-[#e8930a]/20 blur-[60px]"
                animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.85, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Outer Dashed Orbit Ring */}
              <motion.div 
                className="absolute inset-2 rounded-full border-2 border-dashed border-[#e8930a]/50"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              />

              {/* Outer Concentric Thin Ring */}
              <div className="absolute inset-6 rounded-full border border-[#2d0a1a]/20" />

              {/* Layer 1: 12-Petal Kandyan Royal Lotus Mandala (Rotates Counter-Clockwise) */}
              <motion.div
                className="absolute inset-8 flex items-center justify-center text-[#2d0a1a]"
                animate={{ rotate: -360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              >
                <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
                  {/* Outer Petal Ring */}
                  <g fill="none" stroke="#e8930a" strokeWidth="1.5">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <g key={i} transform={`rotate(${i * 30} 100 100)`}>
                        <path d="M100 20 C112 45, 120 60, 100 85 C80 60, 88 45, 100 20 Z" fill="#2d0a1a" fillOpacity="0.08" stroke="#e8930a" strokeWidth="1.5" />
                        <circle cx="100" cy="20" r="3" fill="#e8930a" />
                      </g>
                    ))}
                  </g>
                </svg>
              </motion.div>

              {/* Layer 2: 8-Petal Golden Flower Ring (Rotates Clockwise) */}
              <motion.div
                className="absolute inset-14 flex items-center justify-center text-[#e8930a]"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-lg">
                  <g fill="none" stroke="#2d0a1a" strokeWidth="1.5">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <g key={i} transform={`rotate(${i * 45} 80 80)`}>
                        <path d="M80 15 C92 38, 100 50, 80 72 C60 50, 68 38, 80 15 Z" fill="#e8930a" fillOpacity="0.25" stroke="#e8930a" strokeWidth="2" />
                        <line x1="80" y1="15" x2="80" y2="72" stroke="#2d0a1a" strokeWidth="1" strokeDasharray="2 2" />
                      </g>
                    ))}
                  </g>
                </svg>
              </motion.div>

              {/* Layer 3: Central Royal Maroon Disc with Gold Crown Filigree */}
              <div className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full border-2 border-[#e8930a] bg-[#2d0a1a] shadow-[0_0_30px_rgba(45,10,26,0.6)]">
                {/* Inner Pulsing Heart Emblem */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  className="flex items-center justify-center"
                >
                  <Heart className="h-11 w-11 text-[#e8930a] fill-[#e8930a] drop-shadow-[0_0_12px_rgba(232,147,10,0.8)]" />
                </motion.div>

                {/* Concentric Golden Ring inside Disc */}
                <div className="pointer-events-none absolute inset-2 rounded-full border border-dashed border-[#e8930a]/40" />
              </div>

              {/* Orbiting Sun Satellite (ඉර - Sun Symbol) */}
              <motion.div 
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#2d0a1a] p-2 shadow-[0_0_15px_rgba(232,147,10,0.5)] border border-[#e8930a]" title="ඉර (Sun)">
                   <Sun className="h-4 w-4 text-[#e8930a]" />
                </div>
              </motion.div>

              {/* Orbiting Moon Satellite (හඳ - Moon Symbol in Opposite Direction) */}
              <motion.div 
                className="absolute inset-0"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-[#e8930a] p-2 shadow-[0_0_15px_rgba(232,147,10,0.6)] text-[#2d0a1a]" title="හඳ (Moon)">
                   <Moon className="h-4 w-4 fill-[#2d0a1a] text-[#2d0a1a]" />
                </div>
              </motion.div>
            </div>
            {/* Right: Content */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#e8930a]/40 bg-[#e8930a]/15 px-4 py-1.5 shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-[#e8930a]" />
                <span className={`${yaldevi.className} text-xs font-semibold text-[#e8930a] md:text-sm`}>
                  මංගල ආරාධනය
                </span>
              </div>
              <h2 className={`${abhaya.className} mb-6 text-5xl font-bold text-[#2d0a1a] md:text-6xl drop-shadow-sm`}>
                සෙනෙහෙබර<br />ඇරයුමයි
              </h2>
              <p className={`${abhaya.className} text-lg font-medium leading-relaxed text-[#3d1020] md:text-xl`}>
                ජීවිතය අලුත්වන දවසක<br />
                ස්නේහයෙන් ඇරයුම් කරන්නෙමු<br />
                අලුත් ලොව අභිසෙස් ලබන<br />
                සදාතන බැම්මෙන් බැදෙන<br />
                &ldquo;වසන්ත උදෑසන&rdquo;
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Bride & Groom — Royal Arch Split Cards ─────────────────────────────────
function BrideGroomSection() {
  const people = [
    {
      src: "/images/classic-sinhala/bride.png",
      alt: "මනාලිය",
      name: "දෙව්මිණි රත්නායක",
      role: "මනාලිය",
      bio: "අංක 23, නුවර නිවසේ පදිංචි පී.රත්නායක මහතාගේ සහ එම මැතිනියගේ ප්‍රියාදර දූ කුමරිය;",
      side: "left",
    },
    {
      src: "/images/classic-sinhala/groom.png",
      alt: "මනාලයා",
      name: "කසුන් ජයසිංහ",
      role: "මනාලයා",
      bio: "සෙවණ, කුරුණෑගල නිවසේ ප්දිංචි කේ.ජයසිංහ සහ එම මැතිනියගේ පෙම්බර පුත් රුවන;",
      side: "right",
    },
  ];

  return (
    <section id="couple" className="relative overflow-hidden bg-[#2d0a1a] py-24 md:py-36">
      <LiyawelaPattern mode="dark" opacity={0.25} />
      
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e8930a]/10 blur-[180px]" />

      <div className="relative mx-auto max-w-7xl px-8 md:px-16">
        <FadeIn>
          <div className="mb-16 flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-[#e8930a]/40 bg-[#e8930a]/15 px-4.5 py-1.5 shadow-md">
              <Sparkles className="h-3.5 w-3.5 text-[#e8930a]" />
              <span className={`${yaldevi.className} text-xs font-semibold text-[#e8930a] md:text-sm`}>
                මංගල යුවළ
              </span>
            </div>
            <h2 className={`${abhaya.className} text-5xl font-bold text-[#fef3e2] md:text-6xl`}>
              කසුන් සහ දෙව්මිණි
            </h2>
            <div className="mt-4 h-[2px] w-20 bg-gradient-to-r from-transparent via-[#e8930a] to-transparent" />
          </div>
        </FadeIn>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {people.map((p, i) => (
            <FadeIn key={p.name} delay={i * 0.2} direction={i === 0 ? "right" : "left"}>
              <motion.div
                className="group relative overflow-hidden rounded-t-[140px] rounded-b-3xl border border-[#e8930a]/30 bg-[#1e0611] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-[#e8930a]/70 hover:shadow-[0_25px_60px_rgba(232,147,10,0.2)]"
                whileHover={{ y: -8 }}
              >
                {/* Gold Arch Frame Overlay */}
                <div className="relative h-[480px] w-full overflow-hidden rounded-t-[130px] rounded-b-2xl">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e0611] via-[#1e0611]/30 to-transparent" />
                  
                  {/* Floating Gold Sparkle Accent */}
                  <div className="absolute top-6 right-6">
                    <Sparkles className="h-5 w-5 text-[#e8930a]/70 transition-transform group-hover:rotate-45" />
                  </div>
                </div>

                {/* Text Content */}
                <div className="relative z-10 px-6 pb-6 pt-4 text-center">
                  <span className={`${noto.className} mb-2 inline-block rounded-full border border-[#e8930a]/40 bg-[#e8930a]/10 px-4 py-1 text-[11px] uppercase tracking-[0.3em] text-[#e8930a]`}>
                    {p.role}
                  </span>
                  <p className={`${abhaya.className} mx-auto max-w-sm mb-3 text-base font-medium leading-relaxed text-[#fdfaf4]`}>
                    {p.bio}
                  </p>
                  <h3 className={`${abhaya.className} mb-1 text-4xl font-bold text-[#fef3e2]`}>
                    {p.name}
                  </h3>
                </div>

                {/* Corner Decorative Filigree */}
                <div className="pointer-events-none absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 border-[#e8930a]/50" />
                <div className="pointer-events-none absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-[#e8930a]/50" />
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Love Story — Luxury Parchment Timeline ─────────────────────────
function LoveStorySection() {
  return (
    <Section id="story" className="relative overflow-hidden bg-[#fdfaf4] py-24 md:py-36">
      <LiyawelaPattern mode="light" opacity={0.12} />
      <div className="relative mx-auto max-w-5xl px-8 md:px-16">
        <FadeIn direction="up">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-[#e8930a]/40 bg-[#e8930a]/15 px-4.5 py-1.5 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-[#e8930a]" />
              <span className={`${yaldevi.className} text-xs font-semibold text-[#e8930a] md:text-sm`}>
                ආදරයේ පියසටහන්
              </span>
            </div>
            <h2 className={`${abhaya.className} text-5xl font-bold text-[#2d0a1a] md:text-6xl`}>
              අපේ ආදර කතාව
            </h2>
          </div>
        </FadeIn>

        <div className="relative pl-6 md:pl-12">
          {/* Glowing Vertical Line */}
          <motion.div
            className="absolute left-6 top-4 h-full w-[2px] bg-gradient-to-b from-[#e8930a] via-[#e8930a]/40 to-transparent md:left-12"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
          />

          <div className="space-y-16">
            {timeline.map((item, i) => (
              <FadeIn key={item.num} direction="up" delay={i * 0.2}>
                <div className="relative flex flex-col gap-6 md:flex-row md:items-center">
                  {/* Left Seal Badge */}
                  <motion.div
                    className="relative z-10 flex h-14 w-14 shrink-0 -translate-x-[27px] items-center justify-center rounded-full border-2 border-[#e8930a] bg-[#2d0a1a] shadow-[0_0_20px_rgba(232,147,10,0.3)] md:-translate-x-[35px]"
                    whileHover={{ rotate: 180, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className={`${abhaya.className} text-lg font-bold text-[#e8930a]`}>
                      {item.num}
                    </span>
                  </motion.div>

                  {/* Card Content — Soft parchment card without harsh borders */}
                  <motion.div
                    className="group flex-1 rounded-2xl bg-white/80 backdrop-blur-sm p-8 shadow-[0_10px_30px_rgba(45,10,26,0.03)] transition-all duration-300 hover:bg-white hover:shadow-[0_15px_40px_rgba(232,147,10,0.12)]"
                    whileHover={{ x: 6 }}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className={`${noto.className} rounded-md bg-[#2d0a1a] px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-[#e8930a]`}>
                        {item.year}
                      </span>
                      <Heart className="h-4 w-4 text-[#e8930a]/60 transition-transform group-hover:scale-125 group-hover:text-[#e8930a]" />
                    </div>

                    <h3 className={`${abhaya.className} mb-3 text-3xl font-bold text-[#2d0a1a] group-hover:text-[#e8930a] transition-colors`}>
                      {item.title}
                    </h3>
                    <p className={`${noto.className} text-sm font-medium leading-relaxed text-[#3d1020]`}>
                      {item.desc}
                    </p>

                    {/* Corner Accent */}
                    <div className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r border-t border-[#e8930a]/30" />
                  </motion.div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

// ─── Countdown — Royal Starry Night Display ───────────────────────────
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
    <section className="relative overflow-hidden bg-[#2d0a1a] py-24 md:py-36 text-center">
      <KandyanPattern opacity={0.05} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#e8930a]/10 via-transparent to-[#e8930a]/10" />

      <div className="relative mx-auto max-w-6xl px-8 md:px-16">
        <FadeIn>
          <div className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-[#e8930a]/40 bg-[#e8930a]/15 px-5 py-1.5 shadow-md">
            <Sparkles className="h-4 w-4 text-[#e8930a]" />
            <span className={`${yaldevi.className} text-xs font-semibold text-[#e8930a] md:text-sm`}>
              දින ගණනය
            </span>
            <Sparkles className="h-4 w-4 text-[#e8930a]" />
          </div>
          <h2 className={`${abhaya.className} mb-16 text-4xl font-bold text-[#fef3e2] md:text-6xl drop-shadow-md`}>
            සොඳුරු දිනය උදාවීමට තවත්...
          </h2>
        </FadeIn>

        {/* Floating Glass Pill Counters */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:gap-8">
          {units.map((u, i) => (
            <FadeIn key={u.key} delay={i * 0.12} direction="up">
              <motion.div
                className="group relative overflow-hidden rounded-3xl border border-[#e8930a]/30 bg-white/5 p-6 backdrop-blur-md shadow-2xl transition-all duration-300 hover:border-[#e8930a] hover:bg-white/10"
                whileHover={{ y: -6, scale: 1.03 }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={t[u.key]}
                    className={`${abhaya.className} block text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold leading-none text-[#e8930a] drop-shadow-md`}
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.3 }}
                  >
                    {String(t[u.key]).padStart(2, "0")}
                  </motion.span>
                </AnimatePresence>
                <span className={`${noto.className} mt-3 block text-xs uppercase tracking-[0.3em] text-[#fef3e2]/80`}>
                  {u.label}
                </span>

                {/* Subtle corner mark */}
                <div className="pointer-events-none absolute right-2 top-2 h-3 w-3 border-r border-t border-[#e8930a]/40" />
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.5} direction="up" className="mt-16">
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${noto.className} group inline-flex items-center gap-3 rounded-full border border-[#e8930a] bg-[#e8930a]/10 px-10 py-4 text-xs uppercase tracking-[0.3em] text-[#e8930a] shadow-[0_0_20px_rgba(232,147,10,0.2)] transition-all hover:bg-[#e8930a] hover:text-[#2d0a1a] hover:shadow-[0_0_30px_rgba(232,147,10,0.5)]`}
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
              සොඳුරු දින චාරිත්‍ර පෙළගැස්ම!
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
              <div className="hidden md:flex w-[60px] shrink-0 justify-end mr-8 text-[#c4a882] transition-transform duration-500 group-hover:scale-110 group-hover:text-[#e8930a] drop-shadow-md">
                {getIcon(i)}
              </div>

              {/* Node Heart on line */}
              <div className="relative z-10 w-10 h-10 shrink-0 flex items-center justify-center mr-6 md:mr-8 bg-[#2d0a1a] rounded-full border border-[#e8930a]/30 shadow-[0_0_15px_rgba(232,147,10,0.15)] transition-all duration-300 group-hover:bg-[#e8930a]/10 group-hover:border-[#e8930a] group-hover:shadow-[0_0_20px_rgba(232,147,10,0.4)]">
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

// ─── Venue — Luxury Card & Interactive Map ─────────────────────────────
function VenueSection() {
  return (
    <Section id="venue" className="relative overflow-hidden bg-[#fdfaf4] py-24 md:py-36">
      <LiyawelaPattern mode="light" opacity={0.12} />
      <div className="relative mx-auto max-w-7xl px-8 md:px-16">
        <FadeIn>
          <div className="mb-16 flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-[#e8930a]/40 bg-[#e8930a]/15 px-4.5 py-1.5 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-[#e8930a]" />
              <span className={`${yaldevi.className} text-xs font-semibold text-[#e8930a] md:text-sm`}>
                උත්සව භූමිය
              </span>
            </div>
            <h2 className={`${abhaya.className} text-5xl font-bold text-[#2d0a1a] md:text-6xl`}>
              මංගල සාදය පැවැත්වෙන ස්ථානය
            </h2>
            <div className="mt-4 h-[2px] w-20 bg-gradient-to-r from-transparent via-[#e8930a] to-transparent" />
          </div>
        </FadeIn>

        <div className="flex flex-col gap-0 overflow-hidden rounded-3xl border border-[#e8930a]/30 shadow-[0_30px_70px_rgba(45,10,26,0.12)] lg:flex-row">
          {/* Info panel */}
          <FadeIn direction="right" className="relative flex flex-col justify-center bg-[#2d0a1a] p-10 lg:w-2/5 md:p-14">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#e8930a]/30 bg-[#e8930a]/10 text-[#e8930a]">
              <MapPin className="h-7 w-7" />
            </div>

            <h3 className={`${abhaya.className} mb-3 text-3xl font-bold text-[#fef3e2] md:text-4xl`}>
              Waters Edge Grand Ballroom
            </h3>
            <p className={`${noto.className} mb-1 font-light text-[#c4a882]`}>316 Ethul Kotte Road,</p>
            <p className={`${noto.className} mb-8 font-light text-[#c4a882]`}>Battaramulla 10100, Sri Lanka.</p>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Waters+Edge+Grand+Ballroom,+Battaramulla"
              target="_blank"
              rel="noopener noreferrer"
              className={`${noto.className} group inline-flex w-fit items-center gap-3 rounded-full border border-[#e8930a] bg-[#e8930a]/10 px-8 py-3.5 text-xs uppercase tracking-[0.25em] text-[#e8930a] shadow-lg transition-all hover:bg-[#e8930a] hover:text-[#2d0a1a]`}
            >
              <Navigation className="h-4 w-4" />
              ස්ථානය වෙත පිවිසෙන මාර්ගය
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>

            {/* Corner Decorative Filigree */}
            <div className="pointer-events-none absolute left-4 top-4 h-6 w-6 border-l-2 border-t-2 border-[#e8930a]/40" />
          </FadeIn>

          {/* Map */}
          <FadeIn direction="left" className="relative min-h-[26rem] w-full lg:w-3/5">
            <iframe
              src="https://www.google.com/maps?q=Waters+Edge+Grand+Ballroom,+316+Ethul+Kotte+Road,+Battaramulla,+Sri+Lanka&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              title="ස්ථානය"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full grayscale contrast-125 opacity-90 transition-all duration-500 hover:grayscale-0 hover:opacity-100"
            />
          </FadeIn>
        </div>
      </div>
    </Section>
  );
}

// ─── Gallery — Smooth Horizontal Reel Carousel with Lightbox ──────────────
function GallerySection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const images = [
    { src: "/images/wedding-invitation/gallery-1.jpg", title: "ආදරණීය මොහොත", aspect: "w-[300px] md:w-[380px] h-[420px] md:h-[500px]" },
    { src: "/images/wedding-invitation/gallery-4.jpg", title: "මඟුල් සභාවේ සොඳුරු බව", aspect: "w-[340px] md:w-[440px] h-[420px] md:h-[500px]" },
    { src: "/images/wedding-invitation/gallery-2.jpg", title: "රාජකීය ආදරණීය සේයා රූ", aspect: "w-[300px] md:w-[380px] h-[420px] md:h-[500px]" },
    { src: "/images/wedding-invitation/gallery-5.jpg", title: "සදාතන පෙම් බැඳීම", aspect: "w-[340px] md:w-[440px] h-[420px] md:h-[500px]" },
    { src: "/images/wedding-invitation/gallery-3.jpg", title: "මංගල මුදු හුවමාරුව", aspect: "w-[300px] md:w-[380px] h-[420px] md:h-[500px]" },
    { src: "/images/wedding-invitation/gallery-6.jpg", title: "අභිෂේක මංගල නිමේෂය", aspect: "w-[340px] md:w-[440px] h-[420px] md:h-[500px]" },
  ];

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : (prev as number) - 1));
  }, [selectedIndex, images.length]);

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : (prev as number) + 1));
  }, [selectedIndex, images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handlePrev, handleNext]);

  return (
    <Section id="gallery" className="relative overflow-hidden bg-[#fef3e2] py-24 md:py-36">
      <LiyawelaPattern mode="light" opacity={0.15} />

      {/* Ambient Lighting */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e8930a]/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        <FadeIn>
          <div className="mb-12 flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-end">
            <div className="text-center sm:text-left">
              <div className="mb-3 inline-flex items-center gap-2.5 rounded-full border border-[#e8930a]/40 bg-[#e8930a]/15 px-4.5 py-1.5 shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-[#e8930a]" />
                <span className={`${yaldevi.className} text-xs font-semibold text-[#e8930a] md:text-sm`}>
                  සොඳුරු මතකයන්
                </span>
              </div>
              <h2 className={`${abhaya.className} text-5xl font-bold text-[#2d0a1a] md:text-6xl`}>
                ආදරයේ සේයා රූ
              </h2>
            </div>

            {/* Scroll Navigation Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={scrollLeft}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#e8930a]/40 bg-[#2d0a1a] text-[#e8930a] shadow-lg transition-all hover:scale-110 hover:bg-[#e8930a] hover:text-[#2d0a1a]"
                title="පෙර සේයා රූ"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={scrollRight}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#e8930a]/40 bg-[#2d0a1a] text-[#e8930a] shadow-lg transition-all hover:scale-110 hover:bg-[#e8930a] hover:text-[#2d0a1a]"
                title="ඊළඟ සේයා රූ"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        </FadeIn>

        {/* Smooth Horizontal Scroll Strip */}
        <div
          ref={scrollRef}
          className="no-scrollbar flex gap-6 overflow-x-auto scroll-smooth pb-8 pt-2 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {images.map((img, i) => (
            <motion.div
              key={img.src}
              onClick={() => setSelectedIndex(i)}
              className={`group relative shrink-0 cursor-pointer overflow-hidden rounded-3xl border-2 border-[#e8930a]/30 bg-[#2d0a1a] snap-center shadow-[0_20px_50px_rgba(45,10,26,0.12)] transition-all duration-500 hover:border-[#e8930a] hover:shadow-[0_30px_60px_rgba(232,147,10,0.3)] ${img.aspect}`}
              whileHover={{ y: -10, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Image
                src={img.src}
                alt={img.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                sizes="500px"
              />

              {/* Light Sheen Sweep Effect on Hover */}
              <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full" />

              {/* Dark Vignette Overlay on Hover */}
              <motion.div className="absolute inset-0 bg-gradient-to-t from-[#2d0a1a]/90 via-[#2d0a1a]/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Center View Icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#e8930a] bg-[#2d0a1a]/90 text-[#e8930a] shadow-xl backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                  <Maximize2 className="h-6 w-6" />
                </div>
              </div>

              {/* Bottom Caption Bar */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between opacity-0 transition-all duration-300 group-hover:opacity-100">
                <span className={`${abhaya.className} text-xl font-bold text-[#fef3e2] drop-shadow-md`}>
                  {img.title}
                </span>
                <span className={`${noto.className} rounded-full bg-[#e8930a] px-3.5 py-1 text-[11px] font-extrabold uppercase text-[#2d0a1a] shadow-md`}>
                  0{i + 1}
                </span>
              </div>

              {/* Corner Filigree Accents */}
              <div className="pointer-events-none absolute left-4 top-4 h-6 w-6 border-l-2 border-t-2 border-[#e8930a]/80" />
              <div className="pointer-events-none absolute right-4 bottom-4 h-6 w-6 border-r-2 border-b-2 border-[#e8930a]/80" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#140208]/95 p-4 backdrop-blur-xl md:p-8"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute right-6 top-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[#e8930a]/40 bg-[#2d0a1a]/80 text-[#e8930a] transition-all hover:bg-[#e8930a] hover:text-[#2d0a1a] shadow-lg"
              title="වසා දමන්න (Esc)"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-[#e8930a]/40 bg-[#2d0a1a]/80 text-[#e8930a] transition-all hover:scale-110 hover:bg-[#e8930a] hover:text-[#2d0a1a] shadow-2xl"
              title="පෙර ඡායාරූපය"
            >
              <ChevronLeft className="h-7 w-7" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-[#e8930a]/40 bg-[#2d0a1a]/80 text-[#e8930a] transition-all hover:scale-110 hover:bg-[#e8930a] hover:text-[#2d0a1a] shadow-2xl"
              title="ඊළඟ ඡායාරූපය"
            >
              <ChevronRight className="h-7 w-7" />
            </button>

            {/* Main Lightbox Content */}
            <motion.div
              key={selectedIndex}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="relative flex max-h-[85vh] max-w-[90vw] flex-col items-center overflow-hidden rounded-3xl border-2 border-[#e8930a] bg-[#2d0a1a] p-3 shadow-[0_30px_100px_rgba(232,147,10,0.3)] md:max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[65vh] w-full min-w-[300px] overflow-hidden rounded-2xl md:h-[70vh] md:w-[75vw]">
                <Image
                  src={images[selectedIndex].src}
                  alt={images[selectedIndex].title}
                  fill
                  className="object-contain"
                  sizes="90vw"
                  priority
                />
              </div>

              {/* Lightbox Caption Bar */}
              <div className="mt-4 flex w-full items-center justify-between px-6 pb-2">
                <div className="flex items-center gap-3">
                  <Camera className="h-5 w-5 text-[#e8930a]" />
                  <span className={`${abhaya.className} text-2xl font-bold text-[#fef3e2]`}>
                    {images[selectedIndex].title}
                  </span>
                </div>
                <span className={`${noto.className} rounded-full border border-[#e8930a]/50 bg-[#e8930a]/20 px-4 py-1 text-xs font-bold text-[#e8930a]`}>
                  {selectedIndex + 1} / {images.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

// ─── Dress Code — Luxury Palette Guide ──────────────────────────────────
function DressCodeSection() {
  return (
    <Section id="dress-code" className="relative overflow-hidden bg-[#2d0a1a] py-24 md:py-36 text-[#fef3e2]">
      <LiyawelaPattern mode="dark" opacity={0.25} />
      
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e8930a]/10 blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-8 md:px-16">
        <div className="flex flex-col items-center gap-16 md:flex-row">
          <FadeIn direction="right" className="w-full md:w-1/2">
            <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#e8930a]/40 bg-[#e8930a]/15 px-4.5 py-1.5 shadow-sm backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-[#e8930a]" />
              <span className={`${yaldevi.className} text-xs font-semibold text-[#e8930a] md:text-sm`}>
                පැළඳුම් විලාසය
              </span>
            </div>
            <h2 className={`${abhaya.className} mb-6 text-5xl font-bold text-[#fef3e2] md:text-6xl drop-shadow-md`}>
              ඔබේ පැමිණීම සඳහා
            </h2>
            <p className={`${noto.className} mb-6 text-base font-light leading-relaxed text-[#fdfaf4]`}>
              ගෞරවනීය අමුත්තන්ගෙන් විධිමත් හා අලංකාර පැළඳුම් විලාසයක් අපේක්ෂා කරමු. මහතුන් සඳහා සම්පූර්ණ කලිසම සහ කමිසයද, කාන්තාවන් සඳහා සාරිය හෝ අලංකාර ගවුම් විලාසිතාවක්ද උචිත වේ.
            </p>
            <p className={`${noto.className} mb-8 text-base font-light leading-relaxed text-[#c4a882]`}>
              මනාලියගේ ඇඳුම් වර්ණය වන සුදු සහ ඇත්දළ (Ivory) පැහැයෙන් යුතු ඇඳුම් ඇඳීමෙන් වළකින මෙන් කාරුණිකව ඉල්ලා සිටිමු.
            </p>

            {/* Palette Swatches */}
            <div className="mb-8 rounded-2xl border border-[#e8930a]/30 bg-white/5 p-6 backdrop-blur-md shadow-xl">
              <span className={`${noto.className} mb-4 block text-xs font-semibold uppercase tracking-widest text-[#e8930a]`}>
                අනුමත වර්ණ සංකලනය (COLOR PALETTE)
              </span>
              <div className="flex flex-wrap items-center gap-5">
                <div className="flex items-center gap-2.5">
                  <div className="h-7 w-7 rounded-full bg-[#2d0a1a] border border-[#e8930a]/60 shadow-md" />
                  <span className={`${noto.className} text-xs font-medium text-[#fdfaf4]`}>Maroon</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="h-7 w-7 rounded-full bg-[#e8930a] border border-[#e8930a]/40 shadow-md" />
                  <span className={`${noto.className} text-xs font-medium text-[#fdfaf4]`}>Saffron Gold</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="h-7 w-7 rounded-full bg-[#7a4a2a] border border-[#e8930a]/40 shadow-md" />
                  <span className={`${noto.className} text-xs font-medium text-[#fdfaf4]`}>Warm Bronze</span>
                </div>
                <div className="flex items-center gap-2.5 opacity-60">
                  <div className="relative h-7 w-7 rounded-full bg-[#ffffff] border border-gray-400 shadow-inner flex items-center justify-center">
                    <div className="h-px w-6 bg-red-600 rotate-45" />
                  </div>
                  <span className={`${noto.className} text-xs text-[#c4a882] line-through`}>Ivory/White</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-[#e8930a]/30" />
              <span className={`${noto.className} text-xs font-semibold uppercase tracking-widest text-[#e8930a]`}>
                Formal &amp; Traditional Attire
              </span>
              <div className="h-px flex-1 bg-[#e8930a]/30" />
            </div>
          </FadeIn>

          <FadeIn direction="left" className="w-full md:w-1/2">
            <motion.div
              className="relative h-[520px] overflow-hidden rounded-3xl border-2 border-[#e8930a]/40 shadow-[0_30px_80px_rgba(0,0,0,0.4)]"
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
              <div className="absolute inset-0 bg-gradient-to-t from-[#2d0a1a]/60 via-transparent to-transparent" />
              {/* Corner filigree accents */}
              <div className="pointer-events-none absolute left-6 top-6 h-8 w-8 border-l-2 border-t-2 border-[#e8930a]" />
              <div className="pointer-events-none absolute right-6 bottom-6 h-8 w-8 border-r-2 border-b-2 border-[#e8930a]" />
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </Section>
  );
}

// ─── RSVP — Royal Invitation Card ─────────────────────────────────────
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

  const input = `${noto.className} w-full border-b-2 border-[#e8930a]/40 bg-transparent pb-3 pt-2 text-sm text-[#2d0a1a] outline-none transition-all placeholder:text-[#c4a882] focus:border-[#e8930a]`;

  return (
    <section id="rsvp" className="relative overflow-hidden bg-[#fdfaf4] py-24 md:py-36">
      <LiyawelaPattern mode="light" opacity={0.12} />
      <div className="relative mx-auto max-w-5xl px-8 md:px-16">
        <div className="rounded-3xl border border-[#e8930a]/30 bg-[#fef3e2] p-8 shadow-[0_20px_60px_rgba(45,10,26,0.08)] md:p-16">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            {/* Left: Heading */}
            <FadeIn direction="right">
              <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#e8930a]/40 bg-[#e8930a]/15 px-4.5 py-1.5 shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-[#e8930a]" />
                <span className={`${yaldevi.className} text-xs font-semibold text-[#e8930a] md:text-sm`}>
                  පැමිණීම තහවුරු කිරීම (RSVP)
                </span>
              </div>
              <h2 className={`${abhaya.className} mb-6 text-5xl font-bold text-[#2d0a1a] md:text-6xl`}>
                පැමිණීම තහවුරු කිරීම
              </h2>
              <p className={`${noto.className} text-base font-light leading-relaxed text-[#7a4a2a]`}>
                ඔබගේ පැමිණීම අපට ඉමහත් සතුටක් ගෙන දෙයි. කරුණාකර ඔබගේ සහභාගීත්වය හා සොඳුරු සුබපැතුම් පහත පෝරමය හරහා අප වෙත යොමු කරන්න.
              </p>

              <div className="mt-10 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2d0a1a] text-[#e8930a] shadow-md">
                  <Heart className="h-5 w-5 fill-[#e8930a]" />
                </div>
                <span className={`${noto.className} text-xs font-semibold text-[#2d0a1a]`}>
                  කසුන් සහ දෙව්මිණි
                </span>
              </div>
            </FadeIn>

            {/* Right: Form */}
            <FadeIn direction="left">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="si2-name" className={`${noto.className} block text-[10px] font-bold uppercase tracking-[0.25em] text-[#e8930a] mb-1`}>
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

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="si2-attending" className={`${noto.className} block text-[10px] font-bold uppercase tracking-[0.25em] text-[#e8930a] mb-1`}>
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
                      <ChevronDown className="pointer-events-none absolute right-2 top-3 h-4 w-4 text-[#e8930a]" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="si2-guests" className={`${noto.className} block text-[10px] font-bold uppercase tracking-[0.25em] text-[#e8930a] mb-1`}>
                      සංඛ්‍යාව
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
                  <label htmlFor="si2-message" className={`${noto.className} block text-[10px] font-bold uppercase tracking-[0.25em] text-[#e8930a] mb-1`}>
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
                    className={`${noto.className} text-sm font-medium text-emerald-700`} role="status">
                    {successMessage}
                  </motion.p>
                )}

                <motion.button
                  type="submit"
                  disabled={isPending}
                  whileHover={isPending ? {} : { scale: 1.02 }}
                  whileTap={isPending ? {} : { scale: 0.98 }}
                  className={`${noto.className} w-full rounded-xl bg-[#2d0a1a] py-4 text-xs font-bold uppercase tracking-[0.35em] text-[#e8930a] shadow-lg transition-all duration-300 hover:bg-[#1e0611] hover:shadow-xl disabled:opacity-50`}
                  suppressHydrationWarning
                >
                  {isPending ? "යොමු කරමින් පවතී..." : "සුබපැතුම් යොමු කරන්න"}
                </motion.button>
              </form>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Words of Love — Royal Guestbook Cards ─────────────────────────
function WordsOfLoveSection({ messages }: { messages: GuestMessage[] }) {
  const notes = messages.filter((e) => e.message.trim());

  return (
    <section className="relative overflow-hidden bg-[#2d0a1a] py-24 md:py-36">
      <LiyawelaPattern mode="dark" opacity={0.25} />
      <div className="relative mx-auto max-w-7xl px-8 md:px-16">
        <FadeIn>
          <div className="mb-16 flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-[#e8930a]/40 bg-[#e8930a]/15 px-4.5 py-1.5 shadow-md">
              <Sparkles className="h-3.5 w-3.5 text-[#e8930a]" />
              <span className={`${yaldevi.className} text-xs font-semibold text-[#e8930a] md:text-sm`}>
                ඔබගේ ආශිර්වාද
              </span>
            </div>
            <h2 className={`${abhaya.className} text-5xl font-bold text-[#fef3e2] md:text-6xl drop-shadow-md`}>
              ආදරණීයයන්ගේ සුබපැතුම්
            </h2>
            <div className="mt-4 h-[2px] w-20 bg-gradient-to-r from-transparent via-[#e8930a] to-transparent" />
          </div>
        </FadeIn>

        {notes.length === 0 ? (
          <FadeIn>
            <div className="mx-auto max-w-md rounded-2xl border border-[#e8930a]/20 bg-white/5 p-8 text-center backdrop-blur-md">
              <Sparkles className="mx-auto mb-3 h-6 w-6 text-[#e8930a]" />
              <p className={`${noto.className} text-sm italic text-[#c4a882]`}>
                ඉහත පෝරමය හරහා ඔබගේ ආදරණීය සුබපැතුම ප්‍රථමයෙන්ම අප වෙත යොමු කරන්න.
              </p>
            </div>
          </FadeIn>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map((entry, i) => (
              <FadeIn key={entry.id} delay={i * 0.08} direction="up">
                <motion.div
                  className="group relative rounded-2xl border border-[#e8930a]/30 bg-white/5 p-8 backdrop-blur-md shadow-xl transition-all duration-300 hover:border-[#e8930a] hover:bg-white/10"
                  whileHover={{ y: -6 }}
                >
                  {/* Corner Filigree Marks */}
                  <div className="pointer-events-none absolute left-3 top-3 h-5 w-5 border-l border-t border-[#e8930a]/60" />
                  <div className="pointer-events-none absolute right-3 bottom-3 h-5 w-5 border-r border-b border-[#e8930a]/60" />
                  
                  <Heart className="mb-4 h-5 w-5 text-[#e8930a] fill-[#e8930a]/30" />
                  <p className={`${noto.className} mb-6 text-sm italic leading-relaxed text-[#f5e6cc]`}>
                    &ldquo;{entry.message}&rdquo;
                  </p>
                  <p className={`${abhaya.className} text-lg font-bold text-[#e8930a]`}>
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

// ─── Footer ─────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#140208] pb-12 pt-20 text-[#fef3e2]">
      <div className="relative z-10 mx-auto max-w-7xl px-8 md:px-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Column 1: Logo & Heart Message */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Heart className="h-6 w-6 text-[#e8930a] fill-[#e8930a]/20" />
              <span className={`${abhaya.className} text-3xl font-extrabold text-[#e8930a]`}>
                K සහ D
              </span>
            </div>
            <p className={`${noto.className} text-xs leading-relaxed text-[#c4a882]`}>
              අපගේ මංගල වෙබ් අඩවියට පැමිණ අපගේ ආදර කතාවේ කොටස්කරුවෙකු වීම පිළිබඳව ඔබට ස්තූතියි. ඔබ සමඟ මෙම සොඳුරු දිනය සැමරීමට අපි නොඉවසිල්ලෙන් පසුවෙමු!
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className={`${noto.className} mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#e8930a]`}>
              ඉක්මන් සබැඳි
            </h3>
            <ul className={`${noto.className} space-y-2 text-xs text-[#c4a882]`}>
              <li>
                <a href="#venue" className="transition-colors hover:text-[#e8930a]">
                  මංගල සභාව
                </a>
              </li>
              <li>
                <a href="#schedule" className="transition-colors hover:text-[#e8930a]">
                  චාරිත්‍ර පෙළගැස්ම
                </a>
              </li>
              <li>
                <a href="#rsvp" className="transition-colors hover:text-[#e8930a]">
                  පැමිණීම තහවුරු කිරීම
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Wedding Details */}
          <div>
            <h3 className={`${noto.className} mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#e8930a]`}>
              මංගල තොරතුරු
            </h3>
            <ul className={`${noto.className} space-y-2 text-xs text-[#c4a882]`}>
              <li>2026 අගෝස්තු 14 වන දින</li>
              <li>වෝටර්ස් ඒජ් හෝටලය, බත්තරමුල්ල</li>
              <li className="font-semibold text-[#e8930a]">#kasundevmini</li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className={`${noto.className} mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#e8930a]`}>
              සම්බන්ධ කර ගැනීමට
            </h3>
            <ul className={`${noto.className} space-y-2 text-xs text-[#c4a882]`}>
              <li className="flex items-center gap-2">
                <span>දෙව්මිණි —</span>
                <a href="tel:0756772671" className="font-semibold text-[#fef3e2] hover:text-[#e8930a]">
                  075 677 2671
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>කසුන් —</span>
                <a href="tel:0706266514" className="font-semibold text-[#fef3e2] hover:text-[#e8930a]">
                  070 626 6514
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright bar */}
        <div className="mt-16 border-t border-[#e8930a]/15 pt-8 text-center">
          <p suppressHydrationWarning className={`${noto.className} text-xs text-[#c4a882]/70`}>
            &copy; {new Date().getFullYear()} කසුන් සහ දෙව්මිණි · සියලු හිමිකම් ඇවිරිණි
          </p>
          <a
            href="https://mohotha.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`${noto.className} mt-2 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#c4a882]/60 hover:text-[#e8930a]`}
          >
            Designed by <span className="font-bold text-[#e8930a]">MOHOTHA</span>
          </a>
        </div>
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
    <main suppressHydrationWarning className={`relative min-h-screen w-full overflow-x-hidden bg-[#fef3e2] ${abhaya.className}`}>
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
