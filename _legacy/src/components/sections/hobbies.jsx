import React, { useState, useEffect } from 'react';
import './styles/hobbies.css';

function Hobbies() {
  const [shake, setShake] = useState(false);

  // Trigger shake on page load
  useEffect(() => {
    setShake(true);
  }, []);

  return (
    <section className="min-h-screen pt-20 md:pt-24 lg:pt-32 px-4 sm:px-6 md:px-20 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className={`max-w-4xl mb-16 ${shake ? 'animate-subtle-shake' : ''}`}>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-normal mb-3">
            Hobbies
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-light mt-6 leading-relaxed whitespace-pre-line">
            Things I do for fun and in my spare time (NOT CODING). {'\n'} Learn more about me.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hobbies;