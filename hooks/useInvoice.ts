"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Invoice, InvoiceFormData, InvoiceSchema } from "@/model/InvoicesModels";
import { auth, db } from "@/firebase/firebaseClient";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

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
    const user = auth.currentUser;
    if (!user) {
      toast.error("Debes iniciar sesión");
      return;
    }

    // Validación mínima
    if (!data.clientId || !data.concept) {
      toast.error("Faltan datos obligatorios");
      return;
    }

    // Construimos datos del modelo Invoice sin id
    const invoiceToValidate: Omit<Invoice, "id"> = {
      clientId: data.clientId,
      concept: data.concept,
      unitPrice: data.unitPrice,
      quantity: data.quantity,
      ivaPercentage: data.ivaPercentage,
      irpfPercentage: data.irpfPercentage,
      createdAt: new Date(),
    };

    // Validar con Zod
    const parsed = InvoiceSchema.safeParse(invoiceToValidate);
    if (!parsed.success) {
      console.error(parsed.error);
      toast.error("La factura contiene datos inválidos");
      return;
    }

    try {
      const invoicesRef = collection(db, "users", user.uid, "invoices");

      await addDoc(invoicesRef, {
        ...parsed.data,
        createdAt: serverTimestamp(),
      });

      toast.success("Factura guardada correctamente");
    } catch (error) {
      console.error(error);
      toast.error("Error al guardar la factura");
    }
  };

  const saveInvoicePDF = async () => {
    if (!data.clientId || !data.concept) {
      toast.error("Faltan datos obligatorios");
      return;
    }

    // Aquí generas el PDF
    toast.success("PDF generado (placeholder)");
  };

  return {
    data,
    setData,
    calculateTotals,
    saveInvoice,
    saveInvoicePDF,
  };
}
