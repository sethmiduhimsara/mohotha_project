"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
  Variants,
} from "framer-motion";
import {
  Palmtree,
  Sun,
  Waves,
  Shell,
  Compass,
  Cloud,
  Heart,
  Mail,
  ArrowRight,
  Volume2,
  VolumeX,
  Calendar,
  MapPin,
  Sparkles,
  Anchor,
  GlassWater,
  Music,
  Utensils,
  CheckCircle2,
  Clock,
  ExternalLink,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Motion tokens — luxurious easing curve                             */
/* ------------------------------------------------------------------ */
const LUX_EASE = [0.22, 1, 0.36, 1] as const;

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.1 },
  },
};

const riseIn: Variants = {
  hidden: { opacity: 0, y: 48, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: LUX_EASE },
  },
};

/* ------------------------------------------------------------------ */
/*  RevealText — word-by-word storytelling reveal                      */
/* ------------------------------------------------------------------ */
function RevealText({
  text,
  className,
  as = "p",
  delay = 0,
}: {
  text: string;
  className?: string;
  as?: "p" | "h1" | "h2" | "span" | "div";
  delay?: number;
}) {
  const words = text.split(" ");
  const Tag = as as React.ElementType;
  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-top pb-[0.15em]"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "115%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{
              duration: 0.95,
              delay: delay + i * 0.05,
              ease: LUX_EASE,
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/*  MultiLayerWaveDivider — Dual-tone animated ocean wave seam        */
/* ------------------------------------------------------------------ */
function WaveDivider({
  toColor,
  waveColor = "#87ceeb",
}: {
  toColor: string;
  waveColor?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 h-12 sm:h-20 lg:h-28 overflow-hidden z-20"
    >
      {/* Background layer wave */}
      <motion.svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full opacity-35"
        animate={
          shouldReduceMotion
            ? {}
            : { x: ["-2%", "2%", "-2%"] }
        }
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      >
        <path
          d="M0,45 C280,105 560,10 840,55 C1120,95 1300,25 1440,65 L1440,120 L0,120 Z"
          fill={waveColor}
        />
      </motion.svg>

      {/* Foreground layer wave */}
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="relative h-full w-full"
      >
        <path
          d="M0,32 C240,90 480,0 720,40 C960,80 1200,10 1440,48 L1440,120 L0,120 Z"
          fill={toColor}
        />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  JourneyProgress — glowing ocean thread scroll bar                 */
/* ------------------------------------------------------------------ */
function JourneyProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 z-50 h-[3px] origin-left bg-gradient-to-r from-[#5fa8d3] via-[#00b4d8] to-[#1a5b73] shadow-[0_0_12px_rgba(95,168,211,0.8)]"
    />
  );
}

/* ------------------------------------------------------------------ */
/*  OceanBubbleButton — Fixed floating music toggle                   */
/* ------------------------------------------------------------------ */
function OceanBubbleButton({
  isPlaying,
  onToggle,
}: {
  isPlaying: boolean;
  onToggle: () => void;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const button = (
    <motion.button
      onClick={onToggle}
      aria-label={isPlaying ? "Pause background music" : "Play background music"}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={
        shouldReduceMotion
          ? { opacity: 1, scale: 1 }
          : {
              opacity: 1,
              scale: 1,
              y: [-4, 4, -4],
            }
      }
      transition={{
        y: { repeat: Infinity, duration: 4.5, ease: "easeInOut" },
        opacity: { duration: 0.8, delay: 0.6 },
        scale: { duration: 0.8, delay: 0.6, type: "spring" },
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      style={{ position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 99999 }}
      className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full border border-white/70 bg-white/40 shadow-[inset_0_4px_10px_rgba(255,255,255,0.9),0_15px_35px_rgba(26,91,115,0.25)] backdrop-blur-xl overflow-hidden focus:outline-none"
    >
      <div className="absolute top-1 left-2 h-3 w-5 rounded-full bg-white/80 blur-[1px] rotate-[-25deg] pointer-events-none" />
      <div className="absolute bottom-1 right-2 h-1.5 w-2.5 rounded-full bg-white/50 blur-[1px] pointer-events-none" />

      {isPlaying && !shouldReduceMotion && (
        <motion.div
          animate={{ scale: [1, 1.7, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
          className="absolute inset-0 rounded-full border-2 border-[#5fa8d3]/50 pointer-events-none"
        />
      )}

      {!isPlaying && !shouldReduceMotion && (
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-white/40 pointer-events-none"
        />
      )}

      <div className="relative z-10 text-[#1a5b73] drop-shadow-sm">
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </div>
    </motion.button>
  );

  if (!mounted) return null;
  return createPortal(button, document.body);
}

/* ------------------------------------------------------------------ */
/*  SoaringSeagulls — Animated flock of seagulls                       */
/* ------------------------------------------------------------------ */
function SoaringSeagulls({
  size = 110,
  color = "rgba(255, 255, 255, 0.65)",
  className = "",
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 50"
      width={size}
      className={className}
      stroke={color}
      strokeWidth="1.6"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M 10 25 Q 18 12 28 25 Q 38 12 44 25" />
      <path d="M 48 18 Q 55 6 65 18 Q 75 6 82 18" />
      <path d="M 68 36 Q 74 26 84 36 Q 94 26 98 36" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  AnimatedStarfish — Draw-in SVG starfish                           */
/* ------------------------------------------------------------------ */
function AnimatedStarfish({
  size = 80,
  color = "#5fa8d3",
  className = "",
  delay = 0,
}: {
  size?: number;
  color?: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      width={size}
      className={className}
      fill="none"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.path
        d="M50 10 L62 40 L95 40 L68 60 L78 90 L50 70 L22 90 L32 60 L5 40 L38 40 Z"
        initial={{ pathLength: 0, opacity: 0, rotate: -45 }}
        whileInView={{ pathLength: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 2, ease: LUX_EASE, delay }}
        viewport={{ once: true, margin: "-10%" }}
      />
    </motion.svg>
  );
}

/* ------------------------------------------------------------------ */
/*  FullCardFloatingBubbles — Pervasive floating glossy bubbles       */
/* ------------------------------------------------------------------ */
function FullCardFloatingBubbles() {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (shouldReduceMotion || !mounted) return null;

  // 30 unique floating bubble configurations across the viewport width
  const bubbles = [
    { left: "3%", size: 14, duration: 13, delay: 0, wobble: 20 },
    { left: "8%", size: 28, duration: 18, delay: 4, wobble: -30 },
    { left: "14%", size: 10, duration: 15, delay: 1, wobble: 15 },
    { left: "19%", size: 36, duration: 22, delay: 7, wobble: -25 },
    { left: "24%", size: 16, duration: 14, delay: 2, wobble: 35 },
    { left: "30%", size: 8, duration: 16, delay: 5, wobble: -18 },
    { left: "35%", size: 42, duration: 24, delay: 0, wobble: 40 },
    { left: "40%", size: 20, duration: 17, delay: 3, wobble: -30 },
    { left: "46%", size: 12, duration: 12, delay: 6, wobble: 22 },
    { left: "52%", size: 30, duration: 19, delay: 1, wobble: -35 },
    { left: "58%", size: 18, duration: 15, delay: 8, wobble: 25 },
    { left: "63%", size: 9, duration: 13, delay: 2, wobble: -15 },
    { left: "69%", size: 38, duration: 23, delay: 5, wobble: 30 },
    { left: "74%", size: 15, duration: 16, delay: 0, wobble: -20 },
    { left: "80%", size: 24, duration: 18, delay: 3, wobble: 28 },
    { left: "85%", size: 11, duration: 14, delay: 6, wobble: -22 },
    { left: "91%", size: 46, duration: 25, delay: 2, wobble: 35 },
    { left: "96%", size: 16, duration: 17, delay: 4, wobble: -18 },

    // Secondary offset stream
    { left: "6%", size: 22, duration: 16, delay: 9, wobble: 25 },
    { left: "17%", size: 12, duration: 13, delay: 11, wobble: -15 },
    { left: "28%", size: 32, duration: 21, delay: 10, wobble: 30 },
    { left: "38%", size: 14, duration: 15, delay: 8, wobble: -22 },
    { left: "49%", size: 26, duration: 18, delay: 12, wobble: 28 },
    { left: "61%", size: 10, duration: 14, delay: 9, wobble: -18 },
    { left: "71%", size: 34, duration: 20, delay: 11, wobble: 32 },
    { left: "83%", size: 16, duration: 16, delay: 10, wobble: -25 },
    { left: "93%", size: 20, duration: 17, delay: 8, wobble: 20 },
  ];

  const content = (
    <div className="pointer-events-none fixed inset-0 z-[40] overflow-hidden">
      {bubbles.map((b, idx) => (
        <motion.div
          key={idx}
          style={{
            left: b.left,
            width: b.size,
            height: b.size,
          }}
          className="absolute bottom-0 rounded-full border border-white/70 shadow-[inset_0_2px_6px_rgba(255,255,255,0.95),0_4px_16px_rgba(95,168,211,0.3)] bg-gradient-to-tr from-white/20 via-sky-100/30 to-white/50 backdrop-blur-[1px]"
          animate={{
            y: ["105vh", "-15vh"],
            x: ["0px", `${b.wobble}px`, `${-b.wobble}px`, `${b.wobble * 0.5}px`, "0px"],
            scale: [0.85, 1.12, 0.95, 1.05],
            opacity: [0, 0.8, 0.85, 0.4, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: b.duration,
            delay: b.delay,
            ease: "easeInOut",
          }}
        >
          {/* Specular glare reflection dot on each bubble */}
          <div className="absolute top-[18%] left-[20%] h-[28%] w-[28%] rounded-full bg-white/90 blur-[0.5px]" />
          <div className="absolute bottom-[20%] right-[22%] h-[15%] w-[15%] rounded-full bg-white/60 blur-[0.5px]" />
        </motion.div>
      ))}
    </div>
  );

  return createPortal(content, document.body);
}

/* ------------------------------------------------------------------ */
/*  NauticalCompassRose — Delicate vintage compass accent             */
/* ------------------------------------------------------------------ */
function NauticalCompassRose({
  size = 140,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 100 100"
      width={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      animate={shouldReduceMotion ? {} : { rotate: 360 }}
      transition={{ repeat: Infinity, duration: 120, ease: "linear" }}
    >
      <circle cx="50" cy="50" r="45" strokeOpacity="0.3" strokeDasharray="2 3" />
      <circle cx="50" cy="50" r="38" strokeOpacity="0.5" />
      <path d="M50 5 L50 95 M5 50 L95 50" strokeOpacity="0.4" />
      <polygon points="50,12 55,45 50,50 45,45" fill="currentColor" fillOpacity="0.25" />
      <polygon points="50,88 55,55 50,50 45,55" fill="currentColor" fillOpacity="0.25" />
      <polygon points="88,50 55,55 50,50 55,45" fill="currentColor" fillOpacity="0.25" />
      <polygon points="12,50 45,55 50,50 45,45" fill="currentColor" fillOpacity="0.25" />
      <circle cx="50" cy="50" r="4" fill="currentColor" fillOpacity="0.6" />
    </motion.svg>
  );
}

/* ------------------------------------------------------------------ */
/*  SeashellPearlFrame — Coastal SVG frame overlay for photo cards    */
/* ------------------------------------------------------------------ */
function SeashellPearlFrame({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 380"
      fill="none"
      className={`pointer-events-none absolute inset-0 h-full w-full z-20 ${className}`}
    >
      {/* Corner Pearl Ornaments */}
      <circle cx="16" cy="16" r="5" fill="#ffffff" opacity="0.9" />
      <circle cx="16" cy="16" r="8" stroke="#5fa8d3" strokeWidth="1" opacity="0.6" />
      <circle cx="284" cy="16" r="5" fill="#ffffff" opacity="0.9" />
      <circle cx="284" cy="16" r="8" stroke="#5fa8d3" strokeWidth="1" opacity="0.6" />
      <circle cx="16" cy="364" r="5" fill="#ffffff" opacity="0.9" />
      <circle cx="16" cy="364" r="8" stroke="#5fa8d3" strokeWidth="1" opacity="0.6" />
      <circle cx="284" cy="364" r="5" fill="#ffffff" opacity="0.9" />
      <circle cx="284" cy="364" r="8" stroke="#5fa8d3" strokeWidth="1" opacity="0.6" />

      {/* Top Seashell Emblem */}
      <g transform="translate(135, 6)" fill="none" stroke="#5fa8d3" strokeWidth="1.5">
        <path d="M15 0 C5 10 0 20 15 25 C30 20 25 10 15 0 Z" fill="#ffffff" opacity="0.7" />
        <path d="M15 0 L15 25 M10 5 Q 15 15 12 23 M20 5 Q 15 15 18 23" opacity="0.8" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  SeaweedSprig — Gentle swaying coral accent                        */
/* ------------------------------------------------------------------ */
function SeaweedSprig({
  size = 90,
  color = "#5fa8d3",
  className = "",
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 60 120"
      width={size}
      className={className}
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      animate={shouldReduceMotion ? {} : { rotate: [-4, 4, -4] }}
      transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      style={{ transformOrigin: "50% 100%" }}
    >
      <path d="M30 115 C10 95 45 80 20 60 C50 45 15 30 30 5" />
      <path d="M30 90 C20 85 15 78 12 70" opacity="0.6" />
      <path d="M30 55 C40 50 46 43 48 35" opacity="0.6" />
    </motion.svg>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                    */
/* ------------------------------------------------------------------ */
export default function OceanBreezeCard() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audioSrc = encodeURI("/music/ocean breeze.mp3");
    const audio = new Audio(audioSrc);
    audio.loop = true;
    audio.volume = 0.6;
    audio.preload = "auto";
    audioRef.current = audio;

    const handleError = () => {
      console.log("Background music failed to load at", audioSrc);
    };
    audio.addEventListener("error", handleError);

    const startMusic = () => {
      if (audio.paused) {
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.log("Browser blocked autoplay:", err));
      }

      ["click", "scroll", "touchstart", "mousemove"].forEach((evt) =>
        document.removeEventListener(evt, startMusic)
      );
    };

    ["click", "scroll", "touchstart", "mousemove"].forEach((evt) =>
      document.addEventListener(evt, startMusic, { once: true })
    );

    return () => {
      audio.pause();
      audio.removeEventListener("error", handleError);
      audioRef.current = null;
      ["click", "scroll", "touchstart", "mousemove"].forEach((evt) =>
        document.removeEventListener(evt, startMusic)
      );
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((err) =>
          console.log("Playback failed:", err)
        );
      }
      setIsPlaying(!isPlaying);
    }
  };

  const targetDate = useMemo(
    () => new Date("2026-08-14T00:00:00").getTime(),
    []
  );

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const distance = targetDate - Date.now();

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    updateCountdown();
    const interval = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(interval);
  }, [targetDate]);

  const countItems = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ];

  const shouldReduceMotion = useReducedMotion();

  // Hero parallax logic
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(heroProgress, [0, 1], ["0%", "26%"]);
  const heroImageScale = useTransform(heroProgress, [0, 1], [1.05, 1.22]);
  const heroTextY = useTransform(heroProgress, [0, 1], ["0%", "36%"]);
  const heroTextOpacity = useTransform(heroProgress, [0, 0.75], [1, 0]);
  const heroOverlay = useTransform(heroProgress, [0, 1], [0.28, 0.72]);

  // RSVP Form States
  const [rsvpStep, setRsvpStep] = useState<"intro" | "form" | "success">("intro");
  const [guestName, setGuestName] = useState("");
  const [attendance, setAttendance] = useState("Joyfully Accept 🥂");
  const [guestCount, setGuestCount] = useState("1");
  const [mealChoice, setMealChoice] = useState("Seafood Feast 🦞");
  const [songRequest, setSongRequest] = useState("");

  // Add to Calendar helper
  const handleAddToCalendar = () => {
    const title = encodeURIComponent("Roshel & David's Ocean Wedding 🌊💍");
    const details = encodeURIComponent(
      "Join Roshel & David as they tie the knot by the shore at Waters Edge Grand Ballroom."
    );
    const location = encodeURIComponent("Waters Edge Grand Ballroom & Beach Lawn");
    const startDate = "20260814T113000Z";
    const endDate = "20260814T180000Z";
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
    window.open(calendarUrl, "_blank");
  };

  // Preset animations
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const floatAnimation: any = shouldReduceMotion
    ? {}
    : {
        y: [-10, 10, -10],
        rotate: [-3, 3, -3],
        transition: { repeat: Infinity, duration: 10, ease: "easeInOut" },
      };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const waveAnimation: any = shouldReduceMotion
    ? {}
    : {
        x: [-16, 16, -16],
        transition: { repeat: Infinity, duration: 14, ease: "easeInOut" },
      };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const glowPulse: any = shouldReduceMotion
    ? {}
    : {
        opacity: [0.15, 0.32, 0.15],
        transition: { repeat: Infinity, duration: 8, ease: "easeInOut" },
      };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const seagullFlight: any = shouldReduceMotion
    ? {}
    : {
        x: ["-10vw", "110vw"],
        y: [0, -18, 12, -12, 0],
        opacity: [0, 0.75, 0.95, 0.75, 0],
        transition: { repeat: Infinity, duration: 32, ease: "linear" },
      };

  const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5fa8d3]";

  return (
    <>
      <JourneyProgress />
      <FullCardFloatingBubbles />
      <OceanBubbleButton isPlaying={isPlaying} onToggle={toggleMusic} />

      <section className="min-h-screen bg-[#f4f9f9] text-[#2c5263] overflow-hidden selection:bg-[#5fa8d3] selection:text-white">
        {/* ============================================================ */}
        {/* HERO — Cinematic Ocean Opening Sequence                     */}
        {/* ============================================================ */}
        <section ref={heroRef} className="relative min-h-screen overflow-hidden">

          <motion.div
            initial={{ opacity: 0, filter: "blur(18px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 2.2, ease: LUX_EASE }}
            className="absolute inset-0"
          >
            <motion.div
              style={{ y: heroImageY, scale: heroImageScale }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#70c1e8]/35 via-transparent to-[#f4f9f9]" />
              <motion.div
                style={{ opacity: heroOverlay }}
                className="absolute inset-0 z-10 bg-[#0a232c]"
              />
              <Image
                src="/images/hero/ocean-breeze 1.png"
                alt="Beach wedding hero background"
                fill
                priority
                className="object-cover object-center opacity-95"
                sizes="100vw"
              />
            </motion.div>
          </motion.div>

          {/* Tropical Sunbeam Glow */}
          <motion.div
            animate={glowPulse}
            className="absolute left-1/2 top-1/3 z-10 h-[320px] w-[320px] sm:h-[460px] sm:w-[460px] -translate-x-1/2 rounded-full bg-[#ffe8b3] blur-[110px] pointer-events-none"
          />

          {/* Seagulls Flock Flying Across Sky */}
          <motion.div
            animate={seagullFlight}
            className="absolute top-[18%] left-0 z-10 pointer-events-none"
          >
            <SoaringSeagulls size={130} color="rgba(255, 255, 255, 0.65)" />
          </motion.div>

          <motion.div
            style={{ y: heroTextY, opacity: heroTextOpacity }}
            className="relative z-20 flex min-h-screen flex-col"
          >
            {/* Header Navbar */}
            <motion.header
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.9, ease: LUX_EASE }}
              className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 text-white sm:px-6 sm:py-6 lg:px-8"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-xs">
                  🌊
                </span>
                <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.4em] font-semibold drop-shadow">
                  David &amp; Roshel
                </p>
              </div>
              <div className="flex items-center gap-4 sm:gap-7 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-semibold drop-shadow">
                <a
                  href="#couple"
                  className={`rounded transition-colors duration-300 hover:text-[#87ceeb] ${focusRing}`}
                >
                  Couple
                </a>
                <a
                  href="#gallery"
                  className={`rounded transition-colors duration-300 hover:text-[#87ceeb] ${focusRing}`}
                >
                  Memories
                </a>
                <a
                  href="#rsvp"
                  className={`rounded transition-colors duration-300 hover:text-[#87ceeb] ${focusRing}`}
                >
                  RSVP
                </a>
              </div>
            </motion.header>

            {/* Hero Main Content */}
            <div className="flex flex-1 items-center justify-center px-4 pb-16 pt-6 sm:px-6 lg:px-8 relative">
              {/* Rotating Sun Emblem */}
              <motion.div
                animate={shouldReduceMotion ? {} : { rotate: 360 }}
                transition={{ repeat: Infinity, duration: 95, ease: "linear" }}
                className="absolute top-6 right-6 md:top-14 md:right-24 text-white/35 pointer-events-none"
              >
                <Sun size={110} strokeWidth={0.5} className="sm:hidden" />
                <Sun size={150} strokeWidth={0.5} className="hidden sm:block" />
              </motion.div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="text-center text-[#1e3d4a] relative z-10 max-w-4xl"
              >
                <motion.div
                  variants={riseIn}
                  className="mx-auto mb-6 flex items-center justify-center gap-3"
                >
                  <span className="h-[1px] w-8 bg-white/60" />
                  <p className="text-[9px] sm:text-[11px] uppercase tracking-[0.45em] font-semibold text-white drop-shadow-md">
                    Seaside Vows &amp; Celebration
                  </p>
                  <span className="h-[1px] w-8 bg-white/60" />
                </motion.div>

                <div className="font-serif italic leading-[1.05] text-white drop-shadow-[0_10px_25px_rgba(0,0,0,0.3)]">
                  <RevealText
                    as="div"
                    text="Roshel"
                    className="text-6xl sm:text-8xl lg:text-9xl tracking-tight"
                    delay={0.35}
                  />
                  <RevealText
                    as="div"
                    text="&"
                    className="not-italic font-light text-3xl sm:text-5xl text-[#87ceeb] my-2"
                    delay={0.6}
                  />
                  <RevealText
                    as="div"
                    text="David"
                    className="text-6xl sm:text-8xl lg:text-9xl tracking-tight"
                    delay={0.75}
                  />
                </div>

                <motion.p
                  variants={riseIn}
                  className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] sm:text-lg text-white drop-shadow-md flex items-center justify-center gap-2"
                >
                  <Calendar size={16} className="text-[#87ceeb]" />
                  Friday, August 14, 2026
                </motion.p>

                <motion.p
                  variants={riseIn}
                  className="mt-2 text-xs uppercase tracking-[0.25em] text-white/85 drop-shadow"
                >
                  Waters Edge Grand Ballroom &amp; Shoreline Lawn
                </motion.p>

                <motion.div
                  variants={riseIn}
                  className="mt-14 flex flex-col items-center"
                >
                  <p className="text-[9px] uppercase tracking-[0.4em] text-white/80 mb-2">
                    Scroll down to explore our story
                  </p>
                  <motion.div
                    animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.4,
                      ease: "easeInOut",
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-sm"
                  >
                    ↓
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          <WaveDivider toColor="#ffffff" waveColor="#5fa8d3" />
        </section>

        {/* ============================================================ */}
        {/* CHAPTER ONE — THE HAPPY COUPLE                              */}
        {/* ============================================================ */}
        <section
          id="couple"
          className="relative bg-white px-4 py-24 sm:px-6 sm:py-32 lg:px-8 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#eaf4f4] rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          {/* Animated Starfish & Coral Ornaments */}
          <div className="absolute bottom-12 left-8 text-[#5fa8d3] pointer-events-none hidden lg:block opacity-65">
            <AnimatedStarfish size={110} delay={0.2} />
          </div>

          <div className="absolute top-20 right-10 text-[#5fa8d3] pointer-events-none hidden lg:block opacity-60">
            <SeaweedSprig size={100} />
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-120px" }}
            variants={staggerContainer}
            className="mx-auto max-w-6xl relative z-10"
          >
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
              {/* Couple Photo Card with Seashell Pearl Frame */}
              <motion.div
                variants={riseIn}
                className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] sm:rounded-[3rem] shadow-[0_25px_60px_rgba(26,91,115,0.18)] border-4 border-white">
                  <Image
                    src="/images/hero/ocean-breeze 2.jpeg"
                    alt="David and Roshel"
                    fill
                    className="object-cover object-center transition-transform duration-[1500ms] ease-out hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a232c]/30 via-transparent to-transparent" />
                  <SeashellPearlFrame />
                </div>

                {/* Floating Heart Pearl Badge */}
                <motion.div
                  animate={shouldReduceMotion ? {} : { y: [-6, 6, -6] }}
                  transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
                  className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-6 rounded-3xl bg-white/90 p-4 sm:p-5 shadow-2xl border border-white backdrop-blur-md flex items-center gap-3"
                >
                  <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-gradient-to-br from-[#5fa8d3] to-[#1a5b73] text-white flex items-center justify-center shadow-md">
                    <Heart size={24} className="fill-white" />
                  </div>
                  <div>
                    <div className="font-serif italic text-base sm:text-lg text-[#1a5b73]">
                      Forever &amp; Always
                    </div>
                    <div className="text-[9px] uppercase tracking-[0.25em] text-[#5fa8d3] font-bold">
                      August 14, 2026
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Couple Text Story */}
              <div className="text-center lg:text-left lg:pl-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#f4f9f9] px-4 py-1.5 border border-[#5fa8d3]/30 text-[10px] uppercase tracking-[0.35em] text-[#5fa8d3] font-bold mb-4">
                  <Sparkles size={12} />
                  Chapter One
                </div>
                <RevealText
                  as="h2"
                  text="The Happy Couple"
                  className="font-serif text-4xl italic text-[#1a5b73] sm:text-5xl lg:text-6xl mb-6"
                />
                <motion.p
                  variants={riseIn}
                  className="text-sm sm:text-base leading-relaxed text-[#2c5263]/85 mb-8 font-normal"
                >
                  From peaceful morning walks along the shoreline to dreaming
                  of a future filled with warmth and laughter, every tide has
                  brought us closer to this beautiful milestone. We are overjoyed
                  to exchange our vows surrounded by the gentle ocean breeze and
                  the people we cherish most.
                </motion.p>

                <motion.div
                  variants={riseIn}
                  className="grid grid-cols-2 gap-4 rounded-3xl border border-[#e2ecec] bg-[#f8fcfc] p-6 shadow-sm text-[#1a5b73]"
                >
                  <div className="text-center lg:text-left border-r border-[#e2ecec] pr-4">
                    <div className="font-serif italic text-2xl sm:text-3xl text-[#1a5b73]">
                      David
                    </div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-[#5fa8d3] font-bold">
                      The Groom
                    </div>
                  </div>
                  <div className="text-center lg:text-left pl-2">
                    <div className="font-serif italic text-2xl sm:text-3xl text-[#1a5b73]">
                      Roshel
                    </div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-[#5fa8d3] font-bold">
                      The Bride
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <WaveDivider toColor="#f4f9f9" waveColor="#eaf4f4" />
        </section>

        {/* ============================================================ */}
        {/* CHAPTER TWO — OCEAN MEMORIES & LOVE STORY                    */}
        {/* ============================================================ */}
        <section
          id="gallery"
          className="relative bg-[#f4f9f9] px-4 py-24 sm:px-6 sm:py-32 lg:px-8 border-y border-[#e2ecec] overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.14 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#5fa8d3] pointer-events-none"
          >
            <motion.div animate={waveAnimation}>
              <Waves size={300} strokeWidth={0.5} className="sm:hidden" />
              <Waves size={420} strokeWidth={0.5} className="hidden sm:block" />
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-120px" }}
            variants={staggerContainer}
            className="relative mx-auto max-w-5xl text-center z-10"
          >
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#5fa8d3] font-bold mb-3">
              Chapter Two
            </p>
            <RevealText
              as="h2"
              text="Our Ocean Memories"
              className="font-serif text-4xl italic text-[#1a5b73] sm:text-5xl lg:text-6xl"
            />
            <motion.p
              variants={riseIn}
              className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#2c5263]/80"
            >
              Moments captured along the coast — moments of peace, laughter, and endless love.
            </motion.p>

            {/* Photo Cards Grid */}
            <motion.div
              variants={staggerContainer}
              className="mt-14 grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {[
                {
                  img: "/images/hero/ocean-breeze 1.png",
                  title: "Where the Tide Begins",
                  caption: "A quiet moment by the water",
                },
                {
                  img: "/images/hero/ocean-breeze 2.jpeg",
                  title: "Hand in Hand",
                  caption: "Walking towards our forever",
                },
                {
                  img: "/images/hero/ocean-breeze 3.png",
                  title: "Sunset Promises",
                  caption: "Under the warm golden sky",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={riseIn}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  className="rounded-[2.2rem] border border-white bg-white/70 backdrop-blur-xl p-4 shadow-[0_15px_35px_rgba(26,91,115,0.08)] group overflow-hidden"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.8rem]">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a232c]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-serif italic text-xl text-[#1a5b73]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-[#2c5263]/75 font-medium">
                      {item.caption}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <WaveDivider toColor="#eaf4f4" waveColor="#d8ebeb" />
        </section>

        {/* ============================================================ */}
        {/* THE COUNTDOWN — GLASS ACCENT                                 */}
        {/* ============================================================ */}
        <section
          id="countdown"
          className="relative bg-[#eaf4f4] px-4 py-24 sm:px-6 sm:py-32 lg:px-8 overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 0.18, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
            className="absolute top-8 right-8 text-[#5fa8d3] pointer-events-none hidden md:block"
          >
            <motion.div
              animate={shouldReduceMotion ? {} : { rotate: [-3, 3, -3] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            >
              <Palmtree size={140} strokeWidth={0.5} />
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="relative mx-auto max-w-5xl text-center z-10"
          >
            <RevealText
              as="h2"
              text="Counting Down to Forever"
              className="font-serif text-3xl italic text-[#1a5b73] sm:text-5xl lg:text-6xl mb-3"
            />
            <motion.p
              variants={riseIn}
              className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#5fa8d3] font-bold"
            >
              Until we meet by the sea
            </motion.p>

            {/* Countdown Grid Cards */}
            <motion.div
              variants={staggerContainer}
              className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 md:grid-cols-4"
            >
              {countItems.map((item) => (
                <motion.div
                  key={item.label}
                  variants={riseIn}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 220, damping: 20 }}
                  className="relative rounded-3xl border border-white/80 bg-white/60 backdrop-blur-2xl px-4 py-8 sm:px-6 sm:py-10 shadow-[0_20px_45px_rgba(26,91,115,0.1)] overflow-hidden"
                >
                  <div className="absolute top-0 right-0 bottom-0 left-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.9),_transparent_70%)] pointer-events-none" />
                  <div className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#1a5b73] font-normal drop-shadow-sm">
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <div className="mt-3 text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#5fa8d3] font-bold">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Add to Calendar Button */}
            <motion.div variants={riseIn} className="mt-12 flex justify-center">
              <button
                type="button"
                onClick={handleAddToCalendar}
                className={`inline-flex items-center gap-3 rounded-full bg-[#1a5b73] px-8 py-4 text-[10px] font-bold uppercase tracking-[0.3em] text-white shadow-xl shadow-[#1a5b73]/25 transition-all duration-500 hover:bg-[#144659] hover:-translate-y-1 ${focusRing}`}
              >
                <Calendar size={16} />
                Save Date to Calendar
                <ExternalLink size={14} />
              </button>
            </motion.div>
          </motion.div>

          <WaveDivider toColor="#ffffff" waveColor="#5fa8d3" />
        </section>

        {/* ============================================================ */}
        {/* CHAPTER THREE — WEDDING DETAILS & VENUE                     */}
        {/* ============================================================ */}
        <section className="relative bg-white px-4 py-24 sm:px-6 sm:py-32 lg:px-8 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#eaf4f4] rounded-full blur-3xl opacity-60 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#fdf3e7] rounded-full blur-3xl opacity-50 translate-x-1/3 translate-y-1/3 pointer-events-none" />

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-120px" }}
            variants={staggerContainer}
            className="relative mx-auto max-w-6xl z-10"
          >
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#5fa8d3] font-bold mb-3">
                Chapter Three
              </p>
              <RevealText
                as="h2"
                text="Wedding Details"
                className="font-serif text-4xl italic text-[#1a5b73] sm:text-5xl lg:text-6xl"
              />
              <motion.p
                variants={riseIn}
                className="mt-3 text-xs uppercase tracking-[0.3em] text-[#5fa8d3] font-bold"
              >
                Everything you need to know for our special day
              </motion.p>
            </div>

            <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:items-center">
              {/* Left Details Card */}
              <motion.div
                variants={riseIn}
                className="rounded-[2.8rem] border border-white/80 bg-white/70 backdrop-blur-2xl p-8 sm:p-12 shadow-[0_20px_50px_rgba(26,91,115,0.09)] relative overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute -bottom-12 -right-12 text-[#5fa8d3]/12 pointer-events-none">
                  <NauticalCompassRose size={220} />
                </div>

                <div className="relative z-10 space-y-8 text-[#2c5263]">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eaf4f4] text-[#1a5b73]">
                      <Clock size={22} />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.3em] text-[#5fa8d3] font-bold">
                        Ceremony Time
                      </div>
                      <div className="mt-1 font-serif text-2xl sm:text-3xl text-[#1a5b73]">
                        5:00 PM (Sunset Vows)
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eaf4f4] text-[#1a5b73]">
                      <MapPin size={22} />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.3em] text-[#5fa8d3] font-bold">
                        Venue Location
                      </div>
                      <div className="mt-1 font-serif text-2xl sm:text-3xl text-[#1a5b73]">
                        Waters Edge Grand Ballroom
                      </div>
                      <p className="mt-1 text-xs text-[#2c5263]/75 font-medium">
                        316 Hotel Road, Mount Lavinia, Beachfront Lawn
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eaf4f4] text-[#1a5b73]">
                      <Sparkles size={22} />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.3em] text-[#5fa8d3] font-bold">
                        Dress Code
                      </div>
                      <div className="mt-1 font-serif text-2xl sm:text-3xl text-[#1a5b73]">
                        Beach Formal / Linen &amp; Chiffon
                      </div>
                      <p className="mt-1 text-xs text-[#2c5263]/75 font-medium">
                        Light pastel colors, sea blues, champagne, and soft gold accents.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 mt-10 flex justify-start">
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 rounded-2xl bg-[#1a5b73] px-8 py-4 text-[10px] font-bold uppercase tracking-[0.35em] text-white shadow-lg transition-all duration-500 hover:bg-[#144659] hover:-translate-y-1 ${focusRing}`}
                  >
                    <Compass size={16} />
                    View Map Location
                  </a>
                </div>
              </motion.div>

              {/* Right Venue Image Showcase Card */}
              <motion.div
                variants={riseIn}
                className="relative overflow-hidden rounded-[2.8rem] border border-white shadow-[0_20px_50px_rgba(26,91,115,0.12)] min-h-[380px] sm:min-h-[460px] group"
              >
                <Image
                  src="/images/hero/ocean-breeze 3.png"
                  alt="Waters Edge Venue"
                  fill
                  className="object-cover object-center transition-transform duration-[1500ms] ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a232c]/75 via-[#0a232c]/20 to-transparent" />

                {/* Weather Forecast Badge */}
                <div className="absolute top-6 right-6 rounded-2xl bg-white/80 backdrop-blur-md px-4 py-3 border border-white text-right">
                  <div className="flex items-center gap-2 text-[#1a5b73] font-serif italic text-base">
                    <Sun size={18} className="text-[#f59e0b]" />
                    28°C Sunset Breeze
                  </div>
                  <div className="text-[9px] uppercase tracking-[0.2em] text-[#5fa8d3] font-bold mt-0.5">
                    Clear Coastal Skies
                  </div>
                </div>

                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <span className="rounded-full bg-white/20 px-3 py-1 text-[9px] uppercase tracking-[0.3em] font-bold backdrop-blur-md">
                    Beachside Ballroom
                  </span>
                  <h3 className="mt-3 font-serif text-3xl italic">
                    Celebrate by the Water
                  </h3>
                  <p className="mt-2 text-xs text-white/80 max-w-md">
                    Cocktails on the shore followed by an unforgettable evening of dinner and dancing under the stars.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <WaveDivider toColor="#eaf4f4" waveColor="#d8ebeb" />
        </section>

        {/* ============================================================ */}
        {/* CHAPTER FOUR — WEDDING DAY TIMELINE                          */}
        {/* ============================================================ */}
        <section className="relative bg-[#eaf4f4] px-4 py-24 sm:px-6 sm:py-32 lg:px-8 border-y border-white overflow-hidden">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-120px" }}
            variants={staggerContainer}
            className="mx-auto max-w-4xl text-center relative z-10"
          >
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#5fa8d3] font-bold mb-3">
              Chapter Four
            </p>
            <RevealText
              as="h2"
              text="Wedding Day Schedule"
              className="font-serif text-4xl italic text-[#1a5b73] sm:text-5xl lg:text-6xl"
            />
            <motion.p
              variants={riseIn}
              className="mt-3 text-xs uppercase tracking-[0.3em] text-[#5fa8d3] font-bold"
            >
              A celebration from afternoon sun to starlight
            </motion.p>

            {/* Timeline Vertical Path */}
            <div className="mx-auto mt-16 max-w-3xl space-y-10 sm:space-y-12 text-left relative before:absolute before:inset-0 before:ml-8 sm:before:ml-10 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-[#5fa8d3]/20 before:via-[#5fa8d3] before:to-[#5fa8d3]/20">
              {[
                {
                  time: "03:30 PM",
                  title: "Guest Arrival & Welcome Drinks",
                  desc: "Chilled ocean mocktails, tropical coconut water, and violin melodies on the lawn.",
                  icon: GlassWater,
                },
                {
                  time: "05:00 PM",
                  title: "Sunset Vow Exchange",
                  desc: "Exchanging forever promises on the beachfront altar as the sun dips into the sea.",
                  icon: Anchor,
                },
                {
                  time: "06:30 PM",
                  title: "Sunset Cocktails & Canapés",
                  desc: "Toast to the newlyweds with signature seaside cocktails and live jazz soundscapes.",
                  icon: Utensils,
                },
                {
                  time: "07:30 PM",
                  title: "Seaside Dinner Feast",
                  desc: "Curated multi-course dinner featuring fresh seafood and international culinary delights.",
                  icon: Shell,
                },
                {
                  time: "09:30 PM",
                  title: "Dancing Under the Stars",
                  desc: "Cake cutting, sparklers by the water, and dancing under the starlit sky.",
                  icon: Music,
                },
              ].map((item) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    variants={riseIn}
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                  >
                    <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white bg-gradient-to-br from-[#ffffff] to-[#eaf4f4] text-[#1a5b73] shadow-lg shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <IconComponent size={24} className="text-[#5fa8d3]" />
                    </div>
                    <div className="w-full rounded-3xl border border-white bg-white/70 backdrop-blur-md p-6 shadow-sm md:w-[45%] md:group-odd:text-right">
                      <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#5fa8d3]">
                        {item.time}
                      </div>
                      <div className="font-serif text-xl sm:text-2xl italic text-[#1a5b73] mt-1">
                        {item.title}
                      </div>
                      <div className="mt-2 text-xs sm:text-sm text-[#2c5263]/80 leading-relaxed font-medium">
                        {item.desc}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <WaveDivider toColor="#f4f9f9" waveColor="#e2ecec" />
        </section>

        {/* ============================================================ */}
        {/* CHAPTER FIVE — A NOTE TO OUR LOVED ONES                      */}
        {/* ============================================================ */}
        <section className="relative bg-[#f4f9f9] px-4 py-24 sm:px-6 sm:py-32 lg:px-8 overflow-hidden">
          <motion.div
            animate={glowPulse}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[260px] w-[260px] sm:h-[340px] sm:w-[340px] rounded-full bg-[#ffe8b3] blur-[100px] pointer-events-none"
          />

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-120px" }}
            variants={staggerContainer}
            className="relative mx-auto max-w-4xl text-center z-10"
          >
            <RevealText
              as="h2"
              text="A Note to Our Loved Ones"
              className="font-serif text-4xl italic text-[#1a5b73] sm:text-5xl lg:text-6xl"
            />
            <motion.div
              variants={riseIn}
              className="mx-auto mt-10 max-w-3xl rounded-[2.5rem] border border-[#e2ecec] bg-white/80 backdrop-blur-xl p-8 sm:p-12 shadow-[0_20px_50px_rgba(26,91,115,0.06)]"
            >
              <p className="text-base sm:text-lg leading-relaxed text-[#2c5263] font-medium italic font-serif">
                &ldquo;Your presence on our wedding day is the greatest gift of all.
                To celebrate our love by the sea with the people who have shaped our
                lives means the world to us.&rdquo;
              </p>
              <div className="mt-6 flex items-center justify-center gap-3 text-[#5fa8d3]">
                <span className="h-[1px] w-12 bg-current opacity-40" />
                <span className="text-xl">🤍</span>
                <span className="h-[1px] w-12 bg-current opacity-40" />
              </div>
            </motion.div>
          </motion.div>

          <WaveDivider toColor="#fdfbf7" waveColor="#e2ecec" />
        </section>

        {/* ============================================================ */}
        {/* CHAPTER SIX — INTERACTIVE RSVP & WISHES BOTTLE               */}
        {/* ============================================================ */}
        <section
          id="rsvp"
          className="relative bg-[#fdfbf7] px-4 py-24 sm:px-6 sm:py-32 lg:px-8 border-t border-[#e2ecec] overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.16 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
            className="absolute -top-8 -left-8 text-[#5fa8d3] pointer-events-none"
          >
            <motion.div animate={floatAnimation}>
              <Shell size={130} strokeWidth={0.8} className="-rotate-12" />
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-120px" }}
            variants={staggerContainer}
            className="relative mx-auto max-w-2xl text-center z-10"
          >
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#5fa8d3] font-bold mb-3">
              Join Us
            </p>
            <RevealText
              as="h2"
              text="Will You Join Us By The Sea?"
              className="font-serif text-4xl italic text-[#1a5b73] sm:text-5xl lg:text-6xl"
            />
            <motion.p variants={riseIn} className="mt-3 text-sm text-[#2c5263]/75 font-medium">
              Kindly respond by July 15, 2026 so we can save your seat on the shore. 🌴
            </motion.p>

            {/* Glass Envelope Card */}
            <motion.div
              variants={riseIn}
              className="mx-auto mt-12 rounded-[2.5rem] sm:rounded-[3rem] border border-white bg-white/90 p-8 sm:p-12 shadow-[0_30px_70px_rgba(26,91,115,0.1)] text-left overflow-hidden relative backdrop-blur-2xl"
            >
              <AnimatePresence mode="wait">
                {rsvpStep === "intro" && (
                  <motion.div
                    key="intro"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{
                      opacity: 0,
                      y: -24,
                      transition: { duration: 0.45, ease: LUX_EASE },
                    }}
                    transition={{ duration: 0.85, ease: LUX_EASE }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-[#5fa8d3]/40 bg-[#f4f9f9] text-[#1a5b73] shadow-inner">
                      <Mail size={32} strokeWidth={1.3} />
                    </div>
                    <p className="font-serif text-3xl italic text-[#1a5b73]">
                      Your Seaside Invitation
                    </p>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-[#2c5263]/75">
                      A sealed envelope waiting by the shore for your response.
                      Open to confirm your attendance and leave a message for the couple.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setRsvpStep("form")}
                      className={`mt-8 flex items-center gap-3 rounded-full bg-[#1a5b73] px-9 py-4 text-[11px] font-bold tracking-[0.3em] uppercase text-white shadow-xl shadow-[#1a5b73]/20 transition-all duration-500 hover:bg-[#144659] ${focusRing}`}
                    >
                      Open RSVP Envelope
                      <ArrowRight size={16} />
                    </motion.button>
                  </motion.div>
                )}

                {rsvpStep === "form" && (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{
                      opacity: 0,
                      y: -24,
                      transition: { duration: 0.45, ease: LUX_EASE },
                    }}
                    transition={{ duration: 0.85, ease: LUX_EASE }}
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!guestName.trim()) return;
                      setRsvpStep("success");
                    }}
                    className="grid gap-5"
                  >
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.25em] text-[#5fa8d3] font-bold mb-2">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="e.g. Eleanor Vance"
                        className={`w-full rounded-2xl border border-[#e2ecec] bg-[#f8fafa] px-5 py-4 text-sm text-[#1a5b73] outline-none focus:border-[#5fa8d3] focus:ring-2 focus:ring-[#5fa8d3]/30 transition-all duration-300 ${focusRing}`}
                      />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.25em] text-[#5fa8d3] font-bold mb-2">
                          Attendance
                        </label>
                        <select
                          value={attendance}
                          onChange={(e) => setAttendance(e.target.value)}
                          className={`w-full rounded-2xl border border-[#e2ecec] bg-[#f8fafa] px-5 py-4 text-sm outline-none focus:border-[#5fa8d3] focus:ring-2 focus:ring-[#5fa8d3]/30 text-[#1a5b73] font-medium transition-all duration-300 cursor-pointer ${focusRing}`}
                        >
                          <option value="Joyfully Accept 🥂">Joyfully Accept 🥂</option>
                          <option value="Regretfully Decline 🤍">Regretfully Decline 🤍</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.25em] text-[#5fa8d3] font-bold mb-2">
                          Number of Guests
                        </label>
                        <select
                          value={guestCount}
                          onChange={(e) => setGuestCount(e.target.value)}
                          className={`w-full rounded-2xl border border-[#e2ecec] bg-[#f8fafa] px-5 py-4 text-sm outline-none focus:border-[#5fa8d3] focus:ring-2 focus:ring-[#5fa8d3]/30 text-[#1a5b73] font-medium transition-all duration-300 cursor-pointer ${focusRing}`}
                        >
                          <option value="1">1 Guest</option>
                          <option value="2">2 Guests</option>
                          <option value="3">3 Guests</option>
                          <option value="4">4 Guests</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.25em] text-[#5fa8d3] font-bold mb-2">
                          Meal Preference
                        </label>
                        <select
                          value={mealChoice}
                          onChange={(e) => setMealChoice(e.target.value)}
                          className={`w-full rounded-2xl border border-[#e2ecec] bg-[#f8fafa] px-5 py-4 text-sm outline-none focus:border-[#5fa8d3] focus:ring-2 focus:ring-[#5fa8d3]/30 text-[#1a5b73] font-medium transition-all duration-300 cursor-pointer ${focusRing}`}
                        >
                          <option value="Seafood Feast 🦞">Seafood Feast 🦞</option>
                          <option value="Land & Turf Roast 🥩">Land &amp; Turf Roast 🥩</option>
                          <option value="Vegan Garden Delight 🌿">Vegan Garden Delight 🌿</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.25em] text-[#5fa8d3] font-bold mb-2">
                          Song Request 🎵
                        </label>
                        <input
                          type="text"
                          value={songRequest}
                          onChange={(e) => setSongRequest(e.target.value)}
                          placeholder="Song to make you dance"
                          className={`w-full rounded-2xl border border-[#e2ecec] bg-[#f8fafa] px-5 py-4 text-sm text-[#1a5b73] outline-none focus:border-[#5fa8d3] focus:ring-2 focus:ring-[#5fa8d3]/30 transition-all duration-300 ${focusRing}`}
                        />
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`mt-4 rounded-full bg-[#1a5b73] px-8 py-4 text-[11px] font-bold tracking-[0.3em] uppercase text-white shadow-xl shadow-[#1a5b73]/25 transition-all duration-500 hover:bg-[#144659] ${focusRing}`}
                    >
                      Send RSVP Confirmation
                    </motion.button>
                  </motion.form>
                )}

                {rsvpStep === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.85, ease: LUX_EASE }}
                    className="flex flex-col items-center text-center py-6"
                  >
                    <motion.div
                      animate={shouldReduceMotion ? {} : { scale: [1, 1.15, 1] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                      className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-[#5fa8d3]/40 bg-[#eaf4f4] text-[#1a5b73] shadow-md"
                    >
                      <CheckCircle2 size={36} className="text-[#5fa8d3]" />
                    </motion.div>
                    <p className="font-serif text-3xl italic text-[#1a5b73]">
                      RSVP Received, {guestName}!
                    </p>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#2c5263]/80">
                      We have saved your response ({attendance}). We cannot wait to celebrate together by the sea on August 14, 2026.
                    </p>
                    <button
                      type="button"
                      onClick={() => setRsvpStep("form")}
                      className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#5fa8d3] underline hover:text-[#1a5b73] transition-colors"
                    >
                      Edit RSVP Response
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </section>

        {/* Footer Accent */}
        <footer className="bg-[#fdfbf7] py-12 text-center text-xs uppercase tracking-[0.35em] text-[#5fa8d3] font-semibold border-t border-[#e2ecec]">
          Roshel &amp; David &bull; August 14, 2026 &bull; Waters Edge
        </footer>
      </section>
    </>
  );
}