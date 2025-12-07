import { z } from "zod";

export const FiscalModelSchema = z
  .object({
    id: z.string().optional(),
    type: z.number(), // 303 o 130
    trimestre: z.string(),

    baseImponibleGeneral303: z.number().optional(),
    cuotaIVA303: z.number().optional(),
    ivaDeducible303: z.number().optional(),

    ingresos130: z.number().optional(),
    gastos130: z.number().optional(),
    pagosPrevios130: z.number().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === 303) {
      if (data.baseImponibleGeneral303 == null)
        ctx.addIssue({
          code: "custom",
          message: "baseImponibleGeneral303 es obligatorio para modelos 303",
          path: ["baseImponibleGeneral303"],
        });

      if (data.cuotaIVA303 == null)
        ctx.addIssue({
          code: "custom",
          message: "cuotaIVA303 es obligatorio para modelos 303",
          path: ["cuotaIVA303"],
        });

      if (data.ivaDeducible303 == null)
        ctx.addIssue({
          code: "custom",
          message: "ivaDeducible303 es obligatorio para modelos 303",
          path: ["ivaDeducible303"],
        });
    }

    if (data.type === 130) {
      if (data.ingresos130 == null)
        ctx.addIssue({
          code: "custom",
          message: "ingresos130 es obligatorio para modelos 130",
          path: ["ingresos130"],
        });

      if (data.gastos130 == null)
        ctx.addIssue({
          code: "custom",
          message: "gastos130 es obligatorio para modelos 130",
          path: ["gastos130"],
        });

      if (data.pagosPrevios130 == null)
        ctx.addIssue({
          code: "custom",
          message: "pagosPrevios130 es obligatorio para modelos 130",
          path: ["pagosPrevios130"],
        });
    }
  });

export type FiscalModel = z.infer<typeof FiscalModelSchema>;
