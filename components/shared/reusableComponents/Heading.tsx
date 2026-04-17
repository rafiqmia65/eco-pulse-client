import React from "react";
import { cn } from "@/lib/utils";

type Variant = "h1" | "h2" | "h3" | "h4";

interface HeadingProps {
  title: string;
  subtitle?: string;
  variant?: Variant;
  className?: string;
  highlight?: string;
}

const Heading: React.FC<HeadingProps> = ({
  title,
  subtitle,
  variant = "h2",
  className,
  highlight,
}) => {
  const styles = {
    h1: "text-4xl md:text-5xl font-bold",
    h2: "text-3xl md:text-4xl font-semibold",
    h3: "text-2xl font-semibold",
    h4: "text-xl font-medium",
  };

  const renderTitle = () => {
    if (!highlight) return title;

    const parts = title.split(highlight);

    return (
      <>
        {parts[0]}
        <span className="text-primary">{highlight}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <div className={cn("space-y-2", className)}>
      <h1 className={cn(styles[variant], "text-foreground")}>
        {renderTitle()}
      </h1>

      {subtitle && (
        <p className="text-muted-foreground text-sm max-w-xl">{subtitle}</p>
      )}
    </div>
  );
};

export default Heading;
