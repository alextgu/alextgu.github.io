// components/Projects/Projects.jsx
import React, { useState, useEffect } from "react";
import { ArrowUp, ArrowDown, Clock, Type, Star, Sparkles, ChevronRight, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { projectsData, featuredContent } from "../data/projectsData";

function Projects() {
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState("time");
  const [sortDirection, setSortDirection] = useState("desc");
  const [sortedProjects, setSortedProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
  const [isHoveringFeatured, setIsHoveringFeatured] = useState(false);
  const [hoveredProjectId, setHoveredProjectId] = useState(null);

  const sortProjects = (option, direction) => {
    const sorted = [...projectsData];
    if (option === "time") {
      sorted.sort((a, b) => (direction === "asc" ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)));
    } else if (option === "az") {
      sorted.sort((b, a) => (direction === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
    } else if (option === "professionalism") {
      sorted.sort((a, b) => (direction === "asc" ? a.professionalism - b.professionalism : b.professionalism - a.professionalism));
    }
    return sorted;
  };

  useEffect(() => {
    setSortedProjects(sortProjects("time", "desc"));
  }, []);

  const handleSort = (option) => {
    let newOption = sortOption;
    let newDirection = sortDirection;

    if (sortOption === option) {
      newDirection = sortDirection === "asc" ? "desc" : "asc";
    } else {
      newOption = option;
      newDirection = "desc";
    }

    setSortOption(newOption);
    setSortDirection(newDirection);
    setSortedProjects(sortProjects(newOption, newDirection));
  };

  const sortButtons = [
    { id: "time", label: "Time", icon: <Clock size={14} /> },
    { id: "az", label: "A-Z", icon: <Type size={14} /> },
    { id: "professionalism", label: "Professional", icon: <Star size={14} /> },
  ];

  return (
    <section className="min-h-screen pt-20 md:pt-24 lg:pt-32 px-4 sm:px-6 md:px-20 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* HEADER AND FEATURED SECTION */}
        <div className="flex flex-col md:flex-row md:items-start gap-8 mb-12">
          <div className="flex-1">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-normal mb-3">Projects</h1>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-light mt-4 leading-relaxed">
              I build things. Most suck, here are some of them.
              <br />
              Currently perfecting{" "}
              <a
                href=""
                className="font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-400 transition-colors underline decoration-transparent hover:decoration-gray-600 dark:hover:decoration-gray-400 underline-offset-2"
              >
                alextgu.github.io
              </a>.
            </p>
          </div>

          {/* FEATURED SECTION */}
          <div className="flex-1 md:flex md:flex-col md:justify-center">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={20} className="text-yellow-500 dark:text-yellow-400" />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-gray-900 dark:text-white">Featured</h2>
            </div>
            <div 
              onClick={() => navigate(featuredContent[currentFeaturedIndex].link)}
              onMouseEnter={() => setIsHoveringFeatured(true)}
              onMouseLeave={() => setIsHoveringFeatured(false)}
              className="relative bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300 hover:shadow-xl max-w-[340px] cursor-pointer overflow-hidden group"
            >
              {/* Animated gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${featuredContent[currentFeaturedIndex].color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-blue-400/10 dark:from-purple-500/10 dark:to-blue-500/10 rounded-full blur-2xl transform translate-x-16 -translate-y-16"></div>
              
              <div className="relative z-10">
                {featuredContent.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentFeaturedIndex((prev) => (prev + 1) % featuredContent.length);
                    }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors z-10 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                    aria-label="Next featured item"
                  >
                    <ArrowDown size={16} className="transform rotate-[-90deg]" />
                  </button>
                )}
                
                <div className="flex items-start gap-3 mb-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 ${featuredContent[currentFeaturedIndex].iconColor} transition-transform duration-300 ${isHoveringFeatured ? 'scale-110 rotate-6' : ''}`}>
                    <Calendar size={20} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mt-1 text-gray-900 dark:text-white">
                    {featuredContent[currentFeaturedIndex].title}
                  </h3>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {featuredContent[currentFeaturedIndex].description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {featuredContent.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentFeaturedIndex(index);
                        }}
                        className={`h-1.5 rounded-full transition-all ${
                          index === currentFeaturedIndex
                            ? "bg-gray-900 dark:bg-white w-8"
                            : "bg-gray-300 dark:bg-gray-600 w-1.5"
                        }`}
                        aria-label={`Go to featured item ${index + 1}`}
                      />
                    ))}
                  </div>
                  
                  <div className={`flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300 transition-transform duration-300 ${isHoveringFeatured ? 'translate-x-1' : ''}`}>
                    <span>Explore</span>
                    <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SORT BAR */}
        <div className="flex items-center justify-start gap-2 sm:gap-4 mb-8">
          {sortButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => handleSort(btn.id)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg border transition-all duration-200 text-sm ${
                sortOption === btn.id
                  ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900 border-transparent"
                  : "bg-transparent border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {btn.icon}
              <span className="whitespace-nowrap">{btn.label}</span>
              {sortOption === btn.id &&
                (sortDirection === "asc" ? <ArrowUp size={16} /> : <ArrowDown size={16} />)}
            </button>
          ))}
        </div>

        {/* PROJECT GRID */}
        <div className="grid gap-4 sm:gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {sortedProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isHovered={hoveredProjectId === project.id}
              onHover={() => setHoveredProjectId(project.id)}
              onLeave={() => setHoveredProjectId(null)}
              onClick={() => setSelectedProject(project)}
              sortOption={sortOption}
            />
          ))}
        </div>
      </div>

      {/* PROJECT MODAL */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
}

export default Projects;