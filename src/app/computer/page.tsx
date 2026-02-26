"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { Rnd } from "react-rnd";
import Image from "next/image";
import { motion } from "framer-motion";
import { ImageIcon, Lock, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DesktopIcon } from "@/components/custom/DesktopIcon";
import { FolderWindow, type WindowBounds } from "@/components/custom/FolderWindow";
import contentData from "@/data/content.json";

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

type FolderContent = FolderListContent | FolderVideoContent | FolderFolderContent | FolderTextContent;

interface DesktopFolder {
  id: string;
  label: string;
  icon: string;
  desktopIcon?: "folder" | "document";
  content: FolderContent;
}

const folders = contentData.desktopFolders as DesktopFolder[];

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
      className="fixed inset-0 overflow-auto bg-zinc-950 font-sans select-none hide-scrollbar"
      onClick={handleDesktopClick}
    >
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
        <div className="absolute top-0 left-0 right-0 z-[100] flex items-center justify-between bg-black/40 backdrop-blur-xl border-b border-white/5 px-4 h-7" onClick={(e) => e.stopPropagation()}>
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

  if (error) return <p className="text-sm text-zinc-500">Could not load content.</p>;
  if (text === null) return <p className="text-sm text-zinc-500">Loading…</p>;

  return (
    <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-sans leading-relaxed">
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
            <div className="w-9 h-9 rounded-md bg-zinc-600/30 flex items-center justify-center shrink-0">
              <ImageIcon className="w-4 h-4 text-zinc-400" />
            </div>
            <span className="text-sm font-medium text-zinc-200 truncate">{item.name}</span>
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
                className="absolute top-4 right-4 z-10 rounded-md p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                whileTap={{ scale: 0.85 }}
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </motion.button>
              <div className="relative w-full max-h-[85vh] flex items-center justify-center">
                <Image
                  src={openedImage.src}
                  alt={openedImage.name}
                  width={1200}
                  height={800}
                  className="w-full h-auto max-h-[85vh] object-contain"
                  unoptimized
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function FolderContents({ content }: { content: FolderContent }) {
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
        <p className="text-sm text-zinc-400">{content.caption}</p>
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
          className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/8 transition-colors"
        >
          <div className="w-8 h-8 rounded-md bg-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-blue-400 text-xs font-mono">
              {item.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-zinc-200 truncate">{item.name}</p>
            <p className="text-xs text-zinc-500 mt-0.5">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
