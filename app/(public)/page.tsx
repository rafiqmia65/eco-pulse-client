import Hero from "@/components/modules/public/Home/Hero/Hero";
import LatestIdeaSection from "@/components/modules/public/Home/LatestIdeaSection/LatestIdeaSection";
import TrendingIdeasSection from "@/components/modules/public/Home/TrendingIdeasSection/TrendingIdeasSection";

const Home = async () => {
  return (
    <div>
      <Hero />
      <LatestIdeaSection />
      <TrendingIdeasSection />
    </div>
  );
};

export default Home;
