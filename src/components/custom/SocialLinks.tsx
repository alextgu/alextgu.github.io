"use client";

import { useState, useEffect } from "react";

export function SocialLinks() {
  const [fadeIn, setFadeIn] = useState(false);
  const [visible, setVisible] = useState(true);

  const socialLinks = [
    { name: 'LinkedIn', href: 'https://linkedin.com/in/alextgu', color: '#0A66C2' },
    { name: 'GitHub', href: 'https://github.com/alextgu', color: '#6e5494' },
    { name: 'Devpost', href: 'https://devpost.com/alexwin2099', color: '#003e54' },
  ];

  // Fade in after 0.5s
  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // Instantly disappear on any scroll below top
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-6 right-12 flex gap-6 max-md:hidden transition-opacity duration-500 ease-in-out
        ${fadeIn && visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
    >
      {socialLinks.map((item) => (
        <a
          key={item.name}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="social-link text-sm font-medium text-[var(--text-primary)] opacity-50 hover:opacity-100 py-1"
          style={{ '--link-color': item.color } as React.CSSProperties}
        >
          {item.name}
        </a>
      ))}
    </div>
  );
}