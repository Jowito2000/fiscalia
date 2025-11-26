// components/auth/AuthTabs.tsx

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export function AuthTabs() {
  return (
    <Tabs defaultValue="login" className="w-full">

      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
        <TabsTrigger value="register">Registrarse</TabsTrigger>
      </TabsList>

      <TabsContent value="login">
        <div className="mt-4"> 
          <LoginForm/>
        </div>
      </TabsContent>

      <TabsContent value="register">
        <div className="mt-4">
          <RegisterForm />
        </div>
      </TabsContent>
    </Tabs>
  );
}
