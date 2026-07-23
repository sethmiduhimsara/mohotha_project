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
  TreePine,
  Trees,
  Leaf,
  Flower2,
  MapPin,
  Heart,
  Mail,
  ArrowRight,
  Sprout,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Motion tokens — slow, earthy easing curve                          */
/* ------------------------------------------------------------------ */
const LUX_EASE = [0.22, 1, 0.36, 1] as const;

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.22, delayChildren: 0.1 },
  },
};

const riseIn: Variants = {
  hidden: { opacity: 0, y: 56, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.3, ease: LUX_EASE },
  },
};

/* Fixed angles for the RSVP petal burst — kept static (no Math.random)
   so server and client render the same markup. */
const PETAL_BURST_ANGLES = [0, 60, 120, 180, 240, 300];

/* A small garden palette the botanical accents pull from, so the page   */
/* reads like a curated bouquet rather than a single repeated flower.    */
const BLOOM_PALETTE = [
  { petal: "#d98a92", center: "#fbe9dd" }, // blush rose
  { petal: "#e4b95f", center: "#fff7e6" }, // marigold
  { petal: "#a98fc9", center: "#f1e9fb" }, // lavender
  { petal: "#e0896a", center: "#fdece3" }, // coral
  { petal: "#c98f96", center: "#f4e1c1" }, // dusty rose
  { petal: "#8fb08a", center: "#eef6ea" }, // sage bloom
] as const;

/* ------------------------------------------------------------------ */
/*  RevealText — word-by-word storytelling reveal                     */
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
/*  Petal — a small teardrop bloom petal, used for drifting particles  */
/*  and the RSVP confirmation burst.                                   */
/* ------------------------------------------------------------------ */
function Petal({
  size = 16,
  color = "#e3b7ac",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={color}>
      <path d="M12 2C7.2 6.1 4 11.1 12 22 20 11.1 16.8 6.1 12 2Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  MiniFlower — a plain, unanimated 6-petal bloom glyph. Used inside  */
/*  the GrowingVine, where entrance motion is driven externally by     */
/*  scroll progress rather than viewport intersection.                 */
/* ------------------------------------------------------------------ */
function MiniFlower({
  size = 26,
  petal = "#c98f96",
  center = "#f4e1c1",
}: {
  size?: number;
  petal?: string;
  center?: string;
}) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size}>
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <ellipse
          key={deg}
          cx="20"
          cy="11"
          rx="5"
          ry="9"
          fill={petal}
          fillOpacity={0.88}
          transform={`rotate(${deg} 20 20)`}
        />
      ))}
      <circle cx="20" cy="20" r="4.5" fill={center} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  BloomingFlower — a 6-petal flower that opens petal-by-petal when   */
/*  it scrolls into view. Used as a standalone decorative accent.      */
/* ------------------------------------------------------------------ */
function BloomingFlower({
  size = 60,
  petal = "#c98f96",
  center = "#f4e1c1",
  className = "",
  delay = 0,
}: {
  size?: number;
  petal?: string;
  center?: string;
  className?: string;
  delay?: number;
}) {
  const petals = [0, 60, 120, 180, 240, 300];

  return (
    <motion.svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
    >
      <motion.g
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: 0.09, delayChildren: delay },
          },
        }}
      >
        {petals.map((deg) => (
          <motion.ellipse
            key={deg}
            cx="50"
            cy="28"
            rx="10"
            ry="20"
            fill={petal}
            fillOpacity={0.85}
            transform={`rotate(${deg} 50 50)`}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            variants={{
              hidden: { scale: 0, opacity: 0 },
              show: {
                scale: 1,
                opacity: 1,
                transition: { duration: 0.7, ease: LUX_EASE },
              },
            }}
          />
        ))}
        <motion.circle
          cx="50"
          cy="50"
          r="9"
          fill={center}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          variants={{
            hidden: { scale: 0, opacity: 0 },
            show: {
              scale: 1,
              opacity: 1,
              transition: {
                duration: 0.5,
                ease: LUX_EASE,
                delay: delay + petals.length * 0.09,
              },
            },
          }}
        />
      </motion.g>
    </motion.svg>
  );
}

/* ------------------------------------------------------------------ */
/*  CornerFlourish — a thin botanical line flourish for hero corners   */
/* ------------------------------------------------------------------ */
function CornerFlourish({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 90 90"
      width="72"
      height="72"
      className={className}
      fill="none"
    >
      <path
        d="M2 86 C 2 48, 42 86, 2 38"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M2 86 C 40 86, 2 48, 42 86"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.6"
      />
      <circle cx="9" cy="33" r="3" fill="currentColor" />
      <circle cx="34" cy="9" r="2" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  LeafSprig — a small sprouting stem, used flanking the dividers      */
/* ------------------------------------------------------------------ */
function LeafSprig({
  size = 22,
  flip = false,
  color = "#7fa07f",
}: {
  size?: number;
  flip?: boolean;
  color?: string;
}) {
  return (
    <motion.svg
      viewBox="0 0 40 60"
      width={size}
      height={size * 1.5}
      fill="none"
      style={{
        transform: flip ? "scaleX(-1)" : undefined,
        transformOrigin: "bottom center",
      }}
      initial={{ scaleY: 0, opacity: 0 }}
      whileInView={{ scaleY: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: LUX_EASE }}
    >
      <path d="M20 58 C20 40 20 20 20 2" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M20 40 C10 34 4 24 8 14" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M20 26 C30 22 34 12 30 4" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <ellipse cx="9" cy="15" rx="7" ry="3.6" fill={color} fillOpacity="0.85" transform="rotate(-35 9 15)" />
      <ellipse cx="31" cy="6" rx="7" ry="3.6" fill={color} fillOpacity="0.85" transform="rotate(35 31 6)" />
    </motion.svg>
  );
}

/* ------------------------------------------------------------------ */
/*  BotanicalDivider — replaces the old wave/hill seam between          */
/*  sections. A little garden of blooms and sprigs on a resting line,   */
/*  drawing itself and opening as it scrolls into view. Each instance   */
/*  cycles through the palette so the page reads like a bouquet rather  */
/*  than one repeated flower.                                           */
/* ------------------------------------------------------------------ */
function BotanicalDivider({ bg, variant = 0 }: { bg: string; variant?: number }) {
  const c1 = BLOOM_PALETTE[variant % BLOOM_PALETTE.length];
  const c2 = BLOOM_PALETTE[(variant + 2) % BLOOM_PALETTE.length];
  const c3 = BLOOM_PALETTE[(variant + 4) % BLOOM_PALETTE.length];

  return (
    <div className="relative py-10 sm:py-14 lg:py-16" style={{ backgroundColor: bg }}>
      <div className="mx-auto flex max-w-[280px] items-center justify-center gap-2.5 sm:max-w-md sm:gap-4">
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: LUX_EASE }}
          style={{ transformOrigin: "right center" }}
          className="h-px flex-1 bg-[#8fa992]/40"
        />
        <LeafSprig flip />
        <BloomingFlower size={24} petal={c1.petal} center={c1.center} delay={0.05} />
        <BloomingFlower size={38} petal={c2.petal} center={c2.center} delay={0.15} />
        <BloomingFlower size={24} petal={c3.petal} center={c3.center} delay={0.25} />
        <LeafSprig />
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: LUX_EASE }}
          style={{ transformOrigin: "left center" }}
          className="h-px flex-1 bg-[#8fa992]/40"
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  JourneyProgress — earthy green scroll progress bar                */
/* ------------------------------------------------------------------ */
function JourneyProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left bg-gradient-to-r from-[#6b8e73] via-[#1e3b27] to-[#6b8e73]"
    />
  );
}

/* ------------------------------------------------------------------ */
/*  GrowingVine — the signature botanical moment. A hand-drawn vine    */
/*  that draws itself in as the guest scrolls through the story, with  */
/*  leaves and flowers blooming along the way. Desktop only.           */
/* ------------------------------------------------------------------ */
function GrowingVine() {
  const vineRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: vineRef,
    offset: ["start start", "end end"],
  });

  const bloom1 = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);
  const bloom2 = useTransform(scrollYProgress, [0.27, 0.37], [0, 1]);
  const bloom3 = useTransform(scrollYProgress, [0.48, 0.58], [0, 1]);
  const bloom4 = useTransform(scrollYProgress, [0.69, 0.79], [0, 1]);
  const bloom5 = useTransform(scrollYProgress, [0.88, 0.98], [0, 1]);

  const leaf1 = useTransform(scrollYProgress, [0.0, 0.08], [0, 1]);
  const leaf2 = useTransform(scrollYProgress, [0.18, 0.26], [0, 1]);
  const leaf3 = useTransform(scrollYProgress, [0.39, 0.47], [0, 1]);
  const leaf4 = useTransform(scrollYProgress, [0.6, 0.68], [0, 1]);
  const leaf5 = useTransform(scrollYProgress, [0.8, 0.88], [0, 1]);

  if (shouldReduceMotion) return null;

  return (
    <div
      ref={vineRef}
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-2 z-10 hidden w-16 lg:block xl:left-6"
    >
      <svg
        viewBox="0 0 64 1000"
        preserveAspectRatio="none"
        className="h-full w-full overflow-visible"
      >
        <motion.path
          d="M32,0 C8,55 56,110 32,165 C8,220 56,275 32,330 C8,385 56,440 32,495 C8,550 56,605 32,660 C8,715 56,770 32,825 C8,880 56,935 32,1000"
          fill="none"
          stroke="#8fa992"
          strokeWidth="1.6"
          strokeLinecap="round"
          style={{ pathLength: scrollYProgress, opacity: 0.55 }}
        />

        <motion.ellipse
          cx="15"
          cy="58"
          rx="8"
          ry="4"
          fill="#8fa992"
          transform="rotate(-30 15 58)"
          style={{ opacity: leaf1 }}
        />
        <motion.ellipse
          cx="50"
          cy="195"
          rx="8"
          ry="4"
          fill="#8fa992"
          transform="rotate(25 50 195)"
          style={{ opacity: leaf2 }}
        />
        <motion.ellipse
          cx="14"
          cy="358"
          rx="8"
          ry="4"
          fill="#8fa992"
          transform="rotate(-20 14 358)"
          style={{ opacity: leaf3 }}
        />
        <motion.ellipse
          cx="50"
          cy="522"
          rx="8"
          ry="4"
          fill="#8fa992"
          transform="rotate(30 50 522)"
          style={{ opacity: leaf4 }}
        />
        <motion.ellipse
          cx="14"
          cy="688"
          rx="8"
          ry="4"
          fill="#8fa992"
          transform="rotate(-25 14 688)"
          style={{ opacity: leaf5 }}
        />
      </svg>

      <motion.div
        style={{ opacity: bloom1, scale: bloom1, top: "8%" }}
        className="absolute -left-2"
      >
        <MiniFlower size={26} petal={BLOOM_PALETTE[0].petal} center={BLOOM_PALETTE[0].center} />
      </motion.div>
      <motion.div
        style={{ opacity: bloom2, scale: bloom2, top: "29%" }}
        className="absolute left-6"
      >
        <MiniFlower size={22} petal={BLOOM_PALETTE[1].petal} center={BLOOM_PALETTE[1].center} />
      </motion.div>
      <motion.div
        style={{ opacity: bloom3, scale: bloom3, top: "50%" }}
        className="absolute -left-2"
      >
        <MiniFlower size={28} petal={BLOOM_PALETTE[2].petal} center={BLOOM_PALETTE[2].center} />
      </motion.div>
      <motion.div
        style={{ opacity: bloom4, scale: bloom4, top: "71%" }}
        className="absolute left-6"
      >
        <MiniFlower size={22} petal={BLOOM_PALETTE[3].petal} center={BLOOM_PALETTE[3].center} />
      </motion.div>
      <motion.div
        style={{ opacity: bloom5, scale: bloom5, top: "91%" }}
        className="absolute -left-2"
      >
        <MiniFlower size={26} petal={BLOOM_PALETTE[4].petal} center={BLOOM_PALETTE[4].center} />
      </motion.div>
    </div>
  );
}

export default function BotanicalGraceCard() {
  const targetDate = useMemo(
    () => new Date("2026-10-24T00:00:00").getTime(),
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

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(heroProgress, [0, 1], ["0%", "26%"]);
  const heroImageScale = useTransform(heroProgress, [0, 1], [1.05, 1.2]);
  const heroTextY = useTransform(heroProgress, [0, 1], ["0%", "38%"]);
  const heroTextOpacity = useTransform(heroProgress, [0, 0.75], [1, 0]);
  const heroOverlay = useTransform(heroProgress, [0, 1], [0.4, 0.8]);

  const [rsvpStep, setRsvpStep] = useState<"intro" | "form" | "success">("intro");

  // New Animations explicitly for the "Greeny" Vibe 🍃
  const fallingLeafA: Variants = shouldReduceMotion
    ? {}
    : {
        animate: {
            y: [-20, 120],
            x: [-15, 15, -15],
            rotate: [0, 180, 360],
            opacity: [0, 0.8, 0],
            transition: { repeat: Infinity, duration: 12, ease: "linear" },
        }
      };

  const fallingLeafB: Variants = shouldReduceMotion
    ? {}
    : {
        animate: {
            y: [-30, 100],
            x: [10, -20, 10],
            rotate: [0, -180, -360],
            opacity: [0, 0.6, 0],
            transition: { repeat: Infinity, duration: 15, ease: "linear", delay: 2 },
        }
      };

  // Drifting flower petals, paired with the leaves for a fuller botanical feel
  const fallingPetalA: Variants = shouldReduceMotion
    ? {}
    : {
        animate: {
          y: [-15, 130],
          x: [10, -18, 10],
          rotate: [0, 140, 280],
          opacity: [0, 0.75, 0],
          transition: { repeat: Infinity, duration: 13, ease: "linear", delay: 1 },
        },
      };

  const fallingPetalB: Variants = shouldReduceMotion
    ? {}
    : {
        animate: {
          y: [-25, 110],
          x: [-8, 18, -8],
          rotate: [0, -150, -300],
          opacity: [0, 0.65, 0],
          transition: { repeat: Infinity, duration: 16, ease: "linear", delay: 3.2 },
        },
      };

  const swayingBranch: Variants = shouldReduceMotion
    ? {}
    : {
        animate: {
            rotate: [-3, 3, -3],
            transition: { repeat: Infinity, duration: 8, ease: "easeInOut" },
        }
      };

  const glowPulse: Variants = shouldReduceMotion
    ? {}
    : {
        animate: {
            opacity: [0.08, 0.2, 0.08],
            transition: { repeat: Infinity, duration: 9, ease: "easeInOut" },
        }
      };

  const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6b8e73]";

  return (
    <section className="min-h-screen bg-[#f2f6f3] text-[#2b3a30] overflow-hidden">
      <JourneyProgress />

      {/* 🎬 HERO — cinematic opening sequence 🎬 */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden">
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
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#1e3b27]/40 via-transparent to-[#f2f6f3]" />
            <motion.div
              style={{ opacity: heroOverlay }}
              className="absolute inset-0 z-10 bg-[#0f1d14]"
            />
            {/* EXACT IMAGE NAME 1 */}
            <Image
              src="/images/hero/botanical-grace 1.jpg" 
              alt="Forest wedding hero background"
              fill
              priority
              className="object-cover object-center opacity-90"
              sizes="100vw"
            />
          </motion.div>
        </motion.div>

        {/* Ambient forest sunlight glow */}
        <motion.div
          variants={glowPulse}
          animate="animate"
          className="absolute left-1/2 top-1/3 z-10 h-[300px] w-[300px] sm:h-[420px] sm:w-[420px] -translate-x-1/2 rounded-full bg-[#e8f2d5] blur-[120px] pointer-events-none"
        />

        {/* Falling leaves + petals instead of drifting clouds */}
        <motion.div
          variants={fallingLeafA}
          animate="animate"
          className="absolute top-20 left-[15%] z-10 text-white/40 pointer-events-none hidden sm:block"
        >
          <Leaf size={38} strokeWidth={0.8} />
        </motion.div>
        <motion.div
          variants={fallingLeafB}
          animate="animate"
          className="absolute top-10 right-[20%] z-10 text-white/30 pointer-events-none hidden sm:block"
        >
          <Leaf size={28} strokeWidth={0.8} />
        </motion.div>
        <motion.div
          variants={fallingPetalA}
          animate="animate"
          className="absolute top-32 left-[45%] z-10 pointer-events-none hidden sm:block"
        >
          <Petal size={20} color="#f2d4cf" />
        </motion.div>
        <motion.div
          variants={fallingPetalB}
          animate="animate"
          className="absolute top-16 right-[8%] z-10 pointer-events-none hidden sm:block"
        >
          <Petal size={16} color="#eccac4" />
        </motion.div>

        {/* Thin botanical corner flourishes framing the hero */}
        <div className="absolute bottom-10 left-6 z-10 hidden text-white/25 sm:block lg:left-10">
          <CornerFlourish />
        </div>
        <div
          className="absolute bottom-10 right-6 z-10 hidden text-white/25 sm:block lg:right-10"
          style={{ transform: "scaleX(-1)" }}
        >
          <CornerFlourish />
        </div>

        <motion.div
          style={{ y: heroTextY, opacity: heroTextOpacity }}
          className="relative z-20 flex min-h-screen flex-col"
        >
          <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.4, delay: 1, ease: LUX_EASE }}
            className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 text-white/90 sm:px-6 sm:py-6 lg:px-8"
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
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="text-center text-white relative z-10"
            >
              <motion.p
                variants={riseIn}
                className="mx-auto mb-6 w-fit text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-white/80 drop-shadow-md"
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
                  className="not-italic font-light text-3xl sm:text-4xl text-[#a4c2a8] my-2"
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
                className="mt-8 text-base font-medium uppercase tracking-[0.2em] sm:text-xl sm:tracking-[0.25em] text-white/90 drop-shadow-md"
              >
                Saturday, October 24, 2026
              </motion.p>

              <motion.div
                variants={riseIn}
                className="mt-14 flex flex-col items-center"
              >
                <p className="text-[9px] uppercase tracking-[0.4em] text-white/60 mb-2">
                  Follow the trail
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
                  className="text-2xl text-white/60"
                >
                  ↓
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

      </section>

      {/* The vine grows alongside every chapter from here to the RSVP */}
      <div className="relative">
        <GrowingVine />
        <BotanicalDivider bg="#ffffff" variant={0} />

        {/* ✨ CHAPTER ONE — THE HAPPY COUPLE ✨ */}
        <section
          id="couple"
          className="relative bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-[#e6eee8] rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.15 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8 }}
            className="absolute bottom-16 left-8 text-[#6b8e73] pointer-events-none hidden lg:block origin-bottom"
          >
            <motion.div variants={swayingBranch} animate="animate">
              <TreePine size={110} strokeWidth={0.8} />
            </motion.div>
          </motion.div>

          <div className="absolute top-10 right-10 hidden lg:block opacity-90">
            <BloomingFlower size={64} petal={BLOOM_PALETTE[0].petal} center={BLOOM_PALETTE[0].center} />
          </div>

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
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_20px_50px_rgba(30,59,39,0.12)]">
                  {/* EXACT IMAGE NAME 2 */}
                  <Image
                    src="/images/hero/botanical-grace 2.jpg"
                    alt="David and Roshel"
                    fill
                    className="object-cover object-center transition-transform duration-[1400ms] ease-out hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                <motion.div
                  animate={
                    shouldReduceMotion ? {} : { y: [-5, 5, -5] }
                  }
                  transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
                  className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 md:-right-12 rounded-full bg-[#f2f6f3] p-5 sm:p-6 shadow-xl border border-white"
                >
                  <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full border border-[#6b8e73]/40 flex items-center justify-center">
                    <Sprout className="text-[#6b8e73]" size={28} />
                  </div>
                </motion.div>
              </motion.div>

              <div className="text-center lg:text-left lg:pl-6">
                <p className="text-[10px] uppercase tracking-[0.4em] text-[#6b8e73] font-semibold mb-3">
                  Chapter One
                </p>
                <RevealText
                  as="h2"
                  text="The Happy Couple"
                  className="font-serif text-3xl italic text-[#1e3b27] sm:text-4xl lg:text-6xl mb-6"
                />
                <motion.p
                  variants={riseIn}
                  className="text-sm sm:text-base leading-relaxed text-[#2b3a30]/80 mb-8"
                >
                  From our first walk through the sunlit pines to building a life deeply rooted in love, 
                  every moment has grown into something beautiful. We can&apos;t wait to celebrate 
                  our story surrounded by nature and our favorite people.
                </motion.p>

                <motion.div
                  variants={riseIn}
                  className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 sm:gap-8 text-[#1e3b27]"
                >
                  <div className="text-center lg:text-left">
                    <div className="font-serif italic text-2xl sm:text-3xl">
                      David
                    </div>
                    <div className="mt-2 text-[10px] uppercase tracking-[0.35em] text-[#6b8e73]">
                      The Groom
                    </div>
                  </div>
                  <div className="text-[#a4c2a8] text-2xl font-light">|</div>
                  <div className="text-center lg:text-left">
                    <div className="font-serif italic text-2xl sm:text-3xl">
                      Roshel
                    </div>
                    <div className="mt-2 text-[10px] uppercase tracking-[0.35em] text-[#6b8e73]">
                      The Bride
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

        </section>
        <BotanicalDivider bg="#f2f6f3" variant={1} />

        {/* 📖 CHAPTER TWO — OUR LOVE STORY 📖 */}
        <section className="relative bg-[#f2f6f3] px-4 py-20 sm:px-6 sm:py-28 lg:px-8 border-y border-[#dce8df] overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.07 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#6b8e73] pointer-events-none origin-bottom"
          >
            <motion.div variants={swayingBranch} animate="animate">
              <Trees size={260} strokeWidth={0.5} className="sm:hidden" />
              <Trees size={380} strokeWidth={0.5} className="hidden sm:block" />
            </motion.div>
          </motion.div>

          <div className="absolute top-14 left-10 hidden lg:block opacity-80">
            <BloomingFlower size={48} petal={BLOOM_PALETTE[1].petal} center={BLOOM_PALETTE[1].center} delay={0.1} />
          </div>
          <div className="absolute bottom-16 right-12 hidden lg:block opacity-80">
            <BloomingFlower size={56} petal={BLOOM_PALETTE[2].petal} center={BLOOM_PALETTE[2].center} delay={0.2} />
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-120px" }}
            variants={staggerContainer}
            className="relative mx-auto max-w-4xl text-center z-10"
          >
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#6b8e73] font-semibold mb-3">
              Chapter Two
            </p>
            <RevealText
              as="h2"
              text="Our Love Story"
              className="font-serif text-3xl italic text-[#1e3b27] sm:text-4xl lg:text-5xl"
            />
            <motion.p
              variants={riseIn}
              className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#2b3a30]/80"
            >
              Like a seed planted in good soil, our friendship blossomed into a 
              beautiful love. Now we are ready to branch out into our forever.
            </motion.p>

            <motion.div
              variants={riseIn}
              className="mx-auto mt-12 max-w-3xl rounded-[2rem] sm:rounded-[2.5rem] border border-[#dce8df] bg-white p-8 sm:p-10 shadow-[0_20px_50px_rgba(30,59,39,0.05)]"
            >
              <p className="text-sm leading-loose text-[#1e3b27] sm:text-base font-medium">
                From our first glance to our shared dreams, every passing season 
                brought us closer. We invite you to be part of this 
                unforgettable day, where love, family, and joy come together under the forest canopy.
              </p>
            </motion.div>
          </motion.div>

        </section>
        <BotanicalDivider bg="#e6eee8" variant={2} />

        {/* ⏳ THE COUNTDOWN ⏳ */}
        <section
          id="countdown"
          className="relative bg-[#e6eee8] px-4 py-20 sm:px-6 sm:py-28 lg:px-8 overflow-hidden"
        >
          <div className="absolute top-8 right-12 hidden md:block opacity-80">
            <BloomingFlower size={72} petal={BLOOM_PALETTE[3].petal} center={BLOOM_PALETTE[3].center} />
          </div>

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
              className="font-serif text-2xl italic text-[#1e3b27] sm:text-4xl lg:text-5xl mb-3"
            />
            <motion.p
              variants={riseIn}
              className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#6b8e73] font-semibold"
            >
              See you beneath the canopy
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
                  className="rounded-2xl sm:rounded-3xl border border-white/90 bg-white/70 backdrop-blur-xl px-3 py-7 sm:px-4 sm:py-10 shadow-[0_15px_35px_rgba(30,59,39,0.06)]"
                >
                  <div className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#6b8e73] drop-shadow-sm">
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <div className="mt-3 sm:mt-4 text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.35em] text-[#2b3a30] font-medium">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

        </section>
        <BotanicalDivider bg="#ffffff" variant={3} />

        {/* 🗺️ CHAPTER THREE — WEDDING DETAILS 🗺️ */}
        <section className="relative bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#e6eee8] rounded-full blur-3xl opacity-80 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#f0f4ea] rounded-full blur-3xl opacity-70 translate-x-1/3 translate-y-1/3 pointer-events-none" />

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-120px" }}
            variants={staggerContainer}
            className="relative mx-auto max-w-6xl z-10"
          >
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#6b8e73] font-semibold mb-3">
                Chapter Three
              </p>
              <RevealText
                as="h2"
                text="Wedding Details"
                className="font-serif text-3xl italic text-[#1e3b27] sm:text-4xl lg:text-5xl"
              />
              <motion.p
                variants={riseIn}
                className="mt-4 text-[10px] uppercase tracking-[0.3em] text-[#6b8e73] font-semibold"
              >
                All the important information you need to celebrate with us
              </motion.p>
            </div>

            <div className="mt-14 grid gap-6 sm:gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
              <motion.div
                variants={riseIn}
                className="rounded-[2.5rem] sm:rounded-[3rem] border border-[#dce8df] bg-[#f8faf8]/80 backdrop-blur-2xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(30,59,39,0.06)] h-full flex flex-col justify-center relative overflow-hidden"
              >
                <div className="absolute -bottom-10 -right-10 text-[#6b8e73]/10 pointer-events-none">
                  <MapPin size={220} strokeWidth={1} />
                </div>

                <div className="relative z-10 space-y-7 sm:space-y-8 text-sm text-[#2b3a30]">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.35em] text-[#6b8e73] font-bold">
                      Ceremony
                    </div>
                    <div className="mt-2 font-serif text-2xl sm:text-3xl text-[#1e3b27]">
                      4:00 PM
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.35em] text-[#6b8e73] font-bold">
                      Venue
                    </div>
                    <div className="mt-2 font-serif text-2xl sm:text-3xl text-[#1e3b27]">
                      The Whispering Pines Estate
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.35em] text-[#6b8e73] font-bold">
                      Dress Code
                    </div>
                    <div className="mt-2 font-serif text-2xl sm:text-3xl text-[#1e3b27]">
                      Earthy Elegance / Semi-Formal
                    </div>
                  </div>
                </div>

                <div className="relative z-10 mt-10 sm:mt-12 flex justify-start">
                  <button
                    className={`rounded-2xl bg-[#1e3b27] px-7 py-3.5 sm:px-8 sm:py-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-white shadow-xl shadow-[#1e3b27]/20 transition-all duration-500 hover:bg-[#132619] hover:-translate-y-1 ${focusRing}`}
                  >
                    Map Directions
                  </button>
                </div>
              </motion.div>

              <motion.div
                variants={riseIn}
                className="overflow-hidden rounded-[2.5rem] sm:rounded-[3rem] border border-[#dce8df] shadow-[0_20px_50px_rgba(30,59,39,0.08)] h-full min-h-[320px] sm:min-h-[400px]"
              >
                <div className="relative h-full w-full">
                  {/* EXACT IMAGE NAME 3 - Note the .jpeg extension! */}
                  <Image
                    src="/images/hero/botanical-grace 3.jpeg"
                    alt="Forest wedding venue"
                    fill
                    className="object-cover object-center transition-transform duration-[1400ms] ease-out hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

        </section>
        <BotanicalDivider bg="#e6eee8" variant={4} />

        {/* ⏱️ CHAPTER FOUR — WEDDING DAY TIMELINE ⏱️ */}
        <section className="relative bg-[#e6eee8] px-4 py-20 sm:px-6 sm:py-28 lg:px-8 border-y border-white overflow-hidden">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-120px" }}
            variants={staggerContainer}
            className="mx-auto max-w-4xl text-center relative z-10"
          >
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#6b8e73] font-semibold mb-3">
              Chapter Four
            </p>
            <RevealText
              as="h2"
              text="Wedding Day Timeline"
              className="font-serif text-3xl italic text-[#1e3b27] sm:text-4xl lg:text-5xl"
            />

            <div className="mx-auto mt-14 max-w-2xl space-y-10 sm:space-y-12 text-left relative before:absolute before:inset-0 before:ml-8 sm:before:ml-10 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#6b8e73]/50 before:to-transparent">
              {[
                ["04 PM", "The Vows", "Underneath the grand oak tree"],
                ["05 PM", "Cocktail Hour", "Drinks, mingling, and woodland walks"],
                ["07 PM", "Reception", "Dinner, speeches, and celebration"],
                ["09 PM", "Under the Stars", "Music, dancing, and bonfires"],
              ].map(([time, title, note]) => (
                <motion.div
                  key={title}
                  variants={riseIn}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                >
                  <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white bg-[#f2f6f3] text-[#6b8e73] shadow-lg shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em]">
                      {time}
                    </span>
                  </div>
                  <div className="w-full rounded-[1.5rem] sm:rounded-[2rem] border border-white bg-white/80 p-5 sm:p-6 shadow-sm md:w-[45%] md:group-odd:text-right">
                    <div className="font-serif text-xl sm:text-2xl italic text-[#1e3b27]">
                      {title}
                    </div>
                    <div className="mt-2 text-sm font-medium text-[#2b3a30]/80">
                      {note}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </section>
        <BotanicalDivider bg="#f2f6f3" variant={5} />

        {/* 🕊️ A NOTE TO OUR LOVED ONES 🕊️ */}
        <section className="relative bg-[#f2f6f3] px-4 py-20 sm:px-6 sm:py-28 lg:px-8 overflow-hidden">
          <motion.div
            variants={glowPulse}
            animate="animate"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[220px] w-[220px] sm:h-[300px] sm:w-[300px] rounded-full bg-[#e8f2d5] blur-[110px] pointer-events-none"
          />

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-120px" }}
            variants={staggerContainer}
            className="relative mx-auto max-w-4xl text-center z-10"
          >
            <div className="mb-4 flex justify-center opacity-90">
              <BloomingFlower size={44} center="#e8f2d5" />
            </div>
            <RevealText
              as="h2"
              text="A Note to Our Loved Ones"
              className="font-serif text-3xl italic text-[#1e3b27] sm:text-4xl lg:text-5xl"
            />
            <motion.div
              variants={riseIn}
              className="mx-auto mt-10 max-w-3xl rounded-[2rem] sm:rounded-[2.5rem] border border-[#dce8df] bg-white p-8 sm:p-10 shadow-[0_20px_50px_rgba(30,59,39,0.03)]"
            >
              <p className="text-sm leading-loose text-[#2b3a30] font-medium">
                Your presence will make our day complete. Thank you for being a
                part of our journey and for sharing in the joy of our
                celebration.
              </p>
            </motion.div>
          </motion.div>

        </section>
        <BotanicalDivider bg="#fbfdfb" variant={0} />

        {/* 💌 RSVP — AN INVITATION TO OPEN 💌 */}
        <section
          id="rsvp"
          className="relative bg-[#fbfdfb] px-4 py-20 sm:px-6 sm:py-28 lg:px-8 border-t border-[#dce8df] overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.12 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
            className="absolute -top-8 -left-8 text-[#6b8e73] pointer-events-none origin-bottom-left"
          >
            <motion.div variants={swayingBranch} animate="animate">
              <Flower2 size={130} strokeWidth={1} className="-rotate-12" />
            </motion.div>
          </motion.div>

          <div className="absolute top-10 right-10 hidden lg:block opacity-90">
            <BloomingFlower size={56} petal={BLOOM_PALETTE[4].petal} center={BLOOM_PALETTE[4].center} />
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-120px" }}
            variants={staggerContainer}
            className="relative mx-auto max-w-2xl text-center z-10"
          >
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#6b8e73] font-semibold mb-3">
              Join Us
            </p>
            <RevealText
              as="h2"
              text="Will You Join Us"
              className="font-serif text-3xl italic text-[#1e3b27] sm:text-5xl lg:text-6xl"
            />
            <motion.p variants={riseIn} className="mt-4 text-sm text-[#2b3a30]/70">
              Please respond so we can save you a seat in the woods. 🌲
            </motion.p>

            <motion.div
              variants={riseIn}
              className="mx-auto mt-12 rounded-[2rem] sm:rounded-[2.5rem] border border-[#dce8df] bg-white p-8 sm:p-12 shadow-[0_30px_60px_rgba(30,59,39,0.06)] text-left overflow-hidden"
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
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#6b8e73]/30 bg-[#f2f6f3] text-[#6b8e73]">
                      <Mail size={26} strokeWidth={1.4} />
                    </div>
                    <p className="font-serif text-2xl italic text-[#1e3b27]">
                      You&apos;re invited to open this
                    </p>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#2b3a30]/70">
                      A small envelope, resting on a bed of moss. Open it whenever you&apos;re ready.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRsvpStep("form")}
                      className={`mt-8 flex items-center gap-2 rounded-2xl bg-[#1e3b27] px-8 py-4 text-[11px] font-semibold tracking-widest uppercase text-white shadow-xl shadow-[#1e3b27]/20 transition-colors duration-500 hover:bg-[#132619] ${focusRing}`}
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
                      className={`rounded-2xl border border-[#dce8df] bg-[#fbfdfb] px-5 py-4 text-sm outline-none focus:border-[#6b8e73] focus:ring-1 focus:ring-[#6b8e73] transition-colors duration-300 ${focusRing}`}
                    />
                    <div className="grid gap-5 sm:grid-cols-2">
                      <select
                        className={`rounded-2xl border border-[#dce8df] bg-[#fbfdfb] px-5 py-4 text-sm outline-none focus:border-[#6b8e73] focus:ring-1 focus:ring-[#6b8e73] text-[#2b3a30] transition-colors duration-300 cursor-pointer ${focusRing}`}
                      >
                        <option>Will you attend?</option>
                        <option>Joyfully Accept 🥂</option>
                        <option>Regretfully Decline 🤍</option>
                      </select>
                      <input
                        type="number"
                        placeholder="Number of guests"
                        className={`rounded-2xl border border-[#dce8df] bg-[#fbfdfb] px-5 py-4 text-sm outline-none focus:border-[#6b8e73] focus:ring-1 focus:ring-[#6b8e73] transition-colors duration-300 ${focusRing}`}
                      />
                    </div>
                    <textarea
                      rows={4}
                      placeholder="Leave a message for the couple..."
                      className={`rounded-2xl border border-[#dce8df] bg-[#fbfdfb] px-5 py-4 text-sm outline-none focus:border-[#6b8e73] focus:ring-1 focus:ring-[#6b8e73] transition-colors duration-300 resize-none ${focusRing}`}
                    />
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`mt-4 rounded-2xl bg-[#1e3b27] px-6 py-4 text-[11px] font-semibold tracking-widest uppercase text-white shadow-xl shadow-[#1e3b27]/20 transition-colors duration-500 hover:bg-[#132619] ${focusRing}`}
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
                    <div className="relative mb-6 flex h-16 w-16 items-center justify-center">
                      {/* A small burst of petals celebrates the RSVP */}
                      <div className="pointer-events-none absolute inset-0">
                        {PETAL_BURST_ANGLES.map((deg, i) => {
                          const rad = (deg * Math.PI) / 180;
                          const dx = Math.cos(rad) * 42;
                          const dy = Math.sin(rad) * 42;
                          return (
                            <motion.span
                              key={deg}
                              className="absolute left-1/2 top-1/2"
                              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                              animate={
                                shouldReduceMotion
                                  ? { opacity: 0 }
                                  : { opacity: [0, 1, 0], scale: [0, 1, 0.7], x: dx, y: dy }
                              }
                              transition={{
                                duration: 1.3,
                                ease: LUX_EASE,
                                delay: 0.15 + i * 0.03,
                              }}
                            >
                              <Petal
                                size={14}
                                color={i % 2 === 0 ? "#d9a3a0" : "#8fa992"}
                              />
                            </motion.span>
                          );
                        })}
                      </div>

                      <motion.div
                        animate={
                          shouldReduceMotion ? {} : { scale: [1, 1.12, 1] }
                        }
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                        className="flex h-16 w-16 items-center justify-center rounded-full border border-[#6b8e73]/30 bg-[#f2f6f3] text-[#6b8e73]"
                      >
                        <Heart size={26} strokeWidth={1.4} />
                      </motion.div>
                    </div>
                    <p className="font-serif text-2xl italic text-[#1e3b27]">
                      RSVP Sent
                    </p>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#2b3a30]/70">
                      Thank you for letting us know. Until then — see you beneath the trees.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </section>

        {/* Footer Buffer */}
        <div className="h-10 sm:h-14 bg-[#fbfdfb]" />
      </div>
    </section>
  );
}