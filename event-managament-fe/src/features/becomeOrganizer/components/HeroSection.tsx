"use client";

import React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { useStoreLogin } from "@/features/auth/store/useAuthStore";

const HeroSection: React.FC = () => {
  const { isAuthenticated } = useStoreLogin();
  const href = isAuthenticated ? "/register/organizer" : "/register?role=ORGANIZER";

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-gradient-to-br from-[#f5f0ff] via-white to-[#f0faff] dark:from-black dark:via-black dark:to-black">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-[#ee2b8c]/10 dark:bg-[#FF00FF]/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute top-1/4 left-1/4 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-[#00bcd4]/10 dark:bg-[#00FFFF]/10 rounded-full blur-[100px] -z-10" />

      <h1 className="text-[14vw] md:text-[8vw] font-black uppercase leading-[0.8] tracking-[-0.05em] mb-8 md:mb-12 text-gray-900 dark:text-white drop-shadow-none dark:drop-shadow-[0_0_20px_rgba(255,0,229,0.6)]">
        RUN THE SHOW.
        <br />
        <span className="text-[#ee2b8c] dark:text-[#FF00FF]">SELL THE HYPE.</span>
      </h1>

      <p className="text-base md:text-2xl font-bold uppercase tracking-widest mb-8 md:mb-12 max-w-2xl text-gray-500 dark:text-gray-400 px-4">
        The high-octane event management platform for the next generation of
        creators.
      </p>

      <Link
        href={href}
        className="inline-flex items-center gap-3 md:gap-4 px-8 md:px-12 py-4 md:py-6 bg-[#A855F7] text-lg md:text-2xl text-white font-black uppercase tracking-tighter border-4 border-[#7c3aed] dark:border-black shadow-[4px_4px_0px_0px_#7c3aed] md:shadow-[8px_8px_0px_0px_#7c3aed] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,1),0_0_30px_rgba(168,85,247,0.5)] md:dark:shadow-[8px_8px_0px_0px_rgba(0,0,0,1),0_0_30px_rgba(168,85,247,0.5)] hover:scale-105 transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none"
      >
        <span>Start Selling</span>
        <ArrowRightIcon className="size-6 md:size-8" />
      </Link>
    </section>
  );
};

export default HeroSection;
