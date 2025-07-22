
import React from "react";
import FavoriteButton from "@/components/home/FavoriteButton";
import { useFavorites } from "@/hooks/useFavorites";
import {
  Activity,
  BarChart3,
  TrendingUp,
  Search,
} from "lucide-react";

const ICONS = [
  <Activity className="text-blue-600" size={42} />,      // 0
  <BarChart3 className="text-pink-600" size={42} />,     // 1
  <TrendingUp className="text-green-600" size={42} />,   // 2
  <Search className="text-violet-600" size={42} />,      // 3
];

const TOOLS = [
  {
    label: "Calculateur de date d'accouchement",
    link: "/grossesse/calculateur-terme",
    icon: ICONS[0],
    color: "bg-gradient-to-br from-blue-50/80 to-blue-100/80",
  },
  {
    label: "Tracker Contractions",
    link: "/grossesse/tracker-contractions", 
    icon: ICONS[1],
    color: "bg-gradient-to-br from-pink-50/80 to-pink-100/80",
  },
  {
    label: "Calculateur Prise de Poids",
    link: "/grossesse/calculateur-poids",
    icon: ICONS[2],
    color: "bg-gradient-to-br from-green-50/80 to-green-100/80",
  },
  {
    label: "Calendrier Grossesse Semaine/Semaine",
    link: "/grossesse/calendrier-semaine",
    icon: ICONS[3],
    color: "bg-gradient-to-br from-violet-50/80 to-violet-100/80",
  },
  {
    label: "Tracker Mouvements Bébé",
    link: "/grossesse/tracker-mouvements-bebe",
    icon: ICONS[1],
    color: "bg-gradient-to-br from-rose-50/80 to-pink-100/80",
  },
  {
    label: "Journal Symptômes",
    link: "/grossesse/journal-symptomes",
    icon: ICONS[2],
    color: "bg-gradient-to-br from-yellow-50/80 to-orange-50/80",
  },
  {
    label: "Calculateur Sexe Bébé (fun)",
    link: "/grossesse/calculateur-sexe-bebe",
    icon: ICONS[3],
    color: "bg-gradient-to-br from-fuchsia-50/80 to-pink-100/80",
  },
  {
    label: "Simulateur Budget Bébé Année 1",
    link: "/grossesse/simulateur-budget-bebe",
    icon: ICONS[0],
    color: "bg-gradient-to-br from-sky-50/80 to-blue-100/80",
  },
  {
    label: "Calculateur Poussées Dentaires",
    link: "/grossesse/calculateur-dents",
    icon: ICONS[2],
    color: "bg-gradient-to-br from-emerald-50/80 to-green-100/80",
  },
  {
    label: "Courbes Croissance OMS",
    link: "/enfant/courbes-croissance",
    icon: ICONS[0],
    color: "bg-gradient-to-br from-blue-50/80 to-indigo-50/80",
  },
  {
    label: "Guide Diversification Alimentaire",
    link: "/enfant/guide-diversification",
    icon: ICONS[3],
    color: "bg-gradient-to-br from-lime-50/80 to-lime-100/80",
  },
  {
    label: "Tracker Développement Moteur 0-3 ans",
    link: "/enfant/developpement-moteur",
    icon: ICONS[1],
    color: "bg-gradient-to-br from-orange-50/80 to-yellow-50/80",
  },
  {
    label: "Calculateur Besoins Nutritionnels Enfant",
    link: "/enfant/besoins-nutritionnels",
    icon: ICONS[2],
    color: "bg-gradient-to-br from-teal-50/80 to-blue-50/80",
  },
  {
    label: "Tracker Pleurs & Humeur Bébé",
    link: "/enfant/tracker-pleurs-humeur",
    icon: ICONS[0],
    color: "bg-gradient-to-br from-purple-50/80 to-indigo-50/80",
  },
  {
    label: "Guide Allaitement Complet",
    link: "/sante/guide-allaitement",
    icon: ICONS[3],
    color: "bg-gradient-to-br from-pink-50/80 to-pink-100/80",
  },
];

interface ToolsGridProps {}

export default function ToolsGrid({}: ToolsGridProps) {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const filtered = TOOLS;
  const sorted = [
    ...filtered.filter(tool => favorites.includes(tool.link)),
    ...filtered.filter(tool => !favorites.includes(tool.link)),
  ];

  return (
    <div className="grid gap-8 mobile-s:gap-10 sm:gap-12 lg:gap-14 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl px-4 mobile-s:px-6 sm:px-8">
      {sorted.map(({ label, link, icon, color }) => (
        <a
          key={link}
          href={link}
          className="group relative rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-out 
                     bg-white/90 backdrop-blur-sm border border-white/20 ring-1 ring-gray-200/50 hover:ring-blue-300/50
                     flex flex-col items-center gap-6 p-8 mobile-s:p-10 sm:p-12 lg:p-14 
                     overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     touch-manipulation transform-gpu will-change-transform"
          style={{ minHeight: 220 }}
          aria-label={label}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              window.location.href = link;
            }
          }}
        >
          <FavoriteButton
            isActive={isFavorite(link)}
            onClick={() => toggleFavorite(link)}
          />
          
          {/* Gradient background with blur effect */}
          <div
            className={`absolute top-0 left-0 w-full h-20 rounded-t-3xl opacity-60 backdrop-blur-sm ${color}`}
          />
          
          {/* Enhanced icon container */}
          <div className="relative z-10 flex items-center justify-center w-20 h-20 mobile-s:w-24 mobile-s:h-24 
                          rounded-2xl bg-gradient-to-br from-white/95 via-white/90 to-gray-50/95 
                          shadow-lg border border-white/30 ring-1 ring-gray-100/50
                          group-hover:shadow-xl transition-all duration-300 ease-out
                          mt-6">
            <div className="transform transition-transform duration-300 ease-out">
              {icon}
            </div>
          </div>
          
          {/* Enhanced text */}
          <span className="relative z-10 text-lg mobile-s:text-xl sm:text-xl lg:text-2xl font-semibold 
                          text-gray-800 text-center leading-tight tracking-tight
                          group-hover:text-blue-700 transition-colors duration-300 ease-out
                          max-w-full break-words hyphens-auto">
            {label}
          </span>
          
          {/* Subtle hover glow effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/0 to-purple-400/0 
                          group-hover:from-blue-400/5 group-hover:to-purple-400/5 
                          transition-all duration-500 ease-out pointer-events-none" />
        </a>
      ))}
    </div>
  );
}
