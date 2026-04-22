

import { ShoppingCart } from "lucide-react";
import { IIdeaAccessData } from "@/types/public/ideaDetails.types";
import { canPurchase, isOwnerOrAdmin } from "@/lib/access-utils";
import IdeaVoteActions from "./IdeaVoteActions/IdeaVoteActions";
import IdeaWatchListButton from "./IdeaWatchListButton/IdeaWatchListButton";

export default function IdeaActionsPanel({ idea }: { idea: IIdeaAccessData }) {
  const isOwnerAdmin = isOwnerOrAdmin(idea.accessLevel);

  const purchaseDisabled = !canPurchase(idea.accessLevel) || isOwnerAdmin;

  return (
    <div className="bg-card border border-border shadow-custom rounded-2xl p-5 flex flex-col gap-5">
      {/* HEADER */}
      <div>
        <h2 className="text-xl font-semibold">{idea.title}</h2>

        <div className="text-muted-foreground mt-2 space-y-1">
          <p>
            <span className="text-foreground font-medium">Author:</span>{" "}
            {idea.author.name}
          </p>
          <p>
            <span className="text-foreground font-medium">Category:</span>{" "}
            {idea.category.name}
          </p>
        </div>
      </div>

      <IdeaVoteActions idea={idea} />

      {/* ACTIONS */}
      <div className="space-y-2">
        {/* BOOKMARK */}
        <IdeaWatchListButton idea={idea} />
      </div>

      {/* PURCHASE */}
      <div className="pt-3 border-t space-y-2">
        <button
          disabled={purchaseDisabled}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition
          ${
            purchaseDisabled
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "bg-primary text-primary-foreground hover:opacity-90"
          }`}
        >
          <ShoppingCart size={16} />
          Purchase Idea
        </button>

        <p className="text-center text-xs text-muted-foreground">
          {idea.isPaid ? `Price: $${idea.price}` : "Free Idea"}
        </p>
      </div>
    </div>
  );
}
