import React from "react";
import MyVotesCard from "../MyVotesCard/MyVotesCard";
import { IVote } from "@/types/memberTypes/myVotes.types";

interface MyVotesGridProps {
  votes: IVote[];
  isLoading: boolean;
}

const MyVotesGrid: React.FC<MyVotesGridProps> = ({ votes, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-96 w-full rounded-2xl bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  if (votes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-card border rounded-2xl border-dashed">
        <div className="bg-muted p-4 rounded-full mb-4">
          <svg
            className="w-12 h-12 text-muted-foreground/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold">No voted ideas found</h3>
        <p className="text-muted-foreground max-w-xs text-center mt-2">
          You haven&apos;t voted on any ideas yet. Explore the community and share your thoughts!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {votes.map((vote) => (
        <MyVotesCard key={vote.id} vote={vote} />
      ))}
    </div>
  );
};

export default MyVotesGrid;
