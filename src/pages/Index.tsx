import React, { useState } from "react";
import AppSidebar from "@/components/app-sidebar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Footer from "@/components/ui/Footer";

const TOOLS = [
  { label: "Calculateur de date d'accouchement", link: "/grossesse/calculateur-terme", icon: <Search size={38} className="text-blue-600" /> },
  { label: "Tracker Contractions", link: "/grossesse/tracker-contractions", icon: <Search size={38} className="text-pink-500" /> },
  { label: "Calculateur Prise de Poids", link: "/grossesse/calculateur-poids", icon: <Search size={38} className="text-green-500" /> },
  { label: "Calendrier Grossesse Semaine/Semaine", link: "/grossesse/calendrier-semaine", icon: <Search size={38} className="text-violet-500" /> },
  { label: "Tracker Mouvements Bébé", link: "/grossesse/tracker-mouvements-bebe", icon: <Search size={38} className="text-rose-400" /> },
  { label: "Journal Symptômes", link: "/grossesse/journal-symptomes", icon: <Search size={38} className="text-yellow-400" /> },
  { label: "Calculateur Sexe Bébé (fun)", link: "/grossesse/calculateur-sexe-bebe", icon: <Search size={38} className="text-fuchsia-500" /> },
  { label: "Simulateur Budget Bébé Année 1", link: "/grossesse/simulateur-budget-bebe", icon: <Search size={38} className="text-sky-500" /> },
  { label: "Calculateur Poussées Dentaires", link: "/grossesse/calculateur-dents", icon: <Search size={38} className="text-emerald-400" /> },
  { label: "Courbes Croissance OMS", link: "/enfant/courbes-croissance", icon: <Search size={38} className="text-blue-500" /> },
  { label: "Guide Diversification Alimentaire", link: "/enfant/guide-diversification", icon: <Search size={38} className="text-lime-500" /> },
  { label: "Tracker Développement Moteur 0-3 ans", link: "/enfant/developpement-moteur", icon: <Search size={38} className="text-orange-400" /> },
  { label: "Calculateur Besoins Nutritionnels Enfant", link: "/enfant/besoins-nutritionnels", icon: <Search size={38} className="text-teal-500" /> },
  { label: "Tracker Pleurs & Humeur Bébé", link: "/enfant/tracker-pleurs-humeur", icon: <Search size={38} className="text-purple-500" /> },
  { label: "Guide Allaitement Complet", link: "/sante/guide-allaitement", icon: <Search size={38} className="text-pink-400" /> },
];

const WELCOME = [
  "Bienvenue sur MomTech Suite 👶",
  "50 outils santé, grossesse, bébé, sécurité et parentalité 100% offline, gratuits, privacy-first."
];

const Index = () => {
  const [search, setSearch] = useState("");
  const filtered = TOOLS.filter(
    tool =>
      tool.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex flex-1">
        <AppSidebar />
        <main className="flex-1 flex flex-col items-center py-12 px-2 bg-gradient-to-br from-blue-50 via-white to-pink-50">
          <div className="w-full max-w-2xl mx-auto text-center space-y-5 mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-500 to-fuchsia-500 bg-clip-text text-transparent drop-shadow leading-tight mb-1 animate-fade-in">
              {WELCOME[0]}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto font-medium animate-fade-in">
              {WELCOME[1]}
            </p>
            <div className="flex items-center gap-2 mt-6 justify-center animate-fade-in">
              <div className="relative w-full max-w-sm">
                <span className="absolute left-3 top-2.5 text-gray-400">
                  <Search size={24} />
                </span>
                <Input
                  type="text"
                  placeholder="Rechercher un outil…"
                  className="pl-10 py-2 text-base bg-white/80 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-300 transition-all"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div
            className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl animate-fade-in"
          >
            {filtered.map(({ label, link, icon }) => (
              <a
                key={link}
                href={link}
                className="group rounded-xl shadow-lg bg-white/90 border border-blue-50 hover:shadow-2xl transition-all hover:-translate-y-1 hover:scale-105 hover:bg-blue-50/90 px-6 py-6 flex flex-col items-center gap-3 story-link"
                style={{ minHeight: 168 }}
              >
                <div className="mb-1 group-hover:animate-pulse transition-transform">
                  {icon}
                </div>
                <span className="text-lg md:text-xl font-semibold text-blue-900 text-center drop-shadow story-link">
                  {label}
                </span>
              </a>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full text-muted-foreground py-10 text-xl">
                Aucun outil ne correspond à votre recherche.
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
