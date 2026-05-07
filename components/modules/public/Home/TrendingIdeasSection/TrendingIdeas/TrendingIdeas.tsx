"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { IIdea } from "@/types/public/home.types";
import Section from "@/components/shared/reusableComponents/Section";
import TrendingHero from "./TrendingHero";
import TrendingCarouselCard from "./TrendingCarouselCard";

const TrendingIdeas = ({ ideas }: { ideas: IIdea[] }) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!ideas.length) {
    return (
      <Section variant="muted">
        <p className="text-center text-muted-foreground py-10 font-medium">
          No trending ideas found at the moment.
        </p>
      </Section>
    );
  }

  // DATA SPLIT
  const hero = ideas[0];
  const list = ideas.slice(1);
  const loopList = [...list, ...list]; // For infinite scroll effect

  return (
    <Section variant="default">
      {/* HEADER */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider mb-4 border border-primary/20">
          <TrendingUp className="w-3 h-3" />
          Community Hotlist
        </div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
          Trending <span className="text-primary">Innovations</span>
        </h2>
        <p className="text-muted-foreground text-sm max-w-2xl mx-auto leading-relaxed">
          Discover high-impact sustainability solutions ranked by real-time
          community engagement, voting patterns, and collaborative discussions.
        </p>
      </div>

      {/* HERO SECTION */}
      <TrendingHero hero={hero} />

      {/* CAROUSEL SECTION */}
      <div
        className="overflow-x-auto overflow-y-visible pb-12 pt-6 custom-scrollbar-hide"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="flex gap-6"
          animate={{
            x: isHovered ? 0 : ["0%", "-50%"],
          }}
          transition={{
            duration: 35,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {loopList.map((idea, index) => (
            <TrendingCarouselCard key={`${idea.id}-${index}`} idea={idea} />
          ))}
        </motion.div>
      </div>
    </Section>
  );
};

export default TrendingIdeas;
