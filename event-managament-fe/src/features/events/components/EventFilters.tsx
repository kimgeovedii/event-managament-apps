"use client";

import React from "react";
import { 
  AdjustmentsHorizontalIcon, 
  MagnifyingGlassIcon, 
  CalendarDaysIcon 
} from "@heroicons/react/24/outline";
import { 
  useSearchParams, 
  useRouter, 
  usePathname 
} from "next/navigation";
import { useCategories } from "../hooks/useCategories";

const EventFilters: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { categories, isLoading } = useCategories();

  const [searchValue, setSearchValue] = React.useState(searchParams.get("search") || "");
  const currentCategoryId = searchParams.get("categoryId") || "";

  // Debounce search effect
  React.useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (searchValue) {
        params.set("search", searchValue);
      } else {
        params.delete("search");
      }
      params.delete("page");
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [searchValue, pathname, router]); // searchParams removed from deps to prevent infinite loop

  const updateFilters = (key: string, value: string | undefined) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleReset = () => {
    setSearchValue("");
    router.push(pathname, { scroll: false });
  };

  return (
    <aside className="w-full lg:w-80 flex-shrink-0 space-y-6 lg:space-y-8 sticky lg:top-32 h-fit">
      <div className="p-5 md:p-6 bg-surface border-2 border-gray-200 dark:border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.05)] md:dark:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.5)] transition-colors duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-xl uppercase tracking-wider flex items-center gap-2">
            <AdjustmentsHorizontalIcon className="size-6 text-neon-cyan" strokeWidth={2} />
            Filters
          </h2>
          <button 
            onClick={handleReset}
            className="text-[10px] font-bold uppercase text-gray-500 hover:text-neon-pink underline tracking-widest transition-colors"
          >
            Reset All
          </button>
        </div>

        {/* Search */}
        <div className="space-y-4 mb-8">
          <label className="block text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">Search</label>
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 size-5" strokeWidth={2.5} />
            <input
              className="w-full bg-gray-50 dark:bg-black/50 border-2 border-gray-200 dark:border-white/10 focus:border-neon-cyan focus:ring-0 pl-10 pr-4 py-3 text-sm font-bold placeholder:text-gray-400 dark:placeholder:text-gray-700 uppercase tracking-wide text-foreground transition-colors"
              placeholder="DJ, Workshop, etc..."
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-4 mb-8">
          <label className="block text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">Categories</label>
          <div className="space-y-3">
            {isLoading ? (
              <div className="animate-pulse space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-4 bg-gray-200 dark:bg-gray-800 w-3/4"></div>
                ))}
              </div>
            ) : (
              categories.map((cat) => (
                <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    className="w-5 h-5 bg-gray-50 dark:bg-black border-2 border-gray-200 dark:border-white/20 checked:bg-neon-pink checked:border-neon-pink focus:ring-0 rounded-none transition-all cursor-pointer"
                    type="radio" // Changed to radio for now as useInfiniteEvents handles single categoryId
                    name="category"
                    checked={currentCategoryId === cat.id}
                    onChange={() => updateFilters("categoryId", cat.id)}
                  />
                  <span className={`text-sm font-bold uppercase tracking-wide transition-colors ${
                    currentCategoryId === cat.id ? "text-neon-pink" : "text-gray-600 dark:text-gray-300 group-hover:text-neon-pink"
                  }`}>
                    {cat.name}
                  </span>
                </label>
              ))
            )}
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center">
            <label className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">Price Range (IDR)</label>
            <span className="text-[10px] font-bold text-neon-cyan">0 - 2M+</span>
          </div>
          <input
            className="w-full h-1 bg-gray-200 dark:bg-gray-800 appearance-none cursor-pointer accent-neon-cyan"
            max="2000000"
            min="0"
            type="range"
          />
          <div className="flex justify-between text-[10px] font-mono text-gray-400 dark:text-gray-600">
            <span>0</span>
            <span>1M</span>
            <span>2M+</span>
          </div>
        </div>

        {/* When */}
        <div className="space-y-4">
          <label className="block text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">When</label>
          <div className="relative">
            <CalendarDaysIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 size-6" strokeWidth={2} />
            <input
              className="w-full bg-gray-50 dark:bg-black/50 border-2 border-gray-200 dark:border-white/10 focus:border-neon-purple focus:ring-0 pl-10 pr-4 py-3 text-sm font-bold uppercase text-foreground tracking-wide [color-scheme:light] dark:[color-scheme:dark] transition-colors"
              type="date"
            />
          </div>
        </div>
      </div>

      {/* Refer Card */}
      <div className="p-6 bg-gradient-to-br from-neon-purple/20 to-gray-50 dark:to-black border-2 border-neon-purple/50 relative overflow-hidden group transition-colors">
        <div className="absolute -top-6 -right-6 w-20 h-20 bg-neon-purple blur-3xl opacity-50"></div>
        <h3 className="font-display font-black text-lg uppercase leading-tight mb-2 text-foreground">Want 10k points?</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Refer a friend and both get 10% off your next vibe.</p>
        <button className="w-full py-2 bg-foreground text-background dark:bg-white dark:text-black text-[10px] font-black uppercase tracking-widest hover:bg-neon-purple dark:hover:bg-neon-purple hover:text-white dark:hover:text-white transition-all">
          Refer Now
        </button>
      </div>
    </aside>
  );
};

export default EventFilters;
