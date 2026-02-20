import React, { useState } from "react";
import { ArrowLeft, Target, ExternalLink } from "lucide-react";
import { projectAWeekInfo, projectsList } from "../data/projectAWeekData";

function ProjectAWeek() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section className="min-h-screen pt-20 md:pt-24 lg:pt-32 px-4 sm:px-6 md:px-20 lg:px-20">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4"
        >
          <ArrowLeft size={20} />
          <span>Back to Projects</span>
        </button>

       {/* GitHub Button */}
<div className="flex flex-col items-start gap-2 mb-8">
  <a
    href={'https://github.com/alextgu/project-a-week-challenge'}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 px-3 py-1.5 bg-gray-900 dark:bg-gray-700 text-white rounded-md 
               hover:bg-gray-800 dark:hover:bg-gray-600 transition-all font-medium text-sm"
  >
    {/* GitHub Icon */}
    <svg
      className="w-4 h-4"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 
           0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466
           -.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647
           .35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688
           -.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844
           c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202
           2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943
           .359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 
           10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
    <span>GitHub</span>
  </a>
</div>


        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-normal mb-6 text-center md:text-left">
            Project a Week Challenge
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            {projectAWeekInfo.description}
          </p>
          <div className="text-sm text-gray-500 dark:text-gray-500 font-mono">
            <span>Start Date: {projectAWeekInfo.startDate}</span>
            <span className="mx-3">•</span>
            <span>End Date: {projectAWeekInfo.endDate}</span>
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-6">
          {projectsList.map((project) => (
            <div
              key={project.week}
              onClick={() => project.done && setSelectedProject(project)}
              className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 transition-all duration-300 ${
                project.done
                  ? "hover:border-gray-400 dark:hover:border-gray-500 cursor-pointer hover:shadow-lg"
                  : "opacity-60 cursor-not-allowed"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-baseline gap-3">
                  <span className="text-sm text-gray-400 dark:text-gray-500 font-mono">
                    Week {project.week}
                  </span>
                  <span className="text-xl font-medium text-gray-900 dark:text-white">
                    {project.name}
                  </span>
                  {!project.done && (
                    <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 font-medium">
                      Not Done
                    </span>
                  )}
                </div>
                {project.done && (
                  <ExternalLink
                    size={16}
                    className="text-gray-400 dark:text-gray-500 flex-shrink-0"
                  />
                )}
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                {project.description}
              </p>

              {/* General Plan Section */}
              {project.generalPlan && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-start gap-2">
                    <Target
                      size={16}
                      className="text-blue-500 dark:text-blue-400 mt-0.5 flex-shrink-0"
                    />
                    <div>
                      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        General Plan
                      </span>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {project.generalPlan}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* PROJECT MODAL */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-mono mb-2 block">
                    Week {selectedProject.week}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white">
                    {selectedProject.name}
                  </h2>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              {/* Main Image */}
              {selectedProject.image && (
                <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={selectedProject.image}
                    alt={`${selectedProject.name} screenshot`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
              
              {/* About Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">About</h3>
                <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  {selectedProject.longDescription || selectedProject.description}
                </p>
              </div>

              {/* General Plan in Modal */}
              {selectedProject.generalPlan && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Learning Goals</h3>
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <Target size={18} className="text-blue-500 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {selectedProject.generalPlan}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tech Stack */}
              {selectedProject.techStack && selectedProject.techStack.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="text-sm px-3 py-1.5 rounded-full font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Links */}
              {selectedProject.links && (Object.keys(selectedProject.links).length > 0) && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Links</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.links.github && (
                      <a
                        href={selectedProject.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors font-medium"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                        GitHub
                      </a>
                    )}
                    {selectedProject.links.demo && (
                      <a
                        href={selectedProject.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors font-medium"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="w-full mt-3 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ProjectAWeek;