"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { IUser } from "@/types/adminTypes/user.types";
import { AdminUserActions } from "../AdminUserActions/AdminUserActions";
import Image from "next/image";
import { format } from "date-fns";

interface AdminUsersTableProps {
  users: IUser[];
  page: number;
  limit: number;
}

export const AdminUsersTable = ({
  users,
  page,
  limit,
}: AdminUsersTableProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">
            Active
          </Badge>
        );
      case "BLOCKED":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-none">
            Blocked
          </Badge>
        );
      case "DELETED":
        return (
          <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 border-none">
            Deleted
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "ADMIN":
        return (
          <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 border-none">
            Admin
          </Badge>
        );
      case "MEMBER":
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none">
            Member
          </Badge>
        );
      default:
        return <Badge>{role}</Badge>;
    }
  };

  return (
    <div className="bg-card border rounded-2xl overflow-hidden shadow-sm">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-[50px] text-center">#</TableHead>
            <TableHead className="w-[250px]">User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <TableRow
                key={user.id}
                className="hover:bg-muted/30 transition-colors"
              >
                <TableCell className="text-center text-muted-foreground font-medium">
                  {String((page - 1) * limit + (index + 1)).padStart(2, "0")}
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted shrink-0">
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt={user.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground font-bold text-sm">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="truncate font-semibold text-gray-900">
                        {user.name}
                      </span>
                      <span className="truncate text-xs text-muted-foreground">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{getRoleBadge(user.role)}</TableCell>
                <TableCell>{getStatusBadge(user.status)}</TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {format(new Date(user.createdAt), "MMM dd, yyyy")}
                </TableCell>
                <TableCell className="text-right">
                  <AdminUserActions user={user} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-24 text-center text-muted-foreground font-medium"
              >
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
