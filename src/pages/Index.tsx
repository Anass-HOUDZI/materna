import React, { useState } from "react";
import AppSidebar from "@/components/app-sidebar";
import { Input } from "@/components/ui/input";
import { Search, Calendar, Baby, LineChart, ClipboardList } from "lucide-react";
import Footer from "@/components/ui/Footer";
import FamilyIllustration from "@/components/home/FamilyIllustration";
import FavoriteButton from "@/components/home/FavoriteButton";
import { useFavorites } from "@/hooks/useFavorites";

// Ordre de popularité proposé : Date d'accouchement, Contractions, Prise de poids, Calendrier, Tracker mouvements bébé, etc.
const TOOLS = [
  {
    label: "Calculateur de date d'accouchement",
    link: "/grossesse/calculateur-terme",
    icon: <Calendar className="text-blue-500" size={38} />,
    color: "bg-gradient-to-br from-blue-50 to-blue-100",
  },
  {
    label: "Tracker Contractions",
    link: "/grossesse/tracker-contractions",
    icon: <LineChart className="text-pink-500" size={38} />,
    color: "bg-gradient-to-br from-pink-50 to-pink-100",
  },
  {
    label: "Calculateur Prise de Poids",
    link: "/grossesse/calculateur-poids",
    icon: <LineChart className="text-green-500" size={38} />,
    color: "bg-gradient-to-br from-green-50 to-green-100",
  },
  {
    label: "Calendrier Grossesse Semaine/Semaine",
    link: "/grossesse/calendrier-semaine",
    icon: <Calendar className="text-violet-500" size={38} />,
    color: "bg-gradient-to-br from-violet-50 to-violet-100",
  },
  {
    label: "Tracker Mouvements Bébé",
    link: "/grossesse/tracker-mouvements-bebe",
    icon: <Baby className="text-rose-400" size={34} />,
    color: "bg-gradient-to-br from-rose-50 to-pink-100",
  },
  {
    label: "Journal Symptômes",
    link: "/grossesse/journal-symptomes",
    icon: <ClipboardList className="text-yellow-400" size={34} />,
    color: "bg-gradient-to-br from-yellow-50 to-orange-50",
  },
  {
    label: "Calculateur Sexe Bébé (fun)",
    link: "/grossesse/calculateur-sexe-bebe",
    icon: <Search className="text-fuchsia-500" size={34} />,
    color: "bg-gradient-to-br from-fuchsia-50 to-pink-100",
  },
  {
    label: "Simulateur Budget Bébé Année 1",
    link: "/grossesse/simulateur-budget-bebe",
    icon: <LineChart className="text-sky-500" size={34} />,
    color: "bg-gradient-to-br from-sky-50 to-blue-100",
  },
  {
    label: "Calculateur Poussées Dentaires",
    link: "/grossesse/calculateur-dents",
    icon: <LineChart className="text-emerald-400" size={34} />,
    color: "bg-gradient-to-br from-emerald-50 to-green-100",
  },
  {
    label: "Courbes Croissance OMS",
    link: "/enfant/courbes-croissance",
    icon: <LineChart className="text-blue-500" size={34} />,
    color: "bg-gradient-to-br from-blue-50 to-indigo-50",
  },
  {
    label: "Guide Diversification Alimentaire",
    link: "/enfant/guide-diversification",
    icon: <ClipboardList className="text-lime-500" size={34} />,
    color: "bg-gradient-to-br from-lime-50 to-lime-100",
  },
  {
    label: "Tracker Développement Moteur 0-3 ans",
    link: "/enfant/developpement-moteur",
    icon: <LineChart className="text-orange-400" size={34} />,
    color: "bg-gradient-to-br from-orange-50 to-yellow-50",
  },
  {
    label: "Calculateur Besoins Nutritionnels Enfant",
    link: "/enfant/besoins-nutritionnels",
    icon: <LineChart className="text-teal-500" size={34} />,
    color: "bg-gradient-to-br from-teal-50 to-blue-50",
  },
  {
    label: "Tracker Pleurs & Humeur Bébé",
    link: "/enfant/tracker-pleurs-humeur",
    icon: <LineChart className="text-purple-500" size={34} />,
    color: "bg-gradient-to-br from-purple-50 to-indigo-50",
  },
  {
    label: "Guide Allaitement Complet",
    link: "/sante/guide-allaitement",
    icon: <ClipboardList className="text-pink-400" size={34} />,
    color: "bg-gradient-to-br from-pink-50 to-pink-100",
  },
];

const WELCOME = [
  "Bienvenue sur MomTech Suite 👶",
  "50 outils santé, grossesse, bébé, sécurité et parentalité 100% offline, gratuits, privacy-first.",
];

const Index = () => {
  const [search, setSearch] = useState("");
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const filtered = TOOLS; // recherche désactivée pour l’instant

  // Trie : favoris d’abord, puis autres
  const sorted = [
    ...filtered.filter(tool => favorites.includes(tool.link)),
    ...filtered.filter(tool => !favorites.includes(tool.link)),
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-pink-50 via-white to-blue-50">
      <main className="flex-1 flex flex-col items-center px-3 pt-10 pb-10">
        <FamilyIllustration />
        <div className="w-full max-w-2xl mx-auto flex flex-col gap-4 items-center mt-0 mb-12">
          <div className="flex flex-col items-center gap-2 w-full">
            <h1 className="font-playfair text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-500 to-fuchsia-500 bg-clip-text text-transparent drop-shadow leading-tight animate-fade-in text-center tracking-tight mb-0">
              {WELCOME[0]}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium animate-fade-in text-center">
              {WELCOME[1]}
            </p>
          </div>
        </div>
        <div className="grid gap-8 md:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl">
          {sorted.map(({ label, link, icon, color }) => (
            <a
              key={link}
              href={link}
              className="group rounded-3xl shadow-lg border border-blue-100 bg-white/75 backdrop-blur-xl hover:shadow-2xl transition-all hover:-translate-y-0.5 hover:scale-[1.03] px-7 py-7 flex flex-col items-center gap-4 relative overflow-hidden story-link ring-1 ring-blue-50 hover:ring-blue-200"
              style={{ minHeight: 170 }}
              aria-label={label}
            >
              {/* bouton Favori */}
              <FavoriteButton
                isActive={isFavorite(link)}
                onClick={() => toggleFavorite(link)}
              />
              {/* En-tête coloré pastel */}
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
      </main>
      <Footer />
    </div>
  );
};

export default Index;
