"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Upload } from "lucide-react";

import { registerUser } from "@/app/(public)/(auth)/register/_actions";
import { registerSchema, RegisterFormValues } from "@/zod/auth.validation";
import { uploadImage } from "@/lib/upload/uploadImage";

import AppField from "@/components/shared/form/AppField";
import AppPasswordField from "@/components/shared/form/AppPasswordField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";

const RegisterForm = () => {
  const router = useRouter();

  const [preview, setPreview] = useState<string | null>(null);
  const [agree, setAgree] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      image: "",
    } as RegisterFormValues,

    onSubmit: async ({ value }) => {
      if (!agree) {
        toast.error("You must accept Terms & Conditions");
        return;
      }

      try {
        const res = await registerUser(value);

        if (!res.success) {
          toast.error(res.message || "Registration failed");
          return;
        }

        toast.success("Account created successfully 🎉");

        form.reset();
        setPreview(null);
        setAgree(false);

        router.push("/login");
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
        {/* IMAGE */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-20 h-20 rounded-full overflow-hidden border bg-muted">
            {preview ? (
              <Image src={preview} alt="preview" width={80} height={80} />
            ) : (
              <div className="text-xs text-muted-foreground">No Image</div>
            )}
          </div>

          <label className="flex items-center gap-2 text-sm cursor-pointer text-primary">
            <Upload className="w-4 h-4" />
            Upload Profile Image
            <input type="file" hidden onChange={handleImage} />
          </label>
        </div>

        {/* NAME */}
        <form.Field
          name="name"
          validators={{ onChange: registerSchema.shape.name }}
        >
          {(field) => (
            <AppField
              field={field}
              label="Full Name"
              placeholder="Enter your full name"
            />
          )}
        </form.Field>

        {/* EMAIL */}
        <form.Field
          name="email"
          validators={{ onChange: registerSchema.shape.email }}
        >
          {(field) => (
            <AppField
              field={field}
              label="Email Address"
              type="email"
              placeholder="Enter your email"
            />
          )}
        </form.Field>

        {/* PASSWORD */}
        <form.Field
          name="password"
          validators={{ onChange: registerSchema.shape.password }}
        >
          {(field) => (
            <AppPasswordField
              field={field}
              label="Password"
              placeholder="Create strong password"
            />
          )}
        </form.Field>

        {/* TERMS */}
        <div className="flex items-start gap-2 text-xs text-muted-foreground">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <span>I agree to Terms & Privacy Policy</span>
        </div>

        {/* SUBMIT */}
        <form.Subscribe>
          {({ canSubmit, isSubmitting }) => (
            <AppSubmitButton
              type="submit"
              isPending={isSubmitting}
              pendingLabel="Creating account..."
              disabled={!canSubmit || !agree}
            >
              Create Account
            </AppSubmitButton>
          )}
        </form.Subscribe>
      </div>
    </form>
  );
};

export default RegisterForm;
