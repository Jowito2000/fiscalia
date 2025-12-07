import { InvoiceFormData } from "@/model/InvoicesModels";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export function InvoiceDetailsForm({ invoiceData, setInvoiceData }: 
  { 
    invoiceData: InvoiceFormData, 
    setInvoiceData: (data: InvoiceFormData) => void 
  }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detalles de la Factura</CardTitle>
      </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <Label>Concepto</Label>
            <Input
              value={invoiceData.concept}
              onChange={(e) => setInvoiceData({ ...invoiceData, concept: e.target.value })}
              placeholder="Servicios de consultoría"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Precio Unitario (€)</Label>
              <Input
                type="number"
                step="0.01"
                value={invoiceData.unitPrice}
                onChange={(e) =>
                  setInvoiceData({ ...invoiceData, unitPrice: parseFloat(e.target.value) || 0 })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Cantidad</Label>
              <Input
                type="number"
                value={invoiceData.quantity}
                onChange={(e) =>
                  setInvoiceData({ ...invoiceData, quantity: parseInt(e.target.value) || 1 })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>IVA (%)</Label>
              <Select
                value={invoiceData.ivaPercentage.toString()}
                onValueChange={(value) =>
                  setInvoiceData({ ...invoiceData, ivaPercentage: parseInt(value) })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0%</SelectItem>
                  <SelectItem value="4">4%</SelectItem>
                  <SelectItem value="10">10%</SelectItem>
                  <SelectItem value="21">21%</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>IRPF (%)</Label>
              <Select
                value={invoiceData.irpfPercentage.toString()}
                onValueChange={(value) =>
                  setInvoiceData({ ...invoiceData, irpfPercentage: parseInt(value) })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0%</SelectItem>
                  <SelectItem value="7">7%</SelectItem>
                  <SelectItem value="15">15%</SelectItem>
                  <SelectItem value="21">21%</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    );
}
