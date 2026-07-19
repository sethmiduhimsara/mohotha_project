"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const freePlan = [
  "Single invitation design",
  "Standard image gallery",
  "Fundamental RSVP tracking",
  "3-day preview window",
];

const premiumPlan = [
  "Unlimited invitation views",
  "High-resolution image gallery",
  "Advanced RSVP analytics dashboard",
  "Integrated interactive venue maps",
  "Curated background audio tracks",
  "Digital gift registry integration",
  "Bespoke guest name personalization",
  "Permanent archival access",
];

export default function Pricing() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
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
    <section id="pricing" className="py-24 lg:py-36 bg-[#050505]">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="mb-20 text-center"
        >
          <span className="text-xs font-medium tracking-[0.3em] text-[#5c5c5c] uppercase">Investment</span>
          <h2 className="heading-font mt-6 text-4xl font-normal text-white md:text-5xl lg:text-6xl">
            Transparent <span className="text-[#CBA365] italic">Pricing</span>
          </h2>
          <p className="mt-6 text-[#a3a3a3] text-sm font-light">
            An elegant pricing model with no hidden fees or recurring subscriptions.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2"
        >
          
          {/* Complimentary */}
          <motion.div variants={itemVariants} className="flex flex-col justify-between border border-[#111111] bg-[#0a0a0a] p-10 transition-colors duration-500 hover:border-[#222222]">
            <div>
              <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[#5c5c5c]">
                Complimentary
              </p>
              <div className="flex items-baseline gap-2 mb-8">
                <h3 className="heading-font text-5xl text-white">
                  Rs. 0
                </h3>
              </div>
              <p className="mb-10 text-sm text-[#a3a3a3] font-light leading-relaxed">
                Design and curate your invitation with full creative control before committing.
              </p>
              
              <ul className="space-y-4 mb-10">
                {freePlan.map((f) => (
                  <li key={f} className="flex items-start gap-4 text-sm text-[#a3a3a3] font-light">
                    <span className="flex-none mt-1 w-1.5 h-1.5 rounded-full bg-[#333333]" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            
            <Link
              href="#contact"
              className="block w-full border border-[#333333] py-4 text-center text-xs font-medium uppercase tracking-[0.1em] text-white hover:border-[#CBA365] hover:text-[#CBA365] transition-colors"
            >
              Contact Studio
            </Link>
          </motion.div>

          {/* Premium */}
          <motion.div variants={itemVariants} className="relative flex flex-col justify-between border border-[#CBA365]/30 bg-[#0a0a0a] p-10 shadow-2xl">
            {/* Subtle glow behind premium card */}
            <div className="absolute inset-0 bg-[#CBA365]/5 blur-3xl -z-10 pointer-events-none" />
            
            <div>
              <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[#CBA365]">
                The Collection
              </p>
              <div className="flex items-baseline gap-2 mb-8">
                <h3 className="heading-font text-5xl text-white">
                  Rs. 2,500
                </h3>
                <span className="text-[10px] tracking-widest text-[#5c5c5c] uppercase">/ one time</span>
              </div>
              <p className="mb-10 text-sm text-[#a3a3a3] font-light leading-relaxed">
                Unlock the complete suite of premium features for an unforgettable guest experience.
              </p>
              
              <ul className="space-y-4 mb-10">
                {premiumPlan.map((f) => (
                  <li key={f} className="flex items-start gap-4 text-sm text-white font-light">
                    <span className="flex-none mt-1 w-1.5 h-1.5 rounded-full bg-[#CBA365]" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            
            <Link
              href="#contact"
              className="block w-full bg-[#CBA365] py-4 text-center text-xs font-medium uppercase tracking-[0.1em] text-[#050505] hover:bg-[#b89154] transition-colors"
            >
              Contact Studio
            </Link>
          </motion.div>
          
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#5c5c5c]">
            Zero Subscriptions • Secure Checkout • Lifetime Archival
          </p>
        </motion.div>
      </div>
    </section>
  );
}
