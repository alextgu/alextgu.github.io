"use client";

import { cn } from "@/lib/utils";

type DeskHitboxProps = {
  label: string;
  className?: string;
  visible?: boolean;
  onClick?: () => void;
};

export function DeskHitbox({ label, className, visible = true, onClick }: DeskHitboxProps) {
  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "absolute rounded-lg cursor-pointer transition-all duration-300",
        "border-2 border-dashed border-white/50",
        "hitbox-hint hover:bg-white/15 hover:backdrop-blur-[1px]",
        "flex items-end justify-center pb-2",
        className
      )}
    >
      <span className="text-[10px] font-sans text-white/60 select-none">
        {label}
      </span>
    </button>
  );
}
