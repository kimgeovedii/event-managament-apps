import React, { useRef, useCallback, useEffect } from "react";
import { LocalActivityIcon } from "./ReferralIcons";
import { LoadingSpinner } from "./LoadingSkeleton";
import CouponCard from "./CouponCard";
import { Coupon } from "../types";

interface YourStashCardProps {
  coupons: Coupon[];
  displayCount: number;
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
}

const YourStashCard: React.FC<YourStashCardProps> = ({ 
  coupons,
  displayCount,
  onLoadMore,
  hasMore,
  isLoading
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const displayedCoupons = coupons.slice(0, displayCount);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current || isLoading || !hasMore) return;
    
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    if (scrollHeight - scrollTop - clientHeight < 50) {
      onLoadMore();
    }
  }, [isLoading, hasMore, onLoadMore]);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (scrollEl) {
      scrollEl.addEventListener('scroll', handleScroll);
      return () => scrollEl.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  return (
    <div className="bg-gray-50 dark:bg-zinc-900/40 border-2 border-gray-200 dark:border-zinc-800 p-3 md:p-6 shadow-[2px_2px_0px_0px_#ccc] dark:shadow-[2px_2px_0px_0px_#333333] md:shadow-[4px_4px_0px_0px_#ccc] md:dark:shadow-[4px_4px_0px_0px_#333333] flex flex-col gap-2 md:gap-4">
      <div className="flex justify-between items-center mb-1 md:mb-2">
        <h3 className="text-lg md:text-xl font-black uppercase italic tracking-tighter flex items-center gap-1.5 md:gap-2 text-gray-900 dark:text-white">
          <span className="text-[#ee2b8c] dark:text-[#FF00FF]"><LocalActivityIcon /></span>
          Your Stash
        </h3>
        <span className="text-[10px] md:text-xs font-bold text-gray-500 uppercase">{displayCount} / {coupons.length}</span>
      </div>
      <div 
        ref={scrollRef}
        className="space-y-2 md:space-y-3 max-h-[300px] md:max-h-[400px] overflow-y-auto pr-1 scrollbar-thin"
      >
        {displayedCoupons.map((coupon) => (
          <CouponCard key={coupon.id} coupon={coupon} />
        ))}
        {isLoading && <LoadingSpinner />}
        {!hasMore && displayCount > 10 && (
          <p className="text-center text-xs text-gray-500 py-2">No more coupons</p>
        )}
      </div>
    </div>
  );
};

export default YourStashCard;
