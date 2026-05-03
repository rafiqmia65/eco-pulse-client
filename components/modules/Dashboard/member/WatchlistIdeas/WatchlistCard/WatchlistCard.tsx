import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Lock,
  Bookmark,
  Star,
  Calendar,
} from "lucide-react";
import { IWatchListIdea } from "@/types/memberTypes/watchlist.types";
import CustomButton from "@/components/shared/reusableComponents/CustomButton";
import TiptapViewer from "@/components/shared/TiptapViewer/TiptapViewer";
import { formatTimeAgo } from "@/lib/formatDate";

interface WatchlistCardProps {
  idea: IWatchListIdea;
}

const WatchlistCard: React.FC<WatchlistCardProps> = ({ idea }) => {
  const isUpvoted = idea.currentUserVote === 1;
  const isDownvoted = idea.currentUserVote === -1;

  return (
    <div className="bg-card border border-border overflow-hidden shadow-custom hover:shadow-lg transition flex flex-col">
      {/* IMAGE */}
      <div className="relative">
        <Image
          src={idea.image || "/placeholder.png"}
          alt={idea.title}
          width={600}
          height={300}
          className="w-full h-44 object-cover"
        />

        {/* LOCK OVERLAY */}
        {idea.isLocked && (
          <div className="absolute inset-0 z-10 bg-black/50 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2">
            <div className="bg-background p-2 shadow">
              <Lock size={18} className="text-primary" />
            </div>
            {idea.isPaid && (
              <span className="bg-primary text-primary-foreground text-xs px-3 py-1">
                PREMIUM CONTENT
              </span>
            )}
          </div>
        )}

        {/* LEFT TOP: OWNER / PURCHASED badges */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-1">
          {idea.isOwner && (
            <span className="bg-primary text-primary-foreground text-[11px] px-2 py-1">
              OWNER
            </span>
          )}
          {idea.hasPurchased && (
            <span className="bg-primary text-primary-foreground text-[11px] px-2 py-1 flex items-center gap-1">
              <Star size={11} className="fill-white" />
              Already Purchased
            </span>
          )}
        </div>

        {/* RIGHT TOP: vote status badge */}
        <div className="absolute top-3 right-3 z-20">
          {isUpvoted && (
            <span className="flex items-center gap-1 bg-primary text-primary-foreground text-[11px] px-2 py-1 font-semibold uppercase tracking-wide">
              <ThumbsUp size={11} />
              Upvoted
            </span>
          )}
          {isDownvoted && (
            <span className="flex items-center gap-1 bg-primary text-primary-foreground text-[11px] px-2 py-1 font-semibold uppercase tracking-wide">
              <ThumbsDown size={11} />
              Downvoted
            </span>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* TITLE */}
        <h3 className="text-lg font-semibold text-foreground">{idea.title}</h3>

        {/* DESCRIPTION */}
        <div className="text-sm text-muted-foreground line-clamp-2">
          <TiptapViewer content={idea.description} />
        </div>

        {/* META */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="bg-muted px-2 py-1">{idea.category.name}</span>
          <div className="flex items-center gap-2">
            <span className="text-foreground font-medium">Author:</span>
            <span className="bg-muted px-2 py-1">{idea.author.name}</span>
          </div>
        </div>

        {/* POSTED DATE */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar size={12} />
          <span>Posted {formatTimeAgo(idea.createdAt)}</span>
        </div>

        {/* SOLUTION */}
        <div className="bg-muted/40 border border-border p-3 text-xs text-muted-foreground">
          <TiptapViewer content={idea.solution} />
        </div>

        {/* VOTE + COMMENTS + WATCHLIST */}
        <div className="flex items-center justify-between text-xs pt-1">
          <div className="flex items-center gap-3 text-muted-foreground">
            {/* UPVOTE */}
            <span
              className={`flex items-center gap-1 transition ${
                isUpvoted
                  ? "text-primary font-semibold"
                  : "text-muted-foreground"
              }`}
            >
              <ThumbsUp
                size={14}
                className={
                  isUpvoted
                    ? "text-primary fill-primary stroke-primary"
                    : "text-muted-foreground"
                }
              />
              {idea.upvotes}
            </span>

            {/* DOWNVOTE */}
            <span
              className={`flex items-center gap-1 transition ${
                isDownvoted
                  ? "text-primary font-semibold"
                  : "text-muted-foreground"
              }`}
            >
              <ThumbsDown
                size={14}
                className={
                  isDownvoted
                    ? "text-primary fill-primary stroke-primary"
                    : "text-muted-foreground"
                }
              />
              {idea.downvotes}
            </span>

            {/* COMMENTS */}
            <span className="flex items-center gap-1">
              <MessageCircle size={14} />
              {idea.commentsCount}
            </span>
          </div>

          {/* WATCHLIST */}
          <div className="flex items-center gap-1">
            <Bookmark
              size={14}
              className={
                idea.isWatchlisted
                  ? "fill-primary text-primary"
                  : "text-muted-foreground"
              }
            />
            {idea.watchListCount}
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/60">
          {/* PRICE */}
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>Price:</span>
            <span
              className={`font-semibold ${
                idea.isPaid ? "text-primary" : "text-foreground"
              }`}
            >
              {idea.isPaid ? `$${idea.price}` : "Free"}
            </span>
          </div>

          {/* CTA */}
          <Link href={`/ideas/${idea.id}`}>
            <CustomButton className="px-4 py-2 text-sm">
              See Details
            </CustomButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WatchlistCard;
