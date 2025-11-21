import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SettingsSidebar } from "@/components/SettingsSidebar";
import IconPlans from "@/assets/svgs/icon-plans";



const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return( 
    <SidebarProvider>
      <SettingsSidebar />
      <main>        
        <IconPlans strokeWidth={2}/>
        {children}
      </main>
    </SidebarProvider>
  );
} 

export default ProfileLayout;