import { useState, useEffect, useRef } from 'react';
import './styles/home.css';
import { Link } from 'react-router-dom';
import Computer from '../computer/Computer';
import { useMango } from '@/context/MangoContext';
import SocialBar from '../SocialBar';

function Home() {
  const { collectMango, isCollected } = useMango();

  const [showMobileWarning, setShowMobileWarning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [shake, setShake] = useState(false);

  // Trigger shake on page load
  useEffect(() => {
    setShake(true);
  }, []);

  // --------------------------
  // Mobile warning popup
  // --------------------------
  useEffect(() => {
    const handleResize = () => {
      const isMobileNow = window.innerWidth < 768;
      const hasSeenPopup = sessionStorage.getItem('hasSeenMobileWarning') === 'true';

      if (isMobileNow && !hasSeenPopup) {
        setShowMobileWarning(true);
        setIsMobile(true);
      } else {
        setShowMobileWarning(false);
        setIsMobile(isMobileNow);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleVisitAnyways = () => {
    sessionStorage.setItem('hasSeenMobileWarning', 'true');
    setShowMobileWarning(false);
  };

  const handleLeave = () => {
    window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  };

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
  const subtitleWords = ['website','blog','digital garden','webpage','yapsite'];
  const emojis = [' 🥭'];
  const [typedText, setTypedText] = useState('');
  const [currentWord, setCurrentWord] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [emoji, setEmoji] = useState('');

  useEffect(() => {
    const current = subtitleWords[currentWord];
    const typeSpeed = isDeleting ? 50 : 120;
    const pause = isDeleting ? 500 : 1000 + Math.random() * 1500;
    let typingTimeout;

    if (!isDeleting && typedText.length === 0 && Math.floor(Math.random()*20) === 0) {
      setEmoji(emojis[Math.floor(Math.random()*emojis.length)]);
    }

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


  return (
    <>
      {/* Mobile Warning Popup */}
      {isMobile && showMobileWarning && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-md shadow-xl max-w-sm w-full p-5">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              You're missing out! 🖥️
            </h2>
            <p className="text-sm text-gray-700 dark:text-zinc-300 mb-5 leading-relaxed">
              This website is much better on a laptop (or maximize your window)! Please change your device!
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleVisitAnyways}
                className="flex-1 px-3 py-2 text-xs bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-md font-medium hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors"
              >
                Visit Anyways
              </button>
              <button
                onClick={handleLeave}
                className="flex-1 px-3 py-2 text-xs bg-white dark:bg-zinc-800 text-gray-900 dark:text-white border border-gray-300 dark:border-zinc-600 rounded-md font-medium hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
              >
                Leave Site
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Section */}
      <section id="home" className="min-h-screen pt-24 relative">
        <div className="grid grid-cols-1 custom:grid-cols-2 lg:grid-cols-2 gap-12 items-start w-full">

          {/* Left: Text Content */}
          <div className="space-y-6 sm:space-y-12 px-6 sm:pl-6 md:pl-20 lg:pl-15">

            <div>
              <h1 className={`text-3xl sm:text-[48px] custom:text-[60px] xl:text-[68px] font-normal text-gray-400 dark:text-zinc-500 leading-tight sm:leading-[5rem] ${shake ? 'animate-subtle-shake' : ''}`}>
                Hi, I'm{' '}
                <span
                  className={`alex-interactive text-gray-900 dark:text-white ${fonts[alexFont]} inline-block`}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  Alex
                </span>{' '}
                <span className={wave ? 'hand-wave' : ''}>👋</span>
              </h1>

              <p className={`text-base sm:text-[20px] custom:text-[22px] xl:text-2xl font-light text-gray-700 dark:text-zinc-300 mt-1 sm:mt-2 tracking-tight leading-relaxed sm:leading-normal ${shake ? 'animate-subtle-shake' : ''}`}>
                Welcome to my personal{' '}
                <span className="font-medium text-gray-900 dark:text-white border-b border-dotted border-gray-400">
                  {typedText}
                  {emoji}
                  <span className="typing-cursor">|</span>
                </span>
              </p>
            </div>

            <p className={`text-lg sm:text-[27px] custom:text-[30px] xl:text-[30px] font-normal text-gray-400 dark:text-zinc-500 leading-relaxed custom:leading-snug ${shake ? 'animate-subtle-shake' : ''}`}>
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

            <p className={`text-lg sm:text-[27px] custom:text-[28px] xl:text-[30px] font-normal text-gray-400 dark:text-zinc-500 leading-relaxed custom:leading-snug ${shake ? 'animate-subtle-shake' : ''}`}>
            <a>
                I'm currently helping organize the first{' '}
                <span className="highlight-word highlight-purple text-gray-900 dark:text-white">
                  Chinese Canadian Film Festival.
                </span>
              </a>{' '}
              If you want to <span className="any-reason">(for any reason)</span> reach out, please{' '}
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

          {/* Social Bar */}
          <SocialBar />

          {/* Right: Laptop */}
          <div className="hidden custom:flex flex-col justify-center items-center text-center">
            <h3 className="mb-4 text-xs md:text-sm">
              Click for work, website history and contact! A better design is being worked on!
            </h3>
            <Link to="/computer">
              <img
                src="/home/laptop.png"
                alt="Laptop"
                className="transform scale-x-[-1] cursor-pointer hover:opacity-90 transition-opacity w-full max-w-[260px] xl:max-w-[300px]"
              />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home