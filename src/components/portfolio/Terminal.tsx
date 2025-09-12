import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Terminal as TerminalIcon, Play } from "lucide-react";
import { useState, useEffect } from "react";

const Terminal = () => {
  const [currentCommand, setCurrentCommand] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const commands = [
    {
      command: "npm create react-app marketing-dashboard --template typescript",
      output: ["Creating a new React app in /marketing-dashboard...", "Installing packages. This might take a few minutes.", "✓ Success! Created marketing-dashboard"],
      description: "Setting up React TypeScript project"
    },
    {
      command: "sfdx force:data:soql:query -q \"SELECT Id, Email FROM Contact WHERE LastLoginDate = TODAY\"",
      output: ["Running SOQL query...", "Found 1,247 active contacts", "Query completed successfully"],
      description: "Salesforce CLI - Query active contacts"
    },
    {
      command: "git clone https://github.com/aldorino-rrushi/marketing-automation-suite.git",
      output: ["Cloning into 'marketing-automation-suite'...", "Receiving objects: 100% (156/156)", "Resolving deltas: 100% (89/89), done."],
      description: "Cloning Marketing Automation project"
    },
    {
      command: "python api_integration.py --platform=eloqua --sync=contacts",
      output: ["Connecting to Oracle Eloqua API...", "Syncing 3,421 contact records...", "✓ Sync completed: 3,421 contacts processed"],
      description: "Python API integration script"
    },
    {
      command: "docker-compose up marketing-cloud-dev",
      output: ["Creating network \"marketing_default\"", "Creating marketing-cloud-dev_db_1...", "marketing-cloud-dev_1 | Server ready on port 3000"],
      description: "Docker development environment"
    }
  ];

  const typeCommand = async (text: string) => {
    setIsTyping(true);
    setDisplayedText("");
    
    for (let i = 0; i <= text.length; i++) {
      setDisplayedText(text.slice(0, i));
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    setIsTyping(false);
  };

  const runCommand = async (index: number) => {
    const command = commands[index];
    await typeCommand(command.command);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Auto-advance to next command after 3 seconds
    setTimeout(() => {
      setCurrentCommand((prev) => (prev + 1) % commands.length);
    }, 3000);
  };

  useEffect(() => {
    runCommand(currentCommand);
  }, [currentCommand]);

  return (
    <section id="terminal" className="py-20 bg-card">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl font-bold mb-4">
              Developer <span className="text-primary pulse-glow">Terminal</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
            <p className="text-xl text-muted-foreground mt-6">
              Command line tools and workflows for Marketing Automation projects
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Terminal Window */}
            <div className="scroll-reveal">
              <Card className="terminal-window font-mono">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <CardTitle className="text-sm text-muted-foreground ml-4 flex items-center gap-2">
                      <TerminalIcon className="w-4 h-4" />
                      aldorino@marketing-dev:~
                    </CardTitle>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="min-h-[300px] space-y-2">
                    <div className="flex items-center gap-2 text-success">
                      <span>$</span>
                      <span className="text-foreground">
                        {displayedText}
                        {isTyping && <span className="animate-pulse">|</span>}
                      </span>
                    </div>
                    
                    {!isTyping && displayedText && (
                      <div className="space-y-1 text-muted-foreground text-sm ml-4">
                        {commands[currentCommand].output.map((line, index) => (
                          <div 
                            key={index} 
                            className="animate-fade-in"
                            style={{ animationDelay: `${index * 300}ms` }}
                          >
                            {line}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 pt-4 border-t border-border">
                    <span className="text-success text-sm">●</span>
                    <span className="text-sm text-muted-foreground">
                      {commands[currentCommand].description}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Command List */}
            <div className="scroll-reveal space-y-4">
              <h3 className="text-2xl font-bold text-primary mb-6">Available Commands</h3>
              
              {commands.map((cmd, index) => (
                <Card 
                  key={index}
                  className={`cursor-pointer transition-smooth ${
                    index === currentCommand 
                      ? 'border-primary bg-primary/5' 
                      : 'hover:border-primary/50'
                  }`}
                  onClick={() => setCurrentCommand(index)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Button
                        variant={index === currentCommand ? "default" : "ghost"}
                        size="icon"
                        className="flex-shrink-0"
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground mb-1">
                          {cmd.description}
                        </h4>
                        <code className="text-sm text-muted-foreground font-mono break-all">
                          {cmd.command}
                        </code>
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

export default Terminal;