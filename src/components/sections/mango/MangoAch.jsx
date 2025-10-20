import React from 'react';
import { X } from 'lucide-react';
import { useMango } from '@/context/MangoContext';

export default function MangoAchievements({ onClose }) {
  const { collected = [] } = useMango() || [];

  // Example achievements data
  const achievements = [
    { id: 'intro', title: 'First Bite', description: 'Find your first hidden mango!', icon: '/mango1.png', difficulty: 'easy' },
    { id: 'explorer', title: 'Explorer', description: 'Discover 3 mangoes across the site.', icon: '/mango2.png', difficulty: 'medium' },
    { id: 'collector', title: 'Collector', description: 'Collect all available mangoes!', icon: '/mango3.png', difficulty: 'hard' },
    { id: 'hidden-paths', title: 'Hidden Paths', description: 'Find mangoes in secret sections.', icon: '/mango4.png', difficulty: 'medium' },
    { id: 'dedicated', title: 'Dedicated Seeker', description: 'Return to check achievements multiple times.', icon: '/mango5.png', difficulty: 'easy' },
    { id: 'master', title: 'Mango Master', description: 'Achieve 100% mango completion.', icon: '/mango6.png', difficulty: 'hard' },
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-300/70 dark:border-zinc-700/70 w-[90%] max-w-5xl p-8 max-h-[85vh] flex flex-col">
        
        {/* Header + Mango Counter */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl md:text-3xl font-semibold text-yellow-600 dark:text-yellow-400">
            🥭 Mango Achievements
          </h1>
          <div className="text-sm md:text-base font-medium text-zinc-700 dark:text-zinc-200">
            Collected: {collected.length} / {achievements.length}
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition ml-4"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
          Find hidden mangoes across the site to unlock achievements!
        </p>

        {/* Scrollable achievements */}
        <div className="overflow-y-auto pr-2 custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
            {achievements.map((ach) => {
              const unlocked = collected.includes(ach.id);
              const difficultyColor = getDifficultyColor(ach.difficulty);

              return (
                <div
                  key={ach.id}
                  className={`rounded-xl border p-5 transition-all flex flex-col items-center text-center ${
                    unlocked ? 'bg-white/60 dark:bg-zinc-800/70 border-zinc-300/70 dark:border-zinc-700/70 shadow-md' : 'opacity-60 grayscale bg-white/30 dark:bg-zinc-800/30 border-zinc-300/30 dark:border-zinc-700/30'
                  }`}
                >
                  <img
                    src={ach.icon}
                    alt={ach.title}
                    className="w-16 h-16 object-contain mb-3"
                  />
                  <h2 className="text-lg font-semibold text-zinc-700 dark:text-zinc-100 mb-1">
                    {ach.title}
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
                    {ach.description}
                  </p>

                  {/* Difficulty Bar */}
                  <div className="w-full">
                    <div className="flex justify-between text-xs mb-1 text-zinc-500 dark:text-zinc-400">
                      <span>Difficulty</span>
                      <span className="capitalize">{ach.difficulty}</span>
                    </div>
                    <div className="w-full h-2 bg-zinc-300/50 dark:bg-zinc-700/50 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${difficultyColor} ${unlocked ? 'opacity-100' : 'opacity-50'}`}
                        style={{
                          width:
                            ach.difficulty === 'easy'
                              ? '33%'
                              : ach.difficulty === 'medium'
                              ? '66%'
                              : '100%',
                        }}
                      ></div>
                    </div>
                  </div>

                  {unlocked && (
                    <div className="mt-3 text-xs bg-green-600/20 border border-green-600/40 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-md">
                      Unlocked
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
