"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Lock, ShieldCheck } from "lucide-react";

import {
  changePasswordSchema,
  ChangePasswordFormValues,
} from "@/zod/auth.validation";

import AppPasswordField from "@/components/shared/form/AppPasswordField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { changePasswordUser } from "@/services/user/user.services";

const ChangePasswordForm = () => {
  const form = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    } as ChangePasswordFormValues,

    onSubmit: async ({ value }) => {
      try {
        const res = await changePasswordUser(value);

        if (!res.success) {
          toast.error(res.message || "Failed to change password");
          return;
        }

        toast.success("Password changed successfully");
        form.reset();
      } catch {
        toast.error("Something went wrong");
      }
    },
  });

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm space-y-6 h-full">
      <div className="flex items-center gap-4 border-b pb-4">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Security Settings</h2>
          <p className="text-sm text-muted-foreground">
            Change your password to keep your account secure
          </p>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-5"
      >
        {/* OLD PASSWORD */}
        <form.Field
          name="oldPassword"
          validators={{ onChange: changePasswordSchema.shape.oldPassword }}
        >
          {(field) => (
            <AppPasswordField
              field={field}
              label="Current Password"
              placeholder="Enter your current password"
            />
          )}
        </form.Field>

        <div className="grid grid-cols-1 gap-5">
          {/* NEW PASSWORD */}
          <form.Field
            name="newPassword"
            validators={{ onChange: changePasswordSchema.shape.newPassword }}
          >
            {(field) => (
              <AppPasswordField
                field={field}
                label="New Password"
                placeholder="Enter new strong password"
              />
            )}
          </form.Field>

          {/* CONFIRM PASSWORD */}
          <form.Field
            name="confirmPassword"
            validators={{
              onChange: changePasswordSchema.shape.confirmPassword,
            }}
          >
            {(field) => (
              <AppPasswordField
                field={field}
                label="Confirm New Password"
                placeholder="Confirm your new password"
              />
            )}
          </form.Field>
        </div>

        {/* SUBMIT */}
        <div className="pt-2">
          <form.Subscribe>
            {({ canSubmit, isSubmitting, isDirty }) => (
              <AppSubmitButton
                type="submit"
                isPending={isSubmitting}
                pendingLabel="Updating..."
                disabled={!canSubmit || !isDirty}
              >
                Update Password
              </AppSubmitButton>
            )}
          </form.Subscribe>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
