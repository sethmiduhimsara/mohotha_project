"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowUp, ArrowRight } from "lucide-react";

type LinkItem = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

// Original Colored SVGs
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 448 512" width="1em" height="1em" className={className}>
    <path fill="#000000" d="M448 209.91a210.06 210.06 0 0 1-122.77-39.25v178.72A162.55 162.55 0 1 1 185.85 188.31v89.89a74.62 74.62 0 1 0 52.23 71.18V0h88a121.18 121.18 0 0 0 1.86 22.17h.12A122.18 122.18 0 0 0 381 102.39a121.43 121.43 0 0 0 67 20.14Z"/>
    <path fill="#ffffff" d="M448 209.91a210.06 210.06 0 0 1-122.77-39.25v178.72A162.55 162.55 0 1 1 185.85 188.31v89.89a74.62 74.62 0 1 0 52.23 71.18V0h88a121.18 121.18 0 0 0 1.86 22.17h.12A122.18 122.18 0 0 0 381 102.39a121.43 121.43 0 0 0 67 20.14Z" style={{filter: 'drop-shadow(2px 2px 0px #ff0050) drop-shadow(-2px -2px 0px #00f2fe)'}} />
  </svg>
);

const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="#FF0000" width="1em" height="1em" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    <path fill="#ffffff" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const GmailIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" className={className}>
    <path fill="#EA4335" d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.943L12 8.411l8.073-4.897c1.618-1.235 3.927-.08 3.927 1.943z"/>
    <path fill="#4285F4" d="M22.364 21h-3.818v-9.273L24 5.457v13.909c0 .904-.732 1.636-1.636 1.636z"/>
    <path fill="#34A853" d="M1.636 21h3.819v-9.273L0 5.457v13.909c0 .904.732 1.636 1.636 1.636z"/>
    <path fill="#FBBC04" d="M18.545 11.727V21H24v-9.273l-5.455 4.09z"/>
    <path fill="#EA4335" d="M5.455 11.727V21H0v-9.273l5.455 4.09z"/>
    <path fill="#C5221F" d="M24 5.457L12 14.457 0 5.457c0-2.023 2.309-3.178 3.927-1.943L12 8.411l8.073-4.897c1.618-1.235 3.927-.08 3.927 1.943z"/>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="#1877F2" width="1em" height="1em" className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V7.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    <path fill="#ffffff" d="M16.671 15.543l.532-3.47h-3.328v-2.25c0-.949.465-1.874 1.956-1.874h1.514V5.002s-1.374-.235-2.686-.235c-2.741 0-4.533 1.662-4.533 4.669v2.636H7.078v3.47h3.047v8.385a12.09 12.09 0 0 0 3.75 0v-8.385h2.796z"/>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" className={className}>
    <defs>
      <radialGradient id="ig-grad" r="150%" cx="30%" cy="107%">
        <stop stopColor="#fdf497" offset="0" />
        <stop stopColor="#fdf497" offset="0.05" />
        <stop stopColor="#fd5949" offset="0.45" />
        <stop stopColor="#d6249f" offset="0.6" />
        <stop stopColor="#285AEB" offset="0.9" />
      </radialGradient>
    </defs>
    <path fill="url(#ig-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0z"/>
    <path fill="url(#ig-grad)" d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/>
    <circle fill="url(#ig-grad)" cx="18.406" cy="5.595" r="1.44"/>
  </svg>
);

const links: Record<string, LinkItem[]> = {
  Platform: [
    { label: "The Collection", href: "#templates" },
    { label: "Interactive Demo", href: "#interactive-preview" },
    { label: "Savings Calculator", href: "#calculator" },
    { label: "Pricing Packages", href: "#pricing" },
  ],
  Studio: [
    { label: "Contact Us", href: "#contact" },
  ],
};

const socials: LinkItem[] = [
  { label: "Email", href: "mailto:contact.mohotha@gmail.com", icon: <GmailIcon className="w-5 h-5" /> },
  { label: "TikTok", href: "https://www.tiktok.com/@mohotha?_r=1&_t=ZS-98NibCR1mOS", icon: <TikTokIcon className="w-5 h-5" /> },
  { label: "YouTube", href: "https://youtube.com/@mohotha_evemts?si=6kjZlg7nlfa67Z2U", icon: <YouTubeIcon className="w-5 h-5" /> },
  { label: "Facebook", href: "#", icon: <FacebookIcon className="w-5 h-5" /> },
  { label: "Instagram", href: "#", icon: <InstagramIcon className="w-5 h-5" /> },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#030303] relative border-t border-[#1a1a1a] overflow-hidden pt-24 pb-8">
      {/* Premium Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[1px] bg-gradient-to-r from-transparent via-[#CBA365]/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#CBA365]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 lg:px-8 relative z-10">
        
        {/* Top Huge Statement */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div>
            <h2 className="heading-font text-5xl sm:text-6xl lg:text-7xl font-normal text-white mb-4 tracking-wide leading-tight">
              Begin your <br />
              <span className="text-[#CBA365] italic">journey</span> here.
            </h2>
          </div>
          <button
            onClick={scrollToTop}
            className="group flex items-center justify-center w-16 h-16 rounded-full border border-[#222] bg-[#0a0a0a] hover:border-[#CBA365] hover:bg-[#CBA365]/10 transition-all duration-300"
          >
            <ArrowUp className="w-6 h-6 text-[#888] group-hover:text-[#CBA365] group-hover:-translate-y-1 transition-all duration-300" />
          </button>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 border-t border-[#111] pt-16 pb-20">
          
          {/* Brand Col */}
          <div className="md:col-span-5 lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-4 group mb-8">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#CBA365]/30 bg-[#0c0c0c] flex items-center justify-center shadow-lg shadow-[#CBA365]/5">
                <Image
                  src="/images/mohotha-logo.png"
                  alt="MOHOTHA Logo"
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="heading-font text-3xl tracking-[0.25em] text-white group-hover:text-[#CBA365] transition-colors">
                MOHOTHA
              </span>
            </Link>
            <p className="text-sm text-[#777] font-light leading-relaxed max-w-sm mb-8">
              Elevating Sri Lankan weddings with bespoke digital invitations. Seamless RSVPs, elegant designs, and unforgettable first impressions.
            </p>
            <div className="flex items-center gap-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-[#222] bg-[#0a0a0a] flex items-center justify-center text-[#888] hover:border-[#CBA365] hover:text-[#CBA365] hover:bg-[#CBA365]/10 transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-2"></div>

          {/* Links Cols */}
          <div className="md:col-span-7 lg:col-span-6 grid grid-cols-2 gap-8">
            {Object.entries(links).map(([cat, items]) => (
              <div key={cat}>
                <h4 className="mb-8 text-xs font-bold uppercase tracking-[0.3em] text-[#fff]">
                  {cat}
                </h4>
                <ul className="space-y-4">
                  {items.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group flex items-center text-sm text-[#888] hover:text-[#CBA365] transition-colors font-light"
                      >
                        <span className="relative overflow-hidden">
                          {link.label}
                          <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#CBA365] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-300" />
                        </span>
                        <ArrowRight className="w-3 h-3 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-[#111]">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#555] font-semibold" suppressHydrationWarning>
            © {new Date().getFullYear()} MOHOTHA STUDIO. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-3">
             <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CBA365] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#CBA365]"></span>
             </span>
             <p className="text-[10px] uppercase tracking-[0.2em] text-[#777]">
               Designed &amp; Engineered in Colombo, SL
             </p>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
