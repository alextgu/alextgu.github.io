// components/Projects/ProjectModal.jsx
import React from 'react';
import { Trophy } from 'lucide-react';

function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-8">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white">
              {project.name}
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400 font-mono bg-white dark:bg-gray-900 px-3 py-1 rounded-full">
              {project.displayDate}
            </span>
          </div>
        </div>
        
        <div className="p-8">
          {/* MAIN IMAGE */}
          {project.image && (
            <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
              <img
                src={project.image}
                alt={`${project.name} screenshot`}
                className="w-full h-auto object-cover"
              />
            </div>
          )}
          
          {/* ABOUT SECTION */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">About</h3>
            <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* ALEX SCALE */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Alex Scale™</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Rating</span>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{project.alexScale}/100</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden mb-2">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  project.alexScale >= 80 ? 'bg-green-500' :
                  project.alexScale >= 50 ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}
                style={{ width: `${project.alexScale}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 italic">
              What Alex rates this project and its context - hackathon/event/people worked with/my mood
            </p>
          </div>

          {/* SCREENSHOTS GALLERY */}
          {project.screenshots && project.screenshots.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Images</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.screenshots.map((screenshot, index) => (
                  <div key={index} className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                    <img
                      src={screenshot}
                      alt={`${project.name} screenshot ${index + 1}`}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-sm font-medium px-4 py-2 bg-black/40 rounded-lg backdrop-blur-sm">
                        {project.screenshotCaptions && project.screenshotCaptions[index] 
                          ? project.screenshotCaptions[index] 
                          : 'Click to enlarge'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LINKS */}
          {project.links && Object.keys(project.links).length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Links</h3>
              <div className="flex flex-wrap gap-3">
                {project.links.github && (
                  <a
                    href={project.links.github}
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
                {project.links.devpost && (
                  <a
                    href={project.links.devpost}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.002 1.61L0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61H6.002zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595V5.694zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853H10.112z"/>
                    </svg>
                    Devpost
                  </a>
                )}
                {project.links.demo && (
                  <a
                    href={project.links.demo}
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

          {/* TAGS */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag, index) => {
              const isHackathon = tag === 'Hackathon' && project.hackathonWinner;
              return (
                <span
                  key={index}
                  className={`text-sm px-3 py-1.5 rounded-full font-medium ${
                    isHackathon 
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 font-semibold'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {isHackathon && <Trophy size={14} className="inline-block mr-1 mb-0.5" />}
                  {isHackathon ? `${tag} Winner` : tag}
                </span>
              );
            })}
          </div>

          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="w-full mt-3 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;