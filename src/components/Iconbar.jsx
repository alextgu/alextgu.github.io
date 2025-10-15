import { useState, useRef } from 'react';
import { Sun, Moon, Volume2, VolumeX, ChevronRight } from 'lucide-react';
import './IconBar.css';

let toastIdCounter = 0; // unique id for each toast

function IconBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMusicOn, setIsMusicOn] = useState(false);
  
  // Individual animation states for each button
  const [animatingButtons, setAnimatingButtons] = useState({});
  
  // Ref to track cooldown timers
  const cooldownRefs = useRef({});

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

  const handleIconClick = (buttonId, callback, message) => {
    // Prevent if this specific button is already animating
    if (animatingButtons[buttonId]) return;
    
    // Set this specific button to animating
    setAnimatingButtons(prev => ({
      ...prev,
      [buttonId]: true
    }));
    
    callback();
    addToast(message);
    
    // Clear any existing timeout for this button
    if (cooldownRefs.current[buttonId]) {
      clearTimeout(cooldownRefs.current[buttonId]);
    }
    
    // Set cooldown for this specific button (1000ms)
    cooldownRefs.current[buttonId] = setTimeout(() => {
      setAnimatingButtons(prev => ({
        ...prev,
        [buttonId]: false
      }));
    }, 1000);
  };

  const buttons = [
    { 
      id: 'darkMode', // Unique identifier for each button
      state: isDarkMode, 
      toggle: () => setIsDarkMode(!isDarkMode), 
      iconOn: <Moon size={20} />, 
      iconOff: <Sun size={20} />, 
      message: 'Switched Mode' 
    },
    { 
      id: 'music', // Unique identifier for each button
      state: isMusicOn, 
      toggle: () => setIsMusicOn(!isMusicOn), 
      iconOn: <Volume2 size={20} />, 
      iconOff: <VolumeX size={20} />, 
      message: 'Music Toggled' 
    },
  ];

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
        {buttons.map((btn) => (
          <span key={btn.id} className="relative inline-block group">
            <button
              onClick={() => handleIconClick(btn.id, btn.toggle, btn.message)}
              className={`transition-colors px-1.5 py-[0.4rem] rounded-md relative overflow-hidden
                text-gray-400 dark:text-zinc-500
                hover:bg-gray-300/80 dark:hover:bg-zinc-700/80
                ${animatingButtons[btn.id] ? 'cursor-not-allowed opacity-70' : ''}`}
              disabled={animatingButtons[btn.id]} // Disable button during cooldown
            >
              {btn.state ? btn.iconOn : btn.iconOff}

              {/* Cooldown overlay */}
              {animatingButtons[btn.id] && (
                <span className="absolute inset-0 bg-black/10 dark:bg-white/10 animate-[slideDown_1s_ease-out]" />
              )}
            </button>
          </span>
        ))}
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