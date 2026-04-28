"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, UserCheck, UserX, ShieldCheck, Eye } from "lucide-react";
import { IUser } from "@/types/adminTypes/user.types";
import {
  useMakeAdmin,
  useBlockUser,
  useUnblockUser,
} from "@/app/(DashboardLayout)/admin/users/_actions";
import { role } from "@/constants/roles";
import CustomButton from "@/components/shared/reusableComponents/CustomButton";
import { UserDetailsModal } from "../UserDetailsModal/UserDetailsModal";
import { useState } from "react";

interface AdminUserActionsProps {
  user: IUser;
}

export const AdminUserActions = ({ user }: AdminUserActionsProps) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { mutate: makeAdmin, isPending: isRoleUpdating } = useMakeAdmin();
  const { mutate: blockUser, isPending: isBlocking } = useBlockUser();
  const { mutate: unblockUser, isPending: isUnblocking } = useUnblockUser();

  const handleMakeAdmin = () => {
    makeAdmin(user.id);
  };

  const handleBlockUser = () => {
    blockUser(user.id);
  };

  const handleUnblockUser = () => {
    unblockUser(user.id);
  };

  const isUpdating = isRoleUpdating || isBlocking || isUnblocking;

  return (
    <div className="flex items-center justify-end gap-2">
      <CustomButton
        variant="ghost"
        title="See Details"
        onClick={() => setIsDetailsOpen(true)}
      >
        <Eye className="h-4 w-4" />
        <span>See Details</span>
      </CustomButton>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0" disabled={isUpdating}>
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 rounded-xl">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {user.role !== role.ADMIN && (
            <DropdownMenuItem
              onClick={handleMakeAdmin}
              className="gap-2 cursor-pointer"
            >
              <ShieldCheck className="h-4 w-4 text-purple-600" />
              <span>Make Admin</span>
            </DropdownMenuItem>
          )}

          {user.status === "ACTIVE" ? (
            <DropdownMenuItem
              onClick={handleBlockUser}
              className="gap-2 cursor-pointer text-red-600 focus:text-red-600"
            >
              <UserX className="h-4 w-4" />
              <span>Block User</span>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onClick={handleUnblockUser}
              className="gap-2 cursor-pointer text-green-600 focus:text-green-600"
            >
              <UserCheck className="h-4 w-4" />
              <span>Unblock User</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <UserDetailsModal
        userId={user.id}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />
    </div>
  );
};
