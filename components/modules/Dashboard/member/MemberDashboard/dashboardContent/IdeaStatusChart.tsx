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
import { IdeaStats } from "@/types/memberTypes/DashboardStats.types";

export const IdeaStatusChart = ({ ideas }: { ideas: IdeaStats }) => {
  const data = [
    { name: "Approved", value: ideas.approved, color: "#10b981" },
    { name: "Review", value: ideas.review, color: "#3b82f6" },
    { name: "Draft", value: ideas.draft, color: "#64748b" },
    { name: "Rejected", value: ideas.rejected, color: "#ef4444" },
  ];

  return (
    <Card className="border-none shadow-sm bg-card/50 backdrop-blur-md h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold tracking-tight">
          Project Lifecycle
        </CardTitle>
      </CardHeader>
      <CardContent className="h-75 pt-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ left: 10, right: 30, top: 10, bottom: 10 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={false}
              stroke="hsl(var(--border))"
              opacity={0.5}
            />
            <XAxis type="number" hide />
            <YAxis
              dataKey="name"
              type="category"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fontWeight: 500 }}
              width={80}
            />
            <Tooltip
              cursor={{ fill: "hsl(var(--muted))", opacity: 0.1 }}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "12px",
                boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
              }}
              itemStyle={{ fontSize: "12px", fontWeight: "bold" }}
            />
            <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={24}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
