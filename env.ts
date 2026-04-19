import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  server: {
    FRONTEND_URL: z.string(),
    BACKEND_URL: z.string(),
  },

  client: {
    NEXT_PUBLIC_BACKEND_API_URL: z.string(),
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: z.string(),
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string(),
  },

  runtimeEnv: {
    FRONTEND_URL: process.env.FRONTEND_URL,
    BACKEND_URL: process.env.BACKEND_URL,
    NEXT_PUBLIC_BACKEND_API_URL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET:
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
});
