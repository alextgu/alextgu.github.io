"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const SLIDES = [
  "/desk.png",
  "/desk.png",
];

const INTERVAL_MS = 4000;

type LaptopSlideshowProps = {
  visible?: boolean;
  className?: string;
};

export function LaptopSlideshow({ visible = true, className }: LaptopSlideshowProps) {
  const [current, setCurrent] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!visible) return;
    setReady(true);
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "absolute overflow-hidden rounded-sm bg-black/60",
        "transition-opacity duration-500",
        ready ? "opacity-100" : "opacity-0",
        className
      )}
    >
      {SLIDES.map((src, i) => (
        <Image
          key={src + i}
          src={src}
          alt={`Project screenshot ${i + 1}`}
          fill
          sizes="15vw"
          className={cn(
            "object-cover transition-opacity duration-700",
            i === current ? "opacity-100" : "opacity-0"
          )}
        />
      ))}
    </div>
  );
}
