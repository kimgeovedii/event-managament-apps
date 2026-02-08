"use client";

import React from "react";
import { mockPromotions, type Promotion } from "@/data";
import { usePromoCarousel } from "../hooks";

// Icon mapping
const IconMap: Record<string, React.FC<{ className?: string }>> = {
  loyalty: ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/>
    </svg>
  ),
  school: ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
    </svg>
  ),
  rocket_launch: ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M9.19 6.35c-2.04 2.29-3.44 5.58-3.57 5.89L2 10.69l4.05-4.05c.47-.47 1.15-.68 1.81-.55l1.33.26zM11.17 17c0 .49-.2.96-.55 1.31l-4.39 4.39-1.09-1.09L8.8 16h2.37zm6.48-6.82c.87-.87 1.24-2.18.98-3.46-.2-1.02-.8-1.95-1.64-2.55-1.82-1.3-4.36-.78-5.53.91l-.16.24 3.69 3.69.24-.16c.78-.58 1.85-.72 2.42-.67zm-4.45.75-2.21 2.21 2.49 2.49 2.21-2.21 -2.49-2.49zM16 22l-4.41-4.41c-.35-.35-.54-.82-.54-1.32V14.5l2.21-2.21 3.88 3.88c-.02.28-.06.67-.22 1.1-.19.53-.54 1.12-1.14 1.62-.49.4-1.06.66-1.78.11z"/>
    </svg>
  ),
};

const colorClasses = {
  purple: {
    gradient: "from-purple-100 dark:from-purple-900/40 to-white dark:to-black",
    border: "border-[#9c27b0] dark:border-[#B026FF]",
    shadow: "shadow-[8px_8px_0px_0px_#9c27b0] dark:shadow-[8px_8px_0px_0px_#B026FF]",
    iconBg: "bg-[#9c27b0]/10 dark:bg-[#B026FF]/20",
    iconColor: "text-[#9c27b0] dark:text-[#B026FF]",
    buttonBg: "bg-[#9c27b0] dark:bg-[#B026FF]",
    buttonText: "text-white",
    buttonHover: "hover:bg-transparent hover:text-[#9c27b0] dark:hover:text-[#B026FF]",
    badgeBg: "bg-[#cddc39] dark:bg-[#CCFF00]",
    badgeRotate: "rotate-6",
  },
  cyan: {
    gradient: "from-cyan-50 dark:from-cyan-900/40 to-white dark:to-black",
    border: "border-[#00bcd4] dark:border-[#00FFFF]",
    shadow: "shadow-[8px_8px_0px_0px_#00bcd4] dark:shadow-[8px_8px_0px_0px_#00FFFF]",
    iconBg: "bg-[#00bcd4]/10 dark:bg-[#00FFFF]/20",
    iconColor: "text-[#00bcd4] dark:text-[#00FFFF]",
    buttonBg: "bg-[#00bcd4] dark:bg-[#00FFFF]",
    buttonText: "text-white dark:text-black",
    buttonHover: "hover:bg-transparent hover:text-[#00bcd4] dark:hover:text-[#00FFFF]",
    badgeBg: "bg-[#ee2b8c] dark:bg-[#FF00FF]",
    badgeRotate: "-rotate-6",
  },
  pink: {
    gradient: "from-pink-50 dark:from-pink-900/40 to-white dark:to-black",
    border: "border-[#ee2b8c] dark:border-[#FF00FF]",
    shadow: "shadow-[8px_8px_0px_0px_#ee2b8c] dark:shadow-[8px_8px_0px_0px_#FF00FF]",
    iconBg: "bg-[#ee2b8c]/10 dark:bg-[#FF00FF]/20",
    iconColor: "text-[#ee2b8c] dark:text-[#FF00FF]",
    buttonBg: "bg-[#ee2b8c] dark:bg-[#FF00FF]",
    buttonText: "text-white dark:text-black",
    buttonHover: "hover:bg-transparent hover:text-[#ee2b8c] dark:hover:text-[#FF00FF]",
    badgeBg: "bg-[#00bcd4] dark:bg-[#00FFFF]",
    badgeRotate: "rotate-3",
  },
};

interface PromoCardProps {
  promo: Promotion;
}

const PromoCard: React.FC<PromoCardProps> = ({ promo }) => {
  const colors = colorClasses[promo.color];
  const Icon = IconMap[promo.icon];

  return (
    <div
      className={`relative group bg-gradient-to-br ${colors.gradient} ${colors.border} border p-5 md:p-8 rounded-none ${colors.shadow} hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200 w-[calc(100vw-80px)] md:w-auto md:min-w-0 flex-shrink-0 md:flex-shrink`}
    >
      {/* Badge */}
      {promo.badge && (
        <div
          className={`absolute -top-2 md:-top-4 ${promo.color === "cyan" ? "left-2 md:-left-4" : "right-2 md:-right-4"} ${colors.badgeBg} text-black px-2 md:px-3 py-0.5 md:py-1 text-[10px] md:text-sm font-black uppercase ${colors.badgeRotate} border-2 border-black`}
        >
          {promo.badge}
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4 md:mb-6">
        <div className={`${colors.iconBg} p-2 md:p-3 rounded-full`}>
          {Icon && <Icon className={`w-6 h-6 md:w-8 md:h-8 ${colors.iconColor}`} />}
        </div>
        <span className="font-display font-bold text-4xl md:text-5xl text-gray-900 dark:text-white">{promo.discountValue}</span>
      </div>

      {/* Content */}
      <h3 className="font-display font-bold text-xl md:text-2xl uppercase mb-2 text-gray-900 dark:text-white">{promo.title}</h3>
      <p className="text-gray-500 dark:text-gray-400 mb-4 md:mb-6 font-mono text-xs md:text-sm">{promo.description}</p>

      {/* Button */}
      <button
        className={`w-full py-2 md:py-3 ${colors.buttonBg} ${colors.buttonText} font-bold uppercase tracking-wider border-2 ${colors.border} ${colors.buttonHover} transition-all text-sm md:text-base`}
      >
        {promo.buttonText}
      </button>
    </div>
  );
};

const PromoCardsSection: React.FC = () => {
  const promotions = mockPromotions.data;
  const { activeIndex, scrollContainerRef, handleScroll, scrollToIndex } = usePromoCarousel(promotions.length);

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-10 mt-6 md:mt-10">
      {/* Mobile: Carousel */}
      <div className="md:hidden">
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pt-4 pb-6 pl-4 pr-4"
        >
          {promotions.map((promo) => (
            <div key={promo.id} className="snap-start pl-2 first:pl-0">
              <PromoCard promo={promo} />
            </div>
          ))}
        </div>
        
        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {promotions.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === activeIndex
                  ? "bg-[#ee2b8c] dark:bg-[#FF00FF] w-6"
                  : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop: Grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {promotions.map((promo) => (
          <PromoCard key={promo.id} promo={promo} />
        ))}
      </div>
    </div>
  );
};

export default PromoCardsSection;
