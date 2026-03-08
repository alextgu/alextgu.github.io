"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";

const DESK_HREF = "/?explore=true";

export function BackToHome() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isExplore = searchParams.get("explore") === "true";
  const isDeskView = pathname === "/deskview" || (pathname === "/" && isExplore);
  const isHome = pathname === "/" && !isExplore;

  if (isHome) return null;

  if (isDeskView) {
    return (
      <Link
        href="/"
        className="fixed top-10 left-10 z-50 flex items-center gap-2 rounded-md px-3 py-2 text-foreground/70 hover:text-foreground hover:bg-foreground/5 text-sm font-medium transition-colors"
        aria-label="Back to home"
      >
        <ChevronLeft className="size-4 shrink-0 stroke-[2.5]" aria-hidden />
        <span>Home</span>
      </Link>
    );
  }

  return (
    <Link
      href={DESK_HREF}
      className="fixed top-10 left-10 z-50 flex items-center gap-2 rounded-md px-3 py-2 text-foreground/70 hover:text-foreground hover:bg-foreground/5 text-sm font-medium transition-colors"
      aria-label="Back to desk"
    >
      <ChevronLeft className="size-4 shrink-0 stroke-[2.5]" aria-hidden />
      <span>Desk</span>
    </Link>
  );
}
