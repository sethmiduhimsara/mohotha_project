"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState, useTransition } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { submitRsvp } from "@/app/actions/wedding-invitation/rsvp";
import {
  MapPin,
  Navigation,
  ChevronDown,
  CalendarDays,
  Camera,
  Shirt,
  Clock,
  ExternalLink,
  Volume2,
  VolumeX,
  X,
  ArrowUp,
  Mail,
  Heart,
  Wine,
  Sparkles,
  BookHeart,
  MessageSquareHeart,
  Check,
} from "lucide-react";
import Section from "@/components/ui/Section";
import { FadeIn } from "./FadeIn";
import { Pinyon_Script, Cinzel, Plus_Jakarta_Sans } from "next/font/google";

const scriptFont = Pinyon_Script({
  subsets: ["latin"],
  weight: ["400"],
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// ─────────────────────────────────────── Types ────────────────────────────────
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

// ── Interactive Custom Cursor & Fairy Dust ─────────────────────────────────────
function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.body.classList.add("hide-default-cursor");

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", onResize);

    let mouse = { x: -100, y: -100 };
    let ringPos = { x: -100, y: -100 };
    let isHovering = false;
    let isActive = true;

    type Particle = { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number };
    let particles: Particle[] = [];

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Spawn fairy dust on movement
      if (Math.random() > 0.3) {
        particles.push({
          x: mouse.x,
          y: mouse.y,
          vx: (Math.random() - 0.5) * 1.5,
          vy: Math.random() * 1.5 + 0.2, // Drift downward
          life: 0,
          maxLife: 40 + Math.random() * 40,
          size: Math.random() * 2 + 0.5,
        });
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select, .cursor-zoom-in")) {
        isHovering = true;
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select, .cursor-zoom-in")) {
        isHovering = false;
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    let animationId: number;

    const render = () => {
      if (!isActive) return;
      ctx.clearRect(0, 0, width, height);

      // Interpolate ring position
      ringPos.x += (mouse.x - ringPos.x) * 0.15;
      ringPos.y += (mouse.y - ringPos.y) * 0.15;

      // Update DOM cursor elements
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
        dotRef.current.style.opacity = isHovering ? "0" : "1";
      }
      if (ringRef.current) {
        const ringSize = isHovering ? 50 : 30;
        ringRef.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;
        ringRef.current.style.width = `${ringSize}px`;
        ringRef.current.style.height = `${ringSize}px`;
        ringRef.current.style.backgroundColor = isHovering ? "rgba(212,175,55,0.15)" : "transparent";
      }

      // Render Fairy Dust particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        const progress = p.life / p.maxLife;
        const opacity = 1 - progress;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${opacity})`;
        ctx.fill();
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(212, 175, 55, 0.8)";
      }

      particles = particles.filter((p) => p.life < p.maxLife);
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      isActive = false;
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(animationId);
      document.body.classList.remove("hide-default-cursor");
    };
  }, []);

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          .hide-default-cursor,
          .hide-default-cursor * {
            cursor: none !important;
          }
        }
      `}</style>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9998]"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-[#D4AF37] transition-[width,height,background-color] duration-300 ease-out flex items-center justify-center mix-blend-screen"
        style={{ width: 30, height: 30, transform: "translate(-50%, -50%)", willChange: "transform, width, height" }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000] w-1.5 h-1.5 bg-[#D4AF37] rounded-full transition-opacity duration-200"
        style={{ transform: "translate(-50%, -50%)", marginLeft: "-3px", marginTop: "-3px", willChange: "transform, opacity", boxShadow: "0 0 8px rgba(212,175,55,1)" }}
      />
    </>
  );
}

// ─────────────────────────────────────── Data ─────────────────────────────────
const scheduleItems = [
  { time: "9:00 AM",   title: "Poruwa Ceremony",       description: "The traditional Sri Lankan ritual for the couple.",               icon: Sparkles },
  { time: "10:00 AM",  title: "Start of the Ceremony", description: "Join us as we exchange vows and celebrate our love.",             icon: Mail },
  { time: "11:00 AM",  title: "Bar Opening",           description: "Enjoy a selection of drinks and cocktails.",                      icon: Wine },
  { time: "12:30 PM",  title: "Lunch",                 description: "Enjoy a delicious meal with family and friends.",                 icon: Heart },
  { time: "05:00 PM",  title: "End of the Event",      description: "Wrap up the celebration and say your goodbyes.",                  icon: Clock },
];

const timeline = [
  { year: "2018", title: "First Meeting",  description: "We crossed paths at a small coffee shop in the heart of the city. A spilled latte led to a conversation that lasted for hours." },
  { year: "2020", title: "The First Trip", description: "Our first adventure together in Paris. Wandering through the Louvre and getting lost in the charming streets of Montmartre."  },
  { year: "2023", title: "The Proposal",   description: "Under a canopy of stars on a quiet beach, he asked the question. And with happy tears, she said yes."                        },
];

const googleCalendarUrl = (() => {
  const p = new URLSearchParams({
    action: "TEMPLATE",
    text: "Amara & Nayana Wedding",
    dates: "20261212/20261213",
    details: "Join us to celebrate the wedding of Amara and Nayana on December 12, 2026.",
    location: "Waters Edge Grand Ballroom, 316 Ethul Kotte Road, Battaramulla 10100, Sri Lanka",
    ctz: "Asia/Colombo",
  });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
})();

function calcTimeLeft() {
  const target = new Date("2026-12-12T00:00:00").getTime();
  const d = target - Date.now();
  if (d <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days:    Math.floor(d / 86400000),
    hours:   Math.floor((d % 86400000)  / 3600000),
    minutes: Math.floor((d % 3600000)   / 60000),
    seconds: Math.floor((d % 60000)     / 1000),
  };
}

// ══════════════════════════════════════════════════════════════════════════════
//  MODERN EDITORIAL COMPONENTS
// ══════════════════════════════════════════════════════════════════════════════

// ── Magnetic Button Wrapper ───────────────────────────────────────────────────
function MagneticWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 25 });
  const springY = useSpring(y, { stiffness: 300, damping: 25 });

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - (rect.left + rect.width / 2)) * 0.25);
        y.set((e.clientY - (rect.top + rect.height / 2)) * 0.25);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="inline-block w-full sm:w-auto"
    >
      {children}
    </motion.div>
  );
}

// ── Masked Section Wave Dividers (Pattern-Filled Waves) ──────────────────────
const ORGANIC_WAVE_MASK = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M0,60 C300,130 400,-10 700,70 C950,130 1050,0 1200,50 L1200,120 L0,120 Z" fill="white"/></svg>`;
const WAVY_ZIGZAG_MASK  = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M0,45 C220,115 420,10 680,80 C880,125 1040,15 1200,55 L1200,120 L0,120 Z" fill="white"/></svg>`;

function OrganicWaveDivider({ color = "#FCFCFC", toColor }: { color?: string; fromColor?: string; toColor?: string }) {
  const fillColor = toColor ?? color;
  const isDark = fillColor === "#111111" || fillColor === "#0A0A0A";
  const patternUrl = isDark ? "/images/wedding-invitation/dark-pattern.png" : "/images/wedding-invitation/light-pattern.png";

  return (
    <div className="w-full overflow-hidden leading-none relative z-30 pointer-events-none -mt-12 sm:-mt-24 -mb-1 h-16 sm:h-28">
      {/* HTML Div masked to wave curve with matching pattern background */}
      <div
        className="w-full h-full relative"
        style={{
          backgroundColor: fillColor,
          WebkitMaskImage: `url('${ORGANIC_WAVE_MASK}')`,
          maskImage: `url('${ORGANIC_WAVE_MASK}')`,
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      >
        <div
          className={`absolute inset-0 bg-repeat bg-center ${
            isDark
              ? "opacity-20 mix-blend-screen"
              : "opacity-60 mix-blend-multiply filter contrast-125 brightness-95"
          }`}
          style={{
            backgroundImage: `url('${patternUrl}')`,
            backgroundSize: "500px auto",
          }}
        />
      </div>
    </div>
  );
}

function WavyZigZagDivider({ color = "#111111", toColor }: { color?: string; fromColor?: string; toColor?: string }) {
  const fillColor = toColor ?? color;
  const isDark = fillColor === "#111111" || fillColor === "#0A0A0A";
  const patternUrl = isDark ? "/images/wedding-invitation/dark-pattern.png" : "/images/wedding-invitation/light-pattern.png";

  return (
    <div className="w-full overflow-hidden leading-none relative z-30 pointer-events-none -mt-12 sm:-mt-24 -mb-1 h-16 sm:h-28">
      {/* HTML Div masked to wave curve with matching pattern background */}
      <div
        className="w-full h-full relative"
        style={{
          backgroundColor: fillColor,
          WebkitMaskImage: `url('${WAVY_ZIGZAG_MASK}')`,
          maskImage: `url('${WAVY_ZIGZAG_MASK}')`,
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      >
        <div
          className={`absolute inset-0 bg-repeat bg-center ${
            isDark
              ? "opacity-20 mix-blend-screen"
              : "opacity-60 mix-blend-multiply filter contrast-125 brightness-95"
          }`}
          style={{
            backgroundImage: `url('${patternUrl}')`,
            backgroundSize: "500px auto",
          }}
        />
      </div>
    </div>
  );
}

// ── Editorial Section Heading ─────────────────────────────────────────────────
function EditorialHeading({ title, subtitle, isDark = false, className = "" }: { title: string; subtitle?: string; isDark?: boolean; className?: string }) {
  const textColor = isDark ? "text-[#FAFAFA]" : "text-[#0A0A0A]";
  const accentColor = isDark ? "text-[#D4AF37]" : "text-[#B38E46]";
  const lineColor = isDark ? "bg-[#D4AF37]/50" : "bg-[#0A0A0A]/20";

  return (
    <div className={`text-center px-4 ${className}`}>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={`mx-auto h-[1.5px] w-14 ${lineColor} mb-4`}
      />
      <motion.h2
        className={`${cinzel.className} text-3xl xs:text-4xl sm:text-5xl md:text-6xl ${textColor} font-bold tracking-wider leading-snug mb-4 uppercase`}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className={`${jakarta.className} text-xs xs:text-sm uppercase tracking-[0.25em] ${accentColor} font-extrabold`}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

// ── 3D Flip Digit (Modern Advanced) ───────────────────────────────────────────
function FlipDigit({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.04, borderColor: "rgba(212,175,55,0.8)" }}
      className="relative flex w-full aspect-square max-w-[110px] sm:max-w-none flex-col items-center justify-center border border-[#FAFAFA]/10 bg-[#1A1A1A] shadow-2xl sm:h-32 sm:w-32 md:h-36 md:w-36 overflow-hidden mx-auto transition-colors rounded-2xl sm:rounded-3xl"
    >
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 top-1/2 h-[1px] bg-black/60 z-10" />
      <div className="absolute inset-x-0 top-1/2 h-[1px] bg-white/10 z-10 translate-y-[1px]" />
      <div style={{ perspective: "400px" }}>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            className={`${cinzel.className} block leading-none mb-0.5 text-4xl xs:text-5xl sm:text-6xl md:text-7xl text-[#D4AF37] font-bold`}
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: 90, opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ transformOrigin: "center" }}
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className={`${jakarta.className} text-[9px] xs:text-[10px] uppercase tracking-[0.25em] text-[#A3A3A3] font-bold mt-2`}>
        {label}
      </span>
    </motion.div>
  );
}

// ── Scroll-to-top button ──────────────────────────────────────────────────────
function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 16 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-50 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#D4AF37] text-black shadow-[0_8px_20px_rgba(212,175,55,0.4)] hover:bg-[#FAFAFA] hover:text-black transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ── Gallery lightbox ──────────────────────────────────────────────────────────
function GalleryLightbox({ image, onClose }: { image: { src: string; alt: string }; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div className="absolute inset-0 bg-[#0A0A0A]/95 backdrop-blur-md" onClick={onClose} />
      <motion.div
        className="relative z-10 w-full max-w-5xl aspect-[4/3] max-h-[85vh] bg-[#0A0A0A] border border-[#FAFAFA]/10 shadow-2xl rounded-3xl overflow-hidden"
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
      >
        <Image src={image.src} alt={image.alt} fill className="object-contain" sizes="100vw" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-center">
          <p className={`${cinzel.className} text-xl sm:text-2xl text-[#FAFAFA] italic`}>{image.alt}</p>
        </div>
      </motion.div>
      <button
        className="absolute top-4 right-4 sm:top-8 sm:right-8 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all"
        onClick={onClose}
      >
        <X className="h-6 w-6" />
      </button>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  PAGE SECTIONS
// ══════════════════════════════════════════════════════════════════════════════

// ── Intro (Marvellous Cinematic Split-Door Reveal) ────────────────────────────
function InvitationIntro({ onEnter }: { onEnter: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    // Allow the doors to slide open fully before unmounting
    setTimeout(() => {
      onEnter();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden pointer-events-none">
      {/* Left Door Gate */}
      <motion.div
        className="absolute top-0 left-0 bottom-0 w-1/2 bg-[#0A0A0A] border-r border-[#D4AF37]/30 flex items-center justify-end overflow-hidden pointer-events-auto"
        initial={{ x: "0%" }}
        animate={{ x: isOpen ? "-100%" : "0%" }}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
      >
        <div 
          className="absolute inset-0 opacity-15" 
          style={{ backgroundImage: "url('/images/wedding-invitation/dark-pattern.png')", backgroundSize: "400px" }} 
        />
        {/* Subtle shadow on the split edge */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/60 to-transparent z-10" />
      </motion.div>

      {/* Right Door Gate */}
      <motion.div
        className="absolute top-0 right-0 bottom-0 w-1/2 bg-[#0A0A0A] border-l border-[#D4AF37]/30 flex items-center justify-start overflow-hidden pointer-events-auto"
        initial={{ x: "0%" }}
        animate={{ x: isOpen ? "100%" : "0%" }}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
      >
         <div 
          className="absolute inset-0 opacity-15" 
          style={{ backgroundImage: "url('/images/wedding-invitation/dark-pattern.png')", backgroundSize: "400px", backgroundPosition: "100% 0" }} 
         />
         {/* Subtle shadow on the split edge */}
         <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/60 to-transparent z-10" />
      </motion.div>

      {/* Center Interactive Seal / Lock */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto cursor-pointer"
        initial={{ scale: 0, opacity: 0 }}
        animate={isOpen ? { scale: 1.5, opacity: 0, rotate: 180 } : { scale: 1, opacity: 1, rotate: 0 }}
        transition={isOpen ? { duration: 0.8, ease: "easeInOut" } : { duration: 1, delay: 0.5, type: "spring" }}
        onClick={handleOpen}
      >
        {/* Ambient Glow */}
        <motion.div 
          className="absolute inset-0 rounded-full bg-[#D4AF37] blur-2xl opacity-30"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Physical Wax-Style Seal */}
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-[#050505] border border-[#D4AF37]/50 flex flex-col items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.4)] group transition-transform duration-500 hover:scale-110">
          
          {/* Rotating dashed ring */}
          <div className="absolute inset-2 rounded-full border border-[#D4AF37]/40 border-dashed animate-[spin_20s_linear_infinite] group-hover:border-[#D4AF37]/80 transition-colors" />
          
          {/* Inner solid ring */}
          <div className="absolute inset-3 rounded-full border border-[#D4AF37]/20" />

          {/* Monogram */}
          <h1 className={`${scriptFont.className} text-5xl sm:text-6xl text-[#D4AF37] leading-none mb-1 group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,1)] transition-all duration-300 mt-2`}>
            A<span className={`${jakarta.className} text-xl sm:text-2xl font-light mx-1 opacity-70`}>&amp;</span>N
          </h1>
          
          {/* Call to action */}
          <div className="flex flex-col items-center mt-3 opacity-80 group-hover:opacity-100 transition-opacity">
            <span className={`${jakarta.className} text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-[#FAFAFA] font-bold`}>
              Tap to Open
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ── Header ────────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { name: "Venue", href: "#venue" },
  { name: "RSVP", href: "#rsvp" },
];

function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-40 w-full bg-gradient-to-b from-[#0A0A0A]/80 via-[#0A0A0A]/40 to-transparent pt-6 sm:pt-8 pb-8">
      <nav className="flex items-center justify-center px-4">
        <ul className="flex gap-12 sm:gap-20">
          {NAV_ITEMS.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className={`${jakarta.className} text-xs sm:text-sm font-extrabold tracking-[0.3em] uppercase text-[#FAFAFA] hover:text-[#D4AF37] transition-colors drop-shadow-md py-2 px-3 rounded-full hover:bg-white/5`}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

// ── Hero section (High Contrast Parallax & Live Animation) ────────────────────
function HeroParticles() {
  const particles = Array.from({ length: 25 }).map((_, i) => {
    const seed = (i * 37) % 100;
    const size = (seed % 3) + 1.5;
    const left = seed;
    const duration = 15 + (seed % 15);
    const delay = (seed % 20);
    const drift = (seed % 40) - 20;
    return { id: i, size, left, duration, delay, drift };
  });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10" suppressHydrationWarning>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#D4AF37] shadow-[0_0_10px_2px_rgba(212,175,55,0.6)]"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: "110%",
          }}
          animate={{
            y: [0, -1500],
            x: [0, p.drift, -p.drift, p.drift],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY   = useTransform(scrollYProgress, [0, 1], ["0%",  "25%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%",  "35%"]);
  const op    = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[105vh] w-full flex flex-col justify-between items-center overflow-hidden bg-[#0A0A0A] pt-28 sm:pt-36 pb-28 sm:pb-36">
      
      {/* Cinematic Background Zoom & Parallax */}
      <motion.div className="absolute inset-0 will-change-transform" style={{ y: bgY }}>
        <motion.div 
          className="absolute inset-0"
          animate={{ scale: [1.1, 1.25] }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        >
          <Image
            src="/images/wedding-invitation/hero3.png"
            alt="Wedding ceremony"
            fill
            className="object-cover opacity-60"
            priority
          />
        </motion.div>
        {/* Deep cinematic fade to black/dark charcoal at the bottom and darkened top for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/80 via-[#0A0A0A]/30 to-[#0A0A0A]" />
      </motion.div>

      {/* Floating Golden Particles */}
      <HeroParticles />

      <motion.div
        className="relative z-20 text-center px-4 w-full max-w-4xl my-auto"
        style={{ y: textY, opacity: op }}
      >
        <p className={`${jakarta.className} text-xs text-[#D4AF37] uppercase tracking-[0.3em] font-extrabold mb-6`}>
          Join Us In Celebration
        </p>
        <h1 className={`${scriptFont.className} text-7xl xs:text-8xl sm:text-9xl md:text-[10rem] text-[#FAFAFA] font-normal mb-6 drop-shadow-2xl leading-none`}>
          Amara <span className="block sm:inline text-[#D4AF37] my-2 sm:my-0">&amp;</span> Nayana
        </h1>
        <div className="mx-auto h-[1.5px] w-24 bg-[#D4AF37] mb-8" />
        <p className={`${jakarta.className} text-xs sm:text-sm text-[#FAFAFA] tracking-[0.3em] uppercase font-bold mb-10`}>
          December 12, 2026
        </p>
        
        <div className="relative z-30 pt-2">
          <MagneticWrapper>
            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 border border-[#D4AF37] px-8 py-4 bg-[#0A0A0A]/80 backdrop-blur-md text-xs uppercase tracking-[0.25em] text-[#FAFAFA] hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all rounded-full font-bold shadow-2xl w-full sm:w-auto"
            >
              <CalendarDays className="h-4 w-4 text-[#D4AF37] group-hover:text-black transition-colors" /> Add to Calendar
            </a>
          </MagneticWrapper>
        </div>
      </motion.div>

      {/* Modern Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="relative z-20 flex flex-col items-center pointer-events-none mt-8 sm:mt-12"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <span className={`${jakarta.className} text-[9px] text-[#A3A3A3] tracking-[0.3em] uppercase block mb-2 font-bold`}>Scroll</span>
          <div className="w-[1.5px] h-8 bg-gradient-to-b from-[#D4AF37] to-transparent mx-auto" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ── Invitation section (Clean White) ──────────────────────────────────────────
// ── Invitation section (Interactive 3D Envelope Pull) ─────────────────────────
function InvitationSection() {
  return (
    <>
      <OrganicWaveDivider color="#FCFCFC" />
      <Section id="invitation" className="bg-[#FCFCFC] text-center pt-8 pb-32 sm:pb-40 relative z-20 overflow-hidden flex flex-col items-center">
        {/* Subtle Background Pattern */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none bg-repeat bg-center mix-blend-multiply filter contrast-125 brightness-95"
          style={{
            backgroundImage: "url('/images/wedding-invitation/light-pattern.png')",
            backgroundSize: "400px auto",
          }}
        />
        
        <EditorialHeading title="Our Invitation" subtitle="An Elegant Celebration" isDark={false} className="mb-12 sm:mb-24 relative z-10" />

        {/* 3D Envelope Scene */}
        <div className="relative z-10 w-full max-w-[500px] h-[450px] sm:h-[550px] mx-auto mt-4 sm:mt-10 perspective-[1500px]">
          
          <motion.div 
            className="relative w-full h-full flex justify-center items-end"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* ENVELOPE BACK */}
            <div className="absolute bottom-0 w-[90%] sm:w-[500px] h-[220px] sm:h-[280px] bg-[#E2D8C9] shadow-2xl rounded-sm border border-[#0A0A0A]/5 z-0" />

            {/* THE INVITATION CARD (Pulls out upwards) */}
            <motion.div
              variants={{
                hidden: { y: 0, opacity: 0 },
                visible: { y: -190, opacity: 1, transition: { delay: 0.6, duration: 1.2, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="absolute bottom-4 w-[85%] sm:w-[460px] h-[320px] sm:h-[400px] bg-[#FAFAFA] border border-[#D4AF37]/20 shadow-xl flex flex-col items-center justify-center p-6 sm:p-12 z-10 rounded-sm"
            >
              {/* Card Pattern overlay */}
               <div className="absolute inset-0 opacity-[0.03] bg-repeat pointer-events-none" style={{ backgroundImage: "url('/images/wedding-invitation/dark-pattern.png')", backgroundSize: "200px" }} />
               
               <div className="relative z-10 flex flex-col items-center">
                 <h3 className={`${scriptFont.className} text-4xl sm:text-5xl text-[#D4AF37] mb-6 sm:mb-8 leading-none`}>Amara &amp; Nayana</h3>
                 <p className={`${cinzel.className} text-[10px] sm:text-[12px] leading-loose text-[#0A0A0A] font-semibold tracking-wide text-center px-4`}>
                   WE INVITE YOU TO WITNESS OUR VOWS AND JOIN US IN A BEAUTIFUL EVENING FILLED WITH JOY, LOVE, AND CELEBRATION AS WE STEP INTO OUR FUTURE TOGETHER.
                 </p>
                 <div className="mx-auto my-6 sm:my-8 h-[1px] w-12 bg-[#D4AF37]/50" />
                 <p className={`${jakarta.className} text-[9px] sm:text-[10px] uppercase tracking-[0.3em] font-extrabold text-[#A3A3A3]`}>December 12, 2026</p>
               </div>
            </motion.div>

            {/* ENVELOPE FRONT POCKET */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] sm:w-[500px] h-[220px] sm:h-[280px] z-20 pointer-events-none rounded-sm drop-shadow-2xl">
               {/* Left and Right Fold */}
               <div className="absolute inset-0 bg-[#E8E1D5] [clip-path:polygon(0%_0%,50%_55%,100%_0%,100%_100%,0%_100%)] border border-white/20 rounded-b-sm" />
               {/* Bottom Fold Overlay for depth */}
               <div className="absolute inset-0 bg-[#F0EAE1] [clip-path:polygon(0%_100%,50%_55%,100%_100%)] shadow-inner" />
            </div>

            {/* ENVELOPE FLAP (Opens up) */}
            <motion.div
              variants={{
                hidden: { rotateX: 0, zIndex: 30 },
                visible: { 
                  rotateX: -180, 
                  zIndex: 5, // Drops behind the card (z-10) halfway through the flip
                  transition: { 
                    rotateX: { duration: 0.8, ease: "easeInOut" },
                    zIndex: { delay: 0.4, duration: 0 } // Swap z-index at 90 degrees
                  } 
                }
              }}
              style={{ transformOrigin: "top" }}
              className="absolute top-auto bottom-[220px] sm:bottom-[280px] left-1/2 -translate-x-1/2 w-[90%] sm:w-[500px] h-[140px] sm:h-[180px] drop-shadow-xl"
            >
              {/* Flap shape */}
              <div className="absolute inset-0 bg-[#E2D8C9] [clip-path:polygon(0%_0%,100%_0%,50%_100%)] border-b border-black/5" />
              
              {/* Wax Seal on Flap tip */}
              <motion.div 
                variants={{
                  hidden: { opacity: 1, scale: 1 },
                  visible: { opacity: 0, scale: 0, transition: { duration: 0.3 } }
                }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-[#9A031E] rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.3)] flex items-center justify-center border-[3px] border-[#7A0216] z-40"
              >
                 <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[#F3EFE9]" fill="currentColor"/>
              </motion.div>
            </motion.div>

          </motion.div>
        </div>
      </Section>
    </>
  );
}

// ── Bride & Groom section (Dark Editorial) ────────────────────────────────────
function BrideGroomSection() {
  const people = [
    { src: "/images/wedding-invitation/bride.png", name: "Nayana Kumari", role: "The Bride", bio: "Elegant and deeply passionate. She illuminates every room she enters with effortless grace.", shape: "60% 40% 70% 30% / 50% 60% 40% 50%" },
    { src: "/images/wedding-invitation/groom.png", name: "Amara Kumara", role: "The Groom", bio: "Bold and adventurous. He carries a timeless charm and a steadfast heart.", shape: "40% 60% 30% 70% / 60% 40% 50% 50%" },
  ];

  return (
    <>
      <WavyZigZagDivider color="#111111" />
      <Section id="couple" className="bg-[#111111] relative z-20 pt-8 pb-20 sm:pb-28 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none bg-repeat bg-center mix-blend-screen"
          style={{
            backgroundImage: "url('/images/wedding-invitation/dark-pattern.png')",
            backgroundSize: "500px auto",
          }}
        />
        <EditorialHeading title="The Couple" subtitle="Two hearts united" isDark={true} className="mb-16 relative z-10" />
        <div className="mx-auto grid max-w-5xl gap-16 md:grid-cols-2 px-4 relative z-10">
          {people.map((person, i) => (
            <FadeIn key={person.name} delay={i * 0.2} className="flex flex-col items-center text-center">
              {/* Organic Liquid Wavy Frame */}
              <div className="relative p-3 border border-[#D4AF37]/40 mb-8 transition-transform hover:scale-105" style={{ borderRadius: person.shape }}>
                <div className="relative h-80 w-64 sm:h-[28rem] sm:w-80 overflow-hidden shadow-2xl" style={{ borderRadius: person.shape }}>
                  <Image
                    src={person.src}
                    alt={person.name}
                    fill
                    className="object-cover filter contrast-110"
                    sizes="(max-width: 768px) 80vw, 320px"
                  />
                </div>
              </div>
              <p className={`${jakarta.className} text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-extrabold mb-3`}>{person.role}</p>
              <h3 className={`${cinzel.className} text-2xl sm:text-3xl text-[#FAFAFA] font-bold mb-4 tracking-wider uppercase`}>{person.name}</h3>
              <p className={`${jakarta.className} max-w-xs text-sm sm:text-base text-[#A3A3A3] leading-relaxed font-medium`}>{person.bio}</p>
            </FadeIn>
          ))}
        </div>
      </Section>
    </>
  );
}

// ── Love Story (Clean Modern Timeline) ────────────────────────────────────────
function LoveStorySection() {
  const cardShapes = [
    "45px 15px 50px 20px",
    "20px 50px 15px 45px",
    "50px 20px 45px 15px"
  ];

  return (
    <>
      <OrganicWaveDivider color="#FCFCFC" />
      <Section id="story" className="bg-[#FCFCFC] relative overflow-hidden z-20 pt-8 pb-20 sm:pb-28">
        <div
          className="absolute inset-0 opacity-60 pointer-events-none bg-repeat bg-center mix-blend-multiply filter contrast-125 brightness-95"
          style={{
            backgroundImage: "url('/images/wedding-invitation/light-pattern.png')",
            backgroundSize: "500px auto",
          }}
        />
        <EditorialHeading title="Our Journey" subtitle="The Chapters of Us" isDark={false} className="mb-20 relative z-10" />
        <div className="relative mx-auto max-w-4xl px-4">
          {/* Crisp Line */}
          <div className="absolute top-0 bottom-0 left-6 md:left-1/2 w-[1px] bg-[#0A0A0A]/20 -translate-x-[0.5px]" />

          <div className="space-y-20">
            {timeline.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={item.year} className="relative flex flex-col md:flex-row items-start md:items-center justify-between pl-14 md:pl-0">
                  {/* Modern Dot */}
                  <div className="absolute left-6 md:left-1/2 z-20 -translate-x-1/2 top-4 md:top-1/2 md:-translate-y-1/2 h-3 w-3 bg-[#D4AF37] rounded-full ring-4 ring-[#FCFCFC]" />

                  <FadeIn delay={0.1} className={`w-full md:w-[45%] ${isEven ? "md:text-right" : "md:order-last md:text-left"}`}>
                    <div
                      className="bg-white p-8 sm:p-10 border border-[#0A0A0A]/10 shadow-xl hover:shadow-2xl hover:border-[#D4AF37]/50 transition-all duration-300"
                      style={{ borderRadius: cardShapes[index % cardShapes.length] }}
                    >
                      <span className={`${cinzel.className} block text-3xl sm:text-4xl text-[#D4AF37] font-bold mb-3`}>{item.year}</span>
                      <h3 className={`${cinzel.className} text-xl sm:text-2xl text-[#0A0A0A] mb-3 font-bold uppercase tracking-wider`}>{item.title}</h3>
                      <p className={`${jakarta.className} text-base sm:text-lg text-[#5A4D41] leading-relaxed font-medium`}>{item.description}</p>
                    </div>
                  </FadeIn>
                  <div className="hidden md:block md:w-[45%]" />
                </div>
              );
            })}
          </div>
        </div>
      </Section>
    </>
  );
}

// ── Countdown section (Dark Flip Clock) ───────────────────────────────────────
function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => setTimeLeft(calcTimeLeft());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { key: "days" as const, label: "Days" },
    { key: "hours" as const, label: "Hours" },
    { key: "minutes" as const, label: "Minutes" },
    { key: "seconds" as const, label: "Seconds" },
  ];

  return (
    <>
      <WavyZigZagDivider color="#0A0A0A" />
      <Section className="bg-[#0A0A0A] relative z-20 pt-8 pb-20 sm:pb-28 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none bg-repeat bg-center mix-blend-screen"
          style={{
            backgroundImage: "url('/images/wedding-invitation/dark-pattern.png')",
            backgroundSize: "500px auto",
          }}
        />
        <div className="mx-auto max-w-4xl px-4 text-center relative z-10">
          <EditorialHeading title="Counting Down" subtitle="The Anticipation" isDark={true} className="mb-16" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-xs sm:max-w-none mx-auto">
            {units.map(({ key, label }) => (
              <FlipDigit key={key} value={String(timeLeft[key]).padStart(2, "0")} label={label} />
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}

// ── Schedule section ──────────────────────────────────────────────────────────
function ScheduleSection() {
  const cardShapes = ["45px 15px 40px 15px", "15px 45px 15px 40px"];
  return (
    <>
      <OrganicWaveDivider color="#FCFCFC" />
      <Section id="schedule" className="bg-[#FCFCFC] relative z-20 pt-8 pb-20 sm:pb-28 overflow-hidden">
        <div
          className="absolute inset-0 opacity-60 pointer-events-none bg-repeat bg-center mix-blend-multiply filter contrast-125 brightness-95"
          style={{
            backgroundImage: "url('/images/wedding-invitation/light-pattern.png')",
            backgroundSize: "500px auto",
          }}
        />
        <EditorialHeading title="The Agenda" subtitle="Order of Events" isDark={false} className="mb-16 relative z-10" />
        <div className="mx-auto max-w-3xl px-4 relative z-10">
          <div className="space-y-6 sm:space-y-8">
            {scheduleItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <FadeIn key={item.title} delay={index * 0.1} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 sm:gap-8 bg-white p-8 border border-[#0A0A0A]/10 shadow-md hover:border-[#D4AF37]/50 transition-colors" style={{ borderRadius: cardShapes[index % 2] }}>
                  <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full border-2 border-[#D4AF37]/20 bg-[#FAFAFA]">
                    <Icon className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div className="flex-1">
                    <p className={`${jakarta.className} text-xs font-extrabold text-[#D4AF37] tracking-[0.2em] uppercase mb-2`}>{item.time}</p>
                    <h3 className={`${cinzel.className} text-xl sm:text-2xl text-[#0A0A0A] font-bold mb-2 uppercase tracking-wider`}>{item.title}</h3>
                    <p className={`${jakarta.className} text-base sm:text-lg text-[#5A4D41] font-medium`}>{item.description}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </Section>
    </>
  );
}

// ── Venue section ─────────────────────────────────────────────────────────────
function VenueSection() {
  return (
    <>
      <WavyZigZagDivider color="#111111" />
      <Section id="venue" className="bg-[#111111] relative z-20 pt-8 pb-20 sm:pb-28 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none bg-repeat bg-center mix-blend-screen"
          style={{
            backgroundImage: "url('/images/wedding-invitation/dark-pattern.png')",
            backgroundSize: "500px auto",
          }}
        />
        <EditorialHeading title="The Location" subtitle="Where we celebrate" isDark={true} className="mb-16 relative z-10" />
        <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row gap-8 items-stretch relative z-10">
          <FadeIn className="w-full md:w-1/3 border border-[#FAFAFA]/10 bg-[#1A1A1A] p-10 text-center flex flex-col justify-center items-center" style={{ borderRadius: "50px 20px 45px 15px" }}>
            <MapPin className="w-10 h-10 text-[#D4AF37] mb-6" />
            <h3 className={`${cinzel.className} text-2xl sm:text-3xl text-[#FAFAFA] font-bold mb-4 uppercase tracking-wider`}>Waters Edge <br/> Grand Ballroom</h3>
            <p className={`${jakarta.className} text-xs sm:text-sm text-[#A3A3A3] uppercase tracking-widest mb-10 leading-loose font-semibold`}>
              316 Ethul Kotte Road <br/> Battaramulla 10100 <br/> Sri Lanka
            </p>
            <MagneticWrapper>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Waters+Edge+Grand+Ballroom,+316+Ethul+Kotte+Road,+Battaramulla,+Sri+Lanka"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border border-[#D4AF37] px-8 py-4 bg-transparent text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all font-semibold rounded-full"
              >
                <Navigation className="w-4 h-4" /> Get Directions
              </a>
            </MagneticWrapper>
          </FadeIn>
          <FadeIn className="w-full md:w-2/3 min-h-[300px] sm:min-h-[400px] relative bg-[#FCFCFC] overflow-hidden shadow-2xl" style={{ borderRadius: "20px 50px 15px 45px" }}>
            <iframe
              src="https://www.google.com/maps?q=Waters+Edge+Grand+Ballroom,+316+Ethul+Kotte+Road,+Battaramulla,+Sri+Lanka&output=embed"
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
            />
          </FadeIn>
        </div>
      </Section>
    </>
  );
}

// ── Liquid Hover Image Component ─────────────────────────────────────────────
function LiquidImage({ src, alt, sizes }: { src: string; alt: string; sizes?: string }) {
  const filterId = useId().replace(/:/g, "");
  const filterRef = useRef<SVGFEDisplacementMapElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Smoothly animate the displacement scale using requestAnimationFrame for 60fps performance
  useEffect(() => {
    let animationFrameId: number;
    let currentScale = parseFloat(filterRef.current?.getAttribute("scale") || "0");
    const targetScale = isHovered ? 30 : 0;
    
    const animate = () => {
      // Easing (lerp) towards target scale
      currentScale += (targetScale - currentScale) * 0.08;
      
      if (filterRef.current) {
        filterRef.current.setAttribute("scale", currentScale.toString());
      }
      
      if (Math.abs(targetScale - currentScale) > 0.1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        if (filterRef.current) {
          filterRef.current.setAttribute("scale", targetScale.toString());
        }
      }
    };
    
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  return (
    <div 
      className="relative w-full h-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg className="absolute w-0 h-0 opacity-0 pointer-events-none">
        <defs>
          <filter id={`liquid-${filterId}`} colorInterpolationFilters="sRGB">
            {/* The flowing silk / water ripple noise generator */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015 0.02"
              numOctaves="2"
              result="NOISE"
            >
              {/* Slowly animate the noise to simulate flowing liquid over time */}
              <animate
                attributeName="baseFrequency"
                values="0.015 0.02;0.025 0.01;0.015 0.02"
                dur="8s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            {/* The distortion map that applies the noise to the image */}
            <feDisplacementMap
              ref={filterRef}
              in="SourceGraphic"
              in2="NOISE"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-1000 ease-out filter contrast-110"
        style={{ 
          filter: `url(#liquid-${filterId})`,
          transform: isHovered ? 'scale(1.15)' : 'scale(1.05)'
        }}
        sizes={sizes}
      />
      
      {/* Subtle overlay fade */}
      <div 
        className="absolute inset-0 bg-[#0A0A0A]/20 transition-opacity duration-700 pointer-events-none" 
        style={{ opacity: isHovered ? 0 : 1 }} 
      />
    </div>
  );
}

// ── Gallery section ───────────────────────────────────────────────────────────
function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

  const images = [
    { src: "/images/wedding-invitation/gallery-1.jpg", alt: "A Beautiful Moment", aspect: "aspect-[3/4]"  },
    { src: "/images/wedding-invitation/gallery-2.jpg", alt: "Together", aspect: "aspect-[4/5]"  },
    { src: "/images/wedding-invitation/gallery-3.jpg", alt: "Sunset", aspect: "aspect-[16/9]" },
    { src: "/images/wedding-invitation/gallery-4.jpg", alt: "Joy", aspect: "aspect-[3/4]"  },
    { src: "/images/wedding-invitation/gallery-5.jpg", alt: "Elegance", aspect: "aspect-[4/5]"  },
    { src: "/images/wedding-invitation/gallery-6.jpg", alt: "Forever", aspect: "aspect-[1/1]"  },
  ];

  const cardShapes = ["40px 15px 35px 20px", "20px 40px 15px 35px"];

  return (
    <>
      <OrganicWaveDivider color="#FCFCFC" />
      <Section id="gallery" className="bg-[#FCFCFC] overflow-hidden relative z-20 pt-8 pb-20 sm:pb-28">
        <div
          className="absolute inset-0 opacity-60 pointer-events-none bg-repeat bg-center mix-blend-multiply filter contrast-125 brightness-95"
          style={{
            backgroundImage: "url('/images/wedding-invitation/light-pattern.png')",
            backgroundSize: "500px auto",
          }}
        />
        <EditorialHeading title="Gallery" subtitle="Captured Memories" isDark={false} className="mb-16 relative z-10" />
        <AnimatePresence>
          {selectedImage && <GalleryLightbox image={selectedImage} onClose={() => setSelectedImage(null)} />}
        </AnimatePresence>

        <div className="relative w-full max-w-full overflow-hidden py-4 z-10">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-20 w-12 sm:w-32 bg-gradient-to-r from-[#FCFCFC] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-20 w-12 sm:w-32 bg-gradient-to-l from-[#FCFCFC] to-transparent" />

          <div className="flex w-max gallery-scroll">
            {[0, 1].map((set) => (
              <div key={set} className="flex gap-6 sm:gap-10 pr-6 sm:pr-10 items-center">
                {images.map((img, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <motion.div
                      key={`${set}-${index}`}
                      className={`relative min-w-[220px] xs:min-w-[260px] sm:min-w-[320px] md:min-w-[400px] flex-shrink-0 ${img.aspect} ${isEven ? "-translate-y-4" : "translate-y-4"} overflow-hidden group cursor-zoom-in border border-[#0A0A0A]/10 shadow-2xl`}
                      style={{ borderRadius: cardShapes[index % 2] }}
                      onClick={() => setSelectedImage({ src: img.src, alt: img.alt })}
                    >
                      <LiquidImage src={img.src} alt={img.alt} sizes="(max-width: 768px) 70vw, 400px" />
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}

// ── Dress Code section ────────────────────────────────────────────────────────
function DressCodeSection() {
  return (
    <>
      <WavyZigZagDivider color="#111111" />
      <Section id="dress-code" className="bg-[#111111] relative z-20 pt-8 pb-20 sm:pb-28 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none bg-repeat bg-center mix-blend-screen"
          style={{
            backgroundImage: "url('/images/wedding-invitation/dark-pattern.png')",
            backgroundSize: "500px auto",
          }}
        />
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-12 px-4 md:flex-row relative z-10">
          <FadeIn className="w-full md:w-1/2">
            <div className="relative h-80 sm:h-[32rem] w-full overflow-hidden border border-[#D4AF37]/30 shadow-2xl" style={{ borderRadius: "50px 20px 45px 15px" }}>
              <Image
                src="/images/wedding-invitation/dress-code.png"
                alt="Dress Code"
                fill
                className="object-cover filter contrast-125"
              />
            </div>
          </FadeIn>
          <FadeIn className="w-full text-center md:w-1/2 md:text-left">
            <EditorialHeading title="Dress Code" subtitle="Formal Attire" isDark={true} className="mb-8 md:text-left px-0" />
            <p className={`${cinzel.className} text-lg sm:text-xl text-[#A3A3A3] leading-relaxed mb-6 font-semibold tracking-wide`}>
              We request the pleasure of your company in formal attire. Gentlemen are encouraged to wear sharp suits or tuxedos. Ladies are requested to wear elegant evening gowns.
            </p>
            <p className={`${cinzel.className} text-base sm:text-lg text-[#D4AF37] leading-relaxed font-bold tracking-wide`}>
              Please kindly refrain from wearing white or ivory hues.
            </p>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}

// ── RSVP Modern Editorial Card ────────────────────────────────────────────────
function RSVPSection({ onSubmit, clientId }: { onSubmit: (submission: GuestMessage) => void; clientId: string }) {
  const [form, setForm] = useState<RsvpFormData>(emptyRsvpForm);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleChange = (f: keyof RsvpFormData, v: string) => {
    setForm((c) => ({ ...c, [f]: v }));
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) { setError("Please enter your name."); return; }
    if (!form.attending) { setError("Please let us know if you can attend."); return; }
    
    startTransition(async () => {
      const res = await submitRsvp({
        name: form.name.trim(),
        attending: form.attending as "accept" | "decline",
        guestCount: form.attending === "accept" ? Math.max(1, Number(form.guestCount) || 1) : 0,
        message: form.message.trim(),
        clientId,
      });
      if (res.success) {
        onSubmit({ id: crypto.randomUUID(), name: form.name.trim(), attending: form.attending as "accept" | "decline", guestCount: Number(form.guestCount)||1, message: form.message.trim(), submittedAt: new Date().toISOString() });
        setForm(emptyRsvpForm);
        setSuccess("Thank you! Your response has been joyfully received.");
      } else {
        setError(res.error ?? "Something went wrong. Please try again.");
      }
    });
  };

  const inputCls = "w-full bg-[#FAFAFA] border border-[#0A0A0A]/10 px-5 py-4 outline-none text-[#0A0A0A] font-sans text-sm placeholder:text-[#0A0A0A]/40 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all rounded-2xl";

  return (
    <>
      <OrganicWaveDivider color="#FCFCFC" />
      <Section id="rsvp" className="bg-[#FCFCFC] pt-8 pb-20 sm:pb-28 relative z-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-60 pointer-events-none bg-repeat bg-center mix-blend-multiply filter contrast-125 brightness-95"
          style={{
            backgroundImage: "url('/images/wedding-invitation/light-pattern.png')",
            backgroundSize: "500px auto",
          }}
        />
        <FadeIn className="mx-auto max-w-3xl px-4 relative z-10">
          <div className="bg-white p-6 sm:p-14 border border-[#0A0A0A]/10 shadow-2xl relative" style={{ borderRadius: "60px 20px 50px 25px" }}>
            <div className="text-center mb-10 sm:mb-12">
              <h2 className={`${cinzel.className} text-3xl sm:text-4xl text-[#0A0A0A] font-bold tracking-widest uppercase mb-3`}>Kindly Reply</h2>
              <p className={`${jakarta.className} text-xs uppercase tracking-[0.2em] text-[#A3A3A3] font-extrabold`}>Please respond by November 12</p>
            </div>

            <form onSubmit={handleSubmit} suppressHydrationWarning className="space-y-6 sm:space-y-8">
              <div>
                <label className={`${jakarta.className} block text-xs uppercase tracking-[0.2em] text-[#0A0A0A] font-extrabold mb-3`}>Guest Name(s)</label>
                <input type="text" value={form.name} onChange={(e)=>handleChange("name",e.target.value)} placeholder="E.g. Namal Perera & Guest" className={inputCls} required suppressHydrationWarning />
              </div>

              <div>
                <label className={`${jakarta.className} block text-xs uppercase tracking-[0.2em] text-[#0A0A0A] font-extrabold mb-3`}>Will You Attend?</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => handleChange("attending", "accept")}
                    suppressHydrationWarning
                    className={`relative flex items-center justify-center p-4 border transition-all rounded-2xl ${form.attending === "accept" ? "border-[#D4AF37] bg-[#D4AF37]/5 text-[#0A0A0A]" : "border-[#0A0A0A]/10 bg-[#FAFAFA] text-[#A3A3A3] hover:border-[#D4AF37]/50 hover:bg-[#FAFAFA]"}`}
                  >
                    <span className={`${cinzel.className} text-lg sm:text-xl font-bold tracking-wider uppercase`}>Joyfully Accepts</span>
                    {form.attending === "accept" && <Check className="absolute right-4 w-5 h-5 text-[#D4AF37]" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChange("attending", "decline")}
                    suppressHydrationWarning
                    className={`relative flex items-center justify-center p-4 border transition-all rounded-2xl ${form.attending === "decline" ? "border-[#0A0A0A] bg-[#0A0A0A]/5 text-[#0A0A0A]" : "border-[#0A0A0A]/10 bg-[#FAFAFA] text-[#A3A3A3] hover:border-[#0A0A0A]/50 hover:bg-[#FAFAFA]"}`}
                  >
                    <span className={`${cinzel.className} text-lg sm:text-xl font-bold tracking-wider uppercase`}>Regretfully Declines</span>
                    {form.attending === "decline" && <Check className="absolute right-4 w-5 h-5 text-[#0A0A0A]" />}
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {form.attending === "accept" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: "1.5rem" }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    className="overflow-hidden"
                  >
                    <label className="block font-sans text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#0A0A0A] font-bold mb-3">Total Number of Guests</label>
                    <input type="number" min="1" max="10" value={form.guestCount} onChange={(e)=>handleChange("guestCount",e.target.value)} className={inputCls} placeholder="1" required suppressHydrationWarning />
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className="block font-sans text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#0A0A0A] font-bold mb-3">A Note for the Couple (Optional)</label>
                <textarea value={form.message} onChange={(e)=>handleChange("message",e.target.value)} className={`${inputCls} resize-none`} rows={3} placeholder="Leave a beautiful wish or let us know about any dietary requirements..." suppressHydrationWarning />
              </div>

              {error && (
                <p className="text-xs text-red-600 font-medium bg-red-50 p-3 rounded-xl text-center">{error}</p>
              )}
              {success && (
                <p className="text-sm text-[#D4AF37] font-medium bg-[#D4AF37]/10 p-4 rounded-xl text-center border border-[#D4AF37]/20">{success}</p>
              )}

              <div className="text-center pt-4">
                <MagneticWrapper>
                  <button disabled={isPending} suppressHydrationWarning className="border border-[#0A0A0A] px-12 py-4 bg-[#0A0A0A] text-white hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-black transition-all font-sans text-[10px] sm:text-xs uppercase tracking-[0.25em] font-bold disabled:opacity-50 w-full sm:w-auto min-h-[50px]">
                    {isPending ? "Sending..." : "Submit Reply"}
                  </button>
                </MagneticWrapper>
              </div>
            </form>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}

// ── Guest Wishes section (Horizontal Auto-Scroll) ────────────────────────────
function GuestWishesSection({ messages }: { messages: GuestMessage[] }) {
  if (messages.length === 0) return null;

  // Duplicate messages array to ensure smooth seamless looping
  const displayMessages = messages.length < 6 ? [...messages, ...messages, ...messages, ...messages] : [...messages, ...messages];
  const cardShapes = ["40px 15px 35px 20px", "20px 40px 15px 35px"];

  return (
    <>
      <WavyZigZagDivider color="#111111" />
      <Section id="wishes" className="bg-[#111111] pt-8 pb-20 sm:pb-28 overflow-hidden relative z-20">
      <div
        className="absolute inset-0 opacity-20 pointer-events-none bg-repeat bg-center mix-blend-screen"
        style={{
          backgroundImage: "url('/images/wedding-invitation/dark-pattern.png')",
          backgroundSize: "500px auto",
        }}
      />
      <EditorialHeading title="Warmest Wishes" subtitle="Messages from our loved ones" isDark={true} className="mb-12 relative z-10" />
      
      <div className="relative w-full max-w-full overflow-hidden py-4 z-10">
        {/* Left & Right subtle gradient masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-20 w-12 sm:w-32 bg-gradient-to-r from-[#111111] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-20 w-12 sm:w-32 bg-gradient-to-l from-[#111111] to-transparent" />

        <div className="flex w-max gallery-scroll hover:gallery-scroll-paused">
          <div className="flex gap-6 sm:gap-8 pr-6 sm:pr-8 items-stretch">
            {displayMessages.map((m, index) => (
              <div
                key={`${m.id}-${index}`}
                className="w-[280px] xs:w-[320px] sm:w-[380px] flex-shrink-0 bg-[#1A1A1A] p-6 border border-[#FAFAFA]/10 shadow-xl flex flex-col justify-between hover:border-[#D4AF37]/50 transition-colors"
                style={{ borderRadius: cardShapes[index % 2] }}
              >
              <p className={`${cinzel.className} text-lg sm:text-xl text-[#FAFAFA] font-semibold mb-6 leading-relaxed italic`}>
                "{m.message}"
              </p>
              <div className="flex items-center justify-between border-t border-[#FAFAFA]/10 pt-4">
                <span className={`${jakarta.className} text-xs uppercase tracking-widest text-[#D4AF37] font-extrabold truncate max-w-[180px]`}>{m.name}</span>
                <span className={`${jakarta.className} text-[10px] text-[#A3A3A3] bg-white/5 px-2.5 py-1 rounded-full border border-white/5 font-semibold`}>
                  {m.attending === "accept" ? "Attending" : "Declined"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Section>
</>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#0A0A0A] pt-20 pb-16 px-4 relative overflow-hidden text-[#FAFAFA] border-t border-[#D4AF37]/30">
      <div className="mx-auto max-w-6xl relative z-10">
        {/* 4-Column Structured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 text-center md:text-left mb-16 pb-14 border-b border-[#FAFAFA]/10">
          
          {/* Column 1: Brand & Socials */}
          <div className="md:pr-8 md:border-r md:border-[#FAFAFA]/10 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-6 h-6 text-[#D4AF37]" strokeWidth={1.5} />
              <h3 className={`${scriptFont.className} text-4xl sm:text-5xl text-[#D4AF37] font-normal leading-none`}>
                A <span className={`${jakarta.className} text-2xl font-light mx-1`}>&amp;</span> N
              </h3>
            </div>
            <p className={`${jakarta.className} text-sm text-[#A3A3A3] font-medium leading-relaxed mb-8`}>
              Thank you for visiting our wedding website and being part of our love story. We can't wait to celebrate with you!
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-[#A3A3A3] hover:text-[#D4AF37] transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className="text-[#A3A3A3] hover:text-[#D4AF37] transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              {/* TikTok Icon */}
              <a href="https://www.tiktok.com/@mohotha?_r=1&_t=ZS-98NibCR1mOS" className="text-[#A3A3A3] hover:text-[#D4AF37] transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
              <a href="https://www.youtube.com/@mohotha_evemts" className="text-[#A3A3A3] hover:text-[#D4AF37] transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:px-8 md:border-r md:border-[#FAFAFA]/10 flex flex-col items-center md:items-start">
            <h3 className={`${cinzel.className} text-lg sm:text-xl text-[#FAFAFA] font-bold tracking-wider mb-6 uppercase`}>
              Quick Links
            </h3>
            <ul className={`${jakarta.className} space-y-4 text-sm text-[#A3A3A3] font-medium`}>
              <li>
                <a href="#invitation" className="hover:text-[#D4AF37] transition-colors">
                  Details
                </a>
              </li>
              <li>
                <a href="#rsvp" className="hover:text-[#D4AF37] transition-colors">
                  Rsvp
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Wedding Details */}
          <div className="md:px-8 md:border-r md:border-[#FAFAFA]/10 flex flex-col items-center md:items-start">
            <h3 className={`${cinzel.className} text-lg sm:text-xl text-[#FAFAFA] font-bold tracking-wider mb-6 uppercase`}>
              Wedding Details
            </h3>
            <div className={`${jakarta.className} space-y-3 text-sm text-[#A3A3A3] font-medium leading-relaxed`}>
              <p>14th August 2026</p>
              <p>Water's Edge Hotel, Battaramulla</p>
              <div className="pt-2">
                <span className="text-sm font-medium">
                  #amara&amp;nayana
                </span>
              </div>
            </div>
          </div>

          {/* Column 4: Contact */}
          <div className="md:pl-8 flex flex-col items-center md:items-start">
            <h3 className={`${cinzel.className} text-lg sm:text-xl text-[#FAFAFA] font-bold tracking-wider mb-6 uppercase`}>
              Contact
            </h3>
            <div className={`${jakarta.className} space-y-3 text-sm text-[#A3A3A3] font-medium`}>
              <p className="flex items-center gap-2 justify-center md:justify-start">
                <span>Amara -</span>
                <a href="tel:0762457941" className="hover:text-[#D4AF37] transition-colors">076 245 7941</a>
              </p>
              <p className="flex items-center gap-2 justify-center md:justify-start">
                <span>Nayana -</span>
                <a href="tel:0777706022" className="hover:text-[#D4AF37] transition-colors">077 770 6022</a>
              </p>
            </div>
          </div>

        </div>

        {/* Footer Bottom Branding */}
        <div className="text-center pt-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-4 h-4 text-[#A3A3A3]" strokeWidth={1.5} />
            <span className={`${jakarta.className} text-xs text-[#A3A3A3] tracking-widest uppercase`}>Made with love</span>
            <Heart className="w-4 h-4 text-[#A3A3A3]" strokeWidth={1.5} />
          </div>
          
          <p className={`${jakarta.className} text-xs text-[#A3A3A3] mb-2`}>
            © 2026 Amara &amp; Nayana's Wedding
          </p>
          
          <p className={`${jakarta.className} text-[10px] text-[#A3A3A3]/70`}>
            Want a beautiful wedding website like this? Designed by{" "}
            <a
              href="https://mohotha.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D4AF37] hover:text-[#FAFAFA] transition-colors font-bold ml-1"
            >
              Mohotha
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

const initialGuestWishes: GuestMessage[] = [
  {
    id: "1",
    name: "Saman & Dilhani",
    attending: "accept",
    guestCount: 2,
    message: "Wishing you both a lifetime of love, laughter, and endless happiness together!",
    submittedAt: "2026-11-01T10:00:00Z"
  },
  {
    id: "2",
    name: "Kavinda Perera",
    attending: "accept",
    guestCount: 1,
    message: "So thrilled to celebrate your special day. Congratulations Amara and Nayana!",
    submittedAt: "2026-11-02T14:30:00Z"
  }
];

// ══════════════════════════════════════════════════════════════════════════════
//  MAIN EXPORT
// ══════════════════════════════════════════════════════════════════════════════
export function WeddingInvitationTemplate({ clientId = "wedding-invitation" }: { clientId?: string }) {
  const [showIntro, setShowIntro] = useState(true);
  const [guestMessages, setGuestMessages] = useState<GuestMessage[]>(initialGuestWishes);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleAudio = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause(); else audioRef.current.play().catch(console.error);
    setIsPlaying(p => !p);
  }, [isPlaying]);

  return (
    <main suppressHydrationWarning className={`relative min-h-screen w-full bg-[#FCFCFC] text-[#0A0A0A] ${jakarta.className} selection:bg-[#D4AF37] selection:text-black overflow-x-hidden`}>
      <CustomCursor />
      <audio ref={audioRef} src="/music/wedding-invitation.mp3" loop />
      
      {!showIntro && <ScrollToTopButton />}
      {!showIntro && (
        <button
          onClick={toggleAudio}
          suppressHydrationWarning
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 p-3 rounded-full border border-[#FAFAFA]/10 bg-[#1A1A1A] text-[#FAFAFA] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all shadow-2xl backdrop-blur-md"
        >
          {isPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
        </button>
      )}

      <AnimatePresence>{showIntro && <InvitationIntro onEnter={() => { setShowIntro(false); if(audioRef.current) audioRef.current.play().then(()=>setIsPlaying(true)); }} />}</AnimatePresence>

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
      <RSVPSection onSubmit={(m) => setGuestMessages(c => [m, ...c])} clientId={clientId} />
      <GuestWishesSection messages={guestMessages} />
      <Footer />
    </main>
  );
}
