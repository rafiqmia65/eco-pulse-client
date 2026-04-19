/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { AnyFieldApi } from "@tanstack/react-form";
import CustomInput from "../reusableComponents/CustomInput";

type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "date"
  | "time"
  | "tel";

interface AppFieldProps {
  field: AnyFieldApi;
  label: string;
  type?: InputType;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  prepend?: React.ReactNode;
  append?: React.ReactNode;
  description?: string;
}

const getErrorMessage = (err: unknown): string => {
  if (typeof err === "string") return err;
  if (err && typeof err === "object" && "message" in err) {
    return String((err as any).message);
  }
  return "Invalid input";
};

const AppField: React.FC<AppFieldProps> = ({
  field,
  label,
  type = "text",
  placeholder,
  className,
  disabled = false,
  prepend,
  append,
  description,
}) => {
  const meta = field.state.meta;

  const showError =
    meta.errors.length > 0 && (meta.isTouched || field.form.state.isSubmitted);

  const error = showError ? getErrorMessage(meta.errors[0]) : null;

  return (
    <div className={cn("space-y-1", className)}>
      {/* LABEL */}
      <Label
        htmlFor={field.name}
        className={cn("text-sm font-medium", showError && "text-red-500")}
      >
        {label}
      </Label>

      {/* DESCRIPTION */}
      {description && !showError && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}

      {/* INPUT */}
      <div className="relative">
        {prepend && (
          <div className="absolute left-3 inset-y-0 flex items-center pointer-events-none">
            {prepend}
          </div>
        )}

        <CustomInput
          id={field.name}
          name={field.name}
          type={type}
          value={field.state.value}
          placeholder={placeholder}
          disabled={disabled}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          aria-invalid={!!error}
          className={cn(
            prepend && "pl-10",
            append && "pr-10",
            error && "border-red-500 focus-visible:ring-red-500/30",
          )}
        />

        {append && (
          <div className="absolute right-3 inset-y-0 flex items-center">
            {append}
          </div>
        )}
      </div>

      {/* ERROR */}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default AppField;
