"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

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

  return (
    <section className="min-h-screen bg-[#fbf5ed] text-[#7f5531]">
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/wedding-hero1.jpg"
            alt="Wedding hero background"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(23,18,11,0.18),rgba(23,18,11,0.42),rgba(251,245,237,0.92))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_40%)]" />
        </div>

        <div className="relative z-10 flex min-h-screen flex-col">
          <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 text-white/90 sm:px-6 lg:px-8">
            <p className="text-[10px] uppercase tracking-[0.45em]">
              Umidu & Thimeth
            </p>
            <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.35em]">
              <a href="#countdown" className="transition-colors hover:text-white">
                Details
              </a>
              <a href="#rsvp" className="transition-colors hover:text-white">
                RSVP
              </a>
            </div>
          </header>

          <div className="flex flex-1 items-center justify-center px-4 pb-16 pt-10 sm:px-6 lg:px-8">
            <div className="text-center text-white">
              <div className="mx-auto mb-5 w-fit rounded-full border border-white/20 bg-white/10 px-5 py-2 text-[10px] uppercase tracking-[0.35em] backdrop-blur-md">
                We&apos;re getting married
              </div>

              <h1 className="font-serif text-6xl italic leading-none drop-shadow-[0_10px_25px_rgba(0,0,0,0.18)] sm:text-7xl lg:text-8xl">
                Umidu
                <br />
                &amp;
                <br />
                Thimeth
              </h1>

              <p className="mt-4 text-lg font-semibold uppercase tracking-[0.2em] sm:text-2xl">
                Friday, August 14, 2026
              </p>

              <p className="mt-4 text-[10px] uppercase tracking-[0.45em] text-white/80">
                Swipe up for more
              </p>

              <div className="mt-2 text-2xl text-white">⌄</div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="countdown"
        className="border-t border-[#f2dfc0] bg-[#fff7ef] px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-6xl text-center">
          <p className="font-serif text-3xl italic text-[#b77a4b] sm:text-4xl">
            Counting Down to Forever
          </p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.35em] text-[#b08a5a]">
            28 days until we are married
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {countItems.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-[#eadbc1] bg-white px-4 py-5 shadow-[0_12px_30px_rgba(143,90,45,0.08)]"
              >
                <div className="font-serif text-4xl text-[#b66a2f] sm:text-5xl">
                  {String(item.value).padStart(2, "0")}
                </div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.3em] text-[#b08a5a]">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <button className="rounded-full border border-[#e2cfae] bg-[#fffaf4] px-6 py-3 text-[10px] uppercase tracking-[0.35em] text-[#b07a42] shadow-[0_10px_24px_rgba(143,90,45,0.08)] transition-colors hover:bg-[#f7ebdb]">
              Add to Google Calendar
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="font-serif text-4xl italic text-[#b77a4b] sm:text-5xl">
            The Happy Couple
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#6f5d49]">
            So many reasons to rejoice. We will be united forever, in love and
            with celebrated joy.
          </p>

          <div className="mt-12 flex flex-col items-center gap-6">
            <div className="relative h-72 w-56 overflow-hidden rounded-[7rem] border-4 border-[#e6c85f] bg-[#f6efe4] shadow-[0_18px_40px_rgba(143,90,45,0.12)] sm:h-80 sm:w-64">
              <Image
                src="/images/hero/wedding-hero1.jpg"
                alt="Bride and groom"
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 70vw, 256px"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(255,255,255,0.08),rgba(255,255,255,0.16))]" />
            </div>

            <div className="flex items-center gap-8 text-sm text-[#b77a4b] sm:text-base">
              <div>
                <div className="font-serif italic text-2xl text-[#b66a2f]">Umidu</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.35em]">The Groom</div>
              </div>
              <div className="text-[#c6a96e]">&amp;</div>
              <div>
                <div className="font-serif italic text-2xl text-[#b66a2f]">Thimeth</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.35em]">The Bride</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#f2dfc0] bg-[#f6efe5] px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-serif text-4xl italic text-[#d0b18a] sm:text-5xl">
            Our Love Story
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#8c755b]">
            First a silent beginning, then a beautiful journey together. Our
            hearts found home, and now we celebrate our forever.
          </p>

          <div className="mx-auto mt-10 max-w-3xl rounded-[2rem] border border-[#ead7ba] bg-white/60 p-8 shadow-[0_18px_45px_rgba(143,90,45,0.08)]">
            <p className="text-sm leading-loose text-[#7f6248] sm:text-base">
              From our first glance to our shared dreams, every moment brought
              us closer. We invite you to be part of this unforgettable day,
              where love, family, and joy come together.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#fff8f0] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="font-serif text-4xl italic text-[#b77a4b] sm:text-5xl">
              Wedding Details
            </p>
            <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-[#b08a5a]">
              All the important information you need to celebrate with us
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="rounded-[2.5rem] border border-[#e6cfab] bg-white p-8 shadow-[0_20px_50px_rgba(143,90,45,0.08)]">
              <div className="space-y-6 text-sm text-[#7b634a]">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.35em] text-[#b08a5a]">
                    Ceremony
                  </div>
                  <div className="mt-2 font-serif text-2xl text-[#b66a2f]">5:00 PM</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.35em] text-[#b08a5a]">
                    Venue
                  </div>
                  <div className="mt-2 font-serif text-2xl text-[#b66a2f]">
                    Waters Edge Grand Ballroom
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.35em] text-[#b08a5a]">
                    Dress Code
                  </div>
                  <div className="mt-2 font-serif text-2xl text-[#b66a2f]">
                    Formal / Elegant
                  </div>
                </div>
              </div>

              <div className="mt-10 flex justify-center">
                <button className="rounded-full bg-[#d6b75b] px-5 py-2 text-[10px] uppercase tracking-[0.35em] text-white shadow-[0_10px_24px_rgba(214,183,91,0.4)]">
                  Map Directions
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2.5rem] border border-[#e6cfab] bg-[#f5ebd8] shadow-[0_20px_50px_rgba(143,90,45,0.08)]">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/hero/wedding-hero1.jpg"
                  alt="Wedding venue"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fbf4ea] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="font-serif text-4xl italic text-[#d0b18a] sm:text-5xl">
            Wedding Day Timeline
          </p>
          <div className="mx-auto mt-10 max-w-2xl space-y-10 text-left">
            {[
              ["01 PM", "Family Ceremony", "Traditional beginning of the day"],
              ["05 PM", "Reception", "Dinner, speeches, and celebration"],
              ["08 PM", "After Party", "Music, dancing, and joy"],
            ].map(([time, title, note]) => (
              <div key={title} className="grid grid-cols-[80px_1fr] items-start gap-5">
                <div className="text-sm font-semibold tracking-[0.25em] text-[#d0b18a]">
                  {time}
                </div>
                <div>
                  <div className="font-serif text-2xl italic text-[#b66a2f]">
                    {title}
                  </div>
                  <div className="mt-2 text-sm text-[#7b634a]">{note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-serif text-4xl italic text-[#b77a4b] sm:text-5xl">
            A Note to Our Loved Ones
          </p>
          <div className="mx-auto mt-10 max-w-2xl rounded-[2rem] border border-[#e6cfab] bg-[#fff8f0] p-8 shadow-[0_20px_50px_rgba(143,90,45,0.08)]">
            <p className="text-sm leading-loose text-[#7b634a]">
              Your presence will make our day complete. Thank you for being a
              part of our journey and for sharing in the joy of our celebration.
            </p>
          </div>
        </div>
      </section>

      <section
        id="rsvp"
        className="bg-[#fbf6ef] px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-5xl text-center">
          <p className="font-serif text-4xl italic text-[#b77a4b] sm:text-5xl">
            RSVP
          </p>
          <p className="mt-3 text-sm text-[#8c755b]">
            Please respond at your earliest convenience so we can prepare with
            love.
          </p>

          <form className="mx-auto mt-10 grid gap-4 rounded-[2rem] border border-[#ead7ba] bg-white p-6 text-left shadow-[0_20px_50px_rgba(143,90,45,0.08)] sm:p-8">
            <input
              type="text"
              placeholder="Your name"
              className="rounded-xl border border-[#ead7ba] bg-[#fffdf9] px-4 py-3 text-sm outline-none focus:border-[#d0b18a]"
            />
            <div className="grid gap-4 md:grid-cols-2">
              <select className="rounded-xl border border-[#ead7ba] bg-[#fffdf9] px-4 py-3 text-sm outline-none focus:border-[#d0b18a]">
                <option>Will you attend?</option>
                <option>Joyfully Accept</option>
                <option>Regretfully Decline</option>
              </select>
              <input
                type="text"
                placeholder="Number of guests"
                className="rounded-xl border border-[#ead7ba] bg-[#fffdf9] px-4 py-3 text-sm outline-none focus:border-[#d0b18a]"
              />
            </div>
            <textarea
              rows={4}
              placeholder="Message"
              className="rounded-xl border border-[#ead7ba] bg-[#fffdf9] px-4 py-3 text-sm outline-none focus:border-[#d0b18a]"
            />
            <button className="rounded-xl bg-[#d6b75b] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(214,183,91,0.35)] transition-colors hover:bg-[#caa844]">
              Send RSVP
            </button>
          </form>
        </div>
      </section>

      {/* <section className="bg-[#a9954b] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <p className="font-serif text-4xl italic sm:text-5xl">With Love &amp; Gratitude</p>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/85">
            Thank you for being with us on this very special occasion. We look
            forward to celebrating together.
          </p>

          <div className="mt-12 grid gap-8 text-left md:grid-cols-3">
            <div>
              <div className="text-[10px] uppercase tracking-[0.4em] text-white/75">
                Quick Links
              </div>
              <div className="mt-4 space-y-2 text-sm text-white/85">
                <div>Home</div>
                <div>RSVP</div>
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.4em] text-white/75">
                Wedding Details
              </div>
              <div className="mt-4 space-y-2 text-sm text-white/85">
                <div>Friday, August 14th</div>
                <div>Waters Edge, Sri Lanka</div>
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.4em] text-white/75">
                Contact
              </div>
              <div className="mt-4 space-y-2 text-sm text-white/85">
                <div>Umidu</div>
                <div>+94 77 123 4567</div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <div className="h-10 bg-[#fbf6ef]" />
    </section>
  );
}