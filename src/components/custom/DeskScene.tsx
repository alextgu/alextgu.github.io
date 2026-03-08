"use client";

import React, { useState, useCallback } from "react";

export type DeskHitboxDef = {
  id: string;
  label: string;
  /** Percent or px: left position (e.g. "10%" or "120px") */
  left: string;
  /** Percent or px: top position */
  top: string;
  /** Width (e.g. "15%" or "80px") */
  width: string;
  /** Height (e.g. "12%" or "60px") */
  height: string;
  onClick?: () => void;
};

type DeskSceneProps = {
  /** URL for the background video (e.g. /assets/desk-video.mp4) */
  videoSrc: string;
  /** URL for the desk PNG with transparent window cutout */
  deskMaskSrc: string;
  /** Hitbox definitions (Notebook, Lamp, Phone, etc.) */
  hitboxes: DeskHitboxDef[];
  /** Aspect ratio of the desk art (default 16/9) */
  aspectRatio?: string;
  className?: string;
};

export function DeskScene({
  videoSrc,
  deskMaskSrc,
  hitboxes,
  aspectRatio = "16 / 9",
  className = "",
}: DeskSceneProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleMouseEnter = useCallback((id: string) => {
    setHoveredId(id);
  }, []);
  const handleMouseLeave = useCallback(() => {
    setHoveredId(null);
  }, []);

  return (
    <div
      id="desk-scene"
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio }}
    >
      {/* Layer 1: Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden
      />

      {/* Layer 2: Desk mask (transparent PNG – window cutout shows video through) */}
      <img
        src={deskMaskSrc}
        alt=""
        role="presentation"
        className={`absolute inset-0 w-full h-full object-cover object-center pointer-events-none transition-[filter] duration-200 ${
          hoveredId ? "brightness-[1.2]" : ""
        }`}
        style={{ zIndex: 1 }}
      />

      {/* Layer 3: Transparent hitboxes */}
      <div
        className="absolute inset-0"
        style={{ zIndex: 2 }}
        aria-hidden
      >
        {hitboxes.map((hb) => (
          <button
            key={hb.id}
            type="button"
            aria-label={hb.label}
            onClick={hb.onClick}
            onMouseEnter={() => handleMouseEnter(hb.id)}
            onMouseLeave={handleMouseLeave}
            className="absolute opacity-0 cursor-pointer hover:opacity-0"
            style={{
              left: hb.left,
              top: hb.top,
              width: hb.width,
              height: hb.height,
            }}
          />
        ))}
      </div>
    </div>
  );
}
