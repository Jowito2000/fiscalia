import { Alert, AlertDescription } from "../ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Calculator, CheckCircle2, Download } from "lucide-react";
import { useTaxModel130 } from "@/hooks/useTaxModels";

export function Model130Result() {
    const { model130, calculateModel130 } = useTaxModel130();
    const result130 = calculateModel130();
    return(
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Calculator className="w-5 h-5 mr-2" />
                    Resultado
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-3">
                    <div className="flex justify-between p-3 bg-blue-50 rounded-lg">
                        <span>Ingresos:</span>
                        <span>{model130.ingresos130!.toFixed(2)} €</span>
                    </div>

                    <div className="flex justify-between p-3 bg-blue-50 rounded-lg">
                        <span>Gastos:</span>
                        <span>- {model130.gastos130!.toFixed(2)} €</span>
                    </div>

                    <div className="flex justify-between p-3 bg-purple-50 rounded-lg">
                        <span>Rendimiento Neto:</span>
                        <span>{result130.rendimientoNeto.toFixed(2)} €</span>
                    </div>

                    <div className="flex justify-between p-3 bg-purple-50 rounded-lg">
                        <span>Cuota (20%):</span>
                        <span>{result130.cuotaTributaria.toFixed(2)} €</span>
                    </div>

                    <div className="flex justify-between p-3 bg-purple-50 rounded-lg">
                        <span>Pagos previos:</span>
                        <span>- {result130.pagosPrevios!.toFixed(2)} €</span>
                    </div>

                    <div className="h-px bg-border" />

                    <Alert className="border-green-200 bg-green-50">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <AlertDescription className="text-green-900 flex justify-between items-center">
                            <span>Resultado a INGRESAR:</span>
                            <span>{result130.resultado.toFixed(2)} €</span>
                        </AlertDescription>
                    </Alert>
                </div>

                <div className="pt-4 space-y-2">
                    <h4 className="text-sm">Información:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                        <li>Se aplica un 20% sobre el rendimiento neto</li>
                        <li>Presenta antes del día 20 del mes siguiente al trimestre</li>
                        <li>Este es un pago a cuenta del IRPF anual</li>
                    </ul>
                </div>

                <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Descargar PDF
                </Button>
            </CardContent>
        </Card>
    )
}