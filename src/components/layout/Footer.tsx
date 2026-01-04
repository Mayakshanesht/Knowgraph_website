import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block">
              <span className="text-xl font-heading font-semibold text-foreground">
                KnowGraph
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-sm">
              Graph-based learning for complex systems. Structured knowledge for
              intentional learners.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Used to deliver learning in: AI, Autonomous Driving, Perception, Controls, Robotics
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Platform</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/platform" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/capsules" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Capsules
                </Link>
              </li>
              <li>
                <Link to="/learning-paths" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Learning Paths
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Courses</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/courses" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Recorded Courses
                </Link>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">
                  Delivered by CloudBee Robotics
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            2026 KnowGraph. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
