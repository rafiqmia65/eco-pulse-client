"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Lightbulb, PenLine, Search } from "lucide-react";
import Section from "@/components/shared/reusableComponents/Section";

const IdeasHeroSection = () => {
  return (
    <Section variant="muted">
      {/* Glow Effects (theme-based, no hardcoded colors) */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-muted/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-accent/40 rounded-full blur-3xl"></div>

      <div className="flex flex-col items-center text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 px-4 py-1 rounded-full bg-muted border border-border text-sm"
        >
          <Lightbulb size={16} className="text-primary" />
          Share & Explore Ideas
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold leading-tight mt-6"
        >
          Discover & Share <span className="text-primary">Powerful Ideas</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-6 text-muted-foreground max-w-2xl text-lg"
        >
          Explore trending ideas, share your thoughts, and collaborate with
          creators. Build something meaningful together in one place.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-8 flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/dashboard/create-ideas"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition"
          >
            <PenLine size={18} />
            Share Idea
          </Link>

          <Link
            href="/ideas"
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border hover:bg-muted transition"
          >
            <Search size={18} />
            Explore Ideas
          </Link>
        </motion.div>
      </div>
    </Section>
  );
};

export default IdeasHeroSection;
