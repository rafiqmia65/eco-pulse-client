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
import { useCategories } from "@/hooks/useCategories";
import { ICategory } from "@/types/memberTypes/myAllIdeas.types";

interface IdeaFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  categoryId: string;
  onCategoryChange: (value: string) => void;
  isPaid: string;
  onIsPaidChange: (value: string) => void;
  onClear: () => void;
}

const IdeaFilters = ({
  searchTerm,
  onSearchChange,
  status,
  onStatusChange,
  categoryId,
  onCategoryChange,
  isPaid,
  onIsPaidChange,
  onClear,
}: IdeaFiltersProps) => {
  const { data: categories } = useCategories();

  return (
    <div className="flex flex-col lg:flex-row gap-4 bg-card p-4 border rounded-2xl shadow-sm w-full">
      <div className="relative flex-1 w-full group">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
          <Search className="w-4.5 h-4.5" />
        </div>
        <Input
          placeholder="Search by title, problem, or keywords..."
          className="pl-11 h-11 bg-card/50 border-border/50 rounded-xl focus-visible:ring-primary/20 focus-visible:border-primary transition-all"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <Select value={status || "all"} onValueChange={(val) => onStatusChange(val === "all" ? "" : val)}>
          <SelectTrigger className="w-35 md:w-40 h-11 rounded-xl bg-card/50">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="REVIEW">Under Review</SelectItem>
            <SelectItem value="APPROVED">Approved</SelectItem>
            <SelectItem value="REJECTED">Rejected</SelectItem>
          </SelectContent>
        </Select>

        <Select value={categoryId || "all"} onValueChange={(val) => onCategoryChange(val === "all" ? "" : val)}>
          <SelectTrigger className="w-40 md:w-45 h-11 rounded-xl bg-card/50">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories?.data?.map((cat: ICategory) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={isPaid || "all"} onValueChange={(val) => onIsPaidChange(val === "all" ? "" : val)}>
          <SelectTrigger className="w-32 h-11 rounded-xl bg-card/50">
            <SelectValue placeholder="Pricing" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Pricing</SelectItem>
            <SelectItem value="true">Paid</SelectItem>
            <SelectItem value="false">Free</SelectItem>
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

export default IdeaFilters;

