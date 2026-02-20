"use client";

import { FileText, Github, Linkedin, Monitor } from "lucide-react";

const socialLinks = [
  { name: "LinkedIn", href: "https://linkedin.com/in/alextgu", icon: Linkedin },
  { name: "GitHub", href: "https://github.com/alextgu", icon: Github },
  { name: "Devpost", href: "https://devpost.com/alexwin2099", icon: Monitor },
  { name: "Resume", href: "/resume.pdf", icon: FileText },
];

export function SocialLinks() {
  return (
    <div className="flex items-center gap-4">
      {socialLinks.map((item) => {
        const Icon = item.icon;
        const isExternal = item.href.startsWith("http");
        return (
          <a
            key={item.name}
            href={item.href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="social-link flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors"
          >
            <Icon size={16} />
            <span className="hidden sm:inline">{item.name}</span>
          </a>
        );
      })}
    </div>
  );
}
