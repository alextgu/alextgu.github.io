"use client";

import { useState, useCallback, useRef, type ReactNode } from "react";
import { Rnd } from "react-rnd";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Maximize2 } from "lucide-react";

export interface WindowBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface FolderWindowProps {
  id: string;
  title: string;
  children: ReactNode;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
  zIndex: number;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: (bounds: WindowBounds) => void;
}

export function FolderWindow({
  id,
  title,
  children,
  defaultPosition = { x: 120, y: 60 },
  defaultSize = { width: 560, height: 400 },
  zIndex,
  onFocus,
  onClose,
  onMinimize,
}: FolderWindowProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const rndRef = useRef<Rnd>(null);
  const savedBounds = useRef({ x: defaultPosition.x, y: defaultPosition.y, w: defaultSize.width, h: defaultSize.height });

  const getCurrentBounds = useCallback((): WindowBounds => {
    const self = rndRef.current?.getSelfElement();
    if (self) {
      const parent = self.offsetParent as HTMLElement | null;
      const parentRect = parent?.getBoundingClientRect();
      const rect = self.getBoundingClientRect();
      return {
        x: rect.left - (parentRect?.left ?? 0),
        y: rect.top - (parentRect?.top ?? 0),
        width: rect.width,
        height: rect.height,
      };
    }
    return { x: defaultPosition.x, y: defaultPosition.y, width: defaultSize.width, height: defaultSize.height };
  }, [defaultPosition, defaultSize]);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(onClose, 200);
  }, [onClose]);

  const handleMinimize = useCallback(() => {
    const bounds = getCurrentBounds();
    setIsClosing(true);
    setTimeout(() => onMinimize(bounds), 200);
  }, [getCurrentBounds, onMinimize]);

  const handleMaximize = useCallback(() => {
    if (!rndRef.current) return;

    if (isMaximized) {
      const { x, y, w, h } = savedBounds.current;
      rndRef.current.updatePosition({ x, y });
      rndRef.current.updateSize({ width: w, height: h });
      setIsMaximized(false);
    } else {
      const self = rndRef.current.getSelfElement();
      if (self) {
        const rect = self.getBoundingClientRect();
        savedBounds.current = { x: rect.left, y: rect.top, w: rect.width, h: rect.height };
      }
      rndRef.current.updatePosition({ x: 0, y: 0 });
      const parent = rndRef.current.getSelfElement()?.parentElement;
      const parentWidth = parent ? parent.clientWidth : window.innerWidth;
      const parentHeight = parent ? parent.clientHeight : window.innerHeight - 28;
      rndRef.current.updateSize({
        width: parentWidth,
        height: parentHeight,
      });
      setIsMaximized(true);
    }
  }, [isMaximized]);

  return (
    <AnimatePresence>
      {!isClosing && (
        <Rnd
          ref={rndRef}
          default={{
            x: defaultPosition.x,
            y: defaultPosition.y,
            width: defaultSize.width,
            height: defaultSize.height,
          }}
          minWidth={320}
          minHeight={220}
          bounds="parent"
          dragHandleClassName="window-drag-handle"
          disableDragging={isMaximized}
          enableResizing={!isMaximized}
          style={{ zIndex, pointerEvents: "auto" }}
          onMouseDown={onFocus}
          onDragStart={onFocus}
        >
          <motion.div
            className="flex flex-col w-full h-full rounded-xl overflow-hidden border border-zinc-600/50 shadow-2xl pointer-events-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Title bar */}
            <div className="window-drag-handle flex items-center gap-2 bg-zinc-800/95 backdrop-blur-md px-3 py-2 cursor-grab active:cursor-grabbing shrink-0 border-b border-zinc-700/50">
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={handleClose}
                  className="h-3 w-3 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors flex items-center justify-center group"
                >
                  <X className="w-2 h-2 text-red-900 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <button
                  type="button"
                  onClick={handleMinimize}
                  className="h-3 w-3 rounded-full bg-yellow-500/80 hover:bg-yellow-400 transition-colors flex items-center justify-center group"
                >
                  <Minus className="w-2 h-2 text-yellow-900 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <button
                  type="button"
                  onClick={handleMaximize}
                  className="h-3 w-3 rounded-full bg-green-500/80 hover:bg-green-400 transition-colors flex items-center justify-center group"
                >
                  <Maximize2 className="w-1.5 h-1.5 text-green-900 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
              <span className="ml-2 text-xs text-zinc-400 font-sans select-none pointer-events-none">
                {title}
              </span>
            </div>

            {/* Window content */}
            <div className="flex-1 min-h-0 bg-zinc-900/95 backdrop-blur-md overflow-y-auto overflow-x-hidden px-6 py-4 font-sans hide-scrollbar">
              {children}
            </div>
          </motion.div>
        </Rnd>
      )}
    </AnimatePresence>
  );
}
