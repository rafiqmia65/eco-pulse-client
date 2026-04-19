"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle, Shield, Sparkles } from "lucide-react";
import { toast } from "sonner";
import CustomButton from "@/components/shared/reusableComponents/CustomButton";
import Section from "@/components/shared/reusableComponents/Section";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubscribe = async () => {
    if (!email) return toast.error("Please enter your email");

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email address");
    }

    setIsLoading(true);

    await new Promise((res) => setTimeout(res, 1200));

    toast.info("Right now newsletter is not available");

    setEmail("");
    setIsLoading(false);
  };

  return (
    <Section>
      <div className="max-w-5xl mx-auto px-4">
        {/* CARD */}
        <div className="rounded-3xl border border-border bg-card shadow-lg p-10 md:p-14 text-center">
          {/* ICON + TITLE */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-5 md:gap-6 text-center md:text-left">
            {/* ICON */}
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-border flex items-center justify-center">
              <Mail className="w-8 h-8 text-primary" />
            </div>

            {/* TITLE */}
            <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
              Stay updated with <span className="text-primary">Eco Pulse</span>
            </h2>
          </div>

          <p className="text-muted-foreground mt-4 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Join a growing community of eco-conscious builders and thinkers. Get
            curated weekly insights on sustainability trends, breakthrough green
            innovations, and community-driven ideas that are shaping a better
            future — all delivered straight to your inbox.
          </p>

          {/* INPUT */}
          <div className="mt-10 max-w-2xl mx-auto flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground outline-none focus:ring-2 focus:ring-primary/30 transition"
              />
            </div>

            <CustomButton
              onClick={handleSubscribe}
              disabled={isLoading}
              className="sm:w-auto w-full flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Subscribing...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Subscribe
                </>
              )}
            </CustomButton>
          </div>

          {/* FEATURES */}
          <div className="flex flex-wrap justify-center gap-5 mt-8 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              No spam
            </div>

            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Weekly updates
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              Unsubscribe anytime
            </div>
          </div>

          {/* NOTE */}
          <p className="text-xs text-muted-foreground mt-6">
            We respect your privacy. No spam ever.
          </p>
        </div>
      </div>
    </Section>
  );
};

export default Newsletter;
