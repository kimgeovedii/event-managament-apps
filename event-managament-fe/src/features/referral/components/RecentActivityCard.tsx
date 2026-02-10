import React, { useRef, useCallback, useEffect } from "react";
import { HistoryIcon } from "./ReferralIcons";
import { ActivityIcon } from "./ActivityIcon";
import { LoadingSpinner } from "./LoadingSkeleton";
import { ActivityItem } from "../types";

interface RecentActivityCardProps {
  activities: ActivityItem[];
  displayCount: number;
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
}

const RecentActivityCard: React.FC<RecentActivityCardProps> = ({ 
  activities, 
  displayCount,
  onLoadMore,
  hasMore,
  isLoading
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const displayedActivities = activities.slice(0, displayCount);

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
    <div className="bg-gray-50 dark:bg-zinc-900/40 backdrop-blur-sm border-2 border-gray-200 dark:border-zinc-800 shadow-[2px_2px_0px_0px_#ccc] dark:shadow-[2px_2px_0px_0px_#333333] md:shadow-[4px_4px_0px_0px_#ccc] md:dark:shadow-[4px_4px_0px_0px_#333333] p-3 md:p-6">
      <div className="flex justify-between items-center mb-3 md:mb-4 border-b-2 border-gray-200 dark:border-zinc-800 pb-2 md:pb-4 border-dashed">
        <h3 className="text-lg md:text-2xl font-black uppercase italic tracking-tighter flex items-center gap-1.5 md:gap-2 text-gray-900 dark:text-white">
          <span className="text-[#a855f7]"><HistoryIcon /></span>
          <span className="hidden sm:inline">Recent Activity</span>
          <span className="sm:hidden">Activity</span>
        </h3>
        <span className="text-[10px] md:text-xs font-bold text-gray-500 uppercase">
          {displayCount} / {activities.length}
        </span>
      </div>
      <div 
        ref={scrollRef}
        className="space-y-2 md:space-y-3 max-h-[350px] md:max-h-[450px] overflow-y-auto pr-1 scrollbar-thin"
      >
        {displayedActivities.map((activity) => (
          <div 
            key={activity.id}
            className="flex items-center justify-between p-2 md:p-4 border-2 border-gray-200 dark:border-zinc-800 bg-white dark:bg-black hover:bg-gray-100 dark:hover:bg-zinc-900 hover:shadow-[1px_1px_0px_0px_#ccc] dark:hover:shadow-[1px_1px_0px_0px_#333333] transition-all group cursor-default"
          >
            <div className="flex items-center gap-2 md:gap-4">
              <div className={`size-8 md:size-12 border-2 border-gray-300 dark:border-zinc-700 ${activity.iconColor} ${activity.type === 'referral' ? 'text-black' : 'text-white'} flex items-center justify-center group-hover:rotate-12 transition-transform shadow-[1px_1px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[1px_1px_0px_0px_rgba(255,255,255,0.2)]`}>
                <ActivityIcon type={activity.type} />
              </div>
              <div className="min-w-0">
                <p className="font-black text-sm md:text-lg uppercase leading-tight text-gray-900 dark:text-white truncate">{activity.title}</p>
                <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wide truncate">{activity.description}</p>
              </div>
            </div>
            <span className={`font-black text-sm md:text-xl shrink-0 ${activity.type === 'referral' ? 'bg-white dark:bg-black text-[#00bcd4] dark:text-[#00FFFF] border-2 border-[#00bcd4] dark:border-[#00FFFF] transform -rotate-2 shadow-[0_0_8px_rgba(6,182,212,0.4)]' : 'text-gray-900 dark:text-white bg-gray-100 dark:bg-zinc-900 border-2 border-gray-300 dark:border-zinc-700'} px-1.5 md:px-2 py-0.5 md:py-1`}>
              +{activity.points.toLocaleString()}
            </span>
          </div>
        ))}
        {isLoading && <LoadingSpinner />}
        {!hasMore && displayCount > 10 && (
          <p className="text-center text-xs text-gray-500 py-2">No more activities</p>
        )}
      </div>
    </div>
  );
};

export default RecentActivityCard;
