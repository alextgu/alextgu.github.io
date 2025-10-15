import "./projects.css";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, ArrowDown, Clock, Type, Star } from "lucide-react";

// ===== PROJECT DATA =====
const projectsData = [
  { id: 1, name: 'Dynamic PP', year: 2024, description: 'BLAHBLAHBABSDBSADSA with dynamic difficulty scaling', tags: ['Web App', 'Tool'], icon: '/images/dynamic-pp-icon.png', image: '/images/dynamic-pp-screenshot.png', links: { github: 'https://github.com/username/dynamic-pp', demo: 'https://dynamic-pp.com' }},
  { id: 2, name: 'DisasteRisk', year: 2024, description: 'Real-time disaster monitoring and risk assessment platform', tags: ['Web App', 'API'], icon: '/images/disasterisk-icon.png', image: '/images/disasterisk-screenshot.png', links: { github: 'https://github.com/username/disasterisk', devpost: 'https://devpost.com/software/disasterisk' }},
  { id: 3, name: 'Portfolio Website', year: 2023, description: 'Personal portfolio showcasing projects and experience', tags: ['Website'], icon: '/images/portfolio-icon.png', image: '/images/portfolio-screenshot.png', links: { github: 'https://github.com/username/portfolio', demo: 'https://yourportfolio.com' }},
  { id: 4, name: 'Task Manager', year: 2023, description: 'Minimalist task management application with drag and drop', tags: ['Web App', 'Tool'], icon: '/images/task-manager-icon.png', image: '/images/task-manager-screenshot.png', links: { github: 'https://github.com/username/task-manager' }},
  { id: 5, name: 'Weather Dashboard', year: 2022, description: 'Beautiful weather forecast dashboard with interactive charts', tags: ['Web App', 'API'], icon: '/images/weather-icon.png', image: '/images/weather-screenshot.png', links: { github: 'https://github.com/username/weather-dashboard', demo: 'https://weather-dashboard.com' }},
  { id: 6, name: 'Recipe Finder', year: 2022, description: 'Find recipes based on ingredients you have at home', tags: ['Web App'], icon: '/images/recipe-icon.png', image: '/images/recipe-screenshot.png', links: { demo: 'https://recipe-finder.com' }},
];

function Projects() {
  const [sortOption, setSortOption] = useState('time');
  const [sortDirection, setSortDirection] = useState('desc');
  const [sortedProjects, setSortedProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
 

  // Sort projects based on current option and direction
  const sortProjects = (option, direction) => {
    let sorted = [...projectsData];
    if (option === 'time') {
      sorted.sort((a, b) => direction === 'asc' ? a.year - b.year : b.year - a.year);
    } else if (option === 'az') {
      sorted.sort((a, b) => direction === 'asc' ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name));
    } else if (option === 'professionalism') {
      sorted.sort((a, b) => direction === 'asc' ? a.id - b.id : b.id - a.id);
    }
    return sorted;
  };

  useEffect(() => {
    setSortedProjects(sortProjects('time', 'desc'));
  }, []);

  // Handle sort button click with animation replay + cooldown
  const handleSort = (option) => {
    if (isAnimating) return;

    setIsAnimating(true);

    let newOption = sortOption;
    let newDirection = sortDirection;

    if (sortOption === option) {
      newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
      setSortDirection(newDirection);
    } else {
      newOption = option;
      newDirection = 'desc';
      setSortOption(newOption);
      setSortDirection(newDirection);
    }


    setSortedProjects([]);
    setTimeout(() => {
      setSortedProjects(sortProjects(newOption, newDirection));
      setTimeout(() => setIsAnimating(false), 1000);
    }, 300);
  };

  const sortButtons = [
    { id: 'time', label: 'Time', icon: <Clock size={16} /> },
    { id: 'az', label: 'A–Z', icon: <Type size={16} /> },
    { id: 'professionalism', label: 'Professionalism', icon: <Star size={16} /> },
  ];

  const fadeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 } }),
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <section className="min-h-screen pt-20 md:pt-24 lg:pt-32 px-4 sm:px-6 md:px-20 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-4xl mb-12">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-normal mb-3">Projects</h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-light mt-4 leading-relaxed whitespace-pre-line">
          I build things. Some work, some break, some I forgot about.{'\n'}
         Currently perfecting {' '}
  <a 
    href="" 
    className="font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-400 transition-colors underline decoration-transparent hover:decoration-gray-600 dark:hover:decoration-gray-400 underline-offset-2"
  >
    Alextgu.github.io.
  </a>
          </p>
        </div>

        {/* SORT BAR */}
        <div className="flex items-center justify-start gap-4 mb-8">
          {sortButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => handleSort(btn.id)}
              disabled={isAnimating}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
                sortOption === btn.id
                  ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 border-transparent'
                  : 'bg-transparent border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              } ${isAnimating ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {btn.icon}
              <span>{btn.label}</span>
              {sortOption === btn.id &&
                (sortDirection === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />)}
            </button>
          ))}
        </div>

        {/* PROJECT GRID */}
        <motion.div className="grid gap-4 sm:gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3" layout>
          <AnimatePresence mode="popLayout">
            {sortedProjects.map((project, i) => (
              <motion.div
                key={project.id}
                variants={fadeVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                custom={i}
                onClick={() => setSelectedProject(project)}
                className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 sm:p-6 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300 hover:shadow-md relative cursor-pointer"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg sm:text-xl font-medium group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                    {project.name}
                  </h3>
                  <span className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 font-mono">{project.year}</span>
                </div>

                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="relative inline-block animate-bounce-horizontal">View more →</span>
                </div>

                {project.icon && (
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <img src={project.icon} alt={`${project.name} icon`} className="w-8 h-8 animate-bounce-vertical" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* PROJECT MODAL (unchanged) */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in" onClick={() => setSelectedProject(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden animate-scale-in" onClick={(e) => e.stopPropagation()}>
            {/* HEADER */}
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-8">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white">{selectedProject.name}</h2>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-mono bg-white dark:bg-gray-900 px-3 py-1 rounded-full">{selectedProject.year}</span>
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-8">
              {selectedProject.image && (
                <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
                  <img src={selectedProject.image} alt={`${selectedProject.name} screenshot`} className="w-full h-auto object-cover" />
                </div>
              )}
              <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{selectedProject.description}</p>
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

export default Projects;
