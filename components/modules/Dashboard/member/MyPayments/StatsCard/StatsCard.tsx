import React, { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  description: string;
  color: string;
}

const StatsCard = ({
  title,
  value,
  icon,
  description,
  color,
}: StatsCardProps) => (
  <Card className="border-border/50 shadow-xs bg-card/50 backdrop-blur-xs overflow-hidden group hover:border-primary/20 transition-colors">
    <CardContent className="p-5">
      <div className="flex items-center justify-between">
        <div
          className={`p-2.5 rounded-2xl ${color} transition-transform group-hover:scale-110 duration-500 border border-white/10`}
        >
          {icon}
        </div>
        <span className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider">
          {title}
        </span>
      </div>
      <div className="mt-5">
        <h3 className="text-2xl font-bold tracking-tight text-foreground">
          {value}
        </h3>
        <p className="text-[11px] text-muted-foreground mt-1 font-medium">
          {description}
        </p>
      </div>
    </CardContent>
  </Card>
);

export default StatsCard;
