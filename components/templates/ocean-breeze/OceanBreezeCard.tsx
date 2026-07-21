"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

export default function OceanBreezeCard() {
  // Using the exact target date from your team's logic[cite: 2]
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

  // Countdown timer logic[cite: 2]
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

  return (
    <section className="min-h-screen bg-[#f4f9f9] text-[#2c5263]">
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          {/* Recommend replacing with a beachy image! */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#87CEEB]/40 to-[#f4f9f9] z-0" />
          <Image
            src="/images/hero/wedding-hero1.jpg"
            alt="Beach Wedding hero background"
            fill
            priority
            className="object-cover object-center mix-blend-overlay opacity-60"
            sizes="100vw"
          />
        </div>

        <div className="relative z-10 flex min-h-screen flex-col">
          <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 text-[#2c5263] sm:px-6 lg:px-8">
            <p className="text-[10px] uppercase tracking-[0.45em] font-semibold">
              Umidu & Thimeth
            </p>
            <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.35em] font-semibold">
              <a href="#countdown" className="transition-colors hover:text-[#5fa8d3]">Details</a>
              <a href="#rsvp" className="transition-colors hover:text-[#5fa8d3]">RSVP</a>
            </div>
          </header>

          <div className="flex flex-1 items-center justify-center px-4 pb-16 pt-10 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-center text-[#1e3d4a]"
            >
              <div className="mx-auto mb-5 w-fit rounded-full border border-[#5fa8d3]/40 bg-white/40 px-5 py-2 text-[10px] uppercase tracking-[0.35em] backdrop-blur-md text-[#2c5263]">
                We&apos;re getting married
              </div>

              {/* Couple Names[cite: 2] */}
              <h1 className="font-serif text-6xl italic leading-none drop-shadow-sm sm:text-7xl lg:text-8xl text-[#1a5b73]">
                Umidu
                <br />
                <span className="text-4xl text-[#5fa8d3] font-light">&amp;</span>
                <br />
                Thimeth
              </h1>

              {/* Event Date[cite: 2] */}
              <p className="mt-6 text-lg font-semibold uppercase tracking-[0.2em] sm:text-2xl text-[#2c5263]">
                Friday, August 14, 2026
              </p>

              <p className="mt-8 text-[10px] uppercase tracking-[0.45em] text-[#5fa8d3]">
                Swipe down to dive in
              </p>
              
              <motion.div 
                animate={{ y: [0, 10, 0] }} 
                transition={{ repeat: Infinity, duration: 2 }}
                className="mt-4 text-3xl text-[#5fa8d3]"
              >
                ⌄
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section id="countdown" className="bg-[#eaf4f4] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <p className="font-serif text-3xl italic text-[#2c5263] sm:text-4xl">
            Counting Down to Our Beach Day
          </p>
          <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
            {countItems.map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-[#cce3e3] bg-white/60 backdrop-blur-sm px-4 py-8 shadow-[0_8px_30px_rgba(44,82,99,0.05)]"
              >
                <div className="font-serif text-4xl text-[#5fa8d3] sm:text-5xl">
                  {String(item.value).padStart(2, "0")}
                </div>
                <div className="mt-3 text-[10px] uppercase tracking-[0.3em] text-[#2c5263]/70">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP Section[cite: 2] */}
      <section id="rsvp" className="bg-[#fdfbf7] px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-serif text-4xl italic text-[#1a5b73] sm:text-5xl">
            RSVP
          </p>
          <p className="mt-3 text-sm text-[#2c5263]/70">
            Please respond so we can save you a seat by the sea. 🌊
          </p>

          <form className="mx-auto mt-12 grid gap-5 rounded-[2.5rem] border border-[#e2ecec] bg-white p-8 text-left shadow-[0_20px_50px_rgba(44,82,99,0.05)] sm:p-10">
            <input
              type="text"
              placeholder="Your name"
              className="rounded-2xl border border-[#e2ecec] bg-[#f8fafa] px-5 py-4 text-sm outline-none focus:border-[#5fa8d3] transition-colors"
            />
            <div className="grid gap-5 md:grid-cols-2">
              <select className="rounded-2xl border border-[#e2ecec] bg-[#f8fafa] px-5 py-4 text-sm outline-none focus:border-[#5fa8d3] text-[#2c5263]">
                <option>Will you attend?</option>
                <option>Joyfully Accept</option>
                <option>Regretfully Decline</option>
              </select>
              <input
                type="text"
                placeholder="Number of guests"
                className="rounded-2xl border border-[#e2ecec] bg-[#f8fafa] px-5 py-4 text-sm outline-none focus:border-[#5fa8d3]"
              />
            </div>
            <textarea
              rows={4}
              placeholder="Leave a message for the couple..."
              className="rounded-2xl border border-[#e2ecec] bg-[#f8fafa] px-5 py-4 text-sm outline-none focus:border-[#5fa8d3] transition-colors"
            />
            <button className="mt-2 rounded-2xl bg-[#5fa8d3] px-6 py-4 text-sm font-semibold tracking-widest uppercase text-white shadow-lg shadow-[#5fa8d3]/30 transition-all hover:bg-[#4a8eb8] hover:-translate-y-1">
              Send RSVP
            </button>
          </form>
        </div>
      </section>
    </section>
  );
}