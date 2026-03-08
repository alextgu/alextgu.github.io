"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Toast = {
  id: string;
  message: string;
  createdAt: number;
};

type ToastContextValue = {
  addToast: (message: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const TOAST_DURATION_MS = 3200;
const TOAST_FADE_START_MS = 2400;

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((message: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const createdAt = Date.now();
    setToasts((prev) => [...prev, { id, message, createdAt }]);
    setTimeout(() => removeToast(id), TOAST_DURATION_MS);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastMaster toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

function ToastMaster({
  toasts,
  onRemove,
}: {
  toasts: Toast[];
  onRemove: (id: string) => void;
}) {
  return (
    <div
      className="fixed top-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none max-w-[min(320px,90vw)]"
      aria-live="polite"
      aria-label="Notifications"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onRemove={onRemove}
            durationMs={TOAST_DURATION_MS}
            fadeStartMs={TOAST_FADE_START_MS}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({
  toast,
  onRemove,
  durationMs,
  fadeStartMs,
}: {
  toast: Toast;
  onRemove: (id: string) => void;
  durationMs: number;
  fadeStartMs: number;
}) {
  const [isFading, setIsFading] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setIsFading(true), fadeStartMs);
    return () => clearTimeout(t);
  }, [fadeStartMs]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: isFading ? 0.5 : 1, x: 0 }}
      exit={{ opacity: 0, x: 24, transition: { duration: 0.25 } }}
      transition={{ duration: 0.3 }}
      className="px-1 py-0.5 text-sm text-foreground"
    >
      {toast.message}
    </motion.div>
  );
}
