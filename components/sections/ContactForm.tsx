"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Send, Loader2, CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "", // Added email field so you know who to reply to
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    // Web3Forms API Integration
    const ACCESS_KEY = "f7a578e1-f604-4026-b056-0278709ce19c";

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: "MOHOTHA Studio Website",
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-36 bg-[#050505] border-t border-[#141414] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-[#CBA365]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: Copy & Details */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[11px] font-semibold tracking-[0.3em] text-[#CBA365] uppercase block mb-4">
              Get in Touch
            </span>
            <h2 className="heading-font text-4xl sm:text-5xl lg:text-6xl font-normal text-white mb-6">
              Connect with <span className="text-[#CBA365] italic">Our Studio</span>
            </h2>
            <p className="text-[#a3a3a3] text-sm sm:text-base font-light leading-relaxed mb-10 max-w-md">
              Have a question about our bespoke digital invitations or need a custom design? Send us a message directly and our Colombo-based team will respond promptly.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-[#CBA365]/20 bg-[#CBA365]/5 flex items-center justify-center text-[#CBA365]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#777777] font-semibold mb-1">Direct Email</p>
                  <p className="text-sm text-white font-light tracking-wide">contact.mohotha@gmail.com</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: The Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="bg-[#0a0a0a] border border-[#1e1e1e] rounded-3xl p-8 sm:p-10 shadow-2xl relative"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#888888] mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Kasun Perera"
                    className="w-full bg-[#111111] border border-[#222222] rounded-xl px-4 py-3.5 text-sm text-white placeholder-[#555555] focus:outline-none focus:border-[#CBA365] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#888888] mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. kasun@example.com"
                    className="w-full bg-[#111111] border border-[#222222] rounded-xl px-4 py-3.5 text-sm text-white placeholder-[#555555] focus:outline-none focus:border-[#CBA365] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#888888] mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Question about Signature Package"
                  className="w-full bg-[#111111] border border-[#222222] rounded-xl px-4 py-3.5 text-sm text-white placeholder-[#555555] focus:outline-none focus:border-[#CBA365] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#888888] mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we help you create the perfect invitation?"
                  className="w-full bg-[#111111] border border-[#222222] rounded-xl px-4 py-3.5 text-sm text-white placeholder-[#555555] focus:outline-none focus:border-[#CBA365] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className={`w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-xs font-bold uppercase tracking-[0.15em] transition-colors shadow-lg ${
                  status === "success" 
                    ? "bg-[#4cd964] text-white"
                    : "bg-[#CBA365] text-[#050505] hover:bg-[#dfba7c] shadow-[#CBA365]/20 group"
                }`}
              >
                {status === "loading" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : status === "success" ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Message Sent</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
              
              {status === "error" && (
                <p className="text-red-500 text-xs text-center mt-2">
                  Something went wrong. Please try emailing us directly.
                </p>
              )}

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
