
import React, { useState } from "react";
import { Search, Sparkles, Heart, Shield, Zap } from "lucide-react";
import ModernCard from "./ModernCard";
import StatsCounter from "./StatsCounter";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  onSearch?: (query: string) => void;
  className?: string;
}

const HeroSection = React.memo<HeroSectionProps>(({
  onSearch,
  className
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

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
            <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Suite complète gratuite et professionnelle
            </span>
          </div>

          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                MomTech
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Suite
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium">
              50 outils santé, grossesse, bébé, sécurité et parentalité 
              <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent font-bold">
                100% offline, gratuits, privacy-first
              </span>
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="relative">
              <ModernCard variant="glass" className="p-2 hover3d={false}">
                <div className="flex items-center gap-4">
                  <Search className="w-6 h-6 text-muted-foreground ml-4" />
                  <input
                    type="text"
                    placeholder="Rechercher un outil (ex: calculateur terme, tracker contractions...)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-lg placeholder:text-muted-foreground/70 py-4"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:scale-105 transition-transform duration-200"
                  >
                    Rechercher
                  </button>
                </div>
              </ModernCard>
            </form>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Shield, text: "Outils médicaux validés", color: "text-blue-600" },
              { icon: Zap, text: "100% offline", color: "text-green-600" },
              { icon: Heart, text: "Privacy-first", color: "text-red-600" },
              { icon: Sparkles, text: "Interface moderne", color: "text-purple-600" }
            ].map((feature, index) => (
              <ModernCard key={index} variant="glass" className="p-4 text-center">
                <feature.icon className={cn("w-8 h-8 mx-auto mb-2", feature.color)} />
                <p className="text-sm font-medium text-foreground/80">{feature.text}</p>
              </ModernCard>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 max-w-6xl mx-auto">
          <ModernCard variant="premium" className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <StatsCounter
                value={50}
                label="Outils Disponibles"
                suffix="+"
                gradient="from-blue-600 to-indigo-600"
              />
              <StatsCounter
                value={100}
                label="Privacy Protection"
                suffix="%"
                gradient="from-green-600 to-teal-600"
              />
              <StatsCounter
                value={0}
                label="Coût d'Utilisation"
                prefix="€"
                gradient="from-purple-600 to-pink-600"
              />
            </div>
          </ModernCard>
        </div>
      </div>
    </div>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
