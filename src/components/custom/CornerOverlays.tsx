"use client";

import { useState, useEffect } from "react";
import { Sun, Moon, Volume2, VolumeX, Github, Linkedin, Trophy } from "lucide-react";
import { useToast } from "@/components/custom/ToastMaster";

const socialLinks = [
  { name: "LinkedIn", href: "https://linkedin.com/in/alextgu", Icon: Linkedin },
  { name: "GitHub", href: "https://github.com/alextgu", Icon: Github },
  { name: "Devpost", href: "https://devpost.com/alexwin2099", Icon: Trophy },
];

export function CornerOverlays() {
  const toast = useToast();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMusicOn, setIsMusicOn] = useState(false);
  const [cooldown, setCooldown] = useState(false);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const dark = document.documentElement.classList.contains("dark");
      setIsDarkMode(dark);
    }
  }, []);

  const handleDarkClick = () => {
    if (cooldown) return;
    setCooldown(true);
    setTimeout(() => setCooldown(false), 600);
    const next = !isDarkMode;
    document.documentElement.classList.toggle("dark", next);
    setIsDarkMode(next);
    toast.addToast(next ? "Switched to dark mode" : "Switched to light mode");
  };

  const handleMusicClick = () => {
    if (cooldown) return;
    setCooldown(true);
    setTimeout(() => setCooldown(false), 600);
    const next = !isMusicOn;
    setIsMusicOn(next);
    toast.addToast(next ? "Music on" : "Music off");
  };

  return (
    <>
      {/* Bottom left: dark mode + music — icons only, no container */}
      <div
        className="fixed bottom-6 left-6 z-50 flex items-center gap-4"
        aria-label="Theme and audio"
      >
        <button
          type="button"
          onClick={handleDarkClick}
          disabled={cooldown}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          title={isDarkMode ? "Dark mode" : "Light mode"}
          className="p-2 text-foreground/70 hover:text-foreground transition-colors disabled:opacity-60"
        >
          {isDarkMode ? <Moon className="size-5" /> : <Sun className="size-5" />}
        </button>
        <button
          type="button"
          onClick={handleMusicClick}
          disabled={cooldown}
          aria-label={isMusicOn ? "Mute" : "Unmute"}
          title={isMusicOn ? "Music on" : "Music off"}
          className="p-2 text-foreground/70 hover:text-foreground transition-colors disabled:opacity-60"
        >
          {isMusicOn ? <Volume2 className="size-5" /> : <VolumeX className="size-5" />}
        </button>
      </div>

      {/* Bottom right: social links — icons only, no container */}
      <div
        className="fixed bottom-6 right-6 z-50 flex items-center gap-4"
        aria-label="Social links"
      >
        {socialLinks.map(({ name, href, Icon }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            title={name}
            className="p-2 text-foreground/70 hover:text-foreground transition-colors"
          >
            <Icon className="size-5" />
          </a>
        ))}
      </div>
    </>
  );
}
