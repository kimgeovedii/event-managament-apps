// Dashboard Data Service
// Replace dummy data imports with real API calls when ready

import { ChartFilter, ChartDataPoint } from "../types";
import {
  chartDataByFilter,
  statsData,
  referralData,
  activeEventsData,
  transactionsData,
} from "@/features/data-dummy";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// API-like functions - replace with real API calls later
export async function fetchChartData(filter: ChartFilter): Promise<ChartDataPoint[]> {
  await delay(50);
  return chartDataByFilter[filter];
}

export async function fetchStats() {
  await delay(50);
  return statsData;
}

export async function fetchReferral() {
  await delay(50);
  return referralData;
}

export async function fetchActiveEvents() {
  await delay(50);
  return activeEventsData;
}

export async function fetchTransactions() {
  await delay(50);
  return transactionsData;
}
