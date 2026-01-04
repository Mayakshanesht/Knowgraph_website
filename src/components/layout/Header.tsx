import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import knowgraphLogo from "@/assets/knowgraph-logo.png";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Platform", href: "/platform" },
  { name: "Capsules", href: "/capsules" },
  { name: "Learning Paths", href: "/learning-paths" },
  { name: "Courses", href: "/courses" },
  { name: "Pricing", href: "/pricing" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="container mx-auto flex items-center justify-between py-3 px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img 
            src={knowgraphLogo} 
            alt="KnowGraph" 
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:block">
          <Button asChild variant="hero" size="default">
            <Link to="/try">Try KnowGraph</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-background border-b border-border">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Button asChild variant="hero" size="default" className="w-full">
              <Link to="/try" onClick={() => setMobileMenuOpen(false)}>
                Try KnowGraph
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
