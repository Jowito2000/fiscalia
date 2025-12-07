import { db } from "@/firebase/firebaseClient";
import { InvoiceSchema, Invoice } from "@/model/InvoicesModels";
import {
  collection,
  addDoc,
  getDocs,
  Timestamp,
} from "firebase/firestore";

const invoicesRef = collection(db, "facturas");

export async function createInvoice(data: Partial<Invoice>) {
  const parsed = InvoiceSchema.parse(data);
  return await addDoc(invoicesRef, {
    ...parsed,
    createdAt: Timestamp.fromDate(parsed.createdAt),
  });
}

export async function getInvoices(): Promise<Invoice[]> {
  const snap = await getDocs(invoicesRef);
  return snap.docs.map((d) => {
    const raw = d.data();
    return InvoiceSchema.parse({
      id: d.id,
      ...raw,
      createdAt: raw.createdAt.toDate(),
    });
  });
}
