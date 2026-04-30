import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Lock,
  MessageSquare,
  ThumbsUp,
} from "lucide-react";
import { IWatchListIdea } from "@/types/memberTypes/watchlist.types";
import { formatTimeAgo } from "@/lib/formatDate";

interface WatchlistCardProps {
  idea: IWatchListIdea;
}

const WatchlistCard: React.FC<WatchlistCardProps> = ({ idea }) => {
  return (
    <div className="bg-card border border-border overflow-hidden shadow-sm hover:shadow-md transition flex flex-col h-full rounded-xl">
      {/* IMAGE */}
      <div className="relative">
        <Image
          src={idea.image || "/placeholder.png"}
          alt={idea.title}
          width={600}
          height={300}
          className="w-full h-40 object-cover"
        />

        {idea.isPaid && (
          <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded">
            Premium
          </span>
        )}

        {idea.isLocked && (
          <span className="absolute top-2 left-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded flex items-center gap-1">
            <Lock size={10} /> Locked
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        {/* CATEGORY + PRICE */}
        <div className="flex items-center justify-between">
          <span className="bg-muted px-2 py-0.5 rounded text-[10px] text-muted-foreground font-medium">
            {idea.category?.name}
          </span>
          <span className="font-bold text-sm text-primary">
            {idea.isPaid ? `$${idea.price}` : "Free"}
          </span>
        </div>

        {/* TITLE */}
        <h3 className="text-base font-bold text-foreground line-clamp-1 leading-tight">{idea.title}</h3>

        {/* DESCRIPTION */}
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {idea.description}
        </p>

        {/* SOLUTION (Compact) */}
        <div className="bg-muted/30 border border-border/50 p-2 rounded text-[11px] text-muted-foreground mt-1">
          <p className="line-clamp-1 italic">
            <span className="font-semibold text-foreground not-italic">Sol:</span> {idea.solution}
          </p>
        </div>

        {/* FOOTER */}
        <div className="mt-auto pt-3 border-t flex flex-col gap-3">
          <div className="flex items-center justify-between text-[11px] text-muted-foreground font-medium">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1" title="Votes">
                <ThumbsUp size={12} className="text-primary/70" />
                {idea.votesCount || 0}
              </span>

              <span className="flex items-center gap-1" title="Comments">
                <MessageSquare size={12} className="text-primary/70" />
                {idea.commentsCount}
              </span>
            </div>
            <span>{formatTimeAgo(idea.createdAt)}</span>
          </div>

          <Link href={`/ideas/${idea.id}`} className="w-full">
            <button className="w-full py-2 text-xs rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition font-bold uppercase tracking-wider">
              See Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WatchlistCard;
