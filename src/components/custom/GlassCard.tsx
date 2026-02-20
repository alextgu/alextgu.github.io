"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type GlassCardProps = {
  title: string;
  content?: string;
  items?: string[];
  focused?: boolean;
  isLoading?: boolean;
  className?: string;
  children?: ReactNode;
};

export function GlassCard({ title, content, items, focused = true, isLoading = false, className, children }: GlassCardProps) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    setEntered(false);
    const timer = setTimeout(() => setEntered(true), 50);
    return () => clearTimeout(timer);
  }, [title, content, items]);

  return (
    <Card
      className={cn(
        "bg-[var(--glass-bg)] backdrop-blur-md border-[var(--glass-border)] text-foreground shadow-lg",
        "transition-all duration-500 ease-out",
        entered
          ? focused
            ? "opacity-100 translate-x-0 translate-y-0"
            : "opacity-0 -translate-x-6 translate-y-0 pointer-events-none"
          : "opacity-0 translate-y-2.5",
        className
      )}
    >
      <CardHeader>
        {isLoading ? (
          <Skeleton className="h-7 w-2/5" />
        ) : (
          <CardTitle className="font-serif text-foreground">{title}</CardTitle>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : (
          <>
            {content && (
              <p className="font-sans text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">
                {content}
              </p>
            )}
            {items && items.length > 0 && (
              <ul className="list-disc list-inside space-y-1.5 font-sans text-sm leading-relaxed text-foreground/90">
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            {children}
          </>
        )}
      </CardContent>
    </Card>
  );
}
