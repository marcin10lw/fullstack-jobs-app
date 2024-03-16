import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(1, { message: "name is required" })
      .min(3, { message: "name must be at least 3 characters long" })
      .max(30, { message: "name must be between 3 and 30 characters long" }),
    lastName: z
      .string()
      .trim()
      .min(1, { message: "last name is required" })
      .min(3, { message: "last name must be at least 3 characters long" })
      .max(30, {
        message: "last name must be between 3 and 30 characters long",
      }),
    location: z
      .string()
      .trim()
      .min(1, "location is required")
      .max(30, "location must be between 1 and 30 characters long"),
    email: z
      .string()
      .trim()
      .min(1, { message: "email is required" })
      .email({ message: "invalid email" }),
    password: z
      .string()
      .trim()
      .min(1, { message: "password is required" })
      .min(6, { message: "password must be at least 6 characters long" })
      .max(30, {
        message: "password must be between 6 and 30 characters long",
      }),
  }),
});

export const loginUserSchema = z.object({
  body: z.object({
    email: z
      .string()
      .trim()
      .min(1, { message: "email is required" })
      .email({ message: "invalid email" }),
    password: z
      .string()
      .trim()
      .min(1, { message: "password is required" })
      .min(6, { message: "password must be at least 6 characters long" })
      .max(30, {
        message: "password must be between 6 and 30 characters long",
      }),
  }),
});

export const updateUserSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(1, { message: "name is required" })
      .min(3, { message: "name must be at least 3 characters long" })
      .max(30, { message: "name must be between 3 and 30 characters long" }),
    lastName: z
      .string()
      .trim()
      .min(1, { message: "last name is required" })
      .min(3, { message: "last name must be at least 3 characters long" })
      .max(30, {
        message: "last name must be between 3 and 30 characters long",
      }),
    location: z
      .string()
      .trim()
      .min(1, "location is required")
      .max(30, "location must be between 1 and 30 characters long"),
    email: z
      .string()
      .trim()
      .min(1, { message: "email is required" })
      .email({ message: "invalid email" }),
  }),
});

export type CreateUserInput = z.TypeOf<typeof createUserSchema>["body"];
export type UpdateUserInput = z.TypeOf<typeof updateUserSchema>["body"];
export type LoginUserInput = z.TypeOf<typeof loginUserSchema>["body"];
