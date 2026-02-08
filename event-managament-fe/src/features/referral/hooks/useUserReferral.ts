// User Referral Hooks
"use client"
import { useState, useEffect, useCallback } from "react";
import { UserReferralData } from "../types";
import { fetchUserReferralData } from "../services/referralService";

export function useUserReferral() {
  const [data, setData] = useState<UserReferralData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await fetchUserReferralData();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch data"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { data, loading, error, refetch: loadData };
}
