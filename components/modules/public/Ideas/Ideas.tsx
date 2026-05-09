import IdeasHeroSection from "./IdeasHeroSection/IdeasHeroSection";
import Section from "@/components/shared/reusableComponents/Section";
import IdeasGrid from "./IdeasGrid/IdeasGrid";
import SmartRecommendations from "@/components/shared/SmartRecommendations/SmartRecommendations";

export default function Ideas({ currentUserId }: { currentUserId?: string }) {
  return (
    <>
      <IdeasHeroSection />

      <Section>
        <IdeasGrid />
      </Section>

      {/* AI SMART RECOMMENDATIONS — logged-in members only */}
      {currentUserId && (
        <Section className="border-t border-border/50">
          <SmartRecommendations currentUserId={currentUserId} />
        </Section>
      )}
    </>
  );
}
