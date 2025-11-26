// components/auth/AuthScreen.tsx
import { AuthTabs } from "@/components/auth/AuthTabs";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";

export default function AuthScreen() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-3">
          <Image src="IconoFiscalIAVectorSinFondo.svg" alt="IconoFiscalIA" width={160} height={160} className="mx-auto" />
          <CardTitle className="text-3xl">Fiscal IA</CardTitle>
          <CardDescription>
            Gestiona tus finanzas e impuestos de forma inteligente
          </CardDescription>
        </CardHeader>

        <CardContent>
          <AuthTabs/>
        </CardContent>
      </Card>
    </div>
  );
}
