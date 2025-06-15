
import React, { useState } from "react";
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

// Ligne supprimée :
// import { Star, HelpCircle } from "lucide-react";

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

  function openTour() {
    setShowTour(true);
    window.localStorage.setItem("momtech-user-tour-done", "no");
  }
  function closeTour() {
    setShowTour(false);
    window.localStorage.setItem("momtech-user-tour-done", "yes");
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-pink-50 via-white to-blue-50">
      <UserTourModal open={showTour} onClose={closeTour} />
      <UserFeedbackModal open={showFeedback} onClose={() => setShowFeedback(false)} />

      {/* BOUTON FEEDBACK flottant */}
      <button
        onClick={() => setShowFeedback(true)}
        className="fixed z-40 bottom-5 left-5 bg-white/90 rounded-full shadow-lg border border-yellow-200 transition hover:bg-yellow-50 hover:scale-105 px-4 py-2 flex items-center gap-2 text-yellow-600 font-semibold"
        style={{ boxShadow: "0 2px 12px 0 #fef08a90" }}
        aria-label="Donner un avis"
        title="Donner un avis sur MomTech Suite"
      >
        <Star className="mr-1" size={22} />
        Avis
      </button>

      {/* Bouton d’aide/visite guidée flottant en bas à droite */}
      <button
        onClick={openTour}
        className="fixed z-40 bottom-5 right-5 bg-white/90 rounded-full shadow-lg border border-blue-200 transition hover:bg-blue-50 hover:scale-105 px-4 py-2 flex items-center gap-2 text-blue-600 font-semibold"
        style={{ boxShadow: "0 2px 12px 0 #dbeafe90" }}
        aria-label="Guide utilisateur"
      >
        <HelpCircle className="mr-1" size={22} />
        Aide
      </button>

      <main className="flex-1 flex flex-col items-center px-3 pt-10 pb-10">
        <FamilyIllustration className="animate-fade-in" />
        <div className="w-full max-w-2xl mx-auto flex flex-col gap-4 items-center mt-0 mb-12">
          <div className="flex flex-col items-center gap-2 w-full">
            <h1 className="font-playfair text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-500 to-fuchsia-500 bg-clip-text text-transparent drop-shadow leading-tight animate-fade-in text-center tracking-tight mb-0">
              {WELCOME[0]}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium animate-fade-in text-center">
              {WELCOME[1]}
            </p>
          </div>
        </div>

        <ToolsGrid />

        {/* Bloc FAQ bas de page */}
        <div className="w-full flex justify-center mt-14 mb-1 animate-fade-in">
          <div className="rounded-2xl bg-gradient-to-br from-blue-50/40 to-blue-100/30 border border-blue-100 shadow-sm overflow-hidden max-w-xl w-full mx-auto"
            style={{
              boxShadow: "0 1.5px 15px 0 #dbeafe1A",
              background: "linear-gradient(135deg, #f0f7ff 60%, #e2eaff 100%)"
            }}
          >
            <AccordionSimple>
              <AccordionSimpleItem title="Comment fonctionne la suite ?">
                50 outils entièrement offline, gratuits, permettant de gérer santé, grossesse et parentalité.
              </AccordionSimpleItem>
              <AccordionSimpleItem title="Mes données sont-elles privées ?">
                Oui, tout est traité en local, aucune donnée transmise ni stockée à l’extérieur.
              </AccordionSimpleItem>
              <AccordionSimpleItem title="Comment ajouter aux favoris ?">
                Cliquez sur l’étoile jaune en haut à droite de chaque outil pour le retrouver en priorité.
              </AccordionSimpleItem>
            </AccordionSimple>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
