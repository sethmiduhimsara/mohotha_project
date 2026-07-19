"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#222222] bg-[#050505]/90 backdrop-blur-xl transition-all">
      <div className="mx-auto w-full max-w-7xl px-4 lg:px-8">
        <nav className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <span className="heading-font text-2xl tracking-[0.2em] text-white transition-colors group-hover:text-[#CBA365]">
              MOHOTHA
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-10 lg:flex">
            {["Templates", "Features", "Pricing", "FAQ"].map(item => (
              <Link 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-xs font-medium tracking-[0.1em] text-[#a3a3a3] uppercase hover:text-[#CBA365] transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-6 lg:flex">
            <Link href="#contact" className="border border-[#333333] px-6 py-2.5 text-xs font-medium tracking-[0.1em] text-white uppercase hover:border-[#CBA365] hover:text-[#CBA365] transition-colors">
              Contact Studio
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button 
            className="lg:hidden p-2 text-[#a3a3a3]" 
            onClick={() => setMobileOpen(!mobileOpen)} 
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              {mobileOpen 
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/> 
                : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>}
            </svg>
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-20 left-0 w-full border-b border-[#222222] bg-[#050505] px-4 py-8 lg:hidden shadow-2xl">
          <div className="flex flex-col gap-6">
            {["Templates", "Features", "Pricing", "FAQ"].map(item => (
              <Link 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onClick={() => setMobileOpen(false)} 
                className="text-sm font-medium tracking-[0.1em] text-[#a3a3a3] uppercase hover:text-[#CBA365] transition-colors"
              >
                {item}
              </Link>
            ))}
            <div className="pt-8 mt-2 border-t border-[#222222] flex flex-col gap-4">
              <Link href="#contact" onClick={() => setMobileOpen(false)} className="text-sm font-medium tracking-[0.1em] text-[#CBA365] uppercase transition-colors">Contact Studio →</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}