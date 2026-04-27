"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Search, X, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IdeaFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onClear: () => void;
}

const IdeaFilters = ({ searchTerm, onSearchChange, onClear }: IdeaFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
      <div className="relative flex-1 w-full group">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
          <Search className="w-4.5 h-4.5" />
        </div>
        <Input
          placeholder="Search by title, problem, or keywords..."
          className="pl-11 pr-10 h-11 bg-card/50 border-border/50 rounded-xl focus-visible:ring-primary/20 focus-visible:border-primary transition-all shadow-sm"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchTerm && (
          <button
            onClick={onClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted text-muted-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      <Button 
        variant="outline" 
        className="h-11 px-5 rounded-xl border-border/50 bg-card/50 hover:bg-muted font-medium flex gap-2 items-center"
      >
        <Filter className="w-4 h-4" />
        Advanced Filters
      </Button>
    </div>
  );
};

export default IdeaFilters;
