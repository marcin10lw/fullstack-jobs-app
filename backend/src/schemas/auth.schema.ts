import z from "zod";

export const verifyEmailSchema = z.object({
  body: z.object({
    verificationCode: z
      .string()
      .length(6, { message: "Invalid verification code" }),
  }),
});

export type VerifyEmailInput = z.TypeOf<typeof verifyEmailSchema>["body"];
