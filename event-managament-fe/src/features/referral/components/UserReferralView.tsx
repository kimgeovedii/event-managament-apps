"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { useUserReferral } from "../hooks";
import { ActivityItem, Coupon } from "../types";

// Icons as SVG components (smaller on mobile)
const EditIcon = () => (
  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
  </svg>
);

const CopyIcon = () => (
  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
  </svg>
);

const TicketIcon = () => (
  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22 10V6c0-1.11-.9-2-2-2H4c-1.1 0-1.99.89-1.99 2v4c1.1 0 1.99.9 1.99 2s-.89 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2s.9-2 2-2z"/>
  </svg>
);

const GiftIcon = () => (
  <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/>
  </svg>
);

const SavingsIcon = () => (
  <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.83 7.5l-2.27-2.27c.07-.42.18-.81.32-1.15.08-.18.12-.37.12-.58 0-.83-.67-1.5-1.5-1.5-1.64 0-3.09.79-4 2h-5c-2.76 0-5 2.24-5 5v4c0 1.1.9 2 2 2h1v5c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2v-5h2.27l3.04 6.08c.29.58.88.96 1.54.96H17c1.1 0 2-.9 2-2v-5.5c1.14-.49 2-1.69 2-3.08 0-1.48-.81-2.75-2-3.46l.83-.5zM18 11c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
  </svg>
);

const HistoryIcon = () => (
  <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
  </svg>
);

const PersonAddIcon = () => (
  <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>
);

const FireIcon = () => (
  <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
  </svg>
);

const CampaignIcon = () => (
  <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18 11v2h4v-2h-4zm-2 6.61c.96.71 2.21 1.65 3.2 2.39.4-.53.8-1.07 1.2-1.6-.99-.74-2.24-1.68-3.2-2.4-.4.54-.8 1.08-1.2 1.61zM20.4 5.6c-.4-.53-.8-1.07-1.2-1.6-.99.74-2.24 1.68-3.2 2.4.4.53.8 1.07 1.2 1.6.96-.72 2.21-1.65 3.2-2.4zM4 9c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1v4h2v-4h1l5 3V6L8 9H4zm11.5 3c0-1.33-.58-2.53-1.5-3.35v6.69c.92-.81 1.5-2.01 1.5-3.34z"/>
  </svg>
);

const LocalActivityIcon = () => (
  <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 12c0-1.1.9-2 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-1.99.9-1.99 2v4c1.1 0 1.99.9 1.99 2s-.89 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2zm-4.42 4.8L12 14.5l-3.58 2.3 1.08-4.12-3.29-2.69 4.24-.25L12 5.8l1.54 3.95 4.24.25-3.29 2.69 1.09 4.11z"/>
  </svg>
);

const ScheduleIcon = () => (
  <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
  </svg>
);

// Loading Spinner
const LoadingSpinner = () => (
  <div className="flex justify-center py-4">
    <div className="w-6 h-6 border-2 border-gray-300 dark:border-zinc-600 border-t-[#ee2b8c] dark:border-t-[#FF00FF] rounded-full animate-spin" />
  </div>
);

// Activity Icon based on type
const ActivityIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "referral":
      return <PersonAddIcon />;
    case "purchase":
      return <TicketIcon />;
    case "streak":
      return <FireIcon />;
    default:
      return <GiftIcon />;
  }
};

// Profile Header Component - Mobile First with Light/Dark Mode
const ProfileHeader = ({ 
  profile, 
  onCopyCode 
}: { 
  profile: { id: string; name: string; avatar: string; memberSince: string; location: string; referralCode: string; tier: string };
  onCopyCode: () => void;
}) => (
  <section className="flex flex-col gap-4 md:gap-8 items-center md:flex-row md:items-end md:justify-between border-b-2 border-gray-200 dark:border-zinc-800 pb-4 md:pb-8 border-dashed">
    <div className="flex flex-col items-center gap-4 md:flex-row md:items-end md:gap-6 w-full md:w-auto">
      {/* Avatar */}
      <div className="relative group cursor-pointer">
        <div 
          className="size-24 md:size-40 rounded-none border-2 md:border-4 border-gray-300 dark:border-white/20 bg-cover bg-center shadow-[2px_2px_0px_0px_#ccc] dark:shadow-[2px_2px_0px_0px_#333333] md:shadow-[4px_4px_0px_0px_#ccc] md:dark:shadow-[4px_4px_0px_0px_#333333] group-hover:shadow-[4px_4px_0px_0px_#FF00FF] md:group-hover:shadow-[6px_6px_0px_0px_#FF00FF] transition-all bg-gray-100 dark:bg-zinc-900"
          style={{ backgroundImage: `url("${profile.avatar}")` }}
        />
        <div className="absolute -bottom-2 -right-2 md:-bottom-3 md:-right-3 bg-[#00FFFF] text-black p-1.5 md:p-2 border-2 border-black shadow-[1px_1px_0px_0px_#333333] md:shadow-[2px_2px_0px_0px_#333333] group-hover:rotate-12 transition-transform">
          <EditIcon />
        </div>
      </div>

      {/* Profile Info */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
        <div className="inline-block bg-[#FF00FF] text-white px-2 md:px-3 py-0.5 md:py-1 text-[10px] md:text-xs font-black uppercase tracking-widest transform -rotate-1 mb-1 md:mb-2 border border-black">
          {profile.tier}
        </div>
        <h1 className="text-2xl md:text-6xl font-black tracking-tighter uppercase leading-none text-gray-900 dark:text-white drop-shadow-[1px_1px_0px_rgba(255,0,255,0.5)] md:drop-shadow-[2px_2px_0px_rgba(255,0,255,0.5)]">
          {profile.name}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 font-bold text-xs md:text-base">
          Joined {profile.memberSince} • {profile.location}
        </p>
        <div className="flex items-center gap-2 md:gap-3 mt-2 md:mt-4">
          <button 
            onClick={onCopyCode}
            className="bg-gray-100 dark:bg-zinc-900 px-2 md:px-4 py-1.5 md:py-2 border-2 border-gray-300 dark:border-zinc-800 shadow-[1px_1px_0px_0px_#ccc] dark:shadow-[1px_1px_0px_0px_#333333] md:shadow-[2px_2px_0px_0px_#ccc] md:dark:shadow-[2px_2px_0px_0px_#333333] flex items-center gap-2 md:gap-3 group cursor-pointer active:shadow-none active:translate-x-[1px] active:translate-y-[1px] transition-all hover:border-[#00bcd4] dark:hover:border-[#00FFFF]"
          >
            <span className="text-[10px] md:text-xs font-black uppercase tracking-wider text-gray-500">ID:</span>
            <span className="font-mono font-bold text-sm md:text-lg text-[#00bcd4] dark:text-[#00FFFF]">{profile.referralCode}</span>
            <span className="text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
              <CopyIcon />
            </span>
          </button>
        </div>
      </div>
    </div>

    {/* Action Buttons */}
    <div className="flex flex-col sm:flex-row gap-2 md:gap-4 w-full md:w-auto">
      <Link 
        href="/events"
        className="bg-gray-900 dark:bg-zinc-900 border-2 border-gray-800 dark:border-zinc-800 text-white px-4 md:px-6 py-2 md:py-3 font-bold text-xs md:text-base shadow-[2px_2px_0px_0px_#333] md:shadow-[4px_4px_0px_0px_#333] hover:shadow-[3px_3px_0px_0px_#FF00FF] md:hover:shadow-[6px_6px_0px_0px_#FF00FF] hover:border-[#00bcd4] dark:hover:border-[#00FFFF] hover:-translate-y-1 active:shadow-none active:translate-y-0 transition-all flex items-center justify-center gap-2 uppercase tracking-wide"
      >
        <span className="text-[#00FFFF]"><TicketIcon /></span>
        Browse Events
      </Link>
      <button className="bg-[#ee2b8c] dark:bg-[#FF00FF] border-2 border-black text-white px-4 md:px-8 py-2 md:py-3 font-black text-xs md:text-lg shadow-[2px_2px_0px_0px_#d61f7a] dark:shadow-[2px_2px_0px_0px_#ffffff] md:shadow-[4px_4px_0px_0px_#d61f7a] md:dark:shadow-[4px_4px_0px_0px_#ffffff] hover:bg-[#d61f7a] dark:hover:bg-[#d900d9] hover:-translate-y-1 active:shadow-none active:translate-y-0 transition-all flex items-center justify-center gap-2 uppercase tracking-wide">
        <GiftIcon />
        Redeem Points
      </button>
    </div>
  </section>
);

// Points Balance Card - Mobile First
const PointsBalanceCard = ({ 
  balance 
}: { 
  balance: { current: number; nextTier: string; nextTierProgress: number; expiresIn: string } 
}) => (
  <div className="relative overflow-hidden bg-gradient-to-br from-[#a855f7] to-[#3b82f6] border-2 md:border-4 border-zinc-800 shadow-[2px_2px_0px_0px_#333333] md:shadow-[4px_4px_0px_0px_#333333] p-4 md:p-8 flex flex-col justify-between min-h-[240px] md:min-h-[360px] group">
    {/* Background Effects */}
    <div className="absolute top-0 right-0 w-20 h-20 md:w-32 md:h-32 bg-[#00FFFF] rounded-full mix-blend-overlay filter blur-3xl opacity-30 group-hover:scale-150 transition-transform duration-700" />
    <div className="absolute bottom-0 left-0 w-24 h-24 md:w-40 md:h-40 bg-[#FF00FF] rounded-full mix-blend-overlay filter blur-3xl opacity-30 group-hover:scale-150 transition-transform duration-700" />
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10" />

    {/* Header */}
    <div className="relative z-10 flex justify-between items-start gap-2">
      <div className="bg-black/40 backdrop-blur-md border border-white/10 px-2 md:px-4 py-1 md:py-2">
        <h3 className="font-black text-white text-sm md:text-xl uppercase italic tracking-wide flex items-center gap-1.5 md:gap-2">
          <span className="text-[#00FFFF] drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]">
            <SavingsIcon />
          </span>
          Balance
        </h3>
      </div>
      <div className="bg-[#00FFFF] border-2 border-black px-2 md:px-3 py-0.5 md:py-1 transform rotate-2 shadow-[1px_1px_0px_0px_#ffffff] md:shadow-[2px_2px_0px_0px_#ffffff]">
        <span className="text-[10px] md:text-xs font-black uppercase text-black">Gold Tier</span>
      </div>
    </div>

    {/* Points Display */}
    <div className="relative z-10 py-2 md:py-6">
      <span className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200 tracking-tighter drop-shadow-[2px_2px_0px_#000000] md:drop-shadow-[4px_4px_0px_#000000] leading-none">
        {(balance.current / 1000).toFixed(0)}k
      </span>
      <span className="text-lg md:text-2xl font-bold text-white uppercase tracking-widest ml-1 drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]">
        Points
      </span>
    </div>

    {/* Progress Bar */}
    <div className="relative z-10 bg-black/50 backdrop-blur-sm border-2 border-zinc-700/50 p-2 md:p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]">
      <div className="flex justify-between text-xs md:text-sm font-black uppercase mb-1 md:mb-2 text-white">
        <span>Next: {balance.nextTier}</span>
        <span className="text-[#00FFFF]">{balance.nextTierProgress}%</span>
      </div>
      <div className="h-4 md:h-6 w-full bg-black/60 border-2 border-white/20 relative overflow-hidden">
        <div 
          className="h-full bg-[#00FFFF] border-r-2 border-black shadow-[0_0_10px_rgba(6,182,212,0.5)]"
          style={{ 
            width: `${balance.nextTierProgress}%`,
            backgroundImage: "linear-gradient(45deg,rgba(0,0,0,.15) 25%,transparent 25%,transparent 50%,rgba(0,0,0,.15) 50%,rgba(0,0,0,.15) 75%,transparent 75%,transparent)",
            backgroundSize: "0.75rem 0.75rem"
          }}
        />
      </div>
      <p className="mt-2 md:mt-3 text-[10px] md:text-xs font-bold text-gray-300 flex items-center gap-1 uppercase">
        <ScheduleIcon />
        Expires in {balance.expiresIn}
      </p>
    </div>
  </div>
);

// Recent Activity Card - Mobile First with Infinite Scroll
const RecentActivityCard = ({ 
  activities, 
  displayCount,
  onLoadMore,
  hasMore,
  isLoading
}: { 
  activities: ActivityItem[]; 
  displayCount: number;
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
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

// Referral Crew Card - Mobile First
const ReferralCrewCard = ({ 
  code, 
  stats, 
  onCopyCode 
}: { 
  code: string; 
  stats: { friends: number; coupons: number }; 
  onCopyCode: () => void;
}) => (
  <div className="relative bg-zinc-900/40 border-2 border-zinc-800 p-3 md:p-6 shadow-[2px_2px_0px_0px_#333333] md:shadow-[4px_4px_0px_0px_#333333] overflow-hidden h-full">
    {/* Background Effect */}
    <div className="absolute inset-0 bg-[#00FFFF]/5 pointer-events-none" />
    
    {/* Punch Holes */}
    <div className="absolute top-1/2 -translate-y-1/2 left-[-8px] md:left-[-10px] w-4 h-4 md:w-5 md:h-5 bg-black rounded-full border-2 border-zinc-800" />
    <div className="absolute top-1/2 -translate-y-1/2 right-[-8px] md:right-[-10px] w-4 h-4 md:w-5 md:h-5 bg-black rounded-full border-2 border-zinc-800" />
    
    {/* Dashed Line */}
    <div className="absolute top-1/2 left-0 w-full border-b-2 border-zinc-800 border-dashed opacity-50 pointer-events-none" />

    <div className="flex flex-col gap-3 md:gap-6 relative z-10 h-full justify-between">
      {/* Header */}
      <div className="flex items-center gap-2 md:gap-3 border-b-2 border-zinc-800 pb-2 md:pb-4 border-dashed">
        <div className="bg-[#00FFFF] text-black p-1.5 md:p-2 border-2 border-black shadow-[1px_1px_0px_0px_#ffffff] md:shadow-[2px_2px_0px_0px_#ffffff] transform -rotate-3">
          <CampaignIcon />
        </div>
        <h3 className="text-lg md:text-2xl font-black uppercase italic tracking-tighter text-white">Referral Crew</h3>
      </div>

      {/* Description */}
      <p className="font-bold text-xs md:text-sm leading-relaxed border-2 border-zinc-800 bg-black/60 p-2 md:p-3 shadow-[2px_2px_0px_0px_#00FFFF] md:shadow-[3px_3px_0px_0px_#00FFFF] text-gray-300">
        Share the hype! Friends get <span className="bg-[#FF00FF] text-white px-1">10% OFF</span> their first ticket. You get points.
      </p>

      {/* Referral Code */}
      <div className="bg-black border border-zinc-800 p-2 md:p-4 relative group hover:scale-[1.02] transition-transform duration-200">
        <label className="text-[9px] md:text-[10px] font-black text-[#00FFFF] uppercase mb-0.5 md:mb-1 block tracking-widest">Your Code</label>
        <div className="flex justify-between items-center gap-2">
          <span className="text-lg md:text-2xl font-black text-white tracking-widest font-mono truncate">{code}</span>
          <button 
            onClick={onCopyCode}
            className="bg-[#00FFFF] text-black size-8 md:size-10 shrink-0 flex items-center justify-center border-2 border-black hover:bg-white transition-colors"
          >
            <CopyIcon />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 md:gap-4">
        <div className="bg-zinc-900 border-2 border-zinc-800 p-2 flex flex-col items-center justify-center text-center shadow-[1px_1px_0px_0px_#ffffff] md:shadow-[2px_2px_0px_0px_#ffffff]">
          <span className="text-xl md:text-3xl font-black text-white mb-0.5 md:mb-1">{stats.friends}</span>
          <span className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-wide">Friends</span>
        </div>
        <div className="bg-[#a855f7] border-2 border-black p-2 flex flex-col items-center justify-center text-center shadow-[1px_1px_0px_0px_#ffffff] md:shadow-[2px_2px_0px_0px_#ffffff]">
          <span className="text-xl md:text-3xl font-black text-white mb-0.5 md:mb-1">{stats.coupons}</span>
          <span className="text-[9px] md:text-[10px] font-black text-white uppercase tracking-wide">Coupons</span>
        </div>
      </div>
    </div>
  </div>
);

// Coupon Card - Mobile First
const CouponCard = ({ coupon }: { coupon: Coupon }) => (
  <div className={`relative ${coupon.isRedeemed ? 'bg-zinc-900/50 opacity-50 grayscale hover:grayscale-0 hover:opacity-100' : 'bg-zinc-900 shadow-[2px_2px_0px_0px_#FF00FF] md:shadow-[4px_4px_0px_0px_#FF00FF] hover:-translate-y-1'} border-2 ${coupon.isRedeemed ? 'border-zinc-800' : 'border-zinc-700'} p-0 transition-all`}>
    {/* Punch Holes */}
    <div className={`absolute -left-[5px] md:-left-[6px] top-1/2 -translate-y-1/2 w-2.5 h-5 md:w-3 md:h-6 bg-black border-r-2 ${coupon.isRedeemed ? 'border-zinc-800' : 'border-zinc-700'} rounded-r-full`} />
    <div className={`absolute -right-[5px] md:-right-[6px] top-1/2 -translate-y-1/2 w-2.5 h-5 md:w-3 md:h-6 bg-black border-l-2 ${coupon.isRedeemed ? 'border-zinc-800' : 'border-zinc-700'} rounded-l-full`} />

    {coupon.isRedeemed ? (
      <div className="p-3 md:p-4 flex justify-between items-center relative z-10">
        <div>
          <p className="font-black text-xl md:text-2xl text-gray-500">{coupon.discount}</p>
          <p className="text-[10px] md:text-xs font-bold text-gray-600 uppercase">{coupon.description}</p>
        </div>
        <span className="text-[10px] md:text-xs font-black text-gray-500 border-2 border-zinc-800 px-1.5 md:px-2 py-0.5 md:py-1 uppercase transform rotate-12">Redeemed</span>
      </div>
    ) : (
      <>
        <div className="p-3 md:p-4 flex justify-between items-center border-b-2 border-zinc-700 border-dashed bg-[#FF00FF]/10">
          <div>
            <p className="font-black text-2xl md:text-3xl text-[#FF00FF] italic drop-shadow-[0_0_5px_rgba(255,0,255,0.5)]">{coupon.discount}</p>
            <p className="text-[10px] md:text-xs font-bold uppercase tracking-wide text-gray-300">{coupon.description}</p>
          </div>
        </div>
        <div className="p-2 md:p-3 bg-zinc-900 flex justify-end">
          <button className="bg-white text-black px-3 md:px-4 py-0.5 md:py-1 text-[10px] md:text-xs font-black uppercase hover:bg-[#FF00FF] hover:text-white transition-colors">
            Use Now
          </button>
        </div>
      </>
    )}
  </div>
);

// Your Stash Card - Mobile First with Infinite Scroll
const YourStashCard = ({ 
  coupons,
  displayCount,
  onLoadMore,
  hasMore,
  isLoading
}: { 
  coupons: Coupon[];
  displayCount: number;
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
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

// Loading Skeleton - Mobile First
const LoadingSkeleton = () => (
  <div className="animate-pulse space-y-4 md:space-y-10">
    <div className="h-32 md:h-40 bg-zinc-800 rounded" />
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
      <div className="md:col-span-7 space-y-4 md:space-y-8">
        <div className="h-[240px] md:h-[360px] bg-zinc-800 rounded" />
        <div className="h-[200px] md:h-[300px] bg-zinc-800 rounded" />
      </div>
      <div className="md:col-span-5 space-y-4 md:space-y-8">
        <div className="h-[200px] md:h-[300px] bg-zinc-800 rounded" />
        <div className="h-[150px] md:h-[200px] bg-zinc-800 rounded" />
      </div>
    </div>
  </div>
);

// Main Component
export const UserReferralView: React.FC = () => {
  const { data, loading, error } = useUserReferral();
  const [copied, setCopied] = useState(false);
  
  // Infinite scroll state
  const [activityDisplayCount, setActivityDisplayCount] = useState(10);
  const [couponDisplayCount, setCouponDisplayCount] = useState(10);
  const [activityLoading, setActivityLoading] = useState(false);
  const [couponLoading, setCouponLoading] = useState(false);

  const handleCopyCode = () => {
    if (data?.profile.referralCode) {
      navigator.clipboard.writeText(data.profile.referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const loadMoreActivities = useCallback(() => {
    if (!data || activityLoading) return;
    setActivityLoading(true);
    // Simulate network delay
    setTimeout(() => {
      setActivityDisplayCount(prev => Math.min(prev + 10, data.recentActivity.length));
      setActivityLoading(false);
    }, 500);
  }, [data, activityLoading]);

  const loadMoreCoupons = useCallback(() => {
    if (!data || couponLoading) return;
    setCouponLoading(true);
    // Simulate network delay
    setTimeout(() => {
      setCouponDisplayCount(prev => Math.min(prev + 10, data.coupons.length));
      setCouponLoading(false);
    }, 500);
  }, [data, couponLoading]);

  if (loading) {
    return (
      <div className="flex-grow w-full max-w-[1400px] mx-auto px-3 md:px-8 py-4 md:py-10">
        <LoadingSkeleton />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex-grow w-full max-w-[1400px] mx-auto px-3 md:px-8 py-4 md:py-10">
        <div className="text-center text-red-500">Failed to load data</div>
      </div>
    );
  }

  return (
    <div className="flex-grow w-full max-w-[1400px] mx-auto px-3 md:px-8 py-4 md:py-10">
      {/* Copied Toast */}
      {copied && (
        <div className="fixed bottom-4 left-2 md:left-4 z-50 bg-[#00FFFF] text-black px-3 md:px-4 py-1.5 md:py-2 font-black uppercase text-xs md:text-sm shadow-[2px_2px_0px_0px_#ffffff] md:shadow-[4px_4px_0px_0px_#ffffff] animate-pulse">
          Code Copied!
        </div>
      )}

      <div className="flex flex-col gap-4 md:gap-10">
        {/* Profile Header */}
        <ProfileHeader profile={data.profile} onCopyCode={handleCopyCode} />

        {/* Top Row - Balance & Referral */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 md:items-stretch">
          <div className="md:col-span-7">
            <PointsBalanceCard balance={data.pointsBalance} />
          </div>
          <div className="md:col-span-5">
            <ReferralCrewCard 
              code={data.profile.referralCode} 
              stats={data.referralStats} 
              onCopyCode={handleCopyCode} 
            />
          </div>
        </div>

        {/* Bottom Row - Activity & Stash */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 md:items-end">
          <div className="md:col-span-7">
            <RecentActivityCard 
              activities={data.recentActivity} 
              displayCount={activityDisplayCount}
              onLoadMore={loadMoreActivities}
              hasMore={activityDisplayCount < data.recentActivity.length}
              isLoading={activityLoading}
            />
          </div>
          <div className="md:col-span-5">
            <YourStashCard 
              coupons={data.coupons} 
              displayCount={couponDisplayCount}
              onLoadMore={loadMoreCoupons}
              hasMore={couponDisplayCount < data.coupons.length}
              isLoading={couponLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserReferralView;
