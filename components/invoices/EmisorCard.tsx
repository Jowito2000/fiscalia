import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useUser } from "@/contexts/UserContext";

export function EmisorCard() {
  const user = useUser();
  return (
    <Card>
        <CardHeader>
            <CardTitle>Datos del Emisor</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
            <div>
            <Label className="font-bold">Nombre</Label>
            <p>{user?.name} {user?.surname}</p>
            </div>
            <div>
            <Label className="font-bold">Email</Label>
            <p>{user?.email}</p>
            </div>
        </CardContent>
    </Card>
  );
}