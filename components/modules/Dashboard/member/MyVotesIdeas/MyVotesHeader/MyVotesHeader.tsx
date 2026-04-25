import React from "react";
import { ThumbsUp, ThumbsDown, Vote, TrendingUp, Lightbulb } from "lucide-react";
import { IVotesCounts } from "@/types/memberTypes/myVotes.types";

interface MyVotesHeaderProps {
  counts: IVotesCounts | undefined;
}

const MyVotesHeader: React.FC<MyVotesHeaderProps> = ({ counts }) => {
  const stats = [
    {
      label: "Total Votes",
      value: counts?.totalVotes || 0,
      icon: Vote,
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      label: "Upvotes",
      value: counts?.upvotes || 0,
      icon: ThumbsUp,
      color: "bg-green-500/10 text-green-600",
    },
    {
      label: "Downvotes",
      value: counts?.downvotes || 0,
      icon: ThumbsDown,
      color: "bg-red-500/10 text-red-600",
    },
    {
      label: "Ideas Voted",
      value: counts?.totalIdeasVoted || 0,
      icon: Lightbulb,
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

export default MyVotesHeader;
