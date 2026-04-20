import { Leaf, ShieldCheck, Zap } from "lucide-react";

const LoginHeader = () => {
  return (
    <div className="space-y-5 text-center md:text-left">
      <div className="flex justify-center md:justify-start">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 border flex items-center justify-center">
          <Leaf className="text-primary w-7 h-7" />
        </div>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold leading-tight">
        Welcome back to <span className="text-primary">Eco Pulse</span>
      </h1>

      <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-md">
        Continue your journey of building impactful ideas and collaborating with
        innovators shaping a greener future.
      </p>

      <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-muted-foreground">
        <ShieldCheck className="w-4 h-4 text-primary" />
        Secure login • Protected data • Trusted platform
      </div>

      <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-muted-foreground">
        <Zap className="w-4 h-4 text-primary" />
        Fast access to your dashboard & ideas
      </div>
    </div>
  );
};

export default LoginHeader;
