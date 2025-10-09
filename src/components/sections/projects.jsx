import React from 'react';
import './projects.css';

const projectsData = [
  {
    id: 1,
    name: 'Project One',
    description: 'Blah Blah',
    tech: ['React', 'TypeScript'],
    year: 2024,
  },
  {
    id: 2,
    name: 'Project Two',
    description: 'Blah Blah',
    tech: ['Python', 'Flask'],
    year: 2023,
  },
  // Add more projects here
];

function Projects() {
  return (
    <section className="min-h-screen pt-20 md:pt-24 lg:pt-32 xl:pt-[7.7rem] px-4 sm:px-6 md:px-20 lg:px-20">
      {/* Header */}
      <div className="max-w-4xl mb-16">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-normal mb-3">
          Projects
        </h1>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-light mt-6 leading-relaxed whitespace-pre-line">
  I love building! Here’s pretty much everything I’ve made, whether it’s completely useless or serves a real purpose.<br/>
  I am trying my very best to not use AI for projects with the purpose of learning!
</p>
      </div>

      {/* Projects Grid */}
      <div className="max-w-6xl grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {projectsData.map((project) => (
          <div
            key={project.id}
            id={`project-${project.id}`}                 // unique DOM ID
            data-name={project.name}                     // for sorting/filtering
            data-year={project.year}                     // for sorting/filtering
            data-tech={project.tech.join(',')}           // for sorting/filtering
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-2xl sm:text-3xl font-normal mb-3">
              {project.name}
            </h2>
            <p className="text-sm sm:text-base text-gray-400 dark:text-zinc-500 mb-4 leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t, i) => (
                <span
                  key={i}
                  className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-700 rounded-full px-2 py-1"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
