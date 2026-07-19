"use client";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "The digital format allowed us to invite our extended family across the globe instantly. The RSVP backend was flawlessly executed.",
    name: "Dilini & Kasun",
    context: "Colombo",
  },
  {
    quote:
      "Minimalist, sophisticated, and incredibly intuitive. It felt less like a tech platform and more like a bespoke design studio.",
    name: "Tharini & Roshan",
    context: "Kandy",
  },
  {
    quote:
      "Our guests were taken aback by the sheer elegance of the interface. The integrated registry was handled with the utmost discretion.",
    name: "Priyanka & Suresh",
    context: "Galle",
  },
];

export default function Testimonials() {
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
      transition: { type: "spring", stiffness: 40, damping: 20, duration: 1.2 },
    },
  };

  return (
    <section
      id="testimonials"
      className="py-24 lg:py-36 bg-[#0a0a0a] border-t border-[#111111]"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="mb-20 text-center"
        >
          <span className="text-xs font-medium tracking-[0.3em] text-[#5c5c5c] uppercase">
            Endorsements
          </span>
          <h2 className="heading-font mt-6 text-4xl font-normal text-white md:text-5xl lg:text-6xl">
            Words of <span className="text-[#CBA365] italic">Affirmation</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-12 lg:grid-cols-3"
        >
          {testimonials.map((t, index) => (
            <motion.article
              key={index}
              variants={itemVariants}
              className="flex flex-col border-l border-[#222222] pl-8 transition-colors duration-500 hover:border-[#CBA365]"
            >
              <div className="heading-font mb-6 text-6xl leading-none text-[#333333]">
                &quot;
              </div>
              <blockquote className="flex-1 text-sm leading-relaxed text-[#a3a3a3] font-light italic mb-8">
                {t.quote}
              </blockquote>
              <div>
                <p className="text-sm font-medium text-white tracking-wide">
                  {t.name}
                </p>
                <p className="mt-1 text-[10px] tracking-widest uppercase text-[#5c5c5c]">
                  {t.context}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
