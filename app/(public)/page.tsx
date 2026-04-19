import Hero from "@/components/modules/public/Home/Hero/Hero";
import LatestIdeaSection from "@/components/modules/public/Home/LatestIdeaSection/LatestIdeaSection";

const Home = async () => {
  return (
    <div>
      <Hero />
      <LatestIdeaSection />
    </div>
  );
};

export default Home;
