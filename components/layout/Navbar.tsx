"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#050505]/85 backdrop-blur-xl border-b border-[#222222]/80 py-4 shadow-2xl"
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto w-full max-w-7xl px-4 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group relative">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-lg overflow-hidden border border-[#CBA365]/40 bg-[#0c0c0c] transition-transform duration-500 group-hover:scale-105 group-hover:border-[#CBA365] shadow-lg shadow-[#CBA365]/10">
              <Image
                src="/images/mohotha-logo.png"
                alt="MOHOTHA Logo"
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="heading-font text-xl tracking-[0.2em] text-white transition-colors group-hover:text-[#CBA365]">
                MOHOTHA
              </span>
              <span className="text-[9px] tracking-[0.3em] uppercase text-[#777777] font-medium">
                Bespoke Digital Studio
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden items-center gap-8 rounded-full border border-[#222222]/80 bg-[#0a0a0a]/70 px-8 py-2.5 backdrop-blur-md lg:flex">
            {[
              { label: "Collection", href: "#templates" },
              { label: "Calculator", href: "#calculator" },
              { label: "Pricing", href: "#pricing" },
              { label: "Contact Us", href: "#contact" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative text-xs font-medium tracking-[0.12em] text-[#a3a3a3] uppercase transition-all duration-300 hover:text-[#CBA365] group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-[#CBA365] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-4 lg:flex">
            <Link
              href="#templates"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-[#CBA365]/40 bg-[#0d0d0d] px-6 py-2.5 text-xs font-medium tracking-[0.15em] text-white uppercase transition-all duration-500 hover:border-[#CBA365] hover:bg-[#CBA365] hover:text-[#050505] shadow-lg shadow-[#CBA365]/5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#CBA365] group-hover:text-[#050505] transition-colors" />
              <span>Explore Collection</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="lg:hidden relative p-2.5 text-white border border-[#222222] bg-[#0c0c0c] rounded-full hover:border-[#CBA365] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5 text-[#CBA365]" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </nav>
      </div>

      {/* Mobile Animated Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-full left-0 w-full border-b border-[#222222] bg-[#080808]/95 backdrop-blur-2xl px-6 py-8 lg:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-5">
              {[
                { label: "Collection", href: "#templates" },
                { label: "Calculator", href: "#calculator" },
                { label: "Pricing", href: "#pricing" },
                { label: "Contact Us", href: "#contact" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium tracking-[0.15em] text-[#cccccc] uppercase hover:text-[#CBA365] transition-colors py-2 border-b border-[#141414]"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <Link
                  href="#templates"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#CBA365] px-6 py-3.5 text-xs font-semibold tracking-[0.15em] text-[#050505] uppercase shadow-lg shadow-[#CBA365]/20"
                >
                  <Sparkles className="w-4 h-4" />
                  Explore Collection
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}