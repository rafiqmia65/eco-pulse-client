import { z } from "zod";

export const createIdeaSchema = z
  .object({
    title: z
      .string()
      .min(20, "Title must be at least 20 characters")
      .max(150)
      .trim(),
    problem: z
      .string()
      .min(250, "Problem must be at least 250 characters")
      .trim(),
    solution: z
      .string()
      .min(500, "Solution must be at least 500 characters")
      .trim(),
    description: z
      .string()
      .min(500, "Description must be at least 500 characters")
      .trim(),
    image: z.string().min(1, "Idea Image is required"),
    slug: z
      .string()
      .min(3)
      .max(200)
      .regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens")
      .optional()
      .or(z.literal(""))
      .nullable(),

    categoryId: z.string().min(1, "Category is required"),

    isPaid: z.boolean().default(false),
    price: z.number().nullable().optional(),

    isDraft: z.boolean().default(false),
  })
  .refine(
    (data) => {
      if (data.isPaid) return data.price != null && data.price > 0;
      return true;
    },
    {
      message: "Price is required for paid idea",
      path: ["price"],
    },
  )
  .refine(
    (data) => {
      if (!data.isPaid) return data.price == null;
      return true;
    },
    {
      message: "Free idea should not have price",
      path: ["price"],
    },
  );
