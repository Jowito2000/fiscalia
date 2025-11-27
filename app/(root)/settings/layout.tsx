import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SettingsSidebar } from "@/components/settings-sidebar/settingsSidebar";
import IconPlans from "@/assets/svgs/icon-plans";



const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return( 
    <SidebarProvider>
      <SettingsSidebar />
      <main>              
        {/*<SidebarTrigger /> //Information needed => implementation according to figma?  */}  
        {children}
      </main>
    </SidebarProvider>
  );
} 

export default ProfileLayout;