import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AppSidebar from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import PregnancyDueDateCalculator from "./pages/PregnancyDueDateCalculator";
import ContractionTracker from "./pages/ContractionTracker";
import PregnancyWeightGainCalculator from "./pages/PregnancyWeightGainCalculator";
import PregnancyWeeklyCalendar from "./pages/PregnancyWeeklyCalendar";
import BabyMovementTracker from "./pages/BabyMovementTracker";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <AppSidebar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/grossesse/calculateur-terme" element={<PregnancyDueDateCalculator />} />
              <Route path="/grossesse/tracker-contractions" element={<ContractionTracker />} />
              <Route path="/grossesse/calculateur-poids" element={<PregnancyWeightGainCalculator />} />
              <Route path="/grossesse/calendrier-semaine" element={<PregnancyWeeklyCalendar />} />
              <Route path="/grossesse/tracker-mouvements-bebe" element={<BabyMovementTracker />} />
              {/* [TODO] ADD CUSTOM ROUTES FOR EACH TOOL AS DEVELOPED */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
