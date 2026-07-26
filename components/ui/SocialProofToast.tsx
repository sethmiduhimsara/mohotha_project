"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle, Heart, X } from "lucide-react";

const activities = [
  {
    couple: "Amara & Nayana",
    location: "Kandy • Earl's Regency",
    action: "published their bespoke digital invitation",
    time: "2 mins ago",
    icon: Sparkles,
  },
  {
    couple: "Kasun & Devmini",
    location: "Colombo • Cinnamon Grand",
    action: "synced 185 RSVPs to Google Sheets",
    time: "5 mins ago",
    icon: CheckCircle,
  },
  {
    couple: "Tharini & Roshan",
    location: "Galle • Amangalla",
    action: "added traditional flute background music",
    time: "12 mins ago",
    icon: Heart,
  },
  {
    couple: "Priyanka & Suresh",
    location: "Negombo • Heritance Ahungalla",
    action: "customized Sinhala & English typography",
    time: "20 mins ago",
    icon: Sparkles,
  },
];

export default function SocialProofToast() {
  const [mounted, setMounted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || dismissed) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % activities.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [mounted, dismissed]);

  if (!mounted || dismissed) return null;

  const current = activities[currentIdx];
  const Icon = current.icon;

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-sm pointer-events-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.4 }}
          className="relative flex items-start gap-3 rounded-2xl border border-[#E5B869]/40 bg-[#0e0e0e]/90 p-4 shadow-2xl backdrop-blur-xl gold-glow-sm"
        >
          <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#E5B869]/10 border border-[#E5B869] flex items-center justify-center text-[#E5B869] mt-0.5">
            <Icon className="w-4 h-4 animate-pulse" />
          </div>

          <div className="flex-1 pr-4">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-bold text-white tracking-wide">{current.couple}</h5>
              <span className="text-[9px] text-[#888888]">{current.time}</span>
            </div>
            <p className="text-[11px] text-[#cccccc] font-light mt-0.5 leading-snug">
              {current.action}
            </p>
            <span className="text-[9px] text-[#E5B869] font-medium tracking-wider uppercase block mt-1">
              {current.location}
            </span>
          </div>

          <button
            onClick={() => setDismissed(true)}
            className="absolute top-3 right-3 text-[#666666] hover:text-white transition-colors"
            aria-label="Dismiss toast"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
