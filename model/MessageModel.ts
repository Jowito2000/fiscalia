import { z } from "zod";

export const MessageSchema = z.object({
  id: z.string().optional(),
  role: z.enum(["user", "assistant"]),
  content: z.string(),
  timestamp: z.date(),
  attachments: z.array(z.string()).optional(),
  sources: z.array(z.string()).optional(),
  userId: z.string().optional()
});

export type Message = z.infer<typeof MessageSchema>;
