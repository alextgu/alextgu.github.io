"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type BillboardItem =
  | { type: "blog"; id: string; image: string; title: string; summary: string }
  | { type: "video"; id: string; image: string; title: string; videoUrl: string };

type BillboardProps = {
  items: BillboardItem[];
  visible?: boolean;
  isLoading?: boolean;
  onBlogClick?: (id: string) => void;
  className?: string;
};

const ROTATE_MS = 5000;

export function Billboard({ items, visible = true, isLoading = false, onBlogClick, className }: BillboardProps) {
  const [current, setCurrent] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    if (!visible || items.length <= 1) return;
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [visible, items.length]);

  const item = items[current];

  const handleClick = useCallback(() => {
    if (!item) return;
    if (item.type === "blog") {
      onBlogClick?.(item.id);
    } else if (item.type === "video") {
      setActiveVideo(item.videoUrl);
      setVideoOpen(true);
    }
  }, [item, onBlogClick]);

  if (!visible || (!item && !isLoading)) return null;

  if (isLoading) {
    return (
      <div
        className={cn(
          "relative max-w-lg w-full",
          "bg-[var(--glass-bg)] backdrop-blur-sm border border-[var(--glass-border)] rounded-xl",
          "overflow-hidden",
          className
        )}
      >
        <Skeleton className="aspect-[16/10] w-full rounded-none" />
        <div className="p-4 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>
    );
  }

  return (
    <>
      <motion.div
        animate={{ x: [-8, 8] }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "relative max-w-lg w-full cursor-pointer",
          "bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl",
          "shadow-2xl overflow-hidden",
          className
        )}
        onClick={handleClick}
      >
        {/* Vignette mask */}
        <div
          className="relative aspect-[16/10] w-full"
          style={{
            maskImage:
              "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 90vw, 32rem"
                className="object-cover opacity-60 hover:opacity-100 transition-opacity duration-300"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Caption overlay */}
        <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <p className="font-serif text-sm text-white/90 tracking-wide">
            {item.title}
          </p>
          <p className="font-sans text-xs text-white/50 mt-0.5">
            {item.type === "blog" ? "Read more" : "Watch video"}
          </p>
        </div>

        {/* Progress dots */}
        {items.length > 1 && (
          <div className="absolute top-3 right-3 flex gap-1.5">
            {items.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1.5 w-1.5 rounded-full transition-colors duration-300",
                  i === current ? "bg-white/80" : "bg-white/25"
                )}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Video dialog */}
      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-3xl bg-zinc-950 border-zinc-800 p-0 overflow-hidden">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle className="font-serif text-zinc-100">
              {item?.title}
            </DialogTitle>
          </DialogHeader>
          {activeVideo && (
            <div className="aspect-video w-full">
              <iframe
                src={activeVideo}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
