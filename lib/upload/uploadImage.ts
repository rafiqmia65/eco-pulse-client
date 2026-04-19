import { env } from "@/env";

export const uploadImage = async (file: File): Promise<string> => {
  if (!file) throw new Error("No file provided");

  const formData = new FormData();
  formData.append("file", file);

  formData.append("upload_preset", env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

  const cloudName = env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  const data = await res.json();

  if (!res.ok || !data.secure_url) {
    throw new Error(data?.error?.message || "Image upload failed");
  }

  return data.secure_url;
};
