/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { MoreVertical, Edit, Trash2, Eye, Send, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useIdeaManagement } from "@/hooks/useIdeaManagement";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface IdeaActionButtonsProps {
  idea: {
    id: string;
    status: string;
  };
  variant?: "dropdown" | "sidebar" | "row";
  redirectAfterDelete?: string;
}

export const IdeaActionButtons: React.FC<IdeaActionButtonsProps> = ({
  idea,
  variant = "dropdown",
  redirectAfterDelete,
}) => {
  const router = useRouter();
  const { submitMutation, deleteMutation } = useIdeaManagement();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const isSubmitting = submitMutation.isPending;
  const isDeleting = deleteMutation.isPending;

  const handleSubmit = (id: string) => {
    submitMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Idea submitted for review successfully");
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message ||
            error?.message ||
            "Failed to submit idea",
        );
      },
    });
  };

  const confirmDelete = () => {
    deleteMutation.mutate(idea.id, {
      onSuccess: () => {
        toast.success("Idea deleted successfully");
        setDeleteDialogOpen(false);
        if (redirectAfterDelete) router.push(redirectAfterDelete);
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message ||
            error?.message ||
            "Failed to delete idea",
        );
      },
    });
  };

  /** Shared AlertDialog */
  const DeleteConfirmDialog = (
    <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <AlertDialogContent className="sm:max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Idea</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this idea? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={confirmDelete}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Trash2 className="w-4 h-4 mr-2" />
            )}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  if (variant === "sidebar") {
    return (
      <>
        {DeleteConfirmDialog}
        <div className="bg-card border rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-md transition">
          <h3 className="font-semibold text-sm">Actions</h3>

          {idea.status === "DRAFT" && (
            <Button
              onClick={() => handleSubmit(idea.id)}
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              Submit for Review
            </Button>
          )}

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => router.push(`/dashboard/ideas/${idea.id}/edit`)}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Idea
            </Button>
            <Button
              variant="destructive"
              onClick={() => setDeleteDialogOpen(true)}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Trash2 className="w-4 h-4 mr-2" />
              )}
              Delete
            </Button>
          </div>
        </div>
      </>
    );
  }

  if (variant === "row") {
    return (
      <>
        {DeleteConfirmDialog}
        <div className="flex items-center gap-2">
          {idea.status === "DRAFT" && (
            <Button
              size="sm"
              onClick={() => handleSubmit(idea.id)}
              disabled={isSubmitting}
              className="h-8 text-xs font-semibold"
            >
              {isSubmitting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
              ) : (
                <Send className="w-3.5 h-3.5 mr-1.5" />
              )}
              Publish
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            asChild
            className="h-8 text-xs font-semibold"
          >
            <Link href={`/dashboard/ideas/${idea.id}`}>
              <Eye className="w-3.5 h-3.5 mr-1.5" />
              See more
            </Link>
          </Button>
        </div>
      </>
    );
  }

  // Default: Dropdown
  return (
    <>
      {DeleteConfirmDialog}
      <div className="flex items-center gap-2">
        {variant === "dropdown" && (
          <Button
            size="sm"
            variant="outline"
            asChild
            className="h-8 text-xs font-semibold px-3"
          >
            <Link href={`/dashboard/ideas/${idea.id}`}>
              <Eye className="w-3.5 h-3.5 mr-1.5" />
              <span>See more</span>
            </Link>
          </Button>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 rounded-xl">
            {idea.status === "DRAFT" && (
              <DropdownMenuItem
                onClick={() => handleSubmit(idea.id)}
                disabled={isSubmitting}
                className="gap-2 cursor-pointer rounded-lg text-primary focus:text-primary font-semibold"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                Submit for Review
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              className="gap-2 cursor-pointer rounded-lg"
              asChild
            >
              <Link
                href={`/dashboard/ideas/${idea.id}`}
                className="flex items-center w-full"
              >
                <Eye className="w-4 h-4" /> View Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="gap-2 cursor-pointer rounded-lg"
              onClick={() => router.push(`/dashboard/ideas/${idea.id}/edit`)}
            >
              <Edit className="w-4 h-4" /> Edit Idea
            </DropdownMenuItem>
            <DropdownMenuItem
              className="gap-2 cursor-pointer text-red-600 focus:text-red-600 rounded-lg"
              onClick={() => setDeleteDialogOpen(true)}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};
