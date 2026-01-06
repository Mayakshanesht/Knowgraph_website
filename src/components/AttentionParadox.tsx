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
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <section 
      ref={sectionRef}
      className="py-24 md:py-32 bg-charcoal relative overflow-hidden"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <h2 
          className={`text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-charcoal-foreground text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          The Attention Paradox
        </h2>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 max-w-6xl mx-auto">
          {/* LEFT — Consumption Without Learning */}
          <div 
            className={`relative p-8 rounded-2xl bg-charcoal-foreground/5 border border-charcoal-foreground/10 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            } ${transitionActive ? "opacity-50 blur-sm" : ""}`}
            style={{ transitionDelay: "200ms" }}
          >
            {/* Vertical scroll stream */}
            <div className="relative h-64 overflow-hidden mb-6 rounded-xl bg-charcoal-foreground/5">
              <div className="absolute inset-0 flex flex-col gap-2 p-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-full h-8 rounded bg-charcoal-foreground/10 animate-scroll-down"
                    style={{ 
                      animationDelay: `${i * 0.25}s`,
                      filter: "blur(0.5px)",
                      opacity: 0.4
                    }}
                  />
                ))}
              </div>
              {/* Desaturation overlay */}
              <div className="absolute inset-0 bg-charcoal/30" />
            </div>

            {/* Animated text labels */}
            <div className="space-y-3">
              <p 
                className={`text-sm text-cyan font-medium transition-opacity duration-500 ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
                style={{ transitionDelay: "600ms" }}
              >
                High consumption
              </p>
              <p 
                className={`text-sm text-accent font-medium transition-opacity duration-500 ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
                style={{ transitionDelay: "1200ms" }}
              >
                Low retention
              </p>
              <p 
                className={`text-sm text-destructive font-medium transition-opacity duration-500 ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
                style={{ transitionDelay: "1800ms" }}
              >
                No accumulation
              </p>
            </div>
          </div>

          {/* RIGHT — Fragmented Understanding */}
          <div 
            className={`relative p-8 rounded-2xl bg-charcoal-foreground/5 border border-charcoal-foreground/10 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            } ${transitionActive ? "opacity-50 blur-sm" : ""}`}
            style={{ transitionDelay: "400ms" }}
          >
            {/* Broken knowledge graph */}
            <div className="relative h-64 mb-6">
              <svg className="w-full h-full" viewBox="0 0 300 200">
                {/* Disconnected edges that collapse */}
                <line 
                  x1="80" y1="60" x2="150" y2="100" 
                  stroke="currentColor" 
                  strokeWidth="1.5"
                  className="text-charcoal-foreground/20 animate-edge-collapse"
                  style={{ animationDelay: "0s" }}
                />
                <line 
                  x1="150" y1="100" x2="220" y2="60" 
                  stroke="currentColor" 
                  strokeWidth="1.5"
                  className="text-charcoal-foreground/20 animate-edge-collapse"
                  style={{ animationDelay: "0.5s" }}
                />
                <line 
                  x1="150" y1="100" x2="100" y2="160" 
                  stroke="currentColor" 
                  strokeWidth="1.5"
                  className="text-charcoal-foreground/20 animate-edge-collapse"
                  style={{ animationDelay: "1s" }}
                />
                <line 
                  x1="150" y1="100" x2="200" y2="160" 
                  stroke="currentColor" 
                  strokeWidth="1.5"
                  className="text-charcoal-foreground/20 animate-edge-collapse"
                  style={{ animationDelay: "1.5s" }}
                />

                {/* Disconnected nodes pulsing weakly */}
                <circle 
                  cx="80" cy="60" r="12" 
                  className="fill-violet/30 animate-weak-pulse"
                  style={{ animationDelay: "0s" }}
                />
                <circle 
                  cx="220" cy="60" r="12" 
                  className="fill-teal/30 animate-weak-pulse"
                  style={{ animationDelay: "0.4s" }}
                />
                <circle 
                  cx="150" cy="100" r="16" 
                  className="fill-primary/30 animate-weak-pulse"
                  style={{ animationDelay: "0.8s" }}
                />
                <circle 
                  cx="100" cy="160" r="10" 
                  className="fill-cyan/30 animate-weak-pulse"
                  style={{ animationDelay: "1.2s" }}
                />
                <circle 
                  cx="200" cy="160" r="10" 
                  className="fill-accent/30 animate-weak-pulse"
                  style={{ animationDelay: "1.6s" }}
                />
              </svg>
            </div>

            <p className="text-sm text-charcoal-foreground/70 italic">
              Information without structure doesn't compound.
            </p>
          </div>
        </div>

        {/* Transition Text */}
        <div 
          className={`text-center mt-16 transition-all duration-1000 ${
            transitionActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-2xl md:text-3xl font-heading font-semibold text-primary">
            Understanding requires structure.
          </p>
        </div>
      </div>
    </section>
  );
}
