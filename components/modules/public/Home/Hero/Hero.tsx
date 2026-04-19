import CustomButton from "@/components/shared/reusableComponents/CustomButton";
import Section from "@/components/shared/reusableComponents/Section";
import Link from "next/link";
import { Leaf, ArrowRight } from "lucide-react";
import Heading from "@/components/shared/reusableComponents/Heading";

const Hero = () => {
  return (
    <Section>
      <div className="flex flex-col items-center justify-center text-center">
        {/* Badge */}
        <div className="mb-4 flex items-center gap-2 px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground border border-border">
          <Leaf className="w-3.5 h-3.5" />
          <span>Sustainable Community Platform</span>
        </div>

        {/* Heading */}
        <Heading
          variant="h1"
          title="Share Ideas. Build a Sustainable Future"
          highlight="Sustainable Future"
        />

        {/* Description */}
        <p className="mt-4 text-muted-foreground max-w-2xl text-sm md:text-base leading-relaxed">
          Eco Pulse is a collaborative platform where individuals share
          sustainability-driven ideas, explore real-world solutions, and
          contribute to building a greener, smarter future together.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link href="/ideas">
            <CustomButton className="px-6 py-2 flex items-center gap-2">
              Explore Ideas
              <ArrowRight className="w-4 h-4" />
            </CustomButton>
          </Link>

          <Link href="/dashboard">
            <CustomButton className="bg-transparent border border-border text-foreground hover:bg-accent px-6 py-2">
              Submit Idea
            </CustomButton>
          </Link>
        </div>

        {/* Extra small info (new added) */}
        <div className="mt-6 text-sm text-muted-foreground">
          Join a growing community focused on energy, waste, and sustainable
          innovation.
        </div>

        {/* Bottom subtle UI element */}
        <div className="mt-6 w-32 h-1 bg-muted rounded-full opacity-90" />
      </div>
    </Section>
  );
};

export default Hero;
