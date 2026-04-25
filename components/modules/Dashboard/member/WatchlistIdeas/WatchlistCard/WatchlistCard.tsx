import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Lock,
  Unlock,
  MessageSquare,
  ThumbsUp,
  ArrowRight,
  User,
  Calendar,
  Layers,
} from "lucide-react";
import { IWatchListIdea } from "@/types/memberTypes/watchlist.types";
import { Badge } from "@/components/ui/badge";
import { formatTimeAgo } from "@/lib/formatDate";

interface WatchlistCardProps {
  idea: IWatchListIdea;
}

const WatchlistCard: React.FC<WatchlistCardProps> = ({ idea }) => {
  return (
    <div className="group bg-card rounded-2xl border overflow-hidden transition-all hover:shadow-xl hover:border-primary/20 flex flex-col h-full">
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden">
        {idea.image ? (
          <Image
            src={idea.image}
            alt={idea.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <Layers className="w-12 h-12 text-muted-foreground/20" />
          </div>
        )}

        {/* Status Overlay */}
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge
            variant={idea.isPaid ? "secondary" : "default"}
            className="font-semibold px-3 py-1 backdrop-blur-md bg-white/90"
          >
            {idea.isPaid ? `$${idea.price}` : "Free"}
          </Badge>
          <Badge
            className={`font-semibold px-3 py-1 ${idea.isLocked ? "bg-orange-500 hover:bg-orange-600" : "bg-green-500 hover:bg-green-600"}`}
          >
            {idea.isLocked ? (
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" /> Locked
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Unlock className="w-3.5 h-3.5" /> Unlocked
              </span>
            )}
          </Badge>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] uppercase tracking-wider font-bold text-primary px-2 py-0.5 rounded bg-primary/10">
            {idea.category.name}
          </span>
        </div>

        <h3 className="text-xl font-bold mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {idea.title}
        </h3>

        <p className="text-muted-foreground text-sm line-clamp-2 mb-4 leading-relaxed">
          {idea.description}
        </p>

        <div className="mt-auto space-y-4">
          {/* Solution Snippet */}
          <div className="bg-muted/30 p-3 rounded-xl border border-dashed border-muted-foreground/20">
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-1">
              Proposed Solution
            </p>
            <p className="text-xs line-clamp-2 italic text-muted-foreground/80">
              {idea.solution}
            </p>
          </div>

          {/* Author & Date */}
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
            <div className="flex items-center gap-1.5 font-medium">
              <User className="w-3.5 h-3.5" />
              <span className="line-clamp-1">{idea.author.name}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {formatTimeAgo(idea.createdAt)}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="p-4 bg-muted/20 border-t flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-blue-500">
            <ThumbsUp className="w-4 h-4" />
            <span className="text-xs font-bold">{idea.votesCount}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-green-500">
            <MessageSquare className="w-4 h-4" />
            <span className="text-xs font-bold">{idea.commentsCount}</span>
          </div>
        </div>

        <Link
          href={`/ideas/${idea.id}`}
          className="flex items-center gap-1.5 text-xs font-bold text-primary hover:gap-2.5 transition-all"
        >
          View Details
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default WatchlistCard;
