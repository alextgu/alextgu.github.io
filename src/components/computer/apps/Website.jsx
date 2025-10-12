import React from "react";

export default function Work() {
  // Calculate website age in days and years
  const firstLaunch = new Date("2025-10-02"); // replace with actual launch date
  const today = new Date();
  const diffTime = today - firstLaunch; // milliseconds
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // total days

  const years = Math.floor(diffDays / 365); // full years
  const days = diffDays % 365; // remaining days

  // Format string: years first, days second
  const websiteAge = years > 0
    ? `${years} year${years !== 1 ? "s" : ""}${days > 0 ? ` and ${days} day${days !== 1 ? "s" : ""}` : ""}`
    : `${days} day${days !== 1 ? "s" : ""}`;

  return (
    <div className="p-4 space-y-8">
      <div className="space-y-0.5">
        <h2 className="text-[34px] font-normal text-gray-900 dark:text-white">This Site</h2>
        <div className="h-[3px] w-48 bg-gray-700 dark:bg-white mt-2 mb-4"></div>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          The first draft of this website is not made yet, but this website is technically{" "}
          <span className="font-medium text-gray-900 dark:text-white">{websiteAge}</span> old.
        </p>
        <p>
          Inspired heavily by{" "}
          <a
            href="https://chester.how/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            chester.how
          </a>
        </p>
      </div>
    </div>
  );
}
