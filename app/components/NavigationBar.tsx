"use client"
import { NavigationButton } from "./ui/navigation-button";

import {
  MessageSquare,
  FileText,
  TrendingUp,
  FolderOpen,
  User,
  CreditCard,
} from "lucide-react";

type AppView =
  | "chat"
  | "invoices"
  | "tax-models"
  | "documents"
  | "profile"
  | "plans";

const navigationItems = [
    {
      path: "/" as AppView,
      label: "Chat IA",
      icon: MessageSquare,
    },
    {
      path: "/invoices" as AppView,
      label: "Facturas",
      icon: FileText,
    },
    {
      path: "/tax-models" as AppView,
      label: "Modelos",
      icon: TrendingUp,
    },
    {
      path: "/documents" as AppView,
      label: "Documentos",
      icon: FolderOpen,
    },
    {
      path: "/resources" as AppView,
      label: "Recursos",
      icon: CreditCard,
    },
    { 
      path: "/profile" as AppView, 
      label: "Perfil", 
      icon: User 
    }
  ];


export const NavigationBar = () => {
    
  return (
    <div className="hidden px-4 py-3 md:flex items-center space-x-1">
        {
        navigationItems.map((item) => (
            <NavigationButton 
                key={item.path}
                path={item.path}    
                pagename={item.label}                
                icon={item.icon}
            />
        ))
        }        

    </div>
    )
}
