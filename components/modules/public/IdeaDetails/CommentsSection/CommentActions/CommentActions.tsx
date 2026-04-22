"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreVertical } from "lucide-react";
import { useState } from "react";

interface Props {
  isOwner: boolean;
  isAdmin: boolean;
  isDeleted: boolean;
  isLoggedIn?: boolean;

  onEdit: () => void;
  onDelete: () => void;
  onRestore: () => void;
}

export default function CommentActions({
  isOwner,
  isAdmin,
  isDeleted,
  isLoggedIn = true,
  onEdit,
  onDelete,
  onRestore,
}: Props) {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (val: boolean) => {
    if (!isLoggedIn) {
      alert("Please login first");
      return;
    }
    setOpen(val);
  };

  const canEdit = isOwner;
  const canDelete = isOwner || isAdmin;
  const canRestore = isOwner || isAdmin;

  const hasAnyAction =
    (!isDeleted && (canEdit || canDelete)) || (isDeleted && canRestore);

  if (!isLoggedIn) return null;

  return (
    <DropdownMenu open={open} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <button className="p-1 rounded-md hover:bg-muted transition text-foreground">
          <MoreVertical size={18} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-36 bg-card border border-border"
      >
        {!isDeleted && canEdit && (
          <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
        )}

        {!isDeleted && canDelete && (
          <DropdownMenuItem onClick={onDelete} className="text-destructive">
            Delete
          </DropdownMenuItem>
        )}

        {isDeleted && canRestore && (
          <DropdownMenuItem onClick={onRestore} className="text-primary">
            Restore
          </DropdownMenuItem>
        )}

        {!hasAnyAction && (
          <DropdownMenuItem disabled>No actions</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
