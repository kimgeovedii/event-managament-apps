"use client";

import React from "react";
import Link from "next/link";

interface AuthNavbarProps {
  /** Text to show before the action button */
  actionText?: string;
  /** Primary action button text */
  actionButtonText: string;
  /** Link for the primary action button */
  actionHref: string;
  /** Whether to use filled style for the action button */
  actionFilled?: boolean;
}

const AuthNavbar: React.FC<AuthNavbarProps> = ({
  actionText,
  actionButtonText,
  actionHref,
  actionFilled = false,
}) => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#f4f0f2] dark:border-[#3a1d2e] px-6 lg:px-10 py-2 bg-white dark:bg-[#221019] z-20 relative flex-shrink-0">
      <Link href="/" className="flex items-center gap-3 text-[#181114] dark:text-white no-underline">
        <div className="w-7 h-7 text-[#ee2b8c]">
          <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"></path>
          </svg>
        </div>
        <h2 className="text-[#181114] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Hype</h2>
      </Link>
      <div className="flex items-center gap-4 sm:gap-6">
        <div className="hidden md:flex items-center gap-6">
          <Link href="/events" className="text-[#181114] dark:text-white hover:text-[#ee2b8c] transition-colors text-sm font-medium leading-normal no-underline">
            Events
          </Link>
          <Link href="/marketplace" className="text-[#181114] dark:text-white hover:text-[#ee2b8c] transition-colors text-sm font-medium leading-normal no-underline">
            Marketplace
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {actionText && (
            <span className="text-sm font-medium text-[#181114] dark:text-gray-300 hidden sm:block">{actionText}</span>
          )}
          <Link 
            href={actionHref} 
            className={`flex min-w-[72px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-9 px-5 transition-colors text-sm font-bold leading-normal tracking-[0.015em] no-underline ${
              actionFilled 
                ? "bg-[#ee2b8c] hover:bg-[#d91b7a] text-white" 
                : "bg-white dark:bg-[#2a1621] border border-[#e6dbe0] dark:border-[#3a1d2e] text-[#ee2b8c] hover:bg-[#ee2b8c]/5"
            }`}
          >
            <span className="truncate">{actionButtonText}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default AuthNavbar;
