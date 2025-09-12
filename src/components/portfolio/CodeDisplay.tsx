import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

const CodeDisplay = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const codeExamples = [
    {
      id: "ampscript",
      title: "AmpScript - Dynamic Content",
      language: "ampscript",
      description: "Personalized email content using Salesforce Marketing Cloud AmpScript",
      code: `%%[
  VAR @firstName, @preferredStore, @loyaltyTier
  SET @firstName = AttributeValue("First_Name")
  SET @preferredStore = AttributeValue("Preferred_Store")  
  SET @loyaltyTier = AttributeValue("Loyalty_Tier")
  
  IF @loyaltyTier == "Premium" THEN
]%%
  <h2>Exclusive Premium Offer, %%=v(@firstName)=%%!</h2>
  <p>Visit your preferred %%=v(@preferredStore)=%% location for VIP treatment.</p>
%%[ ELSE ]%%
  <h2>Special Offer for You, %%=v(@firstName)=%%!</h2>
%%[ ENDIF ]%%`
    },
    {
      id: "ssjs",
      title: "SSJS - API Integration",
      language: "javascript", 
      description: "Server-Side JavaScript for external API calls and data processing",
      code: `<script runat="server">
  Platform.Load("core", "1");
  
  try {
    // Retrieve customer data from Data Extension
    var customerDE = DataExtension.Init("Customer_Preferences");
    var data = customerDE.Rows.Retrieve();
    
    // Process each customer record
    for (var i = 0; i < data.length; i++) {
      var customer = data[i];
      var customerId = customer.CustomerId;
      
      // Call external API to get real-time data
      var httpRequest = new Script.Util.HttpRequest("https://api.example.com/customer/" + customerId);
      httpRequest.emptyContentHandling = 0;
      httpRequest.retries = 2;
      httpRequest.continueOnError = true;
      
      var response = httpRequest.get();
      
      if (response.statusCode == 200) {
        var apiData = Platform.Function.ParseJSON(response.content);
        // Update customer record with fresh data
        customerDE.Rows.Update({CustomerId: customerId}, {LastPurchase: apiData.lastPurchase});
      }
    }
  } catch (ex) {
    Write("Error: " + ex.message);
  }
</script>`
    },
    {
      id: "react",
      title: "React - Interactive Component",
      language: "jsx",
      description: "Modern React component with TypeScript and Tailwind CSS",
      code: `import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CampaignMetrics {
  opens: number;
  clicks: number;
  conversions: number;
}

const CampaignDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<CampaignMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('/api/campaign-metrics');
        const data = await response.json();
        setMetrics(data);
      } catch (error) {
        console.error('Failed to fetch metrics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) return <div className="animate-pulse">Loading...</div>;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-primary">Campaign Performance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {metrics && (
          <>
            <div className="flex justify-between">
              <span>Opens:</span>
              <span className="font-bold text-success">{metrics.opens.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Clicks:</span>
              <span className="font-bold text-primary">{metrics.clicks.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Conversions:</span>
              <span className="font-bold text-accent">{metrics.conversions.toLocaleString()}</span>
            </div>
          </>
        )}
        <Button className="w-full mt-4" variant="hero">
          View Detailed Report
        </Button>
      </CardContent>
    </Card>
  );
};

export default CampaignDashboard;`
    },
    {
      id: "sql",
      title: "SQL - Advanced Segmentation", 
      language: "sql",
      description: "Complex audience segmentation query for Marketing Cloud",
      code: `SELECT 
    c.SubscriberKey,
    c.EmailAddress,
    c.FirstName,
    c.LastName,
    c.City,
    c.State,
    e.TotalPurchases,
    e.AvgOrderValue,
    e.LastPurchaseDate,
    CASE 
        WHEN e.TotalPurchases >= 10 AND e.AvgOrderValue >= 100 THEN 'VIP'
        WHEN e.TotalPurchases >= 5 AND e.AvgOrderValue >= 50 THEN 'Premium'
        WHEN e.TotalPurchases >= 1 THEN 'Regular'
        ELSE 'Prospect'
    END AS CustomerTier,
    CASE
        WHEN DATEDIFF(day, e.LastPurchaseDate, GETDATE()) <= 30 THEN 'Active'
        WHEN DATEDIFF(day, e.LastPurchaseDate, GETDATE()) <= 90 THEN 'At Risk'
        ELSE 'Inactive'
    END AS EngagementStatus
FROM Customers c
LEFT JOIN (
    SELECT 
        SubscriberKey,
        COUNT(*) as TotalPurchases,
        AVG(OrderValue) as AvgOrderValue,
        MAX(PurchaseDate) as LastPurchaseDate
    FROM Purchases
    WHERE PurchaseDate >= DATEADD(year, -2, GETDATE())
    GROUP BY SubscriberKey
) e ON c.SubscriberKey = e.SubscriberKey
WHERE c.OptIn = 1 
    AND c.EmailAddress IS NOT NULL
    AND c.EmailAddress NOT LIKE '%@test.com'
ORDER BY e.TotalPurchases DESC, e.LastPurchaseDate DESC`
    }
  ];

  return (
    <section id="code" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl font-bold mb-4">
              Code <span className="text-primary pulse-glow">Showcase</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
            <p className="text-xl text-muted-foreground mt-6">
              Real-world examples from Marketing Automation and Web Development projects
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {codeExamples.map((example, index) => (
              <Card 
                key={example.id}
                className="scroll-reveal code-highlight group"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl text-primary group-hover:text-accent transition-smooth">
                        {example.title}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {example.description}
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(example.code, example.id)}
                      className="hover:bg-primary/10"
                    >
                      {copiedCode === example.id ? (
                        <Check className="w-4 h-4 text-success" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <pre className="text-sm overflow-x-auto">
                      <code className="text-foreground font-mono leading-relaxed whitespace-pre">
                        {example.code}
                      </code>
                    </pre>
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

export default CodeDisplay;