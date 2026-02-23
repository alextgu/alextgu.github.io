"use client";

import Image from "next/image";

interface DesktopIconProps {
  label: string;
  selected?: boolean;
  onClick: () => void;
  onDoubleClick: () => void;
  iconType?: "folder" | "document";
}

export function DesktopIcon({ label, selected, onClick, onDoubleClick, iconType = "folder" }: DesktopIconProps) {
  return (
    <button
      type="button"
      className="flex flex-col items-center gap-1.5 w-24 cursor-default select-none"
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      <div
        className={`p-0.5 rounded-md transition-colors duration-75 flex items-center justify-center
          ${selected ? "bg-white/20 ring-1 ring-white/30" : "hover:bg-white/5"}`}
      >
        {iconType === "document" ? (
          <div className="w-[72px] h-[72px] rounded bg-white/10 shrink-0" aria-hidden />
        ) : (
          <Image
            src="/assets/folder.png"
            alt={label}
            width={72}
            height={72}
            className="drop-shadow-lg pointer-events-none object-contain"
            draggable={false}
          />
        )}
      </div>
      <span
        className={`text-[11px] leading-tight text-center font-sans max-w-full truncate px-1.5 py-0.5 rounded
          ${selected ? "bg-white/25 text-white" : "text-white/90 drop-shadow-md"}`}
      >
        {label}
      </span>
    </button>
  );
}
