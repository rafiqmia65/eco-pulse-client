"use client";

import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { IIdeaAccessData } from "@/types/public/ideaDetails.types";
import { canPurchase, isOwnerOrAdmin } from "@/lib/access-utils";

import IdeaVoteActions from "./IdeaVoteActions/IdeaVoteActions";
import IdeaWatchListButton from "./IdeaWatchListButton/IdeaWatchListButton";
import { getAccessMeta } from "./getAccessMeta/getAccessMeta";
import PurchaseModal from "../../modules/public/IdeaDetails/IdeaContent/PurchaseModal/PurchaseModal";
import { useAppStore } from "@/store";

export default function IdeaActionsPanel({ idea }: { idea: IIdeaAccessData }) {
  const activeModal = useAppStore((state) => state.activeModal);
  const openModal = useAppStore((state) => state.openModal);
  const closeModal = useAppStore((state) => state.closeModal);

  const isOwnerAdmin = isOwnerOrAdmin(idea.accessLevel);
  const purchaseDisabled = !canPurchase(idea.accessLevel) || isOwnerAdmin;

  const accessMeta = getAccessMeta(idea.accessLevel);

  return (
    <div className="bg-card border border-border shadow-custom rounded-2xl p-5 flex flex-col gap-5">
      {/* ACCESS BADGE */}
      <div className="flex justify-between items-center">
        <span
          className={`text-xs px-3 py-1 rounded-full font-medium bg-muted text-foreground`}
        >
          {accessMeta.label}
        </span>
      </div>

      {/* HEADER */}
      <div>
        <h2 className="text-xl font-semibold text-foreground">{idea.title}</h2>

        <div className="text-muted-foreground mt-2 space-y-1">
          <p>
            <span className="font-medium text-foreground">Author:</span>{" "}
            {idea.author.name}
          </p>
          <p>
            <span className="font-medium text-foreground">Category:</span>{" "}
            {idea.category.name}
          </p>
        </div>
      </div>

      <IdeaVoteActions idea={idea} />
      <IdeaWatchListButton idea={idea} />

      {/* PURCHASE */}

      {idea.accessLevel !== "PURCHASED_FULL_ACCESS" && (
        <div className="pt-3 border-t border-border space-y-2">
          <button
            onClick={() => {
              if (
                idea.accessLevel === "PUBLIC_FREE_GUEST" ||
                idea.accessLevel === "GUEST_PREVIEW"
              ) {
                toast.error("Please login first to purchase");
                return;
              }
              openModal("purchase");
            }}
            disabled={purchaseDisabled}
            className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 transition
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
      )}

      <PurchaseModal
        idea={idea}
        isOpen={activeModal === "purchase"}
        onClose={closeModal}
      />
    </div>
  );
}
