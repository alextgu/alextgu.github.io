function Home() {
  return (
    <section id="home" className="min-h-screen pt-20 md:pt-24">
      <div className="grid md:grid-cols-2 gap-12 items-start w-full">
        {/* Left: Text Content */}
        <div className="space-y-12 pl-12 md:pl-20 lg:pl-20">
          <h1 className="text-3xl sm:text-4xl lg:text-[32px] font-normal text-gray-400 dark:text-zinc-500 leading-loose">
          Hi, I'm <span className="text-gray-900 dark:text-white">Alex</span> 👋 Welcome to my personal website! I'm currently helping organize the first <span className="text-gray-900 dark:text-white">Chinese Canadian Film Festival.</span>
        </h1>
        <p className="text-3xl sm:text-4xl lg:text-[32px] font-normal text-gray-400 dark:text-zinc-500 leading-loose">
        I love playing <span className="text-gray-900 dark:text-white">sports,</span> exploring <span className="text-gray-900 dark:text-white"> films,</span> <span className="text-gray-900 dark:text-white">mango pudding</span> and building stupid projects. One day, I will <span className="text-gray-900 dark:text-white">throw out the first pitch</span> at an MLB game.
        </p>
        <p className="text-3xl sm:text-4xl lg:text-[32px] font-normal text-gray-400 dark:text-zinc-500 leading-relaxed">
        This site will tell you a bit about me. To learn more, please <span className="text-gray-900 dark:text-white">contact me!</span> 
        </p>
          {/* Work Section */}
          <div className="space-y-0.5">
            <h2 className="text-lg font-normal text-gray-900 dark:text-white">Work</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg leading-loose">
              What you do professionally... nothing
            </p>
          </div>

          {/* Contact Section */}
          <div className="space-y-0.5">
            <h2 className="text-lg font-normal text-gray-900 dark:text-white">Contact</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed">
              your.email@example.com
            </p>
          </div>

          {/* Website Description */}
          <div className="space-y-0.5">
            <h2 className="text-lg font-normal text-gray-900 dark:text-white">This Site</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed">
              A collection of my work, hobbies, and dreams...
            </p>
          </div>
        </div>

        {/* Right: 3D Animation Placeholder */}
        <div className="h-96 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 rounded-lg flex items-center justify-center border border-gray-200 dark:border-gray-700">
          <p className="text-gray-400 dark:text-gray-500">3D Animation Goes Here</p>
        </div>
      </div>
    </section>
  )
}

export default Home