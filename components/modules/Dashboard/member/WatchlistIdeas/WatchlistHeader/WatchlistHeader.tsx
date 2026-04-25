import React from "react";
import { Bookmark, Unlock, CreditCard, Layers } from "lucide-react";
import { IWatchListMeta } from "@/types/memberTypes/watchlist.types";

interface WatchlistHeaderProps {
  meta: IWatchListMeta | undefined;
}

const WatchlistHeader: React.FC<WatchlistHeaderProps> = ({ meta }) => {
  const stats = [
    {
      label: "Total Saved",
      value: meta?.total || 0,
      icon: Bookmark,
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      label: "Free Ideas",
      value: meta?.totalFreeIdeas || 0,
      icon: Layers,
      color: "bg-green-500/10 text-green-600",
    },
    {
      label: "Paid Ideas",
      value: meta?.totalPaidIdeas || 0,
      icon: CreditCard,
      color: "bg-purple-500/10 text-purple-600",
    },
    {
      label: "Unlocked",
      value: meta?.totalUnlockedIdeas || 0,
      icon: Unlock,
      color: "bg-orange-500/10 text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-card p-6 rounded-2xl border shadow-sm flex items-center gap-4 transition-all hover:shadow-md"
        >
          <div className={`p-3 rounded-xl ${stat.color}`}>
            <stat.icon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">
              {stat.label}
            </p>
            <h3 className="text-2xl font-bold">{stat.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WatchlistHeader;
