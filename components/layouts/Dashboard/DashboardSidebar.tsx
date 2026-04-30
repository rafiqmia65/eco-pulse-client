"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { User, MoreVertical, Settings } from "lucide-react";
import { AuthUser } from "@/types/auth.types";
import BrandLogo from "@/components/shared/BrandLogo/BrandLogo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { getDashboardNav } from "@/constants/dashboardNav";
import LogOutButton from "@/components/shared/LogOutButton/LogOutButton";

interface DashboardSidebarProps {
  user: AuthUser;
  className?: string;
}

export const DashboardSidebar = ({
  user,
  className,
}: DashboardSidebarProps) => {
  const pathname = usePathname();
  const sections = getDashboardNav(user.role);

  return (
    <aside className={cn("flex flex-col bg-background", className)}>
      <div className="p-2 hidden  border-b md:flex justify-center">
        <BrandLogo />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin">
        {sections.map((section) => (
          <div key={section.label} className="space-y-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">
              {section.label}
            </h3>
            <nav className="space-y-1">
              {section.items.map((item) => {
                const isActive =
                  item.href === "/dashboard" || item.href === "/admin"
                    ? pathname === item.href
                    : pathname === item.href ||
                      pathname.startsWith(`${item.href}/`);
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 group relative",
                      isActive
                        ? "bg-primary text-primary-foreground font-medium shadow-md"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-5 h-5",
                        isActive
                          ? "text-primary-foreground"
                          : "text-muted-foreground group-hover:text-accent-foreground",
                      )}
                    />
                    <span className="text-sm">{item.title}</span>
                    {isActive && (
                      <div className="absolute right-2 w-1.5 h-1.5 bg-primary-foreground rounded-full animate-pulse" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {user && (
        <div className="p-2 border-t mt-auto bg-accent/5">
          <div className="flex items-center justify-between p-2 rounded-lg">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
                {user.name?.[0] || user.email?.[0] || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {user.name || "User"}
                </p>
                <p className="text-xs text-muted-foreground truncate capitalize">
                  {user.role.toLowerCase()}
                </p>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" side="top" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/my-profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/dashboard/change-password"
                    className="cursor-pointer"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive cursor-pointer">
                  <LogOutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}
    </aside>
  );
};
