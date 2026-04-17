import React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ className, ...props }) => {
  return (
    <Input
      className={cn("focus-visible:ring-primary/50", className)}
      {...props}
    />
  );
};

export default CustomInput;
