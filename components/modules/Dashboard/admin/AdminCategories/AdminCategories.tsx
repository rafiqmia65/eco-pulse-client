"use client";

import React, { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminCategories } from "@/app/(DashboardLayout)/admin/categories/_actions";
import { IAdminCategory } from "@/types/adminTypes/adminCategories.types";
import CategoryFilters from "./CategoryFilters/CategoryFilters";
import CategoriesTable from "./CategoriesTable/CategoriesTable";
import CategoryModal from "./CategoryModal/CategoryModal";
import { Skeleton } from "@/components/ui/skeleton";

const AdminCategories = () => {
  // Filters State
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<IAdminCategory | null>(
    null,
  );

  // Fetch data (React Query)
  const { data: response, isLoading } = useAdminCategories({
    status: status === "all" ? undefined : status,
  });

  // Client-side search filtering (since endpoint might not handle search)
  const filteredCategories = useMemo(() => {
    const allCategories = response?.data || [];
    if (!searchTerm.trim()) return allCategories;
    const lowerSearch = searchTerm.toLowerCase();
    return allCategories.filter((cat) =>
      cat.name.toLowerCase().includes(lowerSearch),
    );
  }, [response?.data, searchTerm]);

  const isFiltered = searchTerm.trim() !== "" || status !== "all";

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatus("all");
  };

  const handleCreate = () => {
    setCategoryToEdit(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category: IAdminCategory) => {
    setCategoryToEdit(category);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="space-y-8 p-6 animate-in fade-in duration-500">
        <Skeleton className="h-25 w-full rounded-2xl" />
        <Skeleton className="h-100 w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 max-w-350 mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">
            Manage your platform&apos;s categories.
          </p>
        </div>
        <Button
          onClick={handleCreate}
          className="gap-2 rounded-xl h-11 px-5 shadow-md shadow-primary/20 w-full sm:w-auto"
        >
          <Plus className="w-4.5 h-4.5" />
          <span className="font-semibold">Add Category</span>
        </Button>
      </div>

      <div className="space-y-4">
        {/* Filters */}
        <CategoryFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          status={status}
          onStatusChange={setStatus}
          onClear={handleClearFilters}
          isFiltered={isFiltered}
        />

        <div className="flex items-center gap-2 pt-2">
          <h2 className="text-lg font-semibold">Category List</h2>
          <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-md">
            {filteredCategories.length} Total
          </span>
        </div>

        {/* Table */}
        <CategoriesTable categories={filteredCategories} onEdit={handleEdit} />
      </div>

      {/* Create/Edit Modal */}
      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        category={categoryToEdit}
      />
    </div>
  );
};

export default AdminCategories;
