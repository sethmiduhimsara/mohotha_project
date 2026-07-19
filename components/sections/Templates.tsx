"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const featuredDesigns = [
  {
    id: 1,
    name: "Classic Sinhala",
    style: "Traditional",
    href: "/demo/classic-sinhala",
  },
  {
    id: 2,
    name: "Modern Minimalist",
    style: "Contemporary",
    href: "/demo/modern-minimalist",
  },
  {
    id: 3,
    name: "Royal Heritage",
    style: "Kandyan Premium",
    href: "/demo/royal-heritage",
  },
  {
    id: 4,
    name: "Botanical Grace",
    style: "Floral Elegant",
    href: "/demo/botanical-grace",
  },
  {
    id: 5,
    name: "Ocean Breeze",
    style: "Beach Wedding",
    href: "/demo/ocean-breeze",
  },
  {
    id: 6,
    name: "Golden Velvet",
    style: "High Fashion",
    href: "/demo/golden-velvet",
  },
];

export default function Templates() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 40, damping: 20, duration: 1.2 },
    },
  };

  return (
    <section
      id="templates"
      className="py-24 lg:py-36 bg-[#050505] relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-100 bg-[radial-gradient(ellipse_at_top,rgba(203,163,101,0.05)_0%,rgba(5,5,5,0)_70%)] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="mb-20 flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-[#222222] pb-10"
        >
          <div className="max-w-2xl">
            <h2 className="heading-font text-5xl font-normal text-white md:text-6xl lg:text-7xl">
              Featured <span className="text-[#CBA365] italic">Designs</span>
            </h2>
          </div>
          <p className="text-[#a3a3a3] max-w-sm lg:text-right leading-relaxed text-sm md:text-base">
            Explore our curated collection of premium digital invitation
            templates. Designed specifically for Sri Lankan weddings, blending
            tradition with modern elegance.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10"
        >
          {featuredDesigns.map((design) => (
            <motion.div key={design.id} variants={cardVariants}>
              <Link
                href={design.href}
                className="group block relative aspect-3/4 overflow-hidden bg-[#111111] border border-[#222222] transition-all duration-500 hover:border-[#CBA365]/40"
              >
                <div className="absolute inset-0 bg-linear-to-b from-[#151515] to-[#0a0a0a] group-hover:scale-105 transition-transform duration-700 ease-out" />

                <div
                  className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500"
                  style={{
                    backgroundImage:
                      "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />

                <div className="absolute top-8 left-8 right-8 bottom-8 border border-[#222222]/50 transition-colors duration-500 group-hover:border-[#CBA365]/20" />

                <div className="absolute inset-0 flex flex-col justify-between p-12">
                  <div>
                    <span className="inline-block px-3 py-1 border border-[#333333] text-[#a3a3a3] text-[10px] tracking-[0.2em] uppercase rounded-full group-hover:border-[#CBA365]/30 group-hover:text-[#CBA365] transition-colors duration-500">
                      {design.style}
                    </span>
                  </div>

                  <div>
                    <h3 className="heading-font text-3xl text-white mb-4 group-hover:text-[#CBA365] transition-colors duration-500">
                      {design.name}
                    </h3>
                    <div className="flex items-center gap-3 text-xs tracking-widest text-[#a3a3a3] uppercase">
                      <span className="h-px w-8 bg-[#333333] group-hover:bg-[#CBA365] group-hover:w-12 transition-all duration-500" />
                      <span className="-translate-x-2.5 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                        View Demo
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <p className="text-[#5c5c5c] text-sm">
            More premium designs coming soon. <br className="md:hidden" />
            <Link
              href="#"
              className="text-[#a3a3a3] hover:text-[#CBA365] underline decoration-[#333333] underline-offset-4 transition-colors"
            >
              Contact us for custom bespoke designs.
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
