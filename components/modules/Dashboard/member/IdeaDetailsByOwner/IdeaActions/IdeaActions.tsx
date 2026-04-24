"use client";

import {
  useDeleteIdea,
  useSubmitIdeaAction,
} from "@/app/(DashboardLayout)/dashboard/ideas/[id]/_actions";
import { Button } from "@/components/ui/button";
import { IIdeaDetailsByOwner } from "@/types/memberTypes/IdeaDetailsByOwner.types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function IdeaActions({ idea }: { idea: IIdeaDetailsByOwner }) {
  const router = useRouter();
  const sub = useSubmitIdeaAction();
  const del = useDeleteIdea();

  const handleSubmit = async () => {
    sub.mutate(idea.id, {
      onSuccess: () => {
        toast.success("Idea submitted for review");
      },
    });
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this idea?")) {
      del.mutate(idea.id, {
        onSuccess: () => {
          toast.success("Idea deleted");
          router.push("/dashboard/my-ideas");
        },
      });
    }
  };

  return (
    <div className="bg-card border rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-md transition">
      <h3 className="font-semibold text-sm">Actions</h3>

      {idea.status === "DRAFT" && (
        <Button
          onClick={handleSubmit}
          className="w-full"
          disabled={sub.isPending}
        >
          Submit for Review
        </Button>
      )}

      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" onClick={() => router.push(`/dashboard/ideas-create?id=${idea.id}`)}>
          Edit Idea
        </Button>
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={del.isPending}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
