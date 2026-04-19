import Hero from "@/components/modules/public/Home/Hero/Hero";
import HowItWorks from "@/components/modules/public/Home/HowItWorks/HowItWorks";
import LatestIdeaSection from "@/components/modules/public/Home/LatestIdeaSection/LatestIdeaSection";
import TrendingIdeasSection from "@/components/modules/public/Home/TrendingIdeasSection/TrendingIdeasSection";

const Home = async () => {
  return (
    <div>
      <Hero />
      <LatestIdeaSection />
      <TrendingIdeasSection />
      <HowItWorks />
    </div>
  );
};

export default Home;
