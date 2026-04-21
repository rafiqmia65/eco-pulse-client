"use client";

import {
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  ShoppingCart,
  Users,
} from "lucide-react";
import { IIdeaAccessData } from "@/types/public/ideaDetails.types";
import { canPurchase, canVote, isOwnerOrAdmin } from "@/lib/access-utils";

export default function IdeaActionsPanel({ idea }: { idea: IIdeaAccessData }) {
  const isOwnerAdmin = isOwnerOrAdmin(idea.accessLevel);

  const voteScore = idea.upvotes - idea.downvotes;

  const isUpvoted = idea.currentUserVote === 1;
  const isDownvoted = idea.currentUserVote === -1;

  const voteDisabled = !canVote(idea.accessLevel) || isOwnerAdmin;
  const actionDisabled = isOwnerAdmin;
  const purchaseDisabled = !canPurchase(idea.accessLevel) || isOwnerAdmin;

  const handleUpvote = () => {
    if (voteDisabled) return;
    console.log("upvote logic");
  };

  const handleDownvote = () => {
    if (voteDisabled) return;
    console.log("downvote logic");
  };

  return (
    <div className="bg-card border border-border shadow-custom rounded-2xl p-5 flex flex-col gap-5">
      {/* HEADER */}
      <div>
        <h2 className="text-xl font-semibold">{idea.title}</h2>

        <div className="text-muted-foreground mt-2 space-y-1">
          <p>
            <span className="text-foreground font-medium">Author:</span>{" "}
            {idea.author.name}
          </p>
          <p>
            <span className="text-foreground font-medium">Category:</span>{" "}
            {idea.category.name}
          </p>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-3 text-sm">
        {/* UPVOTES */}
        <div
          className={`rounded-xl px-3 py-2 flex items-center justify-between border transition
    ${isUpvoted ? "bg-green-100 border-green-300" : "bg-muted"}`}
        >
          <div className="flex items-center gap-2">
            <ThumbsUp
              size={16}
              className={isUpvoted ? "text-green-600" : "text-muted-foreground"}
            />
            <span className="text-xs text-muted-foreground">Up</span>
          </div>

          <span
            className={`font-semibold ${isUpvoted ? "text-green-600" : ""}`}
          >
            {idea.upvotes}
          </span>
        </div>

        {/* DOWNVOTES */}
        <div
          className={`rounded-xl px-3 py-2 flex items-center justify-between border transition
    ${isDownvoted ? "bg-red-100 border-red-300" : "bg-muted"}`}
        >
          <div className="flex items-center gap-2">
            <ThumbsDown
              size={16}
              className={isDownvoted ? "text-red-600" : "text-muted-foreground"}
            />
            <span className="text-xs text-muted-foreground">Down</span>
          </div>

          <span
            className={`font-semibold ${isDownvoted ? "text-red-600" : ""}`}
          >
            {idea.downvotes}
          </span>
        </div>

        {/* SCORE */}
        <div className="bg-muted rounded-xl px-3 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Score</span>
          </div>
          <span className="font-semibold">{voteScore}</span>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="space-y-2">
        {/* UPVOTE */}
        <button
          disabled={voteDisabled}
          onClick={handleUpvote}
          className={`w-full flex items-center justify-center gap-2 py-2 rounded-xl border transition
          ${
            isUpvoted
              ? "bg-green-100 text-green-600 border-green-400"
              : "hover:bg-muted"
          }
          ${voteDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <ThumbsUp size={16} />
          {isUpvoted ? "Upvoted" : "Upvote"}
        </button>

        {/* DOWNVOTE */}
        <button
          disabled={voteDisabled}
          onClick={handleDownvote}
          className={`w-full flex items-center justify-center gap-2 py-2 rounded-xl border transition
          ${
            isDownvoted
              ? "bg-red-100 text-red-600 border-red-400"
              : "hover:bg-muted"
          }
          ${voteDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <ThumbsDown size={16} />
          {isDownvoted ? "Downvoted" : "Downvote"}
        </button>

        {/* BOOKMARK */}
        <button
          disabled={actionDisabled}
          className={`w-full flex items-center justify-center gap-2 py-2 rounded-xl border transition
          hover:bg-muted
          ${actionDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <Bookmark size={16} /> Watchlist
        </button>
      </div>

      {/* PURCHASE */}
      <div className="pt-3 border-t space-y-2">
        <button
          disabled={purchaseDisabled}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition
          ${
            purchaseDisabled
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "bg-primary text-primary-foreground hover:opacity-90"
          }`}
        >
          <ShoppingCart size={16} />
          Purchase Idea
        </button>

        <p className="text-center text-xs text-muted-foreground">
          {idea.isPaid ? `Price: $${idea.price}` : "Free Idea"}
        </p>
      </div>
    </div>
  );
}
