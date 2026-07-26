"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Send, Music, ShieldCheck, Heart, Sparkles, Volume2, VolumeX, Palette } from "lucide-react";

const themes = [
  { id: "gold", name: "Kandyan Gold", accent: "#E5B869", bgGradient: "from-[#E5B869]/20 to-transparent" },
  { id: "emerald", name: "Royal Emerald", accent: "#10b981", bgGradient: "from-[#10b981]/20 to-transparent" },
  { id: "rose", name: "Rose Romance", accent: "#f43f5e", bgGradient: "from-[#f43f5e]/20 to-transparent" },
  { id: "sapphire", name: "Ocean Sapphire", accent: "#3b82f6", bgGradient: "from-[#3b82f6]/20 to-transparent" },
];

export default function InteractivePreview() {
  const [activeTab, setActiveTab] = useState<"invitation" | "rsvp" | "map" | "music">("invitation");
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  return (
    <section id="interactive-preview" className="py-24 lg:py-36 bg-[#070707] relative overflow-hidden border-t border-[#141414]">
      {/* Background glow matching selected theme */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full blur-[160px] pointer-events-none transition-all duration-700"
        style={{ backgroundColor: `${selectedTheme.accent}15` }}
      />

      <div className="mx-auto max-w-7xl px-4 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E5B869]/30 bg-[#0d0d0d] text-[11px] font-semibold tracking-[0.25em] text-[#E5B869] uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Live Guest Experience Playground
          </div>
          <h2 className="heading-font text-4xl sm:text-5xl lg:text-6xl font-normal text-white">
            See How Your Guests <span className="italic" style={{ color: selectedTheme.accent }}>Experience It</span>
          </h2>
          <p className="mt-4 text-[#a3a3a3] text-sm sm:text-base font-light leading-relaxed">
            Switch color palettes below and test interactive invitation tabs in real time on the simulated smartphone.
          </p>

          {/* Theme Switcher Chips */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs text-[#777777] font-medium mr-2 flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-[#E5B869]" /> Live Theme Palette:
            </span>
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTheme(t)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 border ${
                  selectedTheme.id === t.id
                    ? "border-white bg-[#161616] text-white shadow-lg"
                    : "border-[#222222] bg-[#0a0a0a] text-[#888888] hover:border-white/40"
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: t.accent }} />
                <span>{t.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Phone & Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Feature Controls */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {[
              {
                id: "invitation",
                title: "Hero Reveal & Countdown",
                desc: "Live countdown timer, elegant Sinhala/English greetings, and luxury graphics.",
                icon: Calendar,
              },
              {
                id: "rsvp",
                title: "Instant RSVP & Google Sync",
                desc: "Instant guest responses synced directly to your personal Google Sheet in real time.",
                icon: Send,
              },
              {
                id: "map",
                title: "1-Tap Maps Location",
                desc: "Embedded map button guiding guests straight to Cinnamon Grand or your chosen venue.",
                icon: MapPin,
              },
              {
                id: "music",
                title: "Curated Audio Soundscape",
                desc: "High-fidelity flute & cello background instrumental music playing softly on reveal.",
                icon: Music,
              },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`text-left p-6 rounded-2xl border transition-all duration-300 relative group overflow-hidden ${
                    isActive
                      ? "bg-[#121212] shadow-xl"
                      : "border-[#1e1e1e] bg-[#0a0a0a]/60 hover:border-[#333333] hover:bg-[#0e0e0e]"
                  }`}
                  style={{ borderColor: isActive ? selectedTheme.accent : undefined }}
                >
                  {isActive && (
                    <div className="absolute top-0 left-0 bottom-0 w-1" style={{ backgroundColor: selectedTheme.accent }} />
                  )}
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl border transition-colors ${
                      isActive
                        ? "bg-[#161616]"
                        : "border-[#222222] bg-[#111111] text-[#777777] group-hover:text-white"
                    }`}
                    style={{ borderColor: isActive ? selectedTheme.accent : undefined, color: isActive ? selectedTheme.accent : undefined }}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className={`text-base font-medium tracking-wide transition-colors ${
                        isActive ? "text-white" : "text-[#aaaaaa] group-hover:text-white"
                      }`}>
                        {tab.title}
                      </h3>
                      <p className="text-xs text-[#777777] font-light mt-1.5 leading-relaxed">
                        {tab.desc}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Simulated Smartphone */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="relative w-full max-w-[340px] h-[640px] rounded-[48px] border-[8px] border-[#1c1c1c] bg-[#050505] shadow-2xl shadow-black overflow-hidden ring-1 ring-white/10">
              
              {/* Dynamic Island */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-4 rounded-full bg-black z-30 flex items-center justify-end px-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#111111] border border-[#222222]" />
              </div>

              {/* Dynamic Screen Content */}
              <div className="h-full w-full overflow-y-auto pt-10 pb-8 px-5 flex flex-col justify-between text-center relative z-20 transition-colors duration-500">
                
                <AnimatePresence mode="wait">
                  {/* TAB 1: HERO INVITATION */}
                  {activeTab === "invitation" && (
                    <motion.div
                      key="invitation"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center justify-between h-full py-4"
                    >
                      <div className="border px-3 py-1 rounded-full text-[9px] tracking-[0.25em] uppercase font-semibold" style={{ borderColor: `${selectedTheme.accent}60`, color: selectedTheme.accent }}>
                        Save The Date
                      </div>

                      <div className="my-auto py-6">
                        <p className="text-[10px] tracking-[0.3em] uppercase text-[#888888]">Together With Their Families</p>
                        <h3 className="heading-font text-3xl font-normal text-white mt-3 leading-tight">
                          Kasun <span className="italic" style={{ color: selectedTheme.accent }}>&amp;</span> Devmini
                        </h3>
                        <p className="text-[11px] text-[#aaaaaa] font-light mt-2 italic">Request the honor of your presence</p>
                        
                        {/* Countdown */}
                        <div className="grid grid-cols-4 gap-2 mt-8 border border-[#222222] bg-[#0c0c0c] p-3 rounded-xl">
                          {[
                            { val: "142", lbl: "DAYS" },
                            { val: "08", lbl: "HRS" },
                            { val: "45", lbl: "MIN" },
                            { val: "12", lbl: "SEC" },
                          ].map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center">
                              <span className="heading-font text-base font-bold" style={{ color: selectedTheme.accent }}>{item.val}</span>
                              <span className="text-[8px] text-[#666666] tracking-widest">{item.lbl}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="w-full pt-4 border-t border-[#1a1a1a]">
                        <p className="text-[11px] tracking-widest text-[#cccccc] uppercase">Cinnamon Grand Colombo</p>
                        <p className="text-[10px] text-[#777777]">Saturday, 14th November 2026</p>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 2: RSVP */}
                  {activeTab === "rsvp" && (
                    <motion.div
                      key="rsvp"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col justify-between h-full py-4 text-left"
                    >
                      <div>
                        <div className="text-center border-b border-[#1a1a1a] pb-4 mb-4">
                          <h4 className="heading-font text-xl text-white">R.S.V.P</h4>
                          <p className="text-[10px] text-[#777777] uppercase tracking-wider">Kindly Respond by October 1st</p>
                        </div>

                        {rsvpSubmitted ? (
                          <div className="py-12 text-center flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 border" style={{ backgroundColor: `${selectedTheme.accent}15`, borderColor: selectedTheme.accent, color: selectedTheme.accent }}>
                              <Heart className="w-6 h-6 fill-current" />
                            </div>
                            <h5 className="heading-font text-lg text-white">Thank You!</h5>
                            <p className="text-xs text-[#a3a3a3] mt-2">Your response has been saved &amp; synced to Google Sheets.</p>
                            <button
                              onClick={() => setRsvpSubmitted(false)}
                              className="mt-6 text-[10px] tracking-widest uppercase underline"
                              style={{ color: selectedTheme.accent }}
                            >
                              Test Again
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div>
                              <label className="text-[10px] text-[#888888] uppercase tracking-wider block mb-1">Your Full Name</label>
                              <input
                                type="text"
                                defaultValue="Kamal Perera"
                                className="w-full bg-[#0e0e0e] border border-[#222222] rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] text-[#888888] uppercase tracking-wider block mb-1">Will You Attend?</label>
                              <div className="grid grid-cols-2 gap-2">
                                <button className="border py-2 text-[10px] rounded-lg font-medium" style={{ borderColor: selectedTheme.accent, color: selectedTheme.accent, backgroundColor: `${selectedTheme.accent}15` }}>Joyfully Accept</button>
                                <button className="border border-[#222222] text-[#666666] py-2 text-[10px] rounded-lg">Regretfully Decline</button>
                              </div>
                            </div>
                            <div>
                              <label className="text-[10px] text-[#888888] uppercase tracking-wider block mb-1">Guest Count</label>
                              <select className="w-full bg-[#0e0e0e] border border-[#222222] rounded-lg px-3 py-2 text-xs text-white">
                                <option>2 Guests</option>
                                <option>1 Guest</option>
                              </select>
                            </div>
                            <button
                              onClick={() => setRsvpSubmitted(true)}
                              className="w-full text-black py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider mt-4 shadow-lg"
                              style={{ backgroundColor: selectedTheme.accent }}
                            >
                              Submit RSVP
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-center gap-1.5 text-[9px] text-[#555555] uppercase tracking-widest">
                        <ShieldCheck className="w-3 h-3" style={{ color: selectedTheme.accent }} /> Direct Google Sheets Integration
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 3: MAP */}
                  {activeTab === "map" && (
                    <motion.div
                      key="map"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col justify-between h-full py-4 text-center"
                    >
                      <div className="border-b border-[#1a1a1a] pb-3">
                        <span className="text-[9px] tracking-widest uppercase font-semibold" style={{ color: selectedTheme.accent }}>Location &amp; Directions</span>
                        <h4 className="heading-font text-lg text-white mt-1">The Oak Room</h4>
                        <p className="text-[10px] text-[#888888]">Cinnamon Grand, Colombo 03</p>
                      </div>

                      <div className="my-auto relative rounded-2xl overflow-hidden border border-[#222222] bg-[#0c0c0c] p-4 flex flex-col items-center justify-center min-h-[220px]">
                        <div className="w-12 h-12 rounded-full border flex items-center justify-center mb-3 animate-bounce" style={{ backgroundColor: `${selectedTheme.accent}15`, borderColor: selectedTheme.accent, color: selectedTheme.accent }}>
                          <MapPin className="w-6 h-6" />
                        </div>
                        <p className="text-xs text-white font-medium">Interactive Venue Pin</p>
                        <p className="text-[10px] text-[#777777] mt-1 max-w-[200px]">Opens natively in Google Maps or Waze on guests' devices</p>
                        <button className="mt-4 bg-[#1a1a1a] border border-[#333333] text-white text-[10px] uppercase tracking-wider px-4 py-2 rounded-full">
                          Open Map App
                        </button>
                      </div>

                      <div className="border-t border-[#1a1a1a] pt-3">
                        <p className="text-[10px] text-[#888888]">Cocktails: 5:30 PM • Ceremony: 6:30 PM</p>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 4: MUSIC SOUNDSCAPE */}
                  {activeTab === "music" && (
                    <motion.div
                      key="music"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col justify-between h-full py-4 text-center"
                    >
                      <div className="border-b border-[#1a1a1a] pb-3">
                        <span className="text-[9px] tracking-widest uppercase font-semibold" style={{ color: selectedTheme.accent }}>Background Soundscape</span>
                        <h4 className="heading-font text-lg text-white mt-1">Acoustic Romance</h4>
                      </div>

                      <div className="my-auto border border-[#222222] bg-[#0a0a0a] p-6 rounded-2xl flex flex-col items-center">
                        <button
                          onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                          className="w-16 h-16 rounded-full border flex items-center justify-center mb-4 transition-transform hover:scale-105"
                          style={{ backgroundColor: `${selectedTheme.accent}15`, borderColor: selectedTheme.accent, color: selectedTheme.accent }}
                        >
                          {isPlayingAudio ? <VolumeX className="w-7 h-7" /> : <Volume2 className="w-7 h-7" />}
                        </button>
                        
                        <span className="text-xs text-white font-medium">
                          {isPlayingAudio ? "Sound Playing..." : "Click to Test Sound"}
                        </span>
                        
                        <div className="flex items-center gap-1.5 mt-4">
                          {[40, 80, 30, 90, 50, 80, 40, 70, 100, 50, 30, 70].map((h, i) => (
                            <div
                              key={i}
                              className="w-1 rounded-full transition-all duration-300"
                              style={{
                                height: isPlayingAudio ? `${h / 4}px` : "6px",
                                backgroundColor: selectedTheme.accent,
                                animation: isPlayingAudio ? `pulse 1s infinite ${i * 0.1}s` : "none"
                              }}
                            />
                          ))}
                        </div>
                        <span className="text-[9px] text-[#666666] mt-3 uppercase tracking-widest">
                          {isPlayingAudio ? "Live Audio Soundscape Active" : "Tap button above to toggle"}
                        </span>
                      </div>

                      <div className="border-t border-[#1a1a1a] pt-3">
                        <p className="text-[10px] text-[#777777]">Guests can play or pause audio at any time</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
