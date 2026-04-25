import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  submitIdea,
  deleteIdea,
  updateIdea,
} from "@/services/memberDashboard/ownerIdeas.services";
import { IIdea } from "@/types/memberTypes/ideas.types";

/**
 * Reusable Idea Actions Hook for Owners
 * Handles mutations and cache invalidation.
 * Side effects like toasts and redirects are handled in the component.
 */
export const useIdeaManagement = () => {
  const queryClient = useQueryClient();

  const submitMutation = useMutation({
    mutationFn: (id: string) => submitIdea(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["idea", id] });
      queryClient.invalidateQueries({ queryKey: ["ideas"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteIdea(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ideas"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<IIdea> }) =>
      updateIdea(id, payload),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["idea", id] });
      queryClient.invalidateQueries({ queryKey: ["ideas"] });
    },
  });

  return {
    submitMutation,
    deleteMutation,
    updateMutation,
  };
};
