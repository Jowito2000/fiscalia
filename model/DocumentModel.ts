import { z } from "zod";

export const DocumentSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  type: z.enum(["invoice", "tax-model", "receipt", "other"]),
  date: z.date(),
  size: z.number(),
  status: z.enum(["completed", "draft", "pending"]),
});

export type Document = z.infer<typeof DocumentSchema>;