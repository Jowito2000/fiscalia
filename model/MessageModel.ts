import { z } from "zod";

export const FileTypes = [
  "PDF",
  "Imagen",
  "Documento"
] as const;

export type FileType = typeof FileTypes[number];

export const AttachmentSchema = z.object({
  type: z.enum(FileTypes),
  name: z.string(),
});

export type Attachment = z.infer<typeof AttachmentSchema>;

export const MessageSchema = z.object({
  id: z.string().optional(),
  role: z.enum(["user", "assistant"]),
  content: z.string(),
  timestamp: z.union([
    z.date(),
    z.any().transform((value) => {
      if (value?.toDate) return value.toDate();
      return new Date(value);
    }),
  ]),
  attachments: z.array(AttachmentSchema).optional(),
  sources: z.array(z.string()).optional(),
  userId: z.string().optional(),
});

export type Message = z.infer<typeof MessageSchema>;
