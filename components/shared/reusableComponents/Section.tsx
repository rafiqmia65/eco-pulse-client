import React from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "muted" | "card";
}

const Section: React.FC<SectionProps> = ({
  children,
  className,
  variant = "default",
}) => {
  return (
    <section
      className={cn(
        "w-full py-10 md:py-14",

        // FULL WIDTH BACKGROUND AREA
        variant === "default" && "bg-background",
        variant === "muted" && "bg-muted/30",
        variant === "card" && "bg-card",

        className,
      )}
    >
      {/* CENTERED CONTENT WRAPPER */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
};

export default Section;
