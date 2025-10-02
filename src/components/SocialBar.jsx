import { useState, useEffect } from 'react';
import './SocialBar.css';

function SocialBar() {
  const [show, setShow] = useState(true);
  
  const socialLinks = [
    { name: 'LinkedIn', href: 'https://linkedin.com/in/alextgu', color: '#0A66C2' },
    { name: 'GitHub', href: 'https://github.com/alextgu', color: '#181717' },
    { name: 'Devpost', href: 'https://devpost.com/alexwin2099', color: '#003e54' },
  ];

  useEffect(() => {
    const handleScroll = () => {
        if (window.scrollY > 0) {  // any scroll at all
          setShow(false);
        } else {
          setShow(true);
        }
      };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-6 right-12 flex gap-4 transition-opacity duration-500 ${
        show ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
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
