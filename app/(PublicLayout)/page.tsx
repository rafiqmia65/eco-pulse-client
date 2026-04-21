import Hero from "@/components/modules/public/Home/Hero/Hero";
import HowItWorks from "@/components/modules/public/Home/HowItWorks/HowItWorks";
import LatestIdeaSection from "@/components/modules/public/Home/LatestIdeaSection/LatestIdeaSection";
import Newsletter from "@/components/modules/public/Home/Newsletter/Newsletter";
import TrendingIdeasSection from "@/components/modules/public/Home/TrendingIdeasSection/TrendingIdeasSection";

const Home = async () => {
  return (
    <div>
      <Hero />
      <LatestIdeaSection />
      <TrendingIdeasSection />
      <HowItWorks />
      <Newsletter />
    </div>
  );
};

export default Home;
