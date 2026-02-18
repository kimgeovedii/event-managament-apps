"use client";

import React from "react";

const DashboardPreviewSection: React.FC = () => (
  <section className="py-16 md:py-32 bg-gray-100 dark:bg-[#111111]/50 border-y-4 md:border-y-8 border-gray-200 dark:border-black">
    <div className="max-w-[1200px] mx-auto px-4 md:px-6">
      {/* Section Header */}
      <div className="text-center mb-10 md:mb-16">
        <span className="bg-[#00bcd4] dark:bg-[#00F0FF] text-white dark:text-black px-3 md:px-4 py-1 font-black uppercase text-xs md:text-sm mb-4 inline-block">
          The Command Center
        </span>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-gray-900 dark:text-white">
          Your Dashboard, Elevated.
        </h2>
      </div>

      {/* Dashboard Mockup */}
      <div className="bg-white/80 dark:bg-white/5 backdrop-blur-xl border-4 border-gray-200 dark:border-white/10 p-4 md:p-8 relative shadow-[4px_4px_0px_0px_#ddd] dark:shadow-none">
        {/* Dot grid background */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(0,0,0,0.05) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Window Controls */}
        <div className="relative z-10 flex items-center justify-between mb-8 md:mb-12">
          <div className="flex gap-2 md:gap-4">
            <div className="size-3 md:size-4 rounded-full bg-red-500" />
            <div className="size-3 md:size-4 rounded-full bg-yellow-500" />
            <div className="size-3 md:size-4 rounded-full bg-green-500" />
          </div>
          <div className="text-[8px] md:text-xs font-black uppercase tracking-widest text-gray-400 dark:text-white/40">
            Hype Intelligence OS v2.0
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
          {/* Main Chart Area */}
          <div className="md:col-span-8 space-y-4 md:space-y-8">
            {/* Chart */}
            <div className="h-48 md:h-64 border-4 border-gray-200 dark:border-black bg-gray-50 dark:bg-black p-4 md:p-6 relative overflow-hidden">
              <div className="flex justify-between items-end h-full gap-1 md:gap-2">
                <div className="w-full bg-[#00bcd4]/20 dark:bg-[#00F0FF]/20 h-1/2 border-t-4 border-[#00bcd4] dark:border-[#00F0FF]" />
                <div className="w-full bg-[#ee2b8c]/20 dark:bg-[#FF00E5]/20 h-3/4 border-t-4 border-[#ee2b8c] dark:border-[#FF00E5]" />
                <div className="w-full bg-[#A855F7]/20 h-1/4 border-t-4 border-[#A855F7]" />
                <div className="w-full bg-[#00bcd4]/20 dark:bg-[#00F0FF]/20 h-[90%] border-t-4 border-[#00bcd4] dark:border-[#00F0FF]" />
                <div className="w-full bg-[#ee2b8c]/20 dark:bg-[#FF00E5]/20 h-1/2 border-t-4 border-[#ee2b8c] dark:border-[#FF00E5]" />
                <div className="w-full bg-[#A855F7]/20 h-[60%] border-t-4 border-[#A855F7]" />
              </div>
              <div className="absolute top-4 md:top-6 left-4 md:left-6">
                <h4 className="text-[10px] md:text-sm font-black uppercase text-gray-400 dark:text-gray-500">
                  Live Sales Volume
                </h4>
                <p className="text-xl md:text-3xl font-black text-gray-900 dark:text-white">
                  $142,400.00
                </p>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-2 md:gap-6">
              <div className="border-4 border-gray-200 dark:border-black bg-gray-50 dark:bg-black p-2 md:p-4">
                <p className="text-[8px] md:text-[10px] font-black uppercase text-gray-400 dark:text-gray-500">
                  Conversion
                </p>
                <p className="text-base md:text-xl font-black text-[#00bcd4] dark:text-[#00F0FF]">
                  24.5%
                </p>
              </div>
              <div className="border-4 border-gray-200 dark:border-black bg-gray-50 dark:bg-black p-2 md:p-4">
                <p className="text-[8px] md:text-[10px] font-black uppercase text-gray-400 dark:text-gray-500">
                  Views
                </p>
                <p className="text-base md:text-xl font-black text-[#ee2b8c] dark:text-[#FF00E5]">
                  1.2M
                </p>
              </div>
              <div className="border-4 border-gray-200 dark:border-black bg-gray-50 dark:bg-black p-2 md:p-4">
                <p className="text-[8px] md:text-[10px] font-black uppercase text-gray-400 dark:text-gray-500">
                  Tickets
                </p>
                <p className="text-base md:text-xl font-black text-[#A855F7]">
                  8.4k
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-4 border-4 border-gray-200 dark:border-black bg-gray-50 dark:bg-black p-4 md:p-6">
            <h4 className="text-xs md:text-sm font-black uppercase mb-4 md:mb-6 text-gray-400 dark:text-gray-500">
              Top Sources
            </h4>
            <div className="space-y-4 md:space-y-6">
              <div className="flex justify-between items-center">
                <span className="font-bold uppercase text-[10px] md:text-xs text-gray-700 dark:text-white">
                  Instagram
                </span>
                <div className="w-20 md:w-24 h-2 bg-gray-200 dark:bg-[#111111]">
                  <div className="w-3/4 h-full bg-[#00bcd4] dark:bg-[#00F0FF]" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold uppercase text-[10px] md:text-xs text-gray-700 dark:text-white">
                  TikTok
                </span>
                <div className="w-20 md:w-24 h-2 bg-gray-200 dark:bg-[#111111]">
                  <div className="w-full h-full bg-[#ee2b8c] dark:bg-[#FF00E5]" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold uppercase text-[10px] md:text-xs text-gray-700 dark:text-white">
                  Direct
                </span>
                <div className="w-20 md:w-24 h-2 bg-gray-200 dark:bg-[#111111]">
                  <div className="w-1/2 h-full bg-[#A855F7]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default DashboardPreviewSection;
