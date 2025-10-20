// components/Projects/ProjectCard.jsx
import React from 'react';
import { Smartphone, Vote, Eye, AlertTriangle, Image, GraduationCap, Trophy, ChevronRight } from 'lucide-react';

const iconComponents = {
  Smartphone,
  Vote,
  Eye,
  AlertTriangle,
  Image,
  GraduationCap,
};

function ProjectCard({ project, isHovered, onHover, onLeave, onClick, sortOption }) {
  const IconComponent = iconComponents[project.lucideIcon];

  return (
    <div
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="relative bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-5 sm:p-6 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300 hover:shadow-xl cursor-pointer min-h-[240px] overflow-hidden group"
    >
      {/* ANIMATED GRADIENT BACKGROUND */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradientColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
      
      {/* DECORATIVE BLUR CIRCLE */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-blue-400/10 dark:from-purple-500/10 dark:to-blue-500/10 rounded-full blur-2xl transform translate-x-16 -translate-y-16"></div>
      
      <div className="relative z-10">
        {/* HEADER WITH ICON BADGE */}
        <div className="flex items-start gap-3 mb-3">
          {/* ICON BADGE */}
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

        {/* PROFESSIONALISM METER (only shown when sorting by professionalism) */}
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
}

export default ProjectCard;