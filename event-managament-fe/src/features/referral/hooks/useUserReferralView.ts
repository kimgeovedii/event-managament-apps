import { useState, useCallback } from "react";
import { useUserReferral } from "../hooks";

export const useUserReferralView = () => {
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

  return {
    data,
    loading,
    error,
    copied,
    activityDisplayCount,
    couponDisplayCount,
    activityLoading,
    couponLoading,
    handleCopyCode,
    loadMoreActivities,
    loadMoreCoupons
  };
};
