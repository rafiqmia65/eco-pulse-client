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

interface CategoryFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  onClear: () => void;
  isFiltered: boolean;
}

const CategoryFilters = ({
  searchTerm,
  onSearchChange,
  status,
  onStatusChange,
  onClear,
  isFiltered,
}: CategoryFiltersProps) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 bg-card/50 backdrop-blur-xs p-4 border border-border/50 rounded-2xl shadow-sm items-center">
      <div className="relative flex-1 w-full lg:w-auto group">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
          <Search className="w-4.5 h-4.5" />
        </div>
        <Input
          placeholder="Search categories by name..."
          className="pl-11 h-11 bg-card/50 border-border/50 rounded-xl focus-visible:ring-primary/20 focus-visible:border-primary transition-all"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-3 items-center w-full lg:w-auto">
        <Select value={status || "all"} onValueChange={(val) => onStatusChange(val === "all" ? "" : val)}>
          <SelectTrigger className="w-full sm:w-37.5 h-11 rounded-xl bg-card/50 border-border/50 shadow-none">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="deleted">Deleted</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={onClear}
          disabled={!isFiltered}
          className="h-11 px-4 rounded-xl gap-2 border-border/50 bg-card/50 hover:bg-muted font-medium transition-all shrink-0"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden sm:inline">Clear Filters</span>
        </Button>
      </div>
    </div>
  );
};

export default CategoryFilters;
