// User Referral Dummy Data
// DELETE THIS FILE when switching to real API

import { UserReferralData, ActivityItem, Coupon, UserProfile, PointsBalance, ReferralStats } from "../referral/types";

export const userProfile: UserProfile = {
  id: "HYPE-ALEX-99",
  name: "Alex Rivera",
  avatar: "https://picsum.photos/seed/alex/200/200",
  memberSince: "2023",
  location: "San Francisco, CA",
  referralCode: "HYPE-ALEX-99",
  tier: "Gold",
};

export const pointsBalance: PointsBalance = {
  current: 30000,
  nextTier: "Platinum",
  nextTierProgress: 75,
  expiresIn: "3 months",
};

// Generate 50 activity items
const activityTypes = ["referral", "purchase", "streak", "bonus"] as const;
const activityTitles: Record<string, string[]> = {
  referral: ["Friend Registered", "Friend Purchased", "Referral Milestone"],
  purchase: ["Concert Ticket", "Festival Pass", "VIP Upgrade", "Workshop Entry"],
  streak: ["Daily Streak", "7-Day Streak", "30-Day Streak"],
  bonus: ["Welcome Bonus", "Birthday Bonus", "Loyalty Reward", "Special Promo"],
};
const activityColors: Record<string, string> = {
  referral: "bg-[#00FFFF]",
  purchase: "bg-[#FF00FF]",
  streak: "bg-[#a855f7]",
  bonus: "bg-[#facc15]",
};

const timeAgos = [
  "1 hr ago", "2 hrs ago", "3 hrs ago", "5 hrs ago", "8 hrs ago",
  "1 day ago", "2 days ago", "3 days ago", "4 days ago", "5 days ago",
  "1 week ago", "2 weeks ago", "3 weeks ago", "1 month ago",
];

export const recentActivity: ActivityItem[] = Array.from({ length: 50 }, (_, i) => {
  const type = activityTypes[i % activityTypes.length];
  const titles = activityTitles[type];
  const title = titles[i % titles.length];
  const timeAgo = timeAgos[i % timeAgos.length];
  const points = type === "referral" ? 1000 : type === "purchase" ? [500, 750, 1500, 2000][i % 4] : type === "streak" ? [50, 200, 500][i % 3] : [100, 250, 500][i % 3];
  
  return {
    id: String(i + 1),
    type,
    title,
    description: `${type.charAt(0).toUpperCase() + type.slice(1)} • ${timeAgo}`,
    points,
    timeAgo,
    iconColor: activityColors[type],
  };
});

export const referralStats: ReferralStats = {
  friends: 12,
  coupons: 50,
};

// Generate 50 coupons
const discounts = ["5% OFF", "10% OFF", "15% OFF", "20% OFF", "25% OFF", "Free Drink", "Free Merch", "VIP Access"];
const descriptions = ["Any Concert", "Festival Pass", "Merch Store", "Workshop", "VIP Upgrade", "At Any Event", "Weekend Events", "Special Events"];

export const coupons: Coupon[] = Array.from({ length: 50 }, (_, i) => ({
  id: String(i + 1),
  discount: discounts[i % discounts.length],
  description: descriptions[i % descriptions.length],
  isRedeemed: i >= 40, // Last 10 are redeemed
}));

export const userReferralData: UserReferralData = {
  profile: userProfile,
  pointsBalance,
  recentActivity,
  referralStats,
  coupons,
};
