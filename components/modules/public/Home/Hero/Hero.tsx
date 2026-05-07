"use client";

import CustomButton from "@/components/shared/reusableComponents/CustomButton";
import Section from "@/components/shared/reusableComponents/Section";
import Link from "next/link";
import { Leaf, ArrowRight, Sparkles } from "lucide-react";
import Heading from "@/components/shared/reusableComponents/Heading";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <Section className="min-h-[70vh] flex items-center justify-center pt-20 pb-16">
      <div className="flex flex-col items-center justify-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex items-center gap-2 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider rounded-full bg-primary/10 text-primary border border-primary/20 shadow-sm"
        >
          <Leaf className="w-3.5 h-3.5" />
          <span>Sustainable Community Platform</span>
          <Sparkles className="w-3.5 h-3.5 ml-1" />
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Heading
            variant="h1"
            title="Share Ideas. Build a Sustainable Future"
            highlight="Sustainable Future"
            className="max-w-4xl leading-[1.1] md:text-6xl lg:text-7xl"
          />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-muted-foreground max-w-2xl text-base md:text-lg leading-relaxed font-light"
        >
          Eco Pulse is a collaborative platform where individuals share
          sustainability-driven ideas, explore real-world solutions, and
          contribute to building a greener, smarter future together.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4"
        >
          <Link href="/ideas" className="w-full sm:w-auto">
            <CustomButton className="w-full sm:w-auto px-8 py-6 text-base rounded-full flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
              Explore Ideas
              <ArrowRight className="w-5 h-5" />
            </CustomButton>
          </Link>

          <Link href="/dashboard/ideas-create" className="w-full sm:w-auto">
            <CustomButton
              variant="outline"
              className="w-full sm:w-auto px-8 py-6 text-base rounded-full border-2 border-border hover:bg-accent transition-all duration-300"
            >
              Submit Idea
            </CustomButton>
          </Link>
        </motion.div>

        {/* Extra small info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-12 flex items-center gap-6 text-sm text-muted-foreground/80 font-medium"
        >
          <div className="flex -space-x-3 overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="inline-block h-8 w-8 rounded-full ring-2 ring-background bg-muted border border-border"
              />
            ))}
          </div>
          <p>Join 2,000+ sustainability innovators</p>
        </motion.div>
      </div>
    </Section>
  );
};

export default Hero;
