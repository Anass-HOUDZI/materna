
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { TOOLS_DATA } from "@/data/categories";
import React from "react";

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {TOOLS_DATA.map(tool => (
                <SidebarMenuItem key={tool.link}>
                  <SidebarMenuButton asChild>
                    <Link to={tool.link} className="flex items-center gap-2 text-sm font-medium py-1">
                      <span>{React.createElement(tool.icon, { size: 18 })}</span>
                      <span className="truncate">{tool.label}</span>
                    </Link>
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
