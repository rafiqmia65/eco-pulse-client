"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreVertical,
  Edit,
  Trash2,
  RefreshCw,
  FolderOpen,
} from "lucide-react";
import { format } from "date-fns";
import { IAdminCategory } from "@/types/adminTypes/adminCategories.types";
import {
  useDeleteCategory,
  useRecoverCategory,
} from "@/app/(DashboardLayout)/admin/categories/_actions";

interface CategoriesTableProps {
  categories: IAdminCategory[];
  onEdit: (category: IAdminCategory) => void;
}

const CategoriesTable = ({ categories, onEdit }: CategoriesTableProps) => {
  const { mutate: deleteCategory } = useDeleteCategory();
  const { mutate: recoverCategory } = useRecoverCategory();

  // Keep track of which items are loading for optimisic UX
  const [loadingIds, setLoadingIds] = useState<string[]>([]);

  const handleDelete = (id: string) => {
    setLoadingIds((prev) => [...prev, id]);
    deleteCategory(id, {
      onSettled: () => {
        setLoadingIds((prev) => prev.filter((i) => i !== id));
      },
    });
  };

  const handleRecover = (id: string) => {
    setLoadingIds((prev) => [...prev, id]);
    recoverCategory(id, {
      onSettled: () => {
        setLoadingIds((prev) => prev.filter((i) => i !== id));
      },
    });
  };

  return (
    <div className="rounded-2xl border border-border/50 bg-background/30 backdrop-blur-sm overflow-hidden shadow-sm">
      <Table>
        <TableHeader className="bg-muted/30">
          <TableRow className="hover:bg-transparent border-border/40">
            <TableHead className="w-12.5 text-[11px] uppercase tracking-wider font-bold text-muted-foreground text-center">
              #
            </TableHead>
            <TableHead className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground w-[35%]">
              Category Name
            </TableHead>
            <TableHead className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
              Status
            </TableHead>
            <TableHead className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
              Created Date
            </TableHead>
            <TableHead className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground text-right pr-6">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.length > 0 ? (
            categories.map((category, index) => {
              const isActionLoading = loadingIds.includes(category.id);
              
              return (
                <TableRow
                  key={category.id}
                  className={`hover:bg-muted/40 transition-colors border-border/40 ${
                    category.isDeleted ? "opacity-75 bg-muted/20" : ""
                  }`}
                >
                  <TableCell className="text-center font-medium text-muted-foreground text-sm">
                    {index + 1}
                  </TableCell>
                  <TableCell className="font-medium text-sm">
                    {category.name}
                  </TableCell>
                  <TableCell>
                    {category.isDeleted ? (
                      <Badge variant="destructive" className="bg-rose-500/10 text-rose-500 border-rose-500/20 shadow-none font-medium px-2.5 py-0.5 rounded-full">
                        Deleted
                      </Badge>
                    ) : (
                      <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-none font-medium px-2.5 py-0.5 rounded-full">
                        Active
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {format(new Date(category.createdAt), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell className="text-right pr-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-xl opacity-70 hover:opacity-100 hover:bg-muted data-[state=open]:bg-muted"
                          disabled={isActionLoading}
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40 rounded-xl border-border/50 bg-card/95 backdrop-blur-xl shadow-xl">
                        <DropdownMenuLabel className="text-xs text-muted-foreground">Options</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-border/50" />
                        
                        {!category.isDeleted && (
                          <>
                            <DropdownMenuItem 
                              onClick={() => onEdit(category)}
                              className="gap-2 cursor-pointer rounded-lg hover:bg-muted"
                            >
                              <Edit className="w-4 h-4 text-primary" />
                              <span className="font-medium">Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDelete(category.id)}
                              className="gap-2 cursor-pointer text-rose-500 rounded-lg hover:bg-rose-500/10 hover:text-rose-600 focus:bg-rose-500/10 focus:text-rose-600"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span className="font-medium">Delete</span>
                            </DropdownMenuItem>
                          </>
                        )}
                        
                        {category.isDeleted && (
                          <DropdownMenuItem 
                            onClick={() => handleRecover(category.id)}
                            className="gap-2 cursor-pointer text-emerald-500 rounded-lg hover:bg-emerald-500/10 hover:text-emerald-600 focus:bg-emerald-500/10 focus:text-emerald-600"
                          >
                            <RefreshCw className="w-4 h-4" />
                            <span className="font-medium">Recover</span>
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-48 text-center">
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="p-4 rounded-full bg-muted/50">
                    <FolderOpen className="w-8 h-8 text-muted-foreground/40" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-sm">No categories found</p>
                    <p className="text-xs text-muted-foreground">
                      Create a new category or adjust your filters.
                    </p>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CategoriesTable;
