import React, { useMemo } from "react";
import { Activity, BarChart3, TrendingUp, Search } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import FavoriteButton from "@/components/home/FavoriteButton";
import { Card } from "@/components/ui/Card";
import FlexibleLayout from "@/components/ui/FlexibleLayout";
import Typography from "@/components/ui/Typography";

const ICONS = [
  <Activity className="text-blue-600" size={42} />,
  <BarChart3 className="text-pink-600" size={42} />,
  <TrendingUp className="text-green-600" size={42} />,
  <Search className="text-violet-600" size={42} />,
];

const TOOLS = [
  {
    label: "Calculateur de date d'accouchement",
    link: "/grossesse/calculateur-terme",
    icon: ICONS[0],
    gradient: "from-blue-50/80 to-blue-100/80",
  },
  {
    label: "Tracker Contractions",
    link: "/grossesse/tracker-contractions", 
    icon: ICONS[1],
    gradient: "from-pink-50/80 to-pink-100/80",
  },
  {
    label: "Calculateur Prise de Poids",
    link: "/grossesse/calculateur-poids",
    icon: ICONS[2],
    gradient: "from-green-50/80 to-green-100/80",
  },
  {
    label: "Calendrier Grossesse Semaine/Semaine",
    link: "/grossesse/calendrier-semaine",
    icon: ICONS[3],
    gradient: "from-violet-50/80 to-violet-100/80",
  },
  {
    label: "Tracker Mouvements Bébé",
    link: "/grossesse/tracker-mouvements-bebe",
    icon: ICONS[1],
    gradient: "from-rose-50/80 to-pink-100/80",
  },
  {
    label: "Journal Symptômes",
    link: "/grossesse/journal-symptomes",
    icon: ICONS[2],
    gradient: "from-yellow-50/80 to-orange-50/80",
  },
  {
    label: "Calculateur Sexe Bébé (fun)",
    link: "/grossesse/calculateur-sexe-bebe",
    icon: ICONS[3],
    gradient: "from-fuchsia-50/80 to-pink-100/80",
  },
  {
    label: "Simulateur Budget Bébé Année 1",
    link: "/grossesse/simulateur-budget-bebe",
    icon: ICONS[0],
    gradient: "from-sky-50/80 to-blue-100/80",
  },
  {
    label: "Calculateur Poussées Dentaires",
    link: "/grossesse/calculateur-dents",
    icon: ICONS[2],
    gradient: "from-emerald-50/80 to-green-100/80",
  },
  {
    label: "Courbes Croissance OMS",
    link: "/enfant/courbes-croissance",
    icon: ICONS[0],
    gradient: "from-blue-50/80 to-indigo-50/80",
  },
  {
    label: "Guide Diversification Alimentaire",
    link: "/enfant/guide-diversification",
    icon: ICONS[3],
    gradient: "from-lime-50/80 to-lime-100/80",
  },
  {
    label: "Tracker Développement Moteur 0-3 ans",
    link: "/enfant/developpement-moteur",
    icon: ICONS[1],
    gradient: "from-orange-50/80 to-yellow-50/80",
  },
  {
    label: "Calculateur Besoins Nutritionnels Enfant",
    link: "/enfant/besoins-nutritionnels",
    icon: ICONS[2],
    gradient: "from-teal-50/80 to-blue-50/80",
  },
  {
    label: "Tracker Pleurs & Humeur Bébé",
    link: "/enfant/tracker-pleurs-humeur",
    icon: ICONS[0],
    gradient: "from-purple-50/80 to-indigo-50/80",
  },
  {
    label: "Guide Allaitement Complet",
    link: "/sante/guide-allaitement",
    icon: ICONS[3],
    gradient: "from-pink-50/80 to-pink-100/80",
  },
];

const OptimizedToolsGrid = React.memo(() => {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  
  const sortedTools = useMemo(() => [
    ...TOOLS.filter(tool => favorites.includes(tool.link)),
    ...TOOLS.filter(tool => !favorites.includes(tool.link)),
  ], [favorites]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 mobile-s:px-6 sm:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl mobile-s:text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
          Découvrez nos outils
        </h2>
        <p className="text-lg mobile-s:text-xl text-slate-600 max-w-3xl mx-auto">
          Chaque catégorie regroupe des outils spécialisés pour répondre à vos besoins spécifiques
        </p>
      </div>

      <div className="grid gap-6 mobile-s:gap-8 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {sortedTools.map(({ label, link, icon, gradient }) => (
          <div
            key={link}
            className="group cursor-pointer transform-gpu will-change-transform"
            onClick={() => window.location.href = link}
          >
            <Card
              variant="interactive"
              size="md"
              className="relative overflow-hidden transition-all duration-500 ease-out"
            >
              {/* Favorite Button */}
              <FavoriteButton
                isActive={isFavorite(link)}
                onClick={() => toggleFavorite(link)}
              />
              
              {/* Icon Container */}
              <div className="relative z-10 mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient.replace('50/80', '500').replace('100/80', '600')} 
                                flex items-center justify-center shadow-lg transition-transform duration-300`}>
                  <div className="text-white transform transition-transform duration-300">
                    {React.cloneElement(icon, { className: "text-white", size: 32 })}
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-lg mobile-s:text-xl font-semibold text-slate-900 mb-3 leading-tight">
                  {label}
                </h3>
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    ⭐ Excellent
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    Facile
                  </span>
                </div>
                <button className="w-full text-white py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-300 
                                 hover:shadow-lg transform" style={{ background: 'linear-gradient(to right, #f953c6, #b91d73)' }}>
                  Utiliser l'outil →
                </button>
              </div>
              
              {/* Background decoration */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} 
                              opacity-20 rounded-full transform translate-x-8 -translate-y-8 
                              transition-transform duration-500`} />
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
});

OptimizedToolsGrid.displayName = "OptimizedToolsGrid";

export default OptimizedToolsGrid;
