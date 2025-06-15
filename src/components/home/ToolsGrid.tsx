
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
  <Activity className="text-blue-500" size={38} />,      // 0
  <BarChart3 className="text-pink-500" size={38} />,     // 1
  <TrendingUp className="text-green-500" size={38} />,   // 2
  <Search className="text-violet-500" size={38} />,      // 3
];

const TOOLS = [
  {
    label: "Calculateur de date d'accouchement",
    link: "/grossesse/calculateur-terme",
    icon: ICONS[0],
    color: "bg-gradient-to-br from-blue-50 to-blue-100",
  },
  {
    label: "Tracker Contractions",
    link: "/grossesse/tracker-contractions",
    icon: ICONS[1],
    color: "bg-gradient-to-br from-pink-50 to-pink-100",
  },
  {
    label: "Calculateur Prise de Poids",
    link: "/grossesse/calculateur-poids",
    icon: ICONS[2],
    color: "bg-gradient-to-br from-green-50 to-green-100",
  },
  {
    label: "Calendrier Grossesse Semaine/Semaine",
    link: "/grossesse/calendrier-semaine",
    icon: ICONS[3],
    color: "bg-gradient-to-br from-violet-50 to-violet-100",
  },
  {
    label: "Tracker Mouvements Bébé",
    link: "/grossesse/tracker-mouvements-bebe",
    icon: ICONS[1],
    color: "bg-gradient-to-br from-rose-50 to-pink-100",
  },
  {
    label: "Journal Symptômes",
    link: "/grossesse/journal-symptomes",
    icon: ICONS[2],
    color: "bg-gradient-to-br from-yellow-50 to-orange-50",
  },
  {
    label: "Calculateur Sexe Bébé (fun)",
    link: "/grossesse/calculateur-sexe-bebe",
    icon: ICONS[3],
    color: "bg-gradient-to-br from-fuchsia-50 to-pink-100",
  },
  {
    label: "Simulateur Budget Bébé Année 1",
    link: "/grossesse/simulateur-budget-bebe",
    icon: ICONS[0],
    color: "bg-gradient-to-br from-sky-50 to-blue-100",
  },
  {
    label: "Calculateur Poussées Dentaires",
    link: "/grossesse/calculateur-dents",
    icon: ICONS[2],
    color: "bg-gradient-to-br from-emerald-50 to-green-100",
  },
  {
    label: "Courbes Croissance OMS",
    link: "/enfant/courbes-croissance",
    icon: ICONS[0],
    color: "bg-gradient-to-br from-blue-50 to-indigo-50",
  },
  {
    label: "Guide Diversification Alimentaire",
    link: "/enfant/guide-diversification",
    icon: ICONS[3],
    color: "bg-gradient-to-br from-lime-50 to-lime-100",
  },
  {
    label: "Tracker Développement Moteur 0-3 ans",
    link: "/enfant/developpement-moteur",
    icon: ICONS[1],
    color: "bg-gradient-to-br from-orange-50 to-yellow-50",
  },
  {
    label: "Calculateur Besoins Nutritionnels Enfant",
    link: "/enfant/besoins-nutritionnels",
    icon: ICONS[2],
    color: "bg-gradient-to-br from-teal-50 to-blue-50",
  },
  {
    label: "Tracker Pleurs & Humeur Bébé",
    link: "/enfant/tracker-pleurs-humeur",
    icon: ICONS[0],
    color: "bg-gradient-to-br from-purple-50 to-indigo-50",
  },
  {
    label: "Guide Allaitement Complet",
    link: "/sante/guide-allaitement",
    icon: ICONS[3],
    color: "bg-gradient-to-br from-pink-50 to-pink-100",
  },
];

interface ToolsGridProps {}

export default function ToolsGrid({}: ToolsGridProps) {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  // recherche désactivée pour l’instant
  const filtered = TOOLS;
  const sorted = [
    ...filtered.filter(tool => favorites.includes(tool.link)),
    ...filtered.filter(tool => !favorites.includes(tool.link)),
  ];

  return (
    <div className="grid gap-8 md:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl">
      {sorted.map(({ label, link, icon, color }) => (
        <a
          key={link}
          href={link}
          className="group rounded-3xl shadow-lg border border-blue-100 bg-white/75 backdrop-blur-xl hover:shadow-2xl transition-all hover:-translate-y-0.5 hover:scale-[1.03] px-7 py-7 flex flex-col items-center gap-4 relative overflow-hidden story-link ring-1 ring-blue-50 hover:ring-blue-200"
          style={{ minHeight: 170 }}
          aria-label={label}
        >
          <FavoriteButton
            isActive={isFavorite(link)}
            onClick={() => toggleFavorite(link)}
          />
          <div
            className={`absolute top-0 left-0 w-full h-16 rounded-t-3xl z-0 blur-sm ${color} opacity-40`}
          />
          <div className="z-10 relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-white via-blue-50 to-pink-50 shadow border border-blue-100 mb-1 mt-3">
            {icon}
          </div>
          <span className="z-10 mt-1 text-base md:text-lg font-semibold text-blue-900 text-center drop-shadow-sm">
            {label}
          </span>
        </a>
      ))}
    </div>
  );
}
