
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
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
