"use client"
import { HomeButton } from "./ui/home-button";
import { NavigationBar } from "./NavigationBar";
import { Settings } from "lucide-react";
import { Popover,
  PopoverContent,
  PopoverTrigger, } from "./ui/popover";

import { NavigationButton } from "./ui/navigation-button";
import { Switch } from "./ui/switch";

export const HeaderBar = () => {

  return (
    <header className="bg-white border-b sticky top-0 z-40">
       <div className="flex items-center justify-between">
        <HomeButton />
        <NavigationBar />
        <Popover>
            <PopoverTrigger>
              <Settings className="mr-5" />
            </PopoverTrigger>
            <PopoverContent className=" mr-7 flex flex-col items-center space-y-4">

                <h1>Mi cuenta</h1>
                <NavigationButton 
                  pagename="Configuración"
                  path="/settings/appearance"
                  hasVariants={false}
                />                            
                <Switch />
            </PopoverContent>
          </Popover>
       </div>                     
    </header>
  )
}

