import { z } from "zod";

export const jobStatusItems = ["pending", "interview", "declined"] as const;
export const jobTypeItems = ["full-time", "part-time", "internship"] as const;

export const jobSchema = z.object({
  company: z
    .string()
    .trim()
    .min(2, { message: "company must be at least 2 characters long" })
    .max(30, { message: "company must be no more than 30 characters" }),
  position: z
    .string()
    .trim()
    .min(1, { message: "position is required" })
    .max(30, { message: "position must be no more than 30 characters" }),
  jobLocation: z
    .string()
    .trim()
    .min(1, { message: "job location is required" }),
  jobStatus: z.enum(jobStatusItems, {
    required_error: "invalid value",
  }),
  jobType: z.enum(jobTypeItems, {
    required_error: "invalid value",
  }),
});

export type Job = z.infer<typeof jobSchema>;
