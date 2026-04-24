/* eslint-disable @typescript-eslint/no-explicit-any */
import { IComment } from "@/types/public/ideaDetails.types";
import CommentActions from "../CommentActions/CommentActions";
import { MessageCircle } from "lucide-react";
import { useUpdateComment, useDeleteComment, useRestoreComment } from "@/hooks/useComments";
import { useState } from "react";
import CommentHeader from "./CommentHeader";
import CommentEditForm from "./CommentEditForm";
import DeleteCommentDialog from "./DeleteCommentDialog";
import ReplyItem from "./ReplyItem";

interface Props {
  ideaId: string;
  comment: IComment;
  onReply: (id: string) => void;
  currentUserId?: string;
  currentUserRole?: "ADMIN" | "MEMBER";
}

export default function CommentItem({
  ideaId,
  comment,
  onReply,
  currentUserId,
  currentUserRole,
}: Props) {
  const isOwner = currentUserId === comment.user.id;
  const isAdmin = currentUserRole === "ADMIN";

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const updateComment = useUpdateComment(ideaId);
  const deleteComment = useDeleteComment(ideaId);
  const restoreComment = useRestoreComment(ideaId);

  const handleEdit = (id: string, content: string) => {
    setEditingId(id);
    setEditContent(content);
  };

  const handleUpdate = () => {
    if (!editContent.trim() || !editingId) return;
    updateComment.mutate(
      { id: editingId, content: editContent },
      {
        onSuccess: () => {
          setEditingId(null);
          setEditContent("");
        },
      }
    );
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteComment.mutate(deleteId, {
        onSuccess: () => setDeleteId(null),
      });
    }
  };

  // deleted visibility logic
  const canViewDeleted = isOwner || isAdmin;

  if (comment.isDeleted && !canViewDeleted) return null;

  return (
    <div className="border border-border rounded-2xl p-4 bg-card shadow-sm hover:shadow-md transition-all">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <CommentHeader
          user={comment.user}
          createdAt={comment.createdAt}
          isOwner={isOwner}
        />

        <CommentActions
          isOwner={isOwner}
          isAdmin={isAdmin}
          isDeleted={comment.isDeleted}
          onEdit={() => handleEdit(comment.id, comment.content)}
          onDelete={() => handleDeleteClick(comment.id)}
          onRestore={() => restoreComment.mutate(comment.id)}
        />
      </div>

      {/* CONTENT */}
      {editingId === comment.id ? (
        <CommentEditForm
          value={editContent}
          onChange={setEditContent}
          onCancel={() => setEditingId(null)}
          onSave={handleUpdate}
          isPending={updateComment.isPending}
        />
      ) : (
        <p
          className={`mt-3 text-sm leading-relaxed wrap-break-word whitespace-pre-wrap ${
            comment.isDeleted
              ? "italic text-muted-foreground"
              : "text-foreground"
          }`}
        >
          {comment.isDeleted ? "This comment was deleted" : comment.content}
        </p>
      )}

      {/* REPLY BUTTON */}
      {!comment.isDeleted && (
        <button
          onClick={() => onReply(comment.id)}
          className="mt-3 inline-flex cursor-pointer items-center gap-2 text-xs font-medium text-muted-foreground hover:text-primary transition group"
        >
          <MessageCircle
            size={14}
            className="group-hover:scale-110 transition"
          />
          Reply
        </button>
      )}

      {/* REPLIES */}
      {comment.replies?.length > 0 && (
        <div className="mt-4 pl-4 border-l border-border space-y-4">
          {comment.replies.map((r) => (
            <ReplyItem
              key={r.id}
              reply={r}
              currentUserId={currentUserId}
              isAdmin={isAdmin}
              editingId={editingId}
              editContent={editContent}
              isUpdatePending={updateComment.isPending}
              onEdit={handleEdit}
              onCancelEdit={() => setEditingId(null)}
              onUpdateContent={setEditContent}
              onSaveUpdate={handleUpdate}
              onDeleteClick={handleDeleteClick}
              onRestore={(id) => restoreComment.mutate(id)}
            />
          ))}
        </div>
      )}

      {/* DELETE CONFIRMATION DIALOG */}
      <DeleteCommentDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        isPending={deleteComment.isPending}
      />
    </div>
  );
}
