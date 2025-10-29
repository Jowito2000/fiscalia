import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Calculator, 
  FileText, 
  HelpCircle, 
  Download, 
  CheckCircle2,
  AlertCircle 
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface TaxModel303Data {
  trimestre: string;
  baseImponibleGeneral: number;
  cuotaIVA: number;
  ivaDeducible: number;
}

interface TaxModel130Data {
  trimestre: string;
  ingresos: number;
  gastos: number;
  pagosPrevios: number;
}

export function TaxModels() {
  const [model303, setModel303] = useState<TaxModel303Data>({
    trimestre: '1T',
    baseImponibleGeneral: 0,
    cuotaIVA: 0,
    ivaDeducible: 0,
  });

  const [model130, setModel130] = useState<TaxModel130Data>({
    trimestre: '1T',
    ingresos: 0,
    gastos: 0,
    pagosPrevios: 0,
  });

  const calculateModel303 = () => {
    const resultado = model303.cuotaIVA - model303.ivaDeducible;
    return {
      cuotaDevengada: model303.cuotaIVA,
      cuotaDeducible: model303.ivaDeducible,
      resultado: resultado,
      aIngresar: resultado > 0 ? resultado : 0,
      aCompensar: resultado < 0 ? Math.abs(resultado) : 0,
    };
  };

  const calculateModel130 = () => {
    const rendimientoNeto = model130.ingresos - model130.gastos;
    const cuotaTributaria = rendimientoNeto * 0.2; // 20% IRPF
    const resultado = cuotaTributaria - model130.pagosPrevios;

    return {
      rendimientoNeto,
      cuotaTributaria,
      pagosPrevios: model130.pagosPrevios,
      resultado: resultado > 0 ? resultado : 0,
    };
  };

  const result303 = calculateModel303();
  const result130 = calculateModel130();

  const handleSaveModel303 = () => {
    toast.success('Modelo 303 guardado correctamente');
  };

  const handleSaveModel130 = () => {
    toast.success('Modelo 130 guardado correctamente');
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div>
        <h2>Modelos Fiscales</h2>
        <p className="text-muted-foreground">
          Rellena tus declaraciones trimestrales con ayuda paso a paso
        </p>
      </div>

      <Tabs defaultValue="303" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="303">Modelo 303 (IVA)</TabsTrigger>
          <TabsTrigger value="130">Modelo 130 (IRPF)</TabsTrigger>
          <TabsTrigger value="otros">Otros Modelos</TabsTrigger>
        </TabsList>

        <TabsContent value="303" className="space-y-6 mt-6">
          <Alert>
            <HelpCircle className="w-4 h-4" />
            <AlertDescription>
              El Modelo 303 es la declaración trimestral del IVA. Deben presentarlo autónomos y
              empresas que realicen actividades sujetas a IVA.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Datos del Trimestre</CardTitle>
                <CardDescription>Completa la información de tu actividad</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
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
                  <p className="text-xs text-muted-foreground mt-1">
                    Total de ventas/servicios sin IVA
                  </p>
                </div>

                <div>
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
                  <p className="text-xs text-muted-foreground mt-1">IVA cobrado a tus clientes</p>
                </div>

                <div>
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
                  <p className="text-xs text-muted-foreground mt-1">IVA pagado en tus gastos</p>
                </div>

                <Button onClick={handleSaveModel303} className="w-full">
                  <FileText className="w-4 h-4 mr-2" />
                  Guardar Modelo 303
                </Button>
              </CardContent>
            </Card>

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
                    <span>{result303.cuotaDevengada.toFixed(2)} €</span>
                  </div>

                  <div className="flex justify-between p-3 bg-blue-50 rounded-lg">
                    <span>Cuota deducible (IVA soportado):</span>
                    <span>{result303.cuotaDeducible.toFixed(2)} €</span>
                  </div>

                  <div className="h-px bg-border" />

                  {result303.aIngresar > 0 ? (
                    <Alert className="border-green-200 bg-green-50">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <AlertDescription className="text-green-900">
                        <div className="flex justify-between items-center">
                          <span>Resultado a INGRESAR:</span>
                          <span>{result303.aIngresar.toFixed(2)} €</span>
                        </div>
                      </AlertDescription>
                    </Alert>
                  ) : result303.aCompensar > 0 ? (
                    <Alert className="border-blue-200 bg-blue-50">
                      <AlertCircle className="w-4 h-4 text-blue-600" />
                      <AlertDescription className="text-blue-900">
                        <div className="flex justify-between items-center">
                          <span>Resultado a COMPENSAR:</span>
                          <span>{result303.aCompensar.toFixed(2)} €</span>
                        </div>
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <Alert>
                      <AlertDescription>
                        <div className="flex justify-between items-center">
                          <span>Sin resultado</span>
                          <span>0.00 €</span>
                        </div>
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
          </div>
        </TabsContent>

        <TabsContent value="130" className="space-y-6 mt-6">
          <Alert>
            <HelpCircle className="w-4 h-4" />
            <AlertDescription>
              El Modelo 130 es el pago fraccionado del IRPF. Lo deben presentar los autónomos en
              estimación directa que no tengan retención del 70% o más de sus ingresos.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Datos del Trimestre</CardTitle>
                <CardDescription>Ingresos y gastos de tu actividad</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
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

                <div>
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
                  <p className="text-xs text-muted-foreground mt-1">
                    Total facturado en el trimestre
                  </p>
                </div>

                <div>
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
                  <p className="text-xs text-muted-foreground mt-1">Gastos relacionados con tu actividad</p>
                </div>

                <div>
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
                    <span>{model130.ingresos.toFixed(2)} €</span>
                  </div>

                  <div className="flex justify-between p-3 bg-blue-50 rounded-lg">
                    <span>Gastos:</span>
                    <span>- {model130.gastos.toFixed(2)} €</span>
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
                    <span>- {result130.pagosPrevios.toFixed(2)} €</span>
                  </div>

                  <div className="h-px bg-border" />

                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <AlertDescription className="text-green-900">
                      <div className="flex justify-between items-center">
                        <span>Resultado a INGRESAR:</span>
                        <span>{result130.resultado.toFixed(2)} €</span>
                      </div>
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
          </div>
        </TabsContent>

        <TabsContent value="otros" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Otros Modelos Fiscales</CardTitle>
              <CardDescription>
                Próximamente disponibles más modelos fiscales
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4>Modelo 349</h4>
                  <p className="text-sm text-muted-foreground">
                    Declaración recapitulativa de operaciones intracomunitarias
                  </p>
                  <Button variant="outline" className="mt-3" disabled>
                    Próximamente
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4>Modelo 347</h4>
                  <p className="text-sm text-muted-foreground">
                    Declaración anual de operaciones con terceras personas
                  </p>
                  <Button variant="outline" className="mt-3" disabled>
                    Próximamente
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4>Modelo 390</h4>
                  <p className="text-sm text-muted-foreground">
                    Declaración resumen anual del IVA
                  </p>
                  <Button variant="outline" className="mt-3" disabled>
                    Próximamente
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4>Modelo 100 (Renta)</h4>
                  <p className="text-sm text-muted-foreground">
                    Declaración anual de IRPF
                  </p>
                  <Button variant="outline" className="mt-3" disabled>
                    Próximamente
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
