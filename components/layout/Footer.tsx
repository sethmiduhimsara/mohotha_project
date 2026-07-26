"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowUp } from "lucide-react";

const links = {
  Platform: [
    { label: "The Collection", href: "#templates" },
    { label: "Interactive Demo", href: "#interactive-preview" },
    { label: "Capabilities", href: "#features" },
    { label: "Savings Calculator", href: "#calculator" },
    { label: "Pricing", href: "#pricing" },
  ],
  Studio: [
    { label: "Our Ethos", href: "#" },
    { label: "Google Sheets Setup", href: "#" },
    { label: "Privacy Core", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
  Connect: [
    { label: "studio@mohotha.lk", href: "mailto:studio@mohotha.lk" },
    { label: "WhatsApp Desk", href: "https://wa.me/94770000000" },
    { label: "Instagram (@mohotha.lk)", href: "#" },
  ],
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#050505] border-t border-[#141414] relative">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        
        <div className="py-20 grid grid-cols-2 gap-12 lg:grid-cols-4 border-b border-[#141414]">
          
          <div className="col-span-2 lg:col-span-1 flex flex-col justify-between">
            <div>
              <Link
                href="/"
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#CBA365]/40 bg-[#0c0c0c] flex items-center justify-center shadow-lg">
                  <Image
                    src="/images/mohotha-logo.png"
                    alt="MOHOTHA Logo"
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                </div>
                <span className="heading-font text-2xl tracking-[0.2em] text-white group-hover:text-[#CBA365] transition-colors">
                  MOHOTHA
                </span>
              </Link>
              <p className="mt-6 text-xs leading-relaxed text-[#777777] max-w-xs uppercase tracking-widest font-medium">
                Bespoke Digital Event Curation
                <br />
                Colombo 07, Sri Lanka
              </p>
            </div>

            <div className="mt-8">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 text-[10px] tracking-widest uppercase text-[#888888] hover:text-[#CBA365] transition-colors border border-[#222222] bg-[#090909] px-4 py-2 rounded-full"
              >
                <span>Back to Top</span>
                <ArrowUp className="w-3 h-3" />
              </button>
            </div>
          </div>
          
          {Object.entries(links).map(([cat, items]) => (
            <div key={cat}>
              <h4 className="mb-6 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#CBA365]">
                {cat}
              </h4>
              <ul className="space-y-3.5">
                {items.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-[#a3a3a3] hover:text-white transition-colors font-light tracking-wide"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
        </div>
        
        {/* Bottom copyright */}
        <div className="flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#666666]">
            © {new Date().getFullYear()} MOHOTHA STUDIO. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-[#CBA365] animate-ping" />
             <p className="text-[10px] uppercase tracking-[0.2em] text-[#777777]">
               Designed &amp; Engineered in Sri Lanka
             </p>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
