"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type GlassCardProps = {
  title: string;
  content: string;
  className?: string;
};

export function GlassCard({ title, content, className }: GlassCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Reset animation on content change
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, [title, content]);

  return (
    <Card
      className={cn(
        "bg-white/10 backdrop-blur-md border-white/20 text-foreground shadow-lg transition-all duration-500 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
        className
      )}
    >
      <CardHeader>
        <CardTitle className="text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-foreground/90 whitespace-pre-wrap">{content}</p>
      </CardContent>
    </Card>
  );
}
