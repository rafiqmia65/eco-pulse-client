import Section from "@/components/shared/reusableComponents/Section";
import CustomButton from "@/components/shared/reusableComponents/CustomButton";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CallToAction() {
  return (
    <Section variant="default">
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <h2 className="text-3xl font-semibold">
          Ready to Build a Greener Future?
        </h2>

        <p className="text-muted-foreground">
          Join Eco Pulse today and start sharing ideas that can change the
          world.
        </p>

        <Link href="/ideas">
          <CustomButton className="px-6 py-3 inline-flex items-center gap-2">
            Explore Ideas <ArrowRight className="w-4 h-4" />
          </CustomButton>
        </Link>
      </div>
    </Section>
  );
}
