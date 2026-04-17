import React from "react";
import { cn } from "@/lib/utils";

type Variant = "h1" | "h2" | "h3" | "h4";

interface HeadingProps {
  title: string;
  subtitle?: string;
  variant?: Variant;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({
  title,
  subtitle,
  variant = "h2",
  className,
}) => {
  const styles = {
    h1: "text-4xl md:text-5xl font-bold",
    h2: "text-3xl md:text-4xl font-semibold",
    h3: "text-2xl font-semibold",
    h4: "text-xl font-medium",
  };

  return (
    <div className={cn("space-y-2", className)}>
      <h2 className={cn(styles[variant], "text-foreground")}>{title}</h2>

      {subtitle && (
        <p className="text-muted-foreground text-sm max-w-xl">{subtitle}</p>
      )}
    </div>
  );
};

export default Heading;
