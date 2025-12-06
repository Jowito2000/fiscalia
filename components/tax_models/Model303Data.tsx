
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTaxModel303 } from "@/hooks/useTaxModels";
import { FileText } from "lucide-react";

export function Model303Data() {
    const { model303, setModel303, handleSaveModel303 } = useTaxModel303();
    return (
        <Card>
            <CardHeader>
                <CardTitle>Datos del Trimestre</CardTitle>
                <CardDescription>Completa la información de tu actividad</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label>Trimestre</Label>
                    <select
                        className="w-full h-10 px-3 rounded-md border border-input bg-background"
                        value={model303.trimestre}
                        onChange={(e) => setModel303({ ...model303, trimestre: e.target.value })}
                    >
                    <option value="1T">1T (Enero - Marzo)</option>
                    <option value="2T">2T (Abril - Junio)</option>
                    <option value="3T">3T (Julio - Septiembre)</option>
                    <option value="4T">4T (Octubre - Diciembre)</option>
                </select>
            </div>

            <div>
                <div className="space-y-2">
                    <Label>Base Imponible General (€)</Label>
                    <Input
                        type="number"
                        step="0.01"
                        value={model303.baseImponibleGeneral}
                        onChange={(e) =>
                            setModel303({
                                ...model303,
                                baseImponibleGeneral: parseFloat(e.target.value) || 0,
                            })
                        }
                        placeholder="10000.00"
                    />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                    Total de ventas/servicios sin IVA
                </p>
            </div>
            

            <div>   
                <div className="space-y-2">
                    <Label>Cuota IVA Repercutido (€)</Label>
                    <Input
                        type="number"
                        step="0.01"
                        value={model303.cuotaIVA}
                        onChange={(e) =>
                            setModel303({ ...model303, cuotaIVA: parseFloat(e.target.value) || 0 })
                        }
                        placeholder="2100.00"
                    />
                </div>
                <p className="text-xs text-muted-foreground mt-1">IVA cobrado a tus clientes</p>
            </div>

            <div>
                <div className="space-y-2">
                    <Label>IVA Deducible (€)</Label>
                    <Input
                        type="number"
                        step="0.01"
                        value={model303.ivaDeducible}
                        onChange={(e) =>
                            setModel303({ ...model303, ivaDeducible: parseFloat(e.target.value) || 0 })
                        }
                        placeholder="500.00"
                    />
                </div>
                <p className="text-xs text-muted-foreground mt-1">IVA pagado en tus gastos</p>
            </div>

            <Button onClick={handleSaveModel303} className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                Guardar Modelo 303
            </Button>
            </CardContent>
        </Card>
    )
}