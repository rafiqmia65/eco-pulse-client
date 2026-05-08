"use client";

import React, { useState } from "react";
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
  CreditCard,
  Search,
  Copy,
  Check,
  RotateCcw,
  X,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  IPaymentRecord,
  PaymentStatus,
} from "@/types/adminTypes/adminPayments.types";
import { ApiMeta } from "@/types/api.types";
import Pagination from "@/components/shared/Pagination/Pagination";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

interface PaymentsTableProps {
  payments: IPaymentRecord[];
  meta: ApiMeta;
  onPageChange: (page: number) => void;
  onSearch: (term: string) => void;
  onStatusChange: (status: string) => void;
  onGatewayChange: (gateway: string) => void;
  onClearFilters: () => void;
  filters: {
    searchTerm: string;
    status: string;
    gateway: string;
  };
}

const PaymentsTable: React.FC<PaymentsTableProps> = ({
  payments,
  meta,
  onPageChange,
  onSearch,
  onStatusChange,
  onGatewayChange,
  onClearFilters,
  filters,
}) => {
  const isFiltered =
    filters.searchTerm.trim() !== "" ||
    filters.status !== "all" ||
    filters.gateway !== "all";

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    toast.success("Transaction ID copied to clipboard");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getStatusBadge = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.PAID:
        return (
          <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 px-2 py-0.5 gap-1 font-medium rounded-full">
            <CheckCircle2 className="w-3 h-3" />
            Paid
          </Badge>
        );
      case PaymentStatus.PENDING:
        return (
          <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 px-2 py-0.5 gap-1 font-medium rounded-full">
            <Clock className="w-3 h-3" />
            Pending
          </Badge>
        );
      case PaymentStatus.FAILED:
        return (
          <Badge className="bg-rose-500/10 text-rose-500 border-rose-500/20 px-2 py-0.5 gap-1 font-medium rounded-full">
            <XCircle className="w-3 h-3" />
            Failed
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters & Search */}
      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row gap-4 bg-card/50 backdrop-blur-xs p-4 border border-border/50 rounded-2xl shadow-sm items-center">
        {/* Search */}
        <div className="relative flex-1 w-full lg:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

          <Input
            placeholder="Search by Transaction ID, User, or Idea..."
            className="pl-10 pr-10 h-11 rounded-xl bg-background/50 border-border/50 shadow-none focus-visible:ring-1 focus-visible:ring-primary/20"
            value={filters.searchTerm}
            onChange={(e) => onSearch(e.target.value)}
          />

          {/* Clear Search Icon */}
          {filters.searchTerm && (
            <button
              onClick={() => onSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted text-muted-foreground transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center w-full lg:w-auto">
          {/* Status */}
          <Select value={filters.status} onValueChange={onStatusChange}>
            <SelectTrigger className="w-full sm:w-37.5 h-11 rounded-xl bg-background/50 border-border/50 shadow-none">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="PAID">Paid</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="FAILED">Failed</SelectItem>
            </SelectContent>
          </Select>

          {/* Gateway */}
          <Select value={filters.gateway} onValueChange={onGatewayChange}>
            <SelectTrigger className="w-full sm:w-37.5 h-11 rounded-xl bg-background/50 border-border/50 shadow-none">
              <SelectValue placeholder="Gateway" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Gateways</SelectItem>
              <SelectItem value="STRIPE">Stripe</SelectItem>
              <SelectItem value="SSLCOMMERZ">SSLCOMMERZ</SelectItem>
            </SelectContent>
          </Select>

          {/* Clear Button (Always Visible) */}
          <Button
            variant="outline"
            onClick={onClearFilters}
            disabled={!isFiltered}
            className="h-11 px-4 rounded-xl gap-2 border-border/50 bg-card/50 hover:bg-muted font-medium transition-all shrink-0"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Clear Filters</span>
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border/50 bg-background/30 backdrop-blur-sm overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="hover:bg-transparent border-border/40">
              <TableHead className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
                User
              </TableHead>
              <TableHead className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
                Idea Details
              </TableHead>
              <TableHead className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
                Transaction ID
              </TableHead>
              <TableHead className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
                Amount
              </TableHead>
              <TableHead className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
                Status
              </TableHead>
              <TableHead className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
                Date
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
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden relative border border-border/50">
                        {payment.user.image ? (
                          <Image
                            src={payment.user.image}
                            alt={payment.user.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                            <User className="w-4 h-4 text-primary" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {payment.user.name}
                        </span>
                        <span className="text-[11px] text-muted-foreground">
                          {payment.user.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col max-w-50">
                      <span
                        className="text-sm font-medium truncate"
                        title={payment.idea.title}
                      >
                        {payment.idea.title}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        {payment.idea.category}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className="flex items-center gap-2 bg-muted/30 hover:bg-muted/60 px-2 py-1 rounded-lg border border-border/40 transition-all cursor-pointer w-fit group/tid"
                            onClick={() => handleCopy(payment.transactionId)}
                          >
                            <code className="text-[11px] text-muted-foreground font-mono">
                              {payment.transactionId.length > 10
                                ? `${payment.transactionId.slice(0, 10)}...`
                                : payment.transactionId}
                            </code>
                            {copiedId === payment.transactionId ? (
                              <Check className="w-3 h-3 text-emerald-500" />
                            ) : (
                              <Copy className="w-3 h-3 text-muted-foreground/40 group-hover/tid:text-primary transition-colors" />
                            )}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="bg-primary text-primary-foreground text-[10px] py-2 px-3 font-mono max-w-62.5 break-all">
                          <p className="font-sans text-[9px] text-primary-foreground/50 mb-1 uppercase tracking-widest font-bold">
                            Full Transaction ID
                          </p>
                          {payment.transactionId}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-sm">
                      ${payment.amount.toFixed(2)}
                    </span>
                  </TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-medium">
                        {format(new Date(payment.createdAt), "MMM dd, yyyy")}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {format(new Date(payment.createdAt), "hh:mm a")}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="p-4 rounded-full bg-muted/50">
                      <CreditCard className="w-10 h-10 text-muted-foreground/40" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-semibold text-sm">
                        No transactions found
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Try adjusting your search or filters.
                      </p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {meta && meta.totalPages > 1 && (
        <Pagination
          meta={{ page: meta.page, totalPages: meta.totalPages }}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default PaymentsTable;
