import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-accent ${className}`}
    >
      <span className="inline-block h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
      {children}
    </span>
  );
}
