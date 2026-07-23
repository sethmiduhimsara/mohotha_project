"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { Variants } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  Crown,
  Gem,
  Heart,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import type { TargetAndTransition } from "framer-motion";

const LUX_EASE = [0.22, 1, 0.36, 1] as const;

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.08 },
  },
};

const riseIn: Variants = {
  hidden: { opacity: 0, y: 48, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.15, ease: LUX_EASE },
  },
};

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
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block overflow-hidden align-top pb-[0.14em]"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "112%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{
              duration: 0.95,
              delay: delay + index * 0.045,
              ease: LUX_EASE,
            }}
          >
            {word}
            {index < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

function JourneyProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed left-0 right-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-[#d8b36a] via-[#7b4b25] to-[#f3dfb0]"
    />
  );
}

function SoftDivider({ toColor }: { toColor: string }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 h-12 overflow-hidden sm:h-20"
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <path
          d="M0,44 C220,92 430,12 700,50 C980,90 1190,18 1440,52 L1440,120 L0,120 Z"
          fill={toColor}
        />
      </svg>
    </div>
  );
}

function Ornament({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-full border border-[#d9b66d]/45 bg-white/65 text-[#b27a35] shadow-[0_18px_45px_rgba(92,54,22,0.08)] backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}

export default function InvitationCardTemplate() {
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
  const [rsvpStep, setRsvpStep] = useState<"intro" | "form" | "success">(
    "intro",
  );

  useEffect(() => {
    const updateCountdown = () => {
      const distance = targetDate - Date.now();

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
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
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroImageY = useTransform(heroProgress, [0, 1], ["0%", "24%"]);
  const heroImageScale = useTransform(heroProgress, [0, 1], [1.04, 1.18]);
  const heroContentY = useTransform(heroProgress, [0, 1], ["0%", "35%"]);
  const heroContentOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);
  const heroShade = useTransform(heroProgress, [0, 1], [0.14, 0.58]);

  const floatAnimation: TargetAndTransition | undefined = shouldReduceMotion
    ? undefined
    : {
        y: [-8, 8, -8],
        rotate: [-3, 3, -3],
        transition: { repeat: Infinity, duration: 10, ease: "easeInOut" },
      };
  const glowPulse: TargetAndTransition | undefined = shouldReduceMotion
    ? undefined
    : {
        opacity: [0.12, 0.28, 0.12],
        scale: [0.98, 1.04, 0.98],
        transition: { repeat: Infinity, duration: 8, ease: "easeInOut" },
      };
  const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b27a35]";

  return (
    <section className="min-h-screen overflow-hidden bg-[#fffaf4] text-[#5d3920]">
      <JourneyProgress />

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
            <Image
              src="/images/hero/diamond.gif"
              alt="Royal wedding invitation background"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,250,244,0.1),rgba(58,33,16,0.18),rgba(255,250,244,0.88))]" />
            <motion.div
              style={{ opacity: heroShade }}
              className="absolute inset-0 bg-[#2b190c]"
            />
          </motion.div>
        </motion.div>

        <motion.div
          animate={glowPulse}
          className="pointer-events-none absolute left-1/2 top-1/3 z-10 h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-[#ffe7ae] blur-[95px] sm:h-[420px] sm:w-[420px]"
        />

        <motion.div
          animate={floatAnimation}
          className="pointer-events-none absolute left-[8%] top-28 z-10 hidden text-white/45 md:block"
        >
          <Crown size={78} strokeWidth={0.8} />
        </motion.div>
        <motion.div
          animate={floatAnimation}
          className="pointer-events-none absolute bottom-32 right-[9%] z-10 hidden text-[#ffe5aa]/55 md:block"
        >
          <Sparkles size={64} strokeWidth={0.8} />
        </motion.div>

        <motion.div
          style={{ y: heroContentY, opacity: heroContentOpacity }}
          className="relative z-20 flex min-h-screen flex-col"
        >
          <motion.header
            initial={{ y: -18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.8, ease: LUX_EASE }}
            className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 text-white sm:px-6 lg:px-8"
          >
            <p className="text-[9px] font-semibold uppercase tracking-[0.36em] sm:text-[10px]">
              Umidu &amp; Thimeth
            </p>
            <nav className="flex items-center gap-4 text-[9px] font-semibold uppercase tracking-[0.3em] sm:gap-6 sm:text-[10px]">
              <a
                href="#details"
                className={`rounded transition-colors duration-300 hover:text-[#f4dca3] ${focusRing}`}
              >
                Details
              </a>
              <a
                href="#rsvp"
                className={`rounded transition-colors duration-300 hover:text-[#f4dca3] ${focusRing}`}
              >
                RSVP
              </a>
            </nav>
          </motion.header>

          <div className="relative flex flex-1 items-center justify-center px-4 pb-20 pt-8 text-center sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              animate="show"
              variants={staggerContainer}
              className="mx-auto max-w-4xl text-white"
            >
              <motion.div variants={riseIn} className="mb-7 flex justify-center">
                <Ornament className="h-16 w-16">
                  <Gem size={26} strokeWidth={1.2} />
                </Ornament>
              </motion.div>

              <motion.p
                variants={riseIn}
                className="mx-auto mb-6 w-fit text-[9px] font-semibold uppercase tracking-[0.42em] text-[#ffe5b4] sm:text-[10px]"
              >
                We are getting married
              </motion.p>

              <div className="font-serif italic leading-[0.98] drop-shadow-[0_18px_42px_rgba(0,0,0,0.28)]">
                <RevealText
                  as="div"
                  text="Umidu"
                  className="text-6xl sm:text-7xl lg:text-9xl"
                  delay={0.2}
                />
                <RevealText
                  as="div"
                  text="&"
                  className="my-2 text-4xl not-italic text-[#f1c979] sm:text-5xl"
                  delay={0.42}
                />
                <RevealText
                  as="div"
                  text="Thimeth"
                  className="text-6xl sm:text-7xl lg:text-9xl"
                  delay={0.54}
                />
              </div>

              <motion.p
                variants={riseIn}
                className="mx-auto mt-9 max-w-xl text-sm font-medium uppercase leading-relaxed tracking-[0.24em] text-white/90 sm:text-lg"
              >
                Friday, August 14, 2026
              </motion.p>

              <motion.div
                variants={riseIn}
                className="mt-12 flex flex-col items-center text-white/75"
              >
                <p className="text-[9px] uppercase tracking-[0.42em]">
                  Scroll to open the celebration
                </p>
                <motion.div
                  animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.4,
                    ease: "easeInOut",
                  }}
                  className="mt-3 text-2xl"
                >
                  ↓
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <SoftDivider toColor="#fffaf4" />
      </section>

      <section
        id="couple"
        className="relative overflow-hidden bg-[#fffaf4] px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
      >
        <div className="pointer-events-none absolute -right-28 top-0 h-80 w-80 rounded-full bg-[#f3dfb0] opacity-45 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-[#f5ead9] opacity-75 blur-3xl" />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          variants={staggerContainer}
          className="relative z-10 mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"
        >
          <motion.div
            variants={riseIn}
            className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.2rem] border border-white shadow-[0_24px_70px_rgba(92,54,22,0.14)] sm:rounded-[3rem]">
              <Image
                src="/images/hero/wedding-hero1.jpg"
                alt="Umidu and Thimeth"
                fill
                className="object-cover object-center transition-transform duration-[1400ms] ease-out hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 44vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(42,24,10,0.2),transparent_48%)]" />
            </div>
            <motion.div
              animate={shouldReduceMotion ? {} : { y: [-6, 6, -6] }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
              className="absolute -bottom-7 -right-4 sm:-right-8"
            >
              <Ornament className="h-24 w-24">
                <Heart size={30} strokeWidth={1.1} />
              </Ornament>
            </motion.div>
          </motion.div>

          <div className="text-center lg:text-left">
            <motion.p
              variants={riseIn}
              className="mb-3 text-[10px] font-semibold uppercase tracking-[0.42em] text-[#b27a35]"
            >
              Chapter One
            </motion.p>
            <RevealText
              as="h2"
              text="The Happy Couple"
              className="font-serif text-4xl italic leading-tight text-[#7b4b25] sm:text-5xl lg:text-6xl"
            />
            <motion.p
              variants={riseIn}
              className="mt-6 text-sm leading-8 text-[#6f5645] sm:text-base"
            >
              A royal heritage invitation should feel warm, graceful, and
              memorable from the first scroll. This design keeps the romance
              polished with editorial typography, soft gold accents, and gentle
              motion that reveals each moment with intention.
            </motion.p>

            <motion.div
              variants={riseIn}
              className="mt-9 grid gap-5 sm:grid-cols-[1fr_auto_1fr] sm:items-center"
            >
              <div>
                <p className="font-serif text-3xl italic text-[#7b4b25]">
                  Umidu
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.34em] text-[#b27a35]">
                  The Groom
                </p>
              </div>
              <div className="hidden h-px w-16 bg-[#d9b66d] sm:block" />
              <div>
                <p className="font-serif text-3xl italic text-[#7b4b25]">
                  Thimeth
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.34em] text-[#b27a35]">
                  The Bride
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <SoftDivider toColor="#ffffff" />
      </section>

      <section className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <motion.div
          animate={glowPulse}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f4dba3] blur-[100px]"
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          variants={staggerContainer}
          className="relative z-10 mx-auto max-w-4xl text-center"
        >
          <motion.p
            variants={riseIn}
            className="mb-3 text-[10px] font-semibold uppercase tracking-[0.42em] text-[#b27a35]"
          >
            Chapter Two
          </motion.p>
          <RevealText
            as="h2"
            text="Our Love Story"
            className="font-serif text-4xl italic text-[#7b4b25] sm:text-5xl"
          />
          <motion.p
            variants={riseIn}
            className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-[#6f5645] sm:text-base"
          >
            First a silent beginning, then a beautiful journey together. Our
            hearts found home, and now we celebrate our forever.
          </motion.p>
          <motion.div
            variants={riseIn}
            className="mx-auto mt-12 max-w-3xl rounded-[2rem] border border-[#ead7ba] bg-[#fffaf4]/80 p-8 shadow-[0_24px_60px_rgba(92,54,22,0.07)] backdrop-blur-xl sm:rounded-[2.5rem] sm:p-10"
          >
            <p className="text-sm font-medium leading-8 text-[#5d3920] sm:text-base">
              From our first glance to our shared dreams, every moment brought
              us closer. We invite you to be part of this unforgettable day,
              where love, family, and joy come together.
            </p>
          </motion.div>
        </motion.div>

        <SoftDivider toColor="#fbf2e5" />
      </section>

      <section
        id="countdown"
        className="relative overflow-hidden bg-[#fbf2e5] px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.12, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: LUX_EASE }}
          className="pointer-events-none absolute right-6 top-8 hidden text-[#b27a35] md:block"
        >
          <motion.div animate={floatAnimation}>
            <Crown size={150} strokeWidth={0.6} />
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-90px" }}
          variants={staggerContainer}
          className="relative z-10 mx-auto max-w-6xl text-center"
        >
          <RevealText
            as="h2"
            text="Counting Down to Forever"
            className="font-serif text-3xl italic text-[#7b4b25] sm:text-5xl"
          />
          <motion.p
            variants={riseIn}
            className="mt-4 text-[10px] font-semibold uppercase tracking-[0.34em] text-[#b27a35]"
          >
            A poetic countdown for the day we become one
          </motion.p>

          <motion.div
            variants={staggerContainer}
            className="mt-12 grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-4"
          >
            {countItems.map((item) => (
              <motion.div
                key={item.label}
                variants={riseIn}
                whileHover={{ y: -5, scale: 1.015 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                className="rounded-2xl border border-white/75 bg-white/70 px-3 py-7 shadow-[0_18px_45px_rgba(92,54,22,0.08)] backdrop-blur-xl sm:rounded-[2rem] sm:px-5 sm:py-10"
              >
                <p className="font-serif text-4xl text-[#b27a35] sm:text-5xl lg:text-6xl">
                  {String(item.value).padStart(2, "0")}
                </p>
                <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.32em] text-[#6f5645] sm:text-[10px]">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <SoftDivider toColor="#ffffff" />
      </section>

      <section
        id="details"
        className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
      >
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#f6e7c7] opacity-70 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 right-0 h-80 w-80 rounded-full bg-[#fff0d2] opacity-60 blur-3xl" />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          variants={staggerContainer}
          className="relative z-10 mx-auto max-w-6xl"
        >
          <div className="text-center">
            <motion.p
              variants={riseIn}
              className="mb-3 text-[10px] font-semibold uppercase tracking-[0.42em] text-[#b27a35]"
            >
              Chapter Three
            </motion.p>
            <RevealText
              as="h2"
              text="Wedding Details"
              className="font-serif text-4xl italic text-[#7b4b25] sm:text-5xl"
            />
            <motion.p
              variants={riseIn}
              className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#6f5645]"
            >
              The essentials are clear, calm, and easy for guests to find.
            </motion.p>
          </div>

          <div className="mt-14 grid gap-7 lg:grid-cols-[1fr_1fr] lg:items-stretch">
            <motion.div
              variants={riseIn}
              className="relative overflow-hidden rounded-[2.4rem] border border-[#ead7ba] bg-[#fffaf4]/80 p-8 shadow-[0_24px_65px_rgba(92,54,22,0.08)] backdrop-blur-xl sm:rounded-[3rem] sm:p-10"
            >
              <div className="pointer-events-none absolute -bottom-12 -right-10 text-[#b27a35]/10">
                <Gem size={190} strokeWidth={0.8} />
              </div>
              <div className="relative z-10 grid gap-7">
                {[
                  {
                    icon: Clock,
                    label: "Ceremony",
                    value: "5:00 PM",
                  },
                  {
                    icon: MapPin,
                    label: "Venue",
                    value: "Waters Edge Grand Ballroom",
                  },
                  {
                    icon: CalendarDays,
                    label: "Dress Code",
                    value: "Formal / Elegant",
                  },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex gap-5">
                    <Ornament className="h-12 w-12 shrink-0">
                      <Icon size={20} strokeWidth={1.4} />
                    </Ornament>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#b27a35]">
                        {label}
                      </p>
                      <p className="mt-2 font-serif text-2xl text-[#7b4b25] sm:text-3xl">
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <motion.button
                type="button"
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className={`relative z-10 mt-10 rounded-2xl bg-[#7b4b25] px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.34em] text-white shadow-xl shadow-[#7b4b25]/20 transition-colors duration-300 hover:bg-[#5d3920] ${focusRing}`}
              >
                Map Directions
              </motion.button>
            </motion.div>

            <motion.div
              variants={riseIn}
              className="min-h-[320px] overflow-hidden rounded-[2.4rem] border border-white shadow-[0_24px_65px_rgba(92,54,22,0.1)] sm:min-h-[430px] sm:rounded-[3rem]"
            >
              <div className="relative h-full w-full">
                <Image
                  src="/images/hero/wedding-hero.jpg"
                  alt="Wedding venue atmosphere"
                  fill
                  className="object-cover object-center transition-transform duration-[1400ms] ease-out hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(42,24,10,0.18),transparent_48%)]" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        <SoftDivider toColor="#fbf2e5" />
      </section>

      <section className="relative overflow-hidden bg-[#fbf2e5] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          variants={staggerContainer}
          className="relative z-10 mx-auto max-w-4xl text-center"
        >
          <motion.p
            variants={riseIn}
            className="mb-3 text-[10px] font-semibold uppercase tracking-[0.42em] text-[#b27a35]"
          >
            Chapter Four
          </motion.p>
          <RevealText
            as="h2"
            text="Wedding Day Timeline"
            className="font-serif text-4xl italic text-[#7b4b25] sm:text-5xl"
          />

          <div className="relative mx-auto mt-14 max-w-2xl space-y-9 text-left before:absolute before:bottom-0 before:left-8 before:top-0 before:w-px before:bg-gradient-to-b before:from-transparent before:via-[#d9b66d] before:to-transparent sm:before:left-10">
            {[
              ["01 PM", "Family Ceremony", "Traditional beginning of the day"],
              ["05 PM", "Reception", "Dinner, speeches, and celebration"],
              ["08 PM", "After Party", "Music, dancing, and joy"],
            ].map(([time, title, note]) => (
              <motion.div
                key={title}
                variants={riseIn}
                className="relative grid grid-cols-[4rem_1fr] gap-5 sm:grid-cols-[5rem_1fr]"
              >
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#fbf2e5] bg-white text-center text-[10px] font-bold tracking-[0.18em] text-[#b27a35] shadow-lg sm:h-20 sm:w-20">
                  {time}
                </div>
                <div className="rounded-[1.5rem] border border-white/80 bg-white/70 p-5 shadow-[0_14px_34px_rgba(92,54,22,0.06)] backdrop-blur-xl sm:rounded-[2rem] sm:p-6">
                  <p className="font-serif text-2xl italic text-[#7b4b25]">
                    {title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#6f5645]">
                    {note}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <SoftDivider toColor="#fffaf4" />
      </section>

      <section className="relative overflow-hidden bg-[#fffaf4] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          variants={staggerContainer}
          className="relative z-10 mx-auto max-w-4xl text-center"
        >
          <RevealText
            as="h2"
            text="A Note to Our Loved Ones"
            className="font-serif text-4xl italic text-[#7b4b25] sm:text-5xl"
          />
          <motion.div
            variants={riseIn}
            className="mx-auto mt-10 max-w-3xl rounded-[2rem] border border-[#ead7ba] bg-white p-8 shadow-[0_24px_60px_rgba(92,54,22,0.06)] sm:rounded-[2.5rem] sm:p-10"
          >
            <p className="text-sm font-medium leading-8 text-[#5d3920] sm:text-base">
              Your presence will make our day complete. Thank you for being a
              part of our journey and for sharing in the joy of our
              celebration.
            </p>
          </motion.div>
        </motion.div>

        <SoftDivider toColor="#ffffff" />
      </section>

      <section
        id="rsvp"
        className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
      >
        <motion.div
          animate={floatAnimation}
          className="pointer-events-none absolute -left-8 top-12 text-[#b27a35]/15"
        >
          <Sparkles size={120} strokeWidth={0.8} />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          variants={staggerContainer}
          className="relative z-10 mx-auto max-w-2xl text-center"
        >
          <motion.p
            variants={riseIn}
            className="mb-3 text-[10px] font-semibold uppercase tracking-[0.42em] text-[#b27a35]"
          >
            Join Us
          </motion.p>
          <RevealText
            as="h2"
            text="Will You Join Us"
            className="font-serif text-4xl italic text-[#7b4b25] sm:text-6xl"
          />
          <motion.p
            variants={riseIn}
            className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#6f5645]"
          >
            Please respond at your earliest convenience so we can prepare with
            love.
          </motion.p>

          <motion.div
            variants={riseIn}
            className="mx-auto mt-12 overflow-hidden rounded-[2rem] border border-[#ead7ba] bg-[#fffaf4] p-8 text-left shadow-[0_30px_70px_rgba(92,54,22,0.09)] sm:rounded-[2.5rem] sm:p-12"
          >
            <AnimatePresence mode="wait">
              {rsvpStep === "intro" && (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.8, ease: LUX_EASE }}
                  className="flex flex-col items-center text-center"
                >
                  <Ornament className="mb-6 h-16 w-16">
                    <Mail size={26} strokeWidth={1.3} />
                  </Ornament>
                  <p className="font-serif text-2xl italic text-[#7b4b25]">
                    Open your royal invitation
                  </p>
                  <p className="mt-3 max-w-sm text-sm leading-7 text-[#6f5645]">
                    A warm reply helps us reserve your place for the
                    celebration.
                  </p>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRsvpStep("form")}
                    className={`mt-8 flex items-center gap-2 rounded-2xl bg-[#7b4b25] px-8 py-4 text-[11px] font-semibold uppercase tracking-widest text-white shadow-xl shadow-[#7b4b25]/20 transition-colors duration-300 hover:bg-[#5d3920] ${focusRing}`}
                  >
                    Open RSVP
                    <ArrowRight size={14} />
                  </motion.button>
                </motion.div>
              )}

              {rsvpStep === "form" && (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.8, ease: LUX_EASE }}
                  onSubmit={(event) => {
                    event.preventDefault();
                    setRsvpStep("success");
                  }}
                  className="grid gap-5"
                >
                  <input
                    type="text"
                    placeholder="Your name"
                    className={`rounded-2xl border border-[#ead7ba] bg-white px-5 py-4 text-sm outline-none transition-colors duration-300 focus:border-[#b27a35] focus:ring-1 focus:ring-[#b27a35] ${focusRing}`}
                  />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <select
                      className={`cursor-pointer rounded-2xl border border-[#ead7ba] bg-white px-5 py-4 text-sm text-[#5d3920] outline-none transition-colors duration-300 focus:border-[#b27a35] focus:ring-1 focus:ring-[#b27a35] ${focusRing}`}
                    >
                      <option>Will you attend?</option>
                      <option>Joyfully Accept</option>
                      <option>Regretfully Decline</option>
                    </select>
                    <input
                      type="number"
                      placeholder="Number of guests"
                      className={`rounded-2xl border border-[#ead7ba] bg-white px-5 py-4 text-sm outline-none transition-colors duration-300 focus:border-[#b27a35] focus:ring-1 focus:ring-[#b27a35] ${focusRing}`}
                    />
                  </div>
                  <textarea
                    rows={4}
                    placeholder="Message for the couple"
                    className={`resize-none rounded-2xl border border-[#ead7ba] bg-white px-5 py-4 text-sm outline-none transition-colors duration-300 focus:border-[#b27a35] focus:ring-1 focus:ring-[#b27a35] ${focusRing}`}
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`mt-4 rounded-2xl bg-[#7b4b25] px-6 py-4 text-[11px] font-semibold uppercase tracking-widest text-white shadow-xl shadow-[#7b4b25]/20 transition-colors duration-300 hover:bg-[#5d3920] ${focusRing}`}
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
                  transition={{ duration: 0.8, ease: LUX_EASE }}
                  className="flex flex-col items-center py-4 text-center"
                >
                  <motion.div
                    animate={shouldReduceMotion ? {} : { scale: [1, 1.1, 1] }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      ease: "easeInOut",
                    }}
                  >
                    <Ornament className="mb-6 h-16 w-16">
                      <Heart size={26} strokeWidth={1.3} />
                    </Ornament>
                  </motion.div>
                  <p className="font-serif text-2xl italic text-[#7b4b25]">
                    RSVP Sent
                  </p>
                  <p className="mt-3 max-w-sm text-sm leading-7 text-[#6f5645]">
                    Thank you for letting us know. We cannot wait to celebrate
                    with you.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </section>

      <div className="h-12 bg-white" />
    </section>
  );
}
