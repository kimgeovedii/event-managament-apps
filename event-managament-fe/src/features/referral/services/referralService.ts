import { UserReferralData } from "../types";
import apiFetch from "../../../services/apiFetch";

export async function fetchUserReferralData(): Promise<UserReferralData> {
  const response = await apiFetch.get("/referrals");
  return response.data;
}
