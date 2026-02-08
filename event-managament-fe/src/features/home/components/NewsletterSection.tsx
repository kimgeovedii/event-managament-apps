"use client";

import React from "react";
import { useNewsletter } from "../hooks";

const NewsletterSection: React.FC = () => {
  const { email, setEmail, handleSubmit, isSubmitting } = useNewsletter();

  return (
    <section className="py-12 md:py-20 px-4 md:px-6 lg:px-10 border-t border-gray-200 dark:border-[#222] bg-gradient-to-b from-gray-50 to-white dark:from-black dark:to-[#0a0a0a] relative overflow-hidden">
      {/* Background Text */}
      <div className="absolute -right-10 md:-right-20 top-0 text-[150px] md:text-[300px] font-black text-gray-100 dark:text-white/5 font-display select-none pointer-events-none opacity-50 dark:opacity-20 rotate-12">
        HYPE
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Badge */}
        <span className="inline-block px-3 md:px-4 py-1.5 md:py-2 bg-[#00bcd4] dark:bg-[#00FFFF] text-white dark:text-black font-black uppercase tracking-widest text-xs md:text-sm mb-4 md:mb-6 rotate-2 shadow-[3px_3px_0px_0px_#0097a7] dark:shadow-[3px_3px_0px_0px_#fff] md:shadow-[4px_4px_0px_0px_#0097a7] dark:md:shadow-[4px_4px_0px_0px_#fff]">
          Don&apos;t Miss Out
        </span>

        {/* Headline */}
        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none mb-4 md:mb-6">
          Stay In <br />
          <span className="text-[#ee2b8c] dark:text-[#FF00FF]">The Loop</span>
        </h2>

        {/* Description */}
        <p className="text-gray-500 dark:text-gray-400 text-sm md:text-lg lg:text-xl max-w-xl mx-auto mb-6 md:mb-10 font-mono px-4 md:px-0">
          Get the drop on secret raves, flash sales on tickets, and exclusive community events.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-lg mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-white dark:bg-white/5 border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white px-4 md:px-6 py-3 md:py-4 focus:border-[#ee2b8c] dark:focus:border-[#FF00FF] focus:ring-0 placeholder:text-gray-400 dark:placeholder:text-gray-600 font-bold uppercase tracking-wide outline-none text-sm md:text-base"
            placeholder="YOUR@EMAIL.COM"
            required
            disabled={isSubmitting}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#ee2b8c] dark:bg-[#FF00FF] text-white dark:text-black px-6 md:px-8 py-3 md:py-4 font-black uppercase tracking-wider border-2 border-[#ee2b8c] dark:border-[#FF00FF] hover:bg-transparent hover:text-[#ee2b8c] dark:hover:text-[#FF00FF] transition-all shadow-[3px_3px_0px_0px_#d61f7a] dark:shadow-[3px_3px_0px_0px_#B026FF] md:shadow-[4px_4px_0px_0px_#d61f7a] dark:md:shadow-[4px_4px_0px_0px_#B026FF] hover:translate-x-1 hover:translate-y-1 hover:shadow-none text-sm md:text-base disabled:opacity-50"
          >
            {isSubmitting ? "..." : "Subscribe"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;
