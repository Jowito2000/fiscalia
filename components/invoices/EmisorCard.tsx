import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export function EmisorCard({ user }: any) {
  return (
    <Card>
        <CardHeader>
            <CardTitle>Datos del Emisor</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
            <div>
            <Label className="font-bold">Nombre</Label>
            <p>{'Ejemplo Nombre'} {'Ejemplo de Apellido'}</p>
            </div>
            <div>
            <Label className="font-bold">Email</Label>
            <p>{'email@ejemplo.com'}</p>
            </div>
        </CardContent>
    </Card>
  );
}