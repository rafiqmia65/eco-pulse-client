/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useTransition } from "react";
import { ThumbsUp, ThumbsDown, Users } from "lucide-react";
import { toast } from "sonner";

import { IIdeaAccessData } from "@/types/public/ideaDetails.types";
import { canVote, isOwnerOrAdmin } from "@/lib/access-utils";
import { toggleVoteAction } from "@/app/(PublicLayout)/ideas/[id]/_actions";

export default function IdeaVoteActions({ idea }: { idea: IIdeaAccessData }) {
  const isOwnerAdmin = isOwnerOrAdmin(idea.accessLevel);

  const [upvotes, setUpvotes] = useState(idea.upvotes);
  const [downvotes, setDownvotes] = useState(idea.downvotes);
  const [currentVote, setCurrentVote] = useState<number | null>(
    idea.currentUserVote,
  );

  const [isPending, startTransition] = useTransition();

  const voteDisabled = !canVote(idea.accessLevel) || isOwnerAdmin;

  const isUpvoted = !voteDisabled && currentVote === 1;
  const isDownvoted = !voteDisabled && currentVote === -1;

  const voteScore = upvotes - downvotes;

  const handleVote = (value: 1 | -1) => {
    if (voteDisabled || isPending) return;

    if (
      idea.accessLevel === "PUBLIC_FREE_GUEST" ||
      idea.accessLevel === "GUEST_PREVIEW"
    ) {
      toast.error("Please login first to vote");
      return;
    }

    const prevVote = currentVote;

    if (prevVote === value) {
      setCurrentVote(null);

      if (value === 1) setUpvotes((p) => p - 1);
      else setDownvotes((p) => p - 1);
    } else {
      setCurrentVote(value);

      if (value === 1) {
        setUpvotes((p) => p + 1);
        if (prevVote === -1) setDownvotes((p) => p - 1);
      } else {
        setDownvotes((p) => p + 1);
        if (prevVote === 1) setUpvotes((p) => p - 1);
      }
    }

    startTransition(async () => {
      try {
        const res = await toggleVoteAction(idea.id, value);
        toast.success(res?.message || "Vote updated");
      } catch (error: any) {
        toast.error(error?.message || "Vote failed");

        setUpvotes(idea.upvotes);
        setDownvotes(idea.downvotes);
        setCurrentVote(idea.currentUserVote);
      }
    });
  };

  return (
    <div className="space-y-4">
      {/* STATS */}
      <div className="grid grid-cols-3 gap-3 text-sm">
        {/* UP */}
        <div
          className={`rounded-xl px-3 py-2 flex justify-between border transition
          ${
            isUpvoted
              ? "bg-primary text-background border-border"
              : voteDisabled
                ? "bg-muted/50 text-muted-foreground cursor-not-allowed"
                : "bg-card hover:bg-muted"
          }`}
        >
          <ThumbsUp size={16} />
          <span>{upvotes}</span>
        </div>

        {/* DOWN */}
        <div
          className={`rounded-xl px-3 py-2 flex justify-between border transition
          ${
            isDownvoted
              ? "bg-primary text-background border-border"
              : voteDisabled
                ? "bg-muted/50 text-muted-foreground cursor-not-allowed"
                : "bg-card hover:bg-muted"
          }`}
        >
          <ThumbsDown size={16} />
          <span>{downvotes}</span>
        </div>

        {/* SCORE */}
        <div className="bg-muted rounded-xl px-3 py-2 flex justify-between text-foreground">
          <Users size={16} />
          <span>{voteScore}</span>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="space-y-2">
        <button
          disabled={voteDisabled}
          onClick={() => handleVote(1)}
          className={`w-full py-2 rounded-xl border flex items-center justify-center gap-2 transition
          ${
            isUpvoted
              ? "bg-primary text-background border-border"
              : voteDisabled
                ? "bg-muted/50 text-muted-foreground cursor-not-allowed"
                : "hover:bg-muted"
          }`}
        >
          <ThumbsUp size={16} />
          {isUpvoted ? "Upvoted" : "Upvote"}
        </button>

        <button
          disabled={voteDisabled}
          onClick={() => handleVote(-1)}
          className={`w-full py-2 rounded-xl border flex items-center justify-center gap-2 transition
          ${
            isDownvoted
              ? "bg-primary text-background border-border"
              : voteDisabled
                ? "bg-muted/50 text-muted-foreground cursor-not-allowed"
                : "hover:bg-muted"
          }`}
        >
          <ThumbsDown size={16} />
          {isDownvoted ? "Downvoted" : "Downvote"}
        </button>
      </div>
    </div>
  );
}
