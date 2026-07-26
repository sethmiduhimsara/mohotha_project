"use client";
import { useState } from "react";
import { motion, type Variants, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";

const faqs = [
  {
    q: "How do guests receive our wedding invitation?",
    a: "Upon completion, you receive a custom, secure invitation URL (e.g. mohotha.com/amara-nayana). You can copy and share this link directly via WhatsApp, Viber, Email, or SMS with your entire guest list.",
  },
  {
    q: "How does the Google Sheets RSVP sync work?",
    a: "Every time a guest fills in their name, attending status, guest count, and message on your invitation, the data is instantly saved in our database AND appended to your personal private Google Sheet.",
  },
  {
    q: "Are the designs compatible with mobile devices?",
    a: "Yes! Every single template is built mobile-first. They load fast, look immaculate on iPhones, Android devices, tablets, and desktop computers.",
  },
  {
    q: "Does the platform support native Sinhala & Tamil languages?",
    a: "Absolutely. Our typographic system supports Sinhala, Tamil, and English text effortlessly, allowing authentic Sinhala cultural wording and traditional family greetings.",
  },
  {
    q: "What is the structure of the investment?",
    a: "Creating and previewing your invitation design is 100% free. You only pay a one-time fee of Rs. 2,500 when you are ready to publish and link your Google Sheet. There are no recurring monthly subscriptions.",
  },
  {
    q: "Can we make changes to dates, venues, or photos after publishing?",
    a: "Yes! If your event time changes or you want to update venue notes, simply let us know and we update the live invitation instantly without changing your link.",
  },
  {
    q: "Is there a limit on how many guests can view our link?",
    a: "No limit whatsoever. Our cloud platform automatically scales to handle thousands of concurrent guest views smoothly without any lag or downtime.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaqs = faqs.filter(
    (item) =>
      item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring" as const, stiffness: 45, damping: 20 } 
    },
  };

  return (
    <section id="faq" className="py-24 lg:py-36 bg-[#070707] border-t border-[#141414]">
      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-14 text-center"
        >
          <span className="text-[11px] font-semibold tracking-[0.3em] text-[#CBA365] uppercase block mb-3">
            Got Questions?
          </span>
          <h2 className="heading-font text-4xl sm:text-5xl lg:text-6xl font-normal text-white">
            Frequently Asked <span className="text-[#CBA365] italic">Inquiries</span>
          </h2>
        </motion.div>

        {/* Search Bar Filter */}
        <div className="mb-10 relative">
          <input
            type="text"
            placeholder="Search inquiries (e.g. Google Sheets, RSVP, Sinhala, Mobile)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0c0c0c] border border-[#222222] rounded-full px-6 py-3.5 text-xs text-white placeholder-[#666666] focus:outline-none focus:border-[#CBA365] transition-colors"
          />
        </div>

        {/* FAQ Accordions */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-4"
        >
          {filteredFaqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <motion.div key={i} variants={itemVariants} className="rounded-2xl border border-[#1a1a1a] bg-[#090909] overflow-hidden transition-colors hover:border-[#2a2a2a]">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="flex w-full items-center justify-between p-6 text-left group"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-medium tracking-wide text-white group-hover:text-[#CBA365] transition-colors pr-6">
                    {faq.q}
                  </span>
                  <div className={`p-2 rounded-full border border-[#222222] bg-[#111111] transition-transform duration-300 ${isOpen ? "rotate-180 border-[#CBA365] text-[#CBA365]" : "text-[#777777]"}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-xs sm:text-sm leading-relaxed text-[#a3a3a3] font-light border-t border-[#141414] pt-4">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Live Support Callout */}
        <div className="mt-14 p-6 rounded-2xl border border-[#CBA365]/30 bg-[#0a0a0a] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#CBA365]/10 border border-[#CBA365]/40 flex items-center justify-center text-[#CBA365]">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Have a custom request?</h4>
              <p className="text-[11px] text-[#888888] font-light">Our Colombo studio desk is available for questions.</p>
            </div>
          </div>
          <a
            href="mailto:studio@mohotha.lk"
            className="px-6 py-2.5 rounded-full border border-[#CBA365] text-[#CBA365] text-xs font-semibold uppercase tracking-wider hover:bg-[#CBA365] hover:text-[#050505] transition-colors"
          >
            Contact Desk
          </a>
        </div>
        
      </div>
    </section>
  );
}
