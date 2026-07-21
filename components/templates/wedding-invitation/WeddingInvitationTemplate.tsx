"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

const wishes = [
  {
    name: "Sarah & Mike",
    text: "Wishing you a lifetime of love and happiness. We can&apos;t wait to celebrate with you!",
  },
  {
    name: "The Johnson Family",
    text: "May your years ahead be filled with lasting joy and endless love.",
  },
  {
    name: "Emma",
    text: "So incredibly happy for both of you! You&apos;re perfect together.",
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
      className="fixed inset-0 z-50 overflow-hidden bg-[#090909]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,162,39,0.15),transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_30%),#090909]" />
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative flex min-h-screen items-center justify-center px-6 text-center text-white"
      >
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute left-1/2 top-1/2 h-136 w-136 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10" />
          <div className="absolute left-1/2 top-1/2 h-88 w-88 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20" />
        </motion.div>

        <div className="relative z-10 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 18, letterSpacing: "0.45em" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "0.3em" }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="mb-6 text-[10px] uppercase tracking-[0.3em] text-primary/90"
          >
            A Special Invitation
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="font-serif text-5xl leading-tight md:text-7xl lg:text-8xl"
          >
            Amara <span className="text-primary italic font-light">&amp;</span>{" "}
            Nayana
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55 }}
            className="mx-auto mt-8 max-w-xl"
          >
            <p className="text-sm uppercase tracking-[0.42em] text-white/70 md:text-base">
              December 12, 2026
            </p>
            <p className="mt-6 text-base leading-relaxed text-white/78 md:text-lg">
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
              className="border-white/20 bg-white/10 px-7 py-3 text-[10px] uppercase tracking-[0.35em] text-white backdrop-blur-md hover:bg-white/15"
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
          <div className="mb-2 text-[10px] uppercase tracking-[0.38em] text-white/50">
            Opening the story
          </div>
          <div className="h-px w-20 bg-linear-to-r from-transparent via-primary/70 to-transparent" />
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
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="fixed top-4 right-4 z-40"
    >
      <nav
        className={`flex items-center gap-4 rounded-2xl px-4 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-700 ease-in-out ${
          scrolled
            ? "bg-white/85"
            : "bg-black/25"
        }`}
      >
        <ul className="flex items-center gap-4 overflow-x-auto no-scrollbar">
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className={`text-[10px] md:text-xs font-semibold tracking-[0.22em] uppercase transition-colors duration-300 whitespace-nowrap ${
                  scrolled
                    ? "text-foreground/70 hover:text-primary"
                    : "text-white/80 hover:text-white"
                }`}
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
    <footer className="py-20 text-center relative overflow-hidden bg-foreground text-white">
      <div className="max-w-4xl mx-auto px-6">
        <FadeIn direction="up">
          <h2 className="font-serif text-4xl md:text-5xl mb-6">
            Amara & Nayana
          </h2>
          <p className="font-sans text-white/60 mb-8 tracking-widest uppercase text-sm">
            Thank you for being part of our story
          </p>
          <div className="flex justify-center mb-8">
            <Heart className="text-primary w-6 h-6 animate-pulse" />
          </div>
          <p className="text-xs text-white/40">
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
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/10 to-background/90" />
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
      className="bg-background text-center py-24 md:py-40"
    >
      <FadeIn duration={1.2}>
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-10 leading-snug">
            With joyful hearts, we invite you to{" "}
            <br className="hidden md:block" />
            share in our celebration of love and commitment.
          </h2>

          <div className="h-24 w-px bg-primary/40 my-8" />

          <p className="text-foreground/70 text-lg md:text-xl font-light max-w-xl mx-auto leading-relaxed">
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
    <Section id="couple" className="bg-secondary/20">
      <div className="text-center mb-16 md:mb-24">
        <FadeIn>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            The Couple
          </h2>
          <p className="uppercase tracking-[0.2em] text-xs md:text-sm text-foreground/60">
            Two souls, one heart
          </p>
        </FadeIn>
      </div>

      <div className="grid md:grid-cols-2 gap-16 md:gap-8 items-center max-w-5xl mx-auto">
        <FadeIn
          direction="right"
          className="flex flex-col items-center text-center"
        >
          <div className="relative w-64 h-80 md:w-80 md:h-100 mb-8 overflow-hidden rounded-t-full shadow-2xl">
            <Image
              src="/images/hero/hero1.png"
              alt="The Bride"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <h3 className="font-serif text-3xl mb-2">Nayana Kumari</h3>
          <p className="text-foreground/60 uppercase tracking-widest text-xs mb-4">
            The Bride
          </p>
          <p className="text-sm font-light text-foreground/80 max-w-xs leading-relaxed">
            A lover of art, coffee, and quiet mornings. She brings light to
            every room and joy to every moment.
          </p>
        </FadeIn>

        <FadeIn
          direction="left"
          className="flex flex-col items-center text-center"
        >
          <div className="relative w-64 h-80 md:w-80 md:h-100 mb-8 overflow-hidden rounded-t-full shadow-2xl">
            <Image
              src="/images/hero/wedding-hero.jpg"
              alt="The Groom"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <h3 className="font-serif text-3xl mb-2">Amara Kumara</h3>
          <p className="text-foreground/60 uppercase tracking-widest text-xs mb-4">
            The Groom
          </p>
          <p className="text-sm font-light text-foreground/80 max-w-xs leading-relaxed">
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
    <Section id="story" className="bg-background">
      <div className="text-center mb-20">
        <FadeIn>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            Our Story
          </h2>
          <p className="uppercase tracking-[0.2em] text-xs md:text-sm text-foreground/60">
            A journey of love
          </p>
        </FadeIn>
      </div>

      <div className="relative max-w-4xl mx-auto px-6">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-primary/30 hidden md:block" />

        <div className="space-y-16 md:space-y-24">
          {timeline.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={item.year}
                className="relative flex flex-col md:flex-row items-center justify-between"
              >
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary hidden md:block shadow-[0_0_15px_rgba(201,162,39,0.6)] z-20" />
                <FadeIn
                  direction={isEven ? "right" : "left"}
                  className={`md:w-[45%] bg-secondary/5 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(201,162,39,0.15)] hover:-translate-y-1 border border-primary/20 relative z-10 transition-all duration-500 ${
                    isEven
                      ? "md:text-right"
                      : "md:order-last md:text-left text-center"
                  } text-center mb-12 md:mb-0 w-full`}
                >
                  <span className="text-primary font-serif text-7xl md:text-8xl opacity-15 absolute -top-10 -left-4 md:-left-8 select-none z-0 pointer-events-none">
                    {item.year}
                  </span>
                  <h3 className="font-serif text-3xl mb-4 relative z-10 text-foreground drop-shadow-sm">
                    {item.title}
                  </h3>
                  <p className="font-light text-foreground/80 text-sm md:text-base leading-relaxed relative z-10">
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
    <section className="relative py-32 overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/wedding-hero.jpg"
          alt="Countdown Background"
          fill
          className="object-cover object-center grayscale opacity-40 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-accent/90" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center w-full">
        <FadeIn>
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-12">
            Counting Down to Forever
          </h2>

          <div className="flex justify-center gap-4 md:gap-8 flex-wrap">
            {Object.entries(timeLeft).map(([label, value]) => (
              <div
                key={label}
                className="glass text-white w-24 h-24 md:w-32 md:h-32 flex flex-col items-center justify-center rounded-2xl"
              >
                <span className="font-serif text-3xl md:text-5xl mb-1">
                  {value}
                </span>
                <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] opacity-80">
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
    <Section id="schedule" className="bg-background">
      <div className="text-center mb-20">
        <FadeIn>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            Wedding Day
          </h2>
          <p className="uppercase tracking-[0.2em] text-xs md:text-sm text-foreground/60">
            The Agenda
          </p>
        </FadeIn>
      </div>

      <div className="relative max-w-4xl mx-auto px-6">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-primary/30 hidden md:block" />

        <div className="space-y-16 md:space-y-24">
          {scheduleItems.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={item.title}
                className="relative flex flex-col md:flex-row items-center justify-between"
              >
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary hidden md:block shadow-[0_0_15px_rgba(201,162,39,0.6)] z-20" />
                <FadeIn
                  direction={isEven ? "right" : "left"}
                  className={`md:w-[45%] bg-secondary/5 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(201,162,39,0.15)] hover:-translate-y-1 border border-primary/20 relative z-10 transition-all duration-500 ${
                    isEven
                      ? "md:text-right"
                      : "md:order-last md:text-left text-center"
                  } text-center mb-12 md:mb-0 w-full`}
                >
                  <p className="text-primary font-sans text-xs md:text-sm uppercase tracking-[0.3em] font-semibold mb-3">
                    {item.time}
                  </p>
                  <h3 className="font-serif text-3xl mb-4 relative z-10 text-foreground drop-shadow-sm">
                    {item.title}
                  </h3>
                  <p className="font-light text-foreground/80 text-sm md:text-base leading-relaxed relative z-10">
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

function VenueSection() {
  return (
    <Section id="venue" className="bg-background">
      <div className="text-center mb-16 md:mb-24">
        <FadeIn>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            The Venue
          </h2>
          <p className="uppercase tracking-[0.2em] text-xs md:text-sm text-foreground/60">
            Where the magic happens
          </p>
        </FadeIn>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
        <FadeIn
          direction="right"
          className="w-full lg:w-1/3 flex flex-col justify-center bg-white p-10 rounded-2xl shadow-xl border border-secondary/20"
        >
          <MapPin className="w-10 h-10 text-primary mb-6" />
          <h3 className="font-serif text-3xl mb-4">
            Waters Edge Grand Ballroom
          </h3>
          <p className="font-light text-foreground/70 mb-2">
            316 Ethul Kotte Road,
          </p>
          <p className="font-light text-foreground/70 mb-8">
            Battaramulla 10100, Sri Lanka.
          </p>

          <Button variant="secondary" className="w-fit self-start gap-2 group">
            <Navigation className="w-4 h-4 group-hover:animate-pulse" />
            Get Directions
          </Button>
        </FadeIn>

        <FadeIn
          direction="left"
          className="w-full lg:w-2/3 min-h-[24rem] md:min-h-[31.25rem] rounded-2xl overflow-hidden shadow-2xl relative bg-[#f4efe7]"
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
      className="bg-transparent overflow-hidden py-24 relative"
    >
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-[20%] left-[-10%] h-[40rem] w-[40rem] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[30rem] w-[30rem] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="text-center mb-16 md:mb-24 px-4">
        <FadeIn>
          <div className="mb-3 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-primary/70" />
            <p className="text-[10px] uppercase tracking-[0.45em] text-foreground/80">
              Captured Moments
            </p>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-primary/70" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4 tracking-[0.08em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            Our Gallery
          </h2>
        </FadeIn>
      </div>

      <div className="w-full relative py-12 md:py-20">
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#1a050b] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#1a050b] to-transparent z-20 pointer-events-none" />

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
                    className={`relative min-w-[280px] sm:min-w-[320px] md:min-w-[400px] flex-shrink-0 rounded-[2rem] overflow-hidden border border-primary/20 bg-secondary/30 shadow-[0_15px_30px_rgba(0,0,0,0.4)] ${img.aspect} ${isEven ? "-translate-y-6 md:-translate-y-10" : "translate-y-6 md:translate-y-10"}`}
                    whileHover={{ scale: 1.03, zIndex: 30 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 pointer-events-none" />
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover pointer-events-none transition-transform duration-1000 hover:scale-110"
                      sizes="(max-width: 768px) 80vw, 400px"
                    />
                    <div className="pointer-events-none absolute inset-[12px] rounded-[1.4rem] border border-primary/30 opacity-70" />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 z-20 flex flex-col justify-end p-8 pointer-events-auto">
                      <p className="text-white font-serif text-2xl tracking-widest translate-y-4 hover:translate-y-0 transition-transform duration-500">
                        {img.alt}
                      </p>
                      <div className="w-8 h-[1px] bg-primary mt-4 opacity-0 hover:opacity-100 transition-opacity duration-500 delay-100" />
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
    <Section id="dress-code" className="bg-secondary/10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <FadeIn direction="right" className="w-full md:w-1/2">
          <div className="relative w-full h-125 rounded-2xl overflow-hidden shadow-2xl">
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
          className="w-full md:w-1/2 text-center md:text-left"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
            Dress Code
          </h2>
          <p className="uppercase tracking-[0.2em] text-xs md:text-sm text-primary mb-8 font-medium">
            Black Tie Optional
          </p>
          <p className="font-light text-foreground/80 leading-relaxed mb-6">
            We request our guests to dress in formal attire. Gentlemen are
            encouraged to wear a tuxedo or a dark suit and tie. Ladies are
            encouraged to wear an evening gown or a formal cocktail dress.
          </p>
          <p className="font-light text-foreground/80 leading-relaxed">
            Please avoid wearing white, ivory, or any shades of the bridal
            colors. We appreciate your effort to make our special day elegant
            and memorable.
          </p>
        </FadeIn>
      </div>
    </Section>
  );
}

function RSVPSection() {
  return (
    <Section id="rsvp" className="bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-2xl mx-auto relative z-10 text-center">
        <FadeIn>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            RSVP
          </h2>
          <p className="uppercase tracking-[0.2em] text-xs md:text-sm text-foreground/60 mb-12">
            Kindly respond by October 1st, 2026
          </p>
        </FadeIn>

        <FadeIn
          delay={0.2}
          className="glass p-8 md:p-12 rounded-3xl text-left border border-primary/20 shadow-[0_20px_40px_rgba(0,0,0,0.05)]"
        >
          <form
            className="space-y-6"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="space-y-2">
              <label className="text-sm uppercase tracking-widest text-foreground/80 font-medium">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Mr. & Mrs. Smith"
                className="w-full bg-transparent border-b border-foreground/20 py-3 focus:outline-none focus:border-primary transition-colors text-lg"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm uppercase tracking-widest text-foreground/80 font-medium">
                Will you attend?
              </label>
              <div className="flex gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="w-5 h-5 rounded-full border border-primary flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-primary opacity-0 group-hover:opacity-50 transition-opacity" />
                  </div>
                  <span className="text-foreground/80 font-light">
                    Joyfully Accept
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="w-5 h-5 rounded-full border border-foreground/30 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-foreground/30 opacity-0 group-hover:opacity-50 transition-opacity" />
                  </div>
                  <span className="text-foreground/80 font-light">
                    Regretfully Decline
                  </span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm uppercase tracking-widest text-foreground/80 font-medium">
                Dietary Restrictions
              </label>
              <input
                type="text"
                placeholder="e.g. Vegetarian, Nut Allergy"
                className="w-full bg-transparent border-b border-foreground/20 py-3 focus:outline-none focus:border-primary transition-colors text-lg"
              />
            </div>

            <div className="pt-6 text-center">
              <Button
                type="button"
                variant="primary"
                className="w-full md:w-auto px-16"
              >
                Send RSVP
              </Button>
            </div>
          </form>
        </FadeIn>
      </div>
    </Section>
  );
}

function GuestWishesSection() {
  return (
    <Section id="wishes" className="bg-background">
      <div className="text-center mb-16 md:mb-24">
        <FadeIn>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            Guest Book
          </h2>
          <p className="uppercase tracking-[0.2em] text-xs md:text-sm text-foreground/60">
            Kind Words
          </p>
        </FadeIn>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {wishes.map((wish, index) => (
          <FadeIn
            key={wish.name}
            delay={index * 0.15}
            direction="up"
            className="p-8 rounded-2xl bg-white border border-secondary/20 shadow-lg hover:shadow-xl transition-shadow flex flex-col justify-between"
          >
            <p className="font-light text-foreground/80 italic mb-6 leading-relaxed">
              {wish.text}
            </p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center font-serif text-primary">
                {wish.name.charAt(0)}
              </div>
              <span className="font-medium text-sm text-foreground/90 uppercase tracking-wider">
                {wish.name}
              </span>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

export function WeddingInvitationTemplate() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowIntro(false), 5500);

    return () => window.clearTimeout(timer);
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
      <RSVPSection />
      <GuestWishesSection />
      <Footer />
    </main>
  );
}
