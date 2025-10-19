import React, { useState, useEffect } from "react";
import { ArrowUp, ArrowDown, Clock, Type, Star, Sparkles, ChevronRight, Calendar, Smartphone, Vote, Eye, AlertTriangle, Image, GraduationCap, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";

// TO CUSTOMIZE PROJECT CARDS:
// - gradientColor: Change gradient background (e.g., "from-blue-500/20 to-purple-500/20")
// - iconBg: Change icon badge gradient (e.g., "from-blue-500 to-purple-500")
// - lucideIcon: Import icon from lucide-react and add here (e.g., Zap, Rocket, etc.)
// - date: Format as YYYY-MM for proper sorting
// - displayDate: Format as MM/YY for display
// - professionalism: Score 0-100 for professionalism meter
const projectsData = [
  { 
    id: 1, 
    name: 'Dynamic PP', 
    date: '2025-09',
    displayDate: '09/25',
    professionalism: 9,
    hackathonWinner: true,
    description: 'Control your mouse by moving your iPhone around the room using motion sensors and click by elevation', 
    tags: ['React Native', 'WebSocket', 'Hackathon'], 
    icon: '/images/dynamic-pp-icon.png', 
    image: '/images/dynamic-pp-screenshot.png', 
    gradientColor: 'from-blue-500/20 to-cyan-500/20', 
    iconBg: 'from-blue-500 to-cyan-500', 
    lucideIcon: 'Smartphone' 
  },
  { 
    id: 2, 
    name: 'DisasteRisk*', 
    date: '2025-10',
    displayDate: '10/25',
    professionalism: 93,
    description: 'Draw regions on a 3D globe to analyze disaster impact on populations and infrastructure, with AI-powered insights', 
    tags: ['React', 'API', 'Hackathon'], 
    icon: 'projects/htv.png', 
    image: 'projects/htv-ex.jpg', 
    gradientColor: 'from-red-500/20 to-orange-500/20', 
    iconBg: 'from-red-500 to-orange-500', 
    lucideIcon: 'AlertTriangle' 
  },
  { 
    id: 3, 
    name: 'TrueCount', 
    date: '2025-09',
    displayDate: '09/25',
    professionalism: 94,
    hackathonWinner: true,
    description: 'Privacy-first voting system where votes are cryptographically hidden, then revealed and locked on-chain forever', 
    tags: ['Blockchain', 'Ethereum', 'Hackathon'], 
    icon: 'projects/htn.jpeg', 
    image: '/public/projects/htn.jpeg', 
    gradientColor: 'from-purple-500/20 to-pink-500/20', 
    iconBg: 'from-purple-500 to-pink-500', 
    lucideIcon: 'Vote' 
  },
  { 
    id: 4, 
    name: 'Outcognito Mode', 
    date: '2025-10',
    displayDate: '10/25',
    professionalism: 2,
    description: 'Automatically posts your Google searches to Twitter in real-time as a statement on digital privacy', 
    tags: ['Python', 'Twitter API'], 
    icon: '/projects/outcognito.png', 
    image: '/projects/outcognito.png', 
    gradientColor: 'from-slate-500/20 to-gray-500/20', 
    iconBg: 'from-slate-500 to-gray-500', 
    lucideIcon: 'Eye' 
  },
  { 
    id: 5, 
    name: 'ASCII Art Converter', 
    date: '2025-01',
    displayDate: '01/25',
    professionalism: 20,
    description: 'Transform any image into beautiful ASCII art with customizable character sets', 
    tags: ['Python', 'Pillow'], 
    icon: '/projects/ascii.png', 
    image: '/projects/ascii.png', 
    gradientColor: 'from-green-500/20 to-emerald-500/20', 
    iconBg: 'from-green-500 to-emerald-500', 
    lucideIcon: 'Image' 
  },
  { 
    id: 6, 
    name: 'Pathway', 
    date: '2025-02',
    displayDate: '02/25',
    professionalism: 90,
    description: 'AI course advisor that scrapes UofT course catalog and recommends personalized courses based on your interests', 
    tags: ['Next.js', 'OpenAI', 'Hackathon'], 
    icon: '/projects/dh.png', 
    image: '/projects/dh.png', 
    gradientColor: 'from-indigo-500/20 to-blue-500/20', 
    iconBg: 'from-indigo-500 to-blue-500', 
    lucideIcon: 'GraduationCap' 
  },
];

function Projects() {
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState("time");
  const [sortDirection, setSortDirection] = useState("desc");
  const [sortedProjects, setSortedProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
  const [isHoveringFeatured, setIsHoveringFeatured] = useState(false);
  const [hoveredProjectId, setHoveredProjectId] = useState(null);

  // Icon mapping for dynamic rendering
  const iconMap = {
    Smartphone, Vote, Eye, AlertTriangle, Image, GraduationCap, Calendar
  };

  const featuredContent = [
    { title: "Project a week challenge!", description: "Building and shipping a new project every week", link: "/projectaweek", color: "from-blue-500/20 to-purple-500/20", iconColor: "text-blue-500" }
  ];

  const sortProjects = (option, direction) => {
    const sorted = [...projectsData];
    if (option === "time") {
      // Sort by date string (YYYY-MM format)
      sorted.sort((a, b) => (direction === "asc" ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)));
    } else if (option === "az") {
      sorted.sort((b, a) => (direction === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
    } else if (option === "professionalism") {
      // Sort by professionalism score (0-100)
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
        <div className="flex flex-col md:flex-row md:items-start gap-8 mb-12">
          <div className="flex-1">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-normal mb-3">Projects</h1>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-light mt-4 leading-relaxed">
              I build things. Most suck, here is a random batch of my projects.
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
          {sortedProjects.map((project) => {
            const IconComponent = iconMap[project.lucideIcon];
            const isHovered = hoveredProjectId === project.id;
            
            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                onMouseEnter={() => setHoveredProjectId(project.id)}
                onMouseLeave={() => setHoveredProjectId(null)}
                className="relative bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-5 sm:p-6 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300 hover:shadow-xl cursor-pointer min-h-[240px] overflow-hidden group"
              >
                {/* ANIMATED GRADIENT BACKGROUND - Change gradientColor in projectsData to customize */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradientColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                {/* DECORATIVE BLUR CIRCLE - Adjust colors here for different blur effects */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-blue-400/10 dark:from-purple-500/10 dark:to-blue-500/10 rounded-full blur-2xl transform translate-x-16 -translate-y-16"></div>
                
                <div className="relative z-10">
                  {/* HEADER WITH ICON BADGE */}
                  <div className="flex items-start gap-3 mb-3">
                    {/* ICON BADGE - Change iconBg in projectsData to customize gradient */}
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${project.iconBg} transition-transform duration-300 ${isHovered ? 'scale-110 rotate-6' : ''}`}>
                      {IconComponent && <IconComponent size={20} className="text-white" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-1">
                        {project.name}
                      </h3>
                      <span className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 font-mono">
                        {project.displayDate}
                      </span>
                    </div>
                  </div>

                  {/* DESCRIPTION */}
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* PROFESSIONALISM METER - Only shown when sorting by professionalism */}
                  {sortOption === 'professionalism' && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Professionalism</span>
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{project.professionalism}/100</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            project.professionalism >= 80 ? 'bg-green-500' :
                            project.professionalism >= 50 ? 'bg-yellow-500' :
                            project.professionalism >= 25 ? 'bg-orange-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${project.professionalism}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* TAGS */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, index) => {
                      const isHackathon = tag === 'Hackathon' && project.hackathonWinner;
                      return (
                        <span
                          key={index}
                          className={`text-xs px-2.5 py-1 rounded-full font-medium relative ${
                            isHackathon 
                              ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 font-semibold shadow-lg'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {isHackathon && (
                            <>
                              <Trophy size={12} className="inline-block mr-1 mb-0.5" />
                              {tag} Winner
                            </>
                          )}
                          {!isHackathon && tag}
                        </span>
                      );
                    })}
                  </div>

                  {/* FOOTER WITH IMAGE ICON AND EXPLORE BUTTON */}
                  <div className="flex items-center justify-between mt-4">
                    {/* LEFT: Project image icon */}
                    {project.icon && (
                      <div className={`opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                        <img src={project.icon} alt={`${project.name} icon`} className="w-8 h-8" />
                      </div>
                    )}
                    
                    {/* RIGHT: Explore text with arrow */}
                    <div className={`flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300 transition-all duration-300 ${isHovered ? 'translate-x-1 opacity-100' : 'opacity-0'}`}>
                      <span>Explore</span>
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-8">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white">
                  {selectedProject.name}
                </h2>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-mono bg-white dark:bg-gray-900 px-3 py-1 rounded-full">
                  {selectedProject.displayDate}
                </span>
              </div>
            </div>
            <div className="p-8">
              {selectedProject.image && (
                <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={selectedProject.image}
                    alt={`${selectedProject.name} screenshot`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
              <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {selectedProject.description}
              </p>
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