"use client";

import React from "react";

const marqueeItems = [
  { text: "Exclusive Deals", isStroke: true },
  { text: "Join The Club", color: "pink" },
  { text: "Get Rewarded", isStroke: true },
  { text: "10k Points Bonus", color: "cyan" },
];

const MarqueeSection: React.FC = () => {
  // Duplicate items for seamless loop
  const allItems = [...marqueeItems, ...marqueeItems];

  return (
    <section className="py-8 md:py-12 bg-gray-100 dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-[#222] overflow-hidden">
      <div className="marquee-container w-full">
        <div className="marquee-content whitespace-nowrap">
          {allItems.map((item, index) => (
            <span
              key={index}
              className={`mx-4 md:mx-6 text-xl md:text-2xl font-display font-black uppercase ${
                item.isStroke
                  ? "text-transparent [-webkit-text-stroke:1px_currentColor] stroke-gray-400 dark:stroke-current dark:text-white"
                  : item.color === "pink"
                  ? "text-[#ee2b8c] dark:text-[#FF00FF]"
                  : "text-[#00bcd4] dark:text-[#00FFFF]"
              }`}
            >
              {item.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;
