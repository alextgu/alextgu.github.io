"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const WALL_IMAGE = "/assets/desk.png";

type DeskDisplayProps = {
  title: string;
  content?: string;
  items?: string[];
  focused?: boolean;
  className?: string;
  children?: ReactNode;
};

/**
 * Normal display (no glass) showing a zoomed-in section of the wall.
 * The "screen" content is a crop of the same wall image; title/content overlay for state.
 */
export function DeskDisplay({
  title,
  content,
  items,
  focused = true,
  className,
  children,
}: DeskDisplayProps) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    setEntered(false);
    const timer = setTimeout(() => setEntered(true), 50);
    return () => clearTimeout(timer);
  }, [title, content, items]);

  return (
    <div
      className={cn(
        "relative flex flex-col w-full h-full rounded-lg overflow-hidden",
        "border-2 border-zinc-700/80 bg-zinc-900 shadow-xl",
        "transition-all duration-500 ease-out",
        entered
          ? focused
            ? "opacity-100 translate-x-0 translate-y-0"
            : "opacity-0 -translate-x-6 pointer-events-none"
          : "opacity-0 translate-y-2.5",
        className
      )}
    >
      {/* Screen: zoomed-in section of the wall (same image as desk, cropped) */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url('${WALL_IMAGE}')`,
          backgroundSize: "280%",
          backgroundPosition: "18% 50%",
        }}
        aria-hidden
      />
      {/* Overlay: title + content so routing/state still work */}
      <div className="relative inset-0 flex flex-col p-6 pt-8 overflow-y-auto bg-gradient-to-b from-black/40 to-transparent">
        <h2 className="font-serif text-xl text-white drop-shadow-md">
          {title}
        </h2>
        {content && (
          <p className="font-sans text-sm leading-relaxed text-white/90 whitespace-pre-wrap mt-2 drop-shadow">
            {content}
          </p>
        )}
        {items && items.length > 0 && (
          <ul className="list-disc list-inside space-y-1.5 font-sans text-sm leading-relaxed text-white/90 mt-2">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
        {children}
      </div>
    </div>
  );
}
