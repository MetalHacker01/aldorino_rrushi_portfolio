import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Github, Settings, Zap } from "lucide-react";

const CustomSolutions = () => {
  const solutions = [
    {
      title: "Oracle Eloqua Extensions",
      description: "Custom solutions to extend Eloqua's out-of-the-box functionalities",
      platforms: ["Oracle Eloqua"],
      capabilities: ["Form Processing", "Data Synchronization", "Campaign Automation"],
      icon: <Settings className="w-6 h-6" />
    },
    {
      title: "Adobe Marketo Integrations", 
      description: "Overcoming platform limitations through custom API integrations",
      platforms: ["Adobe Marketo"],
      capabilities: ["API Extensions", "Webhook Processing", "Custom Lead Routing"],
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: "SFMC Custom Journey Activities",
      description: "Learning and developing custom activities for Salesforce Marketing Cloud",
      platforms: ["Salesforce Marketing Cloud"],
      capabilities: ["Custom Activities", "Journey Builder Extensions"],
      icon: <Github className="w-6 h-6" />,
      githubUrl: "https://github.com/MetalHacker01/SFMC_CustomJourney_Activity",
      status: "In Progress"
    },
    {
      title: "Send Time Optimization for Always-On Campaigns",
      description: "Proof of concept addressing SFMC's STO limitation in always-on campaigns",
      platforms: ["Salesforce Marketing Cloud"],
      capabilities: ["Send Time Optimization", "Always-On Campaigns", "Custom Logic"],
      icon: <Github className="w-6 h-6" />,
      githubUrl: "https://github.com/MetalHacker01/SFMC_STO_CustomActivity",
      status: "Active Development"
    }
  ];

  return (
    <section id="solutions" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl font-bold mb-4">
              Custom <span className="text-primary pulse-glow">Solutions</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
            <p className="text-xl text-muted-foreground mt-6">
              Extending platform capabilities and overcoming limitations through custom development
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <Card 
                key={index}
                className="scroll-reveal group hover:border-primary/50 transition-smooth"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-smooth">
                        {solution.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl text-primary group-hover:text-accent transition-smooth">
                          {solution.title}
                        </CardTitle>
                        {solution.status && (
                          <span className="text-sm text-accent font-medium">
                            {solution.status}
                          </span>
                        )}
                      </div>
                    </div>
                    {solution.githubUrl && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => window.open(solution.githubUrl, '_blank')}
                        className="hover:bg-primary/10"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  <CardDescription className="mt-3">
                    {solution.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-2">PLATFORMS</h4>
                      <div className="flex flex-wrap gap-2">
                        {solution.platforms.map((platform, idx) => (
                          <span 
                            key={idx}
                            className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                          >
                            {platform}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-2">CAPABILITIES</h4>
                      <div className="flex flex-wrap gap-2">
                        {solution.capabilities.map((capability, idx) => (
                          <span 
                            key={idx}
                            className="px-3 py-1 bg-card border border-border text-foreground text-sm rounded-full"
                          >
                            {capability}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12 scroll-reveal">
            <p className="text-muted-foreground mb-6">
              Interested in custom solutions for your marketing automation challenges?
            </p>
            <Button variant="hero" size="lg" className="group">
              <ExternalLink className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Let's Discuss Your Needs
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomSolutions;