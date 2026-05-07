import Section from "@/components/shared/reusableComponents/Section";
import CustomButton from "@/components/shared/reusableComponents/CustomButton";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CallToAction() {
  return (
    <Section>
      <div className="relative overflow-hidden bg-primary dark:bg-primary/10  p-8 md:p-20 text-center shadow-2xl border border-primary/20">
        {/* Abstract background elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 dark:bg-primary/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 dark:bg-primary/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 dark:bg-primary/20 text-white dark:text-primary text-[10px] md:text-xs font-black uppercase tracking-widest mb-8 border border-white/20 dark:border-primary/30">
            <Sparkles className="w-4 h-4" />
            READY TO MAKE AN IMPACT?
          </div>

          <h2 className="text-3xl md:text-6xl font-black text-white dark:text-foreground mb-8 max-w-3xl leading-[1.1] tracking-tighter">
            The Future of Sustainability Starts with Your Next Great Idea.
          </h2>

          <p className="text-white/80 dark:text-muted-foreground text-base md:text-xl mb-12 max-w-2xl font-medium leading-relaxed">
            Join thousands of innovators who are already sharing, collaborating,
            and building the solutions our planet desperately needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 items-center justify-center">
            <Link href="/register">
              <CustomButton className="bg-white dark:bg-primary text-primary dark:text-primary-foreground hover:bg-white/90 dark:hover:bg-primary/90 px-10 py-7 text-base font-black shadow-xl flex items-center gap-3 transition-transform hover:scale-105">
                Get Started for Free
                <ArrowRight className="w-5 h-5" />
              </CustomButton>
            </Link>

            <Link href="/about">
              <CustomButton
                variant="outline"
                className="text-white dark:text-foreground border-white/30 dark:border-border hover:bg-white/10 dark:hover:bg-muted px-10 py-7 text-base font-bold transition-all"
              >
                Learn How it Works
              </CustomButton>
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
