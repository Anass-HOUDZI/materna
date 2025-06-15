
import React, { useState } from "react";
import AppSidebar from "@/components/app-sidebar";
import { Input } from "@/components/ui/input";
import { Search, Calendar, Baby, LineChart, ClipboardList } from "lucide-react";
import Footer from "@/components/ui/Footer";
import FamilyIllustration from "@/components/home/FamilyIllustration";
import FavoriteButton from "@/components/home/FavoriteButton";
import { useFavorites } from "@/hooks/useFavorites";
import UserTourModal from "@/components/home/UserTourModal";
import UserFeedbackModal from "@/components/home/UserFeedbackModal";
import { HelpCircle, Star } from "lucide-react";

// Ordre de popularité proposé : Date d'accouchement, Contractions, Prise de poids, Calendrier, Tracker mouvements bébé, etc.
const TOOLS = [
  {
    label: "Calculateur de date d'accouchement",
    link: "/grossesse/calculateur-terme",
    section: "Grossesse",
    icon: <Calendar className="text-blue-500" size={38} />,
    color: "bg-gradient-to-br from-blue-50 to-blue-100",
  },
  {
    label: "Tracker Contractions",
    link: "/grossesse/tracker-contractions",
    section: "Grossesse",
    icon: <LineChart className="text-pink-500" size={38} />,
    color: "bg-gradient-to-br from-pink-50 to-pink-100",
  },
  {
    label: "Calculateur Prise de Poids",
    link: "/grossesse/calculateur-poids",
    section: "Grossesse",
    icon: <LineChart className="text-green-500" size={38} />,
    color: "bg-gradient-to-br from-green-50 to-green-100",
  },
  {
    label: "Calendrier Grossesse Semaine/Semaine",
    link: "/grossesse/calendrier-semaine",
    section: "Grossesse",
    icon: <Calendar className="text-violet-500" size={38} />,
    color: "bg-gradient-to-br from-violet-50 to-violet-100",
  },
  {
    label: "Tracker Mouvements Bébé",
    link: "/grossesse/tracker-mouvements-bebe",
    section: "Grossesse",
    icon: <Baby className="text-rose-400" size={34} />,
    color: "bg-gradient-to-br from-rose-50 to-pink-100",
  },
  {
    label: "Journal Symptômes",
    link: "/grossesse/journal-symptomes",
    section: "Grossesse",
    icon: <ClipboardList className="text-yellow-400" size={34} />,
    color: "bg-gradient-to-br from-yellow-50 to-orange-50",
  },
  {
    label: "Calculateur Sexe Bébé (fun)",
    link: "/grossesse/calculateur-sexe-bebe",
    section: "Grossesse",
    icon: <Search className="text-fuchsia-500" size={34} />,
    color: "bg-gradient-to-br from-fuchsia-50 to-pink-100",
  },
  {
    label: "Simulateur Budget Bébé Année 1",
    link: "/grossesse/simulateur-budget-bebe",
    section: "Grossesse",
    icon: <LineChart className="text-sky-500" size={34} />,
    color: "bg-gradient-to-br from-sky-50 to-blue-100",
  },
  {
    label: "Calculateur Poussées Dentaires",
    link: "/grossesse/calculateur-dents",
    section: "Bébé & Enfant",
    icon: <LineChart className="text-emerald-400" size={34} />,
    color: "bg-gradient-to-br from-emerald-50 to-green-100",
  },
  {
    label: "Courbes Croissance OMS",
    link: "/enfant/courbes-croissance",
    section: "Bébé & Enfant",
    icon: <LineChart className="text-blue-500" size={34} />,
    color: "bg-gradient-to-br from-blue-50 to-indigo-50",
  },
  {
    label: "Guide Diversification Alimentaire",
    link: "/enfant/guide-diversification",
    section: "Bébé & Enfant",
    icon: <ClipboardList className="text-lime-500" size={34} />,
    color: "bg-gradient-to-br from-lime-50 to-lime-100",
  },
  {
    label: "Tracker Développement Moteur 0-3 ans",
    link: "/enfant/developpement-moteur",
    section: "Bébé & Enfant",
    icon: <LineChart className="text-orange-400" size={34} />,
    color: "bg-gradient-to-br from-orange-50 to-yellow-50",
  },
  {
    label: "Calculateur Besoins Nutritionnels Enfant",
    link: "/enfant/besoins-nutritionnels",
    section: "Bébé & Enfant",
    icon: <LineChart className="text-teal-500" size={34} />,
    color: "bg-gradient-to-br from-teal-50 to-blue-50",
  },
  {
    label: "Tracker Pleurs & Humeur Bébé",
    link: "/enfant/tracker-pleurs-humeur",
    section: "Bébé & Enfant",
    icon: <LineChart className="text-purple-500" size={34} />,
    color: "bg-gradient-to-br from-purple-50 to-indigo-50",
  },
  {
    label: "Guide Allaitement Complet",
    link: "/sante/guide-allaitement",
    section: "Santé / Parentalité",
    icon: <ClipboardList className="text-pink-400" size={34} />,
    color: "bg-gradient-to-br from-pink-50 to-pink-100",
  },
];

const SECTION_ORDER = ["Grossesse", "Bébé & Enfant", "Santé / Parentalité"];
const SECTION_LABELS: Record<string, string> = {
  "Grossesse": "Grossesse",
  "Bébé & Enfant": "Bébé & Enfant",
  "Santé / Parentalité": "Santé / Parentalité",
};

const WELCOME = [
  "Bienvenue sur MomTech Suite 👶",
  "50 outils santé, grossesse, bébé, sécurité et parentalité 100% offline, gratuits, privacy-first.",
];

const Index = () => {
  const [search, setSearch] = useState("");
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [showTour, setShowTour] = useState(
    () => window.localStorage.getItem("momtech-user-tour-done") !== "yes"
  );
  const [showFeedback, setShowFeedback] = useState(false);

  function openTour() {
    setShowTour(true);
    window.localStorage.setItem("momtech-user-tour-done", "no");
  }
  function closeTour() {
    setShowTour(false);
    window.localStorage.setItem("momtech-user-tour-done", "yes");
  }

  const filtered = TOOLS; // recherche désactivée pour l’instant

  // Trie : favoris d’abord, puis autres
  const sorted = [
    ...filtered.filter(tool => favorites.includes(tool.link)),
    ...filtered.filter(tool => !favorites.includes(tool.link)),
  ];

  // Répartir les outils en sections, tout en conservant l'ordre des favoris
  const toolsBySection: Record<string, typeof TOOLS> = {};
  SECTION_ORDER.forEach(section => {
    toolsBySection[section] = sorted.filter(t => t.section === section);
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-pink-50 via-white to-blue-50">
      <UserTourModal open={showTour} onClose={closeTour} />
      {/* MODAL FEEDBACK UTILISATEUR */}
      <UserFeedbackModal open={showFeedback} onClose={() => setShowFeedback(false)} />

      {/* BOUTON FEEDBACK flottant */}
      <button
        onClick={() => setShowFeedback(true)}
        className="fixed z-40 bottom-5 left-5 bg-white/90 rounded-full shadow-lg border border-yellow-200 transition hover:bg-yellow-50 hover:scale-105 px-4 py-2 flex items-center gap-2 text-yellow-600 font-semibold"
        style={{ boxShadow: "0 2px 12px 0 #fef08a90" }}
        aria-label="Donner un avis"
        title="Donner un avis sur MomTech Suite"
      >
        <Star className="mr-1" size={22} />
        Avis
      </button>

      {/* Bouton d’aide/visite guidée flottant en bas à droite */}
      <button
        onClick={openTour}
        className="fixed z-40 bottom-5 right-5 bg-white/90 rounded-full shadow-lg border border-blue-200 transition hover:bg-blue-50 hover:scale-105 px-4 py-2 flex items-center gap-2 text-blue-600 font-semibold"
        style={{ boxShadow: "0 2px 12px 0 #dbeafe90" }}
        aria-label="Guide utilisateur"
      >
        <HelpCircle className="mr-1" size={22} />
        Aide
      </button>

      <main className="flex-1 flex flex-col items-center px-3 pt-10 pb-10">
        {/* Animation fade-in sur l'illustration */}
        <FamilyIllustration className="animate-fade-in" />
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

        {/* Sections outils, avec titres */}
        <div className="w-full max-w-5xl flex flex-col gap-12">
          {SECTION_ORDER.map(section => (
            toolsBySection[section] && toolsBySection[section].length > 0 ? (
              <div key={section}>
                <h2 className="font-playfair text-2xl md:text-3xl font-bold text-blue-800 mb-5 ml-1 animate-fade-in">
                  {SECTION_LABELS[section]}
                </h2>
                <div className="grid gap-8 md:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {toolsBySection[section].map(({ label, link, icon, color }) => (
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
              </div>
            ) : null
          ))}
        </div>

        {/* Bloc Accordéon FAQ positionné en bas de page après les outils */}
        <div className="w-full flex justify-center mt-14 mb-1 animate-fade-in">
          <div className="rounded-2xl bg-gradient-to-br from-blue-50/40 to-blue-100/30 border border-blue-100 shadow-sm overflow-hidden max-w-xl w-full mx-auto"
            style={{
              boxShadow: "0 1.5px 15px 0 #dbeafe1A",
              background: "linear-gradient(135deg, #f0f7ff 60%, #e2eaff 100%)"
            }}
          >
            <Accordion>
              <AccordionItem title="Comment fonctionne la suite ?">
                50 outils entièrement offline, gratuits, permettant de gérer santé, grossesse et parentalité.
              </AccordionItem>
              <AccordionItem title="Mes données sont-elles privées ?">
                Oui, tout est traité en local, aucune donnée transmise ni stockée à l’extérieur.
              </AccordionItem>
              <AccordionItem title="Comment ajouter aux favoris ?">
                Cliquez sur l’étoile jaune en haut à droite de chaque outil pour le retrouver en priorité.
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Accordéon interactif simple (utilise shadcn/ui primitives)
function Accordion({ children }: { children: React.ReactNode }) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  return (
    <div>
      {React.Children.map(children, (child, idx) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<any>, // <-- fix typage ici !
              {
                open: idx === activeIdx,
                onToggle: () => setActiveIdx(idx === activeIdx ? null : idx),
              }
            )
          : child
      )}
    </div>
  );
}

function AccordionItem({
  title,
  children,
  open,
  onToggle,
}: {
  title: string;
  children: React.ReactNode;
  open?: boolean;
  onToggle?: () => void;
}) {
  return (
    <div className="border-b last:border-b-0">
      <button
        className="w-full text-left py-4 px-6 font-semibold flex justify-between items-center transition-colors hover:bg-blue-50 focus:outline-none"
        onClick={onToggle}
        aria-expanded={open}
      >
        <span>{title}</span>
        <span className={`transition-transform duration-200 ${open ? "rotate-90" : "rotate-0"}`}>›</span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-48 opacity-100 py-2 px-6" : "max-h-0 opacity-0 py-0 px-6"}`}
        style={{}}
        aria-hidden={!open}
      >
        <div className="text-gray-700 text-base">{children}</div>
      </div>
    </div>
  );
}

export default Index;

// NOTE: Ce fichier est long (>320 lignes). Pense à le refactorer bientôt pour séparer les sections ou la grille d’outils dans des composants dédiés !
