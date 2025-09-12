import { useScrollReveal } from "@/hooks/useScrollReveal";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Experience from "@/components/portfolio/Experience";
import Certifications from "@/components/portfolio/Certifications";
import CodeDisplay from "@/components/portfolio/CodeDisplay";
import Terminal from "@/components/portfolio/Terminal";
import Contact from "@/components/portfolio/Contact";

const Portfolio = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold">
              <span className="text-primary">Aldorino</span> Rrushi
            </div>
            
            <div className="hidden md:flex space-x-8">
              {[
                { label: "About", href: "#about" },
                { label: "Experience", href: "#experience" },
                { label: "Certifications", href: "#certifications" },
                { label: "Code", href: "#code" },
                { label: "Terminal", href: "#terminal" },
                { label: "Contact", href: "#contact" }
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Experience Section */}
      <Experience />

      {/* Certifications Section */}
      <Certifications />

      {/* Code Display Section */}
      <CodeDisplay />

      {/* Terminal Section */}
      <Terminal />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <footer className="py-8 bg-card border-t border-border">
        <div className="container mx-auto px-6">
          <div className="text-center text-muted-foreground">
            <p className="mb-2">
              Built with React, TypeScript, and Tailwind CSS
            </p>
            <p className="text-sm">
              © 2024 Aldorino Rrushi. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;