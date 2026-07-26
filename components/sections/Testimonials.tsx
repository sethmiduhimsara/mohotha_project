"use client";
import { motion, type Variants } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "The digital format allowed us to invite our extended family across the globe instantly. The RSVP backend syncing directly to Google Sheets saved us countless hours of manual tracking.",
    name: "Dilini & Kasun",
    location: "Colombo • Cinnamon Grand",
    rating: 5,
  },
  {
    quote:
      "Minimalist, sophisticated, and incredibly intuitive. It felt less like a website and more like a high-fashion digital art showcase for our wedding.",
    name: "Tharini & Roshan",
    location: "Kandy • Earl's Regency",
    rating: 5,
  },
  {
    quote:
      "Our guests were taken aback by the sheer elegance of the interactive map and background flute music. Absolute perfection from start to finish.",
    name: "Priyanka & Suresh",
    location: "Galle • Amangalla",
    rating: 5,
  },
];

export default function Testimonials() {
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
      transition: { type: "spring" as const, stiffness: 45, damping: 20 },
    },
  };

  return (
    <section
      id="testimonials"
      className="py-24 lg:py-36 bg-[#070707] border-t border-[#141414]"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center max-w-3xl mx-auto"
        >
          <span className="text-[11px] font-semibold tracking-[0.3em] text-[#CBA365] uppercase block mb-3">
            Client Endorsements
          </span>
          <h2 className="heading-font text-4xl sm:text-5xl lg:text-6xl font-normal text-white">
            Words of <span className="text-[#CBA365] italic">Affirmation</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {testimonials.map((t, index) => (
            <motion.article
              key={index}
              variants={itemVariants}
              className="flex flex-col justify-between rounded-2xl border border-[#1e1e1e] bg-[#0c0c0c] p-8 transition-all duration-500 hover:border-[#CBA365]/40 hover:shadow-xl hover:shadow-[#CBA365]/5"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-[#CBA365]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#CBA365]" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#222222]" />
                </div>

                <blockquote className="text-xs sm:text-sm leading-relaxed text-[#cccccc] font-light italic mb-8">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>

              <div className="border-t border-[#1a1a1a] pt-4">
                <p className="text-sm font-semibold text-white tracking-wide">
                  {t.name}
                </p>
                <p className="mt-1 text-[10px] tracking-widest uppercase text-[#777777]">
                  {t.location}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
