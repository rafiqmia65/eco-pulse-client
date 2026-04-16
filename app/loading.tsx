const loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <div className="flex flex-col items-center gap-6">
        {/* Elegant layered spinner */}
        <div className="relative h-14 w-14">
          <div className="absolute inset-0 rounded-full border-2 border-border opacity-30" />
          <div className="absolute inset-0 rounded-full border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin" />
          <div className="absolute inset-2 rounded-full border border-muted opacity-40" />
        </div>

        {/* Brand-like pulse dots */}
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.2s]"></span>
          <span className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.1s]"></span>
          <span className="h-2 w-2 bg-primary rounded-full animate-bounce"></span>
        </div>

        {/* Text */}
        <div className="text-center space-y-1">
          <h2 className="text-lg font-semibold tracking-wide">
            Loading EcoSpark Hub
          </h2>
          <p className="text-sm text-muted-foreground max-w-xs">
            Preparing your sustainable ideas experience...
          </p>
        </div>

        {/* subtle skeleton card */}
        <div className="w-40 h-3 bg-muted rounded-full animate-pulse opacity-60" />
        <div className="w-28 h-3 bg-muted rounded-full animate-pulse opacity-40" />
      </div>
    </div>
  );
};

export default loading;
