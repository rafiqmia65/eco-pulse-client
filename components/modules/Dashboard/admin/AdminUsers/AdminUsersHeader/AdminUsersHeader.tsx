"use client";

import CustomCard from "@/components/shared/reusableComponents/Card";
import { IUserStats } from "@/types/adminTypes/user.types";
import { Users, UserCheck, UserX, ShieldCheck, UserCog } from "lucide-react";

interface AdminUsersHeaderProps {
  stats: IUserStats;
}

export const AdminUsersHeader = ({ stats }: AdminUsersHeaderProps) => {
  const statItems = [
    {
      label: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-100/80 dark:bg-blue-500/10",
      glow: "hover:shadow-blue-500/20",
    },
    {
      label: "Active Users",
      value: stats.activeUsers,
      icon: UserCheck,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-100/80 dark:bg-emerald-500/10",
      glow: "hover:shadow-emerald-500/20",
    },
    {
      label: "Blocked Users",
      value: stats.blockedUsers,
      icon: UserX,
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-100/80 dark:bg-rose-500/10",
      glow: "hover:shadow-rose-500/20",
    },
    {
      label: "Admin Users",
      value: stats.adminUsers,
      icon: ShieldCheck,
      color: "text-violet-600 dark:text-violet-400",
      bg: "bg-violet-100/80 dark:bg-violet-500/10",
      glow: "hover:shadow-violet-500/20",
    },
    {
      label: "Member Users",
      value: stats.memberUsers,
      icon: UserCog,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-100/80 dark:bg-amber-500/10",
      glow: "hover:shadow-amber-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {statItems.map((item, index) => (
        <CustomCard
          key={index}
          className={`p-5 relative overflow-hidden flex flex-col justify-center transition-all duration-300 ease-out bg-card/60 backdrop-blur-xl hover:-translate-y-1 hover:shadow-lg group ${item.glow}`}
        >
          {/* Subtle background glow effect */}
          <div
            className={`absolute -right-6 -top-6 w-32 h-32 opacity-[0.15] blur-3xl transition-opacity duration-500 group-hover:opacity-30 ${item.bg.split(" ")[0]} ${item.bg.split(" ")[1]?.replace("/10", "/30")}`}
          />

          <div className="flex items-center gap-4 relative z-10">
            <div
              className={`${item.bg} p-3 rounded-2xl ring-1 ring-inset  transition-transform duration-300 group-hover:scale-110`}
            >
              <item.icon className={`w-6 h-6 ${item.color}`} />
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-medium text-muted-foreground">
                {item.label}
              </p>
              <h3
                className={`text-2xl font-bold tracking-tight mt-0.5 ${item.color}`}
              >
                {item.value}
              </h3>
            </div>
          </div>
        </CustomCard>
      ))}
    </div>
  );
};
