"use client";

import React from "react";
import { Calendar, Layers, Tag, DollarSign, CheckCircle2, Clock, XCircle } from "lucide-react";
import { IIdea } from "@/types/memberTypes/myAllIdeas.types";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { IdeaActionButtons } from "@/components/shared/IdeaActionButtonsByOwner/IdeaActionButtonsByOwner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface MyIdeasTableProps {
  ideas: IIdea[];
  isLoading: boolean;
}

const MyIdeasTable: React.FC<MyIdeasTableProps> = ({ ideas, isLoading }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20 px-2 py-0.5 gap-1 font-medium rounded-full">
            <CheckCircle2 className="w-3 h-3" />
            Approved
          </Badge>
        );
      case "REVIEW":
        return (
          <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 hover:bg-amber-500/20 px-2 py-0.5 gap-1 font-medium rounded-full">
            <Clock className="w-3 h-3" />
            Review
          </Badge>
        );
      case "REJECTED":
        return (
          <Badge className="bg-rose-500/10 text-rose-500 border-rose-500/20 hover:bg-rose-500/20 px-2 py-0.5 gap-1 font-medium rounded-full">
            <XCircle className="w-3 h-3" />
            Rejected
          </Badge>
        );
      case "DRAFT":
        return (
          <Badge variant="outline" className="text-muted-foreground gap-1 font-medium px-2 py-0.5 rounded-full">
            <Clock className="w-3 h-3" />
            Draft
          </Badge>
        );
      default:
        return null;
    }
  };

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

  if (ideas.length === 0) {
    return (
      <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xs p-12 text-center shadow-sm">
        <div className="max-w-xs mx-auto space-y-4">
          <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto text-muted-foreground/40">
            <Layers className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold">No ideas found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your filters or search terms to find what you&apos;re looking for.
            </p>
          </div>
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
              Idea Details
            </TableHead>
            <TableHead className="px-4 py-4 text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
              Category
            </TableHead>
            <TableHead className="px-4 py-4 text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
              Pricing
            </TableHead>
            <TableHead className="px-4 py-4 text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
              Status
            </TableHead>
            <TableHead className="px-6 py-4 text-right text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ideas.map((idea) => (
            <TableRow key={idea.id} className="hover:bg-muted/40 transition-colors border-border/40 group">
              <TableCell className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-muted shrink-0 border border-border/50 relative shadow-sm">
                    {idea.image ? (
                      <Image
                        src={idea.image}
                        alt={idea.title}
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
                      {idea.title}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5 text-[10px] text-muted-foreground font-medium bg-muted/50 w-fit px-1.5 py-0.5 rounded">
                      <Calendar className="w-3 h-3 text-muted-foreground/60" />
                      {idea.createdAt
                        ? format(new Date(idea.createdAt), "MMM dd, yyyy")
                        : "N/A"}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="px-4 py-4">
                <Badge
                  variant="outline"
                  className="bg-muted/30 border-border/50 text-[10px] font-medium px-2 py-0.5 flex items-center gap-1.5 w-fit"
                >
                  <Tag className="w-3 h-3" />
                  {idea.category?.name || "Uncategorized"}
                </Badge>
              </TableCell>
              <TableCell className="px-4 py-4">
                {idea.isPaid ? (
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-500 bg-amber-500/10 px-2 py-1 rounded-lg w-fit border border-amber-500/20">
                      <DollarSign className="w-3 h-3" />
                      Paid
                    </div>
                    <span className="text-[10px] text-muted-foreground mt-1 ml-1 font-mono">
                      ${idea.price}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-primary bg-primary/5 px-2 py-1 rounded-lg w-fit border border-primary/10">
                    Free
                  </div>
                )}
              </TableCell>
              <TableCell className="px-4 py-4">
                {getStatusBadge(idea.status ?? "")}
              </TableCell>
              <TableCell className="px-6 py-4 text-right">
                <div className="flex items-center justify-end">
                  <IdeaActionButtons
                    idea={{ id: idea.id ?? "", status: idea.status ?? "" }}
                    variant="dropdown"
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyIdeasTable;
