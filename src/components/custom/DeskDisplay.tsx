"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type DeskDisplayProps = {
  title: string;
  content?: string;
  items?: string[];
  focused?: boolean;
  className?: string;
  children?: ReactNode;
};

/**
 * Normal display (no glass) showing a stylized wall background.
 * The \"screen\" content overlays the background so routing/state still work.
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
      {/* Screen background: gradient stand-in until desk image exists */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0,rgba(255,255,255,0.08),transparent_55%),radial-gradient(circle_at_80%_100%,rgba(255,255,255,0.06),transparent_55%)] bg-zinc-900"
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
