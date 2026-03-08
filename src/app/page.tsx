"use client";

import React, { Suspense, useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedWords } from "@/components/custom/AnimatedWords";
import { FontCyclingText } from "@/components/custom/FontCyclingText";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/components/custom/ToastMaster";
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

const WEBSITE_TYPEOUT = "[enter my website]";
const WEBSITE_TYPEOUT_MS = 50;

function WebsiteTypewriter() {
  const toast = useToast();
  const [hovered, setHovered] = useState(false);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (!hovered) {
      setTyped("");
      return;
    }
    if (typed.length >= WEBSITE_TYPEOUT.length) return;
    const t = setTimeout(() => {
      setTyped(WEBSITE_TYPEOUT.slice(0, typed.length + 1));
    }, WEBSITE_TYPEOUT_MS);
    return () => clearTimeout(t);
  }, [hovered, typed]);

  return (
    <Link
      href="/?explore=true"
      scroll={false}
      className="bio-website-link text-foreground font-medium cursor-pointer bg-transparent border-0 p-0 font-inherit text-inherit inline transition-opacity duration-150"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => toast.addToast("Alex's desk entered")}
    >
      <span className="inline-block min-w-[5.5em] text-left underline decoration-2 underline-offset-[5px] decoration-current">
        {hovered ? typed : "website"}
      </span>
    </Link>
  );
}

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
  const toast = useToast();
  const viewParam = searchParams.get("view");
  const exploreParam = searchParams.get("explore");

  const [isExplorationMode, setIsExplorationMode] = useState(false);
  const [activeView, setActiveView] = useState<string | null>(null);
  const [isAlexHovered, setIsAlexHovered] = useState(false);
  const [showBucketListPopup, setShowBucketListPopup] = useState(false);
  const [highlightSection, setHighlightSection] = useState<"sports" | "cinematography" | "noodles" | null>(null);

  const desktopSlideRefs = useRef<(HTMLElement | null)[]>([]);
  const mobileSlideRefs = useRef<(HTMLElement | null)[]>([]);

  const scrollToSlide = useCallback((index: number, highlight?: "sports" | "cinematography" | "noodles") => {
    setHighlightSection(highlight ?? null);
    desktopSlideRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
    mobileSlideRefs.current[index]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, []);

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

      {/* Desk buttons: all desk view sections — simple buttons for now; pages/effects wired later */}
      {isExplorationMode && (
        <div className="fixed bottom-24 left-6 md:bottom-20 md:left-10 z-20 flex flex-wrap gap-x-4 gap-y-2 items-center max-w-[calc(100vw-2rem)]">
          <button
            type="button"
            onClick={() => { toast.addToast("Opened Computer"); router.push("/computer"); }}
            title="Open Computer"
            className="text-foreground/80 hover:text-foreground text-sm font-medium transition-colors"
          >
            Computer
          </button>
          <button
            type="button"
            onClick={() => router.push("/projector")}
            title="Projector"
            className="text-foreground/80 hover:text-foreground text-sm font-medium transition-colors"
          >
            Projector
          </button>
          <button
            type="button"
            onClick={() => router.push("/hobbies")}
            title="Hobbies (card game)"
            className="text-foreground/80 hover:text-foreground text-sm font-medium transition-colors"
          >
            Hobbies
          </button>
          <button
            type="button"
            onClick={() => router.push("/workbench")}
            title="Workbench"
            className="text-foreground/80 hover:text-foreground text-sm font-medium transition-colors"
          >
            Workbench
          </button>
          <button
            type="button"
            onClick={() => router.push("/map")}
            title="Map"
            className="text-foreground/80 hover:text-foreground text-sm font-medium transition-colors"
          >
            Map
          </button>
          <button
            type="button"
            onClick={() => toast.addToast("Record player — effect coming soon")}
            title="Record player"
            className="text-foreground/80 hover:text-foreground text-sm font-medium transition-colors"
          >
            Record player
          </button>
          <button
            type="button"
            onClick={() => toast.addToast("Alex Doll — effect coming soon")}
            title="Alex Doll"
            className="text-foreground/80 hover:text-foreground text-sm font-medium transition-colors"
          >
            Alex Doll
          </button>
          <button
            type="button"
            onClick={() => setShowBucketListPopup(true)}
            title="Bucket list"
            className="text-foreground/80 hover:text-foreground text-sm font-medium transition-colors"
          >
            Bucket list
          </button>
          <button
            type="button"
            onClick={() => router.push("/contact")}
            title="Contact / Mail"
            className="text-foreground/80 hover:text-foreground text-sm font-medium transition-colors"
          >
            Contact
          </button>
          <button
            type="button"
            onClick={() => router.push("/papers")}
            title="Loose papers"
            className="text-foreground/80 hover:text-foreground text-sm font-medium transition-colors"
          >
            Loose papers
          </button>
        </div>
      )}

      {/* Bucket list popup */}
      <AnimatePresence>
        {showBucketListPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowBucketListPopup(false)}
            aria-modal
            role="dialog"
            aria-label="Bucket list"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="rounded-xl border border-border bg-background p-6 shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-serif text-xl font-medium text-foreground">
                  {siteContent.deskStates.bucketlist?.displayType === "HUD_LIST" ? siteContent.deskStates.bucketlist.subtitle : "Bucket List"}
                </h2>
                <button
                  type="button"
                  onClick={() => setShowBucketListPopup(false)}
                  className="text-foreground/60 hover:text-foreground text-sm"
                  aria-label="Close"
                >
                  Close
                </button>
              </div>
              <ul className="space-y-2 text-foreground/90">
                {siteContent.deskStates.bucketlist && siteContent.deskStates.bucketlist.displayType === "HUD_LIST" && siteContent.deskStates.bucketlist.items.map((item, i) => (
                  <li key={i} className="list-disc list-inside">{item}</li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
                            <WebsiteTypewriter key={`${i}-${j}`} />
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
                              ? "Check out my projects section on my desk!"
                              : base.toLowerCase() === "work"
                                ? "Check out my experience section on my computer!"
                                : base.toLowerCase() === "interests"
                                  ? "Check out my hobbies on my desk!"
                                  : undefined;
                          const isCSStats = base.toLowerCase() === "cs & stats";
                          const hasUnderline = isSquiggly || isCSStats;
                          const spaceInside = needsSpaceAfter && !hasUnderline;
                          const spanEl = (
                            <span
                              className={`text-foreground font-medium py-0.5 ${squigglyClass}`.trim()}
                            >
                              {part}
                              {spaceInside ? " " : null}
                            </span>
                          );
                          const spaceAfter = needsSpaceAfter && hasUnderline ? " " : null;
                          if (isCSStats) {
                            return (
                              <React.Fragment key={`${i}-${j}`}>
                                <button
                                  type="button"
                                  onClick={() => scrollToSlide(1)}
                                  className="inline-block underline decoration-2 underline-offset-2 decoration-transparent hover:decoration-yellow-500 dark:hover:decoration-yellow-400 transition-colors text-foreground font-medium py-0.5 cursor-pointer bg-transparent border-0 p-0 font-inherit text-inherit"
                                >
                                  {part}
                                </button>
                                {spaceAfter}
                              </React.Fragment>
                            );
                          }
                          if (base.toLowerCase() === "building") {
                            return (
                              <Tooltip key={`${i}-${j}`}>
                                <TooltipTrigger asChild>
                                  <button
                                    type="button"
                                    onClick={() => scrollToSlide(2)}
                                    className="text-foreground font-medium py-0.5 cursor-pointer bg-transparent border-0 p-0 font-inherit text-inherit hover:opacity-90"
                                  >
                                    <span>{part}{spaceInside ? " " : null}</span>
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent side="top" align="center" sideOffset={6} className="max-w-[220px]">
                                  {tooltip}
                                </TooltipContent>
                              </Tooltip>
                            );
                          }
                          if (base.toLowerCase() === "sports" || base.toLowerCase() === "cinematography" || base.toLowerCase() === "noodles") {
                            const section = base.toLowerCase() as "sports" | "cinematography" | "noodles";
                            return (
                              <React.Fragment key={`${i}-${j}`}>
                                <button
                                  type="button"
                                  onClick={() => scrollToSlide(3, section)}
                                  className={`text-foreground font-medium py-0.5 cursor-pointer bg-transparent border-0 p-0 font-inherit text-inherit ${squigglyClass}`.trim()}
                                >
                                  {part}
                                  {spaceInside ? " " : null}
                                </button>
                                {spaceAfter}
                              </React.Fragment>
                            );
                          }
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

        {/* Mobile: horizontal slideshow — 5 slides */}
        {isFocused && isHomeView && (
          <div className="md:hidden mt-8 -mx-6 overflow-x-auto overflow-y-hidden snap-x snap-mandatory hide-scrollbar">
            <div className="flex gap-4 px-6 pb-6">
              <section ref={(el) => { mobileSlideRefs.current[0] = el; }} className="flex-shrink-0 w-[calc(100vw-3rem)] min-w-[280px] snap-center snap-always rounded-lg border border-border bg-muted/20 p-6 text-foreground/80 text-sm">
                <h3 className="font-serif font-medium text-foreground text-base mb-2">Alex</h3>
                <p className="leading-relaxed">
                  A bit about you—intro, background, or whatever you want in this first section.
                </p>
              </section>
              <section ref={(el) => { mobileSlideRefs.current[1] = el; }} className="flex-shrink-0 w-[calc(100vw-3rem)] min-w-[280px] snap-center snap-always rounded-lg border border-border bg-muted/20 p-6 text-foreground/80 text-sm">
                <h3 className="font-serif font-medium text-foreground text-base mb-2">Education</h3>
                <p className="leading-relaxed">
                  Your program, degree, or what you&apos;re studying—e.g. CS &amp; Stats at U of T.
                </p>
              </section>
              <section ref={(el) => { mobileSlideRefs.current[2] = el; }} className="flex-shrink-0 w-[calc(100vw-3rem)] min-w-[280px] snap-center snap-always rounded-lg border border-border bg-muted/20 p-6 text-foreground/80 text-sm">
                <h3 className="font-serif font-medium text-foreground text-base mb-2">A project I&apos;m proud of</h3>
                <div className="flex gap-3 items-start">
                  <div className="relative shrink-0 w-32 h-24 rounded-md overflow-hidden bg-muted">
                    <Image src="/assets/home/StupidHacks.jpeg" alt="Stupid Hacks hackathon" fill className="object-cover" sizes="128px" />
                  </div>
                  <p className="leading-relaxed text-sm flex-1 min-w-0">
                    Stupid Hacks — first place (stupidest). Add a project you&apos;re proud of here.
                  </p>
                </div>
              </section>
              <section ref={(el) => { mobileSlideRefs.current[3] = el; }} className="flex-shrink-0 w-[calc(100vw-3rem)] min-w-[280px] snap-center snap-always rounded-lg border border-border bg-muted/20 p-6 text-foreground/80 text-sm">
                <h3 className="font-serif font-medium text-foreground text-base mb-2">Sports, cinematography &amp; noodles</h3>
                <div className={`rounded-lg p-3 transition-colors ${highlightSection === "sports" ? "bg-foreground/10 ring-1 ring-foreground/20" : ""}`}>
                  <h4 className="font-medium text-foreground text-sm mb-1">Sports</h4>
                  <div className="flex gap-3 items-center">
                    <div className="relative shrink-0 w-24 h-20 rounded-md overflow-hidden bg-muted">
                      <Image src="/assets/home/baseball2.jpg" alt="Baseball" fill className="object-cover" sizes="96px" />
                    </div>
                    <p className="leading-relaxed text-sm flex-1 min-w-0">Playing sports, staying active.</p>
                  </div>
                </div>
                <div className={`mt-3 rounded-lg p-3 transition-colors ${highlightSection === "cinematography" ? "bg-foreground/10 ring-1 ring-foreground/20" : ""}`}>
                  <h4 className="font-medium text-foreground text-sm mb-1">Cinematography</h4>
                  <div className="flex gap-3 items-center">
                    <div className="relative shrink-0 w-24 h-20 rounded-md overflow-hidden bg-muted">
                      <Image src="/assets/home/watermelon.JPG" alt="Cinematography" fill className="object-cover" sizes="96px" />
                    </div>
                    <p className="leading-relaxed text-sm flex-1 min-w-0">Film and video work.</p>
                  </div>
                </div>
                <div className={`mt-3 rounded-lg p-3 transition-colors ${highlightSection === "noodles" ? "bg-foreground/10 ring-1 ring-foreground/20" : ""}`}>
                  <h4 className="font-medium text-foreground text-sm mb-1">Noodles</h4>
                  <div className="flex gap-3 items-center">
                    <div className="relative shrink-0 w-24 h-20 rounded-md overflow-hidden bg-muted">
                      <Image src="/assets/home/noodles.jpg" alt="Noodles" fill className="object-cover" sizes="96px" />
                    </div>
                    <p className="leading-relaxed text-sm flex-1 min-w-0">Eating noodles, ramen, etc.</p>
                  </div>
                </div>
              </section>
              <section ref={(el) => { mobileSlideRefs.current[4] = el; }} className="flex-shrink-0 w-[calc(100vw-3rem)] min-w-[280px] snap-center snap-always rounded-lg border border-border bg-muted/20 p-6 text-foreground/80 text-sm">
                <p className="leading-relaxed font-medium text-foreground">
                  Click on the underlined website on the left to explore my full website!
                </p>
              </section>
            </div>
          </div>
        )}
      </div>

        {/* Right: slideshow — 5 slides, scroll snap */}
        <div className="hidden md:flex md:flex-col h-screen w-[45%] flex-shrink-0 overflow-y-auto overflow-x-hidden snap-y snap-mandatory">
        {isFocused && isHomeView && (
          <>
            <section ref={(el) => { desktopSlideRefs.current[0] = el; }} className="min-h-[100dvh] w-full flex-shrink-0 snap-start flex flex-col justify-center p-8 pt-24 pb-12">
              <div className="w-full max-w-md mx-auto rounded-lg border border-border bg-muted/20 p-6 text-foreground/80 text-sm">
                <h3 className="font-serif font-medium text-foreground text-base mb-2">Alex</h3>
                <p className="leading-relaxed">
                  A bit about you—intro, background, or whatever you want in this first section.
                </p>
              </div>
            </section>
            <section ref={(el) => { desktopSlideRefs.current[1] = el; }} className="min-h-[100dvh] w-full flex-shrink-0 snap-start flex flex-col justify-center p-8 pt-24 pb-12">
              <div className="w-full max-w-md mx-auto rounded-lg border border-border bg-muted/20 p-6 text-foreground/80 text-sm">
                <h3 className="font-serif font-medium text-foreground text-base mb-2">Education</h3>
                <p className="leading-relaxed">
                  Your program, degree, or what you&apos;re studying—e.g. CS &amp; Stats at U of T.
                </p>
              </div>
            </section>
            <section ref={(el) => { desktopSlideRefs.current[2] = el; }} className="min-h-[100dvh] w-full flex-shrink-0 snap-start flex flex-col justify-center p-8 pt-24 pb-12">
              <div className="w-full max-w-md mx-auto rounded-lg border border-border bg-muted/20 p-6 text-foreground/80 text-sm">
                <h3 className="font-serif font-medium text-foreground text-base mb-2">A project I&apos;m proud of</h3>
                <div className="flex gap-4 items-start">
                  <div className="relative shrink-0 w-40 h-28 rounded-md overflow-hidden bg-muted">
                    <Image src="/assets/home/StupidHacks.jpeg" alt="Stupid Hacks hackathon" fill className="object-cover" sizes="160px" />
                  </div>
                  <p className="leading-relaxed flex-1 min-w-0">
                    Stupid Hacks — first place (stupidest). Add a project you&apos;re proud of here.
                  </p>
                </div>
              </div>
            </section>
            <section ref={(el) => { desktopSlideRefs.current[3] = el; }} className="min-h-[100dvh] w-full flex-shrink-0 snap-start flex flex-col justify-center p-8 pt-24 pb-12">
              <div className="w-full max-w-md mx-auto rounded-lg border border-border bg-muted/20 p-6 text-foreground/80 text-sm space-y-4">
                <h3 className="font-serif font-medium text-foreground text-base mb-2">Sports, cinematography &amp; noodles</h3>
                <div className={`rounded-lg p-4 transition-colors duration-200 ${highlightSection === "sports" ? "bg-foreground/10 ring-1 ring-foreground/20" : ""}`}>
                  <h4 className="font-medium text-foreground text-sm mb-1">Sports</h4>
                  <div className="flex gap-4 items-center">
                    <div className="relative shrink-0 w-32 h-24 rounded-md overflow-hidden bg-muted">
                      <Image src="/assets/home/baseball2.jpg" alt="Baseball" fill className="object-cover" sizes="128px" />
                    </div>
                    <p className="leading-relaxed flex-1 min-w-0">Playing sports, staying active.</p>
                  </div>
                </div>
                <div className={`rounded-lg p-4 transition-colors duration-200 ${highlightSection === "cinematography" ? "bg-foreground/10 ring-1 ring-foreground/20" : ""}`}>
                  <h4 className="font-medium text-foreground text-sm mb-1">Cinematography</h4>
                  <div className="flex gap-4 items-center">
                    <div className="relative shrink-0 w-32 h-24 rounded-md overflow-hidden bg-muted">
                      <Image src="/assets/home/watermelon.JPG" alt="Cinematography" fill className="object-cover" sizes="128px" />
                    </div>
                    <p className="leading-relaxed flex-1 min-w-0">Film and video work.</p>
                  </div>
                </div>
                <div className={`rounded-lg p-4 transition-colors duration-200 ${highlightSection === "noodles" ? "bg-foreground/10 ring-1 ring-foreground/20" : ""}`}>
                  <h4 className="font-medium text-foreground text-sm mb-1">Noodles</h4>
                  <div className="flex gap-4 items-center">
                    <div className="relative shrink-0 w-32 h-24 rounded-md overflow-hidden bg-muted">
                      <Image src="/assets/home/noodles.jpg" alt="Noodles" fill className="object-cover" sizes="128px" />
                    </div>
                    <p className="leading-relaxed flex-1 min-w-0">Eating noodles, ramen, etc.</p>
                  </div>
                </div>
              </div>
            </section>
            <section ref={(el) => { desktopSlideRefs.current[4] = el; }} className="min-h-[100dvh] w-full flex-shrink-0 snap-start flex flex-col justify-center p-8 pt-24 pb-12">
              <div className="w-full max-w-md mx-auto rounded-lg border border-border bg-muted/20 p-6 text-foreground/80 text-sm">
                <p className="leading-relaxed font-medium text-foreground">
                  Click on the underlined website on the left to explore my full website!
                </p>
              </div>
            </section>
          </>
        )}
        </div>
          </div>
        </motion.div>
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
