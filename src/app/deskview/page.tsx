"use client";

import { DeskScene } from "@/components/custom/DeskScene";
import Link from "next/link";

const DESK_VIDEO_SRC = "/assets/desk-video.mp4";
const DESK_MASK_SRC = "/assets/desk-mask.png";

const DESK_HITBOXES = [
  { id: "notebook", label: "Notebook", left: "12%", top: "52%", width: "14%", height: "18%" },
  { id: "lamp", label: "Lamp", left: "72%", top: "38%", width: "12%", height: "28%" },
  { id: "phone", label: "Phone", left: "48%", top: "58%", width: "10%", height: "14%" },
];

export default function DeskViewPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <DeskScene
          videoSrc={DESK_VIDEO_SRC}
          deskMaskSrc={DESK_MASK_SRC}
          hitboxes={DESK_HITBOXES.map((hb) => ({
            ...hb,
            onClick: hb.id === "phone" ? () => {/* TODO: open contact */} : undefined,
          }))}
          className="w-full max-w-5xl aspect-video"
        />
        <Link
          href="/"
          className="mt-6 text-sm text-foreground/70 hover:text-foreground underline underline-offset-2"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
