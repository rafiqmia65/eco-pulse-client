"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSingleUser } from "@/app/(DashboardLayout)/admin/users/_actions";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Mail, Calendar, Shield, User as UserIcon, Clock } from "lucide-react";

interface UserDetailsModalProps {
  userId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export const UserDetailsModal = ({
  userId,
  isOpen,
  onClose,
}: UserDetailsModalProps) => {
  const { data, isLoading } = useSingleUser(userId || "", isOpen);
  const user = data?.data;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return <Badge className="bg-green-100 text-green-700">Active</Badge>;
      case "BLOCKED":
        return <Badge className="bg-red-100 text-red-700">Blocked</Badge>;
      case "DELETED":
        return <Badge className="bg-gray-100 text-gray-700">Deleted</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "ADMIN":
        return <Badge className="bg-purple-100 text-purple-700">Admin</Badge>;
      case "MEMBER":
        return <Badge className="bg-blue-100 text-blue-700">Member</Badge>;
      default:
        return <Badge>{role}</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-800">User Details</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Skeleton className="w-16 h-16 sm:w-20 sm:h-20 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-32 sm:w-48" />
                <Skeleton className="h-4 w-24 sm:w-32" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-16 rounded-xl" />
              ))}
            </div>
          </div>
        ) : user ? (
          <div className="space-y-6 sm:space-y-8 py-2 sm:py-4">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 pb-6 border-b border-gray-100">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-muted border-4 border-white shadow-sm shrink-0">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground font-bold text-xl sm:text-2xl bg-gray-50">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="text-center sm:text-left space-y-1">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">{user.name}</h3>
                <p className="text-sm sm:text-base text-muted-foreground flex items-center justify-center sm:justify-start gap-2 break-all">
                  <Mail className="w-4 h-4 shrink-0" />
                  {user.email}
                </p>
                <div className="flex flex-wrap gap-2 pt-2 justify-center sm:justify-start">
                  {getRoleBadge(user.role)}
                  {getStatusBadge(user.status)}
                </div>
              </div>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-gray-50 p-4 rounded-2xl space-y-1">
                <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                  <UserIcon className="w-3.5 h-3.5" />
                  Full Name
                </p>
                <p className="text-gray-900 font-medium text-sm sm:text-base">{user.name}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl space-y-1">
                <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5" />
                  Account Role
                </p>
                <p className="text-gray-900 font-medium text-sm sm:text-base">{user.role}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl space-y-1">
                <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" />
                  Joined Date
                </p>
                <p className="text-gray-900 font-medium text-sm sm:text-base">
                  {format(new Date(user.createdAt), "MMMM dd, yyyy")}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl space-y-1">
                <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  Last Updated
                </p>
                <p className="text-gray-900 font-medium text-sm sm:text-base">
                  {format(new Date(user.updatedAt), "MMMM dd, yyyy")}
                </p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-blue-900">Email Verified</p>
                  <p className="text-xs text-blue-700 leading-relaxed">
                    {user.emailVerified ? "Verified User" : "Verification Pending"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-8 sm:py-12 text-center text-muted-foreground">
            User data not available.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
