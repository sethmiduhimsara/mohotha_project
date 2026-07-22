// "use client";

// import { motion, useInView } from "framer-motion";
// import { useRef } from "react";

// type FadeInDirection = "up" | "down" | "left" | "right" | "none";

// interface FadeInProps {
//   children: React.ReactNode;
//   delay?: number;
//   direction?: FadeInDirection;
//   className?: string;
//   duration?: number;
// }

// export function FadeIn({
//   children,
//   delay = 0,
//   direction = "up",
//   className = "",
//   duration = 0.8,
// }: FadeInProps) {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });

//   const directions: Record<FadeInDirection, { x: number; y: number }> = {
//     up: { x: 0, y: 40 },
//     down: { x: 0, y: -40 },
//     left: { x: 40, y: 0 },
//     right: { x: -40, y: 0 },
//     none: { x: 0, y: 0 },
//   };

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, ...directions[direction] }}
//       animate={{
//         opacity: isInView ? 1 : 0,
//         x: isInView ? 0 : directions[direction].x,
//         y: isInView ? 0 : directions[direction].y,
//       }}
//       transition={{
//         duration,
//         delay,
//         ease: [0.21, 0.47, 0.32, 0.98],
//       }}
//       className={className}
//     >
//       {children}
//     </motion.div>
//   );
// }



"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useMemo, useRef } from "react";

export type FadeDirection =
  | "up"
  | "down"
  | "left"
  | "right"
  | "none";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;

  delay?: number;
  duration?: number;

  direction?: FadeDirection;

  once?: boolean;

  amount?: number;

  distance?: number;

  scale?: number;
}

export function FadeIn({
  children,
  className = "",

  delay = 0,
  duration = 0.8,

  direction = "up",

  once = true,

  amount = 0.2,

  distance = 40,

  scale = 1,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);

  const shouldReduceMotion = useReducedMotion();

  const isInView = useInView(ref, {
    once,
    amount,
  });

  const initial = useMemo(() => {
    switch (direction) {
      case "up":
        return {
          opacity: 0,
          y: distance,
          x: 0,
          scale,
        };

      case "down":
        return {
          opacity: 0,
          y: -distance,
          x: 0,
          scale,
        };

      case "left":
        return {
          opacity: 0,
          x: distance,
          y: 0,
          scale,
        };

      case "right":
        return {
          opacity: 0,
          x: -distance,
          y: 0,
          scale,
        };

      default:
        return {
          opacity: 0,
          x: 0,
          y: 0,
          scale,
        };
    }
  }, [direction, distance, scale]);

  if (shouldReduceMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={
        isInView
          ? {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
            }
          : initial
      }
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}