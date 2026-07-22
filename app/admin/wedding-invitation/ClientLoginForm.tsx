//login PW = AMARA2026

"use client";

import { useState, useTransition } from "react";
import { loginAsClient } from "@/app/actions/wedding-invitation/auth";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
});

export default function ClientLoginForm({ clientId, correctPassword }: { clientId: string, correctPassword?: string }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    startTransition(async () => {
      const result = await loginAsClient(clientId, password, correctPassword);
      if (!result.success) {
        setError(result.error || "Login failed");
      }
    });
  };

  return (
    <div className={`flex min-h-[80vh] items-center justify-center bg-[#FAF7F2] ${cormorant.className} p-4`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_60px_rgba(197,160,89,0.08)]"
      >
        <div className="flex flex-col items-center p-10 text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#FAF7F2] text-[#C5A059]">
            <Lock className="h-6 w-6" />
          </div>
          
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A059]" style={{ fontFamily: "sans-serif" }}>
            Restricted Access
          </p>
          <h1 className="mb-8 text-4xl font-bold text-[#2f2f2f]">
            Client Login
          </h1>

          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div className="space-y-2 text-left" style={{ fontFamily: "sans-serif" }}>
              <input
                type="password"
                placeholder="Enter your passcode..."
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(""); // clear error on type
                }}
                className="w-full rounded-xl border border-[#E8DCC8] bg-[#FAF7F2] px-5 py-4 text-sm text-[#2f2f2f] outline-none transition-colors focus:border-[#C5A059] focus:bg-white"
              />
              {error && (
                <motion.p 
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: [0, -5, 5, -5, 5, 0] }}
                  transition={{ duration: 0.4 }}
                  className="pl-2 text-xs text-[#a05050]"
                >
                  {error}
                </motion.p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={isPending || !password}
              whileHover={isPending || !password ? {} : { scale: 1.02, boxShadow: "0 10px 30px rgba(197,160,89,0.2)" }}
              whileTap={isPending || !password ? {} : { scale: 0.98 }}
              className="w-full rounded-xl bg-[#C5A059] px-6 py-4 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-[#b8904d] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: "sans-serif" }}
            >
              {isPending ? "Unlocking..." : "Access Dashboard"}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
