function Home() {
    return (

      <section id="home" className="min-h-screen flex items-center">
        <div className="grid md:grid-cols-2 gap-12 items-center w-full">
          {/* Left: Text Content */}
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
              Hi, I'm Alex 👋
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              This website is being built...
            </p>
            
            {/* Work Section */}
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Work</h2>
              <p className="text-gray-600 dark:text-gray-300">
                What you do professionally... nothing
              </p>
            </div>
            
            {/* Contact Section */}
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Contact</h2>
              <p className="text-gray-600 dark:text-gray-300">
                your.email@example.com
              </p>
            </div>
            
            {/* Website Description */}
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">This Site</h2>
              <p className="text-gray-600 dark:text-gray-300">
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