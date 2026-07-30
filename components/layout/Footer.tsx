"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowUp, Mail } from "lucide-react";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 448 512" fill="currentColor" className={className}>
    <path d="M448 209.91a210.06 210.06 0 0 1-122.77-39.25v178.72A162.55 162.55 0 1 1 185.85 188.31v89.89a74.62 74.62 0 1 0 52.23 71.18V0h88a121.18 121.18 0 0 0 1.86 22.17h.12A122.18 122.18 0 0 0 381 102.39a121.43 121.43 0 0 0 67 20.14Z"/>
  </svg>
);

const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

type LinkItem = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

const links: Record<string, LinkItem[]> = {
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
    { label: "Email", href: "mailto:contact.mohotha@gmail.com", icon: <Mail className="w-4 h-4" /> },
    { label: "TikTok", href: "https://www.tiktok.com/@mohotha?_r=1&_t=ZS-98NibCR1mOS", icon: <TikTokIcon className="w-4 h-4" /> },
    { label: "YouTube", href: "https://youtube.com/@mohotha_evemts?si=6kjZlg7nlfa67Z2U", icon: <YouTubeIcon className="w-4 h-4" /> },
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
                      className="flex items-center gap-2 text-xs text-[#a3a3a3] hover:text-white transition-colors font-light tracking-wide group"
                    >
                      {link.icon && <span className="text-[#666666] group-hover:text-[#CBA365] transition-colors">{link.icon}</span>}
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
        </div>
        
        {/* Bottom copyright */}
        <div className="flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#666666]" suppressHydrationWarning>
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
