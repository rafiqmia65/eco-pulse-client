import React from "react";
import { Search, RotateCcw, SortAsc } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/hooks/useCategories";
import { ICategory } from "@/types/memberTypes/myAllIdeas.types";
import { Button } from "@/components/ui/button";

interface PurchasedIdeasFiltersProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  sortBy: string;
  setSortBy: (val: string) => void;
  categoryId: string;
  setCategoryId: (val: string) => void;
  onClear: () => void;
}

const PurchasedIdeasFilters: React.FC<PurchasedIdeasFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  categoryId,
  setCategoryId,
  onClear,
}) => {
  const { data: categories } = useCategories();

  return (
    <div className="flex flex-col lg:flex-row gap-4 bg-card p-4 border rounded-2xl shadow-sm items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search ideas by title or description..."
          className="pl-10 h-8 rounded-xl"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px] h-11 rounded-xl">
            <div className="flex items-center gap-2">
              <SortAsc className="w-4 h-4 text-muted-foreground" />
              <SelectValue placeholder="Sort By" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Latest Purchased</SelectItem>
            <SelectItem value="oldest">Oldest Purchased</SelectItem>
            <SelectItem value="highest_amount">Highest Amount</SelectItem>
            <SelectItem value="lowest_amount">Lowest Amount</SelectItem>
            <SelectItem value="title_asc">Title (A-Z)</SelectItem>
            <SelectItem value="title_desc">Title (Z-A)</SelectItem>
          </SelectContent>
        </Select>

        <Select value={categoryId} onValueChange={setCategoryId}>
          <SelectTrigger className="w-[180px] h-11 rounded-xl">
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

        <Button
          variant="outline"
          onClick={onClear}
          className="h-8 px-4 rounded-xl gap-2 hover:bg-muted font-medium transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden sm:inline">Clear Filters</span>
        </Button>
      </div>
    </div>
  );
};

export default PurchasedIdeasFilters;
