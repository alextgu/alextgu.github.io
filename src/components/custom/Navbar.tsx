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
  const [activeSection, setActiveSection] = useState("Home");
  const [showIcons, setShowIcons] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMusicOn, setIsMusicOn] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

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
    <div
      className={`flex items-center gap-0.5 h-10 transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-12"
      }`}
    >
      <div className="flex items-center gap-0.25 bg-white/70 dark:bg-zinc-900/70 backdrop-blur border border-gray-300/70 dark:border-zinc-700/70 rounded-md px-2 shadow-md text-sm h-full">
        {navItems.map((item) => {
          const active = mounted && isActive(item);

          return (
            <Link
              key={item.name}
              href={active ? "/" : item.href}
              scroll={false}
              className={`px-2 py-1 rounded-md transition-colors hover:bg-gray-300/60 dark:hover:bg-zinc-700/60 text-xs md:text-sm ${
                active
                  ? "text-gray-600 dark:text-zinc-300"
                  : "text-gray-400 dark:text-zinc-500"
              }`}
            >
              {active ? "Home" : item.name}
            </Link>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => setShowIcons(!showIcons)}
        className="ml-0.5 px-2 bg-white/70 dark:bg-zinc-900/70 border border-gray-300/70 dark:border-zinc-700/70 shadow-md hover:bg-gray-200/70 dark:hover:bg-zinc-800/70 transition flex items-center h-full rounded-md relative z-20 max-md:hidden"
      >
        <ChevronRight
          size={16}
          className={`text-gray-400 dark:text-zinc-500 transition-transform duration-150 ${
            showIcons ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <div
        className={`absolute top-0 left-full ml-1 flex gap-0.5 px-2 bg-white/70 dark:bg-zinc-900/70 border border-gray-300/70 dark:border-zinc-700/70 shadow-md h-full items-center rounded-md 
            transition-all duration-250 ease-out max-md:hidden
            ${
              showIcons
                ? "translate-x-0 opacity-100 blur-0 backdrop-blur"
                : "translate-x-[-4rem] opacity-0 blur-sm"
            }`}
        style={{ transformOrigin: "left" }}
      >
        <button
          type="button"
          onClick={() => handleIconClick("dark")}
          disabled={cooldown}
          className={`p-1.5 rounded-md hover:bg-gray-300/60 dark:hover:bg-zinc-700/60 transition text-gray-400 dark:text-zinc-500
              ${cooldown ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
        >
          {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>

        <button
          type="button"
          onClick={() => handleIconClick("music")}
          disabled={cooldown}
          className={`p-1.5 rounded-md hover:bg-gray-300/60 dark:hover:bg-zinc-700/60 transition text-gray-400 dark:text-zinc-500
              ${cooldown ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
        >
          {isMusicOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
