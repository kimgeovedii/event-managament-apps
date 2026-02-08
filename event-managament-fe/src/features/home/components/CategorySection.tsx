"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { mockCategories } from "@/data";

const ArrowIcon = () => (
  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
  </svg>
);

const NorthEastIcon = () => (
  <svg className="w-8 h-8 md:w-12 md:h-12" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5z"/>
  </svg>
);

const colorClasses = {
  purple: {
    badge: "bg-[#9c27b0] dark:bg-[#B026FF] text-white",
    hover: "group-hover:text-[#9c27b0] dark:group-hover:text-[#B026FF]",
  },
  cyan: {
    badge: "bg-[#00bcd4] dark:bg-[#00FFFF] text-white dark:text-black",
    hover: "group-hover:text-[#00bcd4] dark:group-hover:text-[#00FFFF]",
  },
  pink: {
    badge: "bg-[#ee2b8c] dark:bg-[#FF00FF] text-white dark:text-black",
    hover: "group-hover:text-[#ee2b8c] dark:group-hover:text-[#FF00FF]",
  },
  lime: {
    badge: "bg-lime-500 dark:bg-[#CCFF00] text-white dark:text-black",
    hover: "group-hover:text-lime-500 dark:group-hover:text-[#CCFF00]",
  },
};

const CategorySection: React.FC = () => {
  const categories = mockCategories.data;

  return (
    <section className="py-10 md:py-16 px-4 md:px-6 lg:px-10 max-w-[1400px] mx-auto w-full">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-6 md:mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-black uppercase text-gray-900 dark:text-white leading-none">
          Trending <br className="md:block" /> <span className="text-[#00bcd4] dark:text-[#00FFFF]">Categories</span>
        </h2>
        <Link
          href="/categories"
          className="hidden md:flex items-center gap-2 text-[#ee2b8c] dark:text-[#FF00FF] font-bold uppercase tracking-wider hover:text-gray-900 dark:hover:text-white transition-colors group text-sm"
        >
          View All{" "}
          <span className="group-hover:translate-x-1 transition-transform">
            <ArrowIcon />
          </span>
        </Link>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 h-auto lg:h-[400px]">
        {/* First category - larger on desktop */}
        {categories[0] && (
          <div className="col-span-2 lg:col-span-2 lg:row-span-1 relative group overflow-hidden rounded-lg md:rounded-xl border border-gray-200 dark:border-white/10 cursor-pointer h-[180px] md:h-auto shadow-sm dark:shadow-none">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-70 dark:opacity-90"></div>
            <Image
              alt={categories[0].name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              src={categories[0].image}
              fill
            />
            <div className="absolute bottom-0 left-0 p-4 md:p-8 z-20">
              <span
                className={`inline-block px-2 md:px-3 py-1 mb-2 md:mb-3 text-[10px] md:text-xs font-black uppercase tracking-wider transform -rotate-2 ${colorClasses[categories[0].color].badge}`}
              >
                {categories[0].badge}
              </span>
              <h3 className={`text-xl md:text-4xl font-display font-black uppercase text-white ${colorClasses[categories[0].color].hover} transition-colors`}>
                {categories[0].name}
              </h3>
            </div>
            <div className="absolute top-3 right-3 md:top-4 md:right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-white drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                <NorthEastIcon />
              </span>
            </div>
          </div>
        )}

        {/* Other categories */}
        {categories.slice(1).map((category) => (
          <div
            key={category.id}
            className="relative group overflow-hidden rounded-lg md:rounded-xl border border-gray-200 dark:border-white/10 cursor-pointer h-[140px] md:min-h-[200px] shadow-sm dark:shadow-none"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-70 dark:opacity-90"></div>
            <Image
              alt={category.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              src={category.image}
              fill
            />
            <div className="absolute bottom-0 left-0 p-3 md:p-6 z-20">
              <span
                className={`inline-block px-2 py-0.5 md:px-3 md:py-1 mb-1 md:mb-2 text-[9px] md:text-xs font-black uppercase tracking-wider transform rotate-1 ${colorClasses[category.color].badge}`}
              >
                {category.badge}
              </span>
              <h3 className={`text-base md:text-2xl font-display font-black uppercase text-white ${colorClasses[category.color].hover} transition-colors`}>
                {category.name}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View All Link */}
      <Link
        href="/categories"
        className="md:hidden flex items-center justify-center gap-2 mt-4 text-[#ee2b8c] dark:text-[#FF00FF] font-bold uppercase tracking-wider text-sm"
      >
        View All Categories <ArrowIcon />
      </Link>
    </section>
  );
};

export default CategorySection;
