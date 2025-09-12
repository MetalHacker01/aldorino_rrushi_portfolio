import { Badge } from "@/components/ui/badge";

const About = () => {
  const skills = [
    "Salesforce Marketing Cloud",
    "Oracle Eloqua", 
    "AmpScript & SSJS",
    "Marketing Automation",
    "Campaign Development",
    "HTML/CSS/JavaScript",
    "Python & APIs",
    "SQL & Data Segmentation"
  ];

  return (
    <section id="about" className="py-20 bg-card">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl font-bold mb-4">
              About <span className="text-primary pulse-glow">Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* About Text */}
            <div className="space-y-6 scroll-reveal">
              <h3 className="text-2xl font-semibold text-primary">
                Marketing Automation Expert & Web Developer
              </h3>
              
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  With over <span className="text-primary font-semibold">7 years of experience</span> in Marketing 
                  Automation technology, I specialize in developing and executing tailored solutions using 
                  <span className="text-accent font-semibold"> Salesforce Marketing Cloud</span> and other key platforms.
                </p>
                
                <p>
                  Currently serving as a <span className="text-primary font-semibold">Solutions Engineer at MarketOne International</span>, 
                  I translate complex business requirements into scalable, efficient marketing automation workflows. 
                  My technical expertise spans from campaign strategy to full-stack development.
                </p>
                
                <p>
                  I hold a <span className="text-accent font-semibold">Master of Engineering in Computer Engineering</span> from 
                  the Polytechnic University of Tirana and maintain <span className="text-primary font-semibold">7 Salesforce certifications</span>, 
                  keeping me at the forefront of marketing automation technologies.
                </p>
              </div>
              
              <div className="pt-4">
                <p className="text-lg font-medium text-foreground mb-2">Languages:</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Albanian (Native)</Badge>
                  <Badge variant="outline">English (Professional)</Badge>
                  <Badge variant="outline">Italian (Professional)</Badge>
                  <Badge variant="outline">French (Elementary)</Badge>
                </div>
              </div>
            </div>
            
            {/* Skills */}
            <div className="scroll-reveal">
              <h3 className="text-2xl font-semibold mb-6 text-primary">Core Expertise</h3>
              <div className="grid gap-4">
                {skills.map((skill, index) => (
                  <div
                    key={skill}
                    className="flex items-center space-x-4 p-4 bg-gradient-card rounded-lg border border-border hover:border-primary/50 transition-smooth group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-2 h-2 bg-primary rounded-full group-hover:shadow-glow transition-smooth"></div>
                    <span className="text-lg font-medium group-hover:text-primary transition-smooth">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;