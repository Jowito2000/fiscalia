"use client"
import { HomeButton } from "./ui/home-button";

import { NavigationBar } from "./NavigationBar";
import { useState } from "react";

import { Settings } from "lucide-react";
import { SettingsPanel } from "./SettingsPanel";

export const HeaderBar = () => {

  const [settingsDisplay, setSettingsDisplay] = useState(false);  

  return (
    <header className="bg-white border-b sticky top-0 z-40">
       <div className="flex items-center justify-between">
        <HomeButton />
        <NavigationBar />
        <Settings onClick={() => setSettingsDisplay(!settingsDisplay)} 
          className="mr-5"
          />
       </div>              
       <div>
          {settingsDisplay && <SettingsPanel />}
       </div>
    </header>
  )
}

