import { useEffect, useRef, useState } from "react";
import { BookOpen, BrainCircuit, Target, Users, Lightbulb, TrendingUp } from "lucide-react";

export function LearningChallenges() {
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

  const challenges = [
    {
      icon: BookOpen,
      title: "Information Overload",
      description: "Students and researchers face endless content without clear learning paths",
      stats: "73% of students feel overwhelmed by study materials",
      color: "text-red-500"
    },
    {
      icon: BrainCircuit,
      title: "Fragmented Understanding", 
      description: "Knowledge gaps make it impossible to connect concepts across subjects",
      stats: "68% struggle to apply theory in practical scenarios",
      color: "text-orange-500"
    },
    {
      icon: Target,
      title: "One-Size-Fits-None",
      description: "Traditional learning doesn't adapt to individual goals and pace",
      stats: "82% want personalized learning experiences",
      color: "text-purple-500"
    }
  ];

  const solutions = [
    {
      icon: Lightbulb,
      title: "Structured Learning Paths",
      description: "Every concept builds on previous knowledge, creating strong foundations",
      benefit: "No more knowledge gaps"
    },
    {
      icon: TrendingUp,
      title: "Visual Knowledge Maps",
      description: "See how concepts connect and understand your learning journey",
      benefit: "Clear progress tracking"
    },
    {
      icon: Users,
      title: "Adaptive to Your Goals",
      description: "Whether you're preparing for exams, upskilling, or exploring new fields",
      benefit: "Learning that fits your life"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-24 md:py-32 bg-gradient-to-b from-background via-muted/20 to-muted/30 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 
            className={`text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            The Learning Challenge We All Face
          </h2>
          <p 
            className={`text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Whether you're a student drowning in textbooks, a researcher connecting disparate findings, 
            or a professional upskilling for the future—the struggle is real.
          </p>
        </div>

        {/* Challenges Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {challenges.map((challenge, index) => {
            const Icon = challenge.icon;
            return (
              <div 
                key={index}
                className={`relative p-8 rounded-2xl bg-card border border-border shadow-lg transition-all duration-700 hover:shadow-xl hover:-translate-y-1 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-6 ${challenge.color}`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {challenge.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {challenge.description}
                </p>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm font-medium text-foreground">
                    {challenge.stats}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bridge Section */}
        <div className="text-center mb-20">
          <div className={`inline-flex flex-col items-center gap-4 px-8 py-4 bg-primary/10 rounded-full border border-primary/20 transition-all duration-1000 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
            style={{ transitionDelay: "600ms" }}
          >
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
              <BrainCircuit className="w-6 h-6 text-primary-foreground" />
            </div>
            <p className="text-lg font-medium text-primary">
              KnowGraph transforms these challenges into connected understanding
            </p>
            <p className="text-sm text-primary/80">
              Each capsule: 40 seconds to 1.5 minutes focused learning
            </p>
          </div>
        </div>

        {/* Solutions Section */}
        <div>
          <h3 
            className={`text-2xl md:text-3xl font-bold text-foreground text-center mb-12 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "800ms" }}
          >
            Built for How We Actually Learn
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <div 
                  key={index}
                  className={`relative p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 transition-all duration-700 hover:border-primary/40 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${800 + index * 150}ms` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-3">
                    {solution.title}
                  </h4>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {solution.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-medium text-primary">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    {solution.benefit}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-16 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
          style={{ transitionDelay: "1400ms" }}
        >
          <div className="inline-flex flex-col items-center gap-4 p-8 rounded-3xl bg-card border border-border shadow-lg max-w-2xl mx-auto">
            <h4 className="text-xl font-semibold text-foreground">
              Stop collecting information. Start building understanding.
            </h4>
            <p className="text-muted-foreground">
              Join thousands of learners who've transformed their study approach with KnowGraph
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
