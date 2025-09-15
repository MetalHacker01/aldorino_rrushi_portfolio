import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Award, CheckCircle, Star, Image as ImageIcon } from "lucide-react";
import { useState } from "react";

const Certifications = () => {
  const salesforceCerts = [
    {
      name: "Salesforce Certified Agentforce Specialist",
      type: "Latest",
      category: "AI & Automation",
  img: "/images/certifications/SF_AgentForce_Specialit_Cert.jpg"
    },
    {
      name: "Salesforce Certified AI Associate",
      type: "AI Certification",
      category: "Artificial Intelligence",
  img: "/images/certifications/SF_AI_Associate_Cert.jpg"
    },
    {
      name: "Salesforce Certified Platform Foundations",
      type: "Platform",
      category: "Core Platform",
  img: "/images/certifications/SF_Associate_Cert.jpg"
    },
    {
      name: "Salesforce Certified Marketing Cloud Engagement Consultant",
      type: "Consultant",
      category: "Marketing Cloud",
  img: "/images/certifications/SFMC_Consultant_Cert.jpg"
    },
    {
      name: "Salesforce Certified Marketing Cloud Engagement Administrator",
      type: "Administrator",
      category: "Marketing Cloud",
  img: "/images/certifications/SFMC_Admin_Cert.jpg"
    },
    {
      name: "Salesforce Certified Marketing Cloud Engagement Developer",
      type: "Developer",
      category: "Marketing Cloud",
  img: "/images/certifications/SFMC_Developer_Cert.jpg"
    },
    {
      name: "Salesforce Certified Marketing Cloud Email Specialist",
      type: "Specialist",
      category: "Marketing Cloud",
  img: "/images/certifications/SFMC_EmailSpecialist_Cert.jpg"
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
              <span className="block w-14 h-10">
                <img src="/images/Salesforce.com_logo.svg" alt="Salesforce Logo" className="w-14 h-10" />
              </span>
              <h3 className="text-3xl font-bold text-primary">Salesforce Certifications</h3>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {salesforceCerts.map((cert, index) => (
                <Dialog key={index}>
                  <DialogTrigger asChild>
                    <Card
                      className="scroll-reveal bg-gradient-card border-border hover:border-primary/50 transition-smooth group hover:shadow-glow cursor-pointer"
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
                        <div className="flex items-center gap-2 mt-2 text-primary/80 text-xs">
                          <ImageIcon className="w-4 h-4" />
                          View Certificate
                        </div>
                      </CardHeader>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl p-0 bg-background rounded-lg border border-border shadow-xl">
                    <div className="flex items-center justify-between px-6 pt-6 pb-2 border-b border-border">
                      <DialogTitle className="text-primary text-lg m-0 p-0">{cert.name}</DialogTitle>
                      {/* The close button is rendered by DialogContent, so we leave space here */}
                    </div>
                    <div className="flex flex-col items-center justify-center p-4">
                      <img
                        src={cert.img}
                        alt={cert.name}
                        className="rounded-lg border border-border shadow-lg max-h-[70vh] w-auto object-contain"
                        style={{ background: '#fff' }}
                      />
                    </div>
                  </DialogContent>
                </Dialog>
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
