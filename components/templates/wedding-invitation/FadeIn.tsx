"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type FadeInDirection = "up" | "down" | "left" | "right" | "none";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: FadeInDirection;
  className?: string;
  duration?: number;
}

export function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
  duration = 0.8,
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const directions: Record<FadeInDirection, { x: number; y: number }> = {
    up: { x: 0, y: 40 },
    down: { x: 0, y: -40 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directions[direction] }}
      animate={{
        opacity: isInView ? 1 : 0,
        x: isInView ? 0 : directions[direction].x,
        y: isInView ? 0 : directions[direction].y,
      }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}