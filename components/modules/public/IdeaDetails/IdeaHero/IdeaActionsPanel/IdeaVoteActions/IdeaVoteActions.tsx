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

  const isUpvoted = currentVote === 1;
  const isDownvoted = currentVote === -1;

  const voteScore = upvotes - downvotes;

  const handleVote = (value: 1 | -1) => {
    if (voteDisabled || isPending) return;

    const prevVote = currentVote;

    // ================= OPTIMISTIC UPDATE =================
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

    // ================= SERVER CALL =================
    startTransition(async () => {
      try {
        const res = await toggleVoteAction(idea.id, value);

        toast.success(res?.message || "Vote updated");
      } catch (error: any) {
        toast.error(error?.message || "Vote failed");

        // rollback
        setUpvotes(idea.upvotes);
        setDownvotes(idea.downvotes);
        setCurrentVote(idea.currentUserVote);
      }
    });
  };

  return (
    <div className="bg-card border border-border shadow-custom rounded-2xl p-5 flex flex-col gap-5">
      {/* ================= STATS ================= */}
      <div className="grid grid-cols-3 gap-3 text-sm">
        {/* UP */}
        <div
          className={`rounded-xl px-3 py-2 flex items-center justify-between border transition
          ${isUpvoted ? "bg-green-100 border-green-300" : "bg-muted"}`}
        >
          <ThumbsUp
            size={16}
            className={isUpvoted ? "text-green-600" : "text-muted-foreground"}
          />
          <span>{upvotes}</span>
        </div>

        {/* DOWN */}
        <div
          className={`rounded-xl px-3 py-2 flex items-center justify-between border transition
          ${isDownvoted ? "bg-red-100 border-red-300" : "bg-muted"}`}
        >
          <ThumbsDown
            size={16}
            className={isDownvoted ? "text-red-600" : "text-muted-foreground"}
          />
          <span>{downvotes}</span>
        </div>

        {/* SCORE */}
        <div className="bg-muted rounded-xl px-3 py-2 flex items-center justify-between">
          <Users size={16} />
          <span>{voteScore}</span>
        </div>
      </div>

      {/* ================= ACTIONS ================= */}
      <div className="space-y-2">
        <button
          disabled={voteDisabled}
          onClick={() => handleVote(1)}
          className={`w-full flex items-center justify-center gap-2 py-2 rounded-xl border transition
          ${
            isUpvoted
              ? "bg-green-100 text-green-600 border-green-400"
              : "hover:bg-muted"
          }
          ${voteDisabled && "opacity-50 cursor-not-allowed"}`}
        >
          <ThumbsUp size={16} />
          {isUpvoted ? "Upvoted" : "Upvote"}
        </button>

        <button
          disabled={voteDisabled}
          onClick={() => handleVote(-1)}
          className={`w-full flex items-center justify-center gap-2 py-2 rounded-xl border transition
          ${
            isDownvoted
              ? "bg-red-100 text-red-600 border-red-400"
              : "hover:bg-muted"
          }
          ${voteDisabled && "opacity-50 cursor-not-allowed"}`}
        >
          <ThumbsDown size={16} />
          {isDownvoted ? "Downvoted" : "Downvote"}
        </button>
      </div>
    </div>
  );
}
