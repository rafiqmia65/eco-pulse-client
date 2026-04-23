/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";
// import { useRouter } from "next/navigation";
import { useForm, useStore } from "@tanstack/react-form";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import Image from "next/image";

import { useCategories } from "@/hooks/useCategories";
import { useCreateIdea } from "@/app/(DashboardLayout)/dashboard/ideas-create/_actions";
import { uploadImage } from "@/lib/upload/uploadImage";
import { createIdeaSchema } from "@/zod/ideas.validation";

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

const IdeasCreateForm = () => {
  // const router = useRouter();
  const { mutateAsync } = useCreateIdea();
  const { data: categories } = useCategories();

  const [preview, setPreview] = useState<string | null>(null);
  const [isPaid, setIsPaid] = useState(false);
  const [autoSlug, setAutoSlug] = useState(true);
  const [submitType, setSubmitType] = useState<"draft" | "publish" | null>(
    null,
  );
  const isDraftRef = useRef(false);

  const form = useForm({
    defaultValues: {
      title: "",
      slug: "",
      problem: "",
      solution: "",
      description: "",
      image: "",
      categoryId: "",
      isPaid: false,
      price: Number,
      isDraft: false,
    },

    onSubmit: async ({ value }) => {
      try {
        const payload = {
          ...value,
          slug: value.slug || null,
          image: value.image, // Keep empty string so Zod min(1) catches it
          isPaid,
          price: isPaid ? Number(value.price) : null,
          isDraft: isDraftRef.current,
        };

        const parsed = createIdeaSchema.safeParse(payload);

        if (!parsed.success) {
          return toast.error(parsed.error.issues[0]?.message);
        }

        const res = await mutateAsync(payload);

        if (!res?.success) {
          return toast.error(res?.message || "Request failed");
        }

        toast.success(res.message || "Success");

        form.reset();
        setPreview(null);
        setIsPaid(false);
        setAutoSlug(true);
        isDraftRef.current = false;

        // if (!payload.isDraft) {
        //   router.push("/dashboard/all-ideas");
        // }
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

  // slug auto generate
  const titleValue = useStore(form.store, (s) => s.values.title);
  const setFieldValue = form.setFieldValue;

  useEffect(() => {
    if (!autoSlug) return;
    if (titleValue) {
      setFieldValue("slug", slugify(titleValue));
    }
  }, [titleValue, autoSlug, setFieldValue]);

  // image upload
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
      setPreview(null);
      toast.error("Image upload failed");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-5"
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
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Upload className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Add your best idea</h2>
            </div>

            <p className="text-sm text-muted-foreground max-w-md">
              Share something impactful with the community. Your idea could
              inspire real-world solutions.
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
              textarea
              rows={4}
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
              textarea
              rows={4}
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
              textarea
              rows={4}
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
                pendingLabel="Drafting..."
                disabled={isSubmitting}
                variant="outline"
                onClick={() => {
                  setSubmitType("draft");
                  isDraftRef.current = true;
                  form.handleSubmit();
                }}
                className="flex-1 px-4 py-2 rounded-xl border font-medium transition"
              >
                Save to Draft
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
};

export default IdeasCreateForm;
