
import React from "react";
import HeroQuickCard from "./HeroQuickCard";
import ResponsiveText from "./ResponsiveText";
import ResponsiveGrid from "./ResponsiveGrid";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  className?: string;
}

const HeroSection = React.memo<HeroSectionProps>(({ className }) => {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30 dark:opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20" />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary)/0.1) 0%, transparent 25%), 
                           radial-gradient(circle at 75% 75%, hsl(var(--accent)/0.1) 0%, transparent 25%)`
        }} />
      </div>

      <div className="relative z-10 mobile-container py-12 xs:py-16 sm-mobile:py-20 lg-mobile:py-24 sm:py-28 lg:py-32">
        {/* Hero Content */}
        <div className="text-center max-w-5xl mx-auto space-y-6 xs:space-y-8 sm:space-y-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 xs:px-6 xs:py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 backdrop-blur-xl">
            <ResponsiveText 
              variant="small" 
              className="font-semibold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent"
              autoWrap={true}
            >
              Suite complète gratuite et professionnelle
            </ResponsiveText>
          </div>

          {/* Main Title avec auto-wrap */}
          <div className="space-y-3 xs:space-y-4 sm:space-y-6">
            <ResponsiveText variant="h1" className="auto-wrap-title">
              Materna
            </ResponsiveText>
            
            <ResponsiveText 
              variant="lead" 
              className="max-w-4xl mx-auto auto-wrap-text"
            >
              15 outils santé, grossesse, bébé, sécurité et parentalité{' '}
              <span className="font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent block xs:inline">
                100% offline, gratuits, privacy-first
              </span>
            </ResponsiveText>

            {/* Description avec auto-wrap */}
            <ResponsiveText 
              variant="p" 
              className="max-w-3xl mx-auto mt-4 xs:mt-6 auto-wrap-text"
            >
              Votre grossesse est un moment unique. Elle mérite mieux qu'une app 
              qui vous espionne. <strong>On vous accompagne sans vous juger, 
              sans vous traquer.</strong> Des outils validés par des professionnels 
              de santé pour vivre sereinement chaque étape.
            </ResponsiveText>
          </div>

          {/* Features avec grille responsive */}
          <div className="mt-8 xs:mt-12">
            <ResponsiveGrid 
              minItemWidth={200} 
              gap="md" 
              columns={{
                mobile: 2,
                tablet: 2,
                desktop: 4
              }}
              className="max-w-5xl mx-auto"
            >
              <HeroQuickCard 
                title="Grossesse" 
                description="Suivi et calculs médicaux" 
                icon="calendar" 
                href="/categorie/grossesse" 
              />
              <HeroQuickCard 
                title="Enfant" 
                description="Croissance et motricité" 
                icon="smile" 
                href="/categorie/enfant" 
              />
              <HeroQuickCard 
                title="Santé" 
                description="Nutrition et bien-être" 
                icon="heart" 
                href="/categorie/sante" 
              />
              <HeroQuickCard 
                title="Outils" 
                description="Accès rapide à tout" 
                icon="shield" 
                href="/#tools-section" 
              />
            </ResponsiveGrid>
          </div>
        </div>
      </div>
    </div>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
