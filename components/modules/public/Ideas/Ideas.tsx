import IdeasHeroSection from "./IdeasHeroSection/IdeasHeroSection";
import Section from "@/components/shared/reusableComponents/Section";
import IdeasGrid from "./IdeasGrid/IdeasGrid";

export default function Ideas() {
  return (
    <>
      <IdeasHeroSection />

      <Section>
        <IdeasGrid />
      </Section>
    </>
  );
}
