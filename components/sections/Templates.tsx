"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, type Variants, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

const categories = ["All Collection", "Kandyan Royal", "Modern Minimalist", "Botanical & Coastal"];

const featuredDesigns = [
  {
    id: 1,
    name: "Classic Sinhala",
    category: "Kandyan Royal",
    style: "Traditional Cultural",
    href: "/classic-sinhala",
    image: "/images/classic-sinhala/classic-sinhala-couple1.png",
    tags: ["Multilingual", "Google RSVP", "Music"],
  },
  {
    id: 2,
    name: "Modern Minimalist",
    category: "Modern Minimalist",
    style: "Contemporary Chic",
    href: "/wedding-invitation",
    image: "/images/wedding-invitation/hero2.png",
    tags: ["Clean Lines", "Live Maps", "RSVP"],
  },
  {
    id: 3,
    name: "Royal Heritage",
    category: "Kandyan Royal",
    style: "Kandyan Luxury",
    href: "/RoyalHeritage",
    image: "/images/hero/wedding-hero1.jpg",
    tags: ["Gold Foil", "Custom Typography"],
  },
  {
    id: 4,
    name: "Botanical Grace",
    category: "Botanical & Coastal",
    style: "Floral & Organic",
    href: "/wedding-invitation",
    image: "/images/hero/botanical-grace 1.jpg",
    tags: ["Garden Vibe", "Photo Gallery"],
  },
  {
    id: 5,
    name: "Ocean Breeze",
    category: "Botanical & Coastal",
    style: "Destination Beach",
    href: "/wedding-invitation",
    image: "/images/hero/ocean-breeze 1.png",
    tags: ["Seaside Luxe", "Interactive Map"],
  },
  {
    id: 6,
    name: "Obsidian Gold",
    category: "Modern Minimalist",
    style: "High Fashion Black",
    href: "/wedding-invitation",
    image: "/images/hero/dark4.jpg",
    tags: ["Obsidian Theme", "Gold Foil"],
  },
];

export default function Templates() {
  const [selectedCategory, setSelectedCategory] = useState("All Collection");

  const filteredDesigns = featuredDesigns.filter((item) => {
    if (selectedCategory === "All Collection") return true;
    return item.category === selectedCategory;
  });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 45, damping: 20 },
    },
  };

  return (
    <section id="templates" className="py-24 lg:py-36 bg-[#050505] relative overflow-hidden border-t border-[#141414]">
      {/* Subtle radial ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(203,163,101,0.08)_0%,rgba(5,5,5,0)_70%)] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 lg:px-8 relative z-10">
        
        {/* Section Title & Description */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-[#1c1c1c] pb-10 mb-12">
          <div className="max-w-2xl">
            <span className="text-[11px] font-semibold tracking-[0.3em] text-[#CBA365] uppercase block mb-3">
              The Collection
            </span>
            <h2 className="heading-font text-4xl sm:text-5xl lg:text-7xl font-normal text-white">
              Featured <span className="text-[#CBA365] italic">Designs</span>
            </h2>
          </div>
          <p className="text-[#a3a3a3] max-w-md lg:text-right leading-relaxed text-sm font-light">
            Explore our curated suite of luxury digital invitation templates. 
            Blending Sri Lankan cultural motifs with modern high-fashion design.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-medium tracking-[0.15em] uppercase transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-[#CBA365] text-[#050505] shadow-lg shadow-[#CBA365]/20 font-semibold"
                  : "bg-[#0c0c0c] border border-[#222222] text-[#888888] hover:border-[#CBA365]/40 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredDesigns.map((design) => (
              <motion.div
                key={design.id}
                layout
                variants={cardVariants}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <Link
                  href={design.href}
                  className="group block relative rounded-2xl overflow-hidden bg-[#0c0c0c] border border-[#1e1e1e] transition-all duration-500 hover:border-[#CBA365]/60 hover:shadow-2xl hover:shadow-[#CBA365]/10 flex flex-col h-full"
                >
                  {/* Card Thumbnail Image */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#111111]">
                    <Image
                      src={design.image}
                      alt={design.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-108 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent opacity-90" />
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4 border border-[#ffffff]/10 bg-[#050505]/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] tracking-widest text-[#CBA365] uppercase">
                      {design.style}
                    </div>

                    <div className="absolute top-4 right-4 w-9 h-9 rounded-full border border-white/20 bg-black/60 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-45">
                      <ArrowUpRight className="w-4 h-4 text-[#CBA365]" />
                    </div>
                  </div>

                  {/* Card Info Content */}
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="heading-font text-2xl text-white mb-2 group-hover:text-[#CBA365] transition-colors duration-300">
                        {design.name}
                      </h3>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {design.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[9px] tracking-wider uppercase px-2.5 py-1 rounded-md bg-[#161616] text-[#888888] border border-[#222222]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#1a1a1a] flex items-center justify-between text-xs tracking-widest text-[#a3a3a3] uppercase font-medium">
                      <span>Explore Demo</span>
                      <span className="text-[#CBA365] group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Custom Order Callout */}
        <div className="mt-16 text-center border border-[#1e1e1e] bg-[#090909] p-8 rounded-2xl max-w-3xl mx-auto">
          <p className="text-sm text-[#cccccc] font-light">
            Need a completely unique theme or custom Sinhala typography? <br className="hidden sm:inline" />
            <Link
              href="#pricing"
              className="text-[#CBA365] font-medium hover:underline ml-1 inline-flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" /> Contact Studio for custom bespoke design.
            </Link>
          </p>
        </div>

      </div>
    </section>
  );
}
