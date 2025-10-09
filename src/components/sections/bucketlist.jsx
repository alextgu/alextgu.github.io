import React from 'react';
import './bucket-list.css';

const bucketListData = [
  {
    id: 1,
    title: 'Throw the first pitch at an MLB game ⚾',
    description: 'Preferrably a Blue Jays v Yankees Game',
    rules: 'Must throw the pitch in an official MLB stadium in front of a live audience.',
    status: 'Not Yet',
  },
  {
    id: 2,
    title: 'Blah Blah',
    description: 'Blah Blah.',
    rules: 'Complete all necessary steps outlined in the plan.',
    status: 'Not Yet',
  },
  {
    id: 3,
    title: 'Create a film',
    description: 'Write, direct, and produce a complete short film from start to finish.',
    rules: 'Film must be fully edited and published or submitted to a festival.',
    status: 'Not Yet',
  },
  // Add more bucket list items here
];

function BucketList() {
  return (
    <section className="min-h-screen pt-20 md:pt-24 lg:pt-32 xl:pt-[7.7rem] px-4 sm:px-6 md:px-20 lg:px-20">
      {/* Header Section */}
      <div className="max-w-4xl mb-16">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-normal mb-3">
          Bucket List
        </h1>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-light mt-4 leading-relaxed whitespace-pre-line">
          Dreams, goals, and experiences I want to achieve in my lifetime.<br />
          I think writing them here will encourage me to actually try to complete them.
        </p>
      </div>

      {/* Bucket List Items */}
      <div className="max-w-6xl space-y-8">
        {bucketListData.map((item) => (
          <div
            key={item.id}
            id={`bucket-${item.id}`} // unique ID for future sorting/filtering
            data-title={item.title}
            data-status={item.status}
            className="border-t border-gray-200 dark:border-gray-800 pt-8"
          >
            <h2 className="text-2xl sm:text-3xl font-normal text-gray-900 dark:text-white mb-3">
              {item.title}
            </h2>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-2 leading-relaxed">
              {item.description}
            </p>

            {/* Rules Section */}
            {item.rules && (
              <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 mb-4 italic">
                ⚡ Rules: {item.rules}
              </p>
            )}

            {/* Status Badge */}
            <div className="flex gap-4 items-center">
              <span
                className={`text-sm px-3 py-1 rounded-full ${
                  item.status === 'In Progress'
                    ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BucketList;
