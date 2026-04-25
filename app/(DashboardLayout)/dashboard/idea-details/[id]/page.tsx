import { Suspense } from "react";
import { getMyPurchasedIdeaDetails } from "@/services/memberDashboard/purchases.services";
import { getUserInfo } from "@/services/auth/auth.services";
import IdeaHero from "@/components/modules/public/IdeaDetails/IdeaHero/IdeaHero";
import IdeaContent from "@/components/modules/public/IdeaDetails/IdeaContent/IdeaContent";
import CommentsSection from "@/components/shared/Comments/CommentsSection";
import { RoleType } from "@/constants/roles";
import { Card } from "@/components/ui/card";
import { CreditCard, Calendar, Hash, ShieldCheck } from "lucide-react";
import { format } from "date-fns";

export default async function PurchasedIdeaDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getUserInfo();
  const response = await getMyPurchasedIdeaDetails(id);
  const idea = response?.data;

  if (!idea) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <p className="text-muted-foreground font-medium">
          Idea details not found.
        </p>
      </div>
    );
  }

  return (
    <div className="relative pb-20">
      <Suspense fallback={<div className="h-96 animate-pulse bg-muted" />}>
        {/* Reuse the Public Hero and Content */}
        <IdeaHero idea={idea as any} />

        <div className="space-y-6">
          {/* Payment Receipt Information */}
          <Card className="p-6 border shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b pb-3">
              <ShieldCheck className="w-5 h-5 text-green-500" />
              <h3 className="font-bold text-lg">Purchase Receipt</h3>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                  <Hash className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                    Transaction ID
                  </p>
                  <p className="text-xs font-mono break-all">
                    {idea.paymentInfo.transactionId}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                  <CreditCard className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                    Amount Paid
                  </p>
                  <p className="text-sm font-bold">
                    ${idea.paymentInfo.amount.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                    Purchased On
                  </p>
                  <p className="text-sm font-medium">
                    {format(new Date(idea.purchasedAt), "MMMM dd, yyyy")}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-2 border-t text-center">
              <p className="text-[10px] text-muted-foreground font-medium uppercase">
                Access Level
              </p>
              <p className="text-xs font-bold text-primary mt-1 px-3 py-1 bg-primary/10 rounded-full inline-block">
                {idea.accessLevel.replace(/_/g, " ")}
              </p>
            </div>
          </Card>

          {/* Author Info */}
          <Card className="p-6 border shadow-sm">
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-muted-foreground">
              About the Author
            </h4>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                {idea.author.name[0]}
              </div>
              <div>
                <p className="font-bold">{idea.author.name}</p>
                <p className="text-xs text-muted-foreground">
                  {idea.author.email}
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <IdeaContent idea={idea as any} />

          <CommentsSection
            ideaId={idea.id}
            currentUserId={user?.id}
            currentUserRole={user?.role as RoleType}
          />
        </div>
      </Suspense>
    </div>
  );
}
