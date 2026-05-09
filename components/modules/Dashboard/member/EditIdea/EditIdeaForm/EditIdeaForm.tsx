/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";
import { useForm, useStore } from "@tanstack/react-form";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import AIConsultantModal from "../../IdeasCreate/AIConsultantModal";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useCategories } from "@/hooks/useCategories";
import { useIdeaManagement } from "@/hooks/useIdeaManagement";
import { uploadImage } from "@/lib/upload/uploadImage";
import { createIdeaSchema } from "@/zod/ideas.validation";
import { IIdeaDetailsByOwner } from "@/types/memberTypes/IdeaDetailsByOwner.types";

import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

export default function EditIdeaForm({ idea }: { idea: IIdeaDetailsByOwner }) {
  const router = useRouter();
  const { updateMutation } = useIdeaManagement();

  const { data: categories } = useCategories();

  const [preview, setPreview] = useState<string | null>(idea.image || null);
  const [isPaid, setIsPaid] = useState(idea.isPaid);
  const [autoSlug, setAutoSlug] = useState(false);
  const [submitType, setSubmitType] = useState<"draft" | "publish" | null>(
    null,
  );
  const isDraftRef = useRef(idea.status === "DRAFT");

  const form = useForm({
    defaultValues: {
      title: idea.title,
      slug: idea.slug || "",
      problem: idea.problem,
      solution: idea.solution,
      description: idea.description,
      image: idea.image || "",
      categoryId: idea.categoryId,
      isPaid: idea.isPaid,
      price: idea.price || "",
      isDraft: idea.status === "DRAFT",
    },

    onSubmit: async ({ value }) => {
      try {
        const payload: any = {
          ...value,
          slug: value.slug || null,
          image: value.image,
          isPaid,
          isDraft: isDraftRef.current,
        };

        if (isPaid) {
          payload.price = Number(value.price);
        } else {
          delete payload.price;
        }

        const parsed = createIdeaSchema.safeParse(payload);

        if (!parsed.success) {
          return toast.error(parsed.error.issues[0]?.message);
        }

        await updateMutation.mutateAsync({
          id: idea.id,
          payload,
        });

        toast.success("Idea updated successfully");
        router.push(`/dashboard/ideas/${idea.id}`);
      } catch (err: any) {
        toast.error(
          err?.response?.data?.message ||
            err?.message ||
            "Something went wrong",
        );
      } finally {
        setSubmitType(null);
      }
    },
  });

  const titleValue = useStore(form.store, (s) => s.values.title);
  const setFieldValue = form.setFieldValue;

  useEffect(() => {
    if (!autoSlug) return;
    if (titleValue) {
      setFieldValue("slug", slugify(titleValue));
    }
  }, [titleValue, autoSlug, setFieldValue]);

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);

    try {
      const url = await uploadImage(file);
      form.setFieldValue("image", url);
      toast.success("Image uploaded");
    } catch {
      setPreview(idea.image || null);
      toast.error("Image upload failed");
    }
  };

  const handleAIApply = (
    data: import("@/types/ai.types").IAIGeneratedContent & {
      categoryId?: string;
    },
  ) => {
    form.setFieldValue("title", data.title);
    form.setFieldValue("problem", data.problem);
    form.setFieldValue("solution", data.solution);
    form.setFieldValue("description", data.description);
    if (data.categoryId) form.setFieldValue("categoryId", data.categoryId);
    setAutoSlug(true);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-5 max-w-4xl mx-auto"
    >
      <div className="bg-card border rounded-2xl p-6 shadow-lg space-y-5">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* LEFT: IMAGE */}
          <div className="flex flex-col items-center gap-3 w-full md:w-auto">
            <div className="w-24 h-24 rounded-xl overflow-hidden border bg-muted">
              {preview ? (
                <Image src={preview} alt="preview" width={96} height={96} />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <Upload className="w-6 h-6 opacity-60" />
                </div>
              )}
            </div>

            <label className="flex items-center gap-2 text-sm cursor-pointer text-primary">
              <Upload className="w-4 h-4" />
              Upload Cover
              <input type="file" hidden onChange={handleImage} />
            </label>
          </div>

          {/* RIGHT: HEADER */}
          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center md:justify-between gap-3">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">Edit your idea</h2>
              </div>
              {/* AI CONSULTANT */}
              <AIConsultantModal onApply={handleAIApply} />
            </div>

            <p className="text-sm text-muted-foreground max-w-md">
              Update the details of your idea to keep the community informed.
            </p>
          </div>
        </div>

        {/* TITLE */}
        <form.Field
          name="title"
          validators={{ onChange: createIdeaSchema.shape.title }}
        >
          {(field) => (
            <AppField
              field={field}
              placeholder="Enter your idea title"
              label="Idea Title"
            />
          )}
        </form.Field>

        {/* SLUG */}
        <form.Field name="slug">
          {(field) => (
            <AppField
              field={field}
              label="Slug"
              placeholder="auto-generated"
              onChange={(e: any) => {
                setAutoSlug(false);
                field.handleChange(e.target.value);
              }}
            />
          )}
        </form.Field>

        {/* CATEGORY (Improved UI) */}
        <form.Field
          name="categoryId"
          validators={{ onChange: createIdeaSchema.shape.categoryId }}
        >
          {(field) => (
            <div className="space-y-1">
              <label className="text-sm font-medium">Category</label>

              <Select
                value={field.state.value}
                onValueChange={(value) => field.handleChange(value)}
              >
                <SelectTrigger className="w-full rounded-xl border focus:ring-2 focus:ring-primary/40">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>

                <SelectContent>
                  {categories?.data?.map((c: any) => (
                    <SelectItem
                      key={c.id}
                      value={c.id}
                      className="cursor-pointer"
                    >
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </form.Field>

        {/* TEXT AREAS */}
        <form.Field
          name="problem"
          validators={{ onChange: createIdeaSchema.shape.problem }}
        >
          {(field) => (
            <AppField
              field={field}
              editor
              label="Problem"
              placeholder="What problem are you solving?"
            />
          )}
        </form.Field>

        <form.Field
          name="solution"
          validators={{ onChange: createIdeaSchema.shape.solution }}
        >
          {(field) => (
            <AppField
              field={field}
              editor
              label="Solution"
              placeholder="Explain your solution clearly"
            />
          )}
        </form.Field>

        <form.Field
          name="description"
          validators={{ onChange: createIdeaSchema.shape.description }}
        >
          {(field) => (
            <AppField
              field={field}
              editor
              label="Description"
              placeholder="Provide full details about your idea"
            />
          )}
        </form.Field>

        {/* MONETIZATION */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={isPaid}
              onChange={(e) => {
                setIsPaid(e.target.checked);
                form.setFieldValue("isPaid", e.target.checked);
              }}
            />
            Paid Idea
          </label>

          {isPaid && (
            <form.Field name="price">
              {(field) => (
                <AppField
                  field={field}
                  type="number"
                  label="Price"
                  placeholder="Enter price"
                />
              )}
            </form.Field>
          )}
        </div>

        {/* ACTION BUTTONS SIDE BY SIDE */}
        <form.Subscribe>
          {({ canSubmit, isSubmitting }) => (
            <div className="flex gap-3 pt-2">
              {/* DRAFT */}
              <AppSubmitButton
                type="button"
                isPending={isSubmitting && submitType === "draft"}
                pendingLabel="Saving Draft..."
                disabled={isSubmitting}
                variant="outline"
                onClick={() => {
                  setSubmitType("draft");
                  isDraftRef.current = true;
                  form.handleSubmit();
                }}
                className="flex-1 px-4 py-2 rounded-xl border font-medium transition"
              >
                Save as Draft
              </AppSubmitButton>

              {/* PUBLISH */}
              <AppSubmitButton
                type="submit"
                isPending={isSubmitting && submitType === "publish"}
                disabled={!canSubmit}
                pendingLabel="Publishing..."
                className="flex-1"
                onClick={() => {
                  setSubmitType("publish");
                  isDraftRef.current = false;
                }}
              >
                Publish Idea
              </AppSubmitButton>
            </div>
          )}
        </form.Subscribe>
      </div>
    </form>
  );
}
