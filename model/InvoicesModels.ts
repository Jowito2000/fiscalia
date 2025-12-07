import { z } from "zod";

export const InvoiceSchema = z.object({
  id: z.string().optional(),
  clientId: z.string(),
  concept: z.string(),
  unitPrice: z.number().positive(),
  quantity: z.number().positive(),
  ivaPercentage: z.number().min(0).max(100),
  irpfPercentage: z.number().min(0).max(100),
  createdAt: z.date(),
});

export type Invoice = z.infer<typeof InvoiceSchema>;

export const ClientSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  nif: z.string(),
  address: z.string(),
});

export type Client = z.infer<typeof ClientSchema>;