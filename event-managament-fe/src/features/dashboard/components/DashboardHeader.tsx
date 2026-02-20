"use client";

import { useStoreLogin } from "@/features/auth/store/useAuthStore";
import React from "react";

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

// Icons
const MenuIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
  </svg>
);

const SearchIcon = () => (
  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>
);

const NotificationIcon = () => (
  <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
  </svg>
);

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onMenuClick }) => {
  const { user } = useStoreLogin();

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };
  return (
    <header className="h-14 md:h-16 bg-white dark:bg-[#221019] border-b border-[#f4f0f2] dark:border-[#3a1d2e] flex items-center justify-between px-3 md:px-6 lg:px-8 flex-shrink-0 z-20">
      <div className="flex items-center gap-2 md:gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-1.5 md:p-2 -ml-1 md:-ml-2 text-[#5f4351] hover:text-[#181114] dark:hover:text-white transition-colors"
        >
          <MenuIcon />
        </button>
        <h1 className="text-base md:text-xl font-bold text-[#181114] dark:text-white">Dashboard</h1>
      </div>
      
      <div className="flex items-center gap-3 md:gap-6">
        {/* Search - hidden on mobile */}
        <div className="hidden sm:flex items-center gap-2 bg-[#f8f6f7] dark:bg-[#2a1621] px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-[#e6dbe0] dark:border-[#3a1d2e]">
          <span className="text-[#896175]"><SearchIcon /></span>
          <input 
            className="bg-transparent border-none p-0 text-xs md:text-sm w-28 md:w-40 focus:ring-0 focus:outline-none placeholder-[#896175] dark:text-white" 
            placeholder="Search events..." 
            type="text"
          />
        </div>
        
        {/* Notifications */}
        <button className="relative text-[#5f4351] hover:text-[#ee2b8c] transition-colors p-1">
          <NotificationIcon />
          <span className="absolute top-0 right-0 size-2 md:size-2.5 bg-[#ee2b8c] rounded-full border-2 border-white dark:border-[#221019]"></span>
        </button>
        
        {/* Profile */}
        <div className="flex items-center gap-2 md:gap-3 pl-3 md:pl-6 border-l border-[#f4f0f2] dark:border-[#3a1d2e]">
          <div className="text-right hidden md:block">
            <p className="text-xs md:text-sm font-bold text-[#181114] dark:text-white">{user?.organizer?.name}</p>
            <p className="text-[10px] md:text-xs text-[#896175]">{user?.name}</p>
          </div>
          <div className="size-8 md:size-10 rounded-full bg-[#ee2b8c] flex items-center justify-center text-white font-bold text-xs md:text-sm overflow-hidden border-2 border-transparent hover:border-white/20 transition-colors">
            {user?.organizer?.logoUrl ? (
              <img src={user.organizer.logoUrl} alt="Logo" className="w-full h-full object-cover" />
            ) : (
              getInitials(user?.organizer?.name || user?.name)
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
