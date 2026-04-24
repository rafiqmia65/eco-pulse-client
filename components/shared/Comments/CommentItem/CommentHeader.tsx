import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { formatTimeAgo } from "@/lib/formatDate";

interface CommentHeaderProps {
  user: {
    id: string;
    name: string;
    image?: string | null;
  };
  createdAt: string;
  isOwner: boolean;
  avatarSize?: number;
}

export default function CommentHeader({
  user,
  createdAt,
  isOwner,
  avatarSize = 36,
}: CommentHeaderProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative" style={{ width: avatarSize, height: avatarSize }}>
        <div 
          className="rounded-full overflow-hidden bg-primary/10 flex items-center justify-center"
          style={{ width: avatarSize, height: avatarSize }}
        >
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name}
              width={avatarSize}
              height={avatarSize}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-primary font-semibold uppercase" style={{ fontSize: avatarSize / 2.5 }}>
              {user.name?.charAt(0)}
            </span>
          )}
        </div>

        {isOwner && (
          <span className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full p-0.5">
            <BadgeCheck size={avatarSize / 3.6} />
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <span className={`${avatarSize < 30 ? 'text-xs' : 'text-sm'} font-semibold text-foreground`}>
            {user.name}
          </span>

          {isOwner && (
            <span className="text-[10px] text-primary font-medium">
              (You)
            </span>
          )}
        </div>

        <span className="text-[11px] text-muted-foreground">
          {formatTimeAgo(createdAt)}
        </span>
      </div>
    </div>
  );
}
