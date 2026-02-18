"use client";

import React from "react";
import Link from "next/link";
import { MegaphoneIcon } from "@heroicons/react/24/solid";
import { useStoreLogin } from "@/features/auth/store/useAuthStore";

const StickyCtaBar: React.FC = () => {
  const { isAuthenticated } = useStoreLogin();
  const href = isAuthenticated ? "/register/organizer" : "/register?role=ORGANIZER";

  return (
    <div className="sticky bottom-0 w-full z-40 p-2 md:p-4">
      <div className="max-w-[1200px] mx-auto bg-gradient-to-r from-[#A855F7] via-[#ee2b8c] dark:via-[#FF00E5] to-[#00bcd4] dark:to-[#00F0FF] p-[3px] md:p-[4px] shadow-[0_-10px_20px_rgba(168,85,247,0.15)] md:shadow-[0_-10px_30px_rgba(168,85,247,0.2)] dark:shadow-[0_-10px_30px_rgba(168,85,247,0.3)] md:dark:shadow-[0_-20px_50px_rgba(168,85,247,0.3)]">
        <div className="bg-white dark:bg-black flex flex-col sm:flex-row items-center justify-between px-4 md:px-8 py-3 md:py-4 gap-3 md:gap-4">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="size-6 md:size-8 bg-gray-900 dark:bg-white border-2 border-gray-200 dark:border-black flex items-center justify-center shrink-0">
              <MegaphoneIcon className="size-4 md:size-5 text-white dark:text-black" />
            </div>
            <p className="text-base md:text-xl font-black uppercase tracking-tighter text-gray-900 dark:text-white">
              READY TO RUN THE SHOW?
            </p>
          </div>
          <Link
            href={href}
            className="w-full sm:w-auto text-center px-6 md:px-10 py-2.5 md:py-3 bg-[#A855F7] text-white text-sm md:text-lg font-black uppercase tracking-tighter border-4 border-[#7c3aed] dark:border-black hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            Become an Organizer
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StickyCtaBar;
