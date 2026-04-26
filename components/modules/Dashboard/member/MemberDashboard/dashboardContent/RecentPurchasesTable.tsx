import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ShoppingBag,
  Calendar,
  Layers,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Image from "next/image";
import { RecentPurchase } from "@/types/memberTypes/DashboardStats.types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import Link from "next/link";


/**
 * RecentPurchasesTable Component
 * Renders a detailed, responsive table of the user's acquired ideas.
 * Styled to match the premium dashboard aesthetic.
 */
export const RecentPurchasesTable = ({
  purchases,
}: {
  purchases: RecentPurchase[];
}) => {
  return (
    <TooltipProvider>
      <Card className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xs overflow-hidden shadow-sm">
      {/* Header */}
      <CardHeader className="bg-muted/30 border-b border-border/40 px-6 py-4 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg font-bold">Recent Purchases</CardTitle>
        <Badge
          variant="outline"
          className="bg-background/50 font-mono text-[10px]"
        >
          {purchases?.length || 0} ITEMS
        </Badge>
      </CardHeader>

      <CardContent className="p-0">
        {purchases?.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/20">
                <TableRow className="hover:bg-transparent border-border/40">
                  <TableHead className="px-6 py-4 text-[11px] uppercase tracking-wider font-bold text-muted-foreground w-[300px]">
                    Idea
                  </TableHead>
                  <TableHead className="px-6 py-4 text-[11px] uppercase tracking-wider font-bold text-muted-foreground text-center">
                    Purchase Date
                  </TableHead>
                  <TableHead className="px-6 py-4 text-[11px] uppercase tracking-wider font-bold text-muted-foreground text-right">
                    Amount
                  </TableHead>
                  <TableHead className="px-6 py-4 text-[11px] uppercase tracking-wider font-bold text-muted-foreground text-right">
                    Status
                  </TableHead>
                  <TableHead className="px-6 py-4 text-[11px] uppercase tracking-wider font-bold text-muted-foreground text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {purchases.map((p) => (
                  <TableRow
                    key={p.id}
                    className="hover:bg-muted/40 transition-colors border-border/40 group"
                  >
                    {/* IDEA CELL */}
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-muted shrink-0 border border-border/50 shadow-sm group-hover:scale-105 transition-transform duration-500">
                          {p.idea.image ? (
                            <Image
                              src={p.idea.image}
                              alt={p.idea.title}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground opacity-40">
                              <Layers size={20} />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="font-bold text-foreground text-sm truncate leading-tight group-hover:text-primary transition-colors">
                            {p.idea.title}
                          </p>
                          <p className="text-[10px] text-muted-foreground font-mono mt-1 opacity-70 uppercase tracking-tighter">
                            ID: {p.id.slice(0, 8)}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* DATE */}
                    <TableCell className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2 text-xs font-medium text-foreground">
                        <Calendar className="w-3.5 h-3.5 text-muted-foreground/60" />
                        {format(new Date(p.createdAt), "MMM dd, yyyy")}
                      </div>
                    </TableCell>

                    {/* AMOUNT */}
                    <TableCell className="px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-1 text-sm font-bold text-foreground">
                        <span className="text-muted-foreground font-normal text-xs">
                          $
                        </span>
                        {p.amount.toFixed(2)}
                      </div>
                    </TableCell>

                    {/* STATUS */}
                    <TableCell className="px-6 py-4 text-right">
                      <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                        {p.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-right">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link href={`/dashboard/idea-details/${p.idea.id}`}>
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
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="py-24 text-center">
            <div className="mx-auto w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-4 text-muted-foreground/30">
              <ShoppingBag className="h-8 w-8" />
            </div>
            <div className="max-w-xs mx-auto space-y-2">
              <p className="font-bold text-lg">No Purchases Yet</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                You haven&apos;t invested in any ideas yet. Explore the
                marketplace to discover your next opportunity.
              </p>
              <button className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-bold hover:opacity-90 transition shadow-sm">
                Explore Marketplace
              </button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
    </TooltipProvider>
  );
};
