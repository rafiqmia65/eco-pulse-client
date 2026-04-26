"use client";

import React, { useState } from "react";
import { IPaymentHistoryItem } from "@/types/memberTypes/payment.types";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  History,
  Copy,
  Check,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatTimeAgo } from "@/lib/formatDate";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

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
          <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1 w-fit shadow-none">
            <CheckCircle2 className="w-3 h-3" />
            Paid
          </Badge>
        );
      case "PENDING":
        return (
          <Badge
            variant="outline"
            className="bg-amber-500/10 text-amber-600 border-amber-500/20 hover:bg-amber-500/20 px-2 py-0.5 rounded-full flex items-center gap-1 w-fit shadow-none"
          >
            <Clock className="w-3 h-3" />
            Pending
          </Badge>
        );
      default:
        return (
          <Badge
            variant="destructive"
            className="bg-rose-500/10 text-rose-600 border-rose-500/20 hover:bg-rose-500/20 px-2 py-0.5 rounded-full flex items-center gap-1 w-fit shadow-none"
          >
            <AlertCircle className="w-3 h-3" />
            Failed
          </Badge>
        );
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-muted/30 border-b border-border/40">
          <tr>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Idea / Project
            </th>
            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Amount
            </th>
            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Transaction ID
            </th>
            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Date
            </th>
            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Status
            </th>
            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/40">
          {payments.length > 0 ? (
            payments.map((payment) => (
              <tr
                key={payment.paymentId}
                className="hover:bg-muted/50 transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-muted shrink-0 border border-border/50 relative">
                      <Image
                        fill
                        src={payment.idea.image}
                        alt={payment.idea.title}
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="40px"
                      />
                    </div>
                    <div className="max-w-[200px] md:max-w-[300px]">
                      <p className="font-semibold truncate text-foreground leading-tight text-sm">
                        {payment.idea.title}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-wider font-bold">
                        {payment.idea.category}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="font-bold text-foreground text-sm">
                    ${payment.amount.toFixed(2)}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div
                    className="relative group/tid cursor-pointer max-w-[140px]"
                    onClick={() => handleCopy(payment.transactionId)}
                  >
                    <div className="flex items-center gap-2 bg-muted/50 hover:bg-muted px-2 py-1.5 rounded-lg border border-border/50 transition-all hover:ring-2 hover:ring-primary/20">
                      <code className="text-[11px] text-muted-foreground font-mono truncate">
                        {payment.transactionId}
                      </code>
                      <div className="shrink-0 text-muted-foreground/50 group-hover/tid:text-primary transition-colors">
                        {copiedId === payment.transactionId ? (
                          <Check className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </div>
                    </div>

                    {/* Tooltip on Hover */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-black text-white text-[10px] font-mono rounded-lg opacity-0 invisible group-hover/tid:opacity-100 group-hover/tid:visible transition-all whitespace-pre-wrap break-all w-[240px] shadow-xl z-50 pointer-events-none border border-white/10">
                      <p className="font-sans text-[9px] text-gray-400 mb-1 uppercase tracking-widest font-bold">
                        Full Transaction ID
                      </p>
                      {payment.transactionId}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-black"></div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-[13px] text-muted-foreground whitespace-nowrap">
                  {formatTimeAgo(payment.createdAt)}
                </td>
                <td className="px-4 py-4">{getStatusBadge(payment.status)}</td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/dashboard/purchased-ideas/${payment.idea.id}`}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-xl hover:bg-primary hover:text-primary-foreground text-primary transition-all group/btn border border-primary/10"
                  >
                    <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="h-48 text-center">
                <div className="flex flex-col items-center justify-center text-muted-foreground/60">
                  <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-4">
                    <History className="w-8 h-8 opacity-20" />
                  </div>
                  <p className="text-sm font-medium">
                    No payment history found.
                  </p>
                  <p className="text-xs mt-1">
                    Your transactions will appear here once you make a purchase.
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default PaymentsTable;
