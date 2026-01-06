import { useEffect, useRef, useState } from "react";

export function LearningAnalytics() {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Animated Graph */}
            <div 
              className={`relative transition-all duration-700 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="aspect-square max-w-md mx-auto">
                <svg className="w-full h-full" viewBox="0 0 400 400">
                  {/* Background circle */}
                  <circle 
                    cx="200" cy="200" r="180" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1"
                    className="text-border"
                  />

                  {/* Connected edges with draw animation */}
                  <g className={isVisible ? "animate-draw-line" : ""}>
                    <line x1="200" y1="80" x2="120" y2="160" stroke="hsl(239, 84%, 52%)" strokeWidth="2" strokeDasharray="1000" />
                    <line x1="200" y1="80" x2="280" y2="160" stroke="hsl(239, 84%, 52%)" strokeWidth="2" strokeDasharray="1000" />
                    <line x1="120" y1="160" x2="80" y2="260" stroke="hsl(263, 70%, 50%)" strokeWidth="2" strokeDasharray="1000" />
                    <line x1="120" y1="160" x2="160" y2="260" stroke="hsl(263, 70%, 50%)" strokeWidth="2" strokeDasharray="1000" />
                    <line x1="280" y1="160" x2="240" y2="260" stroke="hsl(168, 76%, 42%)" strokeWidth="2" strokeDasharray="1000" />
                    <line x1="280" y1="160" x2="320" y2="260" stroke="hsl(168, 76%, 42%)" strokeWidth="2" strokeDasharray="1000" />
                    <line x1="160" y1="260" x2="200" y2="340" stroke="hsl(182, 70%, 45%)" strokeWidth="2" strokeDasharray="1000" />
                    <line x1="240" y1="260" x2="200" y2="340" stroke="hsl(182, 70%, 45%)" strokeWidth="2" strokeDasharray="1000" />
                  </g>

                  {/* Nodes - mastered (solid), weak (outlined), in progress */}
                  {/* Top node - mastered */}
                  <circle 
                    cx="200" cy="80" r="20" 
                    className={`fill-primary ${isVisible ? "animate-node-appear" : "opacity-0"}`}
                    style={{ animationDelay: "0.2s" }}
                  />
                  <text x="200" y="85" textAnchor="middle" className="fill-primary-foreground text-xs font-medium">ML</text>

                  {/* Second row - mastered */}
                  <circle 
                    cx="120" cy="160" r="18" 
                    className={`fill-violet ${isVisible ? "animate-node-appear" : "opacity-0"}`}
                    style={{ animationDelay: "0.4s" }}
                  />
                  <circle 
                    cx="280" cy="160" r="18" 
                    className={`fill-teal ${isVisible ? "animate-node-appear" : "opacity-0"}`}
                    style={{ animationDelay: "0.5s" }}
                  />

                  {/* Third row - mixed: some mastered, some weak */}
                  <circle 
                    cx="80" cy="260" r="14" 
                    className={`fill-primary ${isVisible ? "animate-node-appear" : "opacity-0"}`}
                    style={{ animationDelay: "0.6s" }}
                  />
                  <circle 
                    cx="160" cy="260" r="14" 
                    fill="none"
                    stroke="hsl(38, 92%, 50%)"
                    strokeWidth="3"
                    strokeDasharray="4 2"
                    className={`${isVisible ? "animate-node-appear animate-weak-pulse" : "opacity-0"}`}
                    style={{ animationDelay: "0.7s" }}
                  />
                  <circle 
                    cx="240" cy="260" r="14" 
                    className={`fill-cyan ${isVisible ? "animate-node-appear" : "opacity-0"}`}
                    style={{ animationDelay: "0.8s" }}
                  />
                  <circle 
                    cx="320" cy="260" r="14" 
                    fill="none"
                    stroke="hsl(0, 84%, 60%)"
                    strokeWidth="3"
                    strokeDasharray="4 2"
                    className={`${isVisible ? "animate-node-appear animate-weak-pulse" : "opacity-0"}`}
                    style={{ animationDelay: "0.9s" }}
                  />

                  {/* Bottom node - next to learn (glowing) */}
                  <circle 
                    cx="200" cy="340" r="16" 
                    fill="none"
                    stroke="hsl(182, 70%, 45%)"
                    strokeWidth="2"
                    className={`${isVisible ? "animate-node-appear" : "opacity-0"}`}
                    style={{ animationDelay: "1s" }}
                  />
                  <circle 
                    cx="200" cy="340" r="24" 
                    fill="none"
                    stroke="hsl(182, 70%, 45%)"
                    strokeWidth="1"
                    opacity="0.4"
                    className={`${isVisible ? "animate-gentle-pulse" : "opacity-0"}`}
                    style={{ animationDelay: "1.2s" }}
                  />
                  <text x="200" y="345" textAnchor="middle" className="fill-cyan text-xs font-medium">Next</text>

                  {/* Legend */}
                  <g transform="translate(320, 360)">
                    <circle cx="0" cy="0" r="6" className="fill-primary" />
                    <text x="12" y="4" className="fill-foreground text-xs">Mastered</text>
                  </g>
                  <g transform="translate(320, 380)">
                    <circle cx="0" cy="0" r="6" fill="none" stroke="hsl(38, 92%, 50%)" strokeWidth="2" strokeDasharray="2 1" />
                    <text x="12" y="4" className="fill-foreground text-xs">Weak</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* Right: Content */}
            <div 
              className={`transition-all duration-700 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                Know what you understand — and what you don't.
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                KnowGraph tracks understanding at the concept level, not time spent.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-foreground">Concepts mastered</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full border-2 border-accent" />
                  <span className="text-foreground">Gaps in understanding</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full border-2 border-violet" />
                  <span className="text-foreground">Dependencies you missed</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-cyan animate-gentle-pulse" />
                  <span className="text-foreground">Progress across an entire topic</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground italic">
                Built for complex subjects. Calm, precise, and cumulative.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
