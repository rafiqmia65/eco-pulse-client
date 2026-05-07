import Section from "@/components/shared/reusableComponents/Section";
import { Users, Lightbulb, Globe, Award } from "lucide-react";

const stats = [
  { label: "Community Members", value: "2,500+", icon: Users },
  { label: "Sustainability Ideas", value: "1,200+", icon: Lightbulb },
  { label: "Countries Reached", value: "45+", icon: Globe },
  { label: "Projects Funded", value: "150+", icon: Award },
];

export default function ImpactStats() {
  return (
    <Section className="bg-primary text-primary-foreground">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-center text-center">
            <stat.icon className="w-8 h-8 mb-4 text-primary-foreground/80" />
            <h3 className="text-3xl md:text-4xl font-bold mb-1">
              {stat.value}
            </h3>
            <p className="text-sm text-primary-foreground/70 uppercase tracking-wider font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
