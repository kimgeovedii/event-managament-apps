// Mock Data - Promotions
// Simulates API response structure

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discountValue: string;
  discountType: 'percentage' | 'fixed' | 'vip';
  icon: string;
  buttonText: string;
  buttonAction: string;
  badge?: string;
  color: 'purple' | 'cyan' | 'pink';
}

export interface PromotionsResponse {
  data: Promotion[];
}

export const mockPromotions: PromotionsResponse = {
  data: [
    {
      id: "promo-referral",
      title: "Referral Squad",
      description: "Invite your crew and get 10,000 hype points plus 10% off your next booking.",
      discountValue: "10%",
      discountType: "percentage",
      icon: "loyalty",
      buttonText: "Get Link",
      buttonAction: "/referral",
      badge: "Hot",
      color: "purple",
    },
    {
      id: "promo-student",
      title: "Student Pass",
      description: "Valid student ID? Unlock 20% off all weekday workshops and art events.",
      discountValue: "20%",
      discountType: "percentage",
      icon: "school",
      buttonText: "Verify Now",
      buttonAction: "/student-verify",
      badge: "Limited",
      color: "cyan",
    },
    {
      id: "promo-vip",
      title: "Early Access",
      description: "Join the waitlist for Hype Fest 2024. First 100 get VIP backstage passes.",
      discountValue: "VIP",
      discountType: "vip",
      icon: "rocket_launch",
      buttonText: "Join Waitlist",
      buttonAction: "/vip-waitlist",
      color: "pink",
    },
  ],
};

// Simulated API fetch function
export const fetchPromotions = async (): Promise<PromotionsResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockPromotions;
};
