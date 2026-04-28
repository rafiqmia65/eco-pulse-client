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
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      label: "Active Users",
      value: stats.activeUsers,
      icon: UserCheck,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      label: "Blocked Users",
      value: stats.blockedUsers,
      icon: UserX,
      color: "text-red-600",
      bg: "bg-red-100",
    },
    {
      label: "Admin Users",
      value: stats.adminUsers,
      icon: ShieldCheck,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      label: "Member Users",
      value: stats.memberUsers,
      icon: UserCog,
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
      {statItems.map((item, index) => (
        <CustomCard
          key={index}
          className="p-5 flex items-center gap-4 border-none shadow-sm hover:shadow-md transition-shadow"
        >
          <div className={`${item.bg} p-3 rounded-xl`}>
            <item.icon className={`w-6 h-6 ${item.color}`} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">{item.label}</p>
            <h3 className="text-2xl font-bold text-gray-800">{item.value}</h3>
          </div>
        </CustomCard>
      ))}
    </div>
  );
};
