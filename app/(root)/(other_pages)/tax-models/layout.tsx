"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export default function TaxLayout({ children }: { children: React.ReactNode }) {
  const segment = useSelectedLayoutSegment(); // "tax-models", "model130", "othermodels"
  console.log(segment);
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div>
        <h2>Modelos Fiscales</h2>
        <p className="text-muted-foreground">
          Rellena tus declaraciones trimestrales con ayuda paso a paso
        </p>
      </div>
      <Tabs value={segment ?? "tax-models"} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="(model303)" asChild>
            <Link href="/tax-models">Modelo 303 (IVA)</Link>
          </TabsTrigger>

          <TabsTrigger value="model130" asChild>
            <Link href="/tax-models/model130">Modelo 130 (IRPF)</Link>
          </TabsTrigger>

          <TabsTrigger value="othermodels" asChild>
            <Link href="/tax-models/othermodels">Otros Modelos</Link>
          </TabsTrigger>
        </TabsList>

        {children}
      </Tabs>
    </div>
  );
}
