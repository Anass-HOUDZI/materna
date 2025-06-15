import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Baby, ShieldCheck, Stethoscope, BookOpen, FileBarChart2 } from "lucide-react";

const CATEGORIES = [
  { label: "Grossesse", icon: Baby, key: "pregnancy" },
  { label: "Sécurité", icon: ShieldCheck, key: "security" },
  { label: "Santé", icon: Stethoscope, key: "health" },
  { label: "Éducation", icon: BookOpen, key: "education" },
  { label: "Rapports", icon: FileBarChart2, key: "reports" },
];

const SUBTOOLS = [
  { label: "Calculateur de date d'accouchement", link: "/grossesse/calculateur-terme" },
  { label: "Tracker Contractions", link: "/grossesse/tracker-contractions" },
  { label: "Calculateur Prise de Poids", link: "/grossesse/calculateur-poids" },
  { label: "Calendrier Grossesse Semaine/Semaine", link: "/grossesse/calendrier-semaine" },
  { label: "Tracker Mouvements Bébé", link: "/grossesse/tracker-mouvements-bebe" },
];

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Catégories d'outils</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {CATEGORIES.map(({ label, icon: Icon, key }) => (
                <SidebarMenuItem key={key}>
                  <SidebarMenuButton asChild>
                    <a href={`#${key}`}>
                      <Icon />
                      <span>{label}</span>
                    </a>
                  </SidebarMenuButton>
                  {/* Si catégorie = grossesse, affiche sous-menu */}
                  {key === "pregnancy" && (
                    <div className="ml-6 mt-2 space-y-1">
                      {SUBTOOLS.map(sub => (
                        <SidebarMenuItem key={sub.link}>
                          <SidebarMenuButton asChild>
                            <a href={sub.link} className="text-sm">
                              {sub.label}
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </div>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
