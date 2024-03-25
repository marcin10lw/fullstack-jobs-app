import { z } from "zod";

export const loginFormDataSchema = z.object({
  email: z.string().trim().email({ message: "invalid email" }),
  password: z.string().trim().min(1, { message: "password is required" }),
});

export type LoginFormDataSchema = z.infer<typeof loginFormDataSchema>;
