import Hero from "@/components/modules/public/Home/Hero/Hero";
import HowItWorks from "@/components/modules/public/Home/HowItWorks/HowItWorks";
import LatestIdeaSection from "@/components/modules/public/Home/LatestIdeaSection/LatestIdeaSection";
import Newsletter from "@/components/modules/public/Home/Newsletter/Newsletter";
import TrendingIdeasSection from "@/components/modules/public/Home/TrendingIdeasSection/TrendingIdeasSection";
import ImpactStats from "@/components/modules/public/Home/ImpactStats/ImpactStats";
import FAQSection from "@/components/modules/public/Home/FAQSection/FAQSection";
import Testimonials from "@/components/modules/public/Home/Testimonials/Testimonials";
import CallToAction from "@/components/modules/public/Home/CallToAction/CallToAction";
import FeaturedCategories from "@/components/modules/public/Home/FeaturedCategories/FeaturedCategories";
import { Suspense } from "react";
import { IdeaGridSkeleton } from "@/components/shared/reusableComponents/IdeaCardSkeleton";

const Home = async () => {
  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <FeaturedCategories />
      <Suspense fallback={<IdeaGridSkeleton />}>
        <LatestIdeaSection />
      </Suspense>
      <ImpactStats />
      <Suspense fallback={<IdeaGridSkeleton />}>
        <TrendingIdeasSection />
      </Suspense>
      <HowItWorks />
      <Testimonials />
      <FAQSection />
      <CallToAction />
      <Newsletter />
    </div>
  );
};

export default Home;
