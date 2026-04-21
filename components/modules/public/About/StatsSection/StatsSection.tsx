import Section from "@/components/shared/reusableComponents/Section";
import { Globe, Users, Rocket, Leaf } from "lucide-react";

const stats = [
  { icon: Leaf, label: "Eco Ideas Shared", value: "10K+" },
  { icon: Users, label: "Active Users", value: "5K+" },
  { icon: Rocket, label: "Projects Built", value: "1K+" },
  { icon: Globe, label: "Countries Reached", value: "25+" },
];

export default function StatsSection() {
  return (
    <Section variant="muted">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="space-y-2">
              <Icon className="w-5 h-5 text-primary mx-auto" />
              <h3 className="text-3xl font-bold text-primary">{s.value}</h3>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
