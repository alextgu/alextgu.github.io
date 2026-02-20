"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import content from "@/data/content.json";
import { GlassCard } from "@/components/custom/GlassCard";

function HomeDesk() {
  const searchParams = useSearchParams();
  const view = searchParams.get("view");
  const deskStates = content.deskStates as Record<
    string,
    { displayType: string; title: string; content: string }
  >;

  const viewKey = view && view in deskStates ? view : "alex";
  const deskState = deskStates[viewKey] ?? null;

  return (
    <>
      {/* Desk background — stationary, always visible */}
      <div className="fixed inset-0 bg-zinc-50 dark:bg-black" aria-hidden />

      {/* HUD Factory: when ?view= matches a deskState, show GlassCard on left 1/3 */}
      {deskState && deskState.displayType === "HUD_CARD" && (
        <div className="fixed left-0 top-0 z-10 flex h-full w-full max-w-[33.333%] items-start p-8 pt-24">
          <GlassCard
            title={deskState.title}
            content={deskState.content}
            className="w-full"
          />
        </div>
      )}
    </>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <Suspense fallback={<div className="fixed inset-0 bg-zinc-50 dark:bg-black" />}>
        <HomeDesk />
      </Suspense>
    </div>
  );
}
