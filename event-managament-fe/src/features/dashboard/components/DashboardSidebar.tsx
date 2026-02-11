"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Icons
const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
  </svg>
);

const EventIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/>
  </svg>
);

const TransactionIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.5 3.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5zM19 19H5V5h14v14zM9 12H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8-4H7v2h2V8zm4 0h-2v2h2V8zm4 0h-2v2h2V8z"/>
  </svg>
);

const ChartIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M5 9.2h3V19H5V9.2zM10.6 5h2.8v14h-2.8V5zm5.6 8H19v6h-2.8v-6z"/>
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
  </svg>
);

const RocketIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9.19 6.35c-2.04 2.29-3.44 5.58-3.57 5.89L2 10.69l4.05-4.05c.47-.47 1.15-.68 1.81-.55l1.33.26zM11.17 17c0 .49-.2.96-.55 1.31l-4.39 4.39-1.09-1.09L8.8 16h2.37zm6.48-6.82c.87-.87 1.24-2.18.98-3.46-.2-1.02-.8-1.95-1.64-2.55-1.82-1.3-4.36-.78-5.53.91l-.16.24 3.69 3.69.24-.16c.78-.58 1.85-.72 2.42-.67z"/>
  </svg>
);

const ArrowIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);

const navItems = [
  { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: DashboardIcon },
  { id: "events", label: "My Events", href: "/dashboard/events", icon: EventIcon },
  { id: "transactions", label: "Transactions", href: "/dashboard/transactions", icon: TransactionIcon },
  { id: "reports", label: "Reports", href: "/dashboard/reports", icon: ChartIcon },
  { id: "settings", label: "Settings", href: "/dashboard/settings", icon: SettingsIcon },
];

interface DashboardSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ isOpen = false, onClose }) => {
  const pathname = usePathname();

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="h-16 flex items-center gap-3 px-6 border-b border-[#f4f0f2] dark:border-[#3a1d2e]">
        <div className="size-8 text-[#ee2b8c]">
          <svg className="w-full h-full" fill="currentColor" viewBox="0 0 48 48">
            <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold tracking-tight text-[#181114] dark:text-white">Hype</h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                isActive
                  ? "bg-[#ee2b8c]/10 text-[#ee2b8c] font-bold"
                  : "text-[#5f4351] dark:text-gray-400 hover:bg-[#f8f6f7] dark:hover:bg-[#2a1621] hover:text-[#181114] dark:hover:text-white"
              }`}
            >
              <Icon />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Pro Plan Card */}
      <div className="p-4 border-t border-[#f4f0f2] dark:border-[#3a1d2e]">
        <div className="bg-gradient-to-br from-[#ee2b8c]/10 to-[#8b5cf6]/10 rounded-2xl p-4 relative overflow-hidden group cursor-pointer hover:shadow-md transition-all">
          <div className="relative z-10">
            <p className="text-xs font-bold text-[#ee2b8c] mb-1">PRO PLAN</p>
            <p className="text-sm font-semibold text-[#181114] dark:text-white">Unlock analytics</p>
            <div className="mt-3 text-xs font-bold text-[#8b5cf6] flex items-center gap-1 group-hover:gap-2 transition-all">
              Upgrade now <ArrowIcon />
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 text-[#ee2b8c]/10 rotate-12">
            <RocketIcon />
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white dark:bg-[#221019] border-r border-[#f4f0f2] dark:border-[#3a1d2e] hidden lg:flex flex-col flex-shrink-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50" 
            onClick={onClose}
          />
          
          {/* Sidebar */}
          <aside className="relative w-64 bg-white dark:bg-[#221019] flex flex-col z-50">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-[#5f4351] hover:text-[#181114] dark:hover:text-white"
            >
              <CloseIcon />
            </button>
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};

export default DashboardSidebar;
