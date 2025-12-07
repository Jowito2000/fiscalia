"use client";

import { useState } from "react";
import { toast } from "sonner";
import { InvoiceFormData } from "@/model/InvoicesModels";

export function useInvoice() {
  const [data, setData] = useState<InvoiceFormData>({
    clientId: "",
    concept: "",
    unitPrice: 0,
    quantity: 1,
    ivaPercentage: 21,
    irpfPercentage: 15,
  });

  const calculateTotals = () => {
    const subtotal = data.unitPrice * data.quantity;
    const iva = (subtotal * data.ivaPercentage) / 100;
    const irpf = (subtotal * data.irpfPercentage) / 100;
    const total = subtotal + iva - irpf;
    return { subtotal, iva, irpf, total };
  };

  const saveInvoice = async () => {
    if (!data.clientId || !data.concept) {
      toast.error("Faltan datos obligatorios");
      return;
    }

    // Generar factura en el servidor

    toast.success("Factura generada");
  };

  const saveInvoicePDF = async () => {
    if (!data.clientId || !data.concept) {
      toast.error("Faltan datos obligatorios");
      return;
    }

    // Descargar factura en PDF

    toast.success("Factura generada");
  };

  return { data, setData, calculateTotals, saveInvoice, saveInvoicePDF};
}
