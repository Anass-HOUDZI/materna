
import React from "react";
import { AccordionSimple, AccordionSimpleItem } from "@/components/ui/accordion-simple";
import Footer from "@/components/ui/Footer";
import FamilyIllustration from "@/components/home/FamilyIllustration";
import OptimizedToolsGrid from "@/components/home/OptimizedToolsGrid";
import PageContainer from "@/components/layout/PageContainer";
import FlexibleLayout from "@/components/ui/FlexibleLayout";
import Typography from "@/components/ui/Typography";
import OptimizedCard from "@/components/ui/OptimizedCard";

const WELCOME = [
  "Bienvenue sur MomTech Suite 👶",
  "50 outils santé, grossesse, bébé, sécurité et parentalité 100% offline, gratuits, privacy-first.",
];

const Index = React.memo(() => {
  return (
    <PageContainer background="gradient" className="pt-safe-top pb-safe-bottom">
      <FlexibleLayout direction="column" gap="xl" align="center">
        {/* Hero Section */}
        <FlexibleLayout direction="column" gap="lg" align="center" className="w-full max-w-4xl">
          <FamilyIllustration className="animate-fade-in w-full max-w-xs mobile-s:max-w-sm sm:max-w-md mx-auto" />
          
          <FlexibleLayout direction="column" gap="md" align="center" className="text-center">
            <Typography variant="h1" className="animate-fade-in px-4">
              {WELCOME[0]}
            </Typography>
            <Typography variant="lead" className="animate-fade-in max-w-3xl mx-auto px-6 mobile-s:px-8">
              {WELCOME[1]}
            </Typography>
          </FlexibleLayout>
        </FlexibleLayout>

        {/* Tools Grid */}
        <OptimizedToolsGrid />

        {/* FAQ Section */}
        <div className="w-full max-w-4xl mx-auto px-4 mobile-s:px-6 sm:px-8">
          <OptimizedCard 
            variant="glass" 
            size="lg"
            className="animate-fade-in"
            style={{
              background: "linear-gradient(135deg, rgba(240, 247, 255, 0.9) 60%, rgba(226, 234, 255, 0.9) 100%)"
            }}
          >
            <AccordionSimple>
              <AccordionSimpleItem title="Comment fonctionne la suite ?">
                <Typography variant="p">
                  50 outils entièrement offline, gratuits, permettant de gérer santé, grossesse et parentalité.
                </Typography>
              </AccordionSimpleItem>
              <AccordionSimpleItem title="Mes données sont-elles privées ?">
                <Typography variant="p">
                  Oui, tout est traité en local, aucune donnée transmise ni stockée à l'extérieur.
                </Typography>
              </AccordionSimpleItem>
              <AccordionSimpleItem title="Comment ajouter aux favoris ?">
                <Typography variant="p">
                  Cliquez sur l'étoile jaune en haut à droite de chaque outil pour le retrouver en priorité.
                </Typography>
              </AccordionSimpleItem>
            </AccordionSimple>
          </OptimizedCard>
        </div>
      </FlexibleLayout>
      
      <Footer />
    </PageContainer>
  );
});

Index.displayName = "Index";

export default Index;
