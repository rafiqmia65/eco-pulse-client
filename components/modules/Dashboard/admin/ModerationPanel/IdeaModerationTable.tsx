"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  XCircle,
  Clock,
  User,
  Tag,
  DollarSign,
  Calendar,
  ExternalLink,
  FileText,
  Check,
  X,
} from "lucide-react";
import {
  IAdminIdeaItem,
  IIdeaStatus,
} from "@/types/adminTypes/adminIdeas.types";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface IdeaModerationTableProps {
  ideas: IAdminIdeaItem[];
}

const IdeaModerationTable = ({ ideas }: IdeaModerationTableProps) => {
  const getStatusBadge = (status: IIdeaStatus) => {
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
          <Badge
            variant="outline"
            className="text-muted-foreground gap-1 font-medium px-2 py-0.5 rounded-full"
          >
            <Clock className="w-3 h-3" />
            Draft
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <TooltipProvider>
      <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xs overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="hover:bg-transparent border-border/40">
              <TableHead className="w-[380px] text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
                Idea Details
              </TableHead>
              <TableHead className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
                Author
              </TableHead>
              <TableHead className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
                Category
              </TableHead>
              <TableHead className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
                Pricing
              </TableHead>
              <TableHead className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
                Status
              </TableHead>
              <TableHead className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
                Created
              </TableHead>
              <TableHead className="text-right text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
                Moderation
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ideas.length > 0 ? (
              ideas.map((idea) => (
                <TableRow
                  key={idea.id}
                  className="hover:bg-muted/40 transition-colors border-border/40 group"
                >
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl overflow-hidden relative shrink-0 border border-border/50 shadow-sm">
                        <Image
                          src={idea.image}
                          alt={idea.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="max-w-[280px]">
                        <p className="font-semibold text-foreground truncate block text-sm">
                          {idea.title}
                        </p>
                        <div className="flex items-center gap-3 mt-1.5">
                          <span className="text-[10px] text-muted-foreground flex items-center gap-1 bg-muted px-1.5 py-0.5 rounded-md">
                            ID: {idea.id.split("-")[0]}...
                          </span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-muted-foreground" />
                        {idea.author.name}
                      </span>
                      <span className="text-[11px] text-muted-foreground ml-5 truncate max-w-[150px]">
                        {idea.author.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-muted/30 border-border/50 text-[10px] font-medium px-2 py-0.5 flex items-center gap-1.5 w-fit"
                    >
                      <Tag className="w-3 h-3" />
                      {idea.category.name}
                    </Badge>
                  </TableCell>
                  <TableCell>
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
                  <TableCell>{getStatusBadge(idea.status)}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-[11px] text-foreground font-medium flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        {format(new Date(idea.createdAt), "MMM dd, yyyy")}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {/* VIEW ACTION (always) */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link href={`/admin/ideas/${idea.id}`}>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-lg hover:bg-primary/10 hover:text-primary transition-all"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          className="bg-primary text-primary-foreground text-[10px] py-1 px-2"
                        >
                          View Idea
                        </TooltipContent>
                      </Tooltip>

                      {/* APPROVE (REVIEW + REJECTED) */}
                      {(idea.status === "REVIEW" ||
                        idea.status === "REJECTED") && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-lg hover:bg-emerald-500/10 hover:text-emerald-500 transition-all"
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent
                            side="top"
                            className="bg-emerald-500 text-white text-[10px] py-1 px-2"
                          >
                            Approve Idea
                          </TooltipContent>
                        </Tooltip>
                      )}

                      {/* REJECT (ONLY REVIEW) */}
                      {idea.status === "REVIEW" && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-lg hover:bg-rose-500/10 hover:text-rose-500 transition-all"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent
                            side="top"
                            className="bg-rose-500 text-white text-[10px] py-1 px-2"
                          >
                            Reject Idea
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="p-4 rounded-full bg-muted/50">
                      <FileText className="w-10 h-10 text-muted-foreground/40" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-semibold text-foreground text-sm">
                        No ideas found
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Adjust your filters or try a different search.
                      </p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </TooltipProvider>
  );
};

export default IdeaModerationTable;
