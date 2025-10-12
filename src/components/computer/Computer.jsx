// Computer.jsx
import React, { useState } from "react";
import Work from "./apps/Work";
import Website from "./apps/Website";
import Contact from "./apps/Contact";

function Computer() {
  const [open, setOpen] = useState(false);
  const [activeApp, setActiveApp] = useState(null);

  const apps = [
    { name: "Work", component: <Work /> },
    { name: "Website", component: <Website /> },
    { name: "Contact", component: <Contact /> },
  ];

  return (
    <>
      {/* Small computer on home page */}
      {!open && (
        <div
          className="w-64 h-48 bg-gray-900 rounded-xl shadow-xl cursor-pointer flex items-center justify-center"
          onClick={() => setOpen(true)}
        >
          <p className="text-white font-bold">Click to open the "computer"</p>
        </div>
      )}

      {/* Fullscreen overlay */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex flex-col items-center justify-center p-4">
          {/* Computer screen container */}
          <div className="bg-gray-100 dark:bg-gray-900 w-full max-w-5xl h-full max-h-[90vh] rounded-xl shadow-2xl p-6 overflow-auto relative">
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-black dark:text-white font-bold text-xl"
              onClick={() => setOpen(false)}
            >
              X
            </button>

            {/* App buttons */}
            <div className="flex space-x-4 mb-6">
              {apps.map((app) => (
                <button
                  key={app.name}
                  className={`px-4 py-2 rounded-md font-semibold ${
                    activeApp === app.name
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
                  }`}
                  onClick={() => setActiveApp(app.name)}
                >
                  {app.name}
                </button>
              ))}
            </div>

            {/* Render active app */}
            <div className="mt-4 w-full">{apps.find((a) => a.name === activeApp)?.component}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default Computer;
