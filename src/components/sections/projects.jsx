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
// - description: Short description for card view
// - longDescription: (OPTIONAL) Detailed description for modal
// - screenshots: (OPTIONAL) Array of image URLs for gallery
// - links: Add github, devpost, demo URLs (optional)
const projectsData = [
  { 
    id: 1, 
    name: 'Dynamic PP', 
    date: '2025-09-27',
    displayDate: '09/27/25',
    professionalism: 9,
    hackathonWinner: true,
    description: 'Control your mouse by moving your iPhone around the room using motion sensors and click by elevation',
    longDescription: 'This project uses React Native to capture iPhone motion data and transmits it via WebSocket to control your computer cursor. The elevation changes allow you to click, making it a hands-free pointing device. Built during a hackathon in 24 hours.',
    tags: ['React Native', 'WebSocket', 'Hackathon'], 
    icon: '/projects/stupid.jpg', 
    image: '/images/dynamic-pp-screenshot.png',
    screenshots: [
      '/images/dynamic-pp-screenshot.png',
      '/images/dynamic-pp-demo.png',
      '/images/dynamic-pp-setup.png'
    ],
    gradientColor: 'from-blue-500/20 to-cyan-500/20', 
    iconBg: 'from-blue-500 to-cyan-500', 
    lucideIcon: 'Smartphone',
    links: {
      github: 'https://github.com/alextgu/stupid_hacks',
      devpost: 'https://devpost.com/software/dynamic-pp-positional-pointer',
      demo: 'https://yourdemolink.com'
    }
  },
  { 
    id: 2, 
    name: 'DisasteRisk*', 
    date: '2025-10-05',
    displayDate: '10/5/25',
    professionalism: 93,
    description: 'Draw regions on a 3D globe to analyze disaster impact on populations and infrastructure, with AI-powered insights', 
    longDescription: 'DisasteRisk is an interactive web app that visualizes and assesses disaster impact zones worldwide. Users can explore a 3D globe, draw custom regions, and analyze key data to identify vulnerable areas and populations. By combining population, infrastructure, and risk data from multiple APIs, DisasteRisk generates fast, actionable insights for both real and simulated disasters. It helps first responders and relief teams quickly locate high-risk zones, allocate resources efficiently, and make data-driven decisions during emergencies. Was really bummed this one didn’t win, but I think in the end the project use significance wasn’t strong enough. I still believe it has lots of potential.',
    tags: ['React', 'API', 'Hackathon'], 
    icon: 'projects/htv.png', 
    image: 'projects/htv-ex.jpg', 
    gradientColor: 'from-red-500/20 to-orange-500/20', 
    iconBg: 'from-red-500 to-orange-500', 
    lucideIcon: 'AlertTriangle',
    links: {
      github: 'https://github.com/alextgu/disasteRisk',
      devpost: 'https://devpost.com/software/disasterisk',
      demo: 'https://www.youtube.com/watch?time_continue=1&v=5T6N-Y1boDg&embeds_referring_euri=https%3A%2F%2Fdevpost.com%2F&source_ve_path=Mjg2NjY'
    }
  },
  { 
    id: 3, 
    name: 'TrueCount', 
    date: '2025-09-14',
    displayDate: '09/14/25',
    professionalism: 94,
    hackathonWinner: true,
    description: 'Privacy-first voting system where votes are cryptographically hidden, then revealed and locked on-chain forever', 
    tags: ['Blockchain', 'Ethereum', 'Hackathon'], 
    icon: 'projects/htn.jpeg', 
    image: '/public/projects/htn.jpeg', 
    gradientColor: 'from-purple-500/20 to-pink-500/20', 
    iconBg: 'from-purple-500 to-pink-500', 
    lucideIcon: 'Vote',
    links: {
      github: 'https://github.com/MartinPatr/TrueCount',
      devpost: 'https://devpost.com/software/truecount',
    }
  },
  { 
    id: 4, 
    name: 'Outcognito Mode', 
    date: '2025-10-12',
    displayDate: '10/12/25',
    professionalism: 2,
    description: 'Automatically posts your Google searches to X (Twitter) in real-time for literally no reason at all', 
    longDescription: 'Outcognito Mode is a live transparency bot that posts your Google searches to Twitter/X in real time. The bot monitors your active Chrome session and automatically posts batches of up to ten recent Google searches every 30 seconds. It only tracks searches while it’s running, so it won’t dig into your old history (thankfully). This is a Python remake of Harold Cooper’s 2017 Chrome extension of the same concept, which no longer exists on the Chrome Web Store. I really like making these "stupid" projects because it doesn’t feel like there are limitations :). My next "stupid" project will be even crazier and unique.',
    tags: ['Python', 'Twitter API'], 
    icon: '/projects/outcognito.png', 
    image: '/projects/outcognito-ex.png', 
    gradientColor: 'from-slate-500/20 to-gray-500/20', 
    iconBg: 'from-slate-500 to-gray-500', 
    lucideIcon: 'Eye',
    links: {
      github: 'https://github.com/alextgu/outcognito'
    }
  },
  { 
    id: 5, 
    name: 'ASCII Art Converter', 
    date: '2025-01-03',
    displayDate: '01/3/25',
    professionalism: 20,
    description: 'Transform any image into "beautiful" ASCII art 😱',
    longDescription: 'This was my first real project! It was a simple one, but it took me way longer than it should have and I’m pretty sure I ended up using AI to finish it because it was too hard to figure out at the time. Still, it taught me how to properly set up my environment and install dependencies (I installed the Python library Pillow in a virtual environment!). I wanted to show a contrast between my early and more polished projects, so I’m keeping this one here as a reminder of where I started.',
    tags: ['Python', 'Pillow'], 
    icon: '/projects/ascii.png', 
    image: '/projects/ascii.png', 
    gradientColor: 'from-green-500/20 to-emerald-500/20', 
    iconBg: 'from-green-500 to-emerald-500', 
    lucideIcon: 'Image',
    links: {
      github: 'https://github.com/alextgu/ASCII-Art-Converter'
    }
  },
  { 
    id: 6, 
    name: 'Pathway', 
    date: '2025-02-15',
    displayDate: '02/15/25',
    professionalism: 90,
    description: 'AI course advisor that scrapes UofT course catalog and recommends personalized courses based on your interests',
    longDescription: 'Pathway is a project that scrapes the UofT course list website and collects information from users about their interests. Using that data, the AI recommends the most suitable courses based on each user’s preferences. This was my first hackathon, and honestly, it set me back a bit in my coding journey. I missed the planning phase and got thrown into a project without even knowing the basics of Git! Despite contributing very little, I still slept less than two hours. In the end the experience humbled me and taught me how crucial proper planning is before jumping into a project.',
    tags: ['Next.js', 'OpenAI', 'Hackathon'], 
    icon: '/projects/dh.png', 
    image: '', 
    gradientColor: 'from-indigo-500/20 to-blue-500/20', 
    iconBg: 'from-indigo-500 to-blue-500', 
    lucideIcon: 'GraduationCap',
    links: {
      github: 'https://github.com/alextgu/Pathway_App',
      devpost: 'https://devpost.com/software/pathway-9ne2sq'
    }
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
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
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
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">About</h3>
                <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  {selectedProject.longDescription || selectedProject.description}
                </p>
              </div>

              {selectedProject.links && Object.keys(selectedProject.links).length > 0 && (
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
                    {selectedProject.links.devpost && (
                      <a
                        href={selectedProject.links.devpost}
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

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tags.map((tag, index) => {
                  const isHackathon = tag === 'Hackathon' && selectedProject.hackathonWinner;
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