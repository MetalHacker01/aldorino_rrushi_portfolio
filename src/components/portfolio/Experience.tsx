import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Calendar, MapPin } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      title: "Solutions Engineer",
      company: "MarketOne International",
      period: "October 2024 - Present",
      location: "Remote",
      description: "Leading Salesforce Marketing Cloud implementations and advanced marketing automation programs.",
      highlights: [
        "Serve as SFMC subject matter expert, translating business requirements into scalable solutions",
        "Partner with cross-functional teams to deliver advanced marketing automation programs",
        "Oversee day-to-day development of marketing automation workflows",
        "Lead client discussions on SFMC utilization for enhanced customer experience"
      ],
      technologies: ["Salesforce Marketing Cloud", "Marketing Automation", "Client Relations", "Team Leadership"]
    },
    {
      title: "Salesforce Marketing Cloud Dev / Web Developer",
      company: "MarketOne International", 
      period: "March 2022 - October 2024",
      location: "Remote",
      description: "Led complex SFMC campaigns from strategy to implementation, utilizing advanced scripting and API integrations.",
      highlights: [
        "Developed customized solutions using AmpScript and SSJS for campaign optimization", 
        "Utilized SQL queries for sophisticated audience segmentation and targeting",
        "Built custom websites and solutions using HTML, CSS, JavaScript, Python",
        "Created API solutions in Oracle Eloqua and Adobe Marketo for data management",
        "Conducted code reviews and provided technical guidance to junior developers"
      ],
      technologies: ["AmpScript", "SSJS", "SQL", "JavaScript", "Python", "RESTful APIs", "Oracle Eloqua", "Adobe Marketo"]
    },
    {
      title: "Technical Lead",
      company: "Assist Digital",
      period: "2018 - March 2022", 
      location: "Tirana, Albania",
      description: "Led a large Marketing Automation team working on large-scale projects for enterprise clients.",
      highlights: [
        "Leading Marketing Automation team of 10-15 members",
        "Working on large-scale projects for Mopar FCA, Luxottica, and Maserati",
        "Extensive knowledge of Salesforce Marketing Cloud, Oracle Eloqua, Oracle Responsys, HCL Unica"
      ],
      technologies: ["Salesforce Marketing Cloud", "Oracle Eloqua", "Oracle Responsys", "HCL Unica", "Team Management"]
    },
    {
      title: "Marketing Automation Analyst", 
      company: "Assist Digital",
      period: "April 2018 - December 2019",
      location: "Tirana, Albania", 
      description: "Focused on creating personalized email campaigns and landing pages for EMEA region.",
      highlights: [
        "Created pages for all EMEA region countries for FCA Group",
        "Developed highly personalized and responsive emails and landing pages",
        "Designed and configured complex digital campaigns and customer journeys",
        "Analyzed campaign performance including segmentation, deliverability, and conversion rates"
      ],
      technologies: ["Oracle Eloqua", "Salesforce Marketing Cloud", "Email Marketing", "Performance Analytics"]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl font-bold mb-4">
              Professional <span className="text-primary pulse-glow">Experience</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
            <p className="text-xl text-muted-foreground mt-6">
              7+ years of expertise in Marketing Automation and Web Development
            </p>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <Card 
                key={index} 
                className="scroll-reveal bg-gradient-card border-border hover:border-primary/50 transition-smooth group"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardHeader>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl text-primary group-hover:text-accent transition-smooth">
                        {exp.title}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 text-lg mt-2">
                        <Building2 className="w-4 h-4" />
                        {exp.company}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <p className="text-lg text-muted-foreground">
                    {exp.description}
                  </p>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Key Achievements:</h4>
                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, hIndex) => (
                        <li key={hIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-muted-foreground">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-smooth">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;