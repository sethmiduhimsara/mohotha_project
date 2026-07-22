"use client";

import Image from "next/image";
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
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Motion tokens — one slow, luxurious easing curve used everywhere   */
/* ------------------------------------------------------------------ */
const LUX_EASE = [0.22, 1, 0.36, 1] as const;

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.22, delayChildren: 0.1 },
  },
};

// Successor to the old "fadeUp" — slower, with a soft focus-pull.
const riseIn: Variants = {
  hidden: { opacity: 0, y: 56, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.3, ease: LUX_EASE },
  },
};

/* ------------------------------------------------------------------ */
/*  RevealText — word-by-word storytelling reveal for headings/copy    */
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
  const Tag = as as any;
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
              duration: 1,
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
/*  WaveDivider — SVG seam stitching one chapter into the next          */
/* ------------------------------------------------------------------ */
function WaveDivider({ toColor }: { toColor: string }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 h-10 sm:h-16 lg:h-24 overflow-hidden"
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="h-full w-full"
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
/*  JourneyProgress — a slim thread that tracks how far the story has  */
/*  been read, tying the whole page together as one continuous scroll  */
/* ------------------------------------------------------------------ */
function JourneyProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left bg-gradient-to-r from-[#5fa8d3] via-[#1a5b73] to-[#5fa8d3]"
    />
  );
}

export default function OceanBreezeCard() {
  const targetDate = useMemo(
    () => new Date("2026-08-14T00:00:00").getTime(),
    [],
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

  // Cinematic hero parallax — Apple-style scroll-linked motion.
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(heroProgress, [0, 1], ["0%", "26%"]);
  const heroImageScale = useTransform(heroProgress, [0, 1], [1.05, 1.2]);
  const heroTextY = useTransform(heroProgress, [0, 1], ["0%", "38%"]);
  const heroTextOpacity = useTransform(heroProgress, [0, 0.75], [1, 0]);
  const heroOverlay = useTransform(heroProgress, [0, 1], [0.32, 0.72]);

  // RSVP — from sealed invitation, to reply, to confirmation.
  const [rsvpStep, setRsvpStep] = useState<"intro" | "form" | "success">(
    "intro",
  );

const floatAnimation: any = shouldReduceMotion
    ? {}
    : {
        y: [-10, 10, -10],
        rotate: [-4, 4, -4],
        transition: { repeat: Infinity, duration: 11, ease: "easeInOut" },
      };
  const waveAnimation: any = shouldReduceMotion
    ? {}
    : {
        x: [-18, 18, -18],
        transition: { repeat: Infinity, duration: 15, ease: "easeInOut" },
      };
  const glowPulse: any = shouldReduceMotion
    ? {}
    : {
        opacity: [0.12, 0.28, 0.12],
        transition: { repeat: Infinity, duration: 9, ease: "easeInOut" },
      };
  const cloudDriftA: any = shouldReduceMotion
    ? {}
    : {
        x: ["-10%", "10%", "-10%"],
        transition: { repeat: Infinity, duration: 55, ease: "easeInOut" },
      };
  const cloudDriftB: any = shouldReduceMotion
    ? {}
    : {
        x: ["8%", "-8%", "8%"],
        transition: { repeat: Infinity, duration: 68, ease: "easeInOut" },
      };
  const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5fa8d3]";

  return (
    <section className="min-h-screen bg-[#f4f9f9] text-[#2c5263] overflow-hidden">
      <JourneyProgress />

      {/* 🎬 HERO — cinematic opening sequence 🎬 */}
      <section
        ref={heroRef}
        className="relative min-h-screen overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, filter: "blur(16px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 2.4, ease: LUX_EASE }}
          className="absolute inset-0"
        >
          <motion.div
            style={{ y: heroImageY, scale: heroImageScale }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#87CEEB]/30 via-transparent to-[#f4f9f9]" />
            <motion.div
              style={{ opacity: heroOverlay }}
              className="absolute inset-0 z-10 bg-[#0d2b36]"
            />
            <Image
              src="/images/hero/ocean-breeze 1.png"
              alt="Beach wedding hero background"
              fill
              priority
              className="object-cover object-center opacity-90"
              sizes="100vw"
            />
          </motion.div>
        </motion.div>

        {/* Ambient sunlight glow */}
        <motion.div
          animate={glowPulse}
          className="absolute left-1/2 top-1/3 z-10 h-[300px] w-[300px] sm:h-[420px] sm:w-[420px] -translate-x-1/2 rounded-full bg-[#ffe9b8] blur-[100px] pointer-events-none"
        />

        {/* Gentle drifting clouds */}
        <motion.div
          animate={cloudDriftA}
          className="absolute top-16 left-[8%] z-10 text-white/50 pointer-events-none hidden sm:block"
        >
          <Cloud size={64} strokeWidth={0.6} />
        </motion.div>
        <motion.div
          animate={cloudDriftB}
          className="absolute top-28 right-[12%] z-10 text-white/40 pointer-events-none hidden sm:block"
        >
          <Cloud size={44} strokeWidth={0.6} />
        </motion.div>

        <motion.div
          style={{ y: heroTextY, opacity: heroTextOpacity }}
          className="relative z-20 flex min-h-screen flex-col"
        >
          <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.4, delay: 1, ease: LUX_EASE }}
            className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 text-[#1a5b73] sm:px-6 sm:py-6 lg:px-8"
          >
            <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] font-semibold drop-shadow-sm">
              David &amp; Roshel
            </p>
            <div className="flex items-center gap-4 sm:gap-6 text-[9px] sm:text-[10px] uppercase tracking-[0.3em] font-semibold">
              <a
                href="#couple"
                className={`rounded transition-colors duration-500 hover:text-white ${focusRing}`}
              >
                Couple
              </a>
              <a
                href="#rsvp"
                className={`rounded transition-colors duration-500 hover:text-white ${focusRing}`}
              >
                RSVP
              </a>
            </div>
          </motion.header>

          <div className="flex flex-1 items-center justify-center px-4 pb-16 pt-6 sm:px-6 lg:px-8 relative">
            <motion.div
              animate={shouldReduceMotion ? {} : { rotate: 360 }}
              transition={{ repeat: Infinity, duration: 90, ease: "linear" }}
              className="absolute top-6 right-6 md:top-16 md:right-28 text-white/30 pointer-events-none"
            >
              <Sun size={100} strokeWidth={0.5} className="sm:hidden" />
              <Sun size={140} strokeWidth={0.5} className="hidden sm:block" />
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="text-center text-[#1e3d4a] relative z-10"
            >
              <motion.p
                variants={riseIn}
                className="mx-auto mb-6 w-fit text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-white drop-shadow-md"
              >
                We&apos;re getting married
              </motion.p>

              <div className="font-serif italic leading-[1.05] text-white drop-shadow-md">
                <RevealText
                  as="div"
                  text="Roshel"
                  className="text-5xl sm:text-7xl lg:text-8xl"
                  delay={0.4}
                />
                <RevealText
                  as="div"
                  text="&"
                  className="not-italic font-light text-3xl sm:text-4xl text-[#87CEEB] my-1"
                  delay={0.65}
                />
                <RevealText
                  as="div"
                  text="David"
                  className="text-5xl sm:text-7xl lg:text-8xl"
                  delay={0.8}
                />
              </div>

              <motion.p
                variants={riseIn}
                className="mt-8 text-base font-medium uppercase tracking-[0.2em] sm:text-xl sm:tracking-[0.25em] text-white drop-shadow-md"
              >
                Friday, August 14, 2026
              </motion.p>

              <motion.div
                variants={riseIn}
                className="mt-14 flex flex-col items-center"
              >
                <p className="text-[9px] uppercase tracking-[0.4em] text-white/75 mb-2">
                  Scroll to begin the story
                </p>
                <motion.div
                  animate={
                    shouldReduceMotion ? {} : { y: [0, 8, 0] }
                  }
                  transition={{
                    repeat: Infinity,
                    duration: 2.6,
                    ease: "easeInOut",
                  }}
                  className="text-2xl text-white/75"
                >
                  ↓
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <WaveDivider toColor="#ffffff" />
      </section>

      {/* ✨ CHAPTER ONE — THE HAPPY COUPLE ✨ */}
      <section
        id="couple"
        className="relative bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8 overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-[#eaf4f4] rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.18 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8 }}
          className="absolute bottom-16 left-8 text-[#5fa8d3] pointer-events-none hidden lg:block"
        >
          <motion.div animate={floatAnimation}>
            <Shell size={90} strokeWidth={1} />
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          variants={staggerContainer}
          className="mx-auto max-w-6xl relative z-10"
        >
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
            <motion.div
              variants={riseIn}
              className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_20px_50px_rgba(44,82,99,0.15)]">
                <Image
                  src="/images/hero/ocean-breeze 2.jpeg"
                  alt="David and Roshel"
                  fill
                  className="object-cover object-center transition-transform duration-[1400ms] ease-out hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              <motion.div
                animate={
                  shouldReduceMotion ? {} : { y: [-5, 5, -5] }
                }
                transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 md:-right-12 rounded-full bg-[#f4f9f9] p-5 sm:p-6 shadow-xl border border-white"
              >
                <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full border border-[#5fa8d3]/30 flex items-center justify-center">
                  <span className="text-xl sm:text-2xl">🤍</span>
                </div>
              </motion.div>
            </motion.div>

            <div className="text-center lg:text-left lg:pl-6">
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#5fa8d3] font-semibold mb-3">
                Chapter One
              </p>
              <RevealText
                as="h2"
                text="The Happy Couple"
                className="font-serif text-3xl italic text-[#1a5b73] sm:text-4xl lg:text-6xl mb-6"
              />
              <motion.p
                variants={riseIn}
                className="text-sm sm:text-base leading-relaxed text-[#2c5263]/80 mb-8"
              >
                From our first walk on the beach to building our dreams
                together, every moment has brought us closer to this day. We
                can&apos;t wait to celebrate our love story with our favorite
                people by the sea.
              </motion.p>

              <motion.div
                variants={riseIn}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 sm:gap-8 text-[#1a5b73]"
              >
                <div className="text-center lg:text-left">
                  <div className="font-serif italic text-2xl sm:text-3xl">
                    David
                  </div>
                  <div className="mt-2 text-[10px] uppercase tracking-[0.35em] text-[#5fa8d3]">
                    The Groom
                  </div>
                </div>
                <div className="text-[#87CEEB] text-2xl font-light">|</div>
                <div className="text-center lg:text-left">
                  <div className="font-serif italic text-2xl sm:text-3xl">
                    Roshel
                  </div>
                  <div className="mt-2 text-[10px] uppercase tracking-[0.35em] text-[#5fa8d3]">
                    The Bride
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <WaveDivider toColor="#f4f9f9" />
      </section>

      {/* 📖 CHAPTER TWO — OUR LOVE STORY 📖 */}
      <section className="relative bg-[#f4f9f9] px-4 py-20 sm:px-6 sm:py-28 lg:px-8 border-y border-[#e2ecec] overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.12 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#5fa8d3] pointer-events-none"
        >
          <motion.div animate={waveAnimation}>
            <Waves size={260} strokeWidth={0.5} className="sm:hidden" />
            <Waves size={340} strokeWidth={0.5} className="hidden sm:block" />
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          variants={staggerContainer}
          className="relative mx-auto max-w-4xl text-center z-10"
        >
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#5fa8d3] font-semibold mb-3">
            Chapter Two
          </p>
          <RevealText
            as="h2"
            text="Our Love Story"
            className="font-serif text-3xl italic text-[#1a5b73] sm:text-4xl lg:text-5xl"
          />
          <motion.p
            variants={riseIn}
            className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#2c5263]/80"
          >
            First a silent beginning, then a beautiful journey together. Our
            hearts found home, and now we celebrate our forever.
          </motion.p>

          <motion.div
            variants={riseIn}
            className="mx-auto mt-12 max-w-3xl rounded-[2rem] sm:rounded-[2.5rem] border border-[#e2ecec] bg-white p-8 sm:p-10 shadow-[0_20px_50px_rgba(44,82,99,0.06)]"
          >
            <p className="text-sm leading-loose text-[#1a5b73] sm:text-base font-medium">
              From our first glance to our shared dreams, every moment
              brought us closer. We invite you to be part of this
              unforgettable day, where love, family, and joy come together.
            </p>
          </motion.div>
        </motion.div>

        <WaveDivider toColor="#eaf4f4" />
      </section>

      {/* ⏳ THE COUNTDOWN — GLASS ACCENT #1 ⏳ */}
      <section
        id="countdown"
        className="relative bg-[#eaf4f4] px-4 py-20 sm:px-6 sm:py-28 lg:px-8 overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 0.15, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
          className="absolute top-8 right-8 text-[#5fa8d3] pointer-events-none hidden md:block"
        >
          <motion.div
            animate={
              shouldReduceMotion ? {} : { rotate: [-2, 2, -2] }
            }
            transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
          >
            <Palmtree size={130} strokeWidth={0.5} />
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="relative mx-auto max-w-6xl text-center z-10"
        >
          <RevealText
            as="p"
            text="Counting Down to Forever"
            className="font-serif text-2xl italic text-[#1a5b73] sm:text-4xl lg:text-5xl mb-3"
          />
          <motion.p
            variants={riseIn}
            className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#5fa8d3] font-semibold"
          >
            See you at the shore
          </motion.p>

          <motion.div
            variants={staggerContainer}
            className="mt-12 grid grid-cols-2 gap-3 sm:gap-6 md:gap-8 md:grid-cols-4"
          >
            {countItems.map((item) => (
              <motion.div
                key={item.label}
                variants={riseIn}
                whileHover={{ y: -4, scale: 1.015 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                className="rounded-2xl sm:rounded-3xl border border-white/70 bg-white/60 backdrop-blur-xl px-3 py-7 sm:px-4 sm:py-10 shadow-[0_15px_35px_rgba(44,82,99,0.08)]"
              >
                <div className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#5fa8d3] drop-shadow-sm">
                  {String(item.value).padStart(2, "0")}
                </div>
                <div className="mt-3 sm:mt-4 text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.35em] text-[#2c5263] font-medium">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <WaveDivider toColor="#ffffff" />
      </section>

      {/* 🗺️ CHAPTER THREE — WEDDING DETAILS — GLASS ACCENT #2 🗺️ */}
      <section className="relative bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#eaf4f4] rounded-full blur-3xl opacity-60 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#fdf3e7] rounded-full blur-3xl opacity-50 translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          variants={staggerContainer}
          className="relative mx-auto max-w-6xl z-10"
        >
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#5fa8d3] font-semibold mb-3">
              Chapter Three
            </p>
            <RevealText
              as="h2"
              text="Wedding Details"
              className="font-serif text-3xl italic text-[#1a5b73] sm:text-4xl lg:text-5xl"
            />
            <motion.p
              variants={riseIn}
              className="mt-4 text-[10px] uppercase tracking-[0.3em] text-[#5fa8d3] font-semibold"
            >
              All the important information you need to celebrate with us
            </motion.p>
          </div>

          <div className="mt-14 grid gap-6 sm:gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <motion.div
              variants={riseIn}
              className="rounded-[2.5rem] sm:rounded-[3rem] border border-white/60 bg-white/55 backdrop-blur-2xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(44,82,99,0.08)] h-full flex flex-col justify-center relative overflow-hidden"
            >
              <div className="absolute -bottom-10 -right-10 text-[#5fa8d3]/10 pointer-events-none">
                <Compass size={180} strokeWidth={1} />
              </div>

              <div className="relative z-10 space-y-7 sm:space-y-8 text-sm text-[#2c5263]">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.35em] text-[#5fa8d3] font-bold">
                    Ceremony
                  </div>
                  <div className="mt-2 font-serif text-2xl sm:text-3xl text-[#1a5b73]">
                    5:00 PM
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.35em] text-[#5fa8d3] font-bold">
                    Venue
                  </div>
                  <div className="mt-2 font-serif text-2xl sm:text-3xl text-[#1a5b73]">
                    Waters Edge Grand Ballroom
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.35em] text-[#5fa8d3] font-bold">
                    Dress Code
                  </div>
                  <div className="mt-2 font-serif text-2xl sm:text-3xl text-[#1a5b73]">
                    Formal / Elegant
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-10 sm:mt-12 flex justify-start">
                <button
                  className={`rounded-2xl bg-[#1a5b73] px-7 py-3.5 sm:px-8 sm:py-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-white shadow-xl shadow-[#1a5b73]/20 transition-all duration-500 hover:bg-[#144659] hover:-translate-y-1 ${focusRing}`}
                >
                  Map Directions
                </button>
              </div>
            </motion.div>

            <motion.div
              variants={riseIn}
              className="overflow-hidden rounded-[2.5rem] sm:rounded-[3rem] border border-white shadow-[0_20px_50px_rgba(44,82,99,0.1)] h-full min-h-[320px] sm:min-h-[400px]"
            >
              <div className="relative h-full w-full">
                <Image
                  src="/images/hero/ocean-breeze 3.png"
                  alt="Wedding venue"
                  fill
                  className="object-cover object-center transition-transform duration-[1400ms] ease-out hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        <WaveDivider toColor="#eaf4f4" />
      </section>

      {/* ⏱️ CHAPTER FOUR — WEDDING DAY TIMELINE ⏱️ */}
      <section className="relative bg-[#eaf4f4] px-4 py-20 sm:px-6 sm:py-28 lg:px-8 border-y border-white overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          variants={staggerContainer}
          className="mx-auto max-w-4xl text-center relative z-10"
        >
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#5fa8d3] font-semibold mb-3">
            Chapter Four
          </p>
          <RevealText
            as="h2"
            text="Wedding Day Timeline"
            className="font-serif text-3xl italic text-[#1a5b73] sm:text-4xl lg:text-5xl"
          />

          <div className="mx-auto mt-14 max-w-2xl space-y-10 sm:space-y-12 text-left relative before:absolute before:inset-0 before:ml-8 sm:before:ml-10 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#5fa8d3]/40 before:to-transparent">
            {[
              ["01 PM", "Family Ceremony", "Traditional beginning of the day"],
              ["05 PM", "Reception", "Dinner, speeches, and celebration"],
              ["08 PM", "After Party", "Music, dancing, and joy"],
            ].map(([time, title, note]) => (
              <motion.div
                key={title}
                variants={riseIn}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
              >
                <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white bg-[#f4f9f9] text-[#5fa8d3] shadow-lg shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em]">
                    {time}
                  </span>
                </div>
                <div className="w-full rounded-[1.5rem] sm:rounded-[2rem] border border-white bg-white/60 p-5 sm:p-6 shadow-sm md:w-[45%] md:group-odd:text-right">
                  <div className="font-serif text-xl sm:text-2xl italic text-[#1a5b73]">
                    {title}
                  </div>
                  <div className="mt-2 text-sm font-medium text-[#2c5263]/80">
                    {note}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <WaveDivider toColor="#f4f9f9" />
      </section>

      {/* 🕊️ A NOTE TO OUR LOVED ONES 🕊️ */}
      <section className="relative bg-[#f4f9f9] px-4 py-20 sm:px-6 sm:py-28 lg:px-8 overflow-hidden">
        <motion.div
          animate={glowPulse}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[220px] w-[220px] sm:h-[300px] sm:w-[300px] rounded-full bg-[#ffe9b8] blur-[90px] pointer-events-none"
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
            className="font-serif text-3xl italic text-[#1a5b73] sm:text-4xl lg:text-5xl"
          />
          <motion.div
            variants={riseIn}
            className="mx-auto mt-10 max-w-3xl rounded-[2rem] sm:rounded-[2.5rem] border border-[#e2ecec] bg-white p-8 sm:p-10 shadow-[0_20px_50px_rgba(44,82,99,0.04)]"
          >
            <p className="text-sm leading-loose text-[#2c5263] font-medium">
              Your presence will make our day complete. Thank you for being a
              part of our journey and for sharing in the joy of our
              celebration.
            </p>
          </motion.div>
        </motion.div>

        <WaveDivider toColor="#fdfbf7" />
      </section>

      {/* 💌 RSVP — AN INVITATION TO OPEN, NOT JUST A FORM 💌 */}
      <section
        id="rsvp"
        className="relative bg-[#fdfbf7] px-4 py-20 sm:px-6 sm:py-28 lg:px-8 border-t border-[#e2ecec] overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.14 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
          className="absolute -top-8 -left-8 text-[#5fa8d3] pointer-events-none"
        >
          <motion.div animate={floatAnimation}>
            <Shell size={110} strokeWidth={1} className="-rotate-12" />
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          variants={staggerContainer}
          className="relative mx-auto max-w-2xl text-center z-10"
        >
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#5fa8d3] font-semibold mb-3">
            Join Us
          </p>
          <RevealText
            as="h2"
            text="Will You Join Us"
            className="font-serif text-3xl italic text-[#1a5b73] sm:text-5xl lg:text-6xl"
          />
          <motion.p variants={riseIn} className="mt-4 text-sm text-[#2c5263]/70">
            Please respond so we can save you a seat by the sea. 🌴
          </motion.p>

          <motion.div
            variants={riseIn}
            className="mx-auto mt-12 rounded-[2rem] sm:rounded-[2.5rem] border border-[#e2ecec] bg-white p-8 sm:p-12 shadow-[0_30px_60px_rgba(44,82,99,0.08)] text-left overflow-hidden"
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
                    transition: { duration: 0.5, ease: LUX_EASE },
                  }}
                  transition={{ duration: 0.9, ease: LUX_EASE }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#5fa8d3]/30 bg-[#f4f9f9] text-[#5fa8d3]">
                    <Mail size={26} strokeWidth={1.4} />
                  </div>
                  <p className="font-serif text-2xl italic text-[#1a5b73]">
                    You&apos;re invited to open this
                  </p>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#2c5263]/70">
                    A small envelope, waiting on the shore for your reply.
                    Open it whenever you&apos;re ready.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRsvpStep("form")}
                    className={`mt-8 flex items-center gap-2 rounded-2xl bg-[#1a5b73] px-8 py-4 text-[11px] font-semibold tracking-widest uppercase text-white shadow-xl shadow-[#1a5b73]/20 transition-colors duration-500 hover:bg-[#144659] ${focusRing}`}
                  >
                    Open Your Invitation
                    <ArrowRight size={14} />
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
                    transition: { duration: 0.5, ease: LUX_EASE },
                  }}
                  transition={{ duration: 0.9, ease: LUX_EASE }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    setRsvpStep("success");
                  }}
                  className="grid gap-5"
                >
                  <input
                    type="text"
                    placeholder="Your name"
                    className={`rounded-2xl border border-[#e2ecec] bg-[#f8fafa] px-5 py-4 text-sm outline-none focus:border-[#5fa8d3] focus:ring-1 focus:ring-[#5fa8d3] transition-colors duration-300 ${focusRing}`}
                  />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <select
                      className={`rounded-2xl border border-[#e2ecec] bg-[#f8fafa] px-5 py-4 text-sm outline-none focus:border-[#5fa8d3] focus:ring-1 focus:ring-[#5fa8d3] text-[#2c5263] transition-colors duration-300 cursor-pointer ${focusRing}`}
                    >
                      <option>Will you attend?</option>
                      <option>Joyfully Accept 🥂</option>
                      <option>Regretfully Decline 🤍</option>
                    </select>
                    <input
                      type="number"
                      placeholder="Number of guests"
                      className={`rounded-2xl border border-[#e2ecec] bg-[#f8fafa] px-5 py-4 text-sm outline-none focus:border-[#5fa8d3] focus:ring-1 focus:ring-[#5fa8d3] transition-colors duration-300 ${focusRing}`}
                    />
                  </div>
                  <textarea
                    rows={4}
                    placeholder="Leave a message for the couple..."
                    className={`rounded-2xl border border-[#e2ecec] bg-[#f8fafa] px-5 py-4 text-sm outline-none focus:border-[#5fa8d3] focus:ring-1 focus:ring-[#5fa8d3] transition-colors duration-300 resize-none ${focusRing}`}
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`mt-4 rounded-2xl bg-[#1a5b73] px-6 py-4 text-[11px] font-semibold tracking-widest uppercase text-white shadow-xl shadow-[#1a5b73]/20 transition-colors duration-500 hover:bg-[#144659] ${focusRing}`}
                  >
                    Send RSVP
                  </motion.button>
                </motion.form>
              )}

              {rsvpStep === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: LUX_EASE }}
                  className="flex flex-col items-center text-center py-4"
                >
                  <motion.div
                    animate={
                      shouldReduceMotion ? {} : { scale: [1, 1.12, 1] }
                    }
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#5fa8d3]/30 bg-[#f4f9f9] text-[#5fa8d3]"
                  >
                    <Heart size={26} strokeWidth={1.4} />
                  </motion.div>
                  <p className="font-serif text-2xl italic text-[#1a5b73]">
                    RSVP Sent
                  </p>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#2c5263]/70">
                    Thank you for letting us know. Until then — see you by
                    the sea.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer Buffer */}
      <div className="h-10 sm:h-14 bg-[#fdfbf7]" />
    </section>
  );
}