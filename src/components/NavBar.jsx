import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Volume2, VolumeX, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import './NavBar.css';

function NavBar() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('Home');
  const [showIcons, setShowIcons] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMusicOn, setIsMusicOn] = useState(false);

  const [darkCooldown, setDarkCooldown] = useState(false);
  const [musicCooldown, setMusicCooldown] = useState(false);

  const navItems = [
    { name: 'Alex', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Hobbies', href: '/hobbies' },
    { name: 'Bucket List', href: '/bucket-list' },
  ];

  const iconVariants = {
    idle: { scale: 1 },
    pressed: { scale: 1.4, transition: { duration: 0.2 } },
  };

  const handleIconClick = (type) => {
    if (type === 'dark') {
      if (darkCooldown) return;
      setIsDarkMode(!isDarkMode);
      setDarkCooldown(true);
      setTimeout(() => setDarkCooldown(false), 300);
    } else if (type === 'music') {
      if (musicCooldown) return;
      setIsMusicOn(!isMusicOn);
      setMusicCooldown(true);
      setTimeout(() => setMusicCooldown(false), 300);
    }
  };

  // Close icons on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (showIcons) setShowIcons(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showIcons]);

  return (
    <div
      className="fixed top-4 left-20 z-50 flex items-center gap-0.5 h-10
                 max-md:left-1/2 max-md:-translate-x-1/2 max-md:transform"
    >
      {/* Main nav container */}
      <div className="flex items-center gap-0.25 bg-white/70 dark:bg-zinc-900/70 backdrop-blur border border-gray-300/70 dark:border-zinc-700/70 rounded-md px-2 shadow-md text-sm h-full">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setActiveSection(item.name)}
              className={`px-2 py-1 rounded-md transition-colors hover:bg-gray-300/60 dark:hover:bg-zinc-700/60
                text-xs md:text-sm
                ${isActive
                  ? 'text-gray-600 dark:text-zinc-300 font-semibold'
                  : 'text-gray-400 dark:text-zinc-500'
                }`}
            >
              {item.name === 'Bucket List' ? (
                <>
                  <span className="hidden sm:inline">{item.name}</span>
                  <span className="inline sm:hidden">List</span>
                </>
              ) : (
                item.name
              )}
            </Link>
          );
        })}
      </div>

      {/* Arrow toggle button */}
      <button
        onClick={() => setShowIcons(!showIcons)}
        className="ml-0.5 px-2 bg-white/70 dark:bg-zinc-900/70 border border-gray-300/70 dark:border-zinc-700/70 shadow-md hover:bg-gray-200/70 dark:hover:bg-zinc-800/70 transition flex items-center h-full rounded-md relative z-20"
      >
        <ChevronRight
          size={16}
          className={`text-gray-400 dark:text-zinc-500 transition-transform duration-150 ${
            showIcons ? 'rotate-90' : 'rotate-0'
          }`}
        />
      </button>

      {/* Icon container */}
      <div
        className={`absolute top-0 left-[calc(100%+0.25rem)] flex gap-0.5 px-2 bg-white/70 dark:bg-zinc-900/70 backdrop-blur border border-gray-300/70 dark:border-zinc-700/70 shadow-md h-full items-center rounded-md transition-all duration-300 ease-in-out
          ${showIcons
            ? 'translate-x-0 opacity-100 pointer-events-auto'
            : '-translate-x-20 opacity-0 pointer-events-none'
          }`}
        style={{ transformOrigin: 'left' }}
      >
        <motion.button
  onClick={() => handleIconClick('dark')}
  variants={iconVariants}
  animate={darkCooldown ? 'pressed' : 'idle'}
  className={`p-0.5 rounded-md hover:bg-gray-300/60 dark:hover:bg-zinc-700/60 text-gray-400 dark:text-zinc-500 transition
    ${darkCooldown ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
>
  {isDarkMode ? (
    <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
  ) : (
    <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
  )}
</motion.button>

<motion.button
  onClick={() => handleIconClick('music')}
  variants={iconVariants}
  animate={musicCooldown ? 'pressed' : 'idle'}
  className={`p-0.5 rounded-md hover:bg-gray-300/60 dark:hover:bg-zinc-700/60 text-gray-400 dark:text-zinc-500 transition
    ${musicCooldown ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
>
  {isMusicOn ? (
    <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
  ) : (
    <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
  )}
</motion.button>

      </div>
    </div>
  );
}

export default NavBar;
