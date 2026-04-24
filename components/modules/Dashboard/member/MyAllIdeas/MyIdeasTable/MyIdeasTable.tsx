/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Layers,
  Send,
  Loader2,
} from "lucide-react";
import { IIdea } from "@/types/memberTypes/myAllIdeas.types";
import { useSubmitIdea } from "@/app/(DashboardLayout)/dashboard/my-ideas/_actions";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface MyIdeasTableProps {
  ideas: IIdea[];
  isLoading: boolean;
}

const statusStyles = {
  DRAFT: "bg-gray-100 text-gray-700 border-gray-200",
  REVIEW: "bg-yellow-100 text-yellow-700 border-yellow-200",
  APPROVED: "bg-green-100 text-green-700 border-green-200",
  REJECTED: "bg-red-100 text-red-700 border-red-200",
};

const MyIdeasTable: React.FC<MyIdeasTableProps> = ({ ideas, isLoading }) => {
  const { mutate: submitIdea, isPending: isSubmitting } = useSubmitIdea();
  const [submittingId, setSubmittingId] = React.useState<string | null>(null);

  const handleSubmit = (id: string) => {
    setSubmittingId(id);
    submitIdea(id, {
      onSuccess: () => {
        toast.success("Idea submitted for review successfully");
        setSubmittingId(null);
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message ||
            error?.message ||
            "Failed to submit idea",
        );
        setSubmittingId(null);
      },
    });
  };

  if (isLoading) {
    return (
      <div className="bg-card border rounded-2xl overflow-hidden shadow-sm">
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
      <div className="bg-card border rounded-2xl p-12 text-center shadow-sm">
        <div className="max-w-xs mx-auto space-y-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto text-muted-foreground">
            <Layers className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold">No ideas found</h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your filters or search terms to find what you&apos;re
            looking for.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border rounded-2xl overflow-hidden shadow-sm overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-200">
        <thead>
          <tr className="bg-muted/30 border-b">
            <th className="p-4 text-sm font-semibold">Idea Details</th>
            <th className="p-4 text-sm font-semibold">Category</th>
            <th className="p-4 text-sm font-semibold">Price</th>
            <th className="p-4 text-sm font-semibold">Status</th>
            <th className="p-4 text-sm font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {ideas.map((idea) => (
            <tr key={idea.id} className="hover:bg-muted/20 transition-colors">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden border bg-muted shrink-0">
                    {idea.image ? (
                      <Image
                        src={idea.image}
                        alt={idea.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground opacity-40">
                        <Layers className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate max-w-62.5">
                      {idea.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-muted-foreground font-medium uppercase tracking-wider">
                      <Calendar className="w-3 h-3" />
                      {idea.createdAt
                        ? format(new Date(idea.createdAt), "MMM dd, yyyy")
                        : "N/A"}
                    </div>
                  </div>
                </div>
              </td>
              <td className="p-4">
                <Badge variant="outline" className="rounded-full font-medium">
                  {idea.category?.name || "Uncategorized"}
                </Badge>
              </td>
              <td className="p-4">
                {idea.isPaid ? (
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-primary">PAID</span>
                    <span className="text-sm font-semibold text-green-600">
                      ${idea.price}
                    </span>
                  </div>
                ) : (
                  <span className="text-xs font-medium text-muted-foreground italic">
                    FREE
                  </span>
                )}
              </td>
              <td className="p-4">
                <Badge
                  className={`rounded-full px-3 py-0.5 text-[10px] font-bold border ${
                    statusStyles[idea.status as keyof typeof statusStyles]
                  }`}
                >
                  {idea.status}
                </Badge>
              </td>
              <td className="p-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  {idea.status === "DRAFT" && (
                    <button
                      onClick={() => handleSubmit(idea.id as string)}
                      disabled={isSubmitting && submittingId === idea.id}
                      className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {isSubmitting && submittingId === idea.id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Send className="w-3.5 h-3.5" />
                      )}
                      <span>Publish</span>
                    </button>
                  )}
                  <Link
                    href={`/dashboard/ideas/${idea.id}`}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-muted rounded-lg transition-colors border"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>See more</span>
                  </Link>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-48 rounded-xl"
                    >
                      {idea.status === "DRAFT" && (
                        <DropdownMenuItem
                          onClick={() => handleSubmit(idea.id as string)}
                          disabled={isSubmitting && submittingId === idea.id}
                          className="gap-2 cursor-pointer rounded-lg text-primary focus:text-primary font-semibold"
                        >
                          {isSubmitting && submittingId === idea.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Send className="w-4 h-4" />
                          )}{" "}
                          Submit for Review
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="gap-2 cursor-pointer rounded-lg">
                        <Link
                          href={`/dashboard/ideas/${idea.id}`}
                          className="flex items-center gap-2 w-full"
                        >
                          <Eye className="w-4 h-4" /> View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 cursor-pointer rounded-lg">
                        <Edit className="w-4 h-4" /> Edit Idea
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 cursor-pointer text-red-600 focus:text-red-600 rounded-lg">
                        <Trash2 className="w-4 h-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyIdeasTable;
