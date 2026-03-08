"use client";

import { useState, useCallback, useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Rnd } from "react-rnd";
import Image from "next/image";
import { motion } from "framer-motion";
import { ImageIcon, Lock, X, ChevronDown, ChevronUp, ChevronLeft, Crown } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DesktopIcon } from "@/components/custom/DesktopIcon";
import { FolderWindow, type WindowBounds } from "@/components/custom/FolderWindow";
import { desktopFolders as desktopFoldersData } from "@/lib/content";

interface FolderListItem {
  name: string;
  description: string;
}

interface FolderListContent {
  type: "list";
  items: FolderListItem[];
}

interface FolderVideoContent {
  type: "video";
  videoUrl: string;
  caption: string;
}

interface FolderImageItem {
  type: "image";
  name: string;
  src: string;
}

interface FolderFolderContent {
  type: "folder";
  items: FolderImageItem[];
}

interface FolderTextContent {
  type: "text";
  src: string;
  section: string;
}

interface FolderWebsiteHistoryContent {
  type: "website_history";
  techStack: string[];
  timeline: {
    date: string;
    title: string;
    description?: string;
    pictures?: { src: string; alt?: string }[];
    links?: { text: string; url: string }[];
  }[];
}

interface FolderExperiencesContent {
  type: "experiences";
  description: string;
  experiences: { title: string; company: string; date?: string; readMore?: string }[];
}

interface FolderHackathonsContent {
  type: "hackathons";
  entries: {
    id: string;
    name: string;
    projectName?: string;
    subtitle?: string;
    description: string;
    won?: boolean;
    score?: number;
    devpostUrl?: string;
    sections?: { title: string; body: string }[];
    images?: { src: string; alt?: string }[];
  }[];
}

interface FolderProjectsContent {
  type: "projects";
  summary: string;
  entries: {
    id: string;
    name: string;
    subtitle?: string;
  }[];
}

type FolderContent =
  | FolderListContent
  | FolderVideoContent
  | FolderFolderContent
  | FolderTextContent
  | FolderWebsiteHistoryContent
  | FolderExperiencesContent
  | FolderHackathonsContent
  | FolderProjectsContent;

interface DesktopFolder {
  id: string;
  label: string;
  icon: string;
  desktopIcon?: "folder" | "document";
  content: FolderContent;
}

const folders = desktopFoldersData as DesktopFolder[];

function AppleBatteryIcon({
  level,
  charging,
  className,
}: {
  level: number;
  charging: boolean;
  className?: string;
}) {
  const w = 22;
  const h = 10;
  const r = 1.5;
  const padding = 1.5;
  const fillWidth = Math.max(0, Math.min(1, level)) * (w - padding * 2);
  const fillColor = charging ? "currentColor" : "currentColor";

  return (
    <svg
      viewBox="0 0 26 12"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* Body outline — rounded rect */}
      <rect x="0.6" y="0.6" width={w} height={h} rx={r} ry={r} />
      {/* Terminal bump */}
      <rect x="22" y="3" width="2.8" height="4" rx="0.8" ry="0.8" />
      {/* Fill level */}
      {fillWidth > 0 && (
        <rect
          x={padding + 0.6}
          y={padding + 0.6}
          width={fillWidth}
          height={h - padding * 2}
          rx={r - 0.3}
          ry={r - 0.3}
          fill={fillColor}
          fillOpacity={charging ? 0.9 : 0.5}
        />
      )}
    </svg>
  );
}

const staggeredPositions = [
  { x: 100, y: 50 },
  { x: 160, y: 100 },
  { x: 220, y: 60 },
  { x: 280, y: 120 },
];

export default function ComputerPage() {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [windowOrder, setWindowOrder] = useState<string[]>([]);
  const [savedBounds, setSavedBounds] = useState<Record<string, WindowBounds>>({});

  const [now, setNow] = useState(() => new Date());
  const [battery, setBattery] = useState<{ level: number; charging: boolean }>({ level: 1, charging: false });
  const [batteryShowNumber, setBatteryShowNumber] = useState(false);
  const [openMenuBar, setOpenMenuBar] = useState<"apple" | "finder" | "file" | "edit" | "view" | null>(null);
  const [showWebsiteDiagram, setShowWebsiteDiagram] = useState(false);

  const searchParams = useSearchParams();
  const hasOpenedProjectsRef = useRef(false);
  useEffect(() => {
    const open = searchParams.get("open");
    if (open === "projects" && !hasOpenedProjectsRef.current) {
      hasOpenedProjectsRef.current = true;
      setOpenWindows((prev) => (prev.includes("projects") ? prev : [...prev, "projects"]));
      setWindowOrder((prev) => [...prev.filter((w) => w !== "projects"), "projects"]);
    }
  }, [searchParams]);

  useEffect(() => {
    const tick = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    if (typeof navigator === "undefined" || !("getBattery" in navigator)) return;
    const nav = navigator as Navigator & {
      getBattery?: () => Promise<{
        level: number;
        charging: boolean;
        addEventListener: (e: string, f: () => void) => void;
        removeEventListener: (e: string, f: () => void) => void;
      }>;
    };
    let cleanup: (() => void) | undefined;
    nav.getBattery?.().then((bat) => {
      const update = () => setBattery({ level: bat.level, charging: bat.charging });
      update();
      bat.addEventListener("levelchange", update);
      bat.addEventListener("chargingchange", update);
      cleanup = () => {
        bat.removeEventListener("levelchange", update);
        bat.removeEventListener("chargingchange", update);
      };
    }).catch(() => {
      // keep default 100% when API fails or is unavailable
    });
    return () => { cleanup?.(); };
  }, []);

  const openFolder = useCallback((id: string) => {
    setOpenWindows((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setWindowOrder((prev) => [...prev.filter((w) => w !== id), id]);
  }, []);

  const closeFolder = useCallback((id: string) => {
    setOpenWindows((prev) => prev.filter((w) => w !== id));
    setWindowOrder((prev) => prev.filter((w) => w !== id));
  }, []);

  const minimizeFolder = useCallback((id: string, bounds: WindowBounds) => {
    setSavedBounds((prev) => ({ ...prev, [id]: bounds }));
    setOpenWindows((prev) => prev.filter((w) => w !== id));
    setWindowOrder((prev) => prev.filter((w) => w !== id));
  }, []);

  const focusWindow = useCallback((id: string) => {
    setWindowOrder((prev) => [...prev.filter((w) => w !== id), id]);
  }, []);

  const handleDesktopClick = useCallback(() => {
    setSelectedIcon(null);
    setOpenMenuBar(null);
  }, []);

  return (
    <div
      className="fixed inset-0 overflow-hidden bg-zinc-950 font-sans select-none"
      onClick={handleDesktopClick}
    >
      <div className="fixed inset-0 overflow-auto">
        <div
          className="flex justify-center items-center min-h-[max(100vh,820px)] min-w-[max(100vw,1300px)]"
        >
          <div
            className="flex items-end justify-center w-[1300px] h-[820px] shrink-0 bg-zinc-950"
            style={{ paddingBottom: "72px" }}
          >
        <div className="w-[1000px] h-[700px] relative overflow-hidden rounded-t-xl shrink-0">
        {/* Desktop wallpaper */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-900 to-zinc-950" />

        {/* macOS-style menu bar */}
        {(() => {
          const frontId = windowOrder[windowOrder.length - 1];
          const activeMenuTitle = frontId ? (folders.find((f) => f.id === frontId)?.label ?? "Finder") : "Finder";
          return (
        <div className="absolute top-0 left-0 right-0 z-[100] flex items-center justify-between bg-black/40 backdrop-blur-xl border-b border-white/5 px-5 h-10" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-4">
          <div className="relative">
            <button type="button" className="text-xs font-semibold text-white hover:text-white/90 cursor-pointer transition-colors" onClick={() => setOpenMenuBar((m) => (m === "apple" ? null : "apple"))} aria-label="Apple menu">
              &#63743;
            </button>
            {openMenuBar === "apple" && (
              <div className="absolute left-0 top-full mt-0.5 min-w-[120px] rounded border border-white/15 bg-zinc-900/75 backdrop-blur-sm shadow-xl py-2 px-3 z-[101]">
                <p className="text-[11px] text-white text-left flex items-center gap-1.5">
                  <Lock className="size-3 shrink-0" aria-hidden />
                  Admin Locked
                </p>
              </div>
            )}
          </div>
          <div className="relative">
            <button type="button" className="text-[11px] font-medium text-white hover:text-white/90 cursor-pointer transition-colors py-0.5" onClick={() => setOpenMenuBar((m) => (m === "finder" ? null : "finder"))}>
              {activeMenuTitle}
            </button>
            {openMenuBar === "finder" && (
              <div className="absolute left-0 top-full mt-0.5 min-w-[120px] rounded border border-white/15 bg-zinc-900/75 backdrop-blur-sm shadow-xl py-2 px-3 z-[101]">
                <p className="text-[11px] text-white text-left flex items-center gap-1.5">
                  <Lock className="size-3 shrink-0" aria-hidden />
                  Admin Locked
                </p>
              </div>
            )}
          </div>
          <div className="relative">
            <button type="button" className="text-[11px] text-white hover:text-white/90 cursor-pointer transition-colors py-0.5" onClick={() => setOpenMenuBar((m) => (m === "file" ? null : "file"))}>
              File
            </button>
            {openMenuBar === "file" && (
              <div className="absolute left-0 top-full mt-0.5 min-w-[120px] rounded border border-white/15 bg-zinc-900/75 backdrop-blur-sm shadow-xl py-2 px-3 z-[101]">
                <p className="text-[11px] text-white text-left flex items-center gap-1.5">
                  <Lock className="size-3 shrink-0" aria-hidden />
                  Admin Locked
                </p>
              </div>
            )}
          </div>
          <div className="relative">
            <button type="button" className="text-[11px] text-white hover:text-white/90 cursor-pointer transition-colors py-0.5" onClick={() => setOpenMenuBar((m) => (m === "edit" ? null : "edit"))}>
              Edit
            </button>
            {openMenuBar === "edit" && (
              <div className="absolute left-0 top-full mt-0.5 min-w-[120px] rounded border border-white/15 bg-zinc-900/75 backdrop-blur-sm shadow-xl py-2 px-3 z-[101]">
                <p className="text-[11px] text-white text-left flex items-center gap-1.5">
                  <Lock className="size-3 shrink-0" aria-hidden />
                  Admin Locked
                </p>
              </div>
            )}
          </div>
          <div className="relative">
            <button type="button" className="text-[11px] text-white hover:text-white/90 cursor-pointer transition-colors py-0.5" onClick={() => setOpenMenuBar((m) => (m === "view" ? null : "view"))}>
              View
            </button>
            {openMenuBar === "view" && (
              <div className="absolute left-0 top-full mt-0.5 min-w-[120px] rounded border border-white/15 bg-zinc-900/75 backdrop-blur-sm shadow-xl py-2 px-3 z-[101]">
                <p className="text-[11px] text-white text-left flex items-center gap-1.5">
                  <Lock className="size-3 shrink-0" aria-hidden />
                  Admin Locked
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/?explore=true"
            className="text-[11px] text-white hover:text-white/90 transition-colors"
          >
            Back to Desk
          </Link>
          <button
            type="button"
            onClick={() => setBatteryShowNumber((p) => !p)}
            className="flex items-center text-white hover:text-white/90 transition-colors cursor-pointer"
            aria-label={`Battery ${Math.round(battery.level * 100)}%`}
          >
            {batteryShowNumber ? (
              <span className="text-[11px] text-white">{Math.round(battery.level * 100)}%</span>
            ) : (
              <AppleBatteryIcon
                level={battery.level}
                charging={battery.charging}
                className="w-[18px] h-[9px] shrink-0 text-white"
              />
            )}
          </button>
          <span className="flex items-center gap-1 text-[11px] text-white">
            <span>{now.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" }).replace(/,/g, "")}</span>
            <span>{now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</span>
          </span>
        </div>
      </div>
        );
      })()}

      {/* Draggable desktop icons */}
      {folders.map((folder, idx) => (
        <Rnd
          key={folder.id}
          default={{
            x: 20,
            y: 40 + idx * 110,
            width: 96,
            height: 105,
          }}
          enableResizing={false}
          bounds="parent"
          style={{ zIndex: 3 }}
          onMouseDown={(e: { stopPropagation: () => void }) => e.stopPropagation()}
          onClick={(e: { stopPropagation: () => void }) => e.stopPropagation()}
        >
          <DesktopIcon
            label={folder.label}
            selected={selectedIcon === folder.id}
            onClick={() => setSelectedIcon(folder.id)}
            onDoubleClick={() => {
              openFolder(folder.id);
              setSelectedIcon(null);
            }}
            iconType={folder.desktopIcon === "document" ? "document" : "folder"}
          />
        </Rnd>
      ))}

      {/* Open folder windows */}
      <div className="absolute inset-0 top-7 z-[10] pointer-events-none">
        {openWindows.map((folderId, idx) => {
          const folder = folders.find((f) => f.id === folderId);
          if (!folder) return null;

          const saved = savedBounds[folderId];
          const posIndex = idx % staggeredPositions.length;
          const pos = saved ? { x: saved.x, y: saved.y } : staggeredPositions[posIndex];
          const size = saved ? { width: saved.width, height: saved.height } : undefined;
          const zIndex = windowOrder.indexOf(folderId) + 10;

          return (
            <FolderWindow
              key={`${folderId}-${saved ? "restored" : "new"}`}
              id={folderId}
              title={folder.label}
              defaultPosition={pos}
              defaultSize={size}
              zIndex={zIndex}
              onFocus={() => focusWindow(folderId)}
              onClose={() => closeFolder(folderId)}
              onMinimize={(bounds) => minimizeFolder(folderId, bounds)}
            >
              <FolderContents content={folder.content} />
            </FolderWindow>
          );
        })}
      </div>

      {/* Website diagram popup (triggered by Website icon) */}
      <Dialog open={showWebsiteDiagram} onOpenChange={setShowWebsiteDiagram}>
        <DialogContent className="max-w-4xl bg-zinc-950 border-zinc-800">
          <DialogTitle className="text-lg font-semibold text-zinc-100">
            Website diagram
          </DialogTitle>
          <div className="mt-4 rounded-lg border border-zinc-800/80 bg-zinc-900/80 min-h-[260px] flex items-center justify-center text-zinc-500 text-sm">
            Diagram of the website will go here.
          </div>
        </DialogContent>
      </Dialog>

        </div>
        </div>
        </div>
      </div>
    </div>
  );
}

function parseTextSection(fullText: string, section: string): string {
  const re = new RegExp(`=== ${section} ===\\s*([\\s\\S]*?)(?=== |$)`, "i");
  const m = fullText.match(re);
  return m ? m[1].trim() : fullText;
}

function TextView({ src, section }: { src: string; section: string }) {
  const [text, setText] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(src)
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error("Failed to load"))))
      .then((body) => setText(parseTextSection(body, section)))
      .catch(() => setError(true));
  }, [src, section]);

  if (error) return <p className="text-base text-zinc-400">Could not load content.</p>;
  if (text === null) return <p className="text-base text-zinc-400">Loading…</p>;

  return (
    <pre className="text-base text-zinc-300 whitespace-pre-wrap font-sans leading-relaxed">
      {text}
    </pre>
  );
}

function FolderView({ items }: { items: FolderImageItem[] }) {
  const [openedImage, setOpenedImage] = useState<{ src: string; name: string } | null>(null);

  return (
    <>
      <div className="flex flex-col gap-0.5">
        {items.map((item) => (
          <button
            key={item.name}
            type="button"
            onClick={() => setOpenedImage({ src: item.src, name: item.name })}
            className="flex items-center gap-3 p-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left w-full"
          >
            <div className="w-9 h-9 rounded-md bg-white/10 flex items-center justify-center shrink-0 overflow-hidden">
              <Image
                src={item.src}
                alt={item.name}
                width={36}
                height={36}
                className="w-9 h-9 object-cover"
                unoptimized
              />
            </div>
            <span className="text-base font-medium text-zinc-200 truncate">{item.name}</span>
          </button>
        ))}
      </div>
      <Dialog open={!!openedImage} onOpenChange={(open) => !open && setOpenedImage(null)}>
        <DialogContent className="max-w-4xl bg-zinc-950 border-zinc-800 p-0 overflow-hidden" showCloseButton={false}>
          {openedImage && (
            <>
              <DialogTitle className="sr-only">{openedImage.name}</DialogTitle>
              <motion.button
                type="button"
                onClick={() => setOpenedImage(null)}
                className="absolute top-4 right-4 z-10 rounded-md p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-white/10 transition-colors"
                whileTap={{ scale: 0.85 }}
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </motion.button>
              <div className="relative w-full min-h-0 flex items-center justify-center p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={openedImage.src}
                  alt={openedImage.name}
                  className="max-w-full max-h-[85vh] w-auto h-auto object-contain block"
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function descriptionWithLinks(
  description: string,
  links?: { text: string; url: string }[]
): ReactNode {
  if (!links?.length) return description;
  const sorted = [...links].sort((a, b) => b.text.length - a.text.length);
  const escaped = sorted.map((l) => l.text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const regex = new RegExp(escaped.join("|"), "g");
  const segments: ReactNode[] = [];
  let lastIndex = 0;
  let match;
  let key = 0;
  while ((match = regex.exec(description)) !== null) {
    if (match.index > lastIndex) segments.push(description.slice(lastIndex, match.index));
    const link = links.find((l) => l.text === match![0]);
    if (link)
      segments.push(
        <a
          key={key++}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-400 underline decoration-zinc-500 underline-offset-2 hover:text-zinc-200 hover:decoration-zinc-400"
        >
          {link.text}
        </a>
      );
    else segments.push(match[0]);
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < description.length) segments.push(description.slice(lastIndex));
  return <>{segments}</>;
}

function WebsiteHistoryView({
  techStack,
  timeline,
}: {
  techStack: string[];
  timeline: {
    date: string;
    title: string;
    description?: string;
    pictures?: { src: string; alt?: string }[];
    links?: { text: string; url: string }[];
  }[];
}) {
  const [openedImage, setOpenedImage] = useState<{ src: string; alt: string } | null>(null);

  return (
    <div className="flex flex-col gap-8 font-sans text-base">
      <section>
        <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-3">Current tech stack</h3>
        <div className="flex flex-col gap-3">
          {techStack.map((sentence, idx) => (
            <p key={idx} className="text-base text-zinc-400 leading-relaxed">
              {sentence.split(/(Newsreader|Inter)/).map((part, i) =>
                part === "Newsreader" ? (
                  <a
                    key={i}
                    href="https://fonts.google.com/specimen/Newsreader"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 underline decoration-zinc-500 underline-offset-2 hover:text-zinc-200 hover:decoration-zinc-400"
                  >
                    Newsreader
                  </a>
                ) : part === "Inter" ? (
                  <a
                    key={i}
                    href="https://fonts.google.com/specimen/Inter"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 underline decoration-zinc-500 underline-offset-2 hover:text-zinc-200 hover:decoration-zinc-400"
                  >
                    Inter
                  </a>
                ) : (
                  part
                )
              )}
            </p>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">History</h3>
        <div className="flex flex-col gap-6">
          {timeline.map((item, idx) => (
            <article key={idx} className="border-b border-zinc-700/40 pb-6 last:border-0 last:pb-0">
              <p className="text-sm text-zinc-500 mb-1 tracking-wide">{item.date}</p>
              <h4 className="text-base font-medium text-zinc-200 mb-0.5">{item.title}</h4>
              {item.description && (
                <p className="text-base text-zinc-400 leading-relaxed">
                  {descriptionWithLinks(item.description, item.links)}
                </p>
              )}
              {item.pictures && item.pictures.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.pictures.map((pic, picIdx) => (
                    <button
                      key={picIdx}
                      type="button"
                      onClick={() =>
                        setOpenedImage({
                          src: pic.src,
                          alt: pic.alt ?? item.title,
                        })
                      }
                      className="rounded-lg overflow-hidden border border-zinc-700/50 bg-white/5 max-w-[480px] hover:bg-white/10 transition-colors"
                    >
                      <Image
                        src={pic.src}
                        alt={pic.alt ?? item.title}
                        width={400}
                        height={250}
                        className="w-full h-auto max-h-48 object-cover"
                        unoptimized
                      />
                    </button>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      <Dialog open={!!openedImage} onOpenChange={(open) => !open && setOpenedImage(null)}>
        <DialogContent className="max-w-4xl bg-zinc-950 border-zinc-800 p-0 overflow-hidden" showCloseButton={false}>
          {openedImage && (
            <>
              <DialogTitle className="sr-only">{openedImage.alt}</DialogTitle>
              <motion.button
                type="button"
                onClick={() => setOpenedImage(null)}
                className="absolute top-4 right-4 z-10 rounded-md p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-white/10 transition-colors"
                whileTap={{ scale: 0.85 }}
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </motion.button>
              <div className="relative w-full min-h-0 flex items-center justify-center p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={openedImage.src}
                  alt={openedImage.alt}
                  className="max-w-full max-h-[85vh] w-auto h-auto object-contain block"
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ExperiencesView({
  description,
  experiences,
}: {
  description: string;
  experiences: { title: string; company: string; date?: string; readMore?: string }[];
}) {
  return (
    <div className="flex flex-col gap-8 font-sans text-base">
      <section>
        <p className="text-base text-zinc-400 leading-relaxed">{description}</p>
      </section>

      <section className="relative">
        <div
          className="absolute left-[9px] top-0 bottom-0 w-px bg-zinc-600/60"
          aria-hidden
        />
        {experiences.map((exp, idx) => (
          <div key={idx} className="flex gap-4 items-start py-2 first:pt-0">
            <div className="w-5 shrink-0 flex justify-center pt-2">
              <div className="rounded-full w-2 h-2 bg-zinc-500 z-10" aria-hidden />
            </div>
            <div className="flex-1 pb-8 last:pb-0 flex flex-col gap-0.5">
              <span className="text-base flex items-baseline gap-1.5 flex-wrap">
                <span className="font-medium text-zinc-200">{exp.company}</span>
                <span className="text-zinc-600" aria-hidden>·</span>
                <span className="text-zinc-500">{exp.title}</span>
                {exp.date && (
                  <>
                    <span className="text-zinc-600" aria-hidden>·</span>
                    <span className="text-xs text-zinc-500 tracking-wide">{exp.date}</span>
                  </>
                )}
              </span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

function ProjectsView({
  summary,
  entries,
}: {
  summary: string;
  entries: FolderProjectsContent["entries"];
}) {
  return (
    <div className="flex flex-col gap-6 font-sans text-base">
      {summary && (
        <p className="text-base text-zinc-400 leading-relaxed">
          {summary}
        </p>
      )}
      <div className="flex flex-col gap-2">
        {entries.length === 0 ? (
          <p className="text-base text-zinc-500">No projects yet.</p>
        ) : (
          entries.map((entry) => (
            <Link
              key={entry.id}
              href={`/computer/projects/${entry.id}`}
              className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left rounded-lg border border-zinc-700/50 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="min-w-0 flex flex-col gap-1">
                <span className="text-base font-medium text-zinc-200 truncate">
                  {entry.name}
                </span>
                {entry.subtitle && (
                  <span className="text-sm text-zinc-500 truncate">
                    {entry.subtitle}
                  </span>
                )}
              </div>
              <ChevronDown className="w-4 h-4 shrink-0 text-zinc-500 rotate-[-90deg]" aria-hidden />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

function HackathonsView({
  entries,
}: {
  entries: FolderHackathonsContent["entries"];
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [openedImage, setOpenedImage] = useState<{ src: string; alt: string } | null>(null);

  const active = activeId
    ? (entries.find((e) => e.id === activeId) ?? null)
    : null;

  if (!entries.length) {
    return (
      <div className="flex flex-col gap-4 font-sans text-base">
        <p className="text-base text-zinc-400 leading-relaxed">Hackathons coming soon.</p>
      </div>
    );
  }

  if (activeId === null) {
    return (
      <div className="flex flex-col gap-6 font-sans text-base">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider">
            Hackathons
          </h3>
          <a
            href="https://devpost.com/alexwin2099?ref_content=user-portfolio&ref_feature=portfolio&ref_medium=global-nav"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-zinc-400 hover:text-zinc-200 underline underline-offset-2 decoration-zinc-600 hover:decoration-zinc-300"
          >
            View all on Devpost
          </a>
        </div>
        <div className="flex flex-col gap-2">
          {entries.map((entry) => (
            <button
              key={entry.id}
              type="button"
              onClick={() => setActiveId(entry.id)}
              className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left rounded-lg border border-zinc-700/50 bg-white/5 hover:bg-white/8 transition-colors"
            >
              <div className="min-w-0 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-base font-medium text-zinc-200 truncate">
                    {entry.name}
                  </span>
                  {entry.won && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-200 shrink-0">
                      <Crown className="w-3 h-3" aria-hidden />
                      Winner
                    </span>
                  )}
                </div>
                {entry.projectName && (
                  <span className="text-sm text-zinc-400 truncate">
                    {entry.projectName}
                  </span>
                )}
                {entry.subtitle && (
                  <span className="text-sm text-zinc-500 truncate">
                    {entry.subtitle}
                  </span>
                )}
              </div>
              <ChevronDown className="w-4 h-4 shrink-0 text-zinc-500 rotate-[-90deg]" aria-hidden />
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 font-sans text-base">
      <button
        type="button"
        onClick={() => setActiveId(null)}
        className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors w-fit"
      >
        <ChevronLeft className="w-4 h-4" aria-hidden />
        Back to Hackathons
      </button>

      <section>
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h4 className="text-lg font-semibold text-zinc-200">{active!.name}</h4>
              {active!.won && (
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-amber-200">
                  <Crown className="w-3 h-3" aria-hidden />
                  Winner
                </span>
              )}
            </div>
            {active!.projectName && (
              <p className="text-sm text-zinc-400 mt-0.5">{active!.projectName}</p>
            )}
            {active!.subtitle && (
              <p className="text-sm text-zinc-500 mt-0.5">{active!.subtitle}</p>
            )}
          </div>
          <p className="text-base text-zinc-400 leading-relaxed">
            {active!.description}
          </p>

          {active!.sections && active!.sections.length > 0 && (
            <div className="flex flex-col gap-4">
              {active!.sections.map((section, idx) => (
                <div key={idx}>
                  <h5 className="text-sm font-medium text-zinc-200">
                    {section.title}
                  </h5>
                  <p className="text-base text-zinc-400 leading-relaxed mt-1">
                    {section.body}
                  </p>
                </div>
              ))}
            </div>
          )}

          {active!.images && active!.images.length > 0 && (
            <div className="flex flex-col gap-2 mt-2">
              <h5 className="text-sm font-medium text-zinc-200">Photos</h5>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-w-2xl">
                {active!.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setOpenedImage({ src: img.src, alt: img.alt ?? active!.name })}
                    className="relative overflow-hidden rounded-md border border-zinc-700/50 bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt ?? active!.name}
                      width={320}
                      height={200}
                      className="w-full h-28 sm:h-32 object-cover"
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {active!.devpostUrl && (
            <div className="mt-4">
              <a
                href={active!.devpostUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-sky-400 hover:text-sky-300 underline underline-offset-2 decoration-sky-600 hover:decoration-sky-400"
              >
                View project on Devpost
              </a>
            </div>
          )}

          {typeof active!.score === "number" && (
            <div className="mt-4 flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <span>Personal score</span>
                <span className="text-zinc-300 font-medium">{active!.score}/100</span>
              </div>
              <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: `${Math.max(0, Math.min(100, active!.score ?? 0))}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      <Dialog open={!!openedImage} onOpenChange={(open) => !open && setOpenedImage(null)}>
        <DialogContent className="max-w-4xl bg-zinc-950 border-zinc-800 p-0 overflow-hidden" showCloseButton={false}>
          {openedImage && (
            <>
              <DialogTitle className="sr-only">{openedImage.alt}</DialogTitle>
              <motion.button
                type="button"
                onClick={() => setOpenedImage(null)}
                className="absolute top-4 right-4 z-10 rounded-md p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-white/10 transition-colors"
                whileTap={{ scale: 0.85 }}
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </motion.button>
              <div className="relative w-full min-h-0 flex items-center justify-center p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={openedImage.src}
                  alt={openedImage.alt}
                  className="max-w-full max-h-[85vh] w-auto h-auto object-contain block"
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function FolderContents({ content }: { content: FolderContent }) {
  if (content.type === "website_history") {
    return (
      <WebsiteHistoryView
        techStack={content.techStack}
        timeline={content.timeline}
      />
    );
  }
  if (content.type === "experiences") {
    return (
      <ExperiencesView
        description={content.description}
        experiences={content.experiences}
      />
    );
  }
  if (content.type === "hackathons") {
    return <HackathonsView entries={content.entries} />;
  }
  if (content.type === "projects") {
    return (
      <ProjectsView
        summary={content.summary}
        entries={content.entries}
      />
    );
  }
  if (content.type === "video") {
    return (
      <div className="flex flex-col gap-3">
        <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
          <iframe
            src={content.videoUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p className="text-base text-zinc-400">{content.caption}</p>
      </div>
    );
  }

  if (content.type === "folder") {
    return <FolderView items={content.items} />;
  }

  if (content.type === "text") {
    return <TextView src={content.src} section={content.section} />;
  }

  return (
    <div className="flex flex-col gap-2">
      {content.items.map((item) => (
        <div
          key={item.name}
          className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        >
          <div className="w-8 h-8 rounded-md bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-zinc-400 text-sm font-sans">
              {item.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-base font-medium text-zinc-200 truncate">{item.name}</p>
            <p className="text-sm text-zinc-400 mt-0.5">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
