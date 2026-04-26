"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IIdeaDay } from "@/types/adminTypes/adminStats.types";

interface IdeasChartProps {
  data: IIdeaDay[];
}

const IdeasChart = ({ data }: IdeasChartProps) => {
  return (
    <Card className="rounded-2xl border-border/50 bg-card/50 backdrop-blur-xs shadow-sm overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center justify-between">
          Ideation Activity
          <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">
            Last 7 Days
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 pt-4">
        <div className="h-72 w-full pr-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="hsl(var(--border))"
                opacity={0.5}
              />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                tickFormatter={(date) => {
                  const d = new Date(date);
                  return d.toLocaleDateString("en-US", { weekday: "short" });
                }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "12px",
                  fontSize: "12px",
                }}
                cursor={{ fill: "hsl(var(--muted))", opacity: 0.4 }}
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={30}>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      index === data.length - 1
                        ? "hsl(var(--primary))"
                        : "hsl(var(--primary) / 0.4)"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default IdeasChart;
