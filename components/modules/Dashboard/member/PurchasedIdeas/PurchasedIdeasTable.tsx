"use client";

import React from "react";
import {
  Calendar,
  Layers,
  User,
  ExternalLink,
  Tag,
  DollarSign,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { IPurchasedIdea } from "@/types/memberTypes/purchasedIdeas.types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
      <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xs shadow-sm overflow-hidden">
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
      <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xs p-12 text-center shadow-sm">
        <div className="max-w-xs mx-auto space-y-4">
          <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto text-muted-foreground/40">
            <Layers className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold">No purchased ideas found</h3>
            <p className="text-sm text-muted-foreground">
              You haven&apos;t purchased any ideas yet or no ideas match your
              search criteria.
            </p>
          </div>
          <Button asChild variant="outline" className="rounded-xl mt-4">
            <Link href="/ideas">Explore Ideas</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xs overflow-hidden shadow-sm">
      <Table>
        <TableHeader className="bg-muted/30">
          <TableRow className="hover:bg-transparent border-border/40">
            <TableHead className="px-6 py-4 text-[11px] uppercase tracking-wider font-bold text-muted-foreground w-[380px]">
              Idea & Author
            </TableHead>
            <TableHead className="px-4 py-4 text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
              Category
            </TableHead>
            <TableHead className="px-4 py-4 text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
              Payment Details
            </TableHead>
            <TableHead className="px-4 py-4 text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
              Purchased At
            </TableHead>
            <TableHead className="px-6 py-4 text-right text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {purchases.map((purchase) => (
            <TableRow
              key={purchase.paymentId}
              className="hover:bg-muted/40 transition-colors border-border/40 group"
            >
              <TableCell className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-muted shrink-0 border border-border/50 relative shadow-sm">
                    {purchase.idea.image ? (
                      <Image
                        src={purchase.idea.image}
                        alt={purchase.idea.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="48px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground opacity-40">
                        <Layers className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <div className="max-w-[280px]">
                    <p className="font-bold text-foreground leading-tight text-sm truncate">
                      {purchase.idea.title}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1 text-[10px] text-muted-foreground font-medium truncate">
                      <User className="w-3 h-3 shrink-0 text-muted-foreground/60" />
                      {purchase.idea.author.name}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="px-4 py-4">
                <Badge
                  variant="outline"
                  className="bg-muted/30 border-border/50 text-[10px] font-medium px-2 py-0.5 flex items-center gap-1.5 w-fit whitespace-nowrap"
                >
                  <Tag className="w-3 h-3" />
                  {purchase.idea.category?.name || "Uncategorized"}
                </Badge>
              </TableCell>
              <TableCell className="px-4 py-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg w-fit border border-emerald-500/20">
                    <DollarSign className="w-3 h-3" />$
                    {purchase.amount.toFixed(2)}
                  </div>
                  <span className="text-[9px] text-muted-foreground font-mono ml-1 uppercase tracking-tighter">
                    TX: {purchase.transactionId.substring(0, 8)}...
                  </span>
                </div>
              </TableCell>
              <TableCell className="px-4 py-4">
                <div className="flex items-center gap-2 text-[11px] text-foreground font-medium">
                  <Calendar className="w-3.5 h-3.5 text-muted-foreground/60" />
                  {purchase.purchasedAt
                    ? format(new Date(purchase.purchasedAt), "MMM dd, yyyy")
                    : "N/A"}
                </div>
              </TableCell>
              <TableCell className="px-6 py-4 text-right">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href={`/dashboard/idea-details/${purchase.idea.id}`}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-xl hover:bg-primary/10 hover:text-primary border border-transparent hover:border-primary/20 transition-all"
                      >
                        <ExternalLink className="w-4.5 h-4.5" />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent className="bg-primary text-primary-foreground text-[10px] py-1 px-2">
                    View Idea
                  </TooltipContent>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PurchasedIdeasTable;
