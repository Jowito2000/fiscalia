// components/invoices/InvoicePreview.tsx

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileText, Save, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function InvoicePreview({ user, client, totals, invoiceData, onSave, onSavePDF }: any) {
  return (
    <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Vista Previa
              </CardTitle>
              <CardDescription>
                Fecha: {new Date().toLocaleDateString('es-ES')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">De:</p>
                <p>{user.name || 'Usuario'} {user.lastName || ''}</p>
                <p className="text-sm">{user.email || ''}</p>
              </div>

              <Separator />

              <div>
                <p className="text-sm text-muted-foreground">Para:</p>
                {client ? (
                  <>
                    <p>{client.name}</p>
                    <p className="text-sm">{client.nif}</p>
                    <p className="text-sm">{client.address}</p>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">Selecciona un cliente</p>
                )}
              </div>

              <Separator />

              <div>
                <p className="text-sm text-muted-foreground">Concepto:</p>
                <p>{invoiceData.concept || 'Sin especificar'}</p>
              </div>

              <div className="space-y-2 pt-4">
                <div className="flex justify-between">
                  <span>Base imponible:</span>
                  <span>{totals.subtotal.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>IVA ({invoiceData.ivaPercentage}%):</span>
                  <span>+ {totals.iva.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>IRPF ({invoiceData.irpfPercentage}%):</span>
                  <span>- {totals.irpf.toFixed(2)} €</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span>Total:</span>
                  <span>{totals.total.toFixed(2)} €</span>
                </div>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button onClick={onSave} className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  Guardar
                </Button>
                <Button variant="outline" onClick={onSavePDF}>
                  <Download className="w-4 h-4 mr-2" />
                  PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
  );
}
