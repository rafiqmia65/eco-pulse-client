"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle, Shield, Sparkles } from "lucide-react";
import { toast } from "sonner";

import Section from "@/components/shared/reusableComponents/Section";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import CustomInput from "@/components/shared/reusableComponents/CustomInput";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubscribe = async (): Promise<void> => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
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
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border flex items-center justify-center">
              <Mail className="w-8 h-8 text-primary" />
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
              Stay updated with <span className="text-primary">Eco Pulse</span>
            </h2>
          </div>

          {/* DESCRIPTION */}
          <p className="text-muted-foreground mt-4 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Join a growing community of eco-conscious builders and thinkers. Get
            curated weekly insights on sustainability trends, breakthrough green
            innovations, and community-driven ideas shaping a better future.
          </p>

          {/* INPUT + BUTTON */}
          <div className="mt-10 max-w-2xl mx-auto flex flex-col sm:flex-row gap-3">
            {/* INPUT */}
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

              <CustomInput
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* BUTTON */}
            <AppSubmitButton
              type="button"
              isPending={isLoading}
              pendingLabel="Subscribing..."
              disabled={!email}
              onClick={handleSubscribe}
              className="sm:w-auto w-full"
            >
              <Send className="w-4 h-4" />
              Subscribe
            </AppSubmitButton>
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

          {/* PRIVACY NOTE */}
          <p className="text-xs text-muted-foreground mt-6">
            We respect your privacy. No spam ever.
          </p>
        </div>
      </div>
    </Section>
  );
};

export default Newsletter;
