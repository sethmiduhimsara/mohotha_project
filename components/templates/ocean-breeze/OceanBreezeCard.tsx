"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion, Variants } from "framer-motion";   // Importing some slick minimalist beach icons from lucide-react! 🌴
import { Palmtree, Sun, Waves, Shell, Compass } from "lucide-react";

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

  // Core staggered animations
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  // Continuous ambient animations for the beach icons! 🌊
// Continuous ambient animations for the beach icons! 🌊
  // Continuous ambient animations for the beach icons! 🌊
  const floatAnimation: any = {
    y: [-10, 10, -10],
    rotate: [-5, 5, -5],
    transition: { repeat: Infinity, duration: 6, ease: "easeInOut" }
  };

  const waveAnimation: any = {
    x: [-15, 15, -15],
    transition: { repeat: Infinity, duration: 8, ease: "easeInOut" }
  };

  return (
    <section className="min-h-screen bg-[#f4f9f9] text-[#2c5263] overflow-hidden">
      
      {/* 🌊 HERO SECTION 🌊 */}
      <section className="relative min-h-screen overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#87CEEB]/30 via-transparent to-[#f4f9f9] z-10" />
          <Image
            src="/images/hero/ocean-breeze 1.png"
            alt="Beach Wedding hero background"
            fill
            priority
            className="object-cover object-center opacity-80"
            sizes="100vw"
          />
        </motion.div>

        <div className="relative z-20 flex min-h-screen flex-col">
          <motion.header 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-6 text-[#1a5b73] sm:px-6 lg:px-8"
          >
            <p className="text-[10px] uppercase tracking-[0.45em] font-semibold drop-shadow-sm">
              Umidu & Thimeth
            </p>
            <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.35em] font-semibold">
              <a href="#couple" className="transition-all hover:text-white hover:drop-shadow-md">Couple</a>
              <a href="#rsvp" className="transition-all hover:text-white hover:drop-shadow-md">RSVP</a>
            </div>
          </motion.header>

          <div className="flex flex-1 items-center justify-center px-4 pb-16 pt-10 sm:px-6 lg:px-8 relative">
            
            {/* Animated Floating Sun in Hero */}
            <motion.div
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 2, delay: 1 }}
              className="absolute top-10 right-10 md:top-20 md:right-32 text-white/40 pointer-events-none"
            >
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 40, ease: "linear" }}>
                <Sun size={120} strokeWidth={0.5} />
              </motion.div>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="text-center text-[#1e3d4a] relative z-10"
            >
              <motion.div variants={fadeUp} className="mx-auto mb-6 w-fit rounded-full border border-white/40 bg-white/30 px-6 py-2 text-[10px] uppercase tracking-[0.35em] backdrop-blur-md text-[#1a5b73] shadow-lg shadow-black/5">
                We&apos;re getting married
              </motion.div>

              <motion.h1 variants={fadeUp} className="font-serif text-6xl italic leading-none drop-shadow-md sm:text-7xl lg:text-9xl text-white">
                Umidu
                <br />
                <span className="text-5xl text-[#87CEEB] font-light drop-shadow-sm">&amp;</span>
                <br />
                Thimeth
              </motion.h1>

              <motion.p variants={fadeUp} className="mt-8 text-lg font-medium uppercase tracking-[0.25em] sm:text-2xl text-white drop-shadow-md">
                Friday, August 14, 2026
              </motion.p>

              <motion.div variants={fadeUp} className="mt-12 flex flex-col items-center">
                <p className="text-[10px] uppercase tracking-[0.45em] text-white/80 mb-2">
                  Scroll to discover
                </p>
                <motion.div 
                  animate={{ y: [0, 8, 0] }} 
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="text-2xl text-white/80"
                >
                  ↓
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ✨ THE HAPPY COUPLE SECTION ✨ */}
      <section id="couple" className="relative bg-white px-4 py-24 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#eaf4f4] rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
        
        {/* Animated Floating Shell */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 0.2, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="absolute bottom-20 left-10 text-[#5fa8d3] pointer-events-none hidden lg:block"
        >
          <motion.div animate={floatAnimation}>
            <Shell size={100} strokeWidth={1} />
          </motion.div>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mx-auto max-w-6xl relative z-10"
        >
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div variants={fadeUp} className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(44,82,99,0.15)]">
                <Image
                  src="/images/hero/ocean-breeze 2.jpeg"
                  alt="Umidu and Thimeth"
                  fill
                  className="object-cover object-center transition-transform duration-1000 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              
              <motion.div 
                animate={{ y: [-5, 5, -5] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -bottom-8 -right-8 md:-right-12 rounded-full bg-[#f4f9f9] p-6 shadow-xl border border-white"
              >
                <div className="h-16 w-16 rounded-full border border-[#5fa8d3]/30 flex items-center justify-center">
                  <span className="text-2xl">🤍</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeUp} className="text-center lg:text-left lg:pl-10">
              <h2 className="font-serif text-4xl italic text-[#1a5b73] sm:text-5xl lg:text-6xl mb-6 flex items-center justify-center lg:justify-start gap-4">
                The Happy Couple
              </h2>
              <p className="text-base leading-relaxed text-[#2c5263]/80 mb-8">
                From our first walk on the beach to building our dreams together, every moment has brought us closer to this day. We can&apos;t wait to celebrate our love story with our favorite people by the sea.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8 text-[#1a5b73]">
                <div className="text-center lg:text-left">
                  <div className="font-serif italic text-3xl">Umidu</div>
                  <div className="mt-2 text-[10px] uppercase tracking-[0.35em] text-[#5fa8d3]">The Groom</div>
                </div>
                <div className="text-[#87CEEB] text-2xl font-light">|</div>
                <div className="text-center lg:text-left">
                  <div className="font-serif italic text-3xl">Thimeth</div>
                  <div className="mt-2 text-[10px] uppercase tracking-[0.35em] text-[#5fa8d3]">The Bride</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 📖 OUR LOVE STORY SECTION 📖 */}
      <section className="relative bg-[#f4f9f9] px-4 py-24 sm:px-6 lg:px-8 border-y border-[#e2ecec] overflow-hidden">
        
        {/* Animated Background Waves */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.15 }}
          viewport={{ once: true }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#5fa8d3] pointer-events-none"
        >
          <motion.div animate={waveAnimation}>
            <Waves size={300} strokeWidth={0.5} />
          </motion.div>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="relative mx-auto max-w-4xl text-center z-10"
        >
          <motion.p variants={fadeUp} className="font-serif text-4xl italic text-[#1a5b73] sm:text-5xl">
            Our Love Story
          </motion.p>
          <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#2c5263]/80">
            First a silent beginning, then a beautiful journey together. Our hearts found home, and now we celebrate our forever.
          </motion.p>

          <motion.div variants={fadeUp} className="mx-auto mt-12 max-w-3xl rounded-[2.5rem] border border-white bg-white/70 p-10 shadow-[0_20px_50px_rgba(44,82,99,0.05)] backdrop-blur-md">
            <p className="text-sm leading-loose text-[#1a5b73] sm:text-base font-medium">
              From our first glance to our shared dreams, every moment brought
              us closer. We invite you to be part of this unforgettable day,
              where love, family, and joy come together.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ⏳ COUNTDOWN SECTION ⏳ */}
      <section id="countdown" className="relative bg-[#eaf4f4] px-4 py-24 sm:px-6 lg:px-8">
        
        {/* Animated Palm Tree in the corner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 0.15, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="absolute top-10 right-10 text-[#5fa8d3] pointer-events-none hidden md:block"
        >
          <motion.div animate={{ rotate: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}>
            <Palmtree size={150} strokeWidth={0.5} />
          </motion.div>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="relative mx-auto max-w-6xl text-center z-10"
        >
          <motion.p variants={fadeUp} className="font-serif text-3xl italic text-[#1a5b73] sm:text-5xl mb-4">
            Counting Down to Forever
          </motion.p>
          <motion.p variants={fadeUp} className="text-[11px] uppercase tracking-[0.3em] text-[#5fa8d3] font-semibold">
            See you at the shore
          </motion.p>

          <motion.div variants={staggerContainer} className="mt-14 grid grid-cols-2 gap-4 md:gap-8 md:grid-cols-4">
            {countItems.map((item, index) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="rounded-3xl border border-white bg-white/70 backdrop-blur-md px-4 py-10 shadow-[0_15px_35px_rgba(44,82,99,0.06)]"
              >
                <div className="font-serif text-5xl text-[#5fa8d3] sm:text-6xl drop-shadow-sm">
                  {String(item.value).padStart(2, "0")}
                </div>
                <div className="mt-4 text-[10px] uppercase tracking-[0.35em] text-[#2c5263] font-medium">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* 🗺️ WEDDING DETAILS SECTION 🗺️ */}
      <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mx-auto max-w-6xl"
        >
          <div className="text-center">
            <motion.p variants={fadeUp} className="font-serif text-4xl italic text-[#1a5b73] sm:text-5xl">
              Wedding Details
            </motion.p>
            <motion.p variants={fadeUp} className="mt-4 text-[10px] uppercase tracking-[0.35em] text-[#5fa8d3] font-semibold">
              All the important information you need to celebrate with us
            </motion.p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <motion.div variants={fadeUp} className="rounded-[3rem] border border-[#e2ecec] bg-[#f8fafa] p-10 shadow-[0_20px_50px_rgba(44,82,99,0.05)] h-full flex flex-col justify-center relative overflow-hidden">
              
              {/* Subtle Compass Background in the card */}
              <div className="absolute -bottom-10 -right-10 text-[#5fa8d3]/10 pointer-events-none">
                <Compass size={200} strokeWidth={1} />
              </div>

              <div className="relative z-10 space-y-8 text-sm text-[#2c5263]">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.35em] text-[#5fa8d3] font-bold">
                    Ceremony
                  </div>
                  <div className="mt-2 font-serif text-3xl text-[#1a5b73]">5:00 PM</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.35em] text-[#5fa8d3] font-bold">
                    Venue
                  </div>
                  <div className="mt-2 font-serif text-3xl text-[#1a5b73]">
                    Waters Edge Grand Ballroom
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.35em] text-[#5fa8d3] font-bold">
                    Dress Code
                  </div>
                  <div className="mt-2 font-serif text-3xl text-[#1a5b73]">
                    Formal / Elegant
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-12 flex justify-start">
                <button className="rounded-2xl bg-[#1a5b73] px-8 py-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-white shadow-xl shadow-[#1a5b73]/20 transition-all hover:bg-[#144659] hover:-translate-y-1">
                  Map Directions
                </button>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="overflow-hidden rounded-[3rem] border border-white shadow-[0_20px_50px_rgba(44,82,99,0.1)] h-full min-h-[400px]">
              <div className="relative h-full w-full">
                <Image
                  src="/images/hero/ocean-breeze 1.png"
                  alt="Wedding venue"
                  fill
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ⏱️ WEDDING DAY TIMELINE SECTION ⏱️ */}
      <section className="bg-[#eaf4f4] px-4 py-24 sm:px-6 lg:px-8 border-y border-white">
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.p variants={fadeUp} className="font-serif text-4xl italic text-[#1a5b73] sm:text-5xl">
            Wedding Day Timeline
          </motion.p>
          
          <div className="mx-auto mt-16 max-w-2xl space-y-12 text-left relative before:absolute before:inset-0 before:ml-10 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#5fa8d3]/40 before:to-transparent">
            {[
              ["01 PM", "Family Ceremony", "Traditional beginning of the day"],
              ["05 PM", "Reception", "Dinner, speeches, and celebration"],
              ["08 PM", "After Party", "Music, dancing, and joy"],
            ].map(([time, title, note], i) => (
              <motion.div key={title} variants={fadeUp} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-20 h-20 rounded-full border-4 border-white bg-[#f4f9f9] text-[#5fa8d3] shadow-lg shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                   <span className="text-xs font-bold tracking-[0.2em]">{time}</span>
                </div>
                <div className="w-full rounded-[2rem] border border-white bg-white/60 p-6 shadow-sm backdrop-blur-sm md:w-[45%] md:group-odd:text-right">
                  <div className="font-serif text-2xl italic text-[#1a5b73]">
                    {title}
                  </div>
                  <div className="mt-2 text-sm font-medium text-[#2c5263]/80">{note}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 🕊️ A NOTE TO OUR LOVED ONES SECTION 🕊️ */}
      <section className="bg-[#f4f9f9] px-4 py-24 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.p variants={fadeUp} className="font-serif text-4xl italic text-[#1a5b73] sm:text-5xl">
            A Note to Our Loved Ones
          </motion.p>
          <motion.div variants={fadeUp} className="mx-auto mt-10 max-w-3xl rounded-[2.5rem] border border-[#e2ecec] bg-white p-10 shadow-[0_20px_50px_rgba(44,82,99,0.04)]">
            <p className="text-sm leading-loose text-[#2c5263] font-medium">
              Your presence will make our day complete. Thank you for being a
              part of our journey and for sharing in the joy of our celebration.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* 💌 RSVP SECTION 💌 */}
      <section id="rsvp" className="bg-[#fdfbf7] px-4 py-24 sm:px-6 lg:px-8 border-t border-[#e2ecec] relative overflow-hidden">
        
        {/* Animated Background Shells in RSVP */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.15 }}
          viewport={{ once: true }}
          className="absolute -top-10 -left-10 text-[#5fa8d3] pointer-events-none"
        >
          <motion.div animate={floatAnimation}>
            <Shell size={120} strokeWidth={1} className="-rotate-12" />
          </motion.div>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="relative mx-auto max-w-4xl text-center z-10"
        >
          <motion.p variants={fadeUp} className="font-serif text-4xl italic text-[#1a5b73] sm:text-6xl">
            RSVP
          </motion.p>
          <motion.p variants={fadeUp} className="mt-4 text-sm text-[#2c5263]/70">
            Please respond so we can save you a seat by the sea. 🌴
          </motion.p>

          <motion.form variants={fadeUp} className="mx-auto mt-14 grid gap-5 rounded-[2.5rem] border border-[#e2ecec] bg-white p-8 text-left shadow-[0_30px_60px_rgba(44,82,99,0.08)] sm:p-12">
            <input
              type="text"
              placeholder="Your name"
              className="rounded-2xl border border-[#e2ecec] bg-[#f8fafa] px-5 py-4 text-sm outline-none focus:border-[#5fa8d3] focus:ring-1 focus:ring-[#5fa8d3] transition-all"
            />
            <div className="grid gap-5 md:grid-cols-2">
              <select className="rounded-2xl border border-[#e2ecec] bg-[#f8fafa] px-5 py-4 text-sm outline-none focus:border-[#5fa8d3] focus:ring-1 focus:ring-[#5fa8d3] text-[#2c5263] transition-all cursor-pointer">
                <option>Will you attend?</option>
                <option>Joyfully Accept 🥂</option>
                <option>Regretfully Decline 🤍</option>
              </select>
              <input
                type="number"
                placeholder="Number of guests"
                className="rounded-2xl border border-[#e2ecec] bg-[#f8fafa] px-5 py-4 text-sm outline-none focus:border-[#5fa8d3] focus:ring-1 focus:ring-[#5fa8d3] transition-all"
              />
            </div>
            <textarea
              rows={4}
              placeholder="Leave a message for the couple..."
              className="rounded-2xl border border-[#e2ecec] bg-[#f8fafa] px-5 py-4 text-sm outline-none focus:border-[#5fa8d3] focus:ring-1 focus:ring-[#5fa8d3] transition-all resize-none"
            />
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4 rounded-2xl bg-[#1a5b73] px-6 py-4 text-[11px] font-semibold tracking-widest uppercase text-white shadow-xl shadow-[#1a5b73]/20 transition-all hover:bg-[#144659]"
            >
              Send RSVP
            </motion.button>
          </motion.form>
        </motion.div>
      </section>

      {/* Footer Buffer */}
      <div className="h-12 bg-[#fdfbf7]" />
    </section>
  );
}