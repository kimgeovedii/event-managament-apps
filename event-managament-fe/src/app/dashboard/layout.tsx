import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Hype",
  description: "Organizer dashboard for managing events, transactions, and analytics",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
