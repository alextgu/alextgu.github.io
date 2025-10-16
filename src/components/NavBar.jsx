import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Volume2, VolumeX, ChevronRight } from 'lucide-react';
import './NavBar.css';

function NavBar() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('Home');
  const [showIcons, setShowIcons] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMusicOn, setIsMusicOn] = useState(false);
  const [cooldown, setCooldown] = useState(false);

  // --------------------------
  // NavBar fade-in slide-down
  // --------------------------
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 50); // slight delay to trigger animation
    return () => clearTimeout(timeout);
  }, []);

  const navItems = [
    { name: 'Alex', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Hobbies', href: '/hobbies' },
    { name: 'Bucket List', href: '/bucket-list' },
  ];

  const handleIconClick = (type) => {
    if (cooldown) return;
    setCooldown(true);
    setTimeout(() => setCooldown(false), 1000); // 1 second cooldown

    if (type === 'dark') {
      setIsDarkMode(!isDarkMode);
    } else if (type === 'music') {
      setIsMusicOn(!isMusicOn);
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
      className={`fixed top-4 left-20 z-50 flex items-center gap-0.5 h-10
        max-md:left-1/2 max-md:-translate-x-1/2 max-md:transform
        transition-all duration-700 ease-out
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'}`}
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
        className={`absolute top-0 left-full ml-1 flex gap-0.5 px-2 bg-white/70 dark:bg-zinc-900/70 backdrop-blur border border-gray-300/70 dark:border-zinc-700/70 shadow-md h-full items-center rounded-md transition-transform duration-300 ease-in-out
          ${showIcons
            ? 'translate-x-0 opacity-100 pointer-events-auto'
            : 'translate-x-[-4rem] opacity-0 pointer-events-none'
          }`}
        style={{ transformOrigin: 'left' }}
      >
        <button
          onClick={() => handleIconClick('dark')}
          disabled={cooldown}
          className={`p-1.5 rounded-md hover:bg-gray-300/60 dark:hover:bg-zinc-700/60 transition text-gray-400 dark:text-zinc-500
            ${cooldown ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
        >
          {isDarkMode ? (
            <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4 md:h-4 xl:w-4.5 xl:h-4.5" />
          ) : (
            <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4 md:h-4 xl:w-4.5 xl:h-4.5" />
          )}
        </button>

        <button
          onClick={() => handleIconClick('music')}
          disabled={cooldown}
          className={`p-1.5 rounded-md hover:bg-gray-300/60 dark:hover:bg-zinc-700/60 transition text-gray-400 dark:text-zinc-500
            ${cooldown ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
        >
          {isMusicOn ? (
            <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4 md:h-4 xl:w-4.5 xl:h-4.5" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4 md:h-4 xl:w-4.5 xl:h-4.5" />
          )}
        </button>
      </div>
    </div>
  );
}

export default NavBar;
