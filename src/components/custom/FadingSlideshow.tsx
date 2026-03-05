"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type SlideshowItem = {
  image: string;
  title?: string;
  id?: string;
};

type FadingSlideshowProps = {
  items: SlideshowItem[];
  intervalMs?: number;
  className?: string;
};

/**
 * Shows one image at a time with a fade transition between slides.
 */
export function FadingSlideshow({
  items,
  intervalMs = 5000,
  className,
}: FadingSlideshowProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [items.length, intervalMs]);

  if (!items.length) return null;

  const item = items[current];

  return (
    <div className={className}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={item.id ?? current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="relative w-full aspect-[4/5] max-h-[70vh] rounded-lg overflow-hidden bg-zinc-900"
        >
          {item.image ? (
            <Image
              src={item.image}
              alt={item.title ?? "Slideshow image"}
              fill
              sizes="(max-width: 768px) 90vw, 32rem"
              className="object-cover"
              priority={current === 0}
            />
          ) : (
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0,rgba(255,255,255,0.05),transparent_55%),radial-gradient(circle_at_80%_100%,rgba(255,255,255,0.04),transparent_55%)]"
              aria-hidden
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
