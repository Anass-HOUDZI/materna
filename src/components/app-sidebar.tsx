
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

// Liste complète des outils à afficher dans le menu latéral
const TOOLS = [
  // Outils Grossesse
  { label: "Calculateur de date d'accouchement", link: "/grossesse/calculateur-terme" },
  { label: "Tracker Contractions", link: "/grossesse/tracker-contractions" },
  { label: "Calculateur Prise de Poids", link: "/grossesse/calculateur-poids" },
  { label: "Calendrier Grossesse Semaine/Semaine", link: "/grossesse/calendrier-semaine" },
  { label: "Tracker Mouvements Bébé", link: "/grossesse/tracker-mouvements-bebe" },
  { label: "Journal Symptômes", link: "/grossesse/journal-symptomes" },
  { label: "Calculateur Sexe Bébé (fun)", link: "/grossesse/calculateur-sexe-bebe" },
  { label: "Simulateur Budget Bébé Année 1", link: "/grossesse/simulateur-budget-bebe" },
  { label: "Calculateur Poussées Dentaires", link: "/grossesse/calculateur-dents" },
  // Outils Éducation & Enfant
  { label: "Courbes Croissance OMS", link: "/enfant/courbes-croissance" },
  { label: "Guide Diversification Alimentaire", link: "/enfant/guide-diversification" },
  { label: "Tracker Développement Moteur 0-3 ans", link: "/enfant/developpement-moteur" },
  { label: "Calculateur Besoins Nutritionnels Enfant", link: "/enfant/besoins-nutritionnels" },
  { label: "Tracker Pleurs & Humeur Bébé", link: "/enfant/tracker-pleurs-humeur" },
  // Santé parents/enfant
  { label: "Guide Allaitement Complet", link: "/sante/guide-allaitement" },
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
                    <a href={tool.link} className="text-sm">
                      {tool.label}
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
