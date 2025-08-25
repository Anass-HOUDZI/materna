
import React, { useMemo } from "react";
import HeroQuickCard from "./HeroQuickCard";
import StatsCounter from "./StatsCounter";
import { cn } from "@/lib/utils";
import { GRADIENT_STYLES } from "@/utils/performance";

interface HeroSectionProps {
  className?: string;
}

const HeroSection = React.memo<HeroSectionProps>(({ className }) => {
  // Memoize gradient styles
  const gradientClass = useMemo(() => "bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent", []);
  
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

      <div className="relative z-10 responsive-container py-12 xs:py-16 sm:py-20 md:py-24 lg:py-32">
        {/* Hero Content */}
        <div className="text-center max-w-5xl mx-auto space-y-6 xs:space-y-8 sm:space-y-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 xs:px-6 xs:py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 backdrop-blur-xl">
            <span className="text-xs xs:text-sm font-semibold bg-clip-text text-transparent" style={{ background: 'linear-gradient(to right, #f953c6, #b91d73)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
              Suite complète gratuite et professionnelle
            </span>
          </div>

          {/* Main Title */}
          <div className="space-y-3 xs:space-y-4 sm:space-y-6">
            <h1 className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-tight tracking-tight">
              <span className="bg-clip-text text-transparent" style={{ background: 'linear-gradient(to right, #f953c6, #b91d73)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
                Materna
              </span>
            </h1>
            
            <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium px-4 xs:px-0">
              15 outils santé, grossesse, bébé, sécurité et parentalité 
               <span className="font-bold bg-clip-text text-transparent block xs:inline" style={{ background: 'linear-gradient(to right, #f953c6, #b91d73)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
                 &nbsp;100% offline, gratuits, privacy-first
               </span>
            </p>

            {/* New Description Paragraph */}
            <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mt-4 xs:mt-6 px-4 xs:px-0">
              Votre grossesse est un moment unique. Elle mérite mieux qu'une app 
              qui vous espionne. <strong>On vous accompagne sans vous juger, 
              sans vous traquer.</strong> Des outils validés par des professionnels 
              de santé pour vivre sereinement chaque étape.
            </p>
          </div>

          {/* Features - Mobile-first grid */}
          <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 xs:gap-4 sm:gap-6 max-w-5xl mx-auto mt-8 xs:mt-12 px-2 xs:px-0">
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
          </div>
        </div>
      </div>
    </div>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
