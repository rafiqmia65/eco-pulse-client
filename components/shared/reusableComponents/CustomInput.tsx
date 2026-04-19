import React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ className, ...props }) => {
  return (
    <Input
      className={cn(
        "w-full pr-4 py-3 rounded-xl border border-border bg-background text-foreground outline-none transition-all",
        "focus:ring-2 focus:ring-primary/30 focus-visible:ring-primary/50",
        className,
      )}
      {...props}
    />
  );
};

export default CustomInput;
