import React from "react";
import AboutHero from "./AboutHero/AboutHero";
import MissionSection from "./MissionSection/MissionSection";
import FeaturesSection from "./FeaturesSection/FeaturesSection";
import StatsSection from "./StatsSection/StatsSection";
import CallToAction from "./CallToAction/CallToAction";

const About = () => {
  return (
    <div className="w-full">
      <AboutHero />
      <MissionSection />
      <FeaturesSection />
      <StatsSection />
      <CallToAction />
    </div>
  );
};

export default About;
