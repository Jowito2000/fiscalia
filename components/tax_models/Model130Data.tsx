import { useTaxModel130 } from "@/hooks/useTaxModels";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FileText } from "lucide-react";

export function Model130Data() {
    const { model130, setModel130, handleSaveModel130 } = useTaxModel130();
    return(
        <Card>
            <CardHeader>
                <CardTitle>Datos del Trimestre</CardTitle>
                <CardDescription>Ingresos y gastos de tu actividad</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label>Trimestre</Label>
                    <select
                        className="w-full h-10 px-3 rounded-md border border-input bg-background"
                        value={model130.trimestre}
                        onChange={(e) => setModel130({ ...model130, trimestre: e.target.value })}
                    >
                        <option value="1T">1T (Enero - Marzo)</option>
                        <option value="2T">2T (Abril - Junio)</option>
                        <option value="3T">3T (Julio - Septiembre)</option>
                        <option value="4T">4T (Octubre - Diciembre)</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <div className="space-y-2">
                        <Label>Ingresos del Trimestre (€)</Label>
                        <Input
                            type="number"
                            step="0.01"
                            value={model130.ingresos}
                            onChange={(e) =>
                                setModel130({ ...model130, ingresos: parseFloat(e.target.value) || 0 })
                            }
                            placeholder="15000.00"
                        />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                        Total facturado en el trimestre
                    </p>
                </div>
                
                <div>
                    <div className="space-y-2">
                        <Label>Gastos Deducibles (€)</Label>
                        <Input
                            type="number"
                            step="0.01"
                            value={model130.gastos}
                            onChange={(e) =>
                                setModel130({ ...model130, gastos: parseFloat(e.target.value) || 0 })
                            }
                            placeholder="5000.00"
                        />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Gastos relacionados con tu actividad</p>
                </div>

                <div>
                    <div className="space-y-2">
                        <Label>Pagos Previos (€)</Label>
                        <Input
                            type="number"
                            step="0.01"
                            value={model130.pagosPrevios}
                            onChange={(e) =>
                                setModel130({ ...model130, pagosPrevios: parseFloat(e.target.value) || 0 })
                            }
                            placeholder="0.00"
                        />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                        Pagos realizados en trimestres anteriores
                    </p>
                </div>

                <Button onClick={handleSaveModel130} className="w-full">
                    <FileText className="w-4 h-4 mr-2" />
                    Guardar Modelo 130
                </Button>
            </CardContent>
        </Card>
    )
}