import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, CheckCircle, Star } from "lucide-react";

const Certifications = () => {
  const salesforceCerts = [
    {
      name: "Salesforce Certified Agentforce Specialist",
      type: "Latest",
      category: "AI & Automation"
    },
    {
      name: "Salesforce Certified AI Associate", 
      type: "AI Certification",
      category: "Artificial Intelligence"
    },
    {
      name: "Salesforce Certified Platform Foundations",
      type: "Platform",
      category: "Core Platform"
    },
    {
      name: "Salesforce Certified Marketing Cloud Engagement Consultant",
      type: "Consultant",
      category: "Marketing Cloud"
    },
    {
      name: "Salesforce Certified Marketing Cloud Engagement Administrator",
      type: "Administrator", 
      category: "Marketing Cloud"
    },
    {
      name: "Salesforce Certified Marketing Cloud Engagement Developer",
      type: "Developer",
      category: "Marketing Cloud"
    },
    {
      name: "Salesforce Certified Marketing Cloud Email Specialist",
      type: "Specialist",
      category: "Marketing Cloud"  
    }
  ];

  const otherCerts = [
    { name: "HubSpot Marketing Software", provider: "HubSpot" },
    { name: "HubSpot Email Marketing", provider: "HubSpot" }
  ];

  return (
    <section id="certifications" className="py-20 bg-card">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-primary pulse-glow">7x ☁️ Certified</span> Professional
            </h2>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
            <p className="text-xl text-muted-foreground mt-6">
              Salesforce Marketing Cloud Expert with comprehensive platform knowledge
            </p>
          </div>

          {/* Salesforce Certifications */}
          <div className="mb-12 scroll-reveal">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-3xl font-bold text-primary">Salesforce Certifications</h3>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {salesforceCerts.map((cert, index) => (
                <Card 
                  key={index}
                  className="scroll-reveal bg-gradient-card border-border hover:border-primary/50 transition-smooth group hover:shadow-glow"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                      <Badge variant="secondary" className="text-xs">
                        {cert.type}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight group-hover:text-primary transition-smooth">
                      {cert.name}
                    </CardTitle>
                    <CardDescription className="text-accent font-medium">
                      {cert.category}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          {/* Other Certifications */}
          <div className="scroll-reveal">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-card rounded-full flex items-center justify-center border border-border">
                <Star className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Additional Certifications</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {otherCerts.map((cert, index) => (
                <Card 
                  key={index}
                  className="bg-gradient-card border-border hover:border-accent/50 transition-smooth group"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <div>
                        <h4 className="font-semibold group-hover:text-accent transition-smooth">
                          {cert.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">{cert.provider}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
