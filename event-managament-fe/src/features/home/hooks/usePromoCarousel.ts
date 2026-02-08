"use client";

import React from "react";

interface UsePromoCarouselReturn {
  activeIndex: number;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  handleScroll: () => void;
  scrollToIndex: (index: number) => void;
}

export const usePromoCarousel = (itemCount: number): UsePromoCarouselReturn => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = React.useCallback(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.offsetWidth * 0.85;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(newIndex, itemCount - 1));
    }
  }, [itemCount]);

  const scrollToIndex = React.useCallback((index: number) => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.offsetWidth * 0.85;
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
  }, []);

  return {
    activeIndex,
    scrollContainerRef,
    handleScroll,
    scrollToIndex,
  };
};

export default usePromoCarousel;
