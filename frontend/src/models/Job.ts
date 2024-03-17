import { z } from 'zod';

export const jobStatusItems = ['pending', 'interview', 'declined'] as const;
export const jobTypeItems = ['full_time', 'part_time', 'internship'] as const;

export const jobSchema = z.object({
  company: z
    .string()
    .trim()
    .min(2, { message: 'must be 2 or more characters' })
    .max(30, { message: 'no more than 30 characters' }),
  position: z
    .string()
    .trim()
    .min(1, { message: 'position is required' })
    .max(30, { message: 'no more than 30 characters' }),
  jobLocation: z
    .string()
    .trim()
    .min(1, { message: 'job location is required' }),
  jobStatus: z.enum(jobStatusItems, {
    required_error: 'invalid value',
  }),
  jobType: z.enum(jobTypeItems, {
    required_error: 'invalid value',
  }),
});

export type InferJob = z.infer<typeof jobSchema>;

export type Job = InferJob & {
  jobDescription: string;
  createdAt: string;
  createdBy: string;
  id: string;
};
