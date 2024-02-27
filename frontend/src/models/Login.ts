import { z } from "zod";

export const loginFormData = z.object({
  email: z.string().trim().email({ message: "invalid email" }),
  password: z.string().trim().min(1, { message: "password is required" }),
});

export type LoginFormData = z.infer<typeof loginFormData>;
