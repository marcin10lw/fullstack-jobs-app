import { z } from "zod";

export const registerFormData = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Name must be 3 or more characters" }),
  lastName: z
    .string()
    .trim()
    .min(3, { message: "Last Name must be 3 or more characters" }),
  location: z.string().trim().min(1, { message: "Location is required" }),
  email: z.string().trim().email(),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be 6 or more characters" }),
});

export type RegisterFormData = z.infer<typeof registerFormData>;
