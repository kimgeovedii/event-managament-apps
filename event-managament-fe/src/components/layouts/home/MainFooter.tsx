"use client";

import React from "react";
import Link from "next/link";

// Social Icon Components
const InstagramIcon = () => (
  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const MainFooter: React.FC = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-[#222] bg-gray-50 dark:bg-[#050505] py-10 md:py-16 px-4 md:px-6 lg:px-10 mt-auto">
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
        {/* Brand Column */}
        <div className="col-span-2">
          <h2 className="text-2xl md:text-4xl font-display font-bold text-gray-900 dark:text-white uppercase mb-4 md:mb-6 italic tracking-tighter">
            Hype.
          </h2>
          <p className="text-gray-500 text-xs md:text-sm max-w-sm mb-4 md:mb-6">
            The ultimate platform for discovering underground culture, creative workshops, and nightlife.
          </p>
          
          {/* Social Links */}
          <div className="flex gap-3 md:gap-4">
            <a
              href="#"
              className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border border-gray-300 dark:border-gray-700 rounded-full text-gray-500 dark:text-gray-400 hover:text-[#ee2b8c] dark:hover:text-[#FF00FF] hover:border-[#ee2b8c] dark:hover:border-[#FF00FF] transition-all"
            >
              <InstagramIcon />
            </a>
            <a
              href="#"
              className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border border-gray-300 dark:border-gray-700 rounded-full text-gray-500 dark:text-gray-400 hover:text-[#00bcd4] dark:hover:text-[#00FFFF] hover:border-[#00bcd4] dark:hover:border-[#00FFFF] transition-all"
            >
              <TwitterIcon />
            </a>
            <a
              href="#"
              className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border border-gray-300 dark:border-gray-700 rounded-full text-gray-500 dark:text-gray-400 hover:text-[#9c27b0] dark:hover:text-[#B026FF] hover:border-[#9c27b0] dark:hover:border-[#B026FF] transition-all"
            >
              <YoutubeIcon />
            </a>
          </div>
        </div>

        {/* Discover Column */}
        <div>
          <h3 className="text-gray-900 dark:text-white font-bold uppercase tracking-wider mb-4 md:mb-6 text-xs md:text-sm">Discover</h3>
          <ul className="space-y-2 md:space-y-4 text-gray-500 text-xs md:text-sm font-medium">
            <li><Link href="/concerts" className="hover:text-[#00bcd4] dark:hover:text-[#00FFFF] transition-colors">Concerts</Link></li>
            <li><Link href="/workshops" className="hover:text-[#00bcd4] dark:hover:text-[#00FFFF] transition-colors">Workshops</Link></li>
            <li><Link href="/nightlife" className="hover:text-[#00bcd4] dark:hover:text-[#00FFFF] transition-colors">Nightlife</Link></li>
            <li><Link href="/festivals" className="hover:text-[#00bcd4] dark:hover:text-[#00FFFF] transition-colors">Festivals</Link></li>
          </ul>
        </div>

        {/* Company Column */}
        <div>
          <h3 className="text-gray-900 dark:text-white font-bold uppercase tracking-wider mb-4 md:mb-6 text-xs md:text-sm">Company</h3>
          <ul className="space-y-2 md:space-y-4 text-gray-500 text-xs md:text-sm font-medium">
            <li><Link href="/about" className="hover:text-[#ee2b8c] dark:hover:text-[#FF00FF] transition-colors">About Us</Link></li>
            <li><Link href="/careers" className="hover:text-[#ee2b8c] dark:hover:text-[#FF00FF] transition-colors">Careers</Link></li>
            <li><Link href="/contact" className="hover:text-[#ee2b8c] dark:hover:text-[#FF00FF] transition-colors">Contact</Link></li>
            <li><Link href="/partner" className="hover:text-[#ee2b8c] dark:hover:text-[#FF00FF] transition-colors">Partner</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1400px] mx-auto border-t border-gray-200 dark:border-[#222] pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
        <div className="text-gray-400 dark:text-gray-600 text-[10px] md:text-xs font-mono uppercase tracking-widest">
          © 2024 HYPE PLATFORM INC.
        </div>
        <div className="flex gap-4 md:gap-6 text-[10px] md:text-xs font-mono uppercase tracking-widest">
          <Link href="/privacy" className="text-gray-400 dark:text-gray-600 hover:text-gray-900 dark:hover:text-white transition-colors">Privacy</Link>
          <Link href="/terms" className="text-gray-400 dark:text-gray-600 hover:text-gray-900 dark:hover:text-white transition-colors">Terms</Link>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
