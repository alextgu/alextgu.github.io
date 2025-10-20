// components/Sections/BucketList.jsx
import React, { useState } from "react";
import { bucketListData } from "./data/bucketData";
import { miscAchievementsData } from "./data/miscAchievements";
import { ChevronRight, ChevronDown, Check, Clock, Circle } from "lucide-react";
import "./styles/bucket-list.css";

export default function BucketList() {
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="min-h-screen pt-20 md:pt-24 lg:pt-32 px-4 sm:px-6 md:px-20 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-start gap-8 mb-12">
          <div className="flex-1">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-normal mb-3">
              Bucket List
            </h1>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-light mt-4 leading-relaxed">
              Keeping track of my ambitious and random goals.
              <br />
              Writing them here to keep me accountable.
            </p>
          </div>
        </div>

        {/* BUCKET LIST */}
        <ul className="divide-y divide-gray-200 dark:divide-gray-700 max-w-3xl mx-auto mb-16">
          {bucketListData.map((item) => (
            <li key={item.id} className="py-3 sm:py-5">
              <div
                onClick={() => handleToggle(item.id)}
                className="px-2 sm:px-4 flex items-start justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200 cursor-pointer group rounded-lg"
              >
                <div className="flex items-start gap-3">
                  {/* Status icon */}
                  {item.status === "Completed" ? (
                    <Check
                      size={18}
                      className="mt-0.5 text-blue-600 dark:text-blue-400 flex-shrink-0"
                    />
                  ) : item.status === "In Progress" ? (
                    <Clock
                      size={18}
                      className="mt-0.5 text-green-600 dark:text-green-400 flex-shrink-0"
                    />
                  ) : (
                    <Circle
                      size={16}
                      className="mt-1 text-gray-400 dark:text-gray-500 flex-shrink-0"
                    />
                  )}

                  {/* Title */}
                  <div>
                    <h2 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white group-hover:underline underline-offset-4">
                      {item.title}
                    </h2>
                  </div>
                </div>

                {/* Chevron toggle */}
                {openId === item.id ? (
                  <ChevronDown
                    size={18}
                    className="text-gray-400 dark:text-gray-500 transition-all duration-200"
                  />
                ) : (
                  <ChevronRight
                    size={18}
                    className="text-gray-400 dark:text-gray-500 group-hover:translate-x-1 transition-all duration-200"
                  />
                )}
              </div>

              {/* Dropdown content */}
              {openId === item.id && (
                <div className="mt-3 pl-9 pr-4 sm:pr-6 text-sm text-gray-700 dark:text-gray-300 space-y-4 animate-fade-in-down">
                  <p className="leading-relaxed">{item.description}</p>

                  {/* Optional progress section */}
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Progress Display
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      (Unique progress visuals for this achievement will go here.)
                    </p>
                  </div>

                  {/* Rules / Notes */}
                  {item.rules && (
                    <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        Rules & Notes
                      </h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {item.rules}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>


      </div>
    </section>
  );
}
