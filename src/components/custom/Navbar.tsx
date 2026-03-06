"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Sun, Moon, Volume2, VolumeX, ChevronRight } from "lucide-react";

/** Delay before navigating away from Main Page so zoom stays stable (ms) */
const MAIN_PAGE_NAV_DELAY = 150;

const MAIN_VIEW_KEY = "main-page-view";

type IconType = "dark" | "music";

export function Navbar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const view = searchParams.get("view");
  const [showIcons, setShowIcons] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMusicOn, setIsMusicOn] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [navCooldown, setNavCooldown] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [transitioningItem, setTransitioningItem] = useState<string | null>(null);
  const [lastMainView, setLastMainView] = useState<"home" | "alex">("home");

  useEffect(() => {
    setMounted(true);
    const timeout = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timeout);
  }, []);

  const navItems = [
    { name: "Alex", href: "/?explore=true", isView: true as const, viewKey: "alex", isReset: true },
    { name: "Projects", href: "/projects", isView: false as const, isReset: false },
    { name: "Hobbies", href: "/hobbies", isView: false as const, isReset: false },
    { name: "Workbench", href: "/workbench", isView: false as const, isReset: false },
  ] as const;

  const explore = searchParams.get("explore");
  const isOnMainPage = pathname === "/";
  const isAlexView = explore === "true";

  // Sync lastMainView: from URL when on main page, from sessionStorage when returning
  useEffect(() => {
    if (pathname === "/") {
      setLastMainView(isAlexView ? "alex" : "home");
    } else if (typeof window !== "undefined") {
      const stored = window.sessionStorage.getItem(MAIN_VIEW_KEY) as "home" | "alex" | null;
      if (stored) setLastMainView(stored);
    }
  }, [pathname, isAlexView]);

  // Persist main page view when on main page so we can restore when returning
  useEffect(() => {
    if (isOnMainPage && typeof window !== "undefined") {
      window.sessionStorage.setItem(MAIN_VIEW_KEY, isAlexView ? "alex" : "home");
    }
  }, [isOnMainPage, isAlexView]);

  const isActive = (item: (typeof navItems)[number]) => {
    if (item.isView) {
      return pathname === "/" && (view === item.viewKey || (item.viewKey === "alex" && explore === "true"));
    }
    return pathname === item.href;
  };

  const handleIconClick = (type: IconType) => {
    if (cooldown) return;
    setCooldown(true);
    setTimeout(() => setCooldown(false), 1000);

    if (type === "dark") {
      setIsDarkMode((prev) => {
        const next = !prev;
        if (typeof document !== "undefined") {
          document.documentElement.classList.toggle("dark", next);
        }
        return next;
      });
    } else if (type === "music") {
      setIsMusicOn((prev) => !prev);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (showIcons) setShowIcons(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showIcons]);

  return (
    <>
    <nav
      className={`flex items-center gap-1.5 h-10 transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
      }`}
    >
      <div className="flex items-center gap-1 bg-white/80 dark:bg-zinc-800/80 backdrop-blur border border-gray-300 dark:border-zinc-600 rounded-lg px-2.5 shadow-md h-full">
        {navItems.map((item) => {
          const active = mounted && isActive(item);
          const isAlexItem = item.isView;
          const isExternalPage = !item.isView;
          const isLeavingMainPage = isOnMainPage && isExternalPage;

          // Alex: on main page = toggle (Home<->Alex); on other page = return to last main view
          const alexHref = isAlexItem
            ? isOnMainPage
              ? isAlexView
                ? "/"
                : "/?explore=true"
              : lastMainView === "alex"
                ? "/?explore=true"
                : "/"
            : item.href;

          const href = isAlexItem ? alexHref : item.href;
          const label = isAlexItem
            ? isOnMainPage
              ? isAlexView
                ? "Home"
                : "Alex"
              : lastMainView === "alex"
                ? "Home"
                : "Alex"
            : item.name;

          return (
            <Link
              key={item.name}
              href={href}
              scroll={false}
              onClick={(e) => {
                if (navCooldown) {
                  e.preventDefault();
                  return;
                }
                setNavCooldown(true);
                setTransitioningItem(item.name);
                setTimeout(() => setTransitioningItem(null), 150);
                setTimeout(() => setNavCooldown(false), 500);

                if (isLeavingMainPage) {
                  e.preventDefault();
                  setTimeout(() => router.push(item.href), MAIN_PAGE_NAV_DELAY);
                }
              }}
              className={`px-2 py-1.5 rounded text-sm text-[var(--text-primary)] hover:bg-gray-200/60 dark:hover:bg-zinc-700/60 transition-all duration-100 ease-out inline-block overflow-hidden ${
                navCooldown ? "pointer-events-none" : ""
              }`}
            >
              <span
                className={`inline-block transition-all duration-150 ease-out ${
                  transitioningItem === item.name ? "scale-75 opacity-0 blur-sm -translate-y-1" : "scale-100 opacity-100 blur-0 translate-y-0"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => setShowIcons(!showIcons)}
        className="px-1.5 bg-white/70 dark:bg-zinc-900/70 backdrop-blur border border-gray-300/70 dark:border-zinc-700/70 rounded-lg shadow-sm transition flex items-center h-full relative z-20 max-md:hidden"
      >
        <ChevronRight
          size={16}
          className={`text-[var(--text-primary)] transition-transform duration-150 ${
            showIcons ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <div
        className={`absolute top-0 left-full ml-1 flex gap-1 px-1.5 bg-white/70 dark:bg-zinc-900/70 backdrop-blur border border-gray-300/70 dark:border-zinc-700/70 rounded-lg shadow-sm h-full items-center
            transition-all duration-100 ease-out max-md:hidden
            ${
              showIcons
                ? "translate-x-0 opacity-100"
                : "translate-x-[-2rem] opacity-0 pointer-events-none"
            }`}
        style={{ transformOrigin: "left" }}
      >
        <button
          type="button"
          onClick={() => handleIconClick("dark")}
          disabled={cooldown}
          className={`p-1.5 rounded transition-colors duration-75 text-[var(--text-primary)] hover:bg-gray-200/60 dark:hover:bg-zinc-700/60
              ${cooldown ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
        >
          {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>

        <button
          type="button"
          onClick={() => handleIconClick("music")}
          disabled={cooldown}
          className={`p-1.5 rounded transition-colors duration-75 text-[var(--text-primary)] hover:bg-gray-200/60 dark:hover:bg-zinc-700/60
              ${cooldown ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
        >
          {isMusicOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </div>
    </nav>

    {/* Mobile icon tray — fixed bottom-right on small screens */}
    <div className="fixed bottom-5 right-4 z-50 flex gap-1 px-1.5 bg-white/70 dark:bg-zinc-900/70 backdrop-blur border border-gray-300/70 dark:border-zinc-700/70 rounded-lg shadow-sm h-10 items-center md:hidden">
      <button
        type="button"
        onClick={() => handleIconClick("dark")}
        disabled={cooldown}
        className={`p-1.5 rounded transition-colors duration-75 text-[var(--text-primary)] hover:bg-gray-200/60 dark:hover:bg-zinc-700/60
            ${cooldown ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
      >
        {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
      </button>
      <button
        type="button"
        onClick={() => handleIconClick("music")}
        disabled={cooldown}
        className={`p-1.5 rounded transition-colors duration-75 text-[var(--text-primary)] hover:bg-gray-200/60 dark:hover:bg-zinc-700/60
            ${cooldown ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
      >
        {isMusicOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
      </button>
    </div>
    </>
  );
}
