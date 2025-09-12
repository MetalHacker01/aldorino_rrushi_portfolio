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
      command: "%%[ VAR @firstName, @preferredProduct SET @firstName = AttributeValue(\"First_Name\") SET @preferredProduct = AttributeValue(\"Product_Interest\") ]%%",
      output: ["Processing AmpScript variables...", "Retrieved subscriber attributes", "✓ Variables set successfully"],
      description: "AmpScript - Dynamic Content Personalization"
    },
    {
      command: "Platform.Load(\"core\", \"1\"); var de = DataExtension.Init(\"Customer_Preferences\"); var rows = de.Rows.Retrieve();",
      output: ["Loading SSJS core library...", "Initializing Data Extension connection...", "Retrieved 2,847 customer records", "✓ SSJS execution completed"],
      description: "SSJS - Data Extension Processing"
    },
    {
      command: "SELECT SubscriberKey, EmailAddress FROM Customers WHERE LastEngagementDate >= DATEADD(day, -30, GETDATE())",
      output: ["Executing SQL query...", "Processing customer segmentation...", "Found 5,623 active subscribers", "✓ Query completed successfully"],
      description: "SQL - Audience Segmentation Query"
    },
    {
      command: "POST /interaction/v1/events HTTP/1.1 Content-Type: application/json Authorization: Bearer {{access_token}}",
      output: ["Connecting to SFMC REST API...", "Sending journey event data...", "Event processed successfully", "✓ API call completed"],
      description: "REST API - Journey Event Injection"
    },
    {
      command: "%%=IIF(@preferredProduct == \"Premium\", \"Exclusive VIP Offer\", \"Special Promotion\")=%%",
      output: ["Evaluating conditional logic...", "Applying personalization rules...", "Content variant selected", "✓ Dynamic content rendered"],
      description: "AmpScript - Conditional Content Logic"
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