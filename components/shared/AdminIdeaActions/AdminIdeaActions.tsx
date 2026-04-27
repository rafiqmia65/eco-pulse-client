"use client";

import React, { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { IIdeaStatus } from "@/types/adminTypes/adminIdeas.types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  useApproveIdeaAdmin,
  useRejectIdeaAdmin,
} from "@/app/(DashboardLayout)/admin/ideas/[id]/_actions";

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
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [feedback, setFeedback] = useState("");

  const { mutate: approve, isPending: isApproving } = useApproveIdeaAdmin();
  const { mutate: reject, isPending: isRejecting } = useRejectIdeaAdmin();

  const handleApprove = () => {
    approve(ideaId);
  };

  const handleReject = () => {
    if (!feedback.trim()) return;
    reject(
      { id: ideaId, feedback },
      {
        onSuccess: () => {
          setRejectModalOpen(false);
          setFeedback("");
        },
      },
    );
  };

  const isPending = isApproving || isRejecting;

  const ApproveButton = (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={variant === "sidebar" ? "default" : "ghost"}
          size={variant === "sidebar" ? "default" : "icon"}
          disabled={isPending}
          onClick={handleApprove}
          className={cn(
            "transition-all",
            variant === "sidebar"
              ? "w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              : "h-8 w-8 rounded-lg hover:bg-emerald-500/10 hover:text-emerald-500",
            isPending && "opacity-50",
          )}
        >
          {isApproving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Check
                className={cn("w-4 h-4", variant === "sidebar" && "mr-2")}
              />
              {variant === "sidebar" && "Approve Idea"}
            </>
          )}
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
          disabled={isPending}
          onClick={() => setRejectModalOpen(true)}
          className={cn(
            "transition-all",
            variant === "sidebar"
              ? "w-full"
              : "h-8 w-8 rounded-lg hover:bg-rose-500/10 hover:text-rose-500",
            isPending && "opacity-50",
          )}
        >
          {isRejecting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <X className={cn("w-4 h-4", variant === "sidebar" && "mr-2")} />
              {variant === "sidebar" && "Reject Idea"}
            </>
          )}
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

  const RejectModal = (
    <Dialog open={rejectModalOpen} onOpenChange={setRejectModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reject Idea</DialogTitle>
          <DialogDescription>
            Provide feedback explaining why this idea is being rejected. This
            will be visible to the user.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="feedback">Feedback</Label>
            <Textarea
              id="feedback"
              placeholder="e.g. Lacks feasibility study..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="col-span-3 min-h-[100px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setRejectModalOpen(false)}
            disabled={isRejecting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleReject}
            disabled={isRejecting || !feedback.trim()}
          >
            {isRejecting ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : null}
            Reject Idea
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  if (variant === "sidebar") {
    return (
      <>
        {RejectModal}
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
      </>
    );
  }

  if (variant === "row") {
    return (
      <>
        {RejectModal}
        <div className={cn("flex items-center gap-1", className)}>
          {(status === "REVIEW" || status === "REJECTED") && ApproveButton}
          {status === "REVIEW" && RejectButton}
        </div>
      </>
    );
  }

  // Default: Dropdown
  return (
    <>
      {RejectModal}
      <div className={cn("flex items-center gap-2", className)}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 rounded-xl">
            <DropdownMenuItem
              className="gap-2 cursor-pointer rounded-lg"
              asChild
            >
              <Link
                href={`/admin/ideas/${ideaId}`}
                className="flex items-center w-full"
              >
                <ExternalLink className="w-4 h-4" /> View Idea
              </Link>
            </DropdownMenuItem>
            {(status === "REVIEW" || status === "REJECTED") && (
              <DropdownMenuItem
                disabled={isPending}
                onClick={handleApprove}
                className="gap-2 cursor-pointer rounded-lg text-emerald-600 focus:text-emerald-600"
              >
                {isApproving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Check className="w-4 h-4" />
                )}
                Approve
              </DropdownMenuItem>
            )}
            {status === "REVIEW" && (
              <DropdownMenuItem
                disabled={isPending}
                onClick={(e) => {
                  e.preventDefault();
                  setRejectModalOpen(true);
                }}
                className="gap-2 cursor-pointer rounded-lg text-rose-600 focus:text-rose-600"
              >
                {isRejecting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <X className="w-4 h-4" />
                )}
                Reject
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default AdminIdeaActions;
