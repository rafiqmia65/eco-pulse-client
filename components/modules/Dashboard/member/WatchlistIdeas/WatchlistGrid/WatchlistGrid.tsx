import React from "react";
import WatchlistCard from "../WatchlistCard/WatchlistCard";
import { IWatchListIdea } from "@/types/memberTypes/watchlist.types";


interface WatchlistGridProps {
  ideas: IWatchListIdea[];
  isLoading: boolean;
}

const WatchlistGrid: React.FC<WatchlistGridProps> = ({ ideas, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-96 w-full rounded-2xl bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  if (ideas.length === 0) {
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
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold">No saved ideas found</h3>
        <p className="text-muted-foreground max-w-xs text-center mt-2">
          Your watchlist is empty. Start exploring and save ideas to see them here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {ideas.map((idea) => (
        <WatchlistCard key={idea.id} idea={idea} />
      ))}
    </div>
  );
};

export default WatchlistGrid;
