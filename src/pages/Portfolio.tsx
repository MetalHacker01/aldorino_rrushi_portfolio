import { useScrollReveal } from "@/hooks/useScrollReveal";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Experience from "@/components/portfolio/Experience";
import Certifications from "@/components/portfolio/Certifications";
import CustomSolutions from "@/components/portfolio/CustomSolutions";
import Terminal from "@/components/portfolio/Terminal";
import Contact from "@/components/portfolio/Contact";
import Logo from "@/components/portfolio/Logo";

const Portfolio = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            
            <div className="hidden md:flex space-x-8">
              {[
                { label: "About", href: "#about" },
                { label: "Experience", href: "#experience" },
                { label: "Certifications", href: "#certifications" },
                { label: "Solutions", href: "#solutions" },
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

      {/* Custom Solutions Section */}
      <CustomSolutions />

      {/* Terminal Section */}
      <Terminal />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <footer className="py-8 bg-card border-t border-border">
        <div className="container mx-auto px-6">
          <div className="text-center text-muted-foreground">
            <p className="text-sm flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              © 2025 Aldorino Rrushi. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;