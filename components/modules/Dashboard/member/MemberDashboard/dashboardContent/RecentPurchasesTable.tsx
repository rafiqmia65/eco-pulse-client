import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Image from "next/image";
import { RecentPurchase } from "@/types/memberTypes/DashboardStats.types";

/**
 * RecentPurchasesTable Component
 * Renders a detailed, responsive table of the user's acquired ideas.
 * Includes internal horizontal scrolling for mobile and premium hover effects.
 */
export const RecentPurchasesTable = ({
  purchases,
}: {
  purchases: RecentPurchase[];
}) => {
  return (
    <Card className="border-none shadow-xl bg-card/60 backdrop-blur-xl overflow-hidden">
      {/* Header */}
      <CardHeader className="border-b flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold">Recent Purchases</CardTitle>

        <span className="text-xs text-muted-foreground font-medium">
          {purchases?.length || 0} items
        </span>
      </CardHeader>

      <CardContent className="p-0">
        {purchases?.length > 0 ? (
          <div className="w-full overflow-x-auto">
            <table className="w-full text-sm min-w-175">
              {/* HEADER */}
              <thead className="bg-muted/40 text-xs uppercase sticky top-0 z-10 backdrop-blur">
                <tr>
                  <th className="px-6 py-4 text-left">Idea</th>
                  <th className="px-6 py-4 text-center">Date</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                  <th className="px-6 py-4 text-right">Status</th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody className="divide-y">
                {purchases.map((p) => (
                  <tr
                    key={p.id}
                    className="group hover:bg-primary/5 transition-all duration-200"
                  >
                    {/* IDEA CELL */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-11 h-11 rounded-xl overflow-hidden shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                          {p.idea.image ? (
                            <Image
                              src={p.idea.image}
                              alt={p.idea.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center">
                              <ShoppingBag size={18} />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="font-semibold text-sm truncate max-w-55 group-hover:text-primary transition-colors">
                            {p.idea.title}
                          </p>
                          <p className="text-[10px] text-muted-foreground font-medium">
                            #{p.id.slice(0, 8)}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* DATE */}
                    <td className="px-6 py-4 text-center text-muted-foreground font-medium whitespace-nowrap">
                      {format(new Date(p.createdAt), "MMM d, yyyy")}
                    </td>

                    {/* AMOUNT */}
                    <td className="px-6 py-4 text-right font-bold text-base whitespace-nowrap">
                      ${p.amount.toFixed(2)}
                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-4 text-right">
                      <Badge className="bg-emerald-500/10 text-emerald-600 border-none font-semibold px-3 py-1 rounded-lg">
                        {p.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-20 text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>

            <div>
              <p className="font-bold text-lg">No Purchases Yet</p>
              <p className="text-sm text-muted-foreground max-w-65 mx-auto">
                You haven&apos;t invested in any ideas. Explore the marketplace
                and start investing.
              </p>
            </div>

            <button className="mt-2 px-5 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition">
              Explore Ideas
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
