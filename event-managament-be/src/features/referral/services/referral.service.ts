import { ReferralRepository } from "../repositories/referral.repository.js";

export class ReferralService {
  private referralRepository: ReferralRepository;

  constructor() {
    this.referralRepository = new ReferralRepository();
  }

  public getReferralData = async (userId: string) => {
    const user = await this.referralRepository.findUserWithReferralData(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Calculate points
    const currentPoints = user.points.reduce((acc: any, curr: any) => {
        const now = new Date();
        if (curr.expiresAt > now) {
            return acc + curr.remainingAmount;
        }
        return acc;
    }, 0);

    // Determines Tier
    const tier = "Bronze"; // Placeholder

    // Recent Activity
    const recentActivity = [
        ...user.referralsSent.map((ref: any) => ({
            id: ref.id,
            type: "referral" as const,
            title: "Referred a friend",
            description: `You referred a user`,
            points: 10000,
            timeAgo: ref.createdAt.toISOString(),
            iconColor: "text-green-500",
        })),
        ...user.referralsReceived.map((ref: any) => ({
             id: ref.id,
            type: "referral" as const,
            title: "Referred by friend",
            description: `You were referred`, 
            points: 10000, 
            timeAgo: ref.createdAt.toISOString(),
            iconColor: "text-blue-500",
        }))
    ].sort((a: any, b: any) => new Date(b.timeAgo).getTime() - new Date(a.timeAgo).getTime());


    // Coupons
    const coupons = user.coupons.map((uv: any) => ({
        id: uv.id,
        discount: `${uv.discountPercentage}%`,
        description: "Referral Discount",
        isRedeemed: uv.isUsed
    }));

    return {
      profile: {
        id: user.id,
        name: user.name,
        avatar: "https://placehold.co/400",
        memberSince: user.createdAt.toISOString(),
        location: "Indonesia",
        referralCode: user.referralCode,
        tier: tier,
      },
      pointsBalance: {
        current: currentPoints,
        nextTier: "Silver",
        nextTierProgress: 50,
        expiresIn: "2024-12-31",
      },
      recentActivity: recentActivity,
      referralStats: {
        friends: user.referralsSent.length,
        coupons: coupons.length,
      },
      coupons: coupons,
    };
  };
}
