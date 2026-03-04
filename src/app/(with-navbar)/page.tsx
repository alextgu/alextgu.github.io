"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { DeskDisplay } from "@/components/custom/DeskDisplay";
import { Billboard } from "@/components/custom/Billboard";
import { ViewLoader } from "@/components/custom/ViewLoader";
import { Button } from "@/components/ui/button";
import { getContentByView, getBillboardItems, siteContent } from "@/lib/content";

function DeskHUD() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const viewParam = searchParams.get("view");
  const exploreParam = searchParams.get("explore");

  const [isExplorationMode, setIsExplorationMode] = useState(false);
  const [activeView, setActiveView] = useState<string | null>(null);

  useEffect(() => {
    if (exploreParam === "true") {
      setIsExplorationMode(true);
      setActiveView(null);
    } else if (viewParam && viewParam in siteContent.deskStates) {
      setActiveView(viewParam);
      setIsExplorationMode(false);
    } else {
      setIsExplorationMode(false);
      setActiveView(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const currentState = getContentByView(activeView);
  const isFocused = !isExplorationMode;
  const billboardItems = getBillboardItems();

  const showView = (viewKey: string) => {
    setActiveView(viewKey);
    setIsExplorationMode(false);
    router.replace(`/?view=${viewKey}`, { scroll: false });
  };

  return (
    <>
      {/* Dim overlay — visible when HUD is focused */}
      <div
        className={
          "fixed inset-0 z-[1] bg-black/30 transition-opacity duration-500 pointer-events-none " +
          (isExplorationMode ? "opacity-0" : "opacity-100")
        }
        aria-hidden
      />

      {/* Exploration-mode action buttons */}
      {isExplorationMode && (
        <div className="fixed bottom-6 right-6 z-20 flex flex-col gap-3 items-end">
          <Button
            variant="outline"
            className="border-stone-400 bg-stone-100/95 text-stone-800 hover:bg-stone-200/95 shadow-lg"
            onClick={() => router.push("/computer")}
          >
            Open Computer
          </Button>
          <Button
            variant="outline"
            className="border-stone-400 bg-stone-100/95 text-stone-800 hover:bg-stone-200/95 shadow-lg"
            onClick={() => {/* TODO: open contact popup */}}
          >
            Contact
          </Button>
          <Button
            variant="outline"
            className="border-stone-400 bg-stone-100/95 text-stone-800 hover:bg-stone-200/95 shadow-lg"
            onClick={() => {/* TODO: open bucket list popup */}}
          >
            Bucket List
          </Button>
        </div>
      )}

      {/* Normal display (zoomed wall section) */}
      <div className="fixed left-0 top-0 z-10 flex h-screen w-full max-w-[45%] items-stretch p-8 pt-24 pb-8 overflow-hidden pointer-events-none">
        <DeskDisplay
          key={currentState.title}
          title={currentState.title}
          content={currentState.displayType === "HUD_CARD" ? currentState.content : undefined}
          items={currentState.displayType === "HUD_LIST" ? currentState.items : undefined}
          focused={isFocused}
          className="w-full h-full pointer-events-auto"
        />
      </div>

      {/* Billboard — right side */}
      <div className="fixed right-0 top-0 z-10 flex h-screen w-[55%] items-center justify-center p-8 pt-24 pb-8 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-lg">
          <Billboard
            items={billboardItems}
            visible={isFocused}
            onBlogClick={(id) => {
              showView(`blog&id=${id}`);
            }}
          />
        </div>
      </div>
    </>
  );
}

function HUDFallback() {
  return (
    <>
      <div className="fixed inset-0 z-[1] bg-black/30 pointer-events-none" aria-hidden />
      <div className="fixed left-0 top-0 z-10 flex h-screen w-full max-w-[45%] items-stretch p-8 pt-24 pb-8 overflow-hidden pointer-events-none">
        <ViewLoader variant="card" className="w-full h-full" />
      </div>
      <div className="fixed right-0 top-0 z-10 flex h-screen w-[55%] items-center justify-center p-8 pt-24 pb-8 pointer-events-none">
        <div className="w-full max-w-lg">
          <ViewLoader variant="billboard" />
        </div>
      </div>
    </>
  );
}

export default function Home() {
  return (
    <div className="relative h-screen overflow-hidden font-sans">
      {/* Desk background — zoom out from display area when entering desk view */}
      <motion.div
        className="fixed inset-0 bg-zinc-950 bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/desk.png')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          transformOrigin: "20% 50%",
        }}
        initial={{
          scale: 1.7,
        }}
        animate={{
          scale: 1,
        }}
        transition={{
          duration: 1,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        aria-hidden
      />

      <Suspense fallback={<HUDFallback />}>
        <DeskHUD />
      </Suspense>
    </div>
  );
}
