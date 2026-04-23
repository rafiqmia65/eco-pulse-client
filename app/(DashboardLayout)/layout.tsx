import { getUserInfo } from "@/services/auth/auth.services";
import { DashboardSidebar } from "@/components/layouts/Dashboard/DashboardSidebar";
import { DashboardNavbar } from "@/components/layouts/Dashboard/DashboardNavbar";
import { redirect } from "next/navigation";

/**
 * DashboardLayout Component
 * Provides the core structural shell for the dashboard, including a responsive
 * sticky sidebar and a fixed-height navbar. Handles internal scrolling for the
 * main content area to prevent double scrollbars.
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserInfo();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-muted/30">
      <div className="hidden md:flex shrink-0">
        <DashboardSidebar
          user={user}
          className="w-64 border-r h-screen sticky top-0"
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        <DashboardNavbar user={user} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 lg:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}

