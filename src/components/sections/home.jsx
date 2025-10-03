import { useState, useEffect, useRef } from 'react';
import './home.css';
import { Link } from 'react-router-dom';

function Home() {
  const [alexFont, setAlexFont] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef(null);

  const fonts = ['', 'font-1', 'font-2', 'font-3', 'font-4', 'font-5', 'font-6', 'font-7', 'font-8', 'font-9', 'font-10'];

  const rotatingWords = ['cool"', 'dumb"', 'poopy"', 'sigma"', 'super sigma"', 'cool"', 'professional"', 'dumb"', 'poopy"', 'sigma"', 'super sigma"','cool"', 'professional"', 'dumb"', 'poopy"', 'sigma"', 'super sigma"','cool"', 'professional"', 'stop spamming 😡"'];
  const [wordIndex, setWordIndex] = useState(0);

  const handleWordClick = () => {
    setWordIndex((prev) => (prev + 1) % rotatingWords.length);
  };

  useEffect(() => {
    if (isHovering) {
      intervalRef.current = setInterval(() => {
        setAlexFont((prev) => (prev + 1) % fonts.length);
      }, 500);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovering]);

  return (
    <section id="home" className="min-h-screen pt-20 md:pt-24">
      {/* Responsive grid: 1 column on small screens, 2 columns on medium+ */}
      <div className="grid grid-cols-1 mid:grid-cols-2 lg:grid-cols-2 gap-12 items-start w-full">

        
        {/* Left: Text Content */}
        <div className="space-y-12 pl-4 sm:pl-6 md:pl-20 lg:pl-20">
          <h1 className="text-3xl sm:text-4xl lg:text-[31px] font-normal text-gray-400 dark:text-zinc-500 leading-[5rem]">
            Hi, I'm{' '}
            <span
              className={`alex-interactive text-gray-900 dark:text-white ${fonts[alexFont]}`}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              Alex
            </span>{' '}
            👋 Welcome to my personal website! I'm currently helping organize the first{' '}
            <a href="https://tccff.ca" target="_blank" rel="noopener noreferrer">
              <span className="highlight-word highlight-purple text-gray-900 dark:text-white">
                Chinese Canadian Film Festival.
              </span>
            </a>
          </h1>

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
            exploring{' '}
            <Link to="/hobbies">
              <span className="highlight-word highlight-green text-gray-900 dark:text-white">films,</span>
            </Link>{' '}
            eating{' '}
            <Link to="/hobbies">
              <span className="highlight-word highlight-green text-gray-900 dark:text-white">mango pudding</span>
            </Link>{' '}
            🥭 and building "
        
            <span className="interactive-word-wrapper cursor-pointer" onClick={handleWordClick}>
              <span className="rotating-word">{rotatingWords[wordIndex]}</span>
            </span>{' '}
            <Link to="/projects">
              <span className="highlight-word highlight-blue text-gray-900 dark:text-white">projects.</span>
            </Link>{' '}
            One day, I will throw out the{' '}
            <Link to="/bucket-list">
              <span className="highlight-word highlight-rose text-gray-900 dark:text-white">first pitch</span>
            </Link>{' '}
            at an MLB game.
          </p>

          <p className="text-3xl sm:text-4xl lg:text-[32px] font-normal text-gray-400 dark:text-zinc-500 leading-loose">
            This site is where I will post my life. If you want to (for any reason) reach out, please{' '}
            <span className="relative inline-block group">
              <span className="highlight-word highlight-yellow text-gray-900 dark:text-white cursor-pointer">
                contact me!
              </span>
              <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 opacity-0 w-max px-2 py-1 text-sm text-gray-900 bg-white border border-gray-300 rounded-md pointer-events-none shadow-md transition-opacity duration-300 delay-400 group-hover:opacity-100">
                I need friends
              </span>
            </span>
          </p>

          {/* Work Section */}
          <div className="space-y-0.5">
            <h2 className="text-lg font-normal text-gray-900 dark:text-white">Work</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg leading-loose">
              What you do professionally... nothing
            </p>
          </div>

          {/* Contact Section */}
          <div className="space-y-0.5">
            <h2 className="text-lg font-normal text-gray-900 dark:text-white">Contact</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed">
              your.email@example.com
            </p>
          </div>

          {/* Website Description */}
          <div className="space-y-0.5">
            <h2 className="text-lg font-normal text-gray-900 dark:text-white">This Site</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed">
              A collection of my work, hobbies, and dreams...
            </p>
          </div>
        </div>

        {/* Right: 3D Animation Placeholder */}
        <div className="h-96 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 rounded-lg flex items-center justify-center border border-gray-200 dark:border-gray-700 mt-8 md:mt-0">
          <p className="text-gray-400 dark:text-gray-500">This website is in progress</p>
        </div>
      </div>
    </section>
  );
}

export default Home;
