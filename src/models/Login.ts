import { z } from "zod";

export const loginFormData = z.object({
  email: z.string().trim().email(),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be 6 or more characters" }),
});

export type LoginFormData = z.infer<typeof loginFormData>;
