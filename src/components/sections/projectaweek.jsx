import React from "react";
import { ArrowLeft } from "lucide-react";

const projectsList = [
  { week: 1, name: "--", link: "", description: "--" },
  { week: 2, name: "--", link: "", description: "--" },
  // Add more projects as you complete them
];

function ProjectAWeek() {
  return (
    <section className="min-h-screen pt-20 md:pt-24 lg:pt-32 px-4 sm:px-6 md:px-20 lg:px-20">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back to Projects</span>
        </button>

        {/* Header */}
        <div className="mb-12">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-normal mb-6 text-center md:text-left">Project a Week Challenge</h1>
          <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            I saw some other people making a project a week and I wanted to try. Right now I am too lazy to make a clean design so this will suffice.
          </p>
          <div className="text-sm text-gray-500 dark:text-gray-500 font-mono">
            <span>Start Date: October 20th, 2025</span>
            <span className="mx-3">•</span>
            <span>End Date: October 20th, 2026</span>
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-6">
          {projectsList.map((project) => (
            <div
              key={project.week}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-baseline gap-3">
                  <span className="text-sm text-gray-400 dark:text-gray-500 font-mono">Week {project.week}</span>
                  <a
                    href={project.link}
                    className="text-xl font-medium text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.name}
                  </a>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectAWeek;