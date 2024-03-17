import { z } from "zod";

export const jobStatusItems = ["pending", "interview", "declined"] as const;
export const jobTypeItems = ["full_time", "part_time", "internship"] as const;

export const createJobSchema = z.object({
  body: z.object({
    company: z
      .string()
      .trim()
      .min(2, { message: "must be 2 or more characters" })
      .max(30, { message: "no more than 30 characters" }),
    position: z
      .string()
      .trim()
      .min(1, { message: "position is required" })
      .max(30, { message: "no more than 30 characters" }),
    jobLocation: z
      .string()
      .trim()
      .min(1, { message: "job location is required" }),
    jobStatus: z
      .enum(jobStatusItems, {
        required_error: "invalid value",
      })
      .default("pending"),
    jobType: z
      .enum(jobTypeItems, {
        required_error: "invalid value",
      })
      .default("full_time"),
  }),
});

export type CreateJobInput = z.TypeOf<typeof createJobSchema>["body"];
