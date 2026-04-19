import Section from "@/components/shared/reusableComponents/Section";
import { Lightbulb, Users, Rocket, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: Lightbulb,
    title: "Share Your Idea",
    desc: "Submit your eco-friendly innovation or sustainability idea to the platform.",
  },
  {
    icon: Users,
    title: "Community Engagement",
    desc: "Other users can explore, vote, and provide feedback to improve ideas.",
  },
  {
    icon: Rocket,
    title: "Get Visibility",
    desc: "High-quality ideas get featured in trending sections for maximum reach.",
  },
  {
    icon: CheckCircle2,
    title: "Create Impact",
    desc: "Turn your idea into real-world solutions through collaboration and support.",
  },
];

const HowItWorks = () => {
  return (
    <Section variant="muted">
      {/* HEADER */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          How It Works
        </h2>

        <p className="text-muted-foreground mt-3 text-sm max-w-2xl mx-auto leading-relaxed">
          A simple and structured process that helps transform ideas into
          meaningful real-world impact.
        </p>
      </div>

      {/* STEPS */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div
              key={index}
              className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              {/* ICON */}
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-primary" />
              </div>

              {/* TITLE */}
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {step.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default HowItWorks;
