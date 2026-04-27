"use client";

import React, { useState } from "react";
import { IPaymentHistoryItem } from "@/types/memberTypes/payment.types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  History,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatTimeAgo } from "@/lib/formatDate";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

interface PaymentsTableProps {
  payments: IPaymentHistoryItem[];
}

const PaymentsTable = ({ payments }: PaymentsTableProps) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    toast.success("Transaction ID copied to clipboard");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PAID":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1 w-fit shadow-none font-medium">
            <CheckCircle2 className="w-3 h-3" />
            Paid
          </Badge>
        );
      case "PENDING":
        return (
          <Badge
            variant="outline"
            className="bg-amber-500/10 text-amber-600 border-amber-500/20 hover:bg-amber-500/20 px-2 py-0.5 rounded-full flex items-center gap-1 w-fit shadow-none font-medium"
          >
            <Clock className="w-3 h-3" />
            Pending
          </Badge>
        );
      default:
        return (
          <Badge
            variant="destructive"
            className="bg-rose-500/10 text-rose-600 border-rose-500/20 hover:bg-rose-500/20 px-2 py-0.5 rounded-full flex items-center gap-1 w-fit shadow-none font-medium"
          >
            <AlertCircle className="w-3 h-3" />
            Failed
          </Badge>
        );
    }
  };

  return (
    <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xs overflow-hidden shadow-sm">
      <Table>
        <TableHeader className="bg-muted/30">
          <TableRow className="hover:bg-transparent border-border/40">
            <TableHead className="px-6 py-4 text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
              Idea / Project
            </TableHead>
            <TableHead className="px-4 py-4 text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
              Amount
            </TableHead>
            <TableHead className="px-4 py-4 text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
              Transaction ID
            </TableHead>
            <TableHead className="px-4 py-4 text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
              Date
            </TableHead>
            <TableHead className="px-4 py-4 text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
              Status
            </TableHead>
            <TableHead className="px-6 py-4 text-right text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.length > 0 ? (
            payments.map((payment) => (
              <TableRow
                key={payment.paymentId}
                className="hover:bg-muted/40 transition-colors border-border/40 group"
              >
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-muted shrink-0 border border-border/50 relative shadow-sm">
                      <Image
                        fill
                        src={payment.idea.image}
                        alt={payment.idea.title}
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="48px"
                      />
                    </div>
                    <div className="max-w-50 md:max-w-75">
                      <p className="font-bold text-foreground leading-tight text-sm truncate">
                        {payment.idea.title}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-widest font-bold bg-muted/50 w-fit px-1.5 py-0.5 rounded">
                        {payment.idea.category}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-4">
                  <span className="font-bold text-foreground text-sm flex items-center gap-0.5">
                    <span className="text-muted-foreground font-normal text-xs">
                      $
                    </span>
                    {payment.amount.toFixed(2)}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-4">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className="flex items-center gap-2 bg-muted/30 hover:bg-muted/60 px-2.5 py-1.5 rounded-lg border border-border/40 transition-all cursor-pointer w-fit group/tid hover:ring-2 hover:ring-primary/10"
                        onClick={() => handleCopy(payment.transactionId)}
                      >
                        <code className="text-[11px] text-muted-foreground font-mono truncate max-w-25">
                          {payment.transactionId}
                        </code>
                        {copiedId === payment.transactionId ? (
                          <Check className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <Copy className="w-3 h-3 text-muted-foreground/40 group-hover/tid:text-primary transition-colors" />
                        )}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-primary text-primary-foreground text-[10px] py-2 px-3 font-mono max-w-62.5 break-all leading-relaxed shadow-xl">
                      <p className="font-sans text-[9px] text-primary-foreground/50 mb-1 uppercase tracking-widest font-bold">
                        Full Transaction ID
                      </p>
                      {payment.transactionId}
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
                <TableCell className="px-4 py-4">
                  <div className="flex flex-col">
                    <span className="text-[11px] text-foreground font-medium">
                      {formatTimeAgo(payment.createdAt)}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-4">
                  {getStatusBadge(payment.status)}
                </TableCell>
                <TableCell className="px-6 py-4 text-right">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href={``}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-xl hover:bg-primary/10 hover:text-primary border border-transparent hover:border-primary/20 transition-all"
                        >
                          <ExternalLink className="w-4.5 h-4.5" />
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent className="bg-primary text-primary-foreground text-[10px] py-1 px-2">
                      View Details
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-64 text-center">
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="p-4 rounded-full bg-muted/50">
                    <History className="w-10 h-10 text-muted-foreground/40" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground text-sm">
                      No payment history found
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Your transactions will appear here once you make a
                      purchase.
                    </p>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PaymentsTable;
