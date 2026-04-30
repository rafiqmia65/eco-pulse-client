/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useTransition } from "react";
import { Bookmark } from "lucide-react";
import { toast } from "sonner";

import { IIdeaAccessData } from "@/types/public/ideaDetails.types";
import { isOwnerOrAdmin } from "@/lib/access-utils";
import { toggleWatchListAction } from "@/app/(PublicLayout)/ideas/[id]/_actions";

export default function IdeaWatchListButton({
  idea,
}: {
  idea: IIdeaAccessData;
}) {
  const isOwnerAdmin = isOwnerOrAdmin(idea.accessLevel);

  const [isInWatchList, setIsInWatchList] = useState<boolean>(
    idea.isInWatchList ?? false,
  );

  const [count, setCount] = useState<number>(idea.watchListCount ?? 0);

  const [isPending, startTransition] = useTransition();

  const disabled = isOwnerAdmin || isPending;

  const handleToggle = () => {
    if (disabled) return;

    if (
      idea.accessLevel === "PUBLIC_FREE_GUEST" ||
      idea.accessLevel === "GUEST_PREVIEW"
    ) {
      toast.error("Please login first to add to watchlist");
      return;
    }

    const prevState = isInWatchList;

    setIsInWatchList(!prevState);
    setCount((prev) => (prevState ? prev - 1 : prev + 1));

    startTransition(async () => {
      try {
        const res = await toggleWatchListAction(idea.id);
        toast.success(res?.message || "Watchlist updated");
      } catch (error: any) {
        toast.error(error?.message || "Watchlist failed");

        setIsInWatchList(prevState);
        setCount(idea.watchListCount ?? 0);
      }
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={disabled}
      className={`w-full flex items-center justify-center gap-2 py-2 rounded-xl border transition
        ${
          isInWatchList
            ? "bg-accent text-foreground border-border"
            : "hover:bg-muted text-foreground"
        }
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      <Bookmark size={16} />
      {isInWatchList ? "In Watchlist" : "Add to Watchlist"} ({count})
    </button>
  );
}
