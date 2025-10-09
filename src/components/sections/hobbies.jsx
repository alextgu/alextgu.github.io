import React from 'react';
import './hobbies.css';

function Hobbies() {
  return (
    <section className="min-h-screen pt-20 md:pt-24 lg:pt-32 xl:pt-[7.7rem] px-4 sm:px-6 md:px-20 lg:px-20">
      {/* Header Section */}
      <div className="max-w-4xl mb-16">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-normal mb-3">
          Hobbies
        </h1>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-light mt-4 leading-relaxed whitespace-pre-line">
          Things I do for fun when I'm not coding or studying.<br />
          I love sharing them so people can learn more about me!
        </p>
      </div>

      {/* Hobbies Grid/List */}
      <div className="max-w-6xl space-y-8">
        {/* Hobby Item Template */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl sm:text-3xl font-normal text-gray-900 dark:text-white mb-3">
            Sports
          </h2>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
            Baseball, basketball, volleyball, ultimate frisbee, badminton, and more. I love staying active and competing.
          </p>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl sm:text-3xl font-normal text-gray-900 dark:text-white mb-3">
            Cinematography
          </h2>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
            Experimenting with cameras, lighting, and storytelling through video.
          </p>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl sm:text-3xl font-normal text-gray-900 dark:text-white mb-3">
            Noodles 🍜
          </h2>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
            Exploring different types of noodles and the best noodle spots around the city.
          </p>
        </div>

        {/* Add more hobby items here */}
      </div>
    </section>
  );
}

export default Hobbies;
