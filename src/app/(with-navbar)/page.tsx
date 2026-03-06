"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedWords } from "@/components/custom/AnimatedWords";
import { FontCyclingText } from "@/components/custom/FontCyclingText";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { getContentByView, siteContent } from "@/lib/content";

/** High-res room background — add /public/assets/room-bg.jpg for your room image */
const ROOM_BACKGROUND = "/assets/room-bg.jpg";

const EMPHASIZED_PHRASES = [
  "work",
  "interests",
  "CS & Stats",
  "sports",
  "cinematography",
  "noodles",
  "building",
  "website",
];

function splitByEmphasized(text: string): string[] {
  const escaped = EMPHASIZED_PHRASES.map((p) =>
    p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );
  // Include optional trailing . or , so punctuation stays next to emphasized words
  const regex = new RegExp(`(${escaped.map((e) => `${e}[.,]?`).join("|")})`, "gi");
  return text.split(regex).filter(Boolean);
}

function isEmphasized(part: string): boolean {
  const trimmed = part.replace(/[.,]$/, "");
  return EMPHASIZED_PHRASES.some(
    (p) => p.toLowerCase() === trimmed.toLowerCase()
  );
}

function getEmphasizedBase(part: string): string {
  return part.replace(/[.,]$/, "");
}

function DeskHUD() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const viewParam = searchParams.get("view");
  const exploreParam = searchParams.get("explore");

  const [isExplorationMode, setIsExplorationMode] = useState(false);
  const [activeView, setActiveView] = useState<string | null>(null);
  const [showWebsitePopup, setShowWebsitePopup] = useState(false);
  const [isAlexHovered, setIsAlexHovered] = useState(false);

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
  const isHomeView = exploreParam !== "true";

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

      {/* Virtual Camera: single rig with room bg, transform-only (scale/translate) */}
      <div
        id="camera-viewport"
        className="fixed inset-0 z-[2] overflow-hidden bg-[#e8e4dc] dark:bg-[#1c1b19]"
        aria-hidden={false}
      >
        <motion.div
          id="camera-rig"
          className="absolute left-0 top-0 h-screen w-screen origin-top-left"
          style={{
            willChange: "transform",
            backgroundImage: `url(${ROOM_BACKGROUND})`,
            backgroundSize: "cover",
            backgroundPosition: "top left",
            backgroundColor: "#e8e4dc",
          }}
          initial={false}
          animate={{
            scale: isHomeView ? 1 : 0.28,
            x: 0,
            y: 0,
          }}
          transition={{ duration: 0.85, ease: [0.33, 0, 0.2, 1] }}
        >
          {/* Home poster on wall — always in scene, scales with rig */}
          <div
            className="absolute left-4 top-20 z-[1] w-[min(300px,26vw)] rounded-xl border-[5px] border-stone-400 dark:border-stone-600 bg-background shadow-2xl dark:shadow-black/40 p-5 overflow-hidden pointer-events-none"
            aria-hidden
          >
            <div className="font-serif text-foreground">
              <p className="text-lg md:text-xl font-normal tracking-tight text-foreground/60">Hi I&apos;m</p>
              <p className="text-xl md:text-2xl font-normal tracking-tight mt-0.5">Alex</p>
              <p className="text-sm md:text-base text-foreground/70 mt-2 leading-snug">Welcome to my personal website!</p>
            </div>
          </div>

          {/* Desk — Home: fills view; Alex: small frame on wall (no blur, no opacity transition) */}
          <div
            className={
              "relative z-10 flex h-screen w-screen flex-shrink-0 flex-col md:flex-row " +
              (isFocused ? "opacity-100" : "opacity-0 pointer-events-none") +
              (isHomeView
                ? " bg-background"
                : " rounded-xl border-[6px] border-stone-400 dark:border-stone-600 bg-background shadow-2xl dark:shadow-black/40 mt-4 ml-4 md:mt-6 md:ml-6")
            }
          >
        {/* Poster content — left side (mobile: min-h allows content + slideshow to flow) */}
        <div className="flex min-h-screen md:h-screen w-full md:w-[55%] flex-col overflow-y-auto overflow-x-hidden p-6 md:p-10 pt-24 md:pt-28 pb-12">
        <div className="min-w-0 w-full shrink-0">
          <h1 className="font-serif font-medium text-6xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight leading-[1.1] break-words">
            <span className="text-foreground/60">Hi I&apos;m </span>
            <span
              className="text-foreground font-medium cursor-default inline"
              onMouseEnter={() => setIsAlexHovered(true)}
              onMouseLeave={() => setIsAlexHovered(false)}
            >
              <AnimatePresence mode="wait">
                {isAlexHovered ? (
                  <motion.span
                    key="alexander"
                    className="inline"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {"Alexander Gu".split("").map((char, i) => (
                      <motion.span
                        key={`${i}-${char}`}
                        className="inline"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.06, duration: 0.1 }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.span>
                ) : (
                  <motion.span
                    key="alex"
                    className="inline"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    Alex
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </h1>
          <motion.div
            key={currentState.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mt-0 w-full"
          >
            <p className="font-serif font-medium text-3xl md:text-3xl lg:text-4xl mt-0 leading-normal break-words">
              <span className="text-foreground/60">Welcome to my </span>
              <FontCyclingText className="text-foreground font-medium cursor-default">
              personal website!
            </FontCyclingText>
            </p>
          </motion.div>
        </div>
        <motion.div
          key={currentState.subtitle + "-content"}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-3 flex w-full min-h-0 flex-col"
        >
          {currentState.displayType === "HUD_CARD" && "content" in currentState && currentState.content && (
            <div className="flex w-full flex-col gap-1">
              {currentState.content
                .split(/\n\n+/)
                .map((paragraph, i) => (
                  <p
                    key={i}
                    className="font-serif font-medium text-3xl md:text-3xl lg:text-4xl leading-snug whitespace-pre-wrap w-full last:mb-0"
                  >
                    {(() => {
                      const parts = splitByEmphasized(paragraph);
                      return parts.map((part, j) => {
                        const base = getEmphasizedBase(part);
                        const emphasized = isEmphasized(part);
                        const isWebsite = base.toLowerCase() === "website";
                        const isSquiggly =
                          base.toLowerCase() === "sports" ||
                          base.toLowerCase() === "cinematography" ||
                          base.toLowerCase() === "noodles";
                        const nextPart = parts[j + 1];
                        // Add space when: next part has leading space (AnimatedWords trims it) or starts with a word (needs separator).
                        // Don't add when next part starts with punctuation (e.g. ", " or ". ") to avoid double spacing.
                        const needsSpaceAfter =
                          emphasized &&
                          j < parts.length - 1 &&
                          nextPart &&
                          (/^\s/.test(nextPart) || !/^[.,\s]/.test(nextPart));
                        if (isWebsite) {
                          return (
                            <button
                              key={`${i}-${j}`}
                              type="button"
                              onClick={() => setShowWebsitePopup(true)}
                              className="text-foreground font-medium underline underline-offset-2 decoration-foreground/80 hover:decoration-foreground cursor-pointer bg-transparent border-0 p-0 font-inherit text-inherit inline-block transition-transform duration-150 hover:scale-[1.02]"
                            >
                              {part}
                            </button>
                          );
                        }
                        if (emphasized) {
                          const squigglyClass =
                            base.toLowerCase() === "sports"
                              ? "bio-squiggly sports"
                              : base.toLowerCase() === "cinematography"
                                ? "bio-squiggly cinematography"
                                : base.toLowerCase() === "noodles"
                                  ? "bio-squiggly noodles"
                                  : base.toLowerCase() === "cs & stats"
                                    ? "inline-block underline decoration-2 underline-offset-2 decoration-transparent hover:decoration-yellow-500 dark:hover:decoration-yellow-400 transition-colors"
                                    : "";
                          const tooltip =
                            base.toLowerCase() === "building"
                              ? "Check out my projects section!"
                              : base.toLowerCase() === "work"
                                ? "Check out my experience section on my computer!"
                                : base.toLowerCase() === "interests"
                                  ? "Check out my hobbies section!"
                                  : undefined;
                          const isCSStats = base.toLowerCase() === "cs & stats";
                          const spaceInside = needsSpaceAfter && !isCSStats;
                          const spanEl = (
                            <span
                              className={`text-foreground font-medium py-0.5 ${squigglyClass}`.trim()}
                            >
                              {part}
                              {spaceInside ? " " : null}
                            </span>
                          );
                          const spaceAfter = needsSpaceAfter && isCSStats ? " " : null;
                          if (tooltip) {
                            return (
                              <Tooltip key={`${i}-${j}`}>
                                <TooltipTrigger asChild>{spanEl}</TooltipTrigger>
                                <TooltipContent
                                  side="top"
                                  align="center"
                                  sideOffset={6}
                                  className="max-w-[220px]"
                                >
                                  {tooltip}
                                </TooltipContent>
                              </Tooltip>
                            );
                          }
                          return (
                            <React.Fragment key={`${i}-${j}`}>
                              {React.cloneElement(spanEl)}
                              {spaceAfter}
                            </React.Fragment>
                          );
                        }
                      return (
                        <span key={`${i}-${j}`} className="text-foreground/60">
                          <AnimatedWords text={part} stagger={0.03} />
                        </span>
                      );
                    });
                    })()}
                  </p>
                ))}
            </div>
          )}
          {currentState.displayType === "HUD_LIST" && "items" in currentState && currentState.items?.length > 0 && (
            <ul className="space-y-2 md:space-y-3 font-serif font-medium text-3xl md:text-3xl lg:text-4xl text-foreground w-full">
              {currentState.items.map((item) => (
                <li key={item}>
                  <AnimatedWords text={item} stagger={0.02} />
                </li>
              ))}
            </ul>
          )}
        </motion.div>

        {/* Mobile: horizontal slideshow with snap scroll sections */}
        {isFocused && isHomeView && (
          <div className="md:hidden mt-8 -mx-6 overflow-x-auto overflow-y-hidden snap-x snap-mandatory hide-scrollbar">
            <div className="flex gap-4 px-6 pb-6">
              <section className="flex-shrink-0 w-[calc(100vw-3rem)] min-w-[280px] snap-center snap-always rounded-lg border border-border bg-muted/20 p-6 text-foreground/80 text-sm">
                <h3 className="font-serif font-medium text-foreground text-base mb-2">Alex</h3>
                <p className="leading-relaxed">
                  A bit about you—intro, background, or whatever you want in this first section.
                </p>
              </section>
              <section className="flex-shrink-0 w-[calc(100vw-3rem)] min-w-[280px] snap-center snap-always rounded-lg border border-border bg-muted/20 p-6 text-foreground/80 text-sm">
                <h3 className="font-serif font-medium text-foreground text-base mb-2">School (major program)</h3>
                <p className="leading-relaxed">
                  Your program, degree, or what you&apos;re studying—e.g. CS &amp; Stats at U of T.
                </p>
              </section>
              <section className="flex-shrink-0 w-[calc(100vw-3rem)] min-w-[280px] snap-center snap-always rounded-lg border border-border bg-muted/20 p-6 text-foreground/80 text-sm">
                <h3 className="font-serif font-medium text-foreground text-base mb-2">Sports, cinematography, noodles and building</h3>
                <p className="leading-relaxed">
                  The things you love—sports, cinematography, eating noodles, and building stuff. Add your own copy and media here.
                </p>
              </section>
            </div>
          </div>
        )}
      </div>

        {/* Right: scroll-by-page sections — hidden on mobile, show from md */}
        <div className="hidden md:flex md:flex-col h-screen w-[45%] flex-shrink-0 overflow-y-auto overflow-x-hidden snap-y snap-mandatory">
        {isFocused && (
          <>
            <section className="min-h-[100dvh] w-full flex-shrink-0 snap-start flex flex-col justify-center p-8 pt-24 pb-12">
              <div className="w-full max-w-md mx-auto rounded-lg border border-border bg-muted/20 p-6 text-foreground/80 text-sm">
                <h3 className="font-serif font-medium text-foreground text-base mb-2">Alex</h3>
                <p className="leading-relaxed">
                  A bit about you—intro, background, or whatever you want in this first section.
                </p>
              </div>
            </section>
            <section className="min-h-[100dvh] w-full flex-shrink-0 snap-start flex flex-col justify-center p-8 pt-24 pb-12">
              <div className="w-full max-w-md mx-auto rounded-lg border border-border bg-muted/20 p-6 text-foreground/80 text-sm">
                <h3 className="font-serif font-medium text-foreground text-base mb-2">School (major program)</h3>
                <p className="leading-relaxed">
                  Your program, degree, or what you’re studying—e.g. CS &amp; Stats at U of T.
                </p>
              </div>
            </section>
            <section className="min-h-[100dvh] w-full flex-shrink-0 snap-start flex flex-col justify-center p-8 pt-24 pb-12">
              <div className="w-full max-w-md mx-auto rounded-lg border border-border bg-muted/20 p-6 text-foreground/80 text-sm">
                <h3 className="font-serif font-medium text-foreground text-base mb-2">Sports, cinematography, noodles and building</h3>
                <p className="leading-relaxed">
                  The things you love—sports, cinematography, eating noodles, and building stuff. Add your own copy and media here.
                </p>
              </div>
            </section>
          </>
        )}
        </div>
          </div>
        </motion.div>
      </div>

      {/* Website popup — crumpled paper style (opened by clicking "website" in the bio, e.g. "don't get lost on my website") */}
      <Dialog open={showWebsitePopup} onOpenChange={setShowWebsitePopup}>
        <DialogContent
          className="max-w-4xl p-0 overflow-hidden border-0 shadow-none bg-transparent"
          showCloseButton={true}
        >
          <div
            className="relative rounded-[2rem] p-8 min-h-[280px]"
            style={{
              background: "linear-gradient(145deg, #f5f0e6 0%, #e8e0d2 25%, #ebe4d8 50%, #e2d9c9 75%, #ede6dc 100%)",
              boxShadow: `
                2px 2px 2px rgba(0,0,0,0.04),
                -1px -1px 3px rgba(255,255,255,0.6),
                4px 6px 8px rgba(0,0,0,0.06),
                8px 12px 16px rgba(0,0,0,0.08),
                inset 0 1px 0 rgba(255,255,255,0.5),
                inset 1px 0 0 rgba(255,255,255,0.3)
              `,
            }}
          >
            <div className="relative">
              <DialogTitle className="text-lg font-semibold text-stone-800 dark:text-stone-200">
                Website
              </DialogTitle>
              <div className="mt-4 min-h-[200px] rounded-lg p-6 text-stone-600 dark:text-stone-400 text-sm border border-stone-300/50 dark:border-stone-600/50 bg-white/30 dark:bg-black/20">
                Design your content here.
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
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
