import { useState, useEffect, useRef } from 'react';
import './home.css';
import { Link } from 'react-router-dom';
import NatureWindow from '../NatureWindow';


function Home() {
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
  // Rotating words in quotes
  // --------------------------
  const rotatingWords = [
    '"cool"', '"dumb"', '"poopy"', '"sigma"','"goofy"', '"epic"', '"wild"',
    '"cool"', '"dumb"', '"poopy"', '"sigma"','"goofy"', '"epic"', '"wild"',
    '"cool"', '"dumb"', '"poopy"', '"sigma"','"goofy"', '"epic"', '"wild"',
    '"cool"', '"dumb"', '"poopy"', '"sigma"','"goofy"', '"epic"', '"wild"',
    '"cool"', '"dumb"', '"poopy"', '"sigma"','"goofy"', '"epic"', '"wild"',
    '"cool"', '"dumb"', '"poopy"', '"sigma"','"goofy"', '"epic"', '"wild"',
    '🥭'
  ];
  const [wordIndex, setWordIndex] = useState(0);
  const handleWordClick = () =>
    setWordIndex((prev) => (prev + 1) % rotatingWords.length);

  // --------------------------
  // Alex hover font effect
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
  // Typing subtitle animation with random emoji
  // --------------------------
  const subtitleWords = ['website', 'blog', 'digital garden', 'webpage'];
  const emojis = [' 🥭']; // emoji pool
  const [typedText, setTypedText] = useState('');
  const [currentWord, setCurrentWord] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [emoji, setEmoji] = useState('');

  useEffect(() => {
    const current = subtitleWords[currentWord];
    const typeSpeed = isDeleting ? 50 : 120;
    const pause = isDeleting ? 500 : 1000 + Math.random() * 1500;
    let typingTimeout;

    // Decide emoji only when starting a new word
    if (!isDeleting && typedText.length === 0) {
      const chance = Math.floor(Math.random() * 20); // 1/20 chance
      if (chance === 0) {
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        setEmoji(randomEmoji);
      } else {
        setEmoji('');
      }
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
  // Website age calculation
  // --------------------------
  const [websiteAge, setWebsiteAge] = useState('');

  useEffect(() => {
    const calculateAge = () => {
      const startDate = new Date('2025-10-02');
      const now = new Date();
      
      const diffTime = Math.abs(now - startDate);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const diffYears = Math.floor(diffDays / 365);
      const remainingDays = diffDays % 365;
      const diffMonths = Math.floor(remainingDays / 30);
      const finalDays = remainingDays % 30;
      
      let ageString = '';
      if (diffYears > 0) {
        ageString += `${diffYears} year${diffYears > 1 ? 's' : ''}`;
      }
      if (diffMonths > 0) {
        if (ageString) ageString += ', ';
        ageString += `${diffMonths} month${diffMonths > 1 ? 's' : ''}`;
      }
      if (finalDays > 0 || ageString === '') {
        if (ageString) ageString += ', and ';
        ageString += `${finalDays} day${finalDays !== 1 ? 's' : ''}`;
      }
      
      setWebsiteAge(ageString + ' old');
    };

    calculateAge();
    const interval = setInterval(calculateAge, 1000 * 60 * 60); // Update every hour
    
    return () => clearInterval(interval);
  }, []);

  // --------------------------
  // Hand wave emoji on page load
  // --------------------------
  const [wave, setWave] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => setWave(false), 1500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section id="home" className="min-h-screen pt-20 md:pt-24 lg:pt-40 xl:pt-[7.7rem]">
      {/* Grid: Left text + Right placeholder */}
      <div className="grid grid-cols-1 mid:grid-cols-2 lg:grid-cols-2 gap-12 items-start w-full">
        {/* Left: Text Content */}
        <div className="space-y-12 pl-4 sm:pl-6 md:pl-20 lg:pl-20">
          <div>
            {/* Header */}
            <h1 className="text-3xl sm:text-4xl lg:text-[64px] font-normal text-gray-400 dark:text-zinc-500 leading-[5rem]">
              Hi, I'm{' '}
              <span
                className={`alex-interactive text-gray-900 dark:text-white ${fonts[alexFont]}`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                Alex
              </span>{' '}
              <span className={wave ? 'hand-wave' : ''}>👋</span>
            </h1>

            {/* Typing subtitle */}
            <p className="text-lg sm:text-xl lg:text-2xl font-light text-gray-700 dark:text-zinc-300 mt-2 tracking-tight">
              Welcome to my personal{' '}
              <span className="font-medium text-gray-900 dark:text-white border-b border-dotted border-gray-400">
                {typedText}
                {emoji}
                <span className="typing-cursor">|</span>
              </span>
            </p>
          </div>

          {/* Body text */}
          <p className="text-3xl sm:text-4xl lg:text-[32px] font-normal text-gray-400 dark:text-zinc-500 leading-loose">
            I love playing{' '}
            <Link to="/hobbies">
              <span className="relative inline-block group">
                <span className="highlight-word highlight-green text-gray-900 dark:text-white cursor-pointer">
                  sports,
                </span>
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 opacity-0 w-max px-2 py-1 text-sm text-gray-900 bg-white border border-gray-300 rounded-md pointer-events-none shadow-md transition-opacity duration-300 delay-400 group-hover:opacity-100">
                  Baseball, Basketball, Volleyball, Ultimate Frisbee, Badminton etc
                </span>
              </span>
            </Link>{' '}
            experimenting with {' '}
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
            and building {''}
            <span
              className="interactive-word-wrapper cursor-pointer"
              onClick={handleWordClick}
            >
              {rotatingWords[wordIndex]}{/* quotes purely decorative */}
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
          <p className="text-3xl sm:text-4xl lg:text-[32px] font-normal text-gray-400 dark:text-zinc-500 leading-loose">
            <a
              href="https://tccff.ca"
              target="_blank"
              rel="noopener noreferrer"
            >
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
            </span>
            {' '}📩
          </p>
        </div>

        {/* Right: Nature Window */}
        <div className="h-96 mt-8 md:mt-0">
          <NatureWindow season="spring" time="day" />
        </div>
      </div>

      {/* Additional Sections Below */}
      <div className="mt-48 px-4 sm:px-6 md:px-20 lg:px-20 space-y-12">
        {/* Work Section */}
        <div className="space-y-0.5">
          <h2 className="text-lg font-normal text-gray-900 dark:text-white">Work</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-loose">
            Work will be here!
            <lis>
            <p>My work history</p>
            <p>Additional Involvements/Clubs/Volunteering</p>
            <p>What I want to do in future</p>
            </lis>
          </p>
        </div>

        {/* Contact Section */}
        <div className="space-y-0.5">
          <h2 className="text-lg font-normal text-gray-900 dark:text-white">Contact</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            alexnopost.gu@mail.utoronto.ca
          </p>
          I want to make videos....
        </div>

        {/* Website Description */}
        <div className="space-y-0.5">
          <h2 className="text-lg font-normal text-gray-900 dark:text-white">This Site</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            The first draft of this website is not made yet, but this website is technically <span className="font-medium text-gray-900 dark:text-white">{websiteAge}</span>.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Home;