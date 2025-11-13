import { LucideProps } from "lucide-react";
import Link from "next/link";
import { ForwardRefExoticComponent, RefAttributes } from "react";


interface NavigationButtonProps {
  pagename: string;
  path: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}

export const NavigationButton = ({ pagename = "home", path = "/", icon }: NavigationButtonProps) => {
    const Icon = icon;
    return (
    <Link
        className="space-x-2"
        href={path}
        /*variant={
        currentView === item.id
            ? "default"
            : "ghost"
        }        */
        
        >
        <Icon className="w-4 h-4" />
        <span>{pagename}</span>
    </Link>
    )
}