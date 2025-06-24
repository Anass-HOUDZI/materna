
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
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-pink-50/70 via-white to-blue-50/70 pt-safe-top pb-safe-bottom">
      <main className="flex-1 flex flex-col items-center px-0 pt-8 mobile-s:pt-10 sm:pt-12 pb-24 mobile-s:pb-20 sm:pb-16">
        <ResponsiveContainer maxWidth="2xl" padding="sm">
          <FamilyIllustration className="animate-fade-in w-full max-w-xs mobile-s:max-w-sm sm:max-w-md mx-auto" />
          
          <div className="w-full flex flex-col gap-4 mobile-s:gap-6 items-center mt-6 mobile-s:mt-8 sm:mt-4 mb-12 mobile-s:mb-14 sm:mb-16">
            <div className="flex flex-col items-center gap-3 w-full">
              <h1 className="font-playfair text-3xl mobile-s:text-4xl mobile-m:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-fuchsia-600 bg-clip-text text-transparent drop-shadow-sm leading-tight animate-fade-in text-center tracking-tight mb-0 px-4">
                {WELCOME[0]}
              </h1>
              <p className="text-lg mobile-s:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium animate-fade-in text-center px-6 mobile-s:px-8 leading-relaxed">
                {WELCOME[1]}
              </p>
            </div>
          </div>
        </ResponsiveContainer>

        <ToolsGrid />

        {/* Enhanced FAQ section */}
        <ResponsiveContainer maxWidth="xl" padding="sm">
          <div className="w-full flex justify-center mt-16 mobile-s:mt-18 sm:mt-20 mb-2 animate-fade-in">
            <div className="rounded-3xl bg-white/90 backdrop-blur-md border border-white/30 shadow-xl ring-1 ring-gray-200/50 overflow-hidden w-full mx-auto
                            transition-all duration-300 ease-out hover:shadow-2xl hover:ring-blue-300/50"
              style={{
                background: "linear-gradient(135deg, rgba(240, 247, 255, 0.9) 60%, rgba(226, 234, 255, 0.9) 100%)"
              }}
            >
              <AccordionSimple>
                <AccordionSimpleItem title="Comment fonctionne la suite ?">
                  <p className="text-base mobile-s:text-lg text-gray-700 leading-relaxed">
                    50 outils entièrement offline, gratuits, permettant de gérer santé, grossesse et parentalité.
                  </p>
                </AccordionSimpleItem>
                <AccordionSimpleItem title="Mes données sont-elles privées ?">
                  <p className="text-base mobile-s:text-lg text-gray-700 leading-relaxed">
                    Oui, tout est traité en local, aucune donnée transmise ni stockée à l'extérieur.
                  </p>
                </AccordionSimpleItem>
                <AccordionSimpleItem title="Comment ajouter aux favoris ?">
                  <p className="text-base mobile-s:text-lg text-gray-700 leading-relaxed">
                    Cliquez sur l'étoile jaune en haut à droite de chaque outil pour le retrouver en priorité.
                  </p>
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
