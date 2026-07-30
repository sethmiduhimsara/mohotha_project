"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Share2, CheckCheck, Sparkles, Copy, Smartphone, ArrowRight, MessageSquare } from "lucide-react";

export default function WhatsAppPreview() {
  const [copied, setCopied] = useState(false);
  const [coupleName, setCoupleName] = useState("Amara & Nayana");

  // Clean slug generation (e.g. "Amara & Nayana" -> "mohotha.com/amara-and-nayana")
  const slug = coupleName
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "your-names";

  const invitationUrl = `mohotha.com/${slug}`;

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 lg:py-36 bg-[#070707] relative overflow-hidden border-t border-[#1a1a1a]">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[550px] h-[550px] bg-[#25D366]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#25D366]/30 bg-[#0d0d0d] text-[11px] font-semibold tracking-[0.25em] text-[#25D366] uppercase mb-4">
            <Share2 className="w-3.5 h-3.5" />
            Seamless Instant Distribution
          </div>
          <h2 className="heading-font text-4xl sm:text-5xl lg:text-6xl font-normal text-white">
            Designed for <span className="text-[#25D366] italic">WhatsApp &amp; iMessage</span>
          </h2>
          <p className="mt-4 text-[#a3a3a3] text-sm sm:text-base font-light">
            When you send your link to family and friends, WhatsApp displays a rich custom card with your couple photo and title.
          </p>
        </div>

        {/* WhatsApp Chat Simulator & Controls */}
        <div className="mx-auto max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Controls (Left) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E5B869] block mb-2">
                Live URL Preview Customizer
              </span>
              <p className="text-xs text-[#888888] mb-6">Type your couple names below to see your custom link in action:</p>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#aaaaaa] block mb-1.5 font-medium">
                    Couple Names
                  </label>
                  <input
                    type="text"
                    value={coupleName}
                    onChange={(e) => setCoupleName(e.target.value)}
                    placeholder="Amara & Nayana"
                    className="w-full bg-[#0e0e0e] border border-[#222222] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#25D366] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#aaaaaa] block mb-1.5 font-medium">
                    Your Personalized Link
                  </label>
                  <div className="flex items-center gap-2 bg-[#0e0e0e] border border-[#222222] rounded-xl p-2.5">
                    <span className="text-xs text-[#25D366] font-mono flex-1 truncate px-2">{invitationUrl}</span>
                    <button
                      onClick={handleCopy}
                      className="px-3 py-1.5 rounded-lg bg-[#25D366]/10 border border-[#25D366]/40 text-[#25D366] text-xs font-semibold flex items-center gap-1.5 hover:bg-[#25D366] hover:text-black transition-colors"
                    >
                      {copied ? <CheckCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Action Button to Start Creating Free */}
            <div className="mt-8 border-t border-[#1a1a1a] pt-6 space-y-4">
              <div className="flex items-center gap-3 text-xs text-[#cccccc]">
                <Sparkles className="w-4 h-4 text-[#E5B869]" />
                <span>Custom OpenGraph social image thumbnail</span>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <Link
                  href="#templates"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-xs font-bold uppercase tracking-wider text-black hover:bg-[#20bd5a] transition-colors shadow-lg shadow-[#25D366]/20"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Choose Template &amp; Order Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={`https://wa.me/94770000000?text=Hi%20Mohotha%20Studio!%20We%20would%20like%20to%20create%20a%20digital%20invitation%20for%20${encodeURIComponent(coupleName)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-[#25D366]/40 bg-[#0d0d0d] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#25D366] hover:bg-[#25D366]/10 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send to WhatsApp Studio</span>
                </a>
              </div>
            </div>
          </div>

          {/* Chat Mockup (Right) */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-[340px] rounded-3xl border border-[#222222] bg-[#0b141a] p-4 shadow-2xl relative overflow-hidden font-sans">
              
              {/* WhatsApp Header */}
              <div className="flex items-center gap-3 pb-3 border-b border-[#1f2c34]">
                <div className="w-9 h-9 rounded-full bg-[#128C7E] flex items-center justify-center text-white font-bold text-xs">
                  M
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Mohotha Wedding Desk</h4>
                  <span className="text-[9px] text-[#25D366]">online</span>
                </div>
              </div>

              {/* Chat Bubble */}
              <div className="mt-4 space-y-3">
                {/* Outgoing Message Card */}
                <div className="ml-auto max-w-[90%] bg-[#005c4b] text-white rounded-2xl rounded-tr-none p-3 shadow-md border border-[#02735e]">
                  
                  {/* OpenGraph Card inside WhatsApp */}
                  <div className="rounded-xl overflow-hidden bg-[#0c1014] border border-white/10 mb-2">
                    <div className="relative aspect-[16/9] w-full">
                      <Image
                        src="/images/hero/wedding-hero.jpg"
                        alt="Invitation Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-2.5">
                      <span className="text-[9px] uppercase tracking-widest text-[#E5B869] font-bold block">
                        MOHOTHA DIGITAL INVITATION
                      </span>
                      <h5 className="heading-font text-sm text-white mt-0.5">
                        {coupleName || "Amara & Nayana"} — Wedding Celebration
                      </h5>
                      <p className="text-[10px] text-[#8696a0] mt-1 line-clamp-1">
                        You are cordially invited to celebrate our wedding. Tap to open full invitation &amp; RSVP.
                      </p>
                      <span className="text-[9px] text-[#25D366] mt-1 block font-mono">
                        {invitationUrl}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs leading-relaxed font-light">
                    Dear Family &amp; Friends, we warmly invite you to share in our joy. Please tap the card above to view our invitation and RSVP! ❤️
                  </p>

                  <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-[#8696a0]">
                    <span>10:42 AM</span>
                    <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
