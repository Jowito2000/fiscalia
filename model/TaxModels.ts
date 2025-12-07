import { z } from "zod";

export const FiscalModelSchema = z.object({
  id: z.string().optional(),
  type: z.number(),
  trimestre: z.string(),
  baseImponibleGeneral: z.number(),
  cuotaIVA: z.number(),
  ivaDeducible: z.number(),
  ingresos130: z.number(),
  gastos130: z.number(),
  pagosPrevios130: z.number(),
});

export type FiscalModel = z.infer<typeof FiscalModelSchema>;