import React from "react";
import { IPurchasedIdeaDetails } from "@/types/memberTypes/purchasedIdeas.types";
import { ShieldCheck, Hash, CreditCard, Calendar } from "lucide-react";

import { Card } from "@/components/ui/card";
import { formatTimeAgo } from "@/lib/formatDate";

const ReceiptCard: React.FC<{ idea: IPurchasedIdeaDetails }> = ({ idea }) => {
  return (
    <Card className="w-full h-full p-6 border bg-card shadow-sm hover:shadow-md transition-all space-y-5">
      {/* Header */}
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">Purchase Receipt</h3>
      </div>

      {/* Items */}
      <div className="space-y-4">
        <ReceiptItem
          label="Transaction ID"
          value={idea.paymentInfo?.transactionId || "N/A"}
          icon={<Hash className="w-4 h-4" />}
          mono
        />

        <ReceiptItem
          label="Amount"
          value={`$${(idea.paymentInfo?.amount || 0).toFixed(2)}`}
          icon={<CreditCard className="w-4 h-4" />}
        />

        <ReceiptItem
          label="CreatedAt"
          value={idea.purchasedAt ? formatTimeAgo(idea.createdAt) : "N/A"}
          icon={<Calendar className="w-4 h-4" />}
        />

        <ReceiptItem
          label="Purchased"
          value={
            idea.purchasedAt ? formatTimeAgo(idea.paymentInfo.paidAt) : "N/A"
          }
          icon={<Calendar className="w-4 h-4" />}
        />
      </div>

      {/* Status */}
      <div className="pt-4 border-t">
        <div className="flex items-center justify-between bg-muted/40 px-4 py-3 rounded-xl border">
          <span className="text-xs font-medium text-muted-foreground">
            Access Status
          </span>
          <span className="text-xs font-bold text-green-600">Active</span>
        </div>
      </div>
    </Card>
  );
};

const ReceiptItem = ({
  label,
  value,
  icon,
  mono,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  mono?: boolean;
}) => (
  <div className="flex items-start gap-3">
    <div className="text-primary/70 mt-0.5">{icon}</div>
    <div className="min-w-0">
      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
        {label}
      </p>
      <p
        className={`text-sm font-semibold truncate ${
          mono ? "font-mono text-xs" : ""
        }`}
      >
        {value}
      </p>
    </div>
  </div>
);

export default ReceiptCard;
