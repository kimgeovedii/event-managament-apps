"use client";

import React from "react";

const stories = [
  {
    caseNumber: "01",
    badgeColor: "bg-[#ee2b8c] dark:bg-[#FF00E5]",
    quote: `"HYPE TRIPLED OUR SALES IN THE FIRST 48 HOURS. THE REFERRAL ENGINE IS `,
    highlight: "CHEATING",
    highlightColor: "text-[#00bcd4] dark:text-[#00F0FF]",
    closingQuote: `."`,
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAieRbDC6ZpJa9_QUxpKKLJQCWKs9X0cxi6be1u8HXFg9GcQIanTEQaIGl631IgsE-jnOAY0b5xRSEtQx5vh8MTEe4_iEOjCqUyp9PqoZEsXtJQzc8n5jQEBXEhA_qjpJncYdjassGmE3oWswDqzYuz9Ex3ZVQVoQ-Dx4MHxEa1t18ydLshGc4SUQCvXx36XraAu778htb1-2rQIAmNV1bhvf4vn6hV0ByveeL57n36kFv0NiA4MGugWIddgr7xyrrkvifyTH0wCCI",
    name: "ALEX RIVERA",
    role: "FOUNDER, NEON PULSE FEST",
    offsetClass: "",
  },
  {
    caseNumber: "02",
    badgeColor: "bg-[#00bcd4] dark:bg-[#00F0FF]",
    quote: `"INSTANT PAYOUTS CHANGED HOW WE RUN PRODUCTION. NO MORE CASH FLOW `,
    highlight: "NIGHTMARES",
    highlightColor: "text-[#ee2b8c] dark:text-[#FF00E5]",
    closingQuote: `."`,
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCJnPkYGfBE5cP94vJ88oI0Z0uDmkb5vidVRnfhJtB4oUGVxbXQbPo7cxw4ebcegpwuZu7_Io5yTdVtdkwziG0zf8co13cWWQf-5OZch7HavJSxyfp_BTyL02lGn8TKHxwnLq9i-Xn6l_1BXTYZF8uqHyYjLtcPd704eZAV05qcKzAsPks5rEx7_LzssuT6WGVSkaIpQmBDEZmt-zCgXaeZwK2h3N-5F9nrnD3105xfIj7diU4RB6kNtRIGUjrTMljPW-Op5FKtITQ",
    name: "SARAH CHENG",
    role: "TECHNO UNDERGROUND KL",
    offsetClass: "md:mt-24",
  },
];

const SuccessStoriesSection: React.FC = () => (
  <section className="py-16 md:py-32 px-4 md:px-6 lg:px-12 max-w-[1440px] mx-auto overflow-hidden">
    <h2 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase mb-12 md:mb-20 text-gray-900 dark:text-white italic tracking-tighter">
      SUCCESS STORIES
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
      {stories.map((story) => (
        <div
          key={story.caseNumber}
          className={`space-y-4 md:space-y-6 ${story.offsetClass}`}
        >
          <div
            className={`${story.badgeColor} text-white dark:text-black p-1.5 md:p-2 inline-block font-black uppercase text-xs md:text-sm`}
          >
            Case Study #{story.caseNumber}
          </div>

          <blockquote className="text-2xl md:text-4xl lg:text-6xl font-black uppercase leading-[0.9] tracking-tighter text-gray-900 dark:text-white">
            {story.quote}
            <span className={story.highlightColor}>{story.highlight}</span>
            {story.closingQuote}
          </blockquote>

          <div className="flex items-center gap-3 md:gap-4 pt-4 md:pt-6">
            <div className="size-12 md:size-16 border-4 border-gray-200 dark:border-black bg-white overflow-hidden shrink-0">
              <img
                alt={story.name}
                className="w-full h-full object-cover"
                src={story.avatar}
              />
            </div>
            <div>
              <p className="font-black uppercase text-base md:text-xl text-gray-900 dark:text-white">
                {story.name}
              </p>
              <p className="font-bold uppercase text-gray-500 text-xs md:text-sm">
                {story.role}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default SuccessStoriesSection;
