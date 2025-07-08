
import React from "react";
import { Layout } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

const HERO_CONTENT = {
  title: "MomTech Suite",
  subtitle: "Suite complète et gratuite",
  description: "50 outils santé, grossesse, bébé, sécurité et parentalité 100% offline, gratuits, privacy-first.",
  features: [
    {
      icon: <Icon name="health" size={20} className="text-blue-600" />,
      text: "Outils médicaux validés scientifiquement"
    },
    {
      icon: <Icon name="security" size={20} className="text-green-600" />,
      text: "100% offline et privacy-first"
    },
    {
      icon: <Icon name="child" size={20} className="text-purple-600" />,
      text: "Interface optimisée mobile"
    },
    {
      icon: <Icon name="pregnancy" size={20} className="text-orange-600" />,
      text: "Données chiffrées localement"
    }
  ]
};

const HeroSection = React.memo(() => (
  <div className="text-center py-12 mobile-s:py-16 sm:py-20 lg:py-24">
    <Layout direction="column" gap="2xl" align="center" className="animate-fade-in">
      <div className="inline-flex items-center gap-2 px-4 mobile-s:px-6 py-2 mobile-s:py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 
                      text-blue-700 rounded-full text-xs mobile-s:text-sm font-semibold border border-blue-200/50 backdrop-blur-sm">
        <span className="text-yellow-500" aria-hidden="true">⭐</span>
        <span>Suite complète gratuite et professionnelle</span>
      </div>
      
      <h1 className="text-3xl mobile-s:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight tracking-tight px-4">
        {HERO_CONTENT.title}
        <span className="block text-2xl mobile-s:text-3xl sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent font-bold mt-2">
          {HERO_CONTENT.subtitle}
        </span>
      </h1>
      
      <p className="text-lg mobile-s:text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium px-4">
        {HERO_CONTENT.description}
      </p>
      
      <Layout direction="row" gap="md" justify="center" wrap className="mt-6 mobile-s:mt-8 px-4">
        <Button 
          size="lg"
          onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
          icon={<span aria-hidden="true">🔍</span>}
          className="gap-3 text-base mobile-s:text-lg px-6 mobile-s:px-8"
        >
          Découvrir les outils
        </Button>
        <div className="inline-flex items-center gap-3 px-6 mobile-s:px-8 py-3 mobile-s:py-4 bg-card/80 backdrop-blur-sm border-2 border-border 
                       text-foreground rounded-2xl font-semibold text-base mobile-s:text-lg shadow-md">
          <span className="text-green-500" aria-hidden="true">⚡</span>
          <span>100% Gratuit</span>
        </div>
      </Layout>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mobile-s:gap-4 mt-8 mobile-s:mt-12 max-w-3xl mx-auto px-4">
        {HERO_CONTENT.features.map((feature, index) => (
          <div 
            key={index}
            className="flex items-center gap-3 p-3 mobile-s:p-4 bg-card/60 backdrop-blur-sm rounded-xl border border-border/40 
                     shadow-sm transition-all duration-300"
          >
            <div className="flex-shrink-0">
              {feature.icon}
            </div>
            <span className="text-foreground font-medium text-sm mobile-s:text-base">{feature.text}</span>
          </div>
        ))}
      </div>
    </Layout>
  </div>
));

HeroSection.displayName = "HeroSection";

export default HeroSection;
