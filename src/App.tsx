
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { AnimatedHeader } from "@/components/layout/AnimatedHeader";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CategoryPage from "./pages/CategoryPage";
import PregnancyDueDateCalculator from "./pages/PregnancyDueDateCalculator";
import ContractionTracker from "./pages/ContractionTracker";
import PregnancyWeightGainCalculator from "./pages/PregnancyWeightGainCalculator";
import PregnancyWeeklyCalendar from "./pages/PregnancyWeeklyCalendar";
import BabyMovementTracker from "./pages/BabyMovementTracker";
import PregnancySymptomJournal from "./pages/PregnancySymptomJournal";
import SexPredictionCalculator from "./pages/SexPredictionCalculator";
import BabyBudgetSimulator from "./pages/BabyBudgetSimulator";
import GrowthCurves from "./pages/GrowthCurves";
import FoodDiversificationGuide from "./pages/FoodDiversificationGuide";
import MotorDevelopmentTracker from "./pages/MotorDevelopmentTracker";
import ChildNutritionCalculator from "./pages/ChildNutritionCalculator";
import BreastfeedingGuide from "./pages/BreastfeedingGuide";
import TeethingCalculator from "./pages/TeethingCalculator";
import CryingMoodTracker from "./pages/CryingMoodTracker";
import PwaStatusIndicator from "./components/ui/PwaStatusIndicator";
import ScrollToTop from "./components/layout/ScrollToTop";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (replaced cacheTime)
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <div className="min-h-screen flex w-full flex-col">
            <AnimatedHeader />
            <div className="pt-16"> {/* Offset pour le header fixe */}
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/categorie/:categoryId" element={<CategoryPage />} />
                <Route path="/grossesse/calculateur-terme" element={<PregnancyDueDateCalculator />} />
                <Route path="/grossesse/tracker-contractions" element={<ContractionTracker />} />
                <Route path="/grossesse/calculateur-poids" element={<PregnancyWeightGainCalculator />} />
                <Route path="/grossesse/calendrier-semaine" element={<PregnancyWeeklyCalendar />} />
                <Route path="/grossesse/tracker-mouvements-bebe" element={<BabyMovementTracker />} />
                <Route path="/grossesse/journal-symptomes" element={<PregnancySymptomJournal />} />
                <Route path="/grossesse/calculateur-sexe-bebe" element={<SexPredictionCalculator />} />
                <Route path="/grossesse/simulateur-budget-bebe" element={<BabyBudgetSimulator />} />
                <Route path="/enfant/courbes-croissance" element={<GrowthCurves />} />
                <Route path="/enfant/guide-diversification" element={<FoodDiversificationGuide />} />
                <Route path="/enfant/developpement-moteur" element={<MotorDevelopmentTracker />} />
                <Route path="/enfant/besoins-nutritionnels" element={<ChildNutritionCalculator />} />
                <Route path="/sante/guide-allaitement" element={<BreastfeedingGuide />} />
                <Route path="/enfant/calculateur-dents" element={<TeethingCalculator />} />
                <Route path="/enfant/tracker-pleurs-humeur" element={<CryingMoodTracker />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <PwaStatusIndicator />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
