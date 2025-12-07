import { z } from "zod";

export const UserTypes = [
  "autonomo",
  "freelance",
  "empresa",
  "particular",
] as const;

export type UserType = typeof UserTypes[number];

export const UserSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  surname: z.string(),
  email: z.email(),
  userType: z.enum(UserTypes),
  accessToken: z.string().optional(),
});

export type RegisterFormValues = {
  name: string;
  surname: string;
  email: string;
  password: string;
  userType: "" | UserType;
};

export type RegisterDTO = {
  name: string;
  surname: string;
  email: string;
  password: string;
  userType: UserType;
};

export type User = z.infer<typeof UserSchema>;