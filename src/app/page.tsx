"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { GlassCard } from "@/components/custom/GlassCard";
import content from "@/data/content.json";

function DeskView() {
  const searchParams = useSearchParams();
  const view = searchParams.get("view");
  
  const deskStates = content.deskStates as Record<
    string,
    { displayType: string; title: string; content: string }
  >;

  // Determine which content to show based on view parameter
  const viewKey = view && view in deskStates ? view : "alex";
  const currentContent = deskStates[viewKey];

  return (
    <>
      {/* Desk background - always visible */}
      <div className="fixed inset-0 bg-zinc-50 dark:bg-black" aria-hidden />
      
      {/* GlassCard with animation */}
      <div className="fixed left-0 top-0 z-10 flex h-screen w-full max-w-[45%] items-stretch p-8 pt-24 pb-8 overflow-hidden pointer-events-none">
        <GlassCard
          key={viewKey}
          title={currentContent.title}
          content={currentContent.content}
          className="w-full h-full overflow-y-auto pointer-events-auto"
        />
      </div>
    </>
  );
}

export default function Home() {
  return (
    <div className="relative h-screen overflow-hidden bg-zinc-50 font-sans dark:bg-black">
      <Suspense fallback={
        <div className="fixed inset-0 bg-zinc-50 dark:bg-black" aria-hidden />
      }>
        <DeskView />
      </Suspense>
    </div>
  );
}
