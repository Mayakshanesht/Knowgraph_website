import knowgraphLogo from "@/assets/knowgraph-logo.png";

const domains = [
  "AI",
  "Autonomous Driving",
  "Perception",
  "Controls",
  "Robotics",
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="p-3 bg-white/95 rounded-xl mb-6">
              <img 
                src={knowgraphLogo} 
                alt="KnowGraph" 
                className="h-8 w-auto"
              />
            </div>
            
            <p className="text-background/90 font-heading font-medium mb-2">
              Graph-based learning for complex systems
            </p>
            
            <p className="text-sm text-background/60 mb-6">
              Used to deliver learning in:
            </p>
            
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {domains.map((domain) => (
                <span 
                  key={domain}
                  className="px-3 py-1 text-sm text-background/80 bg-background/10 rounded-full"
                >
                  {domain}
                </span>
              ))}
            </div>
            
            <div className="border-t border-background/10 pt-6 w-full">
              <p className="text-sm text-background/50">
                © 2026 KnowGraph
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
