"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { AnimatePresence, motion, useScroll, useTransform, useMotionValue, useSpring, useInView } from "framer-motion";
import { submitRsvp } from "@/app/actions/wedding-invitation/rsvp";
import { Cormorant_Garamond } from "next/font/google";
import {
  Heart,
  MapPin,
  Navigation,
  ChevronDown,
  CalendarDays,
  Bell,
  Camera,
  Shirt,
  MessageSquareHeart,
  Clock,
  BookHeart,
  ExternalLink,
  Sparkles,
  Volume2,
  VolumeX,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import { FadeIn } from "./FadeIn";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

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

const emptyRsvpForm: RsvpFormData = {
  name: "",
  attending: "",
  guestCount: "",
  message: "",
};

const scheduleItems = [
  {
    time: "9:00 AM",
    title: "Poruwa Ceremony",
    description: "The traditional Sri Lankan ritual for the couple.",
    icon: Sparkles,
  },
  {
    time: "10:00 AM",
    title: "Start of the Ceremony",
    description: "Join us as we exchange vows and celebrate our love.",
    icon: Sparkles,
  },
  {
    time: "11:00 AM",
    title: "Bar Opening",
    description: "Enjoy a selection of drinks and cocktails.",
    icon: Sparkles,
  },
  {
    time: "12:30 PM",
    title: "Lunch",
    description: "Enjoy a delicious meal with family and friends.",
    icon: Heart,
  },
  {
    time: "05:00 PM",
    title: "End of the Event",
    description: "Wrap up the celebration and say your goodbyes.",
    icon: Clock,
  },
];

const timeline = [
  {
    year: "2018",
    title: "First Meeting",
    description:
      "We crossed paths at a small coffee shop in the heart of the city. A spilled latte led to a conversation that lasted for hours.",
  },
  {
    year: "2020",
    title: "The First Trip",
    description:
      "Our first adventure together in Paris. Wandering through the Louvre and getting lost in the charming streets of Montmartre.",
  },
  {
    year: "2023",
    title: "The Proposal",
    description:
      "Under a canopy of stars on a quiet beach, he asked the question. And with happy tears, she said yes.",
  },
];

const googleCalendarUrl = (() => {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: "Amara & Nayana Wedding",
    dates: "20261212/20261213",
    details:
      "Join us to celebrate the wedding of Amara and Nayana on December 12, 2026.",
    location:
      "Waters Edge Grand Ballroom, 316 Ethul Kotte Road, Battaramulla 10100, Sri Lanka",
    ctz: "Asia/Colombo",
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
})();

// ─────────────── Animated text that reveals character-by-character ───────────
function SplitTextReveal({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <span ref={ref} className={`inline-block ${className}`} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 30, rotateX: -90 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.04,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

// ─────────────── Floating particles background ───────────────────────────────
function FloatingParticles({ count = 12 }: { count?: number }) {
  const particles = Array.from({ length: count }, (_, i) => i);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-[#C5A059]"
          style={{
            left: `${10 + (i * 7.3) % 80}%`,
            top: `${5 + (i * 11.7) % 85}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, (i % 2 === 0 ? 10 : -10), 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + (i % 4),
            repeat: Infinity,
            delay: i * 0.35,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ─────────────── Magnetic button wrapper ─────────────────────────────────────
function MagneticWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 25 });
  const springY = useSpring(y, { stiffness: 300, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.3);
    y.set((e.clientY - cy) * 0.3);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

// ─────────────── Section heading ─────────────────────────────────────────────
function WeddingSectionHeading({
  title,
  subtitle,
  script = false,
  className = "",
}: {
  title: string;
  subtitle?: string;
  script?: boolean;
  className?: string;
}) {
  return (
    <div className={`text-center ${className}`}>
      <h2
        className={
          script
            ? `${cormorant.className} text-5xl text-[#2f2f2f] sm:text-6xl md:text-7xl`
            : `${cormorant.className} text-4xl text-[#2f2f2f] md:text-5xl`
        }
      >
        {title}
      </h2>
      <motion.div
        className="mx-auto mt-4 h-px bg-[#C5A059]"
        initial={{ width: 0 }}
        whileInView={{ width: 64 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      />
      {subtitle ? (
        <p className={`${cormorant.className} mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#5a5a5a] sm:text-base`}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

// ─────────────── Intro / splash screen ───────────────────────────────────────
function InvitationIntro({ onEnter }: { onEnter: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeOut" } }}
      className="fixed inset-0 z-50 overflow-hidden bg-[#FFF9F1]"
    >
      <FloatingParticles count={18} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(197,160,89,0.12),transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.6),transparent_30%),#FFF9F1]" />

      {/* Rotating rings */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      >
        <div className="h-[500px] w-[500px] rounded-full border border-[#C5A059]/15" />
      </motion.div>
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: -360 }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      >
        <div className="h-[350px] w-[350px] rounded-full border border-[#C5A059]/25" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative flex min-h-screen items-center justify-center px-6 text-center text-[#2f2f2f]"
      >
        <div className="relative z-10 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20, letterSpacing: "0.45em" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "0.3em" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-6 text-[10px] uppercase tracking-[0.3em] text-[#C5A059]"
          >
            A Special Invitation
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
            className={`${cormorant.className} text-5xl leading-tight md:text-7xl lg:text-8xl`}
          >
            Amara <span className="text-[#C5A059] italic font-light">&amp;</span>{" "}
            Nayana
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto my-8 h-px max-w-[120px] bg-[#C5A059]/60 origin-left"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65 }}
            className="mx-auto max-w-xl"
          >
            <p className={`${cormorant.className} text-sm uppercase tracking-[0.42em] text-[#5a5a5a] md:text-base`}>
              December 12, 2026
            </p>
            <p className={`${cormorant.className} mt-6 text-base leading-relaxed text-[#5a5a5a] md:text-lg`}>
              We are honored to invite you to witness the beginning of our
              forever. Please enter the invitation to discover every detail of
              our celebration.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9 }}
            className="mt-10 flex justify-center"
          >
            <MagneticWrapper>
              <motion.button
                type="button"
                suppressHydrationWarning
                onClick={onEnter}
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(197,160,89,0.25)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center rounded-xl border border-[#E8DCC8] bg-white/80 px-8 py-3.5 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#5C5C4A] transition-colors duration-300 hover:bg-white hover:border-[#C5A059]"
                aria-label="Enter wedding invitation"
              >
                Enter Invitation
              </motion.button>
            </MagneticWrapper>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center"
          animate={{ opacity: [0.35, 0.85, 0.35], y: [0, -4, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="mb-2 text-[10px] uppercase tracking-[0.38em] text-[#8a8a8a]">
            Opening the story
          </div>
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-[#C5A059]/70 to-transparent" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────── Header / nav ─────────────────────────────────────────────────
const NAV_ITEMS = [
  { name: "Venue", href: "#venue" },
  { name: "RSVP", href: "#rsvp" },
];

function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-40 w-full bg-transparent">
      <nav className="flex items-center justify-center px-4 py-8">
        <ul className="flex items-center justify-center gap-8 sm:gap-16">
          {NAV_ITEMS.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className={`${cormorant.className} text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase text-white hover:text-[#C5A059] transition-colors drop-shadow-md`}
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

// ─────────────── Footer ───────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#111111] py-24 md:py-32 text-center text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.08),transparent_60%)] pointer-events-none" />
      <FloatingParticles count={15} />

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <FadeIn direction="up">
          <div className="mb-10 flex justify-center">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center justify-center"
            >
              <Heart className="h-8 w-8 text-[#C5A059] opacity-80" />
            </motion.div>
          </div>

          <h2 className={`${cormorant.className} mb-4 text-5xl md:text-7xl text-[#F7F4EE] tracking-wide`}>
            Amara <span className="font-light italic text-[#C5A059]">&amp;</span> Nayana
          </h2>

          <p className={`${cormorant.className} mb-8 text-xs md:text-sm uppercase tracking-[0.3em] text-[#C5A059]/90`}>
            December 12, 2026 &bull; Colombo, Sri Lanka
          </p>

          <p className={`${cormorant.className} mx-auto mb-16 max-w-md text-sm md:text-base font-light leading-relaxed text-[#A8A29E]`}>
            Thank you for being a cherished part of our journey and celebrating the beginning of our forever.
          </p>

          <div className="mx-auto mb-16 h-px w-24 bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent" />

          <div className="flex flex-col items-center justify-center gap-6">
            <p className={`${cormorant.className} text-xs md:text-sm text-[#8C857B] tracking-wide`}>&copy; {new Date().getFullYear()} Amara &amp; Nayana. All rights reserved.</p>
            
            <a href="https://mohotha.com" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 border-b border-transparent pb-1 transition-all duration-300 hover:border-[#C5A059]">
              <Sparkles className="h-3.5 w-3.5 text-[#C5A059] transition-transform group-hover:rotate-12" />
              <span className={`${cormorant.className} text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#8C857B] group-hover:text-[#E5C98B] transition-colors`}>Designed &amp; Developed by</span>
              <span className={`${cormorant.className} text-xs md:text-sm font-bold tracking-[0.25em] text-white group-hover:text-[#C5A059] transition-colors`}>MOHOTHA</span>
            </a>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}

// ─────────────── Hero section ─────────────────────────────────────────────────
function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <Image
          src="/images/wedding-invitation/hero3.png"
          alt="Wedding Hero"
          fill
          className="object-cover scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />
      </motion.div>

      {/* Floating gold orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-[#C5A059]/8 blur-[80px]"
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-[#C5A059]/10 blur-[60px]"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.6, 0.3, 0.6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <motion.div
        className="relative z-10 text-center px-4"
        style={{ y: textY, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-2.5 backdrop-blur-sm"
        >
          <Bell className="h-4 w-4 text-[#C5A059]" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-white/90">
            SAVE THE DATE
          </span>
          <Bell className="h-4 w-4 text-[#C5A059]" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`${cormorant.className} text-white text-6xl md:text-8xl lg:text-9xl mb-6 drop-shadow-2xl`}
        >
          Amara{" "}
          <motion.span
            className="text-[#C5A059] italic font-light"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            &amp;
          </motion.span>{" "}
          Nayana
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-white/90 text-base md:text-xl uppercase tracking-widest mb-10"
        >
          December 12, 2026
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <MagneticWrapper>
            <motion.a
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.06, boxShadow: "0 0 40px rgba(197,160,89,0.4)" }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-3 rounded-full border border-[#C5A059] bg-[#C5A059]/15 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-white backdrop-blur-sm transition-colors hover:bg-[#C5A059]/30"
            >
              <CalendarDays className="h-4 w-4 text-[#C5A059]" />
              Add to Google Calendar
            </motion.a>
          </MagneticWrapper>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-10 inset-x-0 z-20 flex justify-center"
      >
        <motion.div
          className="flex flex-col items-center text-center cursor-pointer"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <p className="text-white/60 text-[10px] md:text-xs tracking-[0.25em] uppercase mb-2">
            Scroll to explore
          </p>
          <ChevronDown className="text-white/80 w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─────────────── Invitation section ──────────────────────────────────────────
function InvitationSection() {
  return (
    <Section id="invitation" className="relative overflow-hidden bg-[#FFF9F1] py-24 text-center md:py-40">
      <FloatingParticles count={6} />
      <FadeIn duration={1.2}>
        <div className="mx-auto flex max-w-3xl flex-col items-center px-4">
          <WeddingSectionHeading
            title="Our Invitation"
            subtitle="With joyful hearts, we invite you to share in our celebration of love and commitment."
            className="mb-10"
          />
          <p className="max-w-xl text-lg font-light leading-relaxed text-[#5a5a5a] md:text-xl">
            Your presence will bring us great joy as we begin our new life
            together. We look forward to celebrating this special day surrounded
            by our closest friends and family.
          </p>
        </div>
      </FadeIn>
    </Section>
  );
}

// ─────────────── Bride & Groom section ───────────────────────────────────────
function BrideGroomSection() {
  return (
    <Section id="couple" className="bg-[#FFFBEB]">
      <WeddingSectionHeading
        title="The Couple"
        subtitle="Two souls, one heart"
        className="mb-16 md:mb-24"
      />
      <FadeIn delay={0.2} direction="none" className="mb-12 flex justify-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart className="h-8 w-8 text-[#C5A059]" />
        </motion.div>
      </FadeIn>

      <div className="mx-auto grid max-w-5xl items-center gap-16 md:grid-cols-2 md:gap-8">
        {[
          {
            src: "/images/wedding-invitation/bride.png",
            alt: "The Bride",
            name: "Nayana Kumari",
            role: "The Bride",
            bio: "A lover of art, coffee, and quiet mornings. She brings light to every room and joy to every moment.",
            dir: "right" as const,
          },
          {
            src: "/images/wedding-invitation/groom.png",
            alt: "The Groom",
            name: "Amara Kumara",
            role: "The Groom",
            bio: "An adventurous spirit with a heart of gold. He finds beauty in the little things and comfort in her smile.",
            dir: "left" as const,
          },
        ].map((person) => (
          <FadeIn key={person.name} direction={person.dir} className="flex flex-col items-center text-center">
            <motion.div
              className="relative mb-8 h-80 w-64 overflow-hidden rounded-t-full border border-[#E8DCC8] shadow-[0_20px_50px_rgba(197,160,89,0.12)] md:h-100 md:w-80"
              whileHover={{ scale: 1.03, boxShadow: "0 30px 70px rgba(197,160,89,0.2)" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Image
                src={person.src}
                alt={person.alt}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-[#C5A059]/20 to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            <h3 className={`${cormorant.className} mb-2 text-3xl text-[#2f2f2f]`}>{person.name}</h3>
            <p className={`${cormorant.className} mb-4 text-xs uppercase tracking-widest text-[#C5A059]`}>{person.role}</p>
            <p className={`${cormorant.className} max-w-xs text-sm font-light leading-relaxed text-[#5a5a5a]`}>{person.bio}</p>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

// ─────────────── Love Story section ──────────────────────────────────────────
function LoveStorySection() {
  return (
    <Section id="story" className="bg-[#FFF9F1]">
      <WeddingSectionHeading title="Our Story" subtitle="A journey of love" className="mb-12" />
      <FadeIn delay={0.2} direction="none" className="mb-16 flex justify-center">
        <BookHeart className="h-8 w-8 text-[#C5A059]" />
      </FadeIn>

      <div className="relative mx-auto max-w-4xl px-6">
        <motion.div
          className="absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 bg-[#C5A059]/30 md:block"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "top" }}
        />

        <div className="space-y-16 md:space-y-24">
          {timeline.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={item.year}
                className="relative flex flex-col md:flex-row items-center justify-between"
              >
                <motion.div
                  className="absolute left-1/2 z-20 hidden h-5 w-5 -translate-x-1/2 rounded-full bg-[#C5A059] md:block"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.15, type: "spring", stiffness: 300 }}
                  style={{ boxShadow: "0 0 0 4px rgba(197,160,89,0.2), 0 0 20px rgba(197,160,89,0.4)" }}
                />
                <FadeIn
                  direction={isEven ? "right" : "left"}
                  className={`group relative z-10 mb-12 w-full rounded-[2rem] border border-[#E8DCC8] bg-white p-8 shadow-[0_10px_40px_rgba(197,160,89,0.08)] md:mb-0 md:w-[45%] md:p-10 ${
                    isEven ? "md:text-right" : "md:order-last md:text-left text-center"
                  } text-center`}
                >
                  <motion.div
                    className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#C5A059]/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <span className={`${cormorant.className} pointer-events-none absolute -top-10 -left-4 z-0 select-none text-7xl text-[#C5A059] opacity-15 md:-left-8 md:text-8xl`}>
                    {item.year}
                  </span>
                  <h3 className={`${cormorant.className} relative z-10 mb-4 text-3xl text-[#2f2f2f]`}>{item.title}</h3>
                  <p className={`${cormorant.className} relative z-10 text-sm font-light leading-relaxed text-[#5a5a5a] md:text-base`}>{item.description}</p>
                </FadeIn>
                <div className="md:w-[45%] hidden md:block" />
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

// ─────────────── Countdown section ───────────────────────────────────────────
function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date("2026-12-12T00:00:00").getTime();
    const interval = setInterval(() => {
      const now = Date.now();
      const distance = targetDate - now;
      if (distance < 0) { clearInterval(interval); return; }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const labels = ["days", "hours", "minutes", "seconds"] as const;

  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-[#FFFBEB] py-32">
      <FloatingParticles count={10} />
      <div className="absolute inset-0 z-0">
        <Image src="/images/hero/wedding-hero.jpg" alt="Countdown Background" fill className="object-cover object-center opacity-10" />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 text-center">
        <FadeIn>
          <WeddingSectionHeading title="Counting Down to Forever" className="mb-12" />
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {labels.map((label, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.08, boxShadow: "0 20px 50px rgba(197,160,89,0.2)" }}
                className="flex h-24 w-24 flex-col items-center justify-center rounded-2xl border border-[#E8DCC8] bg-white text-[#2f2f2f] shadow-[0_10px_30px_rgba(197,160,89,0.08)] md:h-32 md:w-32"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={timeLeft[label]}
                    className={`${cormorant.className} mb-1 text-4xl text-[#C5A059] md:text-6xl`}
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.3 }}
                  >
                    {String(timeLeft[label]).padStart(2, "0")}
                  </motion.span>
                </AnimatePresence>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#5a5a5a] md:text-xs">{label}</span>
              </motion.div>
            ))}
          </div>

          {/* ── Prominent Google Calendar button ─────────────── */}
          <FadeIn delay={0.5} direction="up" className="mt-14">
            <MagneticWrapper>
              <motion.a
                href={googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.06,
                  boxShadow: "0 0 50px rgba(197,160,89,0.45), 0 20px 40px rgba(197,160,89,0.2)",
                }}
                whileTap={{ scale: 0.96 }}
                className="group inline-flex items-center gap-3 rounded-full bg-[#C5A059] px-10 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-white shadow-[0_15px_40px_rgba(197,160,89,0.35)] transition-all duration-300 hover:bg-[#b8904d]"
              >
                <CalendarDays className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                Add to Google Calendar
                <motion.div
                  className="ml-1 inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ExternalLink className="h-4 w-4 opacity-70" />
                </motion.div>
              </motion.a>
            </MagneticWrapper>
            <p className="mt-4 text-xs text-[#8a8a8a] tracking-wide">
              Save the date so you never miss our special day
            </p>
          </FadeIn>
        </FadeIn>
      </div>
    </section>
  );
}

// ─────────────── Schedule section ────────────────────────────────────────────
function ScheduleSection() {
  return (
    <Section id="schedule" className="bg-[#FFF9F1]">
      <WeddingSectionHeading title="Wedding Day" subtitle="The Agenda" className="mb-12" />
      <FadeIn delay={0.2} direction="none" className="mb-16 flex justify-center">
        <Clock className="h-8 w-8 text-[#C5A059]" />
      </FadeIn>

      <div className="relative mx-auto max-w-4xl px-6">
        <motion.div
          className="absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 bg-[#C5A059]/30 md:block"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "top" }}
        />

        <div className="space-y-16 md:space-y-24">
          {scheduleItems.map((item, index) => {
            const isEven = index % 2 === 0;
            const IconComp = item.icon;
            return (
              <div key={item.title} className="relative flex flex-col items-center justify-between md:flex-row">
                <motion.div
                  className="absolute left-1/2 z-20 hidden h-5 w-5 -translate-x-1/2 rounded-full bg-[#C5A059] md:flex items-center justify-center"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1, type: "spring", stiffness: 300 }}
                  style={{ boxShadow: "0 0 0 4px rgba(197,160,89,0.2), 0 0 20px rgba(197,160,89,0.4)" }}
                />
                <FadeIn
                  direction={isEven ? "right" : "left"}
                  className={`group relative z-10 mb-12 w-full rounded-[2rem] border border-[#E8DCC8] bg-white p-8 shadow-[0_10px_40px_rgba(197,160,89,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(197,160,89,0.15)] md:mb-0 md:w-[45%] md:p-10 ${
                    isEven ? "md:text-right" : "md:order-last md:text-left text-center"
                  } text-center`}
                >
                  <motion.div
                    className="mb-4 flex justify-center md:justify-end"
                    whileHover={{ rotate: 15, scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <IconComp className="h-6 w-6 text-[#C5A059]" />
                  </motion.div>
                  <p className={`${cormorant.className} mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#C5A059] md:text-sm`}>{item.time}</p>
                  <h3 className={`${cormorant.className} relative z-10 mb-4 text-3xl text-[#2f2f2f]`}>{item.title}</h3>
                  <p className={`${cormorant.className} relative z-10 text-sm font-light leading-relaxed text-[#5a5a5a] md:text-base`}>{item.description}</p>
                </FadeIn>
                <div className="hidden md:block md:w-[45%]" />
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

// ─────────────── Venue section ────────────────────────────────────────────────
function VenueSection() {
  return (
    <Section id="venue" className="bg-[#FFFBEB]">
      <WeddingSectionHeading title="The Venue" subtitle="Where the magic happens" className="mb-16 md:mb-24" />

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 lg:flex-row">
        <FadeIn direction="right" className="flex w-full flex-col justify-center rounded-2xl border border-[#E8DCC8] bg-white p-10 shadow-[0_20px_50px_rgba(197,160,89,0.08)] lg:w-1/3">
          <motion.div whileHover={{ scale: 1.2, rotate: 10 }} transition={{ duration: 0.3 }}>
            <MapPin className="mb-6 h-10 w-10 text-[#C5A059]" />
          </motion.div>
          <h3 className={`${cormorant.className} mb-4 text-3xl text-[#2f2f2f]`}>Waters Edge Grand Ballroom</h3>
          <p className={`${cormorant.className} mb-2 font-light text-[#5a5a5a]`}>316 Ethul Kotte Road,</p>
          <p className={`${cormorant.className} mb-8 font-light text-[#5a5a5a]`}>Battaramulla 10100, Sri Lanka.</p>

          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Waters+Edge+Grand+Ballroom,+316+Ethul+Kotte+Road,+Battaramulla,+Sri+Lanka"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-fit items-center gap-2 self-start rounded-xl border border-[#E8DCC8] bg-[#FFFBEB] px-5 py-3 text-sm text-[#5C5C4A] transition-colors hover:border-[#C9C191] hover:bg-[#FFF9F1]"
          >
            <Navigation className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
            Get Directions
          </a>
        </FadeIn>

        <FadeIn direction="left" className="relative min-h-[24rem] w-full overflow-hidden rounded-2xl border border-[#E8DCC8] bg-[#f4efe7] shadow-[0_20px_50px_rgba(197,160,89,0.08)] md:min-h-[31.25rem] lg:w-2/3">
          <iframe
            src="https://www.google.com/maps?q=Waters+Edge+Grand+Ballroom,+316+Ethul+Kotte+Road,+Battaramulla,+Sri+Lanka&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            title="Waters Edge Grand Ballroom location"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full transition-all duration-1000"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
        </FadeIn>
      </div>
    </Section>
  );
}

// ─────────────── Gallery section ──────────────────────────────────────────────
function GallerySection() {
  const images = [
    { src: "/images/wedding-invitation/gallery-1.jpg", alt: "Gallery moment 1", aspect: "aspect-[3/4]" },
    { src: "/images/wedding-invitation/gallery-2.jpg", alt: "Gallery moment 2", aspect: "aspect-[4/5]" },
    { src: "/images/wedding-invitation/gallery-3.jpg", alt: "Gallery moment 3", aspect: "aspect-[16/9]" },
    { src: "/images/wedding-invitation/gallery-4.jpg", alt: "Gallery moment 4", aspect: "aspect-[3/4]" },
    { src: "/images/wedding-invitation/gallery-5.jpg", alt: "Gallery moment 5", aspect: "aspect-[4/5]" },
    { src: "/images/wedding-invitation/gallery-6.jpg", alt: "Gallery moment 6", aspect: "aspect-[1/1]" },
  ];

  return (
    <Section id="gallery" className="relative overflow-hidden bg-[#FFF9F1] py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[20%] left-[-10%] h-[40rem] w-[40rem] rounded-full bg-[#C5A059]/5 blur-[120px]" />
        <div className="absolute right-[-10%] bottom-[-10%] h-[30rem] w-[30rem] rounded-full bg-[#C5A059]/5 blur-[100px]" />
      </div>

      <div className="mb-12 px-4 text-center md:mb-16">
        <FadeIn>
          <WeddingSectionHeading title="Our Gallery" subtitle="Captured Moments" />
        </FadeIn>
      </div>
      <FadeIn delay={0.2} direction="none" className="mb-16 flex justify-center">
        <Camera className="h-8 w-8 text-[#C5A059]" />
      </FadeIn>

      <div className="relative w-full py-12 md:py-20">
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-20 w-16 bg-gradient-to-r from-[#FFF9F1] to-transparent md:w-32" />
        <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-20 w-16 bg-gradient-to-l from-[#FFF9F1] to-transparent md:w-32" />

        <motion.div
          className="flex w-max cursor-pointer"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 32, repeat: Infinity }}
          whileHover={{ animationPlayState: "paused" } as never}
        >
          {[0, 1].map((set) => (
            <div key={set} className="flex gap-6 md:gap-8 pr-6 md:pr-8 items-center">
              {images.map((img, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={`${set}-${index}`}
                    className={`relative min-w-[280px] flex-shrink-0 rounded-[2rem] border border-[#E8DCC8] bg-white shadow-[0_15px_30px_rgba(197,160,89,0.1)] sm:min-w-[320px] md:min-w-[400px] ${img.aspect} ${isEven ? "-translate-y-6 md:-translate-y-10" : "translate-y-6 md:translate-y-10"} overflow-hidden`}
                    whileHover={{ scale: 1.04, zIndex: 30, boxShadow: "0 30px 60px rgba(197,160,89,0.2)" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-110"
                      sizes="(max-width: 768px) 80vw, 400px"
                    />
                    <div className="pointer-events-none absolute inset-[12px] z-10 rounded-[1.4rem] border border-[#C5A059]/30 opacity-70" />
                    <motion.div
                      className="absolute inset-0 z-20 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <motion.p
                        className={`${cormorant.className} text-2xl tracking-widest text-white`}
                        initial={{ y: 16 }}
                        whileHover={{ y: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        {img.alt}
                      </motion.p>
                      <div className="mt-4 h-px w-8 bg-[#C5A059]" />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

// ─────────────── Dress Code section ───────────────────────────────────────────
function DressCodeSection() {
  return (
    <Section id="dress-code" className="bg-[#FFFBEB]">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-12 md:flex-row">
        <FadeIn direction="right" className="w-full md:w-1/2">
          <motion.div
            className="relative h-125 w-full overflow-hidden rounded-2xl border border-[#E8DCC8] shadow-[0_20px_50px_rgba(197,160,89,0.08)]"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src="/images/wedding-invitation/dress-code.png"
              alt="Dress Code"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/10" />
          </motion.div>
        </FadeIn>

        <FadeIn direction="left" className="w-full text-center md:w-1/2 md:text-left">
          <WeddingSectionHeading title="Dress Code" subtitle="Black Tie Optional" className="mb-6 md:text-left" />
          <div className="mb-8 flex justify-center md:justify-start">
            <motion.div whileHover={{ rotate: 15, scale: 1.2 }} transition={{ duration: 0.3 }}>
              <Shirt className="h-8 w-8 text-[#C5A059]" />
            </motion.div>
          </div>
          <p className="mb-6 font-light leading-relaxed text-[#5a5a5a]">
            We request our guests to dress in formal attire. Gentlemen are encouraged to wear a tuxedo or a dark suit and tie. Ladies are encouraged to wear an evening gown or a formal cocktail dress.
          </p>
          <p className="font-light leading-relaxed text-[#5a5a5a]">
            Please avoid wearing white, ivory, or any shades of the bridal colors. We appreciate your effort to make our special day elegant and memorable.
          </p>
        </FadeIn>
      </div>
    </Section>
  );
}

// ─────────────── Framed Love Note card ───────────────────────────────────────
function FramedLoveNote({ message, name }: { message: string; name: string }) {
  const corners = [
    "top-3 left-3 border-t border-l",
    "top-3 right-3 border-t border-r",
    "bottom-3 left-3 border-b border-l",
    "bottom-3 right-3 border-b border-r",
  ];

  return (
    <motion.div
      className="relative mx-auto h-full px-4 sm:px-6"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className="relative h-full border border-[#C5A059]/55 bg-white px-6 py-10 shadow-[0_10px_40px_rgba(197,160,89,0.08)] sm:px-10 sm:py-12">
        {corners.map((position) => (
          <span
            key={position}
            className={`pointer-events-none absolute h-5 w-5 border-[#C5A059] ${position}`}
            aria-hidden="true"
          />
        ))}
        <Heart className="mx-auto mb-4 h-5 w-5 text-[#C5A059]/40" />
        <p className={`${cormorant.className} text-center text-lg italic leading-relaxed text-[#3f3f3f] sm:text-xl md:text-[1.35rem] md:leading-[1.8]`}>
          &ldquo;{message}&rdquo;
        </p>
        <p className={`${cormorant.className} mt-8 text-center text-base text-[#5a5a5a] sm:text-lg`}>
          — {name}
        </p>
      </div>
    </motion.div>
  );
}

// ─────────────── RSVP section ─────────────────────────────────────────────────
// This component now saves RSVPs to the DATABASE via a Server Action,
// NOT to the browser's localStorage.
function RSVPSection({ onSubmit }: { onSubmit: (submission: GuestMessage) => void }) {
  const [form, setForm] = useState<RsvpFormData>(emptyRsvpForm);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  // useTransition gives us a pending state while the server action runs
  const [isPending, startTransition] = useTransition();

  const handleChange = (field: keyof RsvpFormData, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
    setSuccessMessage("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = form.name.trim();
    const trimmedMessage = form.message.trim();

    if (!trimmedName) { setError("Please enter your name."); return; }
    if (!form.attending) { setError("Please let us know if you will attend."); return; }

    const guestCount =
      form.attending === "accept"
        ? Math.max(1, Number.parseInt(form.guestCount, 10) || 1)
        : 0;

    // ── Call the Server Action (saves to database) ─────────────────────────
    startTransition(async () => {
      const result = await submitRsvp({
        name: trimmedName,
        attending: form.attending as "accept" | "decline",
        guestCount,
        message: trimmedMessage,
      });

      if (!result.success) {
        setError(result.error ?? "Something went wrong. Please try again.");
        return;
      }

      // Also update the local Words of Love section immediately (optimistic UI)
      const localSubmission: GuestMessage = {
        id: crypto.randomUUID(),
        name: trimmedName,
        attending: form.attending as "accept" | "decline",
        guestCount,
        message: trimmedMessage,
        submittedAt: new Date().toISOString(),
      };
      onSubmit(localSubmission);
      setForm(emptyRsvpForm);
      setSuccessMessage("Thank you for your RSVP! Your response has been saved. 💛");
      setError("");
    });
  };

  const inputClassName =
    "w-full rounded-xl border border-[#E8DCC8] bg-white px-4 py-3 text-sm text-[#4a4a4a] outline-none transition-all placeholder:text-[#b8b0a0] focus:border-[#C5A059] focus:shadow-[0_0_0_3px_rgba(197,160,89,0.12)]";

  return (
    <Section id="rsvp" className="relative overflow-hidden bg-[#FFF9F1] py-20 md:py-28">
      <FloatingParticles count={6} />
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <FadeIn>
          <WeddingSectionHeading
            title="RSVP"
            subtitle="Kindly let us know if you can make it"
            className="mb-8"
          />
          <div className="mb-12 flex justify-center">
            <motion.div
              animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <MessageSquareHeart className="h-8 w-8 text-[#C5A059]" />
            </motion.div>
          </div>
          <motion.div
            className="rounded-[1.25rem] bg-[#FFFBEB] px-6 py-8 shadow-[0_12px_40px_rgba(201,193,145,0.12)] sm:px-8 sm:py-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <form className="space-y-5 text-left" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="rsvp-name" className="block text-sm font-medium text-[#5C5C4A]">Name</label>
                <input id="rsvp-name" type="text" value={form.name} onChange={(e) => handleChange("name", e.target.value)} placeholder="Eg: Namal Perera" className={inputClassName} suppressHydrationWarning />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="rsvp-attending" className="block text-sm font-medium text-[#5C5C4A]">Will you attend?</label>
                  <select
                    id="rsvp-attending"
                    value={form.attending}
                    onChange={(e) => handleChange("attending", e.target.value as RsvpFormData["attending"])}
                    className={`${inputClassName} appearance-none`}
                    suppressHydrationWarning
                  >
                    <option value="">Select</option>
                    <option value="accept">Joyfully Accept</option>
                    <option value="decline">Regretfully Decline</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="rsvp-guest-count" className="block text-sm font-medium text-[#5C5C4A]">Number of Guests</label>
                  <input
                    id="rsvp-guest-count"
                    type="number"
                    min={1}
                    value={form.guestCount}
                    onChange={(e) => handleChange("guestCount", e.target.value)}
                    disabled={form.attending === "decline"}
                    placeholder="1"
                    className={`${inputClassName} disabled:cursor-not-allowed disabled:bg-[#f5f0e6] disabled:text-[#a8a08f]`}
                    suppressHydrationWarning
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="rsvp-message" className="block text-sm font-medium text-[#5C5C4A]">Message</label>
                <textarea id="rsvp-message" rows={4} value={form.message} onChange={(e) => handleChange("message", e.target.value)} placeholder="Leave the couple a beautiful note!" className={`${inputClassName} resize-y min-h-[7rem]`} suppressHydrationWarning />
              </div>

              {error ? <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-sm text-[#a0522d]" role="alert">{error}</motion.p> : null}
              {successMessage ? <motion.p initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-sm text-[#6b6b55]" role="status">{successMessage}</motion.p> : null}

              <motion.button
                type="submit"
                suppressHydrationWarning
                disabled={isPending}
                whileHover={isPending ? {} : { scale: 1.02, boxShadow: "0 10px 30px rgba(197,160,89,0.3)" }}
                whileTap={isPending ? {} : { scale: 0.97 }}
                className="w-full rounded-xl bg-[#C5A059] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#b8904d] tracking-wide disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPending ? "Sending..." : "Send RSVP with Love ♡"}
              </motion.button>
            </form>
          </motion.div>
        </FadeIn>
      </div>
    </Section>
  );
}

// ─────────────── Words of Love section ───────────────────────────────────────
function WordsOfLoveSection({ messages }: { messages: GuestMessage[] }) {
  const loveNotes = messages.filter((entry) => entry.message.trim());

  return (
    <Section id="words-of-love" className="bg-[#FFF9F1] py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <FadeIn>
          <div className="text-center">
            <h2 className={`${cormorant.className} text-5xl text-[#2f2f2f] sm:text-6xl md:text-7xl`}>
              Words of Love
            </h2>
            <motion.div
              className="mx-auto mt-4 h-px bg-[#C5A059]"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            />
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#5a5a5a] sm:text-base">
              Hear what our family and friends have to say about our love story.
            </p>
          </div>
        </FadeIn>
      </div>

      <div className="mt-16 w-full md:mt-20">
        {loveNotes.length === 0 ? (
          <FadeIn delay={0.15} className="px-4">
            <p className="mx-auto max-w-xl text-center font-heading text-base italic text-[#8a8a8a] sm:text-lg">
              Be the first to leave a beautiful note in your RSVP above.
            </p>
          </FadeIn>
        ) : (
          <div className="relative flex overflow-hidden w-full">
            {/* Left & Right fade masks */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-r from-[#FFF9F1] to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-l from-[#FFF9F1] to-transparent" />

            <motion.div
              className="flex w-max shrink-0 gap-6 px-6"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                ease: "linear",
                duration: Math.max(25, loveNotes.length * 8),
                repeat: Infinity,
              }}
            >
              {[...loveNotes, ...loveNotes].map((entry, index) => (
                <div
                  key={`${entry.id}-${index}`}
                  className="w-[85vw] sm:w-[400px] flex-shrink-0"
                >
                  <FramedLoveNote message={entry.message} name={entry.name} />
                </div>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </Section>
  );
}

// ─────────────── Main export ──────────────────────────────────────────────────
export function WeddingInvitationTemplate() {
  const [showIntro, setShowIntro] = useState(true);
  const [guestMessages, setGuestMessages] = useState<GuestMessage[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleAudio = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const handleEnterInvitation = useCallback(() => {
    setShowIntro(false);
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => handleEnterInvitation(), 5500);
    return () => window.clearTimeout(timer);
  }, [handleEnterInvitation]);

  // handleRsvpSubmit: called after a successful DB save to update the
  // local "Words of Love" section without needing a full page reload.
  const handleRsvpSubmit = useCallback((submission: GuestMessage) => {
    setGuestMessages((current) => [submission, ...current]);
  }, []);

  return (
    <main className={`relative min-h-screen w-full bg-[#FFF9F1] ${cormorant.className}`}>
      <audio ref={audioRef} src="/music/wedding-invitation.mp3" loop />
      
      {/* Floating Audio Button */}
      {!showIntro && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          suppressHydrationWarning
          onClick={toggleAudio}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#C5A059] text-white shadow-[0_10px_30px_rgba(197,160,89,0.3)] transition-transform hover:scale-110"
          aria-label={isPlaying ? "Pause music" : "Play music"}
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
      <RSVPSection onSubmit={handleRsvpSubmit} />
      <WordsOfLoveSection messages={guestMessages} />
      <Footer />
    </main>
  );
}
