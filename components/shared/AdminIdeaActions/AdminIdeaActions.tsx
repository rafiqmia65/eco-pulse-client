"use client";

import React from "react";
import { Check, X, Loader2, MoreVertical, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IIdeaStatus } from "@/types/adminTypes/adminIdeas.types";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface AdminIdeaActionsProps {
  ideaId: string;
  status: IIdeaStatus;
  variant?: "row" | "sidebar" | "dropdown";
  className?: string;
}

const AdminIdeaActions = ({
  ideaId,
  status,
  variant = "dropdown",
  className,
}: AdminIdeaActionsProps) => {
  const ApproveButton = (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={variant === "sidebar" ? "default" : "ghost"}
          size={variant === "sidebar" ? "default" : "icon"}
          className={cn(
            "transition-all",
            variant === "sidebar"
              ? "w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              : "h-8 w-8 rounded-lg hover:bg-emerald-500/10 hover:text-emerald-500",
          )}
        >
          {/* {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Check
                className={cn("w-4 h-4", variant === "sidebar" && "mr-2")}
              />
              {variant === "sidebar" && "Approve Idea"}
            </>
          )} */}
        </Button>
      </TooltipTrigger>
      {variant === "row" && (
        <TooltipContent
          side="top"
          className="bg-emerald-500 text-white text-[10px] py-1 px-2"
        >
          Approve Idea
        </TooltipContent>
      )}
    </Tooltip>
  );

  const RejectButton = (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={variant === "sidebar" ? "destructive" : "ghost"}
          size={variant === "sidebar" ? "default" : "icon"}
          className={cn(
            "transition-all",
            variant === "sidebar"
              ? "w-full"
              : "h-8 w-8 rounded-lg hover:bg-rose-500/10 hover:text-rose-500",
          )}
        >
          {/* {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <X className={cn("w-4 h-4", variant === "sidebar" && "mr-2")} />
              {variant === "sidebar" && "Reject Idea"}
            </>
          )} */}
        </Button>
      </TooltipTrigger>
      {variant === "row" && (
        <TooltipContent
          side="top"
          className="bg-rose-500 text-white text-[10px] py-1 px-2"
        >
          Reject Idea
        </TooltipContent>
      )}
    </Tooltip>
  );

  if (variant === "sidebar") {
    return (
      <div
        className={cn(
          "bg-card border rounded-2xl p-6 space-y-4 shadow-sm",
          className,
        )}
      >
        <h3 className="font-semibold text-sm">Moderation Actions</h3>
        <div className="space-y-3">
          {(status === "REVIEW" || status === "REJECTED") && ApproveButton}
          {status === "REVIEW" && RejectButton}
        </div>
      </div>
    );
  }

  if (variant === "row") {
    return (
      <div className={cn("flex items-center gap-1", className)}>
        {(status === "REVIEW" || status === "REJECTED") && ApproveButton}
        {status === "REVIEW" && RejectButton}
      </div>
    );
  }

  // Default: Dropdown
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors">
            <MoreVertical className="w-4 h-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 rounded-xl">
          <DropdownMenuItem className="gap-2 cursor-pointer rounded-lg" asChild>
            <Link
              href={`/admin/ideas/${ideaId}`}
              className="flex items-center w-full"
            >
              <ExternalLink className="w-4 h-4" /> View Idea
            </Link>
          </DropdownMenuItem>
          {(status === "REVIEW" || status === "REJECTED") && (
            <DropdownMenuItem className="gap-2 cursor-pointer rounded-lg text-emerald-600 focus:text-emerald-600">
              {/* {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Check className="w-4 h-4" />
              )} */}
              Approve
            </DropdownMenuItem>
          )}
          {status === "REVIEW" && (
            <DropdownMenuItem
              // onClick={() => handleAction("REJECTED")}
              // disabled={isPending}
              className="gap-2 cursor-pointer rounded-lg text-rose-600 focus:text-rose-600"
            >
              {/* {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <X className="w-4 h-4" />
              )} */}
              Reject
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AdminIdeaActions;
