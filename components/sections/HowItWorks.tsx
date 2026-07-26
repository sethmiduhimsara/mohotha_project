"use client";
import { motion, type Variants } from "framer-motion";
import { Palette, MessageSquare, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Palette,
    title: "Select Design",
    subtitle: "Browse the Collection",
    description: "Choose a design framework that matches your wedding theme, colors, and personal aesthetic.",
  },
  {
    number: "02",
    icon: MessageSquare,
    title: "Share Details",
    subtitle: "Custom Curation",
    description: "Send your wedding details (names, dates, venue, music preference). We customize every detail for you.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Launch & Share",
    subtitle: "Instant Distribution",
    description: "Receive your live, bespoke invitation link & Google Sheet link. Share instantly with your guest list.",
  },
];

export default function HowItWorks() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
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
    <section id="how-it-works" className="py-24 lg:py-36 bg-[#050505] relative overflow-hidden border-t border-[#141414]">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#1c1c1c] pb-10"
        >
          <div>
            <span className="text-[11px] font-semibold tracking-[0.3em] text-[#CBA365] uppercase block mb-3">
              The Process
            </span>
            <h2 className="heading-font text-4xl sm:text-5xl lg:text-6xl font-normal text-white">
              Effortless <span className="text-[#CBA365] italic">Creation</span>
            </h2>
          </div>
          <div className="md:w-1/3">
            <p className="text-[#a3a3a3] text-sm leading-relaxed font-light">
              We have streamlined the invitation process into three simple, stress-free steps. 
              No coding or tech skills needed on your end.
            </p>
          </div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
        >
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div key={step.number} variants={itemVariants} className="relative z-10 flex flex-col justify-between p-8 rounded-2xl border border-[#1e1e1e] bg-[#0a0a0a] hover:border-[#CBA365]/50 transition-all duration-500 group">
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-full border border-[#CBA365]/30 bg-[#CBA365]/10 flex items-center justify-center text-[#CBA365]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold tracking-[0.25em] text-[#CBA365] uppercase border border-[#CBA365]/20 bg-[#050505] px-3 py-1 rounded-full">
                      STEP {step.number}
                    </span>
                  </div>

                  <span className="text-[10px] tracking-widest text-[#777777] uppercase font-medium block mb-1">
                    {step.subtitle}
                  </span>
                  
                  <h3 className="heading-font text-3xl text-white mb-4 group-hover:text-[#CBA365] transition-colors">
                    {step.title}
                  </h3>
                  
                  <p className="text-[#a3a3a3] text-xs sm:text-sm leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#141414] text-[10px] tracking-widest text-[#555555] uppercase font-medium flex items-center justify-between">
                  <span>Seamless Handoff</span>
                  <span className="text-[#CBA365]">✓</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
