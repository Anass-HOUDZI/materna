
import React from "react";
import HeroQuickCard from "./HeroQuickCard";
import StatsCounter from "./StatsCounter";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  className?: string;
}

const HeroSection = React.memo<HeroSectionProps>(({ className }) => {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40 dark:opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20" />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary)/0.1) 0%, transparent 25%), 
                           radial-gradient(circle at 75% 75%, hsl(var(--accent)/0.1) 0%, transparent 25%)`
        }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 lg:py-32">
        {/* Hero Content */}
        <div className="text-center max-w-5xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 backdrop-blur-xl">
            <span className="text-sm font-semibold bg-clip-text text-transparent" style={{ background: 'linear-gradient(to right, #f953c6, #b91d73)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
              Suite complète gratuite et professionnelle
            </span>
          </div>

          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
              <span className="bg-clip-text text-transparent" style={{ background: 'linear-gradient(to right, #f953c6, #b91d73)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
                Materna
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium">
              15 outils santé, grossesse, bébé, sécurité et parentalité 
               <span className="font-bold bg-clip-text text-transparent" style={{ background: 'linear-gradient(to right, #f953c6, #b91d73)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
                 &nbsp;100% offline, gratuits, privacy-first
               </span>
            </p>

            {/* New Description Paragraph */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mt-6">
              Votre grossesse est un moment unique. Elle mérite mieux qu'une app 
              qui vous espionne. <strong>On vous accompagne sans vous juger, 
              sans vous traquer.</strong> Des outils validés par des professionnels 
              de santé pour vivre sereinement chaque étape.
            </p>
          </div>

          {/* Features - Correction des routes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <HeroQuickCard title="Grossesse" description="Suivi de grossesse, calcul de date d'accouchement, etc." icon="calendar" href="/categorie/grossesse" />
            <HeroQuickCard title="Enfant" description="Suivi de croissance, développement moteur, etc." icon="baby" href="/categorie/enfant" />
            <HeroQuickCard title="Santé" description="Conseils santé, allaitement, nutrition, etc." icon="heart" href="/categorie/sante" />
            <HeroQuickCard title="Outils" description="Tous nos outils en un coup d'œil" icon="shield" href="/#tools-section" />
          </div>
        </div>

      </div>
    </div>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
