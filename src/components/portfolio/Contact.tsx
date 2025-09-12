import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Linkedin, Github, MapPin, Phone } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "aldorino.rrushi@gmail.com",
      href: "mailto:aldorino.rrushi@gmail.com",
      description: "Let's discuss your next project"
    },
    {
      icon: Linkedin, 
      label: "LinkedIn",
      value: "linkedin.com/in/aldorino-rrushi",
      href: "http://www.linkedin.com/in/aldorino-rrushi",
      description: "Connect professionally"
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/aldorino-rrushi",
      href: "https://github.com/aldorino-rrushi",
      description: "Explore my code repositories"
    },
    {
      icon: MapPin,
      label: "Location", 
      value: "Tirana, Albania",
      href: "#",
      description: "Available for remote work worldwide"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl font-bold mb-4">
              Let's <span className="text-primary pulse-glow">Connect</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
            <p className="text-xl text-muted-foreground mt-6">
              Ready to transform your marketing automation strategy? Let's discuss how we can work together.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {contactInfo.map((contact, index) => {
              const Icon = contact.icon;
              return (
                <Card 
                  key={index}
                  className="scroll-reveal bg-gradient-card border-border hover:border-primary/50 transition-smooth group cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => contact.href !== "#" && window.open(contact.href, "_blank")}
                >
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-smooth">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg group-hover:text-primary transition-smooth">
                          {contact.label}
                        </CardTitle>
                        <CardDescription className="text-accent">
                          {contact.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground font-mono text-sm">
                      {contact.value}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="text-center scroll-reveal">
            <Card className="bg-gradient-card border-primary/20 p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-2">
                    Ready to Automate Your Marketing?
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    From Salesforce Marketing Cloud implementations to custom web solutions, 
                    I help businesses scale their marketing efforts with intelligent automation.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    variant="hero" 
                    size="lg"
                    onClick={() => window.open("mailto:aldorino.rrushi@gmail.com", "_blank")}
                    className="group"
                  >
                    <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    Start a Conversation
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => window.open("http://www.linkedin.com/in/aldorino-rrushi", "_blank")}
                    className="hover:border-primary hover:text-primary group"
                  >
                    <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Connect on LinkedIn
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;