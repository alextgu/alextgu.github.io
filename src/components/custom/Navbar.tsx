"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Sun, Moon, Volume2, VolumeX, ChevronRight } from "lucide-react";

type IconType = "dark" | "music";

export function Navbar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const view = searchParams.get("view");
  const [showIcons, setShowIcons] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMusicOn, setIsMusicOn] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [navCooldown, setNavCooldown] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [transitioningItem, setTransitioningItem] = useState<string | null>(null);

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
    <nav
      className={`flex items-center gap-1 h-8 transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
      }`}
    >
      <div className="flex items-center gap-0.5 bg-white/70 dark:bg-zinc-900/70 backdrop-blur border border-gray-300/70 dark:border-zinc-700/70 rounded-md px-1.5 shadow-sm h-full">
        {navItems.map((item) => {
          const active = mounted && isActive(item);

          return (
            <Link
              key={item.name}
              href={active ? "/" : item.href}
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
              }}
              className={`px-1.5 py-1.25 rounded text-xs text-black dark:text-white hover:bg-gray-200/60 dark:hover:bg-zinc-700/60 transition-all duration-100 ease-out inline-block overflow-hidden ${
                navCooldown ? "pointer-events-none" : ""
              }`}
            >
              <span
                className={`inline-block transition-all duration-150 ease-out ${
                  transitioningItem === item.name ? "scale-75 opacity-0 blur-sm -translate-y-1" : "scale-100 opacity-100 blur-0 translate-y-0"
                }`}
              >
                {active ? "Home" : item.name}
              </span>
            </Link>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => setShowIcons(!showIcons)}
        className="px-1 bg-white/70 dark:bg-zinc-900/70 backdrop-blur border border-gray-300/70 dark:border-zinc-700/70 rounded-md shadow-sm transition flex items-center h-full relative z-20 max-md:hidden"
      >
        <ChevronRight
          size={12}
          className={`text-black dark:text-white transition-transform duration-150 ${
            showIcons ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <div
        className={`absolute top-0 left-full ml-0.5 flex gap-0.5 px-1 bg-white/70 dark:bg-zinc-900/70 backdrop-blur border border-gray-300/70 dark:border-zinc-700/70 rounded-md shadow-sm h-full items-center
            transition-all duration-250 ease-out max-md:hidden
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
          className={`p-1.5 rounded transition-colors duration-75 text-black dark:text-white hover:bg-gray-200/60 dark:hover:bg-zinc-700/60
              ${cooldown ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
        >
          {isDarkMode ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
        </button>

        <button
          type="button"
          onClick={() => handleIconClick("music")}
          disabled={cooldown}
          className={`p-1.5 rounded transition-colors duration-75 text-black dark:text-white hover:bg-gray-200/60 dark:hover:bg-zinc-700/60
              ${cooldown ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
        >
          {isMusicOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>
      </div>
    </nav>
  );
}
