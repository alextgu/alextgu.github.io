function Projects() {
    const projects = [
      {
        id: 1,
        title: 'Project Name 1',
        description: 'A brief description of what this project does and the problem it solves.',
        technologies: ['React', 'Node.js', 'MongoDB'],
        image: '/images/project1.jpg',
        github: 'https://github.com/alextgu/project1',
        demo: 'https://project1-demo.com',
      },
      {
        id: 2,
        title: 'Project Name 2',
        description: 'Another cool project with some interesting features and functionality.',
        technologies: ['Python', 'Flask', 'PostgreSQL'],
        image: '/images/project2.jpg',
        github: 'https://github.com/alextgu/project2',
        demo: 'https://project2-demo.com',
      },
      {
        id: 3,
        title: 'Project Name 3',
        description: 'A third amazing project that showcases your skills and creativity.',
        technologies: ['Vue.js', 'Firebase', 'Tailwind'],
        image: '/images/project3.jpg',
        github: 'https://github.com/alextgu/project3',
        demo: 'https://project3-demo.com',
      },
    ]
  
    return (
      <section id="projects" className="min-h-screen py-20">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Projects</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-12">
          A collection of things I've built
        </p>
  
        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Project Image Placeholder */}
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center">
                <span className="text-gray-400 dark:text-gray-500">Project Image</span>
              </div>
  
              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {project.description}
                </p>
  
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
  
                {/* Links */}
                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    GitHub →
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Live Demo →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }
  
  export default Projects