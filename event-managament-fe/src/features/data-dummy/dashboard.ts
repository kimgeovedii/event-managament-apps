// Dashboard Dummy Data
// This file contains mock data for dashboard development
// DELETE THIS FILE when switching to real API

import { DashboardData, ChartDataPoint, ChartFilter, StatData, ActiveEvent, Transaction } from "../dashboard/types";

// Chart data for different filters
export const chartDataByFilter: Record<ChartFilter, ChartDataPoint[]> = {
  daily: [
    { label: "00:00", value: 1.2, height: "20%" },
    { label: "04:00", value: 2.8, height: "40%" },
    { label: "08:00", value: 4.5, height: "60%" },
    { label: "12:00", value: 6.2, height: "80%" },
    { label: "16:00", value: 3.8, height: "50%" },
    { label: "20:00", value: 5.1, height: "68%" },
    { label: "Now", value: 7.5, height: "95%", isHighlight: true },
  ],
  monthly: [
    { label: "Week 1", value: 12.5, height: "45%" },
    { label: "Week 2", value: 18.2, height: "65%" },
    { label: "Week 3", value: 15.8, height: "55%" },
    { label: "Week 4", value: 22.4, height: "80%", isHighlight: true },
  ],
  yearly: [
    { label: "Jan", value: 45.2, height: "40%" },
    { label: "Feb", value: 52.1, height: "50%" },
    { label: "Mar", value: 48.5, height: "45%" },
    { label: "Apr", value: 61.2, height: "60%" },
    { label: "May", value: 55.8, height: "55%" },
    { label: "Jun", value: 72.4, height: "75%" },
    { label: "Jul", value: 68.9, height: "70%" },
    { label: "Aug", value: 82.5, height: "85%" },
    { label: "Sep", value: 75.3, height: "78%" },
    { label: "Oct", value: 88.1, height: "90%" },
    { label: "Nov", value: 92.4, height: "95%", isHighlight: true },
    { label: "Dec", value: 78.6, height: "80%" },
  ],
};

// Stats data
export const statsData: StatData[] = [
  {
    id: "tickets",
    title: "Total Tickets Sold",
    value: "1,245",
    trend: { value: "+12.5%", isPositive: true },
    iconType: "ticket",
  },
  {
    id: "revenue",
    title: "Total Revenue",
    value: "IDR 45.2M",
    trend: { value: "+8.2%", isPositive: true },
    iconType: "payment",
  },
  {
    id: "points",
    title: "Points Earned",
    value: "8,540",
    trend: { value: "0.0%", isPositive: null },
    iconType: "star",
  },
];

// Referral data
export const referralData = {
  signups: 342,
  code: "ALEX2023",
};

// Active events data
export const activeEventsData: ActiveEvent[] = [
  {
    id: "1",
    title: "Neon Nights Festival",
    date: "Aug 24",
    location: "Jakarta",
    image: "https://picsum.photos/seed/event1/100/100",
    status: "active",
  },
  {
    id: "2",
    title: "Tech Summit 2024",
    date: "Sep 10",
    location: "Bali",
    status: "draft",
  },
  {
    id: "3",
    title: "Indie Rock Showcase",
    date: "Oct 05",
    location: "Bandung",
    image: "https://picsum.photos/seed/event3/100/100",
    status: "selling",
  },
];

// Transactions data
export const transactionsData: Transaction[] = [
  {
    id: "#TRX-8902",
    customer: { name: "John Doe", initials: "JD", color: "bg-[#ee2b8c]/10 text-[#ee2b8c]" },
    event: "Neon Nights Festival",
    date: "Aug 24, 2023",
    amount: "IDR 250,000",
    status: "completed",
  },
  {
    id: "#TRX-8901",
    customer: { 
      name: "Sarah Smith", 
      initials: "SS", 
      color: "bg-[#8b5cf6]/10 text-[#8b5cf6]", 
      avatar: "https://picsum.photos/seed/sarah/100/100" 
    },
    event: "Neon Nights Festival",
    date: "Aug 24, 2023",
    amount: "IDR 500,000",
    status: "completed",
  },
  {
    id: "#TRX-8899",
    customer: { name: "Mike K.", initials: "MK", color: "bg-[#8b5cf6]/10 text-[#8b5cf6]" },
    event: "Tech Summit 2024",
    date: "Aug 23, 2023",
    amount: "IDR 1,200,000",
    status: "pending",
  },
];

// Full dashboard data (if needed)
export const dashboardData: DashboardData = {
  stats: statsData,
  referral: referralData,
  chartData: chartDataByFilter,
  activeEvents: activeEventsData,
  transactions: transactionsData,
};
