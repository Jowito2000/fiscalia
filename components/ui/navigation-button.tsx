"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cva } from "class-variance-authority";


interface NavigationButtonProps {
  pagename: string;
  path: string;
  icon: React.ElementType
}
const linkVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-bold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]  ",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export const NavigationButton = ({ pagename = "home", path = "/", icon }: NavigationButtonProps) => {
    const Icon = icon;
    const currentpath = usePathname();
    const isActive = currentpath === path;
    return (
    <Link
        className= {`space-x-2 ${linkVariants({ variant: isActive ? "default" : "ghost" })}`}
        href={path}>
        <Icon className="w-4 h-4" />
        <span>{pagename}</span>
    </Link>
    )
}