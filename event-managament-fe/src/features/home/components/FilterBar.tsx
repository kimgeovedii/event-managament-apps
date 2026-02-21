"use client";

import React, { useEffect, useState } from "react";
import { useFilterBar } from "../hooks";
import apiFetch from "@/services/apiFetch";
import * as OutlineIcons from "@heroicons/react/24/outline";
import * as SolidIcons from "@heroicons/react/24/solid";

interface Category {
  id: string;
  name: string;
  icon?: string | null;
  color?: string | null;
}

interface Category {
  id: string;
  name: string;
  icon?: string | null;
  color?: string | null;
}

const DynamicHeroIcon: React.FC<{
  icon?: string | null;
  className?: string;
}> = ({ icon, className = "w-4 h-4" }) => {
  if (!icon) {
    return <OutlineIcons.Squares2X2Icon className={className} />;
  }

  let componentName = icon;
  if (!componentName.endsWith("Icon")) {
    componentName =
      icon
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join("") + "Icon";
  }

  const IconComponent =
    OutlineIcons[componentName as keyof typeof OutlineIcons] ||
    OutlineIcons.Squares2X2Icon;

  return <IconComponent className={className} />;
};

const ChevronIcon = () => <OutlineIcons.ChevronDownIcon className="w-4 h-4" />;

const XIcon = () => <OutlineIcons.XMarkIcon className="w-3.5 h-3.5" />;

const MapIcon = () => <SolidIcons.MapPinIcon className="w-3.5 h-3.5" />;

const LOCATIONS = [
  "Jakarta",
  "Surabaya",
  "Bandung",
  "Medan",
  "Semarang",
  "Makassar",
  "Yogyakarta",
  "Bali",
  "Palembang",
  "Tangerang",
];

const FilterBar: React.FC = () => {
  const {
    activeCategory,
    activeLocation,
    setCategory,
    setLocation,
    clearFilters,
  } = useFilterBar();

  const [categories, setCategories] = useState<Category[]>([]);
  const [locationOpen, setLocationOpen] = useState(false);
  const [loadingCats, setLoadingCats] = useState(true);

  useEffect(() => {
    apiFetch
      .get("/tickets/categories")
      .then((res) => {
        setCategories(res.data?.data ?? []);
      })
      .catch(() => setCategories([]))
      .finally(() => setLoadingCats(false));
  }, []);

  const hasActiveFilters = activeCategory !== "all" || activeLocation !== "";

  return (
    <section className="sticky top-[57px] md:top-[73px] z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-[#333] py-3 md:py-4 px-4 md:px-6 lg:px-10">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-6">
        {/* Category Buttons */}
        <div className="flex items-center gap-2 md:gap-3 overflow-x-auto pb-1 md:pb-0 w-full md:w-auto no-scrollbar scroll-smooth">
          {/* All Button */}
          <button
            onClick={() => setCategory("all")}
            className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-2 md:py-2.5 text-[10px] md:text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all border-2 ${
              activeCategory === "all"
                ? "bg-[#ee2b8c] dark:bg-[#FF00FF] text-white dark:text-black border-[#d61f7a] dark:border-black shadow-[3px_3px_0px_0px_#d61f7a] dark:shadow-[3px_3px_0px_0px_#fff]"
                : "bg-gray-100 dark:bg-[#111] text-gray-700 dark:text-white border-gray-300 dark:border-[#333] hover:border-[#ee2b8c] dark:hover:border-[#FF00FF] hover:text-[#ee2b8c] dark:hover:text-[#FF00FF] shadow-[2px_2px_0px_0px_#e5e5e5] dark:shadow-[2px_2px_0px_0px_#333]"
            }`}
          >
            <OutlineIcons.GlobeAltIcon className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span>All</span>
          </button>

          {/* Dynamic category buttons */}
          {loadingCats
            ? [1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-9 md:h-10 w-24 bg-gray-200 dark:bg-[#222] animate-pulse rounded-sm"
                />
              ))
            : categories.map((x) => {
                const isActive = activeCategory === x.id;

                let iconColorClass = "opacity-70";
                if (!isActive && x.color) {
                  switch (x.color) {
                    case "pink":
                      iconColorClass = "text-[#ee2b8c] dark:text-[#FF00FF]";
                      break;
                    case "cyan":
                      iconColorClass = "text-[#00bcd4] dark:text-[#00FFFF]";
                      break;
                    case "purple":
                      iconColorClass = "text-[#9c27b0] dark:text-[#B026FF]";
                      break;
                    case "green":
                      iconColorClass = "text-green-500 dark:text-green-400";
                      break;
                    case "lime":
                      iconColorClass = "text-lime-500 dark:text-[#CCFF00]";
                      break;
                  }
                } else if (isActive) {
                  iconColorClass = "";
                }

                return (
                  <button
                    key={x.id}
                    onClick={() => setCategory(x.id)}
                    className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-2 md:py-2.5 text-[10px] md:text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all border-2 ${
                      isActive
                        ? "bg-[#ee2b8c] dark:bg-[#FF00FF] text-white dark:text-black border-[#d61f7a] dark:border-black shadow-[3px_3px_0px_0px_#d61f7a] dark:shadow-[3px_3px_0px_0px_#fff] -rotate-1"
                        : "bg-gray-100 dark:bg-[#111] text-gray-700 dark:text-white border-gray-300 dark:border-[#333] hover:border-[#ee2b8c] dark:hover:border-[#FF00FF] hover:text-[#ee2b8c] dark:hover:text-[#FF00FF] shadow-[2px_2px_0px_0px_#e5e5e5] dark:shadow-[2px_2px_0px_0px_#333]"
                    }`}
                  >
                    <DynamicHeroIcon
                      icon={x.icon}
                      className={`w-3.5 h-3.5 md:w-4 md:h-4 ${iconColorClass}`}
                    />
                    <span className="hidden sm:inline">{x.name}</span>
                  </button>
                );
              })}
        </div>

        {/* Location dropdown + clear button */}
        <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto justify-between md:justify-end shrink-0">
          {/* Location dropdown */}
          <div className="relative">
            <button
              onClick={() => setLocationOpen((v) => !v)}
              className={`flex items-center gap-1.5 px-3 md:px-4 py-2 md:py-2.5 text-xs md:text-sm font-bold uppercase tracking-wide transition-all border-b-2 ${
                activeLocation
                  ? "border-[#ee2b8c] dark:border-[#FF00FF] text-[#ee2b8c] dark:text-[#FF00FF]"
                  : "border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-[#00bcd4] dark:hover:border-[#00FFFF] hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <MapIcon />
              <span>{activeLocation || "Location"}</span>
              <ChevronIcon />
            </button>

            {locationOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-[#111] border-2 border-gray-200 dark:border-[#333] shadow-[4px_4px_0px_0px_#e5e5e5] dark:shadow-[4px_4px_0px_0px_#333] z-50 max-h-60 overflow-y-auto">
                <button
                  onClick={() => {
                    setLocation("");
                    setLocationOpen(false);
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#222] border-b border-gray-100 dark:border-[#222] uppercase tracking-wide"
                >
                  All Locations
                </button>
                {LOCATIONS.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => {
                      setLocation(loc);
                      setLocationOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 text-left text-sm font-bold uppercase tracking-wide transition-colors ${
                      activeLocation === loc
                        ? "bg-[#ee2b8c]/10 dark:bg-[#FF00FF]/10 text-[#ee2b8c] dark:text-[#FF00FF]"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#222]"
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Clear filters button */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 px-2.5 py-1.5 text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-[#444] hover:border-red-400 hover:text-red-500 transition-all"
            >
              <XIcon />
              <span className="hidden sm:inline">Clear</span>
            </button>
          )}
        </div>
      </div>

      {locationOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setLocationOpen(false)}
        />
      )}
    </section>
  );
};

export default FilterBar;
