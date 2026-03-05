"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { FadingSlideshow } from "@/components/custom/FadingSlideshow";
import { AnimatedWords } from "@/components/custom/AnimatedWords";
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
      {/* Subtle overlay when focused */}
      <div
        className={
          "fixed inset-0 z-[1] bg-foreground/5 transition-opacity duration-500 pointer-events-none " +
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

      {/* Poster content — full width on mobile, left 45% on desktop */}
      <div
        className={
          "fixed left-0 top-0 z-10 flex h-screen w-full md:max-w-[45%] flex-col items-stretch p-6 md:p-10 pt-24 md:pt-28 pb-12 transition-opacity duration-500 " +
          (isFocused ? "opacity-100" : "opacity-0 pointer-events-none")
        }
      >
        <div className="w-full max-w-xl shrink-0">
          {/* Same size on mobile (text-2xl) for consistent rows; scale up from md */}
          <h1 className="font-serif font-normal text-2xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground tracking-tight leading-[1.1]">
            <AnimatedWords text="Hi I'm Alex" stagger={0.06} />
          </h1>
          <motion.p
            key={currentState.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-serif font-normal text-2xl md:text-3xl lg:text-4xl text-foreground tracking-tight mt-2"
          >
            <AnimatedWords text={currentState.title} stagger={0.05} />
          </motion.p>
        </div>
        <motion.div
          key={currentState.title + "-content"}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-3 flex min-h-0 w-full flex-1 flex-col justify-center"
        >
          {currentState.displayType === "HUD_CARD" && "content" in currentState && currentState.content && (
            <div className="flex w-full flex-col gap-4 md:gap-6 sm:gap-8">
              {currentState.content
                .split(/\n\n+/)
                .map((paragraph, i) => (
                  <p
                    key={i}
                    className="font-serif font-normal text-2xl md:text-3xl lg:text-4xl text-muted-foreground leading-snug whitespace-pre-wrap w-full"
                  >
                    <AnimatedWords text={paragraph.trim()} stagger={0.03} />
                  </p>
                ))}
            </div>
          )}
          {currentState.displayType === "HUD_LIST" && "items" in currentState && currentState.items?.length > 0 && (
            <ul className="space-y-2 md:space-y-3 font-serif font-normal text-2xl md:text-3xl lg:text-4xl text-muted-foreground w-full max-w-xl">
              {currentState.items.map((item) => (
                <li key={item}>
                  <AnimatedWords text={item} stagger={0.02} />
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </div>

      {/* Right: fading image slideshow — hidden on mobile, show from md */}
      <div className="fixed right-0 top-0 z-10 hidden md:flex h-screen w-[55%] items-center justify-center p-8 pt-24 pb-12 pointer-events-none">
        <div className="w-full max-w-md pointer-events-auto">
          {isFocused && (
            <FadingSlideshow
              items={billboardItems.map((i) => ({ image: i.image, title: i.title, id: i.id }))}
              intervalMs={5000}
              className="w-full"
            />
          )}
        </div>
      </div>
    </>
  );
}

function HUDFallback() {
  return (
    <>
      <div className="fixed inset-0 z-[1] bg-foreground/10 pointer-events-none" aria-hidden />
      <div className="fixed left-0 top-0 z-10 flex h-screen w-full md:max-w-[45%] items-center p-6 md:p-10 pt-24 pb-12">
        <div className="w-full max-w-md animate-pulse">
          <div className="h-9 w-3/4 bg-foreground/20 rounded" />
          <div className="mt-4 h-4 w-full bg-foreground/10 rounded" />
          <div className="mt-2 h-4 w-5/6 bg-foreground/10 rounded" />
        </div>
      </div>
      <div className="fixed right-0 top-0 z-10 hidden md:flex h-screen w-[55%] items-center justify-center p-8 pt-24 pb-12">
        <div className="w-full max-w-md aspect-[4/5] max-h-[70vh] rounded-lg bg-foreground/10 animate-pulse" />
      </div>
    </>
  );
}

export default function Home() {
  return (
    <div className="relative h-screen overflow-hidden font-sans bg-background">
      {/* Theme background (midnight blue in dark, warm white in light) */}
      <div className="fixed inset-0 bg-background" aria-hidden />

      <Suspense fallback={<HUDFallback />}>
        <DeskHUD />
      </Suspense>
    </div>
  );
}
