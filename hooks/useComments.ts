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
import { useAppStore } from "@/store";
import { IComment } from "@/types/public/ideaDetails.types";

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
  const user = useAppStore((state) => state.user);

  return useMutation({
    mutationFn: (payload: { content: string; parentId?: string }) =>
      createComment(ideaId, payload),
    onMutate: async (newComment) => {
      // Cancel outgoing queries to prevent cache overwrite
      await queryClient.cancelQueries({ queryKey: ["idea-comments", ideaId] });

      // Usually new comments go to page 1
      const queryKey = ["idea-comments", ideaId, 1];

      // Snapshot the previous value
      const previousComments = queryClient.getQueryData(queryKey);

      // Optimistically update
      if (user) {
        queryClient.setQueryData(queryKey, (old: any) => {
          if (!old?.data?.comments) return old;

          const tempId = `optimistic-${Math.random().toString()}`;

          if (!newComment.parentId) {
            // New top-level comment
            const optimisticComment: IComment = {
              id: tempId,
              content: newComment.content,
              isDeleted: false,
              createdAt: new Date().toISOString(),
              user: user as any,
              replies: [],
            };

            return {
              ...old,
              data: {
                ...old.data,
                comments: [optimisticComment, ...old.data.comments],
                commentsMeta: {
                  ...old.data.commentsMeta,
                  total: old.data.commentsMeta.total + 1,
                },
              },
            };
          } else {
            // New reply
            const updatedComments = old.data.comments.map((comment: IComment) => {
              if (comment.id === newComment.parentId) {
                return {
                  ...comment,
                  replies: [
                    ...comment.replies,
                    {
                      id: tempId,
                      content: newComment.content,
                      isDeleted: false,
                      user: user as any,
                      createdAt: new Date().toISOString(),
                    },
                  ],
                };
              }
              return comment;
            });

            return {
              ...old,
              data: {
                ...old.data,
                comments: updatedComments,
              },
            };
          }
        });
      }

      return { previousComments };
    },
    onError: (error: any, newComment, context: any) => {
      toast.error(error.message || "Failed to create comment");
      if (context?.previousComments) {
        queryClient.setQueryData(
          ["idea-comments", ideaId, 1],
          context.previousComments
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["idea-comments", ideaId] });
    },
    onSuccess: (data) => {
      toast.success(data.message || "Comment created successfully");
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
