import React, { lazy, Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { AnimatedHeader } from "@/components/layout/AnimatedHeader";
import PwaStatusIndicator from "@/components/ui/PwaStatusIndicator";
import ScrollToTop from "@/components/layout/ScrollToTop";

// Lazy load all pages for better performance
const Index = lazy(() => import("@/pages/Index"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const CategoryPage = lazy(() => import("@/pages/CategoryPage"));
const PregnancyDueDateCalculator = lazy(() => import("@/pages/PregnancyDueDateCalculator"));
const ContractionTracker = lazy(() => import("@/pages/ContractionTracker"));
const PregnancyWeightGainCalculator = lazy(() => import("@/pages/PregnancyWeightGainCalculator"));
const PregnancyWeeklyCalendar = lazy(() => import("@/pages/PregnancyWeeklyCalendar"));
const BabyMovementTracker = lazy(() => import("@/pages/BabyMovementTracker"));
const PregnancySymptomJournal = lazy(() => import("@/pages/PregnancySymptomJournal"));
const SexPredictionCalculator = lazy(() => import("@/pages/SexPredictionCalculator"));
const BabyBudgetSimulator = lazy(() => import("@/pages/BabyBudgetSimulator"));
const GrowthCurves = lazy(() => import("@/pages/GrowthCurves"));
const FoodDiversificationGuide = lazy(() => import("@/pages/FoodDiversificationGuide"));
const MotorDevelopmentTracker = lazy(() => import("@/pages/MotorDevelopmentTracker"));
const ChildNutritionCalculator = lazy(() => import("@/pages/ChildNutritionCalculator"));
const BreastfeedingGuide = lazy(() => import("@/pages/BreastfeedingGuide"));
const TeethingCalculator = lazy(() => import("@/pages/TeethingCalculator"));
const CryingMoodTracker = lazy(() => import("@/pages/CryingMoodTracker"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (replaced cacheTime)
    },
  },
});

const PageLoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
  </div>
);

const OptimizedApp = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <div className="min-h-screen flex w-full flex-col">
            <AnimatedHeader />
            <div className="pt-16">
              <Suspense fallback={<PageLoadingFallback />}>
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
              </Suspense>
            </div>
            <PwaStatusIndicator />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default OptimizedApp;