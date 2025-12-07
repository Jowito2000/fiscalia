import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Alert, AlertDescription } from "../ui/alert";
import { CheckCircle2, AlertCircle, Calculator } from "lucide-react";
import { Button } from "../ui/button";
import { Download } from "lucide-react";
import { useTaxModel303 } from "@/hooks/useTaxModels";
import { Separator } from "../ui/separator";


export function Model303Result() {
    const { calculateModel303 } = useTaxModel303();
    const result303 = calculateModel303();
    
    return (
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
                        <span>Cuota devengada (IVA repercutido):</span>
                        <span>{result303.cuotaDevengada!.toFixed(2)} €</span>
                    </div>

                    <div className="flex justify-between p-3 bg-blue-50 rounded-lg">
                        <span>Cuota deducible (IVA soportado):</span>
                        <span>{result303.cuotaDeducible!.toFixed(2)} €</span>
                    </div>

                    <Separator />

                    {result303.aIngresar > 0 ? (
                        <Alert className="border-green-200 bg-green-50">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            <AlertDescription className="text-green-900 flex justify-between items-center">
                                <span>Resultado a INGRESAR:</span>
                                <span>{result303.aIngresar.toFixed(2)} €</span>
                            </AlertDescription>
                        </Alert>
                    ) : result303.aCompensar > 0 ? (
                        <Alert className="border-blue-200 bg-blue-50">
                            <AlertCircle className="w-4 h-4 text-blue-600" />
                            <AlertDescription className="text-blue-900 flex justify-between items-center">
                                <span>Resultado a COMPENSAR:</span>
                                <span>{result303.aCompensar.toFixed(2)} €</span>
                            </AlertDescription>
                        </Alert>
                    ) : (
                        <Alert>
                            <AlertDescription className="flex justify-between items-center">
                                <span>Sin resultado</span>
                                <span>0.00 €</span>
                            </AlertDescription>
                        </Alert>
                    )}
                </div>

                <div className="pt-4 space-y-2">
                    <h4 className="text-sm">Próximos pasos:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                        <li>Revisa que todos los datos sean correctos</li>
                        <li>Descarga el modelo en PDF</li>
                        <li>Presenta antes del día 20 del mes siguiente al trimestre</li>
                        {result303.aIngresar > 0 && <li>Realiza el pago correspondiente</li>}
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