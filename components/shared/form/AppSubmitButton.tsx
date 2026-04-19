import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import CustomButton from "../reusableComponents/CustomButton";

type Variant = "primary" | "outline" | "ghost";

type AppSubmitButtonProps = {
  isPending: boolean;
  children: React.ReactNode;
  pendingLabel?: string;
  className?: string;
  disabled?: boolean;
  variant?: Variant;
  type?: "button" | "submit";

  // support both
  onClick?: () => void | Promise<void>;
  onSubmit?: React.FormEventHandler<HTMLButtonElement>;
};

const AppSubmitButton = ({
  isPending,
  children,
  pendingLabel = "Processing...",
  className,
  disabled = false,
  variant = "primary",
  type = "button",
  onClick,
  onSubmit,
}: AppSubmitButtonProps) => {
  const isDisabled = disabled || isPending;

  return (
    <CustomButton
      type={type}
      disabled={isDisabled}
      variant={variant}
      onClick={onClick}
      onSubmit={onSubmit}
      aria-busy={isPending}
      className={cn("w-full flex items-center justify-center gap-2", className)}
    >
      {isPending ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>{pendingLabel}</span>
        </>
      ) : (
        children
      )}
    </CustomButton>
  );
};

export default AppSubmitButton;
