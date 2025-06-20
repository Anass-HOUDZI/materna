
import React, { useState, useEffect } from "react";
import AppSidebar from "@/components/app-sidebar";
import { Input } from "@/components/ui/input";
import { Search, Activity, BarChart3, TrendingUp, Star, HelpCircle } from "lucide-react";
import Footer from "@/components/ui/Footer";
import FamilyIllustration from "@/components/home/FamilyIllustration";
import FavoriteButton from "@/components/home/FavoriteButton";
import { useFavorites } from "@/hooks/useFavorites";
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

  useEffect(() => {
    // Empty useEffect can be removed if not used for other purposes,
    // but we leave it in case other logic is added later.
    // The PWA status logic has been moved to a global component.
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-pink-50 via-white to-blue-50 pt-safe-top pb-safe-bottom">
      <main className="flex-1 flex flex-col items-center px-0 pt-6 mobile-s:pt-8 sm:pt-10 pb-20 mobile-s:pb-16 sm:pb-10">
        {/* L'indicateur de statut réseau a été déplacé dans un composant global */}

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
