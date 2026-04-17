import { Button } from "@/components/ui/button";
import React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";

interface CustomButtonProps {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  variant = "primary",
  className,
  ...props
}) => {
  return (
    <Button
      className={cn(
        "transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed",

        // Variants
        variant === "primary" &&
          "bg-primary text-primary-foreground hover:bg-primary/90",

        variant === "outline" &&
          "border border-border bg-transparent text-foreground hover:bg-accent",

        variant === "ghost" &&
          "bg-transparent text-muted-foreground hover:bg-accent hover:text-foreground",

        className,
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
