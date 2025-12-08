"use client"

import { EmisorCard } from "./EmisorCard";
import { ClientSelector } from "./ClientSelector";
import { InvoiceDetailsForm } from "./InvoiceDetailsForm";
import { InvoicePreview } from "./InvoicePreview";
import { useClients } from "@/hooks/useClients";
import { useInvoice } from "@/hooks/useInvoice";

export default function InvoicesScreen() {
  const { clients, addClient } = useClients();
  const { data, setData, calculateTotals, saveInvoice, saveInvoicePDF } = useInvoice();

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div>
        <h2>Generador de Facturas</h2>
        <p className="text-muted-foreground">
          Crea facturas profesionales con auto-relleno de datos
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <EmisorCard />

          <ClientSelector
            clients={clients}
            invoiceData={data}
            setInvoiceData={setData}
            addClient={addClient}
          />

          <InvoiceDetailsForm invoiceData={data} setInvoiceData={setData} />
        </div>

        <InvoicePreview
          client={clients.find(c => c.id === data.clientId)}
          totals={calculateTotals()}
          invoiceData={data}
          onSave={saveInvoice}
          onSavePDF={saveInvoicePDF}
        />
      </div>
    </div>
  );
}
