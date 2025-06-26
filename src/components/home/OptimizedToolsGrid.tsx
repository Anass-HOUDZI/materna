
import React, { useMemo } from "react";
import { Activity, BarChart3, TrendingUp, Search } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import FavoriteButton from "@/components/home/FavoriteButton";
import OptimizedCard from "@/components/ui/OptimizedCard";
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
    <div className="grid gap-6 mobile-s:gap-8 sm:gap-10 lg:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl px-4 mobile-s:px-6 sm:px-8">
      {sortedTools.map(({ label, link, icon, gradient }) => (
        <OptimizedCard
          key={link}
          className="group cursor-pointer transform-gpu will-change-transform"
          variant="elevated"
          size="md"
          onClick={() => window.location.href = link}
        >
          <FlexibleLayout direction="column" gap="lg" align="center" className="relative min-h-[200px]">
            <FavoriteButton
              isActive={isFavorite(link)}
              onClick={() => toggleFavorite(link)}
            />
            
            {/* Gradient background */}
            <div className={`absolute top-0 left-0 w-full h-16 rounded-t-2xl opacity-60 bg-gradient-to-r ${gradient}`} />
            
            {/* Icon container */}
            <div className="relative z-10 flex items-center justify-center w-20 h-20 mobile-s:w-24 mobile-s:h-24 
                            rounded-2xl bg-gradient-to-br from-white/95 via-white/90 to-gray-50/95 
                            shadow-lg border border-white/30 ring-1 ring-gray-100/50
                            group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 ease-out">
              <div className="transform group-hover:scale-110 transition-transform duration-300 ease-out">
                {icon}
              </div>
            </div>
            
            {/* Text */}
            <Typography
              variant="h4"
              className="relative z-10 text-center leading-tight tracking-tight
                         group-hover:text-blue-700 transition-colors duration-300 ease-out
                         max-w-full break-words hyphens-auto"
            >
              {label}
            </Typography>
          </FlexibleLayout>
        </OptimizedCard>
      ))}
    </div>
  );
});

OptimizedToolsGrid.displayName = "OptimizedToolsGrid";

export default OptimizedToolsGrid;
