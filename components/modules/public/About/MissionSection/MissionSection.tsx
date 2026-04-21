import Section from "@/components/shared/reusableComponents/Section";
import { Sprout, Zap, Globe, Recycle } from "lucide-react";

export default function MissionSection() {
  return (
    <Section variant="muted">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>

          <p className="text-muted-foreground leading-relaxed">
            At Eco Pulse, we believe small ideas can create massive impact. Our
            mission is to collect, refine, and promote sustainable ideas that
            help individuals, communities, and organizations reduce
            environmental impact and adopt greener lifestyles.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sprout className="w-4 h-4 text-primary" />
            Promote eco-friendly innovation
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Zap className="w-4 h-4 text-primary" />
            Encourage sustainable tech adoption
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Globe className="w-4 h-4 text-primary" />
            Build global environmental awareness
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Recycle className="w-4 h-4 text-primary" />
            Reduce carbon footprint through ideas
          </div>
        </div>
      </div>
    </Section>
  );
}
