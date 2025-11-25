"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Client, InvoiceData } from "@/model/InvoicesModels";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Plus } from "lucide-react";

interface ClientSelectorProps {
    clients: Client[];
    invoiceData: InvoiceData;
    setInvoiceData: (data: InvoiceData) => void;
    addClient: (data: Client) => Promise<boolean>;
}

export function ClientSelector({ clients, invoiceData, setInvoiceData, addClient }: ClientSelectorProps) {
    const [newClient, setNewClient] = useState({ name: "", nif: "", address: "" });
    const [showNewClientForm, setShowNewClientForm] = useState(false);

    const save = async () => {
        const ok = await addClient(newClient);
        if (ok) setShowNewClientForm(false);
    };

    return (
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
                  Nuevo Cliente
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {showNewClientForm ? (
                <div className="space-y-3 p-4 border rounded-lg">
                  <div className="space-y-2">
                    <Label>Nombre / Razón Social</Label>
                    <Input
                      value={newClient.name}
                      onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                      placeholder="Empresa S.L."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>NIF / CIF</Label>
                    <Input
                      value={newClient.nif}
                      onChange={(e) => setNewClient({ ...newClient, nif: e.target.value })}
                      placeholder="B12345678"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Dirección</Label>
                    <Input
                      value={newClient.address}
                      onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
                      placeholder="Calle Principal 123, Madrid"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={() => addClient(newClient)} size="sm">
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
                <div className="space-y-3">
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
                        <SelectItem key={client.id} value={client.id!!}>
                          {client.name} - {client.nif}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>
    );
}
