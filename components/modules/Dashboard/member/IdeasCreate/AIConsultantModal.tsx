/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Sparkles, Loader2, Wand2, Check } from "lucide-react";
import { motion } from "framer-motion";

import { IAIGeneratedContent } from "@/types/ai.types";
import { toast } from "sonner";
import { handleAIError } from "@/lib/ai-utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/hooks/useCategories";
import { generateAIContentAction } from "@/services/ai/ai.services";

interface AIConsultantModalProps {
  onApply: (data: IAIGeneratedContent & { categoryId?: string }) => void;
}

export default function AIConsultantModal({ onApply }: AIConsultantModalProps) {
  const [topic, setTopic] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<IAIGeneratedContent | null>(null);
  const { data: categories } = useCategories();
  const [open, setOpen] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return toast.error("Please enter a topic");

    setIsGenerating(true);
    setResult(null);

    const res = await generateAIContentAction(topic, selectedCategoryId);

    if (res.success && res.data) {
      setResult(res.data);
      toast.success("AI Content Generated!");
    } else {
      handleAIError(res);
    }

    setIsGenerating(false);
  };

  const handleApply = () => {
    if (!result) return;
    const categoryId = selectedCategoryId;

    onApply({ ...result, categoryId });
    setOpen(false);
    toast.success("Content applied to form!");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-primary/5 border-primary/20 text-primary hover:bg-primary/10 gap-2 rounded-xl"
        >
          <Sparkles size={16} />
          AI Consultant
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:w-4xl w-[98vw] max-w-[1400px]! max-h-[92vh] overflow-y-auto rounded-3xl border-border shadow-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="text-primary" />
            AI Eco Consultant
          </DialogTitle>
          <DialogDescription>
            Enter a basic topic or idea, and our AI will help you flesh out a
            detailed proposal.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex flex-col gap-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Category</label>
              <Select
                onValueChange={setSelectedCategoryId}
                value={selectedCategoryId}
              >
                <SelectTrigger className="rounded-xl bg-muted/50 border-border">
                  <SelectValue placeholder="Choose a category" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {categories?.data?.map((cat: any) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                What&apos;s your idea about?
              </label>
              <div className="flex gap-2">
                <input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Solar powered urban irrigation"
                  className="flex-1 bg-muted/50 border border-border rounded-xl px-4 py-2 outline-none focus:ring-2 ring-primary/20 transition h-10"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !topic.trim()}
              className="gap-2 rounded-xl w-full md:w-auto"
            >
              {isGenerating ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Wand2 size={16} />
              )}
              Generate Proposal
            </Button>
          </div>

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4 border border-primary/20 bg-primary/5 rounded-2xl p-6"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h4 className="font-bold text-lg text-primary">
                    {result.title}
                  </h4>
                  {result.slug && (
                    <p className="text-[10px] text-muted-foreground font-mono">
                      Slug: {result.slug}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 text-sm">
                <div>
                  <span className="font-bold block mb-1">Problem:</span>
                  <p className="text-muted-foreground line-clamp-2">
                    {result.problem}
                  </p>
                </div>
                <div>
                  <span className="font-bold block mb-1">Solution:</span>
                  <p className="text-muted-foreground line-clamp-2">
                    {result.solution}
                  </p>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <Button variant="ghost" onClick={() => setResult(null)}>
                  Discard
                </Button>
                <Button onClick={handleApply} className="gap-2">
                  <Check size={16} />
                  Apply to Form
                </Button>
              </div>
            </motion.div>
          )}

          {!result && !isGenerating && (
            <div className="py-12 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center text-muted-foreground">
              <Sparkles size={48} className="opacity-10 mb-4" />
              <p className="text-sm">Enter a topic above to start generating</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
