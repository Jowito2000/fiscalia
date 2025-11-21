import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar"
import { SunMoon, UserPen } from "lucide-react";
import IconPlans from '@/assets/svgs/icon-plans.js';
// Menu items.
const items = [
  {
    title: "Apariencia",
    url: "/settings/appearance",
    icon: SunMoon,
  },
  {
    title: "Mis datos",
    url: "/settings/profile",
    icon: UserPen,
  },
  {
    title: "Planes",
    url: "/settings/plans",
    icon: IconPlans,
  },
  {
    title: "Seguridad",
    url: "/settings/security",
    icon: UserPen,
  }
  

];

export const SettingsSidebar = () => {
    return (
        <Sidebar className="pt-16">
            <SidebarContent>
                 <SidebarGroup>
                    <SidebarGroupLabel>Configuracion</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                                <a href={item.url}>
                                <item.icon />
                                <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                    </SidebarGroup>
            </SidebarContent>
        </Sidebar>  
    )
}   