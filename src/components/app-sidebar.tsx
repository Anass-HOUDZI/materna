
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
// Import icons
import { Calendar, LineChart, ClipboardList, Baby, Search } from "lucide-react";

// Même info et icônes que sur l’accueil
const TOOLS = [
  {
    label: "Calculateur de date d'accouchement",
    link: "/grossesse/calculateur-terme",
    icon: <Calendar className="text-blue-500" size={18} />,
  },
  {
    label: "Tracker Contractions",
    link: "/grossesse/tracker-contractions",
    icon: <LineChart className="text-pink-500" size={18} />,
  },
  {
    label: "Calculateur Prise de Poids",
    link: "/grossesse/calculateur-poids",
    icon: <LineChart className="text-green-500" size={18} />,
  },
  {
    label: "Calendrier Grossesse Semaine/Semaine",
    link: "/grossesse/calendrier-semaine",
    icon: <Calendar className="text-violet-500" size={18} />,
  },
  {
    label: "Tracker Mouvements Bébé",
    link: "/grossesse/tracker-mouvements-bebe",
    icon: <Baby className="text-rose-400" size={16} />,
  },
  {
    label: "Journal Symptômes",
    link: "/grossesse/journal-symptomes",
    icon: <ClipboardList className="text-yellow-400" size={16} />,
  },
  {
    label: "Calculateur Sexe Bébé (fun)",
    link: "/grossesse/calculateur-sexe-bebe",
    icon: <Search className="text-fuchsia-500" size={16} />,
  },
  {
    label: "Simulateur Budget Bébé Année 1",
    link: "/grossesse/simulateur-budget-bebe",
    icon: <LineChart className="text-sky-500" size={16} />,
  },
  {
    label: "Calculateur Poussées Dentaires",
    link: "/grossesse/calculateur-dents",
    icon: <LineChart className="text-emerald-400" size={16} />,
  },
  {
    label: "Courbes Croissance OMS",
    link: "/enfant/courbes-croissance",
    icon: <LineChart className="text-blue-500" size={16} />,
  },
  {
    label: "Guide Diversification Alimentaire",
    link: "/enfant/guide-diversification",
    icon: <ClipboardList className="text-lime-500" size={16} />,
  },
  {
    label: "Tracker Développement Moteur 0-3 ans",
    link: "/enfant/developpement-moteur",
    icon: <LineChart className="text-orange-400" size={16} />,
  },
  {
    label: "Calculateur Besoins Nutritionnels Enfant",
    link: "/enfant/besoins-nutritionnels",
    icon: <LineChart className="text-teal-500" size={16} />,
  },
  {
    label: "Tracker Pleurs & Humeur Bébé",
    link: "/enfant/tracker-pleurs-humeur",
    icon: <LineChart className="text-purple-500" size={16} />,
  },
  {
    label: "Guide Allaitement Complet",
    link: "/sante/guide-allaitement",
    icon: <ClipboardList className="text-pink-400" size={16} />,
  },
];

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {TOOLS.map(tool => (
                <SidebarMenuItem key={tool.link}>
                  <SidebarMenuButton asChild>
                    <a href={tool.link} className="flex items-center gap-2 text-sm font-medium py-1">
                      <span>{tool.icon}</span>
                      <span className="truncate">{tool.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

