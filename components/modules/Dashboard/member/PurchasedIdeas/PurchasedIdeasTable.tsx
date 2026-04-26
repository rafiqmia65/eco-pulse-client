import React from "react";
import { Calendar, Layers, User, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { IPurchasedIdea } from "@/types/memberTypes/purchasedIdeas.types";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PurchasedIdeasTableProps {
  purchases: IPurchasedIdea[];
  isLoading: boolean;
}

const PurchasedIdeasTable: React.FC<PurchasedIdeasTableProps> = ({
  purchases,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="bg-card border rounded-2xl overflow-hidden shadow-sm">
        <div className="p-6 space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (purchases.length === 0) {
    return (
      <div className="bg-card border rounded-2xl p-12 text-center shadow-sm">
        <div className="max-w-xs mx-auto space-y-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto text-muted-foreground">
            <Layers className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold">No purchased ideas found</h3>
          <p className="text-sm text-muted-foreground">
            You haven&apos;t purchased any ideas yet or no ideas match your
            search criteria.
          </p>
          <Button asChild variant="outline" className="rounded-xl">
            <Link href="/ideas">Explore Ideas</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border rounded-2xl overflow-hidden shadow-sm overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-200">
        <thead>
          <tr className="bg-muted/30 border-b">
            <th className="p-4 text-sm font-semibold">Idea & Author</th>
            <th className="p-4 text-sm font-semibold">Category</th>
            <th className="p-4 text-sm font-semibold">Payment Details</th>
            <th className="p-4 text-sm font-semibold">Purchased At</th>
            <th className="p-4 text-sm font-semibold text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {purchases.map((purchase) => (
            <tr
              key={purchase.paymentId}
              className="hover:bg-muted/20 transition-colors"
            >
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden border bg-muted shrink-0">
                    {purchase.idea.image ? (
                      <Image
                        src={purchase.idea.image}
                        alt={purchase.idea.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground opacity-40">
                        <Layers className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate max-w-62.5">
                      {purchase.idea.title}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1 text-[11px] text-muted-foreground font-medium truncate">
                      <User className="w-3 h-3 shrink-0" />
                      {purchase.idea.author.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="p-4">
                <Badge
                  variant="outline"
                  className="rounded-full font-medium whitespace-nowrap"
                >
                  {purchase.idea.category?.name || "Uncategorized"}
                </Badge>
              </td>
              <td className="p-4">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-bold text-green-600">
                    ${purchase.amount.toFixed(2)}
                  </span>
                  <span
                    className="text-[10px] text-muted-foreground font-mono truncate max-w-30"
                    title={purchase.transactionId}
                  >
                    ID: {purchase.transactionId.substring(0, 8)}...
                  </span>
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  {purchase.purchasedAt
                    ? format(new Date(purchase.purchasedAt), "MMM dd, yyyy")
                    : "N/A"}
                </div>
              </td>
              <td className="p-4 text-right">
                <Button
                  size="sm"
                  variant="outline"
                  asChild
                  className="h-8 text-xs font-semibold"
                >
                  <Link href={`/dashboard/idea-details/${purchase.idea.id}`}>
                    <Eye className="w-3.5 h-3.5 mr-1.5" />
                    See more
                  </Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchasedIdeasTable;
