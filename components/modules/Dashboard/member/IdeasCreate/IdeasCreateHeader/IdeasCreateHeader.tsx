import { Lightbulb, Target, Rocket } from "lucide-react";

const IdeasCreateHeader = () => {
  return (
    <div className="relative overflow-hidden bg-card border rounded-2xl p-10 shadow-sm">
      {/* glow background */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 blur-3xl rounded-full" />

      <div className="relative text-center space-y-5">
        <div className="flex justify-center">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 border flex items-center justify-center">
            <Lightbulb className="text-primary w-7 h-7" />
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
          Turn your <span className="text-primary">idea</span> into impact
        </h1>

        <p className="text-muted-foreground text-sm max-w-2xl mx-auto leading-relaxed">
          Share your innovation with the community. Every successful product
          starts with a clear problem and a strong solution.
        </p>

        {/* steps */}
        <div className="grid md:grid-cols-2 gap-4 pt-6 text-left">
          <div className="flex gap-3 p-4 rounded-xl bg-muted/30 border">
            <Target className="w-5 h-5 text-primary mt-1" />
            <div>
              <p className="font-medium">Define the Problem</p>
              <p className="text-xs text-muted-foreground">
                Clearly describe the real-world issue.
              </p>
            </div>
          </div>

          <div className="flex gap-3 p-4 rounded-xl bg-muted/30 border">
            <Rocket className="w-5 h-5 text-primary mt-1" />
            <div>
              <p className="font-medium">Propose Solution</p>
              <p className="text-xs text-muted-foreground">
                Explain how your idea solves it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeasCreateHeader;
