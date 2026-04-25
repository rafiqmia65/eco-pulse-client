import React from "react";
import { Search, RotateCcw } from "lucide-react";
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

interface MyVotesFiltersProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  categoryId: string;
  setCategoryId: (val: string) => void;
  onClear: () => void;
}

const MyVotesFilters: React.FC<MyVotesFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  categoryId,
  setCategoryId,
  onClear,
}) => {
  const { data: categories } = useCategories();

  return (
    <div className="flex flex-col lg:flex-row gap-4 bg-card p-4 border rounded-2xl shadow-sm">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by title..."
          className="pl-10 h-11 rounded-xl"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <Select value={categoryId} onValueChange={setCategoryId}>
          <SelectTrigger className="w-48 h-11 rounded-xl">
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
          className="h-11 px-4 rounded-xl gap-2 hover:bg-muted font-medium transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden sm:inline">Clear Filters</span>
        </Button>
      </div>
    </div>
  );
};

export default MyVotesFilters;
