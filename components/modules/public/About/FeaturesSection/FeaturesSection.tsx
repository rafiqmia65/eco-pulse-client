import Section from "@/components/shared/reusableComponents/Section";
import { Lightbulb, Users, Leaf } from "lucide-react";

const features = [
  {
    icon: Lightbulb,
    title: "Smart Eco Ideas",
    desc: "Discover innovative solutions for real-world environmental problems.",
  },
  {
    icon: Users,
    title: "Community Driven",
    desc: "Users can share, vote, and discuss sustainable ideas.",
  },
  {
    icon: Leaf,
    title: "Green Technology",
    desc: "Explore modern tech that supports a cleaner planet.",
  },
];

export default function FeaturesSection() {
  return (
    <Section variant="default">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-semibold">What We Offer</h2>
        <p className="text-muted-foreground mt-2">
          A platform built for sustainability and innovation
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <div
              key={i}
              className="p-6 rounded-2xl border border-border bg-card hover:shadow-lg transition"
            >
              <Icon className="w-6 h-6 text-primary mb-3" />
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm">{f.desc}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
