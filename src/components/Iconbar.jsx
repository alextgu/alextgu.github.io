import { useState } from 'react';
import { Sun, Moon, Volume2, VolumeX, ChevronRight } from 'lucide-react';
import './IconBar.css';

let toastIdCounter = 0; // unique id for each toast

function IconBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMusicOn, setIsMusicOn] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Toasts stack state
  const [toasts, setToasts] = useState([]);

  const toggleIconBar = () => {
    setIsOpen(!isOpen);
  };

  const addToast = (message) => {
    const id = toastIdCounter++;
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2000); // toast disappears after 2s
  };

  const handleIconClick = (callback, message) => {
    if (isAnimating) return;
    setIsAnimating(true);
    callback();
    addToast(message);
    setTimeout(() => setIsAnimating(false), 1000); // cooldown
  };

  return (
    <div>
      {/* Toggle Button */}
      <button
        onClick={toggleIconBar}
        className="fixed top-4 left-[350px] z-50 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border border-gray-300/70 dark:border-zinc-700/70 rounded-lg px-1.5 py-[0.52rem] shadow-md hover:bg-gray-200/70 dark:hover:bg-zinc-800/70"
      >
        <ChevronRight
          size={20}
          className={`text-gray-400 dark:text-zinc-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Icon Container */}
      <div
        className={`fixed top-4 left-[390px] bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border border-gray-300/70 dark:border-zinc-700/70 rounded-lg px-1.5 py-[0.15rem] flex gap-[0.15rem] items-center transition-all duration-600 ease-in-out shadow-md z-40
          ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 pointer-events-none'}`}
      >
        {/* Dark Mode Icon */}
        <span className="relative inline-block group">
          <button
            onClick={() =>
              handleIconClick(
                () => setIsDarkMode(!isDarkMode),
                isDarkMode ? 'Switched to Light Mode' : 'Switched to Dark Mode'
              )
            }
            className="text-gray-400 dark:text-zinc-500 transition-colors px-1.5 py-[0.4rem] rounded-md hover:bg-gray-300/80 dark:hover:bg-zinc-700/80 relative overflow-hidden"
          >
            {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
            {isAnimating && (
              <span className="absolute inset-0 bg-black/10 animate-[slideDown_1s_ease-out]" />
            )}
          </button>
        </span>

        {/* Music Icon */}
        <span className="relative inline-block group">
          <button
            onClick={() =>
              handleIconClick(
                () => setIsMusicOn(!isMusicOn),
                isMusicOn ? 'Music Off' : 'Music On'
              )
            }
            className="text-gray-400 dark:text-zinc-500 transition-colors px-1.5 py-[0.4rem] rounded-md hover:bg-gray-300/80 dark:hover:bg-zinc-700/80 relative overflow-hidden"
          >
            {isMusicOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
            {isAnimating && (
              <span className="absolute inset-0 bg-black/10 animate-[slideDown_1s_ease-out]" />
            )}
          </button>
        </span>
      </div>

      {/* Toast Stack */}
<div className="fixed bottom-4 right-4 flex flex-col gap-1 z-50 items-end">
  {toasts.map((toast) => (
    <div
      key={toast.id}
      className="text-black dark:text-white text-sm animate-fadeInOut"
      style={{ textAlign: 'left' }}
    >
      {toast.message}
    </div>
  ))}
</div>

    </div>
  );
}

export default IconBar;
