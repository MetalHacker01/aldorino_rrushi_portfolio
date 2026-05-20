
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import V2Home from "./pages/v2/Home";
import V2Case from "./pages/v2/ProjectCaseStudy";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const queryClient = new QueryClient();


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<V2Home />} />
          <Route path="/v2" element={<V2Home />} />
          <Route path="/projects/:slug" element={<V2Case />} />
          <Route path="/v2/projects/:slug" element={<V2Case />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
  <Analytics />
  <SpeedInsights />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
