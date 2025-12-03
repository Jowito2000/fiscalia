import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SettingsSidebar } from "@/components/settings-sidebar/SettingsSidebar";
import IconPlans from "@/assets/svgs/icon-plans";



const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return(         
      <SidebarProvider>
        <SettingsSidebar />
        <main className="flex-1 overflow-y-auto p-6">                      
          {children}
        </main>
      </SidebarProvider>  
  );
} 

export default ProfileLayout;