import { Button } from "@/components/ui/button";
import React from "react";

interface CustomButtonProps {
  children: React.ReactNode;
  className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ children, className }) => {
  return (
    <Button
      className={`
    bg-primary 
    text-primary-foreground 

    hover:bg-primary/90 

    transition-all duration-200 
    cursor-pointer

    focus-visible:ring-2 
    focus-visible:ring-primary/50

    disabled:opacity-50 
    disabled:cursor-not-allowed

    ${className || ""}
  `}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
