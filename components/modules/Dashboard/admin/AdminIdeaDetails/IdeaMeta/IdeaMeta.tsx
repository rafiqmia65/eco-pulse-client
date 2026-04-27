import { IAdminIdeaDetails } from "@/types/adminTypes/adminIdeas.types";
import { format } from "date-fns";

export default function IdeaMeta({ idea }: { idea: IAdminIdeaDetails }) {
  const formatDate = (date: string) => format(new Date(date), "PPP");

  return (
    <div className="bg-card border p-6 space-y-5 shadow-sm rounded-2xl">
      <h3 className="font-semibold text-sm">Overview</h3>

      <ul className="space-y-3 text-sm text-muted-foreground">
        <li className="flex justify-between">
          <span>Access:</span>
          <span className="font-medium text-foreground">
            {idea.isPaid ? `Paid ($${idea.price})` : "Free"}
          </span>
        </li>

        <li className="flex justify-between">
          <span>Status:</span>
          <span className={`font-medium ${
            idea.status === 'APPROVED' ? 'text-emerald-500' : 
            idea.status === 'REJECTED' ? 'text-rose-500' : 'text-foreground'
          }`}>
            {idea.status}
          </span>
        </li>

        <li className="flex justify-between">
          <span>Category:</span>
          <span className="font-medium text-foreground">
            {idea.category?.name}
          </span>
        </li>

        <li className="flex justify-between">
          <span>Submitted:</span>
          <span className="font-medium text-foreground">
            {formatDate(idea.createdAt)}
          </span>
        </li>

        <li className="flex justify-between">
          <span>Last Updated:</span>
          <span className="font-medium text-foreground">
            {formatDate(idea.updatedAt)}
          </span>
        </li>
      </ul>
    </div>
  );
}
