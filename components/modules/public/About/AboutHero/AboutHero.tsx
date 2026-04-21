import { Leaf } from "lucide-react";
import Section from "@/components/shared/reusableComponents/Section";

export default function AboutHero() {
  return (
    <Section variant="default">
      <div className="max-w-4xl mx-auto space-y-6 text-center">
        <div className="flex justify-center">
          <Leaf className="text-primary w-10 h-10" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-foreground">
          About <span className="text-primary">Eco Pulse</span>
        </h1>

        <p className="text-muted-foreground text-lg leading-relaxed">
          Eco Pulse is a modern sustainability-driven platform dedicated to
          sharing innovative eco-friendly ideas, green technology solutions, and
          community-driven environmental initiatives. Our mission is to inspire
          action toward a cleaner, smarter, and more sustainable world.
        </p>
      </div>
    </Section>
  );
}
