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

    </section>
  );
}

export default Hobbies;
