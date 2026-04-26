/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Loader2,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  Lock,
  Zap,
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { createIdeaPurchaseAction } from "@/app/(PublicLayout)/ideas/[id]/_actions";
import { toast } from "sonner";
import { IIdeaAccessData } from "@/types/public/ideaDetails.types";

interface PurchaseModalProps {
  idea: IIdeaAccessData;
  isOpen: boolean;
  onClose: () => void;
}

export default function PurchaseModal({
  idea,
  isOpen,
  onClose,
}: PurchaseModalProps) {
  const purchaseMutation = useMutation({
    mutationFn: async () => {
      const res = await createIdeaPurchaseAction(idea.id);
      if (!res.success) throw new Error(res.message);
      return res;
    },
    onSuccess: (res) => {
      toast.success(res.message || "Redirecting to secure checkout...");
      if (res.data?.checkoutUrl) {
        window.location.href = res.data.checkoutUrl;
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to initiate purchase");
    },
  });

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent
        className="
        w-[95%]
        max-w-3xl lg:max-w-4xl
        max-h-[85vh]
        overflow-y-auto
        p-0
        border-none
        shadow-2xl
        rounded-2xl
      "
      >
        {/* TOP GRADIENT */}
        <div className="h-1.5 bg-linear-to-r from-primary/20 via-primary to-primary/20" />

        <div className="p-4 sm:p-5 lg:p-6 space-y-4">
          {/* HEADER */}
          <AlertDialogHeader>
            <div className="flex items-start sm:items-center gap-3 sm:gap-4">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0">
                <CreditCard size={20} />
              </div>

              <div className="text-left space-y-1">
                <AlertDialogTitle className="text-base sm:text-lg font-bold flex items-center gap-2">
                  Build This Idea Faster — Skip the Guesswork
                </AlertDialogTitle>

                <AlertDialogDescription className="text-xs text-muted-foreground">
                  Get everything you need to turn this into a real product.
                </AlertDialogDescription>
              </div>
            </div>
          </AlertDialogHeader>

          {/* CONTENT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* LEFT: SUMMARY */}
            <div className="space-y-3">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/5 blur-xl rounded-2xl" />

                <div className="relative p-4 rounded-2xl border border-primary/10 bg-card/60 backdrop-blur">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                    Project
                  </p>

                  <h3 className="text-sm font-bold leading-tight line-clamp-2">
                    {idea.title}
                  </h3>

                  <div className="mt-4 pt-3 border-t space-y-1">
                    {/* Fake old price */}
                    <p className="text-xs text-muted-foreground line-through">
                      $49
                    </p>

                    <p className="text-2xl sm:text-3xl font-black text-primary">
                      ${idea.price}
                    </p>

                    <p className="text-[10px] text-muted-foreground">
                      One-time payment • Lifetime access
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: BENEFITS */}
            <div className="space-y-3">
              <p className="text-[10px] uppercase tracking-wider text-primary/80 font-semibold">
                What you get
              </p>

              <div className="grid grid-cols-1 gap-2">
                {[
                  "Step-by-step build guide",
                  "Production-ready architecture",
                  "Common mistakes to avoid",
                  "Direct creator insights",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs">
                    <CheckCircle2 size={14} className="text-primary" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="pt-3 border-t space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <AlertDialogCancel
                disabled={purchaseMutation.isPending}
                className="flex-1 h-10 rounded-xl text-xs font-medium"
              >
                Cancel
              </AlertDialogCancel>

              <AlertDialogAction
                onClick={(e) => {
                  e.preventDefault();
                  purchaseMutation.mutate();
                }}
                disabled={purchaseMutation.isPending}
                className="flex-[1.5] h-10 rounded-xl font-semibold text-xs"
              >
                {purchaseMutation.isPending ? (
                  <Loader2 className="animate-spin mr-2" size={14} />
                ) : (
                  <ArrowRight className="mr-2" size={14} />
                )}

                {purchaseMutation.isPending
                  ? "Processing..."
                  : "Unlock This Idea Now"}
              </AlertDialogAction>
            </div>

            {/* TRUST + MICROCOPY */}
            <div className="text-center space-y-1">
              <p className="text-[10px] text-muted-foreground flex items-center justify-center gap-1">
                <Zap size={10} className="text-primary" />
                Instant access after payment • No hidden fees
              </p>

              <div className="flex items-center justify-center gap-1 opacity-60">
                <Lock size={10} />
                <span className="text-[9px] uppercase tracking-wider">
                  Secure Payment
                </span>
              </div>
            </div>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
