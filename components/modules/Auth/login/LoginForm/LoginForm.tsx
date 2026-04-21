"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { loginSchema, LoginFormValues } from "@/zod/auth.validation";

import AppField from "@/components/shared/form/AppField";
import AppPasswordField from "@/components/shared/form/AppPasswordField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { loginAction } from "@/app/(PublicLayout)/(Auth)/login/_actions";

const LoginForm = () => {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    } as LoginFormValues,

    onSubmit: async ({ value }) => {
      const res = await loginAction(value);

      if (!res.success) {
        toast.error(res.message || "Login failed");
        return;
      }

      toast.success("Login successful");

      // IMPORTANT: refresh server state
      router.refresh();

      // role-based redirect
      const redirectPath =
        res.role === "ADMIN" ? "/admin/dashboard" : "/dashboard";
      router.push(redirectPath);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-5"
    >
      <div className="bg-card border rounded-2xl p-6 shadow-lg space-y-5">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold">Sign In</h2>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to continue
          </p>
        </div>

        <form.Field
          name="email"
          validators={{ onChange: loginSchema.shape.email }}
        >
          {(field) => (
            <AppField
              field={field}
              label="Email Address"
              type="email"
              placeholder="you@example.com"
            />
          )}
        </form.Field>

        <form.Field
          name="password"
          validators={{ onChange: loginSchema.shape.password }}
        >
          {(field) => (
            <AppPasswordField
              field={field}
              label="Password"
              placeholder="••••••••"
            />
          )}
        </form.Field>

        {/* UI ONLY FEATURES */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="text-muted-foreground" />
            Remember me
          </label>

          <a href="/forgot-password" className="text-primary hover:underline">
            Forgot password?
          </a>
        </div>

        <form.Subscribe>
          {({ canSubmit, isSubmitting }) => (
            <AppSubmitButton
              type="submit"
              isPending={isSubmitting}
              pendingLabel="Logging in..."
              disabled={!canSubmit}
            >
              Login
            </AppSubmitButton>
          )}
        </form.Subscribe>
      </div>
    </form>
  );
};

export default LoginForm;
