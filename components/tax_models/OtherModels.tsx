import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { OtherModelCard } from "./OtherModelCard";

export function OtherModels() {
    return (
      <div className="space-y-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Otros Modelos Fiscales</CardTitle>
            <CardDescription>
              Próximamente disponibles más modelos fiscales
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <OtherModelCard model="349" description="Declaración recapitulativa de operaciones intracomunitarias"/>
              <OtherModelCard model="347" description="Declaración anual de operaciones con terceras personas"/>
              <OtherModelCard model="390" description="Declaración resumen anual del IVA"/>
              <OtherModelCard model="100" description="Declaración anual de IRPF"/>
            </div>
          </CardContent>
        </Card>
      </div>
    )
}