import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import { useEffect, useState } from "react";
import profilePhoto from "/lovable-uploads/8faf4d8e-5746-42e3-bb3c-e8e1d2d5a8c5.png";

const Hero = () => {
  const [typedText, setTypedText] = useState("");
  const fullText = "Solution Engineer";
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 150);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-primary/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-accent/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse delay-1000"></div>
      </div>
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Profile Image */}
          <div className="flex-shrink-0 animate-scale-in">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-full blur-xl opacity-50 animate-pulse-glow"></div>
              <img
                src={profilePhoto}
                alt="Aldorino Rrushi - Solution Engineer"
                className="relative w-80 h-80 rounded-full object-cover shadow-glow border-4 border-primary/20"
              />
            </div>
          </div>
          
          {/* Hero Content */}
          <div className="flex-1 text-center lg:text-left space-y-8">
            <div className="space-y-4 animate-fade-in">
              <h1 className="text-5xl lg:text-7xl font-bold">
                Hi, I'm{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent pulse-glow">
                  Aldorino
                </span>
              </h1>
              
              <div className="text-2xl lg:text-4xl font-semibold text-muted-foreground">
                <span className="text-primary font-mono typing-animation">
                  {typedText}
                </span>
                <br />
                <span className="text-accent pulse-glow">7x ☁️ Certified</span> Marketing Automation Expert
              </div>
              
              <p className="text-xl text-muted-foreground max-w-2xl">
                Transforming marketing strategies with{" "}
                <span className="text-primary font-semibold">Salesforce Marketing Cloud</span> and cutting-edge automation solutions. 
                Building the future of customer engagement, one campaign at a time.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start animate-slide-up">
              <Button variant="hero" size="lg" className="group">
                <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Get In Touch
              </Button>
              
              <Button variant="outline" size="lg" className="group hover:border-primary hover:text-primary">
                <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                Download CV
              </Button>
              
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="hover:text-primary hover:scale-110">
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:text-primary hover:scale-110">
                  <Github className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;