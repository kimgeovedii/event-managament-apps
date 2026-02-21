"use client";

import React from "react";
import DashboardSidebar from "@/components/layouts/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/layouts/dashboard/DashboardHeader";
import { useSidebar } from "@/features/dashboard/hooks";
import { FloatingThemeToggle } from "@/features/theme";
import ProfileContent from "./ProfileContent";

const OrganizerProfileView: React.FC = () => {
  const { isOpen, toggle, close } = useSidebar();

  return (
    <div className="bg-gray-50 dark:bg-[#1a0c13] text-[#181114] dark:text-white font-[family-name:var(--font-display)] min-h-screen flex overflow-hidden">
      {/* Sidebar */}
      <DashboardSidebar isOpen={isOpen} onClose={close} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Header */}
        <DashboardHeader onMenuClick={toggle} />

        {/* Main */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 bg-gray-50 dark:bg-[#1a0c13]">
          <ProfileContent />

          {/* Footer */}
          <footer className="mt-20 pb-8 text-center">
            <p className="text-xs font-medium text-gray-400 dark:text-gray-500">
              © 2024 Hype Organizer Dashboard. All rights reserved.
            </p>
          </footer>
        </main>
      </div>

      {/* Floating Theme Toggle */}
      <FloatingThemeToggle />
    </div>
  );
};

export default OrganizerProfileView;
