import React from "react";
import HeroSection from "./HeroSection";
import MarqueeSection from "./MarqueeSection";
import PromoCardsSection from "./PromoCardsSection";
import CategorySection from "./CategorySection";
import FilterBar from "./FilterBar";
import EventsGridSection from "./EventsGridSection";
import NewsletterSection from "./NewsletterSection";

const HomeView: React.FC = () => {
  return (
    <div className="bg-white dark:bg-[#050505] text-gray-900 dark:text-white font-body min-h-screen flex flex-col selection:bg-[#ee2b8c] dark:selection:bg-[#FF00FF] selection:text-white dark:selection:text-black">
      {/* Main Content */}
      <main className="flex-1 flex flex-col w-full overflow-x-hidden">
        {/* Hero Section */}
        <HeroSection />

        {/* Marquee + Promo Cards */}
        <section className="py-8 md:py-12 bg-gray-50 dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-[#222]">
          <MarqueeSection />
          <PromoCardsSection />
        </section>

        {/* Trending Categories */}
        <CategorySection />

        {/* Filter Bar */}
        <FilterBar />

        {/* Events Grid */}
        <EventsGridSection />

        {/* Newsletter */}
        <NewsletterSection />
      </main>
    </div>
  );
};

export default HomeView;
