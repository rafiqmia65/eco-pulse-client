/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import {
  fetchComments,
  createComment,
  updateComment,
  deleteComment,
  restoreComment,
} from "@/services/comments.services";
import { toast } from "sonner";

/**
 * Hook to fetch paginated comments
 */
export const useIdeaComments = (ideaId: string, page: number) => {
  return useQuery({
    queryKey: ["idea-comments", ideaId, page],
    queryFn: () => fetchComments(ideaId, page),
    placeholderData: keepPreviousData,
  });
};

/**
 * Hook to create a comment
 */
export const useCreateComment = (ideaId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { content: string; parentId?: string }) =>
      createComment(ideaId, payload),
    onSuccess: (data) => {
      toast.success(data.message || "Comment created successfully");
      queryClient.invalidateQueries({ queryKey: ["idea-comments", ideaId] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create comment");
    },
  });
};

/**
 * Hook to update a comment
 */
export const useUpdateComment = (ideaId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, content }: { id: string; content: string }) =>
      updateComment(id, { content }),
    onSuccess: (data) => {
      toast.success(data.message || "Comment updated successfully");
      queryClient.invalidateQueries({ queryKey: ["idea-comments", ideaId] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update comment");
    },
  });
};

/**
 * Hook to delete a comment
 */
export const useDeleteComment = (ideaId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteComment(id),
    onSuccess: (data) => {
      toast.success(data.message || "Comment deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["idea-comments", ideaId] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete comment");
    },
  });
};

/**
 * Hook to restore a comment
 */
export const useRestoreComment = (ideaId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => restoreComment(id),
    onSuccess: (data) => {
      toast.success(data.message || "Comment restored successfully");
      queryClient.invalidateQueries({ queryKey: ["idea-comments", ideaId] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to restore comment");
    },
  });
};
