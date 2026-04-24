import { IIdeaDetailsByOwner } from "@/types/memberTypes/IdeaDetailsByOwner.types";
import { format } from "date-fns";

export default function IdeaMeta({ idea }: { idea: IIdeaDetailsByOwner }) {
  // Helper function to format dates consistently
  const formatDate = (date: string) => format(new Date(date), "PPP");

  return (
    <div className="bg-card border rounded-2xl p-6 space-y-5 shadow-sm">
      <h3 className="font-semibold text-sm">Overview</h3>

      <ul className="space-y-3 text-sm text-muted-foreground">
        <li className="flex justify-between">
          <span>Access</span>
          <span className="font-medium text-foreground">
            {idea.isPaid ? `Paid ($${idea.price})` : "Free"}
          </span>
        </li>

        <li className="flex justify-between">
          <span>Status</span>
          <span className="font-medium text-foreground">{idea.status}</span>
        </li>

        <li className="flex justify-between">
          <span>Submitted</span>
          <span className="font-medium text-foreground">
            {formatDate(idea.createdAt)}
          </span>
        </li>

        <li className="flex justify-between">
          <span>Last Updated</span>
          <span className="font-medium text-foreground">
            {formatDate(idea.updatedAt)}
          </span>
        </li>
      </ul>

      {idea.feedback && (
        <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-xl text-sm">
          <p className="font-semibold text-amber-900 dark:text-amber-200 mb-1">
            Feedback:
          </p>
          <p className="italic text-amber-800 dark:text-amber-300">
            &quot;{idea.feedback.message}&quot;
          </p>
        </div>
      )}
    </div>
  );
}
