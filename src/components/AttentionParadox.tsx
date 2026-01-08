import { useEffect, useRef, useState } from "react";

export function AttentionParadox() {
  const [isVisible, setIsVisible] = useState(false);
  const [transitionActive, setTransitionActive] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setTransitionActive(true);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <section 
      ref={sectionRef}
      className="py-24 md:py-32 bg-muted/30 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <h2 
          className={`text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          The Attention Paradox
        </h2>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Phase 1 — Consumption */}
          <div 
            className={`relative p-8 rounded-2xl bg-card border border-border transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            } ${transitionActive ? "opacity-50 blur-sm" : ""}`}
            style={{ transitionDelay: "200ms" }}
          >
            {/* Vertical streams of short content cards */}
            <div className="relative h-80 overflow-hidden mb-6 rounded-xl bg-muted/20">
              <div className="absolute inset-0 flex gap-2 p-4">
                {Array.from({ length: 3 }).map((_, stream) => (
                  <div key={stream} className="flex-1 flex flex-col gap-2">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-full h-12 rounded bg-muted/40 animate-scroll-down"
                        style={{ 
                          animationDelay: `${(stream * 8 + i) * 0.15}s`,
                          filter: "blur(0.3px)",
                          opacity: 0.6
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
              {/* Speed and blur overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-muted/10" />
            </div>

            {/* Minimal text */}
            <div className="text-center space-y-2">
              <p className="text-sm font-medium text-foreground">High consumption</p>
              <p className="text-sm text-muted-foreground">No direction</p>
            </div>
          </div>

          {/* Phase 2 — Retention */}
          <div 
            className={`relative p-8 rounded-2xl bg-card border border-border transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            } ${transitionActive ? "opacity-50 blur-sm" : ""}`}
            style={{ transitionDelay: "400ms" }}
          >
            {/* Incomplete knowledge graph */}
            <div className="relative h-80 mb-6">
              <svg className="w-full h-full" viewBox="0 0 300 250">
                {/* Broken edges */}
                <line 
                  x1="80" y1="60" x2="120" y2="80" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  className="text-muted-foreground/30 animate-pulse"
                />
                <line 
                  x1="180" y1="80" x2="220" y2="60" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  className="text-muted-foreground/30 animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                />
                <line 
                  x1="150" y1="120" x2="100" y2="180" 
                  stroke="currentColor" 
                  strokeWidth="1"
                  strokeDasharray="3,7"
                  className="text-muted-foreground/20"
                />

                {/* Weak, flickering nodes */}
                <circle 
                  cx="80" cy="60" r="8" 
                  fill="currentColor"
                  className="text-primary/20 animate-flicker"
                  style={{ animationDelay: "0s" }}
                />
                <circle 
                  cx="220" cy="60" r="8" 
                  fill="currentColor"
                  className="text-primary/15 animate-flicker"
                  style={{ animationDelay: "0.3s" }}
                />
                <circle 
                  cx="150" cy="120" r="10" 
                  fill="currentColor"
                  className="text-primary/25 animate-flicker"
                  style={{ animationDelay: "0.6s" }}
                />
                <circle 
                  cx="100" cy="180" r="6" 
                  fill="currentColor"
                  className="text-primary/10 animate-flicker"
                  style={{ animationDelay: "0.9s" }}
                />
                <circle 
                  cx="200" cy="160" r="7" 
                  fill="currentColor"
                  className="text-primary/12 animate-flicker"
                  style={{ animationDelay: "1.2s" }}
                />
              </svg>
            </div>

            {/* Minimal text */}
            <div className="text-center space-y-2">
              <p className="text-sm font-medium text-foreground">Low retention</p>
              <p className="text-sm text-muted-foreground">No accumulation</p>
            </div>
          </div>

          {/* Phase 3 — Structure */}
          <div 
            className={`relative p-8 rounded-2xl bg-primary/5 border-2 border-primary/30 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            {/* Graph reorganizes smoothly */}
            <div className="relative h-80 mb-6">
              <svg className="w-full h-full" viewBox="0 0 300 250">
                {/* Strong, stable edges */}
                <line 
                  x1="80" y1="60" x2="150" y2="100" 
                  stroke="currentColor" 
                  strokeWidth="3"
                  className="text-primary/60 animate-strengthen"
                  style={{ animationDelay: "0s" }}
                />
                <line 
                  x1="150" y1="100" x2="220" y2="60" 
                  stroke="currentColor" 
                  strokeWidth="3"
                  className="text-primary/60 animate-strengthen"
                  style={{ animationDelay: "0.5s" }}
                />
                <line 
                  x1="150" y1="100" x2="150" y2="180" 
                  stroke="currentColor" 
                  strokeWidth="3"
                  className="text-primary/60 animate-strengthen"
                  style={{ animationDelay: "1s" }}
                />
                <line 
                  x1="80" y1="60" x2="80" y2="140" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  className="text-primary/40 animate-strengthen"
                  style={{ animationDelay: "1.5s" }}
                />
                <line 
                  x1="220" y1="60" x2="220" y2="140" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  className="text-primary/40 animate-strengthen"
                  style={{ animationDelay: "2s" }}
                />

                {/* Stable, strong nodes */}
                <circle 
                  cx="80" cy="60" r="10" 
                  fill="currentColor"
                  className="text-primary animate-node-strengthen"
                  style={{ animationDelay: "0.2s" }}
                />
                <circle 
                  cx="220" cy="60" r="10" 
                  fill="currentColor"
                  className="text-primary animate-node-strengthen"
                  style={{ animationDelay: "0.7s" }}
                />
                <circle 
                  cx="150" cy="100" r="12" 
                  fill="currentColor"
                  className="text-primary animate-node-strengthen"
                  style={{ animationDelay: "1.2s" }}
                />
                <circle 
                  cx="150" cy="180" r="8" 
                  fill="currentColor"
                  className="text-primary/80 animate-node-strengthen"
                  style={{ animationDelay: "1.7s" }}
                />
                <circle 
                  cx="80" cy="140" r="6" 
                  fill="currentColor"
                  className="text-primary/60 animate-node-strengthen"
                  style={{ animationDelay: "2.2s" }}
                />
                <circle 
                  cx="220" cy="140" r="6" 
                  fill="currentColor"
                  className="text-primary/60 animate-node-strengthen"
                  style={{ animationDelay: "2.7s" }}
                />
              </svg>
            </div>

            {/* Minimal text */}
            <div className="text-center space-y-2">
              <p className="text-sm font-medium text-foreground">Understanding compounds</p>
              <p className="text-sm text-muted-foreground">When structure exists</p>
            </div>
          </div>
        </div>

        {/* Centered Transition Statement */}
        <div 
          className={`text-center mt-16 transition-all duration-1000 ${
            transitionActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-lg md:text-xl text-foreground mb-2">
            Information without structure doesn't compound.
          </p>
          <p className="text-lg md:text-xl font-medium text-primary">
            Understanding requires structure.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-down {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        
        @keyframes flicker {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
        
        @keyframes strengthen {
          0% { 
            opacity: 0.2; 
            stroke-width: 1;
          }
          100% { 
            opacity: 1; 
            stroke-width: 3;
          }
        }
        
        @keyframes node-strengthen {
          0% { 
            opacity: 0.2; 
            r: 4;
          }
          100% { 
            opacity: 1; 
            r: 12;
          }
        }
        
        .animate-scroll-down {
          animation: scroll-down 8s linear infinite;
        }
        
        .animate-flicker {
          animation: flicker 2s ease-in-out infinite;
        }
        
        .animate-strengthen {
          animation: strengthen 2s ease-out forwards;
        }
        
        .animate-node-strengthen {
          animation: node-strengthen 2s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
