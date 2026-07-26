"use client";
import { motion, type Variants } from "framer-motion";
import { Sparkles, Smartphone, Database, MapPin, Music, QrCode, Share2, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    numeral: "01",
    title: "Curated Heritage Aesthetics",
    description: "Deeply inspired by Sri Lankan cultural motifs, reimagined into contemporary digital perfection.",
  },
  {
    icon: Smartphone,
    numeral: "02",
    title: "Flawless Mobile Display",
    description: "Engineered specifically for smartphone displays. Fast loading, responsive layouts with zero shifted elements.",
  },
  {
    icon: Database,
    numeral: "03",
    title: "Google Sheets Auto-Sync",
    description: "Guest RSVPs automatically sync directly to your private Google Sheet in real time. No manual export needed.",
  },
  {
    icon: MapPin,
    numeral: "04",
    title: "1-Tap GPS Venue Maps",
    description: "Embedded Google Maps buttons take your guests directly to your wedding & reception halls without confusion.",
  },
  {
    icon: Music,
    numeral: "05",
    title: "Auditory Soundscape",
    description: "Enhance the reveal with high-fidelity, curated instrumental background audio playing softly on reveal.",
  },
  {
    icon: Share2,
    numeral: "06",
    title: "Instant WhatsApp Share",
    description: "Includes rich social graph cards when sent via WhatsApp, Viber, or iMessage with custom couple thumbnail.",
  },
];

export default function Features() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring" as const, stiffness: 45, damping: 20 } 
    },
  };

  return (
    <section id="features" className="py-24 lg:py-36 bg-[#070707] border-t border-[#141414]">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center max-w-3xl mx-auto"
        >
          <span className="text-[11px] font-semibold tracking-[0.3em] text-[#CBA365] uppercase block mb-3">
            Platform Capabilities
          </span>
          <h2 className="heading-font text-4xl sm:text-5xl lg:text-6xl font-normal text-white">
            Uncompromising <span className="text-[#CBA365] italic">Detail &amp; Craft</span>
          </h2>
          <p className="mt-4 text-[#a3a3a3] text-sm sm:text-base font-light">
            Every component is built to deliver an effortless experience for both you and your guests.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((f, index) => {
            const Icon = f.icon;
            return (
              <motion.div 
                key={index} 
                variants={itemVariants} 
                className="group relative p-8 rounded-2xl border border-[#1a1a1a] bg-[#0c0c0c] transition-all duration-500 hover:border-[#CBA365]/50 hover:bg-[#101010] hover:shadow-xl hover:shadow-[#CBA365]/5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl border border-[#222222] bg-[#141414] flex items-center justify-center text-[#CBA365] group-hover:border-[#CBA365] group-hover:bg-[#CBA365]/10 transition-colors duration-500">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="heading-font text-xl text-[#333333] group-hover:text-[#CBA365] transition-colors duration-500 font-semibold">
                      {f.numeral}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-medium text-white mb-3 tracking-wide group-hover:text-[#CBA365] transition-colors">
                    {f.title}
                  </h3>
                  
                  <p className="text-[#999999] text-xs sm:text-sm leading-relaxed font-light">
                    {f.description}
                  </p>
                </div>
                
                <div className="mt-8 pt-4 border-t border-[#161616]">
                  <div className="w-8 h-[2px] bg-[#222222] group-hover:w-full group-hover:bg-[#CBA365] transition-all duration-500" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        
      </div>
    </section>
  );
}
