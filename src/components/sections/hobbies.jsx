import React from 'react';
import './hobbies.css';

function Hobbies() {
  return (
    <section className="min-h-screen pt-20 md:pt-24 lg:pt-32 px-4 sm:px-6 md:px-20 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="max-w-4xl mb-16">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-normal mb-3">
            Hobbies
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-light mt-6 leading-relaxed whitespace-pre-line">
            Things I do for fun when I'm not coding or studying.{'\n'}I love sharing them so people can learn more about me!
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hobbies;