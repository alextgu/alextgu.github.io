import React, { useState } from "react";
import "./bucket-list.css";

const bucketListData = [
  {
    id: 1,
    title: "Throw the first pitch at an MLB game ⚾",
    description: "Preferably a Blue Jays vs Yankees Game.",
    rules: "Must throw the pitch in an official MLB stadium in front of a live audience with my name announced.",
    status: "Not Yet",
    image: "/images/mlb_pitch.jpg",
  },
  {
    id: 2,
    title: "Meet 3½ Asians 🍚",
    description: "Roy Yuan, Ryan Higa, Shohei Ohtani and Bryan Woo",
    rules: "Tell them each a joke and take a picture",
    status: "Not Yet",
    image: "asians.png",
  },
  {
    id: 3,
    title: "Create a film 🎬",
    description:
      "Write, direct, and produce a complete short film from start to finish.",
    rules: "Film must be fully edited and published or submitted to a festival.",
    status: "Not Yet",
    image: "/images/film.jpg",
  },
  {
    id: 4,
    title: "Dunk a basketball 🏀",
    description:
      "I am a 5 foot 8 asian with an average wingspan. I can barely spike a volleyball.",
    rules: "Dunk on regulation hoop with solid ground and no accessories (no trampolines, jetpacks etc)",
    status: "Not Yet",
    image: "/images/film.jpg",
  },
];

export default function BucketList() {
  const [selected, setSelected] = useState(null);

  const handleOpen = (item) => setSelected(item);
  const handleClose = () => setSelected(null);

  return (
    <section className="min-h-screen pt-20 md:pt-24 lg:pt-32 xl:pt-[7.7rem] px-4 sm:px-6 md:px-20 lg:px-20 relative">
      {/* Header Section */}
      <div className="max-w-4xl mb-16">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-normal mb-3">
          Bucket List
        </h1>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-light mt-4 leading-relaxed whitespace-pre-line">
          Dreams, goals, and experiences I want to achieve in my lifetime.<br />
          Writing them here helps keep me accountable.
        </p>
      </div>

      {/* Bucket List Items as Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {bucketListData.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 cursor-pointer overflow-hidden"
            onClick={() => handleOpen(item)}
          >
            {/* Image */}
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
            )}

            {/* Content */}
            <div className="p-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h2>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-2">
                {item.description}
              </p>
              {item.rules && (
                <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 mb-3 italic">
                  ⚡ Rules: {item.rules}
                </p>
              )}

              <span
                className={`inline-block text-sm px-3 py-1 rounded-full mt-3 ${
                  item.status === "In Progress"
                    ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                }`}
              >
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Popout Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={handleClose}
        >
          <div
            className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-2xl max-w-lg w-full shadow-xl p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-lg"
            >
              ✕
            </button>

            {/* Image */}
            {selected.image && (
              <img
                src={selected.image}
                alt={selected.title}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
            )}

            {/* Content */}
            <h3 className="text-2xl font-semibold mb-2">{selected.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {selected.description}
            </p>
            {selected.rules && (
              <p className="text-sm text-gray-500 dark:text-gray-500 mb-4 italic">
                ⚡ {selected.rules}
              </p>
            )}
            <span
              className={`inline-block text-sm px-3 py-1 rounded-full ${
                selected.status === "In Progress"
                  ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              }`}
            >
              {selected.status}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
