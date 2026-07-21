"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Great_Vibes } from "next/font/google";
import {
  Heart,
  Gift,
  MapPin,
  Navigation,
  ChevronDown,
  CalendarDays,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import { FadeIn } from "./FadeIn";

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
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

const RSVP_STORAGE_KEY = "wedding-invitation-guest-messages";

const weddingTheme = {
  pageBg: "#FFF9F1",
  cardBg: "#FFFBEB",
  gold: "#C5A059",
  goldSoft: "#C9C191",
  border: "#E8DCC8",
  text: "#2f2f2f",
  textBody: "#5a5a5a",
  textMuted: "#6b6b6b",
  textLabel: "#5C5C4A",
};

const emptyRsvpForm: RsvpFormData = {
  name: "",
  attending: "",
  guestCount: "",
  message: "",
};

const scheduleItems = [
  {
    time: "10:00 AM",
    title: "Poruwa Ceremony",
    description: "The traditional Sri Lankan ritual for the couple.",
  },
  {
    time: "01:00 PM",
    title: "Lunch",
    description: "Enjoy a delicious meal with family and friends.",
  },
  {
    time: "05:00 PM",
    title: "End of the Event",
    description: "Wrap up the celebration and say your goodbyes.",
  },
  {
    time: "08:00 PM",
    title: "After Party",
    description:
      "Let your hair down and dance the night away with our live DJ.",
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
            ? `${greatVibes.className} text-5xl text-[#2f2f2f] sm:text-6xl md:text-7xl`
            : "font-serif text-4xl text-[#2f2f2f] md:text-5xl"
        }
      >
        {title}
      </h2>
      <div className="mx-auto mt-4 h-px w-16 bg-[#C5A059]" />
      {subtitle ? (
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#5a5a5a] sm:text-base">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function InvitationIntro({
  onEnter,
}: {
  onEnter: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeOut" } }}
      className="fixed inset-0 z-50 overflow-hidden bg-[#FFF9F1]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(197,160,89,0.12),transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.6),transparent_30%),#FFF9F1]" />
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative flex min-h-screen items-center justify-center px-6 text-center text-[#2f2f2f]"
      >
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute left-1/2 top-1/2 h-136 w-136 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C5A059]/20" />
          <div className="absolute left-1/2 top-1/2 h-88 w-88 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C5A059]/30" />
        </motion.div>

        <div className="relative z-10 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 18, letterSpacing: "0.45em" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "0.3em" }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="mb-6 text-[10px] uppercase tracking-[0.3em] text-[#C5A059]"
          >
            A Special Invitation
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="font-serif text-5xl leading-tight md:text-7xl lg:text-8xl"
          >
            Amara <span className="text-[#C5A059] italic font-light">&amp;</span>{" "}
            Nayana
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55 }}
            className="mx-auto mt-8 max-w-xl"
          >
            <p className="text-sm uppercase tracking-[0.42em] text-[#5a5a5a] md:text-base">
              December 12, 2026
            </p>
            <p className="mt-6 text-base leading-relaxed text-[#5a5a5a] md:text-lg">
              We are honored to invite you to witness the beginning of our
              forever. Please enter the invitation to discover every detail of
              our celebration.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8 }}
            className="mt-10 flex justify-center"
          >
            <Button
              type="button"
              variant="ghost"
              onClick={onEnter}
              className="border-[#E8DCC8] bg-white/80 px-7 py-3 text-[10px] uppercase tracking-[0.35em] text-[#5C5C4A] hover:bg-white"
              aria-label="Enter wedding invitation"
            >
              Enter Invitation
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center"
          animate={{ opacity: [0.35, 0.85, 0.35], y: [0, -3, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="mb-2 text-[10px] uppercase tracking-[0.38em] text-[#8a8a8a]">
            Opening the story
          </div>
          <div className="h-px w-20 bg-linear-to-r from-transparent via-[#C5A059]/70 to-transparent" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Venue", href: "#venue" },
    { name: "RSVP", href: "#rsvp" },
    { name: "Words of Love", href: "#words-of-love" },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="fixed top-4 right-4 z-40"
    >
      <nav
        className={`flex items-center gap-4 rounded-2xl px-4 py-2 shadow-[0_10px_30px_rgba(197,160,89,0.12)] backdrop-blur-xl transition-all duration-700 ease-in-out ${
          scrolled
            ? "bg-white/90 border border-[#E8DCC8]"
            : "bg-white/75 border border-[#E8DCC8]/70"
        }`}
      >
        <ul className="flex items-center gap-4 overflow-x-auto no-scrollbar">
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="text-[10px] md:text-xs font-semibold tracking-[0.22em] uppercase transition-colors duration-300 whitespace-nowrap text-[#5C5C4A] hover:text-[#C5A059]"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#FFFBEB] py-20 text-center">
      <div className="mx-auto max-w-4xl px-6">
        <FadeIn direction="up">
          <h2 className="mb-6 font-serif text-4xl text-[#2f2f2f] md:text-5xl">
            Amara & Nayana
          </h2>
          <p className="mb-8 font-sans text-sm uppercase tracking-widest text-[#5a5a5a]">
            Thank you for being part of our story
          </p>
          <div className="mb-8 flex justify-center">
            <Heart className="h-6 w-6 animate-pulse text-[#C5A059]" />
          </div>
          <p className="text-xs text-[#8a8a8a]">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </FadeIn>
      </div>
    </footer>
  );
}

function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <motion.div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero1.png"
          alt="Wedding Background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/10 to-[#FFF9F1]" />
      </motion.div>

      <div className="relative z-10 text-center flex flex-col items-center justify-center px-6">
        <FadeIn delay={0.6} duration={1.2} direction="up">
          <p className="uppercase tracking-[0.3em] text-sm md:text-base text-white/90 mb-6 font-medium">
            We are getting married
          </p>
        </FadeIn>

        <FadeIn delay={0.9} duration={1.2} direction="up">
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-white mb-6 drop-shadow-lg">
            Amara <span className="text-primary italic font-light">&amp;</span>{" "}
            Nayana
          </h1>
        </FadeIn>

        <FadeIn delay={1.2} duration={1.2} direction="up">
          <p className="text-xl md:text-2xl text-white/90 font-light tracking-widest uppercase">
            December 12, 2026
          </p>
        </FadeIn>

        <FadeIn delay={1.4} duration={1.2} direction="up">
          <div className="mt-8 flex justify-center">
            <Button
              href={googleCalendarUrl}
              variant="ghost"
              className="gap-2 border-white/30 bg-white/10 px-6 py-3 text-[10px] uppercase tracking-[0.35em] text-white backdrop-blur-md hover:bg-white/15"
              aria-label="Add wedding date to Google Calendar"
            >
              <CalendarDays className="h-4 w-4" />
              Add to Google Calendar
            </Button>
          </div>
        </FadeIn>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
      >
        <p className="text-white/60 text-xs tracking-widest uppercase mb-2">
          Scroll to explore
        </p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="text-white/80 w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function InvitationSection() {
  return (
    <Section
      id="invitation"
      className="bg-[#FFF9F1] py-24 text-center md:py-40"
    >
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

function BrideGroomSection() {
  return (
    <Section id="couple" className="bg-[#FFFBEB]">
      <WeddingSectionHeading
        title="The Couple"
        subtitle="Two souls, one heart"
        className="mb-16 md:mb-24"
      />

      <div className="mx-auto grid max-w-5xl items-center gap-16 md:grid-cols-2 md:gap-8">
        <FadeIn
          direction="right"
          className="flex flex-col items-center text-center"
        >
          <div className="relative mb-8 h-80 w-64 overflow-hidden rounded-t-full border border-[#E8DCC8] shadow-[0_20px_50px_rgba(197,160,89,0.12)] md:h-100 md:w-80">
            <Image
              src="/images/hero/hero1.png"
              alt="The Bride"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <h3 className="mb-2 font-serif text-3xl text-[#2f2f2f]">Nayana Kumari</h3>
          <p className="mb-4 text-xs uppercase tracking-widest text-[#C5A059]">
            The Bride
          </p>
          <p className="max-w-xs text-sm font-light leading-relaxed text-[#5a5a5a]">
            A lover of art, coffee, and quiet mornings. She brings light to
            every room and joy to every moment.
          </p>
        </FadeIn>

        <FadeIn
          direction="left"
          className="flex flex-col items-center text-center"
        >
          <div className="relative mb-8 h-80 w-64 overflow-hidden rounded-t-full border border-[#E8DCC8] shadow-[0_20px_50px_rgba(197,160,89,0.12)] md:h-100 md:w-80">
            <Image
              src="/images/hero/wedding-hero.jpg"
              alt="The Groom"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <h3 className="mb-2 font-serif text-3xl text-[#2f2f2f]">Amara Kumara</h3>
          <p className="mb-4 text-xs uppercase tracking-widest text-[#C5A059]">
            The Groom
          </p>
          <p className="max-w-xs text-sm font-light leading-relaxed text-[#5a5a5a]">
            An adventurous spirit with a heart of gold. He finds beauty in the
            little things and comfort in her smile.
          </p>
        </FadeIn>
      </div>
    </Section>
  );
}

function LoveStorySection() {
  return (
    <Section id="story" className="bg-[#FFF9F1]">
      <WeddingSectionHeading
        title="Our Story"
        subtitle="A journey of love"
        className="mb-20"
      />

      <div className="relative mx-auto max-w-4xl px-6">
        <div className="absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 bg-[#C5A059]/30 md:block" />

        <div className="space-y-16 md:space-y-24">
          {timeline.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={item.year}
                className="relative flex flex-col md:flex-row items-center justify-between"
              >
                <div className="absolute left-1/2 z-20 hidden h-4 w-4 -translate-x-1/2 rounded-full bg-[#C5A059] shadow-[0_0_15px_rgba(197,160,89,0.45)] md:block" />
                <FadeIn
                  direction={isEven ? "right" : "left"}
                  className={`relative z-10 mb-12 w-full rounded-[2rem] border border-[#E8DCC8] bg-white p-8 shadow-[0_10px_40px_rgba(197,160,89,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(197,160,89,0.12)] md:mb-0 md:w-[45%] md:p-10 ${
                    isEven
                      ? "md:text-right"
                      : "md:order-last md:text-left text-center"
                  } text-center`}
                >
                  <span className="pointer-events-none absolute -top-10 -left-4 z-0 select-none font-serif text-7xl text-[#C5A059] opacity-15 md:-left-8 md:text-8xl">
                    {item.year}
                  </span>
                  <h3 className="relative z-10 mb-4 font-serif text-3xl text-[#2f2f2f]">
                    {item.title}
                  </h3>
                  <p className="relative z-10 text-sm font-light leading-relaxed text-[#5a5a5a] md:text-base">
                    {item.description}
                  </p>
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

function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2026-12-12T00:00:00").getTime();
    const interval = setInterval(() => {
      const now = Date.now();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
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
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-[#FFFBEB] py-32">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/wedding-hero.jpg"
          alt="Countdown Background"
          fill
          className="object-cover object-center opacity-15"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 text-center">
        <FadeIn>
          <WeddingSectionHeading
            title="Counting Down to Forever"
            className="mb-12"
          />

          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {Object.entries(timeLeft).map(([label, value]) => (
              <div
                key={label}
                className="flex h-24 w-24 flex-col items-center justify-center rounded-2xl border border-[#E8DCC8] bg-white text-[#2f2f2f] shadow-[0_10px_30px_rgba(197,160,89,0.08)] md:h-32 md:w-32"
              >
                <span className="mb-1 font-serif text-3xl text-[#C5A059] md:text-5xl">
                  {value}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#5a5a5a] md:text-xs">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function ScheduleSection() {
  return (
    <Section id="schedule" className="bg-[#FFF9F1]">
      <WeddingSectionHeading
        title="Wedding Day"
        subtitle="The Agenda"
        className="mb-20"
      />

      <div className="relative mx-auto max-w-4xl px-6">
        <div className="absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 bg-[#C5A059]/30 md:block" />

        <div className="space-y-16 md:space-y-24">
          {scheduleItems.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={item.title}
                className="relative flex flex-col items-center justify-between md:flex-row"
              >
                <div className="absolute left-1/2 z-20 hidden h-4 w-4 -translate-x-1/2 rounded-full bg-[#C5A059] shadow-[0_0_15px_rgba(197,160,89,0.45)] md:block" />
                <FadeIn
                  direction={isEven ? "right" : "left"}
                  className={`relative z-10 mb-12 w-full rounded-[2rem] border border-[#E8DCC8] bg-white p-8 shadow-[0_10px_40px_rgba(197,160,89,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(197,160,89,0.12)] md:mb-0 md:w-[45%] md:p-10 ${
                    isEven
                      ? "md:text-right"
                      : "md:order-last md:text-left text-center"
                  } text-center`}
                >
                  <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-[#C5A059] md:text-sm">
                    {item.time}
                  </p>
                  <h3 className="relative z-10 mb-4 font-serif text-3xl text-[#2f2f2f]">
                    {item.title}
                  </h3>
                  <p className="relative z-10 text-sm font-light leading-relaxed text-[#5a5a5a] md:text-base">
                    {item.description}
                  </p>
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

function VenueSection() {
  return (
    <Section id="venue" className="bg-[#FFFBEB]">
      <WeddingSectionHeading
        title="The Venue"
        subtitle="Where the magic happens"
        className="mb-16 md:mb-24"
      />

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 lg:flex-row">
        <FadeIn
          direction="right"
          className="flex w-full flex-col justify-center rounded-2xl border border-[#E8DCC8] bg-white p-10 shadow-[0_20px_50px_rgba(197,160,89,0.08)] lg:w-1/3"
        >
          <MapPin className="mb-6 h-10 w-10 text-[#C5A059]" />
          <h3 className="mb-4 font-serif text-3xl text-[#2f2f2f]">
            Waters Edge Grand Ballroom
          </h3>
          <p className="mb-2 font-light text-[#5a5a5a]">
            316 Ethul Kotte Road,
          </p>
          <p className="mb-8 font-light text-[#5a5a5a]">
            Battaramulla 10100, Sri Lanka.
          </p>

          <button
            type="button"
            className="group flex w-fit items-center gap-2 self-start rounded-xl border border-[#E8DCC8] bg-[#FFFBEB] px-5 py-3 text-sm text-[#5C5C4A] transition-colors hover:border-[#C9C191] hover:bg-[#FFF9F1]"
          >
            <Navigation className="h-4 w-4 group-hover:animate-pulse" />
            Get Directions
          </button>
        </FadeIn>

        <FadeIn
          direction="left"
          className="relative min-h-[24rem] w-full overflow-hidden rounded-2xl border border-[#E8DCC8] bg-[#f4efe7] shadow-[0_20px_50px_rgba(197,160,89,0.08)] md:min-h-[31.25rem] lg:w-2/3"
        >
          <iframe
            src="https://www.google.com/maps?q=Waters+Edge+Grand+Ballroom,+316+Ethul+Kotte+Road,+Battaramulla,+Sri+Lanka&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            title="Waters Edge Grand Ballroom location"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full filter grayscale-50 hover:grayscale-0 transition-all duration-1000"
          ></iframe>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
        </FadeIn>
      </div>
    </Section>
  );
}

function GallerySection() {
  const images = [
    {
      src: "/images/gallery-1.jpg",
      alt: "Gallery moment 1",
      aspect: "aspect-[3/4]",
    },
    {
      src: "/images/gallery-2.jpg",
      alt: "Gallery moment 2",
      aspect: "aspect-[4/5]",
    },
    {
      src: "/images/gallery-3.jpg",
      alt: "Gallery moment 3",
      aspect: "aspect-[16/9]",
    },
    {
      src: "/images/gallery-4.jpg",
      alt: "Gallery moment 4",
      aspect: "aspect-[3/4]",
    },
    {
      src: "/images/gallery-5.jpg",
      alt: "Gallery moment 5",
      aspect: "aspect-[4/5]",
    },
    {
      src: "/images/gallery-6.jpg",
      alt: "Gallery moment 6",
      aspect: "aspect-[1/1]",
    },
  ];

  return (
    <Section
      id="gallery"
      className="relative overflow-hidden bg-[#FFF9F1] py-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[20%] left-[-10%] h-[40rem] w-[40rem] rounded-full bg-[#C5A059]/5 blur-[120px]" />
        <div className="absolute right-[-10%] bottom-[-10%] h-[30rem] w-[30rem] rounded-full bg-[#C5A059]/5 blur-[100px]" />
      </div>

      <div className="mb-16 px-4 text-center md:mb-24">
        <FadeIn>
          <WeddingSectionHeading title="Our Gallery" subtitle="Captured Moments" />
        </FadeIn>
      </div>

      <div className="relative w-full py-12 md:py-20">
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-20 w-16 bg-gradient-to-r from-[#FFF9F1] to-transparent md:w-32" />
        <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-20 w-16 bg-gradient-to-l from-[#FFF9F1] to-transparent md:w-32" />

        <motion.div
          className="flex w-max cursor-pointer hover:[animation-play-state:paused]"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 32, repeat: Infinity }}
        >
          {[0, 1].map((set) => (
            <div
              key={set}
              className="flex gap-6 md:gap-8 pr-6 md:pr-8 items-center"
            >
              {images.map((img, index) => {
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={`${set}-${index}`}
                    className={`relative min-w-[280px] flex-shrink-0 rounded-[2rem] border border-[#E8DCC8] bg-white shadow-[0_15px_30px_rgba(197,160,89,0.1)] sm:min-w-[320px] md:min-w-[400px] ${img.aspect} ${isEven ? "-translate-y-6 md:-translate-y-10" : "translate-y-6 md:translate-y-10"}`}
                    whileHover={{ scale: 1.03, zIndex: 30 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover pointer-events-none transition-transform duration-1000 hover:scale-110"
                      sizes="(max-width: 768px) 80vw, 400px"
                    />
                    <div className="pointer-events-none absolute inset-[12px] z-10 rounded-[1.4rem] border border-[#C5A059]/30 opacity-70" />

                    <div className="absolute inset-0 z-20 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 opacity-0 transition-opacity duration-500 hover:opacity-100 pointer-events-auto">
                      <p className="translate-y-4 font-serif text-2xl tracking-widest text-white transition-transform duration-500 hover:translate-y-0">
                        {img.alt}
                      </p>
                      <div className="mt-4 h-px w-8 bg-[#C5A059] opacity-0 transition-opacity delay-100 duration-500 hover:opacity-100" />
                    </div>
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

function DressCodeSection() {
  return (
    <Section id="dress-code" className="bg-[#FFFBEB]">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-12 md:flex-row">
        <FadeIn direction="right" className="w-full md:w-1/2">
          <div className="relative h-125 w-full overflow-hidden rounded-2xl border border-[#E8DCC8] shadow-[0_20px_50px_rgba(197,160,89,0.08)]">
            <Image
              src="/images/dress-code.png"
              alt="Dress Code"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>
        </FadeIn>

        <FadeIn
          direction="left"
          className="w-full text-center md:w-1/2 md:text-left"
        >
          <WeddingSectionHeading
            title="Dress Code"
            subtitle="Black Tie Optional"
            className="mb-8 md:text-left"
          />
          <p className="mb-6 font-light leading-relaxed text-[#5a5a5a]">
            We request our guests to dress in formal attire. Gentlemen are
            encouraged to wear a tuxedo or a dark suit and tie. Ladies are
            encouraged to wear an evening gown or a formal cocktail dress.
          </p>
          <p className="font-light leading-relaxed text-[#5a5a5a]">
            Please avoid wearing white, ivory, or any shades of the bridal
            colors. We appreciate your effort to make our special day elegant
            and memorable.
          </p>
        </FadeIn>
      </div>
    </Section>
  );
}

function FramedLoveNote({
  message,
  name,
}: {
  message: string;
  name: string;
}) {
  const corners = [
    "top-3 left-3 border-t border-l",
    "top-3 right-3 border-t border-r",
    "bottom-3 left-3 border-b border-l",
    "bottom-3 right-3 border-b border-r",
  ];

  return (
    <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
      <div className="relative border border-[#C5A059]/55 px-6 py-10 sm:px-10 sm:py-12 md:px-14 md:py-14">
        {corners.map((position) => (
          <span
            key={position}
            className={`pointer-events-none absolute h-5 w-5 border-[#C5A059] ${position}`}
            aria-hidden="true"
          />
        ))}
        <p className="text-center font-serif text-lg italic leading-relaxed text-[#3f3f3f] sm:text-xl md:text-[1.35rem] md:leading-[1.8]">
          &ldquo;{message}&rdquo;
        </p>
        <p className="mt-8 text-center font-serif text-base text-[#5a5a5a] sm:text-lg">
          - {name}
        </p>
      </div>
    </div>
  );
}

function RSVPSection({
  onSubmit,
}: {
  onSubmit: (submission: GuestMessage) => void;
}) {
  const [form, setForm] = useState<RsvpFormData>(emptyRsvpForm);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (
    field: keyof RsvpFormData,
    value: string,
  ) => {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
    setSuccessMessage("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = form.name.trim();
    const trimmedMessage = form.message.trim();

    if (!trimmedName) {
      setError("Please enter your name.");
      return;
    }

    if (!form.attending) {
      setError("Please let us know if you will attend.");
      return;
    }

    const guestCount =
      form.attending === "accept"
        ? Math.max(1, Number.parseInt(form.guestCount, 10) || 1)
        : 0;

    const submission: GuestMessage = {
      id: crypto.randomUUID(),
      name: trimmedName,
      attending: form.attending,
      guestCount,
      message: trimmedMessage,
      submittedAt: new Date().toISOString(),
    };

    onSubmit(submission);
    setForm(emptyRsvpForm);
    setSuccessMessage(
      trimmedMessage
        ? "Thank you for your RSVP! Your message will appear in Words of Love below."
        : "Thank you for your RSVP! Your response has been received.",
    );
    setError("");

    if (trimmedMessage) {
      window.setTimeout(() => {
        document
          .getElementById("words-of-love")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }
  };

  const inputClassName =
    "w-full rounded-xl border border-[#E8DCC8] bg-white px-4 py-3 text-sm text-[#4a4a4a] outline-none transition-colors placeholder:text-[#b8b0a0] focus:border-[#C9C191]";

  return (
    <Section id="rsvp" className="relative overflow-hidden bg-[#FFF9F1] py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <FadeIn>
          <div className="rounded-[1.25rem] bg-[#FFFBEB] px-6 py-8 shadow-[0_12px_40px_rgba(201,193,145,0.12)] sm:px-8 sm:py-10">
            <form className="space-y-5 text-left" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label
                  htmlFor="rsvp-name"
                  className="block text-sm font-medium text-[#5C5C4A]"
                >
                  Name
                </label>
                <input
                  id="rsvp-name"
                  type="text"
                  value={form.name}
                  onChange={(event) => handleChange("name", event.target.value)}
                  placeholder="Eg: Namal Perera"
                  className={inputClassName}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="rsvp-attending"
                    className="block text-sm font-medium text-[#5C5C4A]"
                  >
                    Will you attend?
                  </label>
                  <select
                    id="rsvp-attending"
                    value={form.attending}
                    onChange={(event) =>
                      handleChange(
                        "attending",
                        event.target.value as RsvpFormData["attending"],
                      )
                    }
                    className={`${inputClassName} appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%278%27 viewBox=%270 0 12 8%27%3E%3Cpath fill=%27%235C5C4A%27 d=%27M1 1l5 5 5-5%27/%3E%3C/svg%3E%27)] bg-size-[12px_8px] bg-position-[right_1rem_center] bg-no-repeat pr-10`}
                  >
                    <option value="">Select</option>
                    <option value="accept">Joyfully Accept</option>
                    <option value="decline">Regretfully Decline</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="rsvp-guest-count"
                    className="block text-sm font-medium text-[#5C5C4A]"
                  >
                    Number of Guests
                  </label>
                  <input
                    id="rsvp-guest-count"
                    type="number"
                    min={1}
                    value={form.guestCount}
                    onChange={(event) =>
                      handleChange("guestCount", event.target.value)
                    }
                    disabled={form.attending === "decline"}
                    placeholder="1"
                    className={`${inputClassName} disabled:cursor-not-allowed disabled:bg-[#f5f0e6] disabled:text-[#a8a08f]`}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="rsvp-message"
                  className="block text-sm font-medium text-[#5C5C4A]"
                >
                  Message
                </label>
                <textarea
                  id="rsvp-message"
                  rows={4}
                  value={form.message}
                  onChange={(event) =>
                    handleChange("message", event.target.value)
                  }
                  placeholder="Leave the couple a beautiful note!"
                  className={`${inputClassName} resize-y min-h-[7rem]`}
                />
              </div>

              {error ? (
                <p className="text-sm text-[#a0522d]" role="alert">
                  {error}
                </p>
              ) : null}

              {successMessage ? (
                <p className="text-sm text-[#6b6b55]" role="status">
                  {successMessage}
                </p>
              ) : null}

              <button
                type="submit"
                className="w-full rounded-xl bg-[#C9C191] px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#b8b080]"
              >
                Send RSVP with Love
              </button>
            </form>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}

function WordsOfLoveSection({ messages }: { messages: GuestMessage[] }) {
  const loveNotes = messages.filter((entry) => entry.message.trim());

  return (
    <Section
      id="words-of-love"
      className="bg-[#FFF9F1] py-20 md:py-28"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <FadeIn>
          <div className="text-center">
            <h2
              className={`${greatVibes.className} text-5xl text-[#2f2f2f] sm:text-6xl md:text-7xl`}
            >
              Words of Love
            </h2>
            <div className="mx-auto mt-4 h-px w-16 bg-[#C5A059]" />
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#5a5a5a] sm:text-base">
              Hear what our family and friends have to say about our love story.
            </p>
          </div>
        </FadeIn>

        <div className="mt-12 space-y-10 md:mt-16">
          {loveNotes.length === 0 ? (
            <FadeIn delay={0.15}>
              <p className="mx-auto max-w-xl text-center font-serif text-base italic text-[#8a8a8a] sm:text-lg">
                Be the first to leave a beautiful note in your RSVP above.
              </p>
            </FadeIn>
          ) : (
            loveNotes.map((entry, index) => (
              <FadeIn key={entry.id} delay={index * 0.1}>
                <FramedLoveNote message={entry.message} name={entry.name} />
              </FadeIn>
            ))
          )}
        </div>
      </div>
    </Section>
  );
}

export function WeddingInvitationTemplate() {
  const [showIntro, setShowIntro] = useState(true);
  const [guestMessages, setGuestMessages] = useState<GuestMessage[]>([]);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowIntro(false), 5500);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(RSVP_STORAGE_KEY);
      if (!stored) return;

      const parsed = JSON.parse(stored) as GuestMessage[];
      if (Array.isArray(parsed)) {
        setGuestMessages(parsed);
      }
    } catch {
      window.localStorage.removeItem(RSVP_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(guestMessages));
  }, [guestMessages]);

  const handleRsvpSubmit = useCallback((submission: GuestMessage) => {
    setGuestMessages((current) => [submission, ...current]);
  }, []);

  return (
    <main className="relative min-h-screen bg-background w-full">
      <AnimatePresence>
        {showIntro ? <InvitationIntro onEnter={() => setShowIntro(false)} /> : null}
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
