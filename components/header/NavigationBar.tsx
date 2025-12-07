"use client"
import { NavigationButton } from "../ui/navigation-button";

import {
  MessageSquare,
  FileText,
  TrendingUp,
  FolderOpen,
  User,
  CreditCard,
  Settings2,
} from "lucide-react";

type AppView =
  | "/"
  | "/invoices"
  | "/tax-models"
  | "/documents"
  | "/profile"
  | "/resources"
  | "/settings/profile"
  | "/settings/appearance"
  | "/settings/security"
  | "/settings/plans"
  ;


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
      path: "/settings" as AppView, 
      label: "Perfil", 
      icon: User 
    },
    { 
      path: "/firebase_tests" as AppView, 
      label: "Pruebas", 
      icon: Settings2 
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
