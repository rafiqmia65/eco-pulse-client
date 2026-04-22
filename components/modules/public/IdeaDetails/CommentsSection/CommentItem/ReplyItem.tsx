import { IReply } from "@/types/public/ideaDetails.types";
import CommentHeader from "./CommentHeader";
import CommentEditForm from "./CommentEditForm";
import CommentActions from "../CommentActions/CommentActions";

interface ReplyItemProps {
  reply: IReply;
  currentUserId?: string;
  isAdmin: boolean;
  editingId: string | null;
  editContent: string;
  isUpdatePending: boolean;
  onEdit: (id: string, content: string) => void;
  onCancelEdit: () => void;
  onUpdateContent: (content: string) => void;
  onSaveUpdate: () => void;
  onDeleteClick: (id: string) => void;
  onRestore: (id: string) => void;
}

export default function ReplyItem({
  reply: r,
  currentUserId,
  isAdmin,
  editingId,
  editContent,
  isUpdatePending,
  onEdit,
  onCancelEdit,
  onUpdateContent,
  onSaveUpdate,
  onDeleteClick,
  onRestore,
}: ReplyItemProps) {
  const isReplyOwner = currentUserId === r.user.id;
  const canViewReplyDeleted = isReplyOwner || isAdmin;

  if (r.isDeleted && !canViewReplyDeleted) return null;

  return (
    <div className="flex items-start justify-between gap-2 bg-muted p-3 rounded-xl min-w-0 w-full overflow-hidden">
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <CommentHeader
          user={r.user}
          createdAt={r.createdAt}
          isOwner={isReplyOwner}
          avatarSize={28}
        />

        <div className="flex flex-col flex-1 min-w-0">
          {editingId === r.id ? (
            <CommentEditForm
              value={editContent}
              onChange={onUpdateContent}
              onCancel={onCancelEdit}
              onSave={onSaveUpdate}
              isPending={isUpdatePending}
              rows={2}
              size="sm"
            />
          ) : (
            <span className="text-muted-foreground text-sm wrap-break-word whitespace-pre-wrap">
              {r.isDeleted ? "This reply was deleted" : r.content}
            </span>
          )}
        </div>
      </div>

      <CommentActions
        isOwner={isReplyOwner}
        isAdmin={isAdmin}
        isDeleted={r.isDeleted}
        onEdit={() => onEdit(r.id, r.content)}
        onDelete={() => onDeleteClick(r.id)}
        onRestore={() => onRestore(r.id)}
      />
    </div>
  );
}
