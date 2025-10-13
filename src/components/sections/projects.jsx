import React, { useState } from 'react';
import './projects.css';

const projectsData = [
  { id: 1, name: 'Project One', thumbnail: '/images/placeholder.png', year: 2024, expandable: true, link: '/projects/1' },
  { id: 2, name: 'Project Two', thumbnail: '/images/placeholder.png', year: 2023, expandable: false, link: '/projects/2' },
  { id: 3, name: 'Project Three', thumbnail: '/images/placeholder.png', year: 2022, expandable: true, link: '/projects/3' },
  { id: 4, name: 'Project Four', thumbnail: '/images/placeholder.png', year: 2021, expandable: false, link: '/projects/4' },
];

function Projects() {
  const [slideIndex, setSlideIndex] = useState(0);
  const visibleCount = 2; // number of cards visible at once
  const total = projectsData.length;

  const prevSlide = () => {
    setSlideIndex((prev) => (prev - 1 + total) % total);
  };

  const nextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % total);
  };

  // Circular carousel logic: create a slice that wraps around
  const getVisibleProjects = () => {
    const result = [];
    for (let i = 0; i < visibleCount; i++) {
      result.push(projectsData[(slideIndex + i) % total]);
    }
    return result;
  };

  const visibleProjects = getVisibleProjects();

  return (
    <section className="min-h-screen pt-20 md:pt-24 lg:pt-32 px-4 sm:px-6 md:px-20 lg:px-20">
      <div className="max-w-4xl mb-16">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-normal mb-3">Projects</h1>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-light mt-6 leading-relaxed whitespace-pre-line">
          I love building! Here’s pretty much everything I’ve made, whether it’s completely useless or serves a real purpose.<br/>
          I am currently polishing up Dynamic PP and DisasteRisk.
        </p>
      </div>

      {/* Featured Projects Carousel */}
      <section className="mb-16 relative">
        <h2 className="text-3xl mb-6">Featured Projects</h2>
        <div className="relative flex items-center">
          <button
            onClick={prevSlide}
            className="absolute left-0 z-10 bg-gray-200 dark:bg-gray-700 p-3 rounded-full shadow-lg"
          >
            ◀
          </button>

          <div className="flex gap-4 overflow-hidden w-full justify-center">
            {visibleProjects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg flex flex-col overflow-hidden aspect-video transform hover:scale-105 transition-transform duration-300 w-[45%]"
              >
                <div className="flex justify-between items-start px-4 pt-4">
                  <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
                    {project.name}
                  </span>
                </div>
                <div className="flex-grow m-4 rounded-lg overflow-hidden shadow-inner">
                  <img
                    src={project.thumbnail}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="absolute right-0 z-10 bg-gray-200 dark:bg-gray-700 p-3 rounded-full shadow-lg"
          >
            ▶
          </button>
        </div>
      </section>

      {/* Projects Grid */}
      <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
        {projectsData.map((project) => (
          <div
            key={project.id}
            className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg flex flex-col overflow-hidden aspect-video hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <div className="flex justify-between items-start px-4 pt-4">
              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
                {project.name}
              </span>
            </div>
            <div className="flex-grow m-4 rounded-lg overflow-hidden shadow-inner">
              <img
                src={project.thumbnail}
                alt={project.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
