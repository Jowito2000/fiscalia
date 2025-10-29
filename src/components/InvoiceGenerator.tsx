import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { toast } from 'sonner@2.0.3';
import { Plus, FileText, Download, Save } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface Client {
  id: string;
  name: string;
  nif: string;
  address: string;
}

interface InvoiceData {
  clientId: string;
  concept: string;
  unitPrice: number;
  quantity: number;
  ivaPercentage: number;
  irpfPercentage: number;
}

interface InvoiceGeneratorProps {
  userId: string;
  accessToken: string;
  userData: any;
}

export function InvoiceGenerator({ userId, accessToken, userData }: InvoiceGeneratorProps) {
  const [clients, setClients] = useState<Client[]>([]);
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    clientId: '',
    concept: '',
    unitPrice: 0,
    quantity: 1,
    ivaPercentage: 21,
    irpfPercentage: 15,
  });
  const [showNewClientForm, setShowNewClientForm] = useState(false);
  const [newClient, setNewClient] = useState({ name: '', nif: '', address: '' });

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ba59f8f5/clients`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setClients(data.clients || []);
      }
    } catch (error) {
      console.error('Error loading clients:', error);
    }
  };

  const handleAddClient = async () => {
    if (!newClient.name || !newClient.nif) {
      toast.error('El nombre y NIF son obligatorios');
      return;
    }

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ba59f8f5/clients`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(newClient),
        }
      );

      if (response.ok) {
        toast.success('Cliente añadido');
        loadClients();
        setShowNewClientForm(false);
        setNewClient({ name: '', nif: '', address: '' });
      }
    } catch (error) {
      console.error('Error adding client:', error);
      toast.error('Error al añadir cliente');
    }
  };

  const calculateTotals = () => {
    const subtotal = invoiceData.unitPrice * invoiceData.quantity;
    const iva = (subtotal * invoiceData.ivaPercentage) / 100;
    const irpf = (subtotal * invoiceData.irpfPercentage) / 100;
    const total = subtotal + iva - irpf;

    return { subtotal, iva, irpf, total };
  };

  const handleGenerateInvoice = async () => {
    if (!invoiceData.clientId || !invoiceData.concept) {
      toast.error('Por favor completa todos los campos obligatorios');
      return;
    }

    const totals = calculateTotals();

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ba59f8f5/invoices`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            ...invoiceData,
            ...totals,
            date: new Date().toISOString(),
          }),
        }
      );

      if (response.ok) {
        toast.success('Factura generada correctamente');
        // Reset form
        setInvoiceData({
          clientId: '',
          concept: '',
          unitPrice: 0,
          quantity: 1,
          ivaPercentage: 21,
          irpfPercentage: 15,
        });
      } else {
        toast.error('Error al generar factura');
      }
    } catch (error) {
      console.error('Error generating invoice:', error);
      toast.error('Error de conexión');
    }
  };

  const totals = calculateTotals();
  const selectedClient = clients.find((c) => c.id === invoiceData.clientId);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div>
        <h2>Generador de Facturas</h2>
        <p className="text-muted-foreground">
          Crea facturas profesionales con auto-relleno de datos
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left side - Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Datos del Emisor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label>Nombre</Label>
                <p>{userData?.name || 'Usuario'} {userData?.lastName || ''}</p>
              </div>
              <div>
                <Label>Email</Label>
                <p>{userData?.email || 'email@ejemplo.com'}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Datos del Cliente</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowNewClientForm(!showNewClientForm)}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Nuevo
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {showNewClientForm ? (
                <div className="space-y-3 p-4 border rounded-lg">
                  <div>
                    <Label>Nombre / Razón Social</Label>
                    <Input
                      value={newClient.name}
                      onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                      placeholder="Empresa S.L."
                    />
                  </div>
                  <div>
                    <Label>NIF / CIF</Label>
                    <Input
                      value={newClient.nif}
                      onChange={(e) => setNewClient({ ...newClient, nif: e.target.value })}
                      placeholder="B12345678"
                    />
                  </div>
                  <div>
                    <Label>Dirección</Label>
                    <Input
                      value={newClient.address}
                      onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
                      placeholder="Calle Principal 123, Madrid"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handleAddClient} size="sm">
                      Guardar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowNewClientForm(false)}
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <Label>Seleccionar Cliente</Label>
                  <Select
                    value={invoiceData.clientId}
                    onValueChange={(value) => setInvoiceData({ ...invoiceData, clientId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Elige un cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name} - {client.nif}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Detalles de la Factura</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label>Concepto</Label>
                <Input
                  value={invoiceData.concept}
                  onChange={(e) => setInvoiceData({ ...invoiceData, concept: e.target.value })}
                  placeholder="Servicios de consultoría"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
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
                <div>
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
                <div>
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
                <div>
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
        </div>

        {/* Right side - Preview */}
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
                <p>{userData?.name || 'Usuario'} {userData?.lastName || ''}</p>
                <p className="text-sm">{userData?.email || ''}</p>
              </div>

              <Separator />

              <div>
                <p className="text-sm text-muted-foreground">Para:</p>
                {selectedClient ? (
                  <>
                    <p>{selectedClient.name}</p>
                    <p className="text-sm">{selectedClient.nif}</p>
                    <p className="text-sm">{selectedClient.address}</p>
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
                <Button onClick={handleGenerateInvoice} className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  Guardar
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
