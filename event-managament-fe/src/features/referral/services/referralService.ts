// User Referral Service
// Replace dummy data imports with real API calls when ready

import { UserReferralData } from "../types";
import { userReferralData } from "@/features/data-dummy";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchUserReferralData(): Promise<UserReferralData> {
  await delay(100);
  return userReferralData;
}
