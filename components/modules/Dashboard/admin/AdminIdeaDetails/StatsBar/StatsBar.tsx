import { IAdminIdeaDetails } from "@/types/adminTypes/adminIdeas.types";

export default function StatsBar({ idea }: { idea: IAdminIdeaDetails }) {
  return (
    <div className="h-full w-full grid grid-cols-2 gap-4">
      <Stat
        label="Upvotes"
        value={idea.upvotesCount}
        color="text-emerald-600"
      />
      <Stat
        label="Downvotes"
        value={idea.downvotesCount}
        color="text-rose-600"
      />
      <Stat label="Comments" value={idea.commentsCount} color="text-blue-600" />
      <Stat
        label="Engagement"
        value={idea.upvotesCount + idea.downvotesCount}
        color="text-amber-600"
      />
    </div>
  );
}

function Stat({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color?: string;
}) {
  return (
    <div className="h-full w-full bg-card border border-border/50 rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition-all duration-300">
      <p className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
        {label}
      </p>

      <p className={`font-black text-2xl mt-1 ${color || "text-foreground"}`}>
        {value}
      </p>
    </div>
  );
}
