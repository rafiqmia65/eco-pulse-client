"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Upload, User, Mail } from "lucide-react";

import {
  updateProfileSchema,
  UpdateProfileFormValues,
} from "@/zod/auth.validation";
import { uploadImage } from "@/lib/upload/uploadImage";
import { AuthUser } from "@/types/auth.types";

import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { updateProfileUser } from "@/services/user/user.services";

interface UpdateProfileFormProps {
  user: AuthUser;
}

const UpdateProfileForm = ({ user }: UpdateProfileFormProps) => {
  const [preview, setPreview] = useState<string | null>(user.image || null);

  const form = useForm({
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      image: user.image || "",
    } as UpdateProfileFormValues,

    onSubmit: async ({ value }) => {
      try {
        const res = await updateProfileUser(value);

        if (!res.success) {
          toast.error(res.message || "Failed to update profile");
          return;
        }

        toast.success("Profile updated successfully");
      } catch {
        toast.error("Something went wrong");
      }
    },
  });

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
      setPreview(user.image || null);
      toast.error("Image upload failed");
    }
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm flex flex-col h-full">
      <div className="flex items-center gap-4 border-b pb-4">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          <User className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Profile Information</h2>
          <p className="text-sm text-muted-foreground">
            Update your personal details
          </p>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="flex flex-col flex-1 space-y-5"
      >
        {/* IMAGE */}
        <div className="flex flex-col items-center sm:flex-row gap-6 p-4 bg-muted/30 rounded-xl border border-dashed">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-background shadow-md">
            {preview ? (
              <Image
                src={preview}
                alt="preview"
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
                <User className="w-10 h-10" />
              </div>
            )}
          </div>

          <div className="space-y-2 text-center sm:text-left">
            <h3 className="font-medium">Profile Photo</h3>
            <p className="text-xs text-muted-foreground">
              JPG, GIF or PNG. Max size of 2MB
            </p>
            <label className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity cursor-pointer">
              <Upload className="w-4 h-4" />
              Upload New Photo
              <input type="file" hidden onChange={handleImage} />
            </label>
          </div>
        </div>

        {/* NAME */}
        <form.Field
          name="name"
          validators={{ onChange: updateProfileSchema.shape.name }}
        >
          {(field) => (
            <AppField
              field={field}
              label="Full Name"
              placeholder="Enter your full name"
              prepend={<User className="w-4 h-4" />}
            />
          )}
        </form.Field>

        {/* EMAIL */}
        <form.Field
          name="email"
          validators={{ onChange: updateProfileSchema.shape.email }}
        >
          {(field) => (
            <AppField
              field={field}
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              prepend={<Mail className="w-4 h-4" />}
            />
          )}
        </form.Field>

        {/* SUBMIT */}
        <div className="mt-auto pt-4">
          <form.Subscribe>
            {({ canSubmit, isSubmitting, isDirty }) => (
              <AppSubmitButton
                type="submit"
                isPending={isSubmitting}
                pendingLabel="Saving..."
                disabled={!canSubmit || !isDirty}
              >
                Save Changes
              </AppSubmitButton>
            )}
          </form.Subscribe>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfileForm;
