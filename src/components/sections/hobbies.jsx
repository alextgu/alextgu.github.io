import { useState } from 'react'

function Hobbies() {
  const [sortBy, setSortBy] = useState('default')

  const hobbies = [
    {
      id: 1,
      title: 'Photography',
      category: 'creative',
      description: 'Capturing moments and telling stories through images.',
      startedYear: 2020,
      emoji: '📸',
    },
    {
      id: 2,
      title: 'Rock Climbing',
      category: 'sports',
      description: 'Pushing my limits both physically and mentally.',
      startedYear: 2019,
      emoji: '🧗',
    },
    {
      id: 3,
      title: 'Cooking',
      category: 'creative',
      description: 'Experimenting with new recipes and cuisines.',
      startedYear: 2021,
      emoji: '🍳',
    },
    {
      id: 4,
      title: 'Gaming',
      category: 'entertainment',
      description: 'Strategy games and storytelling adventures.',
      startedYear: 2015,
      emoji: '🎮',
    },
    {
      id: 5,
      title: 'Reading',
      category: 'learning',
      description: 'Sci-fi, fantasy, and non-fiction about technology.',
      startedYear: 2018,
      emoji: '📚',
    },
    {
      id: 6,
      title: 'Hiking',
      category: 'sports',
      description: 'Exploring nature trails and enjoying the outdoors.',
      startedYear: 2020,
      emoji: '🥾',
    },
  ]

  // Sort hobbies based on selected option
  const getSortedHobbies = () => {
    const hobbiesCopy = [...hobbies]

    switch (sortBy) {
      case 'category':
        return hobbiesCopy.sort((a, b) => a.category.localeCompare(b.category))
      case 'year':
        return hobbiesCopy.sort((a, b) => b.startedYear - a.startedYear)
      case 'alphabetical':
        return hobbiesCopy.sort((a, b) => a.title.localeCompare(b.title))
      default:
        return hobbiesCopy
    }
  }

  const sortedHobbies = getSortedHobbies()

  return (
    <section id="hobbies" className="min-h-screen py-20">
      {/* Header with Sort Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
        <div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Hobbies</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Things I love doing in my free time
          </p>
        </div>

        {/* Sort Buttons */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setSortBy('default')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              sortBy === 'default'
                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Default
          </button>
          <button
            onClick={() => setSortBy('category')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              sortBy === 'category'
                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Category
          </button>
          <button
            onClick={() => setSortBy('year')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              sortBy === 'year'
                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Year
          </button>
          <button
            onClick={() => setSortBy('alphabetical')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              sortBy === 'alphabetical'
                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            A-Z
          </button>
        </div>
      </div>

      {/* Hobbies Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedHobbies.map((hobby) => (
          <div
            key={hobby.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* Emoji Icon */}
            <div className="text-4xl mb-4">{hobby.emoji}</div>

            {/* Category and Year */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                {hobby.category}
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                Since {hobby.startedYear}
              </span>
            </div>

            {/* Title and Description */}
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {hobby.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {hobby.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Hobbies