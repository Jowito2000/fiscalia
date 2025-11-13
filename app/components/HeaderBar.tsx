import Link from "next/link";
import { HomeButton } from "./ui/home-button";

import { NavigationBar } from "./NavigationBar";

export const HeaderBar = () => {
  return (
    <header className="bg-white border-b sticky top-0 z-40">
       <div className="flex items-center justify-between">
        <HomeButton />
        <NavigationBar />

       </div>              
    </header>
  )
}

