"use client";

import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@tanstack/react-form";
import { IAdminCategory } from "@/types/adminTypes/adminCategories.types";
import { Loader2 } from "lucide-react";
import {
  useCreateCategory,
  useUpdateCategory,
} from "@/app/(DashboardLayout)/admin/categories/_actions";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: IAdminCategory | null;
}

const CategoryModal = ({ isOpen, onClose, category }: CategoryModalProps) => {
  const isEditing = !!category;
  
  const { mutate: createCategory, isPending: isCreating } = useCreateCategory();
  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();
  
  const isLoading = isCreating || isUpdating;

  const form = useForm({
    defaultValues: {
      name: category?.name || "",
    },
    onSubmit: async ({ value }) => {
      // Manual trim to match zod trim()
      const payload = { name: value.name.trim() };

      if (isEditing && category) {
        updateCategory(
          { id: category.id, payload },
          {
            onSuccess: () => {
              onClose();
            },
          }
        );
      } else {
        createCategory(payload, {
          onSuccess: () => {
            onClose();
          },
        });
      }
    },
  });

  // Sync state when modal opens or category changes
  useEffect(() => {
    if (isOpen) {
      form.reset({ name: category?.name || "" });
    }
  }, [isOpen, category, form]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-106.25 border-border/50 bg-card/95 backdrop-blur-xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {isEditing ? "Edit Category" : "Create New Category"}
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6 mt-4"
        >
          <form.Field
            name="name"
            validators={{
              onChange: ({ value }) => {
                const trimmed = value.trim();
                if (trimmed.length < 2) return "Category name must be at least 2 characters";
                if (trimmed.length > 50) return "Category name cannot exceed 50 characters";
                return undefined;
              },
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name} className="text-sm font-medium">
                  Category Name <span className="text-rose-500">*</span>
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="e.g. Transportation, Energy, etc."
                  className={`h-11 rounded-xl bg-background/50 border-border/50 ${
                    field.state.meta.errors.length ? "border-rose-500 focus-visible:ring-rose-500/20" : "focus-visible:ring-primary/20"
                  }`}
                  disabled={isLoading}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-xs text-rose-500 font-medium mt-1">
                    {field.state.meta.errors.join(", ")}
                  </p>
                )}
              </div>
            )}
          </form.Field>
          
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={isLoading}
              className="rounded-xl font-medium hover:bg-muted"
            >
              Cancel
            </Button>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit]) => (
                <Button
                  type="submit"
                  disabled={isLoading || !canSubmit}
                  className="rounded-xl font-medium shadow-md shadow-primary/20"
                >
                  {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {isEditing ? "Save Changes" : "Create Category"}
                </Button>
              )}
            </form.Subscribe>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryModal;
