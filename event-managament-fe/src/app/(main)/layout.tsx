import MainNavbar from "@/components/layouts/home/MainNavbar";
import MainFooter from "@/components/layouts/home/MainFooter";
import { FloatingThemeToggle } from "@/features/theme";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-gray-900 dark:text-white font-[family-name:var(--font-display)]">
      <MainNavbar />
      <main className="flex-1">{children}</main>
      <MainFooter />
      <FloatingThemeToggle />
    </div>
  );
}
