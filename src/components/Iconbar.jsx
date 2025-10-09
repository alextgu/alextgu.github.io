import { useState } from 'react';
import { Lightbulb, Moon, Volume2, VolumeX, Sun, Snowflake, Leaf, Flower2, ChevronRight } from 'lucide-react';
import './IconBar.css';

function IconBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMusicOn, setIsMusicOn] = useState(false);
  const [season, setSeason] = useState(0); // 0=summer, 1=fall, 2=winter, 3=spring
  const [isAnimating, setIsAnimating] = useState(false);
  
  const toggleIconBar = () => {
    setIsOpen(!isOpen);
  };
  
  const handleIconClick = (callback) => {
    if (isAnimating) return; // Prevent spam
    
    setIsAnimating(true);
    callback();
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000); // Cooldown duration in ms
  };

  const seasonIcons = [
    <Sun size={20} />,
    <Leaf size={20} />,
    <Snowflake size={20} />,
    <Flower2 size={20} />
  ];
  
  return (
    <div>
  {/* Toggle Button */}
  <button 
  onClick={toggleIconBar}
  className="fixed top-4 left-[350px] z-50 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border border-gray-300/70 dark:border-zinc-700/70 rounded-lg px-2 py-[0.53rem] shadow-md hover:bg-gray-200/70 dark:hover:bg-zinc-800/70"
>
<ChevronRight size={20} className={`text-gray-400 dark:text-zinc-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
  </button>
  
 {/* Icon Container */}
 <div 
   className={`fixed top-4 left-[390px] bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border border-gray-300/70 dark:border-zinc-700/70 rounded-lg px-2 py-[0.21rem] flex gap-0.5 items-center transition-all duration-600 ease-in-out shadow-md z-40
        ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 pointer-events-none'}`}
>
<span className="relative inline-block group">
  <button 
    onClick={() => handleIconClick(() => setIsDarkMode(!isDarkMode))}
    className="text-gray-400 dark:text-zinc-500 transition-colors px-2 py-1 rounded-md hover:bg-gray-300/80 dark:hover:bg-zinc-700/80 relative overflow-hidden"
  >
    {isDarkMode ? <Moon size={20} /> : <Lightbulb size={20} />}
    {isAnimating && (
      <span className="absolute inset-0 bg-black/10 animate-[slideDown_1s_ease-out]" />
    )}
  </button>
  <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 w-max px-1.5 py-0.5 text-xs text-gray-500 dark:text-zinc-400 bg-white border border-gray-300 rounded-md pointer-events-none shadow-md transition-opacity duration-300 delay-400 group-hover:opacity-100">
    Display Light/Dark
  </span>
</span>
<span className="relative inline-block group">
  <button 
    onClick={() => handleIconClick(() => setSeason((season + 1) % 4))}
    className="text-gray-400 dark:text-zinc-500 transition-colors px-2 py-1 rounded-md hover:bg-gray-300/80 dark:hover:bg-zinc-700/80 relative overflow-hidden"
  >
    {seasonIcons[season]}
    {isAnimating && (
      <span className="absolute inset-0 bg-black/10 animate-[slideDown_1s_ease-out]" />
    )}
  </button>
  <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 w-max px-1.5 py-0.5 text-xs text-gray-500 dark:text-zinc-400 bg-white border border-gray-300 rounded-md pointer-events-none shadow-md transition-opacity duration-300 delay-400 group-hover:opacity-100">
    Change Season
  </span>
</span>
<span className="relative inline-block group">
  <button 
    onClick={() => handleIconClick(() => setIsMusicOn(!isMusicOn))}
    className="text-gray-400 dark:text-zinc-500 transition-colors px-2 py-1 rounded-md hover:bg-gray-300/80 dark:hover:bg-zinc-700/80 relative overflow-hidden"
  >
    {isMusicOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
    {isAnimating && (
      <span className="absolute inset-0 bg-black/10 animate-[slideDown_1s_ease-out]" />
    )}
  </button>
  <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 w-max px-1.5 py-0.5 text-xs text-gray-500 dark:text-zinc-400 bg-white border border-gray-300 rounded-md pointer-events-none shadow-md transition-opacity duration-300 delay-400 group-hover:opacity-100">
    Music On/Off
  </span>
</span>
      </div>
    </div>
  );
}

export default IconBar;