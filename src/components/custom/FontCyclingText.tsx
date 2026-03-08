"use client";

import { useState, useEffect, useRef } from "react";

const FONT_FAMILIES = [
  "'Pacifico', cursive",
  "'Lobster', sans-serif",
  "'Bangers', cursive",
  "'Righteous', sans-serif",
  "'Playfair Display', serif",
  "'Permanent Marker', cursive",
  "'Rye', serif",
];

const CYCLE_INTERVAL_MS = 180;

type FontCyclingTextProps = {
  children: React.ReactNode;
  className?: string;
};

export function FontCyclingText({ children, className = "" }: FontCyclingTextProps) {
  const [fontIndex, setFontIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isHovered) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setFontIndex(0);
      return;
    }
    intervalRef.current = setInterval(() => {
      setFontIndex((i) => (i + 1) % FONT_FAMILIES.length);
    }, CYCLE_INTERVAL_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered]);

  return (
    <span
      className={className}
      style={{
        fontFamily: isHovered ? FONT_FAMILIES[fontIndex] : undefined,
        transition: "font-family 0.12s ease",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </span>
  );
}
