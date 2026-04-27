import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  DollarSign,
  CreditCard,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";

interface PaymentStatsCardsProps {
  stats: {
    totalRevenue: number;
    totalTransactions: number;
    successfulPayments: number;
    failedPayments: number;
    pendingPayments: number;
  };
}

const PaymentStatsCards: React.FC<PaymentStatsCardsProps> = ({ stats }) => {
  const statItems = [
    {
      label: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: <DollarSign className="text-emerald-500" />,
      bg: "bg-emerald-500/10",
    },
    {
      label: "Total Transactions",
      value: stats.totalTransactions,
      icon: <CreditCard className="text-blue-500" />,
      bg: "bg-blue-500/10",
    },
    {
      label: "Successful",
      value: stats.successfulPayments,
      icon: <CheckCircle2 className="text-green-500" />,
      bg: "bg-green-500/10",
    },
    {
      label: "Pending",
      value: stats.pendingPayments,
      icon: <Clock className="text-amber-500" />,
      bg: "bg-amber-500/10",
    },
    {
      label: "Failed",
      value: stats.failedPayments,
      icon: <AlertCircle className="text-rose-500" />,
      bg: "bg-rose-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {statItems.map((item, index) => (
        <Card
          key={index}
          className="overflow-hidden border-none shadow-sm bg-background/50 backdrop-blur-sm"
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${item.bg}`}>{item.icon}</div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {item.label}
                </p>
                <h3 className="text-2xl font-bold mt-1">{item.value}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PaymentStatsCards;
