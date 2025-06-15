
import React, { useState, useEffect } from "react";
import AppSidebar from "@/components/app-sidebar";
import { Input } from "@/components/ui/input";
import { Search, Activity, BarChart3, TrendingUp, Star, HelpCircle } from "lucide-react";
import Footer from "@/components/ui/Footer";
import FamilyIllustration from "@/components/home/FamilyIllustration";
import FavoriteButton from "@/components/home/FavoriteButton";
import { useFavorites } from "@/hooks/useFavorites";
import UserTourModal from "@/components/home/UserTourModal";
import UserFeedbackModal from "@/components/home/UserFeedbackModal";
import ToolsGrid from "@/components/home/ToolsGrid";
import { AccordionSimple, AccordionSimpleItem } from "@/components/ui/accordion-simple";
import ResponsiveContainer from "@/components/ui/ResponsiveContainer";
import TouchOptimized from "@/components/ui/TouchOptimized";

const WELCOME = [
  "Bienvenue sur MomTech Suite 👶",
  "50 outils santé, grossesse, bébé, sécurité et parentalité 100% offline, gratuits, privacy-first.",
];

const Index = () => {
  const [search, setSearch] = useState("");
  const [showTour, setShowTour] = useState(
    () => window.localStorage.getItem("momtech-user-tour-done") !== "yes"
  );
  const [showFeedback, setShowFeedback] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  function openTour() {
    setShowTour(true);
    window.localStorage.setItem("momtech-user-tour-done", "no");
  }
  function closeTour() {
    setShowTour(false);
    window.localStorage.setItem("momtech-user-tour-done", "yes");
  }

  useEffect(() => {
    // Écoute online/offline
    const updateNetwork = () => setIsOnline(navigator.onLine);
    window.addEventListener("online", updateNetwork);
    window.addEventListener("offline", updateNetwork);

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", (event) => {
        if (event.data && event.data.type === "UPDATE_AVAILABLE") {
          setUpdateAvailable(true);
        }
      });
    }

    return () => {
      window.removeEventListener("online", updateNetwork);
      window.removeEventListener("offline", updateNetwork);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-pink-50 via-white to-blue-50 pt-safe-top pb-safe-bottom">
      <UserTourModal open={showTour} onClose={closeTour} />
      <UserFeedbackModal open={showFeedback} onClose={() => setShowFeedback(false)} />

      {/* BOUTON FEEDBACK flottant - Optimisé mobile */}
      <TouchOptimized variant="button" size="md">
        <button
          onClick={() => setShowFeedback(true)}
          className="fixed z-40 bottom-5 left-3 mobile-s:left-4 sm:left-5 bg-white/95 backdrop-blur-sm rounded-full shadow-lg border border-yellow-200 transition-all duration-300 hover:bg-yellow-50 hover:scale-105 active:scale-95 px-3 mobile-s:px-4 py-2 mobile-s:py-2.5 flex items-center gap-1 mobile-s:gap-2 text-yellow-600 font-semibold text-sm mobile-s:text-base touch:min-h-[44px]"
          style={{ boxShadow: "0 2px 12px 0 #fef08a90" }}
          aria-label="Donner un avis"
          title="Donner un avis sur MomTech Suite"
        >
          <Star className="mobile-s:mr-1" size={18} />
          <span className="hidden mobile-s:inline">Avis</span>
        </button>
      </TouchOptimized>

      {/* Bouton d'aide/visite guidée flottant - Optimisé mobile */}
      <TouchOptimized variant="button" size="md">
        <button
          onClick={openTour}
          className="fixed z-40 bottom-5 right-3 mobile-s:right-4 sm:right-5 bg-white/95 backdrop-blur-sm rounded-full shadow-lg border border-blue-200 transition-all duration-300 hover:bg-blue-50 hover:scale-105 active:scale-95 px-3 mobile-s:px-4 py-2 mobile-s:py-2.5 flex items-center gap-1 mobile-s:gap-2 text-blue-600 font-semibold text-sm mobile-s:text-base touch:min-h-[44px]"
          style={{ boxShadow: "0 2px 12px 0 #dbeafe90" }}
          aria-label="Guide utilisateur"
        >
          <HelpCircle className="mobile-s:mr-1" size={18} />
          <span className="hidden mobile-s:inline">Aide</span>
        </button>
      </TouchOptimized>

      <main className="flex-1 flex flex-col items-center px-0 pt-6 mobile-s:pt-8 sm:pt-10 pb-20 mobile-s:pb-16 sm:pb-10">
        {/* Message d'état réseau - Responsive */}
        <ResponsiveContainer maxWidth="full" padding="sm">
          <div className="w-full flex flex-col mobile-s:flex-row items-center justify-center mb-3 mobile-s:mb-2 gap-2 mobile-s:gap-0">
            {!isOnline ? (
              <div className="flex items-center gap-2 px-3 mobile-s:px-4 py-2 rounded-lg bg-yellow-50 border border-yellow-300 text-yellow-700 font-semibold shadow animate-pulse text-sm mobile-s:text-base text-center">
                Mode hors ligne : outils offline disponibles
              </div>
            ) : (
              <div className="flex items-center gap-2 px-3 mobile-s:px-4 py-2 rounded-lg bg-green-50 border border-green-300 text-green-800 font-semibold shadow text-sm mobile-s:text-base text-center">
                En ligne : toutes fonctionnalités disponibles
              </div>
            )}
            {updateAvailable && (
              <TouchOptimized variant="button">
                <button
                  className="ml-0 mobile-s:ml-4 mt-2 mobile-s:mt-0 px-3 py-1 rounded-md bg-blue-600 text-white font-semibold shadow hover:bg-blue-800 transition text-sm mobile-s:text-base touch:min-h-[44px]"
                  onClick={() => window.location.reload()}
                >
                  Mettre à jour
                </button>
              </TouchOptimized>
            )}
          </div>
        </ResponsiveContainer>

        <ResponsiveContainer maxWidth="2xl" padding="sm">
          <FamilyIllustration className="animate-fade-in w-full max-w-xs mobile-s:max-w-sm sm:max-w-md mx-auto" />
          
          <div className="w-full flex flex-col gap-3 mobile-s:gap-4 items-center mt-4 mobile-s:mt-6 sm:mt-0 mb-8 mobile-s:mb-10 sm:mb-12">
            <div className="flex flex-col items-center gap-2 w-full">
              <h1 className="font-playfair text-2xl mobile-s:text-3xl mobile-m:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-500 to-fuchsia-500 bg-clip-text text-transparent drop-shadow leading-tight animate-fade-in text-center tracking-tight mb-0 px-2">
                {WELCOME[0]}
              </h1>
              <p className="text-base mobile-s:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium animate-fade-in text-center px-3 mobile-s:px-4">
                {WELCOME[1]}
              </p>
            </div>
          </div>
        </ResponsiveContainer>

        <ToolsGrid />

        {/* Bloc FAQ bas de page - Responsive */}
        <ResponsiveContainer maxWidth="xl" padding="sm">
          <div className="w-full flex justify-center mt-10 mobile-s:mt-12 sm:mt-14 mb-1 animate-fade-in">
            <div className="rounded-2xl bg-gradient-to-br from-blue-50/40 to-blue-100/30 border border-blue-100 shadow-sm overflow-hidden w-full mx-auto"
              style={{
                boxShadow: "0 1.5px 15px 0 #dbeafe1A",
                background: "linear-gradient(135deg, #f0f7ff 60%, #e2eaff 100%)"
              }}
            >
              <AccordionSimple>
                <AccordionSimpleItem title="Comment fonctionne la suite ?">
                  50 outils entièrement offline, gratuits, permettant de gérer santé, grossesse et parentalité.
                </AccordionSimpleItem>
                <AccordionSimpleItem title="Mes données sont-elles privées ?">
                  Oui, tout est traité en local, aucune donnée transmise ni stockée à l'extérieur.
                </AccordionSimpleItem>
                <AccordionSimpleItem title="Comment ajouter aux favoris ?">
                  Cliquez sur l'étoile jaune en haut à droite de chaque outil pour le retrouver en priorité.
                </AccordionSimpleItem>
              </AccordionSimple>
            </div>
          </div>
        </ResponsiveContainer>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
