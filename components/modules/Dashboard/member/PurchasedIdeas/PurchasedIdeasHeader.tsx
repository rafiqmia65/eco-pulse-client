import React from "react";
import {
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Award,
  Calendar,
  Layers,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { IPurchasedIdeaCounts } from "@/types/memberTypes/purchasedIdeas.types";

interface PurchasedIdeasHeaderProps {
  counts: IPurchasedIdeaCounts;
}

const PurchasedIdeasHeader: React.FC<PurchasedIdeasHeaderProps> = ({ counts }) => {
  const stats = [
    {
      label: "Total Purchased",
      value: counts.totalPurchased,
      icon: ShoppingBag,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Total Spent",
      value: `$${counts.totalSpent.toFixed(2)}`,
      icon: DollarSign,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      label: "Average Spend",
      value: `$${counts.averageSpend.toFixed(2)}`,
      icon: TrendingUp,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      label: "Highest Purchase",
      value: `$${counts.highestPurchaseAmount.toFixed(2)}`,
      icon: Award,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
    },
    {
      label: "This Month",
      value: counts.thisMonthPurchases,
      icon: Calendar,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
    {
      label: "Categories",
      value: counts.uniqueCategoriesPurchased,
      icon: Layers,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Purchased Ideas</h1>
        <p className="text-muted-foreground text-sm">
          Browse and manage all the innovative ideas you&apos;ve invested in.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4 border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center text-center gap-2">
              <div
                className={`w-10 h-10 rounded-full ${stat.bg} flex items-center justify-center`}
              >
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                  {stat.label}
                </p>
                <p className="text-lg font-bold">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PurchasedIdeasHeader;
