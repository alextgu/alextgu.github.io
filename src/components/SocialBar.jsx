import { useState, useEffect } from 'react';
import './SocialBar.css';

function SocialBar() {
  const [fadeIn, setFadeIn] = useState(false);
  const [visible, setVisible] = useState(true);

  const socialLinks = [
    { name: 'LinkedIn', href: 'https://linkedin.com/in/alextgu', color: '#0A66C2' },
    { name: 'GitHub', href: 'https://github.com/alextgu', color: '#181717' },
    { name: 'Devpost', href: 'https://devpost.com/alexwin2099', color: '#003e54' },
    { name: 'CV', href: '/files/Alex_Tang_CV.pdf', color: '#E63946' },
  ];

  // Fade in after 0.5s
  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 500);
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
      className={`fixed top-6 right-12 flex gap-4 hidden md:flex transition-opacity duration-500 ease-in-out
        ${fadeIn && visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
    >
      {socialLinks.map((item) => (
        <a
          key={item.name}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="social-link text-[0.825rem] font-medium text-gray-400 dark:text-zinc-500 transition-colors duration-300 ease-out hover:text-black dark:hover:text-white"
          style={{ '--underline-color': item.color }}
        >
          {item.name}
        </a>
      ))}
    </div>
  );
}

export default SocialBar;
