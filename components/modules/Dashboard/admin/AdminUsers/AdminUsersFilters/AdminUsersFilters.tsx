"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Search, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { role } from "@/constants/roles";

interface AdminUsersFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedRole: string;
  onRoleChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  onClear: () => void;
}

export const AdminUsersFilters = ({
  searchTerm,
  onSearchChange,
  selectedRole,
  onRoleChange,
  selectedStatus,
  onStatusChange,
  onClear,
}: AdminUsersFiltersProps) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 bg-card p-4 border rounded-2xl shadow-sm w-full mb-6">
      <div className="relative flex-1 group">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
          <Search className="w-4.5 h-4.5" />
        </div>
        <Input
          placeholder="Search by name or email..."
          className="pl-11 h-11 bg-card/50 border-border/50 focus-visible:ring-primary/20 transition-all"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <Select
          value={selectedRole || "all"}
          onValueChange={(val) => onRoleChange(val === "all" ? "" : val)}
        >
          <SelectTrigger className="w-35 md:w-40 h-11 rounded-xl bg-card/50">
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value={role.ADMIN}>Admin</SelectItem>
            <SelectItem value={role.MEMBER}>Member</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={selectedStatus || "all"}
          onValueChange={(val) => onStatusChange(val === "all" ? "" : val)}
        >
          <SelectTrigger className="w-35 md:w-40 h-11 rounded-xl bg-card/50">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="BLOCKED">Blocked</SelectItem>
            <SelectItem value="DELETED">Deleted</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={onClear}
          className="h-11 px-4 rounded-xl gap-2 border-border/50 bg-card/50 hover:bg-muted font-medium transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden sm:inline">Clear Filters</span>
        </Button>
      </div>
    </div>
  );
};
