import { Leaf, Sparkles, Globe } from "lucide-react";

const RegisterHeader = () => {
  return (
    <div className="space-y-5 text-center md:text-left">
      <div className="flex justify-center md:justify-start">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 border flex items-center justify-center">
          <Leaf className="text-primary w-7 h-7" />
        </div>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold leading-tight">
        Build a better world with{" "}
        <span className="text-primary">Eco Pulse</span>
      </h1>
      <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-md">
        Join thousands of creators, engineers, and innovators sharing ideas that
        drive real environmental impact — from smart energy to green tech
        innovation.
      </p>

      <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-muted-foreground">
        <Sparkles className="w-4 h-4 text-primary" />
        Global community • Verified members • Free forever
      </div>

      <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-muted-foreground">
        <Globe className="w-4 h-4 text-primary" />
        Available in 50+ countries
      </div>
    </div>
  );
};

export default RegisterHeader;
