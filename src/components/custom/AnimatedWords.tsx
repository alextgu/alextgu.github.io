"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimatedWordsProps = {
  text: string;
  className?: string;
  /** Underline style: "always" | "hover" | "none" */
  underline?: "always" | "hover" | "none";
  /** Stagger delay between words (seconds) */
  stagger?: number;
};

export function AnimatedWords({
  text,
  className,
  underline = "none",
  stagger = 0.04,
}: AnimatedWordsProps) {
  const words = text.trim().split(/\s+/);

  return (
    <span className={cn("inline", className)}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.35,
            delay: i * stagger,
          }}
          className={cn(
            "inline-block mr-[0.25em]",
            underline === "always" &&
              "underline decoration-current decoration-2 underline-offset-4",
            underline === "hover" &&
              "hover:underline decoration-current decoration-2 underline-offset-4 transition-[text-decoration]"
          )}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
