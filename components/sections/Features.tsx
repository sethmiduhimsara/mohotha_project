"use client";
import { motion } from "framer-motion";

const features = [
  {
    icon: "I",
    title: "Curated Aesthetics",
    description: "Our collections are deeply inspired by Sri Lankan heritage, transformed into minimalist, contemporary digital formats.",
  },
  {
    icon: "II",
    title: "Absolute Precision",
    description: "Every template is engineered to display perfectly across all devices. No layout shifts, no compromises on mobile.",
  },
  {
    icon: "III",
    title: "Intelligent RSVP",
    description: "An elegant backend dashboard tracks attendances and dietary requirements with uncompromising clarity.",
  },
  {
    icon: "IV",
    title: "Seamless Navigation",
    description: "Integrated maps guide your guests to the ceremony and reception with a single, frictionless tap.",
  },
  {
    icon: "V",
    title: "Auditory Ambience",
    description: "Enhance the reveal with high-fidelity, curated instrumental pieces that play softly in the background.",
  },
  {
    icon: "VI",
    title: "Digital Registry",
    description: "A discreet and elegant integration for receiving blessings digitally via secure QR code placements.",
  },
];

export default function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 40, damping: 20, duration: 1.2 } 
    },
  };

  return (
    <section id="features" className="py-24 lg:py-36 bg-[#050505] border-t border-[#111111]">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="mb-20 text-center"
        >
          <span className="text-xs font-medium tracking-[0.3em] text-[#5c5c5c] uppercase">The Platform</span>
          <h2 className="heading-font mt-6 text-4xl font-normal text-white md:text-5xl lg:text-6xl">
            Uncompromising <span className="text-[#CBA365] italic">Detail</span>
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
        >
          {features.map((f, index) => (
            <motion.div key={index} variants={itemVariants} className="group flex flex-col items-start">
              {/* Minimalist Icon / Numeral */}
              <div className="heading-font text-4xl text-[#333333] mb-6 group-hover:text-[#CBA365] transition-colors duration-500">
                {f.icon}.
              </div>
              
              <h3 className="text-lg font-medium text-white mb-4 tracking-wide">
                {f.title}
              </h3>
              
              <p className="text-[#a3a3a3] text-sm leading-relaxed font-light">
                {f.description}
              </p>
              
              <div className="mt-8 w-12 h-px bg-[#222222] group-hover:w-full group-hover:bg-[#CBA365]/30 transition-all duration-700 ease-in-out" />
            </motion.div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}
