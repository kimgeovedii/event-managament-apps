"use client";

import React from "react";
import { BoltIcon, ChartBarIcon, ShareIcon } from "@heroicons/react/24/solid";

const features = [
  {
    icon: BoltIcon,
    title: "Instant Payouts",
    description:
      "Get your funds the second a ticket sells. No waiting weeks for your bag.",
    accentColor: "#00bcd4",
    darkAccentColor: "#00F0FF",
    bgColor: "bg-[#00bcd4] dark:bg-[#00F0FF]",
  },
  {
    icon: ChartBarIcon,
    title: "Powerful Analytics",
    description:
      "Real-time tracking of every click, share, and conversion on your dashboard.",
    accentColor: "#ee2b8c",
    darkAccentColor: "#FF00E5",
    bgColor: "bg-[#ee2b8c] dark:bg-[#FF00E5]",
  },
  {
    icon: ShareIcon,
    title: "Viral Referral",
    description:
      "Gamified rewards that make your fans sell the event for you.",
    accentColor: "#A855F7",
    darkAccentColor: "#A855F7",
    bgColor: "bg-[#A855F7]",
    badge: "10,000 PTS PER REFERRAL",
  },
];

const WhyHypeSection: React.FC = () => (
  <section className="py-16 md:py-32 px-4 md:px-6 lg:px-12 max-w-[1440px] mx-auto">
    <h2 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase mb-12 md:mb-20 text-center tracking-tighter italic text-gray-900 dark:text-white">
      Why Hype?
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
      {features.map((feature) => {
        const IconComponent = feature.icon;
        return (
          <div
            key={feature.title}
            className="bg-white dark:bg-[#111111] border-4 border-gray-200 dark:border-black p-6 md:p-10 group hover:-translate-y-2 transition-transform"
            style={{
              boxShadow: `8px 8px 0px 0px var(--shadow-color)`,
            }}
          >
            <style>{`
              .card-${feature.title.replace(/\s/g, '')} {
                --shadow-color: ${feature.accentColor};
              }
              :is(.dark) .card-${feature.title.replace(/\s/g, '')} {
                --shadow-color: ${feature.darkAccentColor};
              }
            `}</style>
            <div
              className={`card-${feature.title.replace(/\s/g, '')} size-14 md:size-20 ${feature.bgColor} flex items-center justify-center border-4 border-gray-200 dark:border-black mb-6 md:mb-8 group-hover:rotate-6 transition-transform`}
            >
              <IconComponent className="size-8 md:size-12 text-white dark:text-black" />
            </div>

            <h3 className="text-xl md:text-3xl font-black uppercase mb-3 md:mb-4 text-gray-900 dark:text-white">
              {feature.title}
            </h3>

            {feature.badge && (
              <div className="bg-gray-50 dark:bg-black border-2 border-[#A855F7] px-3 md:px-4 py-1.5 md:py-2 mb-3 md:mb-4 inline-block">
                <span className="text-[#A855F7] font-black text-xs md:text-sm">
                  {feature.badge}
                </span>
              </div>
            )}

            <p className="text-sm md:text-lg font-bold text-gray-500 dark:text-gray-400 leading-tight uppercase">
              {feature.description}
            </p>
          </div>
        );
      })}
    </div>
  </section>
);

export default WhyHypeSection;
