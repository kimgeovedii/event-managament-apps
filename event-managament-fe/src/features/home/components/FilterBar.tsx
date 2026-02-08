"use client";

import React from "react";
import { filterCategories } from "@/data";
import { useFilterBar } from "../hooks";

// Icon mapping using inline SVGs
const IconMap: Record<string, React.FC<{ className?: string }>> = {
  grid_view: ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M3 3v8h8V3H3zm6 6H5V5h4v4zm-6 4v8h8v-8H3zm6 6H5v-4h4v4zm4-16v8h8V3h-8zm6 6h-4V5h4v4zm-6 4v8h8v-8h-8zm6 6h-4v-4h4v4z"/>
    </svg>
  ),
  music_note: ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
    </svg>
  ),
  nightlife: ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M1 5h14l-6 9v4h2v2H5v-2h2v-4L1 5zm9.1 4l1.4-2H4.49l1.4 2h4.21zM17 5h5v3h-3v9c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3c.35 0 .69.06 1 .17V5z"/>
    </svg>
  ),
  palette: ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10c1.38 0 2.5-1.12 2.5-2.5 0-.61-.23-1.2-.64-1.67-.08-.1-.13-.21-.13-.33 0-.28.22-.5.5-.5H16c3.31 0 6-2.69 6-6 0-4.96-4.49-9-10-9zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 8 6.5 8 8 8.67 8 9.5 7.33 11 6.5 11zm3-4C8.67 7 8 6.33 8 5.5S8.67 4 9.5 4s1.5.67 1.5 1.5S10.33 7 9.5 7zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 4 14.5 4s1.5.67 1.5 1.5S15.33 7 14.5 7zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 8 17.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
    </svg>
  ),
  restaurant: ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/>
    </svg>
  ),
  expand_more: ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"/>
    </svg>
  ),
};

const colorClasses = {
  pink: "text-[#ee2b8c] dark:text-[#FF00FF]",
  cyan: "text-[#00bcd4] dark:text-[#00FFFF]",
  purple: "text-[#9c27b0] dark:text-[#B026FF]",
  lime: "text-lime-600 dark:text-[#CCFF00]",
  yellow: "text-yellow-600 dark:text-yellow-400",
};

const FilterBar: React.FC = () => {
  const { activeFilter, setActiveFilter } = useFilterBar("all");

  return (
    <section className="sticky top-[57px] md:top-[73px] z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-[#333] py-3 md:py-4 px-4 md:px-6 lg:px-10">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-6">
        {/* Category Buttons */}
        <div className="flex items-center gap-2 md:gap-4 overflow-x-auto pb-1 md:pb-0 w-full md:w-auto no-scrollbar scroll-smooth">
          {filterCategories.map((cat) => {
            const isActive = activeFilter === cat.id;
            const Icon = IconMap[cat.icon];
            
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-6 py-2 md:py-3 rounded-none text-[10px] md:text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-[#ee2b8c] dark:bg-[#FF00FF] text-white dark:text-black shadow-[2px_2px_0px_0px_#d61f7a] dark:shadow-[2px_2px_0px_0px_#fff] md:shadow-[4px_4px_0px_0px_#d61f7a] dark:md:shadow-[4px_4px_0px_0px_#fff] border md:border-2 border-[#d61f7a] dark:border-black transform -rotate-1 md:-rotate-2"
                    : "bg-gray-100 dark:bg-[#111] hover:bg-gray-200 dark:hover:bg-[#222] text-gray-700 dark:text-white border md:border-2 border-gray-300 dark:border-[#333] hover:border-[#00bcd4] dark:hover:border-[#00FFFF] shadow-[2px_2px_0px_0px_#e5e5e5] dark:shadow-[2px_2px_0px_0px_#333] md:shadow-[4px_4px_0px_0px_#e5e5e5] dark:md:shadow-[4px_4px_0px_0px_#333]"
                }`}
              >
                {Icon && <Icon className={`w-3.5 h-3.5 md:w-5 md:h-5 ${isActive ? "" : colorClasses[cat.color]}`} />}
                <span className="hidden sm:inline">{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Dropdowns */}
        <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto justify-between md:justify-end">
          <button className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-transparent border-b-2 border-gray-300 dark:border-gray-600 hover:border-[#00bcd4] dark:hover:border-[#00FFFF] text-xs md:text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all uppercase">
            <span>Jakarta</span>
            <IconMap.expand_more className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <button className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-transparent border-b-2 border-gray-300 dark:border-gray-600 hover:border-[#00bcd4] dark:hover:border-[#00FFFF] text-xs md:text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all uppercase">
            <span>$$$ Any</span>
            <IconMap.expand_more className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FilterBar;
