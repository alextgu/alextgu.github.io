import { useState, useEffect, useRef } from 'react';
import './home.css';
import { Link } from 'react-router-dom';
import Computer from '../computer/Computer';

function Home() {
  // --------------------------
  // ✅ Show mobile popup only first time
  // --------------------------
  const [showMobileWarning, setShowMobileWarning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Check localStorage for first-time popup
    const hasSeenPopup = localStorage.getItem('hasSeenMobileWarning');
    if (!hasSeenPopup && window.innerWidth < 768) {
      setShowMobileWarning(true);
      localStorage.setItem('hasSeenMobileWarning', 'true');
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLeave = () => {
    window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  };

  // --------------------------
  // Alex hover font animation
  // --------------------------
  const [alexFont, setAlexFont] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef(null);
  const fonts = [
    '',
    'font-1',
    'font-2',
    'font-3',
    'font-4',
    'font-5',
    'font-6',
    'font-7',
    'font-8',
    'font-9',
    'font-10',
  ];

  // --------------------------
  // Rotating words
  // --------------------------
  const rotatingWords = [
    '"cool"', '"dumb"', '"poopy"', '"sigma"', '"goofy"', '"epic"', '"wild"', '🥭'
  ];
  const [wordIndex, setWordIndex] = useState(0);
  const handleWordClick = () =>
    setWordIndex((prev) => (prev + 1) % rotatingWords.length);

  // --------------------------
  // Alex hover font cycling
  // --------------------------
  useEffect(() => {
    if (isHovering) {
      intervalRef.current = setInterval(
        () => setAlexFont((prev) => (prev + 1) % fonts.length),
        500
      );
    } else if (intervalRef.current) clearInterval(intervalRef.current);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovering]);

  // --------------------------
  // Fade in animation
  // --------------------------
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timeout);
  }, []);

  // --------------------------
  // Typing subtitle
  // --------------------------
  const subtitleWords = ['website', 'blog', 'digital garden', 'webpage', 'yapsite'];
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

    if (!isDeleting && typedText.length === 0) {
      const chance = Math.floor(Math.random() * 20);
      if (chance === 0) {
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        setEmoji(randomEmoji);
      } else setEmoji('');
    }

    if (!isDeleting && typedText.length < current.length) {
      typingTimeout = setTimeout(
        () => setTypedText(current.slice(0, typedText.length + 1)),
        typeSpeed
      );
    } else if (isDeleting && typedText.length > 0) {
      typingTimeout = setTimeout(
        () => setTypedText(current.slice(0, typedText.length - 1)),
        typeSpeed
      );
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
  useEffect(() => {
    const timeout = setTimeout(() => setWave(false), 1500);
    return () => clearTimeout(timeout);
  }, []);

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
                onClick={() => setShowMobileWarning(false)}
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
      <section id="home" className="min-h-screen pt-24">
      <div className="grid grid-cols-1 custom:grid-cols-2 lg:grid-cols-2 gap-12 items-start w-full">


         {/* Left: Text Content */}
         <div className="space-y-6 sm:space-y-12 px-6 sm:pl-6 md:pl-20 lg:pl-15">

  <div>
    {/* Header */}
    <h1 className="text-3xl sm:text-[48px] custom:text-[60px] xl:text-[68px] font-normal text-gray-400 dark:text-zinc-500 leading-tight sm:leading-[5rem]">
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

    {/* Typing subtitle */}
    <p className="text-base sm:text-[20px] custom:text-[22px] xl:text-2xl font-light text-gray-700 dark:text-zinc-300 mt-1 sm:mt-2 tracking-tight leading-relaxed sm:leading-normal">
      Welcome to my personal{' '}
      <span className="font-medium text-gray-900 dark:text-white border-b border-dotted border-gray-400">
        {typedText}
        {emoji}
        <span className="typing-cursor">|</span>
      </span>
    </p>
  </div>

  {/* Body text */}
  <p className="text-lg sm:text-[27px] custom:text-[30px] xl:text-[30px] font-normal text-gray-400 dark:text-zinc-500 leading-relaxed custom:leading-snug">
    I love playing{' '}
    <Link to="/hobbies">
      <span className="relative inline-block group">
        <span className="highlight-word highlight-green text-gray-900 dark:text-white cursor-pointer">
          sports,
        </span>
        <span className="hidden sm:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 opacity-0 w-max px-2 py-1 text-sm text-gray-900 bg-white border border-gray-300 rounded-md pointer-events-none shadow-md transition-opacity duration-300 delay-400 group-hover:opacity-100">
          Baseball, Basketball, Volleyball, Ultimate Frisbee, Badminton etc
        </span>
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
      {rotatingWords[wordIndex]}
    </span>{' '}
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

  {/* Chinese Canadian Film Festival */}
  <p className="text-lg sm:text-[27px] custom:text-[28px] xl:text-[30px] font-normal text-gray-400 dark:text-zinc-500 leading-relaxed custom:leading-snug">
    <a>
      I'm currently helping organize the first{' '}
      <span className="highlight-word highlight-purple text-gray-900 dark:text-white">
        Chinese Canadian Film Festival.
      </span>
    </a>{' '}
    If you want to{' '}
    <span className="any-reason">(for any reason)</span> reach out, please{' '}
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


          {/* Right: Laptop image */}
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

export default Home;
