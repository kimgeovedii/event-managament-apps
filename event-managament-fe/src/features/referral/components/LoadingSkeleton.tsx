import React from "react";

// Loading Spinner
export const LoadingSpinner = () => (
  <div className="flex justify-center py-4">
    <div className="w-6 h-6 border-2 border-gray-300 dark:border-zinc-600 border-t-[#ee2b8c] dark:border-t-[#FF00FF] rounded-full animate-spin" />
  </div>
);

// Loading Skeleton - Mobile First
export const LoadingSkeleton = () => (
  <div className="animate-pulse space-y-4 md:space-y-10">
    <div className="h-32 md:h-40 bg-zinc-800 rounded" />
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
      <div className="md:col-span-7 space-y-4 md:space-y-8">
        <div className="h-[240px] md:h-[360px] bg-zinc-800 rounded" />
        <div className="h-[200px] md:h-[300px] bg-zinc-800 rounded" />
      </div>
      <div className="md:col-span-5 space-y-4 md:space-y-8">
        <div className="h-[200px] md:h-[300px] bg-zinc-800 rounded" />
        <div className="h-[150px] md:h-[200px] bg-zinc-800 rounded" />
      </div>
    </div>
  </div>
);
