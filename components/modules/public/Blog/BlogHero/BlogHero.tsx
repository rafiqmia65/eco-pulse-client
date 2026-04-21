import Section from "@/components/shared/reusableComponents/Section";
import { BookOpen } from "lucide-react";

export default function BlogHero() {
  return (
    <Section variant="muted">
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <div className="flex justify-center">
          <BookOpen className="w-10 h-10 text-primary" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold">
          Eco Pulse <span className="text-primary">Blog</span>
        </h1>

        <p className="text-muted-foreground text-lg leading-relaxed">
          Explore insights, sustainability guides, green technology trends, and
          eco innovation stories that inspire a better future for our planet.
        </p>
      </div>
    </Section>
  );
}
