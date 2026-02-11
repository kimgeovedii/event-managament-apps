"use client";

import React from "react";
import { ChartDataPoint, ChartFilter } from "../types";

interface SalesChartProps {
  data: ChartDataPoint[];
  filter: ChartFilter;
  onFilterChange: (filter: ChartFilter) => void;
  loading?: boolean;
}

const FILTERS: ChartFilter[] = ["daily", "monthly", "yearly"];

const SalesChart: React.FC<SalesChartProps> = ({ 
  data, 
  filter, 
  onFilterChange, 
  loading = false 
}) => {
  return (
    <div className="lg:col-span-2 bg-white dark:bg-[#221019] p-4 md:p-6 rounded-[24px] md:rounded-[32px] border border-[#f4f0f2] dark:border-[#3a1d2e] shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6 gap-3 md:gap-4">
        <div>
          <h3 className="text-base md:text-lg font-bold text-[#181114] dark:text-white">Sales Overview</h3>
          <p className="text-xs md:text-sm text-[#896175]">Transaction volume over time</p>
        </div>
        <div className="flex bg-[#f8f6f7] dark:bg-[#2a1621] p-1 rounded-lg">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => onFilterChange(f)}
              className={`px-2 md:px-3 py-1 text-[10px] md:text-xs font-medium rounded-md capitalize transition-colors ${
                filter === f
                  ? "bg-white dark:bg-[#3a1d2e] shadow-sm text-[#181114] dark:text-white font-bold"
                  : "text-[#896175] hover:text-[#181114] dark:hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[180px] md:h-[300px] w-full flex items-end justify-between gap-1 md:gap-2 px-1 md:px-2 pb-2 relative">
        {/* Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none z-0">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-full h-px bg-gray-100 dark:bg-gray-800 border-dashed"></div>
          ))}
        </div>

        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-white/50 dark:bg-[#221019]/50 flex items-center justify-center z-20">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#ee2b8c] border-t-transparent"></div>
          </div>
        )}

        {/* Bars */}
        <div className="relative z-10 w-full h-full flex items-end justify-between gap-1 md:gap-2 pt-6">
          {data.map((item, index) => (
            <div
              key={`${item.label}-${index}`}
              className={`flex-1 min-w-0 rounded-t-md md:rounded-t-lg relative group transition-all cursor-pointer ${
                item.isHighlight
                  ? "bg-gradient-to-t from-[#ee2b8c] to-[#8b5cf6] shadow-lg shadow-[#ee2b8c]/20"
                  : index % 2 === 0
                  ? "bg-[#ee2b8c]/10 hover:bg-[#ee2b8c]/20"
                  : "bg-[#8b5cf6]/10 hover:bg-[#8b5cf6]/20"
              }`}
              style={{ height: item.height }}
            >
              <div className="absolute -top-6 md:-top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[9px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                {item.isHighlight ? "Current" : `IDR ${item.value}M`}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Labels */}
      <div className="flex justify-between text-[8px] md:text-xs text-[#896175] mt-2 font-medium px-1 md:px-2">
        {data.map((item, index) => (
          <span key={`label-${item.label}-${index}`} className="truncate flex-1 text-center min-w-0">
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SalesChart;
