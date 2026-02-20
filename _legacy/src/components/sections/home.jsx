import { useState, useEffect, useRef } from 'react';
import './styles/home.css';
import { Link } from 'react-router-dom';
import Computer from '../computer/Computer';
import SocialBar from '../SocialBar';

function Home() {
  const [shake, setShake] = useState(false);

  // Trigger shake on page load
  useEffect(() => {
    setShake(true);
    // Remove shake after animation completes (700ms)
    const timeout = setTimeout(() => {
      setShake(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  // --------------------------
  // Alex hover font animation
  // --------------------------
  const [alexFont, setAlexFont] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef(null);
  const fonts = ['', 'font-1','font-2','font-3','font-4','font-5','font-6','font-7','font-8','font-9','font-10'];

  useEffect(() => {
    if (isHovering) {
      intervalRef.current = setInterval(() => setAlexFont((prev) => (prev + 1) % fonts.length), 500);
    } else if (intervalRef.current) clearInterval(intervalRef.current);

    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isHovering]);

  // --------------------------
  // Rotating words
  // --------------------------
  const rotatingWords = ['"cool"', '"dumb"', '"poopy"', '"sigma"', '"goofy"', '"epic"', '"wild"'];
  const [wordIndex, setWordIndex] = useState(0);
  const handleWordClick = () => setWordIndex((wordIndex + 1) % rotatingWords.length);

  // --------------------------
  // Typing subtitle
  // --------------------------
  const subtitleWords = ['website','blog','webpage','yapsite'];
  const [typedText, setTypedText] = useState('');
  const [currentWord, setCurrentWord] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = subtitleWords[currentWord];
    const typeSpeed = isDeleting ? 50 : 120;
    const pause = isDeleting ? 500 : 1000 + Math.random() * 1500;
    let typingTimeout;

    if (!isDeleting && typedText.length < current.length) {
      typingTimeout = setTimeout(() => setTypedText(current.slice(0, typedText.length + 1)), typeSpeed);
    } else if (isDeleting && typedText.length > 0) {
      typingTimeout = setTimeout(() => setTypedText(current.slice(0, typedText.length - 1)), typeSpeed);
    } else if (!isDeleting && typedText.length === current.length) {
      typingTimeout = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && typedText.length === 0) {
      typingTimeout = setTimeout(() => {
        setIsDeleting(false);
        setCurrentWord((prev) => (prev + 1) % subtitleWords.length);
      }, pause);
    }

    return () => clearTimeout(typingTimeout);
  }, [typedText, isDeleting, currentWord]);

  // --------------------------
  // Hand wave emoji
  // --------------------------
  const [wave, setWave] = useState(true);
  useEffect(() => { const timeout = setTimeout(() => setWave(false), 1500); return () => clearTimeout(timeout); }, []);

  // --------------------------
  // Card tilt effect
  // --------------------------
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });


  const handleMouseMove = (e) => {
    const container = cardRef.current;
    if (!container) return;
    
    const card = container.querySelector('.card-tilt');
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -1.5;
    const rotateY = ((x - centerX) / centerX) * 1.5;
    
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // --------------------------
  // Floating prompts for "any reason"
  // --------------------------
  const [floatingPrompts, setFloatingPrompts] = useState([]);
  const [clickCount, setClickCount] = useState(0);
  const resetTimerRef = useRef(null);
  
  const reasonMessages = [
    "Let's bike somewhere!",
    "Let's grab coffee sometime ☕",
    "Let's film a movie!",
    "Let's freestyle rap. ",
    "I'm a good listener (where my hug at)",
    "Let's talk about baseball ⚾",
    "I know the best noodle spots 🍜",
    "Let's collaborate on something! 🤝",
    "I offer incredible wisdom!",
    "I can help with your project!",
    "I'm funny!",
    "I need friends!",
  ];

  // Reset click count after 5 seconds of inactivity
  useEffect(() => {
    if (clickCount > 0) {
      // Clear existing timer
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
      
      // Set new timer to reset after 5 seconds
      resetTimerRef.current = setTimeout(() => {
        setClickCount(0);
      }, 5000);
    }
    
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, [clickCount]);

  const handleAnyReasonClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    setClickCount(prev => prev + 1);
    
    // Calculate probability of "Please :(" appearing based on click count
    // After 5 clicks, it starts appearing more frequently
    const desperationThreshold = 5;
    const desperationChance = clickCount >= desperationThreshold 
      ? Math.min(0.7, (clickCount - desperationThreshold + 1) * 0.15) 
      : 0;
    
    let randomMessage;
    if (Math.random() < desperationChance) {
      randomMessage = "Please :(";
    } else {
      randomMessage = reasonMessages[Math.floor(Math.random() * reasonMessages.length)];
    }
    
    // Random horizontal offset (-50px to 50px)
    const randomX = (Math.random() - 0.5) * 100;
    // Random rotation (-15deg to 15deg)
    const randomRotation = (Math.random() - 0.5) * 30;
    
    const newPrompt = {
      id: Date.now(),
      message: randomMessage,
      x: rect.left + rect.width / 2,
      y: rect.top,
      offsetX: randomX,
      rotation: randomRotation,
    };
    
    setFloatingPrompts(prev => [...prev, newPrompt]);
    
    // Remove prompt after animation completes
    setTimeout(() => {
      setFloatingPrompts(prev => prev.filter(p => p.id !== newPrompt.id));
    }, 3000);
  };

  return (
    <>
      {/* Floating Prompts */}
      {floatingPrompts.map(prompt => (
        <div
          key={prompt.id}
          className="fixed z-50 animate-float-up cursor-pointer hover:scale-110 transition-transform"
          style={{
            left: `${prompt.x}px`,
            top: `${prompt.y}px`,
            transform: 'translate(-50%, -100%)',
            '--offset-x': `${prompt.offsetX}px`,
            '--rotation': `${prompt.rotation}deg`,
          }}
          onClick={() => setFloatingPrompts(prev => prev.filter(p => p.id !== prompt.id))}
        >
          <div className="bg-amber-400 text-gray-900 px-3 py-2 rounded-lg shadow-lg text-[clamp(10px,1.8vw,14px)] md:text-sm font-medium whitespace-nowrap">
            {prompt.message}
          </div>
        </div>
      ))}

      {/* Main Section */}
      <section id="home" className="min-h-screen pt-24 relative">
        <div className="grid md:grid-cols-2 gap-12 items-start w-full">
          
          {/* Left: Text Content */}
          <div 
            className="md:pl-20 flex justify-center md:justify-start px-8"
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div 
              className={`card-tilt border border-gray-300 dark:border-zinc-700 rounded-lg py-[clamp(1.5rem,3vw,2rem)] px-[clamp(1.5rem,3vw,2rem)] pr-[clamp(2rem,4vw,3rem)] bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm shadow-lg space-y-[clamp(2rem,5vw,3rem)] md:py-8 md:pl-8 md:pr-12 md:space-y-12 w-[clamp(400px,80vw,700px)] md:w-[700px] md:min-w-[700px] flex-shrink-0 ${shake ? 'animate-subtle-shake' : ''}`}
              style={{
                '--rotate-x': `${tilt.x}deg`,
                '--rotate-y': `${tilt.y}deg`,
              }}
            >
              <div>
              <h1 className="text-[clamp(32px,6vw,56px)] md:text-[56px] font-normal leading-tight">
                <span className="text-gray-400 dark:text-zinc-500">Hi, I'm{' '}</span>
                <span
                  className={`alex-interactive text-gray-900 dark:text-white ${fonts[alexFont]} inline-block`}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  Alexander
                </span>{' '}
                <span className={wave ? 'hand-wave' : ''}>👋</span>
              </h1>

              <p className="text-[clamp(15px,2.7vw,24px)] md:text-2xl font-light text-gray-700 dark:text-zinc-300 mt-2 tracking-tight leading-normal">
                Thank you for visiting! Welcome to my personal{' '}
                <span className="font-medium text-gray-900 dark:text-white border-b border-dotted border-gray-400">
                  {typedText}
                  <span className="typing-cursor">|</span>
                </span>
              </p>
            </div>

            <p className="text-[clamp(18px,3.5vw,30px)] md:text-[30px] font-normal text-gray-400 dark:text-zinc-500 leading-snug">
              I love playing{' '}
              <Link to="/hobbies">
                <span className="highlight-word highlight-green text-gray-900 dark:text-white cursor-pointer">
                  sports,
                </span>
              </Link>{' '}
              experimenting with{' '}
              <Link to="/hobbies">
                <span className="highlight-word highlight-green text-gray-900 dark:text-white">
                  cinematography,
                </span>
              </Link>{' '}
              eating{' '}
              <Link to="/hobbies">
                <span className="highlight-word highlight-green text-gray-900 dark:text-white">
                  noodles 🍜
                </span>
              </Link>{' '}
              and building{' '}
              <span
                className="interactive-word-wrapper cursor-pointer"
                onClick={handleWordClick}
              >
                {rotatingWords[wordIndex]}{' '}
              </span>
              <Link to="/projects">
                <span className="highlight-word highlight-blue text-gray-900 dark:text-white">
                  projects.
                </span>
              </Link>{' '}
              One day, I will throw out the{' '}
              <Link to="/bucket-list">
                <span className="highlight-word highlight-rose text-gray-900 dark:text-white">
                  first pitch
                </span>
              </Link>{' '}
              at an MLB game.
            </p>

            <p className="text-[clamp(18px,3.5vw,30px)] md:text-[30px] font-normal text-gray-400 dark:text-zinc-500 leading-snug">
            <a>
                I'm currently helping organize the first{' '}
                <span className="highlight-word highlight-purple text-gray-900 dark:text-white">
                  Chinese Canadian Film Festival.
                </span>
              </a>{' '}
              If you want to <span className="any-reason cursor-pointer" onClick={handleAnyReasonClick}>(for any reason)</span> reach out, please{' '}
              <span className="relative inline-block group">
                <span className="highlight-word highlight-yellow text-gray-900 dark:text-white cursor-pointer">
                  contact me!
                </span>
                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 opacity-0 w-max px-2 py-1 text-sm text-gray-900 bg-white border border-gray-300 rounded-md pointer-events-none shadow-md transition-opacity duration-300 delay-400 group-hover:opacity-100">
                  I need friends
                </span>
              </span>{' '}
              📩
            </p>
            </div>
          </div>

          {/* Social Bar */}
          <SocialBar />

          {/* Right: Laptop */}
          <div className="hidden md:flex flex-col justify-center items-center text-center">
            <h3 className="mb-4 text-sm">
              Click for work, website history and contact! A better design is being worked on!
            </h3>
            <Link to="/computer">
              <img
                src="/home/laptop.png"
                alt="Laptop"
                className="transform scale-x-[-1] cursor-pointer hover:opacity-90 transition-opacity w-full max-w-[300px]"
              />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home