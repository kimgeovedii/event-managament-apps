"use client";

import React from "react";
import AuthNavbar from "./AuthNavbar";
import { FloatingThemeToggle } from "@/features/theme";

interface AuthLayoutProps {
  children: React.ReactNode;
  /** Text to show before the action button */
  navActionText?: string;
  /** Primary action button text */
  navActionButtonText: string;
  /** Link for the primary action button */
  navActionHref: string;
  /** Whether to use filled style for the action button */
  navActionFilled?: boolean;
  /** Background image URL for the left panel */
  heroImage: string;
  /** Main heading for the left panel */
  heroTitle: React.ReactNode;
  /** Description text for the left panel */
  heroDescription: string;
  /** Optional badge/tag content */
  heroBadge?: React.ReactNode;
  /** Footer content for the hero section (e.g., avatars) */
  heroFooter?: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  navActionText,
  navActionButtonText,
  navActionHref,
  navActionFilled = false,
  heroImage,
  heroTitle,
  heroDescription,
  heroBadge,
  heroFooter,
}) => {
  return (
    <div className="bg-[#f8f6f7] dark:bg-[#221019] min-h-screen lg:h-screen flex flex-col font-[family-name:var(--font-display)] overflow-y-auto lg:overflow-hidden">
      {/* Auth Navbar */}
      <AuthNavbar
        actionText={navActionText}
        actionButtonText={navActionButtonText}
        actionHref={navActionHref}
        actionFilled={navActionFilled}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Panel: Hero / Visual */}
        <div className="lg:w-5/12 xl:w-1/2 relative min-h-[200px] lg:min-h-0 flex-1 flex flex-col justify-end p-6 lg:p-8 xl:p-10">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
            style={{ backgroundImage: `url('${heroImage}')` }}
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-[#ee2b8c]/10 mix-blend-overlay z-10" />
          
          {/* Content */}
          <div className="relative z-20 text-white max-w-lg">
            {heroBadge && (
              <div className="mb-3">
                {heroBadge}
              </div>
            )}
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-tight mb-2 drop-shadow-xl">
              {heroTitle}
            </h1>
            <p className="text-sm lg:text-base text-gray-200 font-medium mb-4 leading-relaxed max-w-md drop-shadow-md">
              {heroDescription}
            </p>
            
            {heroFooter && (
              <div className="flex items-center gap-2">
                {heroFooter}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Form Content */}
        <div className="lg:w-7/12 xl:w-1/2 flex flex-col justify-center items-center p-4 lg:p-6 xl:p-8 bg-white dark:bg-[#221019] relative overflow-hidden">
          {children}
           
          {/* Background decorative elements */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#ee2b8c]/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-[#ee2b8c]/5 rounded-full blur-3xl pointer-events-none"></div>
        </div>
      </main>

      {/* Floating Theme Toggle - Bottom Right */}
      <FloatingThemeToggle />
    </div>
  );
};

export default AuthLayout;
